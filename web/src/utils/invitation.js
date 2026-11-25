// Helpers for reading invitation data. All config fields are optional; sections hide when empty.
// Field list must stay in sync with api/src/validators/invitation.validator.js

export const OCCASIONS = [
  "WEDDING",
  "ENGAGEMENT",
  "HALDI",
  "MEHENDI",
  "SANGEET",
  "COCKTAIL",
  "RECEPTION",
  "CELEBRATION", // several pre-wedding functions on one invitation
  "BIRTHDAY",
];

// Sections a customer can switch off with config.hiddenSections
export const SECTION_KEYS = [
  "date",
  "countdown",
  "events",
  "story",
  "gallery",
  "reception",
  "venue",
  "travel",
  "rsvp",
  "share",
  // birthday sections
  "age",
  "cake",
  "dressCode",
  "contact",
  "celebrate",
];

export const occasionOf = (invitation) =>
  OCCASIONS.includes(invitation.config?.occasion) ? invitation.config.occasion : "WEDDING";

export const isHidden = (invitation, key) => (invitation.config?.hiddenSections ?? []).includes(key);

export const isBirthday = (invitation) => occasionOf(invitation) === "BIRTHDAY";

// Age-based birthday experience. The stage picks the headline wording; customers just set the age.
//   FIRST (1) · KIDS (2–12) · TEEN (13–17) · MILESTONE (18, 21, 25) · CHEERS (30, 40)
//   GOLDEN (50, 60, 70 …) · ADULT (any other age) · GENERAL (no age given)
export function birthdayStage(age) {
  const n = Number(age);
  if (!Number.isInteger(n) || n < 1) return "GENERAL";
  if (n === 1) return "FIRST";
  if (n <= 12) return "KIDS";
  if (n <= 17) return "TEEN";
  if ([18, 21, 25].includes(n)) return "MILESTONE";
  if ([30, 40].includes(n)) return "CHEERS";
  if (n >= 50 && n % 10 === 0) return "GOLDEN";
  return "ADULT";
}

export const birthdayAge = (invitation) => {
  const n = Number(invitation.config?.age);
  return Number.isInteger(n) && n > 0 ? n : null;
};

// One name for covers, sharing and the thank-you: the couple, the birthday person, or the title
export function displayName(invitation) {
  const { groom, bride, celebrant } = invitation.config ?? {};
  if (groom && bride) return `${groom} & ${bride}`;
  return celebrant || invitation.title || "";
}

export const coupleNames = (invitation) => ({
  groom: invitation.config?.groom ?? "",
  bride: invitation.config?.bride ?? "",
});

export const sortedEvents = (invitation) =>
  [...(invitation.config?.events ?? [])].sort((a, b) => new Date(a.date) - new Date(b.date));

// Images may be full https links or files bundled with the site ("/samples/x.svg").
// Anything else (javascript:, data:, protocol-relative //host) is rejected.
export function safeMediaUrl(value) {
  if (typeof value !== "string" || !value) return null;
  if (/^\/(?![/\\])/.test(value)) return value;
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.href : null;
  } catch {
    return null;
  }
}

// Pick an icon for a function from its name, in any of the three languages
const FUNCTION_KEYWORDS = [
  ["haldi", /haldi|हल्दी|हळद/i],
  ["mehendi", /meh[e]?nd[i]?|mehndi|मेहंदी|मेहेंदी|मेंदी/i],
  ["sangeet", /sangeet|sangit|संगीत/i],
  ["cocktail", /cocktail|कॉकटेल|party|पार्टी/i],
  ["engagement", /engage|ring|sagai|सगाई|साखरपुडा|रिंग/i],
  ["reception", /reception|स्वागत/i],
  ["puja", /puja|pooja|पूजा|ganesh|गणेश|devak|देवक/i],
  ["baraat", /baraat|barat|बारात|वरात/i],
  ["wedding", /wedding|vivah|विवाह|शुभमंगल|लग्न|फेरे|pheras/i],
  // birthday party schedule
  ["cake", /cake|केक/i],
  ["games", /game|खेल|खेळ|treasure|quiz/i],
  ["food", /dinner|lunch|brunch|food|buffet|भोजन|खाना|जेवण|नाश्ता/i],
  ["magic", /magic|जादू|show|शो|puppet/i],
  ["music", /music|dance|dj|डांस|नृत्य|गाणी/i],
];

export function functionKind(name = "") {
  return FUNCTION_KEYWORDS.find(([, re]) => re.test(name))?.[0] ?? "celebration";
}

// Latin names animate letter by letter; Devanagari animates word by word so conjuncts stay joined
export const isLatin = (text = "") => /^[\p{Script=Latin}\p{N}\s'’.,&-]*$/u.test(text);
