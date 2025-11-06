import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { RootProvider } from "@/store";
import "./index.css";
import App from "./App.tsx";
import { registerServiceWorker } from '@/config';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RootProvider>
      <App />
    </RootProvider>
  </StrictMode>
);

registerServiceWorker().catch(console.error);

