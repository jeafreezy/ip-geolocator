import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "sonner";
import { tourSteps } from "./utils/constants.ts";
import { TourProvider } from "@reactour/tour";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster position="top-right" richColors closeButton />
    <TourProvider steps={tourSteps}>
      <App />
    </TourProvider>
  </StrictMode>,
);
