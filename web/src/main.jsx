import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "./components/site/site.css";
import App from "./App.jsx";

const root = document.getElementById("root");
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Public pages are prerendered at build time (scripts/prerender.mjs). Hydrate only when the
// HTML was rendered for exactly this URL; anything else (invitations, previews, filtered
// collections) renders on the client from the empty app shell.
if (root.dataset.prerendered && root.dataset.prerendered === window.location.pathname && !window.location.search) {
  hydrateRoot(root, app);
} else {
  root.textContent = "";
  createRoot(root).render(app);
}
