import BirthdayTemplate from "./BirthdayTemplate.jsx";
import Particles from "../../components/invitation/motion/Particles.jsx";
import { Bolt, CapedHero } from "../../components/invitation/art/BirthdayArt.jsx";
import "./superhero.css";

// Superhero adventure: a comic panel bursts open with a POW, action lines, lightning bolts
// and an original caped hero (no existing characters or logos).
const THEME = {
  name: "bday-superhero",
  cover: "comic",
  emblem: <Bolt />,
  confetti: ["#e63946", "#1d4ed8", "#ffd60a", "#ffffff", "#111827"],
  particles: <Particles kinds={["sparkle", "confetti", "star"]} count={12} seed={7} />,
  heroArt: (
    <div className="hero-art">
      <Bolt className="hero-bolt left" />
      <CapedHero className="hero-figure" />
      <Bolt className="hero-bolt right" />
    </div>
  ),
  options: { eventsPreset: "left", dateCelebrate: true },
};

export default function SuperheroBirthdayTemplate(props) {
  return <BirthdayTemplate {...props} theme={THEME} />;
}
