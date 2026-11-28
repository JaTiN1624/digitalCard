// Launch prices and package contents — the one place to change them.
// Template cards, the pricing page and WhatsApp enquiries all read from here.
// Prices are in rupees and are the studio's own launch prices.

export const formatPrice = (amount) => `₹${new Intl.NumberFormat("en-IN").format(amount)}`;

// How long a delivered link stays live, and what happens after. Confirm before launch.
export const HOSTING = {
  months: 6,
  summary: "Your invitation link stays live for 6 months after the event.",
  renewal: "Want to keep it longer? Renewal is available on request — just message us before it expires.",
};

// Delivery is counted from the day we have all details and photos. Confirm before launch.
export const DELIVERY_NOTE = "Delivery time starts once we have all your details and photos. Need it sooner? Ask us — rush delivery depends on our schedule.";

// What "customisation" covers, so customers know what to expect
export const SCOPE = {
  included: [
    "Names, dates, times, venues and family details",
    "Your message and invitation wording (we can help write it)",
    "Your photos, cropped and placed for the design",
    "Language: English, हिन्दी or मराठी",
    "Showing or hiding sections (RSVP, gallery, countdown …)",
  ],
  extra: [
    "Extra revision rounds beyond your package",
    "A second language version of the same invitation",
    "New illustrations, logos or monograms drawn from scratch",
    "Changes to the design's layout or animation",
  ],
  extraNote: "Anything extra is quoted on WhatsApp before we start — there are no surprise charges.",
};

export const REVISION_NOTE =
  "A revision is one round of changes sent together (for example: fix the time, swap a photo, change a line of text). Changes after approval count as a new revision.";

// tier ids are referenced by `tier` in templates/index.js
export const PRICE_LISTS = {
  birthday: {
    label: "Birthday",
    packages: [
      {
        id: "essential",
        name: "Essential",
        price: 499,
        badge: "Standard",
        summary: "A beautiful animated invitation with all the details.",
        revisions: 1,
        delivery: "1–2 working days",
        included: [
          "One Essential design",
          "Opening animation and scroll motion",
          "Your names, age, date, time and venue",
          "Google Maps directions",
          "WhatsApp sharing link",
          "English, हिन्दी or मराठी",
        ],
        excluded: ["Photo gallery", "Online RSVP", "Background music"],
      },
      {
        id: "premium",
        name: "Premium",
        price: 799,
        badge: "Most chosen",
        highlight: true,
        summary: "Everything guests need, with photos and RSVP.",
        revisions: 2,
        delivery: "1–2 working days",
        included: [
          "Any Essential or Premium design",
          "Full animations and interactive cake",
          "Photo gallery (up to 10 photos)",
          "Online RSVP with guest replies",
          "Live countdown and calendar buttons",
          "Google Maps, Call and WhatsApp buttons",
        ],
        excluded: ["Background music", "Custom colours"],
      },
      {
        id: "luxury",
        name: "Luxury",
        price: 1299,
        badge: "Premium",
        summary: "Our richest motion designs, personalised for you.",
        revisions: 3,
        delivery: "2–3 working days",
        included: [
          "Any design, including Luxury designs",
          "Premium motion graphics",
          "Custom colour treatment",
          "Background music",
          "Photo gallery (up to 30) and memory timeline",
          "Online RSVP with guest replies",
        ],
        excluded: ["New illustrations drawn for you"],
      },
      {
        id: "custom",
        name: "Custom",
        price: 1999,
        from: true,
        badge: "Bespoke",
        summary: "An original design made only for your celebration.",
        revisions: "As agreed",
        delivery: "5–7 working days",
        included: [
          "Original visual design",
          "Custom illustrations",
          "Personalised storytelling",
          "Advanced animations",
          "Everything in Luxury",
        ],
        excluded: [],
      },
    ],
  },
  wedding: {
    label: "Wedding",
    packages: [
      {
        id: "essential",
        name: "Essential",
        price: 999,
        badge: "Standard",
        summary: "An elegant invitation for the main ceremony.",
        revisions: 1,
        delivery: "2–3 working days",
        included: [
          "One Essential design",
          "Opening animation",
          "Couple & family names, up to 3 functions",
          "Google Maps directions",
          "WhatsApp sharing link",
          "English, हिन्दी or मराठी",
        ],
        excluded: ["Photo gallery", "Online RSVP", "Love-story timeline", "Background music"],
      },
      {
        id: "celebration",
        name: "Celebration",
        price: 1499,
        badge: "Most chosen",
        highlight: true,
        summary: "All your functions, photos and RSVP in one link.",
        revisions: 2,
        delivery: "2–3 working days",
        included: [
          "Any Essential or Celebration design",
          "All functions (Haldi, Mehendi, Sangeet …)",
          "Photo gallery (up to 15 photos)",
          "Online RSVP with guest replies",
          "Live countdown and calendar buttons",
          "Google Maps for every venue",
        ],
        excluded: ["Love-story timeline", "Background music"],
      },
      {
        id: "royal",
        name: "Royal",
        price: 2499,
        badge: "Premium",
        summary: "Our grandest designs with your story and music.",
        revisions: 3,
        delivery: "3–4 working days",
        included: [
          "Any design, including Royal designs",
          "Premium motion graphics",
          "Love-story timeline",
          "Background music",
          "Photo gallery (up to 30 photos)",
          "Online RSVP with guest replies",
        ],
        excluded: ["New illustrations drawn for you"],
      },
      {
        id: "signature",
        name: "Signature Custom",
        price: 4999,
        from: true,
        badge: "Bespoke",
        summary: "A one-of-a-kind wedding website designed from scratch.",
        revisions: "As agreed",
        delivery: "7–10 working days",
        included: ["Original visual design", "Custom illustrations and monogram", "Personalised storytelling", "Advanced animations", "Everything in Royal"],
        excluded: [],
      },
    ],
  },
};

// Other occasions: designed on request for now, with a starting price
export const OCCASION_PRICES = [
  { id: "engagement", name: "Engagement", from: 799, note: "Ring-ceremony design available now" },
  { id: "anniversary", name: "Anniversary", from: 599, note: "Timeless Love design available now" },
  { id: "babyShower", name: "Baby Shower", from: 699, note: "Pastel Dreams design available now" },
  { id: "naming", name: "Baby Naming", from: 699, note: "Designed on request" },
  { id: "housewarming", name: "Housewarming", from: 599, note: "Designed on request" },
];

// Starting price shown on a template card: its tier in its collection's price list, or an
// occasion's starting price (template.pricing, e.g. the engagement design)
export function templatePrice(template) {
  if (template.pricing) {
    const occasion = OCCASION_PRICES.find((o) => o.id === template.pricing);
    if (occasion) return { amount: occasion.from, from: true, packageName: occasion.name };
  }
  const list = PRICE_LISTS[template.collection ?? "wedding"];
  const pkg = list?.packages.find((p) => p.id === template.tier) ?? list?.packages[0];
  return pkg ? { amount: pkg.price, from: true, packageName: pkg.name, badge: pkg.badge } : null;
}
