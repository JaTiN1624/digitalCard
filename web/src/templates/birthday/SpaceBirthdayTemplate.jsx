import BirthdayTemplate from "./BirthdayTemplate.jsx";
import Particles from "../../components/invitation/motion/Particles.jsx";
import { Planet, Rocket } from "../../components/invitation/art/BirthdayArt.jsx";
import "./space.css";

// Space & galaxy: a mission-control title card, starfield, a rocket lifting off past a turning
// planet and a glowing name.
const THEME = {
  name: "bday-space",
  cover: "cinema",
  confetti: ["#a78bfa", "#60a5fa", "#f0abfc", "#e0e7ff", "#fde68a"],
  particles: <Particles kinds={["star", "star", "star", "bokeh"]} count={30} seed={29} />,
  heroArt: (
    <div className="space-art">
      <Planet className="space-planet" />
      <Rocket className="space-rocket" />
    </div>
  ),
  options: { eventsPreset: "blur", dateCelebrate: true },
};

export default function SpaceBirthdayTemplate(props) {
  return <BirthdayTemplate {...props} theme={THEME} />;
}
