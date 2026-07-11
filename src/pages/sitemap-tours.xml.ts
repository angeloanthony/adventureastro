// Split sitemap — money pages (Build Guide §7.4). Framework only: tour
// pages don't live in a content collection (they're hand-built templates
// per §9.2), so this list is populated by hand once /tours/ exists in
// Phase 2+. Not linked from robots.txt (see src/lib/sitemap.ts).
import type { APIRoute } from 'astro';
import { buildSitemapXml } from '../lib/sitemap';

export const GET: APIRoute = () => {
  const urls: { loc: string }[] = [];
  return new Response(buildSitemapXml(urls), { headers: { 'Content-Type': 'application/xml' } });
};
