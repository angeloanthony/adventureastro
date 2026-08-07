// src/config/weather-locations.ts — the stations the header weather strip reads.
//
// WHY THIS IS A CONFIG AND NOT A LOOKUP FROM `hubs.ts`. The hub registry is a
// URL/content structure: it answers "what pages exist". A weather station answers
// "what point on the map does a rider stand on", and the two do not line up —
// `things-to-do` is a hub with no coordinate, and Jones Hole is a coordinate with
// no hub. Deriving one from the other would force a fake coordinate onto every
// hub or a fake hub onto every coordinate. They are separate facts, so they get
// separate registries.
//
// PLACE NAMES ARE NOT TRANSLATED, IN ANY LOCALE. This follows the terminology
// lock already applied across `src/lib/ui.ts`: `hub.dinosaur-national-monument`
// is `Dinosaur National Monument` verbatim in the ar, ja and zh dictionaries.
// One deliberate exception is carried here for exactly the reason the JA
// place-name policy records: `Vernal` — the town the whole site is about — is the
// one settlement name Japanese localizes (`バーナル`), so `jaName` exists for it
// and for nothing else. A station without `jaName` renders Latin everywhere.
//
// A LATIN NAME INSIDE ARABIC PROSE IS NOT AUTOMATICALLY A HAZARD (see
// `src/lib/bidi.ts` finding 2: an interior space resolves by rule N1). These names
// are isolated anyway, because they render adjacent to a temperature — a digit run
// — and a Latin run touching a digit run in an RTL paragraph is the N2 case the
// formatter exists for.
//
// COORDINATES are the point a visitor actually goes to (a trailhead, a dam, a
// visitor centre), not a county centroid: Open-Meteo interpolates to its model
// grid, and on the Uinta Basin's terrain a 20-mile error is a 2,000-foot
// elevation error, which is a different forecast.

export interface WeatherStation {
  /** Stable key. Used for nothing but debugging and cache shape today. */
  id: string;
  /** Display name. Latin, verbatim, every locale (see header note). */
  name: string;
  /** Japanese override, per the JA place-name policy. Only `Vernal` has one. */
  jaName?: string;
  lat: number;
  lon: number;
}

export const WEATHER_STATIONS: readonly WeatherStation[] = [
  // The town itself. Coordinate is SITE.geo, so the strip and the LocalBusiness
  // schema cannot disagree about where the business is.
  { id: 'vernal', name: 'Vernal, UT', jaName: 'バーナル', lat: 40.4555, lon: -109.5287 },
  // Quarry Exhibit Hall, Jensen — the side of the monument most visitors drive to.
  { id: 'dinosaur-national-monument', name: 'Dinosaur National Monument', lat: 40.4386, lon: -109.3018 },
  // Flaming Gorge Dam, Dutch John. 2,000 ft above Vernal and routinely a
  // different sky, which is the entire reason a multi-station strip is useful here.
  { id: 'flaming-gorge', name: 'Flaming Gorge', lat: 40.9155, lon: -109.4218 },
  { id: 'red-fleet', name: 'Red Fleet State Park', lat: 40.5808, lon: -109.43 },
  { id: 'steinaker', name: 'Steinaker State Park', lat: 40.5119, lon: -109.54 },
  // Red Cloud Loop high country (East Park Reservoir), the ATV/UTV ground.
  { id: 'ashley-national-forest', name: 'Ashley National Forest', lat: 40.6714, lon: -109.6383 },
  { id: 'jones-hole', name: 'Jones Hole', lat: 40.5877, lon: -109.0567 },
  { id: 'split-mountain', name: 'Split Mountain', lat: 40.4442, lon: -109.253 },
];
