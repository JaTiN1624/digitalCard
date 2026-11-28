import { useEffect } from "react";

// Loads a design's display font only when that design is opened, so guests never download
// fonts for the other designs. `families` uses the Google Fonts css2 syntax,
// e.g. "Playfair+Display:ital,wght@0,500;1,400".
export function useGoogleFont(families) {
  useEffect(() => {
    if (!families || typeof document === "undefined") return;
    const href = `https://fonts.googleapis.com/css2?${[].concat(families).map((f) => `family=${f}`).join("&")}&display=swap`;
    if (document.head.querySelector(`link[href="${href}"]`)) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  }, [families]);
}
