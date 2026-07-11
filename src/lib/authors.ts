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
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { SITE } from '../config/site';

export type AuthorKey = 'dave' | 'trudy';

export const AUTHORS: Record<AuthorKey, {
  name: string;
  role: string;
  photo: string;
  /** Stable JSON-LD Person @id — identity, not location. Never change. */
  id: string;
  /** Root-relative page the byline + Person schema link to. Phase 3: now
   *  the dedicated author pages — /about/dave/, /about/trudy/. */
  pagePath: string;
  /** Biography for the author page + Person description. OWNER-SUPPLIED /
   *  EXISTING copy only — never invented. Dave's is the verbatim bio the
   *  business already published in the /about/ Person schema; Trudy has no
   *  individual bio on the live site yet → empty (TODO, owner input). */
  bio: string;
  /** Verifiable credentials/experience statements (licenses, years
   *  guiding, certifications). TODO Phase 3: confirm with owners — empty
   *  until supplied, never guessed. */
  credentials: string[];
  /** Areas of expertise — reused verbatim from the business's existing
   *  `knowsAbout` schema on /about/ (owner content, not invented). */
  expertise: string[];
  /** Public profile URLs for Person sameAs (Google Business Profile,
   *  Facebook, etc.). TODO: SITE.social is empty — collect real URLs. */
  sameAs: string[];
}> = {
  dave: {
    name: 'Dave Wilson',
    role: 'Owner & Lead Guide',
    photo: '/images/dave.webp',
    id: `${SITE.url}/#dave-wilson`,
    pagePath: '/about/dave/',
    // Verbatim from the existing /about/ Person schema (owner-published).
    bio: 'Dave Wilson is the owner and lead guide of Adventure Tours Vernal, the premier UTV tour company in the Uintah Basin. Growing up exploring the Wasatch and Oquirrh Mountains, Dave developed a lifelong passion for outdoor adventure. After relocating to Vernal, Utah with his wife Trudy, he founded Adventure Tours Vernal to share the natural wonders of the Uintah Basin — from Dinosaur National Monument to Flaming Gorge — with visitors and locals alike.',
    credentials: [],
    expertise: [
      'UTV tours in Vernal, Utah',
      'Dinosaur National Monument',
      'Flaming Gorge',
      'Uintah Basin backcountry trails',
      'Kawasaki KRX 1000 side-by-side tours',
      'Utah outdoor adventure',
    ],
    sameAs: [],
  },
  trudy: {
    name: 'Trudy Wilson',
    role: 'Co-Owner & Guide',
    photo: '/images/trudy.webp',
    id: `${SITE.url}/#trudy-wilson`,
    pagePath: '/about/trudy/',
    // No Trudy-specific bio exists on the live site — do not invent.
    bio: '',
    credentials: [],
    expertise: [
      'UTV tours in Vernal, Utah',
      'Dinosaur National Monument',
      'Flaming Gorge',
      'Uintah Basin backcountry trails',
      'Kawasaki KRX 1000 side-by-side tours',
      'Utah outdoor adventure',
    ],
    sameAs: [],
  },
};

// Build-time: does the author's headshot exist in public/? Components
// render the <img> only when true so a not-yet-supplied photo never ships
// a broken <img> (validator would fail) — it degrades to an initials
// monogram, and validate-site reports the missing file as a non-blocking
// TODO (owner input), exactly per the Phase 3 brief.
const publicDir = fileURLToPath(new URL('../../public/', import.meta.url));
export function photoExists(key: AuthorKey): boolean {
  const p = AUTHORS[key].photo;
  if (/^https?:\/\//.test(p)) return true;
  return existsSync(publicDir + p.replace(/^\/+/, ''));
}

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
