import { invitationService } from "../services/invitation.service.js";
import { ok, created } from "../utils/api-response.js";

export const getInvitation = async (req, res) => {
  ok(res, await invitationService.getPublicBySlug(req.validated.params.slug));
};

export const createInvitation = async (req, res) => {
  created(res, await invitationService.create(req.validated.body));
};

export const publishInvitation = async (req, res) => {
  ok(res, await invitationService.publish(req.validated.params.slug));
};
