import { Link } from "react-router-dom";
import { TEMPLATES } from "../templates/index.js";
import { HOSTING, OCCASION_PRICES, PRICE_LISTS, formatPrice } from "../config/pricing.js";
import { BUSINESS } from "../config/business.js";
import { organizationLd } from "../seo/site.js";
import { usePageMeta } from "../hooks/usePageMeta.js";
import { enquiryLink, previewImage } from "../utils/site.js";
import { SiteFooter, SiteHeader, WhatsAppIcon } from "../components/site/SiteChrome.jsx";
import DesignCard from "../components/site/DesignCard.jsx";
import Reveal from "../components/site/Reveal.jsx";
import JsonLd from "../components/site/JsonLd.jsx";

// Studio homepage. Within five seconds: what we make (real invitation previews), for which
// occasions, and how to start (explore designs, or message us on WhatsApp).
const HERO = ["bday-princess", "royal", "anniv-timeless"];
const FEATURED = ["floral", "bday-luxury", "bday-first", "maharashtrian", "baby-pastel"];

const from = (id) => OCCASION_PRICES.find((o) => o.id === id)?.from;

const OCCASIONS = [
  { to: "/wedding-invitations", name: "Wedding", image: "royal", price: PRICE_LISTS.wedding.packages[0].price },
  { to: "/birthday-invitations", name: "Birthday", image: "bday-first", price: PRICE_LISTS.birthday.packages[0].price },
  { to: "/engagement-invitations", name: "Engagement", image: "engagement", price: from("engagement") },
  { to: "/anniversary-invitations", name: "Anniversary", image: "anniv-timeless", price: from("anniversary") },
  { to: "/baby-shower-invitations", name: "Baby Shower", image: "baby-pastel", price: from("babyShower") },
  { href: true, name: "Housewarming", price: from("housewarming") },
];

const REASONS = [
  ["Beautiful animation", "Each design opens its own way — an envelope, castle gates, a clock turning back time — then stays calm and easy to read."],
  ["Personal details", "Names, families, every function, your photos and your words. Nothing generic, nothing left as a placeholder."],
  ["Made for WhatsApp", "One link that opens instantly in WhatsApp, with a proper preview card. No app, no sign-up for your guests."],
  ["RSVP built in", "Guests reply with how many are coming, plus a message — so you can plan food and seating with real numbers."],
  ["Maps & directions", "Every venue has one-tap directions in Google Maps. No more “send location please”."],
  ["English, हिन्दी, मराठी", "Written properly in the language your family speaks, with Devanagari typography that reads beautifully."],
];

const FAQ = [
  ["What exactly do I receive?", "A personal invitation website — one link — with your design, details, photos, venue maps, countdown and RSVP. You share it on WhatsApp, Instagram or SMS."],
  ["Do I need to design anything myself?", "No. You choose a design and send your details on WhatsApp. Our studio personalises it and sends you a private preview to approve."],
  ["How long does it take?", "Most invitations are ready in 1–4 working days after we have all your details, depending on the package. Exact times are on the pricing page."],
  ["Can I make changes after seeing it?", "Yes. Every package includes revision rounds. Extra changes after that are quoted before we make them."],
  ["How long does the link stay live?", `${HOSTING.summary} ${HOSTING.renewal}`],
];

export default function HomePage() {
  usePageMeta("/");

  return (
    <div className="site">
      <SiteHeader />
      <main id="main">
        <section className="hero-s">
          <div className="wrap hero-s-grid">
            <div>
              <span className="eyebrow">Digital invitation studio · India</span>
              <h1 className="h-xl">
                Every celebration deserves an invitation <em>as special as the moment.</em>
              </h1>
              <p className="lead">Beautifully crafted digital invitations for birthdays, weddings and every unforgettable celebration — personalised by us, shared by you in one link.</p>
              <div className="hero-actions">
                <Link to="/templates" className="btn-s">
                  Explore invitations
                </Link>
                <a className="btn-s ghost" href={enquiryLink()} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon /> Create your invitation
                </a>
              </div>
              <p className="hero-facts">
                <span>From {formatPrice(PRICE_LISTS.birthday.packages[0].price)}</span>
                <span>English · हिन्दी · मराठी</span>
                <span>Ready in days, not weeks</span>
              </p>
            </div>
            <div className="hero-stage" aria-label="Examples of our invitation designs">
              {HERO.map((key, i) => (
                <Link key={key} to={`/templates?template=${key}`} className={`phone p${i + 1}`} aria-label={`Preview ${TEMPLATES[key].name}`}>
                  <img src={previewImage(key)} alt={`${TEMPLATES[key].name} invitation on a phone`} width="585" height="1266" fetchPriority={i === 1 ? "high" : "auto"} loading={i === 1 ? "eager" : "lazy"} />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="occasions-title" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="section-head">
              <h2 id="occasions-title" className="h-lg">
                For every occasion
              </h2>
              <Link to="/templates" className="link-s">
                See every design →
              </Link>
            </div>
            <div className="occ-row">
              {OCCASIONS.map((o) =>
                o.href ? (
                  <a key={o.name} className="occ" href={enquiryLink()} target="_blank" rel="noopener noreferrer">
                    <span className="occ-img">
                      <span className="occ-typo">Designed for your new home, on request</span>
                    </span>
                    <span>
                      <span className="occ-name">{o.name}</span>
                      <span className="occ-meta">On request · from {formatPrice(o.price)}</span>
                    </span>
                  </a>
                ) : (
                  <Link key={o.name} to={o.to} className="occ">
                    <span className="occ-img">
                      <img src={previewImage(o.image)} alt="" width="585" height="1266" loading="lazy" decoding="async" />
                    </span>
                    <span>
                      <span className="occ-name">{o.name}</span>
                      <span className="occ-meta">from {formatPrice(o.price)}</span>
                    </span>
                  </Link>
                ),
              )}
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="featured-title" style={{ background: "var(--paper-2)" }}>
          <div className="wrap">
            <div className="section-head">
              <div>
                <span className="eyebrow">Featured designs</span>
                <h2 id="featured-title" className="h-lg">
                  Chosen by our studio
                </h2>
              </div>
              <Link to="/templates" className="link-s">
                View the collection →
              </Link>
            </div>
            <div className="dgrid has-feature">
              {FEATURED.map((key) => (
                <DesignCard key={key} template={{ key, ...TEMPLATES[key] }} />
              ))}
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="how-title">
          <div className="wrap">
            <span className="eyebrow">How it works</span>
            <h2 id="how-title" className="h-lg" style={{ marginBottom: "48px" }}>
              Three simple steps
            </h2>
            <ol className="steps-s">
              {[
                ["Choose your design", "Open any design as a live preview, in English, हिन्दी or मराठी, and pick the one that feels like you."],
                ["Personalise your invitation", "Send us names, dates, venues and photos on WhatsApp. We craft the wording and send you a private preview."],
                ["Share your link", "Approve it and share one beautiful link on WhatsApp. Guests open it instantly and RSVP in seconds."],
              ].map(([title, text], i) => (
                <Reveal as="li" key={title} style={{ transitionDelay: `${i * 120}ms` }}>
                  <span className="n">0{i + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        <section className="section" aria-labelledby="why-title" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <h2 id="why-title" className="h-lg" style={{ marginBottom: "32px" }}>
              Why guests love opening them
            </h2>
            <Reveal as="ul" className="why">
              {REASONS.map(([title, text], i) => (
                <li key={title}>
                  <span className="k">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </li>
              ))}
            </Reveal>
          </div>
        </section>

        <section className="section" aria-labelledby="price-title" style={{ background: "var(--paper-2)" }}>
          <div className="wrap split">
            <div>
              <span className="eyebrow">Pricing</span>
              <h2 id="price-title" className="h-lg">
                One price. No subscriptions.
              </h2>
              <p className="lead" style={{ marginTop: "16px" }}>
                Every package includes personalisation, revisions and hosting. {HOSTING.summary}
              </p>
              <p style={{ marginTop: "24px" }}>
                <Link to="/pricing" className="link-s">
                  Compare packages →
                </Link>
              </p>
            </div>
            <ul className="price-rows">
              {OCCASIONS.map((o) => (
                <li key={o.name}>
                  <span className="pr-name">{o.name}</span>
                  <span className="pr-price">
                    <small>from </small>
                    {formatPrice(o.price)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section" aria-labelledby="faq-title">
          <div className="wrap split">
            <h2 id="faq-title" className="h-lg">
              Questions, answered
            </h2>
            <div className="faq">
              {FAQ.map(([q, a]) => (
                <details key={q}>
                  <summary>{q}</summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="final" aria-labelledby="final-title">
          <div className="wrap">
            <Reveal className="inv-card">
              <span className="inv-seal" aria-hidden="true">
                {BUSINESS.name.charAt(0)}
              </span>
              <span className="eyebrow">You're invited</span>
              <h2 id="final-title" className="h-lg">
                Let's create your invitation
              </h2>
              <p className="lead">Tell us your occasion and date on WhatsApp — we'll suggest designs and take care of the rest.</p>
              <a className="btn-s wa" href={enquiryLink()} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon /> Chat with us on WhatsApp
              </a>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
      <JsonLd data={organizationLd()} />
    </div>
  );
}
