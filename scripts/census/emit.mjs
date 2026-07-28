// scripts/census/emit.mjs — F5 Phase 4: the census output envelope.
//
// WHAT THIS IS. Determinism, ordering, and validation for census output. Every producer
// builds its facts and hands them here; nothing else decides what a census file looks
// like. `census-output.schema.json` is the published contract and this module implements
// it. If the two ever disagree, THE SCHEMA IS THE SPECIFICATION AND THIS FILE IS THE BUG
// — the same split, and the same reason, as host-manifest.schema.json against
// host-manifest.mjs: running a JSON Schema validator would mean adding a dependency to a
// repository whose only runtime dependencies are astro, mdx and sitemap.
//
// WHAT IT MUST NEVER KNOW. Gate names, locale semantics, policy. It sorts, hashes,
// checks shape and serialises. A change here that required naming a gate would be an F5
// finding, not a feature.
//
// DETERMINISM IS THE CONTRACT, NOT AN OPTIMISATION.
//   same corpus + same manifest + same census version  =>  byte-identical output
// It is what makes a regenerated census reviewable: diffing 51 counts (or 326 tokens)
// against the committed file is the only review method that scales. Three things
// enforce it and all three live here — code-unit ordering (never localeCompare, which is
// locale-sensitive), canonical key order on emit, and no wall-clock input anywhere.
import { createHash } from 'node:crypto';

export const CENSUS_VERSION = 1;

// The framework has no published version yet: F1 §6 was overturned on timing, so the
// packages live in-repo through F5. This string becomes the real package version at the
// repo split, and it is a constant rather than a package.json read precisely so that two
// hosts running the same engine emit the same provenance.
export const ENGINE = 'astro-localization-gates@0.0.0+inrepo';

export const SCHEMA_REF = 'astro-localization-gates/schemas/census-output.schema.json';

/** Code-unit comparison. Never `localeCompare` — it is locale-sensitive, so it would make
 *  the output depend on the machine that produced it, which is the one thing it must not. */
const cmp = (a, b) => (a < b ? -1 : a > b ? 1 : 0);

/** Stable stringify with sorted keys, for hashing. Formatting is not part of a contract. */
export function canonicalJson(value) {
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(',')}]`;
  const keys = Object.keys(value).sort(cmp);
  return `{${keys.map((k) => `${JSON.stringify(k)}:${canonicalJson(value[k])}`).join(',')}}`;
}

export const sha256 = (input) => `sha256:${createHash('sha256').update(input, 'utf8').digest('hex')}`;

/**
 * Sort key for a fact. Kind first, then the key's own fields in a fixed order per kind,
 * then anything else the key carries — so a kind added later still sorts deterministically
 * without this function being taught about it.
 */
const KEY_ORDER = {
  'phrase-count': ['locale', 'phrase', 'surface'],
  'marker-lexicon': ['locale', 'surface', 'polarity'],
};

function factSortKey(fact) {
  const fields = KEY_ORDER[fact.kind] ?? [];
  const named = fields.map((f) => String(fact.key?.[f] ?? ''));
  const rest = Object.keys(fact.key ?? {}).filter((k) => !fields.includes(k)).sort(cmp);
  return [fact.kind, ...named, ...rest.map((k) => `${k}=${fact.key[k]}`)].join('\u0000');
}

/**
 * Build the envelope. Facts are sorted here and nowhere else, and each fact's own
 * properties are rebuilt in canonical order — JSON.stringify preserves insertion order,
 * so property order is part of "byte-identical" whether or not anyone intended it to be.
 */
export function buildEnvelope({ provenance, facts }) {
  const ordered = [...facts].sort((a, b) => cmp(factSortKey(a), factSortKey(b)));
  return {
    $schema: SCHEMA_REF,
    censusVersion: CENSUS_VERSION,
    provenance: {
      measuredAt: provenance.measuredAt,
      manifest: provenance.manifest,
      corpus: {
        pages: sortedObject(provenance.corpus.pages),
        fingerprint: provenance.corpus.fingerprint,
      },
      engine: ENGINE,
      invocation: provenance.invocation,
    },
    facts: ordered.map((f) => ({
      kind: f.kind,
      key: orderedKey(f.kind, f.key),
      value: f.value,
      extractor: f.extractor,
      evidence: sortedObject(f.evidence),
    })),
  };
}

function sortedObject(obj) {
  const out = {};
  for (const k of Object.keys(obj).sort(cmp)) out[k] = obj[k];
  return out;
}

function orderedKey(kind, key) {
  const fields = KEY_ORDER[kind] ?? [];
  const out = {};
  for (const f of fields) if (f in key) out[f] = key[f];
  for (const k of Object.keys(key).sort(cmp)) if (!(k in out)) out[k] = key[k];
  return out;
}

export const serialize = (doc) => `${JSON.stringify(doc, null, 2)}\n`;

// ---------------------------------------------------------------------------
// Validation. Mirrors census-output.schema.json; unknown keys are rejected.
// Returns an array of problems — never throws, never exits. The caller decides.
// ---------------------------------------------------------------------------
const isObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
const isInt = (v) => Number.isInteger(v);

const LOCALE_RE = /^[a-z]{2}(-[A-Za-z0-9]+)*$/;
const SHA_RE = /^sha256:[0-9a-f]{64}$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const EXTRACTOR_RE = /^[a-zA-Z][a-zA-Z0-9]*@\d+$/;

const KINDS = {
  'phrase-count': {
    key: { locale: LOCALE_RE, phrase: 'string', surface: ['prose'] },
    value: 'nonNegativeInteger',
    evidence: ['pages', 'pagesWithPhrase'],
  },
  'marker-lexicon': {
    key: { locale: LOCALE_RE, surface: ['headings', 'anchors'], polarity: ['english-absent', 'target-present'] },
    value: 'stringArray',
    evidence: ['referenceTokens', 'occurrenceThreshold', 'localeTokens', 'pages'],
  },
};

function closed(obj, allowed, where, errors) {
  for (const k of Object.keys(obj)) {
    if (!allowed.includes(k)) errors.push(`${where} has unknown key "${k}" — keys are rejected, not ignored`);
  }
  for (const k of allowed) {
    if (!(k in obj)) errors.push(`${where} is missing "${k}"`);
  }
}

export function validateCensusOutput(doc) {
  const errors = [];
  if (!isObject(doc)) return ['census output must be an object'];

  for (const k of Object.keys(doc)) {
    if (!['$schema', 'censusVersion', 'provenance', 'facts'].includes(k)) {
      errors.push(`census output has unknown key "${k}" — keys are rejected, not ignored`);
    }
  }
  if (doc.censusVersion !== CENSUS_VERSION) {
    errors.push(`censusVersion is ${JSON.stringify(doc.censusVersion)}, but this engine understands only ${CENSUS_VERSION}`);
  }

  if (!isObject(doc.provenance)) {
    errors.push('provenance must be an object');
  } else {
    const p = doc.provenance;
    closed(p, ['measuredAt', 'manifest', 'corpus', 'engine', 'invocation'], 'provenance', errors);
    if (!DATE_RE.test(p.measuredAt ?? '')) errors.push('provenance.measuredAt must be YYYY-MM-DD');
    if (!SHA_RE.test(p.manifest ?? '')) errors.push('provenance.manifest must be a sha256: digest');
    if (typeof p.engine !== 'string' || !p.engine) errors.push('provenance.engine must be a non-empty string');
    if (typeof p.invocation !== 'string' || !p.invocation) errors.push('provenance.invocation must be a non-empty string');
    if (!isObject(p.corpus)) {
      errors.push('provenance.corpus must be an object');
    } else {
      closed(p.corpus, ['pages', 'fingerprint'], 'provenance.corpus', errors);
      if (!SHA_RE.test(p.corpus.fingerprint ?? '')) errors.push('provenance.corpus.fingerprint must be a sha256: digest');
      if (!isObject(p.corpus.pages)) {
        errors.push('provenance.corpus.pages must be an object');
      } else {
        for (const [loc, n] of Object.entries(p.corpus.pages)) {
          if (!LOCALE_RE.test(loc)) errors.push(`provenance.corpus.pages has key "${loc}", which is not a locale code`);
          if (!isInt(n) || n < 0) errors.push(`provenance.corpus.pages["${loc}"] must be a non-negative integer`);
        }
      }
    }
  }

  if (!Array.isArray(doc.facts)) {
    errors.push('facts must be an array');
    return errors;
  }

  const seen = new Set();
  doc.facts.forEach((f, i) => {
    const where = `facts[${i}]`;
    if (!isObject(f)) { errors.push(`${where} must be an object`); return; }
    closed(f, ['kind', 'key', 'value', 'extractor', 'evidence'], where, errors);

    const spec = KINDS[f.kind];
    if (!spec) { errors.push(`${where}.kind "${f.kind}" is not a declared kind`); return; }
    if (!EXTRACTOR_RE.test(f.extractor ?? '')) errors.push(`${where}.extractor must look like "name@1"`);

    if (!isObject(f.key)) {
      errors.push(`${where}.key must be an object`);
    } else {
      closed(f.key, Object.keys(spec.key), `${where}.key`, errors);
      for (const [field, rule] of Object.entries(spec.key)) {
        const v = f.key[field];
        if (v === undefined) continue;
        if (Array.isArray(rule)) {
          if (!rule.includes(v)) errors.push(`${where}.key.${field} must be one of ${rule.join(', ')} — got ${JSON.stringify(v)}`);
        } else if (rule === 'string') {
          if (typeof v !== 'string' || !v) errors.push(`${where}.key.${field} must be a non-empty string`);
        } else if (!rule.test(String(v))) {
          errors.push(`${where}.key.${field} is not valid — got ${JSON.stringify(v)}`);
        }
      }
      // A duplicated key is two answers to one question; the file would be unreadable
      // by any consumer that indexes by key, which is every consumer.
      const id = `${f.kind}\u0000${canonicalJson(f.key)}`;
      if (seen.has(id)) errors.push(`${where} duplicates an earlier key — a fact key must be unique`);
      seen.add(id);
    }

    if (spec.value === 'nonNegativeInteger' && (!isInt(f.value) || f.value < 0)) {
      errors.push(`${where}.value must be a non-negative integer`);
    }
    if (spec.value === 'stringArray' && (!Array.isArray(f.value) || f.value.some((s) => typeof s !== 'string' || !s))) {
      errors.push(`${where}.value must be an array of non-empty strings`);
    }

    if (!isObject(f.evidence)) {
      errors.push(`${where}.evidence must be an object`);
    } else {
      closed(f.evidence, spec.evidence, `${where}.evidence`, errors);
    }
  });

  // Ordering is part of the contract, so it is checked rather than assumed: a file that
  // validates but is not sorted would diff against a regenerated one for no reason.
  for (let i = 1; i < doc.facts.length; i++) {
    if (cmp(factSortKey(doc.facts[i - 1]), factSortKey(doc.facts[i])) > 0) {
      errors.push(`facts[${i}] is out of canonical order`);
      break;
    }
  }

  return errors;
}
