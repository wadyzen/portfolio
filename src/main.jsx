import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./assets/style.scss";
import "./i18n/i18n.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);

requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    const htmlLoader = document.getElementById("initial-loader");
    if (!htmlLoader) return;

    htmlLoader.classList.add("is-hidden");
    document.body.classList.remove("is-loading");

    // Remove from DOM after the fade-out finishes
    setTimeout(() => htmlLoader.remove(), 500);
  });
});