import { z } from "zod";

export const slugParams = z.object({
  slug: z.string().trim().toLowerCase().min(1).max(100),
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
  templateKey: z.string().trim().min(1).max(50).default("classic"),
  eventDate: z.coerce.date().optional(),
  config: z.record(z.string(), z.unknown()).default({}),
});

export const createRsvpBody = z.object({
  name: z.string().trim().min(1).max(200),
  phone: z.string().trim().regex(/^\+?[0-9]{10,15}$/, "Enter a valid phone number"),
  attendance: z.enum(["ATTENDING", "NOT_ATTENDING", "MAYBE"]),
  guestCount: z.number().int().min(0).max(20).default(1),
  message: z.string().trim().max(1000).optional(),
});
