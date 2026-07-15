// author-about-business.ts — extracted body prose (P2E). The "About
// Adventure Tours Vernal" paragraph AuthorLayout.astro renders on both
// /about/dave/ and /about/trudy/ — shared body copy that was previously
// hardcoded directly in the layout instead of routed through the
// page-content system. English source of truth; rendered via set:html.
// Future locales add a variant. Relocation only — no visible change.
import { SITE } from '../config/site';
import { DEFAULT_LOCALE } from '../lib/i18n';

export const bodyHtml = `
  <p>
    ${SITE.name} is a locally owned UTV tour company in ${SITE.address.city}, ${SITE.address.region}, founded by ${SITE.owners[0]} and ${SITE.owners[1]}. Tours run on a fleet of ${SITE.fleet.count} ${SITE.fleet.vehicle} side-by-sides through the Uintah Basin backcountry — from Dinosaur National Monument to Flaming Gorge.
    <a href="/about/">Read the full story</a>.
  </p>
`;

/**
 * Locale-aware accessor (P2D pattern). Existence-aware, same pattern as
 * getAvailableLocales() in lib/i18n.ts: every locale falls back to
 * English until a translated variant is committed here. Callers that
 * don't need locale awareness keep importing `bodyHtml` directly.
 */
export function getBodyHtml(_locale: string = DEFAULT_LOCALE): string {
  return bodyHtml;
}
