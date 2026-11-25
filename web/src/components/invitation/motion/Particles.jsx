import { useMemo } from "react";

// Theme-specific background particles, animated purely with CSS keyframes (compositor-only
// transform/opacity), so they cost almost nothing and never re-render React.
// Hidden for reduced-motion visitors and never intercept taps (pointer-events: none).
//
// kinds: petal | leaf | marigold | gold | sparkle | star | heart | bokeh | confetti
//        balloon | butterfly | pixel
// Positions come from a seeded random generator so server and client render the same.

function seeded(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Motion family per kind: fall (top to bottom), rise (bottom to top), twinkle, drift (slow float)
const FAMILY = {
  petal: "fall",
  leaf: "fall",
  marigold: "fall",
  confetti: "fall",
  gold: "rise",
  heart: "rise",
  sparkle: "twinkle",
  star: "twinkle",
  bokeh: "drift",
  balloon: "float",
  butterfly: "flutter",
  pixel: "fall",
};

const DURATION = { fall: [11, 20], rise: [9, 16], twinkle: [2.4, 5], drift: [14, 24], float: [13, 22], flutter: [7, 12] };

export default function Particles({ kinds = ["petal"], count = 14, seed = 7, className = "" }) {
  const items = useMemo(() => {
    const rand = seeded(seed);
    return Array.from({ length: count }, (_, i) => {
      const kind = kinds[i % kinds.length];
      const family = FAMILY[kind] ?? "fall";
      const [min, max] = DURATION[family];
      const duration = min + rand() * (max - min);
      return {
        kind,
        family,
        style: {
          "--x": `${(rand() * 100).toFixed(2)}%`,
          "--y": `${(rand() * 100).toFixed(2)}%`,
          "--s": (0.55 + rand() * 0.75).toFixed(2),
          "--o": (0.45 + rand() * 0.5).toFixed(2),
          "--drift": `${Math.round((rand() - 0.5) * 120)}px`,
          "--spin": `${Math.round(180 + rand() * 360) * (rand() > 0.5 ? 1 : -1)}deg`,
          "--hue": Math.round(rand() * 3),
          "--d": `${duration.toFixed(2)}s`,
          // negative delay = already mid-flight on first paint, so the screen never starts empty
          "--delay": `${(-rand() * duration).toFixed(2)}s`,
        },
      };
    });
  }, [kinds, count, seed]);

  return (
    <div className={`particles ${className}`.trim()} aria-hidden="true">
      {items.map((p, i) => (
        <span key={i} className={`particle p-${p.kind} pf-${p.family}`} style={p.style} />
      ))}
    </div>
  );
}
