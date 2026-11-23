export class ApiError extends Error {
  constructor(statusCode, message, details) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}

export const ok = (res, data, statusCode = 200) =>
  res.status(statusCode).json({ success: true, data });

export const created = (res, data) => ok(res, data, 201);
