import { motion } from "motion/react";
import TemplateShell from "../components/invitation/TemplateShell.jsx";
import Hero from "../components/invitation/Hero.jsx";
import InvitationSections from "../components/invitation/InvitationSections.jsx";
import OpeningCover from "../components/invitation/motion/OpeningCover.jsx";
import Unveil from "../components/invitation/motion/Unveil.jsx";
import { CinematicImage } from "../components/invitation/motion/ScrollReveal.jsx";
import { useOpened } from "../components/invitation/motion/useOpened.js";
import { coupleNames, safeMediaUrl } from "../utils/invitation.js";
import { initialOf } from "../utils/format.js";
import "./minimal.css";

const CONFETTI = ["#b89c6a", "#e8dcc4", "#38332e", "#ffffff"];
const EASE = [0.22, 1, 0.36, 1];

const Rule = () => <span className="minimal-rule" />;

// Minimal Luxury: a linen-bound card, then an editorial layout — monogram, a photo that wipes
// open with gentle parallax, large type and hairline rules. No background animation.
export default function MinimalTemplate({ invitation, t, preview }) {
  const [opened, open] = useOpened(invitation, preview);
  const names = coupleNames(invitation);
  const monogram = names.groom && names.bride ? `${initialOf(names.groom)} & ${initialOf(names.bride)}` : initialOf(invitation.title);
  const photo = safeMediaUrl(invitation.config.coverImage);

  return (
    <TemplateShell name="minimal" language={invitation.language} celebration={CONFETTI}>
      {!opened ? (
        <OpeningCover variant="book" invitation={invitation} t={t} onOpened={open} emblem={<Rule />} />
      ) : (
        <Unveil>
          <section className="minimal-hero">
            <motion.span
              className="minimal-line"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.4, ease: EASE }}
            />
            <motion.p
              className="minimal-monogram"
              aria-hidden="true"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: EASE }}
            >
              {monogram}
            </motion.p>
            <motion.p
              className="minimal-caption"
              initial={{ opacity: 0, letterSpacing: "0em" }}
              animate={{ opacity: 1, letterSpacing: "0.45em" }}
              transition={{ duration: 1.6, delay: 0.4, ease: EASE }}
            >
              {t("minimal.caption")}
            </motion.p>

            {photo && (
              <CinematicImage className="minimal-photo" src={photo} alt={t("photo.couple", names)} parallax={50} priority />
            )}

            <Hero invitation={invitation} t={t} names={{ delay: 0.6 }} />

            <motion.span
              className="minimal-line"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: EASE }}
            />
          </section>

          <InvitationSections
            invitation={invitation}
            t={t}
            preview={preview}
            options={{ eventsPreset: "mask", ornament: <Rule /> }}
          />
        </Unveil>
      )}
    </TemplateShell>
  );
}
