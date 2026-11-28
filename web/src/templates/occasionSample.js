// Demo content for previewing the anniversary and baby shower designs. Every name and date here
// is sample content; real invitations get theirs from the customer's invitation data.

const DAY = 24 * 60 * 60 * 1000;
const PHOTOS = ["/samples/couple-portrait.jpg", "/samples/couple-tree.jpg", "/samples/couple-riverside.jpg", "/samples/couple-landscape.jpg"];

const ANNIVERSARY = {
  EN: {
    groom: "Suresh",
    bride: "Meena",
    host: "Rohan & Neha",
    message: "Twenty-five years ago they promised each other forever. Join us as we celebrate the love that built our family.",
    venue: "The Orchid Lawns, Nagpur",
    address: "Wardha Road, Nagpur 440015",
    events: ["Welcome & blessings", "Cake cutting", "Dinner", "Music & memories"],
    timeline: [
      ["The wedding", "2001", "A monsoon wedding in Nagpur."],
      ["Our first home", "2006", "Two rooms, one balcony, endless chai."],
      ["Family", "2010", "Rohan and Neha made us four."],
      ["Today", "Now", "Still holding hands."],
    ],
  },
  HI: {
    groom: "सुरेश",
    bride: "मीना",
    host: "रोहन और नेहा",
    message: "पच्चीस साल पहले उन्होंने एक-दूसरे से हमेशा साथ निभाने का वादा किया था। उस प्यार का जश्न मनाने हमारे साथ आइए, जिसने हमारा परिवार बनाया।",
    venue: "द ऑर्किड लॉन्स, नागपुर",
    address: "वर्धा रोड, नागपुर 440015",
    events: ["स्वागत और आशीर्वाद", "केक काटना", "भोजन", "संगीत और यादें"],
    timeline: [
      ["शादी", "2001", "नागपुर में बारिश के मौसम की शादी।"],
      ["पहला घर", "2006", "दो कमरे, एक बालकनी, ढेर सारी चाय।"],
      ["परिवार", "2010", "रोहन और नेहा के साथ हम चार हुए।"],
      ["आज", "अब", "आज भी हाथों में हाथ।"],
    ],
  },
  MR: {
    groom: "सुरेश",
    bride: "मीना",
    host: "रोहन आणि नेहा",
    message: "पंचवीस वर्षांपूर्वी त्यांनी एकमेकांना आयुष्यभराच्या साथीचे वचन दिले. ज्या प्रेमाने आमचे कुटुंब घडवले, त्याचा सोहळा साजरा करण्यासाठी आमच्यासोबत या.",
    venue: "द ऑर्किड लॉन्स, नागपूर",
    address: "वर्धा रोड, नागपूर 440015",
    events: ["स्वागत आणि आशीर्वाद", "केक कापणे", "जेवण", "संगीत आणि आठवणी"],
    timeline: [
      ["लग्न", "2001", "नागपुरातील पावसाळ्यातील लग्न."],
      ["पहिलं घर", "2006", "दोन खोल्या, एक बाल्कनी, भरपूर चहा."],
      ["कुटुंब", "2010", "रोहन आणि नेहामुळे आम्ही चौघे झालो."],
      ["आज", "आता", "आजही हातात हात."],
    ],
  },
};

const BABY = {
  EN: {
    mother: "Priya",
    host: "The Kulkarni family",
    message: "A little one is on the way, and we can't wait to celebrate with the people we love most. Come bless the mother-to-be!",
    venue: "Kulkarni Residence, Nagpur",
    address: "Civil Lines, Nagpur 440001",
    events: ["Welcome & games", "Godh bharai ceremony", "Lunch"],
  },
  HI: {
    mother: "प्रिया",
    host: "कुलकर्णी परिवार",
    message: "घर में एक नन्हा मेहमान आने वाला है, और हम अपने सबसे प्यारे लोगों के साथ यह खुशी मनाना चाहते हैं। होने वाली माँ को आशीर्वाद देने ज़रूर आइए!",
    venue: "कुलकर्णी निवास, नागपुर",
    address: "सिविल लाइन्स, नागपुर 440001",
    events: ["स्वागत और खेल", "गोद भराई की रस्म", "भोजन"],
  },
  MR: {
    mother: "प्रिया",
    host: "कुलकर्णी कुटुंब",
    message: "घरी छोटा पाहुणा येणार आहे, आणि हा आनंद आम्हाला आमच्या जवळच्या माणसांसोबत साजरा करायचा आहे. होणाऱ्या आईला आशीर्वाद द्यायला नक्की या!",
    venue: "कुलकर्णी निवास, नागपूर",
    address: "सिव्हिल लाइन्स, नागपूर 440001",
    events: ["स्वागत आणि खेळ", "ओटी भरण्याचा कार्यक्रम", "जेवण"],
  },
};

function schedule(hour, minute, names, venue, stepMinutes) {
  const start = new Date(Date.now() + 40 * DAY);
  start.setHours(hour, minute, 0, 0);
  const at = (m) => new Date(start.getTime() + m * 60 * 1000).toISOString();
  return {
    start: start.toISOString(),
    end: at(names.length * stepMinutes + 30),
    events: names.map((name, i) => ({ name, date: at(i * stepMinutes), venue })),
  };
}

export function sampleAnniversary(language, templateKey) {
  const c = ANNIVERSARY[language] ?? ANNIVERSARY.EN;
  const s = schedule(19, 0, c.events, c.venue, 45);
  return {
    slug: "sample",
    title: `${c.groom} & ${c.bride}`,
    language,
    templateKey,
    eventDate: s.start,
    config: {
      occasion: "ANNIVERSARY",
      groom: c.groom,
      bride: c.bride,
      years: 25,
      host: c.host,
      rsvpPhone: "+910000000000",
      message: c.message,
      venue: c.venue,
      address: c.address,
      mapUrl: "https://maps.google.com/?q=Wardha+Road+Nagpur",
      endDate: s.end,
      coverImage: PHOTOS[0],
      timeline: c.timeline.map(([title, date, text], i) => ({ title, date, text, image: PHOTOS[i] })),
      events: s.events,
    },
  };
}

export function sampleBabyShower(language, templateKey) {
  const c = BABY[language] ?? BABY.EN;
  const s = schedule(11, 30, c.events, c.venue, 60);
  return {
    slug: "sample",
    title: c.mother,
    language,
    templateKey,
    eventDate: s.start,
    config: {
      occasion: "BABY_SHOWER",
      celebrant: c.mother,
      host: c.host,
      rsvpPhone: "+910000000000",
      message: c.message,
      venue: c.venue,
      address: c.address,
      mapUrl: "https://maps.google.com/?q=Civil+Lines+Nagpur",
      endDate: s.end,
      events: s.events,
    },
  };
}
