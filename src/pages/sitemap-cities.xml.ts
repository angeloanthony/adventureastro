// Split sitemap — city landing pages (Build Guide §7.4, §8.4). Splitting
// this out is the early-warning signal for doorway-page trouble: watch
// this sitemap's indexation rate in Search Console once city pages
// exist. Not linked from robots.txt (see src/lib/sitemap.ts).
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { buildSitemapXml, type SitemapUrl } from '../lib/sitemap';
import { citySitemapLoc } from '../lib/hubs';

export const GET: APIRoute = async () => {
  const cities = await getCollection('cities');
  const urls: SitemapUrl[] = cities.map((c) => ({
    loc: citySitemapLoc(c.id),
    lastmod: c.data.updatedDate,
  }));
  return new Response(buildSitemapXml(urls), { headers: { 'Content-Type': 'application/xml' } });
};
