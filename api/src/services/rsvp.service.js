import { invitationRepository } from "../repositories/invitation.repository.js";
import { invitationService } from "./invitation.service.js";
import { ApiError } from "../utils/api-response.js";

export const rsvpService = {
  async submit(slug, data) {
    const invitation = await invitationRepository.findBySlug(slug);
    if (!invitation || invitation.status !== "PUBLISHED") {
      throw new ApiError(404, "Invitation not found");
    }

    const guestCount = data.attendance === "NOT_ATTENDING" ? 0 : data.guestCount;

    try {
      return await invitationRepository.createRsvpWithGuest(invitation.id, { ...data, guestCount });
    } catch (err) {
      if (err.code === "P2002") {
        throw new ApiError(409, "You have already responded to this invitation");
      }
      throw err;
    }
  },

  async list(slug) {
    const invitation = await invitationService.getBySlug(slug);
    const guests = await invitationRepository.findGuestsWithRsvps(invitation.id);

    const responded = guests.filter((g) => g.rsvp);
    const count = (a) => responded.filter((g) => g.rsvp.attendance === a).length;

    return {
      summary: {
        totalGuests: guests.length,
        responded: responded.length,
        attending: count("ATTENDING"),
        notAttending: count("NOT_ATTENDING"),
        maybe: count("MAYBE"),
        headcount: responded
          .filter((g) => g.rsvp.attendance === "ATTENDING")
          .reduce((sum, g) => sum + g.rsvp.guestCount, 0),
      },
      guests,
    };
  },
};
