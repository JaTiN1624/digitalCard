import BirthdayTemplate from "./BirthdayTemplate.jsx";
import Particles from "../../components/invitation/motion/Particles.jsx";
import { BalloonCluster, Bow, CloudArt, Teddy } from "../../components/invitation/art/BirthdayArt.jsx";
import "./first.css";

// First birthday: soft pastels, a teddy with balloons, clouds and a big animated "1".
const THEME = {
  name: "bday-first",
  cover: "giftbox",
  emblem: <Bow />,
  confetti: ["#a7d8ff", "#ffc8dd", "#fff1a8", "#bde0c6", "#ffffff"],
  particles: <Particles kinds={["balloon", "star", "balloon"]} count={10} seed={5} />,
  heroArt: (
    <div className="first-art">
      <CloudArt className="first-cloud c1" />
      <CloudArt className="first-cloud c2" />
      <BalloonCluster className="first-balloons" />
      <Teddy className="first-teddy" />
    </div>
  ),
  photoFrame: "circle",
  options: { eventsPreset: "zoom" },
};

export default function FirstBirthdayTemplate(props) {
  return <BirthdayTemplate {...props} theme={THEME} />;
}
