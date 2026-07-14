# Phase 2 — Destination Growth Roadmap

**Adventure Tours Vernal · Dinosaur Country**
Prepared: July 2026 · Scope: **planning & prioritization only.** Architecture is FROZEN; no
code, content, MDX, schema, routing, component, or build change was made producing this
document. It audits the repository and prioritizes the highest-value growth work; it
implements nothing.

Companion to the existing planning set: [`M5_EEAT_MEDIA_AUDIT.md`](M5_EEAT_MEDIA_AUDIT.md),
[`M5_IMPLEMENTATION_ROADMAP.md`](M5_IMPLEMENTATION_ROADMAP.md),
[`M6_ORIGINAL_MEDIA_INVENTORY.md`](M6_ORIGINAL_MEDIA_INVENTORY.md),
[`M6_REUSABLE_MAP_SYSTEM.md`](M6_REUSABLE_MAP_SYSTEM.md), and the publishing roadmap in
[`../PROJECT_STATE.md`](../PROJECT_STATE.md).

> **Property boundary.** The Best Western Booking Platform (Version 1.0) is separate,
> production-ready infrastructure and is **frozen** — nothing here modifies it. Every
> recommendation below lives in *this* repository (the Adventure Tours Vernal content site)
> and, where it touches the hotel, does so only by *pointing at* the hotel's existing,
> already-built attribution surface (the `ADVENTURE` promo code and its booking URL).

---

## 1. Executive Summary

The content platform is mature and frozen: ~60 indexable pages, ten hub/pillar cornerstones,
a validated hub-and-spoke framework, disciplined SEO/schema, and resolved pricing. The written
authority is effectively best-in-market. Two growth levers are already well-planned and partly
in motion:

- **Original media / EEAT** — fully specified in M5/M6; quick-wins (existing-photo hero
  deployment, QW-1/2/3) already executed in M6.1; the reusable map library is specified in
  M6.2. This lever is *understood and sequenced*.
- **Content depth** — the owner's publishing roadmap (PROJECT_STATE §Publishing) sequences
  destination, commercial, planning, and seasonal clusters.

**The gap this audit surfaces is a third lever that no existing plan covers: the
conversion-and-attribution layer that turns the site's organic traffic into *tracked* revenue
across both properties.** Concretely, the site is the top of the funnel for six business goals,
but the machinery that converts and *measures* three of them barely exists here:

- **Hotel referrals & partner revenue are almost entirely untracked.** Of 26 pages that
  mention lodging, only ~2 (`guides/moab-utv-tours`, `guides/ultimate-guide-to-vernal-utah`)
  actually surface the Best Western partnership — and they do it as a raw external link to
  `bestwesternvernal.com` plus "mention Adventure Tours for 10% off." The Version 1.0 hotel
  platform was built specifically to attribute and reconcile exactly these referrals via the
  `ADVENTURE` promo code — but the content site, which owns the traffic, isn't consistently
  feeding it. **The revenue spine is built and idle for want of referral volume the content
  site already has the audience to supply.**
- **Adventure Pass adoption has no surface here at all** — "Adventure Pass" appears nowhere in
  `src/`.
- **Direct UTV booking CTAs are inconsistent.** Every spoke inherits a `TourCta` from its
  layout, but in-body contextual booking prompts are uneven — 3 of 7 UTV money pages
  (`backcountry-tours`, `group-utv-tours`, `side-by-side-rentals`) carry only a phone number in
  the body, no in-context "book online" button, despite a live booking calendar on `/booking/`.

The strategic conclusion: **the media and content levers are already roadmapped; the
highest-value *unclaimed* work — and the one this Phase-2 mandate names most directly (hotel
referrals, partner revenue, Pass adoption, direct bookings) — is a low-effort, desk-only
conversion-and-attribution layer that makes the existing traffic and the existing V1.0 revenue
infrastructure actually connect.**

---

## 2. The Six Goals → Where They're Won

| Goal | Primary lever | Current state | Gap owner |
|---|---|---|---|
| Organic traffic | Content depth + original media + technical SEO | Strong text; media in progress; content gaps (gateways, seasonal) | Content + M5/M6 |
| Topical authority | Hub/spoke depth + EEAT proof | Excellent text; thin in DNM/things-to-do; EEAT media pending | Content + M5/M6 |
| Adventure Pass adoption | A Pass CTA/surface on high-intent pages | **Absent from the repo** | **Phase 2 (new)** |
| Direct UTV bookings | Consistent booking CTAs + conversion media | Calendar exists; CTAs uneven; media pending | **Phase 2 (new)** + M5 |
| Hotel referrals | Tracked Best Western referral on lodging-context pages | ~2/26 pages; untracked external link | **Phase 2 (new)** |
| Partner revenue | Referrals carried through the `ADVENTURE` promo → V1.0 reconciliation | Spine built (V1.0); **unfed** by the content site | **Phase 2 (new)** |

Media (M5/M6) and content depth are **necessary and already planned**. The four rows marked
"Phase 2 (new)" are **unplanned and mostly desk-deployable** — that concentration is why the
conversion-and-attribution layer is the highest-leverage place to begin.

---

## 3. Prioritized Milestone Roadmap

Scored on the four requested axes. **Booking impact** is weighted first per the mandate; effort
is inverse (Low effort = higher priority). Scores are H/M/L relative to each other.

| # | Milestone | Booking impact | SEO value | Effort (lower = better) | Business value | Verdict |
|---|---|---|---|---|---|---|
| **M1** | **Conversion & Cross-Property Attribution Layer** (tracked hotel referral + promo everywhere lodging is discussed; consistent UTV booking CTAs; Pass CTA; surface real social proof) | **H** | M | **Low** (desk; content/component only) | **H** (feeds V1.0 revenue spine; both properties) | **Start here** |
| M2 | **Desk media quick-wins + base hub-and-spoke map** (finish M5 §8 QW / M6.2 map) | M–H | H | Low–Med (desk) | H | Parallel/next |
| M3 | **Gateway + seasonal content expansion** (Denver & Grand Junction `from/` pages; the 4 seasonal + priority monthly guides) | M | **H** | Med (writing; templates exist) | M–H | Next |
| M4 | **Field media program** (M5 Field Days; Day 6 UTV first → tour reel) | **H** | H | **High** (travel, owner on-camera, seasonal) | H | Sequenced after M1; season-gated |
| M5 | **Author EEAT proof** (dated field notes, real Dave/Trudy photos, quarterly cadence) | L–M | H | Med (rides along with M4) | M | With M4 |
| M6 | **Thin-hub depth + supporting spokes** (DNM, things-to-do to ≥5 spokes; then 20–40/hub per PROJECT_STATE) | L–M | H | Med–High (writing) | M | Ongoing |

Rationale for the ordering:

- **M1 wins on the mandate's first criterion (booking impact) at the lowest effort.** It needs
  no field trips, no owner availability, no seasonal window, and no V1.0 change — it is
  content/component edits that ship in one editorial window and are immediately measurable. It
  simultaneously advances *four* of the six goals (bookings, hotel referrals, partner revenue,
  Pass adoption).
- **M2/M3** are the strongest SEO plays and are largely desk work; they proceed in parallel or
  immediately after M1. M2 is partly done (M6.1) and fully specified (M6.2).
- **M4** is the highest-ceiling EEAT/conversion lever but is effort-heavy and gated on owner
  time and season, so it is sequenced after the desk wins rather than first — exactly as
  M5_IMPLEMENTATION_ROADMAP §9 concluded for the media program itself.

---

## 4. Recommended First Milestone — M1: Conversion & Cross-Property Attribution Layer

**Why this one.** It is the only candidate that scores High on booking impact *and* Low on
effort *and* High on business value, and it is the piece that makes the just-completed Version
1.0 partner-revenue infrastructure actually earn. It converts existing organic traffic — which
the site already has — into tracked bookings and tracked hotel referrals, rather than requiring
new traffic to be created first (M2–M6 all create demand; M1 monetizes the demand already
arriving). It is also the growth work this Phase-2 mandate names most directly.

**What it delivers (all within this repo; all content/component edits — no architecture change,
no V1.0 change):**

1. **Systematic, tracked hotel referral.** A single reusable lodging/partner callout deployed
   on every page that already discusses where to stay (the ~26 lodging-context pages, starting
   with the itineraries, the destination guides, and the high-intent gateway pages). Each
   instance carries the **`ADVENTURE` promo code** — the load-bearing attribution signal the
   V1.0 reconciliation engine matches on — and links to the hotel's booking surface. This turns
   scattered, untracked prose ("Vernal has lodging") into a consistent, attributable referral
   the hotel platform can reconcile into partner revenue.
2. **Consistent direct-booking CTAs.** Close the in-body CTA gaps on the UTV money pages
   (`backcountry-tours`, `group-utv-tours`, `side-by-side-rentals` currently phone-only) with a
   contextual "book online" prompt pointing at the existing `/booking/` calendar — the
   non-salesy internal-CTA pass already scoped as QW-5.
3. **Adventure Pass entry point.** A single, honest Pass CTA on the highest-intent surfaces
   (booking, itineraries, Vernal guide) pointing at the hotel platform's Pass signup — the
   first adoption surface the content site has ever had. (Depends on a product decision about
   where Pass lives cross-property; see Dependencies.)
4. **Surface the real social proof.** Bring the genuine 5.0★ / 82-review signal (flagged in M5
   QW-8) onto the money pages to reduce the "is this legit / safe for kids" objection that
   suppresses booking conversion.

**Explicitly not in M1:** no new field media (that's M4), no new destination articles (M3), no
schema/routing/layout redesign, and nothing in the frozen V1.0 hotel repo. M1 is a
conversion-copy and internal-linking pass, consistent with the site's "content-only, platform
frozen" posture.

**Why it's safe and fast.** It reuses components that already exist (the lodging callout
pattern already lives in `guides/moab-utv-tours`; `TourCta` already renders pricing site-wide),
it invents no facts (promo code, pricing, and reviews are all real and already on the site or
the partner agreement), and it passes the existing validators unchanged (internal links,
alt-text, thin-content floors are unaffected by adding CTAs).

---

## 5. Sequencing & Dependencies

- **M1 → M2 → M3** can run largely in sequence within desk editorial windows, or M1 and the
  M2 map/graphics in parallel (different skill sets: conversion copy vs. cartography/dataviz).
- **M4 (field media)** should begin its **Day 6 (town + UTV)** shoot as soon as an owner window
  opens, because it produces the tour highlight reel that *amplifies* the M1 booking CTAs — M1
  makes the CTA present and tracked; M4 makes it convert harder. Order per M5 §9.
- **Dependencies to confirm with the owner before M1 ships:**
  - The exact hotel referral URL and whether it should carry a `ref`/UTM parameter in addition
    to the `ADVENTURE` promo (promo is the load-bearing signal regardless).
  - Whether/where **Adventure Pass** is offered to content-site visitors (cross-property product
    decision) — if undecided, ship M1 items 1, 2, 4 now and stage item 3.
  - That the 10%-off partnership and the 5.0★/82-review figures are current and honored (trust
    risk — never publish an unhonored discount or unverified rating).

---

## 6. How Success Is Measured

- **Bookings:** `/booking/` calendar starts and completed bookings, segmented to traffic from
  the UTV money pages that received CTA work.
- **Hotel referrals / partner revenue:** volume of `ADVENTURE`-promo referrals appearing on the
  hotel's monthly reconciliation (measured on the V1.0 side, now that the content site feeds
  it) — the first time content-site → hotel referrals become countable at all.
- **Adventure Pass:** signups attributable to content-site entry points (once item 3 ships).
- **SEO (for M2–M6):** Search Console impressions/rankings on the media-upgraded and
  newly-expanded clusters; dwell-time/bounce on map- and photo-upgraded pages.

---

*Roadmap complete. This document is the only change to the working tree: no architecture,
content, MDX, schema, routing, component, or build was modified; no build was run; no commit was
made. It proposes; it does not implement.*
