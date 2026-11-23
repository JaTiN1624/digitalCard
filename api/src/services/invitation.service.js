import { invitationRepository } from "../repositories/invitation.repository.js";
import { ApiError } from "../utils/api-response.js";

export const invitationService = {
  // Admin: any status
  async getBySlug(slug) {
    const invitation = await invitationRepository.findBySlug(slug);
    if (!invitation) throw new ApiError(404, "Invitation not found");
    return invitation;
  },

  // Public: drafts look like "not found"
  async getPublicBySlug(slug) {
    const invitation = await invitationRepository.findPublishedBySlug(slug);
    if (!invitation) throw new ApiError(404, "Invitation not found");
    return invitation;
  },

  create: (data) => invitationRepository.create(data),

  async publish(slug) {
    const invitation = await invitationService.getBySlug(slug);
    return invitationRepository.publish(invitation.id);
  },
};
