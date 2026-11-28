import { Link, useLocation } from "react-router-dom";
import { OCCASION_PAGES } from "../content/occasions.js";
import { TEMPLATES, listedTemplates } from "../templates/index.js";
import { OCCASION_PRICES, PRICE_LISTS, formatPrice } from "../config/pricing.js";
import { breadcrumbLd, pageMeta, serviceLd } from "../seo/site.js";
import { usePageMeta } from "../hooks/usePageMeta.js";
import { enquiryLink, previewImage } from "../utils/site.js";
import { Breadcrumbs, SiteFooter, SiteHeader, WhatsAppIcon } from "../components/site/SiteChrome.jsx";
import DesignCard from "../components/site/DesignCard.jsx";
import JsonLd from "../components/site/JsonLd.jsx";
import NotFoundPage from "./NotFoundPage.jsx";

// Landing page for one occasion: what you get, the designs, how it works, prices, questions.
export default function OccasionPage() {
  const { pathname } = useLocation();
  const page = OCCASION_PAGES[pathname];
  usePageMeta(pathname);
  if (!page) return <NotFoundPage />;

  const designs = listedTemplates({ group: page.group });
  const packages = page.priceList ? PRICE_LISTS[page.priceList].packages : null;
  const occasionPrice = page.priceOccasion ? OCCASION_PRICES.find((o) => o.id === page.priceOccasion) : null;
  const lowPrice = packages ? packages[0].price : occasionPrice?.from;
  const hero = TEMPLATES[page.heroDesign];
  const crumbs = [["Home", "/"], [page.crumb, pathname]];

  return (
    <div className="site">
      <SiteHeader />
      <Breadcrumbs items={crumbs} />
      <main id="main">
        <section className="lp-hero">
          <div className="wrap lp-hero-grid">
            <div>
              <span className="eyebrow">{page.eyebrow}</span>
              <h1 className="h-xl">{page.h1}</h1>
              <p className="lead">{page.intro}</p>
              <div className="hero-actions">
                <a href="#designs" className="btn-s">
                  See the designs
                </a>
                <a className="btn-s ghost" href={enquiryLink()} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon /> Ask on WhatsApp
                </a>
              </div>
              {lowPrice && <p className="hero-facts"><span>From {formatPrice(lowPrice)}</span><span>English · हिन्दी · मराठी</span></p>}
            </div>
            {hero && (
              <Link to={`/templates?template=${page.heroDesign}`} className="phone" aria-label={`Preview ${hero.name}`}>
                <img src={previewImage(page.heroDesign)} alt={`${hero.name} invitation`} width="585" height="1266" fetchPriority="high" />
              </Link>
            )}
          </div>
        </section>

        <section className="section" id="designs" aria-labelledby="designs-title" style={{ background: "var(--paper-2)" }}>
          <div className="wrap">
            <h2 id="designs-title" className="h-lg" style={{ marginBottom: "32px" }}>
              {designs.length === 1 ? "The design" : `${designs.length} designs to choose from`}
            </h2>
            <div className="dgrid">
              {designs.map((tpl) => (
                <DesignCard key={tpl.key} template={tpl} />
              ))}
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="included-title">
          <div className="wrap">
            <h2 id="included-title" className="h-lg" style={{ marginBottom: "24px" }}>
              What makes it special
            </h2>
            <ul className="why">
              {page.highlights.map(([title, text], i) => (
                <li key={title}>
                  <span className="k">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section" aria-labelledby="steps-title" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <h2 id="steps-title" className="h-lg" style={{ marginBottom: "40px" }}>
              How to create yours
            </h2>
            <ol className="steps-s">
              {page.steps.map(([title, text], i) => (
                <li key={title}>
                  <span className="n">0{i + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section" aria-labelledby="price-title" style={{ background: "var(--paper-2)" }}>
          <div className="wrap split">
            <div>
              <span className="eyebrow">Pricing</span>
              <h2 id="price-title" className="h-lg">
                {packages ? "Packages" : "Price"}
              </h2>
              <p className="lead" style={{ marginTop: "16px" }}>
                One-time price, revisions included. <Link to="/pricing">Compare everything on the pricing page.</Link>
              </p>
            </div>
            <ul className="price-rows">
              {packages ? (
                packages.map((p) => (
                  <li key={p.id}>
                    <span>
                      <span className="pr-name">{p.name}</span>
                      <span className="pr-note">
                        {p.summary} Ready in {p.delivery}.
                      </span>
                    </span>
                    <span className="pr-price">
                      {p.from && <small>from </small>}
                      {formatPrice(p.price)}
                    </span>
                  </li>
                ))
              ) : (
                <li>
                  <span>
                    <span className="pr-name">{occasionPrice.name} invitation</span>
                    <span className="pr-note">Personalised design, RSVP, maps and WhatsApp sharing. Final price confirmed before we start.</span>
                  </span>
                  <span className="pr-price">
                    <small>from </small>
                    {formatPrice(occasionPrice.from)}
                  </span>
                </li>
              )}
            </ul>
          </div>
        </section>

        <section className="section" aria-labelledby="faq-title">
          <div className="wrap split">
            <h2 id="faq-title" className="h-lg">
              Questions
            </h2>
            <div className="faq">
              {page.faq.map(([q, a]) => (
                <details key={q}>
                  <summary>{q}</summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="final">
          <div className="wrap">
            <div className="inv-card">
              <span className="eyebrow">Ready when you are</span>
              <h2 className="h-lg">Start your {page.crumb.toLowerCase().replace(" invitations", "")} invitation</h2>
              <p className="lead">Send us the date and a few details on WhatsApp — we'll take it from there.</p>
              <a className="btn-s wa" href={enquiryLink()} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon /> Chat on WhatsApp
              </a>
              <p style={{ marginTop: "20px" }}>
                <Link to="/guides/invitation-wording" className="link-s">
                  Need wording ideas? Read our guide
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <JsonLd data={breadcrumbLd(crumbs)} />
      {lowPrice && <JsonLd data={serviceLd({ name: page.crumb, description: pageMeta(pathname).description, path: pathname, lowPrice })} />}
    </div>
  );
}
