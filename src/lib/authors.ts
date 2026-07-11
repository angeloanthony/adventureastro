// src/lib/authors.ts — single source for author identity (E-E-A-T,
// Build Guide §1.4, §5.3). SchemaArticle, SchemaItinerary, and
// AuthorByline all read this map, so when the dedicated author pages
// (/about/dave/, /about/trudy/) are built in Phase 3, updating
// pagePath here rewires bylines and Person schema sitewide in one edit.
//
// Phase 2.6: Person `@id` added — a STABLE entity identifier anchored on
// the site root (mirrors the `#business` pattern), deliberately NOT the
// author page URL, so hundreds of Article schemas keep pointing at the
// same Person node even if the author pages move (G2). Never change an
// @id once content ships.
import { SITE } from '../config/site';

export type AuthorKey = 'dave' | 'trudy';

export const AUTHORS: Record<AuthorKey, {
  name: string;
  role: string;
  photo: string;
  /** Stable JSON-LD Person @id — identity, not location. Never change. */
  id: string;
  /** Root-relative page the byline + Person schema link to.
   *  TODO Phase 3: point at the dedicated author pages once built. */
  pagePath: string;
  /** Owner-supplied biography for the author page + Person description.
   *  TODO Phase 3: get real copy from Dave/Trudy — do not invent. */
  bio: string;
  /** Verifiable credentials/experience statements (licenses, years
   *  guiding, certifications). TODO Phase 3: confirm with owners. */
  credentials: string[];
  /** Public profile URLs for Person sameAs (Google Business Profile,
   *  Facebook, etc.). TODO: SITE.social is empty — collect real URLs. */
  sameAs: string[];
}> = {
  dave: {
    name: 'Dave Wilson',
    role: 'UTV guide, co-owner',
    photo: '/images/dave.webp',
    id: `${SITE.url}/#dave-wilson`,
    pagePath: '/about/',
    bio: '',
    credentials: [],
    sameAs: [],
  },
  trudy: {
    name: 'Trudy Wilson',
    role: 'UTV guide, co-owner',
    photo: '/images/trudy.webp',
    id: `${SITE.url}/#trudy-wilson`,
    pagePath: '/about/',
    bio: '',
    credentials: [],
    sameAs: [],
  },
};

/** JSON-LD Person node for an author — every schema component must emit
 *  authors through this so the @id graph stays consistent sitewide. */
export function personJsonLd(key: AuthorKey): Record<string, unknown> {
  const a = AUTHORS[key];
  return {
    '@type': 'Person',
    '@id': a.id,
    name: a.name,
    url: `${SITE.url}${a.pagePath}`,
    jobTitle: a.role,
    ...(a.bio ? { description: a.bio } : {}),
    ...(a.sameAs.length ? { sameAs: a.sameAs } : {}),
  };
}
