// Sample content for previewing the birthday collection (/templates?collection=birthday).
// Real invitations get all of this from the customer's invitation data.

const DAY = 24 * 60 * 60 * 1000;

// A different sample person per theme so previews feel real
const PEOPLE = {
  "bday-kids": { EN: "Aarav", HI: "आरव", MR: "आरव" },
  "bday-princess": { EN: "Ananya", HI: "अनन्या", MR: "अनन्या" },
  "bday-superhero": { EN: "Vihaan", HI: "विहान", MR: "विहान" },
  "bday-first": { EN: "Myra", HI: "मायरा", MR: "मायरा" },
  "bday-gaming": { EN: "Kabir", HI: "कबीर", MR: "कबीर" },
  "bday-space": { EN: "Ishaan", HI: "ईशान", MR: "ईशान" },
  "bday-neon": { EN: "Riya", HI: "रिया", MR: "रिया" },
  "bday-luxury": { EN: "Rohan", HI: "रोहन", MR: "रोहन" },
  "bday-garden": { EN: "Meera", HI: "मीरा", MR: "मीरा" },
  "bday-modern": { EN: "Sunita", HI: "सुनीता", MR: "सुनीता" },
  "bday-safari": { EN: "Advik", HI: "अद्विक", MR: "अद्विक" },
  "bday-carnival": { EN: "Siya", HI: "सिया", MR: "सिया" },
  "bday-prince": { EN: "Reyansh", HI: "रेयांश", MR: "रेयांश" },
  "bday-memories": { EN: "Shobha", HI: "शोभा", MR: "शोभा" },
};

// Birthday Memories is photo-first: its preview gets a memory timeline and a few moments
// (sample photos from /public/samples, see the README there for credits)
const MEMORIES = {
  EN: [
    ["The wedding day", "1989", "The day it all began, in Nagpur."],
    ["A new home", "1996", "Our first house, and the garden she still loves."],
    ["Family trips", "2008", "Every summer, somewhere new."],
    ["Today", "Now", "Sixty years of love, laughter and chai."],
  ],
  HI: [
    ["शादी का दिन", "1989", "जहाँ से सब शुरू हुआ, नागपुर में।"],
    ["नया घर", "1996", "हमारा पहला घर, और वह बगीचा जो आज भी प्यारा है।"],
    ["परिवार के सफ़र", "2008", "हर गर्मी, एक नई जगह।"],
    ["आज", "अब", "साठ वर्षों का प्यार, हँसी और चाय।"],
  ],
  MR: [
    ["लग्नाचा दिवस", "1989", "जिथून सगळं सुरू झालं, नागपुरात."],
    ["नवं घर", "1996", "आमचं पहिलं घर, आणि आजही आवडणारी ती बाग."],
    ["कुटुंबाच्या सहली", "2008", "दर उन्हाळ्यात, नवीन ठिकाणी."],
    ["आज", "आता", "साठ वर्षांचं प्रेम, हसू आणि चहा."],
  ],
};
const PHOTOS = ["/samples/couple-portrait.jpg", "/samples/couple-tree.jpg", "/samples/couple-landscape.jpg", "/samples/couple-riverside.jpg"];

function memoriesExtras(language) {
  const items = MEMORIES[language] ?? MEMORIES.EN;
  return {
    coverImage: PHOTOS[0],
    timeline: items.map(([title, date, text], i) => ({ title, date, text, image: PHOTOS[i] })),
    gallery: [...PHOTOS, "/samples/couple-engagement.jpg"].map((url) => ({ url })),
  };
}

const CONTENT = {
  EN: {
    hostKids: "Neha & Amit Sharma",
    hostAdult: "The Sharma family",
    kidsVenue: "Fun Factory Play Café, Pune",
    adultVenue: "The Terrace, Koregaon Park, Pune",
    address: "Lane 5, Koregaon Park, Pune 411001",
    kidsMessage: "Join us for cake, games and a whole lot of fun!",
    adultMessage: "An evening of good food, music and great company. Your presence is the best gift.",
    kidsEvents: ["Welcome & games", "Magic show", "Cake cutting", "Dinner"],
    adultEvents: ["Welcome drinks", "Cake cutting", "Dinner", "Music & dance"],
    dressKids: "Bright colours and comfy shoes for games",
    dressAdult: "Evening chic — a touch of gold welcome",
  },
  HI: {
    hostKids: "नेहा और अमित शर्मा",
    hostAdult: "शर्मा परिवार",
    kidsVenue: "फन फ़ैक्टरी प्ले कैफ़े, पुणे",
    adultVenue: "द टैरेस, कोरेगाँव पार्क, पुणे",
    address: "लेन 5, कोरेगाँव पार्क, पुणे 411001",
    kidsMessage: "केक, खेल और ढेर सारी मस्ती के लिए ज़रूर आइए!",
    adultMessage: "स्वादिष्ट खाना, संगीत और अपनों का साथ — आपकी उपस्थिति ही सबसे अच्छा तोहफ़ा है।",
    kidsEvents: ["स्वागत और खेल", "जादू का शो", "केक काटना", "भोजन"],
    adultEvents: ["स्वागत पेय", "केक काटना", "भोजन", "संगीत और डांस"],
    dressKids: "चटक रंग और खेलने के लिए आरामदायक जूते",
    dressAdult: "शाम की शान — सुनहरी झलक का स्वागत है",
  },
  MR: {
    hostKids: "नेहा आणि अमित शर्मा",
    hostAdult: "शर्मा कुटुंब",
    kidsVenue: "फन फॅक्टरी प्ले कॅफे, पुणे",
    adultVenue: "द टेरेस, कोरेगाव पार्क, पुणे",
    address: "लेन 5, कोरेगाव पार्क, पुणे 411001",
    kidsMessage: "केक, खेळ आणि भरपूर धमालीसाठी नक्की या!",
    adultMessage: "चविष्ट जेवण, संगीत आणि आपल्या माणसांची सोबत — आपली उपस्थिती हीच खरी भेट.",
    kidsEvents: ["स्वागत आणि खेळ", "जादूचे प्रयोग", "केक कापणे", "जेवण"],
    adultEvents: ["स्वागत पेय", "केक कापणे", "जेवण", "संगीत आणि नृत्य"],
    dressKids: "भडक रंग आणि खेळायला आरामदायक बूट",
    dressAdult: "संध्याकाळचा खास पोशाख — सोनेरी झलक असल्यास उत्तम",
  },
};

export function sampleBirthday(language, templateKey, age) {
  const c = CONTENT[language] ?? CONTENT.EN;
  const name = (PEOPLE[templateKey] ?? PEOPLE["bday-kids"])[language] ?? PEOPLE["bday-kids"].EN;
  const kids = !age || age < 18;

  // ~45 days ahead so the countdown always runs; kids at 4 pm, adults at 7:30 pm
  const start = new Date(Date.now() + 45 * DAY);
  start.setHours(kids ? 16 : 19, kids ? 0 : 30, 0, 0);
  const end = new Date(start.getTime() + 3 * 60 * 60 * 1000);
  const at = (minutes) => new Date(start.getTime() + minutes * 60 * 1000).toISOString();
  const venue = kids ? c.kidsVenue : c.adultVenue;
  const names = kids ? c.kidsEvents : c.adultEvents;

  return {
    slug: "sample",
    title: name,
    language,
    templateKey,
    eventDate: start.toISOString(),
    config: {
      occasion: "BIRTHDAY",
      celebrant: name,
      age: age || undefined,
      host: kids ? c.hostKids : c.hostAdult,
      rsvpPhone: "+910000000000",
      message: kids ? c.kidsMessage : c.adultMessage,
      dressCode: kids ? c.dressKids : c.dressAdult,
      venue,
      address: c.address,
      mapUrl: "https://maps.google.com/?q=Koregaon+Park+Pune",
      endDate: end.toISOString(),
      events: names.map((eventName, i) => ({ name: eventName, date: at(i * 45), venue })),
      ...(templateKey === "bday-memories" ? memoriesExtras(language) : {}),
    },
  };
}
