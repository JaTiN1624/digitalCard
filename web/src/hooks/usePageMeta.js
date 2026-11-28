import { useEffect } from "react";
import { SITE_URL, pageMeta } from "../seo/site.js";

function setTag(selector, create, attr, value) {
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = create();
    document.head.appendChild(tag);
  }
  tag.setAttribute(attr, value);
}

const meta = (key, name) => () => {
  const tag = document.createElement("meta");
  tag.setAttribute(key, name);
  return tag;
};

// Keeps title, description, canonical and share tags in step with client-side navigation.
// Prerendered pages already ship these in their HTML (scripts/prerender.mjs).
// Pass a path from seo/site.js, or explicit { title, description, path, robots }.
export function usePageMeta(pathOrMeta) {
  const info = typeof pathOrMeta === "string" ? { ...pageMeta(pathOrMeta), path: pathOrMeta } : pathOrMeta;
  const { title, description, path, robots, image } = info ?? {};

  useEffect(() => {
    if (!title) return;
    document.title = title;
    if (description) {
      setTag('meta[name="description"]', meta("name", "description"), "content", description);
      setTag('meta[property="og:description"]', meta("property", "og:description"), "content", description);
    }
    setTag('meta[property="og:title"]', meta("property", "og:title"), "content", title);
    if (path) {
      setTag('link[rel="canonical"]', () => Object.assign(document.createElement("link"), { rel: "canonical" }), "href", `${SITE_URL}${path}`);
      setTag('meta[property="og:url"]', meta("property", "og:url"), "content", `${SITE_URL}${path}`);
    }
    if (image) setTag('meta[property="og:image"]', meta("property", "og:image"), "content", `${SITE_URL}${image}`);
    setTag('meta[name="robots"]', meta("name", "robots"), "content", robots ?? "index, follow");
  }, [title, description, path, robots, image]);
}
