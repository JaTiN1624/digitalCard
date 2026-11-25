import { motion } from "motion/react";
import TemplateShell from "../components/invitation/TemplateShell.jsx";
import Hero from "../components/invitation/Hero.jsx";
import InvitationSections from "../components/invitation/InvitationSections.jsx";
import OpeningCover from "../components/invitation/motion/OpeningCover.jsx";
import Unveil from "../components/invitation/motion/Unveil.jsx";
import Particles from "../components/invitation/motion/Particles.jsx";
import Rangoli from "../components/invitation/art/Rangoli.jsx";
import { useOpened } from "../components/invitation/motion/useOpened.js";
import { Diya, Kalash, Lotus, Paisley, PeacockFeather, Toran } from "../components/invitation/art/Motifs.jsx";
import "./maharashtrian.css";

const CONFETTI = ["#f2b233", "#e2502b", "#2f8f6a", "#fbe7bf", "#c22f2f"];
const KINDS = ["marigold"];
const EASE = [0.22, 1, 0.36, 1];

const Ornament = () => (
  <div className="maha-ornament">
    <Paisley />
    <Lotus />
    <Paisley className="mirror" />
  </div>
);

// Maharashtrian traditional: carved temple doors under a marigold toran swing open; a rangoli
// draws itself behind a Paithani-bordered card with peacock feathers and glowing diyas.
export default function MaharashtrianTemplate({ invitation, t, preview }) {
  const [opened, open] = useOpened(invitation, preview);

  return (
    <TemplateShell
      name="maharashtrian"
      language={invitation.language}
      celebration={CONFETTI}
      decoration={<Particles kinds={KINDS} count={10} seed={5} />}
    >
      {!opened ? (
        <OpeningCover variant="doors" invitation={invitation} t={t} onOpened={open} emblem={<Kalash />} />
      ) : (
        <Unveil>
          <motion.div
            className="maha-toran-wrap"
            initial={{ y: -90 }}
            animate={{ y: 0 }}
            transition={{ duration: 1.1, ease: "backOut" }}
          >
            <Toran className="maha-toran" count={13} />
          </motion.div>

          <div className="stage maha-stage">
            <article className="card maha-card">
              {/* Traditional Ganesh invocation, written in Devanagari whatever the invitation language */}
              <motion.p
                className="maha-blessing"
                lang="sa"
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.9 }}
              >
                ॥ श्री गणेशाय नमः ॥
              </motion.p>

              <div className="maha-motifs">
                {[
                  <PeacockFeather key="l" className="feather" />,
                  <Rangoli key="c" className="maha-rangoli" />,
                  <PeacockFeather key="r" className="feather mirror" />,
                ].map((motif, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.5, rotate: i === 1 ? 0 : i === 0 ? -25 : 25 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: 0.8 + i * 0.2, duration: 1, ease: EASE }}
                  >
                    {motif}
                  </motion.span>
                ))}
              </div>

              <Hero invitation={invitation} t={t} names={{ delay: 1.2 }} />

              <div className="maha-diyas">
                <Diya />
                <Ornament />
                <Diya />
              </div>
            </article>
          </div>

          <InvitationSections
            invitation={invitation}
            t={t}
            preview={preview}
            options={{ eventsPreset: "zoom", emblem: <Kalash />, ornament: <Ornament /> }}
          />
        </Unveil>
      )}
    </TemplateShell>
  );
}
