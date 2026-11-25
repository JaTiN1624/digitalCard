// Original birthday illustrations as inline SVG (no copyrighted characters, logos or brands).
// Colour comes from CSS variables so each theme tints them; decorative only (aria-hidden).

const Svg = ({ viewBox = "0 0 100 100", className = "", children, ...rest }) => (
  <svg viewBox={viewBox} className={`motif ${className}`.trim()} aria-hidden="true" focusable="false" {...rest}>
    {children}
  </svg>
);

export const Balloon = ({ color = "var(--balloon-1, #ff7aa2)", className = "" }) => (
  <Svg viewBox="0 0 60 120" className={`balloon-art ${className}`}>
    <path d="M30 4C15 4 6 16 6 30c0 18 14 32 24 36 10-4 24-18 24-36C54 16 45 4 30 4Z" fill={color} />
    <ellipse cx="21" cy="20" rx="5" ry="9" fill="#fff" opacity="0.35" transform="rotate(-20 21 20)" />
    <path d="M26 66h8l-4 6Z" fill={color} />
    <path d="M30 72c-6 10 6 18-2 28s4 14 0 18" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
  </Svg>
);

export const BalloonCluster = ({ className = "" }) => (
  <Svg viewBox="0 0 140 150" className={`balloon-cluster ${className}`}>
    {[
      [22, 18, "var(--balloon-1, #ff7aa2)", -12],
      [70, 4, "var(--balloon-2, #7cc6ff)", 0],
      [114, 20, "var(--balloon-3, #ffd166)", 12],
    ].map(([x, y, c, r]) => (
      <g key={x} transform={`translate(${x - 22} ${y}) rotate(${r} 22 40)`}>
        <path d="M22 0C10 0 2 10 2 22c0 14 11 26 20 29 9-3 20-15 20-29C42 10 34 0 22 0Z" fill={c} />
        <ellipse cx="15" cy="14" rx="4" ry="7" fill="#fff" opacity="0.35" transform="rotate(-20 15 14)" />
        <path d="M19 51h6l-3 4Z" fill={c} />
      </g>
    ))}
    <path d="M22 72L70 140M70 58V140M114 74L70 140" stroke="currentColor" strokeWidth="1.2" opacity="0.5" fill="none" />
  </Svg>
);

// Two-tier cake. `candles` candles on top; flames hidden when `lit` is false.
export function Cake({ candles = 3, lit = true, className = "" }) {
  const n = Math.max(1, Math.min(candles, 9));
  const xs = Array.from({ length: n }, (_, i) => 50 + (i - (n - 1) / 2) * Math.min(9, 44 / n + 2));
  return (
    <Svg viewBox="0 0 100 100" className={`cake ${lit ? "is-lit" : "is-out"} ${className}`}>
      <ellipse cx="50" cy="92" rx="44" ry="5" fill="currentColor" opacity="0.12" />
      <rect x="10" y="62" width="80" height="28" rx="6" fill="var(--cake-base, #f7c6d4)" />
      <path d="M10 68c6 6 10-2 16 4s10-4 16 2 10-4 16 2 10-4 16 2 10-2 16-6v-4H10Z" fill="var(--cake-icing, #fff6f0)" />
      <rect x="22" y="40" width="56" height="24" rx="5" fill="var(--cake-top, #ffe0ea)" />
      <path d="M22 45c5 5 8-1 12 3s8-3 12 1 8-3 12 1 8-3 12 1 6-2 8-5v-4H22Z" fill="var(--cake-icing, #fff6f0)" />
      {[18, 30, 44, 58, 72, 84].map((x, i) => (
        <circle key={x} cx={x} cy={80 - (i % 2) * 6} r="1.6" fill={["#ff7aa2", "#7cc6ff", "#ffd166"][i % 3]} />
      ))}
      {xs.map((x, i) => (
        <g key={x} className="candle" style={{ "--i": i }}>
          <rect x={x - 1.6} y="26" width="3.2" height="15" rx="1" fill="var(--candle, #8fd3ff)" />
          <path d={`M${x - 1.6} 30l3.2-2M${x - 1.6} 35l3.2-2`} stroke="#fff" strokeWidth="0.8" opacity="0.7" />
          <path className="candle-flame" d={`M${x} 16c-3 4-3 7 0 9 3-2 3-5 0-9Z`} fill="#ffb84d" />
          <path className="candle-smoke" d={`M${x} 22c-2-4 2-6 0-10`} fill="none" stroke="#bbb" strokeWidth="1" />
        </g>
      ))}
    </Svg>
  );
}

export const Castle = ({ className = "" }) => (
  <Svg viewBox="0 0 160 130" className={`castle ${className}`}>
    <g fill="var(--castle-wall, #f5d5e6)" stroke="var(--castle-line, #c98bb3)" strokeWidth="1.2">
      <rect x="20" y="56" width="26" height="70" />
      <rect x="114" y="56" width="26" height="70" />
      <rect x="44" y="40" width="72" height="86" />
      <rect x="66" y="18" width="28" height="40" />
    </g>
    <g fill="var(--castle-roof, #b58cd8)">
      <path d="M16 58L33 22l17 36Z" />
      <path d="M110 58l17-36 17 36Z" />
      <path d="M62 20L80-6l18 26Z" transform="translate(0 6)" />
    </g>
    <g stroke="var(--castle-line, #c98bb3)" strokeWidth="1.2">
      <path d="M33 22V10M127 22V10M80 0v-6" transform="translate(0 2)" />
    </g>
    <g fill="var(--castle-flag, #ff8fb7)">
      <path d="M33 12h10l-4 3 4 3H33Z" />
      <path d="M127 12h10l-4 3 4 3h-10Z" />
    </g>
    <path d="M70 126V100a10 10 0 0 1 20 0v26Z" fill="var(--castle-door, #b58cd8)" />
    <g fill="var(--castle-window, #fff4c2)">
      <path d="M28 76a5 5 0 0 1 10 0v10H28Z" />
      <path d="M122 76a5 5 0 0 1 10 0v10h-10Z" />
      <path d="M75 30a5 5 0 0 1 10 0v10H75Z" />
      <path d="M54 62a5 5 0 0 1 10 0v10H54ZM96 62a5 5 0 0 1 10 0v10H96Z" />
    </g>
    <path d="M44 40h72M20 56h26M114 56h26" stroke="var(--castle-line, #c98bb3)" strokeDasharray="6 4" strokeWidth="3" />
  </Svg>
);

export const Butterfly = ({ className = "" }) => (
  <Svg viewBox="0 0 60 50" className={`butterfly-art ${className}`}>
    <g className="bf-wing left">
      <path d="M29 24C20 6 4 4 4 16c0 8 10 12 25 9Z" fill="var(--wing-a, #f4a3c4)" />
      <path d="M29 27C18 30 10 40 16 45c5 4 12-6 13-17Z" fill="var(--wing-b, #c9a6f2)" />
    </g>
    <g className="bf-wing right">
      <path d="M31 24C40 6 56 4 56 16c0 8-10 12-25 9Z" fill="var(--wing-a, #f4a3c4)" />
      <path d="M31 27c11 3 19 13 13 18-5 4-12-6-13-17Z" fill="var(--wing-b, #c9a6f2)" />
    </g>
    <rect x="28.6" y="16" width="2.8" height="24" rx="1.4" fill="#5b4a5e" />
    <path d="M30 17c-2-6-6-8-8-9M30 17c2-6 6-8 8-9" stroke="#5b4a5e" strokeWidth="1" fill="none" />
  </Svg>
);

export const Rocket = ({ className = "" }) => (
  <Svg viewBox="0 0 60 120" className={`rocket ${className}`}>
    <path className="rocket-flame" d="M22 92c0 14 8 24 8 24s8-10 8-24Z" fill="#ffb84d" />
    <path d="M30 4C18 18 14 40 16 92h28c2-52-2-74-14-88Z" fill="var(--rocket-body, #eef2ff)" />
    <path d="M30 4C24 11 20 20 18 30h24C40 20 36 11 30 4Z" fill="var(--rocket-nose, #ff5d73)" />
    <circle cx="30" cy="48" r="8" fill="var(--rocket-window, #6ec6ff)" stroke="#9aa6c8" strokeWidth="2" />
    <path d="M16 70L4 92h12ZM44 70l12 22H44Z" fill="var(--rocket-nose, #ff5d73)" />
    <rect x="26" y="82" width="8" height="12" rx="2" fill="var(--rocket-nose, #ff5d73)" />
  </Svg>
);

export const Planet = ({ className = "" }) => (
  <Svg viewBox="0 0 120 80" className={`planet ${className}`}>
    <circle cx="60" cy="40" r="26" fill="var(--planet, #a98bff)" />
    <path d="M40 30c10 4 30 4 40-4M38 46c14 4 34 2 44-6" stroke="#fff" strokeOpacity="0.25" strokeWidth="3" fill="none" />
    <ellipse cx="60" cy="42" rx="56" ry="12" fill="none" stroke="var(--planet-ring, #ffd27a)" strokeWidth="3" transform="rotate(-12 60 42)" />
    <path d="M86 30a26 26 0 0 1 0 22" stroke="var(--planet, #a98bff)" strokeWidth="8" fill="none" />
  </Svg>
);

export const Teddy = ({ className = "" }) => (
  <Svg viewBox="0 0 100 110" className={`teddy ${className}`}>
    <g fill="var(--teddy, #d9a77a)">
      <circle cx="26" cy="20" r="11" />
      <circle cx="74" cy="20" r="11" />
      <circle cx="50" cy="38" r="26" />
      <ellipse cx="50" cy="82" rx="28" ry="26" />
      <ellipse cx="20" cy="74" rx="9" ry="14" transform="rotate(30 20 74)" />
      <ellipse cx="80" cy="74" rx="9" ry="14" transform="rotate(-30 80 74)" />
      <ellipse cx="32" cy="104" rx="11" ry="7" />
      <ellipse cx="68" cy="104" rx="11" ry="7" />
    </g>
    <g fill="var(--teddy-light, #f3d9bf)">
      <circle cx="26" cy="20" r="5" />
      <circle cx="74" cy="20" r="5" />
      <ellipse cx="50" cy="48" rx="12" ry="9" />
      <ellipse cx="50" cy="86" rx="16" ry="15" />
    </g>
    <circle cx="40" cy="34" r="3" fill="#4a3426" />
    <circle cx="60" cy="34" r="3" fill="#4a3426" />
    <ellipse cx="50" cy="44" rx="4" ry="3" fill="#4a3426" />
    <path d="M45 51c3 3 7 3 10 0" stroke="#4a3426" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    <path d="M38 62l12 6 12-6-4 10H42Z" fill="var(--teddy-bow, #8fd3ff)" />
  </Svg>
);

// Generic caped hero: an original silhouette with a star emblem
export const CapedHero = ({ className = "" }) => (
  <Svg viewBox="0 0 120 140" className={`caped-hero ${className}`}>
    <path d="M40 40C20 70 14 110 22 136c18-8 34-10 38-12 4 2 20 4 38 12 8-26 2-66-18-96Z" fill="var(--hero-cape, #e63946)" />
    <path d="M60 4l6 3v10l-6 2-6-2V7Z" fill="var(--hero-suit, #1d4ed8)" />
    <circle cx="60" cy="22" r="13" fill="var(--hero-skin, #f2c9a0)" />
    <path d="M47 18h26v6H47Z" fill="var(--hero-mask, #1d4ed8)" />
    <path d="M42 40h36l6 46H36Z" fill="var(--hero-suit, #1d4ed8)" />
    <path d="M42 42L22 18l8-4 18 22ZM78 42l14 30-8 3-12-24Z" fill="var(--hero-suit, #1d4ed8)" />
    <circle cx="25" cy="14" r="6" fill="var(--hero-glove, #ffd60a)" />
    <path d="M60 50l4 8 9 1-7 6 2 9-8-5-8 5 2-9-7-6 9-1Z" fill="var(--hero-emblem, #ffd60a)" />
    <path d="M38 86h44l-4 44h-12l-6-30-6 30H42Z" fill="var(--hero-suit, #1d4ed8)" />
    <path d="M36 84h48v6H36Z" fill="var(--hero-glove, #ffd60a)" />
  </Svg>
);

export const Gamepad = ({ className = "" }) => (
  <Svg viewBox="0 0 120 70" className={`gamepad ${className}`}>
    <path d="M30 10h60c16 0 26 16 28 34 2 16-10 24-20 16l-12-10H34L22 60c-10 8-22 0-20-16C4 26 14 10 30 10Z" fill="var(--pad, #2b2d42)" />
    <path d="M28 26h8v8h8v8h-8v8h-8v-8h-8v-8h8Z" fill="var(--pad-dpad, #8d99ae)" />
    <circle cx="86" cy="30" r="5" fill="var(--pad-a, #ef476f)" />
    <circle cx="96" cy="40" r="5" fill="var(--pad-b, #06d6a0)" />
    <circle cx="76" cy="40" r="5" fill="var(--pad-c, #ffd166)" />
    <circle cx="86" cy="50" r="5" fill="var(--pad-d, #118ab2)" />
  </Svg>
);

const PIXEL_HEART = ["01100110", "11111111", "11111111", "11111111", "01111110", "00111100", "00011000"];
export const PixelHeart = ({ className = "" }) => (
  <Svg viewBox="0 0 8 7" className={`pixel-heart ${className}`} shapeRendering="crispEdges">
    {PIXEL_HEART.flatMap((row, y) =>
      [...row].map((cell, x) => (cell === "1" ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="var(--pixel, #ff4d8d)" /> : null)),
    )}
  </Svg>
);

export const Trophy = ({ className = "" }) => (
  <Svg viewBox="0 0 100 100" className={`trophy ${className}`}>
    <path d="M30 10h40v18c0 14-9 26-20 26S30 42 30 28Z" fill="var(--trophy, #ffd166)" />
    <path d="M30 16H16c0 14 8 20 16 22M70 16h14c0 14-8 20-16 22" fill="none" stroke="var(--trophy, #ffd166)" strokeWidth="5" />
    <rect x="44" y="54" width="12" height="16" fill="var(--trophy, #ffd166)" />
    <rect x="30" y="70" width="40" height="10" rx="2" fill="var(--trophy-base, #b07d2b)" />
    <path d="M50 20l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1Z" fill="#fff" opacity="0.85" />
  </Svg>
);

export const Rainbow = ({ className = "" }) => (
  <Svg viewBox="0 0 200 110" className={`rainbow ${className}`}>
    {["#ff9aa2", "#ffcf8a", "#fff3a6", "#b5ead7", "#a7d3ff", "#d5b8ff"].map((c, i) => (
      <path key={c} d={`M${20 + i * 9} 100a${80 - i * 9} ${80 - i * 9} 0 0 1 ${160 - i * 18} 0`} fill="none" stroke={c} strokeWidth="9" />
    ))}
    <Cloud x={8} y={78} />
    <Cloud x={150} y={78} />
  </Svg>
);

const Cloud = ({ x = 0, y = 0 }) => (
  <path transform={`translate(${x} ${y})`} d="M8 22a10 10 0 0 1 4-19 13 13 0 0 1 24 2 9 9 0 0 1 6 17Z" fill="#fff" />
);

export const CloudArt = ({ className = "" }) => (
  <Svg viewBox="0 0 50 26" className={`cloud ${className}`}>
    <Cloud />
  </Svg>
);

export const Star = ({ className = "", fill = "currentColor" }) => (
  <Svg viewBox="0 0 100 100" className={`star-art ${className}`}>
    <path d="M50 6l13 28 30 3-23 20 7 30-27-16-27 16 7-30L7 37l30-3Z" fill={fill} />
  </Svg>
);

export const Bolt = ({ className = "" }) => (
  <Svg viewBox="0 0 60 100" className={`bolt ${className}`}>
    <path d="M36 2L6 56h20l-6 42 34-58H34Z" fill="var(--bolt, #ffd60a)" stroke="#1d1d1d" strokeWidth="2" strokeLinejoin="round" />
  </Svg>
);

export const Bow = ({ className = "" }) => (
  <Svg viewBox="0 0 100 60" className={`bow ${className}`}>
    <path d="M50 30C36 8 10 6 12 24c1 12 22 12 38 6ZM50 30c14-22 40-24 38-6-1 12-22 12-38 6Z" fill="var(--bow, #ff6b9a)" />
    <path d="M50 30c-8 8-14 22-16 28l8-2 8-18 8 18 8 2c-2-6-8-20-16-28Z" fill="var(--bow-dark, #e04f80)" />
    <circle cx="50" cy="30" r="6" fill="var(--bow-dark, #e04f80)" />
  </Svg>
);

export const Glasses = ({ className = "" }) => (
  <Svg viewBox="0 0 100 100" className={`glasses ${className}`}>
    <g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <path d="M22 18h22l-3 26a8 8 0 0 1-16 0Z" transform="rotate(-12 33 40)" />
      <path d="M33 52v28M24 82h18" transform="rotate(-12 33 40)" />
      <path d="M56 18h22l-3 26a8 8 0 0 1-16 0Z" transform="rotate(12 67 40)" />
      <path d="M67 52v28M58 82h18" transform="rotate(12 67 40)" />
      <path d="M50 6v8M42 9l3 6M58 9l-3 6" />
    </g>
  </Svg>
);

export const Daisy = ({ className = "" }) => (
  <Svg viewBox="0 0 100 100" className={`daisy ${className}`}>
    {Array.from({ length: 10 }, (_, i) => (
      <ellipse key={i} cx="50" cy="24" rx="9" ry="20" fill="var(--petal, #fff)" stroke="var(--petal-line, #f1c6d4)" transform={`rotate(${i * 36} 50 50)`} />
    ))}
    <circle cx="50" cy="50" r="12" fill="var(--daisy-heart, #f7c35f)" />
  </Svg>
);

/* ---------- Function icons for party schedules ---------- */
const line = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };

export const CakeIcon = (p) => (
  <Svg {...p}>
    <g {...line}>
      <rect x="18" y="52" width="64" height="30" rx="4" fill="currentColor" fillOpacity="0.15" />
      <path d="M18 62c8 6 12-4 20 2s12-4 20 2 12-4 24-2" />
      <rect x="30" y="34" width="40" height="18" rx="3" />
      <path d="M40 34v-8M50 34v-8M60 34v-8" />
      <path d="M40 22c-2-3 0-5 0-7 0 2 2 4 0 7ZM50 22c-2-3 0-5 0-7 0 2 2 4 0 7ZM60 22c-2-3 0-5 0-7 0 2 2 4 0 7Z" fill="currentColor" />
      <path d="M12 86h76" />
    </g>
  </Svg>
);

export const GamesIcon = (p) => (
  <Svg {...p}>
    <g {...line}>
      <path d="M30 34h40c10 0 16 10 18 22 1 10-6 15-12 10l-8-7H32l-8 7c-6 5-13 0-12-10 2-12 8-22 18-22Z" fill="currentColor" fillOpacity="0.15" />
      <path d="M32 44v10M27 49h10" />
      <circle cx="66" cy="45" r="2.5" fill="currentColor" />
      <circle cx="72" cy="52" r="2.5" fill="currentColor" />
    </g>
  </Svg>
);

export const FoodIcon = (p) => (
  <Svg {...p}>
    <g {...line}>
      <circle cx="50" cy="54" r="24" fill="currentColor" fillOpacity="0.12" />
      <circle cx="50" cy="54" r="15" />
      <path d="M16 30v18a6 6 0 0 0 6 6v26M16 30v12M22 30v12M28 30v18a6 6 0 0 1-6 6" />
      <path d="M84 30c-6 4-8 14-6 24h6v26" />
    </g>
  </Svg>
);

export const MagicIcon = (p) => (
  <Svg {...p}>
    <g {...line}>
      <path d="M30 40h40l-6 40H36Z" fill="currentColor" fillOpacity="0.15" />
      <path d="M24 40h52" />
      <path d="M36 52h28" />
      <path d="M66 30l18-18" />
      <path d="M76 24l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1Z" fill="currentColor" />
      <path d="M20 22l1 3 3 1-3 1-1 3-1-3-3-1 3-1ZM84 46l1 2 2 1-2 1-1 2-1-2-2-1 2-1Z" fill="currentColor" />
    </g>
  </Svg>
);

export const BalloonIcon = (p) => (
  <Svg {...p}>
    <g {...line}>
      <path d="M50 12c-14 0-22 11-22 23 0 15 13 27 22 30 9-3 22-15 22-30 0-12-8-23-22-23Z" fill="currentColor" fillOpacity="0.15" />
      <path d="M46 65h8l-4 5Z" fill="currentColor" />
      <path d="M50 70c-6 8 6 12 0 20" />
    </g>
  </Svg>
);
