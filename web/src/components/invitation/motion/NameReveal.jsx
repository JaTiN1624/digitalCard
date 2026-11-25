import { useRef } from "react";
import { motion } from "motion/react";
import { useReveal } from "./useReveal.js";
import { isLatin } from "../../../utils/invitation.js";

// Couple names rising out of a mask. Latin names reveal letter by letter; Devanagari reveals
// word by word so conjuncts and vowel signs are never split. Screen readers get the plain text.

// clip-path values keep identical units (%) at both ends so Motion can interpolate them
const unit = {
  hidden: { y: "60%", opacity: 0, clipPath: "inset(-80% -80% 100% -80%)" },
  shown: {
    y: "0%",
    opacity: 1,
    clipPath: "inset(-80% -80% -80% -80%)",
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

function Masked({ text, step, delay }) {
  const parts = isLatin(text) ? Array.from(text) : text.split(/(\s+)/);
  return (
    <motion.span
      className="nr-line"
      aria-hidden="true"
      variants={{ shown: { transition: { staggerChildren: step, delayChildren: delay } } }}
    >
      {parts.map((part, i) =>
        /^\s+$/.test(part) ? (
          <span key={i}>{" "}</span>
        ) : (
          <span key={i} className="nr-mask">
            <motion.span className="nr-unit" variants={unit}>
              {part}
            </motion.span>
          </span>
        ),
      )}
    </motion.span>
  );
}

export default function NameReveal({
  groom,
  bride,
  fallback = "",
  as = "h1",
  className = "",
  shimmer = false,
  stacked = false,
  amp = "&",
  delay = 0,
  onView = false, // reveal when scrolled into view instead of on mount
}) {
  const Tag = motion[as] ?? motion.h1;
  const both = Boolean(groom && bride);
  const label = both ? `${groom} & ${bride}` : fallback;
  const step = both && isLatin(groom + bride) ? 0.045 : 0.12;
  const groomTime = both ? Array.from(groom).length * step : 0;

  const ref = useRef(null);
  const revealed = useReveal(ref, 0.4);
  const trigger = { ref, initial: "hidden", animate: !onView || revealed ? "shown" : "hidden" };

  return (
    <Tag
      className={`name-reveal ${stacked ? "is-stacked" : ""} ${shimmer ? "has-shimmer" : ""} ${className}`.trim()}
      aria-label={label}
      {...trigger}
    >
      {both ? (
        <>
          <Masked text={groom} step={step} delay={delay} />
          <motion.span
            className="nr-amp"
            aria-hidden="true"
            variants={{
              hidden: { opacity: 0, scale: 0.4, rotate: -20 },
              shown: {
                opacity: 1,
                scale: 1,
                rotate: 0,
                transition: { delay: delay + Math.min(groomTime, 1) + 0.15, duration: 0.8, ease: "backOut" },
              },
            }}
          >
            {amp}
          </motion.span>
          <Masked text={bride} step={step} delay={delay + Math.min(groomTime, 1) + 0.35} />
        </>
      ) : (
        <Masked text={label} step={0.04} delay={delay} />
      )}
    </Tag>
  );
}
