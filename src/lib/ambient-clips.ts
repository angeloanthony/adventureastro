// ambient-clips.ts — the five decorative background loops, and THE ONE PLACE THEIR
// HOSTING IS DECIDED.
//
// WHY A REGISTRY AND NOT PROPS. There are 5 distinct ambient clips rendered at 40 call
// sites — 8 locale blocks each, byte-identical within a clip. Passing `youtubeId` and
// `poster` at every call site would spread one decision across 40 places, and the whole
// point of the owner's Phase A split (see AmbientVideo.astro) is that the ambient BACKEND
// is expected to change. With this file, changing it is one edit here; without it, the
// same change is 40 edits across 8 locale blocks in 3 file formats, which is exactly the
// shape of edit this repo has repeatedly gotten wrong along the locale axis.
//
// The clip set is stable enough for a registry to be the right shape, and that is
// measured rather than assumed (V1-video-facade.md §7.2): the corpus video set is
// APPEND-ONLY — 7 → 30 distinct videos between 2026-06-04 and 2026-07-28, 23 added, 0
// ever removed — and all five ambient ids are in the original 7 and have never changed
// identity.
//
// WHAT IS *NOT* DECIDED HERE. Whether the loops keep streaming from YouTube or become
// self-hosted trimmed clips is open (V1-video-facade.md §7.2) and is deliberately NOT a
// premise of this file. Today each clip names a `youtubeId`. Self-hosting later means
// adding a `src` beside it and teaching AmbientVideo.astro to prefer it — two files, no
// call sites, no locale blocks.
//
// POSTERS ARE SELF-HOSTED, AND THAT PART IS ALREADY SETTLED (§2). An ambient poster is
// the LCP element, and an LCP element must not depend on a third-party host the page
// deliberately does not preconnect to. These five were derived once from each upload's
// `maxresdefault` (all verified real, 109–306 KB, not the silent 120×90 grey placeholder)
// and committed as webp at 1280×720 — 62–189 KB, against a corpus whose existing 203
// images run to a 350 KB median and a 2 MB maximum.

export interface AmbientClip {
  /** Today's backend. Also the identity gate 4m records, via `data-video-id`. */
  youtubeId: string;
  /** Self-hosted, by contract. Derived from the upload, committed to `public/images/`. */
  poster: string;
  /** Where it renders, for the human reading a diff. Not used at runtime. */
  note: string;
}

export const AMBIENT_CLIPS = {
  'home-hero': {
    youtubeId: 'BHOABkrNnnE',
    poster: '/images/ambient-BHOABkrNnnE.webp',
    note: 'home.ts — .trail-hero-video-bg, above the fold',
  },
  'about-hero': {
    youtubeId: 'LsqbwVkwrbw',
    poster: '/images/ambient-LsqbwVkwrbw.webp',
    note: 'about.ts — .about-hero-video-bg, above the fold',
  },
  'utv-hero': {
    youtubeId: 'YQVFzCTh4m4',
    poster: '/images/ambient-YQVFzCTh4m4.webp',
    note: 'utv.ts — hero, above the fold. Also a carousel slide on the same page.',
  },
  'utv-cta': {
    youtubeId: 'U4RogvmCLFU',
    poster: '/images/ambient-U4RogvmCLFU.webp',
    note: 'utv.ts — .policy-cta .cta-video-bg, BELOW the fold (hence priority={false})',
  },
  'moab-guide-hero': {
    youtubeId: 'zVhDfvb3W3U',
    poster: '/images/ambient-zVhDfvb3W3U.webp',
    // Found by classifying on the autoplay/mute/loop query shape rather than on file
    // location: this one lives in 8 `.mdx` bodies, so the census pass that read
    // `page-content/*.ts` could not see it. V1-video-facade.md §1.5, third occurrence.
    note: 'content/guides/moab-utv-tours*.mdx — .moab-video-bg, above the fold',
  },
} as const satisfies Record<string, AmbientClip>;

export type AmbientClipKey = keyof typeof AMBIENT_CLIPS;
