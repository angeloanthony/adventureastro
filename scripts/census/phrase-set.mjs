// scripts/census/phrase-set.mjs — F5 Phase 5: derive a phrase-count request list.
//
// THIS IS AN OPERATOR TOOL, NOT A PRODUCER. It writes nothing the framework reads as a
// fact. It answers one question — "which phrases does this host want counted?" — and
// prints the answer as the argument file `phrase-count.mjs --phrases` expects.
//
// WHY IT IS A SEPARATE PROGRAM, AND WHY THAT IS NOT A LOOPHOLE.
// F5 Phase 4 withdrew the policy -> census edge that the Phase 3 contract had drawn: the
// producer does not read policy, and the second host proved why — `forebearfindastro` has
// no `i18n-gates/` at all and its phrases are still perfectly countable. That withdrawal
// says the PRODUCER must not read policy. It does not say an operator may not; deciding
// what to measure is exactly an operator's job, and doing it by hand is how a list of 51
// rows drifts from the 51 locks it was transcribed from.
//
// So the edge here is  policy -> operator tool -> (file) -> producer,  and the producer
// end of it is unchanged: it receives a list and has no idea where the list came from.
// A host with no gate policy simply does not run this program. That is the test, and it
// is the same test Phase 4 used: if this file's existence made the producer unusable on
// host 2, the edge would have crept back in.
//
// WHY THE OUTPUT IS COMMITTED. The census records its own `invocation`, and an invocation
// naming a path that exists only on the machine that ran it is not reproducible (Phase 4
// amendment 3). The generated list therefore lives at `census/phrase-set.json`, beside the
// census it produced, host-relative and reviewable as a diff.
//
//   node scripts/census/phrase-set.mjs > census/phrase-set.json
//
// WHAT IT KNOWS THAT NOTHING ELSE SHOULD. The shape of two gate configs: a 4i lock keys
// its phrase as `phrase`, a 4h lock keys its as `core`. That is the one piece of policy
// vocabulary in this file, it is deliberately not in the producer, and the union of the
// two is where D-1 becomes visible — `zh` `官方渠道核实` is declared by both gates and
// collapses here into a single request, which is the entire point of the phase.
import { resolveHost } from '../lib/host-adapter.mjs';

const die = (msg) => { console.error(`census phrase-set: ${msg}`); process.exit(2); };

const KNOWN = ['--manifest'];
const argv = process.argv.slice(2);
const args = {};
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (!KNOWN.includes(a)) die(`unknown argument "${a}" — expected one of ${KNOWN.join(', ')}`);
  const v = argv[++i];
  if (v === undefined || v.startsWith('--')) die(`${a} needs a value`);
  args[a] = v;
}

let host;
try {
  host = resolveHost({ manifestPath: args['--manifest'] });
} catch (e) {
  die(e.message);
}

// Each source names a gate and the key its locks carry the countable phrase under.
const SOURCES = [
  { gate: 'glossary', field: 'phrase' },
  { gate: 'seams', field: 'core' },
];

const seen = new Map(); // "locale phrase" -> {locale, phrase, sources[]}

for (const { gate, field } of SOURCES) {
  let config;
  try {
    config = host.policy.load(gate);
  } catch (e) {
    // A host that declares no policy for a gate has nothing to contribute, which is not
    // an error: this program collects requests, it does not audit coverage.
    if (e.kind === 'undeclared') continue;
    die(`policy ${e.message}`);
  }
  for (const loc of host.targets) {
    for (const lock of config.locales?.[loc]?.locks ?? []) {
      const phrase = lock[field];
      if (typeof phrase !== 'string' || !phrase) continue;
      const id = `${loc} ${phrase}`;
      const row = seen.get(id) ?? { locale: loc, phrase, sources: [] };
      if (!row.sources.includes(gate)) row.sources.push(gate);
      seen.set(id, row);
    }
  }
}

if (!seen.size) die('no locked phrases found in host policy — nothing to request');

// Code-unit order, matching the census's own ordering rule, so the request file and the
// census it produces read in the same sequence.
const cmp = (a, b) => (a < b ? -1 : a > b ? 1 : 0);
const rows = [...seen.values()].sort((a, b) => cmp(a.locale, b.locale) || cmp(a.phrase, b.phrase));

// `sources` is dropped: the producer's argument schema is closed, and a request carrying
// provenance would invite the producer to act on it. Which gate asked is an operator's
// note and is reported to the operator, on stderr, where it cannot reach a fact.
const shared = rows.filter((r) => r.sources.length > 1);
console.error(
  `census phrase-set: ${rows.length} request(s) across ${new Set(rows.map((r) => r.locale)).size} locale(s)` +
    (shared.length ? `; ${shared.length} requested by more than one gate: ${shared.map((r) => `${r.locale} "${r.phrase}"`).join(', ')}` : '')
);

process.stdout.write(`${JSON.stringify(rows.map(({ locale, phrase }) => ({ locale, phrase })), null, 2)}\n`);
