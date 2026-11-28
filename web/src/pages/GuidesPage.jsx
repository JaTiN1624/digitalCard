import { Link, useLocation } from "react-router-dom";
import { breadcrumbLd } from "../seo/site.js";
import { usePageMeta } from "../hooks/usePageMeta.js";
import { enquiryLink } from "../utils/site.js";
import { Breadcrumbs, SiteFooter, SiteHeader, WhatsAppIcon } from "../components/site/SiteChrome.jsx";
import JsonLd from "../components/site/JsonLd.jsx";
import NotFoundPage from "./NotFoundPage.jsx";

// Helpful, original guides that answer what people search for before ordering an invitation.
const GUIDES = {
  "/guides/invitation-wording": {
    crumb: "Invitation wording",
    title: "Invitation wording in English, Hindi and Marathi",
    summary: "Ready-to-adapt wording for weddings, birthdays, anniversaries and baby showers, with tips for writing your own.",
    body: WordingGuide,
  },
  "/guides/whatsapp-invitations-and-rsvp": {
    crumb: "WhatsApp & RSVP",
    title: "Sharing invitations on WhatsApp and collecting RSVPs",
    summary: "How a digital invitation works on WhatsApp, how guests reply, and how it compares with a printed card.",
    body: WhatsAppGuide,
  },
};

export default function GuidesPage() {
  const { pathname } = useLocation();
  usePageMeta(pathname);
  if (pathname === "/guides") return <GuideIndex />;
  const guide = GUIDES[pathname];
  if (!guide) return <NotFoundPage />;
  const crumbs = [["Home", "/"], ["Guides", "/guides"], [guide.crumb, pathname]];
  const Body = guide.body;

  return (
    <div className="site">
      <SiteHeader />
      <Breadcrumbs items={crumbs} />
      <main id="main" className="wrap section" style={{ paddingTop: "32px" }}>
        <article className="prose">
          <span className="eyebrow">Guide</span>
          <h1 className="h-xl">{guide.title}</h1>
          <p className="lead" style={{ marginTop: "16px" }}>
            {guide.summary}
          </p>
          <Body />
          <h2>Want us to write it for you?</h2>
          <p>Wording is included with every invitation. Send us your details and the tone you'd like — formal, warm or playful — and we'll draft it in your language.</p>
          <p style={{ marginTop: "20px" }}>
            <a className="btn-s wa" href={enquiryLink()} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon /> Ask on WhatsApp
            </a>
          </p>
        </article>
      </main>
      <SiteFooter />
      <JsonLd data={breadcrumbLd(crumbs)} />
    </div>
  );
}

function GuideIndex() {
  return (
    <div className="site">
      <SiteHeader />
      <Breadcrumbs items={[["Home", "/"], ["Guides", "/guides"]]} />
      <main id="main" className="wrap section" style={{ paddingTop: "32px" }}>
        <span className="eyebrow">Guides</span>
        <h1 className="h-xl" style={{ marginBottom: "40px" }}>
          Help with your invitation
        </h1>
        <ul className="guide-list prose" style={{ maxWidth: "52em" }}>
          {Object.entries(GUIDES).map(([path, g]) => (
            <li key={path}>
              <Link to={path}>
                <h2>{g.title}</h2>
                <p>{g.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter />
      <JsonLd data={breadcrumbLd([["Home", "/"], ["Guides", "/guides"]])} />
    </div>
  );
}

const Wording = ({ lang, children }) => (
  <p className="wording" lang={lang}>
    {children}
  </p>
);

function WordingGuide() {
  return (
    <>
      <h2>What every invitation needs</h2>
      <ul>
        <li>
          <strong>Who is inviting</strong> — the couple, the parents, or the family.
        </li>
        <li>
          <strong>The occasion and whose it is</strong> — names spelled exactly as they should appear.
        </li>
        <li>
          <strong>When and where</strong> — day, date, time and venue; a map link saves a dozen phone calls.
        </li>
        <li>
          <strong>One warm line</strong> — why you'd love them to come. Keep it short; the design does the rest.
        </li>
        <li>
          <strong>How to reply</strong> — an RSVP button or a number to call.
        </li>
      </ul>

      <h2>Wedding wording</h2>
      <h3>English — traditional</h3>
      <Wording lang="en">{"With the blessings of our elders,\nMr. & Mrs. Sharma and Mr. & Mrs. Kulkarni\nrequest the pleasure of your company at the wedding of\nRahul & Priya"}</Wording>
      <h3>Hindi</h3>
      <Wording lang="hi">{"बड़ों के आशीर्वाद से\nशर्मा एवं कुलकर्णी परिवार\nआपको राहुल और प्रिया के शुभ विवाह में\nसादर आमंत्रित करते हैं।"}</Wording>
      <h3>Marathi</h3>
      <Wording lang="mr">{"वडीलधाऱ्यांच्या आशीर्वादाने\nशर्मा व कुलकर्णी कुटुंबीय\nराहुल आणि प्रिया यांच्या शुभविवाहास\nआपली उपस्थिती प्रार्थनीय आहे."}</Wording>

      <h2>Birthday wording</h2>
      <h3>For a child's party</h3>
      <Wording lang="en">{"Aarav is turning 5!\nJoin us for cake, games and a whole lot of fun."}</Wording>
      <Wording lang="hi">{"आरव का पाँचवाँ जन्मदिन!\nकेक, खेल और ढेर सारी मस्ती के लिए ज़रूर आइए।"}</Wording>
      <Wording lang="mr">{"आरवचा पाचवा वाढदिवस!\nकेक, खेळ आणि भरपूर धमालीसाठी नक्की या."}</Wording>
      <h3>For a milestone birthday</h3>
      <Wording lang="en">{"Sixty years of love, laughter and chai.\nPlease join us to celebrate Shobha's 60th birthday."}</Wording>

      <h2>Anniversary wording</h2>
      <Wording lang="en">{"Twenty-five years ago they promised each other forever.\nJoin us to celebrate Suresh & Meena's silver anniversary."}</Wording>
      <Wording lang="hi">{"साथ के पच्चीस सुनहरे वर्ष —\nसुरेश और मीना की विवाह वर्षगाँठ के उत्सव में आप सादर आमंत्रित हैं।"}</Wording>

      <h2>Baby shower wording</h2>
      <Wording lang="en">{"A little one is on the way!\nJoin us for Priya's baby shower and shower her with love."}</Wording>
      <Wording lang="hi">{"घर में आने वाला है एक नन्हा मेहमान —\nप्रिया की गोद भराई में आप सादर आमंत्रित हैं।"}</Wording>
      <Wording lang="mr">{"घरी येणार आहे छोटा पाहुणा —\nप्रियाच्या डोहाळे जेवणास आपण अवश्य यावे."}</Wording>

      <h2>Tips for writing your own</h2>
      <ul>
        <li>Read it aloud. If it sounds like something your family would say, it's right.</li>
        <li>In Hindi and Marathi, formal forms (आप, आपण) are expected for elders and wider family.</li>
        <li>Put practical notes (dress code, parking, timings for children) in their own line, not inside the main message.</li>
        <li>Check spellings of names twice — it's the one thing every guest will notice.</li>
      </ul>
    </>
  );
}

function WhatsAppGuide() {
  return (
    <>
      <h2>How a digital invitation works on WhatsApp</h2>
      <p>
        A digital invitation is a small personal website with one link. You paste the link into WhatsApp — to a chat, a group or a broadcast list — and guests tap it to open the invitation in their phone's browser. There is nothing to download and no account to create.
      </p>
      <p>The invitation opens with its animation, then shows everything guests need: the date and time, each function, the venue with a Directions button, a countdown and a way to reply.</p>

      <h2>Tips for sharing</h2>
      <ol>
        <li>
          <strong>Send a short personal line with the link.</strong> “We'd love to see you at Priya's baby shower ❤️” gets more replies than a link on its own.
        </li>
        <li>
          <strong>Use broadcast lists for large families.</strong> Each person receives it as a private message, which feels more personal than a big group.
        </li>
        <li>
          <strong>Share once, remind once.</strong> A gentle reminder two or three days before the event is plenty — the countdown on the invitation does the rest.
        </li>
        <li>
          <strong>The same link works everywhere</strong> — Instagram stories, SMS or email.
        </li>
      </ol>

      <h2>How RSVP works</h2>
      <p>
        Guests tap the RSVP section, enter their name and phone number, choose whether they're attending and how many people are coming, and can add a message. Replies are collected for you, so you can plan food and seating with real numbers instead of guesses. Each phone number replies once, so a family doesn't get counted twice.
      </p>
      <p>Prefer phone calls? We can switch RSVP off and show Call and WhatsApp buttons for the host instead.</p>

      <h2>Digital or printed?</h2>
      <ul>
        <li>
          <strong>Speed:</strong> a digital invitation reaches everyone the moment you send it; printed cards take days to print and deliver.
        </li>
        <li>
          <strong>Details that stay correct:</strong> if a venue or time changes, the link is updated — no reprinting.
        </li>
        <li>
          <strong>Everything in one place:</strong> maps, every function, RSVP and photos — things a card simply can't hold.
        </li>
        <li>
          <strong>Cost:</strong> one price for unlimited guests, compared with printing and posting each card.
        </li>
        <li>
          <strong>Tradition:</strong> many families still send a printed card to elders and use the digital invitation for everyone else — both work well together.
        </li>
      </ul>
      <p>
        Browse <Link to="/templates">our designs</Link> or see <Link to="/pricing">packages and prices</Link>.
      </p>
    </>
  );
}
