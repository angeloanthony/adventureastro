// scripts/perf/page-weight.mjs — V-1 phase V-0 item 5: the laboratory baseline.
//
// WHAT IT PRODUCES. Deterministic, reproducible measurements of rendered pages: bytes that
// are actually in the file, elements that are actually in the DOM, and resource references
// the browser would actually fetch. Same build in, same numbers out.
//
// WHY IT IS NOT A CENSUS FACT — and the argument for promoting it later.
// It passes the census admission test in `census-output.schema.json`: `page-weight` names
// no gate, and its value is recomputable from the corpus alone. What stops it here is
// ownership, not fitness — `kind` is an enum in a schema the F-series owns, an active
// parallel workstream is editing that contract, and a V-1 need is a poor reason to widen
// someone else's contract mid-flight. Recorded so a future F-phase can promote it
// deliberately rather than rediscover the question.
//
// WHAT IT CANNOT MEASURE, STATED PLAINLY. Transfer size of anything the page merely
// *references*. A YouTube player is somewhere between several hundred KB and a few MB and
// none of that is in `dist/`; nor is the size of a font, an image, or a stylesheet after
// compression. So this baseline counts REQUESTS for third-party resources and BYTES only
// for what the HTML itself carries. Every metric here is one the repository can prove.
// Field numbers — LCP, CLS, INP, Lighthouse — are the other half and are collected by hand
// against a deployed site; see docs/perf/V1-video-facade.md §6.2.
//
// 0 = produced · 2 = could not run. It has no opinion about the corpus, so there is no 1.
import { writeFileSync } from 'node:fs';
import { existsSync } from 'node:fs';
import { resolveHost } from '../lib/host-adapter.mjs';
import { createRenderIndex } from '../lib/render-index.mjs';

const argv = process.argv.slice(2);
const KNOWN = ['--manifest', '--i18n', '--out', '--measured-at'];
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a.startsWith('--')) {
    if (!KNOWN.includes(a)) {
      console.error(`page-weight: unknown option ${a} — known options are ${KNOWN.join(', ')}`);
      process.exit(2);
    }
    i++;
  }
}
const flag = (n) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : undefined; };

const measuredAt = flag('--measured-at');
if (!measuredAt) {
  // Taken as an argument rather than read from the clock: a baseline is a claim about a
  // moment, and the operator is the one who knows which moment they are recording.
  console.error('page-weight: --measured-at is required (YYYY-MM-DD) — a baseline without a date is not a baseline.');
  process.exit(2);
}

let host, dist, pages, localeOf;
try {
  host = resolveHost({ manifestPath: flag('--manifest'), registryModule: flag('--i18n') });
  dist = host.routes.output;
  pages = host.routes.pages;
  localeOf = host.routes.localeOf;
} catch (e) {
  console.error(`page-weight: ${e.message}`);
  process.exit(2);
}
if (!existsSync(dist)) {
  console.error('page-weight: dist/ not found — run astro build first.');
  process.exit(2);
}

// --- Extraction. -----------------------------------------------------------------------
//
// Attribute scans, not a DOM parse, for the same reason gate 4k scans the root tag: the
// question is what the document *says*, and a tolerant parser answers a slightly different
// one. Every pattern below is a resource the browser fetches without user interaction.
const RESOURCE = [
  /<img\b[^>]*?\ssrc\s*=\s*"([^"]+)"/gi,
  /<script\b[^>]*?\ssrc\s*=\s*"([^"]+)"/gi,
  /<iframe\b[^>]*?\ssrc\s*=\s*"([^"]+)"/gi,
  /<source\b[^>]*?\ssrc\s*=\s*"([^"]+)"/gi,
  /<video\b[^>]*?\sposter\s*=\s*"([^"]+)"/gi,
  /<link\b[^>]*?\srel\s*=\s*"(?:stylesheet|preload)"[^>]*?\shref\s*=\s*"([^"]+)"/gi,
  /<link\b[^>]*?\shref\s*=\s*"([^"]+)"[^>]*?\srel\s*=\s*"(?:stylesheet|preload)"/gi,
];
const YT_EMBED = /youtube(?:-nocookie)?\.com\/embed\/([A-Za-z0-9_-]{11})/gi;
const YT_THUMB = /(?:i\.ytimg|img\.youtube)\.com\/vi\/([A-Za-z0-9_-]{11})\//gi;
const INLINE_SCRIPT = /<script\b(?![^>]*\ssrc\s*=)[^>]*>([\s\S]*?)<\/script>/gi;
const INLINE_STYLE = /<style\b[^>]*>([\s\S]*?)<\/style>/gi;
const ELEMENT = /<[a-zA-Z][^\s/>]*/g;

const bytes = (s) => Buffer.byteLength(s, 'utf8');
const sum = (re, html) => [...html.matchAll(re)].reduce((a, m) => a + bytes(m[1]), 0);
const count = (re, html) => [...html.matchAll(re)].length;

const ORIGIN = 'https://adventuretoursvernal.test/'; // resolution base only; never emitted

const weigh = (html) => {
  const hosts = new Set();
  let total = 0, third = 0;
  for (const re of RESOURCE) {
    for (const m of html.matchAll(re)) {
      total++;
      let u;
      try { u = new URL(m[1], ORIGIN); } catch { continue }
      if (u.protocol === 'data:') { total--; continue; }   // inlined, not fetched
      if (u.host !== new URL(ORIGIN).host) { third++; hosts.add(u.host); }
    }
  }
  return {
    htmlBytes: bytes(html),
    domElements: count(ELEMENT, html),
    inlineScriptBytes: sum(INLINE_SCRIPT, html),
    inlineStyleBytes: sum(INLINE_STYLE, html),
    requests: { total, sameOrigin: total - third, thirdParty: third },
    thirdPartyHosts: [...hosts].sort(),
    youtube: {
      // Every player the page boots WITHOUT interaction. This is the number the facade
      // migration is meant to drive toward zero, and the one to read first in any diff.
      playerBootstraps: count(YT_EMBED, html),
      thumbnails: count(YT_THUMB, html),
      distinctVideos: new Set([...html.matchAll(YT_EMBED)].map((m) => m[1])
        .concat([...html.matchAll(YT_THUMB)].map((m) => m[1]))).size,
    },
  };
};

// --- Run. ------------------------------------------------------------------------------
//
// The four route families that carry video, in the reference locale and in one target
// locale. `zh` specifically: its `/utv/` is where the media drift was found, so a divergence
// between the two columns is a signal worth being able to see at a glance.
const FOCUS = ['index.html', 'about/index.html', 'utv/index.html', 'guides/moab-utv-tours/index.html'];
const FOCUS_LOCALES = ['en', 'zh'];

const index = createRenderIndex(dist, { pages });
const byKey = new Map(index.pages.map((p) => [p.key, p]));

const perPage = {};
for (const fam of FOCUS) {
  for (const loc of FOCUS_LOCALES) {
    const key = loc === 'en' ? fam : `${loc}/${fam}`;
    const page = byKey.get(key);
    if (!page) { perPage[key] = null; continue; }   // absence recorded, never omitted
    perPage[key] = weigh(page.html);
  }
}

// Site aggregate over every rendered page, so the baseline also answers "did this change
// anything outside the four families?" — which a focus-page-only baseline cannot.
const site = { pages: 0, htmlBytes: 0, domElements: 0, inlineScriptBytes: 0, requests: 0, thirdPartyRequests: 0, youtubePlayerBootstraps: 0, pagesWithVideo: 0 };
const siteHosts = new Set();
const perLocale = {};
for (const page of index.pages) {
  const w = weigh(page.html);
  site.pages++;
  site.htmlBytes += w.htmlBytes;
  site.domElements += w.domElements;
  site.inlineScriptBytes += w.inlineScriptBytes;
  site.requests += w.requests.total;
  site.thirdPartyRequests += w.requests.thirdParty;
  site.youtubePlayerBootstraps += w.youtube.playerBootstraps;
  if (w.youtube.playerBootstraps || w.youtube.thumbnails) site.pagesWithVideo++;
  for (const h of w.thirdPartyHosts) siteHosts.add(h);
  const loc = (() => { try { return localeOf(page.key) ?? '—' } catch { return '—' } })();
  const acc = perLocale[loc] ?? (perLocale[loc] = { pages: 0, youtubePlayerBootstraps: 0 });
  acc.pages++;
  acc.youtubePlayerBootstraps += w.youtube.playerBootstraps;
}
site.thirdPartyHosts = [...siteHosts].sort();

const doc = {
  $doc: [
    'V-1 phase V-0 item 5 — the LABORATORY baseline. Machine-written; do not hand-edit.',
    'Regenerate with: node scripts/perf/page-weight.mjs --measured-at YYYY-MM-DD --out <path>',
    '',
    'Deterministic and reproducible: same build in, same numbers out. It measures what the',
    'repository can prove — bytes in the file, elements in the DOM, requests the page issues',
    'without interaction. It CANNOT measure transfer size of referenced resources: a YouTube',
    'player is several hundred KB to a few MB and none of it lives in dist/.',
    '',
    'The FIELD baseline — LCP, CLS, INP, Lighthouse, PSI — is the other half, is collected',
    'by hand against a deployed site, and is recorded in docs/perf/V1-video-facade.md §6.2.',
    'Neither substitutes for the other: this one is the regression target, that one is',
    'contextual evidence.',
    '',
    'READ FIRST in any post-migration diff: youtube.playerBootstraps. That is the count of',
    'players booted with no user interaction, and driving it toward zero is the point of V-1.',
  ],
  measuredAt,
  focusPages: perPage,
  site,
  perLocale,
};

const out = JSON.stringify(doc, null, 2) + '\n';
const target = flag('--out');
if (target) {
  writeFileSync(target, out, 'utf8');
  console.error(
    `page-weight: ${site.pages} pages · ${site.youtubePlayerBootstraps} player bootstraps · ` +
      `${site.thirdPartyRequests} third-party requests · ${site.thirdPartyHosts.length} hosts -> ${target}`
  );
} else {
  process.stdout.write(out);
}
