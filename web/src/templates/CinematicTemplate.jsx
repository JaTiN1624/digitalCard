import { motion } from "motion/react";
import TemplateShell from "../components/invitation/TemplateShell.jsx";
import InvitationSections from "../components/invitation/InvitationSections.jsx";
import OpeningCover from "../components/invitation/motion/OpeningCover.jsx";
import Unveil from "../components/invitation/motion/Unveil.jsx";
import Particles from "../components/invitation/motion/Particles.jsx";
import NameReveal from "../components/invitation/motion/NameReveal.jsx";
import { ScrollReveal } from "../components/invitation/motion/ScrollReveal.jsx";
import { useOpened } from "../components/invitation/motion/useOpened.js";
import { coupleNames, occasionOf, safeMediaUrl } from "../utils/invitation.js";
import "./cinematic.css";

const CONFETTI = ["#e2c27a", "#f7ecd2", "#9fb4ff", "#ffffff"];
const KINDS = ["star", "star", "star", "bokeh"];
const EASE = [0.22, 1, 0.36, 1];

// Cinematic love story: a film-leader title card, letterbox bars part, then a full-screen
// photograph slowly zooms while the titles arrive in sequence. The story timeline follows and
// the wedding date is saved for the finale, revealed with a gold shower.
export default function CinematicTemplate({ invitation, t, preview }) {
  const [opened, open] = useOpened(invitation, preview);
  const names = coupleNames(invitation);
  const photo = safeMediaUrl(invitation.config.coverImage);
  const { config } = invitation;

  return (
    <TemplateShell
      name="cinematic"
      language={invitation.language}
      celebration={CONFETTI}
      decoration={<Particles kinds={KINDS} count={28} seed={9} />}
    >
      {!opened ? (
        <OpeningCover variant="cinema" invitation={invitation} t={t} onOpened={open} />
      ) : (
        <Unveil>
          <section className="cine-hero">
            <div className="cine-bg">{photo && <img src={photo} alt="" decoding="async" fetchPriority="high" />}</div>
            <div className="cine-shade" />
            <div className="cine-titles">
              <motion.p
                className="cine-kicker"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1.2, ease: EASE }}
              >
                {t("cinematic.kicker")}
              </motion.p>
              <motion.h2
                className="cine-title"
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 1.3, ease: EASE }}
              >
                {t("cinematic.title")}
              </motion.h2>
              <motion.span
                className="cine-divider"
                initial={{ width: 0 }}
                animate={{ width: 120 }}
                transition={{ delay: 1.8, duration: 1, ease: EASE }}
              />
              <NameReveal className="cine-names" groom={names.groom} bride={names.bride} fallback={invitation.title} delay={2.1} />
              <motion.p
                className="cine-closing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.2, duration: 1.4 }}
              >
                {t("cinematic.closing")}
              </motion.p>
            </div>
            <div className="scroll-cue" aria-hidden="true">
              <span className="scroll-cue-line" />
            </div>
          </section>

          <section className="sec cine-invite">
            <ScrollReveal as="p" className="sec-eyebrow" preset="blur">
              {t("hero.together")}
            </ScrollReveal>
            {(config.groomParents || config.brideParents) && (
              <ScrollReveal className="cine-parents" preset="blur" delay={0.2}>
                {config.groomParents && <p>{t("hero.groomParents", { parents: config.groomParents })}</p>}
                {config.brideParents && <p>{t("hero.brideParents", { parents: config.brideParents })}</p>}
              </ScrollReveal>
            )}
            <ScrollReveal as="p" className="cine-invite-line" preset="blur" delay={0.35}>
              {t(`occasion.invite.${occasionOf(invitation)}`)}
            </ScrollReveal>
          </section>

          <InvitationSections
            invitation={invitation}
            t={t}
            preview={preview}
            order={["message", "story", "events", "gallery", "date", "reception", "venue", "rsvp", "share", "thanks"]}
            options={{ eventsPreset: "blur", dateCelebrate: true }}
          />
        </Unveil>
      )}
    </TemplateShell>
  );
}
