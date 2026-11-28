// Build step: renders every public page (seo/site.js PAGES) to static HTML so search engines and
// link previews (WhatsApp, Facebook) see real content and metadata without running JavaScript.
// Also writes sitemap.xml and robots.txt, and keeps an empty app shell (app.html) that Vercel
// serves for everything else (invitations /i/…, previews, filtered collections).
//
// Runs after `vite build` and `vite build --ssr src/entry-server.jsx --outDir dist-ssr`.
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");

const escape = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const { render, PAGES, SITE_URL } = await import(pathToFileURL(path.join(ssrDir, "entry-server.js")).href);
const template = await fs.readFile(path.join(dist, "index.html"), "utf8");

// The untouched shell for client-rendered routes
await fs.writeFile(path.join(dist, "app.html"), template);

function headFor(route, meta) {
  const url = `${SITE_URL}${route === "/" ? "/" : route}`;
  const image = `${SITE_URL}${meta.image ?? "/og/home.jpg"}`;
  return [
    `<title>${escape(meta.title)}</title>`,
    `<meta name="description" content="${escape(meta.description)}" />`,
    `<meta name="robots" content="index, follow" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escape(meta.title.split("|").pop().trim())}" />`,
    `<meta property="og:title" content="${escape(meta.title)}" />`,
    `<meta property="og:description" content="${escape(meta.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:locale" content="en_IN" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ].join("\n    ");
}

const base = template.replace(/<title>[\s\S]*?<\/title>/, "").replace(/<meta name="description"[^>]*>\s*/, "");

for (const [route, meta] of Object.entries(PAGES)) {
  const body = await render(route);
  const html = base
    .replace("</head>", `    ${headFor(route, meta)}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root" data-prerendered="${route}">${body}</div>`);
  const file = route === "/" ? path.join(dist, "index.html") : path.join(dist, `${route.slice(1)}.html`);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, html);
  console.log(`prerendered ${route.padEnd(40)} ${(html.length / 1024).toFixed(1)} KB`);
}

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Object.entries(PAGES)
  .map(([route, meta]) => `  <url><loc>${SITE_URL}${route}</loc><lastmod>${today}</lastmod><priority>${meta.priority ?? 0.5}</priority></url>`)
  .join("\n")}
</urlset>
`;
await fs.writeFile(path.join(dist, "sitemap.xml"), sitemap);

// Personal invitations (/i/…) are private and stay out of search results
await fs.writeFile(path.join(dist, "robots.txt"), `User-agent: *\nAllow: /\nDisallow: /i/\nDisallow: /api/\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

await fs.rm(ssrDir, { recursive: true, force: true });
console.log(`sitemap.xml (${Object.keys(PAGES).length} pages) and robots.txt written`);
