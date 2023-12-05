import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { FlagProvider } from "./context/index";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <FlagProvider>
      <App />
    </FlagProvider>
  </React.StrictMode>
);
