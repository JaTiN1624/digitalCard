import BirthdayTemplate from "./BirthdayTemplate.jsx";
import Particles from "../../components/invitation/motion/Particles.jsx";
import { Gamepad, PixelHeart, Trophy } from "../../components/invitation/art/BirthdayArt.jsx";
import "./gaming.css";

// Gaming: an arcade cabinet you press start on, pixel rain, a level-up age reveal with an XP
// bar and achievement-style cards. Original pixel art only.
const THEME = {
  name: "bday-gaming",
  cover: "arcade",
  emblem: <Trophy />,
  confetti: ["#00f5d4", "#f15bb5", "#fee440", "#9b5de5", "#00bbf9"],
  particles: <Particles kinds={["pixel", "star", "pixel"]} count={14} seed={17} />,
  heroArt: (
    <div className="gaming-art">
      <PixelHeart className="gaming-heart" />
      <Gamepad className="gaming-pad" />
      <PixelHeart className="gaming-heart" />
    </div>
  ),
  ageVariant: "level",
  options: { eventsPreset: "left" },
};

export default function GamingBirthdayTemplate(props) {
  return <BirthdayTemplate {...props} theme={THEME} />;
}
