// src/content.config.ts — Collection schemas (Build Guide §3.1–3.2).
// The schema is the quality gate: a page cannot build with a >65-char
// title, a missing meta description, no tags, a hero image that doesn't
// exist, or a hub that disagrees with the collection it lives in.
// No sample content is seeded here; collections are empty until Phase 3
// content production begins.
// Astro 6 content-layer API: every collection needs an explicit loader.
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { existsSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { HUB_SLUGS, type HubSlug } from './lib/hubs';

const contentLoader = (dir: string) => glob({ pattern: '**/[^_]*.{md,mdx}', base: `./src/content/${dir}` });
const dataLoader = (dir: string) => glob({ pattern: '**/[^_]*.{json,yaml,yml}', base: `./src/content/${dir}` });

// Build-time validation: hero images must exist in public/ (or be a full
// URL). Fails the build on a typo'd path instead of shipping a broken hero.
const publicDir = fileURLToPath(new URL('../public/', import.meta.url));
const localPath = (p: string) => publicDir + p.replace(/^\/+/, '');
const imageExists = (p: string) => /^https?:\/\//.test(p) || existsSync(localPath(p));
// Hero images are og:image + JSON-LD material: modern format, hard size cap
// (Phase 2.6 — the 13.6MB-favicon incident is why this is a build failure,
// not a review comment). Cap applies to local files; remote URLs pass.
const HERO_MAX_BYTES = 500 * 1024;
const heroImage = () => z.string()
  .refine(imageExists, {
    message: 'heroImage not found in public/ — check the path (e.g. "/images/foo.webp")',
  })
  .refine((p) => /^https?:\/\//.test(p) || /\.(webp|avif)$/i.test(p), {
    message: 'heroImage must be .webp or .avif (guide asset rules)',
  })
  .refine((p) => /^https?:\/\//.test(p) || statSync(localPath(p)).size <= HERO_MAX_BYTES, {
    message: `heroImage exceeds ${HERO_MAX_BYTES / 1024}KB — resize/recompress before shipping`,
  });

// Tags drive RelatedArticles matching and the §8.2 tag-intersection pages;
// matching is exact string equality, so 'Family' vs 'family' would silently
// split the network. Enforce lowercase-kebab at the schema.
const tag = () => z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
  message: 'tags must be lowercase-kebab (e.g. "family", "red-fleet")',
});

// A page can be updated no earlier than it was published.
const datesInOrder = { message: 'updatedDate must be >= publishDate', path: ['updatedDate'] };

// §3.2 — spoke article schema, one per hub collection. `hub` is a literal
// pinned to the collection: authors can omit it, and writing the wrong one
// fails the build (a file in utv/ can never claim hub: 'hiking').
// `tags` is required (min 1) — it drives RelatedArticles ranking, future
// HubIndex grouping, and the §8.2 tag-intersection pages; a spoke without
// tags would be invisible to the linking network.
const spokeSchemaFor = (hub: HubSlug) => z.object({
  title: z.string().max(65),
  description: z.string().min(120).max(165),
  /** Optional social-copy overrides — preserve a legacy page's distinct
   *  og:title / og:description when it deliberately differed from the SEO
   *  title/description (Phase 2 pattern, carried into collections). */
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
  hub: z.literal(hub).default(hub),
  tags: z.array(tag()).min(1),
  publishDate: z.date(),
  updatedDate: z.date(),
  author: z.enum(['dave', 'trudy']),
  heroImage: heroImage(),
  heroAlt: z.string().min(20),
  difficulty: z.enum(['easy', 'moderate', 'hard']).optional(),
  duration: z.string().optional(),
  season: z.array(z.enum(['spring', 'summer', 'fall', 'winter'])).optional(),
  faq: z.array(z.object({ q: z.string(), a: z.string() })).optional(),
  /** Manual related-link overrides: 'article-id' (same hub) or 'hub/article-id'. */
  related: z.array(z.string()).optional(),
  tourCta: z.enum(['utv', 'private', 'sunset', 'none']).default('utv'),
  draft: z.boolean().default(false),
}).refine((d) => d.updatedDate >= d.publishDate, datesInOrder);

// §4.4 — itinerary day structure.
const itineraryDaySchema = z.object({
  label: z.string(), // "Day 1"
  summary: z.string().optional(),
  blocks: z.array(z.object({
    time: z.enum(['morning', 'lunch', 'afternoon', 'dinner', 'evening']),
    activity: z.string(),
    link: z.string().optional(),
  })),
  packingNote: z.string().optional(),
  backupPlanLink: z.string().optional(),
});

const itinerarySchema = z.object({
  title: z.string().max(65),
  description: z.string().min(120).max(165),
  publishDate: z.date(),
  updatedDate: z.date(),
  author: z.enum(['dave', 'trudy']),
  heroImage: heroImage(),
  heroAlt: z.string().min(20),
  days: z.array(itineraryDaySchema),
  faq: z.array(z.object({ q: z.string(), a: z.string() })).optional(),
  related: z.array(z.string()).optional(),
  tourCta: z.enum(['utv', 'private', 'sunset', 'none']).default('utv'),
  draft: z.boolean().default(false),
}).refine((d) => d.updatedDate >= d.publishDate, datesInOrder);

// §3.2 — city landing page data schema, verbatim.
// NOTE: cities/seasons/months use the JSON/YAML dataLoader, not the
// markdown contentLoader — unlike YAML frontmatter, a JSON date is just a
// string, so these three schemas need z.coerce.date() (spoke/itinerary
// schemas stay z.date() since markdown frontmatter dates parse natively).
const citySchema = z.object({
  city: z.string(),
  state: z.string(),
  title: z.string().max(65),
  description: z.string().min(120).max(165),
  driveTimeHours: z.number(),
  driveMiles: z.number(),
  routeSummary: z.string(),
  nearestAirport: z.string().optional(),
  angle: z.string(),
  updatedDate: z.coerce.date(),
});

// §8.2 — /seasons/ and /months/ programmatic data sources.
const seasonSchema = z.object({
  title: z.string().max(65),
  description: z.string().min(120).max(165),
  season: z.enum(['spring', 'summer', 'fall', 'winter']),
  updatedDate: z.coerce.date(),
});

const monthSchema = z.object({
  title: z.string().max(65),
  description: z.string().min(120).max(165),
  month: z.enum([
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december',
  ]),
  updatedDate: z.coerce.date(),
});

/** Frontmatter shape of a spoke entry — inferred straight from the zod
 *  schema so components (HubIndex, RelatedArticles) type against the same
 *  source that validates the content. */
export type SpokeData = ReturnType<typeof spokeSchemaFor>['_output'];

// One collection per hub, generated from the registry so the hub list can
// never drift from src/lib/hubs.ts (Phase-gate correction #5).
const hubCollections = Object.fromEntries(
  HUB_SLUGS.map((hub) => [hub, defineCollection({ loader: contentLoader(hub), schema: spokeSchemaFor(hub) })]),
);

export const collections = {
  ...hubCollections,
  itineraries: defineCollection({ loader: contentLoader('itineraries'), schema: itinerarySchema }),
  cities: defineCollection({ loader: dataLoader('cities'), schema: citySchema }),
  seasons: defineCollection({ loader: dataLoader('seasons'), schema: seasonSchema }),
  months: defineCollection({ loader: dataLoader('months'), schema: monthSchema }),
};
