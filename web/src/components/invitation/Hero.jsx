import Reveal from "./Reveal.jsx";
import NameReveal from "./motion/NameReveal.jsx";
import { formatEventDate } from "../../utils/format.js";
import { coupleNames, occasionOf } from "../../utils/invitation.js";

// Couple introduction used by most templates.
// media: optional node above the names (photo, emblem). names: NameReveal options (shimmer, stacked, amp).
export default function Hero({ invitation, t, media = null, names: nameOptions = {}, showDate = true }) {
  const { title, language, eventDate, config } = invitation;
  const { groom, bride } = coupleNames(invitation);
  const hasParents = groom && bride && (config.groomParents || config.brideParents);

  return (
    <header className="hero">
      {media && <div className="hero-media">{media}</div>}

      <Reveal as="p" className="eyebrow">
        {t("hero.together")}
      </Reveal>

      <NameReveal className="couple" groom={groom} bride={bride} fallback={title} delay={0.2} {...nameOptions} />

      {hasParents && (
        <Reveal className="parents" delay={300}>
          {config.groomParents && <p>{t("hero.groomParents", { parents: config.groomParents })}</p>}
          {config.brideParents && <p>{t("hero.brideParents", { parents: config.brideParents })}</p>}
        </Reveal>
      )}

      <Reveal as="p" className="eyebrow invite-line" delay={450}>
        {t(`occasion.invite.${occasionOf(invitation)}`)}
      </Reveal>

      {showDate && eventDate && (
        <Reveal as="p" className="event-date" delay={600}>
          {formatEventDate(eventDate, language)}
        </Reveal>
      )}
      {showDate && config.venue && (
        <Reveal as="p" className="venue" delay={700}>
          {config.venue}
        </Reveal>
      )}
    </header>
  );
}
