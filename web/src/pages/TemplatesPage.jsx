import { Suspense } from "react";
import { useSearchParams } from "react-router-dom";
import { TEMPLATES, DEFAULT_TEMPLATE, COLLECTIONS, collectionOf, getTemplate } from "../templates/index.js";
import { sampleInvitation } from "../templates/sample.js";
import { LANGUAGES, getT } from "../i18n/index.js";

// Template gallery: preview every template in every language with sample content.
// /templates?collection=birthday&template=bday-kids&lang=HI&age=5
const COLLECTION_LABELS = { wedding: "Wedding", birthday: "Birthday" };
const AGES = [1, 5, 7, 13, 18, 21, 25, 30, 40, 50, 60];

export default function TemplatesPage() {
  const [params, setParams] = useSearchParams();
  const requested = params.get("template");
  const collection = COLLECTIONS.includes(params.get("collection"))
    ? params.get("collection")
    : TEMPLATES[requested]
      ? collectionOf(requested)
      : "wedding";
  const keys = Object.keys(TEMPLATES).filter((key) => collectionOf(key) === collection);
  const templateKey = keys.includes(requested) ? requested : (keys[0] ?? DEFAULT_TEMPLATE);
  const language = LANGUAGES.some((l) => l.code === params.get("lang")) ? params.get("lang") : "EN";
  const ageParam = params.get("age");
  const age = ageParam === "none" ? null : Number(ageParam) || TEMPLATES[templateKey].sampleAge || null;

  const choose = (changes) =>
    setParams((p) => {
      for (const [key, value] of Object.entries(changes)) {
        if (value === null) p.delete(key);
        else p.set(key, value);
      }
      return p;
    });

  const Template = getTemplate(templateKey).component;

  return (
    <>
      <nav className="preview-bar" aria-label="Template preview options">
        <div className="preview-group" role="group" aria-label="Occasion">
          {COLLECTIONS.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={c === collection}
              onClick={() => choose({ collection: c, template: null, age: null })}
            >
              {COLLECTION_LABELS[c]}
            </button>
          ))}
        </div>
        <div className="preview-group" role="group" aria-label="Template">
          {keys.map((key) => (
            <button
              key={key}
              type="button"
              aria-pressed={key === templateKey}
              title={TEMPLATES[key].description}
              onClick={() => choose({ template: key, age: null })}
            >
              {TEMPLATES[key].name}
            </button>
          ))}
        </div>
        <div className="preview-group" role="group" aria-label="Language">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              type="button"
              lang={l.htmlLang}
              aria-pressed={l.code === language}
              onClick={() => choose({ lang: l.code })}
            >
              {l.label}
            </button>
          ))}
        </div>
        {collection === "birthday" && (
          <label className="preview-age">
            Age
            <select value={age ?? "none"} onChange={(e) => choose({ age: e.target.value })}>
              {AGES.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
              <option value="none">No age</option>
            </select>
          </label>
        )}
      </nav>

      <main>
        <Suspense fallback={<p className="page center muted">Loading…</p>}>
          <Template
            key={`${templateKey}-${language}-${age}`}
            invitation={sampleInvitation(language, templateKey, age)}
            t={getT(language)}
            preview
          />
        </Suspense>
      </main>
    </>
  );
}
