import { Drawer } from "vaul";
import { TIpInfo } from "@/types";

export const IpInfoDrawer = ({
  ipInfo,
  setOpenDrawer,
  openDrawer,
}: {
  ipInfo: TIpInfo | null;
  openDrawer: boolean;
  setOpenDrawer: (open: boolean) => void;
}) => {
  return (
    <Drawer.Root
      direction={window.innerWidth <= 768 ? "bottom" : "left"}
      open={openDrawer}
      onOpenChange={setOpenDrawer}

    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content
          className={`${window.innerWidth <= 768
            ? "bottom-0 w-full"
            : "left-2 top-2 bottom-2 w-[310px]"
            } fixed map-overlay outline-none flex`}
          style={
            { "--initial-transform": "calc(100% + 8px)" } as React.CSSProperties
          }
        >
          <div className="bg-zinc-50 h-full w-full grow p-5 flex flex-col rounded-2xl">
            <button
              className="self-end mb-4 text-zinc-600"
              onClick={() => setOpenDrawer(false)}
            >
              Close
            </button>
            <div className="max-w-md mx-auto">
              <Drawer.Title className="font-medium mb-2 text-zinc-900">
                IP Geolocator
              </Drawer.Title>
              <Drawer.Description className="font-medium mb-2 text-zinc-900">
                <span className="block border-b w-full "></span>
              </Drawer.Description>
              {ipInfo ? (
                <div className="flex flex-col gap-y-1 max-h-[50vh] md:max-h-full overflow-y-auto">
                  {Object.entries(ipInfo).map(([key, value]) => (
                    <p key={key}>
                      <strong>
                        {key.charAt(0).toUpperCase() + key.slice(1)}:
                      </strong>{" "}
                      {String(value)}
                    </p>
                  ))}
                </div>
              ) : (
                <div className="animate-pulse space-y-2">
                  {Array.from({ length: 18 }).map((_, index) => (
                    <div key={index} className="h-4 bg-gray-300 rounded"></div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
