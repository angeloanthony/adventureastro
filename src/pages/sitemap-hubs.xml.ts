// Split sitemap — pillars + guides (Build Guide §7.4). Framework only:
// there are no hub pillar pages yet, so this currently emits an empty
// urlset. Not linked from robots.txt (see src/lib/sitemap.ts).
import type { APIRoute } from 'astro';
import { buildSitemapXml } from '../lib/sitemap';

export const GET: APIRoute = () => {
  const urls: { loc: string }[] = [];
  return new Response(buildSitemapXml(urls), { headers: { 'Content-Type': 'application/xml' } });
};
