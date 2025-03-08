import { Map } from "maplibre-gl";
import { MinusIcon, PlusIcon } from "@/components/icons";
import { useState, useEffect } from "react";
import { MAX_ZOOM, MIN_ZOOM } from "@/utils";
import { Tooltip } from "react-tooltip";

export const ZoomControl = ({ map }: { map: Map | null }) => {
  const [zoom, setZoom] = useState(map ? map.getZoom() : MIN_ZOOM);

  useEffect(() => {
    if (!map) return;
    const handleZoomChange = () => {
      setZoom(map.getZoom());
    };
    map.on("zoom", handleZoomChange);
    return () => {
      map.off("zoom", handleZoomChange);
    };
  }, [map]);

  const handleZoomIn = () => {
    if (!map) return;
    if (zoom < MAX_ZOOM) {
      map.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (!map) return;
    if (zoom > MIN_ZOOM) {
      map.zoomOut();
    }
  };

  return (
    <div className="flex flex-col shadow-xl gap-y-6 bg-white p-2 rounded-2xl items-center  border">
      <button
        onClick={handleZoomIn}
        disabled={zoom >= MAX_ZOOM}
        className={`p-0.5 ${zoom >= MAX_ZOOM ? "cursor-not-allowed" : ""}`}
        data-tooltip-id="zoom-in"
        id="zoom-in"
      >
        <PlusIcon className="w-4 h-4" />
        <Tooltip id="zoom-in" content="Zoom In" place="left" />
      </button>
      <span className="border w-full"></span>
      <button
        onClick={handleZoomOut}
        disabled={zoom <= MIN_ZOOM}
        className={` p-0.5 ${zoom <= MIN_ZOOM ? "cursor-not-allowed" : ""}`}
        data-tooltip-id="zoom-out"
        id="zoom-out"
      >
        <MinusIcon className="w-4 h-4" />
        <Tooltip id="zoom-out" content="Zoom Out" place="left" />
      </button>
    </div>
  );
};
