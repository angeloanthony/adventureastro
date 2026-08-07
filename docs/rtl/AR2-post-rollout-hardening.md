# Post-Rollout Hardening — the milestone after the Arabic rollout

**Status:** open register, no active work. Opened 2026-08-06 at commit `8033883`, the commit that
closed [`AR2-PhaseF-plan.md`](AR2-PhaseF-plan.md) at 77/77 Arabic routes.

**This is a register, not a plan.** Nothing here is scheduled, nothing here is a rollout task, and
nothing here was left undone by Phase F. Every item is either coverage a gate does not yet have or
cleanup that no gate asks for.

---

## 0. Why this document exists at all

The Arabic localization project has a completion point, and it is `8033883`. Without a separate
container, every instrumentation improvement reads as *"the rollout is not finished yet"* — which
is the exact failure mode `AR2-rollout-batch-brief.md` and the execution-mode rules were written to
prevent. Phase F ran nine batches without a framework change; that is the result. Folding these
items back into it would retroactively make it look like it did not.

So the entry condition for this milestone is simply: **the rollout is closed.** The exit condition
is nothing — this register may stay open indefinitely, and items may be closed as WONTFIX.

**Ordering rule.** §1 items are *missing coverage*: a real defect class exists that no instrument
can currently observe. §2 items are known and harmless. Do §1 before §2 if anything is done at all.
Within §1, H-1 is first because it is the only one that can corrupt a measurement the floors
depend on.

---

## 1. Missing coverage — an instrument cannot see something it claims to cover

### H-1 — the `AR_SLUGS` extractor parses DELIMITERS, not slugs *(and only half of it is fixed)*

**Two input classes have now broken the same three-line extractor, eighteen batches apart.**

| batch | input | symptom |
|---|---|---|
| 3 | an apostrophe in a comment inside the array (a possessive) | 66 slugs → 6 real + 60 prose fragments |
| Phase F final | the homepage's **empty** slug `''` | `no Arabic pilot routes found`, exit 1, census blocked |

`8033883` changed `/'([^']+)'/g` → `/'([^']*)'/g` in `measure-prose-window.mjs` and
`measure-ar-frontmatter-ceiling.mjs`, with a control proving the two patterns are byte-identical on
the pre-Phase-F input (76 slugs each) and diverge only on the new one.

> ### ⚠⚠ THAT FIX CLOSED THE EMPTY-SLUG HALF ONLY. THE APOSTROPHE HALF IS STILL LIVE.
>
> Measured at close, on the shipped tree, with one apostrophe staged into a comment:
>
> ```
> clean input                 : 77 slugs
> one apostrophe in a comment : 77 slugs, of which 61 are garbage
> ```
>
> The count does not move, so **nothing announces it.** Today the only thing standing between the
> corpus and that failure is a capitalised comment inside `AR_SLUGS` telling authors not to type an
> apostrophe. A comment is not an instrument.

**The durable form of the lesson, and the fix that generalises.** Both failures are the same
mistake — *recognising the delimiter instead of the thing being represented.* A slug is not "text
between two quotes"; it is a kebab-case route or the empty string, and it is followed by a comma.
Matching **slug syntax** rather than quoted strings closes both classes at once and cannot be
broken by a third input class of the same kind. This is the same lesson gate 4n's `\p{Bidi_Mirrored}`
widening recorded in `AR2-rollout-batch-brief.md` §3.7: *name the property, never the characters.*

**Why it matters more than its size.** `measure-prose-window.mjs` derives the population that
`survives` is computed over, and §11.2 criterion 5 — the governing acceptance criterion — is
arithmetic on that population. §3.2 already records which way a silent undercount errs: a smaller
`whole` yields a smaller `survives`, **which reports a dead floor as enforcing.** The Phase F
instance failed loudly only because `''` happens to sit mid-array; placed last it would have
returned 76 real slugs and looked correct.

⚠ `validate-site.mjs:96` carries the same pattern on `HUB_SLUGS`. Left alone deliberately — no hub
has an empty slug and its comments carry no apostrophes today. It is listed so a future reader
finds it in one grep rather than one incident.

---

### H-2 — gate 4o cannot see `src/page-content/`, where the locale prose actually lives

`scopeOf()` admits `src/components/**`, `src/layouts/**` and `src/pages/<rtl>/**`. The eight locale
body blocks in `src/page-content/home.ts` — 26 KB of Arabic prose each — are in none of them.

**A literal `→` in the AR block would have shipped pointing the wrong way with every gate green.**
It did not, because the final batch's authoring routed all six onward affordances through
`affordanceArrow("ar")` and the transform asserted that no literal glyph survived. That is authoring
discipline standing in for coverage, which is exactly the arrangement that decays.

B-6 §8 predicted the trigger and named the wrong boundary: *"the 8 `▶` play glyphs in `home.ts` are
untouched — LTR content… they are in the gate's glyph set, so the moment one appears in shared
chrome or Arabic content it is caught."* Arabic content **did** appear in `home.ts`, and it was not
caught, because the scope is by **path**, not by whether the file renders into an RTL locale.

**What a fix has to decide, and it is not a scope-list edit.** `home.ts` renders into all nine
locales from one file, so the file is simultaneously in scope and out of it. The honest options are
(a) scope the *locale block*, not the file — which needs the same character-walk literal extractor
the pre-flight already has, or (b) move locale blocks out of shared modules. Do not simply append
`src/page-content` to `SHARED_DIRS`: that would flag the 136 correct LTR arrows B-6 measured and
recreate the 204-finding gate 4o exists to avoid.

---

### H-3 — `preflight-ar.mjs` read none of the 105 Arabic gallery strings

Run against `src/page-content/home-gallery.ts` it reports:

```
no `const AR = `…`` block — this module carries no Arabic prose yet, so NOTHING was checked
```

`GALLERY_TEXT_AR` is 105 Arabic `alt`/`caption` strings in a page-content module. The pre-flight
recognises exactly one shape of Arabic prose — a template-literal `AR` block — so a dictionary of
object-literal strings is invisible to it. **The message is accurate about the parser and false
about the file**, which is [[silence-is-not-evidence]] mechanism 3: *implementation narrower than
contract.*

Coverage is not absent overall — gate 4n reads the rendered captions from `dist/` and passed — but
the cheap pre-build check that exists to catch this class before a four-minute build could not see
the surface. The final batch substituted a purpose-built generator assertion (refuse on any
`\p{Bidi_Mirrored}`, any Arabic-Indic digit, any bidi control, any caption with no Arabic). That
worked and is not reusable.

⚠ **The gallery is an isolation-free surface, and that is structural.** Captions reach the reader
through `escapeHtml()`, so `<bdi>` renders as literal text there. It is the same class as
frontmatter: no markup remedy exists, so authoring is the only remedy — which is precisely the
surface a pre-flight is most valuable on.

---

## 2. Known, harmless, and deliberately not fixed

| id | item | why it is not urgent |
|---|---|---|
| **H-4** | 8 literal `/utv/` and 1 `/booking/` hrefs on six `ar` pages | Written at batches 1–3, before those slugs were registered. They **resolve**, so no gate names them and no reader hits a 404 — they just leave the locale one hop early. A one-line sweep whenever those files are next touched. |
| **H-5** | `astro check`: `CityLayout.astro:83`, `QuickFacts facts` value `string \| undefined` | Pre-existing, predates Phase F, and `astro check` is not in the build pipeline (`build = gates:src && astro build && gates:dist`), so it has never blocked. Introduced with batch 5's `nearestAirport?` prop. |
| **H-6** | the `▶` play glyph and `.play-icon-circle { padding-left: 5px }` | B-7 classified this `keep-glyph-coupled` **by decision**: the padding optically centres a right-pointing triangle, so it must follow the glyph, not the page. Mirroring the glyph alone would break the centring. A media transport control is also not a reading-order affordance. Genuinely a decision to revisit, not a defect to fix. |

**Carried in from the pre-existing register, unchanged by the rollout:** `AR2-backlog.md` B-8b (the
Arabic seam rule), B-11, B-12, B-13, B-14, B-16, B-17; the filed-not-built owner decision to route
`RelatedArticles` `title`/`description` through the bidi formatter; `Grand Junction` → `غراند جنكشن`
in the §5 challenge window; `measure-currency.mjs` reporting reachable FAQ prose as unreachable; the
stale `--scan-shapes` flag name in the brief §3.6.1; and `preflight-ar.mjs` detecting surface by
path, which makes a control staged outside `src/page-content/` exit clean-looking.

---

## 3. What this milestone must NOT do

- **Do not reopen Phase F.** It is closed at `8033883` and its numbers are a first-contact record.
- **Do not re-derive anything the rollout settled** — the 17 bidi constructs, the shape catalogue,
  the floor model, the ceiling model, the §2.2/§2.3 frozen lists. Nine batches closed those.
- **Do not build an instrument without showing the defect it would have caught.** H-1, H-2 and H-3
  each name a concrete measured instance; that is the bar, and it is the bar the deferred citation
  verifier still has not met.
- **Do not let a green run count as evidence for a prospective gate.** H-2's fix ships green by
  construction; it needs a red control, per gate 4n's own header.
