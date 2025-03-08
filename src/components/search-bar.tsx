import { SearchIcon } from "@/components/icons";
import { useEffect } from "react";
import { Tooltip } from "react-tooltip";

export const SearchBar = ({
  ipAddress,
  isValidInput,
  isFetching,
  getIPAddress,
  setIpAddress,
}: {
  ipAddress: string;
  isValidInput: boolean;
  isFetching: boolean;
  getIPAddress: () => void;
  setIpAddress: (ipAddress: string) => void;
}) => {
  /**
   * This effect listens for the Enter key press and triggers the IP address retrieval.
   */
  useEffect(() => {
    if (isFetching) return;
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Enter" && isValidInput) {
        getIPAddress();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isValidInput, getIPAddress, isFetching]);

  return (
    <div
      id="search-input"
      className="absolute map-overlay flex flex-col left-1/2 top-16 md:top-10 transform -translate-x-1/2 bg-white shadow-xl border rounded-full"
    >
      <div className="px-4 flex items-center justify-center space-x-2 w-full md:w-auto">
        <SearchIcon className="w-5 h-5" aria-hidden="true" />
        <label htmlFor="ip-address-input" className="sr-only">
          Enter the IP address
        </label>
        <input
          id="ip-address-input"
          className="p-3 rounded-full outline-none flex-grow"
          placeholder="Enter the IP address..."
          value={ipAddress}
          onChange={(evt) => {
            setIpAddress(evt.target.value);
          }}
          autoFocus
          aria-invalid={!isValidInput}
          aria-describedby="ip-address-error"
        />
        {ipAddress && (
          <button
            className="p-0.5 w-4"
            onClick={() => setIpAddress("")}
            aria-label="Clear input"
            title="Clear input"
            data-tooltip-id="clear-input"
          >
            ✕
          </button>
        )}
        <Tooltip id="clear-input" content="Clear Input" />
        <button
          className={`rounded-full px-2 py-1 flex-1 h-full transition-transform duration-300 ${isValidInput ? "bg-black text-white hover:bg-gray-800 transform" : "bg-gray-300 cursor-not-allowed transform"}`}
          disabled={!isValidInput || isFetching}
          onClick={getIPAddress}
          aria-label="Locate IP address"
        >
          Locate
        </button>
      </div>
    </div>
  );
};
