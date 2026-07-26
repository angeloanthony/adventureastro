// home-gallery.ts — single structural source of truth for the homepage photo
// gallery (P31 / D1 stage 1). Before this module the 105 slide elements were
// duplicated verbatim into all eight locale blocks of home.ts (840 lines);
// there was nowhere for a translation to live, which is why every locale
// shipped English `alt` text and English visible captions.
//
// The split is deliberate and load-bearing:
//   GALLERY_SLIDES  — immutable identity, image path, order, structural state.
//                     Slide ids are permanent: never renumbered, never reused,
//                     and never derived from the image path (a re-crop, a
//                     re-encode or a CDN move must not invalidate a translation).
//   GALLERY_TEXT    — localized display strings, keyed by slide id. English is
//                     the fallback for every locale that has no entry.
//
// P31 SCOPE: structure only. Not one character of display text changed; the
// English strings below were extracted verbatim from home.ts and the rendered
// output of all eight homepages is byte-identical. Locale dictionaries arrive
// in P32 (registered, empty, English-fallback) and are populated in P33.
import { DEFAULT_LOCALE, type Locale } from "../lib/i18n";

/** Immutable slide identity. Text lives in GALLERY_TEXT, never here. */
export interface GallerySlide {
  /** Permanent id. Never renumbered, never reused, never path-derived. */
  readonly id: string;
  readonly src: string;
  /** The single slide that carries the `active` class on first paint. */
  readonly active?: true;
}

/** Localized display strings for one slide. */
export interface GallerySlideText {
  readonly alt: string;
  readonly caption: string;
}

export type GalleryDictionary = Readonly<Record<string, GallerySlideText>>;

/**
 * Slide order is the render order. Reordering this array reorders the gallery;
 * it does NOT re-pair translations, because dictionaries key on `id`.
 */
export const GALLERY_SLIDES: readonly GallerySlide[] = [
  { id: "slide-001", src: "/images/1a.webp", active: true },
  { id: "slide-002", src: "/images/1.webp" },
  { id: "slide-003", src: "/images/2.webp" },
  { id: "slide-004", src: "/images/3.webp" },
  { id: "slide-005", src: "/images/4.webp" },
  { id: "slide-006", src: "/images/5.webp" },
  { id: "slide-007", src: "/images/6.webp" },
  { id: "slide-008", src: "/images/7.webp" },
  { id: "slide-009", src: "/images/3a.webp" },
  { id: "slide-010", src: "/images/8.webp" },
  { id: "slide-011", src: "/images/8a.webp" },
  { id: "slide-012", src: "/images/9.webp" },
  { id: "slide-013", src: "/images/6a.webp" },
  { id: "slide-014", src: "/images/10.webp" },
  { id: "slide-015", src: "/images/11.webp" },
  { id: "slide-016", src: "/images/12.webp" },
  { id: "slide-017", src: "/images/13.webp" },
  { id: "slide-018", src: "/images/14.webp" },
  { id: "slide-019", src: "/images/15a.webp" },
  { id: "slide-020", src: "/images/35a.webp" },
  { id: "slide-021", src: "/images/16a.webp" },
  { id: "slide-022", src: "/images/17a.webp" },
  { id: "slide-023", src: "/images/18a.webp" },
  { id: "slide-024", src: "/images/19a.webp" },
  { id: "slide-025", src: "/images/20.webp" },
  { id: "slide-026", src: "/images/21a.webp" },
  { id: "slide-027", src: "/images/22a.webp" },
  { id: "slide-028", src: "/images/23a.webp" },
  { id: "slide-029", src: "/images/23.webp" },
  { id: "slide-030", src: "/images/24.webp" },
  { id: "slide-031", src: "/images/25.webp" },
  { id: "slide-032", src: "/images/26.webp" },
  { id: "slide-033", src: "/images/27.webp" },
  { id: "slide-034", src: "/images/28.webp" },
  { id: "slide-035", src: "/images/29.webp" },
  { id: "slide-036", src: "/images/30.webp" },
  { id: "slide-037", src: "/images/31.webp" },
  { id: "slide-038", src: "/images/32.webp" },
  { id: "slide-039", src: "/images/33.webp" },
  { id: "slide-040", src: "/images/34.webp" },
  { id: "slide-041", src: "/images/35.webp" },
  { id: "slide-042", src: "/images/36.webp" },
  { id: "slide-043", src: "/images/37.webp" },
  { id: "slide-044", src: "/images/39a.webp" },
  { id: "slide-045", src: "/images/39.webp" },
  { id: "slide-046", src: "/images/40.webp" },
  { id: "slide-047", src: "/images/41.webp" },
  { id: "slide-048", src: "/images/42.webp" },
  { id: "slide-049", src: "/images/43.webp" },
  { id: "slide-050", src: "/images/44.webp" },
  { id: "slide-051", src: "/images/45.webp" },
  { id: "slide-052", src: "/images/46.webp" },
  { id: "slide-053", src: "/images/47.webp" },
  { id: "slide-054", src: "/images/48.webp" },
  { id: "slide-055", src: "/images/49.webp" },
  { id: "slide-056", src: "/images/50.webp" },
  { id: "slide-057", src: "/images/51.webp" },
  { id: "slide-058", src: "/images/52.webp" },
  { id: "slide-059", src: "/images/53.webp" },
  { id: "slide-060", src: "/images/54a.webp" },
  { id: "slide-061", src: "/images/55.webp" },
  { id: "slide-062", src: "/images/56.webp" },
  { id: "slide-063", src: "/images/57a.webp" },
  { id: "slide-064", src: "/images/58a.webp" },
  { id: "slide-065", src: "/images/58.webp" },
  { id: "slide-066", src: "/images/59.webp" },
  { id: "slide-067", src: "/images/60.webp" },
  { id: "slide-068", src: "/images/61.webp" },
  { id: "slide-069", src: "/images/62a.webp" },
  { id: "slide-070", src: "/images/42a.webp" },
  { id: "slide-071", src: "/images/63.webp" },
  { id: "slide-072", src: "/images/64.webp" },
  { id: "slide-073", src: "/images/65a.webp" },
  { id: "slide-074", src: "/images/65.webp" },
  { id: "slide-075", src: "/images/66.webp" },
  { id: "slide-076", src: "/images/67.webp" },
  { id: "slide-077", src: "/images/68.webp" },
  { id: "slide-078", src: "/images/70.webp" },
  { id: "slide-079", src: "/images/71.webp" },
  { id: "slide-080", src: "/images/72.webp" },
  { id: "slide-081", src: "/images/73.webp" },
  { id: "slide-082", src: "/images/74.webp" },
  { id: "slide-083", src: "/images/75.webp" },
  { id: "slide-084", src: "/images/76.webp" },
  { id: "slide-085", src: "/images/77.webp" },
  { id: "slide-086", src: "/images/78.webp" },
  { id: "slide-087", src: "/images/79.webp" },
  { id: "slide-088", src: "/images/80.webp" },
  { id: "slide-089", src: "/images/81.webp" },
  { id: "slide-090", src: "/images/82.webp" },
  { id: "slide-091", src: "/images/83.webp" },
  { id: "slide-092", src: "/images/84.webp" },
  { id: "slide-093", src: "/images/38.webp" },
  { id: "slide-094", src: "/images/85.webp" },
  { id: "slide-095", src: "/images/86.webp" },
  { id: "slide-096", src: "/images/87.webp" },
  { id: "slide-097", src: "/images/99.webp" },
  { id: "slide-098", src: "/images/90.webp" },
  { id: "slide-099", src: "/images/91.webp" },
  { id: "slide-100", src: "/images/92.webp" },
  { id: "slide-101", src: "/images/93.webp" },
  { id: "slide-102", src: "/images/94.webp" },
  { id: "slide-103", src: "/images/95.webp" },
  { id: "slide-104", src: "/images/96.webp" },
  { id: "slide-105", src: "/images/97.webp" },
];

/**
 * English text — the source of truth and the fallback for every locale.
 * Extracted verbatim from home.ts in P31; no wording was changed.
 */
export const GALLERY_TEXT_EN: GalleryDictionary = {
  "slide-001": { alt: "Side-by-side UTV parked in a sandstone alcove on an Adventure Tours Vernal UTV tour", caption: "Exploring a Sandstone Alcove" },
  "slide-002": { alt: "Lineup of Kawasaki KRX 1000 side-by-sides staged before a guided UTV tour in Vernal Utah", caption: "UTV Lineup Staging" },
  "slide-003": { alt: "Blue side-by-side UTV kicking up dust on a desert trail near Vernal Utah", caption: "Kicking Up Dust" },
  "slide-004": { alt: "Group riding side-by-side UTVs on a backcountry trail near Vernal Utah", caption: "Group on the Trail" },
  "slide-005": { alt: "Riders resting under a sandstone overhang at sunset on an Adventure Tours Vernal UTV tour", caption: "Sunset Rock Overhang" },
  "slide-006": { alt: "Looking out from inside a sandstone cave on a guided UTV tour near Vernal Utah", caption: "Inside a Sandstone Cave" },
  "slide-007": { alt: "Family posing inside a sandstone cave on an Adventure Tours Vernal UTV tour", caption: "Family Cave Photo" },
  "slide-008": { alt: "UTV tire perched on a canyon rim overlooking Ashley Gorge near Vernal Utah", caption: "On the Canyon's Edge" },
  "slide-009": { alt: "Desert badlands landscape at sunset on a backcountry UTV tour near Vernal Utah", caption: "Desert Badlands Sunset" },
  "slide-010": { alt: "Side-by-side UTV climbing a slickrock ridge on a guided tour near Vernal Utah", caption: "Climbing a Slickrock Ridge" },
  "slide-011": { alt: "Blue side-by-side UTV speeding through the high desert near Vernal Utah", caption: "Speeding Through the Desert" },
  "slide-012": { alt: "Kawasaki KRX 1000 side-by-sides lined up under a rock overhang near Vernal Utah", caption: "Lineup Under the Overhang" },
  "slide-013": { alt: "Group stopped with their side-by-side UTVs along a backcountry trail near Vernal Utah", caption: "Trailside Group Stop" },
  "slide-014": { alt: "Side-by-side UTV beside a slickrock canyon vista on a guided tour near Vernal Utah", caption: "Slickrock Canyon Vista" },
  "slide-015": { alt: "Side-by-side UTV parked inside a sandstone cave near Vernal Utah", caption: "UTV Inside the Cave" },
  "slide-016": { alt: "Towering sandstone cave wall on an Adventure Tours Vernal backcountry tour", caption: "Towering Cave Wall" },
  "slide-017": { alt: "Rider leaping off a cliff into the water on an Adventure Tours Vernal outing near Vernal Utah", caption: "Cliff Jumping Splash" },
  "slide-018": { alt: "Convoy of side-by-side UTVs on a mountain trail during a guided tour near Vernal Utah", caption: "Convoy on the Mountain Trail" },
  "slide-019": { alt: "Side-by-side UTV on slickrock at dusk near Dinosaur National Monument, Vernal Utah", caption: "Dusk Desert Ride" },
  "slide-020": { alt: "Three Kawasaki KRX 1000 side-by-sides silhouetted against a sunburst at sunset near Vernal Utah", caption: "Sunset Trio Silhouette" },
  "slide-021": { alt: "Riders standing atop slickrock beside their Kawasaki KRX 1000 side-by-sides near Vernal Utah", caption: "Riders Atop the Slickrock" },
  "slide-022": { alt: "Two side-by-side UTVs parked on slickrock near Vernal Utah", caption: "Two UTVs on Slickrock" },
  "slide-023": { alt: "Mud-covered side-by-side UTVs on slickrock after a guided tour near Vernal Utah", caption: "Muddy UTVs on the Rock" },
  "slide-024": { alt: "Muddy side-by-side UTV on a rock dome at an overlook near Vernal Utah", caption: "Muddy UTV at the Overlook" },
  "slide-025": { alt: "Blue side-by-side UTV on slickrock high above the canyon near Vernal Utah", caption: "Blue UTV on Slickrock" },
  "slide-026": { alt: "Side-by-side UTVs silhouetted at sunset on a guided tour near Vernal Utah", caption: "UTVs at Sunset" },
  "slide-027": { alt: "Side-by-side UTV silhouetted against a sunburst on a sunset ride through the Utah desert backcountry", caption: "Sunburst Silhouette" },
  "slide-028": { alt: "Two side-by-side UTVs perched on a boulder on a backcountry tour near Vernal Utah", caption: "Twin UTVs on a Boulder" },
  "slide-029": { alt: "Hikers exploring a sandstone arch on an Adventure Tours Vernal outing in Vernal Utah", caption: "Hikers at the Sandstone Arch" },
  "slide-030": { alt: "Side-by-side UTVs atop a large boulder with a desert view near Vernal Utah", caption: "UTVs Atop the Boulder" },
  "slide-031": { alt: "Muddy side-by-side UTVs overlooking the valley on a backcountry trail near Vernal Utah", caption: "Muddy UTVs With a View" },
  "slide-032": { alt: "Side-by-side UTVs on a ridgetop at dusk near Vernal Utah", caption: "Ridgetop UTVs at Dusk" },
  "slide-033": { alt: "Side-by-side UTVs on a rock ridge formation on a guided tour in Vernal Utah", caption: "UTVs on the Rock Ridge" },
  "slide-034": { alt: "Side-by-side UTVs in the high desert on a backcountry tour near Vernal Utah", caption: "UTVs in the High Desert" },
  "slide-035": { alt: "Side-by-side UTV at a slickrock dome overlook near Vernal Utah", caption: "Slickrock Dome Overlook" },
  "slide-036": { alt: "Canyon country overlook on a backcountry UTV tour near Vernal Utah", caption: "Canyon Country Overlook" },
  "slide-037": { alt: "Side-by-side UTV climbing the slickrock on a guided tour near Vernal Utah", caption: "Climbing the Slickrock" },
  "slide-038": { alt: "Side-by-side UTV descending a steep rock face on a guided tour near Vernal Utah", caption: "UTV Descending the Rock" },
  "slide-039": { alt: "Side-by-side UTV cresting boulders on a backcountry trail near Vernal Utah", caption: "UTV Cresting the Boulders" },
  "slide-040": { alt: "Green side-by-side UTV on a desert trail near Vernal Utah", caption: "Green UTV on the Trail" },
  "slide-041": { alt: "Side-by-side UTVs climbing slickrock on a guided tour near Vernal Utah", caption: "UTVs Climbing Slickrock" },
  "slide-042": { alt: "Side-by-side UTVs on the slickrock on a backcountry tour near Vernal Utah", caption: "UTVs on the Slickrock" },
  "slide-043": { alt: "Side-by-side UTVs climbing a sandstone ridge near Vernal Utah", caption: "Climbing a Sandstone Ridge" },
  "slide-044": { alt: "Side-by-side UTV parked below a desert butte near Vernal Utah", caption: "Parked at the Butte" },
  "slide-045": { alt: "View through a rock arch toward a desert butte near Vernal Utah", caption: "Through the Rock Arch" },
  "slide-046": { alt: "Muddy side-by-side UTV climbing rocks on a backcountry tour near Vernal Utah", caption: "Muddy Rig Climbing" },
  "slide-047": { alt: "Side-by-side UTVs parked under a natural rock arch near Vernal Utah", caption: "Side-by-Sides Under the Arch" },
  "slide-048": { alt: "Two side-by-side UTVs on a canyon trail through the Utah backcountry", caption: "Canyon Trail Duo" },
  "slide-049": { alt: "Side-by-side UTV on a steep slickrock descent near Vernal Utah", caption: "Steep Slickrock Descent" },
  "slide-050": { alt: "Guided side-by-side UTV rock crawl through a sandstone wash near Vernal Utah", caption: "Guided Rock Crawl" },
  "slide-051": { alt: "Desert overlook at dusk on a backcountry UTV tour near Vernal Utah", caption: "Overlook at Dusk" },
  "slide-052": { alt: "Side-by-side UTV tackling a deep rut on a backcountry trail near Vernal Utah", caption: "Tackling the Rut" },
  "slide-053": { alt: "Side-by-side UTV splashing through a river crossing near Vernal Utah", caption: "Splashing River Crossing" },
  "slide-054": { alt: "Doc's Beach trailhead sign on an Adventure Tours Vernal UTV tour near Vernal Utah", caption: "Doc's Beach Trails" },
  "slide-055": { alt: "Fleet of Kawasaki KRX 1000 side-by-sides staged for a guided tour in Vernal Utah", caption: "Staged Fleet Lineup" },
  "slide-056": { alt: "Tour group stopped with their side-by-side UTVs near Vernal Utah", caption: "Group Trail Stop" },
  "slide-057": { alt: "Tour group with Kawasaki KRX 1000 side-by-sides on a ridge near Vernal Utah", caption: "Tour Group Photo" },
  "slide-058": { alt: "Long line of side-by-side UTVs staged and ready for a guided tour near Vernal Utah", caption: "Lined Up and Ready" },
  "slide-059": { alt: "Fleet of side-by-side UTVs staged on a hilltop near Vernal Utah", caption: "Fleet at the Hilltop" },
  "slide-060": { alt: "Side-by-side UTV charging through a muddy backcountry trail near Vernal Utah", caption: "Muddy Trail Charge" },
  "slide-061": { alt: "Green Kawasaki side-by-side UTV crossing a muddy rut near Vernal Utah", caption: "Green Machine in the Mud" },
  "slide-062": { alt: "Tour group gathered under a rock overhang with their side-by-side UTVs near Vernal Utah", caption: "Group Under the Overhang" },
  "slide-063": { alt: "Side-by-side UTVs parked at a cliffside on a guided tour near Vernal Utah", caption: "UTVs at the Cliffside" },
  "slide-064": { alt: "Rocky trail vista on a backcountry UTV tour near Vernal Utah", caption: "Rock Trail Vista" },
  "slide-065": { alt: "Rider jumping off a cliff for a cool-down on an Adventure Tours Vernal outing near Vernal Utah", caption: "Cliff Jump Cool Down" },
  "slide-066": { alt: "Side-by-side UTVs staged below a slickrock dome near Vernal Utah", caption: "UTVs Staged Below" },
  "slide-067": { alt: "Blue side-by-side UTV conquering a slickrock dome with a guide near Vernal Utah", caption: "Conquering the Slickrock" },
  "slide-068": { alt: "Three side-by-side UTVs rock crawling through the Utah backcountry", caption: "Rock Crawling Trio" },
  "slide-069": { alt: "Riders exploring cliff dwellings on an Adventure Tours Vernal UTV tour", caption: "Exploring Cliff Dwellings" },
  "slide-070": { alt: "Large natural sandstone arch above the valley on a guided UTV tour near Vernal Utah", caption: "Natural Sandstone Arch" },
  "slide-071": { alt: "Tour group at a rock arch at sunset near Vernal Utah", caption: "Sunset Arch Crew" },
  "slide-072": { alt: "Inside a sandstone cave on an Adventure Tours Vernal backcountry tour", caption: "Inside the Cave" },
  "slide-073": { alt: "Side-by-side UTV on a slickrock summit climb near Vernal Utah", caption: "Slickrock Summit Climb" },
  "slide-074": { alt: "Side-by-side UTV on a river crossing adventure near Vernal Utah", caption: "River Crossing Adventure" },
  "slide-075": { alt: "Side-by-side UTV parked at a canyon overlook near Vernal Utah", caption: "Parked Machine Profile" },
  "slide-076": { alt: "Side-by-side UTV sending it over a sand dune near Vernal Utah", caption: "Sand Dune Send" },
  "slide-077": { alt: "Side-by-side UTV parked beside a sandstone arch near Vernal Utah", caption: "Parked at the Arch" },
  "slide-078": { alt: "Golden sandstone arch on a backcountry UTV tour near Vernal Utah", caption: "Golden Rock Arch" },
  "slide-079": { alt: "Window opening in a sandstone cave near Vernal Utah", caption: "Sandstone Cave Window" },
  "slide-080": { alt: "Trail along a towering canyon wall near Vernal Utah", caption: "Canyon Wall Trail" },
  "slide-081": { alt: "Side-by-side UTVs parked under a sandstone arch near Vernal Utah", caption: "UTVs Under the Arch" },
  "slide-082": { alt: "Interior of a sandstone cave on an Adventure Tours Vernal tour near Vernal Utah", caption: "Cave Interior View" },
  "slide-083": { alt: "Towering rock overhang on a backcountry UTV tour near Vernal Utah", caption: "Towering Rock Overhang" },
  "slide-084": { alt: "Three side-by-side UTVs on the canyon rim near Vernal Utah", caption: "Three UTVs on the Canyon Rim" },
  "slide-085": { alt: "Couple posing at a cliff edge overlooking the canyon near Vernal Utah", caption: "Couple at the Cliff Edge" },
  "slide-086": { alt: "Autumn canyon overlook on a backcountry UTV trail near Vernal Utah", caption: "Autumn Canyon Overlook" },
  "slide-087": { alt: "Side-by-side UTV on an aspen-lined trail near Vernal Utah", caption: "Aspen Trail Ride" },
  "slide-088": { alt: "Side-by-side UTV on a slickrock descent near Vernal Utah", caption: "Slickrock Descent" },
  "slide-089": { alt: "Golden aspen trail on a guided side-by-side adventure near Vernal Utah", caption: "Golden Aspen Trail" },
  "slide-090": { alt: "Side-by-side UTVs above the canyon on a backcountry tour near Vernal Utah", caption: "UTVs Above the Canyon" },
  "slide-091": { alt: "View through a sandstone arch on an Adventure Tours Vernal tour near Vernal Utah", caption: "Through the Arch" },
  "slide-092": { alt: "Side-by-side UTVs on slickrock under a stormy sky near Vernal Utah", caption: "Slickrock Under the Storm" },
  "slide-093": { alt: "Blue side-by-side UTV kicking up dust on a desert trail near Vernal Utah", caption: "Desert Dust Trail" },
  "slide-094": { alt: "Inside a sandstone cave looking out a window opening near Vernal Utah", caption: "Inside a Sandstone Cave" },
  "slide-095": { alt: "Side-by-side UTVs at a mountaintop staging point near Vernal Utah", caption: "Mountaintop Staging Point" },
  "slide-096": { alt: "Three side-by-side UTVs lined up on a guided tour near Vernal Utah", caption: "Three UTVs Lined Up" },
  "slide-097": { alt: "Slickrock ridge view on a backcountry UTV tour near Vernal Utah", caption: "Slickrock Ridge View" },
  "slide-098": { alt: "Side-by-side UTV climbing the slickrock near Vernal Utah", caption: "Climbing the Slickrock" },
  "slide-099": { alt: "Side-by-side UTV on a slickrock climb under a stormy sky near Vernal Utah", caption: "Stormy Slickrock Climb" },
  "slide-100": { alt: "Side-by-side UTV throwing dust on a desert trail near Vernal Utah", caption: "Airborne Dust Trail" },
  "slide-101": { alt: "Side-by-side UTV on a steep ledge climb near Vernal Utah", caption: "Steep Ledge Climb" },
  "slide-102": { alt: "Side-by-side UTV spraying sand through a turn near Vernal Utah", caption: "Sand Spray Turn" },
  "slide-103": { alt: "Side-by-side UTV flying an American flag at rest near Vernal Utah", caption: "American Flag UTV" },
  "slide-104": { alt: "Side-by-side UTV at a cliff edge at dusk near Vernal Utah", caption: "Cliff Edge at Dusk" },
  "slide-105": { alt: "Side-by-side UTV on a ridgeline at twilight in the Utah desert backcountry", caption: "Ridgeline at Twilight" },
};

/**
 * Locale dictionaries — one per registered locale (P32).
 *
 * A slide id absent from a locale's dictionary falls back to English, the same
 * fail-soft contract as `t()` in ui.ts. The seven non-English dictionaries are
 * deliberately EMPTY rather than pre-filled with copies of the English text:
 *
 *   - Copying English in would re-create, in data, exactly the duplication the
 *     P31 refactor removed from markup (735 entries).
 *   - It would also destroy the signal P33 and Gate 4j depend on. With an empty
 *     dictionary, "not yet translated" is a MISSING KEY — decidable by set
 *     difference against GALLERY_SLIDES. With a pre-filled one it becomes "a
 *     key whose value happens to equal English", which is indistinguishable
 *     from a deliberate English proper noun ("Doc's Beach", "Moonshine Arch",
 *     "Kawasaki KRX 1000") and can only be guessed at.
 *
 * So today every locale renders the English gallery text — byte-identical to
 * what shipped before P31 — and each key P33 adds silently stops falling back.
 *
 * Typed as Record<Locale, …> on purpose: registering a new locale in i18n.ts
 * fails the build here until its gallery dictionary is added, so a new language
 * can never reach the gallery by silently inheriting English (fail-closed).
 */
const GALLERY_TEXT: Readonly<Record<Locale, GalleryDictionary>> = {
  en: GALLERY_TEXT_EN,
  es: {},
  it: {},
  pt: {},
  fr: {},
  de: {},
  ja: {},
  zh: {},
};

/** Indentation of a slide element inside `<div class="carousel-track">`. */
const SLIDE_INDENT = " ".repeat(14);

/**
 * HTML-escape a value destined for a double-quoted attribute or a text node.
 * Apostrophes are deliberately NOT escaped: attributes here are double-quoted,
 * and `&#39;` would change the rendered bytes of "Doc's Beach" / "Canyon's Edge".
 * No English string currently needs escaping at all — this is here so a future
 * translation containing `&` or `"` cannot break the markup under set:html.
 */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Resolve one slide's display text, falling back to English when the locale is
 * unregistered or the slide has no entry in that locale's dictionary yet.
 */
function textFor(locale: string, id: string): GallerySlideText {
  const entry = GALLERY_TEXT[locale as Locale]?.[id];
  if (entry) return entry;
  return GALLERY_TEXT_EN[id];
}

/**
 * Render the gallery slides for a locale, as the exact HTML string that used to
 * be embedded in each locale block of home.ts. Returns the slide elements only
 * (the `<div class="carousel-track">` wrapper stays in home.ts), indented and
 * newline-joined with no trailing newline, so the interpolation site is a
 * drop-in replacement for the lines it replaced.
 *
 * Consumed via set:html — the caller injects raw HTML, so every interpolated
 * value is escaped here.
 */
export function renderGallery(locale: string = DEFAULT_LOCALE): string {
  return GALLERY_SLIDES.map((slide) => {
    const { alt, caption } = textFor(locale, slide.id);
    const className = slide.active ? "carousel-slide active" : "carousel-slide";
    return (
      `${SLIDE_INDENT}<div class="${className}">` +
      `<img src="${escapeHtml(slide.src)}" alt="${escapeHtml(alt)}">` +
      `<div class="carousel-caption">${escapeHtml(caption)}</div></div>`
    );
  }).join("\n");
}
