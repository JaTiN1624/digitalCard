import { useEffect, useRef } from "react";
import { useInView } from "motion/react";
import Countdown from "../Countdown.jsx";
import { useCelebrate } from "../motion/celebrationContext.js";
import RibbonReveal from "../motion/RibbonReveal.jsx";
import { ScrollReveal } from "../motion/ScrollReveal.jsx";
import SectionHeading from "./SectionHeading.jsx";
import { LOCALES, formatTime, googleCalendarUrl, icsDataUrl } from "../../../utils/format.js";
import { isHidden } from "../../../utils/invitation.js";

const part = (value, language, options) =>
  new Intl.DateTimeFormat(LOCALES[language] ?? "en-IN", { timeZone: "Asia/Kolkata", ...options }).format(new Date(value));

// Google Calendar (Android) and .ics (iPhone / Outlook) buttons for the main event
export function CalendarButtons({ invitation, t, className = "sec-actions" }) {
  const { eventDate, title, config, slug } = invitation;
  if (!eventDate) return null;
  const end = config.endDate && new Date(config.endDate) > new Date(eventDate) ? config.endDate : null;
  const calendar = { title, start: eventDate, end, location: config.venue, details: config.message };
  const google = googleCalendarUrl(calendar);
  const ics = icsDataUrl(calendar);
  return (
    <div className={className}>
      {google && (
        <a className="btn" href={google} target="_blank" rel="noopener noreferrer">
          {t("date.googleCalendar")}
        </a>
      )}
      {ics && (
        <a className="btn btn-ghost" href={ics} download={`${slug || "invitation"}.ics`}>
          {t("date.appleCalendar")}
        </a>
      )}
    </div>
  );
}

// Save the date: the date itself (optionally inside the golden ribbon), live countdown and
// "add to calendar" for Google (Android) and .ics (iPhone / Outlook).
export default function SaveTheDate({ invitation, t, ribbon = false, celebrateOnView = false, ornament }) {
  const { eventDate, language, config } = invitation;
  const dateRef = useRef(null);
  const inView = useInView(dateRef, { once: true, amount: 0.7 });
  const celebrate = useCelebrate();

  // The "big reveal" themes shower confetti the first time the date is fully on screen
  useEffect(() => {
    if (inView && celebrateOnView && !ribbon) celebrate("shower");
  }, [inView, celebrateOnView, ribbon, celebrate]);

  if (!eventDate) return null;

  const end = config.endDate && new Date(config.endDate) > new Date(eventDate) ? config.endDate : null;
  const body = (
    <div className="date-body">
      <p className="date-label">{t("date.invited")}</p>
      <p className="date-weekday">{part(eventDate, language, { weekday: "long" })}</p>
      <p className="date-big">
        <span className="date-day">{part(eventDate, language, { day: "numeric" })}</span>
        <span className="date-month">{part(eventDate, language, { month: "long", year: "numeric" })}</span>
      </p>
      <p className="date-time">
        {formatTime(eventDate, language)}
        {end && ` – ${formatTime(end, language)}`}
      </p>
      {config.venue && <p className="date-venue">{config.venue}</p>}
    </div>
  );

  return (
    <section className="sec sec-date">
      <SectionHeading eyebrow={t("date.eyebrow")} title={t("date.title")} ornament={ornament} />

      {ribbon ? (
        <RibbonReveal t={t}>{body}</RibbonReveal>
      ) : (
        <ScrollReveal ref={dateRef} className="date-card" preset="unfold">
          {body}
        </ScrollReveal>
      )}

      {!isHidden(invitation, "countdown") && (
        <Countdown target={eventDate} language={language} t={t} showTitle={false} />
      )}

      <CalendarButtons invitation={invitation} t={t} />
    </section>
  );
}
