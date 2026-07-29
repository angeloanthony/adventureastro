// scripts/gate-4n-isolation.mjs — Gate 4n: bidi isolation integrity (AR-2 Track A).
//
// Origin: AR-2 B-2 built the shared bidi formatter (`src/lib/bidi.ts`) and nothing enforces
// it. `404.astro` already bypasses it — it hand-rolls the nav and emits the phone number
// outside the formatter — and ParkingWay ships 22 broken mirrored runs across its Arabic
// tree with no isolation anywhere. That is what an unenforced convention looks like at scale.
//
// INVARIANT (ADR-10). In a document whose declared direction is RTL, no rendered text node
// may contain a mirrored character whose flanking strong types differ, outside an isolated
// run.
//
// THE LOAD-BEARING CLAUSE IS "WHOSE FLANKING STRONG TYPES DIFFER", AND IT IS WHY THIS GATE
// IS USABLE. The obvious rule — "no mirrored character outside `<bdi>`" — was measured and
// rejected: on ParkingWay it flags 53 correct runs out of 75, roughly 70% false positives,
// because an all-Latin address `…Fiumicino (RM), Italia` and Arabic parentheses around
// Arabic content are ordinary correct content. A blocking gate at that signal-to-noise ratio
// gets a suppression list, then an exemption config, then `--no-verify`. The discriminator
// is UAX #9 N1/N2, derived from the algorithm rather than fitted to the corpus.
//
// THIS GATE IS PROSPECTIVE, AND THAT CHANGES WHAT ITS GREEN RUN MEANS. Gate 4k was
// retrospective: it validated 620 existing pages the day it landed. This one guards ONE
// Arabic route, and B-2 fixed the defects before it existed, so it ships green and stays
// green until someone regresses. A green run is therefore NOT evidence that it works — the
// fail-closed matrix and the differential test in `scripts/test-4n-differential.mjs` carry
// that burden. Run `npm run test:4n` after changing anything here.
//
// WHAT THIS GATE IS NOT. It does not read CSS, mirrored layout, arrow glyphs, numbering
// systems or carousel geometry (B-5..B-7, B-10). It does not cover edge neutrals — B-2
// measured ZERO across both corpora, and a rule for a class with no measured instance is
// config nothing reads. It does not cover `<title>`, which accepts no elements, so markup
// isolation is impossible there and reporting it would name a defect the enforced mechanism
// cannot fix. A page this gate passes may still be visually broken.
//
// EXIT CODES. 2 for anything structural — unresolvable host, undeclared direction, no
// dist/. 1 for isolation findings. 0 with a one-line summary otherwise. Same split as 4k.
import { existsSync } from 'node:fs';
import { resolveHost } from './lib/host-adapter.mjs';
import { createRenderIndex } from './lib/render-index.mjs';
import { classifyPage, RULES } from './lib/bidi-isolation.mjs';

const argv = process.argv.slice(2);
const KNOWN = ['--manifest', '--i18n'];
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a.startsWith('--')) {
    if (!KNOWN.includes(a)) {
      console.error(`gate-4n: unknown option ${a} — known options are ${KNOWN.join(', ')}`);
      process.exit(2);
    }
    i++;
  }
}
const flag = (name) => {
  const i = argv.indexOf(name);
  return i >= 0 ? argv[i + 1] : undefined;
};

let host;
try {
  host = resolveHost({ manifestPath: flag('--manifest'), registryModule: flag('--i18n') });
} catch (e) {
  console.error(`gate-4n: ${e.message}`);
  process.exit(2);
}

let dist, pages, localeOf;
try {
  dist = host.routes.output;
  pages = host.routes.pages;
  localeOf = host.routes.localeOf;
} catch (e) {
  console.error(`gate-4n: rendered output ${e.message} — refusing to pass silently.`);
  process.exit(2);
}

// Which locales read right-to-left is owned by the host registry and reached through the
// adapter (ADR-9, and ADR-10 §6 names this gate as an instance of it). A gate carrying its
// own list of RTL locales — or, worse, testing for Arabic script — would be the
// manifest-duplication defect wearing a gate's name, and would be wrong the day a second
// RTL locale registered.
let DECLARED;
try {
  DECLARED = host.direction.map;
} catch (e) {
  console.error(`gate-4n: locale direction ${e.message} — refusing to pass silently.`);
  process.exit(2);
}

if (!existsSync(dist)) {
  console.error('gate-4n: dist/ not found — this gate reads rendered output; run astro build first.');
  process.exit(2);
}

// --- Run. ----------------------------------------------------------------------------
//
// The base direction fed to the classifier is the DECLARED one, not the `dir` attribute
// found on the page. Those two agreeing is precisely gate 4k's invariant, and 4k runs ahead
// of this gate in `gates:dist` for the same reason validate-site runs ahead of the content
// gates: if a page's effective direction contradicts its declaration, every isolation
// finding on it describes a document that was mis-assembled. Reading the attribute here
// instead would make this gate silently agree with a page that lies.
const index = createRenderIndex(dist, { pages });

const findings = [];
let scanned = 0;
let isolatedNodes = 0;
let mirroredNodes = 0;
const rtlLocales = Object.keys(DECLARED).filter((c) => DECLARED[c] === 'rtl');

for (const page of index.pages) {
  const loc = localeOf(page.key);
  if (loc === null || !(loc in DECLARED)) continue;
  if (DECLARED[loc] !== 'rtl') continue; // ADR-10 §5: only RTL documents are in scope
  scanned++;

  for (const node of page.derive('bidiNodes', (html) => classifyPage(html, { baseDirection: 'rtl', rule: RULES.flanking }))) {
    mirroredNodes++;
    if (node.isolated) { isolatedNodes++; continue; }  // "outside an isolated run"
    for (const f of node.findings) findings.push({ loc, url: page.url, ...f, tag: node.tag });
  }
}

// --- Report. -------------------------------------------------------------------------
if (findings.length) {
  const byUrl = new Map();
  for (const f of findings) {
    if (!byUrl.has(f.url)) byUrl.set(f.url, []);
    byUrl.get(f.url).push(f);
  }
  console.error(`\ngate-4n: ${findings.length} unisolated mirrored character(s) at a direction change, on ${byUrl.size} page(s)\n`);
  for (const [url, list] of byUrl) {
    console.error(`Route:     ${url}   (${list[0].loc}, declared rtl)`);
    for (const f of list.slice(0, 5)) {
      console.error(`  ${JSON.stringify(f.char)} in <${f.tag}>  flanked ${f.left} … ${f.right}`);
      console.error(`      ${f.context}`);
    }
    if (list.length > 5) console.error(`      … (${list.length - 5} more on this page)`);
    console.error('');
  }
  console.error(
    'Each of these renders a reversed bracket, or moves the run it encloses, because the\n' +
      'neutral resolves to the paragraph direction rather than to its content (UAX #9 N2).\n' +
      'Fix by asking `src/lib/bidi.ts` for the run — phoneDisplay, currencyDisplay, brandRun —\n' +
      'never by inserting <bdi> or a control character at the call site, which is the\n' +
      'convention this gate exists to keep enforceable.\n'
  );
  process.exit(1);
}

// --- Success. ------------------------------------------------------------------------
//
// The isolated-node count is printed on success for the reason 4j prints its exemption set
// and 4k prints its per-locale shape: "0 findings" and "no mirrored characters anywhere"
// print identically otherwise, and only one of them means isolation is working. If this
// number falls to zero while Arabic routes still exist, the formatter has been removed and
// this gate would report success for the wrong reason.
if (!rtlLocales.length) {
  console.log('gate-4n: ✔ no rtl locale registered — the invariant is scoped to rtl documents, so there is nothing to check');
  process.exit(0);
}
console.log(
  `gate-4n: ✔ ${scanned} rtl page(s) across ${rtlLocales.length} locale(s) (${rtlLocales.map((c) => `"${c}"`).join(', ')}) — ` +
    `no unisolated mirrored character at a direction change`
);
console.log(`         ${mirroredNodes} text node(s) carry a mirrored character; ${isolatedNodes} of them are isolated`);
