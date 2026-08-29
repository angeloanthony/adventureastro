// src/lib/hubs.ts — THE single hub registry (Phase-gate correction #5).
// One place defines each hub's identity: the slug IS the collection name
// IS the URL segment. HubIndex, RelatedArticles, the layouts, and the
// split sitemaps all read this module — never carry a private hub list.
//
// Deviations from the Build Guide §3.2 hub enum, both deliberate:
//  - 'dnm' → 'dinosaur-national-monument': the collection name is the
//    canonical slug (matches the §2.1 URL /dinosaur-national-monument/),
//    so hub, collection, and URL segment can never disagree.
//  - 'family' removed: the guide's §2.1 URL map has no /family/ hub.
//    "Family" is a tag (e.g. tags: ['family']) that cuts across hubs,
//    which is exactly what the §8.2 "Best [activity] for families"
//    tag-intersection pages need.
//
// URL SCHEME (G2 — DECIDED, owner-approved 2026-07-10): directory URLs
// with trailing slash (astro.config: trailingSlash 'always', build.format
// 'directory'). These helpers are the ONLY URL-shape source — no page,
// sitemap, or component may hardcode a hub/spoke/city URL shape.

export const HUB_SLUGS = [
  'utv',
  'atv',
  'jeep',
  'dinosaur-national-monument',
  'things-to-do', // guide §2.2 hub model — added with the G2 decision
  'hiking',
  'camping',
  'fishing',
  'scenic-drives',
  'guides',
  'outlaw-country', // Story Hub cluster — Outlaw Trail / Browns Park history
] as const;

import { parseEntryLocale, localizedPath } from './i18n';

export type HubSlug = (typeof HUB_SLUGS)[number];

// Collections whose entries render as spoke-style articles and participate in
// the RelatedArticles linking network. Itineraries are the "Planning
// Authority" cluster: they render with the SAME editorial pattern as activity
// spokes, but live at /itineraries/[id]/ via their own route
// (src/pages/itineraries/[id].astro), NOT the generic [hub]/[id].astro. So
// 'itineraries' is a linkable collection yet deliberately NOT a HUB_SLUG — it
// has a bespoke pillar + route and must never be emitted by the generic
// activity-spoke route (that would collide with the dedicated route).
export type LinkCollection = HubSlug | 'itineraries';

export const HUBS: Record<HubSlug, { name: string }> = {
  utv: { name: 'UTV Trails & Tours' },
  atv: { name: 'ATV Trails' },
  jeep: { name: 'Jeep Trails' },
  'dinosaur-national-monument': { name: 'Dinosaur National Monument' },
  'things-to-do': { name: 'Things to Do in Vernal' },
  hiking: { name: 'Hiking' },
  camping: { name: 'Camping' },
  fishing: { name: 'Fishing' },
  'scenic-drives': { name: 'Scenic Drives' },
  guides: { name: 'Destination Guides' },
  'outlaw-country': { name: 'Outlaw Country' },
};

/** Root-relative href of a spoke article page. Accepts any LinkCollection so
 *  itinerary spokes (/itineraries/[id]/) get the same helper as hub spokes.
 *  Locale-aware (P4A): a translated entry id (`article.es`) yields the
 *  locale-prefixed URL (`/es/hub/article/`); an English id is unchanged
 *  (`/hub/id/`). Callers pass a raw collection entry id and get the right
 *  URL for that file's locale with no extra plumbing. */
export const spokeHref = (hub: LinkCollection, id: string): string => {
  const { locale, baseId } = parseEntryLocale(id);
  return localizedPath(`${hub}/${baseId}`, locale);
};

/** Root-relative href of a hub's pillar page. */
export const pillarHref = (hub: HubSlug): string => `/${hub}/`;

/** Root-relative href of a city landing page (guide §4.3 "from" pages). */
export const cityHref = (id: string): string => `/from/${id}/`;

// tourHref() joins these when the first hand-built /tours/ page exists —
// tour pages have no collection (§9.2), so there is nothing to emit yet.
