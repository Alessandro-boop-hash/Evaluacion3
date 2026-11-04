import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ClinicaProvider } from "./components/ClinicaContext";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClinicaProvider>
      <App />
    </ClinicaProvider>
  </StrictMode>
);