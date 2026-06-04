// src/data/business.ts
// SINGLE SOURCE OF TRUTH for NAP, hours, pricing (runbook Part 3).
// Values copied VERBATIM from the live site during migration.
// NOTE: the live site lists $349/machine and $125 ride-along. If those
// figures are out of date, change them HERE once and every page/schema
// updates together — that is the whole point of centralizing them.
export const BUSINESS = {
  name: 'Adventure Tours Vernal',
  legalName: 'Adventure Tours Vernal',
  phoneDisplay: '(435) 219-9447',
  phoneHref: 'tel:435-219-9447',
  phoneSchema: '+1-435-219-9447',
  email: 'info@adventuretoursvernal.com',
  url: 'https://adventuretoursvernal.com',
  street: '1935 S 1500 E',
  city: 'Vernal',
  region: 'UT',
  postal: '84078',
  country: 'US',
  geo: { lat: 40.4555, lng: -109.5287 },
  hoursDisplay: 'Open Daily 7am – 7pm',
  hoursOpen: '07:00',
  hoursClose: '19:00',
  rating: { value: '5.0', count: '82' },
  pricing: {
    perMachine: '$349',
    rideAlong: '$125',
  },
} as const;
