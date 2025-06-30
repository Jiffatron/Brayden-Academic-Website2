// main.tsx
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";
import { AnimatePresence } from "framer-motion";

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <AnimatePresence>
      <App />
    </AnimatePresence>
  </HelmetProvider>
);
