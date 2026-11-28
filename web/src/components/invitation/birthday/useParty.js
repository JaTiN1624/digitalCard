import { useMemo } from "react";
import { ordinal, withOverrides } from "../../../i18n/index.js";
import { LOCALES, formatTime, safeHttpsUrl } from "../../../utils/format.js";
import { birthdayAge, birthdayStage, coupleNames, functionKind, hostPhone, isHidden, safeMediaUrl, sortedEvents } from "../../../utils/invitation.js";

// Everything a birthday design needs to know about the party, already worked out:
// names, age-aware wording variables, date parts in the invitation language, the schedule with
// formatted times, venue and map links. Designs only decide how it looks.

const part = (value, language, options) =>
  new Intl.DateTimeFormat(LOCALES[language] ?? "en-IN", { timeZone: "Asia/Kolkata", ...options }).format(new Date(value));

export const directionsUrl = (query) => `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;

// `wording` is the occasion prefix whose keys override shared wording: "bday" (birthday),
// "anniv" (anniversary), "baby" (baby shower).
export function useParty(invitation, baseT, wording = "bday") {
  // Occasion wording wins over shared wedding wording ("Party schedule", "Birthday wishes" …)
  const t = useMemo(() => withOverrides(baseT, wording), [baseT, wording]);

  return useMemo(() => {
    const { config, language, eventDate, title } = invitation;
    const age = birthdayAge(invitation);
    const stage = birthdayStage(age);
    const vars = { age: age ?? "", ord: age ? ordinal(age, language) : "", host: config.host ?? "" };
    const end = config.endDate && eventDate && new Date(config.endDate) > new Date(eventDate) ? config.endDate : null;
    const events = sortedEvents(invitation).map((event, i) => ({
      ...event,
      key: `${event.name}-${event.date}`,
      index: i,
      number: String(i + 1).padStart(2, "0"),
      time: formatTime(event.date, language),
      kind: functionKind(event.name),
    }));
    const venueQuery = [config.venue, config.address].filter(Boolean).join(", ");

    const couple = coupleNames(invitation);
    const years = Number.isInteger(config.years) && config.years > 0 ? config.years : null;

    return {
      t,
      language,
      name: config.celebrant || title,
      couple: couple.groom && couple.bride ? couple : null,
      years,
      // the year the couple married, for "Together since 1999"
      sinceYear: years && eventDate ? new Date(eventDate).getFullYear() - years : null,
      age,
      stage,
      vars,
      kids: ["FIRST", "KIDS"].includes(stage),
      host: config.host,
      message: config.message,
      dressCode: config.dressCode,
      photo: safeMediaUrl(config.coverImage),
      gallery: (config.gallery ?? []).map((g) => ({ ...g, url: safeMediaUrl(g.url) })).filter((g) => g.url),
      timeline: (config.timeline ?? []).map((m) => ({ ...m, image: safeMediaUrl(m.image) })),
      hasPhone: Boolean(hostPhone(invitation)),
      events,
      date: eventDate
        ? {
            weekday: part(eventDate, language, { weekday: "long" }),
            day: part(eventDate, language, { day: "numeric" }),
            month: part(eventDate, language, { month: "long" }),
            monthShort: part(eventDate, language, { month: "short" }),
            year: part(eventDate, language, { year: "numeric" }),
            time: formatTime(eventDate, language),
            endTime: end ? formatTime(end, language) : null,
          }
        : null,
      venue: config.venue,
      address: config.address,
      directions: venueQuery ? directionsUrl(venueQuery) : null,
      mapUrl: safeHttpsUrl(config.mapUrl),
      mapEmbed: venueQuery ? `https://maps.google.com/maps?q=${encodeURIComponent(venueQuery)}&output=embed` : null,
      // section switches the customer can turn off in config.hiddenSections
      show: (key) => !isHidden(invitation, key),
    };
  }, [invitation, t]);
}
