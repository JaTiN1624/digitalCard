import { z } from "zod";

export const slugParams = z.object({
  slug: z.string().trim().min(1).max(100),
});

export const createInvitationBody = z.object({
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .max(100)
    .regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers and dashes"),
  coupleNames: z.string().trim().min(1).max(200),
  eventDate: z.coerce.date(),
  venue: z.string().trim().min(1).max(300),
  message: z.string().trim().max(2000).optional(),
});

export const createRsvpBody = z.object({
  name: z.string().trim().min(1).max(200),
  phone: z.string().trim().max(20).optional(),
  attending: z.boolean(),
  guestCount: z.number().int().min(0).max(20).default(1),
  message: z.string().trim().max(1000).optional(),
});
