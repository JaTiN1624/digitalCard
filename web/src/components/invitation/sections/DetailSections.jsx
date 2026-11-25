import { ScrollReveal } from "../motion/ScrollReveal.jsx";
import { Pin } from "../art/Motifs.jsx";
import SectionHeading from "./SectionHeading.jsx";
import { formatEventDate, safeHttpsUrl } from "../../../utils/format.js";

const directionsUrl = (query) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;

// The invitation's personal message
export function MessageSection({ invitation }) {
  const { message } = invitation.config;
  if (!message) return null;
  return (
    <section className="sec sec-message">
      <ScrollReveal as="blockquote" className="message" preset="blur" duration={1.2}>
        {message}
      </ScrollReveal>
    </section>
  );
}

export function ReceptionSection({ invitation, t, emblem }) {
  const { config, language } = invitation;
  const reception = config.reception;
  if (!reception?.date) return null;
  const query = [reception.venue, reception.address].filter(Boolean).join(", ");
  const mapUrl = safeHttpsUrl(reception.mapUrl) ?? (query ? directionsUrl(query) : null);

  return (
    <section className="sec sec-reception">
      <ScrollReveal className="reception-card" preset="unfold" duration={1.1}>
        {emblem && <div className="reception-emblem">{emblem}</div>}
        <p className="sec-eyebrow">{t("reception.label")}</p>
        <h2 className="sec-title">{reception.name ?? t("reception.title")}</h2>
        <span className="reception-line" aria-hidden="true" />
        <p className="reception-when">{formatEventDate(reception.date, language)}</p>
        {reception.venue && <p>{reception.venue}</p>}
        {reception.address && <p className="reception-address">{reception.address}</p>}
        {mapUrl && (
          <a className="btn btn-light" href={mapUrl} target="_blank" rel="noopener noreferrer">
            {t("events.viewMap")} ↗
          </a>
        )}
      </ScrollReveal>
    </section>
  );
}

// Venue with an embedded map (loads only when scrolled near) and a directions button.
// Address/map come from the main event (the one on eventDate), else the last event.
export function VenueSection({ invitation, t, ornament, showMap = true }) {
  const { config, eventDate } = invitation;
  if (!config.venue) return null;

  const events = config.events ?? [];
  const main =
    events.find((e) => eventDate && new Date(e.date).getTime() === new Date(eventDate).getTime()) ?? events.at(-1);
  const address = config.address ?? main?.address;
  const query = [config.venue, address].filter(Boolean).join(", ");
  const mapUrl = safeHttpsUrl(config.mapUrl) ?? safeHttpsUrl(main?.mapUrl);

  return (
    <section className="sec sec-venue">
      <SectionHeading eyebrow={t("venue.eyebrow")} title={t("venue.title")} ornament={ornament} />
      <ScrollReveal className="venue-card" preset="rise">
        <Pin className="venue-pin" />
        <h3 className="venue-name">{config.venue}</h3>
        {address && <p className="venue-address">{address}</p>}
        {showMap && (
          <div className="venue-map">
            <iframe
              title={t("venue.mapTitle", { venue: config.venue })}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(query)}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        )}
        <div className="sec-actions">
          <a className="btn" href={directionsUrl(query)} target="_blank" rel="noopener noreferrer">
            {t("venue.directions")} ↗
          </a>
          {mapUrl && (
            <a className="btn btn-ghost" href={mapUrl} target="_blank" rel="noopener noreferrer">
              {t("events.viewMap")}
            </a>
          )}
        </div>
      </ScrollReveal>
    </section>
  );
}

// Travel & stay notes (destination weddings)
export function TravelSection({ invitation, t, ornament }) {
  const { travelNote } = invitation.config;
  if (!travelNote) return null;
  return (
    <section className="sec sec-travel">
      <SectionHeading eyebrow={t("travel.eyebrow")} title={t("travel.title")} ornament={ornament} />
      <ScrollReveal as="p" className="travel-note" preset="blur">
        {travelNote}
      </ScrollReveal>
    </section>
  );
}
