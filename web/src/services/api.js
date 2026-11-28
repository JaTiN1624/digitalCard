import axios from "axios";

export class ApiRequestError extends Error {
  constructor(message, status, details) {
    super(message);
    this.status = status; // 0 = network error / server unreachable
    this.details = details; // field errors from the backend validator
  }
}

// The API runs on Render's free plan, which sleeps after 15 idle minutes and needs ~50 s to
// wake. A short timeout turned that wake-up into "Cannot reach the server" for the first guest,
// so allow time for a cold start and retry a failed read once.
const TIMEOUT_MS = 45_000;

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api/v1",
  timeout: TIMEOUT_MS,
  headers: { "Content-Type": "application/json" },
});

// Retry only reads (GET) that never got a response: a timeout or a dropped connection.
// Writes (e.g. an RSVP) are never retried automatically, so nothing is submitted twice.
function shouldRetry(error) {
  const { config } = error;
  return Boolean(config) && !config.__retried && config.method === "get" && !error.response && !axios.isCancel(error);
}

// Backend responds { success, data } or { success: false, error: { message, details } }.
// Unwrap `data` on success and turn failures into one readable error type.
api.interceptors.response.use(
  (response) => response.data.data,
  (error) => {
    if (shouldRetry(error)) {
      error.config.__retried = true;
      return api.request(error.config);
    }
    // Aborted on purpose (component unmounted / slug changed): pass through untouched
    if (axios.isCancel(error)) return Promise.reject(error);

    const status = error.response?.status ?? 0;
    const body = error.response?.data?.error;
    const message =
      body?.message ??
      (status === 0
        ? "Cannot reach the server. Please check your connection and try again."
        : "Something went wrong. Please try again.");
    return Promise.reject(new ApiRequestError(message, status, body?.details));
  },
);
