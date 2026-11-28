import { useEffect, useRef, useState } from "react";
import { safeHttpsUrl } from "../../utils/format.js";

// Background music for invitations that include it (config.music). Never autoplays:
// the guest starts and stops it with this floating button.
export default function MusicButton({ src }) {
  const url = safeHttpsUrl(src);
  const audio = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => () => audio.current?.pause(), []);

  if (!url) return null;

  const toggle = async () => {
    if (!audio.current) {
      audio.current = new Audio(url);
      audio.current.loop = true;
    }
    if (playing) {
      audio.current.pause();
      setPlaying(false);
      return;
    }
    try {
      await audio.current.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  return (
    <button type="button" className={`music-btn ${playing ? "is-playing" : ""}`} onClick={toggle} aria-pressed={playing} aria-label={playing ? "Pause music" : "Play music"}>
      <span aria-hidden="true">♪</span>
    </button>
  );
}
