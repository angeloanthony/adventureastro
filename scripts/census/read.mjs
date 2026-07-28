// scripts/census/read.mjs — F5 Phase 5: the consumer side of the census contract.
//
// WHAT THIS IS. The only way a consumer is permitted to obtain a census fact. It
// validates a census document against the published contract, refuses one it cannot
// interpret, and answers lookups by key. Nothing else in the framework parses census
// output, and nothing that parses census output knows where the file came from — the
// adapter resolved that (manifest §8.1) and handed over a document.
//
// WHY A READER AND NOT A LOADER. `JSON.parse` plus a property access would have been
// three lines. It would also have given every consumer its own opinion about what a
// missing key means, what a version mismatch means, and whether a count produced by a
// different extractor is close enough — which is how one authored number becomes four
// authored numbers again. The three refusals below are the contract, so they live in one
// place and every consumer inherits them by construction:
//
//   1. A census version this engine does not know is not read.        (incompatible)
//   2. A fact produced by a different extractor is not returned.      (incompatible)
//   3. A key the census does not carry is not invented.               (absent)
//
// ON (3), AND WHY IT IS NOT A DEFAULT. F5 Phase 4's producer answers every key it was
// asked for, including with `value: 0` when the phrase occurs nowhere: zero is a
// measurement. So a key that is genuinely absent here was never measured, and the honest
// answer to "what is the count" is that nobody knows. Returning 0, or undefined, or the
// consumer's old authored constant, would each turn "unmeasured" into a number — which is
// precisely the failure the census exists to end. It throws, and the consumer exits 2.
//
// ON (2), AND WHY IT IS PER FACT AND NOT PER DOCUMENT. `extractor` is a per-fact field in
// the contract (§9), because a document may legitimately carry facts from more than one
// view — a marker lexicon derived from element text alongside a phrase count derived from
// page text. A document-level check would either reject that document or bless facts the
// consumer cannot read. What must never happen is a consumer INTERPRETING a number
// produced by a view it does not implement, and that is exactly a per-fact question.
import { validateCensusOutput, CENSUS_VERSION, canonicalJson } from './emit.mjs';

/**
 * A census document could not be interpreted.
 *
 * `.message` is fully rendered and consumer-agnostic, the same contract `diagnostics` and
 * `HostPolicyError` carry: a gate composes its own sentence around it and still never
 * holds the path the sentence mentions.
 *
 * @param {'invalid'|'incompatible'|'absent'} kind
 */
export class CensusReadError extends Error {
  constructor(message, kind) {
    super(message);
    this.name = 'CensusReadError';
    this.kind = kind;
  }
}

/** Key identity, for lookup and for error text. Must agree with emit.mjs's sort key. */
const idOf = (kind, key) => `${kind} ${canonicalJson(key)}`;

/**
 * Build a reader over one census document.
 *
 * @param {object}  o
 * @param {object}  o.doc        the parsed census document
 * @param {string}  o.kind       the kind the caller expects this file to carry
 * @param {string}  o.label      host-relative display name, for rendered messages
 * @param {string}  o.extractor  the extractor identity THIS CONSUMER implements. Required:
 *                               a consumer that will not name its view cannot be told that
 *                               the number it is about to use was produced by another one.
 */
export function createCensusReader({ doc, kind, label, extractor }) {
  if (!extractor) {
    throw new CensusReadError(
      `at ${label} was opened without an extractor identity — a consumer must declare the view it implements before it can be given a count`,
      'invalid'
    );
  }

  // Version first, and before schema validation. Both are exit 2, but they are different
  // failures with different remedies — "this engine is too old / too new" is not "this
  // file is broken" — and validating a v2 document against the v1 contract would report
  // the difference as a list of shape errors, which is a misleading way to say so.
  if (doc?.censusVersion !== CENSUS_VERSION) {
    throw new CensusReadError(
      `at ${label} declares censusVersion ${JSON.stringify(doc?.censusVersion)}, but this engine understands only ${CENSUS_VERSION}`,
      'incompatible'
    );
  }

  const errors = validateCensusOutput(doc);
  if (errors.length) {
    throw new CensusReadError(
      `at ${label} does not satisfy the census contract — ${errors.length} problem(s):\n` +
        errors.map((e) => `    ${e}`).join('\n'),
      'invalid'
    );
  }

  // The kind is checked because a manifest can file a census under the wrong entry, and a
  // phrase-count file read as a marker lexicon would simply find no keys — a silent empty
  // answer where a loud wrong-file answer belongs.
  const wrongKind = doc.facts.filter((f) => f.kind !== kind);
  if (wrongKind.length === doc.facts.length && doc.facts.length > 0) {
    throw new CensusReadError(
      `at ${label} carries no "${kind}" facts — the host manifest files it under census.facts["${kind}"], but every fact in it is "${doc.facts[0].kind}"`,
      'invalid'
    );
  }

  const byId = new Map();
  for (const f of doc.facts) byId.set(idOf(f.kind, f.key), f);

  /**
   * The fact recorded for a key, or a refusal. Never a default.
   *
   * @param {object} key  the full key object for the kind — every field, in any order:
   *                      `canonicalJson` sorts before comparing, so key identity is the
   *                      contract's identity and not this caller's property order.
   */
  const fact = (key) => {
    const f = byId.get(idOf(kind, key));
    if (!f) {
      throw new CensusReadError(
        `at ${label} carries no ${kind} fact for ${canonicalJson(key)} — the census measured what it was asked to measure, so an absent key was never measured. ` +
          `Add it to the phrase set and re-run the producer; do not author the number here.`,
        'absent'
      );
    }
    if (f.extractor !== extractor) {
      throw new CensusReadError(
        `at ${label} records ${canonicalJson(key)} as produced by extractor "${f.extractor}", but this consumer implements "${extractor}" — ` +
          `a count is only comparable with the view that produced it, so the number is not usable rather than approximately right`,
        'incompatible'
      );
    }
    return f;
  };

  /** The measured value for a key. The common case, and the only one gates need. */
  const value = (key) => fact(key).value;

  return Object.freeze({
    kind,
    label,
    extractor,
    value,
    fact,
    size: byId.size,
    provenance: Object.freeze({ ...doc.provenance, corpus: Object.freeze({ ...doc.provenance.corpus }) }),
  });
}
