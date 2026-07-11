// src/config/site.ts
// SINGLE SOURCE OF TRUTH for business facts (Build Guide §3.3).
// Every component and page should read from here instead of hardcoding
// NAP, hours, or pricing. Any change to pricing or fleet must be updated
// here (and only here) — one edit propagates everywhere (Guide §1.3).
export const SITE = {
  name: 'Adventure Tours Vernal',
  legalName: 'Adventure Tours Vernal',
  url: 'https://adventuretoursvernal.com',

  phoneDisplay: '(435) 219-9447',
  phoneHrefDash: 'tel:435-219-9447',
  phoneHrefPlus: 'tel:+14352199447',
  phoneSchema: '+1-435-219-9447',
  email: 'adventuretoursvernal@gmail.com',

  address: {
    street: '1935 S 1500 E',
    city: 'Vernal',
    region: 'UT',
    postalCode: '84078',
    country: 'US',
  },
  geo: { lat: 40.4555, lng: -109.5287 },

  hoursDisplay: 'Open Daily 7am – 7pm',
  hoursOpen: '07:00',
  hoursClose: '19:00',

  rating: { value: '5.0', count: '82' },

  // PRICING — UNRESOLVED CONFLICT (see PROJECT_STATE.md "Open Decisions").
  // Live pages currently show $349/machine + $125 ride-along. Build Guide
  // §1.3 specifies $299/machine + $100 ride-along + $99/hr overage. Do not
  // guess which is correct — confirm with the business owner, then fill
  // these in. Nothing should read from this block until it's resolved.
  pricing: {
    baseTour: null as number | null, // TODO: confirm — repo shows 349, guide specifies 299
    rideAlong: null as number | null, // TODO: confirm — repo shows 125, guide specifies 100
    overagePerHour: null as number | null, // TODO: confirm — guide specifies 99, not present in repo
    currency: 'USD',
  },

  fleet: {
    vehicle: 'Kawasaki KRX 1000',
    count: 6,
    suspension: 'FOX 2.5 PODIUM LSC shocks',
    seatsPerMachine: 2,
  },
  minGroup: 3,
  maxGroup: 12,
  owners: ['Dave Wilson', 'Trudy Wilson'],

  // Root-relative so CTAs work from nested routes (correction #1).
  // Directory URL per the G2 decision (2026-07-10).
  booking: {
    path: '/booking/',
  },

  social: {
    facebook: '',
    instagram: '',
    youtube: '',
  },

  crossPromoPartner: {
    name: 'High Class Limousine Services',
    url: 'https://highclasslimousineservices.com',
  },
} as const;
