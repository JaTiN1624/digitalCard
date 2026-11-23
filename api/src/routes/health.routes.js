import { Router } from "express";
import { prisma } from "../config/prisma.js";

const router = Router();

router.get("/", async (req, res) => {
  let db = "up";
  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch {
    db = "down";
  }
  res.status(db === "up" ? 200 : 503).json({
    success: db === "up",
    message: db === "up" ? "Wedding Invitation API is running" : "API is running but the database is unreachable",
    db,
    timestamp: new Date().toISOString(),
  });
});

export default router;
