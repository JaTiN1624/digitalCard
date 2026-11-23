import { timingSafeEqual } from "node:crypto";
import { env } from "../config/env.js";
import { ApiError } from "../utils/api-response.js";

const expected = Buffer.from(env.ADMIN_API_KEY);

// Simple admin guard: send header `x-api-key: <ADMIN_API_KEY>`.
export const requireAdmin = (req, res, next) => {
  const provided = Buffer.from(req.get("x-api-key") ?? "");
  if (provided.length !== expected.length || !timingSafeEqual(provided, expected)) {
    throw new ApiError(401, "Unauthorized");
  }
  next();
};
