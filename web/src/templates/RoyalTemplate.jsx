import { motion } from "motion/react";
import TemplateShell from "../components/invitation/TemplateShell.jsx";
import Hero from "../components/invitation/Hero.jsx";
import InvitationSections from "../components/invitation/InvitationSections.jsx";
import OpeningCover from "../components/invitation/motion/OpeningCover.jsx";
import Unveil from "../components/invitation/motion/Unveil.jsx";
import Particles from "../components/invitation/motion/Particles.jsx";
import { useOpened } from "../components/invitation/motion/useOpened.js";
import { Corner, Crown, Divider } from "../components/invitation/art/Motifs.jsx";
import "./royal.css";

const CONFETTI = ["#e0b65a", "#f6dc9a", "#8a1c2b", "#fff4dc"];
const KINDS = ["gold", "sparkle", "gold"];
const EASE = [0.22, 1, 0.36, 1];

// Royal Maharaja: maroon velvet book with gold corners opens onto a framed card; gold dust
// rises in the background, the crown descends, ornaments draw in, names shimmer.
export default function RoyalTemplate({ invitation, t, preview }) {
  const [opened, open] = useOpened(invitation, preview);

  return (
    <TemplateShell
      name="royal"
      language={invitation.language}
      celebration={CONFETTI}
      decoration={<Particles kinds={KINDS} count={18} seed={3} />}
    >
      {!opened ? (
        <OpeningCover variant="book" invitation={invitation} t={t} onOpened={open} emblem={<Crown />} />
      ) : (
        <Unveil>
          <div className="stage">
            <article className="card frame royal-hero">
              {["tl", "tr", "bl", "br"].map((c, i) => (
                <motion.span
                  key={c}
                  className={`royal-corner ${c}`}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.12, duration: 0.8, ease: EASE }}
                >
                  <Corner />
                </motion.span>
              ))}

              <motion.div
                className="royal-crown"
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, ease: EASE }}
              >
                <Crown />
              </motion.div>

              <motion.p
                className="blessing"
                initial={{ opacity: 0, letterSpacing: "0.5em" }}
                animate={{ opacity: 1, letterSpacing: "0.12em" }}
                transition={{ duration: 1.4, delay: 0.4, ease: EASE }}
              >
                {t("hero.blessing")}
              </motion.p>
              <p className="royal-title">{t("royal.title")}</p>

              <motion.div
                className="royal-divider"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 0.7, ease: EASE }}
              >
                <Divider />
              </motion.div>

              <Hero invitation={invitation} t={t} names={{ shimmer: true, stacked: true, delay: 0.9 }} />

              <motion.div
                className="royal-divider"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 1.6, ease: EASE }}
              >
                <Divider />
              </motion.div>
            </article>
          </div>

          <InvitationSections
            invitation={invitation}
            t={t}
            preview={preview}
            options={{ ribbon: true, eventsPreset: "unfold", emblem: <Crown /> }}
          />
        </Unveil>
      )}
    </TemplateShell>
  );
}
