// Task 2-4: measure Script=X vs Script_Extensions=X for the gate's RTL_LETTER scripts,
// then intersect with the characters actually present in the Arabic corpus.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const SCRIPTS = ['Arabic', 'Hebrew', 'Syriac', 'Thaana', 'Nko', 'Samaritan', 'Mandaic'];

// The gate's own classifier, copied verbatim so the measurement describes the shipped rule.
const RTL_LETTER = /[\p{Script=Arabic}\p{Script=Hebrew}\p{Script=Syriac}\p{Script=Thaana}\p{Script=Nko}\p{Script=Samaritan}\p{Script=Mandaic}]/u;
const LETTER = /\p{L}/u;
const DIGIT = /\p{Nd}/u;
const gateClass = (ch) => (RTL_LETTER.test(ch) ? 'R' : DIGIT.test(ch) ? 'digit' : LETTER.test(ch) ? 'L' : 'neutral');

const seRe = new RegExp(`[${SCRIPTS.map((s) => `\\p{Script_Extensions=${s}}`).join('')}]`, 'u');

// --- 1. Full-Unicode difference set: SE in {RTL scripts} but Script not in {RTL scripts}.
const diff = [];
for (let cp = 0; cp <= 0x10ffff; cp++) {
  if (cp >= 0xd800 && cp <= 0xdfff) continue;
  const ch = String.fromCodePoint(cp);
  if (seRe.test(ch) && !RTL_LETTER.test(ch)) diff.push(cp);
}
const hex = (cp) => 'U+' + cp.toString(16).toUpperCase().padStart(4, '0');
console.log(`=== 1. Codepoints with Script_Extensions in the gate's RTL set but Script outside it ===`);
console.log(`total: ${diff.length}`);
const byGate = {};
for (const cp of diff) (byGate[gateClass(String.fromCodePoint(cp))] ??= []).push(cp);
for (const [k, v] of Object.entries(byGate)) console.log(`  gate currently calls ${v.length} of them "${k}"`);

// --- 2. Which of those actually occur in the Arabic corpus (source AND rendered)?
const files = [];
const walk = (dir) => {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.ar.mdx')) files.push(p);
  }
};
walk('C:/Users/deluc/Documents/adventureastro/src/content');
const rendered = [];
const walkDist = (dir) => {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walkDist(p);
    else if (p.endsWith('.html')) rendered.push(p);
  }
};
try { walkDist('C:/Users/deluc/Documents/adventureastro/dist/ar'); } catch {}

const present = new Map(); // cp -> {src, dist}
const scan = (text, key) => {
  for (const ch of text) {
    const cp = ch.codePointAt(0);
    if (!diffSet.has(cp)) continue;
    const rec = present.get(cp) ?? { src: 0, dist: 0 };
    rec[key]++;
    present.set(cp, rec);
  }
};
const diffSet = new Set(diff);
for (const f of files) scan(readFileSync(f, 'utf8'), 'src');
for (const f of rendered) scan(readFileSync(f, 'utf8'), 'dist');

console.log(`\n=== 2. Of those, which occur in the ar corpus (${files.length} sources, ${rendered.length} rendered pages)? ===`);
if (!present.size) console.log('  none');
for (const [cp, rec] of [...present].sort((a, b) => b[1].src - a[1].src)) {
  const ch = String.fromCodePoint(cp);
  const scripts = SCRIPTS.filter((s) => new RegExp(`\\p{Script_Extensions=${s}}`, 'u').test(ch));
  console.log(
    `  ${hex(cp)}  ${JSON.stringify(ch).padEnd(8)} gate="${gateClass(ch)}"  src=${String(rec.src).padStart(4)}  rendered=${String(rec.dist).padStart(5)}  SE=${scripts.join(',')}`
  );
}

// --- 3. The inverse risk: what would a naive Script_Extensions swap NEWLY call strong R?
console.log(`\n=== 3. Inverse risk — chars a naive Script_Extensions swap would newly call strong R ===`);
console.log(`(these are currently "neutral" to the gate; making them strong changes flank resolution)`);
for (const [cp, rec] of [...present].sort((a, b) => b[1].src - a[1].src)) {
  const ch = String.fromCodePoint(cp);
  if (gateClass(ch) === 'neutral') {
    console.log(`  ${hex(cp)} ${JSON.stringify(ch)}  src=${rec.src} rendered=${rec.dist}  <-- would flip neutral -> R`);
  }
}

// --- 4. Categorise the whole difference set: which are STRONG in Unicode terms?
console.log(`\n=== 4. The full ${diff.length}-codepoint difference set, by general category ===`);
const cat = (ch) =>
  /\p{L}/u.test(ch) ? 'L  letter' :
  /\p{Cf}/u.test(ch) ? 'Cf format' :
  /\p{Mn}/u.test(ch) ? 'Mn mark  ' :
  /\p{Nd}/u.test(ch) ? 'Nd digit ' :
  /\p{P}/u.test(ch) ? 'P  punct ' :
  /\p{S}/u.test(ch) ? 'S  symbol' : '?  other ';
const groups = {};
for (const cp of diff) (groups[cat(String.fromCodePoint(cp))] ??= []).push(cp);
for (const [k, v] of Object.entries(groups)) {
  console.log(`  ${k}  ${String(v.length).padStart(2)}   ${v.map(hex).join(' ')}`);
}
console.log(`\n  Only "L letter" and "Cf format" can carry a STRONG bidi class here.`);
for (const cp of [...(groups['L  letter'] ?? []), ...(groups['Cf format'] ?? [])]) {
  const ch = String.fromCodePoint(cp);
  const rec = present.get(cp);
  console.log(`    ${hex(cp)} ${JSON.stringify(ch)}  gate="${gateClass(ch)}"  corpus: ${rec ? `src=${rec.src} rendered=${rec.dist}` : 'ABSENT (0)'}`);
}
