import { Stagger, StaggerItem } from "../motion/ScrollReveal.jsx";
import { FunctionIcon } from "../art/Motifs.jsx";
import SectionHeading from "./SectionHeading.jsx";
import { formatEventDate, formatShortDate, formatTime, safeHttpsUrl } from "../../../utils/format.js";
import { functionKind, safeMediaUrl, sortedEvents } from "../../../utils/invitation.js";

const directionsUrl = (query) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;

function EventCard({ event, index, language, t, preset, fallbackIcon }) {
  const found = functionKind(event.name);
  const kind = found === "celebration" && fallbackIcon ? fallbackIcon : found;
  const image = safeMediaUrl(event.image);
  const mapUrl =
    safeHttpsUrl(event.mapUrl) ??
    (event.venue || event.address ? directionsUrl([event.venue, event.address].filter(Boolean).join(", ")) : null);

  return (
    <StaggerItem as="li" preset={preset} className={`event-card ev-${kind}`}>
      {image && (
        <div className="event-image">
          <img src={image} alt="" loading="lazy" decoding="async" />
        </div>
      )}
      <div className="event-body">
        <FunctionIcon kind={kind} className="event-icon" />
        <p className="event-number">{t("events.number", { n: String(index + 1).padStart(2, "0") })}</p>
        <h3 className="event-name">{event.name}</h3>
        <p className="event-when">{formatEventDate(event.date, language)}</p>
        {event.venue && <p className="event-venue">{event.venue}</p>}
        {event.address && <p className="event-address">{event.address}</p>}
        {event.description && <p className="event-note">{event.description}</p>}
        {mapUrl && (
          <a className="event-map" href={mapUrl} target="_blank" rel="noopener noreferrer">
            {t("events.viewMap")} ↗
          </a>
        )}
      </div>
    </StaggerItem>
  );
}

// Itinerary layout: events grouped by day on a vertical timeline (destination weddings)
function Itinerary({ events, language, t }) {
  const days = [];
  for (const event of events) {
    const day = formatShortDate(event.date, language);
    const last = days.at(-1);
    if (last?.day === day) last.events.push(event);
    else days.push({ day, events: [event] });
  }

  return (
    <Stagger as="ol" className="itinerary" step={0.15}>
      {days.map(({ day, events: list }, i) => (
        <StaggerItem as="li" key={day} preset="left" className="itinerary-day">
          <p className="itinerary-label">
            <span>{t("events.day", { n: i + 1 })}</span> {day}
          </p>
          <ul>
            {list.map((event) => (
              <li key={`${event.name}-${event.date}`} className="itinerary-item">
                <FunctionIcon kind={functionKind(event.name)} className="event-icon" />
                <div>
                  <p className="itinerary-time">{formatTime(event.date, language)}</p>
                  <h3 className="event-name">{event.name}</h3>
                  {event.venue && <p className="event-venue">{event.venue}</p>}
                  {event.description && <p className="event-note">{event.description}</p>}
                </div>
              </li>
            ))}
          </ul>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

export default function EventsSection({ invitation, t, layout = "cards", preset = "rise", ornament, fallbackIcon }) {
  const events = sortedEvents(invitation);
  if (!events.length) return null;
  const { language } = invitation;

  return (
    <section className={`sec sec-events events-${layout}`}>
      <SectionHeading eyebrow={t("events.eyebrow")} title={t("events.title")} ornament={ornament} />
      {layout === "itinerary" ? (
        <Itinerary events={events} language={language} t={t} />
      ) : (
        <Stagger as="ol" className="event-grid" step={0.14}>
          {events.map((event, i) => (
            <EventCard key={`${event.name}-${event.date}`} event={event} index={i} language={language} t={t} preset={preset} fallbackIcon={fallbackIcon} />
          ))}
        </Stagger>
      )}
    </section>
  );
}
