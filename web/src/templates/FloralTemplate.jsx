import TemplateShell from "../components/invitation/TemplateShell.jsx";
import Hero from "../components/invitation/Hero.jsx";
import InvitationSections from "../components/invitation/InvitationSections.jsx";
import OpeningCover from "../components/invitation/motion/OpeningCover.jsx";
import Unveil from "../components/invitation/motion/Unveil.jsx";
import Particles from "../components/invitation/motion/Particles.jsx";
import { CinematicImage, ScrollReveal } from "../components/invitation/motion/ScrollReveal.jsx";
import { useOpened } from "../components/invitation/motion/useOpened.js";
import { Lotus, Rosette } from "../components/invitation/art/Motifs.jsx";
import { coupleNames, safeMediaUrl } from "../utils/invitation.js";
import "./floral.css";

const CONFETTI = ["#f4b6c6", "#e58fa6", "#c49b58", "#fff6f0", "#a7bf9a"];
const KINDS = ["petal", "petal", "leaf"];

// Pastel Floral: a sealed blush envelope opens onto an arched portrait, falling petals and a
// golden scroll guests pull open for the Save the Date.
export default function FloralTemplate({ invitation, t, preview }) {
  const [opened, open] = useOpened(invitation, preview);
  const photo = safeMediaUrl(invitation.config.coverImage);

  return (
    <TemplateShell
      name="floral"
      language={invitation.language}
      celebration={CONFETTI}
      decoration={<Particles kinds={KINDS} count={14} seed={11} />}
    >
      {!opened ? (
        <OpeningCover variant="envelope" invitation={invitation} t={t} onOpened={open} emblem={<Rosette />} />
      ) : (
        <Unveil>
          <section className="floral-intro">
            <ScrollReveal as="p" className="sec-eyebrow" preset="blur">
              {t("floral.beginning")}
            </ScrollReveal>

            <ScrollReveal className="floral-arch" preset="zoom" duration={1.2}>
              {photo ? (
                <CinematicImage src={photo} alt={t("photo.couple", coupleNames(invitation))} parallax={20} priority />
              ) : (
                <div className="floral-arch-empty">
                  <Lotus />
                </div>
              )}
            </ScrollReveal>

            <Hero invitation={invitation} t={t} names={{ stacked: true, delay: 0.5 }} showDate={false} />

            <div className="scroll-cue" aria-hidden="true">
              <span>{t("floral.scroll")}</span>
              <span className="scroll-cue-line" />
            </div>
          </section>

          <InvitationSections
            invitation={invitation}
            t={t}
            preview={preview}
            options={{ ribbon: true, eventsPreset: "rise", emblem: <Rosette /> }}
          />
        </Unveil>
      )}
    </TemplateShell>
  );
}
