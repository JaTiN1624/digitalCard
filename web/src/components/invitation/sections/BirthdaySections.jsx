import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ScrollReveal } from "../motion/ScrollReveal.jsx";
import { useCelebrate } from "../motion/celebrationContext.js";
import { useReveal } from "../motion/useReveal.js";
import SectionHeading from "./SectionHeading.jsx";
import { Cake } from "../art/BirthdayArt.jsx";
import { birthdayAge, birthdayStage } from "../../../utils/invitation.js";

// Cake reveal: the cake rises in, candles light one by one (one per year, up to nine), and the
// guest can blow them out for a burst of confetti. Flames are a CSS flicker, not a simulation.
export function CakeSection({ invitation, t, ornament }) {
  const ref = useRef(null);
  const shown = useReveal(ref, 0.35);
  const [blown, setBlown] = useState(false);
  const celebrate = useCelebrate();
  const age = birthdayAge(invitation);

  const blow = () => {
    if (blown) return;
    setBlown(true);
    celebrate("burst", ref.current);
  };

  return (
    <section className="sec sec-cake">
      <SectionHeading eyebrow={t("bday.cake.eyebrow")} ornament={ornament} />
      <motion.div
        ref={ref}
        className={`cake-stage ${shown ? "is-shown" : ""}`}
        initial={{ opacity: 0, scale: 0.5, y: 40 }}
        animate={shown ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: "backOut" }}
      >
        <Cake candles={age ?? 3} lit={!blown} />
      </motion.div>
      <div className="sec-actions" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          {blown ? (
            <motion.p key="done" className="cake-done" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              {t("bday.cake.done")}
            </motion.p>
          ) : (
            <motion.button key="blow" type="button" className="btn" onClick={blow} exit={{ opacity: 0, scale: 0.8 }}>
              {t("bday.cake.blow")}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// "Let's celebrate!": a popper on demand, rate-limited so repeated taps can't pile up effects
export function CelebrateSection({ t }) {
  const ref = useRef(null);
  const [cheers, setCheers] = useState(0);
  const [cooling, setCooling] = useState(false);
  const celebrate = useCelebrate();

  const pop = () => {
    if (cooling) return;
    setCooling(true);
    setCheers((n) => n + 1);
    celebrate("burst", ref.current);
    window.setTimeout(() => setCooling(false), 1800);
  };

  return (
    <section className="sec sec-celebrate">
      <motion.button
        ref={ref}
        type="button"
        className="celebrate-btn"
        onClick={pop}
        aria-disabled={cooling}
        whileTap={{ scale: 0.92 }}
        animate={cooling ? { rotate: [0, -4, 4, 0] } : {}}
      >
        {t("bday.celebrate.button")}
      </motion.button>
      <p className="celebrate-message" aria-live="polite">
        <AnimatePresence mode="popLayout">
          {cheers > 0 && (
            <motion.span
              key={cheers}
              initial={{ opacity: 0, y: 14, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ type: "spring", stiffness: 300, damping: 16 }}
            >
              {t("bday.celebrate.message")}
            </motion.span>
          )}
        </AnimatePresence>
      </p>
    </section>
  );
}

export function DressCodeSection({ invitation, t, ornament }) {
  const { dressCode } = invitation.config;
  if (!dressCode) return null;
  return (
    <section className="sec sec-dresscode">
      <SectionHeading eyebrow={t("bday.dressCode.eyebrow")} title={t("bday.dressCode.title")} ornament={ornament} />
      <ScrollReveal as="p" className="dresscode-text" preset="zoom">
        {dressCode}
      </ScrollReveal>
    </section>
  );
}

// Call / WhatsApp the parents (children's parties) or the host (adults)
export function HostContactSection({ invitation, t }) {
  const { host, rsvpPhone } = invitation.config;
  const phone = typeof rsvpPhone === "string" ? rsvpPhone.replace(/[^\d+]/g, "") : "";
  if (!/^\+?\d{10,15}$/.test(phone)) return null;
  const forKids = ["FIRST", "KIDS"].includes(birthdayStage(birthdayAge(invitation)));
  const digits = phone.replace(/^\+/, "");

  return (
    <section className="sec sec-contact">
      <ScrollReveal className="contact-card" preset="rise">
        <p className="sec-eyebrow">{t("bday.contact.eyebrow")}</p>
        <h3 className="contact-title">{t(forKids ? "bday.contact.parents" : "bday.contact.host")}</h3>
        {host && <p className="contact-host">{host}</p>}
        <div className="sec-actions">
          <a className="btn" href={`tel:${phone}`}>
            {t("bday.contact.call")}
          </a>
          <a className="btn btn-whatsapp" href={`https://wa.me/${digits}`} target="_blank" rel="noopener noreferrer">
            {t("bday.contact.whatsapp")}
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}
