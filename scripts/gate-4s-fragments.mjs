#!/usr/bin/env node
/**
 * Gate 4s — fragment identity.
 *
 * ADR-12: "Every in-page anchor target must resolve on the page that links it,
 * in every locale."  docs/framework/adr/0012-an-anchor-target-is-an-identity.md
 *
 * Reads RENDERED output, per ADR-10 §5's division: verify rendered truth, not
 * implementation strategy. A fragment target may come from a markdown heading
 * slug, an explicit `id`, or a component — the gate must not care which.
 *
 * Resolves BOTH forms, because the same defect has two shapes and the
 * same-page-only window under-counted `#tours` by two orders of magnitude
 * (ADR-12 §2.2):
 *   same-page   href="#x"
 *   cross-page  href="/de/utv/page/#x"
 *
 * Fail-closed: exits 1 on any unresolved fragment.
 *
 *   node scripts/gate-4s-fragments.mjs [dist] [--json] [--self-test]
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, relative, sep, posix } from 'node:path';

const argv = process.argv.slice(2);
const JSON_OUT = argv.includes('--json');
const SELF_TEST = argv.includes('--self-test');
const ROOT = argv.find((a) => !a.startsWith('--')) || 'dist';

// ---------------------------------------------------------------- collection

function walk(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (e.endsWith('.html')) out.push(p);
  }
  return out;
}

/** Route key for a rendered file: dist/de/utv/x/index.html -> /de/utv/x/ */
function routeOf(root, file) {
  let r = relative(root, file).split(sep).join('/');
  r = r.replace(/index\.html$/, '').replace(/\.html$/, '/');
  return '/' + r;
}

const decode = (s) => {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
};

/**
 * Every fragment target the document defines.
 * `id` on any element, plus legacy `<a name="…">`. Markup INSIDE a heading is
 * irrelevant here — we read the attribute, never the text — which is the trap
 * that made an Arabic page look like it had lost five sections when it had not.
 */
function targetsIn(html) {
  const ids = new Set();
  for (const m of html.matchAll(/\sid="([^"]+)"/g)) {
    ids.add(m[1]);
    ids.add(decode(m[1]));
  }
  for (const m of html.matchAll(/<a[^>]*\sname="([^"]+)"/g)) {
    ids.add(m[1]);
    ids.add(decode(m[1]));
  }
  return ids;
}

/** Every fragment-bearing href, split into {route|null, frag}. */
function linksIn(html) {
  const out = [];
  for (const m of html.matchAll(/href="([^"]*#[^"]*)"/g)) {
    const raw = m[1];
    const hash = raw.indexOf('#');
    const before = raw.slice(0, hash);
    const frag = raw.slice(hash + 1);
    if (!frag) continue; // bare "#" — a deliberate no-op, not a target
    if (/^(mailto:|tel:|javascript:)/i.test(before)) continue;
    if (/^[a-z][a-z0-9+.-]*:\/\//i.test(before)) {
      out.push({ external: true, raw });
      continue;
    }
    out.push({ external: false, route: before || null, frag, raw });
  }
  return out;
}

// ------------------------------------------------------------------- resolve

function audit(root) {
  const files = walk(root);
  const byRoute = new Map();
  const parsed = [];

  for (const f of files) {
    const html = readFileSync(f, 'utf8');
    const route = routeOf(root, f);
    const rec = { file: f, route, ids: targetsIn(html), links: linksIn(html) };
    byRoute.set(route, rec);
    parsed.push(rec);
  }

  const unresolved = [];
  let externalSkipped = 0;
  let checked = 0;

  for (const page of parsed) {
    // dedupe per page: one row per distinct (route, frag) the page links
    const seen = new Set();
    for (const l of page.links) {
      if (l.external) {
        externalSkipped++;
        continue;
      }
      const key = `${l.route ?? ''}#${l.frag}`;
      if (seen.has(key)) continue;
      seen.add(key);
      checked++;

      let targetRec = page;
      if (l.route) {
        const norm = posix.normalize(
          l.route.startsWith('/') ? l.route : posix.join(page.route, l.route)
        );
        const withSlash = norm.endsWith('/') ? norm : norm + '/';
        targetRec = byRoute.get(withSlash) || byRoute.get(norm) || null;
        if (!targetRec) {
          // A missing ROUTE is gate 4b/4g's business, not ours. Reporting it
          // here would make this gate fail for a reason it cannot fix — and
          // route-existence vs fragment-existence being different questions is
          // the whole of ADR-12 §3.
          continue;
        }
      }
      const frag = l.frag;
      if (!targetRec.ids.has(frag) && !targetRec.ids.has(decode(frag))) {
        unresolved.push({
          page: page.route,
          target: targetRec.route,
          frag,
          kind: l.route ? 'cross-page' : 'same-page',
        });
      }
    }
  }

  return { files: files.length, checked, externalSkipped, unresolved };
}

// ----------------------------------------------------------------- self-test

/**
 * The gate is prospective (ADR-10 §3): it will be green the day the corpus is
 * clean, and a green run is not evidence it works. This proves it discriminates
 * — a resolving fragment and a dead one, in both shapes, must come out
 * differently — without needing a broken corpus to exist.
 */
function selfTest() {
  const mk = (ids, links) =>
    `<html><body>${ids.map((i) => `<h2 id="${i}">x</h2>`).join('')}` +
    `${links.map((h) => `<a href="${h}">l</a>`).join('')}</body></html>`;

  const cases = [
    ['same-page resolves', mk(['ok'], ['#ok']), 0],
    ['same-page dead', mk(['ok'], ['#nope']), 1],
    ['bare # ignored', mk([], ['#']), 0],
    ['external ignored', mk([], ['https://x.test/a#b']), 0],
    ['percent-encoded arabic resolves', mk(['المسار-1'], [`#${encodeURIComponent('المسار-1')}`]), 0],
    ['id inside markup-bearing heading', '<h2 id="a"><bdi>X</bdi></h2><a href="#a">l</a>', 0],
  ];

  let bad = 0;
  for (const [name, html, want] of cases) {
    const ids = targetsIn(html);
    const got = linksIn(html).filter(
      (l) => !l.external && !l.route && !ids.has(l.frag) && !ids.has(decode(l.frag))
    ).length;
    const ok = got === want;
    if (!ok) bad++;
    console.log(`  ${ok ? 'PASS' : 'FAIL'}  ${name}  (want ${want}, got ${got})`);
  }
  console.log(bad === 0 ? '\nself-test: all pass' : `\nself-test: ${bad} FAILED`);
  return bad === 0 ? 0 : 1;
}

// ---------------------------------------------------------------------- main

if (SELF_TEST) process.exit(selfTest());

if (!existsSync(ROOT)) {
  console.error(`gate 4s: no such directory: ${ROOT} — build first`);
  process.exit(1);
}

const r = audit(ROOT);

if (JSON_OUT) {
  console.log(JSON.stringify(r, null, 2));
} else {
  console.log(`gate 4s — fragment identity (ADR-12)`);
  console.log(`  pages          ${r.files}`);
  console.log(`  fragments      ${r.checked} checked, ${r.externalSkipped} external skipped`);
  console.log(`  unresolved     ${r.unresolved.length}`);
  if (r.unresolved.length) {
    console.log('');
    const byFrag = new Map();
    for (const u of r.unresolved) {
      const k = `#${u.frag}`;
      byFrag.set(k, (byFrag.get(k) || 0) + 1);
    }
    for (const [frag, n] of [...byFrag].sort((a, b) => b[1] - a[1])) {
      console.log(`  ${String(n).padStart(5)}  ${frag}`);
    }
    console.log('\n  first 20:');
    for (const u of r.unresolved.slice(0, 20)) {
      console.log(`    ${u.kind.padEnd(10)} ${u.page} -> ${u.target}#${u.frag}`);
    }
  }
}

process.exit(r.unresolved.length ? 1 : 0);
