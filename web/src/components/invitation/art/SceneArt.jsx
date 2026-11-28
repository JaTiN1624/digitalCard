import { useId } from "react";

// Original scene illustrations for the birthday designs (jungle, space, disco, carnival,
// royal, garden). Inline SVG, tinted through CSS variables, decorative only (aria-hidden).
// No copyrighted characters, mascots or logos.

const Svg = ({ viewBox, className = "", children, ...rest }) => (
  <svg viewBox={viewBox} className={`motif ${className}`.trim()} aria-hidden="true" focusable="false" {...rest}>
    {children}
  </svg>
);

/* ---------------- Jungle ---------------- */
export const Giraffe = ({ className = "" }) => (
  <Svg viewBox="0 0 90 170" className={`giraffe ${className}`}>
    <g fill="var(--giraffe, #f2b84b)">
      <path d="M48 20c6-2 14 0 16 6s-2 10-8 11l-4 70H40l2-74c-6-2-8-8-4-12 3-1 6-1 10-1Z" />
      <ellipse cx="44" cy="118" rx="28" ry="18" />
      <rect x="22" y="126" width="7" height="40" rx="3" />
      <rect x="34" y="128" width="7" height="38" rx="3" />
      <rect x="50" y="128" width="7" height="38" rx="3" />
      <rect x="61" y="126" width="7" height="40" rx="3" />
    </g>
    <g fill="var(--giraffe-spot, #b5712a)">
      <circle cx="47" cy="50" r="3" />
      <circle cx="44" cy="68" r="3.5" />
      <circle cx="48" cy="86" r="3" />
      <circle cx="30" cy="114" r="5" />
      <circle cx="46" cy="110" r="4" />
      <circle cx="60" cy="118" r="5" />
      <circle cx="40" cy="126" r="3.5" />
    </g>
    <path d="M52 14v-8M58 15v-8" stroke="var(--giraffe-spot, #b5712a)" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="52" cy="5" r="2.6" fill="var(--giraffe-spot, #b5712a)" />
    <circle cx="58" cy="6" r="2.6" fill="var(--giraffe-spot, #b5712a)" />
    <circle cx="56" cy="24" r="2" fill="#3b2a1a" />
    <path d="M62 31c-2 2-5 2-7 1" stroke="#3b2a1a" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    <path d="M70 118c8 2 10 10 8 16" stroke="var(--giraffe, #f2b84b)" strokeWidth="3" fill="none" strokeLinecap="round" />
  </Svg>
);

export const Lion = ({ className = "" }) => (
  <Svg viewBox="0 0 100 100" className={`lion ${className}`}>
    <path
      d="M50 4l8 8 11-4 3 11 11 2-2 11 9 7-7 9 6 9-10 5 1 11-11 1-4 10-10-5-9 8-6-9-11 3-1-11-11-3 4-10-8-8 9-6-3-11 11-2 2-11 11 3Z"
      fill="var(--lion-mane, #c8661f)"
    />
    <circle cx="50" cy="52" r="27" fill="var(--lion, #f5b544)" />
    <circle cx="30" cy="32" r="7" fill="var(--lion, #f5b544)" />
    <circle cx="70" cy="32" r="7" fill="var(--lion, #f5b544)" />
    <circle cx="40" cy="48" r="3" fill="#3b2a1a" />
    <circle cx="60" cy="48" r="3" fill="#3b2a1a" />
    <ellipse cx="50" cy="64" rx="12" ry="9" fill="#fde6b8" />
    <path d="M45 58h10l-5 5Z" fill="#6b3a1d" />
    <path d="M50 63v4M50 67c-2 3-6 3-7 0M50 67c2 3 6 3 7 0" stroke="#6b3a1d" strokeWidth="1.4" fill="none" strokeLinecap="round" />
  </Svg>
);

export const Elephant = ({ className = "" }) => (
  <Svg viewBox="0 0 130 100" className={`elephant ${className}`}>
    <g fill="var(--elephant, #9fb3c8)">
      <ellipse cx="72" cy="58" rx="40" ry="28" />
      <rect x="44" y="70" width="12" height="28" rx="5" />
      <rect x="62" y="74" width="12" height="24" rx="5" />
      <rect x="84" y="74" width="12" height="24" rx="5" />
      <rect x="98" y="70" width="12" height="28" rx="5" />
      <circle cx="34" cy="42" r="22" />
      <path d="M18 50c-8 8-10 22-4 30 4 5 10 2 8-3-3-6-2-14 4-20Z" />
    </g>
    <path d="M40 22c16-6 30 4 28 22s-18 22-26 14Z" fill="var(--elephant-ear, #c6d3e1)" />
    <circle cx="28" cy="38" r="2.6" fill="#2c3440" />
    <path d="M18 54c-4 4-2 10 2 12" stroke="#fff" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.8" />
    <path d="M111 50c8 0 10 8 6 12" stroke="var(--elephant, #9fb3c8)" strokeWidth="3" fill="none" strokeLinecap="round" />
  </Svg>
);

export const Monstera = ({ className = "" }) => (
  <Svg viewBox="0 0 100 110" className={`monstera ${className}`}>
    <path
      d="M50 104C30 96 6 78 6 48 6 22 26 6 50 6s44 16 44 42c0 30-24 48-44 56Z"
      fill="var(--leaf, #2f8f5b)"
    />
    <g fill="var(--leaf-cut, var(--bg, #0f3b2a))">
      <path d="M50 40c-14-2-30-10-38-20l-4 8c10 10 26 16 42 16Z" />
      <path d="M50 58c-16 0-34-6-44-14l0 10c12 8 28 10 44 8Z" />
      <path d="M50 76c-14 2-28 0-38-6l4 9c10 4 22 4 34 1Z" />
      <path d="M50 40c14-2 30-10 38-20l4 8c-10 10-26 16-42 16Z" />
      <path d="M50 58c16 0 34-6 44-14v10c-12 8-28 10-44 8Z" />
      <path d="M50 76c14 2 28 0 38-6l-4 9c-10 4-22 4-34 1Z" />
      <ellipse cx="32" cy="32" rx="4" ry="6" />
      <ellipse cx="68" cy="32" rx="4" ry="6" />
    </g>
    <path d="M50 10v96" stroke="var(--leaf-vein, #8fd3a8)" strokeWidth="2" opacity="0.6" />
  </Svg>
);

export const Frond = ({ className = "" }) => (
  <Svg viewBox="0 0 60 160" className={`frond ${className}`}>
    <path d="M30 158C28 110 30 50 32 4" stroke="var(--leaf-dark, #1f6b42)" strokeWidth="3" fill="none" />
    {Array.from({ length: 9 }, (_, i) => {
      const y = 20 + i * 15;
      const w = 26 - Math.abs(4 - i) * 2;
      return (
        <g key={y} fill="var(--leaf-dark, #1f6b42)">
          <path d={`M31 ${y}c-8-2-${w - 6} 2-${w} 10 ${w / 2} 2 ${w - 8}-2 ${w} -6Z`} />
          <path d={`M31 ${y}c8-2 ${w - 6} 2 ${w} 10-${w / 2} 2-${w - 8}-2-${w}-6Z`} />
        </g>
      );
    })}
  </Svg>
);

export const Paw = ({ className = "" }) => (
  <Svg viewBox="0 0 40 40" className={`paw ${className}`}>
    <g fill="currentColor">
      <ellipse cx="20" cy="26" rx="10" ry="8" />
      <circle cx="9" cy="15" r="4" />
      <circle cx="16" cy="8" r="4" />
      <circle cx="25" cy="8" r="4" />
      <circle cx="32" cy="15" r="4" />
    </g>
  </Svg>
);

/* ---------------- Space ---------------- */
export const Astronaut = ({ className = "" }) => (
  <Svg viewBox="0 0 90 110" className={`astronaut ${className}`}>
    <rect x="22" y="44" width="46" height="40" rx="14" fill="var(--suit-pack, #c8d0e8)" />
    <rect x="26" y="48" width="38" height="44" rx="14" fill="var(--suit, #f4f6ff)" />
    <rect x="34" y="60" width="22" height="12" rx="3" fill="var(--suit-panel, #ff6b8b)" />
    <circle cx="40" cy="66" r="2" fill="#fff" />
    <circle cx="48" cy="66" r="2" fill="#ffd166" />
    <path d="M26 58C14 56 8 48 10 40" stroke="var(--suit, #f4f6ff)" strokeWidth="11" strokeLinecap="round" fill="none" />
    <path d="M64 58c10 4 16 0 18-8" stroke="var(--suit, #f4f6ff)" strokeWidth="11" strokeLinecap="round" fill="none" />
    <path d="M36 90v14M54 90v14" stroke="var(--suit, #f4f6ff)" strokeWidth="12" strokeLinecap="round" />
    <circle cx="45" cy="30" r="24" fill="var(--suit, #f4f6ff)" />
    <rect x="28" y="20" width="34" height="22" rx="11" fill="var(--visor, #24326b)" />
    <path d="M33 26c4-3 10-4 14-3" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.7" fill="none" />
  </Svg>
);

export const Moon = ({ className = "" }) => (
  <Svg viewBox="0 0 80 80" className={`moon ${className}`}>
    <path d="M52 6a34 34 0 1 0 22 50A28 28 0 0 1 52 6Z" fill="var(--moon, #fff3c4)" />
    <circle cx="30" cy="40" r="5" fill="#000" opacity="0.08" />
    <circle cx="42" cy="58" r="3.5" fill="#000" opacity="0.08" />
  </Svg>
);

/* ---------------- Disco ---------------- */
export function DiscoBall({ className = "" }) {
  const clip = `disco-${useId().replace(/:/g, "")}`;
  const tiles = [];
  for (let row = 0; row < 9; row += 1) {
    for (let col = 0; col < 9; col += 1) {
      tiles.push(
        <rect
          key={`${row}-${col}`}
          x={14 + col * 8}
          y={28 + row * 8}
          width="7.2"
          height="7.2"
          fill={(row * 7 + col * 3) % 5 === 0 ? "#ffffff" : (row + col) % 3 === 0 ? "var(--ball-b, #c9b6ff)" : "var(--ball-a, #9aa3c8)"}
          opacity={0.55 + (((row * 3 + col * 5) % 4) * 0.15)}
        />,
      );
    }
  }
  return (
    <Svg viewBox="0 0 100 110" className={`disco-ball ${className}`}>
      <path d="M50 0v26" stroke="currentColor" strokeWidth="1.5" />
      <defs>
        <clipPath id={clip}>
          <circle cx="50" cy="64" r="36" />
        </clipPath>
      </defs>
      <circle cx="50" cy="64" r="36" fill="var(--ball-a, #9aa3c8)" />
      <g clipPath={`url(#${clip})`}>{tiles}</g>
      <circle cx="38" cy="50" r="7" fill="#fff" opacity="0.7" />
    </Svg>
  );
}

export const Vinyl = ({ className = "" }) => (
  <Svg viewBox="0 0 100 100" className={`vinyl ${className}`}>
    <circle cx="50" cy="50" r="48" fill="#111" />
    {[40, 34, 28].map((r) => (
      <circle key={r} cx="50" cy="50" r={r} fill="none" stroke="#2c2c2c" strokeWidth="1" />
    ))}
    <circle cx="50" cy="50" r="16" fill="var(--vinyl-label, #ff4fa3)" />
    <circle cx="50" cy="50" r="2.5" fill="#111" />
    <path d="M22 26a40 40 0 0 1 20-12" stroke="#fff" strokeOpacity="0.25" strokeWidth="3" fill="none" strokeLinecap="round" />
  </Svg>
);

/* ---------------- Garden ---------------- */
// Layered petals with soft transparency for a watercolour feel
export const Bloom = ({ className = "", petals = 8 }) => (
  <Svg viewBox="0 0 100 100" className={`bloom ${className}`}>
    <g className="bloom-outer">
      {Array.from({ length: petals }, (_, i) => (
        <ellipse key={i} cx="50" cy="26" rx="15" ry="24" fill="var(--petal-a, #f3b6c3)" opacity="0.75" transform={`rotate(${(360 / petals) * i} 50 50)`} />
      ))}
    </g>
    <g className="bloom-inner">
      {Array.from({ length: petals }, (_, i) => (
        <ellipse key={i} cx="50" cy="34" rx="10" ry="16" fill="var(--petal-b, #e98aa0)" opacity="0.8" transform={`rotate(${(360 / petals) * i + 22} 50 50)`} />
      ))}
    </g>
    <circle cx="50" cy="50" r="9" fill="var(--petal-c, #f7d27c)" />
    <circle cx="47" cy="47" r="3" fill="#fff" opacity="0.6" />
  </Svg>
);

export const Sprig = ({ className = "", style }) => (
  <Svg viewBox="0 0 60 140" className={`sprig ${className}`} style={style}>
    <path d="M30 138C26 100 34 50 30 4" stroke="var(--stem, #6f9b6b)" strokeWidth="2" fill="none" />
    {[18, 38, 58, 78, 98].map((y, i) => (
      <g key={y} fill="var(--sage, #9cc19a)" opacity="0.85">
        <ellipse cx={i % 2 ? 42 : 18} cy={y} rx="12" ry="6" transform={`rotate(${i % 2 ? -30 : 30} ${i % 2 ? 42 : 18} ${y})`} />
      </g>
    ))}
  </Svg>
);

/* ---------------- Carnival ---------------- */
export const Tent = ({ className = "" }) => (
  <Svg viewBox="0 0 160 120" className={`tent ${className}`}>
    <path d="M80 4v14" stroke="currentColor" strokeWidth="2" />
    <path d="M80 4h18l-5 5 5 5H80Z" fill="var(--tent-flag, #ffd23f)" />
    <path d="M80 18L10 70h140Z" fill="var(--tent-a, #e63946)" />
    <path d="M80 18L38 70h18ZM80 18l24 52h18Z" fill="var(--tent-b, #fff6e8)" />
    <path d="M80 18L66 70h28Z" fill="var(--tent-b, #fff6e8)" opacity="0" />
    <rect x="18" y="70" width="124" height="46" fill="var(--tent-b, #fff6e8)" />
    {[18, 50, 82, 114].map((x) => (
      <rect key={x} x={x} y="70" width="16" height="46" fill="var(--tent-a, #e63946)" />
    ))}
    <path d="M10 70c10 10 20 10 28 0 9 10 19 10 28 0 9 10 19 10 28 0 9 10 19 10 28 0 9 10 19 10 28 0" fill="var(--tent-a, #e63946)" />
    <path d="M64 116V92a16 16 0 0 1 32 0v24Z" fill="var(--tent-door, #3d1d4a)" />
  </Svg>
);

/* ---------------- Royal ---------------- */
export const Crest = ({ className = "", initial = "" }) => (
  <Svg viewBox="0 0 140 150" className={`crest ${className}`}>
    <g fill="none" stroke="var(--crest-gold, #d8b25a)" strokeWidth="2.2" strokeLinecap="round">
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <ellipse cx={26 + i * 3} cy={120 - i * 18} rx="5" ry="10" transform={`rotate(${-40 + i * 6} ${26 + i * 3} ${120 - i * 18})`} />
          <ellipse cx={114 - i * 3} cy={120 - i * 18} rx="5" ry="10" transform={`rotate(${40 - i * 6} ${114 - i * 3} ${120 - i * 18})`} />
        </g>
      ))}
      <path d="M34 138c-10-30-10-60 6-90M106 138c10-30 10-60-6-90" />
    </g>
    <path d="M44 40h52v46c0 22-14 36-26 42-12-6-26-20-26-42Z" fill="var(--crest-field, #1d3a8a)" stroke="var(--crest-gold, #d8b25a)" strokeWidth="3" />
    <path d="M50 46h40v40c0 18-10 28-20 33-10-5-20-15-20-33Z" fill="none" stroke="var(--crest-gold, #d8b25a)" strokeWidth="1" opacity="0.7" />
    <path d="M46 34l6-16 9 10 9-16 9 16 9-10 6 16Z" fill="var(--crest-gold, #d8b25a)" />
    <circle cx="70" cy="12" r="3" fill="var(--crest-gold, #d8b25a)" />
    {initial && (
      <text x="70" y="90" textAnchor="middle" fontSize="34" fontFamily="var(--display, serif)" fill="var(--crest-gold, #d8b25a)">
        {initial}
      </text>
    )}
  </Svg>
);

export const WaxSeal = ({ className = "", initial = "" }) => (
  <Svg viewBox="0 0 100 100" className={`wax-seal ${className}`}>
    <path
      d="M50 4c6 0 8 5 13 6s10-2 14 2 1 9 4 13 8 6 8 12-5 7-5 13 4 9 2 14-8 4-11 8-3 9-8 11-9-2-14-1-8 5-13 5-8-5-13-6-10 2-14-2-1-9-4-13-8-6-8-12 5-7 5-13-4-9-2-14 8-4 11-8 3-9 8-11 9 2 14 1 8-5 13-5Z"
      fill="var(--wax, #a3202f)"
    />
    <circle cx="50" cy="50" r="30" fill="none" stroke="#000" strokeOpacity="0.18" strokeWidth="3" />
    <circle cx="50" cy="50" r="24" fill="none" stroke="#fff" strokeOpacity="0.18" strokeWidth="1.5" />
    {initial && (
      <text x="50" y="60" textAnchor="middle" fontSize="28" fontFamily="var(--display, serif)" fill="#fff" fillOpacity="0.85">
        {initial}
      </text>
    )}
  </Svg>
);

// One half of a wrought-iron gate; mirror it with CSS for the other side
export const GateHalf = ({ className = "" }) => (
  <Svg viewBox="0 0 100 220" className={`gate-half ${className}`} preserveAspectRatio="none">
    <g fill="none" stroke="var(--gate, #c9a24f)" strokeWidth="3" strokeLinecap="round">
      <path d="M4 218V40C40 40 70 26 96 4v214" />
      <path d="M4 200h92M4 120h92" />
      {[20, 36, 52, 68, 84].map((x) => (
        <path key={x} d={`M${x} 218V${36 - (x - 4) * 0.25}`} />
      ))}
      {[20, 52, 84].map((x) => (
        <path key={x} d={`M${x - 10} 160c0-14 20-14 20 0s-20 14-20 0Z`} />
      ))}
      <path d="M12 96c8-12 22-12 30 0M58 96c8-12 22-12 30 0" />
    </g>
  </Svg>
);

/* ---------------- Pixel ---------------- */
const pixels = (rows, colors) =>
  rows.flatMap((row, y) =>
    Array.from(row).map((c, x) => (c === "." ? null : <rect key={`${x}-${y}`} x={x} y={y} width="1.02" height="1.02" fill={colors[c]} />)),
  );

export const PixelCoin = ({ className = "" }) => (
  <Svg viewBox="0 0 8 8" className={`pixel-coin ${className}`} shapeRendering="crispEdges">
    {pixels(["..aaaa..", ".abbbba.", "abbcbbba", "abbcbbba", "abbcbbba", "abbcbbba", ".abbbba.", "..aaaa.."], {
      a: "#b8860b",
      b: "#ffd23f",
      c: "#fff6c2",
    })}
  </Svg>
);

export const PixelStar = ({ className = "" }) => (
  <Svg viewBox="0 0 9 9" className={`pixel-star ${className}`} shapeRendering="crispEdges">
    {pixels(["....a....", "...aba...", "aaaabaaaa", ".abbbbba.", "..abbba..", ".abbabba.", ".aba.aba.", "aa.....aa", "........."], {
      a: "#ff9f1c",
      b: "#ffe66d",
    })}
  </Svg>
);
