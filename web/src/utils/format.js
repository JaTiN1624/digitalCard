// Backend language enum -> locale used for dates and numbers
export const LOCALES = { EN: "en-IN", HI: "hi-IN", MR: "mr-IN" };

const locale = (language) => LOCALES[language] ?? "en-IN";

export function formatEventDate(value, language = "EN") {
  if (!value) return null;
  return new Intl.DateTimeFormat(locale(language), {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  }).format(new Date(value));
}

export function formatNumber(value, language = "EN") {
  return new Intl.NumberFormat(locale(language)).format(value);
}

// Only allow https links in user-provided content (blocks javascript: etc.)
export function safeHttpsUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.href : null;
  } catch {
    return null;
  }
}

// First letter of a name, keeping Devanagari letters with their vowel signs (e.g. "स्" not "स")
export function initialOf(name = "") {
  const [first] = new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(name.trim());
  return first?.segment ?? "";
}

// The given end time if it is after the start, else start + 4 hours
function endTime(begin, value) {
  const end = value ? new Date(value) : null;
  return end && end > begin ? end : new Date(begin.getTime() + 4 * 60 * 60 * 1000);
}

// Google Calendar "add event" link for the wedding (assumes ~4 hours)
export function googleCalendarUrl({ title, start, end: endValue, location, details }) {
  const begin = new Date(start);
  if (Number.isNaN(begin.getTime())) return null;
  const end = endTime(begin, endValue);
  const stamp = (d) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const params = new URLSearchParams({ action: "TEMPLATE", text: title, dates: `${stamp(begin)}/${stamp(end)}` });
  if (location) params.set("location", location);
  if (details) params.set("details", details);
  return `https://calendar.google.com/calendar/render?${params}`;
}

// Compact date for covers and tickets, e.g. "14 Feb 2027" / "१४ फ़र॰ २०२७"
export function formatShortDate(value, language = "EN") {
  if (!value) return null;
  return new Intl.DateTimeFormat(locale(language), {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(new Date(value));
}

// Time only, e.g. "6:30 pm"
export function formatTime(value, language = "EN") {
  if (!value) return null;
  return new Intl.DateTimeFormat(locale(language), {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  }).format(new Date(value));
}

// .ics calendar file (Apple Calendar, Outlook) as a data: URL
export function icsDataUrl({ title, start, end: endValue, location, details }) {
  const begin = new Date(start);
  if (Number.isNaN(begin.getTime())) return null;
  const end = endTime(begin, endValue);
  const stamp = (d) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  // RFC 5545 text escaping: backslash, comma, semicolon and newlines
  const esc = (s = "") => s.replace(/([\\,;])/g, "\\$1").replace(/\r?\n/g, "\\n");
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding Invitation//EN",
    "BEGIN:VEVENT",
    `UID:${stamp(begin)}-${Math.abs([...title].reduce((h, c) => (h * 31 + c.charCodeAt(0)) | 0, 0))}@invite`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(begin)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:${esc(title)}`,
    location ? `LOCATION:${esc(location)}` : null,
    details ? `DESCRIPTION:${esc(details)}` : null,
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .join("\r\n");
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
}
