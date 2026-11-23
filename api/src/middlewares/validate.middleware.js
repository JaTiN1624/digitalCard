import { z } from "zod";
import { ApiError } from "../utils/api-response.js";

// Usage: validate({ body: schema, params: schema, query: schema })
// Parsed values land on req.validated (Express 5 makes req.query read-only).
export const validate = (schemas) => (req, res, next) => {
  req.validated ??= {};
  for (const [key, schema] of Object.entries(schemas)) {
    const result = schema.safeParse(req[key] ?? {});
    if (!result.success) {
      throw new ApiError(400, "Validation failed", z.flattenError(result.error).fieldErrors);
    }
    req.validated[key] = result.data;
  }
  next();
};
