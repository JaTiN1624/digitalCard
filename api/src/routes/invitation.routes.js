import { Router } from "express";
import { getInvitation, createInvitation } from "../controllers/invitation.controller.js";
import { submitRsvp, listRsvps } from "../controllers/rsvp.controller.js";
import { requireAdmin } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  slugParams,
  createInvitationBody,
  createRsvpBody,
} from "../validators/invitation.validator.js";

const router = Router();

// Public
router.get("/:slug", validate({ params: slugParams }), getInvitation);
router.post("/:slug/rsvps", validate({ params: slugParams, body: createRsvpBody }), submitRsvp);

// Admin (x-api-key header)
router.post("/", requireAdmin, validate({ body: createInvitationBody }), createInvitation);
router.get("/:slug/rsvps", requireAdmin, validate({ params: slugParams }), listRsvps);

export default router;
