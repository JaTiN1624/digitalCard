import { motion } from "motion/react";
import TemplateShell from "../components/invitation/TemplateShell.jsx";
import Hero from "../components/invitation/Hero.jsx";
import InvitationSections from "../components/invitation/InvitationSections.jsx";
import OpeningCover from "../components/invitation/motion/OpeningCover.jsx";
import Unveil from "../components/invitation/motion/Unveil.jsx";
import Particles from "../components/invitation/motion/Particles.jsx";
import { useOpened } from "../components/invitation/motion/useOpened.js";
import { Marigold, Toran } from "../components/invitation/art/Motifs.jsx";
import { occasionOf } from "../utils/invitation.js";
import "./prewedding.css";

const CONFETTI = ["#f6b21a", "#ee5d8a", "#2fa36b", "#ff7a1a", "#7a4bd1", "#ffffff"];
const KINDS = ["marigold", "petal", "marigold"];

// Pre-wedding celebrations (Haldi, Mehendi, Sangeet, Cocktail ... or all of them): bright
// marigold palette, a swinging toran, a bouncing occasion title with music bars, and
// colour-coded function cards. Works for one function or the whole festivities.
export default function PreWeddingTemplate({ invitation, t, preview }) {
  const [opened, open] = useOpened(invitation, preview);
  const occasion = occasionOf(invitation);

  return (
    <TemplateShell
      name="prewedding"
      language={invitation.language}
      celebration={CONFETTI}
      decoration={<Particles kinds={KINDS} count={14} seed={21} />}
    >
      {!opened ? (
        <OpeningCover variant="envelope" invitation={invitation} t={t} onOpened={open} emblem={<Marigold />} />
      ) : (
        <Unveil>
          <section className="pw-hero">
            <motion.div
              className="pw-toran"
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: "backOut" }}
            >
              <Toran count={15} />
            </motion.div>

            <motion.div
              className="pw-flower"
              initial={{ scale: 0, rotate: -120 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 120, damping: 12 }}
            >
              <Marigold />
            </motion.div>

            <motion.h2
              className="pw-occasion"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 160, damping: 11 }}
            >
              {t(`occasion.title.${occasion}`)}
            </motion.h2>

            <div className="pw-beats" aria-hidden="true">
              {Array.from({ length: 7 }, (_, i) => (
                <span key={i} style={{ "--i": i }} />
              ))}
            </div>

            <Hero invitation={invitation} t={t} names={{ delay: 1 }} />
          </section>

          <InvitationSections
            invitation={invitation}
            t={t}
            preview={preview}
            order={["message", "events", "date", "gallery", "story", "venue", "rsvp", "share", "thanks"]}
            options={{ eventsPreset: "unfold", emblem: <Marigold /> }}
          />
        </Unveil>
      )}
    </TemplateShell>
  );
}

