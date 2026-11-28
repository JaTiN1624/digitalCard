import { Suspense, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { GROUPS, TEMPLATES, getTemplate, groupLabel, groupOf, listedTemplates } from "../templates/index.js";
import { sampleInvitation } from "../templates/sample.js";
import { LANGUAGES, getT } from "../i18n/index.js";
import { OCCASION_PRICES, PRICE_LISTS, formatPrice, templatePrice } from "../config/pricing.js";
import { BUSINESS, customizeMessage, whatsappLink } from "../config/business.js";
import { usePageMeta } from "../hooks/usePageMeta.js";
import { enquiryLink } from "../utils/site.js";
import { SiteFooter, SiteHeader, WhatsAppIcon } from "../components/site/SiteChrome.jsx";
import DesignCard from "../components/site/DesignCard.jsx";
import MusicButton from "../components/invitation/MusicButton.jsx";

// /templates                           curated collection (featured designs, occasion filter)
// /templates?collection=birthday       one occasion (old ?collection links keep working)
// /templates?all=1                     every design
// /templates?template=floral           live preview (also &lang=HI&age=5)
// /templates?template=floral&embed=1   the bare invitation, used inside the desktop phone frame
const AGES = [1, 3, 5, 8, 10, 13, 16, 18, 21, 25, 30, 40, 50, 60, 75];
const LEGACY_COLLECTION = { other: "engagement" };

export default function TemplatesPage() {
  const [params] = useSearchParams();
  const key = params.get("template");
  if (!TEMPLATES[key]) return <Collection />;
  if (params.get("embed") === "1") return <Embedded templateKey={key} />;
  return <Preview key={key} templateKey={key} />;
}

/* ------------------------------------------------------------------ */
/* Collection                                                          */
/* ------------------------------------------------------------------ */

function Collection() {
  const [params, setParams] = useSearchParams();
  const raw = params.get("collection");
  const group = GROUPS.some((g) => g.id === raw) ? raw : LEGACY_COLLECTION[raw] ?? null;
  const urlQuery = params.get("q") ?? "";
  const tier = params.get("tier") ?? "";
  // The search box updates instantly; the URL (shareable, back-button friendly) follows shortly
  // after, so fast typing on a slow phone never loses characters.
  const [query, setQuery] = useState(urlQuery);
  const showAll = params.get("all") === "1" || Boolean(query) || Boolean(tier);

  usePageMeta(group ? { ...pageFor(group), path: "/templates" } : "/templates");

  const set = (changes, replace = false) =>
    setParams(
      (p) => {
        for (const [k, v] of Object.entries(changes)) {
          if (v) p.set(k, v);
          else p.delete(k);
        }
        return p;
      },
      { replace },
    );

  useEffect(() => {
    if (query === urlQuery) return;
    const id = window.setTimeout(() => set({ q: query }, true), 300);
    return () => window.clearTimeout(id);
  });

  const designs = useMemo(() => {
    const words = query.trim().toLowerCase();
    return listedTemplates({ group: group ?? undefined, featured: !showAll })
      .filter((tpl) => !tier || (tier === "premium") === !["essential", "start"].includes(tpl.tier))
      .filter((tpl) => !words || `${tpl.name} ${tpl.audience ?? ""} ${tpl.description} ${groupLabel(tpl.group)}`.toLowerCase().includes(words));
  }, [group, showAll, query, tier]);

  const total = listedTemplates({ group: group ?? undefined }).length;
  const hidden = total - designs.length;

  return (
    <div className="site">
      <SiteHeader />
      <main id="main">
        <header className="wrap col-head">
          <span className="eyebrow">{showAll ? "The full collection" : "Featured collection"}</span>
          <h1 className="h-xl">{group ? `${groupLabel(group)} designs` : "Invitations, curated"}</h1>
          <p className="lead">Every design opens with its own animation. Tap any design to open it exactly as your guests will — then we personalise it for you.</p>
        </header>

        <div className="toolbar">
          <div className="wrap toolbar-in">
            <div className="chips-s" role="group" aria-label="Occasion">
              <button type="button" className="chip-s" aria-pressed={!group} onClick={() => set({ collection: null })}>
                All
              </button>
              {GROUPS.map((g) => (
                <button key={g.id} type="button" className="chip-s" aria-pressed={group === g.id} onClick={() => set({ collection: g.id })}>
                  {g.label}
                </button>
              ))}
            </div>
            <div className="tools-right">
              <label className="search-s">
                <span className="sr-only">Search designs</span>
                <input type="search" placeholder="Search designs" value={query} onChange={(e) => setQuery(e.target.value)} />
              </label>
              <label>
                <span className="sr-only">Style</span>
                <select className="select-s" value={tier} onChange={(e) => set({ tier: e.target.value })}>
                  <option value="">Any style</option>
                  <option value="standard">Standard</option>
                  <option value="premium">Premium</option>
                </select>
              </label>
            </div>
          </div>
        </div>

        <section className="wrap" aria-labelledby="designs-heading" style={{ paddingBottom: "96px" }}>
          <h2 id="designs-heading" className="sr-only">
            {designs.length} designs
          </h2>
          {designs.length ? (
            <div className={`dgrid ${!group && !showAll ? "has-feature" : ""}`}>
              {designs.map((tpl, i) => (
                <DesignCard key={tpl.key} template={tpl} eager={i < 2} />
              ))}
            </div>
          ) : (
            <p className="empty">No designs match. Try another word — or tell us what you have in mind on WhatsApp.</p>
          )}

          {!showAll && hidden > 0 && (
            <div className="col-more">
              <p>
                {hidden} more {group ? groupLabel(group).toLowerCase() : ""} design{hidden === 1 ? "" : "s"} in the full collection
              </p>
              <button type="button" className="btn-s ghost" onClick={() => set({ all: "1" })}>
                View all designs
              </button>
            </div>
          )}

          {!group && (
            <div className="on-request">
              <div>
                <span className="eyebrow">On request</span>
                <h2 className="h-md">Housewarming, naming ceremony or something else?</h2>
              </div>
              <div>
                <p className="lead">We design invitations for any occasion. Message us your event, date and the feeling you want, and we'll suggest a direction and a price before we start.</p>
                <p style={{ marginTop: "20px" }}>
                  <a className="btn-s wa" href={enquiryLink()} target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon /> Ask on WhatsApp
                  </a>
                </p>
              </div>
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

const pageFor = (group) => ({
  title: `${groupLabel(group)} Invitation Designs | ${BUSINESS.name}`,
  description: `Animated ${groupLabel(group).toLowerCase()} invitation designs with live previews in English, Hindi and Marathi.`,
});

/* ------------------------------------------------------------------ */
/* Preview                                                             */
/* ------------------------------------------------------------------ */

const subscribe = (cb) => {
  const mq = window.matchMedia("(min-width: 960px)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const useDesktop = () => useSyncExternalStore(subscribe, () => window.matchMedia("(min-width: 960px)").matches, () => false);

// Packages a customer can choose for this design: its price list from its starting tier up,
// or the occasion's starting price when the occasion has no package list yet
function packagesFor(template) {
  const list = template.pricing ? null : PRICE_LISTS[template.collection ?? "wedding"];
  if (!list) {
    const occ = OCCASION_PRICES.find((o) => o.id === template.pricing);
    return occ ? [{ id: occ.id, name: `${occ.name} invitation`, price: occ.from, from: true, summary: "Personalised design, RSVP, maps and WhatsApp sharing. Final price confirmed on WhatsApp." }] : [];
  }
  const start = Math.max(0, list.packages.findIndex((p) => p.id === template.tier));
  return list.packages.slice(start);
}

function usePreviewState(templateKey) {
  const [params, setParams] = useSearchParams();
  const template = TEMPLATES[templateKey];
  const language = LANGUAGES.some((l) => l.code === params.get("lang")) ? params.get("lang") : "EN";
  const ageParam = params.get("age");
  const age = ageParam === "none" ? null : Number(ageParam) || template.sampleAge || null;
  const choose = (changes) =>
    setParams(
      (p) => {
        for (const [k, v] of Object.entries(changes)) {
          if (v === null) p.delete(k);
          else p.set(k, v);
        }
        return p;
      },
      { replace: true },
    );
  return { template, language, age, choose };
}

function InvitationRender({ templateKey, language, age }) {
  const invitation = useMemo(() => sampleInvitation(language, templateKey, age), [language, templateKey, age]);
  const Template = getTemplate(templateKey).component;
  return (
    <>
      <Suspense fallback={<p className="page center muted">Loading…</p>}>
        <Template key={`${templateKey}-${language}-${age}`} invitation={invitation} t={getT(language)} preview />
      </Suspense>
      <MusicButton src={invitation.config.music} />
    </>
  );
}

function Embedded({ templateKey }) {
  const { language, age } = usePreviewState(templateKey);
  return (
    <main>
      <InvitationRender templateKey={templateKey} language={language} age={age} />
    </main>
  );
}

function Preview({ templateKey }) {
  const { template, language, age, choose } = usePreviewState(templateKey);
  const desktop = useDesktop();
  const birthday = template.collection === "birthday";
  const occasion = groupLabel(groupOf(templateKey));
  const packages = packagesFor(template);
  const [pkgId, setPkgId] = useState(packages[0]?.id);
  const pkg = packages.find((p) => p.id === pkgId) ?? packages[0];
  const startPrice = templatePrice({ key: templateKey, ...template });
  const ages = !age || AGES.includes(age) ? AGES : [...AGES, age].sort((a, b) => a - b);
  const message = customizeMessage({
    design: template.name,
    occasion,
    packageName: pkg && !template.pricing ? pkg.name : undefined,
    priceText: pkg ? `${pkg.from ? "from " : ""}${formatPrice(pkg.price)}` : startPrice && formatPrice(startPrice.amount),
  });

  usePageMeta({
    title: `${template.name} — ${occasion} Invitation Live Preview | ${BUSINESS.name}`,
    description: `${template.description}. Open the ${template.name} ${occasion.toLowerCase()} invitation exactly as guests see it.`,
    path: `/templates?template=${templateKey}`,
  });

  const languageSelect = (
    <select value={language} onChange={(e) => choose({ lang: e.target.value })} aria-label="Invitation language">
      {LANGUAGES.map((l) => (
        <option key={l.code} value={l.code} lang={l.htmlLang}>
          {l.label}
        </option>
      ))}
    </select>
  );
  const ageSelect = birthday && (
    <select value={age ?? "none"} onChange={(e) => choose({ age: e.target.value })} aria-label="Age shown in the preview">
      {ages.map((a) => (
        <option key={a} value={a}>
          Age {a}
        </option>
      ))}
      <option value="none">No age</option>
    </select>
  );

  if (!desktop) {
    return (
      <div className="pv-shell">
        <nav className="pv-top" aria-label="Preview">
          <Link to={`/templates?collection=${groupOf(templateKey)}`} className="pv-back" aria-label="Back to designs">
            ←
          </Link>
          <span className="pv-top-name">{template.name}</span>
          {languageSelect}
          {ageSelect}
        </nav>
        <p className="pv-demo">Demo preview — sample names and dates</p>
        <div className="pv-mobile-stage">
          <InvitationRender templateKey={templateKey} language={language} age={age} />
        </div>
        <aside className="pv-bottom" aria-label="Order this design">
          <span className="pv-bottom-price">
            {occasion}
            {startPrice && <b>from {formatPrice(startPrice.amount)}</b>}
          </span>
          <a className="btn-s wa" href={whatsappLink(message)} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon /> Customize
          </a>
        </aside>
      </div>
    );
  }

  const frameSrc = `/templates?template=${templateKey}&embed=1&lang=${language}${birthday && age ? `&age=${age}` : ""}`;

  return (
    <div className="site">
      <SiteHeader />
      <main id="main" className="wrap pv-desk">
        <div className="pv-phone-col">
          <div className="phone pv-phone">
            <iframe key={frameSrc} src={frameSrc} title={`${template.name} — live invitation preview`} />
          </div>
          <p className="pv-phone-note">Live preview · tap the invitation to open it · sample details</p>
        </div>

        <div className="pv-info">
          <nav className="crumbs" aria-label="Breadcrumb" style={{ padding: 0 }}>
            <ol>
              <li>
                <Link to="/templates">Designs</Link>
              </li>
              <li>
                <Link to={`/templates?collection=${groupOf(templateKey)}`}>{occasion}</Link>
              </li>
              <li>
                <span aria-current="page">{template.name}</span>
              </li>
            </ol>
          </nav>
          <span className="eyebrow" style={{ marginTop: "24px" }}>
            {template.audience ?? occasion}
          </span>
          <h1 className="h-xl">{template.name}</h1>
          <p className="lead">{template.description}. Shown here with demo names and dates — yours will carry your own details, photos and wording.</p>

          <div className="pv-controls-d">
            <label>
              Language
              <span>{languageSelect}</span>
            </label>
            {ageSelect && (
              <label>
                Age shown
                <span>{ageSelect}</span>
              </label>
            )}
          </div>

          {packages.length > 0 && (
            <fieldset className="pkg-pick">
              <legend>Choose a package</legend>
              {packages.map((p) => (
                <label key={p.id} className="pkg-opt">
                  <input type="radio" name="pkg" value={p.id} checked={pkg?.id === p.id} onChange={() => setPkgId(p.id)} />
                  <span>
                    <span className="pkg-opt-name">{p.name}</span>
                    <span className="pkg-opt-sum">
                      {p.summary}
                      {p.delivery && ` Ready in ${p.delivery}.`}
                    </span>
                  </span>
                  <span className="pkg-opt-price">
                    {p.from && "from "}
                    {formatPrice(p.price)}
                  </span>
                </label>
              ))}
            </fieldset>
          )}

          <div className="pv-cta-d">
            <a className="btn-s wa" href={whatsappLink(message)} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon /> Customize this invitation
            </a>
            <Link to="/pricing" className="link-s">
              What's in each package
            </Link>
          </div>

          <ul className="pv-facts">
            <li>
              <b>Includes:</b> opening animation, your details, venue maps, WhatsApp sharing
            </li>
            <li>
              <b>Languages:</b> English, हिन्दी, मराठी
            </li>
            <li>
              <b>How it works:</b> send details on WhatsApp → approve your private preview → share your link
            </li>
          </ul>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
