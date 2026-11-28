// Backend language enum -> locale used for dates and numbers
export const LOCALES = { EN: "en-IN", HI: "hi-IN", MR: "mr-IN" };

const locale = (language) => LOCALES[language] ?? "en-IN";

// Hindi/Marathi times the way people write them on invitations: "शाम 6:30 बजे",
// "संध्याकाळी ६:३० वाजता" — the browser's own format mixes in "pm"/"PM".
const DAY_PARTS = {
  HI: { morning: "सुबह", afternoon: "दोपहर", evening: "शाम", night: "रात", suffix: "बजे", joiner: "को" },
  MR: { morning: "सकाळी", afternoon: "दुपारी", evening: "संध्याकाळी", night: "रात्री", suffix: "वाजता", joiner: "रोजी" },
};

function indianTime(value, language) {
  const words = DAY_PARTS[language];
  const parts = new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: "Asia/Kolkata",
  }).formatToParts(new Date(value));
  const hour = Number(parts.find((p) => p.type === "hour").value);
  const minute = Number(parts.find((p) => p.type === "minute").value);
  const part =
    hour >= 4 && hour < 12 ? words.morning : hour < 16 && hour >= 12 ? words.afternoon : hour >= 16 && hour < 20 ? words.evening : words.night;
  const num = (n) => formatNumber(n, language);
  const clock = minute === 0 ? num(hour % 12 || 12) : `${num(hour % 12 || 12)}:${num(minute).padStart(2, num(0))}`;
  return `${part} ${clock} ${words.suffix}`;
}

export function formatEventDate(value, language = "EN") {
  if (!value) return null;
  const date = new Date(value);
  if (DAY_PARTS[language]) {
    const day = new Intl.DateTimeFormat(locale(language), {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Kolkata",
    }).format(date);
    return `${day} ${DAY_PARTS[language].joiner} ${indianTime(date, language)}`;
  }
  return new Intl.DateTimeFormat(locale(language), {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  }).format(date);
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

// Time only, e.g. "6:30 pm" / "शाम 6:30 बजे" / "संध्याकाळी ६:३० वाजता"
export function formatTime(value, language = "EN") {
  if (!value) return null;
  if (DAY_PARTS[language]) return indianTime(value, language);
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
