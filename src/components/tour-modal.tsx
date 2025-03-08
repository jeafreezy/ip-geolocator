import { useTour } from "@reactour/tour";

export const TourModal = ({
  openModal,
  setOpenModal,
}: {
  openModal: boolean;
  setOpenModal: (v: boolean) => void;
}) => {
  const { setIsOpen } = useTour();

  if (!openModal) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-[10000] px-2 "
      role="dialog"
      aria-modal="true"
      aria-labelledby="tour-modal-title"
      aria-describedby="tour-modal-description"
    >
      <div className="bg-white rounded-lg p-6 relative max-w-96">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={() => setOpenModal(false)}
          aria-label="Close"
        >
          ✕
        </button>
        <h1 id="tour-modal-title" className="text-2xl font-bold mb-4">
          Welcome to IP Geolocator!
        </h1>
        <p id="tour-modal-description" className="mb-4">
          This application allows you to locate the geographical position of an
          IP address. You can enter an IP address and get details such as
          country, city, and coordinates.
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Enter an IP address to get its location.</li>
          <li>View the location on an interactive map.</li>
          <li>
            Click on the market to get detailed information about the IP
            address.
          </li>
        </ul>
        <nav>
          <button
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            onClick={() => {
              setIsOpen((o) => !o);
              setOpenModal(false);
            }}
          >
            Toggle Tour
          </button>
        </nav>
      </div>
    </div>
  );
};
