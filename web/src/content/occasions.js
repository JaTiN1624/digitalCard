// Content for the occasion landing pages (/wedding-invitations …). Each page answers what a
// visitor searching for that occasion needs: what they get, how it works for that occasion,
// prices and common questions. Prices come from config/pricing.js at render time.

export const OCCASION_PAGES = {
  "/wedding-invitations": {
    group: "wedding",
    priceList: "wedding",
    crumb: "Wedding invitations",
    eyebrow: "Wedding invitation websites",
    h1: "A wedding invitation your guests will remember opening",
    intro:
      "One link for every function — Haldi, Mehendi, Sangeet, the wedding and the reception — with venues, timings, directions and RSVP. Designed by our studio in English, हिन्दी or मराठी and shared on WhatsApp in seconds.",
    heroDesign: "royal",
    highlights: [
      ["Every function on one page", "Each event gets its own time, venue, dress note and Google Maps link, so relatives never ask “where is the Mehendi?” again."],
      ["Family names, the traditional way", "Space for both families, blessings from elders and the wording your parents expect — in English, Hindi or Marathi."],
      ["RSVP and guest count", "Guests reply with how many are coming, so catering and seating stop being guesswork."],
      ["Your story and photos", "Pre-wedding photos, a love-story timeline and a gallery on the premium designs."],
    ],
    steps: [
      ["Pick a design", "Royal, floral, minimal or regional — open each one and see it with sample details."],
      ["Send your details", "Names, functions, venues and photos on WhatsApp. We write and translate the wording if you like."],
      ["Approve and share", "Check your private preview, ask for changes, then send one link to every guest."],
    ],
    faq: [
      ["Can one invitation cover all our functions?", "Yes. All functions appear on the same link, each with its own date, time, venue and map. Guests see the full programme in one place."],
      ["Can we have the invitation in Marathi or Hindi?", "Yes. Every design works in English, Hindi and Marathi. Tell us the language when you send your details; a second language version can be added for an extra charge."],
      ["Can elders open it easily?", "It opens like a normal link from WhatsApp — no app or sign-up. Text is large and buttons are simple: Directions, Call, RSVP."],
      ["How soon can we share it?", "Most wedding invitations are ready in 2–4 working days after we receive all details, depending on the package."],
    ],
  },
  "/birthday-invitations": {
    group: "birthday",
    priceList: "birthday",
    crumb: "Birthday invitations",
    eyebrow: "Birthday invitation websites",
    h1: "Animated birthday invitations for every age",
    intro:
      "From a first birthday to a golden sixtieth, each design opens with its own animation and adapts its wording to the age. Guests get the time, place, directions and an easy RSVP — all in one WhatsApp link.",
    heroDesign: "bday-princess",
    highlights: [
      ["Made for the age", "Wording changes for a first birthday, a five-year-old, a teenager or a milestone like 50 — set the age and the invitation does the rest."],
      ["Little interactions guests enjoy", "Blow out the candles, tap to celebrate, count down to the party — fun, without getting in the way of the details."],
      ["Parents' contact built in", "Call and WhatsApp buttons for the host, so parents can check timings or pickup without searching for a number."],
      ["Designs that don't look alike", "Fairytale castles, arcade games, space missions, editorial magazines — each design has its own look, not just a new colour."],
    ],
    steps: [
      ["Choose a design", "Try any design with sample details and change the age to see the wording adapt."],
      ["Send the party details", "Name, age, date, time, venue and a photo if you'd like one."],
      ["Share the link", "We send a private preview first; once you approve, share it on WhatsApp."],
    ],
    faq: [
      ["Do you have designs for adults too?", "Yes — Midnight Luxe, Modern Editorial, Retro Disco and Birthday Memories are made for teens, adults and milestone birthdays."],
      ["Can guests RSVP for their children?", "Yes. The RSVP asks for the number of guests, so a family can reply once for everyone."],
      ["Can we add the birthday child's photo?", "Yes. Photos are included from the Premium package; Birthday Memories is built around photos and a memory timeline."],
      ["How quickly can it be ready?", "Essential and Premium birthday invitations are usually ready in 1–2 working days after we have your details."],
    ],
  },
  "/engagement-invitations": {
    group: "engagement",
    priceOccasion: "engagement",
    crumb: "Engagement invitations",
    eyebrow: "Engagement invitations online",
    h1: "Engagement invitations that feel as personal as the promise",
    intro:
      "A refined invitation for your engagement or ring ceremony — your names, the date, the venue with directions and RSVP — shared privately with family and friends on WhatsApp.",
    heroDesign: "engagement",
    highlights: [
      ["Ring-box opening", "Elegant Romance opens with a ring box, then reveals your names in champagne and blush."],
      ["Both families together", "Space for both families' names and a short blessing or message."],
      ["RSVP for planning", "Know how many guests to expect for the ceremony and the dinner."],
      ["Ready to grow into the wedding", "Love the style? We can carry it forward into your wedding invitation."],
    ],
    steps: [
      ["Preview the design", "Open Elegant Romance with sample names and switch languages."],
      ["Send your details", "Names, families, date, time and venue on WhatsApp."],
      ["Approve and share", "Check your preview, ask for changes, then share one link."],
    ],
    faq: [
      ["Is there more than one engagement design?", "Elegant Romance is our engagement design today. Any wedding design can also be set up for an engagement — tell us which one you like."],
      ["Can we include a dinner or party after the ceremony?", "Yes. Add as many events as you need, each with its own time and venue."],
      ["How much does it cost?", "Engagement invitations start from the price shown below; we confirm the final price on WhatsApp before we begin."],
    ],
  },
  "/anniversary-invitations": {
    group: "anniversary",
    priceOccasion: "anniversary",
    crumb: "Anniversary invitations",
    eyebrow: "Anniversary invitations",
    h1: "Anniversary invitations that tell your story",
    intro:
      "Celebrate 25, 40 or 50 years with an invitation that remembers how it began — the years together, a photo journey and blessings from family — shared as one link.",
    heroDesign: "anniv-timeless",
    highlights: [
      ["Years in roman numerals", "Timeless Love sets the years together in large numerals behind the couple's names."],
      ["A journey in photos", "The wedding day, the first home, the children — a timeline of the moments that matter."],
      ["Planned by the children?", "Perfect for surprise parties: the invitation can come from the children or the family."],
      ["Blessings and RSVP", "Guests reply and leave a few words for the couple."],
    ],
    steps: [
      ["Preview Timeless Love", "See it with sample names, years and photos."],
      ["Send your memories", "Names, years married, the party details and a few old photos."],
      ["Share with family", "Approve your preview and send it to everyone on WhatsApp."],
    ],
    faq: [
      ["Can we keep it a surprise from the couple?", "Yes. The link is private — only people you send it to can open it."],
      ["Can we use old printed photos?", "Yes. Take a clear photo of the print with your phone and send it; we crop and place it."],
      ["Which anniversaries is it for?", "Any — first, silver (25), ruby (40), golden (50) or any year in between."],
    ],
  },
  "/baby-shower-invitations": {
    group: "babyShower",
    priceOccasion: "babyShower",
    crumb: "Baby shower invitations",
    eyebrow: "Baby shower & godh bharai invitations",
    h1: "Soft, joyful invitations for the little one on the way",
    intro:
      "A gentle invitation for a baby shower, godh bharai or dohale jevan — the mother-to-be's name, the plan for the day, directions and a place for guests to leave wishes for the baby.",
    heroDesign: "baby-pastel",
    highlights: [
      ["A swaying cot mobile", "Pastel Dreams opens with a moon-and-stars mobile, then reveals the invitation in watercolour pastels."],
      ["Wishes for the baby", "Guests can leave a message for the little one with their RSVP."],
      ["Traditional or modern", "Use it for a western-style baby shower or a traditional godh bharai — the wording adapts."],
      ["Hindi and Marathi", "गोद भराई or डोहाळे जेवण — written properly in your family's language."],
    ],
    steps: [
      ["Preview Pastel Dreams", "Open it with sample details in English, Hindi or Marathi."],
      ["Send your details", "The mother-to-be's name, date, time, venue and the plan for the day."],
      ["Share with loved ones", "Approve your preview and share it on WhatsApp."],
    ],
    faq: [
      ["Can it be used for godh bharai or dohale jevan?", "Yes. Choose Hindi or Marathi and the invitation uses गोद भराई or डोहाळे जेवण."],
      ["Can we hide the RSVP?", "Yes. Any section — RSVP, countdown, gallery — can be switched off."],
      ["How quickly can it be ready?", "Usually within 1–2 working days after we have your details."],
    ],
  },
};
