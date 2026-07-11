// scripts/validate-site.mjs — post-build site validation (approved at the
// Phase 3 gate review). Runs after `astro build` and FAILS the build when
// the hub-and-spoke structure breaks. Checks:
//
//   1. Broken internal links: every href/src in dist/ resolves to a file.
//   2. Orphans: every page is reachable from index.html by following
//      links (nav, footer, hubs, body). 404.html is exempt.
//   3. Hub integrity (per hub slug in src/lib/hubs.ts — parsed from the
//      registry so there is no second hub list):
//        - a hub with spoke pages must have a pillar page
//        - every spoke page must render RelatedArticles and AuthorByline
//   4. (Phase 2.6) Sitewide <title> uniqueness — duplicate titles are a
//      cannibalization signal and an indexation waste.
//   5. (Phase 2.6) Sitewide meta-description uniqueness.
//   6. (Phase 2.6) Every JSON-LD block must parse as JSON.
//   7. (Phase 2.6) Every <img> must carry an alt attribute (empty alt is
//      allowed — it's the explicit decorative marker; a MISSING alt is
//      always an authoring mistake).
//   8. (Phase 2.6) Thin-content floor: spoke pages must carry at least
//      MIN_SPOKE_WORDS words of visible <main> text. This is a stub
//      catcher, not the editorial target (guide §4.2 wants 1,200–2,500).
//
// Frontmatter-level checks (missing author, missing tags, wrong hub,
// nonexistent/oversized heroImage, tag format, date order) are enforced
// earlier, by zod in content.config.ts.
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

if (!existsSync(dist)) {
  console.error('validate-site: dist/ not found — run astro build first.');
  process.exit(1);
}

// --- Hub slugs come from the registry file (single source of truth). ---
const hubsSource = readFileSync(join(root, 'src', 'lib', 'hubs.ts'), 'utf8');
const slugsMatch = hubsSource.match(/HUB_SLUGS\s*=\s*\[([^\]]*)\]/);
if (!slugsMatch) {
  console.error('validate-site: could not parse HUB_SLUGS from src/lib/hubs.ts');
  process.exit(1);
}
const HUB_SLUGS = [...slugsMatch[1].matchAll(/'([^']+)'/g)].map((m) => m[1]);

// --- Collect every built HTML page. ---
const htmlFiles = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full);
    else if (name.endsWith('.html')) htmlFiles.push(full);
  }
})(dist);

const toKey = (file) => relative(dist, file).split(sep).join('/');
const pages = new Map(htmlFiles.map((f) => [toKey(f), readFileSync(f, 'utf8')]));

const SKIP = /^(https?:\/\/|\/\/|mailto:|tel:|sms:|data:|javascript:|#)/i;

/** Resolve a link found on `pageKey` to a dist-relative key, or null if external/fragment. */
function resolveLink(pageKey, raw) {
  if (!raw || SKIP.test(raw)) return null;
  let path = raw.split('#')[0].split('?')[0];
  if (path === '') return null; // pure fragment/query
  try { path = decodeURIComponent(path); } catch { /* keep raw */ }
  const from = path.startsWith('/') ? dist : join(dist, dirname(pageKey));
  return relative(dist, resolve(from, path.replace(/^\//, ''))).split(sep).join('/');
}

/** Find the dist file a resolved key points at (handles '/', '.html', dir/index). */
function targetExists(key) {
  if (key === '' || key === '.') return 'index.html';
  for (const candidate of [key, `${key}/index.html`, `${key}.html`, key.replace(/\/$/, '') + '.html']) {
    const file = join(dist, candidate);
    if (existsSync(file) && statSync(file).isFile()) return candidate;
  }
  return null;
}

const errors = [];

// --- 1 + graph. Attribute extraction covers quoted href/src AND CSS
// url(...) values (inline background-images — found broken by the G2
// migration precisely because the old regex missed them). ---
const linkGraph = new Map(); // pageKey -> Set of html pageKeys
for (const [pageKey, html] of pages) {
  const targets = new Set();
  for (const m of html.matchAll(/(?:href|src)\s*=\s*"([^"]*)"|(?:href|src)\s*=\s*'([^']*)'|url\(\s*(?:"([^")]+)"|'([^')]+)'|([^"')\s]+))\s*\)/g)) {
    const raw = m[1] ?? m[2] ?? m[3] ?? m[4] ?? m[5];
    const key = resolveLink(pageKey, raw);
    if (key === null) continue;
    const found = targetExists(key);
    if (!found) {
      errors.push(`broken link: ${pageKey} → "${raw}"`);
    } else if (found.endsWith('.html')) {
      targets.add(found);
    }
  }
  linkGraph.set(pageKey, targets);
}

// --- 2. Reachability from index.html. ---
const reachable = new Set();
const queue = ['index.html'];
while (queue.length) {
  const key = queue.pop();
  if (reachable.has(key) || !linkGraph.has(key)) continue;
  reachable.add(key);
  queue.push(...linkGraph.get(key));
}
for (const pageKey of pages.keys()) {
  if (pageKey === '404.html' || reachable.has(pageKey)) continue;
  errors.push(`orphan page: ${pageKey} is not reachable from index.html via any link`);
}

// --- 4 + 5. Title / meta-description uniqueness. ---
const titleOf = (html) => html.match(/<title>([\s\S]*?)<\/title>/i)?.[1].trim();
const descOf = (html) =>
  html.match(/<meta\s+name="description"\s+content="([^"]*)"/i)?.[1].trim();
for (const [label, extract] of [['title', titleOf], ['meta description', descOf]]) {
  const seen = new Map(); // value -> first page
  for (const [pageKey, html] of pages) {
    if (pageKey === '404.html') continue;
    const value = extract(html);
    if (!value) continue; // absence is a Seo-component bug, caught elsewhere
    if (seen.has(value)) {
      errors.push(`duplicate ${label}: ${pageKey} and ${seen.get(value)} share "${value.slice(0, 60)}…"`);
    } else {
      seen.set(value, pageKey);
    }
  }
}

// --- 6. JSON-LD must parse. ---
for (const [pageKey, html] of pages) {
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(m[1]);
    } catch (e) {
      errors.push(`invalid JSON-LD on ${pageKey}: ${e.message}`);
    }
  }
}

// --- 7. Every <img> carries an alt attribute. ---
for (const [pageKey, html] of pages) {
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\balt\s*=/.test(m[0])) {
      errors.push(`img missing alt on ${pageKey}: ${m[0].slice(0, 80)}`);
    }
  }
}

// --- 8. Thin-content floor on spokes. ---
const MIN_SPOKE_WORDS = 600;
const mainWordCount = (html) => {
  const main = html.match(/<main[\s\S]*?<\/main>/i)?.[0] ?? '';
  const text = main
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ');
  return text.split(/\s+/).filter(Boolean).length;
};

// --- 3. Hub integrity. ---
// G2 migration grandfather lists — BURN DOWN IN PHASE 3:
//  - LEGACY_SPOKES: pre-collection .astro pages re-slotted to their final
//    hub URLs by the approved disposition map. They predate SpokeLayout,
//    so they're exempt from the byline/related/thin checks until each is
//    converted to collection content (remove its entry when converted).
//  - PILLAR_PENDING: hubs whose spokes moved in before the pillar is
//    written (guides pillar is Phase 3 hub #4).
const LEGACY_SPOKES = new Set([
  'utv/best-utv-trails-vernal/index.html',
  'utv/side-by-side-rentals-vernal-utah/index.html',
  'utv/group-utv-tours-vernal/index.html',
  'utv/backcountry-tours-vernal-utah/index.html',
  'things-to-do/vernal-utah-attractions/index.html',
  'things-to-do/fun-things-to-do-vernal-utah-kids/index.html',
  'things-to-do/best-restaurants-vernal-utah/index.html',
  'dinosaur-national-monument/petroglyphs-rock-art-vernal/index.html',
  'guides/what-to-bring/index.html',
  'guides/what-to-wear-utv-tour/index.html',
  'guides/vernal-weather-guide/index.html',
  'guides/moab-utv-tours/index.html',
]);
const PILLAR_PENDING = new Set(['guides']);
for (const hub of HUB_SLUGS) {
  const spokes = [...pages.keys()].filter((k) => k.startsWith(`${hub}/`) && k !== `${hub}/index.html`);
  if (spokes.length === 0) continue;
  if (!pages.has(`${hub}.html`) && !pages.has(`${hub}/index.html`) && !PILLAR_PENDING.has(hub)) {
    errors.push(`hub "${hub}" has ${spokes.length} spoke page(s) but no pillar page (/${hub}/)`);
  }
  for (const spoke of spokes) {
    if (LEGACY_SPOKES.has(spoke)) continue;
    const html = pages.get(spoke);
    if (!html.includes('related-articles')) errors.push(`spoke ${spoke} renders no RelatedArticles section`);
    if (!html.includes('author-byline')) errors.push(`spoke ${spoke} renders no AuthorByline`);
    const words = mainWordCount(html);
    if (words < MIN_SPOKE_WORDS) {
      errors.push(`thin content: ${spoke} has ${words} words in <main> (floor ${MIN_SPOKE_WORDS}; guide target 1,200–2,500)`);
    }
  }
}

if (errors.length) {
  console.error(`\nvalidate-site: ${errors.length} error(s)\n`);
  for (const e of errors) console.error(`  ✖ ${e}`);
  console.error('');
  process.exit(1);
}
console.log(`validate-site: ✔ ${pages.size} pages — links resolve, no orphans, hub structure intact.`);
