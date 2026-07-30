// scripts/gate-4p-intl-numeral.mjs — Gate 4p: the registry numeral check
// (AR-2 B-3 / ADR-8 §2.1).
//
// INVARIANT. Every locale's `intl` tag — the BCP-47 tag every machine-formatted
// date and number renders through — resolves, in the ICU actually present at
// gate runtime, to numbering system `latn`. The corpus-wide numeral policy is
// Western digits (docs/rtl/AR1-arabic-policy.md §3); this check is what turns
// that recorded policy into an enforced one.
//
// WHY A REGISTRY CHECK AND NOT A RENDERED SCAN. The hazard is one line:
// `intl: 'ar-SA'` is plausible, correct-looking, changes no translated string
// and passes every other gate (ADR-8 §1.3) — yet it switches every formatted
// value on the Arabic site to Arabic-Indic digits. The numbering system is a
// property of the REGISTRY, decidable in milliseconds with no dist/, so it is
// enforced at the registry and runs BEFORE `astro build`, in `gates:src`.
// Author-typed Arabic-Indic digits in prose are a rendered-text question and
// remain B-10's business, not this gate's.
//
// THREE OUTCOMES, NOT TWO (METHOD rule 6). A tag this runtime's Intl cannot
// resolve is an INSTRUMENT FAILURE — never a pass, never a policy violation.
// This is not theoretical: `new Intl.DateTimeFormat('not-a-tag')` throws
// nothing. It silently falls back to the system default locale, whose numbering
// system is latn — so a two-outcome gate would PASS the one registry state in
// which it measured nothing at all. `supportedLocalesOf` is the resolvability
// probe that catches the silent fallback; the try/catch catches the tags Intl
// rejects outright.
//
// SELF-VERIFYING PER ENVIRONMENT. The gate queries the ICU present where it
// runs, so a CI/local CLDR divergence surfaces as a red check, not silent drift.
//
// EXIT CODES. 2 for anything that prevents a verdict — unresolvable host,
// undeclared intl field, AND instrument failure: a check that did not run must
// never be readable as one that passed or failed. 1 for a policy violation.
// 0 prints the full resolved table, so the fact being certified is visible,
// not implied.
import { resolveHost } from './lib/host-adapter.mjs';

function main() {
  let host;
  try {
    host = resolveHost();
  } catch (e) {
    console.error(`gate-4p: ${e.message} — refusing to pass silently.`);
    process.exit(2);
  }

  let tags;
  try {
    tags = host.intl.map;
  } catch (e) {
    console.error(`gate-4p: the formatting tag ${e.message} — refusing to pass silently.`);
    process.exit(2);
  }

  const rows = [];
  const violations = [];
  const failures = [];

  for (const code of host.localeCodes) {
    const tag = tags[code];
    let resolved;
    try {
      if (Intl.DateTimeFormat.supportedLocalesOf([tag]).length === 0) {
        failures.push(
          `locale "${code}" declares intl "${tag}", which this runtime's Intl cannot resolve — ` +
            `DateTimeFormat would silently fall back to the system default locale`
        );
        continue;
      }
      resolved = new Intl.DateTimeFormat(tag).resolvedOptions();
    } catch (e) {
      failures.push(`locale "${code}" declares intl "${tag}", which Intl rejects outright (${e.message})`);
      continue;
    }
    rows.push({ code, tag, nu: resolved.numberingSystem });
    if (resolved.numberingSystem !== 'latn') {
      violations.push(
        `locale "${code}" declares intl "${tag}", whose numbering system is "${resolved.numberingSystem}". ` +
          `The corpus-wide numeral policy is Western digits (docs/rtl/AR1-arabic-policy.md §3). ` +
          `Use an unqualified or latn-defaulting tag, or pin it with -u-nu-latn.`
      );
    }
  }

  // Instrument failure outranks violation: with any unmeasured locale the run is
  // not a verdict, and reporting the violations it did reach as THE result would
  // present a partial measurement as a complete one.
  if (failures.length) {
    console.error('\ngate-4p: INSTRUMENT FAILURE — the numeral check could not run\n');
    for (const f of failures) console.error(`  ✖ ${f}`);
    if (violations.length) {
      console.error(`\n  (${violations.length} policy violation(s) were also found before the check broke; they are\n  not a verdict — re-run after the tag is fixed.)`);
    }
    console.error(
      '\nAn unresolvable tag is not a pass and not a policy violation: the check\n' +
        "measured nothing. Fix the tag (or this runtime's ICU) and re-run.\n"
    );
    process.exit(2);
  }

  if (violations.length) {
    console.error('\ngate-4p: registry numeral policy FAILED\n');
    for (const v of violations) console.error(`  ✖ ${v}`);
    console.error('');
    process.exit(1);
  }

  // The certified fact, printed in full on success — one row per locale, never a
  // bare count (the same reasoning as rule 14: a fact nobody sees decays).
  console.log(`gate-4p: ✔ ${rows.length} registered locale(s) — every intl tag resolves to Western digits (numberingSystem latn)`);
  for (const r of rows) {
    console.log(`  ${r.code.padEnd(4)} intl "${r.tag}"${' '.repeat(Math.max(1, 8 - r.tag.length))}-> ${r.nu}`);
  }
  console.log('  policy: docs/rtl/AR1-arabic-policy.md §3, enforced at the registry (ADR-8 §2.1)');
}

main();
