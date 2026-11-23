import axios from "axios";

export class ApiRequestError extends Error {
  constructor(message, status, details) {
    super(message);
    this.status = status; // 0 = network error / server unreachable
    this.details = details; // field errors from the backend validator
  }
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// Backend responds { success, data } or { success: false, error: { message, details } }.
// Unwrap `data` on success and turn failures into one readable error type.
api.interceptors.response.use(
  (response) => response.data.data,
  (error) => {
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
