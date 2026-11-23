import { ApiError } from "../utils/api-response.js";
import { env } from "../config/env.js";

export const notFound = (req, res) =>
  res.status(404).json({
    success: false,
    error: { message: `Route not found: ${req.method} ${req.originalUrl}` },
  });

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  // Prisma unique-constraint violation (e.g. duplicate slug)
  if (err?.code === "P2002") {
    return res.status(409).json({ success: false, error: { message: "Resource already exists" } });
  }

  // Malformed JSON body
  if (err?.type === "entity.parse.failed") {
    return res.status(400).json({ success: false, error: { message: "Invalid JSON body" } });
  }

  const status = err instanceof ApiError ? err.statusCode : 500;
  if (status >= 500) console.error(err);

  res.status(status).json({
    success: false,
    error: {
      message: status >= 500 && env.NODE_ENV === "production" ? "Internal server error" : err.message,
      ...(err.details && { details: err.details }),
    },
  });
};
