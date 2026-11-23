// Backend language enum -> BCP 47 locale
export const LOCALES = { EN: "en-IN", HI: "hi-IN", MR: "mr-IN" };

export function formatEventDate(value, language = "EN") {
  if (!value) return null;
  return new Intl.DateTimeFormat(LOCALES[language] ?? "en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  }).format(new Date(value));
}
