import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import TemplateShell from "../components/invitation/TemplateShell.jsx";
import Hero from "../components/invitation/Hero.jsx";
import InvitationSections from "../components/invitation/InvitationSections.jsx";
import OpeningCover from "../components/invitation/motion/OpeningCover.jsx";
import Unveil from "../components/invitation/motion/Unveil.jsx";
import Particles from "../components/invitation/motion/Particles.jsx";
import { useOpened } from "../components/invitation/motion/useOpened.js";
import { Palm } from "../components/invitation/art/Motifs.jsx";
import { safeMediaUrl, sortedEvents } from "../utils/invitation.js";
import { formatShortDate } from "../utils/format.js";
import "./destination.css";

const CONFETTI = ["#1f6f78", "#f2c58b", "#f7efe2", "#e07a5f"];
const KINDS = ["bokeh"];
const EASE = [0.22, 1, 0.36, 1];

function DestinationHero({ invitation, t }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["0%", "30%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const photo = safeMediaUrl(invitation.config.coverImage);
  const events = sortedEvents(invitation);
  const first = events[0]?.date ?? invitation.eventDate;
  const last = events.at(-1)?.date ?? invitation.eventDate;
  const from = formatShortDate(first, invitation.language);
  const to = formatShortDate(last, invitation.language);
  const place = invitation.config.venue ?? invitation.title;

  return (
    <section ref={ref} className="dest-hero">
      <motion.div className="dest-bg" style={{ y }}>
        {photo && <img src={photo} alt="" decoding="async" fetchPriority="high" />}
      </motion.div>
      <div className="dest-shade" />
      <motion.div className="dest-titles" style={{ opacity: fade }}>
        <motion.p
          className="dest-kicker"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1, ease: EASE }}
        >
          {t("destination.kicker")}
        </motion.p>
        <motion.h1
          className="dest-place"
          initial={{ opacity: 0, letterSpacing: "0.5em", filter: "blur(6px)" }}
          animate={{ opacity: 1, letterSpacing: "0.06em", filter: "blur(0px)" }}
          transition={{ delay: 0.6, duration: 1.8, ease: EASE }}
        >
          {place}
        </motion.h1>
        {from && (
          <motion.p
            className="dest-dates"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 1 }}
          >
            {from === to ? from : `${from} — ${to}`}
          </motion.p>
        )}
      </motion.div>
      <div className="scroll-cue" aria-hidden="true">
        <span className="scroll-cue-line" />
      </div>
    </section>
  );
}

// Destination wedding: a boarding pass tears open onto a full-screen destination photograph
// with slow parallax; the functions become a day-by-day itinerary, with travel notes and a map.
export default function DestinationTemplate({ invitation, t, preview }) {
  const [opened, open] = useOpened(invitation, preview);

  return (
    <TemplateShell
      name="destination"
      language={invitation.language}
      celebration={CONFETTI}
      decoration={<Particles kinds={KINDS} count={6} seed={2} />}
    >
      {!opened ? (
        <OpeningCover variant="ticket" invitation={invitation} t={t} onOpened={open} />
      ) : (
        <Unveil>
          <DestinationHero invitation={invitation} t={t} />
          <div className="stage">
            <article className="card">
              <Hero invitation={invitation} t={t} media={<Palm className="dest-palm" />} showDate={false} />
            </article>
          </div>
          <InvitationSections
            invitation={invitation}
            t={t}
            preview={preview}
            order={["message", "date", "events", "travel", "venue", "story", "gallery", "reception", "rsvp", "share", "thanks"]}
            options={{ eventsLayout: "itinerary", emblem: <Palm /> }}
          />
        </Unveil>
      )}
    </TemplateShell>
  );
}
