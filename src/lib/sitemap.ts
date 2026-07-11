// src/lib/sitemap.ts — shared XML builder for the split sitemap
// architecture (Build Guide §7.4). NOT yet wired into robots.txt or the
// live sitemap-index — the existing @astrojs/sitemap integration still
// covers all current pages. These split, per-type sitemaps become the
// real indexation surface once the Phase 2 URL migration + Phase 3 hub
// content exist; cutting robots.txt over to them is a deliberate,
// separately-approved step (a live-indexation change), not a Phase 1
// default.
import { SITE } from '../config/site';

export interface SitemapUrl {
  loc: string; // path relative to SITE.url, no leading slash
  lastmod?: Date;
}

export function buildSitemapXml(urls: SitemapUrl[]): string {
  const entries = urls
    .map((u) => {
      const loc = `${SITE.url}/${u.loc}`;
      const lastmod = u.lastmod ? `<lastmod>${u.lastmod.toISOString().slice(0, 10)}</lastmod>` : '';
      return `  <url><loc>${loc}</loc>${lastmod}</url>`;
    })
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
}
