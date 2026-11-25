import { useEffect, useRef, useState } from "react";
import { animate, motion, useReducedMotion } from "motion/react";
import { useReveal } from "../motion/useReveal.js";
import { useCelebrate } from "../motion/celebrationContext.js";
import { formatNumber } from "../../../utils/format.js";

// The age counts up from zero when it scrolls into view, then pops with confetti (once).
// variant "level" shows it as a game level-up with an XP bar.
export default function AgeReveal({ age, language, t, variant = "count" }) {
  const ref = useRef(null);
  const shown = useReveal(ref, 0.5);
  const reduced = useReducedMotion();
  const celebrate = useCelebrate();
  const [value, setValue] = useState(0);
  const [done, setDone] = useState(false);
  const fired = useRef(false);

  useEffect(() => {
    if (!shown || fired.current) return;
    fired.current = true;
    const finish = () => {
      setValue(age);
      setDone(true);
      celebrate("burst", ref.current);
    };
    if (reduced) {
      finish();
      return;
    }
    const controls = animate(0, age, {
      duration: Math.min(0.6 + age * 0.05, 2),
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.round(v)),
      onComplete: finish,
    });
    return () => controls.stop();
  }, [shown, age, reduced, celebrate]);

  const unit = t(age === 1 ? "bday.year" : "bday.years");

  return (
    <div ref={ref} className={`age-reveal age-${variant} ${done ? "is-done" : ""}`} aria-label={`${age} ${unit}`}>
      {variant === "level" && <span className="age-level-label">{t("bday.level")}</span>}
      <motion.span
        className="age-number"
        aria-hidden="true"
        animate={done ? { scale: [1, 1.25, 1] } : { scale: 1 }}
        transition={{ duration: 0.5, ease: "backOut" }}
      >
        {formatNumber(value, language)}
      </motion.span>
      {variant === "level" ? (
        <>
          <span className="age-xp" aria-hidden="true">
            <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: shown ? 1 : 0 }} transition={{ duration: 1.6, ease: "easeOut" }} />
          </span>
          <motion.span
            className="age-badge"
            initial={{ scale: 0, rotate: -15 }}
            animate={done ? { scale: 1, rotate: 0 } : { scale: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 12 }}
          >
            {t("bday.levelUp")}
          </motion.span>
        </>
      ) : (
        <span className="age-unit" aria-hidden="true">
          {unit}
        </span>
      )}
    </div>
  );
}
