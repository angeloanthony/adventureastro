// src/lib/urls.ts — URL normalization (Phase-gate correction #8).
// Every SEO component absolutizes through here so content authors can
// pass 'images/foo.webp', '/images/foo.webp', or a full URL and the
// emitted canonical/OG/JSON-LD value is always absolute.
import { SITE } from '../config/site';

/** Absolute URL from a path or already-absolute URL. '' → site root. */
export function absoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl;
  const path = pathOrUrl.replace(/^\/+/, '');
  return path ? `${SITE.url}/${path}` : `${SITE.url}/`;
}
