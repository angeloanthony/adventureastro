# V-1 — YouTube facade

Brief, not a completion report. Nothing in this document has been implemented.

Three commits by construction, on B-2's ordering: **V-0** measures and fixes what the
measurement finds; **Phase A** introduces the component and changes no rendered bytes;
**Phase B** migrates callers. No commit both changes the contract and moves the corpus.

> **Guiding principle, applied literally:** measure → abstract → migrate. §1 was taken
> before a line of the component was written, and it overturned three assumptions the
> originating review was built on.

---

## 1. The census

### 1.1 The corpus is 30 videos, not 303 iframes

| | |
|---|---:|
| `<iframe>` tags in `src/` | 303 |
| YouTube embed URLs in `src/` | 295 |
| **Distinct video IDs** | **30** |
| Rendered embeds in `dist/` | 295 |
| **Rendered pages carrying ≥1 embed** | **32 of 620** |
| Pages carrying zero | **588** |

The 303 figure is an artefact of counting tags. The eight non-YouTube iframes are maps and
unrelated. 295 URLs across 30 IDs is 8 locale blocks × the same page bodies — the duplication
is locale duplication, which is why this is a component problem and not an editing problem.

### 1.2 The load is concentrated on four page families

Per locale, and identical across all eight LTR locales:

| Route | Total | Background loop | On-demand |
|---|---:|---:|---:|
| `/utv/` | 24 | 2 | **22** |
| `/about/` | 7 | 1 | 6 |
| `/` (home) | 5 | 1 | 4 |
| `/guides/moab-utv-tours/` | 1 | 1 | 0 |
| **per locale** | **37** | **5** | **32** |
| **× 8 locales** | **296** | **40** | **256** |

`ar` carries none — it has one route (`/ar/cancellation-policy/`), and it is not one of these
four. **V-1 is orthogonal to AR-2.** It cannot regress gate 4k, and 4k cannot constrain it.

### 1.3 The three assumptions the review got wrong

**The hero is not the win.** 40 of 296 embeds are background loops; **256 are on-demand
carousel slides**, and 22 of those sit on `/utv/` alone — the commercial page. A hero-only
fix addresses under 14% of the embeds. The carousels are the phase.

**`loading="lazy"` is not already solving the carousel.** Every slide in the Doc's Beach
track is laid out in a horizontal row inside the viewport band. Lazy loading defers what is
*below* the fold, not what is *beside* it. This is asserted from the layout, not measured —
see §5.

**A facade already exists, hand-rolled, and the census missed it on the first pass.** The
homepage hero is already click-to-load: `home.ts` renders
`<img src="https://img.youtube.com/vi/eFfvKxkiyzU/maxresdefault.jpg">` and injects the player
from an inline `<script>` on click — duplicated across all 8 locale blocks. So V-1 is not
introducing the pattern; it is **consolidating an existing one and fixing it**. That poster
uses `maxresdefault`, which §2 forbids for exactly the reason it is invisible here: if that
upload has no maxres, YouTube serves a 120×90 grey placeholder rather than a 404, and the
hero degrades silently. ⚠ **Unverified — checking it requires a network fetch nobody has
made.** First thing to confirm in Phase B.

**A Play-button facade is wrong for 40 of them.** The background loops are
`autoplay=1&mute=1&loop=1&controls=0` — decorative, no user ever clicks them. They need a
poster that *is* the LCP element with the loop swapped in after load, which is a different
mechanism from a click-to-play facade. One component, two modes; not one pattern applied
twice.

### 1.3a YouTube is not the only provider — found by the baseline, not the census

Measuring third-party hosts surfaced two things the embed-URL census could not, because it
was looking for YouTube:

| | |
|---|---|
| **`nps.gov` video, 8 pages** | `<iframe src="https://www.nps.gov/media/video/embed.htm?id=CD297DBD…">` on every homepage. A **third video provider**, and **gate 4m does not see it** — 4m's extractor is YouTube-shaped by construction (§6.1.2). Its baseline is therefore complete for YouTube and silent about NPS. Recorded as a known limit, not patched reflexively: widening 4m to "any video iframe" is a scope decision, not a bug fix. |
| **`player.vimeo.com/api/player.js`, 8 pages** | Loaded on every homepage. **There are zero Vimeo embeds in the corpus** — `player.vimeo.com/video/` count is 0. It is a dead third-party script on the site's most important page, deletable with no behaviour change. Not deleted here; it belongs to no phase yet and would be an opportunistic edit. |

The homepage therefore boots 5 YouTube players, 1 NPS video iframe, and one player API for a
provider it does not use.

### 1.4 What the census found: a live cross-locale defect

Seven of the eight locale blocks in [`utv.ts`](../../src/page-content/utv.ts) carry video
`LsqbwVkwrbw`. The `zh` block does not.

```
dist/utv/index.html      24 embeds
dist/zh/utv/index.html   23 embeds   <- LsqbwVkwrbw absent
```

Same class as D1 and C11: silent per-locale drift inside a duplicated block, invisible to
every existing gate because no gate perceives media. Recorded here, fixed in **V-0**, ahead
of any refactor — a migration must not be the thing that repairs it, or the repair hides
inside the diff.

---

## 1.5 Two measurement lessons, generalized — carry these into Phase B

Both defects V-0 found were invisible to a *reasonable* measurement and visible to a slightly
different one. They are the same failure in two dresses, and neither is about video.

> **Measure by observed host, not by expected provider.**
>
> The census asked "where are the YouTube embeds" and got a complete, correct answer to that
> question. It could not report the NPS video or the dead Vimeo API, because it never asked
> what the page *actually contacts*. The host list is cheap and it is exhaustive:

| Third-party host | What it is | Pages |
|---|---|---:|
| `www.youtube.com` | video players | 32 |
| `img.youtube.com` | facade thumbnails (§1.3a) | 8 |
| `www.googletagmanager.com` | GA4 | 620 |
| `fonts.googleapis.com` | webfonts | 620 |
| `www.nps.gov` | **video embed on 8, not seen by 4m**; plain links on 8 more | 16 |
| `player.vimeo.com` | **dead — no embeds exist** | 8 |

Six hosts is the entire third-party surface of the site, and two of the six were news. The
same question generalizes past video with no adaptation — fonts, maps, tag managers, chat and
payment widgets are all found by asking what the page contacts rather than what you expect it
to contact. **Re-run the host census in Phase B**, not just the video census: a facade that
removes `www.youtube.com` from the critical path but leaves five other hosts has moved less
than the YouTube numbers suggest.

> **Classify by behaviour, not by presentation.**
>
> `tour-book-btn` is a phone link 16 times ([`V0-analytics-contract.md`](V0-analytics-contract.md) §1.2).
> A class name records what an author *meant* at the moment they typed it; a destination
> records what the thing *does*. When the two disagree the class is wrong and the code still
> looks right, which is why the error survives review and shows up as plausible data.

The shared shape: **the key you measure by decides what you are able to see.** A wrong key
does not fail loudly — it returns a clean, complete-looking answer to a question nobody meant
to ask. Every count in §1 and §6.2 should be read as "true for the key it was measured by".

---

## 2. The contract

**One invariant.** The component owns YouTube embedding. No `page-content` block, `.astro`
file or `.mdx` body writes `<iframe src="…youtube.com/embed/…">` directly. A caller names a
video and a mode and receives an embed.

**Two modes, named at the call site.** `facade` (click-to-play; thumbnail, no player until
activated) and `ambient` (background loop; poster, player swapped in after load). The mode is
the caller's — it is a content decision — but the mechanism behind each is the component's.
`ambient` deliberately renders **no play affordance**; a background loop that advertises
itself as clickable is a worse defect than the bytes it saves.

**Thumbnails.** `hqdefault.jpg` for `facade`, from `i.ytimg.com`. **Not `maxresdefault`** —
it is absent for some uploads and YouTube answers with a 120×90 grey placeholder rather than
a 404, so the failure is invisible and uncatchable client-side. `ambient` posters are
**self-hosted**, because they are LCP candidates and an LCP element must not depend on a
third-party host that is not preconnected.

This settles the *poster image* only. It decides nothing about whether the ambient **video**
stays on YouTube — that is §7.2, and it stays open on purpose.

**No preconnect in `<head>`.** `dns-prefetch` + `preconnect` are injected on first hover or
focus, per the review. This is the one point where the review's advice is adopted unchanged.

**Aspect ratio reserved at author time.** `aspect-ratio: 16 / 9` on the container, before any
load, so the swap contributes no CLS in either mode.

**Chrome strings are chrome.** The `facade` `aria-label` goes in
[`src/lib/ui.ts`](../../src/lib/ui.ts) for all locales — 8 that render embeds, plus `ar` for
key-set parity. A literal string in the component is a Gate 4a failure by construction. Both
halves of 4a apply: key-set diff *and* a rendered-output English scan.

---

## 3. Phasing

### V-0 — measure and repair — **items 1–3 COMPLETE 2026-07-28**

| | Status |
|---|---|
| 1. Repair the `zh` drift | ✔ `LsqbwVkwrbw` restored; all 8 blocks at 21 slides; diff is one hunk inside `const ZH` |
| 2. Baseline for 4m | ✔ `i18n-gates/4m-media.json`, 32 pages, frozen **after** the repair |
| 3. Build gate 4m | ✔ `scripts/gate-4m-media.mjs`, wired into `gates:dist`, 14/14 scratch cases |
| 4. Instrument the booking funnel | ✔ `b3d03a7` — `booking_click` + `phone_click`, contract at [`V0-analytics-contract.md`](V0-analytics-contract.md); coverage 1,801 phone + 3,139 booking, 0 unmatched |
| 5a. Laboratory baseline | ✔ `docs/perf/V0-baseline.json`, produced by `scripts/perf/page-weight.mjs` |
| 5b. Field baseline | ✘ **outstanding** — §6.2.2, needs a deployed site and a human |

⚠ **V-0 is complete except 5b.** The conversion window is closed safely: instrumentation
ships, so the pre-migration baseline is accumulating from 2026-07-28. What remains is
contextual evidence, not a prerequisite that expires.



1. Fix the `zh` `LsqbwVkwrbw` gap (§1.4). One slide, one locale block.
2. Take the byte/timing baseline §5 says is missing, on `/utv/` and `/zh/utv/`.
3. **Build gate 4m and commit its baseline** (§6.1.2). It has to exist before Phase B, or it
   ratifies the migration's own output as correct. Fixing (1) first means the baseline it
   freezes is the repaired corpus, not the drifted one.
4. **Instrument the booking funnel** — CTA clicks and `tel:` clicks (§5). This is the only
   item here with a closing window: ship Phase B first and the pre-migration conversion
   baseline is gone for good.

### Phase A — the component, with no callers

Ships `src/components/content/YouTubeEmbed.astro` and whatever helper it needs, plus the
`ui.ts` keys. **Zero callers, zero rendered-byte change.** Proven the way B-2 Phase A proved
it: hash all 620 pages before and after and compare the manifests. Not by comparing page
counts.

### Phase B — caller migration

Migrates the four page families, **one commit each, in the §6.4 order** — moab guide, home,
about, `/utv/` last. **Locale-block discipline is the whole risk here.** Per the
standing rule: whitelist the region, never let a transform touch a `.ts` file's other-locale
blocks, verify by reverse-transform.

**The conservation test.** Byte-identity is the wrong test — Phase B moves bytes on purpose.
The right one: **the multiset of video IDs per rendered page must be identical to V-0, page
for page, across all 620.** That test would have caught §1.4's defect on its own, which is
the argument for it.

---

## 4. Gate interactions

| Gate | Effect |
|---|---|
| **4a** UI-chrome parity | **Binding.** New keys × 9 locales; both halves apply. |
| **4k** direction integrity | No effect — `ar` carries no embeds (§1.2). |
| **4d** body-link audit | No effect — embeds are not body links. |
| 4f / 4g / 4h / 4i / 4j | No effect — no headings, anchors, locked phrases or dictionary entries move. |
| **4l** (new) | No `youtube.com/embed` in `src/` outside the component. `gates:src`. Permanent, not migration-scoped. |
| **4m** (new) | Video-ID multiset conserved per rendered page. `gates:dist`. Built in V-0 so it predates what it verifies. |

Nothing in the current suite perceives media at all — which is exactly why §1.4's defect
shipped to production in `zh` and stayed there. 4l and 4m are the successors, and 4m's
ongoing value outlives the migration: it is a standing per-locale media-parity check.

---

## 5. Known limits

**No performance measurement has been taken.** §1 is a structural census. Every claim about
bytes, LCP or lazy-loading behaviour in this brief is mechanism-reasoning, not observation,
and §1.3's middle claim in particular is asserted from the layout. V-0 exists to close this
before Phase A, so that the abstraction is justified by a number rather than by a plausible
story about one.

**Analytics splits across the phase boundary — it is not all downstream.** gtag is global
([`BaseLayout.astro:79-87`](../../src/layouts/BaseLayout.astro#L79-L87), `G-MVCDESQ5GN`) but
carries **zero custom events**: `gtag('js')` and `gtag('config')` only, no `data-track`
hooks, nothing. So of the four conversion signals in §6.3, three are uninstrumented today
(1,801 `tel:` links and 3,162 booking links across `dist/`, none emitting an event — GA4
enhanced measurement does not collect `tel:` clicks, and booking links are internal so
outbound-click tracking never fires either). **Those must be instrumented in V-0 or their
pre-migration baseline is unrecoverable.**

`video_start` and 25/50/75/100 are the opposite case and land with Phase B: they need the YT
IFrame API, which exists only *after* a facade activates, so they cost non-watchers nothing.

**Video engagement can never be baselined.** The current plain embeds report nothing to the
parent page — by construction, not by omission. The pre/post question "did engagement fall?"
is therefore unanswerable, and §6.3 must not pretend otherwise: video metrics are a
**post-migration baseline only**. The guardrail that actually protects revenue is the booking
funnel, which is why V-0 has to instrument it.

**The component can be bypassed.** Any `.mdx` body can write a raw iframe, exactly as
`404.astro` bypasses the shared Header (B-2 §3.5). Only the conservation gate in §4 would
perceive it.

**The video content itself is out of scope.** Length, structure, action-first vs
talking-head — a production decision with no code surface. Recorded because it was raised,
not because V-1 acts on it.

---

## 6. Success criteria

Three tiers, and the distinction between them is the point: a **gate** fails a commit, a
**target** is directional and judged, a **guardrail** is watched over a window and cannot
gate anything because its data does not exist at commit time.

### 6.1 Gates — blocking, with the mechanism named

Each row names *how* it is checked, in the vocabulary the repo already uses. `gates:src` runs
before `astro build` (fails in seconds, points at a source line); `gates:dist` runs after
(sees rendered output, catches what source inspection cannot). Both are already wired into
`npm run build` and into CI (`.github/workflows/ci.yml`).

| Check | Before | After | Verification |
|---|---|---|---|
| Raw `youtube.com/embed` in `src/` outside the component | 295 | **0** | **new gate 4l**, `gates:src` — see §6.1.1 |
| Video-ID multiset, per page × 620 | baseline | identical | **new gate 4m**, `gates:dist` — see §6.1.2 |
| Per-locale video parity (the §1.4 class) | 23 vs 24 | equal | falls out of 4m; no separate check |
| Rendered pages | 620 | 620 | `validate-site.mjs` |
| `astro check` | 0 err / 0 warn | identical | `npm run check` |
| Gates 4f–4k | current figures | identical | existing `gates:src` + `gates:dist` |
| Gate 4a (UI-chrome parity) | — | new keys present × 9 | **manual** — 4a is not scripted; both halves (key-set diff *and* rendered English scan) run by hand |

#### 6.1.1 Gate 4l — no embed outside the component (source)

A grep is enough and a grep is the point: objective, fast, unambiguous. Scoped to
`src/**/*.{ts,astro,mdx}`, allowlisting only the component's own file. This is **not a
migration-only check** — it is the standing invariant that keeps the contract from decaying
one convenience at a time, and it is the reason §2's invariant is worth writing down at all.
Same logic as B-2 declining to export `isolate()`: a rule nothing enforces is a preference.

#### 6.1.2 Gate 4m — video-ID set conserved (dist) — **BUILT 2026-07-28**

> **Correction, forced by building it: the invariant is a SET, not a multiset.** `/utv/`
> carries 24 references to 21 distinct videos — the ambient hero and one carousel slide are
> the same upload. A count of *references* is not stable across the change this gate exists
> to survive: the migration turns one `<iframe src=…/embed/ID>` into one
> `<img src=…/vi/ID/…>`. Reference counts move on purpose; "which videos does this page
> offer" does not. Shipped as **set = blocking, reference count = advisory**.
>
> The cost, stated rather than hidden: dropping a *duplicate* placement of a video that also
> appears elsewhere on the same page is invisible to 4m. That is a layout regression, not a
> media-identity loss, and it belongs to 4l and to review.

Extracts the ordered multiset of video IDs per rendered page and compares against a committed
baseline, the way `census/` holds the phrase counts. Dist rather than source because a raw
`<iframe>` in any `.mdx` body bypasses a source-scoped check entirely (§5), and because the
migration invariant is a statement about *rendered* output.

**Precedent, deliberately followed:** `gate-4j-gallery-parity.mjs` already asserts exactly
this shape for the homepage gallery — *every registered locale explicitly defines every key*,
structure not wording, because proper nouns are legitimately identical across locales. 4m is
that invariant applied to media instead of slide text. 4j is the file to read before writing
it.

**⚠ 4m must be built and its baseline committed in V-0**, before Phase B moves anything.
Built afterwards, it would ratify the migration's output as correct by definition.

**Scope boundary — 4m asserts media *identity*, nothing else.** It answers one question:
*does this rendered page carry exactly the expected multiset of video IDs?* It must **not**
grow to check thumbnail URLs, player query parameters, autoplay flags, `aria-label` presence,
or any facade implementation detail. Those change whenever the component changes; video
identity does not, and a gate that couples to the implementation it validates needs updating
every time that implementation improves — which is how a gate becomes something contributors
route around.

This is the same boundary 4h and 4i already hold between them (4h checks the *seam* at a lock
boundary; lock presence and drift are 4i's). The facade's own correctness belongs to 4l and
to review, not to 4m.

### 6.2 Targets — two baselines, neither substituting for the other

#### 6.2.1 Laboratory baseline — **CAPTURED 2026-07-28**

Deterministic and reproducible: same build in, same numbers out. Committed as
[`V0-baseline.json`](V0-baseline.json), regenerated by `scripts/perf/page-weight.mjs`. This
is the **regression target**.

| Page | HTML KB | DOM | Requests | Third-party | **Players booted** |
|---|---:|---:|---:|---:|---:|
| `/utv/` | 45 | 465 | 32 | **26** | **24** |
| `/zh/utv/` | 47 | 465 | 32 | 26 | 24 |
| `/` | 68 | 741 | 118 | 10 | 5 |
| `/about/` | 30 | 294 | 14 | 9 | 7 |
| `/guides/moab-utv-tours/` | 39 | 433 | 7 | 3 | 1 |
| **site** | 41.3 MB | 313,766 | 4,803 | **1,560** | **296** |

**`/utv/` is the headline: 26 of its 32 requests are third-party, and 24 are YouTube players
booted before the visitor does anything.** That is the number V-1 drives toward zero, and it
is the first line to read in any post-migration diff.

The producer records what the repository can prove and refuses to guess the rest: transfer
size of a *referenced* resource is not in `dist/`, so third-party weight is counted in
**requests, not bytes**.

#### 6.2.2 Field baseline — outstanding, and deliberately not substituted

Collected by hand against the deployed site; varies with network, device and environment, so
it is **contextual evidence, not a contractual metric**. Recording it here as empty rather
than omitting it, because a missing row is a prompt and an absent section is an oversight:

| Metric | `/utv/` mobile | `/utv/` desktop | `/` mobile | `/` desktop |
|---|---|---|---|---|
| Lighthouse Performance | — | — | — | — |
| LCP | — | — | — | — |
| CLS | — | — | — | — |
| INP | — | — | — | — |
| PSI field data (CrUX) | — | — | — | — |

⚠ Capture this **before** Phase B. Unlike the conversion baseline it is not destroyed by
shipping — the site can always be re-measured — but a post-hoc "before" number measured on a
different build is not a before number.

#### 6.2.3 Expectations

Measured on `/utv/` (the worst case, 24 embeds) and `/` (5), mobile throttled, on **both**
`en` and `zh` so a locale-block error surfaces as a measurement anomaly.

| Metric | Expectation | Note |
|---|---|---|
| Third-party requests before interaction | **↓ sharply** | the real prize — 22 players not booted on `/utv/` |
| Third-party bytes before interaction | ↓ sharply | |
| **First-party JS bytes** | **↑ slightly** | the facade adds our own script; claiming a decrease here would be false |
| LCP | ↓ | the ambient poster becomes a deterministic LCP element |
| CLS | **no regression** | `aspect-ratio` reserves the box pre-load; treat any increase as a defect |
| INP | no regression | |
| Lighthouse Performance | ↑ | advisory only — composite and noisy, never a gate |

The third-party columns are the honest headline. "Initial JS bytes" as a single number would
hide the fact that our bundle grows while the page gets faster.

### 6.3 Guardrails — conversion safety, watched not gated

A booking metric needs weeks of traffic; it cannot block a commit. These are watched over a
window agreed at V-0, with the migration reversible if one moves the wrong way.

| Signal | Baseline available? |
|---|---|
| Booking CTA clicks | **only if V-0 instruments it** (§5) |
| Phone (`tel:`) clicks | **only if V-0 instruments it** — 1,801 links, currently silent |
| `/booking/` page_view | yes, today — weak proxy, but the one real pre-existing signal |
| `video_start`, 25/50/75/100 | **no — impossible** (§5). Post-migration baseline only. |

The asymmetry is the finding: **three of these four can still be baselined, but only if V-0
does it before Phase B ships.** After that the window has closed permanently.

### 6.4 Rollback

**Rollback is bought structurally, not just declared.** Phase B migrates one page family per
commit, in ascending order of embeds and revenue exposure:

```
/guides/moab-utv-tours/  (1)  →  /  (5)  →  /about/  (7)  →  /utv/  (24)
```

`/utv/` is the booking page and migrates **last**, with the most evidence behind it. Each
commit is independently revertable, and a revert is proven complete by 4m returning to the
prior baseline — the same invariant, read backwards.

**The trigger.** If the observation window shows a decline in booking-CTA or phone-CTA clicks
that traffic volume and seasonality do not explain, pause the rollout, revert the most recent
family, and investigate before continuing.

**⚠ State the honest limit rather than dressing this in statistics.** This site's traffic may
not be sufficient to detect a small decline at conventional significance inside a reasonable
window — an underpowered test that returns "no significant change" is not evidence of safety,
and treating it as such is worse than having no rule. So the trigger is deliberately a
**practical threshold plus a judgement call**, agreed with the owner at V-0 once the §5
instrumentation has produced a few weeks of actual volume to reason about. The ordering above
is what makes that acceptable: the exposure at each step is bounded, and the largest step is
taken last.

---

## 7. Open decisions

1. **Sequencing.** B-2 landed while this brief was being written — Phase B at `15f5429`,
   closed in the AR-2 backlog at `c97378f`, ADR-10 at `ef592de`. It moved 619 of 620 pages
   and is **not tagged**, so the `dist/` this census reads predates it. The blocker is
   therefore gone; the residual argument for waiting is only that V-0's baseline (§3) should
   be taken against a post-B-2 build, not the current one. Owner's call.
2. **`ambient` — keep YouTube at all?** Partly decidable from the repository, and measuring
   it moved the answer. The component's two-mode contract (§2) works either way, so this
   remains a swap behind `ambient` rather than a premise of it.

   **Measured, and it favours self-hosting:**

   | Criterion | Measurement | Reads |
   |---|---|---|
   | Do the loops churn? | The video set is **append-only**: 7 → 30 distinct videos, **23 added, 0 ever removed**, 2026-06-04 → 2026-07-28 | self-host |
   | Do *these five* churn? | All 5 ambient ids are in the **original 7** and have never changed identity | self-host |
   | Decorative and muted? | `autoplay&mute&loop&controls=0`, no controls, no affordance | self-host |
   | Non-technical staff swapping them? | No replacement has ever occurred in 8 weeks of history | self-host |

   **The finding that complicates it: all 5 ambient videos are also carousel slides.** They
   are not separate hero footage — `YQVFzCTh4m4` is the `/utv/` ambient hero *and* a slide on
   the same page. Self-hosting therefore does not remove YouTube from any page it is on; it
   adds a second, derived asset (a trimmed muted loop) beside a full upload that still
   streams. That is defensible — a 15-second loop is a different asset from the source video,
   not a duplicate — but it is a content-pipeline commitment, not just a hosting one.

   **Still unmeasurable here, and genuinely deciding:** clip duration, encoded size at
   acceptable quality, and whether the loops are short enough that adaptive bitrate is
   irrelevant. All three need the actual media or a network fetch. **No repository evidence
   argues for keeping YouTube for `ambient`; the remaining case for it is operational.**
3. **Hero CTA.** `/utv/`'s hero already carries headline, rating and meta above the fold with
   no Play required ([`utv.ts:26-38`](../../src/page-content/utv.ts#L26-L38)). Price and the
   book/call buttons are absent. That is a content change to eight locale blocks, adjacent to
   this work but not part of it.
