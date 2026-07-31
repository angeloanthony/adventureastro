// scripts/test-4n-differential.mjs — the proof burden gate 4n cannot carry itself.
//
// WHY THIS EXISTS, AND WHY A GREEN GATE IS NOT A SUBSTITUTE.
// ADR-10 §7: it is not enough to show gate 4n passes today's corpora, because THE REJECTED
// RULE ALSO PASSES THEM. adventureastro's same-flank population is zero — all four of its
// mirrored-character nodes span a direction change — so the accepted rule and the coarse
// rule both return 0 findings here, and no measurement this repository owns can tell them
// apart. `npm run gate:4n` being green is compatible with either algorithm being installed.
//
// So the two rules are run over a corpus that CONTAINS correct-flank cases, and required to
// DISAGREE. That converts "the gate works" from an assertion about output into a
// demonstration that the implemented rule is the specified one and not the plausible
// alternative a later simplification would reach for.
//
// TWO KINDS OF EVIDENCE, AND THE SECOND IS OPTIONAL BY DESIGN.
//   1. `tests/fixtures/rtl-isolation/` — authored, committed, always runs. The corpus this
//      host does not contain, in miniature.
//   2. parkingwayastro's rendered Arabic tree — the real 75-node population the ADR was
//      measured against. Read-only, and SKIPPED when absent: a test that fails because a
//      sibling repository is not checked out is a test about the operator's disk, and the
//      framework's own rule is that a foreign corpus is proof, never a dependency.
//
// EXIT CODES. 1 on any failed expectation. 0 with a summary otherwise.
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { classifyPage, RULES } from './lib/bidi-isolation.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const FIXTURES = join(ROOT, 'tests', 'fixtures', 'rtl-isolation');

/**
 * THE FAIL-CLOSED MATRIX.
 *
 * `accepted` is what gate 4n must report; `coarse` is what the rejected rule reports on the
 * same bytes. Every row where the two differ is a row that would have been lost if the gate
 * had shipped the simpler rule — and the `correct-*` rows are the ~70% false-positive class
 * measured on ParkingWay, reproduced small enough to read.
 *
 * `isolatedNodes` is asserted separately from findings because 0 findings and 0 mirrored
 * characters print identically. A fixture that stopped containing its own hazard would
 * otherwise pass forever.
 */
const CASES = [
  {
    file: 'correct-arabic-parentheses.html',
    base: 'rtl',
    accepted: 0,
    coarse: 4,
    isolatedNodes: 0,
    why: 'ADR-10 §7 REQUIRES this case. Arabic parentheses around Arabic content: N1 resolves the neutral to the surrounding strong type and it renders correctly today. The rejected rule flags all four.',
  },
  {
    file: 'correct-latin-address.html',
    base: 'rtl',
    accepted: 0,
    coarse: 2,
    isolatedNodes: 0,
    why: 'An all-Latin address inside an RTL document. Brackets between two L runs — correct as written, and isolating them would render it worse.',
  },
  {
    file: 'correct-isolated-phone.html',
    base: 'rtl',
    accepted: 0,
    coarse: 0,
    isolatedNodes: 1,
    why: 'B-2\'s fix. Isolation exempts under BOTH rules, so this row proves the fixture corpus is not simply biased toward the accepted rule.',
  },
  {
    file: 'correct-structural-isolation.html',
    base: 'rtl',
    accepted: 0,
    coarse: 0,
    isolatedNodes: 1,
    why: 'ADR-10 §5: isolation is detected STRUCTURALLY. Here it arrives from `dir` on an ordinary span, not from <bdi> — the gate must not care which mechanism produced it.',
  },
  {
    file: 'defect-latin-in-arabic.html',
    base: 'rtl',
    accepted: 2,
    coarse: 2,
    isolatedNodes: 0,
    why: 'The real defect, 22 of which ship on ParkingWay. Both rules agree here — which is why agreement on defects is not evidence of anything.',
  },
  {
    file: 'defect-bare-phone.html',
    base: 'rtl',
    accepted: 1,
    coarse: 2,
    isolatedNodes: 0,
    why: 'The `404.astro` bypass shape. The opening bracket stands between Arabic and a digit run; the closing one has digits on both sides and is correct, which the coarse rule cannot see.',
  },
  {
    file: 'defect-digit-flank.html',
    base: 'rtl',
    accepted: 2,
    coarse: 2,
    isolatedNodes: 0,
    why: 'Pins the digits-are-a-flank decision explicitly. Rule I2 raises EN and AN to an even level in an RTL paragraph, so a digit run is an LTR island and a bracket beside one stands at a real direction change. Transparent digits would make this 0 — and would also make adventureastro\'s four ADR-recorded nodes zero.',
  },
  {
    file: 'defect-block-boundary.html',
    base: 'rtl',
    accepted: 1,
    coarse: 2,
    isolatedNodes: 0,
    why: 'The same address as the correct row, with `Italia` moved into a sibling block. A block boundary is a paragraph boundary, so the scan stops there and takes the base direction — the run really is unflanked now, and really does render differently.',
  },
  {
    file: 'correct-tatweel-flank.html',
    base: 'rtl',
    accepted: 0,
    coarse: 6,
    isolatedNodes: 0,
    why: 'REGRESSION — AR-2 batch 2a. ARABIC TATWEEL U+0640 on a mirrored character\'s flank. Its Script is Common and only its Script_Extensions is Arabic, so `\\p{Script=Arabic}` missed it and the classifier called a kashida strong LEFT-TO-RIGHT; `فـ«…»` reported L…R and blocked a build on false positives. Measured on this fixture: the pre-fix classifier reports 3, the corrected one 0. The wider fix — swapping Script for Script_Extensions — was measured and rejected: it would have made `،` `؛` `؟` and seven diacritics strong R across 12 837 rendered occurrences and SUPPRESSED real findings, so the correction is one codepoint, not one property.',
  },
  {
    file: 'scope-ltr-document.html',
    base: 'ltr',
    accepted: 1,
    coarse: 4,
    isolatedNodes: 0,
    why: 'OUT OF SCOPE for the gate, and the most valuable row here. ADR-10 §5 restricts the invariant to RTL documents; this is what the engine reports if that restriction is dropped — a finding on ordinary English prose (`call (435) 219-9447`), which is 619 pages of this corpus.',
  },
];

const failures = [];
const check = (label, actual, expected, why) => {
  if (actual === expected) return true;
  failures.push(`${label}\n    expected ${expected}, got ${actual}\n    ${why}`);
  return false;
};

const findingsOf = (html, base, rule) =>
  classifyPage(html, { baseDirection: base, rule })
    .filter((n) => !n.isolated)
    .reduce((a, n) => a + n.findings.length, 0);

const isolatedOf = (html, base) =>
  classifyPage(html, { baseDirection: base, rule: RULES.flanking }).filter((n) => n.isolated).length;

// --- 1. The fail-closed matrix. --------------------------------------------------------
const declared = new Set(CASES.map((c) => c.file));
const present = readdirSync(FIXTURES).filter((f) => f.endsWith('.html'));
for (const f of present) {
  if (!declared.has(f)) {
    failures.push(`fixture ${f} has no row in CASES — an unasserted fixture is a file, not evidence`);
  }
}

for (const c of CASES) {
  const path = join(FIXTURES, c.file);
  if (!existsSync(path)) { failures.push(`fixture missing: ${c.file}`); continue; }
  const html = readFileSync(path, 'utf8');
  check(`${c.file} [accepted]`, findingsOf(html, c.base, RULES.flanking), c.accepted, c.why);
  check(`${c.file} [rejected]`, findingsOf(html, c.base, RULES.coarse), c.coarse, c.why);
  check(`${c.file} [isolated nodes]`, isolatedOf(html, c.base), c.isolatedNodes, c.why);
}

// --- 2. The differential property. -----------------------------------------------------
//
// Stated as its own assertion rather than left implicit in the table, because THIS is the
// requirement ADR-10 §7 adds. Both totals could drift to equality through nine individually
// plausible edits; one line here refuses that.
const totals = { accepted: 0, coarse: 0 };
const disagreements = [];
for (const c of CASES) {
  const html = readFileSync(join(FIXTURES, c.file), 'utf8');
  const a = findingsOf(html, c.base, RULES.flanking);
  const r = findingsOf(html, c.base, RULES.coarse);
  totals.accepted += a;
  totals.coarse += r;
  if (a !== r) disagreements.push(c.file);
}
if (totals.accepted >= totals.coarse) {
  failures.push(
    `the two rules do not disagree on this corpus (accepted ${totals.accepted}, rejected ${totals.coarse})\n` +
      '    The corpus has stopped distinguishing the implemented rule from the rejected one,\n' +
      '    which is the only thing it exists to do. Either the rule changed or the fixtures did.'
  );
}
// The false-positive class specifically: correct content the rejected rule condemns.
const falsePositives = CASES.filter((c) => c.file.startsWith('correct-') && c.coarse > c.accepted);
if (falsePositives.length < 2) {
  failures.push(
    `only ${falsePositives.length} correct-flank fixture(s) are flagged by the rejected rule — ADR-10 §7 requires the discriminating clause to be exercised, and a corpus with fewer than two such cases cannot exercise it`
  );
}

// --- 3. Cross-host dry run, when the corpus is on disk. --------------------------------
const PARKINGWAY = join(ROOT, '..', 'parkingwayastro', 'dist', 'client', 'ar');
let crossHost = null;
if (existsSync(PARKINGWAY)) {
  const walk = (d) => readdirSync(d, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(d, e.name)) : e.name.endsWith('.html') ? [join(d, e.name)] : []);
  const files = walk(PARKINGWAY);
  let accepted = 0, coarse = 0, nodes = 0;
  for (const f of files) {
    const html = readFileSync(f, 'utf8');
    const classified = classifyPage(html, { baseDirection: 'rtl', rule: RULES.flanking });
    nodes += classified.length;
    accepted += classified.filter((n) => !n.isolated).filter((n) => n.findings.length).length;
    coarse += classifyPage(html, { baseDirection: 'rtl', rule: RULES.coarse })
      .filter((n) => !n.isolated).filter((n) => n.findings.length).length;
  }
  crossHost = { pages: files.length, nodes, accepted, coarse };
  // The node total is the ADR's own figure and is the one number that must hold: it says the
  // corpus and the tokenizer still agree about what a mirrored-character text node is.
  check('parkingwayastro mirrored-character text nodes', nodes, 75,
    'ADR-10 §2 measured 75. A different number means the tokenizer changed or the foreign corpus was rebuilt — investigate before trusting any other figure here.');
  if (accepted >= coarse) {
    failures.push(`cross-host: the rules agree on parkingwayastro (accepted ${accepted}, rejected ${coarse}) — this is the corpus where they must not`);
  }
}

// --- Report. ---------------------------------------------------------------------------
if (failures.length) {
  console.error(`\ntest-4n: ${failures.length} failed expectation(s)\n`);
  for (const f of failures) console.error(`  ✘ ${f}\n`);
  process.exit(1);
}

console.log(`test-4n: ✔ ${CASES.length} fixtures — the accepted rule and the rejected rule disagree on ${disagreements.length} of them`);
console.log(`         totals over the fixture corpus: ADR-10 rule ${totals.accepted} findings, rejected rule ${totals.coarse}`);
console.log(`         ${falsePositives.length} correct-flank fixture(s) the rejected rule would have blocked: ${falsePositives.map((c) => c.file).join(', ')}`);
if (crossHost) {
  console.log(`         cross-host parkingwayastro: ${crossHost.pages} pages, ${crossHost.nodes} mirrored-character nodes — ADR-10 rule blocks ${crossHost.accepted}, rejected rule blocks ${crossHost.coarse}`);
} else {
  console.log('         cross-host dry run SKIPPED — parkingwayastro/dist/client/ar not on disk (proof, never a dependency)');
}
