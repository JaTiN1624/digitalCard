import BirthdayTemplate from "./BirthdayTemplate.jsx";
import Particles from "../../components/invitation/motion/Particles.jsx";
import { Glasses } from "../../components/invitation/art/BirthdayArt.jsx";
import { Divider } from "../../components/invitation/art/Motifs.jsx";
import "./luxury.css";

// Luxury: black and gold, a sealed black envelope, rising gold dust, a light sweep across the
// name and slow-zooming photography.
const THEME = {
  name: "bday-luxury",
  cover: "envelope",
  emblem: <Glasses />,
  confetti: ["#d4af37", "#f5e1a4", "#ffffff", "#8c6d2c"],
  particles: <Particles kinds={["gold", "gold", "bokeh"]} count={16} seed={19} />,
  heroArt: <Glasses className="lux-glasses" />,
  nameOptions: { shimmer: true },
  photoFrame: "tall",
  options: { eventsPreset: "blur", ornament: <Divider />, dateCelebrate: true },
};

export default function LuxuryBirthdayTemplate(props) {
  return <BirthdayTemplate {...props} theme={THEME} />;
}
