import BirthdayTemplate from "./BirthdayTemplate.jsx";
import Particles from "../../components/invitation/motion/Particles.jsx";
import { BalloonCluster, Bow, Rainbow } from "../../components/invitation/art/BirthdayArt.jsx";
import "./kids.css";

// Kids cartoon & fantasy: pastel sky, rainbow, balloons rising, a gift box that pops open.
const THEME = {
  name: "bday-kids",
  cover: "giftbox",
  emblem: <Bow />,
  confetti: ["#ff7aa2", "#7cc6ff", "#ffd166", "#8ce99a", "#c9a6ff", "#ffffff"],
  particles: <Particles kinds={["balloon", "star", "balloon", "confetti"]} count={14} seed={31} />,
  heroArt: (
    <div className="kids-art">
      <Rainbow />
      <BalloonCluster className="kids-balloons" />
    </div>
  ),
  options: { eventsPreset: "zoom" },
};

export default function KidsBirthdayTemplate(props) {
  return <BirthdayTemplate {...props} theme={THEME} />;
}
