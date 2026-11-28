import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

// Small functional pieces the birthday designs place inside their own layouts.
// They carry behaviour and accessibility, not a look: each design styles them.

// Google map of the venue, loaded only when scrolled near
export function MapEmbed({ party, t, className = "party-map" }) {
  if (!party.mapEmbed) return null;
  return (
    <div className={className}>
      <iframe
        title={t("venue.mapTitle", { venue: party.venue })}
        src={party.mapEmbed}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

// "Get directions" (+ the customer's own map link when they gave one)
export function DirectionsButtons({ party, t, className = "sec-actions" }) {
  if (!party.directions) return null;
  return (
    <div className={className}>
      <a className="btn" href={party.directions} target="_blank" rel="noopener noreferrer">
        {t("venue.directions")} ↗
      </a>
      {party.mapUrl && (
        <a className="btn btn-ghost" href={party.mapUrl} target="_blank" rel="noopener noreferrer">
          {t("events.viewMap")}
        </a>
      )}
    </div>
  );
}

// A layer that drifts at its own speed while the page scrolls (layered parallax).
// `speed` is pixels of travel across the element's time on screen; still for reduced motion.
export function Parallax({ speed = 60, className = "", children, as = "div" }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-speed, speed]);
  const Tag = motion[as] ?? motion.div;
  return (
    <Tag ref={ref} className={className} style={{ y }} aria-hidden="true">
      {children}
    </Tag>
  );
}
