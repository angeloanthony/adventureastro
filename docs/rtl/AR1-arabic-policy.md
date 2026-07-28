# AR-1 — Arabic language policy

**Status:** decided and applied, 2026-07-28. Recorded *before* any Arabic corpus
exists, which is the point: every prior locale's terminology decisions were
reverse-engineered from a shipped corpus under Gate 4c ("corpus beats brief"),
and each one cost a corpus-wide sweep. Arabic is the first locale where the
policy predates the text, so there is nothing to sweep.

Scope: the whole Arabic corpus, present and future. These are **corpus-wide
decisions**, not per-page judgement calls. Changing one is a phase with a sweep,
never a local edit (Gate 4c).

---

## 1. Language variety

**Modern Standard Arabic (الفصحى المعاصرة). Never a regional dialect.**

Rejected: Gulf, Egyptian, Levantine colloquial. The audience is inbound
travellers to rural Utah from across the Arabic-speaking world, with no single
dominant origin. Any dialect choice reads as "not for me" to the majority of the
rest, and MSA is the only variety every literate Arabic reader shares. This also
matches how the site's other locales were scoped — one written standard per
locale, no regional forks.

**Consequence for AR-2:** MSA has no regional exonym conflicts to arbitrate,
which removes the class of decision that dominated the `zh` and `ja` backlogs.

---

## 2. Register and voice

The house register across this site is **informal but respectful** — `de` = `du`,
`zh` = `你`, `ja` = です・ます. Arabic's equivalent is direct second-person
address with no honorific distancing.

| Decision | Value | Rejected alternative |
|---|---|---|
| Formality | Direct second person; no honorifics | `حضرتك` / `سيادتكم` — reads as bureaucratic or obsequious, and clashes with every sibling locale |
| Person/number | Second person **singular** | Plural `أنتم` reads as corporate broadcast, not a guide talking to a rider |
| Gender | **Masculine singular as the unmarked form**, where direct address is unavoidable | Slash forms (`احجز/ي`) are unreadable by screen readers; dual-gender duplication doubles every CTA |
| Preference | **Impersonal / verbal-noun phrasing wherever the English does not actually address the reader** | Mechanically converting every English label to an imperative, which forces a gender mark that the English never had |

The gender rule is the one that needs stating plainly, because it looks like a
choice about the reader and is not. Arabic marks gender on verbs, pronouns and
imperatives; there is no gender-neutral imperative. The mitigation is
**structural, not lexical**: prefer phrasings that never reach a marked form.

```
'Drive time'        -> 'مدة القيادة'        (verbal noun — no gender, no verb)
'Distance'          -> 'المسافة'             (noun)
'Book Now'          -> 'احجز الآن'           (imperative — masculine, unavoidable)
'Not sure which tour?' -> 'غير متأكد من الجولة المناسبة؟'  (participle — masculine, unavoidable)
```

So the shipped dictionary is mostly unmarked, and the marked forms are confined
to CTAs and direct questions. That distribution is the policy working, not a
compromise. Applied in `src/lib/ui.ts` (`const AR`); **do not re-decide per
string.**

---

## 3. Numerals — Western digits (0-9), corpus-wide

**Decision: Western/European digits everywhere. Never Arabic-Indic (٠-٩).**

Applies without exception to: elevations, prices, dates, distances, durations,
percentages, phone numbers, route numbers, and every other number on the site.

**Rationale**

1. **Every number here is a US fact the reader must match against something
   physical.** `$349` on a booking screen, `(435) 219-9447` on a phone keypad,
   `US-40` on a road sign, `13,528 ft` on a trail marker. A reader who sees
   `٣٤٩` and then a card charge of `$349` has to translate between systems at
   exactly the moment the site is asking them to trust it.
2. **Precedent on the same stack.** ParkingWay ships a live `ar/` route tree.
   Its rendered Arabic pages contain **zero** Arabic-Indic digit characters —
   `100 يورو`, `15%`, `24/7`, `2000` are all Western. That is an independent
   host reaching the same answer.
3. **Mixing is the actual failure mode.** Arabic-Indic digits are standard in
   Egyptian and Levantine print; Western digits dominate Gulf and essentially
   all digital commerce. Either is defensible; a corpus that uses both is not.
   The requirement was *one global policy*, and this is the one that never
   collides with a US-sourced fact.

### 3.1 ⚠ The half of this policy that translators cannot enforce

Machine-formatted numbers do not pass through the dictionary. `formatDate()` and
anything else built on `getIntlLocale()` hand the locale tag to `Intl`, and
**the tag alone decides the numbering system**:

```
'ar'    -> 28 يوليو 2026     numberingSystem: latn   ✔ policy satisfied
'ar-AE' -> 28 يوليو 2026     numberingSystem: latn   ✔
'ar-EG' -> ٢٨ يوليو ٢٠٢٦     numberingSystem: arab   ✘ policy violated site-wide
```

(Measured, not assumed — Node/V8 CLDR, 2026-07-28.)

`LocaleMeta.hreflang` doubles as that tag. So a future edit changing `ar` to
`ar-EG` — a change that looks like pure SEO regionalization, touches one line,
and would sail through every gate — silently converts every machine-formatted
number on the Arabic site to a numbering system this policy forbids. No
translated string changes; nothing greps differently.

This is recorded as an AR-2 backlog item (**B-3**), because the real defect is
that one field serves two consumers with different requirements. Arabic is the
first locale where they can disagree. Until it is split, the guard is the ⚠
comment on `LocaleMeta.hreflang` in `src/lib/i18n.ts`.

### 3.2 Currency and phone shape

- `$349`, `$1,000` — symbol **before** the numeral, verbatim as the English
  corpus writes it. Never `349$`, never `349 دولار` where the English shows a
  figure. The Latin-script `$` plus Western digits form one coherent run.
- `(435) 219-9447` — the US national format is preserved exactly. It is what the
  reader will dial and what appears everywhere else on the site. See §5.

---

## 4. Proper nouns — mixed strategy, decided by function

Neither "transliterate everything" nor "preserve everything". The dividing
question is **not** what kind of name it is, but: *will the reader have to match
this string against something in the physical world?*

### 4.1 Arabic — established exonyms, no wayfinding role

| English | Arabic | Why |
|---|---|---|
| Utah | يوتا | Established exonym; a state name, never read off a trail sign |
| Salt Lake City | سولت ليك سيتي | Established exonym |
| Denver | دنفر | Established exonym |
| Colorado | كولورادو | Established exonym |
| Rocky Mountains | جبال روكي | Established exonym |

### 4.2 Latin, verbatim — everything with a wayfinding or transactional role

`Vernal` · `Dinosaur National Monument` · `Moab` · `Flaming Gorge` ·
`Red Fleet` · `Steinaker` · `Ashley National Forest` · `Uintas` · `Kings Peak` ·
`Doc's Beach` · `Moonshine Arch` · `Outlaw Trail` · `Asphalt Ridge` ·
`Adventure Tours Vernal` · `Kawasaki KRX 1000` · `Google` ·
`UTV` / `ATV` / `Jeep`

An Arabic-speaking visitor navigates rural Utah on English signage, books
through an English system, and searches an English map. A transliterated
`فيرنال` is unsearchable, unmatchable against a road sign, and has no
established form to be consistent with.

**This deliberately diverges from `ja`,** which transliterated Vernal to バーナル
(1,679 occurrences, bare `Vernal` 0). That was the right call there: Japanese
convention katakanizes foreign toponyms as a matter of orthographic norm, and
the `ja` corpus was internally consistent. Arabic has no equivalent norm forcing
transliteration of names with no established form, so the wayfinding argument
wins uncontested. Recording the divergence here so it is not later "corrected"
into consistency with `ja`.

### 4.3 The consequence this creates on purpose

Rule 4.2 guarantees **Latin runs inside Arabic prose on every page**. That is not
an oversight to be cleaned up later — it is the reason bidi isolation is a
first-class concern for this locale rather than an edge case, and the reason the
pilot page was chosen for its number density rather than its brevity.

---

## 5. Punctuation and embedded Latin runs

### 5.1 Arabic punctuation in Arabic prose

`،` (U+060C) not `,` · `؛` (U+061B) not `;` · `؟` (U+061F) not `?`.
A Latin run keeps its **own internal** punctuation verbatim
(`Kawasaki KRX 1000`, `(435) 219-9447`, `Doc's Beach`); only the sentence-level
punctuation around it is Arabic.

### 5.2 Isolation — `<bdi>`, never invisible control characters

Directional runs are isolated with the **`<bdi>` element**. The AR-1 bidi
invariant forbids embedding `U+200E`/`U+200F`/`U+2066`–`U+2069` directly in
translated strings, and `<bdi>` satisfies it for the right reasons:

- it is a no-op in LTR context, so the same string is correct in any locale;
- it is **visible in a diff and greppable**, where an invisible control
  character is neither, and can be silently dropped by an editor, a CMS paste, or
  a well-meaning whitespace normalizer;
- it needs no runtime library (a stop condition if it had).

### 5.3 The concrete hazard this exists for

`(` U+0028 and `)` U+0029 have **`Bidi_Mirrored=Yes`**. Inside a right-to-left
paragraph the bidi algorithm renders them mirrored, so an unisolated

```
اتصل على (435) 219-9447
```

resolves its brackets the wrong way round against the surrounding Arabic. The
phone number is the site's most-repeated call to action, so this is the highest
-frequency bidi defect available on this corpus, and it is invisible to every
existing gate — the characters are all correct, only their *resolved order* is
wrong.

Note the split this creates with §4: `›` `‹` `»` `«` are **also**
`Bidi_Mirrored=Yes` and therefore need *no* action — the algorithm flips them
correctly and automatically. `→` (U+2192) is `Bidi_Mirrored=No` and keeps
pointing the wrong way. Which glyphs need work is a Unicode character property,
not a judgement call; see `scripts/audit/rtl-inventory.mjs`, which derives the
classification rather than listing it.

**Applied in AR-1:** `<bdi>` on `(435) 219-9447`, on `$1,000`, and on Latin
brand runs at a clause boundary, in the pilot page only.
**Deferred to AR-2 (B-1):** lifting this into a shared formatter so the shared
components (`SITE` NAP, `TourCta`, `TrustBadge`) isolate once for every locale
instead of per page.

---

## 6. What this policy does *not* decide

Deliberately out of AR-1 scope, listed so their absence is not read as an
oversight:

- Arabic **plural/dual agreement** in interpolated counts beyond the two strings
  that carry `{n}` today. Both were phrased to stay grammatical for any value
  (`حتى {n} من الركاب`, `{n} ميل`); a corpus with more counters will need a rule.
- **Sentence-level style** for long-form spoke prose — paragraph rhythm, heading
  case, list voice. There is no Arabic long-form corpus yet to be consistent with.
- **Native-speaker review.** Nothing in AR-1 has been read by a native speaker.
  This is the same open item that `de`, `ja` and `zh` carry, and it gates release
  the same way.
