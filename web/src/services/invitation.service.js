import { api } from "./api.js";

export const getInvitation = (slug, { signal } = {}) =>
  api.get(`/invitations/${encodeURIComponent(slug)}`, { signal });

export const submitRsvp = (slug, rsvp) =>
  api.post(`/invitations/${encodeURIComponent(slug)}/rsvps`, rsvp);
