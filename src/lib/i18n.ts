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

/**
 * Which locales actually have content for a given page.
 *
 * P1: only English has content, so this always returns ['en'] — which is
 * exactly what makes the switcher and hreflang emit nothing today. In P2 this
 * becomes an existence check against committed localized content for `slug`.
 * Signature already accepts the slug so callers never change when that lands.
 */
export function getAvailableLocales(_slug?: string): Locale[] {
  return LOCALES.filter((l) => l.code === DEFAULT_LOCALE).map((l) => l.code) as Locale[];
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
