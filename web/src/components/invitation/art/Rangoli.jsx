import { motion } from "motion/react";

// A rangoli that draws itself: rings of petals traced stroke by stroke, then filled with colour.
// Original geometric design (lotus-petal rings around a dotted centre).

const ring = (count, r, petal) =>
  Array.from({ length: count }, (_, i) => ({ angle: (360 / count) * i, r, petal }));

const RINGS = [
  ...ring(8, 0, "M0 -14c6 -10 6 -22 0 -30 -6 8 -6 20 0 30Z"),
  ...ring(12, 0, "M0 -46c9 -8 12 -18 8 -28 -8 4 -12 14 -8 28Z"),
  ...ring(16, 0, "M0 -78c6 -6 7 -14 0 -22 -7 8 -6 16 0 22Z"),
];

const draw = (delay) => ({
  hidden: { pathLength: 0, fillOpacity: 0 },
  shown: {
    pathLength: 1,
    fillOpacity: 0.85,
    transition: { pathLength: { delay, duration: 1.1, ease: "easeInOut" }, fillOpacity: { delay: delay + 0.9, duration: 0.6 } },
  },
});

const COLORS = ["var(--rangoli-1, #e2502b)", "var(--rangoli-2, #f2b233)", "var(--rangoli-3, #2f8f6a)"];

export default function Rangoli({ className = "", onView = false }) {
  const trigger = onView
    ? { initial: "hidden", whileInView: "shown", viewport: { once: true, amount: 0.4 } }
    : { initial: "hidden", animate: "shown" };

  return (
    <motion.svg viewBox="-110 -110 220 220" className={`motif rangoli ${className}`} aria-hidden="true" {...trigger}>
      {[100, 64, 30].map((r, i) => (
        <motion.circle
          key={r}
          r={r}
          fill="none"
          stroke="var(--rangoli-line, #f6d48a)"
          strokeWidth="1.2"
          strokeDasharray={i === 0 ? "2 6" : undefined}
          variants={draw(i * 0.25)}
        />
      ))}
      {RINGS.map(({ angle, petal }, i) => {
        const band = i < 8 ? 0 : i < 20 ? 1 : 2;
        return (
          <motion.path
            key={i}
            d={petal}
            transform={`rotate(${angle})`}
            fill={COLORS[band]}
            stroke="var(--rangoli-line, #f6d48a)"
            strokeWidth="1"
            variants={draw(0.4 + band * 0.45 + (i % 8) * 0.03)}
          />
        );
      })}
      <motion.circle r="7" fill="var(--rangoli-2, #f2b233)" variants={draw(0.2)} />
    </motion.svg>
  );
}
