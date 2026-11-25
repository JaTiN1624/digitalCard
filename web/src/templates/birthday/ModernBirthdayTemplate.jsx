import BirthdayTemplate from "./BirthdayTemplate.jsx";
import "./modern.css";

// Minimal modern: cream and muted tones, a linen card, large type, masked photo reveals and
// a light dusting of confetti. No background animation.
const Rule = () => <span className="modern-rule" />;

const THEME = {
  name: "bday-modern",
  cover: "book",
  emblem: <Rule />,
  confetti: ["#d8c3a5", "#eae7dc", "#8e8d8a", "#e98074"],
  photoFrame: "tall",
  options: { eventsPreset: "mask", ornament: <Rule /> },
};

export default function ModernBirthdayTemplate(props) {
  return <BirthdayTemplate {...props} theme={THEME} />;
}
