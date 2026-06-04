// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Adventure Tours Vernal — HTML-to-Astro migration.
// MIGRATION RULE (runbook Part 1): preserve URLs exactly.
// Old site serves /page.html, so we keep .html URLs and DO NOT
// rewrite to trailing-slash folders. No redirects are needed
// because every old URL maps 1:1 to an Astro page of the same name.
export default defineConfig({
  site: 'https://adventuretoursvernal.com',
  // Old URLs are bare .html files (no trailing slash). 'never' keeps
  // Astro from appending slashes and matches the existing canonical form.
  trailingSlash: 'never',
  build: {
    // Emit /about.html instead of /about/index.html so file-based
    // routes line up with the legacy URLs character-for-character.
    format: 'file',
  },
  integrations: [
    sitemap({
      // The build emits /about.html etc., but @astrojs/sitemap derives URLs
      // from route names and would output /about (no .html), which would NOT
      // match the page canonicals. Rewrite each entry to the .html form so
      // the sitemap and canonicals agree exactly (the homepage stays as the
      // bare domain root).
      serialize(item) {
        const root = 'https://adventuretoursvernal.com';
        // Homepage: canonical is the bare domain WITH a trailing slash.
        if (item.url === root || item.url === root + '/') {
          item.url = root + '/';
          return item;
        }
        // strip any trailing slash, then append .html if missing
        let u = item.url.replace(/\/$/, '');
        if (!u.endsWith('.html')) u += '.html';
        item.url = u;
        return item;
      },
    }),
  ],
});
