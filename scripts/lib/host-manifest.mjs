// scripts/lib/host-manifest.mjs — F4 Phase 1: load and validate the host manifest.
//
// This module reads `host-manifest.json` and proves it well-formed. It does NOT read
// host source, and it does not resolve anything the manifest points at — that is the
// adapter's job (host-adapter.mjs). Splitting them keeps one failure legible from the
// other: a malformed manifest and a manifest that describes the host incorrectly are
// different defects with different fixes.
//
// WHY VALIDATION IS HAND-ROLLED. `host-manifest.schema.json` is the published contract
// and gives editors completion and inline docs, but running it would mean adding a JSON
// Schema validator to a repository whose only runtime dependencies are astro, mdx and
// sitemap. F4 Phase 1's contract is "no behavioral changes"; adding a dependency is a
// behavioral change to the build. The checks below implement the same v1 contract
// directly. If the schema and this file ever disagree, the schema is the specification
// and this file is the bug.
//
// UNKNOWN KEYS ARE REJECTED, NOT IGNORED. F2 measurement M-4 found `4h.nonBoundaries`
// read by nothing — a key that looks like configuration and silently does nothing. A
// typo'd key here would reproduce that defect in the contract layer itself, so every
// object is closed and `$doc` is allowed explicitly wherever prose is useful.
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');

export const MANIFEST_FILENAME = 'host-manifest.json';
export const SUPPORTED_MANIFEST_VERSION = 1;

/**
 * A manifest defect. Carries a fully rendered, gate-agnostic message.
 *
 * Callers relay `.message`; they never inspect it and never receive a path, a node or
 * any other artifact they could use to re-derive host shape themselves. Exit codes are
 * the caller's decision, not this module's — a gate that exits 1 and a gate that exits 2
 * are both correct, and neither belongs here.
 */
export class HostManifestError extends Error {
  constructor(message) {
    super(message);
    this.name = 'HostManifestError';
  }
}

const isPlainObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
const isNonEmptyString = (v) => typeof v === 'string' && v.length > 0;

/** `$doc` is prose: a string or an array of strings, allowed anywhere it is declared. */
function checkDoc(value, where) {
  const ok = isNonEmptyString(value) || (Array.isArray(value) && value.every((s) => typeof s === 'string'));
  if (!ok) throw new HostManifestError(`${where}.$doc must be a string or an array of strings`);
}

/**
 * Reject any key not in `allowed`. This is the M-4 guard; see the header.
 * `$doc` is never in `allowed` — it is handled separately so prose is always permitted.
 */
function closeObject(obj, allowed, where) {
  for (const key of Object.keys(obj)) {
    if (key === '$doc' || key === '$schema') continue;
    if (!allowed.includes(key)) {
      throw new HostManifestError(
        `${where} has unknown key "${key}" — manifest keys are rejected, not ignored, so a typo cannot silently do nothing`
      );
    }
  }
  if ('$doc' in obj) checkDoc(obj.$doc, where);
}

function requireObject(value, where) {
  if (!isPlainObject(value)) throw new HostManifestError(`${where} must be an object`);
  return value;
}

function requireString(value, where) {
  if (!isNonEmptyString(value)) throw new HostManifestError(`${where} must be a non-empty string`);
  return value;
}

const LOCALE_CODE_RE = /^[a-z]{2}(-[A-Za-z0-9]+)*$/;
const ROLES = ['reference', 'target'];
const SCRIPTS = ['latin', 'han', 'japanese'];
const STATES = ['planned', 'in-progress', 'complete'];

// The census kinds schema v1 declares. Duplicated from census-output.schema.json in the
// same sense `SCRIPTS` is duplicated from the gate configs: this module validates the
// manifest and must not import a producer. The two lists are checked against each other
// by the phase bootstrap rather than trusted.
const CENSUS_KINDS = ['phrase-count', 'marker-lexicon'];

function validateLocaleEntry(entry, code) {
  const where = `locales.entries["${code}"]`;
  requireObject(entry, where);
  closeObject(entry, ['role', 'script', 'state'], where);

  const oneOf = (key, allowed) => {
    if (key in entry && !allowed.includes(entry[key])) {
      throw new HostManifestError(`${where}.${key} must be one of ${allowed.join(', ')} — got "${entry[key]}"`);
    }
  };
  oneOf('role', ROLES);
  // The fine script vocabulary subsumes 4h's coarse `cjk`, which schema v1 retires.
  oneOf('script', SCRIPTS);
  oneOf('state', STATES);
}

function validateLocales(locales) {
  requireObject(locales, 'locales');
  closeObject(locales, ['registry', 'defaultBinding', 'entries'], 'locales');

  const registry = requireObject(locales.registry, 'locales.registry');
  closeObject(registry, ['module', 'binding', 'codeField'], 'locales.registry');
  requireString(registry.module, 'locales.registry.module');
  // `binding` names WHAT THE HOST CALLS its registry, not how to find it. Switching the
  // adapter from regex to AST does not change the name — that is why it passes the
  // declarative discriminator while a `parser` field does not.
  requireString(registry.binding, 'locales.registry.binding');
  requireString(registry.codeField, 'locales.registry.codeField');

  requireString(locales.defaultBinding, 'locales.defaultBinding');

  const entries = requireObject(locales.entries, 'locales.entries');
  const codes = Object.keys(entries).filter((k) => k !== '$doc' && k !== '$schema');
  if ('$doc' in entries) checkDoc(entries.$doc, 'locales.entries');
  if (codes.length === 0) throw new HostManifestError('locales.entries must declare at least one locale');

  for (const code of codes) {
    if (!LOCALE_CODE_RE.test(code)) {
      throw new HostManifestError(`locales.entries has key "${code}", which is not a locale code`);
    }
    validateLocaleEntry(entries[code], code);
  }
  return codes;
}

/**
 * Sections 3-6 of schema v1. Defined in the schema so the contract is complete and
 * additive changes stay additive; absent from the instance until a consumer reads them.
 * Validated only for shape here — the phase that migrates each coupling adds the
 * cross-check against real host source, exactly as `locales` has one today.
 */
function validateOptionalSections(manifest) {
  if ('routes' in manifest) {
    const routes = requireObject(manifest.routes, 'routes');
    closeObject(routes, ['output', 'pageGlob', 'localePrefix', 'defaultLocalePrefixed', 'entryPoint', 'exempt'], 'routes');
    // Required as of F5 Phase 5, which is the first phase to read this section. The four
    // are required together because a routes section that says where output lives but not
    // how locales appear in a route describes half a routing policy, and the half it omits
    // is the half three consumers currently hardcode.
    requireString(routes.output, 'routes.output');
    requireString(routes.pageGlob, 'routes.pageGlob');
    if (routes.localePrefix !== 'path-segment') {
      throw new HostManifestError(`routes.localePrefix must be "path-segment" — got ${JSON.stringify(routes.localePrefix)}`);
    }
    if (typeof routes.defaultLocalePrefixed !== 'boolean') {
      throw new HostManifestError('routes.defaultLocalePrefixed must be a boolean');
    }
  }
  if ('dictionaries' in manifest) {
    const dicts = requireObject(manifest.dictionaries, 'dictionaries');
    for (const [name, d] of Object.entries(dicts)) {
      if (name === '$doc') continue;
      const where = `dictionaries.${name}`;
      requireObject(d, where);
      closeObject(d, ['module', 'registry', 'canonicalKeys', 'requiredFields', 'completeness'], where);
    }
  }
  if ('policy' in manifest) {
    const policy = requireObject(manifest.policy, 'policy');
    closeObject(policy, ['dir', 'gates'], 'policy');
  }
  if ('structures' in manifest) {
    const structures = requireObject(manifest.structures, 'structures');
    for (const [name, s] of Object.entries(structures)) {
      if (name === '$doc') continue;
      const where = `structures.${name}`;
      requireObject(s, where);
      closeObject(s, ['module', 'binding'], where);
    }
  }
  if ('census' in manifest) {
    const census = requireObject(manifest.census, 'census');
    closeObject(census, ['dir', 'facts'], 'census');
    requireString(census.dir, 'census.dir');
    const facts = requireObject(census.facts, 'census.facts');
    // Closed against the kinds census v1 declares. A filename filed under an unknown kind
    // announces a readable artifact that nothing can read — M-4 with a filename attached.
    closeObject(facts, CENSUS_KINDS, 'census.facts');
    const kinds = Object.keys(facts).filter((k) => k !== '$doc' && k !== '$schema');
    if (kinds.length === 0) throw new HostManifestError('census.facts must declare at least one kind');
    for (const kind of kinds) requireString(facts[kind], `census.facts["${kind}"]`);
  }
}

/**
 * Validate a parsed manifest object. Returns it frozen.
 * Throws HostManifestError on any defect; never exits the process.
 */
export function validateManifest(manifest, label = MANIFEST_FILENAME) {
  requireObject(manifest, label);
  closeObject(manifest, ['manifestVersion', 'project', 'locales', 'routes', 'dictionaries', 'policy', 'structures', 'census'], label);

  // Refused forward AND backward: an engine that guesses at an unknown version is an
  // engine that silently applies the wrong contract.
  if (manifest.manifestVersion !== SUPPORTED_MANIFEST_VERSION) {
    throw new HostManifestError(
      `${label} declares manifestVersion ${JSON.stringify(manifest.manifestVersion)}, but this framework understands only version ${SUPPORTED_MANIFEST_VERSION}`
    );
  }

  const project = requireObject(manifest.project, 'project');
  closeObject(project, ['name', 'root'], 'project');
  requireString(project.name, 'project.name');
  requireString(project.root, 'project.root');

  validateLocales(manifest.locales);
  validateOptionalSections(manifest);

  return Object.freeze(manifest);
}

/**
 * Read and validate the manifest. `manifestPath` overrides the default location so the
 * manifest can be exercised against a scratch instance without touching the repository —
 * the same affordance gates 4g and 4i already expose through `--i18n`.
 *
 * Returns `{ manifest, manifestDir, label }`. `manifestDir` is load-bearing: every host
 * artifact resolves relative to THE MANIFEST'S OWN LOCATION, never to the framework's.
 * Before F5 Phase 2 the adapter joined declared paths onto the framework root, so a
 * manifest loaded from another repository still addressed adventureastro. That is the
 * same silent wrong-answer failure as C-3, one layer up, and it is why the caller is
 * given the directory rather than left to assume one.
 */
export function loadManifest({ manifestPath } = {}) {
  const file = manifestPath ? resolve(manifestPath) : join(root, MANIFEST_FILENAME);
  const label = relative(root, file).replace(/\\/g, '/') || MANIFEST_FILENAME;

  if (!existsSync(file)) {
    throw new HostManifestError(`host manifest not found at ${label}`);
  }

  let raw;
  try {
    raw = JSON.parse(readFileSync(file, 'utf8'));
  } catch (e) {
    throw new HostManifestError(`${label} is not valid JSON — ${e.message}`);
  }

  return { manifest: validateManifest(raw, label), manifestDir: dirname(file), label };
}

export const __testing = { root, CENSUS_KINDS };
