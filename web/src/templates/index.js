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
// Birthday collection
const KidsBirthdayTemplate = lazy(() => import("./birthday/KidsBirthdayTemplate.jsx"));
const PrincessBirthdayTemplate = lazy(() => import("./birthday/PrincessBirthdayTemplate.jsx"));
const SuperheroBirthdayTemplate = lazy(() => import("./birthday/SuperheroBirthdayTemplate.jsx"));
const LuxuryBirthdayTemplate = lazy(() => import("./birthday/LuxuryBirthdayTemplate.jsx"));
const NeonBirthdayTemplate = lazy(() => import("./birthday/NeonBirthdayTemplate.jsx"));
const GardenBirthdayTemplate = lazy(() => import("./birthday/GardenBirthdayTemplate.jsx"));
const ModernBirthdayTemplate = lazy(() => import("./birthday/ModernBirthdayTemplate.jsx"));
const FirstBirthdayTemplate = lazy(() => import("./birthday/FirstBirthdayTemplate.jsx"));
const GamingBirthdayTemplate = lazy(() => import("./birthday/GamingBirthdayTemplate.jsx"));
const SpaceBirthdayTemplate = lazy(() => import("./birthday/SpaceBirthdayTemplate.jsx"));

// Template registry. Keys are stored as Invitation.templateKey in the database and
// must match TEMPLATE_KEYS in api/src/validators/invitation.validator.js
// `collection` groups templates on the selection page (default "wedding").
// `occasion` is the default occasion used for previews (customers can set any occasion).
// `sampleAge` is the age shown in birthday previews.
export const TEMPLATES = {
  classic: {
    name: "Classic",
    description: "Ivory card, maroon & gold, opened from an envelope",
    category: "Traditional",
    premium: false,
    component: ClassicTemplate,
  },
  royal: {
    name: "Royal Maharaja",
    description: "Velvet book opening, gold frame, rising gold dust",
    category: "Traditional",
    premium: true,
    component: RoyalTemplate,
  },
  floral: {
    name: "Pastel Floral",
    description: "Sealed envelope, falling petals and a golden scroll",
    category: "Romantic",
    premium: false,
    component: FloralTemplate,
  },
  maharashtrian: {
    name: "Maharashtrian",
    description: "Temple doors, toran, self-drawing rangoli and diyas",
    category: "Regional",
    premium: false,
    component: MaharashtrianTemplate,
  },
  minimal: {
    name: "Minimal Luxury",
    description: "Linen card, editorial type and photography",
    category: "Modern",
    premium: true,
    component: MinimalTemplate,
  },
  cinematic: {
    name: "Cinematic Love Story",
    description: "Film title opening, full-screen photo and story timeline",
    category: "Premium",
    premium: true,
    component: CinematicTemplate,
  },
  prewedding: {
    name: "Pre-Wedding Celebration",
    description: "Haldi, Mehendi, Sangeet — marigolds, toran and colour",
    category: "Festive",
    premium: false,
    occasion: "CELEBRATION",
    component: PreWeddingTemplate,
  },
  engagement: {
    name: "Engagement",
    description: "Ring box opening, champagne and blush",
    category: "Engagement",
    premium: true,
    occasion: "ENGAGEMENT",
    component: EngagementTemplate,
  },
  destination: {
    name: "Destination Wedding",
    description: "Boarding pass, full-screen destination and itinerary",
    category: "Destination",
    premium: true,
    component: DestinationTemplate,
  },

  // ---------------- Birthday collection ----------------
  "bday-kids": {
    name: "Kids Cartoon & Fantasy",
    description: "Rainbows, balloons and a gift box that pops open",
    category: "Kids",
    collection: "birthday",
    occasion: "BIRTHDAY",
    sampleAge: 5,
    premium: false,
    component: KidsBirthdayTemplate,
  },
  "bday-princess": {
    name: "Royal Princess",
    description: "Storybook opening, castle, crown and butterflies",
    category: "Kids",
    collection: "birthday",
    occasion: "BIRTHDAY",
    sampleAge: 6,
    premium: true,
    component: PrincessBirthdayTemplate,
  },
  "bday-superhero": {
    name: "Superhero Adventure",
    description: "Comic panel burst, action lines and lightning",
    category: "Kids",
    collection: "birthday",
    occasion: "BIRTHDAY",
    sampleAge: 7,
    premium: false,
    component: SuperheroBirthdayTemplate,
  },
  "bday-first": {
    name: "First Birthday",
    description: "Pastel teddy, balloons and a big animated 1",
    category: "First birthday",
    collection: "birthday",
    occasion: "BIRTHDAY",
    sampleAge: 1,
    premium: false,
    component: FirstBirthdayTemplate,
  },
  "bday-gaming": {
    name: "Gaming Level Up",
    description: "Arcade start screen, pixels and a level-up age",
    category: "Teen",
    collection: "birthday",
    occasion: "BIRTHDAY",
    sampleAge: 13,
    premium: false,
    component: GamingBirthdayTemplate,
  },
  "bday-space": {
    name: "Space & Galaxy",
    description: "Starfield, rocket lift-off and a glowing name",
    category: "Kids & teen",
    collection: "birthday",
    occasion: "BIRTHDAY",
    sampleAge: 9,
    premium: true,
    component: SpaceBirthdayTemplate,
  },
  "bday-neon": {
    name: "Neon Party",
    description: "Club lights, neon sign and a live equaliser",
    category: "Teen & adult",
    collection: "birthday",
    occasion: "BIRTHDAY",
    sampleAge: 21,
    premium: true,
    component: NeonBirthdayTemplate,
  },
  "bday-luxury": {
    name: "Luxury Black & Gold",
    description: "Black envelope, gold dust and a light sweep",
    category: "Adult",
    collection: "birthday",
    occasion: "BIRTHDAY",
    sampleAge: 30,
    premium: true,
    component: LuxuryBirthdayTemplate,
  },
  "bday-garden": {
    name: "Floral Garden",
    description: "Blooming daisies, butterflies and petals",
    category: "Adult",
    collection: "birthday",
    occasion: "BIRTHDAY",
    sampleAge: 40,
    premium: false,
    component: GardenBirthdayTemplate,
  },
  "bday-modern": {
    name: "Minimal Modern",
    description: "Linen card, large type and quiet motion",
    category: "Adult",
    collection: "birthday",
    occasion: "BIRTHDAY",
    sampleAge: 50,
    premium: false,
    component: ModernBirthdayTemplate,
  },
};

export const COLLECTIONS = ["wedding", "birthday"];

export const collectionOf = (key) => TEMPLATES[key]?.collection ?? "wedding";

export const DEFAULT_TEMPLATE = "classic";

export const getTemplate = (key) => TEMPLATES[key] ?? TEMPLATES[DEFAULT_TEMPLATE];
