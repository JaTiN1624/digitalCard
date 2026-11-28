import { STRINGS as BASE } from "./strings.js";
import { BIRTHDAY_STRINGS } from "./birthdayStrings.js";
import { BIRTHDAY_THEME_STRINGS } from "./birthdayThemeStrings.js";
import { OCCASION_STRINGS } from "./occasionStrings.js";

// One dictionary per language: shared wording plus the birthday collection's wording
const STRINGS = Object.fromEntries(
  Object.entries(BASE).map(([code, dict]) => [code, { ...dict, ...BIRTHDAY_STRINGS[code], ...BIRTHDAY_THEME_STRINGS[code], ...OCCASION_STRINGS[code] }]),
);

export const LANGUAGES = [
  { code: "EN", label: "English", htmlLang: "en" },
  { code: "HI", label: "हिन्दी", htmlLang: "hi" },
  { code: "MR", label: "मराठी", htmlLang: "mr" },
];

export const htmlLang = (language) =>
  LANGUAGES.find((l) => l.code === language)?.htmlLang ?? "en";

// Returns t(key, vars) for a language; falls back to English, then to the key.
export function getT(language) {
  const dict = STRINGS[language] ?? STRINGS.EN;
  return (key, vars = {}) => {
    const text = dict[key] ?? STRINGS.EN[key] ?? key;
    return text.replace(/\{(\w+)\}/g, (_, name) => vars[name] ?? "");
  };
}

// Wraps t so "<prefix>.<key>" wins over "<key>" when it exists. Birthday templates use
// withOverrides(t, "bday") so shared sections say "Party schedule" instead of "Wedding Events".
export function withOverrides(t, prefix) {
  return (key, vars) => {
    const scoped = `${prefix}.${key}`;
    const text = t(scoped, vars);
    return text === scoped ? t(key, vars) : text;
  };
}

// Ordinal number in the invitation language: 21st · 21वाँ · 21वा (1–4 and 6 are words in Hindi/Marathi)
const EN_SUFFIX = { one: "st", two: "nd", few: "rd", other: "th" };
const HI_WORDS = { 1: "पहला", 2: "दूसरा", 3: "तीसरा", 4: "चौथा", 6: "छठा" };
const MR_WORDS = { 1: "पहिला", 2: "दुसरा", 3: "तिसरा", 4: "चौथा" };

// Numerals follow the language like everywhere else on the invitation (Marathi uses १३)
const digits = (n, locale) => new Intl.NumberFormat(locale).format(n);

export function ordinal(n, language = "EN") {
  if (language === "HI") return HI_WORDS[n] ?? `${digits(n, "hi-IN")}वाँ`;
  if (language === "MR") return MR_WORDS[n] ?? `${digits(n, "mr-IN")}वा`;
  return `${n}${EN_SUFFIX[new Intl.PluralRules("en", { type: "ordinal" }).select(n)]}`;
}
