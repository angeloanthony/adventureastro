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
import { resolve, dirname, relative, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';
import ts from 'typescript';
import { parseSourceFile, declOf, keyOf, stringOf, unwrap } from './ts-ast.mjs';
import { loadManifest, HostManifestError } from './host-manifest.mjs';

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
 */
function readRegistryCodes(manifest, moduleFile, label) {
  const { binding, codeField } = manifest.locales.registry;

  if (!existsSync(moduleFile)) {
    throw new HostShapeError(`could not parse ${binding} from ${label}`);
  }

  const sf = parseSourceFile(moduleFile);
  const node = declOf(sf, binding);
  if (!node || !ts.isArrayLiteralExpression(node)) {
    throw new HostShapeError(`could not parse ${binding} from ${label}`);
  }

  const codes = [];
  for (const el of node.elements) {
    const obj = unwrap(el);
    if (!ts.isObjectLiteralExpression(obj)) continue;
    const prop = obj.properties.find((p) => ts.isPropertyAssignment(p) && keyOf(p) === codeField);
    const code = prop && stringOf(prop.initializer);
    if (code) codes.push(code);
  }
  return { sf, codes };
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
 *                     diagnostics: Readonly<Record<string,string>>}>}
 */
export function resolveHost({ manifestPath, registryModule } = {}) {
  const manifest = loadManifest({ manifestPath });
  const { binding, module: declaredModule } = manifest.locales.registry;
  const { defaultBinding } = manifest.locales;

  const moduleFile = registryModule ? resolve(registryModule) : join(root, declaredModule);
  const label = relFromRoot(moduleFile);

  const { sf, codes } = readRegistryCodes(manifest, moduleFile, label);

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
  });
}

export { HostManifestError };
