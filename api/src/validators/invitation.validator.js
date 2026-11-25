import { z } from "zod";

export const slugParams = z.object({
  slug: z.string().trim().toLowerCase().min(1).max(100),
});

// Must match the template registry in web/src/templates/index.js
export const TEMPLATE_KEYS = [
  "classic",
  "royal",
  "floral",
  "maharashtrian",
  "minimal",
  "cinematic",
  "prewedding",
  "engagement",
  "destination",
  // birthday collection
  "bday-kids",
  "bday-princess",
  "bday-superhero",
  "bday-luxury",
  "bday-neon",
  "bday-garden",
  "bday-modern",
  "bday-first",
  "bday-gaming",
  "bday-space",
];

// Must match OCCASIONS and SECTION_KEYS in web/src/utils/invitation.js
export const OCCASIONS = ["WEDDING", "ENGAGEMENT", "HALDI", "MEHENDI", "SANGEET", "COCKTAIL", "RECEPTION", "CELEBRATION", "BIRTHDAY"];
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
  // birthday
  "age",
  "cake",
  "dressCode",
  "contact",
  "celebrate",
];

const optionalText = (max) => z.string().trim().min(1).max(max).optional();

// https only: blocks javascript: and other unsafe links
const httpsUrl = z.url({ protocol: /^https$/ }).max(2000).optional();

const eventSchema = z.object({
  name: z.string().trim().min(1).max(100),
  date: z.iso.datetime({ offset: true }),
  venue: optionalText(300),
  address: optionalText(500),
  mapUrl: httpsUrl,
  image: httpsUrl,
  description: optionalText(500),
});

// Invitation content shown by every template. Unknown keys are stripped.
export const invitationConfig = z.object({
  groom: optionalText(100),
  bride: optionalText(100),
  groomParents: optionalText(200),
  brideParents: optionalText(200),
  venue: optionalText(300),
  message: optionalText(2000),
  hashtag: z
    .string()
    .trim()
    // \p{M} = combining marks, needed for Devanagari vowel signs (e.g. स्नेहा)
    .regex(/^[\p{L}\p{M}\p{N}_]+$/u, "Letters, numbers and underscores only")
    .max(50)
    .optional(),
  events: z.array(eventSchema).max(10).default([]),
  // Everything below is optional; templates hide a section when its data is missing
  occasion: z.enum(OCCASIONS).optional(),
  hiddenSections: z.array(z.enum(SECTION_KEYS)).max(SECTION_KEYS.length).optional(),
  coverImage: httpsUrl,
  storyImage: httpsUrl,
  story: optionalText(3000),
  timeline: z
    .array(
      z.object({
        title: z.string().trim().min(1).max(120),
        date: optionalText(60), // free text such as "2019" or "Monsoon 2021"
        text: optionalText(600),
        image: httpsUrl,
      }),
    )
    .max(12)
    .optional(),
  gallery: z
    .array(z.object({ url: z.url({ protocol: /^https$/ }).max(2000), caption: optionalText(140) }))
    .max(30)
    .optional(),
  reception: eventSchema.extend({ name: optionalText(100) }).optional(),
  travelNote: optionalText(2000),
  // Birthday invitations (occasion BIRTHDAY)
  celebrant: optionalText(100), // the birthday person's name
  age: z.number().int().min(1).max(120).optional(),
  host: optionalText(200), // parents for a child's party, host for adults
  rsvpPhone: z
    .string()
    .trim()
    .regex(/^\+?[0-9]{10,15}$/, "Enter a valid phone number")
    .optional(),
  dressCode: optionalText(300),
  endDate: z.iso.datetime({ offset: true }).optional(),
  address: optionalText(500), // venue address (weddings take it from the main event)
  mapUrl: httpsUrl,
});

export const createInvitationBody = z.object({
  clientId: z.string().min(1),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .max(100)
    .regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers and dashes"),
  title: z.string().trim().min(1).max(200),
  language: z.enum(["EN", "HI", "MR"]).default("EN"),
  templateKey: z.enum(TEMPLATE_KEYS).default("classic"),
  eventDate: z.coerce.date().optional(),
  config: invitationConfig.default({ events: [] }),
});

export const createRsvpBody = z.object({
  name: z.string().trim().min(1).max(200),
  phone: z.string().trim().regex(/^\+?[0-9]{10,15}$/, "Enter a valid phone number"),
  attendance: z.enum(["ATTENDING", "NOT_ATTENDING", "MAYBE"]),
  guestCount: z.number().int().min(0).max(20).default(1),
  message: z.string().trim().max(1000).optional(),
});
