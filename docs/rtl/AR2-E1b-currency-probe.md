# AR-2 Track E, E-1b — the currency probe

**METHOD citation:** rules 1 · 3 · 4 · 8 · 11 · 18 (`docs/framework/METHOD.md`).

**Status:** complete. **Baseline:** `7a2c74f` (E-1), `dist/` unchanged, tree clean.
**Instrument:** [`scripts/rtl/measure-currency.mjs`](../../scripts/rtl/measure-currency.mjs) (new, repo-resident).

This record is **deliberately separate from the B-15 decision**
([`AR2-B15-decision.md`](AR2-B15-decision.md)). It answers the question E-1 §3.4 filed and
declined to answer, and it is filed as a measurement whether or not it agrees with any
design. It happens to bear on B-15; it was not run to support it.

---

## 1. The question, and why no existing instrument answers it

E-1 left `$349` and `$125` bare in the Arabic FAQ answers and recorded that gate 4n was
**correctly** silent about them: 4n's detector is `\p{Bidi_Mirrored}`
([`scripts/lib/bidi-isolation.mjs`](../../scripts/lib/bidi-isolation.mjs)), and `$` is
`Bidi_Mirrored=No`. ADR-10's invariant is about characters that flip shape. The dollar
sign does not flip shape — it **moves**, and no gate in this repository measures position.

So the question — *does `$349` resolve correctly beside Arabic?* — was not merely
unanswered. It was outside the measurable surface of the whole gate series. E-1 named the
instrument it needed and did not run it, to keep that milestone about registration.

---

## 2. The instrument

Per-character visual x-positions read from `Range.getClientRects()` over the built tree.
A run's **visual** order is its characters sorted by x; its **logical** order is source
order. They agree iff the run was laid out left-to-right. The script codes no expectation
for any run — the same discipline `measure-carousel.mjs` states for the carousel.

### 2.1 Two readings had to be thrown out, and finding out why changed the instrument

The first run reported the pilot page's `.page-summary` phone number as scrambled. It is
not: that element is visually hidden at `width:1px; overflow:hidden`, so every character
wraps onto its own line and the x-order describes **a 1px column, not the bidi**. The
JSON-LD `<script>` occurrences likewise have no boxes at all.

Both are the recurring shape of this project (rule 18): *a measurement window that does not
hold the thing being measured.* The shipped instrument therefore classifies every run as
`measurable` or not — every character must have a box, and all boxes must share a baseline
— and reports the reason instead of a verdict. **A reading that cannot be taken is not a
reading that came out clean.** 2 of the 12 corpus readings are excluded on this basis and
are shown below with their reason rather than suppressed.

### 2.2 Controls

Synthetic nodes injected into the live document (runtime DOM only; `dist/` untouched),
reported in their own section so they can never be mixed with corpus readings:

| Control | Shape | Purpose |
|---|---|---|
| `neg-phone` | bare `(435) 219-9447` after Arabic | **negative** — B-2 §1.3 established this is broken |
| `pos-phone` | the same, inside `<bdi>` | **positive** — B-2 §3.2 asserts this is correct |
| `neg-price` | bare `$349` after Arabic | the case under test, staged |
| `pos-price` | the same, inside `<bdi>` | its isolated counterpart |
| `neg-price-initial` | bare `$125` at paragraph start, **no preceding Arabic** | added after the first run — see §4 |

All five discriminated. The negative controls came back broken and the positive controls
came back clean, so the green readings in the same run are citable.

---

## 3. ⚠ The finding — the bare prices render wrong, and they are live

Route `/ar/utv/best-utv-trails-vernal/`, `html[dir]=rtl`, 12 corpus readings:

| Run | Where | Isolated | Logical | **Visual** | |
|---|---|---|---|---|---|
| `(435) 219-9447` | `bdi < a.nav-phone` | ✔ | `(435) 219-9447` | `(435) 219-9447` | ✔ |
| `(435) 219-9447` | `bdi < a < div.article-tip` | ✔ | `(435) 219-9447` | `(435) 219-9447` | ✔ |
| `(435) 219-9447` | `bdi < a.footer-phone-link` | ✔ | `(435) 219-9447` | `(435) 219-9447` | ✔ |
| `$349` | `bdi < p.page-summary` | ✔ | `$349` | `$349` | ✔ |
| `$349` | `bdi < p < div.article-body` | ✔ | `$349` | `$349` | ✔ |
| `$125` | `bdi < p < div.article-body` | ✔ | `$125` | `$125` | ✔ |
| **`$349`** | **`div.faq-answer`** | **✘** | `$349` | **`349$`** | **✘** |
| **`$125`** | **`div.faq-answer`** | **✘** | `$125` | **`125$`** | **✘** |
| `$349` | `p.tour-cta-details` | ✘ | `$349` | `$349` | ✔ — see §4 |
| `(435) 219-9447` | `bdi < p.page-summary` | ✔ | — | not measurable | wraps across 3 lines (§2.1) |
| `$349` / `$125` | `script` (JSON-LD) | — | — | not measurable | no boxes — not rendered |

**The dollar sign is rendering on the wrong side of its digits, twice, on the live Arabic
page.** A reader sees `349$` and `125$` where the source says `$349` and `$125`.

### 3.1 The mechanism, and what it confirms

`src/lib/bidi.ts` predicted this in prose when `currencyDisplay` was written — *"N2
resolves it to paragraph direction and the symbol moves to the wrong side of its digits."*
That claim had never been measured. It is now, and the derivation is worth stating because
the intuitive one is wrong:

1. `349` is `EN`. UBA **W2** retypes `EN` → **`AN`** when the last strong type is `AL`
   (an Arabic letter). After `هي`, it does.
2. **W5** — *"a sequence of European terminators adjacent to European numbers changes to
   all European numbers"* — would have absorbed the `$` (`ET`) into the number. It **does
   not apply**, because after W2 the digits are no longer `EN`.
3. **W6** therefore retypes the orphaned `$` → `ON`.
4. **N1/N2**: a neutral flanked by `R` on one side and `AN` (which resolves as R for this
   purpose) on the other takes paragraph direction — `R`, level 1 — while the digits stay
   at level 2.

The `$` ends up in the RTL run and the digits form an LTR island beside it. `349$`.

**The trap is W2.** Reason forward from "`$` is ET, ET adjacent to EN becomes EN" and you
predict this renders correctly. It is the same shape as AR-1 §0.1 and B-2 §1.1 — *derive
it from the Unicode algorithm, not from the character's own property* — with the twist
that here even the character's own property is a red herring, because an **earlier rule
changed its neighbour**.

---

## 4. The defect is conditional, and a source-side census would misclassify it

`p.tour-cta-details` carries a **bare** `$349` that renders **correctly**. The reason is
visible in the rendered markup: it is paragraph-initial —
`<p class="tour-cta-details"> $349/machine &middot; 3 ساعات …` — so there is no preceding
Arabic strong type, W2 never fires, and the W5 path holds after all.

The `neg-price-initial` control was added to test exactly that and reproduces it: a bare
`$125` at the start of a paragraph renders `$125`; the same literal after Arabic renders
`125$`.

> **A bare `$NNN` in an Arabic document is broken or fine depending on the last strong
> character before it.** Grep cannot see that, and neither can any window this repository
> currently extracts. Any future census of this class must be taken on the **rendered
> page**, not on the source — the same conclusion C7 reached for `zh` seams, arrived at
> from an unrelated direction.

---

## 5. What this does and does not settle

**Settles.** The E-1 §3.4 open measurement, with a defect rather than a clean bill. Two
live rendering defects on the only Arabic prose route, invisible to all eleven gates.
`currencyDisplay`'s justification, previously reasoned, is now measured.

**Does not settle.** Whether `<bdi>` is the right remedy *here* — that is B-15's question
and this file takes no position on it. The probe measured that isolation works
(`pos-price`), not that the FAQ path should deliver it.

**Not measured.** Glyph mirroring itself. CDP exposes boxes, not rendered glyphs, so this
instrument observes *position* and says nothing about whether a `(` is drawn as `)`. The
negative control's `9447-219 )435(` shows the brackets swapping **position**; that they
also swap **shape** is B-2's claim from the Unicode property, not this file's from
measurement.

---

## 6. Raised

**B-17 — no gate perceives a displaced neutral.** 4n covers mirrored characters at a
direction change and is scoped correctly. The class measured here — a neutral that changes
side because W2 retyped its neighbour — is a different defect with a different detector,
and it currently ships unobserved. The instrument now exists; a gate does not. Filed in
the backlog, deliberately **not** built here: E-1b's scope was one measurement, and a
gate is a decision about blocking policy that belongs with the owner.

**Reproduce:**

```
node scripts/rtl/measure-currency.mjs                # exit 0, readings on stdout
node scripts/rtl/measure-currency.mjs --json out.json
```
