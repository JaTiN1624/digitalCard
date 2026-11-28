// Search and sharing metadata for every public page — one source for the client (usePageMeta),
// the build-time prerender (scripts/prerender.mjs) and the sitemap.
import { BUSINESS } from "../config/business.js";

export const SITE_URL = (import.meta.env.VITE_SITE_URL || "https://digital-card-iota-three.vercel.app").replace(/\/$/, "");

const brand = BUSINESS.name;
export const absolute = (path) => `${SITE_URL}${path}`;

// Pages that are prerendered to static HTML and listed in sitemap.xml
export const PAGES = {
  "/": {
    title: `Digital Invitations for Weddings, Birthdays & Celebrations | ${brand}`,
    description:
      "Animated digital invitation websites for weddings, birthdays, engagements, anniversaries and baby showers — personalised by our studio and shared as one WhatsApp link. English, Hindi and Marathi.",
    image: "/og/home.jpg",
    priority: 1,
  },
  "/templates": {
    title: `Invitation Designs — Live Previews | ${brand}`,
    description:
      "Browse animated invitation designs for weddings, birthdays, engagements, anniversaries and baby showers. Open a live preview in English, Hindi or Marathi before you order.",
    image: "/og/home.jpg",
    priority: 0.9,
  },
  "/pricing": {
    title: `Digital Invitation Prices & Packages | ${brand}`,
    description:
      "Clear one-time prices for digital invitation websites: birthday from ₹499, wedding from ₹999. See what's included, revisions, delivery time and hosting.",
    image: "/og/home.jpg",
    priority: 0.8,
  },
  "/wedding-invitations": {
    title: `Digital Wedding Invitation Websites | ${brand}`,
    description:
      "Wedding invitation websites with every function — Haldi, Mehendi, Sangeet, wedding and reception — maps, RSVP and countdown, in English, Hindi or Marathi.",
    image: "/og/wedding.jpg",
    priority: 0.9,
  },
  "/birthday-invitations": {
    title: `Birthday Invitation Websites & Animated Birthday Invitations | ${brand}`,
    description:
      "Animated birthday invitations for first birthdays, kids, teens and milestone celebrations, with RSVP, maps and WhatsApp sharing. Designs from ₹499.",
    image: "/og/birthday.jpg",
    priority: 0.9,
  },
  "/engagement-invitations": {
    title: `Online Engagement Invitations | ${brand}`,
    description:
      "Elegant online engagement and ring-ceremony invitations with RSVP, venue map and countdown — shared on WhatsApp in English, Hindi or Marathi.",
    image: "/og/engagement.jpg",
    priority: 0.8,
  },
  "/anniversary-invitations": {
    title: `Anniversary Invitation Websites | ${brand}`,
    description:
      "Wedding anniversary invitations that tell the couple's story — years together, a photo journey, RSVP and blessings, shared as one link.",
    image: "/og/anniversary.jpg",
    priority: 0.8,
  },
  "/baby-shower-invitations": {
    title: `Baby Shower Digital Invitations | ${brand}`,
    description:
      "Soft, joyful baby shower and godh bharai invitations with RSVP, wishes for the baby, venue map and WhatsApp sharing.",
    image: "/og/baby-shower.jpg",
    priority: 0.8,
  },
  "/guides": {
    title: `Invitation Guides & Wording Ideas | ${brand}`,
    description: "Practical guides for digital invitations: wording examples in English, Hindi and Marathi, sharing on WhatsApp and how online RSVP works.",
    image: "/og/home.jpg",
    priority: 0.6,
  },
  "/guides/invitation-wording": {
    title: `Invitation Wording in English, Hindi & Marathi | ${brand}`,
    description:
      "Ready-to-use invitation wording for weddings, birthdays, anniversaries and baby showers in English, Hindi and Marathi — and tips for writing your own.",
    image: "/og/home.jpg",
    priority: 0.6,
  },
  "/guides/whatsapp-invitations-and-rsvp": {
    title: `How to Share Invitations on WhatsApp & Collect RSVPs | ${brand}`,
    description:
      "How digital invitations work on WhatsApp, how guests RSVP from a link, and how a digital invitation compares with a printed card.",
    image: "/og/home.jpg",
    priority: 0.6,
  },
};

export const pageMeta = (path) => PAGES[path] ?? null;

// ---------- Structured data ----------
export const organizationLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: brand,
  url: SITE_URL,
  logo: absolute("/favicon.svg"),
  areaServed: "IN",
  ...(BUSINESS.whatsapp && {
    contactPoint: { "@type": "ContactPoint", contactType: "customer service", telephone: `+${BUSINESS.whatsapp}`, availableLanguage: ["English", "Hindi", "Marathi"] },
  }),
  ...(BUSINESS.instagram && { sameAs: [BUSINESS.instagram] }),
});

export const breadcrumbLd = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: absolute(path) })),
});

// A design service with its starting price (a service, so Service rather than Product)
export const serviceLd = ({ name, description, path, lowPrice }) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  serviceType: "Digital invitation design",
  url: absolute(path),
  areaServed: { "@type": "Country", name: "India" },
  provider: { "@type": "Organization", name: brand, url: SITE_URL },
  offers: { "@type": "Offer", priceCurrency: "INR", price: lowPrice, description: `Starting price, from ₹${lowPrice}` },
});
