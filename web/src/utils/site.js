import { BUSINESS, whatsappLink } from "../config/business.js";

// Small helpers shared by the studio site pages
export const previewImage = (key, variant = "") => `/previews/${key}${variant ? `-${variant}` : ""}.webp`;
export const previewUrl = (key) => `/templates?template=${key}`;
export const enquiryLink = () => whatsappLink(`Hi ${BUSINESS.name}! I'd like to create a digital invitation.`);
