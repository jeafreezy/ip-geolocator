import { TIpInfo } from "@/types";

export const PopupContent = ({ ipInfo }: { ipInfo: TIpInfo }) => {
  return (
    <div>
      <p>
        <strong>IP:</strong> {ipInfo.ip}
      </p>
      <p>
        <strong>Status:</strong> {ipInfo.status}
      </p>
      <p>
        <strong>Continent:</strong> {ipInfo.continent}
      </p>
      <p>
        <strong>Country:</strong> {ipInfo.country}
      </p>
      <p>
        <strong>Country Code:</strong> {ipInfo.countryCode}
      </p>
      <p>
        <strong>Region:</strong> {ipInfo.regionName}
      </p>
      <p>
        <strong>City:</strong> {ipInfo.city}
      </p>
      <p>
        <strong>ZIP:</strong> {ipInfo.zip}
      </p>
      <button
        className="w-full bg-black text-white p-2 rounded-md mt-2 hover:bg-gray-800 cursor-pointer"
        id="more-info-button"
      >
        More Info
      </button>
    </div>
  );
};
