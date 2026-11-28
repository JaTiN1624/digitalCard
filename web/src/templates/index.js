import "../components/invitation/motion/motion.css";
import "../components/invitation/sections/sections.css";
import "./templates.css";
import { lazy } from "react";

// Each template is its own chunk (with its CSS), so a guest only downloads the design their
// invitation uses. Render inside <Suspense>.
const ClassicTemplate = lazy(() => import("./ClassicTemplate.jsx"));
const RoyalTemplate = lazy(() => import("./RoyalTemplate.jsx"));
const FloralTemplate = lazy(() => import("./FloralTemplate.jsx"));
const MaharashtrianTemplate = lazy(() => import("./MaharashtrianTemplate.jsx"));
const MinimalTemplate = lazy(() => import("./MinimalTemplate.jsx"));
const CinematicTemplate = lazy(() => import("./CinematicTemplate.jsx"));
const PreWeddingTemplate = lazy(() => import("./PreWeddingTemplate.jsx"));
const EngagementTemplate = lazy(() => import("./EngagementTemplate.jsx"));
const DestinationTemplate = lazy(() => import("./DestinationTemplate.jsx"));
// Birthday collection: every design has its own composition, cover and motion
const LittleDreamerTemplate = lazy(() => import("./birthday/LittleDreamerTemplate.jsx"));
const MidnightLuxeTemplate = lazy(() => import("./birthday/MidnightLuxeTemplate.jsx"));
const PrincessFairytaleTemplate = lazy(() => import("./birthday/PrincessFairytaleTemplate.jsx"));
const GameOnTemplate = lazy(() => import("./birthday/GameOnTemplate.jsx"));
const ModernEditorialTemplate = lazy(() => import("./birthday/ModernEditorialTemplate.jsx"));
const JungleSafariTemplate = lazy(() => import("./birthday/JungleSafariTemplate.jsx"));
const CosmicAdventureTemplate = lazy(() => import("./birthday/CosmicAdventureTemplate.jsx"));
const RetroDiscoTemplate = lazy(() => import("./birthday/RetroDiscoTemplate.jsx"));
const EnchantedGardenTemplate = lazy(() => import("./birthday/EnchantedGardenTemplate.jsx"));
const CarnivalTemplate = lazy(() => import("./birthday/CarnivalTemplate.jsx"));
const RoyalPrinceTemplate = lazy(() => import("./birthday/RoyalPrinceTemplate.jsx"));
const BirthdayMemoriesTemplate = lazy(() => import("./birthday/BirthdayMemoriesTemplate.jsx"));
// Anniversary and baby shower
const TimelessLoveTemplate = lazy(() => import("./occasions/TimelessLoveTemplate.jsx"));
const PastelDreamsTemplate = lazy(() => import("./occasions/PastelDreamsTemplate.jsx"));
// Earlier birthday designs: still render for invitations already made with them, not listed
const KidsBirthdayTemplate = lazy(() => import("./birthday/KidsBirthdayTemplate.jsx"));
const SuperheroBirthdayTemplate = lazy(() => import("./birthday/SuperheroBirthdayTemplate.jsx"));

// Template registry. Keys are stored as Invitation.templateKey in the database and
// must match TEMPLATE_KEYS in api/src/validators/invitation.validator.js — never rename a key.
//   group       gallery occasion: wedding | birthday | engagement | anniversary | babyShower
//   collection  price list and sample family (default "wedding")
//   featured    shown in the curated showroom; the rest appear under "View all designs"
//   occasion    default occasion used for previews (customers can set any occasion)
//   tier        the starting package in config/pricing.js; `pricing` picks another price list
//   audience    who the design is made for (shown on the gallery card)
//   thumbnails  real screenshots in public/previews/<key>.webp (and <key>-cover.webp)
//   sampleAge   age shown in birthday previews
//   listed      false = still works for existing invitations but hidden from the gallery
export const TEMPLATES = {
  classic: {
    group: "wedding",
    name: "Classic",
    description: "Ivory card, maroon & gold, opened from an envelope",
    audience: "Traditional weddings",
    tier: "essential",
    component: ClassicTemplate,
  },
  royal: {
    group: "wedding",
    name: "Royal Indian",
    featured: true,
    description: "Velvet book opening, gold frame, rising gold dust",
    audience: "Grand Indian weddings",
    tier: "royal",
    component: RoyalTemplate,
  },
  floral: {
    group: "wedding",
    name: "Floral Romance",
    featured: true,
    description: "Sealed envelope, falling petals and a golden scroll",
    audience: "Romantic weddings",
    tier: "essential",
    component: FloralTemplate,
  },
  maharashtrian: {
    group: "wedding",
    name: "Maharashtrian Heritage",
    featured: true,
    description: "Temple doors, toran, self-drawing rangoli and diyas",
    audience: "Marathi weddings",
    tier: "essential",
    component: MaharashtrianTemplate,
  },
  minimal: {
    group: "wedding",
    name: "Minimal Luxury",
    featured: true,
    description: "Linen card, editorial type and photography",
    audience: "Modern couples",
    tier: "celebration",
    component: MinimalTemplate,
  },
  cinematic: {
    group: "wedding",
    name: "Cinematic Love Story",
    description: "Film title opening, full-screen photo and story timeline",
    audience: "Couples with a story to tell",
    tier: "royal",
    component: CinematicTemplate,
  },
  prewedding: {
    group: "wedding",
    name: "Pre-Wedding Celebration",
    description: "Haldi, Mehendi, Sangeet — marigolds, toran and colour",
    audience: "Haldi, Mehendi & Sangeet",
    tier: "celebration",
    occasion: "CELEBRATION",
    component: PreWeddingTemplate,
  },
  engagement: {
    group: "engagement",
    name: "Elegant Romance",
    featured: true,
    description: "Ring box opening, champagne and blush",
    audience: "Engagement & ring ceremony",
    tier: "start",
    pricing: "engagement",
    occasion: "ENGAGEMENT",
    component: EngagementTemplate,
  },
  destination: {
    group: "wedding",
    name: "Destination Wedding",
    description: "Boarding pass, full-screen destination and itinerary",
    audience: "Destination weddings",
    tier: "royal",
    component: DestinationTemplate,
  },

  // ---------------- Birthday collection ----------------
  "bday-first": {
    group: "birthday",
    name: "Little Dreamer",
    featured: true,
    description: "Pastel sky, teddy on a cloud, a gift box that opens",
    audience: "First birthdays & toddlers",
    collection: "birthday",
    occasion: "BIRTHDAY",
    sampleAge: 1,
    tier: "premium",
    component: LittleDreamerTemplate,
  },
  "bday-luxury": {
    group: "birthday",
    name: "Midnight Luxe",
    featured: true,
    description: "Spotlight reveal, black and champagne gold, a printed programme",
    audience: "Adult birthdays",
    collection: "birthday",
    occasion: "BIRTHDAY",
    sampleAge: 30,
    tier: "luxury",
    component: MidnightLuxeTemplate,
  },
  "bday-princess": {
    group: "birthday",
    name: "Princess Fairytale",
    featured: true,
    description: "Castle gates swing open onto a storybook in chapters",
    audience: "Girls' birthdays",
    collection: "birthday",
    occasion: "BIRTHDAY",
    sampleAge: 6,
    tier: "premium",
    component: PrincessFairytaleTemplate,
  },
  "bday-gaming": {
    group: "birthday",
    name: "Game On",
    featured: true,
    description: "Press start, a player HUD, level select and a final boss cake",
    audience: "Boys' birthdays & gamers",
    collection: "birthday",
    occasion: "BIRTHDAY",
    sampleAge: 10,
    tier: "premium",
    component: GameOnTemplate,
  },
  "bday-modern": {
    group: "birthday",
    name: "Modern Editorial",
    featured: true,
    description: "A magazine cover: masthead, issue number, agenda and pull quote",
    audience: "Teens & adults",
    collection: "birthday",
    occasion: "BIRTHDAY",
    sampleAge: 50,
    tier: "essential",
    component: ModernEditorialTemplate,
  },
  "bday-safari": {
    group: "birthday",
    name: "Jungle Safari",
    description: "Leaves part, animals walk in, a swipeable safari trail",
    audience: "Children's birthdays",
    collection: "birthday",
    occasion: "BIRTHDAY",
    sampleAge: 4,
    tier: "essential",
    component: JungleSafariTemplate,
  },
  "bday-space": {
    group: "birthday",
    name: "Cosmic Adventure",
    description: "3 · 2 · 1 lift-off, an orbiting name and a mission timeline",
    audience: "Space-loving kids",
    collection: "birthday",
    occasion: "BIRTHDAY",
    sampleAge: 8,
    tier: "premium",
    component: CosmicAdventureTemplate,
  },
  "bday-neon": {
    group: "birthday",
    name: "Retro Disco",
    description: "Disco ball drop, synthwave horizon and a vinyl tracklist",
    audience: "Teens & adults",
    collection: "birthday",
    occasion: "BIRTHDAY",
    sampleAge: 21,
    tier: "luxury",
    component: RetroDiscoTemplate,
  },
  "bday-garden": {
    group: "birthday",
    name: "Enchanted Garden",
    featured: true,
    description: "A bud blooms open, watercolour arch and pressed-flower cards",
    audience: "Elegant family celebrations",
    collection: "birthday",
    occasion: "BIRTHDAY",
    sampleAge: 40,
    tier: "essential",
    component: EnchantedGardenTemplate,
  },
  "bday-carnival": {
    group: "birthday",
    name: "Carnival Celebration",
    description: "Marquee lights switch on, big-top stripes and show-time tickets",
    audience: "Kids' birthday parties",
    collection: "birthday",
    occasion: "BIRTHDAY",
    sampleAge: 5,
    tier: "essential",
    component: CarnivalTemplate,
  },
  "bday-prince": {
    group: "birthday",
    name: "Royal Prince",
    description: "A wax seal breaks, royal blue velvet, crest and shields",
    audience: "First birthdays & boys' milestones",
    collection: "birthday",
    occasion: "BIRTHDAY",
    sampleAge: 1,
    tier: "premium",
    component: RoyalPrinceTemplate,
  },
  "bday-memories": {
    group: "birthday",
    name: "Birthday Memories",
    description: "A photo album opens onto a scrapbook and memory timeline",
    audience: "Milestone & family birthdays",
    collection: "birthday",
    occasion: "BIRTHDAY",
    sampleAge: 60,
    tier: "luxury",
    component: BirthdayMemoriesTemplate,
  },
  // ---------------- Anniversary & baby shower ----------------
  "anniv-timeless": {
    group: "anniversary",
    name: "Timeless Love",
    featured: true,
    description: "A clock turns back the years, roman numerals and the couple's journey",
    audience: "Wedding anniversaries",
    occasion: "ANNIVERSARY",
    tier: "start",
    pricing: "anniversary",
    component: TimelessLoveTemplate,
  },
  "baby-pastel": {
    group: "babyShower",
    name: "Pastel Dreams",
    featured: true,
    description: "A swaying cot mobile, watercolour pastels and hanging stars",
    audience: "Baby showers & godh bharai",
    occasion: "BABY_SHOWER",
    tier: "start",
    pricing: "babyShower",
    component: PastelDreamsTemplate,
  },
  "bday-kids": {
    group: "birthday",
    name: "Kids Cartoon & Fantasy",
    description: "Rainbows, balloons and a gift box that pops open",
    collection: "birthday",
    occasion: "BIRTHDAY",
    sampleAge: 5,
    tier: "essential",
    listed: false,
    component: KidsBirthdayTemplate,
  },
  "bday-superhero": {
    group: "birthday",
    name: "Superhero Adventure",
    description: "Comic panel burst, action lines and lightning",
    collection: "birthday",
    occasion: "BIRTHDAY",
    sampleAge: 7,
    tier: "essential",
    listed: false,
    component: SuperheroBirthdayTemplate,
  },
};

export const COLLECTIONS = ["wedding", "birthday"];

// Gallery occasions, in menu order
export const GROUPS = [
  { id: "wedding", label: "Wedding" },
  { id: "birthday", label: "Birthday" },
  { id: "engagement", label: "Engagement" },
  { id: "anniversary", label: "Anniversary" },
  { id: "babyShower", label: "Baby Shower" },
];

export const groupOf = (key) => TEMPLATES[key]?.group ?? "wedding";
export const groupLabel = (id) => GROUPS.find((g) => g.id === id)?.label ?? "";

export const collectionOf = (key) => TEMPLATES[key]?.collection ?? "wedding";

// Templates shown in the gallery, in registry order. Filter by group and/or featured.
export const listedTemplates = ({ group, featured } = {}) =>
  Object.entries(TEMPLATES)
    .filter(([, tpl]) => tpl.listed !== false && (!group || (tpl.group ?? "wedding") === group) && (!featured || tpl.featured))
    .map(([key, tpl]) => ({ key, ...tpl }));

export const DEFAULT_TEMPLATE = "classic";

export const getTemplate = (key) => TEMPLATES[key] ?? TEMPLATES[DEFAULT_TEMPLATE];
