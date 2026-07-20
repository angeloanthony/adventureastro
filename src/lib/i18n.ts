// src/lib/i18n.ts — locale registry + pure URL/locale helpers.
//
// P1 INFRASTRUCTURE ONLY. English is the master and the ONLY language with
// content today. Everything here is existence-aware: helpers report which
// locales actually have content, and the callers (LanguageSwitcher, hreflang
// in BaseLayout) render nothing while that set is just ['en']. The machinery
// is real and goes live automatically the moment localized content exists —
// no code change required at that point, only data.
//
// URL policy is FROZEN (astro.config.mjs): directory URLs, trailing slash,
// master at root ('/hiking/'), each non-default locale prefixed ('/es/hiking/').
// Never hardcode a locale prefix — route through localizedPath()/switchLocalePath().

export interface LocaleMeta {
  /** BCP-47 short code used in the URL prefix. */
  code: string;
  /** Display name in the language's own words (for the switcher). */
  name: string;
  /** Text direction. */
  dir: 'ltr' | 'rtl';
  /** Open Graph og:locale value. */
  ogLocale: string;
  /** hreflang attribute value (region-qualified). */
  hreflang: string;
}

// The full roadmap of locales. `hasContent: false` means the locale is
// registered but has no translated pages yet, so it is invisible everywhere
// (existence-awareness). Flip to true — or better, derive it from real
// content existence in P2 — when that locale's pages are committed.
export const LOCALES = [
  { code: 'en', name: 'English',    dir: 'ltr', ogLocale: 'en_US', hreflang: 'en-US' },
  { code: 'es', name: 'Español',    dir: 'ltr', ogLocale: 'es_US', hreflang: 'es-US' },
  { code: 'it', name: 'Italiano',   dir: 'ltr', ogLocale: 'it_IT', hreflang: 'it-IT' },
  { code: 'pt', name: 'Português',  dir: 'ltr', ogLocale: 'pt_PT', hreflang: 'pt-PT' },
  { code: 'fr', name: 'Français',   dir: 'ltr', ogLocale: 'fr_FR', hreflang: 'fr-FR' },
  { code: 'de', name: 'Deutsch',    dir: 'ltr', ogLocale: 'de_DE', hreflang: 'de-DE' },
] as const satisfies readonly LocaleMeta[];

export const DEFAULT_LOCALE = 'en';
export type Locale = (typeof LOCALES)[number]['code'];

/** Codes of every registered locale (the roadmap, not what has content). */
export const LOCALE_CODES = LOCALES.map((l) => l.code) as readonly Locale[];

export function getLocaleMeta(code: string): LocaleMeta {
  return LOCALES.find((l) => l.code === code) ?? LOCALES[0];
}

export function isRtl(code: string): boolean {
  return getLocaleMeta(code).dir === 'rtl';
}

/**
 * Detect the active locale from a URL path.
 * '/es/hiking/' -> 'es'; '/hiking/' -> 'en' (default, unprefixed).
 */
export function getLangFromUrl(url: URL): Locale {
  const first = url.pathname.split('/').filter(Boolean)[0];
  const hit = LOCALES.find((l) => l.code === first && l.code !== DEFAULT_LOCALE);
  return (hit?.code ?? DEFAULT_LOCALE) as Locale;
}

// Per-locale registry of slugs that have a committed translation. One Set per
// non-default locale; a slug present in locale L's Set means L has a page for
// it, which is what lights up hreflang + the language switcher there. Slugs are
// normalized the same way BaseLayout/LanguageSwitcher derive them ('' = home,
// no leading/trailing slash otherwise). Add a slug to its locale's Set — one
// line per slug — as each page/locale is translated; nothing else in the
// runtime changes (existence check only). Locales with no content yet (it/pt)
// carry an empty Set and stay invisible everywhere (existence-awareness).
const ES_SLUGS = new Set([
  '', 'booking', 'about', 'faq', 'privacy-policy', 'cancellation-policy', 'safety-guidelines', 'utv', // P3A
  'dinosaur-national-monument', // P3B
  'hiking', 'fishing', 'camping', 'scenic-drives', 'things-to-do', 'guides', 'itineraries', // P3C
  'atv-trails-vernal-utah', 'jeep-trails-vernal-utah', 'from/salt-lake-city', 'things-to-do/best-restaurants-vernal-utah', // P3D
  // P4B — first localized MDX spoke batch (UTV hub). Compound slug = `hub/base-id`
  // (the translated file is `utv/<base-id>.es.mdx`); lights up hreflang + the
  // language switcher on both the English and Spanish spoke.
  'utv/backcountry-tours-vernal-utah', 'utv/beginners-guide-to-utv-tours-vernal',
  'utv/best-utv-trails-vernal', 'utv/family-utv-guide-vernal', 'utv/group-utv-tours-vernal',
  'utv/private-utv-tours-vernal', 'utv/side-by-side-rentals-vernal-utah',
  // P4C — Spanish hiking hub batch (16 spokes).
  'hiking/alpine-lakes-hiking-high-uintas', 'hiking/beginner-hiking-guide-near-vernal',
  'hiking/best-hikes-in-dinosaur-national-monument', 'hiking/bird-watching-near-vernal',
  'hiking/dog-friendly-hiking-near-vernal', 'hiking/fall-hiking-near-vernal',
  'hiking/family-hiking-near-vernal', 'hiking/high-uintas-backpacking-guide',
  'hiking/high-uintas-day-hikes', 'hiking/kings-peak-hiking-guide',
  'hiking/photography-hikes-near-vernal', 'hiking/spring-hiking-near-vernal',
  'hiking/summer-hiking-near-vernal', 'hiking/wildflower-hiking-near-vernal',
  'hiking/wildlife-hiking-guide-near-vernal', 'hiking/winter-hiking-near-vernal',
  // P4D — Spanish fishing hub batch (4 spokes).
  'fishing/fishing-flaming-gorge', 'fishing/fishing-red-fleet-reservoir',
  'fishing/fishing-steinaker-reservoir', 'fishing/green-river-fly-fishing',
  // P4E — Spanish camping hub batch (4 spokes).
  'camping/camping-at-flaming-gorge', 'camping/camping-at-red-fleet-state-park',
  'camping/camping-at-steinaker-state-park', 'camping/camping-in-ashley-national-forest',
  // P4F — Spanish scenic-drives hub batch (4 spokes).
  'scenic-drives/flaming-gorge-uintas-scenic-byway', 'scenic-drives/red-cloud-loop-scenic-drive',
  'scenic-drives/sheep-creek-geological-loop', 'scenic-drives/cub-creek-road-tour-of-the-tilted-rocks',
  // P4G — Spanish guides hub batch (9 spokes).
  'guides/ultimate-guide-to-vernal-utah', 'guides/ultimate-guide-to-flaming-gorge',
  'guides/ultimate-guide-to-ashley-national-forest', 'guides/ultimate-guide-to-red-fleet-state-park',
  'guides/ultimate-guide-to-steinaker-state-park', 'guides/moab-utv-tours',
  'guides/vernal-weather-guide', 'guides/what-to-bring', 'guides/what-to-wear-utv-tour',
  // P4H — Spanish itineraries hub batch (9 spokes). Compound slug = `itineraries/<base-id>`.
  'itineraries/2-day-family-itinerary', 'itineraries/3-day-adventure-itinerary',
  'itineraries/one-day-adventure-vernal', 'itineraries/photography-weekend-vernal',
  'itineraries/romantic-weekend-dinosaur-country', 'itineraries/weekend-fishing-trip-vernal',
  'itineraries/weekend-road-trip-from-denver', 'itineraries/weekend-road-trip-from-grand-junction',
  'itineraries/weekend-road-trip-from-salt-lake-city',
  // P4I — Spanish things-to-do hub batch (2 spokes).
  'things-to-do/vernal-utah-attractions', 'things-to-do/fun-things-to-do-vernal-utah-kids',
  // P4J — Spanish dinosaur-national-monument hub batch (2 spokes). Final Spanish batch.
  'dinosaur-national-monument/visiting-dinosaur-national-monument',
  'dinosaur-national-monument/petroglyphs-rock-art-vernal',
]);

// The registry itself: every non-default locale mapped to its slug Set. New
// locales (it, pt, …) start with an empty Set and are populated batch by batch
// exactly as Spanish was — no code change to getAvailableLocales required.
// Italian translations, added batch by batch exactly as Spanish was.
const IT_SLUGS = new Set([
  // P6 — Italian inline pages (mirrors Spanish P3A–P3D): home/commercial,
  // DNM inline, 7 activity-hub pillars, 4 city/legacy/restaurant pages.
  '', 'booking', 'about', 'faq', 'privacy-policy', 'cancellation-policy', 'safety-guidelines', 'utv',
  'dinosaur-national-monument',
  'hiking', 'fishing', 'camping', 'scenic-drives', 'things-to-do', 'guides', 'itineraries',
  'atv-trails-vernal-utah', 'jeep-trails-vernal-utah', 'from/salt-lake-city', 'things-to-do/best-restaurants-vernal-utah',
  // P5A — Italian UTV hub batch (7 spokes). Compound slug = `utv/<base-id>`.
  'utv/backcountry-tours-vernal-utah', 'utv/beginners-guide-to-utv-tours-vernal',
  'utv/best-utv-trails-vernal', 'utv/family-utv-guide-vernal', 'utv/group-utv-tours-vernal',
  'utv/private-utv-tours-vernal', 'utv/side-by-side-rentals-vernal-utah',
  // P5B — Italian hiking hub batch (16 spokes).
  'hiking/alpine-lakes-hiking-high-uintas', 'hiking/beginner-hiking-guide-near-vernal',
  'hiking/best-hikes-in-dinosaur-national-monument', 'hiking/bird-watching-near-vernal',
  'hiking/dog-friendly-hiking-near-vernal', 'hiking/fall-hiking-near-vernal',
  'hiking/family-hiking-near-vernal', 'hiking/high-uintas-backpacking-guide',
  'hiking/high-uintas-day-hikes', 'hiking/kings-peak-hiking-guide',
  'hiking/photography-hikes-near-vernal', 'hiking/spring-hiking-near-vernal',
  'hiking/summer-hiking-near-vernal', 'hiking/wildflower-hiking-near-vernal',
  'hiking/wildlife-hiking-guide-near-vernal', 'hiking/winter-hiking-near-vernal',
  // P5C — Italian fishing hub batch (4 spokes).
  'fishing/fishing-flaming-gorge', 'fishing/fishing-red-fleet-reservoir',
  'fishing/fishing-steinaker-reservoir', 'fishing/green-river-fly-fishing',
  // P5D — Italian camping hub batch (4 spokes).
  'camping/camping-at-flaming-gorge', 'camping/camping-at-red-fleet-state-park',
  'camping/camping-at-steinaker-state-park', 'camping/camping-in-ashley-national-forest',
  // P5E — Italian scenic-drives hub batch (4 spokes).
  'scenic-drives/flaming-gorge-uintas-scenic-byway', 'scenic-drives/red-cloud-loop-scenic-drive',
  'scenic-drives/sheep-creek-geological-loop', 'scenic-drives/cub-creek-road-tour-of-the-tilted-rocks',
  // P5F — Italian guides hub batch (9 spokes).
  'guides/moab-utv-tours', 'guides/ultimate-guide-to-ashley-national-forest',
  'guides/ultimate-guide-to-flaming-gorge', 'guides/ultimate-guide-to-red-fleet-state-park',
  'guides/ultimate-guide-to-steinaker-state-park', 'guides/ultimate-guide-to-vernal-utah',
  'guides/vernal-weather-guide', 'guides/what-to-bring', 'guides/what-to-wear-utv-tour',
  // P5G — Italian itineraries hub batch (9 spokes).
  'itineraries/2-day-family-itinerary', 'itineraries/3-day-adventure-itinerary',
  'itineraries/one-day-adventure-vernal', 'itineraries/photography-weekend-vernal',
  'itineraries/romantic-weekend-dinosaur-country', 'itineraries/weekend-fishing-trip-vernal',
  'itineraries/weekend-road-trip-from-denver', 'itineraries/weekend-road-trip-from-grand-junction',
  'itineraries/weekend-road-trip-from-salt-lake-city',
  // P5H — Italian things-to-do hub batch (2 spokes).
  'things-to-do/vernal-utah-attractions', 'things-to-do/fun-things-to-do-vernal-utah-kids',
  // P5I — Italian dinosaur-national-monument hub batch (2 spokes).
  'dinosaur-national-monument/visiting-dinosaur-national-monument',
  'dinosaur-national-monument/petroglyphs-rock-art-vernal',
]);

// Portuguese translations, added batch by batch exactly as Spanish/Italian were.
const PT_SLUGS = new Set([
  // P7-P6 — Portuguese inline pages (mirrors Italian P6 / French P8-P6): home/commercial,
  // DNM inline, 7 activity-hub pillars, 4 city/legacy/restaurant pages.
  '', 'booking', 'about', 'faq', 'privacy-policy', 'cancellation-policy', 'safety-guidelines', 'utv',
  'dinosaur-national-monument',
  'hiking', 'fishing', 'camping', 'scenic-drives', 'things-to-do', 'guides', 'itineraries',
  'atv-trails-vernal-utah', 'jeep-trails-vernal-utah', 'from/salt-lake-city', 'things-to-do/best-restaurants-vernal-utah',
  // P7C — Portuguese UTV hub batch (7 spokes). Compound slug = `utv/<base-id>`.
  'utv/backcountry-tours-vernal-utah', 'utv/beginners-guide-to-utv-tours-vernal',
  'utv/best-utv-trails-vernal', 'utv/family-utv-guide-vernal', 'utv/group-utv-tours-vernal',
  'utv/private-utv-tours-vernal', 'utv/side-by-side-rentals-vernal-utah',
  // P7D — Portuguese fishing hub batch (4 spokes).
  'fishing/fishing-flaming-gorge', 'fishing/fishing-red-fleet-reservoir',
  'fishing/fishing-steinaker-reservoir', 'fishing/green-river-fly-fishing',
  // P7E — Portuguese camping hub batch (4 spokes).
  'camping/camping-at-flaming-gorge', 'camping/camping-at-red-fleet-state-park',
  'camping/camping-at-steinaker-state-park', 'camping/camping-in-ashley-national-forest',
  // P7F — Portuguese hiking hub batch (16 spokes).
  'hiking/alpine-lakes-hiking-high-uintas', 'hiking/beginner-hiking-guide-near-vernal',
  'hiking/best-hikes-in-dinosaur-national-monument', 'hiking/bird-watching-near-vernal',
  'hiking/dog-friendly-hiking-near-vernal', 'hiking/fall-hiking-near-vernal',
  'hiking/family-hiking-near-vernal', 'hiking/high-uintas-backpacking-guide',
  'hiking/high-uintas-day-hikes', 'hiking/kings-peak-hiking-guide',
  'hiking/photography-hikes-near-vernal', 'hiking/spring-hiking-near-vernal',
  'hiking/summer-hiking-near-vernal', 'hiking/wildflower-hiking-near-vernal',
  'hiking/wildlife-hiking-guide-near-vernal', 'hiking/winter-hiking-near-vernal',
  // P7G — Portuguese scenic-drives hub batch (4 spokes).
  'scenic-drives/cub-creek-road-tour-of-the-tilted-rocks', 'scenic-drives/flaming-gorge-uintas-scenic-byway',
  'scenic-drives/red-cloud-loop-scenic-drive', 'scenic-drives/sheep-creek-geological-loop',
  // P7H — Portuguese guides hub batch (9 spokes).
  'guides/moab-utv-tours', 'guides/ultimate-guide-to-ashley-national-forest',
  'guides/ultimate-guide-to-flaming-gorge', 'guides/ultimate-guide-to-red-fleet-state-park',
  'guides/ultimate-guide-to-steinaker-state-park', 'guides/ultimate-guide-to-vernal-utah',
  'guides/vernal-weather-guide', 'guides/what-to-bring', 'guides/what-to-wear-utv-tour',
  // P7I — Portuguese itineraries hub batch (9 spokes).
  'itineraries/2-day-family-itinerary', 'itineraries/3-day-adventure-itinerary',
  'itineraries/one-day-adventure-vernal', 'itineraries/photography-weekend-vernal',
  'itineraries/romantic-weekend-dinosaur-country', 'itineraries/weekend-fishing-trip-vernal',
  'itineraries/weekend-road-trip-from-denver', 'itineraries/weekend-road-trip-from-grand-junction',
  'itineraries/weekend-road-trip-from-salt-lake-city',
  // P7J — Portuguese things-to-do hub batch (2 spokes).
  'things-to-do/vernal-utah-attractions', 'things-to-do/fun-things-to-do-vernal-utah-kids',
  // P7K — Portuguese dinosaur-national-monument hub batch (2 spokes) — Portuguese MDX spokes complete.
  'dinosaur-national-monument/visiting-dinosaur-national-monument',
  'dinosaur-national-monument/petroglyphs-rock-art-vernal',
]);

// French translations, added batch by batch exactly as Spanish/Italian/Portuguese were.
const FR_SLUGS = new Set([
  // P8-P6 — French inline pages (mirrors Italian P6): home/commercial,
  // DNM inline, 7 activity-hub pillars, 4 city/legacy/restaurant pages.
  '', 'booking', 'about', 'faq', 'privacy-policy', 'cancellation-policy', 'safety-guidelines', 'utv',
  'dinosaur-national-monument',
  'hiking', 'fishing', 'camping', 'scenic-drives', 'things-to-do', 'guides', 'itineraries',
  'atv-trails-vernal-utah', 'jeep-trails-vernal-utah', 'from/salt-lake-city', 'things-to-do/best-restaurants-vernal-utah',
  // P8A — French UTV hub batch (7 spokes). Compound slug = `utv/<base-id>`.
  'utv/backcountry-tours-vernal-utah', 'utv/beginners-guide-to-utv-tours-vernal',
  'utv/best-utv-trails-vernal', 'utv/family-utv-guide-vernal', 'utv/group-utv-tours-vernal',
  'utv/private-utv-tours-vernal', 'utv/side-by-side-rentals-vernal-utah',
  // P8B — French hiking hub batch (16 spokes).
  'hiking/alpine-lakes-hiking-high-uintas', 'hiking/beginner-hiking-guide-near-vernal',
  'hiking/best-hikes-in-dinosaur-national-monument', 'hiking/bird-watching-near-vernal',
  'hiking/dog-friendly-hiking-near-vernal', 'hiking/fall-hiking-near-vernal',
  'hiking/family-hiking-near-vernal', 'hiking/high-uintas-backpacking-guide',
  'hiking/high-uintas-day-hikes', 'hiking/kings-peak-hiking-guide',
  'hiking/photography-hikes-near-vernal', 'hiking/spring-hiking-near-vernal',
  'hiking/summer-hiking-near-vernal', 'hiking/wildflower-hiking-near-vernal',
  'hiking/wildlife-hiking-guide-near-vernal', 'hiking/winter-hiking-near-vernal',
  // P8C — French fishing hub batch (4 spokes).
  'fishing/fishing-flaming-gorge', 'fishing/fishing-red-fleet-reservoir',
  'fishing/fishing-steinaker-reservoir', 'fishing/green-river-fly-fishing',
  // P8D — French camping hub batch (4 spokes).
  'camping/camping-at-flaming-gorge', 'camping/camping-at-red-fleet-state-park',
  'camping/camping-at-steinaker-state-park', 'camping/camping-in-ashley-national-forest',
  // P8E — French scenic-drives hub batch (4 spokes).
  'scenic-drives/cub-creek-road-tour-of-the-tilted-rocks', 'scenic-drives/flaming-gorge-uintas-scenic-byway',
  'scenic-drives/red-cloud-loop-scenic-drive', 'scenic-drives/sheep-creek-geological-loop',
  // P8F — French guides hub batch (9 spokes).
  'guides/moab-utv-tours', 'guides/ultimate-guide-to-ashley-national-forest',
  'guides/ultimate-guide-to-flaming-gorge', 'guides/ultimate-guide-to-red-fleet-state-park',
  'guides/ultimate-guide-to-steinaker-state-park', 'guides/ultimate-guide-to-vernal-utah',
  'guides/vernal-weather-guide', 'guides/what-to-bring', 'guides/what-to-wear-utv-tour',
  // P8G — French itineraries hub batch (9 spokes).
  'itineraries/2-day-family-itinerary', 'itineraries/3-day-adventure-itinerary',
  'itineraries/one-day-adventure-vernal', 'itineraries/photography-weekend-vernal',
  'itineraries/romantic-weekend-dinosaur-country', 'itineraries/weekend-fishing-trip-vernal',
  'itineraries/weekend-road-trip-from-denver', 'itineraries/weekend-road-trip-from-grand-junction',
  'itineraries/weekend-road-trip-from-salt-lake-city',
  // P8H — French things-to-do hub batch (2 spokes).
  'things-to-do/vernal-utah-attractions', 'things-to-do/fun-things-to-do-vernal-utah-kids',
  // P8I — French dinosaur-national-monument hub batch (2 spokes) — FINAL French MDX batch.
  'dinosaur-national-monument/visiting-dinosaur-national-monument', 'dinosaur-national-monument/petroglyphs-rock-art-vernal',
]);

// German translations, added batch by batch exactly as Spanish/Italian/Portuguese/French were.
const DE_SLUGS = new Set([
  // P9A — German UTV hub batch (7 spokes). Compound slug = `utv/<base-id>`.
  'utv/backcountry-tours-vernal-utah', 'utv/beginners-guide-to-utv-tours-vernal',
  'utv/best-utv-trails-vernal', 'utv/family-utv-guide-vernal', 'utv/group-utv-tours-vernal',
  'utv/private-utv-tours-vernal', 'utv/side-by-side-rentals-vernal-utah',
]);

const LOCALE_SLUGS: Partial<Record<Locale, ReadonlySet<string>>> = {
  es: ES_SLUGS,
  it: IT_SLUGS,
  pt: PT_SLUGS,
  fr: FR_SLUGS,
  de: DE_SLUGS,
};

/**
 * Which locales actually have content for a given page. Existence check
 * against the per-locale registry: English (the master) is always present;
 * any non-default locale whose Set contains `slug` is added. Every other slug
 * resolves to English only, which is what keeps the switcher and hreflang
 * silent there.
 */
export function getAvailableLocales(slug: string = ''): Locale[] {
  const clean = slug.replace(/^\/+|\/+$/g, '');
  const codes = new Set<Locale>([DEFAULT_LOCALE as Locale]);
  for (const [code, slugs] of Object.entries(LOCALE_SLUGS)) {
    if (slugs.has(clean)) codes.add(code as Locale);
  }
  return LOCALES.filter((l) => codes.has(l.code)).map((l) => l.code) as Locale[];
}

/**
 * Split a content-collection entry id into its locale + base id. Translated
 * spoke/itinerary MDX uses a filename-suffix convention — `article.es.mdx`
 * loads as id `article.es`, `article.mdx` as id `article`. Only a trailing
 * `.`-segment that EXACTLY matches a registered non-default locale code counts;
 * kebab slugs never contain dots, so an English id is always returned as-is
 * (`{ locale: 'en', baseId: <id> }`). This is the ONE place the suffix
 * convention is decoded — routes, sitemaps, and the linking network all read
 * it so a translated file is picked up with no per-file wiring (P4A infra).
 */
export function parseEntryLocale(id: string): { locale: Locale; baseId: string } {
  const dot = id.lastIndexOf('.');
  if (dot > 0) {
    const code = id.slice(dot + 1);
    if (LOCALES.some((l) => l.code === code && l.code !== DEFAULT_LOCALE)) {
      return { locale: code as Locale, baseId: id.slice(0, dot) };
    }
  }
  return { locale: DEFAULT_LOCALE as Locale, baseId: id };
}

/**
 * The URL for a normalized page slug in a target locale. Master is unprefixed;
 * other locales get a '/{code}' prefix. Preserves the site's trailing-slash,
 * directory-URL policy. slug '' -> home.
 */
export function localizedPath(slug: string, locale: string = DEFAULT_LOCALE): string {
  const clean = slug.replace(/^\/+|\/+$/g, '');
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;
  return clean ? `${prefix}/${clean}/` : `${prefix}/`;
}

/**
 * Swap the locale prefix on a full current path (for the language switcher).
 * '/es/hiking/' + 'en' -> '/hiking/'; '/hiking/' + 'es' -> '/es/hiking/'.
 */
export function switchLocalePath(currentPath: string, target: string): string {
  const segs = currentPath.split('/').filter(Boolean);
  if (segs[0] && LOCALES.some((l) => l.code === segs[0] && l.code !== DEFAULT_LOCALE)) {
    segs.shift();
  }
  return localizedPath(segs.join('/'), target);
}

// --- Locale formatting utilities (P2B framework) ---

/** BCP-47 tag for Intl APIs — reuses the region-qualified hreflang value
 *  ('en-US', 'es-US', 'it-IT', 'pt-PT'). One source, no second table. */
export function getIntlLocale(code: string): string {
  return getLocaleMeta(code).hreflang;
}

/** JSON-LD `inLanguage` value for a locale (same BCP-47 tag). */
export function getInLanguage(code: string = DEFAULT_LOCALE): string {
  return getIntlLocale(code);
}

/** Long-form date in the active locale. For 'en' this is byte-identical to the
 *  previous hardcoded toLocaleDateString('en-US', …) — the P2B fix that stops
 *  English month names leaking onto translated pages (extraction-plan defect). */
export function formatDate(date: Date, code: string = DEFAULT_LOCALE): string {
  return date.toLocaleDateString(getIntlLocale(code), { year: 'numeric', month: 'long', day: 'numeric' });
}
