// Studio details used across the public site. Set these in web/.env (see .env.example);
// nothing here is customer data.
const env = import.meta.env;

export const BUSINESS = {
  name: env.VITE_BRAND_NAME || "Digital Invitations",
  // International format without "+", e.g. 919876543210. Empty = WhatsApp opens without a
  // recipient and the visitor picks the chat themselves.
  whatsapp: (env.VITE_WHATSAPP_NUMBER || "").replace(/\D/g, ""),
  instagram: env.VITE_INSTAGRAM_URL || "",
  region: env.VITE_BUSINESS_REGION || "Nagpur · Maharashtra · All India",
};

// WhatsApp chat with the studio, message filled in
export function whatsappLink(message) {
  const text = encodeURIComponent(message);
  return BUSINESS.whatsapp ? `https://wa.me/${BUSINESS.whatsapp}?text=${text}` : `https://wa.me/?text=${text}`;
}

// WhatsApp message for "Customize": design, occasion, package and price, then room for details
export function customizeMessage({ design, occasion, packageName, priceText }) {
  const lines = [`Hi ${BUSINESS.name}! I'd like to customise an invitation.`, `Design: ${design}`];
  if (occasion) lines.push(`Occasion: ${occasion}`);
  if (packageName) lines.push(`Package: ${packageName}${priceText ? ` (${priceText})` : ""}`);
  else if (priceText) lines.push(`Price: from ${priceText}`);
  lines.push("", "My event details:");
  return lines.join("\n");
}
