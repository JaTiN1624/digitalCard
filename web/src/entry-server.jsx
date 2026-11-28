/* eslint-disable react-refresh/only-export-components -- build-time entry, never hot-reloaded */
import { StrictMode } from "react";
import { prerenderToNodeStream } from "react-dom/static";
import { StaticRouter } from "react-router";
import App from "./App.jsx";

// Build-time rendering of a public page to HTML (used by scripts/prerender.mjs).
// prerenderToNodeStream waits for lazy pages, so the full page content is in the HTML.
export async function render(url) {
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
  let html = "";
  for await (const chunk of prelude) html += chunk;
  return html;
}

export { PAGES, SITE_URL } from "./seo/site.js";
