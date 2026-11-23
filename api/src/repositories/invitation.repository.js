import { prisma } from "../config/prisma.js";

export const invitationRepository = {
  findBySlug: (slug) => prisma.invitation.findUnique({ where: { slug } }),

  create: (data) => prisma.invitation.create({ data }),

  createRsvp: (invitationId, data) =>
    prisma.rsvp.create({ data: { ...data, invitationId } }),

  findRsvps: (invitationId) =>
    prisma.rsvp.findMany({ where: { invitationId }, orderBy: { createdAt: "desc" } }),
};
