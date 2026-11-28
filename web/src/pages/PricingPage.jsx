import { Link, useSearchParams } from "react-router-dom";
import { DELIVERY_NOTE, HOSTING, OCCASION_PRICES, PRICE_LISTS, REVISION_NOTE, SCOPE, formatPrice } from "../config/pricing.js";
import { BUSINESS, whatsappLink } from "../config/business.js";
import { breadcrumbLd } from "../seo/site.js";
import { usePageMeta } from "../hooks/usePageMeta.js";
import { Breadcrumbs, SiteFooter, SiteHeader, WhatsAppIcon } from "../components/site/SiteChrome.jsx";
import JsonLd from "../components/site/JsonLd.jsx";

// Package comparison; every number comes from config/pricing.js
export default function PricingPage() {
  const [params, setParams] = useSearchParams();
  const listId = PRICE_LISTS[params.get("for")] ? params.get("for") : "birthday";
  const list = PRICE_LISTS[listId];
  usePageMeta("/pricing");

  return (
    <div className="site">
      <SiteHeader />
      <Breadcrumbs items={[["Home", "/"], ["Pricing", "/pricing"]]} />
      <main id="main">
        <header className="wrap col-head">
          <span className="eyebrow">Launch pricing</span>
          <h1 className="h-xl">Simple packages, honest prices</h1>
          <p className="lead">One-time price per invitation. We personalise everything for you — no app, no sign-up, no subscription.</p>
          <div className="tabs-s" role="group" aria-label="Occasion">
            {Object.entries(PRICE_LISTS).map(([id, l]) => (
              <button key={id} type="button" className="chip-s" aria-pressed={id === listId} onClick={() => setParams({ for: id }, { replace: true })}>
                {l.label}
              </button>
            ))}
          </div>
        </header>

        <section className="wrap" aria-label={`${list.label} packages`}>
          <div className="pkgs">
            {list.packages.map((pkg) => (
              <article key={pkg.id} className={`pkg ${pkg.highlight ? "hl" : ""}`}>
                <div className="pkg-top">
                  <h2 className="pkg-name">{pkg.name}</h2>
                  {pkg.highlight && <span className="pkg-flag">Most chosen</span>}
                </div>
                <p className="pkg-price">
                  {pkg.from && <small>from </small>}
                  {formatPrice(pkg.price)}
                </p>
                <p className="pkg-sum">{pkg.summary}</p>
                <p className="pkg-terms">
                  <span>
                    <b>Revisions:</b> {pkg.revisions}
                  </span>
                  <span>
                    <b>Delivery:</b> {pkg.delivery}
                  </span>
                  <span>
                    <b>Hosting:</b> {HOSTING.months} months after the event
                  </span>
                </p>
                <ul className="pkg-list">
                  {pkg.included.map((item) => (
                    <li key={item} className="in">
                      {item}
                    </li>
                  ))}
                  {pkg.excluded.map((item) => (
                    <li key={item} className="out">
                      <span className="sr-only">Not included: </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  className={`btn-s ${pkg.highlight ? "wa" : "ghost"}`}
                  href={whatsappLink(`Hi ${BUSINESS.name}! I'm interested in the ${list.label} ${pkg.name} package (${pkg.from ? "from " : ""}${formatPrice(pkg.price)}).`)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon /> Enquire
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="section wrap" aria-labelledby="other-title">
          <div className="split">
            <div>
              <span className="eyebrow">Other occasions</span>
              <h2 id="other-title" className="h-lg">
                Starting prices
              </h2>
              <p className="lead" style={{ marginTop: "16px" }}>
                We confirm the exact price on WhatsApp before we begin, based on the design and what you'd like included.
              </p>
            </div>
            <ul className="price-rows">
              {OCCASION_PRICES.map((o) => (
                <li key={o.id}>
                  <span>
                    <span className="pr-name">{o.name}</span>
                    <span className="pr-note">{o.note}</span>
                  </span>
                  <span className="pr-price">
                    <small>from </small>
                    {formatPrice(o.from)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section" aria-labelledby="terms-title" style={{ background: "var(--paper-2)" }}>
          <div className="wrap">
            <h2 id="terms-title" className="h-lg" style={{ marginBottom: "40px" }}>
              Good to know
            </h2>
            <div className="terms-grid">
              <div>
                <h3>What we personalise</h3>
                <ul>
                  {SCOPE.included.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>Additional charges</h3>
                <ul>
                  {SCOPE.extra.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                <p style={{ marginTop: "10px" }}>{SCOPE.extraNote}</p>
              </div>
              <div>
                <h3>Delivery</h3>
                <p>{DELIVERY_NOTE}</p>
              </div>
              <div>
                <h3>Revisions</h3>
                <p>{REVISION_NOTE}</p>
              </div>
              <div>
                <h3>Hosting & renewal</h3>
                <p>{HOSTING.summary}</p>
                <p>{HOSTING.renewal}</p>
              </div>
              <div>
                <h3>How ordering works</h3>
                <p>
                  Choose a <Link to="/templates">design</Link> and package, send your details and photos on WhatsApp, approve your private preview, and receive your final link.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <JsonLd data={breadcrumbLd([["Home", "/"], ["Pricing", "/pricing"]])} />
    </div>
  );
}
