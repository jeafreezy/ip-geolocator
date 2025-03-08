import maplibregl, { LngLatLike, Map, Marker } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { ZoomControl } from "@/components/zoom-control";
import {
  MIN_ZOOM,
  IP_ADDRESS_REGEX,
  IP_ZOOM,
  IP_API_URL,
  LOCAL_STORAGE_KEY,
  USAGE_LIMIT,
  MAP_CENTER,
} from "@/utils";
import { Logo } from "@/assets";
import { toast } from "sonner";
import { TIpInfo } from "@/types";
import { IpInfoDrawer } from "@/components/ip-info-drawer";
import { PopupContent } from "@/components/popup";
import ReactDOMServer from "react-dom/server";
import { Popup } from "maplibre-gl";
import { GeolocationIcon } from "@/components/icons/geolocation";
import { SearchBar } from "@/components/search-bar";
import { UsageTracker } from "@/components/usage-tracker";
import { Tooltip } from "react-tooltip";
import { TourModal } from "./components/tour-modal";
import { HelpIcon } from "./components/icons";

/**
 * This function creates a popup for the marker with the IP information.
 * @param ipInfo IP information object
 * @param setOpenDrawer Function to open the drawer
 * @param setIpInfo Function to set the IP information
 * @returns Popup object
 */
const createPopup = (
  ipInfo: TIpInfo,
  setOpenDrawer: (v: boolean) => void,
  setIpInfo: (info: TIpInfo) => void,
) => {
  const popup = new Popup({
    offset: 25,
    closeButton: false,
    closeOnClick: false,
    closeOnMove: true,
  }).setHTML(ReactDOMServer.renderToString(<PopupContent ipInfo={ipInfo} />));

  popup.on("open", () => {
    const button = document.getElementById("more-info-button");
    if (button) {
      button.addEventListener("click", () => {
        setOpenDrawer(true);
        setIpInfo(ipInfo);
      });
    }
  });

  popup.on("close", () => {
    const button = document.getElementById("more-info-button");
    if (button) {
      button.removeEventListener("click", () => {
        setOpenDrawer(true);
        setIpInfo(ipInfo);
      });
    }
  });

  return popup;
};

function App() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<Map | null>(null);
  const [ipAddress, setIpAddress] = useState<string>("");
  const markerRef = useRef<Marker | null>(null);
  const [isValidInput, setIsValidInput] = useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [ipInfo, setIpInfo] = useState<TIpInfo | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [ipInfoArray, setIpInfoArray] = useState<TIpInfo[]>(() => {
    const cachedIpInfo = localStorage.getItem(LOCAL_STORAGE_KEY);
    return cachedIpInfo ? JSON.parse(cachedIpInfo) : [];
  });
  const [openModal, setOpenModal] = useState<boolean>(false);


  /**
   * This effect opens the tour on the first render.
   */
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setOpenModal(true);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  /**
   * This effect initializes the map on the first render.
   */
  useEffect(() => {
    if (map) return;
    if (mapContainer.current) {
      setMap(
        new maplibregl.Map({
          container: mapContainer.current,
          style: "https://tiles.openfreemap.org/styles/positron",
          center: MAP_CENTER as LngLatLike,
          zoom: MIN_ZOOM,
        }),
      );
    }
  }, [map]);

  /**
   * This effect updates the local storage with the IP information array.
   */
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(ipInfoArray));
  }, [ipInfoArray]);

  const handleGeolocate = async () => {
    setIpAddress("");
    await getIPAddress("");
  }

  /**
   * This callback retrieves the IP address information and updates the map with the location.
   */
  const getIPAddress = useCallback(async (ipAddress: string) => {
    try {
      if (ipInfoArray.length >= USAGE_LIMIT) {
        toast.error("IP information limit reached. Please reset storage.");
        return;
      }

      let ipInfo: TIpInfo | undefined = ipInfoArray.find(
        (info) => info.ip === ipAddress,
      );

      if (!ipInfo) {

        setIsFetching(true);

        const res = await fetch(`${IP_API_URL}${ipAddress}`);

        if (!res.ok) {
          toast.error(
            "Failed to fetch IP information. Please try again later.",
          );
          setIsFetching(false);
          return;
        }

        ipInfo = await res.json();

        setIsFetching(false);

        if (ipInfo && ipInfo.lat && ipInfo.lon) {
          // Only update the array if the IP address does not exist in state, because when the user geolocates, there
          // is no IpAddress in the input field, so the same IP address will be added to the array multiple times.
          const ipExists = ipInfoArray.some((info) => info.ip === ipInfo!.ip);
          if (!ipExists) {
            setIpAddress(ipInfo.ip);
            setIpInfoArray((prevArray) => [...prevArray, ipInfo!]);
          }
        }
      }

      if (map && ipInfo && ipInfo.lat && ipInfo.lon) {
        setIpAddress(ipInfo.ip);
        toast.success("IP address information retrieved successfully.");
        map.flyTo({ center: [ipInfo.lon, ipInfo.lat], zoom: IP_ZOOM });

        if (!markerRef.current) {
          markerRef.current = new Marker({ color: "black" })
            .setLngLat([ipInfo.lon, ipInfo.lat])
            .setPopup(createPopup(ipInfo, setOpenDrawer, setIpInfo))
            .addTo(map);
        } else {
          markerRef.current.setLngLat([ipInfo.lon, ipInfo.lat]);
          markerRef.current.setPopup(
            createPopup(ipInfo, setOpenDrawer, setIpInfo),
          );
        }
      } else {
        toast.error("Failed to fetch IP information. Please try again later.");
      }
    } catch {
      toast.error("Failed to fetch IP information. Please try again later.");
      setOpenDrawer(false);
      setIsFetching(false);
    }
  }, [map, ipInfoArray]);

  /**
   * This effect validates the input as the user types.
   */
  useEffect(() => {

    const validateIpAddress = (ip: string) => {
      return IP_ADDRESS_REGEX.test(ip);
    };

    setIsValidInput(validateIpAddress(ipAddress));

    // Remove the marker if the IP address is empty
    if (!ipAddress && markerRef.current) {
      markerRef.current.remove();
      markerRef.current = null;
    }
  }, [ipAddress]);


  /**
   * This callback clears the IP address input and resets the map.
   */
  const handleClearInput = useCallback(() => {
    if (ipAddress.length > 0) {
      setIpAddress("");
    }
    if (map) {
      map.flyTo({ center: MAP_CENTER as LngLatLike, zoom: MIN_ZOOM });
    }
  }, [ipAddress, map]);

  /**
   * This function resets the local storage and the IP information array.
   */
  const handleReset = useCallback(() => {

    if (ipInfoArray.length === 0) return;

    localStorage.removeItem(LOCAL_STORAGE_KEY);
    handleClearInput();
    setIpInfoArray([]);
    if (markerRef.current) {
      markerRef.current?.remove();
      markerRef.current = null;
    }
    toast.success("Storage reset successfully.");
  }, [ipInfoArray, handleClearInput]);

  return (
    // Map Container
    <>
      <IpInfoDrawer
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        ipInfo={ipInfo}
      />
      <TourModal openModal={openModal} setOpenModal={setOpenModal} />
      <div
        ref={mapContainer}
        className="w-screen h-screen relative"
        role="main"
      >
        {/* About */}
        <div className="absolute border left-4 md:left-4 top-4 md:top-10 map-overlay flex items-center shadow-2xl rounded-lg p-1 md:p-2 bg-white">
          <img src={Logo} alt="Brand Logo" className="w-full h-8" />
        </div>

        {/* Usage tracker */}

        <UsageTracker
          storageLength={ipInfoArray.length}
          handleReset={handleReset}
        />

        {/* Zoom Controls */}
        <div className="absolute top-1/3 right-4 map-overlay">
          <ZoomControl map={map} />
        </div>

        {/* Tour */}
        <div className="absolute top-1/4 right-[15px] map-overlay">
          <button
            className="bg-white p-1.5 rounded-full shadow-lg border"
            onClick={() => setOpenModal(true)}
            aria-label="Tour"
            data-tooltip-id="help"
            id="help-tour-button"
          >
            <HelpIcon className="w-6 h-6" />
            <Tooltip id="help" content="Start tour" place="left" />
          </button>
        </div>

        {/* Geolocator Icon */}
        <div className="absolute top-1/2 mt-4 right-[15px] map-overlay">
          <button
            className="bg-white p-1.5 rounded-full shadow-lg border"
            onClick={handleGeolocate}
            aria-label="Geolocate IP address"
            data-tooltip-id="geolocator"
            id="geolocator"
          >
            <GeolocationIcon className="w-6 h-6" />
            <Tooltip id="geolocator" content="Geolocate my IP" place="left" />
          </button>
        </div>

        {/* Search Component */}
        <SearchBar
          ipAddress={ipAddress}
          setIpAddress={setIpAddress}
          getIPAddress={getIPAddress}
          isFetching={isFetching}
          isValidInput={isValidInput}
          handleClearInput={handleClearInput}
        />
      </div >
    </>
  );
}

export default App;
