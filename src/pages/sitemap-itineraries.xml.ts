// Split sitemap — itinerary pages (Build Guide §7.4). Framework only:
// empty until Phase 3. Not linked from robots.txt (see src/lib/sitemap.ts).
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { buildSitemapXml, type SitemapUrl } from '../lib/sitemap';

export const GET: APIRoute = async () => {
  const entries = await getCollection('itineraries', ({ data }) => !data.draft);
  const urls: SitemapUrl[] = entries.map((e) => ({
    loc: `itineraries/${e.id}/`,
    lastmod: e.data.updatedDate,
  }));
  return new Response(buildSitemapXml(urls), { headers: { 'Content-Type': 'application/xml' } });
};
