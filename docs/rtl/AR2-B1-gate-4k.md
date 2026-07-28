# AR-2 B-1 — Gate 4k: direction integrity

Closes the largest gap AR-1 handed to AR-2. Scenarios **S3** (missing `dir`) and **S4**
(suppressed `dir`) move from **BLIND** to **COVERED**.

Gate 4k validates document direction **structurally**. It reads direction metadata and
document structure, and nothing else. A page it passes may still be visually broken; see
§8.

---

## 1. What shipped

| | |
|---|---|
| `scripts/gate-4k-direction.mjs` | 299 lines. `dist/`-reading, **blocking**, wired into `npm run build`. |
| `host-manifest.json` | `locales.registry.directionField: "dir"` |
| `scripts/lib/host-manifest.schema.json` | `directionField`, optional, on the `codeField` precedent |
| `scripts/lib/host-manifest.mjs` | validator accepts and type-checks it |
| `scripts/lib/host-adapter.mjs` | `host.direction` — the resolver, `HostDirectionError`, `DIRECTIONS` |
| `package.json` | `gates:dist` + `gate:4k` |

149 insertions across 5 files, plus the gate. No component, layout, stylesheet or route
template was touched. **The Arabic pilot page renders exactly the bytes it rendered before.**

---

## 2. The design decision — *effective* direction, not the attribute

This is the whole gate, and it was forced by a measurement taken before a line was written.

```
adventureastro    619 LTR pages with NO dir attribute   +   1 × dir="rtl"
parkingwayastro   133 pages with an EXPLICIT dir="ltr"  +  12 × dir="rtl"
```

`BaseLayout.astro:49` reads `const dir = isRtl(lang) ? 'rtl' : undefined`, so an LTR page
on this host emits no `dir` at all. ParkingWay's layout emits one on every page. **Both are
correct.** `dir` is an enumerated attribute whose missing-value default on the root element
is `ltr`, so a page has a direction whether or not it says so.

A gate that required an explicit `dir` would fail all 619 pages of this host. A gate that
forbade `dir="ltr"` would fail all 133 of the other. The only proposition both hosts can be
held to is the one a reader actually experiences:

> **effective direction** = the root element's `dir` if it carries one, otherwise `ltr`
> — and it must equal the direction the locale declares.

That formulation is what makes S3 and S4 fall out as the same check rather than two:

| Locale declares | Page renders | Effective | Verdict |
|---|---|---|---|
| `ltr` | no `dir` | `ltr` | ✔ (619 pages here) |
| `ltr` | `dir="ltr"` | `ltr` | ✔ (133 pages on ParkingWay) |
| `ltr` | `dir="rtl"` | `rtl` | ✖ |
| `rtl` | no `dir` | `ltr` | ✖ **S3** |
| `rtl` | `dir="ltr"` | `ltr` | ✖ **S4** |
| `rtl` | `dir="rtl"` | `rtl` | ✔ |

The attribute's *form* is still measured — it is printed on every green run — but it never
blocks. Blocking on form would be the gate inspecting implementation strategy, which its
own contract forbids. See §7.3 for what the form measurement found.

---

## 3. Where the declared direction comes from

`LOCALES[].dir` — the same field `BaseLayout` reads. Not a copy of it.

The manifest points at the registry rather than restating it, via a new
`locales.registry.directionField`, exactly parallel to the existing `codeField`:

```json
"registry": {
  "module": "src/lib/i18n.ts",
  "binding": "LOCALES",
  "codeField": "code",
  "directionField": "dir"
}
```

**Why not `locales.entries[code].dir`.** That section's own `$doc` states the rule: *"the
host's own registry is the source of truth; `entries` adds only the framework facts the
host registry does not carry."* Direction is carried. A `dir` in `entries` would be a second
source checked against nothing, and the gate would then be verifying the framework's
transcription of the fact instead of the fact — passing a page whose layout disagreed with
both. It also keeps the field under the manifest's declarative discriminator: swapping the
adapter from AST to regex would not change one character of it.

**There is no default, and that is load-bearing.** A host that declares no `directionField`
is *refused* when asked for direction (exit 2), never answered `ltr`. Answering would make
the gate approve an RTL locale rendering left-to-right by agreeing with its own invention —
precisely the defect it exists to catch. Same reasoning the manifest already applies to
`routes.entryPoint`.

**`auto` is rejected from the vocabulary.** It is HTML-legal and means "infer direction per
document from the first strong character", which is the opposite of a declared direction. A
locale whose direction is inferred has nothing for a gate to check a page against.

**Resolution is lazy; validation is eager-once.** Gates 4f–4j resolve the same host and have
no business with direction, so an undeclared `directionField` must not break them at
`resolveHost()`. The refusal happens on *ask*. Once asked, every locale is validated
together — a partial answer is how one locale silently loses its direction.

---

## 4. What the gate checks

The six invariants in the brief, plus one bounded addition:

| | Check | Verdict |
|---|---|---|
| 1 | root `dir` (or its absence) matches `LOCALES[].dir` | blocking |
| 2 | every locale renders exactly one effective direction | blocking (implied by 1, reported per locale) |
| 3 | no LTR locale renders `rtl` | blocking |
| 4 | no RTL locale renders `ltr` | blocking |
| 5 | no page omits direction where the locale declares RTL | blocking |
| 6 | direction originates only from locale metadata | blocking where it *disagrees*; see §8.1 |
| + | exactly one `<html>`, carrying at most one `dir`, whose value is `ltr`/`rtl` | blocking |
| + | no `<body dir>` contradicting the root | blocking |

**On the `<body>` addition.** It is beyond the six listed checks and is included
deliberately: `<body dir>` is the only other element that re-establishes direction for the
*entire* rendered document, so a `<body>` contradicting a correct `<html>` is a direction
defect, not a layout opinion. Scope stops there — no descendant element is read, which is
where B-4 (per-option `dir` on the language switcher) begins and this gate ends. Measured
before including it: **zero** `<body dir>` in either host's corpus today, so it costs
nothing and forecloses a silent inversion.

**Why the root element is scanned, not DOM-parsed.** The question is which attributes were
*written*. A tolerant parser answers a different one — browsers silently drop a duplicate
`dir` and normalise a malformed tag, so a page that parses cleanly can still have shipped
two contradictory declarations. Perturbation M4 is exactly that case.

Findings are grouped by locale on output: 77 pages of one locale is one defect in a shared
layout, and printing it 77 times buries the second locale under the first.

---

## 5. Bootstrap

Baseline captured at `c4a6f2f` (AR-1 milestone), against the 620-page build.

### 5.1 Determinism

Three consecutive runs, `cmp`-compared: **byte-identical.**

### 5.2 Existing gates are byte-identical

Captured with the changes applied, then again with `scripts/lib/*` and `host-manifest.json`
stashed, and compared. Not remembered numbers — two real runs of each:

| | Before | After | |
|---|---|---|---|
| `validate-site` | ✔ 620 pages | ✔ 620 pages | byte-identical ✔ |
| gate 4f | ✔ 14404 headings / 8 locales | ✔ 14404 / 8 | byte-identical ✔ |
| gate 4g | ✔ 42777 anchors, 277 identities, 85 candidates | identical | byte-identical ✔ |
| gate 4h | ✔ 540 pages, 1922 locked phrases | identical | byte-identical ✔ |
| gate 4i | ✔ 52 locks / 8 locales, 20 anchors, 3 advisory | identical | byte-identical ✔ |
| gate 4j | ✔ 840 entries, 8 gallery locales, `"ar"` exempt | identical | byte-identical ✔ |
| `astro check` | 0 errors, 0 warnings, 268 hints | 0 / 0 / 268 | ✔ |
| Rendered pages | 620 | 620 | ✔ |

### 5.3 The baseline 4k reports

```
gate-4k: ✔ 620 pages across 9 locales — every page renders its declared direction; 1 rtl locale(s): "ar"
         en  ltr    80 pages  (80 implicit)
         es  ltr    77 pages  (77 implicit)
         it  ltr    77 pages  (77 implicit)
         pt  ltr    77 pages  (77 implicit)
         fr  ltr    77 pages  (77 implicit)
         de  ltr    77 pages  (77 implicit)
         ja  ltr    77 pages  (77 implicit)
         zh  ltr    77 pages  (77 implicit)
         ar  rtl     1 pages  (1 explicit)
```

The per-locale shape is printed **on success**, on the same reasoning gate 4j prints its
exemption set: a corpus fact nobody reads is how a silent change becomes invisible. A locale
switching from implicit to explicit `dir` is not a defect and must not block — but it means
a different path now builds the root element, and it should be visible in the diff of a
green run.

**No live defect found.** 4k is therefore wired into `build` immediately, unlike 4h and 4i,
which are still unwired because each found a real defect on the shipped corpus.

---

## 6. Fail-closed matrix

Rows M1–M9 ran against a **copy** of `dist/` and a **copy** of the locale registry inside
the session scratchpad, addressed by a scratch manifest. The repository was never modified.
R1–R2 required real source edits and full rebuilds; both were restored and verified with
`git diff` (§6.3).

Every failure names **route, locale, declared direction, rendered direction**.

### 6.1 Rendered-output and host-declaration perturbations

| # | Perturbation | Exit | What the gate said |
|---|---|---|---|
| **M1** | missing `dir` on the RTL page — **S3** | **1** | `/ar/cancellation-policy/` · `ar` · declared `rtl` · rendered `ltr` *(no dir attribute on `<html>`, which reads as ltr)* |
| **M2** | opposite `dir`, RTL rendered LTR — **S4** | **1** | same route · declared `rtl` · rendered `ltr` *(`<html dir="ltr">`)* |
| **M3** | LTR locale rendered RTL | **1** | `/zh/` · `zh` · declared `ltr` · rendered `rtl` |
| **M4** | duplicate `dir` on the root | **1** | *"carries 2 dir attributes (`"rtl"`, `"ltr"`) — a parser keeps the first and drops the rest, so the page ships a direction no reader can predict"* |
| **M5** | `dir="auto"` | **1** | *"is not a declared direction — expected ltr or rtl. `auto` defers direction to the bidi algorithm per document, so the locale's declaration is not what renders"* |
| **M6** | `<body dir="ltr">` over a correct root | **1** | *"`<html>` establishes rtl and `<body dir="ltr">` overrides it — the rendered document reads ltr"* |
| **M7** | host declares no `directionField` | **2** | *"…names no `directionField`, so `i18n.ts` cannot be asked which way a locale reads — refusing to pass silently."* |
| **M8** | registry declares `dir: 'auto'` | **2** | *"1 locale(s) carry no legal direction: `"ar"` (`"auto"`) — expected one of ltr, rtl"* |
| **M9** | registry says `de` is RTL, output still LTR | **1** | 77 `de` pages, grouped: first route in full, then the rest listed as one locale-wide defect |

Baseline re-checked green after restore.

### 6.2 The two that needed a rebuild

**R1 — a locale's direction changes, and nothing else does.** Flipped `de` to `dir: 'rtl'`
in `src/lib/i18n.ts` — one line, no other edit — and rebuilt:

```
77 <html lang="de" dir="rtl">
gate-4k: ✔ 620 pages across 9 locales — …; 2 rtl locale(s): "de", "ar"
         de  rtl    77 pages  (77 explicit)
```

All 77 pages followed the registry with no component, layout or stylesheet change. This is
the framework invariant *"changing locale direction changes rendered direction
automatically"* demonstrated rather than asserted — and 4k tracking it rather than needing
its own update.

**R2 — a locale-code branch overriding the metadata.** Changed `BaseLayout.astro:49` to

```js
const dir = lang === 'ar' ? undefined : (isRtl(lang) ? 'rtl' : undefined);
```

and rebuilt. This reproduces AR-1's S3 through the mechanism the framework invariant
forbids. Every other check on the perturbed build:

| | |
|---|---|
| `validate-site` | exit 0 |
| gate 4f · 4g · 4h · 4i | exit 0, 0, 0, 0 |
| **gate 4k** | **exit 1** — `/ar/cancellation-policy/` · `ar` · declared `rtl` · rendered `ltr` |

**Gate 4k is the only thing in the repository that catches it.** That is the AR-1 result
reproduced under controlled conditions and then closed.

### 6.3 Restoration verified

`git checkout -- src/layouts/BaseLayout.astro src/lib/i18n.ts`, `BaseLayout.astro:49`
confirmed back to `const dir = isRtl(lang) ? 'rtl' : undefined;`, `git status` showing only
the intended B-1 changes, and a final clean rebuild of 620 pages.

---

## 7. Cross-host report — ParkingWay

**Read-only.** ParkingWay is a separate workstream; nothing was written to it. Its scratch
manifest lives in the session scratchpad, not in that repository, and points at it via
`project.root`. Its working tree carries pre-existing modifications from that other
workstream — untouched, and unrelated to this phase.

The gate ran **unmodified**.

```
gate-4k: ✔ 134 pages across 11 locales — every page renders its declared direction; 1 rtl locale(s): "ar"
         it  ltr    14 pages  (13 explicit + 1 implicit)
         en  ltr    12 pages  (12 explicit)
         de  ltr    12 pages  (12 explicit)
         …
         ar  rtl    12 pages  (12 explicit)
         ⚠ 1 locale(s) render direction in both forms: it — the direction is correct in both; two shapes mean two paths to <html>
```

### 7.1 Why this host is worth running

It differs from adventureastro on every axis the adapter abstracts, and the gate needed no
branch for any of it:

| | adventureastro | parkingwayastro |
|---|---|---|
| Locales | 9 | 11 |
| Default locale | `en` | **`it`** |
| Registry | `src/lib/i18n.ts` | **`src/data/i18n.ts`** |
| Rendered root | `dist` | **`dist/client`** (SSR build) |
| LTR emission | **no `dir` attribute** | **explicit `dir="ltr"`** |
| RTL corpus | 1 page | **12 pages** |

### 7.2 The independent RTL corpus

12 Arabic pages, all `<html lang="ar" dir="rtl">`, all matching a registry that declares
`ar` RTL. This is the first time the direction contract has been checked against an RTL
corpus this framework did not produce, and it holds without adjustment.

### 7.3 One real structural finding, correctly not a block

The mixed-form advisory fired on `it` and located `dist/client/admin/index.html`:

```
<html lang="it" data-astro-cid-u2h3djql>      ← the only page on that host with no dir
```

Every other page routes through `BaseLayout`, which emits `dir` unconditionally; the admin
page does not. Its locale is `it`, declared `ltr`, so its effective direction is `ltr` and
it is **correct** — but it proves there are two paths to `<html>` on that host, one of which
would ship no direction if an RTL locale ever reached it. Exactly the class of latent defect
the advisory channel exists to surface, reported without a false block.

**Structural findings only.** No layout was compared, as instructed.

---

## 8. Honest limits

### 8.1 What "one source of truth" can and cannot be proven from rendered output

The gate proves a second direction source **that lies** — on every page it touches, and
grouped so a shared-layout defect reads as one finding. It **cannot** prove a second source
does not exist: a `lang === 'ar' ? …` branch that happens to return the registry's own
answer is invisible in rendered output, and correctly so under the gate's own contract
("verify rendered truth, not implementation strategy").

That direction of the invariant is closed by **R1** instead — the substitution test. If
rendered direction follows a one-line registry change with no other edit, the registry is
in fact the source. A gate run proves it stayed true for this build; R1 proves it *is* true
of the mechanism. Neither substitutes for the other, and this is the same division AR-2 B-0
recorded: **the gate proves the declaration is well-formed; the substitution proves it is
what renders.**

### 8.2 What 4k does not see

It reads document structure. It does **not** read CSS logical properties, mirrored layout,
flex ordering, arrow glyphs, bidi isolation, mirrored punctuation, or numbering systems.
**A page that passes gate 4k may be visually broken.** Those remain open as B-2, B-5, B-6,
B-7 (layout and bidi) and B-10 (numerals), and they are a different kind of check — they
need a browser or a Unicode property table, and they measure appearance rather than a
declared contract. No stop condition fired: nothing in this phase required visual
inspection, DOM-level bidi analysis, CSS coupled to locale identity, or runtime JavaScript.

### 8.3 Scope of the corpus

Every rendered page is scanned, including `404.html`. `routes.exempt` names routes outside
the *linked* corpus, which is a reachability fact and has no bearing on direction — a 404
page still renders in a direction. Pages that resolve to no registered locale are counted
and reported rather than skipped in silence; on both hosts that count is zero.

---

## 9. Direction-blind inventory — updated

`AR1-gate-characterization.md` §2 recorded **10 of 10 gates would pass a visually broken
RTL page**. That is now **10 of 11**, and the sentence needs its qualifier read carefully:
4k closes *structural* direction, not visual correctness. Its own row:

| Gate | Kind | RTL-aware? | Would it pass a visually broken RTL page? |
|---|---|---|---|
| **4k** direction | script, **blocking** | **Yes — it is the only direction-aware gate** | **Yes** — see §8.2; it reads structure, not appearance |

Both columns matter. 4k is the first gate that perceives direction at all, and it would
still pass a page whose carousel runs backwards. Recording only the first half is how a
green suite starts reading as "RTL works".

Matrix rows S3 and S4 move **BLIND → BLOCK**, with the responsible field named:
`LOCALES[].dir` in `src/lib/i18n.ts`, reached through
`locales.registry.directionField`.

Still **BLIND**: S5 (proper-noun drift in body prose, B-11) and S6 (numbering systems,
B-10). Unchanged by this phase.

---

## 10. Follow-on

- **ADR-9 — written, as a separate docs-only commit after this phase.**
  [`0009-registry-indirection-over-manifest-duplication.md`](../framework/adr/0009-registry-indirection-over-manifest-duplication.md).
  §3's decision — direction is a *registry pointer*, never a manifest copy, and a dangling
  pointer refuses rather than defaults — turned out to be the fourth application of a rule
  four shipped manifest sections already follow. The ADR states the discriminator (*does an
  artifact inside the host already own this fact?*), which is sharper than "never
  duplicate" and is what permits `entries[code].role` and `routes.output` while forbidding
  `entries[code].dir`. It also records a live violation of itself: `script` is declared in
  three gate configs in two incompatible vocabularies.
- **B-8 / B-9 are unaffected.** 4h's missing Arabic connective branch and 4i's missing
  Arabic script case are still open and still unreachable.
- **B-2 (bidi isolation) is now the highest-value item**: it is the one remaining defect
  that ships visibly wrong on a page 4k calls green, and ParkingWay confirms it ships live.
