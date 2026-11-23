import { invitationRepository } from "../repositories/invitation.repository.js";
import { ApiError } from "../utils/api-response.js";

export const invitationService = {
  async getBySlug(slug) {
    const invitation = await invitationRepository.findBySlug(slug);
    if (!invitation) throw new ApiError(404, "Invitation not found");
    return invitation;
  },

  create: (data) => invitationRepository.create(data),
};
