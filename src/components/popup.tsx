import { TIpInfo } from "@/types";

export const PopupContent = ({ ipInfo }: { ipInfo: TIpInfo }) => {
  return (
    <div>
      {ipInfo && (
        <>
          {Object.entries(ipInfo).slice(0, 4).map(([key, value]) => (
            <p key={key}>
              <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
            </p>
          ))}
        </>
      )}
      <button
        className="w-full bg-black text-white p-2 rounded-md mt-2 hover:bg-gray-800 cursor-pointer"
        id="more-info-button"
      >
        More Info
      </button>
    </div>
  );
};
