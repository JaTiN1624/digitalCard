import { prisma } from "../config/prisma.js";

export const invitationRepository = {
  findBySlug: (slug) => prisma.invitation.findUnique({ where: { slug } }),

  // Public view: only published invitations, only safe fields
  findPublishedBySlug: (slug) =>
    prisma.invitation.findFirst({
      where: { slug, status: "PUBLISHED" },
      select: {
        slug: true,
        title: true,
        language: true,
        templateKey: true,
        config: true,
        eventDate: true,
      },
    }),

  create: (data) => prisma.invitation.create({ data }),

  publish: (id) =>
    prisma.invitation.update({
      where: { id },
      data: { status: "PUBLISHED", publishedAt: new Date() },
    }),

  // Find or create the guest by phone, then create their RSVP — all or nothing
  createRsvpWithGuest: (invitationId, { name, phone, attendance, guestCount, message }) =>
    prisma.$transaction(async (tx) => {
      const guest = await tx.guest.upsert({
        where: { invitationId_phone: { invitationId, phone } },
        update: { name },
        create: { invitationId, name, phone },
      });
      return tx.rsvp.create({
        data: { guestId: guest.id, attendance, guestCount, message },
      });
    }),

  findGuestsWithRsvps: (invitationId) =>
    prisma.guest.findMany({
      where: { invitationId },
      include: { rsvp: true },
      orderBy: { createdAt: "desc" },
    }),
};
