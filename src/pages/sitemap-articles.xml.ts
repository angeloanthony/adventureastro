// Split sitemap — spoke articles across every hub collection (Build
// Guide §7.4). Hub list and URL shape come from the hub registry
// (src/lib/hubs.ts) — never a private copy. Framework only: collections
// are empty until Phase 3 content production begins. Not linked from
// robots.txt (see src/lib/sitemap.ts).
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { buildSitemapXml, type SitemapUrl } from '../lib/sitemap';
import { HUB_SLUGS, spokeSitemapLoc } from '../lib/hubs';
import type { SpokeData } from '../content.config';

export const GET: APIRoute = async () => {
  const urls: SitemapUrl[] = [];
  for (const hub of HUB_SLUGS) {
    const entries = (await getCollection(hub)) as unknown as { id: string; data: SpokeData }[];
    for (const entry of entries.filter((e) => !e.data.draft)) {
      urls.push({ loc: spokeSitemapLoc(hub, entry.id), lastmod: entry.data.updatedDate });
    }
  }
  return new Response(buildSitemapXml(urls), { headers: { 'Content-Type': 'application/xml' } });
};
