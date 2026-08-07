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
// P31 built the structure (no display text changed), P32 registered the eight
// locale dictionaries empty, and P33 populated the seven non-English ones —
// 105 slides x 7 locales = 735 entries, complete, so no registered locale
// falls back to English any more. The translation policy those 735 entries
// were written against is documented above GALLERY_TEXT_ES below; read it
// before adding a slide or editing a string.
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


/* ---------------------------------------------------------------------------
 * P33 — GALLERY TRANSLATION POLICY (the reusable part; read before editing)
 *
 * Every string below was written against the SHIPPED corpus, not against
 * intuition: each recurring term was counted in `src/content/**\/*.<loc>.mdx`
 * and the majority form was adopted. That is the Gate 4c rule ("the corpus
 * beats the brief") applied to a greenfield dictionary. P33 introduced ZERO
 * new glossary decisions — where a term had no precedent it was translated as
 * ordinary descriptive language, and where the corpus itself is split that
 * split is recorded below rather than silently resolved.
 *
 * FOUR CATEGORIES. Classify a term before translating it.
 *
 *  A. NEVER TRANSLATE — brand, fleet, business and official names.
 *     `Adventure Tours Vernal` · `Kawasaki KRX 1000` · `Kawasaki` · `UTV`
 *     `Dinosaur National Monument` (official park name — English in it/pt/fr/
 *     de/ja/zh per the ui.ts precedent).
 *
 *  B. TRANSLATE ONLY THE GENERIC DESCRIPTOR, keep the proper name English.
 *     `Doc's Beach trailhead sign` → `Doc's Beach` + localized "trailhead sign"
 *     `overlooking Ashley Gorge`   → `Ashley Gorge` + localized "overlooking"
 *     Both toponyms are English in all seven shipped locales (26–27 hits each),
 *     so neither is given an invented exonym. Place names with an ESTABLISHED
 *     exonym still take it: Utah → ユタ州 / 犹他州; Vernal → バーナル in `ja`
 *     only (`zh` keeps Latin `Vernal`, per the ZH preamble in ui.ts).
 *
 *  C. REPOSITORY GLOSSARY — reuse the measured corpus term, never re-derive.
 *     Counts are hits in that locale's 57 MDX spokes at the time of writing.
 *
 *       EN            es               it              pt               fr
 *       slickrock     slickrock  29    slickrock  26   slickrock  30    slickrock 30
 *       side-by-side  side-by-side 50  side-by-side 51 side-by-side 52  side-by-side 51
 *       backcountry   backcountry 418  backcountry 421 backcountry 393  backcountry 332
 *       canyon        cañón 334        canyon 720      canyon 248       canyon 407
 *       overlook      mirador 390      punto panoramico 115  miradouro 123  point de vue 129
 *       sandstone     arenisca 82      arenaria 82     arenito 81       grès 122
 *       ridge         cresta 65        cresta 48       crista 51        crête 71
 *       cliff         acantilado 118   scogliera 87    falésia 110      falaise 116
 *       trailhead     inicio del sendero 77  inizio del sentiero 90  início do trilho 59  départ du sentier 17
 *       high desert   alto desierto 199  deserto d'alta quota 4  deserto alto 86  haut désert 166
 *       aspen         álamos temblones 68  pioppi tremuli 38  choupos 110  trembles 95
 *       sunset        atardecer 277    tramonto 234    pôr do sol 113   coucher du soleil 84
 *       dusk          anochecer 39     crepuscolo 12   crepúsculo 4     crépuscule 110
 *       fleet         flota 20         flotta 20       frota 20         flotte 26
 *       dust          polvo 26         polvere 25      poeira 11        poussière 24
 *       trail         sendero 1405     sentiero 598    trilho 1366      sentier 1188
 *
 *       EN            de                     ja                   zh
 *       slickrock     Slickrock 30           スリックロック 30      光滑岩面 14
 *       side-by-side  Side-by-Side-UTV 8     サイドバイサイド 53    并排越野车 52
 *       backcountry   Backcountry 407        バックカントリー 393   荒野深处 20
 *       canyon        Canyon 321             峡谷 663             峡谷 679
 *       overlook      Aussichtspunkt 123     展望ポイント 326       观景点 378
 *       sandstone     Sandstein 87           砂岩 82              砂岩 93
 *       ridge         Grat 26                尾根 72              山脊 79
 *       cliff         Klippe 81              崖 76                崖壁 79
 *       trailhead     Ausgangspunkt 144      トレイルヘッド 204     登山口 204
 *       high desert   Hochwüste 140          高地砂漠 215          高原荒漠 97
 *       aspen         Espen 105              アスペン 109          白杨 136
 *       sunset        Sonnenuntergang 66     日没 122 / 夕日 18    日落 140
 *       dusk          Dämmerung 34           夕暮れ 99            黄昏 114
 *       fleet         Flotte 25              車両 134             车队 13
 *       dust          Staub 16               砂ぼこり 17           尘土 11
 *       trail         Piste 237              トレイル             越野路线 122
 *
 *     Three glossary locks from the closed review sections bind this file and
 *     were applied verbatim: `Ausgangspunkt` for trailhead (A7), the DE
 *     Piste/Wanderweg split — every gallery trail is an off-road route, so all
 *     of them are `Piste` (A3/A4) — and `登山口` for trailhead (C2).
 *
 *  D. ORDINARY DESCRIPTIVE LANGUAGE — translate naturally.
 *     Nine gallery terms have ZERO corpus precedent in every locale (cave,
 *     overhang, alcove, cliff dwelling, butte, badlands, rock crawl, sand dune,
 *     sunburst, twilight). They were rendered idiomatically per locale, not
 *     back-formed from another locale's choice.
 *
 * CASE. Captions follow each locale's own shipped heading convention, measured
 * from its `##` headings: Title Case for es/it/pt/fr, sentence case for de
 * (locked by A2/A5), no case distinction for ja/zh.
 *
 * SPACING. `zh` keeps one space between Han characters and any Latin run or
 * Arabic numeral (`犹他州 Vernal 附近`, `UTV 行程`) per the ZH preamble in
 * ui.ts; `ja` does not (`ガイド付きUTVツアー`).
 *
 * NO FALLBACK. All seven dictionaries are complete: 105 slides x 7 locales =
 * 735 entries, so `textFor()` never reaches the English fallback for a
 * registered locale. Strings that are deliberately English (`Doc's Beach`,
 * `Ashley Gorge`, `Kawasaki KRX 1000`, `Adventure Tours Vernal`) are present as
 * explicit values inside otherwise-localized sentences, never by omission.
 *
 * TWO OBSERVATIONS, deliberately NOT fixed here (out of scope; a corpus sweep
 * is a separate phase per Gate 4c):
 *   - `it` renders "cliff" as `scogliera` (87), literally a sea cliff. It is
 *     the established corpus term, so the gallery matches it; whether it is the
 *     right word for a desert cliff is an Italian native-review question.
 *   - `zh` "high desert" is split five ways: 高原荒漠 97 · 高原沙漠 75 ·
 *     高海拔沙漠 17 · 高地荒漠 12 · 高地沙漠 8. The gallery uses the plurality
 *     form. Normalizing the corpus is a future item.
 * ------------------------------------------------------------------------- */

const GALLERY_TEXT_ES: GalleryDictionary = {
  "slide-001": { alt: "UTV side-by-side estacionado en una oquedad de arenisca en un tour en UTV de Adventure Tours Vernal", caption: "Explorando una Oquedad de Arenisca" },
  "slide-002": { alt: "Hilera de UTV side-by-side Kawasaki KRX 1000 preparados antes de un tour guiado en UTV en Vernal, Utah", caption: "Hilera de UTV Preparados" },
  "slide-003": { alt: "UTV side-by-side azul levantando polvo en un sendero del desierto cerca de Vernal, Utah", caption: "Levantando Polvo" },
  "slide-004": { alt: "Grupo conduciendo UTV side-by-side por un sendero del backcountry cerca de Vernal, Utah", caption: "Grupo en el Sendero" },
  "slide-005": { alt: "Participantes descansando bajo un saliente de arenisca al atardecer en un tour en UTV de Adventure Tours Vernal", caption: "Saliente Rocoso al Atardecer" },
  "slide-006": { alt: "Vista desde el interior de una cueva de arenisca en un tour guiado en UTV cerca de Vernal, Utah", caption: "Dentro de una Cueva de Arenisca" },
  "slide-007": { alt: "Familia posando dentro de una cueva de arenisca en un tour en UTV de Adventure Tours Vernal", caption: "Foto Familiar en la Cueva" },
  "slide-008": { alt: "Neumático de UTV asomado al borde del cañón con vistas a Ashley Gorge cerca de Vernal, Utah", caption: "Al Borde del Cañón" },
  "slide-009": { alt: "Paisaje de badlands desérticas al atardecer en un tour en UTV por el backcountry cerca de Vernal, Utah", caption: "Atardecer en las Badlands" },
  "slide-010": { alt: "UTV side-by-side subiendo una cresta de slickrock en un tour guiado cerca de Vernal, Utah", caption: "Subiendo una Cresta de Slickrock" },
  "slide-011": { alt: "UTV side-by-side azul a toda velocidad por el alto desierto cerca de Vernal, Utah", caption: "A Toda Velocidad por el Desierto" },
  "slide-012": { alt: "UTV side-by-side Kawasaki KRX 1000 alineados bajo un saliente rocoso cerca de Vernal, Utah", caption: "Alineados Bajo el Saliente" },
  "slide-013": { alt: "Grupo detenido con sus UTV side-by-side en un sendero del backcountry cerca de Vernal, Utah", caption: "Parada del Grupo en el Sendero" },
  "slide-014": { alt: "UTV side-by-side junto a una vista del cañón de slickrock en un tour guiado cerca de Vernal, Utah", caption: "Vista del Cañón de Slickrock" },
  "slide-015": { alt: "UTV side-by-side estacionado dentro de una cueva de arenisca cerca de Vernal, Utah", caption: "UTV Dentro de la Cueva" },
  "slide-016": { alt: "Imponente pared de una cueva de arenisca en un tour por el backcountry de Adventure Tours Vernal", caption: "Imponente Pared de la Cueva" },
  "slide-017": { alt: "Participante saltando de un acantilado al agua en una salida de Adventure Tours Vernal cerca de Vernal, Utah", caption: "Salto al Agua desde el Acantilado" },
  "slide-018": { alt: "Convoy de UTV side-by-side en un sendero de montaña durante un tour guiado cerca de Vernal, Utah", caption: "Convoy en el Sendero de Montaña" },
  "slide-019": { alt: "UTV side-by-side sobre slickrock al anochecer cerca de Dinosaur National Monument, Vernal, Utah", caption: "Ruta por el Desierto al Anochecer" },
  "slide-020": { alt: "Tres UTV side-by-side Kawasaki KRX 1000 a contraluz del sol al atardecer cerca de Vernal, Utah", caption: "Trío a Contraluz al Atardecer" },
  "slide-021": { alt: "Participantes de pie sobre el slickrock junto a sus UTV side-by-side Kawasaki KRX 1000 cerca de Vernal, Utah", caption: "Participantes sobre el Slickrock" },
  "slide-022": { alt: "Dos UTV side-by-side estacionados sobre slickrock cerca de Vernal, Utah", caption: "Dos UTV sobre Slickrock" },
  "slide-023": { alt: "UTV side-by-side cubiertos de barro sobre slickrock tras un tour guiado cerca de Vernal, Utah", caption: "UTV Embarrados sobre la Roca" },
  "slide-024": { alt: "UTV side-by-side embarrado sobre un domo de roca en un mirador cerca de Vernal, Utah", caption: "UTV Embarrado en el Mirador" },
  "slide-025": { alt: "UTV side-by-side azul sobre slickrock muy por encima del cañón cerca de Vernal, Utah", caption: "UTV Azul sobre Slickrock" },
  "slide-026": { alt: "UTV side-by-side a contraluz al atardecer en un tour guiado cerca de Vernal, Utah", caption: "UTV al Atardecer" },
  "slide-027": { alt: "UTV side-by-side a contraluz del sol en una ruta al atardecer por el backcountry desértico de Utah", caption: "Silueta a Contraluz" },
  "slide-028": { alt: "Dos UTV side-by-side encaramados en una gran roca en un tour por el backcountry cerca de Vernal, Utah", caption: "UTV Gemelos sobre una Roca" },
  "slide-029": { alt: "Senderistas explorando un arco de arenisca en una salida de Adventure Tours Vernal en Vernal, Utah", caption: "Senderistas en el Arco de Arenisca" },
  "slide-030": { alt: "UTV side-by-side sobre una gran roca con vistas al desierto cerca de Vernal, Utah", caption: "UTV sobre la Gran Roca" },
  "slide-031": { alt: "UTV side-by-side embarrados con vistas al valle en un sendero del backcountry cerca de Vernal, Utah", caption: "UTV Embarrados con Vistas" },
  "slide-032": { alt: "UTV side-by-side en lo alto de una cresta al anochecer cerca de Vernal, Utah", caption: "UTV en la Cresta al Anochecer" },
  "slide-033": { alt: "UTV side-by-side sobre una formación rocosa en cresta en un tour guiado en Vernal, Utah", caption: "UTV en la Cresta Rocosa" },
  "slide-034": { alt: "UTV side-by-side en el alto desierto en un tour por el backcountry cerca de Vernal, Utah", caption: "UTV en el Alto Desierto" },
  "slide-035": { alt: "UTV side-by-side en un mirador sobre un domo de slickrock cerca de Vernal, Utah", caption: "Mirador del Domo de Slickrock" },
  "slide-036": { alt: "Mirador sobre el país de los cañones en un tour en UTV por el backcountry cerca de Vernal, Utah", caption: "Mirador del País de los Cañones" },
  "slide-037": { alt: "UTV side-by-side subiendo el slickrock en un tour guiado cerca de Vernal, Utah", caption: "Subiendo el Slickrock" },
  "slide-038": { alt: "UTV side-by-side descendiendo una pared rocosa empinada en un tour guiado cerca de Vernal, Utah", caption: "UTV Descendiendo la Roca" },
  "slide-039": { alt: "UTV side-by-side coronando unas rocas en un sendero del backcountry cerca de Vernal, Utah", caption: "UTV Coronando las Rocas" },
  "slide-040": { alt: "UTV side-by-side verde en un sendero del desierto cerca de Vernal, Utah", caption: "UTV Verde en el Sendero" },
  "slide-041": { alt: "UTV side-by-side subiendo el slickrock en un tour guiado cerca de Vernal, Utah", caption: "UTV Subiendo el Slickrock" },
  "slide-042": { alt: "UTV side-by-side sobre el slickrock en un tour por el backcountry cerca de Vernal, Utah", caption: "UTV sobre el Slickrock" },
  "slide-043": { alt: "UTV side-by-side subiendo una cresta de arenisca cerca de Vernal, Utah", caption: "Subiendo una Cresta de Arenisca" },
  "slide-044": { alt: "UTV side-by-side estacionado al pie de un cerro desértico cerca de Vernal, Utah", caption: "Estacionado junto al Cerro" },
  "slide-045": { alt: "Vista a través de un arco de roca hacia un cerro desértico cerca de Vernal, Utah", caption: "A Través del Arco de Roca" },
  "slide-046": { alt: "UTV side-by-side embarrado trepando rocas en un tour por el backcountry cerca de Vernal, Utah", caption: "Máquina Embarrada Trepando" },
  "slide-047": { alt: "UTV side-by-side estacionados bajo un arco de roca natural cerca de Vernal, Utah", caption: "Side-by-Side Bajo el Arco" },
  "slide-048": { alt: "Dos UTV side-by-side en un sendero del cañón por el backcountry de Utah", caption: "Dúo en el Sendero del Cañón" },
  "slide-049": { alt: "UTV side-by-side en un descenso empinado de slickrock cerca de Vernal, Utah", caption: "Descenso Empinado de Slickrock" },
  "slide-050": { alt: "Rock crawling guiado en UTV side-by-side por un cauce de arenisca cerca de Vernal, Utah", caption: "Rock Crawling Guiado" },
  "slide-051": { alt: "Mirador del desierto al anochecer en un tour en UTV por el backcountry cerca de Vernal, Utah", caption: "Mirador al Anochecer" },
  "slide-052": { alt: "UTV side-by-side afrontando una rodada profunda en un sendero del backcountry cerca de Vernal, Utah", caption: "Afrontando la Rodada" },
  "slide-053": { alt: "UTV side-by-side vadeando un río entre salpicaduras cerca de Vernal, Utah", caption: "Vadeando el Río" },
  "slide-054": { alt: "Cartel del inicio del sendero de Doc's Beach en un tour en UTV de Adventure Tours Vernal cerca de Vernal, Utah", caption: "Senderos de Doc's Beach" },
  "slide-055": { alt: "Flota de UTV side-by-side Kawasaki KRX 1000 preparada para un tour guiado en Vernal, Utah", caption: "Flota Preparada en Fila" },
  "slide-056": { alt: "Grupo del tour detenido con sus UTV side-by-side cerca de Vernal, Utah", caption: "Parada del Grupo" },
  "slide-057": { alt: "Grupo del tour con UTV side-by-side Kawasaki KRX 1000 en una cresta cerca de Vernal, Utah", caption: "Foto del Grupo del Tour" },
  "slide-058": { alt: "Larga fila de UTV side-by-side preparados y listos para un tour guiado cerca de Vernal, Utah", caption: "En Fila y Listos" },
  "slide-059": { alt: "Flota de UTV side-by-side preparada en lo alto de una colina cerca de Vernal, Utah", caption: "Flota en lo Alto de la Colina" },
  "slide-060": { alt: "UTV side-by-side avanzando con fuerza por un sendero embarrado del backcountry cerca de Vernal, Utah", caption: "Embestida por el Sendero Embarrado" },
  "slide-061": { alt: "UTV side-by-side Kawasaki verde cruzando una rodada embarrada cerca de Vernal, Utah", caption: "Máquina Verde en el Barro" },
  "slide-062": { alt: "Grupo del tour reunido bajo un saliente rocoso con sus UTV side-by-side cerca de Vernal, Utah", caption: "Grupo Bajo el Saliente" },
  "slide-063": { alt: "UTV side-by-side estacionados al borde de un acantilado en un tour guiado cerca de Vernal, Utah", caption: "UTV al Borde del Acantilado" },
  "slide-064": { alt: "Vista de un sendero rocoso en un tour en UTV por el backcountry cerca de Vernal, Utah", caption: "Vista del Sendero Rocoso" },
  "slide-065": { alt: "Participante saltando de un acantilado para refrescarse en una salida de Adventure Tours Vernal cerca de Vernal, Utah", caption: "Salto al Agua para Refrescarse" },
  "slide-066": { alt: "UTV side-by-side preparados al pie de un domo de slickrock cerca de Vernal, Utah", caption: "UTV Preparados Abajo" },
  "slide-067": { alt: "UTV side-by-side azul conquistando un domo de slickrock con un guía cerca de Vernal, Utah", caption: "Conquistando el Slickrock" },
  "slide-068": { alt: "Tres UTV side-by-side haciendo rock crawling por el backcountry de Utah", caption: "Trío en Rock Crawling" },
  "slide-069": { alt: "Participantes explorando viviendas en los acantilados en un tour en UTV de Adventure Tours Vernal", caption: "Explorando Viviendas en los Acantilados" },
  "slide-070": { alt: "Gran arco natural de arenisca sobre el valle en un tour guiado en UTV cerca de Vernal, Utah", caption: "Arco Natural de Arenisca" },
  "slide-071": { alt: "Grupo del tour en un arco de roca al atardecer cerca de Vernal, Utah", caption: "Grupo en el Arco al Atardecer" },
  "slide-072": { alt: "Dentro de una cueva de arenisca en un tour por el backcountry de Adventure Tours Vernal", caption: "Dentro de la Cueva" },
  "slide-073": { alt: "UTV side-by-side en un ascenso a la cumbre de slickrock cerca de Vernal, Utah", caption: "Ascenso a la Cumbre de Slickrock" },
  "slide-074": { alt: "UTV side-by-side en una aventura de vadeo del río cerca de Vernal, Utah", caption: "Aventura al Vadear el Río" },
  "slide-075": { alt: "UTV side-by-side estacionado en un mirador sobre el cañón cerca de Vernal, Utah", caption: "Perfil de la Máquina Estacionada" },
  "slide-076": { alt: "UTV side-by-side saltando una duna de arena cerca de Vernal, Utah", caption: "Salto sobre la Duna de Arena" },
  "slide-077": { alt: "UTV side-by-side estacionado junto a un arco de arenisca cerca de Vernal, Utah", caption: "Estacionado junto al Arco" },
  "slide-078": { alt: "Arco de arenisca dorada en un tour en UTV por el backcountry cerca de Vernal, Utah", caption: "Arco de Roca Dorada" },
  "slide-079": { alt: "Abertura en forma de ventana en una cueva de arenisca cerca de Vernal, Utah", caption: "Ventana en la Cueva de Arenisca" },
  "slide-080": { alt: "Sendero junto a una imponente pared del cañón cerca de Vernal, Utah", caption: "Sendero por la Pared del Cañón" },
  "slide-081": { alt: "UTV side-by-side estacionados bajo un arco de arenisca cerca de Vernal, Utah", caption: "UTV Bajo el Arco" },
  "slide-082": { alt: "Interior de una cueva de arenisca en un tour de Adventure Tours Vernal cerca de Vernal, Utah", caption: "Vista del Interior de la Cueva" },
  "slide-083": { alt: "Imponente saliente rocoso en un tour en UTV por el backcountry cerca de Vernal, Utah", caption: "Imponente Saliente Rocoso" },
  "slide-084": { alt: "Tres UTV side-by-side en el borde del cañón cerca de Vernal, Utah", caption: "Tres UTV en el Borde del Cañón" },
  "slide-085": { alt: "Pareja posando al borde de un acantilado con vistas al cañón cerca de Vernal, Utah", caption: "Pareja al Borde del Acantilado" },
  "slide-086": { alt: "Mirador otoñal sobre el cañón en un sendero de UTV del backcountry cerca de Vernal, Utah", caption: "Mirador del Cañón en Otoño" },
  "slide-087": { alt: "UTV side-by-side en un sendero flanqueado por álamos temblones cerca de Vernal, Utah", caption: "Ruta por el Sendero de Álamos" },
  "slide-088": { alt: "UTV side-by-side en un descenso de slickrock cerca de Vernal, Utah", caption: "Descenso de Slickrock" },
  "slide-089": { alt: "Sendero de álamos temblones dorados en una aventura guiada en side-by-side cerca de Vernal, Utah", caption: "Sendero de Álamos Dorados" },
  "slide-090": { alt: "UTV side-by-side sobre el cañón en un tour por el backcountry cerca de Vernal, Utah", caption: "UTV sobre el Cañón" },
  "slide-091": { alt: "Vista a través de un arco de arenisca en un tour de Adventure Tours Vernal cerca de Vernal, Utah", caption: "A Través del Arco" },
  "slide-092": { alt: "UTV side-by-side sobre slickrock bajo un cielo tormentoso cerca de Vernal, Utah", caption: "Slickrock Bajo la Tormenta" },
  "slide-093": { alt: "UTV side-by-side azul levantando polvo en un sendero del desierto cerca de Vernal, Utah", caption: "Polvo en el Sendero del Desierto" },
  "slide-094": { alt: "Dentro de una cueva de arenisca mirando por una abertura cerca de Vernal, Utah", caption: "Dentro de una Cueva de Arenisca" },
  "slide-095": { alt: "UTV side-by-side en un punto de preparación en la cima de la montaña cerca de Vernal, Utah", caption: "Punto de Preparación en la Cima" },
  "slide-096": { alt: "Tres UTV side-by-side alineados en un tour guiado cerca de Vernal, Utah", caption: "Tres UTV Alineados" },
  "slide-097": { alt: "Vista de una cresta de slickrock en un tour en UTV por el backcountry cerca de Vernal, Utah", caption: "Vista de la Cresta de Slickrock" },
  "slide-098": { alt: "UTV side-by-side subiendo el slickrock cerca de Vernal, Utah", caption: "Subiendo el Slickrock" },
  "slide-099": { alt: "UTV side-by-side en una subida de slickrock bajo un cielo tormentoso cerca de Vernal, Utah", caption: "Subida de Slickrock con Tormenta" },
  "slide-100": { alt: "UTV side-by-side lanzando polvo en un sendero del desierto cerca de Vernal, Utah", caption: "Estela de Polvo en el Aire" },
  "slide-101": { alt: "UTV side-by-side en una subida por una repisa rocosa empinada cerca de Vernal, Utah", caption: "Subida por la Repisa Empinada" },
  "slide-102": { alt: "UTV side-by-side levantando arena al tomar una curva cerca de Vernal, Utah", caption: "Curva con Arena Levantada" },
  "slide-103": { alt: "UTV side-by-side con una bandera estadounidense, detenido cerca de Vernal, Utah", caption: "UTV con Bandera Estadounidense" },
  "slide-104": { alt: "UTV side-by-side al borde de un acantilado al anochecer cerca de Vernal, Utah", caption: "Borde del Acantilado al Anochecer" },
  "slide-105": { alt: "UTV side-by-side en una línea de cresta al crepúsculo en el backcountry desértico de Utah", caption: "Línea de Cresta al Crepúsculo" },
};

const GALLERY_TEXT_IT: GalleryDictionary = {
  "slide-001": { alt: "UTV side-by-side parcheggiato in una nicchia di arenaria durante un tour in UTV di Adventure Tours Vernal", caption: "Alla Scoperta di una Nicchia di Arenaria" },
  "slide-002": { alt: "Fila di UTV side-by-side Kawasaki KRX 1000 pronti prima di un tour guidato in UTV a Vernal, Utah", caption: "Fila di UTV Pronti alla Partenza" },
  "slide-003": { alt: "UTV side-by-side blu che solleva polvere su un sentiero nel deserto vicino a Vernal, Utah", caption: "Nuvola di Polvere" },
  "slide-004": { alt: "Gruppo alla guida di UTV side-by-side su un sentiero nel backcountry vicino a Vernal, Utah", caption: "Gruppo sul Sentiero" },
  "slide-005": { alt: "Partecipanti in sosta sotto una sporgenza di arenaria al tramonto durante un tour in UTV di Adventure Tours Vernal", caption: "Sporgenza di Roccia al Tramonto" },
  "slide-006": { alt: "Vista dall'interno di una grotta di arenaria durante un tour guidato in UTV vicino a Vernal, Utah", caption: "Dentro una Grotta di Arenaria" },
  "slide-007": { alt: "Famiglia in posa dentro una grotta di arenaria durante un tour in UTV di Adventure Tours Vernal", caption: "Foto di Famiglia nella Grotta" },
  "slide-008": { alt: "Ruota di un UTV affacciata sul bordo del canyon con vista su Ashley Gorge vicino a Vernal, Utah", caption: "Sul Bordo del Canyon" },
  "slide-009": { alt: "Paesaggio di calanchi desertici al tramonto durante un tour in UTV nel backcountry vicino a Vernal, Utah", caption: "Tramonto sui Calanchi del Deserto" },
  "slide-010": { alt: "UTV side-by-side in salita su una cresta di slickrock durante un tour guidato vicino a Vernal, Utah", caption: "In Salita su una Cresta di Slickrock" },
  "slide-011": { alt: "UTV side-by-side blu lanciato a tutta velocità nel deserto d'alta quota vicino a Vernal, Utah", caption: "A Tutta Velocità nel Deserto" },
  "slide-012": { alt: "UTV side-by-side Kawasaki KRX 1000 allineati sotto una sporgenza di roccia vicino a Vernal, Utah", caption: "Allineati sotto la Sporgenza" },
  "slide-013": { alt: "Gruppo fermo con i propri UTV side-by-side lungo un sentiero nel backcountry vicino a Vernal, Utah", caption: "Sosta del Gruppo sul Sentiero" },
  "slide-014": { alt: "UTV side-by-side accanto a una veduta del canyon di slickrock durante un tour guidato vicino a Vernal, Utah", caption: "Veduta del Canyon di Slickrock" },
  "slide-015": { alt: "UTV side-by-side parcheggiato dentro una grotta di arenaria vicino a Vernal, Utah", caption: "UTV dentro la Grotta" },
  "slide-016": { alt: "Imponente parete di una grotta di arenaria durante un tour nel backcountry di Adventure Tours Vernal", caption: "Imponente Parete della Grotta" },
  "slide-017": { alt: "Partecipante che si tuffa da una scogliera durante un'uscita di Adventure Tours Vernal vicino a Vernal, Utah", caption: "Tuffo dalla Scogliera" },
  "slide-018": { alt: "Convoglio di UTV side-by-side su un sentiero di montagna durante un tour guidato vicino a Vernal, Utah", caption: "Convoglio sul Sentiero di Montagna" },
  "slide-019": { alt: "UTV side-by-side sullo slickrock al crepuscolo vicino a Dinosaur National Monument, Vernal, Utah", caption: "Giro nel Deserto al Crepuscolo" },
  "slide-020": { alt: "Tre UTV side-by-side Kawasaki KRX 1000 in controluce contro il sole al tramonto vicino a Vernal, Utah", caption: "Trio in Controluce al Tramonto" },
  "slide-021": { alt: "Partecipanti in piedi sullo slickrock accanto ai loro UTV side-by-side Kawasaki KRX 1000 vicino a Vernal, Utah", caption: "Partecipanti sullo Slickrock" },
  "slide-022": { alt: "Due UTV side-by-side parcheggiati sullo slickrock vicino a Vernal, Utah", caption: "Due UTV sullo Slickrock" },
  "slide-023": { alt: "UTV side-by-side coperti di fango sullo slickrock dopo un tour guidato vicino a Vernal, Utah", caption: "UTV Infangati sulla Roccia" },
  "slide-024": { alt: "UTV side-by-side infangato su una cupola di roccia a un punto panoramico vicino a Vernal, Utah", caption: "UTV Infangato al Punto Panoramico" },
  "slide-025": { alt: "UTV side-by-side blu sullo slickrock alto sopra il canyon vicino a Vernal, Utah", caption: "UTV Blu sullo Slickrock" },
  "slide-026": { alt: "UTV side-by-side in controluce al tramonto durante un tour guidato vicino a Vernal, Utah", caption: "UTV al Tramonto" },
  "slide-027": { alt: "UTV side-by-side in controluce contro il sole durante un giro al tramonto nel backcountry desertico dello Utah", caption: "Sagoma in Controluce" },
  "slide-028": { alt: "Due UTV side-by-side in bilico su un masso durante un tour nel backcountry vicino a Vernal, Utah", caption: "Due UTV su un Masso" },
  "slide-029": { alt: "Escursionisti alla scoperta di un arco di arenaria durante un'uscita di Adventure Tours Vernal a Vernal, Utah", caption: "Escursionisti all'Arco di Arenaria" },
  "slide-030": { alt: "UTV side-by-side sopra un grande masso con vista sul deserto vicino a Vernal, Utah", caption: "UTV sul Grande Masso" },
  "slide-031": { alt: "UTV side-by-side infangati con vista sulla valle su un sentiero nel backcountry vicino a Vernal, Utah", caption: "UTV Infangati con Vista" },
  "slide-032": { alt: "UTV side-by-side in cima a una cresta al crepuscolo vicino a Vernal, Utah", caption: "UTV in Cresta al Crepuscolo" },
  "slide-033": { alt: "UTV side-by-side su una formazione rocciosa a cresta durante un tour guidato a Vernal, Utah", caption: "UTV sulla Cresta Rocciosa" },
  "slide-034": { alt: "UTV side-by-side nel deserto d'alta quota durante un tour nel backcountry vicino a Vernal, Utah", caption: "UTV nel Deserto d'Alta Quota" },
  "slide-035": { alt: "UTV side-by-side a un punto panoramico su una cupola di slickrock vicino a Vernal, Utah", caption: "Punto Panoramico sulla Cupola di Slickrock" },
  "slide-036": { alt: "Punto panoramico sul territorio dei canyon durante un tour in UTV nel backcountry vicino a Vernal, Utah", caption: "Panorama sul Territorio dei Canyon" },
  "slide-037": { alt: "UTV side-by-side in salita sullo slickrock durante un tour guidato vicino a Vernal, Utah", caption: "In Salita sullo Slickrock" },
  "slide-038": { alt: "UTV side-by-side in discesa su una ripida parete di roccia durante un tour guidato vicino a Vernal, Utah", caption: "UTV in Discesa sulla Roccia" },
  "slide-039": { alt: "UTV side-by-side che supera dei massi su un sentiero nel backcountry vicino a Vernal, Utah", caption: "UTV sulla Cresta dei Massi" },
  "slide-040": { alt: "UTV side-by-side verde su un sentiero nel deserto vicino a Vernal, Utah", caption: "UTV Verde sul Sentiero" },
  "slide-041": { alt: "UTV side-by-side in salita sullo slickrock durante un tour guidato vicino a Vernal, Utah", caption: "UTV in Salita sullo Slickrock" },
  "slide-042": { alt: "UTV side-by-side sullo slickrock durante un tour nel backcountry vicino a Vernal, Utah", caption: "UTV sullo Slickrock" },
  "slide-043": { alt: "UTV side-by-side in salita su una cresta di arenaria vicino a Vernal, Utah", caption: "In Salita su una Cresta di Arenaria" },
  "slide-044": { alt: "UTV side-by-side parcheggiato ai piedi di un rilievo desertico vicino a Vernal, Utah", caption: "Sosta ai Piedi del Rilievo" },
  "slide-045": { alt: "Veduta attraverso un arco di roccia verso un rilievo desertico vicino a Vernal, Utah", caption: "Attraverso l'Arco di Roccia" },
  "slide-046": { alt: "UTV side-by-side infangato che si arrampica sulle rocce durante un tour nel backcountry vicino a Vernal, Utah", caption: "Mezzo Infangato in Arrampicata" },
  "slide-047": { alt: "UTV side-by-side parcheggiati sotto un arco di roccia naturale vicino a Vernal, Utah", caption: "Side-by-Side sotto l'Arco" },
  "slide-048": { alt: "Due UTV side-by-side su un sentiero nel canyon attraverso il backcountry dello Utah", caption: "Duo sul Sentiero del Canyon" },
  "slide-049": { alt: "UTV side-by-side su una ripida discesa di slickrock vicino a Vernal, Utah", caption: "Ripida Discesa di Slickrock" },
  "slide-050": { alt: "Rock crawling guidato in UTV side-by-side lungo un canale di arenaria vicino a Vernal, Utah", caption: "Rock Crawling Guidato" },
  "slide-051": { alt: "Punto panoramico nel deserto al crepuscolo durante un tour in UTV nel backcountry vicino a Vernal, Utah", caption: "Punto Panoramico al Crepuscolo" },
  "slide-052": { alt: "UTV side-by-side alle prese con un solco profondo su un sentiero nel backcountry vicino a Vernal, Utah", caption: "Alle Prese con il Solco" },
  "slide-053": { alt: "UTV side-by-side che attraversa un guado sollevando spruzzi vicino a Vernal, Utah", caption: "Guado tra gli Spruzzi" },
  "slide-054": { alt: "Cartello dell'inizio del sentiero di Doc's Beach durante un tour in UTV di Adventure Tours Vernal vicino a Vernal, Utah", caption: "Sentieri di Doc's Beach" },
  "slide-055": { alt: "Flotta di UTV side-by-side Kawasaki KRX 1000 pronta per un tour guidato a Vernal, Utah", caption: "Flotta Pronta in Fila" },
  "slide-056": { alt: "Gruppo del tour fermo con i propri UTV side-by-side vicino a Vernal, Utah", caption: "Sosta del Gruppo" },
  "slide-057": { alt: "Gruppo del tour con UTV side-by-side Kawasaki KRX 1000 su una cresta vicino a Vernal, Utah", caption: "Foto del Gruppo del Tour" },
  "slide-058": { alt: "Lunga fila di UTV side-by-side pronti per un tour guidato vicino a Vernal, Utah", caption: "In Fila e Pronti" },
  "slide-059": { alt: "Flotta di UTV side-by-side pronta in cima a una collina vicino a Vernal, Utah", caption: "Flotta in Cima alla Collina" },
  "slide-060": { alt: "UTV side-by-side che avanza deciso su un sentiero fangoso nel backcountry vicino a Vernal, Utah", caption: "Carica sul Sentiero Fangoso" },
  "slide-061": { alt: "UTV side-by-side Kawasaki verde che supera un solco fangoso vicino a Vernal, Utah", caption: "Mezzo Verde nel Fango" },
  "slide-062": { alt: "Gruppo del tour riunito sotto una sporgenza di roccia con i propri UTV side-by-side vicino a Vernal, Utah", caption: "Gruppo sotto la Sporgenza" },
  "slide-063": { alt: "UTV side-by-side parcheggiati sul ciglio di una scogliera durante un tour guidato vicino a Vernal, Utah", caption: "UTV sul Ciglio della Scogliera" },
  "slide-064": { alt: "Veduta di un sentiero roccioso durante un tour in UTV nel backcountry vicino a Vernal, Utah", caption: "Veduta del Sentiero Roccioso" },
  "slide-065": { alt: "Partecipante che si tuffa da una scogliera per rinfrescarsi durante un'uscita di Adventure Tours Vernal vicino a Vernal, Utah", caption: "Tuffo Rinfrescante dalla Scogliera" },
  "slide-066": { alt: "UTV side-by-side pronti ai piedi di una cupola di slickrock vicino a Vernal, Utah", caption: "UTV Pronti ai Piedi della Cupola" },
  "slide-067": { alt: "UTV side-by-side blu che conquista una cupola di slickrock con una guida vicino a Vernal, Utah", caption: "Alla Conquista dello Slickrock" },
  "slide-068": { alt: "Tre UTV side-by-side impegnati nel rock crawling attraverso il backcountry dello Utah", caption: "Trio nel Rock Crawling" },
  "slide-069": { alt: "Partecipanti alla scoperta di abitazioni rupestri durante un tour in UTV di Adventure Tours Vernal", caption: "Alla Scoperta delle Abitazioni Rupestri" },
  "slide-070": { alt: "Grande arco naturale di arenaria sopra la valle durante un tour guidato in UTV vicino a Vernal, Utah", caption: "Arco Naturale di Arenaria" },
  "slide-071": { alt: "Gruppo del tour a un arco di roccia al tramonto vicino a Vernal, Utah", caption: "Gruppo all'Arco al Tramonto" },
  "slide-072": { alt: "Dentro una grotta di arenaria durante un tour nel backcountry di Adventure Tours Vernal", caption: "Dentro la Grotta" },
  "slide-073": { alt: "UTV side-by-side in salita verso una vetta di slickrock vicino a Vernal, Utah", caption: "Salita alla Vetta di Slickrock" },
  "slide-074": { alt: "UTV side-by-side in un'avventura di guado del fiume vicino a Vernal, Utah", caption: "Avventura al Guado del Fiume" },
  "slide-075": { alt: "UTV side-by-side parcheggiato a un punto panoramico sul canyon vicino a Vernal, Utah", caption: "Profilo del Mezzo in Sosta" },
  "slide-076": { alt: "UTV side-by-side in volo sopra una duna di sabbia vicino a Vernal, Utah", caption: "Salto sulla Duna di Sabbia" },
  "slide-077": { alt: "UTV side-by-side parcheggiato accanto a un arco di arenaria vicino a Vernal, Utah", caption: "Sosta all'Arco" },
  "slide-078": { alt: "Arco di arenaria dorata durante un tour in UTV nel backcountry vicino a Vernal, Utah", caption: "Arco di Roccia Dorata" },
  "slide-079": { alt: "Apertura a finestra in una grotta di arenaria vicino a Vernal, Utah", caption: "Finestra nella Grotta di Arenaria" },
  "slide-080": { alt: "Sentiero lungo un'imponente parete del canyon vicino a Vernal, Utah", caption: "Sentiero sulla Parete del Canyon" },
  "slide-081": { alt: "UTV side-by-side parcheggiati sotto un arco di arenaria vicino a Vernal, Utah", caption: "UTV sotto l'Arco" },
  "slide-082": { alt: "Interno di una grotta di arenaria durante un tour di Adventure Tours Vernal vicino a Vernal, Utah", caption: "Veduta dell'Interno della Grotta" },
  "slide-083": { alt: "Imponente sporgenza di roccia durante un tour in UTV nel backcountry vicino a Vernal, Utah", caption: "Imponente Sporgenza di Roccia" },
  "slide-084": { alt: "Tre UTV side-by-side sul bordo del canyon vicino a Vernal, Utah", caption: "Tre UTV sul Bordo del Canyon" },
  "slide-085": { alt: "Coppia in posa sul ciglio di una scogliera con vista sul canyon vicino a Vernal, Utah", caption: "Coppia sul Ciglio della Scogliera" },
  "slide-086": { alt: "Punto panoramico autunnale sul canyon lungo un sentiero per UTV nel backcountry vicino a Vernal, Utah", caption: "Panorama Autunnale sul Canyon" },
  "slide-087": { alt: "UTV side-by-side su un sentiero fiancheggiato da pioppi tremuli vicino a Vernal, Utah", caption: "Giro sul Sentiero dei Pioppi Tremuli" },
  "slide-088": { alt: "UTV side-by-side in discesa sullo slickrock vicino a Vernal, Utah", caption: "Discesa sullo Slickrock" },
  "slide-089": { alt: "Sentiero di pioppi tremuli dorati durante un'avventura guidata in side-by-side vicino a Vernal, Utah", caption: "Sentiero dei Pioppi Dorati" },
  "slide-090": { alt: "UTV side-by-side sopra il canyon durante un tour nel backcountry vicino a Vernal, Utah", caption: "UTV sopra il Canyon" },
  "slide-091": { alt: "Veduta attraverso un arco di arenaria durante un tour di Adventure Tours Vernal vicino a Vernal, Utah", caption: "Attraverso l'Arco" },
  "slide-092": { alt: "UTV side-by-side sullo slickrock sotto un cielo di tempesta vicino a Vernal, Utah", caption: "Slickrock sotto la Tempesta" },
  "slide-093": { alt: "UTV side-by-side blu che solleva polvere su un sentiero nel deserto vicino a Vernal, Utah", caption: "Polvere sul Sentiero del Deserto" },
  "slide-094": { alt: "Dentro una grotta di arenaria guardando fuori da un'apertura a finestra vicino a Vernal, Utah", caption: "Dentro una Grotta di Arenaria" },
  "slide-095": { alt: "UTV side-by-side a un punto di raduno in cima alla montagna vicino a Vernal, Utah", caption: "Punto di Raduno in Vetta" },
  "slide-096": { alt: "Tre UTV side-by-side allineati durante un tour guidato vicino a Vernal, Utah", caption: "Tre UTV Allineati" },
  "slide-097": { alt: "Veduta di una cresta di slickrock durante un tour in UTV nel backcountry vicino a Vernal, Utah", caption: "Veduta della Cresta di Slickrock" },
  "slide-098": { alt: "UTV side-by-side in salita sullo slickrock vicino a Vernal, Utah", caption: "In Salita sullo Slickrock" },
  "slide-099": { alt: "UTV side-by-side in salita sullo slickrock sotto un cielo di tempesta vicino a Vernal, Utah", caption: "Salita di Slickrock in Tempesta" },
  "slide-100": { alt: "UTV side-by-side che alza polvere su un sentiero nel deserto vicino a Vernal, Utah", caption: "Scia di Polvere nell'Aria" },
  "slide-101": { alt: "UTV side-by-side in salita su un ripido gradone di roccia vicino a Vernal, Utah", caption: "Salita sul Ripido Gradone" },
  "slide-102": { alt: "UTV side-by-side che solleva sabbia in curva vicino a Vernal, Utah", caption: "Curva con Spruzzo di Sabbia" },
  "slide-103": { alt: "UTV side-by-side fermo con una bandiera statunitense vicino a Vernal, Utah", caption: "UTV con Bandiera Statunitense" },
  "slide-104": { alt: "UTV side-by-side sul ciglio di una scogliera al crepuscolo vicino a Vernal, Utah", caption: "Ciglio della Scogliera al Crepuscolo" },
  "slide-105": { alt: "UTV side-by-side su una linea di cresta all'imbrunire nel backcountry desertico dello Utah", caption: "Linea di Cresta all'Imbrunire" },
};

const GALLERY_TEXT_PT: GalleryDictionary = {
  "slide-001": { alt: "UTV side-by-side estacionado num nicho de arenito num tour em UTV da Adventure Tours Vernal", caption: "A Explorar um Nicho de Arenito" },
  "slide-002": { alt: "Fila de UTV side-by-side Kawasaki KRX 1000 prontos antes de um tour guiado em UTV em Vernal, Utah", caption: "Fila de UTV a Postos" },
  "slide-003": { alt: "UTV side-by-side azul a levantar poeira num trilho do deserto perto de Vernal, Utah", caption: "A Levantar Poeira" },
  "slide-004": { alt: "Grupo a conduzir UTV side-by-side num trilho do backcountry perto de Vernal, Utah", caption: "Grupo no Trilho" },
  "slide-005": { alt: "Participantes a descansar sob uma saliência de arenito ao pôr do sol num tour em UTV da Adventure Tours Vernal", caption: "Saliência Rochosa ao Pôr do Sol" },
  "slide-006": { alt: "Vista do interior de uma gruta de arenito num tour guiado em UTV perto de Vernal, Utah", caption: "Dentro de uma Gruta de Arenito" },
  "slide-007": { alt: "Família a posar dentro de uma gruta de arenito num tour em UTV da Adventure Tours Vernal", caption: "Foto de Família na Gruta" },
  "slide-008": { alt: "Pneu de UTV debruçado sobre o bordo do canyon com vista para Ashley Gorge perto de Vernal, Utah", caption: "No Bordo do Canyon" },
  "slide-009": { alt: "Paisagem de badlands desérticas ao pôr do sol num tour em UTV pelo backcountry perto de Vernal, Utah", caption: "Pôr do Sol nas Badlands" },
  "slide-010": { alt: "UTV side-by-side a subir uma crista de slickrock num tour guiado perto de Vernal, Utah", caption: "A Subir uma Crista de Slickrock" },
  "slide-011": { alt: "UTV side-by-side azul a toda a velocidade pelo deserto alto perto de Vernal, Utah", caption: "A Toda a Velocidade pelo Deserto" },
  "slide-012": { alt: "UTV side-by-side Kawasaki KRX 1000 alinhados sob uma saliência rochosa perto de Vernal, Utah", caption: "Alinhados sob a Saliência" },
  "slide-013": { alt: "Grupo parado com os seus UTV side-by-side ao longo de um trilho do backcountry perto de Vernal, Utah", caption: "Paragem do Grupo no Trilho" },
  "slide-014": { alt: "UTV side-by-side junto a uma vista do canyon de slickrock num tour guiado perto de Vernal, Utah", caption: "Vista do Canyon de Slickrock" },
  "slide-015": { alt: "UTV side-by-side estacionado dentro de uma gruta de arenito perto de Vernal, Utah", caption: "UTV dentro da Gruta" },
  "slide-016": { alt: "Imponente parede de uma gruta de arenito num tour pelo backcountry da Adventure Tours Vernal", caption: "Imponente Parede da Gruta" },
  "slide-017": { alt: "Participante a saltar de uma falésia para a água numa saída da Adventure Tours Vernal perto de Vernal, Utah", caption: "Salto para a Água da Falésia" },
  "slide-018": { alt: "Comboio de UTV side-by-side num trilho de montanha durante um tour guiado perto de Vernal, Utah", caption: "Comboio no Trilho de Montanha" },
  "slide-019": { alt: "UTV side-by-side sobre slickrock ao crepúsculo perto do Dinosaur National Monument, Vernal, Utah", caption: "Passeio pelo Deserto ao Crepúsculo" },
  "slide-020": { alt: "Três UTV side-by-side Kawasaki KRX 1000 em contraluz contra o sol ao pôr do sol perto de Vernal, Utah", caption: "Trio em Contraluz ao Pôr do Sol" },
  "slide-021": { alt: "Participantes de pé sobre o slickrock junto aos seus UTV side-by-side Kawasaki KRX 1000 perto de Vernal, Utah", caption: "Participantes sobre o Slickrock" },
  "slide-022": { alt: "Dois UTV side-by-side estacionados sobre slickrock perto de Vernal, Utah", caption: "Dois UTV sobre Slickrock" },
  "slide-023": { alt: "UTV side-by-side cobertos de lama sobre slickrock após um tour guiado perto de Vernal, Utah", caption: "UTV Lamacentos sobre a Rocha" },
  "slide-024": { alt: "UTV side-by-side lamacento sobre um domo de rocha num miradouro perto de Vernal, Utah", caption: "UTV Lamacento no Miradouro" },
  "slide-025": { alt: "UTV side-by-side azul sobre slickrock bem acima do canyon perto de Vernal, Utah", caption: "UTV Azul sobre Slickrock" },
  "slide-026": { alt: "UTV side-by-side em contraluz ao pôr do sol num tour guiado perto de Vernal, Utah", caption: "UTV ao Pôr do Sol" },
  "slide-027": { alt: "UTV side-by-side em contraluz contra o sol num passeio ao pôr do sol pelo backcountry desértico do Utah", caption: "Silhueta em Contraluz" },
  "slide-028": { alt: "Dois UTV side-by-side empoleirados num pedregulho num tour pelo backcountry perto de Vernal, Utah", caption: "Dois UTV sobre um Pedregulho" },
  "slide-029": { alt: "Caminhantes a explorar um arco de arenito numa saída da Adventure Tours Vernal em Vernal, Utah", caption: "Caminhantes no Arco de Arenito" },
  "slide-030": { alt: "UTV side-by-side sobre um grande pedregulho com vista para o deserto perto de Vernal, Utah", caption: "UTV sobre o Grande Pedregulho" },
  "slide-031": { alt: "UTV side-by-side lamacentos com vista para o vale num trilho do backcountry perto de Vernal, Utah", caption: "UTV Lamacentos com Vista" },
  "slide-032": { alt: "UTV side-by-side no cimo de uma crista ao crepúsculo perto de Vernal, Utah", caption: "UTV na Crista ao Crepúsculo" },
  "slide-033": { alt: "UTV side-by-side numa formação rochosa em crista num tour guiado em Vernal, Utah", caption: "UTV na Crista Rochosa" },
  "slide-034": { alt: "UTV side-by-side no deserto alto num tour pelo backcountry perto de Vernal, Utah", caption: "UTV no Deserto Alto" },
  "slide-035": { alt: "UTV side-by-side num miradouro sobre um domo de slickrock perto de Vernal, Utah", caption: "Miradouro do Domo de Slickrock" },
  "slide-036": { alt: "Miradouro sobre a região dos canyons num tour em UTV pelo backcountry perto de Vernal, Utah", caption: "Miradouro da Região dos Canyons" },
  "slide-037": { alt: "UTV side-by-side a subir o slickrock num tour guiado perto de Vernal, Utah", caption: "A Subir o Slickrock" },
  "slide-038": { alt: "UTV side-by-side a descer uma parede rochosa íngreme num tour guiado perto de Vernal, Utah", caption: "UTV a Descer a Rocha" },
  "slide-039": { alt: "UTV side-by-side a coroar pedregulhos num trilho do backcountry perto de Vernal, Utah", caption: "UTV a Coroar os Pedregulhos" },
  "slide-040": { alt: "UTV side-by-side verde num trilho do deserto perto de Vernal, Utah", caption: "UTV Verde no Trilho" },
  "slide-041": { alt: "UTV side-by-side a subir o slickrock num tour guiado perto de Vernal, Utah", caption: "UTV a Subir o Slickrock" },
  "slide-042": { alt: "UTV side-by-side sobre o slickrock num tour pelo backcountry perto de Vernal, Utah", caption: "UTV sobre o Slickrock" },
  "slide-043": { alt: "UTV side-by-side a subir uma crista de arenito perto de Vernal, Utah", caption: "A Subir uma Crista de Arenito" },
  "slide-044": { alt: "UTV side-by-side estacionado ao pé de um outeiro desértico perto de Vernal, Utah", caption: "Estacionado junto ao Outeiro" },
  "slide-045": { alt: "Vista através de um arco de rocha para um outeiro desértico perto de Vernal, Utah", caption: "Através do Arco de Rocha" },
  "slide-046": { alt: "UTV side-by-side lamacento a trepar rochas num tour pelo backcountry perto de Vernal, Utah", caption: "Máquina Lamacenta a Trepar" },
  "slide-047": { alt: "UTV side-by-side estacionados sob um arco de rocha natural perto de Vernal, Utah", caption: "Side-by-Side sob o Arco" },
  "slide-048": { alt: "Dois UTV side-by-side num trilho do canyon pelo backcountry do Utah", caption: "Dupla no Trilho do Canyon" },
  "slide-049": { alt: "UTV side-by-side numa descida íngreme de slickrock perto de Vernal, Utah", caption: "Descida Íngreme de Slickrock" },
  "slide-050": { alt: "Rock crawling guiado em UTV side-by-side por um leito de arenito perto de Vernal, Utah", caption: "Rock Crawling Guiado" },
  "slide-051": { alt: "Miradouro do deserto ao crepúsculo num tour em UTV pelo backcountry perto de Vernal, Utah", caption: "Miradouro ao Crepúsculo" },
  "slide-052": { alt: "UTV side-by-side a enfrentar um sulco profundo num trilho do backcountry perto de Vernal, Utah", caption: "A Enfrentar o Sulco" },
  "slide-053": { alt: "UTV side-by-side a atravessar um rio entre salpicos perto de Vernal, Utah", caption: "Travessia do Rio entre Salpicos" },
  "slide-054": { alt: "Placa do início do trilho de Doc's Beach num tour em UTV da Adventure Tours Vernal perto de Vernal, Utah", caption: "Trilhos de Doc's Beach" },
  "slide-055": { alt: "Frota de UTV side-by-side Kawasaki KRX 1000 pronta para um tour guiado em Vernal, Utah", caption: "Frota Alinhada e Pronta" },
  "slide-056": { alt: "Grupo do tour parado com os seus UTV side-by-side perto de Vernal, Utah", caption: "Paragem do Grupo" },
  "slide-057": { alt: "Grupo do tour com UTV side-by-side Kawasaki KRX 1000 numa crista perto de Vernal, Utah", caption: "Foto do Grupo do Tour" },
  "slide-058": { alt: "Longa fila de UTV side-by-side prontos para um tour guiado perto de Vernal, Utah", caption: "Em Fila e Prontos" },
  "slide-059": { alt: "Frota de UTV side-by-side pronta no cimo de uma colina perto de Vernal, Utah", caption: "Frota no Cimo da Colina" },
  "slide-060": { alt: "UTV side-by-side a avançar com força por um trilho lamacento do backcountry perto de Vernal, Utah", caption: "Investida no Trilho Lamacento" },
  "slide-061": { alt: "UTV side-by-side Kawasaki verde a atravessar um sulco lamacento perto de Vernal, Utah", caption: "Máquina Verde na Lama" },
  "slide-062": { alt: "Grupo do tour reunido sob uma saliência rochosa com os seus UTV side-by-side perto de Vernal, Utah", caption: "Grupo sob a Saliência" },
  "slide-063": { alt: "UTV side-by-side estacionados à beira de uma falésia num tour guiado perto de Vernal, Utah", caption: "UTV à Beira da Falésia" },
  "slide-064": { alt: "Vista de um trilho rochoso num tour em UTV pelo backcountry perto de Vernal, Utah", caption: "Vista do Trilho Rochoso" },
  "slide-065": { alt: "Participante a saltar de uma falésia para refrescar numa saída da Adventure Tours Vernal perto de Vernal, Utah", caption: "Salto da Falésia para Refrescar" },
  "slide-066": { alt: "UTV side-by-side prontos ao pé de um domo de slickrock perto de Vernal, Utah", caption: "UTV Prontos ao Pé do Domo" },
  "slide-067": { alt: "UTV side-by-side azul a conquistar um domo de slickrock com um guia perto de Vernal, Utah", caption: "A Conquistar o Slickrock" },
  "slide-068": { alt: "Três UTV side-by-side em rock crawling pelo backcountry do Utah", caption: "Trio em Rock Crawling" },
  "slide-069": { alt: "Participantes a explorar habitações rupestres num tour em UTV da Adventure Tours Vernal", caption: "A Explorar Habitações Rupestres" },
  "slide-070": { alt: "Grande arco natural de arenito sobre o vale num tour guiado em UTV perto de Vernal, Utah", caption: "Arco Natural de Arenito" },
  "slide-071": { alt: "Grupo do tour num arco de rocha ao pôr do sol perto de Vernal, Utah", caption: "Grupo no Arco ao Pôr do Sol" },
  "slide-072": { alt: "Dentro de uma gruta de arenito num tour pelo backcountry da Adventure Tours Vernal", caption: "Dentro da Gruta" },
  "slide-073": { alt: "UTV side-by-side numa subida ao cume de slickrock perto de Vernal, Utah", caption: "Subida ao Cume de Slickrock" },
  "slide-074": { alt: "UTV side-by-side numa aventura de travessia do rio perto de Vernal, Utah", caption: "Aventura na Travessia do Rio" },
  "slide-075": { alt: "UTV side-by-side estacionado num miradouro sobre o canyon perto de Vernal, Utah", caption: "Perfil da Máquina Estacionada" },
  "slide-076": { alt: "UTV side-by-side a saltar uma duna de areia perto de Vernal, Utah", caption: "Salto sobre a Duna de Areia" },
  "slide-077": { alt: "UTV side-by-side estacionado junto a um arco de arenito perto de Vernal, Utah", caption: "Estacionado junto ao Arco" },
  "slide-078": { alt: "Arco de arenito dourado num tour em UTV pelo backcountry perto de Vernal, Utah", caption: "Arco de Rocha Dourada" },
  "slide-079": { alt: "Abertura em forma de janela numa gruta de arenito perto de Vernal, Utah", caption: "Janela na Gruta de Arenito" },
  "slide-080": { alt: "Trilho ao longo de uma imponente parede do canyon perto de Vernal, Utah", caption: "Trilho pela Parede do Canyon" },
  "slide-081": { alt: "UTV side-by-side estacionados sob um arco de arenito perto de Vernal, Utah", caption: "UTV sob o Arco" },
  "slide-082": { alt: "Interior de uma gruta de arenito num tour da Adventure Tours Vernal perto de Vernal, Utah", caption: "Vista do Interior da Gruta" },
  "slide-083": { alt: "Imponente saliência rochosa num tour em UTV pelo backcountry perto de Vernal, Utah", caption: "Imponente Saliência Rochosa" },
  "slide-084": { alt: "Três UTV side-by-side no bordo do canyon perto de Vernal, Utah", caption: "Três UTV no Bordo do Canyon" },
  "slide-085": { alt: "Casal a posar à beira de uma falésia com vista para o canyon perto de Vernal, Utah", caption: "Casal à Beira da Falésia" },
  "slide-086": { alt: "Miradouro outonal sobre o canyon num trilho de UTV do backcountry perto de Vernal, Utah", caption: "Miradouro do Canyon no Outono" },
  "slide-087": { alt: "UTV side-by-side num trilho ladeado de choupos perto de Vernal, Utah", caption: "Passeio no Trilho dos Choupos" },
  "slide-088": { alt: "UTV side-by-side numa descida de slickrock perto de Vernal, Utah", caption: "Descida de Slickrock" },
  "slide-089": { alt: "Trilho de choupos dourados numa aventura guiada em side-by-side perto de Vernal, Utah", caption: "Trilho dos Choupos Dourados" },
  "slide-090": { alt: "UTV side-by-side acima do canyon num tour pelo backcountry perto de Vernal, Utah", caption: "UTV acima do Canyon" },
  "slide-091": { alt: "Vista através de um arco de arenito num tour da Adventure Tours Vernal perto de Vernal, Utah", caption: "Através do Arco" },
  "slide-092": { alt: "UTV side-by-side sobre slickrock sob um céu de tempestade perto de Vernal, Utah", caption: "Slickrock sob a Tempestade" },
  "slide-093": { alt: "UTV side-by-side azul a levantar poeira num trilho do deserto perto de Vernal, Utah", caption: "Poeira no Trilho do Deserto" },
  "slide-094": { alt: "Dentro de uma gruta de arenito a olhar por uma abertura perto de Vernal, Utah", caption: "Dentro de uma Gruta de Arenito" },
  "slide-095": { alt: "UTV side-by-side num ponto de reunião no topo da montanha perto de Vernal, Utah", caption: "Ponto de Reunião no Topo" },
  "slide-096": { alt: "Três UTV side-by-side alinhados num tour guiado perto de Vernal, Utah", caption: "Três UTV Alinhados" },
  "slide-097": { alt: "Vista de uma crista de slickrock num tour em UTV pelo backcountry perto de Vernal, Utah", caption: "Vista da Crista de Slickrock" },
  "slide-098": { alt: "UTV side-by-side a subir o slickrock perto de Vernal, Utah", caption: "A Subir o Slickrock" },
  "slide-099": { alt: "UTV side-by-side numa subida de slickrock sob um céu de tempestade perto de Vernal, Utah", caption: "Subida de Slickrock com Tempestade" },
  "slide-100": { alt: "UTV side-by-side a lançar poeira num trilho do deserto perto de Vernal, Utah", caption: "Rasto de Poeira no Ar" },
  "slide-101": { alt: "UTV side-by-side numa subida por um degrau rochoso íngreme perto de Vernal, Utah", caption: "Subida pelo Degrau Íngreme" },
  "slide-102": { alt: "UTV side-by-side a levantar areia numa curva perto de Vernal, Utah", caption: "Curva com Areia Levantada" },
  "slide-103": { alt: "UTV side-by-side parado com uma bandeira norte-americana perto de Vernal, Utah", caption: "UTV com Bandeira Norte-Americana" },
  "slide-104": { alt: "UTV side-by-side à beira de uma falésia ao crepúsculo perto de Vernal, Utah", caption: "Beira da Falésia ao Crepúsculo" },
  "slide-105": { alt: "UTV side-by-side numa linha de crista ao lusco-fusco no backcountry desértico do Utah", caption: "Linha de Crista ao Lusco-Fusco" },
};

const GALLERY_TEXT_FR: GalleryDictionary = {
  "slide-001": { alt: "UTV side-by-side stationné dans une alcôve de grès lors d'un tour en UTV d'Adventure Tours Vernal", caption: "À la Découverte d'une Alcôve de Grès" },
  "slide-002": { alt: "Alignement d'UTV side-by-side Kawasaki KRX 1000 prêts avant un tour guidé en UTV à Vernal, Utah", caption: "Alignement d'UTV au Départ" },
  "slide-003": { alt: "UTV side-by-side bleu soulevant la poussière sur un sentier du désert près de Vernal, Utah", caption: "Nuage de Poussière" },
  "slide-004": { alt: "Groupe au volant d'UTV side-by-side sur un sentier du backcountry près de Vernal, Utah", caption: "Groupe sur le Sentier" },
  "slide-005": { alt: "Participants au repos sous un surplomb de grès au coucher du soleil lors d'un tour en UTV d'Adventure Tours Vernal", caption: "Surplomb Rocheux au Coucher du Soleil" },
  "slide-006": { alt: "Vue depuis l'intérieur d'une grotte de grès lors d'un tour guidé en UTV près de Vernal, Utah", caption: "À l'Intérieur d'une Grotte de Grès" },
  "slide-007": { alt: "Famille posant dans une grotte de grès lors d'un tour en UTV d'Adventure Tours Vernal", caption: "Photo de Famille dans la Grotte" },
  "slide-008": { alt: "Pneu d'UTV en surplomb du rebord du canyon avec vue sur Ashley Gorge près de Vernal, Utah", caption: "Au Bord du Canyon" },
  "slide-009": { alt: "Paysage de badlands désertiques au coucher du soleil lors d'un tour en UTV dans le backcountry près de Vernal, Utah", caption: "Coucher de Soleil sur les Badlands" },
  "slide-010": { alt: "UTV side-by-side gravissant une crête de slickrock lors d'un tour guidé près de Vernal, Utah", caption: "Montée d'une Crête de Slickrock" },
  "slide-011": { alt: "UTV side-by-side bleu lancé à pleine vitesse dans le haut désert près de Vernal, Utah", caption: "À Pleine Vitesse dans le Désert" },
  "slide-012": { alt: "UTV side-by-side Kawasaki KRX 1000 alignés sous un surplomb rocheux près de Vernal, Utah", caption: "Alignés sous le Surplomb" },
  "slide-013": { alt: "Groupe à l'arrêt avec ses UTV side-by-side le long d'un sentier du backcountry près de Vernal, Utah", caption: "Pause du Groupe sur le Sentier" },
  "slide-014": { alt: "UTV side-by-side devant une vue du canyon de slickrock lors d'un tour guidé près de Vernal, Utah", caption: "Vue du Canyon de Slickrock" },
  "slide-015": { alt: "UTV side-by-side stationné dans une grotte de grès près de Vernal, Utah", caption: "UTV dans la Grotte" },
  "slide-016": { alt: "Imposante paroi d'une grotte de grès lors d'un tour dans le backcountry d'Adventure Tours Vernal", caption: "Imposante Paroi de la Grotte" },
  "slide-017": { alt: "Participant sautant d'une falaise dans l'eau lors d'une sortie d'Adventure Tours Vernal près de Vernal, Utah", caption: "Saut dans l'Eau depuis la Falaise" },
  "slide-018": { alt: "Convoi d'UTV side-by-side sur un sentier de montagne pendant un tour guidé près de Vernal, Utah", caption: "Convoi sur le Sentier de Montagne" },
  "slide-019": { alt: "UTV side-by-side sur le slickrock au crépuscule près de Dinosaur National Monument, Vernal, Utah", caption: "Sortie dans le Désert au Crépuscule" },
  "slide-020": { alt: "Trois UTV side-by-side Kawasaki KRX 1000 à contre-jour au coucher du soleil près de Vernal, Utah", caption: "Trio à Contre-jour au Coucher du Soleil" },
  "slide-021": { alt: "Participants debout sur le slickrock à côté de leurs UTV side-by-side Kawasaki KRX 1000 près de Vernal, Utah", caption: "Participants sur le Slickrock" },
  "slide-022": { alt: "Deux UTV side-by-side stationnés sur le slickrock près de Vernal, Utah", caption: "Deux UTV sur le Slickrock" },
  "slide-023": { alt: "UTV side-by-side couverts de boue sur le slickrock après un tour guidé près de Vernal, Utah", caption: "UTV Boueux sur la Roche" },
  "slide-024": { alt: "UTV side-by-side boueux sur un dôme rocheux à un point de vue près de Vernal, Utah", caption: "UTV Boueux au Point de Vue" },
  "slide-025": { alt: "UTV side-by-side bleu sur le slickrock bien au-dessus du canyon près de Vernal, Utah", caption: "UTV Bleu sur le Slickrock" },
  "slide-026": { alt: "UTV side-by-side à contre-jour au coucher du soleil lors d'un tour guidé près de Vernal, Utah", caption: "UTV au Coucher du Soleil" },
  "slide-027": { alt: "UTV side-by-side à contre-jour lors d'une sortie au coucher du soleil dans le backcountry désertique de l'Utah", caption: "Silhouette à Contre-jour" },
  "slide-028": { alt: "Deux UTV side-by-side perchés sur un rocher lors d'un tour dans le backcountry près de Vernal, Utah", caption: "Deux UTV sur un Rocher" },
  "slide-029": { alt: "Randonneurs explorant une arche de grès lors d'une sortie d'Adventure Tours Vernal à Vernal, Utah", caption: "Randonneurs à l'Arche de Grès" },
  "slide-030": { alt: "UTV side-by-side au sommet d'un grand rocher avec vue sur le désert près de Vernal, Utah", caption: "UTV au Sommet du Rocher" },
  "slide-031": { alt: "UTV side-by-side boueux dominant la vallée sur un sentier du backcountry près de Vernal, Utah", caption: "UTV Boueux avec Vue" },
  "slide-032": { alt: "UTV side-by-side en haut d'une crête au crépuscule près de Vernal, Utah", caption: "UTV sur la Crête au Crépuscule" },
  "slide-033": { alt: "UTV side-by-side sur une formation rocheuse en crête lors d'un tour guidé à Vernal, Utah", caption: "UTV sur la Crête Rocheuse" },
  "slide-034": { alt: "UTV side-by-side dans le haut désert lors d'un tour dans le backcountry près de Vernal, Utah", caption: "UTV dans le Haut Désert" },
  "slide-035": { alt: "UTV side-by-side à un point de vue sur un dôme de slickrock près de Vernal, Utah", caption: "Point de Vue du Dôme de Slickrock" },
  "slide-036": { alt: "Point de vue sur le pays des canyons lors d'un tour en UTV dans le backcountry près de Vernal, Utah", caption: "Point de Vue sur le Pays des Canyons" },
  "slide-037": { alt: "UTV side-by-side gravissant le slickrock lors d'un tour guidé près de Vernal, Utah", caption: "Montée du Slickrock" },
  "slide-038": { alt: "UTV side-by-side descendant une paroi rocheuse abrupte lors d'un tour guidé près de Vernal, Utah", caption: "UTV en Descente sur la Roche" },
  "slide-039": { alt: "UTV side-by-side franchissant des rochers sur un sentier du backcountry près de Vernal, Utah", caption: "UTV au Sommet des Rochers" },
  "slide-040": { alt: "UTV side-by-side vert sur un sentier du désert près de Vernal, Utah", caption: "UTV Vert sur le Sentier" },
  "slide-041": { alt: "UTV side-by-side gravissant le slickrock lors d'un tour guidé près de Vernal, Utah", caption: "UTV en Montée sur le Slickrock" },
  "slide-042": { alt: "UTV side-by-side sur le slickrock lors d'un tour dans le backcountry près de Vernal, Utah", caption: "UTV sur le Slickrock" },
  "slide-043": { alt: "UTV side-by-side gravissant une crête de grès près de Vernal, Utah", caption: "Montée d'une Crête de Grès" },
  "slide-044": { alt: "UTV side-by-side stationné au pied d'une butte désertique près de Vernal, Utah", caption: "À l'Arrêt au Pied de la Butte" },
  "slide-045": { alt: "Vue à travers une arche rocheuse vers une butte désertique près de Vernal, Utah", caption: "À Travers l'Arche Rocheuse" },
  "slide-046": { alt: "UTV side-by-side boueux escaladant les rochers lors d'un tour dans le backcountry près de Vernal, Utah", caption: "Machine Boueuse à l'Assaut des Rochers" },
  "slide-047": { alt: "UTV side-by-side stationnés sous une arche rocheuse naturelle près de Vernal, Utah", caption: "Side-by-Side sous l'Arche" },
  "slide-048": { alt: "Deux UTV side-by-side sur un sentier du canyon à travers le backcountry de l'Utah", caption: "Duo sur le Sentier du Canyon" },
  "slide-049": { alt: "UTV side-by-side dans une descente abrupte de slickrock près de Vernal, Utah", caption: "Descente Abrupte de Slickrock" },
  "slide-050": { alt: "Rock crawling guidé en UTV side-by-side dans un lit de grès près de Vernal, Utah", caption: "Rock Crawling Guidé" },
  "slide-051": { alt: "Point de vue sur le désert au crépuscule lors d'un tour en UTV dans le backcountry près de Vernal, Utah", caption: "Point de Vue au Crépuscule" },
  "slide-052": { alt: "UTV side-by-side affrontant une ornière profonde sur un sentier du backcountry près de Vernal, Utah", caption: "À l'Assaut de l'Ornière" },
  "slide-053": { alt: "UTV side-by-side traversant un gué dans les éclaboussures près de Vernal, Utah", caption: "Traversée du Gué en Éclaboussures" },
  "slide-054": { alt: "Panneau du départ du sentier de Doc's Beach lors d'un tour en UTV d'Adventure Tours Vernal près de Vernal, Utah", caption: "Sentiers de Doc's Beach" },
  "slide-055": { alt: "Flotte d'UTV side-by-side Kawasaki KRX 1000 prête pour un tour guidé à Vernal, Utah", caption: "Flotte Alignée et Prête" },
  "slide-056": { alt: "Groupe du tour à l'arrêt avec ses UTV side-by-side près de Vernal, Utah", caption: "Pause du Groupe" },
  "slide-057": { alt: "Groupe du tour avec des UTV side-by-side Kawasaki KRX 1000 sur une crête près de Vernal, Utah", caption: "Photo du Groupe du Tour" },
  "slide-058": { alt: "Longue file d'UTV side-by-side prêts pour un tour guidé près de Vernal, Utah", caption: "En File et Prêts" },
  "slide-059": { alt: "Flotte d'UTV side-by-side prête au sommet d'une colline près de Vernal, Utah", caption: "Flotte au Sommet de la Colline" },
  "slide-060": { alt: "UTV side-by-side fonçant sur un sentier boueux du backcountry près de Vernal, Utah", caption: "Charge sur le Sentier Boueux" },
  "slide-061": { alt: "UTV side-by-side Kawasaki vert franchissant une ornière boueuse près de Vernal, Utah", caption: "Machine Verte dans la Boue" },
  "slide-062": { alt: "Groupe du tour réuni sous un surplomb rocheux avec ses UTV side-by-side près de Vernal, Utah", caption: "Groupe sous le Surplomb" },
  "slide-063": { alt: "UTV side-by-side stationnés au bord d'une falaise lors d'un tour guidé près de Vernal, Utah", caption: "UTV au Bord de la Falaise" },
  "slide-064": { alt: "Vue d'un sentier rocheux lors d'un tour en UTV dans le backcountry près de Vernal, Utah", caption: "Vue du Sentier Rocheux" },
  "slide-065": { alt: "Participant sautant d'une falaise pour se rafraîchir lors d'une sortie d'Adventure Tours Vernal près de Vernal, Utah", caption: "Saut Rafraîchissant depuis la Falaise" },
  "slide-066": { alt: "UTV side-by-side prêts au pied d'un dôme de slickrock près de Vernal, Utah", caption: "UTV Prêts au Pied du Dôme" },
  "slide-067": { alt: "UTV side-by-side bleu à l'assaut d'un dôme de slickrock avec un guide près de Vernal, Utah", caption: "À la Conquête du Slickrock" },
  "slide-068": { alt: "Trois UTV side-by-side en rock crawling à travers le backcountry de l'Utah", caption: "Trio en Rock Crawling" },
  "slide-069": { alt: "Participants explorant des habitations troglodytiques lors d'un tour en UTV d'Adventure Tours Vernal", caption: "À la Découverte des Habitations Troglodytiques" },
  "slide-070": { alt: "Grande arche naturelle de grès au-dessus de la vallée lors d'un tour guidé en UTV près de Vernal, Utah", caption: "Arche Naturelle de Grès" },
  "slide-071": { alt: "Groupe du tour devant une arche rocheuse au coucher du soleil près de Vernal, Utah", caption: "Groupe à l'Arche au Coucher du Soleil" },
  "slide-072": { alt: "À l'intérieur d'une grotte de grès lors d'un tour dans le backcountry d'Adventure Tours Vernal", caption: "À l'Intérieur de la Grotte" },
  "slide-073": { alt: "UTV side-by-side en montée vers un sommet de slickrock près de Vernal, Utah", caption: "Montée au Sommet de Slickrock" },
  "slide-074": { alt: "UTV side-by-side lors d'une aventure de traversée de rivière près de Vernal, Utah", caption: "Aventure à la Traversée de la Rivière" },
  "slide-075": { alt: "UTV side-by-side stationné à un point de vue sur le canyon près de Vernal, Utah", caption: "Profil de la Machine à l'Arrêt" },
  "slide-076": { alt: "UTV side-by-side s'envolant au-dessus d'une dune de sable près de Vernal, Utah", caption: "Saut au-dessus de la Dune de Sable" },
  "slide-077": { alt: "UTV side-by-side stationné à côté d'une arche de grès près de Vernal, Utah", caption: "À l'Arrêt près de l'Arche" },
  "slide-078": { alt: "Arche de grès doré lors d'un tour en UTV dans le backcountry près de Vernal, Utah", caption: "Arche de Roche Dorée" },
  "slide-079": { alt: "Ouverture en forme de fenêtre dans une grotte de grès près de Vernal, Utah", caption: "Fenêtre dans la Grotte de Grès" },
  "slide-080": { alt: "Sentier longeant une imposante paroi de canyon près de Vernal, Utah", caption: "Sentier le Long de la Paroi du Canyon" },
  "slide-081": { alt: "UTV side-by-side stationnés sous une arche de grès près de Vernal, Utah", caption: "UTV sous l'Arche" },
  "slide-082": { alt: "Intérieur d'une grotte de grès lors d'un tour d'Adventure Tours Vernal près de Vernal, Utah", caption: "Vue de l'Intérieur de la Grotte" },
  "slide-083": { alt: "Imposant surplomb rocheux lors d'un tour en UTV dans le backcountry près de Vernal, Utah", caption: "Imposant Surplomb Rocheux" },
  "slide-084": { alt: "Trois UTV side-by-side sur le rebord du canyon près de Vernal, Utah", caption: "Trois UTV sur le Rebord du Canyon" },
  "slide-085": { alt: "Couple posant au bord d'une falaise dominant le canyon près de Vernal, Utah", caption: "Couple au Bord de la Falaise" },
  "slide-086": { alt: "Point de vue automnal sur le canyon depuis un sentier UTV du backcountry près de Vernal, Utah", caption: "Point de Vue Automnal sur le Canyon" },
  "slide-087": { alt: "UTV side-by-side sur un sentier bordé de trembles près de Vernal, Utah", caption: "Sortie sur le Sentier des Trembles" },
  "slide-088": { alt: "UTV side-by-side dans une descente de slickrock près de Vernal, Utah", caption: "Descente de Slickrock" },
  "slide-089": { alt: "Sentier de trembles dorés lors d'une aventure guidée en side-by-side près de Vernal, Utah", caption: "Sentier des Trembles Dorés" },
  "slide-090": { alt: "UTV side-by-side au-dessus du canyon lors d'un tour dans le backcountry près de Vernal, Utah", caption: "UTV au-dessus du Canyon" },
  "slide-091": { alt: "Vue à travers une arche de grès lors d'un tour d'Adventure Tours Vernal près de Vernal, Utah", caption: "À Travers l'Arche" },
  "slide-092": { alt: "UTV side-by-side sur le slickrock sous un ciel d'orage près de Vernal, Utah", caption: "Slickrock sous l'Orage" },
  "slide-093": { alt: "UTV side-by-side bleu soulevant la poussière sur un sentier du désert près de Vernal, Utah", caption: "Poussière sur le Sentier du Désert" },
  "slide-094": { alt: "À l'intérieur d'une grotte de grès, vue par une ouverture en fenêtre près de Vernal, Utah", caption: "À l'Intérieur d'une Grotte de Grès" },
  "slide-095": { alt: "UTV side-by-side à un point de rassemblement au sommet de la montagne près de Vernal, Utah", caption: "Point de Rassemblement au Sommet" },
  "slide-096": { alt: "Trois UTV side-by-side alignés lors d'un tour guidé près de Vernal, Utah", caption: "Trois UTV Alignés" },
  "slide-097": { alt: "Vue d'une crête de slickrock lors d'un tour en UTV dans le backcountry près de Vernal, Utah", caption: "Vue de la Crête de Slickrock" },
  "slide-098": { alt: "UTV side-by-side gravissant le slickrock près de Vernal, Utah", caption: "Montée du Slickrock" },
  "slide-099": { alt: "UTV side-by-side en montée sur le slickrock sous un ciel d'orage près de Vernal, Utah", caption: "Montée de Slickrock sous l'Orage" },
  "slide-100": { alt: "UTV side-by-side projetant la poussière sur un sentier du désert près de Vernal, Utah", caption: "Traînée de Poussière dans l'Air" },
  "slide-101": { alt: "UTV side-by-side en montée sur une marche rocheuse abrupte près de Vernal, Utah", caption: "Montée de la Marche Abrupte" },
  "slide-102": { alt: "UTV side-by-side projetant le sable dans un virage près de Vernal, Utah", caption: "Virage en Gerbe de Sable" },
  "slide-103": { alt: "UTV side-by-side à l'arrêt avec un drapeau américain près de Vernal, Utah", caption: "UTV au Drapeau Américain" },
  "slide-104": { alt: "UTV side-by-side au bord d'une falaise au crépuscule près de Vernal, Utah", caption: "Bord de Falaise au Crépuscule" },
  "slide-105": { alt: "UTV side-by-side sur une ligne de crête à la tombée de la nuit dans le backcountry désertique de l'Utah", caption: "Ligne de Crête à la Tombée de la Nuit" },
};

const GALLERY_TEXT_DE: GalleryDictionary = {
  "slide-001": { alt: "Side-by-Side-UTV in einer Sandsteinnische auf einer UTV-Tour von Adventure Tours Vernal", caption: "Eine Sandsteinnische erkunden" },
  "slide-002": { alt: "Reihe von Side-by-Side-UTVs vom Typ Kawasaki KRX 1000 vor einer geführten UTV-Tour in Vernal, Utah", caption: "UTV-Reihe vor dem Start" },
  "slide-003": { alt: "Blaues Side-by-Side-UTV wirbelt Staub auf einer Wüstenpiste bei Vernal, Utah auf", caption: "Aufgewirbelter Staub" },
  "slide-004": { alt: "Gruppe fährt Side-by-Side-UTVs auf einer Backcountry-Piste bei Vernal, Utah", caption: "Gruppe auf der Piste" },
  "slide-005": { alt: "Teilnehmer rasten bei Sonnenuntergang unter einem Sandsteinvorsprung auf einer UTV-Tour von Adventure Tours Vernal", caption: "Felsvorsprung bei Sonnenuntergang" },
  "slide-006": { alt: "Blick aus dem Inneren einer Sandsteinhöhle auf einer geführten UTV-Tour bei Vernal, Utah", caption: "In einer Sandsteinhöhle" },
  "slide-007": { alt: "Familie posiert in einer Sandsteinhöhle auf einer UTV-Tour von Adventure Tours Vernal", caption: "Familienfoto in der Höhle" },
  "slide-008": { alt: "UTV-Reifen am Canyonrand mit Blick auf Ashley Gorge bei Vernal, Utah", caption: "Am Rand des Canyons" },
  "slide-009": { alt: "Wüstenlandschaft der Badlands bei Sonnenuntergang auf einer Backcountry-UTV-Tour bei Vernal, Utah", caption: "Sonnenuntergang über den Badlands" },
  "slide-010": { alt: "Side-by-Side-UTV erklimmt einen Slickrock-Grat auf einer geführten Tour bei Vernal, Utah", caption: "Auffahrt auf einen Slickrock-Grat" },
  "slide-011": { alt: "Blaues Side-by-Side-UTV rast durch die Hochwüste bei Vernal, Utah", caption: "Mit Tempo durch die Wüste" },
  "slide-012": { alt: "Side-by-Side-UTVs vom Typ Kawasaki KRX 1000 aufgereiht unter einem Felsvorsprung bei Vernal, Utah", caption: "Aufgereiht unter dem Felsvorsprung" },
  "slide-013": { alt: "Gruppe macht mit ihren Side-by-Side-UTVs Halt an einer Backcountry-Piste bei Vernal, Utah", caption: "Gruppenstopp an der Piste" },
  "slide-014": { alt: "Side-by-Side-UTV neben einem Ausblick auf den Slickrock-Canyon auf einer geführten Tour bei Vernal, Utah", caption: "Ausblick auf den Slickrock-Canyon" },
  "slide-015": { alt: "Side-by-Side-UTV steht in einer Sandsteinhöhle bei Vernal, Utah", caption: "UTV in der Höhle" },
  "slide-016": { alt: "Aufragende Wand einer Sandsteinhöhle auf einer Backcountry-Tour von Adventure Tours Vernal", caption: "Aufragende Höhlenwand" },
  "slide-017": { alt: "Teilnehmer springt von einer Klippe ins Wasser bei einem Ausflug von Adventure Tours Vernal bei Vernal, Utah", caption: "Sprung von der Klippe ins Wasser" },
  "slide-018": { alt: "Konvoi von Side-by-Side-UTVs auf einer Bergpiste während einer geführten Tour bei Vernal, Utah", caption: "Konvoi auf der Bergpiste" },
  "slide-019": { alt: "Side-by-Side-UTV auf Slickrock in der Dämmerung nahe dem Dinosaur National Monument, Vernal, Utah", caption: "Wüstenfahrt in der Dämmerung" },
  "slide-020": { alt: "Drei Side-by-Side-UTVs vom Typ Kawasaki KRX 1000 im Gegenlicht der untergehenden Sonne bei Vernal, Utah", caption: "Trio im Gegenlicht bei Sonnenuntergang" },
  "slide-021": { alt: "Teilnehmer stehen auf dem Slickrock neben ihren Side-by-Side-UTVs vom Typ Kawasaki KRX 1000 bei Vernal, Utah", caption: "Teilnehmer auf dem Slickrock" },
  "slide-022": { alt: "Zwei Side-by-Side-UTVs stehen auf Slickrock bei Vernal, Utah", caption: "Zwei UTVs auf Slickrock" },
  "slide-023": { alt: "Schlammbedeckte Side-by-Side-UTVs auf Slickrock nach einer geführten Tour bei Vernal, Utah", caption: "Schlammige UTVs auf dem Fels" },
  "slide-024": { alt: "Schlammiges Side-by-Side-UTV auf einer Felskuppe an einem Aussichtspunkt bei Vernal, Utah", caption: "Schlammiges UTV am Aussichtspunkt" },
  "slide-025": { alt: "Blaues Side-by-Side-UTV auf Slickrock hoch über dem Canyon bei Vernal, Utah", caption: "Blaues UTV auf Slickrock" },
  "slide-026": { alt: "Side-by-Side-UTVs im Gegenlicht bei Sonnenuntergang auf einer geführten Tour bei Vernal, Utah", caption: "UTVs bei Sonnenuntergang" },
  "slide-027": { alt: "Side-by-Side-UTV im Gegenlicht der Sonne auf einer Abendfahrt durch das Wüsten-Backcountry von Utah", caption: "Silhouette im Gegenlicht" },
  "slide-028": { alt: "Zwei Side-by-Side-UTVs auf einem Felsblock auf einer Backcountry-Tour bei Vernal, Utah", caption: "Zwei UTVs auf einem Felsblock" },
  "slide-029": { alt: "Wanderer erkunden einen Sandsteinbogen bei einem Ausflug von Adventure Tours Vernal in Vernal, Utah", caption: "Wanderer am Sandsteinbogen" },
  "slide-030": { alt: "Side-by-Side-UTVs auf einem großen Felsblock mit Wüstenblick bei Vernal, Utah", caption: "UTVs auf dem großen Felsblock" },
  "slide-031": { alt: "Schlammige Side-by-Side-UTVs mit Blick ins Tal auf einer Backcountry-Piste bei Vernal, Utah", caption: "Schlammige UTVs mit Aussicht" },
  "slide-032": { alt: "Side-by-Side-UTVs auf einem Gratrücken in der Dämmerung bei Vernal, Utah", caption: "UTVs auf dem Grat in der Dämmerung" },
  "slide-033": { alt: "Side-by-Side-UTVs auf einer Felsgratformation auf einer geführten Tour in Vernal, Utah", caption: "UTVs auf dem Felsgrat" },
  "slide-034": { alt: "Side-by-Side-UTVs in der Hochwüste auf einer Backcountry-Tour bei Vernal, Utah", caption: "UTVs in der Hochwüste" },
  "slide-035": { alt: "Side-by-Side-UTV an einem Aussichtspunkt auf einer Slickrock-Kuppe bei Vernal, Utah", caption: "Aussichtspunkt auf der Slickrock-Kuppe" },
  "slide-036": { alt: "Aussichtspunkt über das Canyonland auf einer Backcountry-UTV-Tour bei Vernal, Utah", caption: "Aussichtspunkt über das Canyonland" },
  "slide-037": { alt: "Side-by-Side-UTV erklimmt den Slickrock auf einer geführten Tour bei Vernal, Utah", caption: "Auffahrt auf den Slickrock" },
  "slide-038": { alt: "Side-by-Side-UTV fährt eine steile Felswand hinab auf einer geführten Tour bei Vernal, Utah", caption: "UTV bei der Abfahrt über den Fels" },
  "slide-039": { alt: "Side-by-Side-UTV überwindet Felsblöcke auf einer Backcountry-Piste bei Vernal, Utah", caption: "UTV auf den Felsblöcken" },
  "slide-040": { alt: "Grünes Side-by-Side-UTV auf einer Wüstenpiste bei Vernal, Utah", caption: "Grünes UTV auf der Piste" },
  "slide-041": { alt: "Side-by-Side-UTVs erklimmen den Slickrock auf einer geführten Tour bei Vernal, Utah", caption: "UTVs bei der Slickrock-Auffahrt" },
  "slide-042": { alt: "Side-by-Side-UTVs auf dem Slickrock auf einer Backcountry-Tour bei Vernal, Utah", caption: "UTVs auf dem Slickrock" },
  "slide-043": { alt: "Side-by-Side-UTVs erklimmen einen Sandsteingrat bei Vernal, Utah", caption: "Auffahrt auf einen Sandsteingrat" },
  "slide-044": { alt: "Side-by-Side-UTV steht unterhalb eines Wüsten-Tafelbergs bei Vernal, Utah", caption: "Halt am Tafelberg" },
  "slide-045": { alt: "Blick durch einen Felsbogen auf einen Wüsten-Tafelberg bei Vernal, Utah", caption: "Durch den Felsbogen" },
  "slide-046": { alt: "Schlammiges Side-by-Side-UTV klettert über Felsen auf einer Backcountry-Tour bei Vernal, Utah", caption: "Schlammige Maschine beim Klettern" },
  "slide-047": { alt: "Side-by-Side-UTVs stehen unter einem natürlichen Felsbogen bei Vernal, Utah", caption: "Side-by-Sides unter dem Felsbogen" },
  "slide-048": { alt: "Zwei Side-by-Side-UTVs auf einer Canyonpiste durch das Backcountry von Utah", caption: "Duo auf der Canyonpiste" },
  "slide-049": { alt: "Side-by-Side-UTV bei einer steilen Slickrock-Abfahrt bei Vernal, Utah", caption: "Steile Slickrock-Abfahrt" },
  "slide-050": { alt: "Geführtes Rock Crawling im Side-by-Side-UTV durch ein Sandsteinbachbett bei Vernal, Utah", caption: "Geführtes Rock Crawling" },
  "slide-051": { alt: "Wüstenaussichtspunkt in der Dämmerung auf einer Backcountry-UTV-Tour bei Vernal, Utah", caption: "Aussichtspunkt in der Dämmerung" },
  "slide-052": { alt: "Side-by-Side-UTV nimmt eine tiefe Fahrspur auf einer Backcountry-Piste bei Vernal, Utah", caption: "Die tiefe Fahrspur nehmen" },
  "slide-053": { alt: "Side-by-Side-UTV durchfährt spritzend eine Flussfurt bei Vernal, Utah", caption: "Spritzende Flussdurchfahrt" },
  "slide-054": { alt: "Schild am Ausgangspunkt von Doc's Beach auf einer UTV-Tour von Adventure Tours Vernal bei Vernal, Utah", caption: "Pisten von Doc's Beach" },
  "slide-055": { alt: "Flotte von Side-by-Side-UTVs vom Typ Kawasaki KRX 1000 bereit für eine geführte Tour in Vernal, Utah", caption: "Aufgereihte Flotte" },
  "slide-056": { alt: "Tourgruppe macht mit ihren Side-by-Side-UTVs Halt bei Vernal, Utah", caption: "Stopp der Gruppe" },
  "slide-057": { alt: "Tourgruppe mit Side-by-Side-UTVs vom Typ Kawasaki KRX 1000 auf einem Grat bei Vernal, Utah", caption: "Foto der Tourgruppe" },
  "slide-058": { alt: "Lange Reihe von Side-by-Side-UTVs bereit für eine geführte Tour bei Vernal, Utah", caption: "Aufgereiht und startklar" },
  "slide-059": { alt: "Flotte von Side-by-Side-UTVs bereit auf einer Anhöhe bei Vernal, Utah", caption: "Flotte auf der Anhöhe" },
  "slide-060": { alt: "Side-by-Side-UTV pflügt durch eine schlammige Backcountry-Piste bei Vernal, Utah", caption: "Vorstoß über die schlammige Piste" },
  "slide-061": { alt: "Grünes Side-by-Side-UTV von Kawasaki quert eine schlammige Fahrspur bei Vernal, Utah", caption: "Grüne Maschine im Schlamm" },
  "slide-062": { alt: "Tourgruppe versammelt sich mit ihren Side-by-Side-UTVs unter einem Felsvorsprung bei Vernal, Utah", caption: "Gruppe unter dem Felsvorsprung" },
  "slide-063": { alt: "Side-by-Side-UTVs stehen an einer Klippe auf einer geführten Tour bei Vernal, Utah", caption: "UTVs an der Klippe" },
  "slide-064": { alt: "Blick auf eine felsige Piste auf einer Backcountry-UTV-Tour bei Vernal, Utah", caption: "Blick auf die felsige Piste" },
  "slide-065": { alt: "Teilnehmer springt zur Abkühlung von einer Klippe bei einem Ausflug von Adventure Tours Vernal bei Vernal, Utah", caption: "Klippensprung zur Abkühlung" },
  "slide-066": { alt: "Side-by-Side-UTVs stehen bereit unterhalb einer Slickrock-Kuppe bei Vernal, Utah", caption: "UTVs bereit unterhalb der Kuppe" },
  "slide-067": { alt: "Blaues Side-by-Side-UTV bezwingt mit einem Guide eine Slickrock-Kuppe bei Vernal, Utah", caption: "Den Slickrock bezwingen" },
  "slide-068": { alt: "Drei Side-by-Side-UTVs beim Rock Crawling durch das Backcountry von Utah", caption: "Trio beim Rock Crawling" },
  "slide-069": { alt: "Teilnehmer erkunden Felsenwohnungen auf einer UTV-Tour von Adventure Tours Vernal", caption: "Felsenwohnungen erkunden" },
  "slide-070": { alt: "Großer natürlicher Sandsteinbogen über dem Tal auf einer geführten UTV-Tour bei Vernal, Utah", caption: "Natürlicher Sandsteinbogen" },
  "slide-071": { alt: "Tourgruppe an einem Felsbogen bei Sonnenuntergang bei Vernal, Utah", caption: "Gruppe am Felsbogen bei Sonnenuntergang" },
  "slide-072": { alt: "Im Inneren einer Sandsteinhöhle auf einer Backcountry-Tour von Adventure Tours Vernal", caption: "Im Inneren der Höhle" },
  "slide-073": { alt: "Side-by-Side-UTV bei einer Slickrock-Gipfelauffahrt bei Vernal, Utah", caption: "Slickrock-Gipfelauffahrt" },
  "slide-074": { alt: "Side-by-Side-UTV bei einem Abenteuer durch eine Flussfurt bei Vernal, Utah", caption: "Abenteuer an der Flussfurt" },
  "slide-075": { alt: "Side-by-Side-UTV steht an einem Canyon-Aussichtspunkt bei Vernal, Utah", caption: "Profil der abgestellten Maschine" },
  "slide-076": { alt: "Side-by-Side-UTV springt über eine Sanddüne bei Vernal, Utah", caption: "Sprung über die Sanddüne" },
  "slide-077": { alt: "Side-by-Side-UTV steht neben einem Sandsteinbogen bei Vernal, Utah", caption: "Halt am Felsbogen" },
  "slide-078": { alt: "Goldener Sandsteinbogen auf einer Backcountry-UTV-Tour bei Vernal, Utah", caption: "Goldener Felsbogen" },
  "slide-079": { alt: "Fensteröffnung in einer Sandsteinhöhle bei Vernal, Utah", caption: "Fenster in der Sandsteinhöhle" },
  "slide-080": { alt: "Piste entlang einer aufragenden Canyonwand bei Vernal, Utah", caption: "Piste an der Canyonwand" },
  "slide-081": { alt: "Side-by-Side-UTVs stehen unter einem Sandsteinbogen bei Vernal, Utah", caption: "UTVs unter dem Felsbogen" },
  "slide-082": { alt: "Inneres einer Sandsteinhöhle auf einer Tour von Adventure Tours Vernal bei Vernal, Utah", caption: "Blick ins Innere der Höhle" },
  "slide-083": { alt: "Aufragender Felsvorsprung auf einer Backcountry-UTV-Tour bei Vernal, Utah", caption: "Aufragender Felsvorsprung" },
  "slide-084": { alt: "Drei Side-by-Side-UTVs am Canyonrand bei Vernal, Utah", caption: "Drei UTVs am Canyonrand" },
  "slide-085": { alt: "Paar posiert an einer Klippenkante mit Blick in den Canyon bei Vernal, Utah", caption: "Paar an der Klippenkante" },
  "slide-086": { alt: "Herbstlicher Canyon-Aussichtspunkt an einer Backcountry-UTV-Piste bei Vernal, Utah", caption: "Herbstlicher Canyon-Aussichtspunkt" },
  "slide-087": { alt: "Side-by-Side-UTV auf einer von Espen gesäumten Piste bei Vernal, Utah", caption: "Fahrt über die Espenpiste" },
  "slide-088": { alt: "Side-by-Side-UTV bei einer Slickrock-Abfahrt bei Vernal, Utah", caption: "Slickrock-Abfahrt" },
  "slide-089": { alt: "Goldene Espenpiste auf einem geführten Side-by-Side-Abenteuer bei Vernal, Utah", caption: "Goldene Espenpiste" },
  "slide-090": { alt: "Side-by-Side-UTVs hoch über dem Canyon auf einer Backcountry-Tour bei Vernal, Utah", caption: "UTVs über dem Canyon" },
  "slide-091": { alt: "Blick durch einen Sandsteinbogen auf einer Tour von Adventure Tours Vernal bei Vernal, Utah", caption: "Durch den Felsbogen" },
  "slide-092": { alt: "Side-by-Side-UTVs auf Slickrock unter einem Gewitterhimmel bei Vernal, Utah", caption: "Slickrock unter dem Gewitter" },
  "slide-093": { alt: "Blaues Side-by-Side-UTV wirbelt Staub auf einer Wüstenpiste bei Vernal, Utah auf", caption: "Staub auf der Wüstenpiste" },
  "slide-094": { alt: "Blick aus einer Sandsteinhöhle durch eine Fensteröffnung bei Vernal, Utah", caption: "In einer Sandsteinhöhle" },
  "slide-095": { alt: "Side-by-Side-UTVs an einem Sammelpunkt auf dem Berggipfel bei Vernal, Utah", caption: "Sammelpunkt auf dem Gipfel" },
  "slide-096": { alt: "Drei Side-by-Side-UTVs aufgereiht auf einer geführten Tour bei Vernal, Utah", caption: "Drei UTVs in Reihe" },
  "slide-097": { alt: "Blick auf einen Slickrock-Grat auf einer Backcountry-UTV-Tour bei Vernal, Utah", caption: "Blick auf den Slickrock-Grat" },
  "slide-098": { alt: "Side-by-Side-UTV erklimmt den Slickrock bei Vernal, Utah", caption: "Auffahrt auf den Slickrock" },
  "slide-099": { alt: "Side-by-Side-UTV bei einer Slickrock-Auffahrt unter einem Gewitterhimmel bei Vernal, Utah", caption: "Slickrock-Auffahrt im Gewitter" },
  "slide-100": { alt: "Side-by-Side-UTV wirft Staub auf einer Wüstenpiste bei Vernal, Utah auf", caption: "Staubfahne in der Luft" },
  "slide-101": { alt: "Side-by-Side-UTV bei einer steilen Felsstufenauffahrt bei Vernal, Utah", caption: "Auffahrt über die steile Felsstufe" },
  "slide-102": { alt: "Side-by-Side-UTV wirbelt in einer Kurve Sand auf bei Vernal, Utah", caption: "Kurve mit aufgewirbeltem Sand" },
  "slide-103": { alt: "Side-by-Side-UTV mit amerikanischer Flagge im Stand bei Vernal, Utah", caption: "UTV mit amerikanischer Flagge" },
  "slide-104": { alt: "Side-by-Side-UTV an einer Klippenkante in der Dämmerung bei Vernal, Utah", caption: "Klippenkante in der Dämmerung" },
  "slide-105": { alt: "Side-by-Side-UTV auf einem Gratrücken im Zwielicht im Wüsten-Backcountry von Utah", caption: "Gratrücken im Zwielicht" },
};

const GALLERY_TEXT_JA: GalleryDictionary = {
  "slide-001": { alt: "Adventure Tours VernalのUTVツアーで、砂岩のくぼみに停まるサイドバイサイドUTV", caption: "砂岩のくぼみを探索" },
  "slide-002": { alt: "ユタ州バーナルでのガイド付きUTVツアー出発前に並ぶKawasaki KRX 1000のサイドバイサイドUTV", caption: "出発前に並ぶUTV" },
  "slide-003": { alt: "ユタ州バーナル近郊の砂漠のトレイルで砂ぼこりを上げる青いサイドバイサイドUTV", caption: "舞い上がる砂ぼこり" },
  "slide-004": { alt: "ユタ州バーナル近郊のバックカントリートレイルをサイドバイサイドUTVで走るグループ", caption: "トレイルを行くグループ" },
  "slide-005": { alt: "Adventure Tours VernalのUTVツアーで、夕暮れの砂岩の岩庇の下で休む参加者", caption: "夕暮れの岩庇" },
  "slide-006": { alt: "ユタ州バーナル近郊のガイド付きUTVツアーで、砂岩の洞窟の中から望む景色", caption: "砂岩の洞窟の中から" },
  "slide-007": { alt: "Adventure Tours VernalのUTVツアーで、砂岩の洞窟の中で記念撮影する家族", caption: "洞窟での家族写真" },
  "slide-008": { alt: "ユタ州バーナル近郊、Ashley Gorgeを見下ろす峡谷の縁に迫るUTVのタイヤ", caption: "峡谷の縁で" },
  "slide-009": { alt: "ユタ州バーナル近郊のバックカントリーUTVツアーで見る、夕暮れの砂漠のバッドランズ", caption: "バッドランズの夕暮れ" },
  "slide-010": { alt: "ユタ州バーナル近郊のガイド付きツアーで、スリックロックの尾根を登るサイドバイサイドUTV", caption: "スリックロックの尾根を登る" },
  "slide-011": { alt: "ユタ州バーナル近郊の高地砂漠を疾走する青いサイドバイサイドUTV", caption: "砂漠を疾走する" },
  "slide-012": { alt: "ユタ州バーナル近郊で、岩庇の下に並ぶKawasaki KRX 1000のサイドバイサイドUTV", caption: "岩庇の下に並ぶ" },
  "slide-013": { alt: "ユタ州バーナル近郊のバックカントリートレイル沿いで、サイドバイサイドUTVとともに小休止するグループ", caption: "トレイル脇での小休止" },
  "slide-014": { alt: "ユタ州バーナル近郊のガイド付きツアーで、スリックロックの峡谷の眺めのそばに停まるサイドバイサイドUTV", caption: "スリックロックの峡谷の眺め" },
  "slide-015": { alt: "ユタ州バーナル近郊で、砂岩の洞窟の中に停まるサイドバイサイドUTV", caption: "洞窟の中のUTV" },
  "slide-016": { alt: "Adventure Tours Vernalのバックカントリーツアーで見上げる、そびえ立つ砂岩の洞窟の壁", caption: "そびえ立つ洞窟の壁" },
  "slide-017": { alt: "ユタ州バーナル近郊、Adventure Tours Vernalのアウティングで崖から水面へ飛び込む参加者", caption: "崖からの飛び込み" },
  "slide-018": { alt: "ユタ州バーナル近郊のガイド付きツアーで、山のトレイルを進むサイドバイサイドUTVの車列", caption: "山のトレイルを行く車列" },
  "slide-019": { alt: "ユタ州バーナル、Dinosaur National Monument近くの夕暮れのスリックロックを走るサイドバイサイドUTV", caption: "夕暮れの砂漠ライド" },
  "slide-020": { alt: "ユタ州バーナル近郊、夕日を背に浮かび上がる3台のKawasaki KRX 1000サイドバイサイドUTV", caption: "夕日に浮かぶ3台のシルエット" },
  "slide-021": { alt: "ユタ州バーナル近郊で、Kawasaki KRX 1000のサイドバイサイドUTVのそばのスリックロックに立つ参加者", caption: "スリックロックに立つ参加者" },
  "slide-022": { alt: "ユタ州バーナル近郊で、スリックロックに停まる2台のサイドバイサイドUTV", caption: "スリックロックの2台のUTV" },
  "slide-023": { alt: "ユタ州バーナル近郊のガイド付きツアーを終え、スリックロックに並ぶ泥まみれのサイドバイサイドUTV", caption: "岩の上の泥まみれのUTV" },
  "slide-024": { alt: "ユタ州バーナル近郊の展望ポイントで、岩のドームに立つ泥まみれのサイドバイサイドUTV", caption: "展望ポイントの泥まみれのUTV" },
  "slide-025": { alt: "ユタ州バーナル近郊、峡谷をはるか下に望むスリックロックの青いサイドバイサイドUTV", caption: "スリックロックの青いUTV" },
  "slide-026": { alt: "ユタ州バーナル近郊のガイド付きツアーで、夕暮れにシルエットとなるサイドバイサイドUTV", caption: "夕暮れのUTV" },
  "slide-027": { alt: "ユタ州の砂漠のバックカントリーを行く夕暮れのライドで、夕日を背にシルエットとなるサイドバイサイドUTV", caption: "夕日を背にしたシルエット" },
  "slide-028": { alt: "ユタ州バーナル近郊のバックカントリーツアーで、大岩の上に乗り上げた2台のサイドバイサイドUTV", caption: "大岩の上の2台のUTV" },
  "slide-029": { alt: "ユタ州バーナルでのAdventure Tours Vernalのアウティングで、砂岩のアーチを探索するハイカー", caption: "砂岩のアーチに立つハイカー" },
  "slide-030": { alt: "ユタ州バーナル近郊、砂漠を見渡す大岩の上のサイドバイサイドUTV", caption: "大岩の上のUTV" },
  "slide-031": { alt: "ユタ州バーナル近郊のバックカントリートレイルで、谷を見下ろす泥まみれのサイドバイサイドUTV", caption: "眺めのよい場所の泥まみれのUTV" },
  "slide-032": { alt: "ユタ州バーナル近郊、夕暮れの尾根の上に並ぶサイドバイサイドUTV", caption: "夕暮れの尾根のUTV" },
  "slide-033": { alt: "ユタ州バーナルのガイド付きツアーで、岩の尾根の地形に立つサイドバイサイドUTV", caption: "岩の尾根のUTV" },
  "slide-034": { alt: "ユタ州バーナル近郊のバックカントリーツアーで、高地砂漠を走るサイドバイサイドUTV", caption: "高地砂漠のUTV" },
  "slide-035": { alt: "ユタ州バーナル近郊、スリックロックのドームの展望ポイントに停まるサイドバイサイドUTV", caption: "スリックロックドームの展望ポイント" },
  "slide-036": { alt: "ユタ州バーナル近郊のバックカントリーUTVツアーで望む、峡谷地帯の展望ポイント", caption: "峡谷地帯の展望ポイント" },
  "slide-037": { alt: "ユタ州バーナル近郊のガイド付きツアーで、スリックロックを登るサイドバイサイドUTV", caption: "スリックロックを登る" },
  "slide-038": { alt: "ユタ州バーナル近郊のガイド付きツアーで、急な岩肌を下るサイドバイサイドUTV", caption: "岩肌を下るUTV" },
  "slide-039": { alt: "ユタ州バーナル近郊のバックカントリートレイルで、大岩を乗り越えるサイドバイサイドUTV", caption: "大岩を乗り越えるUTV" },
  "slide-040": { alt: "ユタ州バーナル近郊の砂漠のトレイルを走る緑のサイドバイサイドUTV", caption: "トレイルの緑のUTV" },
  "slide-041": { alt: "ユタ州バーナル近郊のガイド付きツアーで、スリックロックを登るサイドバイサイドUTV", caption: "スリックロックを登るUTV" },
  "slide-042": { alt: "ユタ州バーナル近郊のバックカントリーツアーで、スリックロックを走るサイドバイサイドUTV", caption: "スリックロックのUTV" },
  "slide-043": { alt: "ユタ州バーナル近郊で、砂岩の尾根を登るサイドバイサイドUTV", caption: "砂岩の尾根を登る" },
  "slide-044": { alt: "ユタ州バーナル近郊、砂漠のビュートのふもとに停まるサイドバイサイドUTV", caption: "ビュートのふもとで停車" },
  "slide-045": { alt: "ユタ州バーナル近郊、岩のアーチ越しに望む砂漠のビュート", caption: "岩のアーチ越しに" },
  "slide-046": { alt: "ユタ州バーナル近郊のバックカントリーツアーで、岩を登る泥まみれのサイドバイサイドUTV", caption: "岩を登る泥まみれのマシン" },
  "slide-047": { alt: "ユタ州バーナル近郊、天然の岩のアーチの下に停まるサイドバイサイドUTV", caption: "アーチの下のサイドバイサイド" },
  "slide-048": { alt: "ユタ州のバックカントリーを抜ける峡谷のトレイルを行く2台のサイドバイサイドUTV", caption: "峡谷トレイルの2台" },
  "slide-049": { alt: "ユタ州バーナル近郊、スリックロックの急な下りを行くサイドバイサイドUTV", caption: "スリックロックの急な下り" },
  "slide-050": { alt: "ユタ州バーナル近郊、砂岩のワッシュを進むサイドバイサイドUTVのガイド付きロッククロール", caption: "ガイド付きロッククロール" },
  "slide-051": { alt: "ユタ州バーナル近郊のバックカントリーUTVツアーで望む、夕暮れの砂漠の展望ポイント", caption: "夕暮れの展望ポイント" },
  "slide-052": { alt: "ユタ州バーナル近郊のバックカントリートレイルで、深いわだちに挑むサイドバイサイドUTV", caption: "深いわだちに挑む" },
  "slide-053": { alt: "ユタ州バーナル近郊で、水しぶきを上げて川を渡るサイドバイサイドUTV", caption: "水しぶきの渡渉" },
  "slide-054": { alt: "ユタ州バーナル近郊、Adventure Tours VernalのUTVツアーで見るDoc's Beachのトレイルヘッドの標識", caption: "Doc's Beachのトレイル" },
  "slide-055": { alt: "ユタ州バーナルでのガイド付きツアーに備えて並ぶKawasaki KRX 1000のサイドバイサイドUTVの車両群", caption: "出発を待つ車両群" },
  "slide-056": { alt: "ユタ州バーナル近郊で、サイドバイサイドUTVとともに休憩するツアーグループ", caption: "グループの休憩" },
  "slide-057": { alt: "ユタ州バーナル近郊の尾根で、Kawasaki KRX 1000のサイドバイサイドUTVと並ぶツアーグループ", caption: "ツアーグループの記念写真" },
  "slide-058": { alt: "ユタ州バーナル近郊で、ガイド付きツアーに備えて長い列をつくるサイドバイサイドUTV", caption: "整列して出発を待つ" },
  "slide-059": { alt: "ユタ州バーナル近郊の丘の上に並ぶサイドバイサイドUTVの車両群", caption: "丘の上の車両群" },
  "slide-060": { alt: "ユタ州バーナル近郊、ぬかるんだバックカントリートレイルを突き進むサイドバイサイドUTV", caption: "ぬかるんだトレイルを突き進む" },
  "slide-061": { alt: "ユタ州バーナル近郊で、泥のわだちを越える緑のKawasakiサイドバイサイドUTV", caption: "泥の中のグリーンマシン" },
  "slide-062": { alt: "ユタ州バーナル近郊で、サイドバイサイドUTVとともに岩庇の下に集まるツアーグループ", caption: "岩庇の下のグループ" },
  "slide-063": { alt: "ユタ州バーナル近郊のガイド付きツアーで、崖のふちに停まるサイドバイサイドUTV", caption: "崖のふちのUTV" },
  "slide-064": { alt: "ユタ州バーナル近郊のバックカントリーUTVツアーで望む、岩場のトレイルの眺め", caption: "岩場のトレイルの眺め" },
  "slide-065": { alt: "ユタ州バーナル近郊、Adventure Tours Vernalのアウティングでクールダウンに崖から飛び込む参加者", caption: "崖から飛び込んでクールダウン" },
  "slide-066": { alt: "ユタ州バーナル近郊、スリックロックのドームのふもとに並ぶサイドバイサイドUTV", caption: "ドームのふもとに並ぶUTV" },
  "slide-067": { alt: "ユタ州バーナル近郊で、ガイドとともにスリックロックのドームを攻略する青いサイドバイサイドUTV", caption: "スリックロックを攻略する" },
  "slide-068": { alt: "ユタ州のバックカントリーでロッククロールに挑む3台のサイドバイサイドUTV", caption: "ロッククロールの3台" },
  "slide-069": { alt: "Adventure Tours VernalのUTVツアーで、断崖の住居跡を探索する参加者", caption: "断崖の住居跡を探索" },
  "slide-070": { alt: "ユタ州バーナル近郊のガイド付きUTVツアーで望む、谷を見下ろす大きな天然の砂岩アーチ", caption: "天然の砂岩アーチ" },
  "slide-071": { alt: "ユタ州バーナル近郊、夕暮れの岩のアーチに集まるツアーグループ", caption: "夕暮れのアーチに集う一行" },
  "slide-072": { alt: "Adventure Tours Vernalのバックカントリーツアーで入る砂岩の洞窟の内部", caption: "洞窟の中で" },
  "slide-073": { alt: "ユタ州バーナル近郊、スリックロックの頂上へ登るサイドバイサイドUTV", caption: "スリックロックの頂上へ" },
  "slide-074": { alt: "ユタ州バーナル近郊、川の渡渉に挑むサイドバイサイドUTV", caption: "渡渉のアドベンチャー" },
  "slide-075": { alt: "ユタ州バーナル近郊、峡谷の展望ポイントに停まるサイドバイサイドUTV", caption: "停車したマシンの横顔" },
  "slide-076": { alt: "ユタ州バーナル近郊、砂丘を飛び越えるサイドバイサイドUTV", caption: "砂丘のジャンプ" },
  "slide-077": { alt: "ユタ州バーナル近郊、砂岩のアーチのそばに停まるサイドバイサイドUTV", caption: "アーチのそばで停車" },
  "slide-078": { alt: "ユタ州バーナル近郊のバックカントリーUTVツアーで望む、黄金色の砂岩アーチ", caption: "黄金色の岩のアーチ" },
  "slide-079": { alt: "ユタ州バーナル近郊、砂岩の洞窟にあいた窓状の開口部", caption: "砂岩の洞窟の窓" },
  "slide-080": { alt: "ユタ州バーナル近郊、そびえ立つ峡谷の壁沿いに続くトレイル", caption: "峡谷の壁沿いのトレイル" },
  "slide-081": { alt: "ユタ州バーナル近郊、砂岩のアーチの下に停まるサイドバイサイドUTV", caption: "アーチの下のUTV" },
  "slide-082": { alt: "ユタ州バーナル近郊、Adventure Tours Vernalのツアーで入る砂岩の洞窟の内部", caption: "洞窟内部の眺め" },
  "slide-083": { alt: "ユタ州バーナル近郊のバックカントリーUTVツアーで見上げる、そびえ立つ岩庇", caption: "そびえ立つ岩庇" },
  "slide-084": { alt: "ユタ州バーナル近郊、峡谷の縁に並ぶ3台のサイドバイサイドUTV", caption: "峡谷の縁の3台のUTV" },
  "slide-085": { alt: "ユタ州バーナル近郊、峡谷を見下ろす崖のふちで記念撮影するカップル", caption: "崖のふちのカップル" },
  "slide-086": { alt: "ユタ州バーナル近郊のバックカントリーUTVトレイルから望む、秋の峡谷の展望ポイント", caption: "秋の峡谷の展望ポイント" },
  "slide-087": { alt: "ユタ州バーナル近郊、アスペンに縁どられたトレイルを走るサイドバイサイドUTV", caption: "アスペンのトレイルを走る" },
  "slide-088": { alt: "ユタ州バーナル近郊、スリックロックの下りを行くサイドバイサイドUTV", caption: "スリックロックの下り" },
  "slide-089": { alt: "ユタ州バーナル近郊、ガイド付きサイドバイサイドアドベンチャーで走る黄金色のアスペンのトレイル", caption: "黄金色のアスペンのトレイル" },
  "slide-090": { alt: "ユタ州バーナル近郊のバックカントリーツアーで、峡谷を見下ろす高みに立つサイドバイサイドUTV", caption: "峡谷を見下ろすUTV" },
  "slide-091": { alt: "ユタ州バーナル近郊、Adventure Tours Vernalのツアーで望む砂岩のアーチ越しの景色", caption: "アーチ越しの景色" },
  "slide-092": { alt: "ユタ州バーナル近郊、荒れ模様の空の下のスリックロックに立つサイドバイサイドUTV", caption: "嵐の下のスリックロック" },
  "slide-093": { alt: "ユタ州バーナル近郊の砂漠のトレイルで砂ぼこりを上げる青いサイドバイサイドUTV", caption: "砂漠のトレイルの砂ぼこり" },
  "slide-094": { alt: "ユタ州バーナル近郊、砂岩の洞窟の中から窓状の開口部越しに望む景色", caption: "砂岩の洞窟の中から" },
  "slide-095": { alt: "ユタ州バーナル近郊、山頂の集合ポイントに並ぶサイドバイサイドUTV", caption: "山頂の集合ポイント" },
  "slide-096": { alt: "ユタ州バーナル近郊のガイド付きツアーで並ぶ3台のサイドバイサイドUTV", caption: "並んだ3台のUTV" },
  "slide-097": { alt: "ユタ州バーナル近郊のバックカントリーUTVツアーで望む、スリックロックの尾根の眺め", caption: "スリックロックの尾根の眺め" },
  "slide-098": { alt: "ユタ州バーナル近郊、スリックロックを登るサイドバイサイドUTV", caption: "スリックロックを登る" },
  "slide-099": { alt: "ユタ州バーナル近郊、荒れ模様の空の下でスリックロックを登るサイドバイサイドUTV", caption: "嵐のスリックロック登坂" },
  "slide-100": { alt: "ユタ州バーナル近郊の砂漠のトレイルで砂ぼこりを巻き上げるサイドバイサイドUTV", caption: "宙に舞う砂ぼこり" },
  "slide-101": { alt: "ユタ州バーナル近郊、急な岩棚を登るサイドバイサイドUTV", caption: "急な岩棚を登る" },
  "slide-102": { alt: "ユタ州バーナル近郊、コーナーで砂を巻き上げるサイドバイサイドUTV", caption: "砂を巻き上げるコーナリング" },
  "slide-103": { alt: "ユタ州バーナル近郊、星条旗を掲げて停車するサイドバイサイドUTV", caption: "星条旗を掲げたUTV" },
  "slide-104": { alt: "ユタ州バーナル近郊、夕暮れの崖のふちに立つサイドバイサイドUTV", caption: "夕暮れの崖のふち" },
  "slide-105": { alt: "ユタ州の砂漠のバックカントリーで、たそがれの尾根を走るサイドバイサイドUTV", caption: "たそがれの尾根" },
};

const GALLERY_TEXT_ZH: GalleryDictionary = {
  "slide-001": { alt: "Adventure Tours Vernal 的 UTV 行程中，停在砂岩凹壁里的并排越野车", caption: "探访砂岩凹壁" },
  "slide-002": { alt: "犹他州 Vernal，向导带队的 UTV 行程出发前列队的 Kawasaki KRX 1000 并排越野车", caption: "出发前的 UTV 列队" },
  "slide-003": { alt: "犹他州 Vernal 附近，在沙漠越野路线上扬起尘土的蓝色并排越野车", caption: "扬起的尘土" },
  "slide-004": { alt: "犹他州 Vernal 附近，一行人驾驶并排越野车行驶在荒野深处的越野路线上", caption: "路线上的车队" },
  "slide-005": { alt: "Adventure Tours Vernal 的 UTV 行程中，日落时分在砂岩岩檐下休息的参加者", caption: "日落时分的岩檐" },
  "slide-006": { alt: "犹他州 Vernal 附近，向导带队的 UTV 行程中从砂岩岩洞内向外望去的景色", caption: "砂岩岩洞之中" },
  "slide-007": { alt: "Adventure Tours Vernal 的 UTV 行程中，在砂岩岩洞内合影的一家人", caption: "岩洞里的全家福" },
  "slide-008": { alt: "犹他州 Vernal 附近，停在峡谷边缘、俯瞰 Ashley Gorge 的 UTV 车轮", caption: "峡谷边缘" },
  "slide-009": { alt: "犹他州 Vernal 附近，荒野深处 UTV 行程中日落时分的沙漠荒原地貌", caption: "沙漠荒原的日落" },
  "slide-010": { alt: "犹他州 Vernal 附近，向导带队的行程中攀上光滑岩面山脊的并排越野车", caption: "攀上光滑岩面山脊" },
  "slide-011": { alt: "犹他州 Vernal 附近，在高原荒漠中疾驰的蓝色并排越野车", caption: "疾驰穿越沙漠" },
  "slide-012": { alt: "犹他州 Vernal 附近，在岩檐下一字排开的 Kawasaki KRX 1000 并排越野车", caption: "岩檐下的车列" },
  "slide-013": { alt: "犹他州 Vernal 附近，一行人在荒野深处的越野路线旁与并排越野车一同停歇", caption: "路边的集体停歇" },
  "slide-014": { alt: "犹他州 Vernal 附近，向导带队的行程中停在光滑岩面峡谷景观旁的并排越野车", caption: "光滑岩面峡谷的景观" },
  "slide-015": { alt: "犹他州 Vernal 附近，停在砂岩岩洞内的并排越野车", caption: "岩洞中的 UTV" },
  "slide-016": { alt: "Adventure Tours Vernal 荒野深处行程中高耸的砂岩岩洞洞壁", caption: "高耸的洞壁" },
  "slide-017": { alt: "犹他州 Vernal 附近，Adventure Tours Vernal 的出行中从崖壁跃入水中的参加者", caption: "跃入水中的一跳" },
  "slide-018": { alt: "犹他州 Vernal 附近，向导带队的行程中行驶在山间越野路线上的并排越野车车队", caption: "山间路线上的车队" },
  "slide-019": { alt: "犹他州 Vernal，Dinosaur National Monument 附近黄昏时分行驶在光滑岩面上的并排越野车", caption: "黄昏的沙漠骑行" },
  "slide-020": { alt: "犹他州 Vernal 附近，日落时分逆光而立的三台 Kawasaki KRX 1000 并排越野车", caption: "日落三台车的剪影" },
  "slide-021": { alt: "犹他州 Vernal 附近，站在光滑岩面上、身旁是 Kawasaki KRX 1000 并排越野车的参加者", caption: "站在光滑岩面上的参加者" },
  "slide-022": { alt: "犹他州 Vernal 附近，停在光滑岩面上的两台并排越野车", caption: "光滑岩面上的两台 UTV" },
  "slide-023": { alt: "犹他州 Vernal 附近，向导带队的行程结束后停在光滑岩面上、满身泥泞的并排越野车", caption: "岩面上泥泞的 UTV" },
  "slide-024": { alt: "犹他州 Vernal 附近，停在观景点岩石穹丘上的泥泞并排越野车", caption: "观景点上的泥泞 UTV" },
  "slide-025": { alt: "犹他州 Vernal 附近，高踞峡谷之上光滑岩面的蓝色并排越野车", caption: "光滑岩面上的蓝色 UTV" },
  "slide-026": { alt: "犹他州 Vernal 附近，向导带队的行程中日落时分逆光的并排越野车", caption: "日落时分的 UTV" },
  "slide-027": { alt: "犹他州沙漠荒野深处的日落骑行中，逆光而立的并排越野车", caption: "逆光的剪影" },
  "slide-028": { alt: "犹他州 Vernal 附近，荒野深处行程中停在巨石上的两台并排越野车", caption: "巨石上的两台 UTV" },
  "slide-029": { alt: "犹他州 Vernal，Adventure Tours Vernal 的出行中探访砂岩拱门的徒步者", caption: "砂岩拱门下的徒步者" },
  "slide-030": { alt: "犹他州 Vernal 附近，停在可俯瞰沙漠的巨石之上的并排越野车", caption: "巨石之上的 UTV" },
  "slide-031": { alt: "犹他州 Vernal 附近，荒野深处的越野路线上俯瞰山谷的泥泞并排越野车", caption: "泥泞 UTV 与远景" },
  "slide-032": { alt: "犹他州 Vernal 附近，黄昏时分停在山脊顶上的并排越野车", caption: "黄昏山脊上的 UTV" },
  "slide-033": { alt: "犹他州 Vernal，向导带队的行程中停在岩脊地貌上的并排越野车", caption: "岩脊上的 UTV" },
  "slide-034": { alt: "犹他州 Vernal 附近，荒野深处行程中行驶在高原荒漠里的并排越野车", caption: "高原荒漠中的 UTV" },
  "slide-035": { alt: "犹他州 Vernal 附近，停在光滑岩面穹丘观景点的并排越野车", caption: "光滑岩面穹丘观景点" },
  "slide-036": { alt: "犹他州 Vernal 附近，荒野深处 UTV 行程中俯瞰峡谷地带的观景点", caption: "峡谷地带观景点" },
  "slide-037": { alt: "犹他州 Vernal 附近，向导带队的行程中攀爬光滑岩面的并排越野车", caption: "攀爬光滑岩面" },
  "slide-038": { alt: "犹他州 Vernal 附近，向导带队的行程中驶下陡峭岩壁的并排越野车", caption: "驶下岩壁的 UTV" },
  "slide-039": { alt: "犹他州 Vernal 附近，荒野深处的越野路线上翻越巨石的并排越野车", caption: "翻越巨石的 UTV" },
  "slide-040": { alt: "犹他州 Vernal 附近，行驶在沙漠越野路线上的绿色并排越野车", caption: "路线上的绿色 UTV" },
  "slide-041": { alt: "犹他州 Vernal 附近，向导带队的行程中攀爬光滑岩面的并排越野车", caption: "攀爬光滑岩面的 UTV" },
  "slide-042": { alt: "犹他州 Vernal 附近，荒野深处行程中行驶在光滑岩面上的并排越野车", caption: "光滑岩面上的 UTV" },
  "slide-043": { alt: "犹他州 Vernal 附近，攀上砂岩山脊的并排越野车", caption: "攀上砂岩山脊" },
  "slide-044": { alt: "犹他州 Vernal 附近，停在沙漠台地下方的并排越野车", caption: "停在台地脚下" },
  "slide-045": { alt: "犹他州 Vernal 附近，透过岩石拱门望向沙漠台地", caption: "穿过岩石拱门" },
  "slide-046": { alt: "犹他州 Vernal 附近，荒野深处行程中攀爬岩石的泥泞并排越野车", caption: "泥泞车攀岩而上" },
  "slide-047": { alt: "犹他州 Vernal 附近，停在天然岩石拱门下的并排越野车", caption: "拱门下的并排越野车" },
  "slide-048": { alt: "穿越犹他州荒野深处，行驶在峡谷越野路线上的两台并排越野车", caption: "峡谷路线上的两台车" },
  "slide-049": { alt: "犹他州 Vernal 附近，驶下陡峭光滑岩面的并排越野车", caption: "陡峭的光滑岩面下坡" },
  "slide-050": { alt: "犹他州 Vernal 附近，向导带队的并排越野车穿越砂岩干河床的岩石攀爬", caption: "向导带队的岩石攀爬" },
  "slide-051": { alt: "犹他州 Vernal 附近，荒野深处 UTV 行程中黄昏时分的沙漠观景点", caption: "黄昏时分的观景点" },
  "slide-052": { alt: "犹他州 Vernal 附近，荒野深处的越野路线上闯过深车辙的并排越野车", caption: "闯过深车辙" },
  "slide-053": { alt: "犹他州 Vernal 附近，溅起水花涉水过河的并排越野车", caption: "溅起水花的涉水" },
  "slide-054": { alt: "犹他州 Vernal 附近，Adventure Tours Vernal 的 UTV 行程中 Doc's Beach 登山口的指示牌", caption: "Doc's Beach 的越野路线" },
  "slide-055": { alt: "犹他州 Vernal，为向导带队的行程做好准备的 Kawasaki KRX 1000 并排越野车车队", caption: "整装待发的车队" },
  "slide-056": { alt: "犹他州 Vernal 附近，与并排越野车一同停歇的行程团队", caption: "团队停歇" },
  "slide-057": { alt: "犹他州 Vernal 附近，在山脊上与 Kawasaki KRX 1000 并排越野车合影的行程团队", caption: "行程团队合影" },
  "slide-058": { alt: "犹他州 Vernal 附近，为向导带队的行程排成长队、整装待发的并排越野车", caption: "列队待发" },
  "slide-059": { alt: "犹他州 Vernal 附近，在山顶整装待发的并排越野车车队", caption: "山顶上的车队" },
  "slide-060": { alt: "犹他州 Vernal 附近，冲过荒野深处泥泞越野路线的并排越野车", caption: "冲过泥泞路线" },
  "slide-061": { alt: "犹他州 Vernal 附近，越过泥泞车辙的绿色 Kawasaki 并排越野车", caption: "泥中的绿色战车" },
  "slide-062": { alt: "犹他州 Vernal 附近，行程团队与并排越野车一同聚在岩檐下", caption: "岩檐下的团队" },
  "slide-063": { alt: "犹他州 Vernal 附近，向导带队的行程中停在崖壁边的并排越野车", caption: "崖边的 UTV" },
  "slide-064": { alt: "犹他州 Vernal 附近，荒野深处 UTV 行程中岩石越野路线的景致", caption: "岩石路线的景致" },
  "slide-065": { alt: "犹他州 Vernal 附近，Adventure Tours Vernal 的出行中跃下崖壁消暑的参加者", caption: "跃下崖壁消暑" },
  "slide-066": { alt: "犹他州 Vernal 附近，停在光滑岩面穹丘下方的并排越野车", caption: "穹丘下待发的 UTV" },
  "slide-067": { alt: "犹他州 Vernal 附近，在向导陪同下征服光滑岩面穹丘的蓝色并排越野车", caption: "征服光滑岩面" },
  "slide-068": { alt: "穿越犹他州荒野深处进行岩石攀爬的三台并排越野车", caption: "岩石攀爬的三台车" },
  "slide-069": { alt: "Adventure Tours Vernal 的 UTV 行程中探访崖居遗址的参加者", caption: "探访崖居遗址" },
  "slide-070": { alt: "犹他州 Vernal 附近，向导带队的 UTV 行程中高悬于山谷之上的大型天然砂岩拱门", caption: "天然砂岩拱门" },
  "slide-071": { alt: "犹他州 Vernal 附近，日落时分聚在岩石拱门下的行程团队", caption: "日落拱门下的一行人" },
  "slide-072": { alt: "Adventure Tours Vernal 荒野深处行程中的砂岩岩洞内部", caption: "岩洞之中" },
  "slide-073": { alt: "犹他州 Vernal 附近，攀向光滑岩面顶峰的并排越野车", caption: "光滑岩面登顶" },
  "slide-074": { alt: "犹他州 Vernal 附近，展开涉水过河冒险的并排越野车", caption: "涉水过河的冒险" },
  "slide-075": { alt: "犹他州 Vernal 附近，停在峡谷观景点的并排越野车", caption: "停驻车辆的侧影" },
  "slide-076": { alt: "犹他州 Vernal 附近，飞跃沙丘的并排越野车", caption: "飞跃沙丘" },
  "slide-077": { alt: "犹他州 Vernal 附近，停在砂岩拱门旁的并排越野车", caption: "停在拱门旁" },
  "slide-078": { alt: "犹他州 Vernal 附近，荒野深处 UTV 行程中金色的砂岩拱门", caption: "金色的岩石拱门" },
  "slide-079": { alt: "犹他州 Vernal 附近，砂岩岩洞上的窗形开口", caption: "砂岩岩洞的天窗" },
  "slide-080": { alt: "犹他州 Vernal 附近，沿高耸峡谷崖壁延伸的越野路线", caption: "峡谷崖壁旁的路线" },
  "slide-081": { alt: "犹他州 Vernal 附近，停在砂岩拱门下的并排越野车", caption: "拱门下的 UTV" },
  "slide-082": { alt: "犹他州 Vernal 附近，Adventure Tours Vernal 行程中的砂岩岩洞内部", caption: "岩洞内部一览" },
  "slide-083": { alt: "犹他州 Vernal 附近，荒野深处 UTV 行程中高耸的岩檐", caption: "高耸的岩檐" },
  "slide-084": { alt: "犹他州 Vernal 附近，停在峡谷边缘的三台并排越野车", caption: "峡谷边缘的三台 UTV" },
  "slide-085": { alt: "犹他州 Vernal 附近，在俯瞰峡谷的崖边合影的情侣", caption: "崖边的情侣" },
  "slide-086": { alt: "犹他州 Vernal 附近，荒野深处 UTV 路线上的秋日峡谷观景点", caption: "秋日峡谷观景点" },
  "slide-087": { alt: "犹他州 Vernal 附近，行驶在白杨夹道的路线上的并排越野车", caption: "白杨路线上的骑行" },
  "slide-088": { alt: "犹他州 Vernal 附近，驶下光滑岩面的并排越野车", caption: "光滑岩面下坡" },
  "slide-089": { alt: "犹他州 Vernal 附近，向导带队的并排越野车冒险中金黄的白杨路线", caption: "金黄的白杨路线" },
  "slide-090": { alt: "犹他州 Vernal 附近，荒野深处行程中高踞峡谷之上的并排越野车", caption: "峡谷之上的 UTV" },
  "slide-091": { alt: "犹他州 Vernal 附近，Adventure Tours Vernal 行程中透过砂岩拱门望去的景色", caption: "穿过拱门望去" },
  "slide-092": { alt: "犹他州 Vernal 附近，暴风雨天空下停在光滑岩面上的并排越野车", caption: "风暴下的光滑岩面" },
  "slide-093": { alt: "犹他州 Vernal 附近，在沙漠越野路线上扬起尘土的蓝色并排越野车", caption: "沙漠路线上的尘土" },
  "slide-094": { alt: "犹他州 Vernal 附近，从砂岩岩洞内透过窗形开口向外望去", caption: "砂岩岩洞之中" },
  "slide-095": { alt: "犹他州 Vernal 附近，停在山顶集合点的并排越野车", caption: "山顶集合点" },
  "slide-096": { alt: "犹他州 Vernal 附近，向导带队的行程中一字排开的三台并排越野车", caption: "一字排开的三台 UTV" },
  "slide-097": { alt: "犹他州 Vernal 附近，荒野深处 UTV 行程中光滑岩面山脊的景致", caption: "光滑岩面山脊的景致" },
  "slide-098": { alt: "犹他州 Vernal 附近，攀爬光滑岩面的并排越野车", caption: "攀爬光滑岩面" },
  "slide-099": { alt: "犹他州 Vernal 附近，暴风雨天空下攀爬光滑岩面的并排越野车", caption: "风暴中的光滑岩面爬坡" },
  "slide-100": { alt: "犹他州 Vernal 附近，在沙漠越野路线上抛起尘土的并排越野车", caption: "腾空而起的尘土" },
  "slide-101": { alt: "犹他州 Vernal 附近，攀上陡峭岩台的并排越野车", caption: "攀上陡峭岩台" },
  "slide-102": { alt: "犹他州 Vernal 附近，过弯时扬起沙粒的并排越野车", caption: "扬沙过弯" },
  "slide-103": { alt: "犹他州 Vernal 附近，停驻时高扬美国国旗的并排越野车", caption: "挂着美国国旗的 UTV" },
  "slide-104": { alt: "犹他州 Vernal 附近，黄昏时分停在崖边的并排越野车", caption: "黄昏的崖边" },
  "slide-105": { alt: "犹他州沙漠荒野深处，暮色中行驶在山脊线上的并排越野车", caption: "暮色中的山脊线" },
};

const GALLERY_TEXT_AR: GalleryDictionary = {
  "slide-001": { alt: "مركبة UTV متجاورة متوقفة في تجويف من الحجر الرملي خلال جولة UTV مع Adventure Tours Vernal", caption: "استكشاف تجويف من الحجر الرملي" },
  "slide-002": { alt: "صف من مركبات Kawasaki KRX 1000 المتجاورة جاهزة قبل جولة UTV مُرشَدة في Vernal بولاية يوتا", caption: "اصطفاف مركبات UTV قبل الانطلاق" },
  "slide-003": { alt: "مركبة UTV متجاورة زرقاء تثير الغبار على مسار صحراوي قرب Vernal في يوتا", caption: "إثارة الغبار" },
  "slide-004": { alt: "مجموعة تقود مركبات UTV متجاورة على مسار في المنطقة الخلفية قرب Vernal في يوتا", caption: "المجموعة على المسار" },
  "slide-005": { alt: "ركّاب يستريحون تحت نتوء من الحجر الرملي عند الغروب خلال جولة UTV مع Adventure Tours Vernal", caption: "نتوء صخري عند الغروب" },
  "slide-006": { alt: "إطلالة من داخل كهف من الحجر الرملي في جولة UTV مُرشَدة قرب Vernal في يوتا", caption: "داخل كهف من الحجر الرملي" },
  "slide-007": { alt: "عائلة تلتقط صورة داخل كهف من الحجر الرملي خلال جولة UTV مع Adventure Tours Vernal", caption: "صورة عائلية داخل الكهف" },
  "slide-008": { alt: "إطار مركبة UTV على حافة أخدود تطل على Ashley Gorge قرب Vernal في يوتا", caption: "على حافة الأخدود" },
  "slide-009": { alt: "أراضٍ صحراوية وعرة عند الغروب في جولة UTV إلى المنطقة الخلفية قرب Vernal في يوتا", caption: "غروب فوق الأراضي الوعرة" },
  "slide-010": { alt: "مركبة UTV متجاورة تتسلق حيدًا من الصخر الأملس في جولة مُرشَدة قرب Vernal في يوتا", caption: "تسلق حيد من الصخر الأملس" },
  "slide-011": { alt: "مركبة UTV متجاورة زرقاء تنطلق مسرعة عبر الصحراء المرتفعة قرب Vernal في يوتا", caption: "انطلاق سريع عبر الصحراء" },
  "slide-012": { alt: "مركبات Kawasaki KRX 1000 المتجاورة مصطفة تحت نتوء صخري قرب Vernal في يوتا", caption: "اصطفاف تحت النتوء الصخري" },
  "slide-013": { alt: "مجموعة تتوقف بمركباتها UTV المتجاورة على مسار في المنطقة الخلفية قرب Vernal في يوتا", caption: "توقف المجموعة على جانب المسار" },
  "slide-014": { alt: "مركبة UTV متجاورة بجوار مشهد أخدود من الصخر الأملس في جولة مُرشَدة قرب Vernal في يوتا", caption: "مشهد أخدود الصخر الأملس" },
  "slide-015": { alt: "مركبة UTV متجاورة متوقفة داخل كهف من الحجر الرملي قرب Vernal في يوتا", caption: "مركبة UTV داخل الكهف" },
  "slide-016": { alt: "جدار كهف شاهق من الحجر الرملي في جولة إلى المنطقة الخلفية مع Adventure Tours Vernal", caption: "جدار الكهف الشاهق" },
  "slide-017": { alt: "أحد الركّاب يقفز من جرف إلى الماء في نزهة مع Adventure Tours Vernal قرب Vernal في يوتا", caption: "قفزة من الجرف إلى الماء" },
  "slide-018": { alt: "قافلة من مركبات UTV المتجاورة على مسار جبلي خلال جولة مُرشَدة قرب Vernal في يوتا", caption: "قافلة على المسار الجبلي" },
  "slide-019": { alt: "مركبة UTV متجاورة على الصخر الأملس عند الغسق قرب Dinosaur National Monument في Vernal بولاية يوتا", caption: "جولة صحراوية عند الغسق" },
  "slide-020": { alt: "ثلاث مركبات Kawasaki KRX 1000 متجاورة تظهر بأطياف سوداء أمام توهّج الشمس عند الغروب قرب Vernal في يوتا", caption: "ثلاثي عند الغروب" },
  "slide-021": { alt: "ركّاب يقفون فوق الصخر الأملس بجانب مركبات Kawasaki KRX 1000 المتجاورة قرب Vernal في يوتا", caption: "ركّاب فوق الصخر الأملس" },
  "slide-022": { alt: "مركبتا UTV متجاورتان متوقفتان على الصخر الأملس قرب Vernal في يوتا", caption: "مركبتا UTV على الصخر الأملس" },
  "slide-023": { alt: "مركبات UTV متجاورة مغطاة بالطين على الصخر الأملس بعد جولة مُرشَدة قرب Vernal في يوتا", caption: "مركبات UTV موحلة على الصخر" },
  "slide-024": { alt: "مركبة UTV متجاورة موحلة فوق قبة صخرية عند مطل قرب Vernal في يوتا", caption: "مركبة UTV موحلة عند المطل" },
  "slide-025": { alt: "مركبة UTV متجاورة زرقاء على الصخر الأملس عاليًا فوق الأخدود قرب Vernal في يوتا", caption: "مركبة UTV زرقاء على الصخر الأملس" },
  "slide-026": { alt: "مركبات UTV متجاورة تظهر بأطياف سوداء عند الغروب في جولة مُرشَدة قرب Vernal في يوتا", caption: "مركبات UTV عند الغروب" },
  "slide-027": { alt: "مركبة UTV متجاورة أمام توهّج الشمس في جولة عند الغروب عبر المنطقة الخلفية الصحراوية في يوتا", caption: "طيف أمام توهّج الشمس" },
  "slide-028": { alt: "مركبتا UTV متجاورتان فوق صخرة ضخمة في جولة إلى المنطقة الخلفية قرب Vernal في يوتا", caption: "مركبتان فوق صخرة ضخمة" },
  "slide-029": { alt: "متنزهون يستكشفون قوسًا من الحجر الرملي في نزهة مع Adventure Tours Vernal في Vernal بولاية يوتا", caption: "متنزهون عند قوس الحجر الرملي" },
  "slide-030": { alt: "مركبات UTV متجاورة فوق صخرة ضخمة مع إطلالة صحراوية قرب Vernal في يوتا", caption: "مركبات UTV فوق الصخرة الضخمة" },
  "slide-031": { alt: "مركبات UTV متجاورة موحلة تطل على الوادي على مسار في المنطقة الخلفية قرب Vernal في يوتا", caption: "مركبات UTV موحلة أمام الإطلالة" },
  "slide-032": { alt: "مركبات UTV متجاورة على قمة حيد عند الغسق قرب Vernal في يوتا", caption: "مركبات UTV على قمة الحيد عند الغسق" },
  "slide-033": { alt: "مركبات UTV متجاورة على تكوين صخري ممتد في جولة مُرشَدة في Vernal بولاية يوتا", caption: "مركبات UTV على الحيد الصخري" },
  "slide-034": { alt: "مركبات UTV متجاورة في الصحراء المرتفعة خلال جولة إلى المنطقة الخلفية قرب Vernal في يوتا", caption: "مركبات UTV في الصحراء المرتفعة" },
  "slide-035": { alt: "مركبة UTV متجاورة عند مطل فوق قبة من الصخر الأملس قرب Vernal في يوتا", caption: "مطل قبة الصخر الأملس" },
  "slide-036": { alt: "مطل على منطقة الأخاديد في جولة UTV إلى المنطقة الخلفية قرب Vernal في يوتا", caption: "مطل على منطقة الأخاديد" },
  "slide-037": { alt: "مركبة UTV متجاورة تتسلق الصخر الأملس في جولة مُرشَدة قرب Vernal في يوتا", caption: "تسلق الصخر الأملس" },
  "slide-038": { alt: "مركبة UTV متجاورة تهبط واجهة صخرية شديدة الانحدار في جولة مُرشَدة قرب Vernal في يوتا", caption: "هبوط المركبة عن الصخر" },
  "slide-039": { alt: "مركبة UTV متجاورة تعتلي الصخور الضخمة على مسار في المنطقة الخلفية قرب Vernal في يوتا", caption: "اعتلاء الصخور الضخمة" },
  "slide-040": { alt: "مركبة UTV متجاورة خضراء على مسار صحراوي قرب Vernal في يوتا", caption: "مركبة UTV خضراء على المسار" },
  "slide-041": { alt: "مركبات UTV متجاورة تتسلق الصخر الأملس في جولة مُرشَدة قرب Vernal في يوتا", caption: "مركبات UTV تتسلق الصخر الأملس" },
  "slide-042": { alt: "مركبات UTV متجاورة على الصخر الأملس في جولة إلى المنطقة الخلفية قرب Vernal في يوتا", caption: "مركبات UTV على الصخر الأملس" },
  "slide-043": { alt: "مركبات UTV متجاورة تتسلق حيدًا من الحجر الرملي قرب Vernal في يوتا", caption: "تسلق حيد من الحجر الرملي" },
  "slide-044": { alt: "مركبة UTV متجاورة متوقفة تحت هضبة صحراوية منعزلة قرب Vernal في يوتا", caption: "توقف عند الهضبة المنعزلة" },
  "slide-045": { alt: "منظر عبر قوس صخري نحو هضبة صحراوية منعزلة قرب Vernal في يوتا", caption: "عبر القوس الصخري" },
  "slide-046": { alt: "مركبة UTV متجاورة موحلة تتسلق الصخور في جولة إلى المنطقة الخلفية قرب Vernal في يوتا", caption: "تسلق المركبة الموحلة" },
  "slide-047": { alt: "مركبات UTV متجاورة متوقفة تحت قوس صخري طبيعي قرب Vernal في يوتا", caption: "مركبات متجاورة تحت القوس" },
  "slide-048": { alt: "مركبتا UTV متجاورتان على مسار في أخدود عبر المنطقة الخلفية في يوتا", caption: "مركبتان على مسار الأخدود" },
  "slide-049": { alt: "مركبة UTV متجاورة في هبوط شديد الانحدار على الصخر الأملس قرب Vernal في يوتا", caption: "هبوط شديد على الصخر الأملس" },
  "slide-050": { alt: "زحف على الصخور بمركبة UTV متجاورة مُرشَدة عبر مجرى من الحجر الرملي قرب Vernal في يوتا", caption: "زحف مُرشَد على الصخور" },
  "slide-051": { alt: "مطل صحراوي عند الغسق في جولة UTV إلى المنطقة الخلفية قرب Vernal في يوتا", caption: "المطل عند الغسق" },
  "slide-052": { alt: "مركبة UTV متجاورة تجتاز شقًا عميقًا على مسار في المنطقة الخلفية قرب Vernal في يوتا", caption: "اجتياز الشق العميق" },
  "slide-053": { alt: "مركبة UTV متجاورة تعبر النهر وسط رذاذ الماء قرب Vernal في يوتا", caption: "عبور النهر وسط الرذاذ" },
  "slide-054": { alt: "لافتة مدخل مسار Doc's Beach في جولة UTV مع Adventure Tours Vernal قرب Vernal في يوتا", caption: "مسارات Doc's Beach" },
  "slide-055": { alt: "أسطول من مركبات Kawasaki KRX 1000 المتجاورة جاهز لجولة مُرشَدة في Vernal بولاية يوتا", caption: "اصطفاف الأسطول قبل الانطلاق" },
  "slide-056": { alt: "مجموعة الجولة تتوقف بمركبات UTV المتجاورة قرب Vernal في يوتا", caption: "توقف المجموعة على المسار" },
  "slide-057": { alt: "مجموعة الجولة مع مركبات Kawasaki KRX 1000 المتجاورة على حيد قرب Vernal في يوتا", caption: "صورة مجموعة الجولة" },
  "slide-058": { alt: "صف طويل من مركبات UTV المتجاورة جاهز لجولة مُرشَدة قرب Vernal في يوتا", caption: "مصطفة وجاهزة" },
  "slide-059": { alt: "أسطول من مركبات UTV المتجاورة على قمة تل قرب Vernal في يوتا", caption: "الأسطول على قمة التل" },
  "slide-060": { alt: "مركبة UTV متجاورة تندفع عبر مسار موحل في المنطقة الخلفية قرب Vernal في يوتا", caption: "اندفاع عبر المسار الموحل" },
  "slide-061": { alt: "مركبة Kawasaki UTV متجاورة خضراء تعبر شقًا موحلًا قرب Vernal في يوتا", caption: "المركبة الخضراء في الطين" },
  "slide-062": { alt: "مجموعة الجولة تتجمع تحت نتوء صخري مع مركبات UTV المتجاورة قرب Vernal في يوتا", caption: "المجموعة تحت النتوء الصخري" },
  "slide-063": { alt: "مركبات UTV متجاورة متوقفة عند جرف في جولة مُرشَدة قرب Vernal في يوتا", caption: "مركبات UTV عند الجرف" },
  "slide-064": { alt: "مشهد مسار صخري في جولة UTV إلى المنطقة الخلفية قرب Vernal في يوتا", caption: "مشهد المسار الصخري" },
  "slide-065": { alt: "أحد الركّاب يقفز من جرف للتبرّد في نزهة مع Adventure Tours Vernal قرب Vernal في يوتا", caption: "قفزة الجرف للتبرّد" },
  "slide-066": { alt: "مركبات UTV متجاورة متوقفة أسفل قبة من الصخر الأملس قرب Vernal في يوتا", caption: "مركبات UTV في الأسفل" },
  "slide-067": { alt: "مركبة UTV متجاورة زرقاء تعتلي قبة من الصخر الأملس بصحبة مرشد قرب Vernal في يوتا", caption: "اعتلاء الصخر الأملس" },
  "slide-068": { alt: "ثلاث مركبات UTV متجاورة تزحف على الصخور عبر المنطقة الخلفية في يوتا", caption: "ثلاثي الزحف على الصخور" },
  "slide-069": { alt: "ركّاب يستكشفون مساكن الجروف في جولة UTV مع Adventure Tours Vernal", caption: "استكشاف مساكن الجروف" },
  "slide-070": { alt: "قوس طبيعي كبير من الحجر الرملي فوق الوادي في جولة UTV مُرشَدة قرب Vernal في يوتا", caption: "قوس طبيعي من الحجر الرملي" },
  "slide-071": { alt: "مجموعة الجولة عند قوس صخري وقت الغروب قرب Vernal في يوتا", caption: "المجموعة عند القوس وقت الغروب" },
  "slide-072": { alt: "داخل كهف من الحجر الرملي في جولة إلى المنطقة الخلفية مع Adventure Tours Vernal", caption: "داخل الكهف" },
  "slide-073": { alt: "مركبة UTV متجاورة في تسلق نحو قمة من الصخر الأملس قرب Vernal في يوتا", caption: "تسلق قمة الصخر الأملس" },
  "slide-074": { alt: "مركبة UTV متجاورة في مغامرة عبور النهر قرب Vernal في يوتا", caption: "مغامرة عبور النهر" },
  "slide-075": { alt: "مركبة UTV متجاورة متوقفة عند مطل على الأخدود قرب Vernal في يوتا", caption: "المركبة المتوقفة من الجانب" },
  "slide-076": { alt: "مركبة UTV متجاورة تنطلق فوق كثيب رملي قرب Vernal في يوتا", caption: "انطلاقة فوق الكثيب الرملي" },
  "slide-077": { alt: "مركبة UTV متجاورة متوقفة بجوار قوس من الحجر الرملي قرب Vernal في يوتا", caption: "توقف عند القوس" },
  "slide-078": { alt: "قوس ذهبي من الحجر الرملي في جولة UTV إلى المنطقة الخلفية قرب Vernal في يوتا", caption: "القوس الصخري الذهبي" },
  "slide-079": { alt: "فتحة تشبه النافذة في كهف من الحجر الرملي قرب Vernal في يوتا", caption: "نافذة كهف الحجر الرملي" },
  "slide-080": { alt: "مسار بمحاذاة جدار أخدود شاهق قرب Vernal في يوتا", caption: "مسار جدار الأخدود" },
  "slide-081": { alt: "مركبات UTV متجاورة متوقفة تحت قوس من الحجر الرملي قرب Vernal في يوتا", caption: "مركبات UTV تحت القوس" },
  "slide-082": { alt: "داخل كهف من الحجر الرملي في جولة مع Adventure Tours Vernal قرب Vernal في يوتا", caption: "منظر داخل الكهف" },
  "slide-083": { alt: "نتوء صخري شاهق في جولة UTV إلى المنطقة الخلفية قرب Vernal في يوتا", caption: "نتوء صخري شاهق" },
  "slide-084": { alt: "ثلاث مركبات UTV متجاورة على حافة الأخدود قرب Vernal في يوتا", caption: "ثلاث مركبات UTV على حافة الأخدود" },
  "slide-085": { alt: "ثنائي يلتقط صورة عند حافة جرف تطل على الأخدود قرب Vernal في يوتا", caption: "ثنائي عند حافة الجرف" },
  "slide-086": { alt: "مطل خريفي على الأخدود من مسار UTV في المنطقة الخلفية قرب Vernal في يوتا", caption: "مطل الأخدود في الخريف" },
  "slide-087": { alt: "مركبة UTV متجاورة على مسار تحفّه أشجار الحور الرجراج قرب Vernal في يوتا", caption: "جولة بين أشجار الحور الرجراج" },
  "slide-088": { alt: "مركبة UTV متجاورة في هبوط على الصخر الأملس قرب Vernal في يوتا", caption: "هبوط على الصخر الأملس" },
  "slide-089": { alt: "مسار ذهبي بين أشجار الحور الرجراج في مغامرة مُرشَدة بمركبة متجاورة قرب Vernal في يوتا", caption: "مسار الحور الرجراج الذهبي" },
  "slide-090": { alt: "مركبات UTV متجاورة فوق الأخدود في جولة إلى المنطقة الخلفية قرب Vernal في يوتا", caption: "مركبات UTV فوق الأخدود" },
  "slide-091": { alt: "منظر عبر قوس من الحجر الرملي في جولة مع Adventure Tours Vernal قرب Vernal في يوتا", caption: "عبر القوس" },
  "slide-092": { alt: "مركبات UTV متجاورة على الصخر الأملس تحت سماء عاصفة قرب Vernal في يوتا", caption: "الصخر الأملس تحت العاصفة" },
  "slide-093": { alt: "مركبة UTV متجاورة زرقاء تثير الغبار على مسار صحراوي قرب Vernal في يوتا", caption: "غبار المسار الصحراوي" },
  "slide-094": { alt: "من داخل كهف من الحجر الرملي عبر فتحة تشبه النافذة قرب Vernal في يوتا", caption: "داخل كهف من الحجر الرملي" },
  "slide-095": { alt: "مركبات UTV متجاورة عند نقطة انطلاق على قمة الجبل قرب Vernal في يوتا", caption: "نقطة الانطلاق على قمة الجبل" },
  "slide-096": { alt: "ثلاث مركبات UTV متجاورة مصطفة في جولة مُرشَدة قرب Vernal في يوتا", caption: "ثلاث مركبات UTV مصطفة" },
  "slide-097": { alt: "منظر حيد من الصخر الأملس في جولة UTV إلى المنطقة الخلفية قرب Vernal في يوتا", caption: "منظر حيد الصخر الأملس" },
  "slide-098": { alt: "مركبة UTV متجاورة تتسلق الصخر الأملس قرب Vernal في يوتا", caption: "تسلق الصخر الأملس" },
  "slide-099": { alt: "مركبة UTV متجاورة في تسلق على الصخر الأملس تحت سماء عاصفة قرب Vernal في يوتا", caption: "تسلق الصخر الأملس تحت العاصفة" },
  "slide-100": { alt: "مركبة UTV متجاورة تنثر الغبار على مسار صحراوي قرب Vernal في يوتا", caption: "الغبار المتطاير على المسار" },
  "slide-101": { alt: "مركبة UTV متجاورة في تسلق حافة صخرية شديدة الانحدار قرب Vernal في يوتا", caption: "تسلق الحافة شديدة الانحدار" },
  "slide-102": { alt: "مركبة UTV متجاورة تنثر الرمال في منعطف قرب Vernal في يوتا", caption: "منعطف ينثر الرمال" },
  "slide-103": { alt: "مركبة UTV متجاورة ترفع العلم الأمريكي أثناء التوقف قرب Vernal في يوتا", caption: "مركبة UTV بالعلم الأمريكي" },
  "slide-104": { alt: "مركبة UTV متجاورة عند حافة جرف وقت الغسق قرب Vernal في يوتا", caption: "حافة الجرف عند الغسق" },
  "slide-105": { alt: "مركبة UTV متجاورة على خط حيد وقت الشفق في المنطقة الخلفية الصحراوية في يوتا", caption: "خط الحيد وقت الشفق" },
};

/**
 * Locale dictionaries — one per registered locale that RENDERS the gallery
 * (P32 registered them empty, P33 populated them, AR-2 B-0 made the map partial).
 *
 * All eight are COMPLETE: every dictionary carries an entry for all 105 slide
 * ids, so the English fallback in `textFor()` is unreachable for any locale that
 * reaches it. It is kept as a fail-soft guard for an unregistered locale string
 * and for the window between adding a slide to GALLERY_SLIDES and translating it.
 *
 * ── Why this is `Partial<…>` and not `Record<Locale, …>` (AR-2 B-0) ──────────
 * It was total, which encoded a true invariant with one false premise: that every
 * REGISTERED locale RENDERS the gallery. Registration and rendering are different
 * facts, and AR-1 was the first phase to separate them — `ar` is registered with a
 * single policy page and no `/ar/` homepage, so `renderGallery('ar')` is never
 * called and there is nothing for it to fall back from.
 *
 * The total map made registering a locale impossible without first authoring 105
 * slide translations, which silently broke `MULTILINGUAL_HANDOFF.md` §7 stage 1
 * ("register with an empty slug set, confirm the build is unchanged, before any
 * content lands") for EVERY future locale, not just Arabic. It had simply not
 * been noticed because no locale had been registered since P34.
 *
 * Making it partial on its own would trade a false failure for a silent one — the
 * P34 defect back again — so absence is no longer allowed to be silent. A
 * registered locale must appear in EXACTLY ONE of `GALLERY_TEXT` (it renders the
 * gallery and here is its dictionary) or `GALLERY_EXEMPT` (it does not, and here
 * is why). Gate 4j enforces the partition; `renderGallery()` enforces the claim.
 */
const GALLERY_TEXT: Partial<Readonly<Record<Locale, GalleryDictionary>>> = {
  en: GALLERY_TEXT_EN,
  es: GALLERY_TEXT_ES,
  it: GALLERY_TEXT_IT,
  pt: GALLERY_TEXT_PT,
  fr: GALLERY_TEXT_FR,
  de: GALLERY_TEXT_DE,
  ja: GALLERY_TEXT_JA,
  zh: GALLERY_TEXT_ZH,
  ar: GALLERY_TEXT_AR,
};

/**
 * Registered locales that do NOT render the gallery, each with the reason.
 *
 * This is a CLAIM, not a suppression. "This locale ships no page that calls
 * renderGallery()" is falsifiable, and both halves of the framework falsify it:
 *
 *   • Gate 4j (source, pre-build) rejects a locale that is in neither map, in
 *     both, or exempt with an empty reason — and prints the exempt set in its
 *     summary, so an exemption can never sit unread.
 *   • `renderGallery()` (below, at build time) THROWS if it is ever called for an
 *     exempt locale. So the moment someone adds `/ar/index.astro` the build stops
 *     with a message naming this map, instead of quietly shipping 105 English
 *     captions on an Arabic page — which is exactly the P34 defect.
 *
 * An entry here is therefore load-bearing in both directions. Delete it when the
 * locale gains a homepage; the build will tell you the moment you forget.
 *
 * ── EMPTY as of AR-2 Phase F, the final batch ────────────────────────────────
 * `ar` was the only entry this map ever carried, and it named its own removal
 * condition: *"Remove this entry together with the phase that adds an /ar/
 * homepage, and add GALLERY_TEXT_AR in the same change."* That is exactly what
 * happened — `src/pages/ar/index.astro` now exists, so `renderGallery('ar')` is
 * reachable and the throw above it would have fired on the first build if the
 * dictionary had not landed with it. The claim was falsifiable and it was
 * falsified on schedule.
 *
 * The map stays. It is empty, not deleted: `Partial<…>` on GALLERY_TEXT means
 * absence is legal in the type system, and this map plus gate 4j is the only
 * thing that makes absence *declared* rather than silent. Deleting it would put
 * the P34 defect back the day a tenth locale registers.
 */
export const GALLERY_EXEMPT: Readonly<Record<string, string>> = {};

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
  // The exemption in GALLERY_EXEMPT asserts that this is unreachable for that
  // locale. Verifying the assertion here is what keeps the partial GALLERY_TEXT
  // honest: without it, adding a homepage for an exempt locale would ship 105
  // English captions under a translated page and pass every gate.
  if (locale in GALLERY_EXEMPT) {
    throw new Error(
      `renderGallery("${locale}") — "${locale}" is declared in GALLERY_EXEMPT ` +
      `(src/page-content/home-gallery.ts) as a locale that renders no gallery, but a page ` +
      `just asked for one. Add GALLERY_TEXT_${locale.toUpperCase()} and remove the exemption ` +
      `in the same change; do not delete this check. Reason on record: ${GALLERY_EXEMPT[locale]}`
    );
  }
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
