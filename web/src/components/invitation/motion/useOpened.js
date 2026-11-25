import { useCallback, useState } from "react";

// Whether the guest has opened the cover. Remembered for the browser tab session, so a
// refresh or coming back from the map link doesn't make them open the envelope again.
// Previews always start closed.
export function useOpened(invitation, preview) {
  const key = `invite-opened:${invitation.slug}`;
  const [opened, setOpened] = useState(() => {
    if (preview || typeof window === "undefined") return false;
    try {
      return window.sessionStorage.getItem(key) === "1";
    } catch {
      return false;
    }
  });

  const markOpened = useCallback(() => {
    setOpened(true);
    if (preview) return;
    try {
      window.sessionStorage.setItem(key, "1");
    } catch {
      // storage blocked (private mode): just don't remember
    }
  }, [key, preview]);

  return [opened, markOpened];
}
