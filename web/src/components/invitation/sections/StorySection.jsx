import { CinematicImage, ScrollReveal } from "../motion/ScrollReveal.jsx";
import SectionHeading from "./SectionHeading.jsx";
import { coupleNames, safeMediaUrl } from "../../../utils/invitation.js";

// Our story: an optional photo and paragraph, plus an optional timeline of milestones
// (config.timeline) that alternates sides as the guest scrolls.
export default function StorySection({ invitation, t, ornament }) {
  const { story, storyImage, timeline = [] } = invitation.config;
  const photo = safeMediaUrl(storyImage);
  if (!story && !photo && !timeline.length) return null;
  const names = coupleNames(invitation);

  return (
    <section className="sec sec-story">
      <SectionHeading eyebrow={t("story.eyebrow")} title={t("story.title")} ornament={ornament} />

      {photo && <CinematicImage className="story-image" src={photo} alt={t("photo.couple", names)} />}

      {story && (
        <ScrollReveal as="p" className="story-text" preset="blur">
          {story}
        </ScrollReveal>
      )}

      {timeline.length > 0 && (
        <ol className="timeline">
          {timeline.map((item, i) => {
            const image = safeMediaUrl(item.image);
            return (
              <ScrollReveal
                as="li"
                key={`${item.title}-${i}`}
                className="timeline-item"
                preset={i % 2 ? "right" : "left"}
                amount={0.35}
              >
                <span className="timeline-dot" aria-hidden="true" />
                {item.date && <p className="timeline-date">{item.date}</p>}
                <h3 className="timeline-title">{item.title}</h3>
                {image && <img className="timeline-image" src={image} alt="" loading="lazy" decoding="async" />}
                {item.text && <p className="timeline-text">{item.text}</p>}
              </ScrollReveal>
            );
          })}
        </ol>
      )}
    </section>
  );
}
