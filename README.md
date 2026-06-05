# Adventure Tours Vernal — Astro Migration

A **migration, not a redesign** (per the Astro Infrastructure Runbook, Part 1)
of the static HTML site at https://adventuretoursvernal.com into Astro 6.

Built against **Astro 6.4.4** (newest stable) · requires **Node 22.12+**.

## What this is

The original 28-page static site recreated in Astro with **zero changes to
content, URLs, metadata, or schema**. Every page was verified byte-identical
to the original for: visible text, all `<meta>` tags, `<title>`, canonical,
and JSON-LD. URLs keep their exact `.html` form, so **no redirects are needed**
and no SEO equity is at risk.

## Project layout

```
src/
  layouts/BaseLayout.astro      one <html>/<head>/<body> shell for every page
  components/Header.astro       STAGED canonical nav (not yet wired in — see note in file)
  components/Footer.astro       STAGED canonical footer (not yet wired in)
  data/business.ts              single-source NAP / hours / pricing
  pages/*.astro                 27 converted pages (file name = URL)
public/
  styles.css, style-1.css       site CSS, unchanged
  llms.txt, robots.txt          AI/crawler files, unchanged
astro.config.mjs                site URL, trailingSlash:'never', .html build, sitemap
```

## Local commands

```bash
npm install        # install Astro + sitemap integration
npm run dev        # local dev server at http://localhost:4321
npm run build      # production build -> dist/
npm run preview    # serve the built dist/ locally to verify
```

## Deploy (Cloudflare Pages)

Workflow matches your existing VS Code -> GitHub Desktop -> Cloudflare flow:

1. Push this repo to GitHub (work on a branch like `astro-migration` first).
2. In Cloudflare Pages, point at the repo with:
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
3. Cloudflare builds a **preview URL** for the branch — compare every page
   against the live site there before merging.
4. Merge to `main` to launch. Re-submit the generated sitemap in Search Console.

## IMPORTANT: the `images/` folder

Images were intentionally removed before the migration. Pages reference them
with their original **relative paths** (`images/logo.webp`, etc.), unchanged.
Before deploy, restore the `images/` folder into `public/images/` so those
paths resolve. (Astro serves everything in `public/` from the site root.)

## Known issues found during migration (pre-existing, not introduced here)

1. **Truncated pages — REPAIRED.** The live `index.html` and
   `moab-alternative.html` are cut off mid-JavaScript (no closing tags). The
   homepage tail was restored from `bw-promo-badge-snippet.html`; moab's from
   the identical dropdown handler in `about.html`. Worth fixing live too.
2. **Nav/footer have drifted** across pages — at least 3 variants
   (standard, `best-restaurants` with a different footer + different phone
   `(435) 790-5339`, and `limo` with its own design). Each page keeps its own
   to avoid altering content. Consolidating onto `Header`/`Footer` components
   is a deliberate later step, using the staged components.
3. **Pricing.** Live site shows `$349`/machine and `$125` ride-along —
   preserved verbatim. If stale, edit `src/data/business.ts`.
4. **Sitemap homepage entry** is `https://adventuretoursvernal.com` while its
   canonical is `.../` (with slash). Cosmetic — Google treats them identically.
5. `bw-promo-badge-snippet.html` excluded — it's a dev preview, not a page.

## What was centralized vs. preserved

- **Centralized:** the `<html>/<head>/<body>` scaffolding, closing tags, and
  the Vimeo player script present on every page.
- **Preserved per-page (verbatim):** each page's full `<head>` (title, meta,
  canonical, OG/Twitter, JSON-LD, its own CSS link + `?v=` cache-buster), its
  own nav and footer, and its own trailing `<script>` blocks.
