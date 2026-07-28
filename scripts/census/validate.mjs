// scripts/census/validate.mjs — check a census file against the census contract.
//
// The producer self-validates before writing, so this is not how output is proven correct
// on the way out. It is how a COMMITTED census is proven correct later: after a hand edit
// that should never have happened, after a merge, after an engine upgrade. A census file
// is data with a schema, and data with a schema that nothing can re-check is data with a
// schema in name only.
//
// Exit 0 = valid. Exit 2 = invalid, or unreadable. There is no exit 1: this tool has no
// opinion about the corpus, only about the file.
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { validateCensusOutput } from './emit.mjs';

const file = process.argv[2];
if (!file) {
  console.error('census validate: usage — node scripts/census/validate.mjs <census-file.json>');
  process.exit(2);
}

let doc;
try {
  doc = JSON.parse(readFileSync(resolve(file), 'utf8'));
} catch (e) {
  console.error(`census validate: ${file} could not be read — ${e.message}`);
  process.exit(2);
}

const errors = validateCensusOutput(doc);
if (errors.length) {
  console.error(`census validate: ${file} does not satisfy the census contract — ${errors.length} problem(s):`);
  for (const e of errors) console.error(`  ${e}`);
  process.exit(2);
}

console.log(`census validate: ✔ ${file} — censusVersion ${doc.censusVersion}, ${doc.facts.length} fact(s), measured ${doc.provenance.measuredAt}`);
