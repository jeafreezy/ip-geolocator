import { USAGE_LIMIT } from "@/utils";

export const UsageTracker = ({
  storageLength,
  handleReset,
}: {
  storageLength: number;
  handleReset: () => void;
}) => {
  return (
    <div
      className="absolute bottom-20 h-fit md:top-40 left-4 map-overlay flex bg-white p-2 rounded-lg shadow-xl flex-col border"
      id="usage-tracker"
    >
      <div className="flex flex-col">
        <span className="text-gray-700">Usage:</span>
        <div className="relative w-20 h-4 bg-gray-200 rounded-full">
          <div
            className={`absolute top-0 left-0 h-full rounded-full ${storageLength >= USAGE_LIMIT ? "bg-red-500" : "bg-green-500"}`}
            style={{
              width: `${Math.min((storageLength / 50) * 100, 100)}%`,
            }}
          ></div>
        </div>
        <span className="text-gray-700">
          {storageLength}/{USAGE_LIMIT}
        </span>
      </div>

      <button
        className={`bg-black text-white py-1 w-fit px-4 rounded-2xl shadow-lg ${storageLength === 0 ? "cursor-not-allowed" : "cursor-pointer"}`}
        disabled={storageLength === 0}
        onClick={handleReset}
      >
        Reset
      </button>
      <small>
        <a
          href="https://api.techniknews.net/"
          className="text-black underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn more about the usage policy
        </a>
      </small>
    </div>
  );
};
