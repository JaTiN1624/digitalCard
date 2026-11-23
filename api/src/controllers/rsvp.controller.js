import { rsvpService } from "../services/rsvp.service.js";
import { ok, created } from "../utils/api-response.js";

export const submitRsvp = async (req, res) => {
  created(res, await rsvpService.submit(req.validated.params.slug, req.validated.body));
};

export const listRsvps = async (req, res) => {
  ok(res, await rsvpService.list(req.validated.params.slug));
};
