import { motion } from "motion/react";
import TemplateShell from "../components/invitation/TemplateShell.jsx";
import Hero from "../components/invitation/Hero.jsx";
import InvitationSections from "../components/invitation/InvitationSections.jsx";
import OpeningCover from "../components/invitation/motion/OpeningCover.jsx";
import Unveil from "../components/invitation/motion/Unveil.jsx";
import Particles from "../components/invitation/motion/Particles.jsx";
import { useOpened } from "../components/invitation/motion/useOpened.js";
import { Rings } from "../components/invitation/art/Motifs.jsx";
import "./engagement.css";

const CONFETTI = ["#e4c27f", "#f6d7d9", "#ffffff", "#b78a4a"];
const KINDS = ["gold", "sparkle", "heart"];

// Engagement: a velvet ring box opens, the ring rises in a pool of light with a burst of
// champagne confetti; champagne-and-blush layout with a glowing ring and shimmering names.
export default function EngagementTemplate({ invitation, t, preview }) {
  const [opened, open] = useOpened(invitation, preview);

  return (
    <TemplateShell
      name="engagement"
      language={invitation.language}
      celebration={CONFETTI}
      decoration={<Particles kinds={KINDS} count={14} seed={17} />}
    >
      {!opened ? (
        <OpeningCover variant="ringbox" invitation={invitation} t={t} onOpened={open} />
      ) : (
        <Unveil>
          <section className="eng-hero">
            <motion.div
              className="eng-ring"
              initial={{ opacity: 0, scale: 0.4, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "backOut" }}
            >
              <span className="eng-glow" />
              <Rings />
            </motion.div>
            <Hero invitation={invitation} t={t} names={{ shimmer: true, delay: 0.6 }} />
          </section>

          <InvitationSections
            invitation={invitation}
            t={t}
            preview={preview}
            order={["message", "date", "story", "events", "gallery", "venue", "rsvp", "share", "thanks"]}
            options={{ dateCelebrate: true, eventsPreset: "zoom", emblem: <Rings /> }}
          />
        </Unveil>
      )}
    </TemplateShell>
  );
}
