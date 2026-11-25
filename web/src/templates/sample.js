// Sample content for previewing templates without a database (/templates).
// Photos are free Pexels images in /public/samples (credits in its README.md);
// function cards use original illustrations.
import { TEMPLATES } from "./index.js";
import { sampleBirthday } from "./birthdaySample.js";

const CONTENT = {
  EN: {
    groom: "Rahul",
    bride: "Priya",
    groomParents: "Mr. & Mrs. Sharma",
    brideParents: "Mr. & Mrs. Kulkarni",
    venue: "The Grand Palace, Pune",
    address: "Koregaon Park, Pune 411001",
    message: "Your presence is the greatest gift of all.",
    events: ["Haldi", "Mehendi", "Sangeet", "Wedding"],
    eventNotes: ["Wear yellow and come ready to get messy!", "Henna, music and chai in the garden.", "An evening of music and dance.", ""],
    story:
      "We met as strangers at a friend's wedding and left as best friends. Seven years, two cities and countless cups of chai later, we are ready to begin our forever.",
    timeline: [
      ["2018", "First hello", "A shared table at a friend's wedding and a conversation that never really ended."],
      ["2021", "Two cities, one heart", "Weekend trains between Pune and Mumbai, and a thousand phone calls."],
      ["2026", "The question", "Under the monsoon sky at Lonavala, she said yes."],
    ],
    reception: "Lotus Banquet Hall, Pune",
    destination: "Udaipur",
    resort: "Lakeside Palace Resort, Udaipur",
    travelNote:
      "Udaipur airport (UDR) is 25 minutes from the resort; we will arrange pick-ups for all flights on 12 and 13 February.\nRooms are reserved for our guests from 12 to 15 February.",
    captions: ["Forever starts here", "Laughter, always", "Just the two of us", "By the river", "Under our tree"],
  },
  HI: {
    groom: "राहुल",
    bride: "प्रिया",
    groomParents: "श्री एवं श्रीमती शर्मा",
    brideParents: "श्री एवं श्रीमती कुलकर्णी",
    venue: "द ग्रैंड पैलेस, पुणे",
    address: "कोरेगाँव पार्क, पुणे 411001",
    message: "आपकी उपस्थिति हमारे लिए सबसे बड़ा आशीर्वाद होगी।",
    events: ["हल्दी", "मेहंदी", "संगीत", "शुभ विवाह"],
    eventNotes: ["पीले कपड़ों में आइए, रंग लगना तय है!", "बगीचे में मेहंदी, गीत और चाय।", "संगीत और नृत्य भरी शाम।", ""],
    story:
      "एक दोस्त की शादी में हम अजनबी बनकर मिले और सबसे अच्छे दोस्त बनकर लौटे। सात साल, दो शहर और अनगिनत चाय के प्यालों के बाद, अब हम साथ जीवन शुरू करने को तैयार हैं।",
    timeline: [
      ["2018", "पहली मुलाक़ात", "दोस्त की शादी में एक ही मेज़ और कभी न ख़त्म होने वाली बातें।"],
      ["2021", "दो शहर, एक दिल", "पुणे और मुंबई के बीच हफ़्ते के आख़िर की ट्रेनें और हज़ारों फ़ोन कॉल।"],
      ["2026", "वो सवाल", "लोनावला के मानसूनी आसमान तले उसने हाँ कहा।"],
    ],
    reception: "लोटस बैंक्वेट हॉल, पुणे",
    destination: "उदयपुर",
    resort: "लेकसाइड पैलेस रिज़ॉर्ट, उदयपुर",
    travelNote:
      "उदयपुर हवाई अड्डा रिज़ॉर्ट से 25 मिनट दूर है; 12 और 13 फ़रवरी की सभी उड़ानों के लिए गाड़ी की व्यवस्था रहेगी।\nमेहमानों के लिए 12 से 15 फ़रवरी तक कमरे आरक्षित हैं।",
    captions: ["यहीं से हमेशा की शुरुआत", "हँसी, हमेशा", "बस हम दोनों", "नदी किनारे", "हमारे पेड़ के नीचे"],
  },
  MR: {
    groom: "राहुल",
    bride: "प्रिया",
    groomParents: "श्री. व सौ. शर्मा",
    brideParents: "श्री. व सौ. कुलकर्णी",
    venue: "द ग्रँड पॅलेस, पुणे",
    address: "कोरेगाव पार्क, पुणे 411001",
    message: "आपली उपस्थिती हाच आमच्यासाठी मोठा आशीर्वाद.",
    events: ["हळद", "मेहंदी", "संगीत", "शुभमंगल"],
    eventNotes: ["पिवळे कपडे घालून या, रंग लागणारच!", "बागेत मेहंदी, गाणी आणि चहा.", "गाणी आणि नृत्याची संध्याकाळ.", ""],
    story:
      "एका मित्राच्या लग्नात आम्ही अनोळखी म्हणून भेटलो आणि जिवलग मित्र बनून परतलो. सात वर्षे, दोन शहरे आणि असंख्य कप चहानंतर, आता आम्ही एकत्र आयुष्याची सुरुवात करायला तयार आहोत.",
    timeline: [
      ["2018", "पहिली भेट", "मित्राच्या लग्नात एकाच टेबलावर सुरू झालेल्या गप्पा, ज्या कधी संपल्याच नाहीत."],
      ["2021", "दोन शहरे, एक मन", "पुणे-मुंबई वीकेंड ट्रेन्स आणि हजारो फोन कॉल्स."],
      ["2026", "तो प्रश्न", "लोणावळ्याच्या पावसाळी आभाळाखाली तिने होकार दिला."],
    ],
    reception: "लोटस बँक्वेट हॉल, पुणे",
    destination: "उदयपूर",
    resort: "लेकसाइड पॅलेस रिसॉर्ट, उदयपूर",
    travelNote:
      "उदयपूर विमानतळ रिसॉर्टपासून 25 मिनिटांवर आहे; 12 आणि 13 फेब्रुवारीच्या सर्व विमानांसाठी गाडीची सोय असेल.\nपाहुण्यांसाठी 12 ते 15 फेब्रुवारीपर्यंत खोल्या राखीव आहेत.",
    captions: ["इथून सुरू होते कायमची साथ", "हसू, नेहमीच", "फक्त आपण दोघे", "नदीकाठी", "आपल्या झाडाखाली"],
  },
};

const DAY = 24 * 60 * 60 * 1000;
const EVENT_IMAGES = ["/samples/haldi.svg", "/samples/mehendi.svg", "/samples/sangeet.svg", null];
const GALLERY = ["couple-portrait", "couple-engagement", "couple-landscape", "couple-riverside", "couple-tree"];

// The best-suited photo for each template's hero
const COVER = {
  engagement: "/samples/couple-engagement.jpg",
  cinematic: "/samples/couple-landscape.jpg",
  destination: "/samples/couple-riverside.jpg",
};

export function sampleInvitation(language = "EN", templateKey = "classic", age = null) {
  if (TEMPLATES[templateKey]?.collection === "birthday") return sampleBirthday(language, templateKey, age);
  const c = CONTENT[language] ?? CONTENT.EN;
  const occasion = TEMPLATES[templateKey]?.occasion ?? "WEDDING";
  const destination = templateKey === "destination";

  // Keep the sample wedding ~60 days in the future so the countdown always shows
  const wedding = new Date(Date.now() + 60 * DAY);
  wedding.setHours(18, 30, 0, 0);
  const at = (daysBefore, hours) => {
    const d = new Date(wedding.getTime() - daysBefore * DAY);
    d.setHours(hours, 0, 0, 0);
    return d.toISOString();
  };
  const venue = destination ? c.resort : c.venue;

  const events = [
    { name: c.events[0], date: at(2, 10), venue, description: c.eventNotes[0], image: EVENT_IMAGES[0] },
    { name: c.events[1], date: at(2, 16), venue, description: c.eventNotes[1], image: EVENT_IMAGES[1] },
    { name: c.events[2], date: at(1, 19), venue, description: c.eventNotes[2], image: EVENT_IMAGES[2] },
    {
      name: c.events[3],
      date: wedding.toISOString(),
      venue,
      address: destination ? undefined : c.address,
      mapUrl: "https://maps.google.com/?q=Pune",
    },
  ];

  const config = {
    occasion,
    groom: c.groom,
    bride: c.bride,
    groomParents: c.groomParents,
    brideParents: c.brideParents,
    venue: destination ? c.destination : c.venue,
    message: c.message,
    hashtag: "RahulWedsPriya",
    // The engagement preview is a single ceremony; the others show the full set of functions
    events: occasion === "ENGAGEMENT" ? [{ name: c.events[3], date: wedding.toISOString(), venue: c.venue, address: c.address }] : events,
    coverImage: COVER[templateKey] ?? "/samples/couple-portrait.jpg",
    storyImage: destination ? "/samples/couple-landscape.jpg" : "/samples/couple-riverside.jpg",
    story: c.story,
    timeline: c.timeline.map(([date, title, text]) => ({ date, title, text })),
    gallery: GALLERY.map((name, i) => ({ url: `/samples/${name}.jpg`, caption: c.captions[i] })),
    reception: occasion === "WEDDING" ? { date: at(-1, 19), venue: c.reception } : undefined,
    travelNote: destination ? c.travelNote : undefined,
  };

  return {
    slug: "sample",
    title: `${c.groom} & ${c.bride}`,
    language,
    templateKey,
    eventDate: wedding.toISOString(),
    config,
  };
}
