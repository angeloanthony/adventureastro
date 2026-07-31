# AR-2 Track E, E-0 — Arabic batch 1 translator brief

**Status:** E-0 deliverable 3, complete. This is the instruction set for the 9-file
Arabic pilot. It supersedes nothing in `AR1-arabic-policy.md`; it selects the parts that
bind at authoring time and adds the two requirements no prior locale's brief carried.

**Batch:** `utv` (7 spokes) + `dinosaur-national-monument` (2 spokes) — **E-D1 resolved
yes, 2026-07-30**. Measured justification in [`AR2-E0-census.md`](AR2-E0-census.md) §2 F3.

---

## 1. The nine files

Each file is authored as `src/content/<hub>/<slug>.ar.mdx`, translated from the English
`.mdx` of the same slug.

| # | Hub | Slug | English visible chars |
|---|---|---|---|
| 1 | `utv` | `backcountry-tours-vernal-utah` | 6 821 |
| 2 | `utv` | `beginners-guide-to-utv-tours-vernal` | 22 367 |
| 3 | `utv` | `best-utv-trails-vernal` | 10 303 |
| 4 | `utv` | `family-utv-guide-vernal` | 24 740 |
| 5 | `utv` | `group-utv-tours-vernal` | 7 188 |
| 6 | `utv` | `private-utv-tours-vernal` | 19 162 |
| 7 | `utv` | `side-by-side-rentals-vernal-utah` | 6 943 |
| 8 | `dinosaur-national-monument` | `petroglyphs-rock-art-vernal` | 8 981 |
| 9 | `dinosaur-national-monument` | `visiting-dinosaur-national-monument` | 35 071 |

**E-1 authors file 3 alone** (`best-utv-trails-vernal` — the highest wayfinding-name
density per character, so the registration probe also exercises the isolation surface).
E-2 authors the other 8.

### 1.1 Two deliverables per file, not one

1. `src/content/<hub>/<slug>.ar.mdx` — presence alone emits the route.
   `getStaticPaths` iterates the collection and splits the locale off the filename; it
   never consults `AR_SLUGS`.
2. The `AR_SLUGS` entry in [`src/lib/i18n.ts:499`](../../src/lib/i18n.ts#L499) — this is
   what makes internal links resolve to the Arabic route instead of falling back to
   English, and what `localeHref()` reads.

They diverge silently in both directions. A file with no slug entry renders a live page
nothing links to; a slug entry with no file registers a route that does not exist.

`AR_SLUGS` today contains exactly one entry, `cancellation-policy`. After E-2 it contains
ten.

---

## 2. Frozen — not re-decided per file

Everything in this section is settled. A translator who disagrees files a §5 challenge;
they do not resolve it in the prose.

| | Rule | Source |
|---|---|---|
| Variety | Modern Standard Arabic | policy §1 |
| Register | Direct 2nd person, singular, **masculine unmarked**; prefer impersonal phrasing where it reads naturally | policy §2 |
| Numerals | **Western digits 0–9, no exception** — never `٠-٩`, never `۰-۹` | policy §3 |
| Punctuation | `،` not `,` · `؛` not `;` · `؟` not `?` — at sentence level only | policy §5.1 |
| Isolation | `<bdi>` element. **Never** `U+200E`/`U+200F`/`U+2066`–`U+2069` | policy §5.2 |

### 2.1 Arabic — the five established exonyms

`Utah → يوتا` · `Salt Lake City → سولت ليك سيتي` · `Denver → دنفر` ·
`Colorado → كولورادو` · `Rocky Mountains → جبال روكي`

### 2.2 Latin, verbatim — the wayfinding and transactional names

Left in Latin script inside Arabic prose, unchanged, including their own internal
punctuation:

`Vernal` · `Dinosaur National Monument` · `Moab` · `Flaming Gorge` · `Red Fleet` ·
`Steinaker` · `Ashley National Forest` · `Uintas` · `Kings Peak` · `Doc's Beach` ·
`Moonshine Arch` · `Outlaw Trail` · `Asphalt Ridge` · `Adventure Tours Vernal` ·
`Kawasaki KRX 1000` · `Google` · `UTV` / `ATV` / `Jeep`

The test is not what kind of name it is — it is whether the reader must match the string
against a road sign, a booking system or a map. This diverges from `ja` on purpose
(policy §4.2); do not "correct" it into consistency with the Japanese corpus.

⚠ **`Doc's Beach` — use the ASCII apostrophe `'` (U+0027), not `’` (U+2019).** The
English corpus renders both forms and gate 4i folds neither, so the Arabic corpus picks
one and holds it. Census: `AR2-E0-census.md` §2 F5.

### 2.3 Locked Arabic identities

| English | Arabic | Where it is enforced |
|---|---|---|
| Dinosaur Country | `أرض الديناصورات` | gate 4i lock `dinosaur-country` |
| trail (the route) | `المسارات` / `مسار` | gate 4i lock `offroad-trail` |
| Key Takeaways | `أبرز النقاط` | AR-1 glossary; **4 files in this batch render it** |

`مسار` is the route. It never becomes a blanket word covering vehicle class — `UTV`,
`ATV` and `Jeep` stay Latin beside it.

---

## 3. ⚠ The requirement no prior locale's brief carried: `<bdi>` in MDX body prose

**The shared formatter does not reach you.** B-2's bidi formatter isolates values flowing
through shared components (`SITE` NAP, `TourCta`, `TrustBadge`). A phone number, price or
Latin brand run **typed directly into `.ar.mdx` prose passes through no formatter at
all.**

Measured on the English sources for these 9 files: **33 occurrences of
`(435) 219-9447` in body prose** (28 of them in the `utv` seven). Every one is a site
where an unisolated Latin run lands in an Arabic paragraph.

### 3.1 Why it matters, concretely

`(` U+0028 and `)` U+0029 are `Bidi_Mirrored=Yes`. In a right-to-left paragraph the bidi
algorithm mirrors them, so

```mdx
اتصل على (435) 219-9447
```

resolves its brackets the wrong way round. Every character is correct; only the resolved
order is wrong, which is why no spellcheck and no diff review catches it.

### 3.2 What to write

```mdx
اتصل على <bdi>(435) 219-9447</bdi> لحجز جولتك.

تنطلق الجولة من <bdi>Doc's Beach</bdi> عبر <bdi>Outlaw Trail</bdi>.

سعر الجولة يبدأ من <bdi>$1,000</bdi>.
```

**Wrap in `<bdi>`:** the phone number; any price; any Latin run at a clause boundary
(start or end of a sentence, or adjacent to Arabic punctuation).

**Do not wrap:** a Latin name sitting mid-clause with Arabic on both sides and no
mirrored character in it — `<bdi>` is harmless there but adds noise. Gate 4n decides;
§4 tells you how to ask it.

⚠ `›` `‹` `»` `«` are also `Bidi_Mirrored=Yes` and need **no** action — the algorithm
flips them correctly. `→` (U+2192) is `Bidi_Mirrored=No` and stays pointing the wrong
way; there are **0** in this batch's English sources, so do not introduce one.

### 3.3 This is an authoring requirement, not a QA finding

Gate 4n reads `dist/` and will catch an unisolated run. But 33 findings is a failing
batch, not a review note, and the gate cannot tell you which of them the author intended.
Isolate at authoring time.

---

## 4. Links — gate 4b allow-list

**Every internal link keeps its English path**, with exactly one exception in this batch:

| Target | Link to |
|---|---|
| `cancellation-policy` | `/ar/cancellation-policy/` |
| **everything else** | the English path, unchanged |

Do not "helpfully" rewrite a link to `/ar/…` because the Arabic page is being written in
the same batch. Links are switched by `localeHref()` reading `AR_SLUGS`, once the entry
lands; a hand-written `/ar/` path that outruns its registry entry is a broken link, and
gate 4b will name it.

As the batch completes, the allow-list grows to the 9 slugs in §1 — but only after both
deliverables (§1.1) exist for that slug.

---

## 5. The challenge window — use it, do not defer

**Arabic is the first locale whose policy predates its text.** Every other locale's
terminology was reverse-engineered from a shipped corpus under gate 4c ("corpus beats
brief"), and each correction cost a corpus-wide sweep. Every §1–§5 decision above is a
*prediction* that no Arabic corpus has yet tested.

A translator who contradicts policy §2 or §4 **with corpus evidence** is the pipeline
working, not a problem. At 9 files a policy reversal costs a 9-file sweep. At 57 it costs
the locale.

**Raise it during the batch.** Do not defer terminology disputes to review.

Specifically expected, and worth reporting even if you follow the rule:

- **§2 register** — count of places where the masculine-unmarked 2nd person reads wrong
  and an impersonal phrasing was used instead. (Census item M9.)
- **§4.2** — any name in the Latin list that genuinely has an established Arabic form.
  `Dinosaur National Monument` is the one closest to the line: it is a *national
  monument*, the category most habitually rendered with an exonym. The site's own
  Arabic chrome already renders it Latin.
- **§6 plural/dual agreement** in interpolated counts — an explicit AR-1 non-decision.
  Record what you did; do not invent a rule. (Census item M10.)

---

## 6. Acceptance — what runs against your files

No new instrument is built for this batch. `npm run build` runs all 11 gates.

| Gate | What it will tell you |
|---|---|
| **4n** | An unisolated Latin/Arabic flank. **Its first real population is your files.** |
| **4q** | Any Arabic-Indic digit in rendered prose. Policy §3 has no exception. |
| **4k** | The 9 new pages resolve effective direction `rtl`. |
| **4i** | The two locked identities in §2.3 still render, at re-measured floors. |
| **4o** | `→` count — expected 0. |
| **4b** | Any internal link that left the English path without a registry entry. |

Predicted per-term Arabic counts are recorded in `AR2-E0-census.md` §4 **before** any
Arabic exists, so the E-2 measurement can falsify a prediction rather than confirm itself.
If your file's counts diverge sharply from the English body counts in that document's §5,
that is a finding to report — in either direction.
