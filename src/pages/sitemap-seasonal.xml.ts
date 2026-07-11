// Split sitemap — seasonal pillars + monthly pages (Build Guide §7.4).
// Framework only: empty until Phase 3+. Not linked from robots.txt (see
// src/lib/sitemap.ts).
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { buildSitemapXml, type SitemapUrl } from '../lib/sitemap';

export const GET: APIRoute = async () => {
  const [seasons, months] = await Promise.all([
    getCollection('seasons'),
    getCollection('months'),
  ]);
  const urls: SitemapUrl[] = [
    ...seasons.map((s) => ({ loc: `seasons/${s.id}/`, lastmod: s.data.updatedDate })),
    ...months.map((m) => ({ loc: `months/${m.id}/`, lastmod: m.data.updatedDate })),
  ];
  return new Response(buildSitemapXml(urls), { headers: { 'Content-Type': 'application/xml' } });
};
