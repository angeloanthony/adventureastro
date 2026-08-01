# AR-2 batch 2b — Assertion A is falsified for the two `ar` locks

**Status:** open. **The census re-freeze of [`AR2-E4-phase2-tight-ceiling.md`](AR2-E4-phase2-tight-ceiling.md) §11
did not run, and must not run until this is resolved.** §11.2 criterion 2 is explicit about the
consequence: the ceiling must be rebuilt from measured Arabic frontmatter *before any floor is
trusted*.

The batch-2b corpus itself is unaffected: 8 files, 645 pages, whole gate suite green at `3ea4f94`.
What is blocked is the second half of §6.2 — the ceiling extension and re-freeze.

---

## 1. The measurement

Run after batch 2b, over the green `dist/`:

```
node scripts/rtl/measure-prose-window.mjs --json w.json
node scripts/rtl/measure-related-ceiling.mjs --window w.json --project --json c.json
```

```
=== ASSERTION A — ceiling ≥ observed related, per term ===
  ⚠ أرض الديناصورات: observed 9 > settled 0
  ⚠ المسارات: observed 4 > settled 0
  ⚠ 2 UNSOUND
```

The control is wired: `--falsify` (card limit forced to 1) goes red with 4 violations, so a green
Assertion A would have meant something.

| | acceptance criterion (§11.2) | result |
|---|---|---|
| 1 | `phrase-set.json` re-derived and diffed | **not reached** |
| 2 | Assertion A inside the ceiling instrument | ✘ **FAILED — 2 terms** |
| 3 | `--falsify` control | ✔ red, 4 violations at limit 1 |
| 4 | whole-census differential by sign | **not reached** |
| 5 | `ceilNP < frozen value`, per `ar` lock | ✔ 132 > 33 · 389 > 42 |
| 6 | `npm run gates:dist` | ✔ green |

Criterion 2 gates criteria 1 and 4, so the refresh stopped rather than proceeding to a re-freeze
whose baseline could not be trusted.

## 2. Why it is structural, not an authoring defect

The settled ceiling assigns a **related-block ceiling of 0 to every Arabic-script term**, while
assigning real values to Latin ones (`Vernal` 248, `Dinosaur National Monument` 148). That is not a
tuning choice — it falls out of §3.1's *English-predicts-Arabic* assumption: the settled ceiling is
summed over **English** registered frontmatter, and English frontmatter cannot contain
`أرض الديناصورات`. So the ceiling for an Arabic term is 0 by construction, and **any** Arabic
occurrence in a related card violates it.

The occurrences are real and expected. `RelatedArticles` resolves against the *registered locale
corpus* (E-1 §6.3, E-2 §4.1), so as `AR_SLUGS` grows, more related cards on `ar` pages resolve to
Arabic siblings and render Arabic titles instead of falling back to English ones. The pilot had 10
registered entries; batch 2a took it to 18; batch 2b takes it to 26. The crossing is a consequence
of registration cardinality, which is precisely the axis E-3 identified and §6.2 warns about.

**This means the assumption did not break — it was always inapplicable to Arabic-script terms, and
the corpus only just grew large enough for the related block to demonstrate it.** Recording it as
"caused by batch 2b" would be wrong; batch 2b is the batch that made it measurable.

## 3. What is NOT affected

- **The floors still hold.** Criterion 5 passes with room to spare: `ceilNP` is 132 against a frozen
  floor of 33 for `dinosaur-country`, and 389 against 42 for `offroad-trail`. Nothing is
  ceiling-unsafe; no lock has to be dropped.
- **Gate 4i is green** and stays green. The floors simply cover proportionally less of the corpus
  than shipped, which is the known consequence of registering without re-freezing (§6.2) and is
  already recorded in the batch-2b commit message.
- **No gate change is implied.** This is a measurement-model finding, not an enforcement defect.

## 4. What resolving it requires

§11.2 criterion 2 names the remedy: rebuild the ceiling from **measured Arabic frontmatter** rather
than projecting it from English. Concretely, the related-block ceiling for a term must be summed
over the frontmatter that the `ar` related cards actually render — the registered `ar` titles and
descriptions — instead of over their English counterparts.

Until that is built, the honest position is the one this document takes: the floors in force are
sound but under-scoped, and the re-freeze is deferred rather than done.

⚠ **Do not re-run `npm run census:phrase-count` for `ar` on the strength of a green build alone.** A
green build says the current floors pass; it says nothing about whether a refreshed baseline would
be measuring the right population.

## 5. Instrument change made while measuring this

`measure-prose-window.mjs` hardcoded the nine pilot slugs in `PILOT`. §11.0 flagged that as a
standing hazard — a route absent from the list is silently excluded from the window while the census
counts it, the same population mismatch behind §10.2's 32/41-vs-33/42 correction — and asked for the
list to be extended at every expansion. **By batch 2b it had already been missed once: batch 2a's
eight hiking spokes were registered and never added.**

The list now derives from `AR_SLUGS`, so the measured population is definitionally the registered
one and the mismatch cannot reappear at the next expansion. This is what surfaced the finding above:
with 25 spokes in the window instead of 9, the related block is large enough for the Arabic terms to
cross a ceiling of 0.
