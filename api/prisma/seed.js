import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.ts";

const prisma  = new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL}),
});

const client = await prisma.client.upsert({
    where: { email: "demo@example.com"},
    update: {},
    create: {name: "Demo Client", email:"demo@example.com", phone:"9999999999"},
});

console.log("Demo client id: ", client.id);

// Published demo invitations — one per template and language.
// Open them at http://localhost:5173/i/<slug>. Re-running the seed resets their content.
const demos = [
    {
        slug: "rahul-weds-priya",
        title: "Rahul & Priya",
        language: "EN",
        templateKey: "classic",
        eventDate: "2027-02-14T18:30:00+05:30",
        config: {
            groom: "Rahul",
            bride: "Priya",
            groomParents: "Mr. & Mrs. Sharma",
            brideParents: "Mr. & Mrs. Kulkarni",
            venue: "The Grand Palace, Pune",
            message: "Your presence is the greatest gift of all.",
            hashtag: "RahulWedsPriya",
            events: [
                { name: "Haldi", date: "2027-02-13T10:00:00+05:30", venue: "Sharma Residence, Pune" },
                { name: "Sangeet", date: "2027-02-13T19:00:00+05:30", venue: "The Grand Palace, Pune" },
                {
                    name: "Wedding",
                    date: "2027-02-14T18:30:00+05:30",
                    venue: "The Grand Palace, Pune",
                    address: "Koregaon Park, Pune 411001",
                    mapUrl: "https://maps.google.com/?q=Koregaon+Park+Pune",
                },
            ],
        },
    },
    {
        slug: "amit-weds-sneha",
        title: "अमित & स्नेहा",
        language: "HI",
        templateKey: "royal",
        eventDate: "2027-03-05T19:00:00+05:30",
        config: {
            groom: "अमित",
            bride: "स्नेहा",
            groomParents: "श्री एवं श्रीमती वर्मा",
            brideParents: "श्री एवं श्रीमती गुप्ता",
            venue: "राजमहल पैलेस, जयपुर",
            message: "आपकी उपस्थिति हमारे लिए सबसे बड़ा आशीर्वाद होगी।",
            events: [
                { name: "मेहंदी", date: "2027-03-04T16:00:00+05:30", venue: "वर्मा निवास, जयपुर" },
                { name: "शुभ विवाह", date: "2027-03-05T19:00:00+05:30", venue: "राजमहल पैलेस, जयपुर" },
            ],
        },
    },
    {
        slug: "rohan-weds-anuja",
        title: "रोहन & अनुजा",
        language: "MR",
        templateKey: "floral",
        eventDate: "2027-04-18T11:30:00+05:30",
        config: {
            groom: "रोहन",
            bride: "अनुजा",
            groomParents: "श्री. व सौ. देशपांडे",
            brideParents: "श्री. व सौ. जोशी",
            venue: "श्रीकृष्ण मंगल कार्यालय, नाशिक",
            message: "आपली उपस्थिती हाच आमच्यासाठी मोठा आशीर्वाद.",
            events: [
                { name: "हळद", date: "2027-04-17T09:00:00+05:30", venue: "देशपांडे निवास, नाशिक" },
                { name: "शुभमंगल", date: "2027-04-18T11:30:00+05:30", venue: "श्रीकृष्ण मंगल कार्यालय, नाशिक", address: "गंगापूर रोड, नाशिक 422013" },
            ],
            story: "महाविद्यालयातील एका नाटकाच्या तालमीत आमची पहिली भेट झाली. मैत्री, हसणं आणि असंख्य आठवणींनंतर आता आम्ही आयुष्याचा नवा प्रवास एकत्र सुरू करत आहोत.",
            reception: { date: "2027-04-18T19:30:00+05:30", venue: "हॉटेल एक्सप्रेस इन, नाशिक", address: "मुंबई-आग्रा महामार्ग, नाशिक" },
        },
    },
    {
        slug: "sameer-weds-kavya",
        title: "समीर & काव्या",
        language: "MR",
        templateKey: "maharashtrian",
        eventDate: "2027-05-09T12:15:00+05:30",
        config: {
            groom: "समीर",
            bride: "काव्या",
            groomParents: "श्री. व सौ. पाटील",
            brideParents: "श्री. व सौ. कुलकर्णी",
            venue: "गणेश लॉन्स, कोल्हापूर",
            message: "आपली उपस्थिती हाच आमच्यासाठी मोठा आशीर्वाद.",
            events: [
                { name: "साखरपुडा", date: "2027-05-08T18:00:00+05:30", venue: "पाटील निवास, कोल्हापूर" },
                { name: "शुभमंगल", date: "2027-05-09T12:15:00+05:30", venue: "गणेश लॉन्स, कोल्हापूर" },
            ],
        },
    },
    {
        slug: "karan-weds-isha",
        title: "Karan & Isha",
        language: "EN",
        templateKey: "minimal",
        eventDate: "2027-06-12T19:00:00+05:30",
        config: {
            groom: "Karan",
            bride: "Isha",
            groomParents: "Mr. & Mrs. Mehta",
            brideParents: "Mr. & Mrs. Rao",
            venue: "The Courtyard, Mumbai",
            message: "We would love for you to celebrate with us.",
            events: [
                { name: "Wedding", date: "2027-06-12T19:00:00+05:30", venue: "The Courtyard, Mumbai" },
            ],
        },
    },
    {
        slug: "arjun-weds-meera",
        title: "Arjun & Meera",
        language: "EN",
        templateKey: "cinematic",
        eventDate: "2027-12-04T20:00:00+05:30",
        config: {
            groom: "Arjun",
            bride: "Meera",
            groomParents: "Mr. & Mrs. Iyer",
            brideParents: "Mr. & Mrs. Nair",
            venue: "Starlight Gardens, Goa",
            message: "Every love story is beautiful, but ours is our favourite.",
            hashtag: "ArjunMeetsMeera",
            events: [
                { name: "Cocktail Night", date: "2027-12-03T20:00:00+05:30", venue: "Beach Deck, Goa" },
                { name: "Wedding", date: "2027-12-04T20:00:00+05:30", venue: "Starlight Gardens, Goa" },
            ],
            // Demo images are bundled sample photos (the API itself only accepts https links)
            coverImage: "/samples/couple-landscape.jpg",
            storyImage: "/samples/couple-riverside.jpg",
            timeline: [
                { date: "2019", title: "A borrowed umbrella", text: "A sudden Goa downpour, one umbrella, two strangers." },
                { date: "2022", title: "Across the world", text: "Different time zones, the same late-night calls." },
                { date: "2026", title: "Forever, please", text: "On the same beach where it all began, he asked." },
            ],
            gallery: ["couple-portrait", "couple-engagement", "couple-landscape", "couple-riverside", "couple-tree"].map((n) => ({ url: `/samples/${n}.jpg` })),
        },
    },
    {
        slug: "neha-weds-vikram-festivities",
        title: "Neha & Vikram",
        language: "HI",
        templateKey: "prewedding",
        eventDate: "2027-01-22T19:00:00+05:30",
        config: {
            occasion: "CELEBRATION",
            groom: "विक्रम",
            bride: "नेहा",
            venue: "रॉयल गार्डन्स, जयपुर",
            message: "रंग, संगीत और ढेर सारी खुशियाँ — आपके बिना अधूरी हैं!",
            events: [
                { name: "हल्दी", date: "2027-01-21T10:00:00+05:30", venue: "रॉयल गार्डन्स, जयपुर", description: "पीले कपड़ों में आइए!", image: "/samples/haldi.svg" },
                { name: "मेहंदी", date: "2027-01-21T16:00:00+05:30", venue: "रॉयल गार्डन्स, जयपुर", image: "/samples/mehendi.svg" },
                { name: "संगीत", date: "2027-01-22T19:00:00+05:30", venue: "रॉयल गार्डन्स, जयपुर", image: "/samples/sangeet.svg" },
            ],
            hiddenSections: ["story"],
        },
    },
    {
        slug: "aditya-ananya-engagement",
        title: "Aditya & Ananya",
        language: "EN",
        templateKey: "engagement",
        eventDate: "2027-03-14T18:00:00+05:30",
        config: {
            occasion: "ENGAGEMENT",
            groom: "Aditya",
            bride: "Ananya",
            groomParents: "Mr. & Mrs. Joshi",
            brideParents: "Mr. & Mrs. Deshmukh",
            venue: "The Orchid Lawns, Nagpur",
            message: "Two families, one promise. Join us as we exchange rings.",
            events: [{ name: "Ring Ceremony", date: "2027-03-14T18:00:00+05:30", venue: "The Orchid Lawns, Nagpur", address: "Wardha Road, Nagpur 440015" }],
            coverImage: "/samples/couple-engagement.jpg",
        },
    },
    {
        slug: "dev-weds-tara-udaipur",
        title: "Dev & Tara",
        language: "EN",
        templateKey: "destination",
        eventDate: "2027-02-14T18:30:00+05:30",
        config: {
            groom: "Dev",
            bride: "Tara",
            venue: "Udaipur",
            message: "Pack your bags — we're getting married by the lake!",
            coverImage: "/samples/couple-riverside.jpg",
            events: [
                { name: "Welcome Dinner", date: "2027-02-12T20:00:00+05:30", venue: "Lakeside Terrace" },
                { name: "Haldi", date: "2027-02-13T10:00:00+05:30", venue: "Courtyard Lawns" },
                { name: "Sangeet", date: "2027-02-13T19:30:00+05:30", venue: "Palace Ballroom" },
                { name: "Wedding", date: "2027-02-14T18:30:00+05:30", venue: "Lakeside Palace Resort", address: "Lake Pichola, Udaipur 313001" },
            ],
            travelNote: "Udaipur airport (UDR) is 25 minutes from the resort; we'll arrange pick-ups on 12 and 13 February.\nRooms are reserved for our guests from 12 to 15 February.",
        },
    },
    // ---------------- Birthday collection ----------------
    {
        slug: "aarav-turns-5",
        title: "Aarav's 5th Birthday",
        language: "EN",
        templateKey: "bday-kids",
        eventDate: "2027-01-16T16:00:00+05:30",
        config: {
            occasion: "BIRTHDAY",
            celebrant: "Aarav",
            age: 5,
            host: "Neha & Amit Sharma",
            rsvpPhone: "+910000000000",
            message: "Join us for cake, games and a whole lot of fun!",
            dressCode: "Bright colours and comfy shoes for games",
            venue: "Fun Factory Play Café, Pune",
            address: "Baner Road, Pune 411045",
            endDate: "2027-01-16T19:00:00+05:30",
            events: [
                { name: "Welcome & games", date: "2027-01-16T16:00:00+05:30" },
                { name: "Magic show", date: "2027-01-16T16:45:00+05:30" },
                { name: "Cake cutting", date: "2027-01-16T17:30:00+05:30" },
                { name: "Dinner", date: "2027-01-16T18:15:00+05:30" },
            ],
        },
    },
    {
        slug: "ananya-princess-party",
        title: "अनन्या का जन्मदिन",
        language: "HI",
        templateKey: "bday-princess",
        eventDate: "2027-02-06T17:00:00+05:30",
        config: {
            occasion: "BIRTHDAY",
            celebrant: "अनन्या",
            age: 6,
            host: "नेहा और अमित शर्मा",
            rsvpPhone: "+910000000000",
            message: "राजकुमारी की पार्टी में आपका स्वागत है!",
            venue: "रॉयल बैंक्वेट, पुणे",
            endDate: "2027-02-06T20:00:00+05:30",
            events: [
                { name: "स्वागत और खेल", date: "2027-02-06T17:00:00+05:30" },
                { name: "केक काटना", date: "2027-02-06T18:00:00+05:30" },
                { name: "भोजन", date: "2027-02-06T18:45:00+05:30" },
            ],
        },
    },
    {
        slug: "myra-first-birthday",
        title: "Myra turns one",
        language: "MR",
        templateKey: "bday-first",
        eventDate: "2027-03-13T11:00:00+05:30",
        config: {
            occasion: "BIRTHDAY",
            celebrant: "मायरा",
            age: 1,
            host: "पाटील कुटुंब",
            rsvpPhone: "+910000000000",
            message: "आमच्या छकुलीच्या पहिल्या वाढदिवसाला आशीर्वाद द्यायला नक्की या!",
            venue: "पाटील निवास, नाशिक",
            endDate: "2027-03-13T14:00:00+05:30",
            events: [
                { name: "केक कापणे", date: "2027-03-13T11:30:00+05:30" },
                { name: "जेवण", date: "2027-03-13T12:30:00+05:30" },
            ],
        },
    },
    {
        slug: "rohan-thirty",
        title: "Rohan's 30th",
        language: "EN",
        templateKey: "bday-luxury",
        eventDate: "2027-04-24T19:30:00+05:30",
        config: {
            occasion: "BIRTHDAY",
            celebrant: "Rohan",
            age: 30,
            host: "Priya",
            rsvpPhone: "+910000000000",
            message: "Thirty, flirty and thriving. Join me for an evening to remember.",
            dressCode: "Black tie — a touch of gold welcome",
            venue: "The Terrace, Mumbai",
            address: "Lower Parel, Mumbai 400013",
            endDate: "2027-04-24T23:30:00+05:30",
            events: [
                { name: "Welcome drinks", date: "2027-04-24T19:30:00+05:30" },
                { name: "Cake cutting", date: "2027-04-24T21:00:00+05:30" },
                { name: "Music & dance", date: "2027-04-24T21:30:00+05:30" },
            ],
        },
    },
];

for (const { eventDate, ...demo } of demos) {
    const data = { ...demo, eventDate: new Date(eventDate), status: "PUBLISHED" };
    const invitation = await prisma.invitation.upsert({
        where: { slug: demo.slug },
        update: data,
        create: { ...data, clientId: client.id, publishedAt: new Date() },
    });
    console.log(`Demo invitation (${invitation.language}, ${invitation.templateKey}): /i/${invitation.slug}`);
}

await prisma.$disconnect();
