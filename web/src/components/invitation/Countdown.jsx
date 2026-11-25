import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ScrollReveal } from "./motion/ScrollReveal.jsx";
import { formatNumber } from "../../utils/format.js";

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

// Each digit rolls up when it changes; unchanged digits stay still.
function RollingNumber({ value, language }) {
  const text = formatNumber(value, language).padStart(2, formatNumber(0, language));
  return (
    <span className="countdown-value" aria-hidden="true">
      {Array.from(text).map((digit, i) => (
        <span key={i} className="countdown-digit">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={digit}
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {digit}
            </motion.span>
          </AnimatePresence>
        </span>
      ))}
    </span>
  );
}

export default function Countdown({ target, language, t, showTitle = true }) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), SECOND);
    return () => clearInterval(id);
  }, []);

  if (!target) return null;
  const diff = new Date(target).getTime() - now;

  if (diff <= -DAY) {
    return <ScrollReveal as="p" className="countdown-note">{t("countdown.past")}</ScrollReveal>;
  }
  if (diff <= 0) {
    return <ScrollReveal as="p" className="countdown-note">{t("countdown.today")}</ScrollReveal>;
  }

  const units = [
    { key: "days", value: Math.floor(diff / DAY) },
    { key: "hours", value: Math.floor((diff % DAY) / HOUR) },
    { key: "minutes", value: Math.floor((diff % HOUR) / MINUTE) },
    { key: "seconds", value: Math.floor((diff % MINUTE) / SECOND) },
  ];
  const summary = units.map((u) => `${formatNumber(u.value, language)} ${t(`countdown.${u.key}`)}`).join(", ");

  return (
    <ScrollReveal as="section" className="countdown" preset="zoom">
      {showTitle && <h2>{t("countdown.title")}</h2>}
      {/* Announce once per visit, not every second */}
      <p className="sr-only">{summary}</p>
      <div className="countdown-units">
        {units.map((u) => (
          <div key={u.key} className={`countdown-unit cu-${u.key}`}>
            <RollingNumber value={u.value} language={language} />
            <span className="countdown-label">{t(`countdown.${u.key}`)}</span>
          </div>
        ))}
      </div>
    </ScrollReveal>
  );
}
