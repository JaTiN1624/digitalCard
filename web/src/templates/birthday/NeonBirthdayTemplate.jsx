import BirthdayTemplate from "./BirthdayTemplate.jsx";
import Particles from "../../components/invitation/motion/Particles.jsx";
import "./neon.css";

// Neon party: club-night darkness, sweeping light beams, a flickering neon name and a live
// equaliser (purely visual, no audio needed). The cover is a VIP party pass.
const Beams = () => (
  <div className="neon-beams" aria-hidden="true">
    {Array.from({ length: 4 }, (_, i) => (
      <span key={i} style={{ "--i": i }} />
    ))}
  </div>
);

const Equaliser = () => (
  <div className="neon-eq" aria-hidden="true">
    {Array.from({ length: 11 }, (_, i) => (
      <span key={i} style={{ "--i": i }} />
    ))}
  </div>
);

const THEME = {
  name: "bday-neon",
  cover: "ticket",
  confetti: ["#ff2e9a", "#a855f7", "#22d3ee", "#3b82f6", "#ffffff"],
  particles: (
    <>
      <Beams />
      <Particles kinds={["bokeh", "sparkle", "bokeh"]} count={12} seed={23} />
    </>
  ),
  heroArt: <Equaliser />,
  options: { eventsPreset: "zoom", dateCelebrate: true },
};

export default function NeonBirthdayTemplate(props) {
  return <BirthdayTemplate {...props} theme={THEME} />;
}
