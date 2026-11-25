import { ScrollReveal } from "../motion/ScrollReveal.jsx";
import { Divider } from "../art/Motifs.jsx";

// Eyebrow + title + ornament. Themes restyle it through .sec-heading in their CSS.
export default function SectionHeading({ eyebrow, title, ornament }) {
  return (
    // Low threshold: a heading must never be skipped when photos above it finish loading mid-scroll
    <ScrollReveal className="sec-heading" preset="mask" amount={0.1}>
      {eyebrow && <p className="sec-eyebrow">{eyebrow}</p>}
      {title && <h2 className="sec-title">{title}</h2>}
      <div className="sec-ornament">{ornament ?? <Divider />}</div>
    </ScrollReveal>
  );
}
