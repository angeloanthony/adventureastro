// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// Adventure Tours Vernal.
// G2 URL DECISION (owner-approved 2026-07-10): directory URLs.
// Every page lives at /segment/ (trailing slash, no .html). The legacy
// flat .html URLs 301 to their new homes via public/_redirects
// (Cloudflare Pages). Hub/spoke/city URL shapes come exclusively from
// src/lib/hubs.ts — never hardcode them.
export default defineConfig({
  site: 'https://adventuretoursvernal.com',
  trailingSlash: 'always',
  build: {
    // /about/index.html → served as /about/
    format: 'directory',
  },
  integrations: [
    // MDX powers the hub/spoke content collections (src/content/**). The
    // collection glob already expects .mdx; this completes that setup.
    mdx(),
    sitemap(),
  ],
});
