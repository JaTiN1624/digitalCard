import { Router } from "express";
import healthRoutes from "./health.routes.js";
import invitationRoutes from "./invitation.routes.js";

const router = Router();

router.use("/health", healthRoutes);
router.use("/invitations", invitationRoutes);

export default router;
