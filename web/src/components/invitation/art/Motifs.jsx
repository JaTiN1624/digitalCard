import { useId } from "react";
import { BalloonIcon, CakeIcon, FoodIcon, GamesIcon, MagicIcon } from "./BirthdayArt.jsx";

// Original line-art motifs drawn as inline SVG. Decorative only (aria-hidden), coloured with
// currentColor so each theme tints them through CSS. Lightweight: no image downloads.

const Svg = ({ viewBox = "0 0 100 100", className = "", children, strokeWidth = 1.6, ...rest }) => (
  <svg
    viewBox={viewBox}
    className={`motif ${className}`.trim()}
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    {children}
  </svg>
);

export const Lotus = (props) => (
  <Svg {...props}>
    <path d="M50 18c9 13 9 30 0 46-9-16-9-33 0-46Z" />
    <path d="M50 64c-11-6-21-17-23-33 11 4 19 13 23 33Z" />
    <path d="M50 64c11-6 21-17 23-33-11 4-19 13-23 33Z" />
    <path d="M50 66c-15 0-31-6-40-19 15 0 30 6 40 19Z" />
    <path d="M50 66c15 0 31-6 40-19-15 0-30 6-40 19Z" />
    <path d="M28 76c14-6 30-6 44 0" />
    <path d="M38 83c8-3 16-3 24 0" />
  </Svg>
);

// Stylised peacock feather (a classic Paithani motif)
export const PeacockFeather = (props) => {
  const barbs = Array.from({ length: 9 }, (_, i) => 50 + i * 5);
  return (
    <Svg viewBox="0 0 100 120" {...props}>
      <path d="M50 116c-1-26 0-54 0-76" />
      {barbs.map((y, i) => (
        <g key={y} opacity={1 - i * 0.07}>
          <path d={`M50 ${y}c-8-3-15-9-${20 - i}-${17 - i}`} />
          <path d={`M50 ${y}c8-3 15-9 ${20 - i}-${17 - i}`} />
        </g>
      ))}
      <ellipse cx="50" cy="30" rx="17" ry="25" />
      <ellipse cx="50" cy="32" rx="11" ry="16" fill="currentColor" fillOpacity="0.15" />
      <ellipse cx="50" cy="34" rx="6" ry="8.5" fill="currentColor" fillOpacity="0.6" />
    </Svg>
  );
};

// Clay lamp with a flickering flame (flame/glow animate in CSS: .diya-flame, .diya-glow)
export function Diya({ className = "", ...props }) {
  const glowId = useId();
  return (
  <Svg viewBox="0 0 100 100" className={`diya ${className}`} {...props}>
    <defs>
      <radialGradient id={glowId}>
        <stop offset="0%" stopColor="#ffd36b" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#ffb300" stopOpacity="0" />
      </radialGradient>
    </defs>
    <circle className="diya-glow" cx="50" cy="42" r="26" fill={`url(#${glowId})`} stroke="none" />
    <path
      className="diya-flame"
      d="M50 58c-8-8-6-20 0-34 6 14 8 26 0 34Z"
      fill="#ffb84d"
      stroke="#f08a00"
      strokeWidth="1"
    />
    <path d="M12 60c10 22 66 22 76 0-24 6-52 6-76 0Z" fill="currentColor" fillOpacity="0.9" />
    <path d="M86 60l9-6" />
    <path d="M30 76h40" />
  </Svg>
  );
}

// Auspicious kalash (pot) with mango leaves and coconut
export const Kalash = (props) => (
  <Svg viewBox="0 0 100 110" {...props}>
    <ellipse cx="50" cy="22" rx="11" ry="13" fill="currentColor" fillOpacity="0.15" />
    <path d="M38 34c-10-4-18-2-24 4 8 2 16 2 24-4Z" />
    <path d="M62 34c10-4 18-2 24 4-8 2-16 2-24-4Z" />
    <path d="M42 36c-6-6-13-7-19-4 5 4 12 6 19 4Z" />
    <path d="M58 36c6-6 13-7 19-4-5 4-12 6-19 4Z" />
    <path d="M36 38h28" />
    <path d="M40 42c-18 8-22 36-6 50h32c16-14 12-42-6-50Z" />
    <path d="M32 62h36" />
    <path d="M30 70h40" strokeDasharray="2 4" />
    <path d="M42 100h16" />
    <path d="M38 92l-2 8M62 92l2 8" />
  </Svg>
);

export const Rings = (props) => (
  <Svg viewBox="0 0 100 100" {...props}>
    <circle cx="40" cy="62" r="22" />
    <circle cx="40" cy="62" r="18" strokeOpacity="0.5" />
    <circle cx="62" cy="62" r="22" />
    <circle cx="62" cy="62" r="18" strokeOpacity="0.5" />
    <path d="M30 34l6-9h10l6 9-11 11Z" fill="currentColor" fillOpacity="0.2" />
    <path d="M30 34h22M36 25l5 9 5-9M41 34v11" />
  </Svg>
);

export const Crown = (props) => (
  <Svg viewBox="0 0 100 100" {...props}>
    <path d="M18 72l-4-38 20 17 16-27 16 27 20-17-4 38Z" fill="currentColor" fillOpacity="0.12" />
    <path d="M18 80h64" />
    <circle cx="14" cy="32" r="3.5" />
    <circle cx="50" cy="21" r="3.5" />
    <circle cx="86" cy="32" r="3.5" />
    <path d="M44 62l6-8 6 8-6 6Z" fill="currentColor" />
    <path d="M28 66h4M68 66h4" />
  </Svg>
);

// Kairi (paisley) used by mehendi and Paithani borders
export const Paisley = (props) => (
  <Svg viewBox="0 0 100 100" {...props}>
    <path d="M62 14c22 12 24 46 2 64-16 14-42 8-42-14 0-16 18-22 28-14 6 6 2 16-6 14" />
    <path d="M60 26c12 10 12 32-2 44" strokeOpacity="0.6" />
    <circle cx="44" cy="60" r="3" fill="currentColor" />
    <circle cx="56" cy="44" r="2" fill="currentColor" />
    <circle cx="58" cy="56" r="2" fill="currentColor" />
  </Svg>
);

export const Marigold = (props) => {
  const petals = Array.from({ length: 12 }, (_, i) => i * 30);
  return (
    <Svg viewBox="0 0 100 100" strokeWidth={1.2} {...props}>
      {petals.map((a) => (
        <ellipse key={a} cx="50" cy="27" rx="9" ry="16" transform={`rotate(${a} 50 50)`} fill="currentColor" fillOpacity="0.25" />
      ))}
      <circle cx="50" cy="50" r="12" fill="currentColor" fillOpacity="0.5" />
    </Svg>
  );
};

// Rosette used as a wax seal
export const Rosette = (props) => {
  const petals = Array.from({ length: 8 }, (_, i) => i * 45);
  return (
    <Svg viewBox="0 0 100 100" {...props}>
      {petals.map((a) => (
        <path key={a} d="M50 50c-6-10-6-22 0-30 6 8 6 20 0 30Z" transform={`rotate(${a} 50 50)`} />
      ))}
      <circle cx="50" cy="50" r="6" fill="currentColor" />
    </Svg>
  );
};

// Hanging toran: mango leaves and marigold strings. Fixed festive colours.
export const Toran = ({ className = "", count = 9 }) => {
  const step = 400 / count;
  return (
    <svg viewBox="0 0 400 90" className={`motif toran ${className}`} aria-hidden="true" preserveAspectRatio="none">
      <path d="M0 8q200 18 400 0" stroke="#c9861a" strokeWidth="3" fill="none" />
      {Array.from({ length: count }, (_, i) => {
        const x = step * i + step / 2;
        const y = 8 + 18 * Math.sin((Math.PI * x) / 400) * 0.5;
        return i % 2 ? (
          <path key={i} d={`M${x - 9} ${y}q9 34 18 0z`} fill="#3f7d3a" stroke="#2c5c28" strokeWidth="1" />
        ) : (
          <g key={i}>
            <path d={`M${x} ${y}v52`} stroke="#c9861a" strokeWidth="1.2" />
            {[14, 26, 38, 50].map((dy, j) => (
              <circle key={dy} cx={x} cy={y + dy} r="6" fill={j % 2 ? "#f4a91e" : "#ec7a10"} />
            ))}
          </g>
        );
      })}
    </svg>
  );
};

// Thin ornamental divider (line, diamond, scrolls)
export const Divider = ({ className = "" }) => (
  <svg viewBox="0 0 240 24" className={`motif divider ${className}`} fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
    <path d="M0 12h86M154 12h86" />
    <path d="M86 12c6-8 14-8 18 0-4 8-12 8-18 0ZM154 12c-6-8-14-8-18 0 4 8 12 8 18 0Z" />
    <path d="M120 3l9 9-9 9-9-9Z" fill="currentColor" fillOpacity="0.25" />
    <circle cx="120" cy="12" r="2" fill="currentColor" />
  </svg>
);

// Ornate corner for frames; rotate with CSS for the other corners
export const Corner = ({ className = "" }) => (
  <svg viewBox="0 0 60 60" className={`motif corner ${className}`} fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
    <path d="M2 58V14c0-7 5-12 12-12h44" />
    <path d="M8 58V20c0-7 5-12 12-12h38" strokeOpacity="0.5" />
    <path d="M14 22c0-5 3-8 8-8 0 5-3 8-8 8Z" fill="currentColor" fillOpacity="0.3" />
    <circle cx="26" cy="26" r="2" fill="currentColor" />
  </svg>
);

/* ---------- Function icons ---------- */

const HaldiIcon = (p) => (
  <Svg {...p}>
    <path d="M18 50h64c-2 20-16 32-32 32S20 70 18 50Z" fill="currentColor" fillOpacity="0.15" />
    <path d="M14 50h72" />
    <circle cx="40" cy="42" r="5" fill="currentColor" fillOpacity="0.4" />
    <circle cx="54" cy="38" r="6" fill="currentColor" fillOpacity="0.4" />
    <circle cx="64" cy="44" r="4" fill="currentColor" fillOpacity="0.4" />
    <path d="M38 88h24" />
  </Svg>
);

const SangeetIcon = (p) => (
  <Svg {...p}>
    <path d="M34 70V24l40-8v46" />
    <ellipse cx="26" cy="70" rx="9" ry="7" fill="currentColor" fillOpacity="0.3" />
    <ellipse cx="66" cy="62" rx="9" ry="7" fill="currentColor" fillOpacity="0.3" />
    <path d="M34 34l40-8" />
  </Svg>
);

const CocktailIcon = (p) => (
  <Svg {...p}>
    <path d="M18 22h28L32 46Z" fill="currentColor" fillOpacity="0.15" />
    <path d="M32 46v26M24 74h16" />
    <path d="M54 30h28L68 54Z" fill="currentColor" fillOpacity="0.15" transform="rotate(12 68 42)" />
    <path d="M70 54l-4 24M58 80h16" />
    <path d="M48 14l3-6M52 18l6-3M44 12l-1-6" />
  </Svg>
);

const MandapIcon = (p) => (
  <Svg {...p}>
    <path d="M14 36c10-18 62-18 72 0Z" fill="currentColor" fillOpacity="0.15" />
    <path d="M50 14v-6" />
    <path d="M18 36v48M82 36v48M36 36v48M64 36v48" />
    <path d="M10 86h80" />
    <path d="M18 46q16 10 18 0M64 46q2 10 18 0" />
  </Svg>
);

const ReceptionIcon = (p) => (
  <Svg {...p}>
    <path d="M50 10v14" />
    <path d="M24 30h52l-6 14H30Z" fill="currentColor" fillOpacity="0.15" />
    <path d="M30 44l-4 16M50 44v20M70 44l4 16" />
    <circle cx="26" cy="64" r="4" />
    <circle cx="50" cy="68" r="4" />
    <circle cx="74" cy="64" r="4" />
    <path d="M40 84h20" />
  </Svg>
);

const BaraatIcon = (p) => (
  <Svg {...p}>
    <ellipse cx="50" cy="52" rx="30" ry="18" fill="currentColor" fillOpacity="0.15" />
    <path d="M20 52v10c0 10 13 18 30 18s30-8 30-18V52" />
    <path d="M28 40l-8-12M72 40l8-12" />
    <circle cx="18" cy="26" r="4" />
    <circle cx="82" cy="26" r="4" />
  </Svg>
);

const FUNCTION_ICONS = {
  haldi: HaldiIcon,
  mehendi: Paisley,
  sangeet: SangeetIcon,
  cocktail: CocktailIcon,
  engagement: Rings,
  reception: ReceptionIcon,
  puja: Diya,
  baraat: BaraatIcon,
  wedding: MandapIcon,
  celebration: Marigold,
  cake: CakeIcon,
  games: GamesIcon,
  food: FoodIcon,
  magic: MagicIcon,
  music: SangeetIcon,
  balloon: BalloonIcon,
};

export function FunctionIcon({ kind, ...props }) {
  const Icon = FUNCTION_ICONS[kind] ?? Marigold;
  return <Icon {...props} />;
}

/* ---------- Travel ---------- */

export const Plane = (props) => (
  <Svg {...props}>
    <path d="M12 54l76-30-24 58-14-20-18 10 4-16Z" fill="currentColor" fillOpacity="0.15" />
    <path d="M50 62l38-38M36 56l14 6" />
  </Svg>
);

export const Pin = (props) => (
  <Svg {...props}>
    <path d="M50 90S22 60 22 40a28 28 0 0 1 56 0c0 20-28 50-28 50Z" fill="currentColor" fillOpacity="0.12" />
    <circle cx="50" cy="40" r="10" />
  </Svg>
);

export const Palm = (props) => (
  <Svg {...props}>
    <path d="M52 92c2-24 0-46-6-62" />
    <path d="M46 30c-10-8-24-8-32 0 12-2 22 0 32 0Z" fill="currentColor" fillOpacity="0.2" />
    <path d="M46 30c4-12 16-18 28-16-10 4-18 10-28 16Z" fill="currentColor" fillOpacity="0.2" />
    <path d="M46 30c12-4 26 0 34 10-12-4-24-6-34-10Z" fill="currentColor" fillOpacity="0.2" />
    <path d="M46 30c-4-10-14-16-24-14 8 4 16 8 24 14Z" fill="currentColor" fillOpacity="0.2" />
    <path d="M10 92c20-6 60-6 80 0" />
  </Svg>
);
