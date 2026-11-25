import BirthdayTemplate from "./BirthdayTemplate.jsx";
import Particles from "../../components/invitation/motion/Particles.jsx";
import { Butterfly, Daisy } from "../../components/invitation/art/BirthdayArt.jsx";
import { Rosette } from "../../components/invitation/art/Motifs.jsx";
import "./garden.css";

// Floral garden: peach and sage, daisies that open, butterflies and drifting petals.
const THEME = {
  name: "bday-garden",
  cover: "envelope",
  emblem: <Rosette />,
  confetti: ["#f7b7a3", "#f3c6d3", "#b9cfa8", "#fff4e6", "#c8b6e2"],
  particles: <Particles kinds={["petal", "butterfly", "leaf", "petal"]} count={14} seed={41} />,
  heroArt: (
    <div className="garden-art">
      <Daisy className="garden-daisy d1" />
      <Daisy className="garden-daisy d2" />
      <Daisy className="garden-daisy d3" />
      <Butterfly className="garden-butterfly" />
    </div>
  ),
  photoFrame: "arch",
  options: { eventsPreset: "rise", ribbon: true },
};

export default function GardenBirthdayTemplate(props) {
  return <BirthdayTemplate {...props} theme={THEME} />;
}
