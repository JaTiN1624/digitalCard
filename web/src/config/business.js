// Studio details used across the public site. Set these in web/.env (see .env.example);
// nothing here is customer data.
const env = import.meta.env;

// Accepts the way people actually type a number — "+91 98765 43210", "098765 43210",
// "9876543210" — and returns international digits without "+" ("919876543210"), which is
// what wa.me and tel: links need. Returns "" for anything that can't be a phone number.
// Keep in sync with the build-time check in vite.config.js.
export function normalizePhone(raw = "") {
  let digits = String(raw).replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1); // 0 + Indian mobile
  if (digits.length === 10 && /^[6-9]/.test(digits)) digits = `91${digits}`; // Indian mobile without +91
  return digits.length >= 11 && digits.length <= 15 ? digits : "";
}

export const BUSINESS = {
  name: env.VITE_BRAND_NAME || "Digital Invitations",
  // Set VITE_WHATSAPP_NUMBER on Vercel (Settings → Environment Variables), then redeploy:
  // Vite bakes it in at build time. Empty = contact buttons fall back to WhatsApp's chat picker
  // and the phone number / floating button are hidden.
  whatsapp: normalizePhone(env.VITE_WHATSAPP_NUMBER),
  instagram: env.VITE_INSTAGRAM_URL || "",
  region: env.VITE_BUSINESS_REGION || "Nagpur · Maharashtra · All India",
};

// WhatsApp chat with the studio, message filled in
export function whatsappLink(message) {
  const text = encodeURIComponent(message);
  return BUSINESS.whatsapp ? `https://wa.me/${BUSINESS.whatsapp}?text=${text}` : `https://wa.me/?text=${text}`;
}

// Tap-to-call link, or null when no number is configured
export const callLink = () => (BUSINESS.whatsapp ? `tel:+${BUSINESS.whatsapp}` : null);

// Human-readable number: "+91 98765 43210" for Indian mobiles, "+<digits>" otherwise
export function phoneDisplay(digits = BUSINESS.whatsapp) {
  if (!digits) return "";
  if (digits.length === 12 && digits.startsWith("91")) return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
  return `+${digits}`;
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
