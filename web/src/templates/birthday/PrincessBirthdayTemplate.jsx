import BirthdayTemplate from "./BirthdayTemplate.jsx";
import Particles from "../../components/invitation/motion/Particles.jsx";
import { Castle } from "../../components/invitation/art/BirthdayArt.jsx";
import { Crown } from "../../components/invitation/art/Motifs.jsx";
import "./princess.css";

// Royal princess: a rose-gold storybook opens onto a fairy-tale castle; a crown lands above the
// name while sparkles twinkle and butterflies drift.
const THEME = {
  name: "bday-princess",
  cover: "book",
  emblem: <Crown />,
  crown: <Crown />,
  confetti: ["#f7a8c8", "#c9a6f2", "#f3d27a", "#ffffff", "#ffd6e7"],
  particles: <Particles kinds={["sparkle", "butterfly", "sparkle", "gold"]} count={14} seed={13} />,
  heroArt: <Castle className="princess-castle" />,
  nameOptions: { shimmer: true },
  photoFrame: "arch",
  options: { eventsPreset: "unfold", ribbon: true },
};

export default function PrincessBirthdayTemplate(props) {
  return <BirthdayTemplate {...props} theme={THEME} />;
}
