import { invitationService } from "../services/invitation.service.js";
import { ok, created } from "../utils/api-response.js";

export const getInvitation = async (req, res) => {
  ok(res, await invitationService.getBySlug(req.validated.params.slug));
};

export const createInvitation = async (req, res) => {
  created(res, await invitationService.create(req.validated.body));
};
