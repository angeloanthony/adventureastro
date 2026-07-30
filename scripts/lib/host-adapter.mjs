// scripts/lib/host-adapter.mjs — F4 Phase 1: the host adapter.
//
// THE ONLY COMPONENT PERMITTED TO UNDERSTAND HOST REPOSITORY SHAPE.
//
// Before this module, five gates each knew where locale configuration lived and how it
// was written: 4f, 4g and 4h ran /LOCALES\s*=\s*\[…\]\s*as const/ over src/lib/i18n.ts;
// 4i and 4j walked the same file with the TypeScript AST. Five copies, two dialects, one
// fact. The adapter resolves that fact once and hands consumers the ANSWER.
//
// FACTS, NOT EVIDENCE. `resolveHost()` returns locale codes, a default locale and a
// target list. It deliberately returns no module path, no binding name, no source file,
// no AST node and no line number. A consumer that receives a path can re-derive host
// shape itself, and the coupling reappears one convenience at a time. If a consumer
// needs repository knowledge, extend this module — never the consumer.
//
// ON `diagnostics`. Fail-closed messages are pre-rendered here and handed over as
// strings. This looks like a concession and is the opposite of one: it is what lets a
// consumer print byte-identical text without ever holding the path that text mentions.
// A rendered sentence is a fact. The path it was built from is evidence, and stays here.
//
// EXIT CODES ARE NOT DECIDED HERE. This module throws; the consumer chooses what to do.
// Gate 4j exits 1 where the others exit 2, and both are correct — that is gate policy,
// and policy in the adapter is how an adapter grows gate-specific branching.
//
// ONE ADAPTER, NO PARSER SELECTION. F2 ADR-2 rejected a `parser` field for v1: a schema
// field needs a general host capability with a concrete second host that would need it,
// and no second host has been opened. Adding it later is additive; shipping it now and
// discovering the abstraction is wrong is not.
import { resolve, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync, readFileSync } from 'node:fs';
import ts from 'typescript';
import { parseSourceFile, declOf, keyOf, stringOf, unwrap } from './ts-ast.mjs';
import { loadManifest, HostManifestError } from './host-manifest.mjs';
import { createCensusReader, CensusReadError } from '../census/read.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');

/**
 * The host does not match what the manifest declares about it.
 *
 * Distinct from HostManifestError, which means the manifest is malformed in itself.
 * Callers that only relay `.message` need not tell them apart; callers that want to
 * distinguish "your manifest is wrong" from "your manifest is stale" can.
 */
export class HostShapeError extends Error {
  constructor(message) {
    super(message);
    this.name = 'HostShapeError';
  }
}

// A path inside the repository reads better relative; one outside it (a scratch host)
// reads as a long `../../` climb that tells the reader nothing. Fall back to absolute.
const relFromRoot = (p) => {
  const r = relative(root, p).replace(/\\/g, '/');
  return r && !r.startsWith('..') ? r : p.replace(/\\/g, '/');
};

/**
 * Read the locale codes out of the host's own registry.
 *
 * The registry is the source of truth for WHICH codes exist. The manifest says what the
 * host calls it and which field carries the code; it never says how to recover either
 * from bytes. Switching this function to a regex would not change one character of the
 * manifest — that is the discriminator, applied.
 *
 * `directionField` and `intlField`, when the manifest declares them, are read in the SAME
 * PASS and returned raw. Raw is deliberate: this function reports what the registry says,
 * and whether what it says is a legal direction (or a resolvable BCP-47 tag) is a
 * judgement the respective resolver — or the gate whose policy it is — makes, once, where
 * the vocabulary lives. Validating here would put a framework rule in a byte reader.
 */
function readRegistryCodes(manifest, moduleFile, label) {
  const { binding, codeField, directionField, intlField } = manifest.locales.registry;

  if (!existsSync(moduleFile)) {
    throw new HostShapeError(`could not parse ${binding} from ${label}`);
  }

  const sf = parseSourceFile(moduleFile);
  const node = declOf(sf, binding);
  if (!node || !ts.isArrayLiteralExpression(node)) {
    throw new HostShapeError(`could not parse ${binding} from ${label}`);
  }

  const codes = [];
  const directions = new Map();
  const intls = new Map();
  for (const el of node.elements) {
    const obj = unwrap(el);
    if (!ts.isObjectLiteralExpression(obj)) continue;
    const fieldOf = (name) => {
      const prop = obj.properties.find((p) => ts.isPropertyAssignment(p) && keyOf(p) === name);
      return prop ? stringOf(prop.initializer) : undefined;
    };
    const code = fieldOf(codeField);
    if (!code) continue;
    codes.push(code);
    // `undefined` here means one of two different things — the field is absent, or its
    // value is not a string literal this reader can recover. Both are recorded the same
    // way and both fail closed downstream, because neither yields a direction (or a tag).
    if (directionField) directions.set(code, fieldOf(directionField));
    if (intlField) intls.set(code, fieldOf(intlField));
  }
  return { sf, codes, directions, intls };
}

/**
 * Resolve the host's locale facts.
 *
 * @param {{manifestPath?: string, registryModule?: string}} [options]
 *   `registryModule` overrides the module the manifest points at, so the adapter can be
 *   exercised against a scratch host without touching the repository. This preserves the
 *   `--i18n` affordance gates 4g and 4i already expose; losing it would silently break
 *   the scratch-corpus testing path P38 relies on.
 *
 * @returns {Readonly<{localeCodes: readonly string[], defaultLocale: string,
 *                     targets: readonly string[], roles: Readonly<Record<string,string|undefined>>,
 *                     diagnostics: Readonly<Record<string,string>>, direction: object,
 *                     intl: object, routes: object, policy: object, census: object}>}
 */
export function resolveHost({ manifestPath, registryModule } = {}) {
  const { manifest, manifestDir } = loadManifest({ manifestPath });
  const { binding, module: declaredModule } = manifest.locales.registry;
  const { defaultBinding } = manifest.locales;

  // Every host artifact resolves against the HOST's root — the manifest's own directory,
  // adjusted by `project.root` — never against the framework's. Joining onto the framework
  // root is what let a gate address adventureastro while claiming to describe another host.
  const hostRoot = resolve(manifestDir, manifest.project.root);

  const moduleFile = registryModule ? resolve(registryModule) : resolve(hostRoot, declaredModule);
  const label = relFromRoot(moduleFile);

  const { sf, codes, directions, intls } = readRegistryCodes(manifest, moduleFile, label);

  // The manifest's key set is checked against the host's real registry on every run.
  // A CHECKED second list is not a second source of truth; the stale 4-of-8 locale list
  // in astro.config.mjs, which nothing verifies, is what an UNCHECKED one looks like.
  const declared = Object.keys(manifest.locales.entries).filter((k) => k !== '$doc');
  const missing = codes.filter((c) => !declared.includes(c));
  const extra = declared.filter((c) => !codes.includes(c));
  if (missing.length || extra.length) {
    const parts = [];
    if (missing.length) parts.push(`${label} registers ${missing.map((c) => `"${c}"`).join(', ')} with no entry in the host manifest`);
    if (extra.length) parts.push(`the host manifest declares ${extra.map((c) => `"${c}"`).join(', ')}, which ${label} does not register`);
    throw new HostShapeError(`host manifest has drifted from ${label} — ${parts.join('; ')}`);
  }

  const defaultLocale = stringOf(declOf(sf, defaultBinding));
  if (!defaultLocale) {
    throw new HostShapeError(`could not read ${defaultBinding} from ${label}`);
  }
  if (!codes.includes(defaultLocale)) {
    throw new HostShapeError(`${label} declares ${defaultBinding} "${defaultLocale}", which is not among the registered locales`);
  }

  const targets = codes.filter((c) => c !== defaultLocale);

  const roles = {};
  for (const code of declared) roles[code] = manifest.locales.entries[code].role;

  // Pre-rendered fail-closed text. Consumers relay these; they never see `label`.
  const diagnostics = Object.freeze({
    unresolvedRegistry: `could not parse ${binding} from ${label}`,
    noTargets: `parsed ${binding} from ${label} but found no target locales`,
    noCodes: `parsed ${binding} but found no locale codes`,
  });

  return Object.freeze({
    localeCodes: Object.freeze([...codes]),
    defaultLocale,
    targets: Object.freeze(targets),
    roles: Object.freeze(roles),
    diagnostics,
    routes: createRoutesResolver(manifest, hostRoot, codes, defaultLocale),
    direction: createDirectionResolver(manifest, codes, directions, label),
    intl: createIntlResolver(manifest, codes, intls, label),
    policy: createPolicyResolver(manifest, hostRoot),
    census: createCensusResolver(manifest, hostRoot),
  });
}

/**
 * The declared text directions, one of which every locale must have.
 *
 * `auto` is HTML-legal and deliberately absent. It means "let the bidi algorithm infer
 * direction from the first strong character", which is the opposite of a declared
 * direction: a locale whose direction is inferred per page has no direction the framework
 * can check a page against. A host that wants `auto` is describing a document, not a
 * locale, and gate 4k would have nothing to verify.
 */
export const DIRECTIONS = Object.freeze(['ltr', 'rtl']);

/**
 * The host's declared direction could not be resolved.
 *
 * `.kind` is `undeclared` when the manifest names no `directionField` — a fact about the
 * host, distinct from `invalid`, which means the field was named and the registry does not
 * carry a legal value for some locale. The remedies differ: declare the field, versus fix
 * the registry.
 */
export class HostDirectionError extends Error {
  constructor(message, kind) {
    super(message);
    this.name = 'HostDirectionError';
    this.kind = kind;
  }
}

/**
 * Resolve each locale's declared text direction from the host's own registry.
 *
 * ONE AUTHORITATIVE SOURCE, READ TWICE. `LOCALES[].dir` is where the layout reads
 * direction and it is where this reads it. That is the whole point: a gate that consulted
 * a manifest copy would verify the framework's transcription of the fact rather than the
 * fact, and would pass a page whose layout disagreed with both.
 *
 * RESOLUTION IS LAZY, VALIDATION IS EAGER-ONCE. Gates 4f–4j resolve the same host and have
 * no business with direction; making an undeclared `directionField` fatal at
 * `resolveHost()` would break five gates on a host that never claimed to have one. So the
 * refusal happens on ASK. Once asked, every locale is validated together — a partial
 * answer ("here are the seven I could read") is how a locale silently loses its direction.
 *
 * THERE IS NO DEFAULT, AND THAT IS THE LOAD-BEARING DECISION. Returning `ltr` for a locale
 * the registry does not describe would make gate 4k approve exactly the page it exists to
 * catch: an RTL locale rendering left-to-right, agreeing with an invented declaration.
 */
function createDirectionResolver(manifest, codes, directions, label) {
  const { binding, directionField } = manifest.locales.registry;
  let resolved = null;

  const map = () => {
    if (resolved) return resolved;
    if (!directionField) {
      throw new HostDirectionError(
        `is not declared — the host manifest's locales.registry names no "directionField", so ${label} cannot be asked which way a locale reads`,
        'undeclared'
      );
    }
    const bad = [];
    const out = {};
    for (const code of codes) {
      const value = directions.get(code);
      if (typeof value === 'string' && DIRECTIONS.includes(value)) out[code] = value;
      else bad.push(`"${code}" (${value === undefined ? `no readable ${directionField}` : JSON.stringify(value)})`);
    }
    if (bad.length) {
      throw new HostDirectionError(
        `is declared as ${binding}[].${directionField} in ${label}, but ${bad.length} locale(s) carry no legal direction: ${bad.join(', ')} — expected one of ${DIRECTIONS.join(', ')}`,
        'invalid'
      );
    }
    resolved = Object.freeze(out);
    return resolved;
  };

  return Object.freeze({
    /** Every registered locale's declared direction. Throws rather than answering partially. */
    get map() { return map(); },
    /** One locale's declared direction. An unregistered code is a caller defect, not a default. */
    of(code) {
      const m = map();
      if (!(code in m)) {
        throw new HostDirectionError(`has no entry for "${code}" — it is not a registered locale`, 'invalid');
      }
      return m[code];
    },
    declared: Boolean(directionField),
    vocabulary: DIRECTIONS,
    /** Display label for report text only, on the `describe()` precedent. */
    describe: () => (directionField ? `${binding}[].${directionField}` : null),
  });
}

/**
 * The host's declared formatting tag could not be resolved.
 *
 * `.kind` mirrors HostDirectionError: `undeclared` when the manifest names no `intlField`
 * — a fact about the host — versus `invalid`, the field was named and the registry does
 * not carry a readable tag for some locale. The remedies differ: declare the field,
 * versus fix the registry.
 */
export class HostIntlError extends Error {
  constructor(message, kind) {
    super(message);
    this.name = 'HostIntlError';
    this.kind = kind;
  }
}

/**
 * Resolve each locale's declared formatting tag (ADR-8's `intl`) from the host registry.
 *
 * THE SAME SHAPE AS DIRECTION, ONE JUDGEMENT FEWER. Direction has a closed vocabulary, so
 * its resolver validates values against it. A formatting tag's "vocabulary" is whatever
 * BCP-47 the runtime's ICU resolves — a fact about the environment, not about the host —
 * so this resolver asserts only that every locale CARRIES a readable tag, and whether the
 * tag resolves (and to which numbering system) is gate 4p's policy, judged against the
 * ICU actually present where the gate runs. Validating resolvability here would freeze an
 * environment fact into a byte reader.
 *
 * RESOLUTION IS LAZY, VALIDATION IS EAGER-ONCE, AND THERE IS NO DEFAULT — for the same
 * reasons as direction, one for one. A locale answered with an invented tag would let
 * gate 4p certify a numbering system the site never renders.
 */
function createIntlResolver(manifest, codes, intls, label) {
  const { binding, intlField } = manifest.locales.registry;
  let resolved = null;

  const map = () => {
    if (resolved) return resolved;
    if (!intlField) {
      throw new HostIntlError(
        `is not declared — the host manifest's locales.registry names no "intlField", so ${label} cannot be asked which BCP-47 tag formats a locale`,
        'undeclared'
      );
    }
    const bad = [];
    const out = {};
    for (const code of codes) {
      const value = intls.get(code);
      if (typeof value === 'string' && value.length > 0) out[code] = value;
      else bad.push(`"${code}" (no readable ${intlField})`);
    }
    if (bad.length) {
      throw new HostIntlError(
        `is declared as ${binding}[].${intlField} in ${label}, but ${bad.length} locale(s) carry no readable tag: ${bad.join(', ')}`,
        'invalid'
      );
    }
    resolved = Object.freeze(out);
    return resolved;
  };

  return Object.freeze({
    /** Every registered locale's declared formatting tag. Throws rather than answering partially. */
    get map() { return map(); },
    /** One locale's declared tag. An unregistered code is a caller defect, not a default. */
    of(code) {
      const m = map();
      if (!(code in m)) {
        throw new HostIntlError(`has no entry for "${code}" — it is not a registered locale`, 'invalid');
      }
      return m[code];
    },
    declared: Boolean(intlField),
    /** Display label for report text only, on the `describe()` precedent. */
    describe: () => (intlField ? `${binding}[].${intlField}` : null),
  });
}

/**
 * The host's routing facts could not be resolved.
 *
 * `.kind` is `undeclared` when the manifest has no `routes` section — distinct from a
 * declared section pointing at output that is not there, which is a build that has not
 * been run, not a manifest defect.
 */
export class HostRoutesError extends Error {
  constructor(message, kind) {
    super(message);
    this.name = 'HostRoutesError';
    this.kind = kind;
  }
}

/**
 * Resolve manifest §3 — where rendered output lives, and how a route carries its locale.
 *
 * WHY `output` IS A PATH AND `policy.load` IS NOT. The policy resolver returns parsed
 * data and no path on purpose: a consumer holding a policy path can compute a second one.
 * Rendered output is different in kind — it is a directory a consumer must traverse, and
 * there is no "parsed form" of a corpus to hand over instead. The path is therefore
 * returned, and the coupling it would otherwise create is closed at the other end: the
 * value is resolved HERE from the manifest, so no consumer computes `join(root, 'dist')`
 * and no consumer can be pointed at another host's output by accident. F5 Phase 4 took
 * this as an operator argument (`--dist`) because this section did not exist; that is the
 * hole this closes.
 *
 * `localeOf` is the second half and the more interesting one. Five consumers implemented
 * `key.split('/')[0]` by hand, each re-deciding what an unprefixed route means. It means
 * whatever `defaultLocalePrefixed` says it means, which is a host fact, so it is answered
 * once here.
 */
function createRoutesResolver(manifest, hostRoot, codes, defaultLocale) {
  const section = manifest.routes;

  const relFromHost = (p) => {
    const r = relative(hostRoot, p).replace(/\\/g, '/');
    return r && !r.startsWith('..') ? r : p.replace(/\\/g, '/');
  };

  const output = () => {
    if (!section) {
      throw new HostRoutesError('is not declared — the host manifest has no "routes" section', 'undeclared');
    }
    return resolve(hostRoot, section.output);
  };

  /**
   * Interpret `routes.pageGlob` into a predicate over a dist-relative POSIX key.
   *
   * THE MANIFEST STATES A GLOB; THE ADAPTER INTERPRETS IT. That division is the whole
   * discriminator: `**​/*.html` is a declarative statement about which rendered files are
   * pages, and swapping this function for a full glob engine would not change one
   * character of the manifest. A `walker` or `parser` field would fail that test, which
   * is why none exists.
   *
   * ONLY `**​/*.ext` IS HONOURED, AND ANYTHING ELSE FAILS CLOSED. That is the honest
   * bound: v1's traversal is a recursive walk with an extension test, and it cannot
   * implement segment negation, brace alternation or a depth-limited prefix. A resolver
   * that accepted `pages/*.html` and then walked every directory anyway would return a
   * corpus the manifest did not describe — the silent wrong answer this series exists to
   * remove, arriving through the very field meant to prevent it. Refusing is the only
   * behaviour that keeps the declared fact load-bearing.
   */
  const pageMatcher = () => {
    if (!section) {
      throw new HostRoutesError('is not declared — the host manifest has no "routes" section', 'undeclared');
    }
    const glob = section.pageGlob;
    const m = /^\*\*\/\*(\.[A-Za-z0-9.]+)$/.exec(glob);
    if (!m) {
      throw new HostRoutesError(
        `declares pageGlob ${JSON.stringify(glob)}, which this engine cannot honour — it understands only the form "**/*.ext"`,
        'unsupported'
      );
    }
    const ext = m[1];
    return Object.freeze({ ext, glob, match: (key) => key.endsWith(ext) });
  };

  /**
   * Route identity within the declared output.
   *
   * `entryPoint` is the route a reachability walk starts from; `exempt` names routes that
   * stand outside the linked corpus. Both were hardcoded in validate-site — `'index.html'`
   * and `'404.html'` — where they read as constants of the framework and are in fact
   * facts about this host's build. Undeclared is an error, not a default: a validator that
   * invented an entry point would silently report a whole site orphaned, or silently
   * report nothing, depending on which guess it made.
   */
  const entryPoint = () => {
    if (!section) {
      throw new HostRoutesError('is not declared — the host manifest has no "routes" section', 'undeclared');
    }
    if (!section.entryPoint) {
      throw new HostRoutesError('declares no "entryPoint" — a reachability walk has no route to start from', 'undeclared');
    }
    return section.entryPoint;
  };

  const exempt = () => Object.freeze([...(section?.exempt ?? [])]);

  /**
   * The locale a route key belongs to.
   *
   * The render index states route identity and refuses to name a locale, which is right:
   * naming one requires the host's URL policy, and the index has no access to it. This is
   * where that policy is applied, and it is the only place that should apply it.
   */
  const localeOf = (key) => {
    if (!section) {
      throw new HostRoutesError('is not declared — the host manifest has no "routes" section', 'undeclared');
    }
    // Reached only from `resolveRoutes`, which resolves render addressing WITHOUT reading
    // the locale registry. Attributing a route to a locale needs the registry, so the
    // routes-only caller is refused rather than served a guess. See resolveRoutes.
    if (!codes) {
      throw new HostRoutesError(
        'cannot attribute a route to a locale — this host was resolved for render addressing only, which does not read the locale registry',
        'no-locales'
      );
    }
    const seg = String(key).split('/')[0];
    if (codes.includes(seg)) return seg;
    // An unprefixed route is the default locale's only when the host says the default
    // locale is unprefixed. A host that prefixes every locale has no unprefixed routes,
    // so anything that reaches here is outside the localized corpus entirely.
    return section.defaultLocalePrefixed ? null : defaultLocale;
  };

  return Object.freeze({
    get output() { return output(); },
    get pages() { return pageMatcher(); },
    get entryPoint() { return entryPoint(); },
    get exempt() { return exempt(); },
    localeOf,
    declared: Boolean(section),
    describe: () => (section ? relFromHost(resolve(hostRoot, section.output)) : null),
  });
}

/**
 * Resolve render addressing ALONE — manifest §3 and nothing else.
 *
 * WHY THIS EXISTS (F5 Phase 6, Deliverable 0). `resolveHost` answers every host question
 * at once, and answering them at once means reading the locale registry: it parses
 * LOCALES, reads DEFAULT_LOCALE, and fails closed when the manifest's locale entries have
 * drifted from it. That is correct for a gate, and wrong for validate-site.
 *
 * validate-site checks links, orphans, hub structure, titles and alt text. It is
 * LOCALIZATION-NEUTRAL by design and must stay so. Routing it through `resolveHost` to
 * learn where `dist/` is would have made a monolingual host's site validator fail on a
 * locale registry it has no reason to own — acquiring a localization dependency through
 * the adapter's front door, in the one component whose neutrality is an invariant.
 *
 * So the manifest IS a required dependency of the validator, and the locale registry is
 * NOT. Those are two separate decisions and this function is what keeps them separate.
 * The alternative — leaving the validator manifest-independent with a `join(root,'dist')`
 * fallback — was rejected: a fallback that is correct only for the repository the
 * framework happens to live in is coupling C-3's silent-wrong-answer failure, and putting
 * it in the validator means a foreign host's build reports a clean site while validating
 * adventureastro's output.
 *
 * @returns {Readonly<{routes: object, manifest: object}>} `routes.localeOf` throws here;
 *   a caller that needs route-to-locale attribution wants `resolveHost`.
 */
export function resolveRoutes({ manifestPath } = {}) {
  const { manifest, manifestDir } = loadManifest({ manifestPath });
  const hostRoot = resolve(manifestDir, manifest.project.root);
  return Object.freeze({
    routes: createRoutesResolver(manifest, hostRoot, null, null),
    manifest,
  });
}

/**
 * A policy artifact could not be resolved or read.
 *
 * `.message` is pre-rendered and gate-agnostic, so a consumer composes its own sentence
 * around it and still emits byte-identical text without ever holding the path:
 *
 *   console.error(`gate-4f: config ${e.message} — refusing to pass silently.`)
 *   -> "gate-4f: config not found at i18n-gates/4f-headings.json — refusing to pass silently."
 */
export class HostPolicyError extends Error {
  /**
   * @param {'undeclared'|'missing'|'invalid'} kind — WHAT went wrong, not where. Consumers
   *   branch on it to choose their own sentence shape (4f and 4h append "refusing to pass
   *   silently." to a missing file but not to a malformed one). The kind is a fact about the
   *   failure; the path that produced it stays in `message`, already rendered.
   */
  constructor(message, kind) {
    super(message);
    this.name = 'HostPolicyError';
    this.kind = kind;
  }
}

/**
 * Resolve and load policy artifacts declared in manifest §5.
 *
 * `load(name)` returns PARSED DATA. It does not return, and has no accessor for, the path
 * the data came from — consumers cannot compute a policy location, cannot fall back to a
 * default one, and cannot read a second host's policy by accident. That is the whole point
 * of the phase: before this, every gate computed `join(frameworkRoot, 'i18n-gates', …)`,
 * which is correct only for the one repository the framework happens to live in.
 *
 * A gate whose manifest declares no policy file, or declares `null`, gets a fail-closed
 * error rather than a silent default. There is no default.
 */
function createPolicyResolver(manifest, hostRoot) {
  const section = manifest.policy;
  const relFromHost = (p) => {
    const r = relative(hostRoot, p).replace(/\\/g, '/');
    return r && !r.startsWith('..') ? r : p.replace(/\\/g, '/');
  };

  const load = (name) => {
    if (!section) {
      throw new HostPolicyError('is not declared — the host manifest has no "policy" section', 'undeclared');
    }
    if (!(name in section.gates)) {
      throw new HostPolicyError(`is not declared — the host manifest's policy.gates has no "${name}" entry`, 'undeclared');
    }
    const filename = section.gates[name];
    if (filename === null) {
      throw new HostPolicyError(`is declared as null — "${name}" is configured to have no policy file`, 'undeclared');
    }

    const file = resolve(hostRoot, section.dir, filename);
    const label = relFromHost(file);
    if (!existsSync(file)) throw new HostPolicyError(`not found at ${label}`, 'missing');

    try {
      return JSON.parse(readFileSync(file, 'utf8'));
    } catch (e) {
      throw new HostPolicyError(`is not valid JSON — ${e.message}`, 'invalid');
    }
  };

  /**
   * The host-relative display label for a policy artifact, for REPORT TEXT ONLY.
   *
   * Gates tell a human where to record an exception ("add it to `licensed` in
   * i18n-gates/4f-headings.json"). That instruction is useless without the filename, so
   * the label is rendered here rather than assembled by the consumer — the same exemption
   * `diagnostics` carries, and for the same reason: a rendered string is a fact, the path
   * arithmetic that produced it is evidence. Nothing in the framework reads this back.
   */
  const describe = (name) => {
    const filename = section?.gates?.[name];
    if (!filename) return null;
    return relFromHost(resolve(hostRoot, section.dir, filename));
  };

  return Object.freeze({ load, describe, declared: Object.freeze(section ? Object.keys(section.gates) : []) });
}

/**
 * A census artifact could not be resolved, read, or interpreted.
 *
 * @param {'undeclared'|'missing'|'invalid'|'incompatible'} kind
 *   `undeclared` — the host has never produced this kind. That is a fact about the host,
 *      not a defect, and a consumer may legitimately treat it as one ("absence is not a
 *      fact", contract §4). It still fails closed here; deciding otherwise is the
 *      consumer's business, and it must decide explicitly.
 *   `missing` / `invalid` — declared but absent, unparseable, or rejected by the census
 *      contract. Always a defect.
 *   `incompatible` — well-formed and unreadable BY THIS ENGINE: a census version it does
 *      not know. Distinct from `invalid` because the remedy is different (upgrade or
 *      regenerate, not repair).
 */
export class HostCensusError extends Error {
  constructor(message, kind) {
    super(message);
    this.name = 'HostCensusError';
    this.kind = kind;
  }
}

/**
 * Resolve manifest §8.1 — where census output lives.
 *
 * The division of labour matches `policy`: this function answers WHERE, and the census
 * reader answers WHAT IT MEANS. The adapter never learns what a phrase count is, and the
 * reader never learns where a host keeps its files. Collapsing the two would make the
 * reader host-aware, which is the coupling this whole series exists to remove.
 *
 * `open(kind, {extractor})` returns a reader, not data. A consumer names the extractor
 * identity it was built to interpret, and the reader refuses any fact produced by a
 * different one — a count is only comparable with the view that produced it.
 */
function createCensusResolver(manifest, hostRoot) {
  const section = manifest.census;
  const relFromHost = (p) => {
    const r = relative(hostRoot, p).replace(/\\/g, '/');
    return r && !r.startsWith('..') ? r : p.replace(/\\/g, '/');
  };

  const open = (kind, { extractor } = {}) => {
    if (!section) {
      throw new HostCensusError('is not declared — the host manifest has no "census" section', 'undeclared');
    }
    if (!(kind in section.facts)) {
      throw new HostCensusError(`is not declared — the host manifest's census.facts has no "${kind}" entry`, 'undeclared');
    }

    const file = resolve(hostRoot, section.dir, section.facts[kind]);
    const label = relFromHost(file);
    if (!existsSync(file)) throw new HostCensusError(`not found at ${label}`, 'missing');

    let doc;
    try {
      doc = JSON.parse(readFileSync(file, 'utf8'));
    } catch (e) {
      throw new HostCensusError(`at ${label} is not valid JSON — ${e.message}`, 'invalid');
    }
    return createCensusReader({ doc, kind, label, extractor });
  };

  const describe = (kind) => (section && section.facts?.[kind]
    ? relFromHost(resolve(hostRoot, section.dir, section.facts[kind]))
    : null);

  return Object.freeze({ open, describe, declared: Object.freeze(section ? Object.keys(section.facts) : []) });
}

// Re-exported so a consumer imports its whole census vocabulary from the adapter and
// never reaches into the census package for an error class. Both carry `.kind` and a
// fully rendered `.message`, so a consumer that does not care which layer refused can
// catch either and print one sentence.
export { HostManifestError, CensusReadError };
