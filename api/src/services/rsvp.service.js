import { invitationRepository } from "../repositories/invitation.repository.js";
import { invitationService } from "./invitation.service.js";

export const rsvpService = {
  async submit(slug, data) {
    const invitation = await invitationService.getBySlug(slug);
    const guestCount = data.attending ? data.guestCount : 0;
    return invitationRepository.createRsvp(invitation.id, { ...data, guestCount });
  },

  async list(slug) {
    const invitation = await invitationService.getBySlug(slug);
    const rsvps = await invitationRepository.findRsvps(invitation.id);
    const attending = rsvps.filter((r) => r.attending);
    return {
      summary: {
        responses: rsvps.length,
        attending: attending.length,
        declined: rsvps.length - attending.length,
        totalGuests: attending.reduce((sum, r) => sum + r.guestCount, 0),
      },
      rsvps,
    };
  },
};
