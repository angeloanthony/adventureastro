# V-0 — analytics event contract

The analytics half of V-1 phase V-0 (`docs/perf/V1-video-facade.md` §3, §5, §6.3).
Contract first, implementation second — the same order 4m followed, and for the same reason:
an event name is a schema, and GA4 keeps every event you ever send forever.

**Why this is urgent rather than merely useful.** The site has run GA4 since launch and has
**zero custom events** — `gtag('js')` and `gtag('config')` only. 1,801 `tel:` links and 3,082
booking links emit nothing. GA4 enhanced measurement collects neither (`tel:` is not an
outbound click; booking links are internal). Ship the facade migration first and the
pre-migration conversion baseline is **unrecoverable** — there is no backfill for an event
that was never sent.

---

## 1. Two findings that changed the contract before any code

### 1.1 `video_start` and `video_progress` are GA4-reserved — do not send them

They are GA4 **enhanced-measurement** event names, automatically collected for embedded
YouTube players when *Video engagement* is on and the player carries `enablejsapi=1`.
Sending custom events under those names mixes two different parameter schemas into one
event, and GA4 offers no way to separate them afterwards.

This corpus's players do **not** carry `enablejsapi=1`, which is why nothing is collected
today. So there are two paths, and the native one is better:

| | |
|---|---|
| **Adopt GA4's native video events** ✔ | Add `enablejsapi=1` to the player the facade injects. GA4 then emits `video_start` / `video_progress` / `video_complete` with `video_title`, `video_url`, `video_percent`, `video_duration` — the 25/50/75/100 milestones included, at no code cost. |
| Send custom video events | Requires the YouTube IFrame API, a state-change listener, milestone bookkeeping, and a non-colliding name. More code, worse data, and it duplicates a platform feature. |

**Decision: no custom video events.** The facade sets `enablejsapi=1` on the injected player
and GA4 collects natively. ⚠ **Requires *Video engagement* to be enabled on the GA4 property —
unverified, needs property access.** If it is off, video engagement stays uncollected until
someone turns it on; that is a settings change, not a code change.

`booking_click` and `phone_click` collide with nothing and stay custom.

### 1.2 CSS class cannot identify a CTA — `href` is the only reliable discriminator

Measured across `dist/`, the same classes carry both destinations:

| Class | `tel:` links wearing it |
|---|---:|
| `cta-phone` | 40 |
| `cta-button primary` | 25 |
| `tour-book-btn` | **16** |

A class literally named `tour-book-btn` is a phone link 16 times. Any class-based selector
would have mis-attributed those as bookings and the error would be invisible in the data —
it would simply look like more bookings than there were. Selection is by `href`, and `href`
alone.

---

## 2. The contract

Two custom events. `gtag('event', name, params)`.

| Event | Fires on | Parameter | Value |
|---|---|---|---|
| `booking_click` | click on a link resolving to `/booking/` or `/<locale>/booking/` | `page_path` | `location.pathname` of the page clicked *from* |
| | | `locale` | `<html lang>` |
| | | `destination` | the resolved booking path |
| `phone_click` | click on any `href^="tel:"` | `page_path` | `location.pathname` |
| | | `locale` | `<html lang>` |
| | | `phone` | the `tel:` target, digits as authored |

`page_path` and `locale` are on both deliberately: the whole point of the guardrail is
per-page and per-locale comparison, and a GA4 custom dimension can only be built from a
parameter that was sent from the first event onward.

**Not included, and why.** No link text (it is the locale's translation of the same
intent, so it splits one signal eight ways). No element class (§1.2). No `service` — the
booking page is a single destination in this corpus, so a service parameter would be
invented rather than observed.

---

## 3. Instrumentation is delegated, not per-element

**One listener on `document`, matching by `href`.** Not a handler per CTA.

This is a correctness decision, not a brevity one. There are 1,801 phone links and 3,082
booking links across 620 pages, rendered from `.astro` components, `page-content` locale
blocks, and MDX bodies. Per-element instrumentation would need every one of those surfaces
edited, would be re-broken by the next author who adds a button, and — as §1.2 shows — has
no reliable attribute to hook onto anyway.

**It also dissolves most of the validator this contract would otherwise need.** A delegated
listener cannot be bypassed by adding a new booking button: any `<a href="…/booking/">`
anywhere is instrumented the moment it renders. The failure mode that remains is narrow and
different from the one worth guarding against per-element:

> a CTA that is **not an `<a href>`** — a `<button>` with a JS navigation, or a booking link
> whose path does not match the pattern.

### 3.1 That bypass is not hypothetical — it is 57 live CTAs

Written as a prediction, then measured. Both halves exist in production:

| Form | Count | Anchor-only listener |
|---|---:|---|
| `<a href="/<loc>/booking/">` | 3,082 | ✔ seen |
| `<button onclick="location.href='/<loc>/booking/'">` | 49 | ✘ **invisible** |
| `<button onclick="window.open('https://cal.com/adventuretoursvernal/trails')">` | 8 | ✘ **invisible** |

The 8 are the sharper finding: **cal.com is a second booking funnel with no `/booking/` path
at all.** A listener keyed to anchors and to that path would have reported a clean,
complete-looking booking number that silently excluded an entire funnel — the §1.2 failure
mode again, where the error looks like data rather than like an error.

The shipped listener therefore matches anchors **and** reads a destination out of an inline
handler, firing only when that destination is a booking one — so the carousel and accordion
buttons that also carry `onclick` stay untouched. Coverage was proven by replaying the
listener's own patterns over `dist/`: **1,801 phone affordances and 3,139 booking affordances
matched, 0 unmatched.**

**The real fix is markup, not instrumentation.** Those 57 should be anchors: a `<button>`
with `onclick="location.href=…"` is not keyboard-navigable as a link, exposes no href to
assistive technology or to a crawler, and cannot be opened in a new tab. Converting them is a
content change across locale blocks with its own review surface — recorded here, deliberately
not bundled into V-0.

⚠ **Possible per-locale asymmetry, unexamined:** the 49 `location.href` buttons are en 13 and
six each for es/de/fr/it/ja/pt — **`zh` has none.** That may be legitimate divergence or the
same class of drift as the `zh` carousel gap. Not chased here.

### 3.2 The validator this still needs

Gate **4o** (4n is taken by AR-2 Track A): enumerate every booking and phone affordance in
`dist/` and assert the delegated selector matches it — which is exactly the coverage replay
above, promoted from a one-off script to a standing check. Deliberately *not* built here: a
validator written before the instrumentation it validates asserts a contract nothing
implements. Now that the contract ships, it has something to check.

---

## 4. Known limits

**No consent gate exists.** GA4 already loads unconditionally on all 620 pages with no
banner; these events add two interactions to a stream that is already flowing, and they carry
no personal data — a page path, a locale, and the business's own phone number. The privacy
policy discloses analytics and cookies in general terms. **This does not amount to a review
of whether the site's current posture is adequate for its EU-language locales, and this
change is not the thing that would make it inadequate.** Flagged because the question is
live, not because V-0 answers it.

**A click is not a conversion.** `phone_click` counts intent to call, not a call; on desktop
a `tel:` click may do nothing at all. The metric is only ever compared against itself
pre/post, which is what the guardrail needs and the most it supports.

**The baseline needs calendar time, not a build.** Instrumentation shipping is the start of
the observation window, not the end of it. §6.4 of the V-1 brief is explicit that the
threshold is agreed once real volume exists.
