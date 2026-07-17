// src/lib/ui.ts — the shared UI-chrome dictionary + t() translator.
//
// P2B FRAMEWORK. This is the ONE authoritative source for every repeated
// chrome string (nav, footer, CTAs, section headings, component labels, hub
// display names). Page BODY copy does NOT belong here — that is per-page
// content (P2C). Route each string to exactly one source (playbook §2, §7):
// chrome → here; body copy → page content; NAP/prices/fleet → src/config/site.ts.
//
// Only English exists today, so t() always returns the English value and the
// rendered output is byte-identical to the pre-P2B site. When a locale's
// dictionary is added under UI_STRINGS[code], every wired string localizes with
// no component change — existence-aware, exactly like the P1 routing infra.
//
// NEVER translate (keep in the English value verbatim, or leave as literal
// markup outside t()): brand, NAP, prices, fleet, place names, people, URLs,
// tags, and HTML entities like &middot; / &rarr; / &#9662; (kept as markup).
import { DEFAULT_LOCALE, type Locale } from './i18n';

type Dict = Record<string, string>;

// English master dictionary. Values are copied verbatim from the components so
// wiring them through t() changes nothing visible. Keys use dot-namespaces.
const EN: Dict = {
  // — Navigation (Header, Breadcrumbs, 404's own nav) —
  'nav.home': 'Home',
  'nav.about': 'About',
  'nav.trails': 'Trails',
  'nav.thingsToDo': 'Things to Do',
  'nav.dinosaurMonument': 'Dinosaur Monument',
  'nav.guides': 'Guides',
  'nav.food': 'Food',
  'nav.info': 'Info',
  'nav.cancellationPolicy': 'Cancellation Policy',
  'nav.privacyPolicy': 'Privacy Policy',
  'nav.faq': 'FAQ',
  'nav.safetyGuidelines': 'Safety Guidelines',
  'nav.whatToBring': 'What to Bring',
  'nav.itineraries': 'Itineraries',

  // — CTAs —
  'cta.bookNow': 'Book Now',
  'cta.bookYourAdventure': 'Book Your Adventure',

  // — Accessibility (aria-labels) —
  'a11y.toggleMenu': 'Toggle menu',
  'a11y.breadcrumb': 'Breadcrumb',
  'a11y.relatedArticles': 'Related articles',
  'a11y.allArticlesInHub': 'All articles in this hub',
  'a11y.keyTakeaways': 'Key takeaways',
  'a11y.relatedGuides': 'Related guides',

  // — Section headings (layouts + shared components) —
  'section.faq': 'Frequently Asked Questions',
  'section.exploreThisHub': 'Explore This Hub',
  'section.youMightAlsoLike': 'You Might Also Like',
  'section.keyTakeaways': 'Key Takeaways',
  'section.exploreVernal': 'Explore Vernal',
  'section.moreVernalGuides': 'More Vernal Guides',

  // — Footer chrome (defaults; place-name trail labels stay literal) —
  'footer.tagline': "Experience the adventure of a lifetime in Utah's dinosaur country.",
  'footer.ourTrails': 'Our Trails',
  'footer.information': 'Information',
  'footer.contactInfo': 'Contact Info',
  'footer.copyrightSuffix': ' - All rights reserved.',
  'footer.link.utvTrailsTours': 'UTV Trails & Tours',
  'footer.link.thingsToDo': 'Things to Do',
  'footer.link.dinosaurNationalMonument': 'Dinosaur National Monument',
  'footer.link.guides': 'Guides',
  'footer.link.visitingFromSLC': 'Visiting from Salt Lake City',
  // — Footer "Quick Links" group (the short-policy-page footer variant:
  // about/faq/safety/privacy/cancellation) —
  'footer.quickLinks': 'Quick Links',
  'footer.link.ourTours': 'Our Tours',
  'footer.link.ourFleet': 'Our Fleet',
  'footer.link.photoGallery': 'Photo Gallery',

  // — TourCta (sitewide conversion block) —
  'tour.value.family': 'The way most families cap off their Vernal trip.',
  'tour.value.adventure': 'Guided Kawasaki KRX 1000 tours through Dinosaur Country.',
  'tour.value.sunset': 'Golden-hour trails, petroglyphs, and backcountry overlooks.',
  'tour.value.generic': 'Guided UTV tours through Dinosaur Country.',
  'tour.callForPricing': 'Call for pricing',
  'tour.threeHours': '3 hours',
  'tour.upToRiders': 'up to {n} riders',

  // — TrustBadge (social proof) —
  'reviews.googleReviews': 'Google reviews',
  'reviews.ratedAria': 'Rated {value} out of 5 from {count} Google reviews',

  // — AuthorByline + AuthorLayout —
  'author.writtenBy': 'Written by',
  'author.updated': 'Updated',
  'author.areasOfExpertise': 'Areas of Expertise',
  'author.credentials': 'Credentials & Experience',
  'author.aboutBusiness': 'About Adventure Tours Vernal',
  'author.articlesBy': 'Articles by {name}',

  // — ItineraryDay —
  'time.morning': 'morning',
  'time.lunch': 'lunch',
  'time.afternoon': 'afternoon',
  'time.dinner': 'dinner',
  'time.evening': 'evening',
  'itinerary.weatherBackup': 'Weather backup plan',

  // — GatewayRoutes —
  'gateway.heading': 'Coming from out of town? Start with your gateway route.',
  'gateway.note.saltLakeCity': 'The classic ~3-hour approach over the Uintas.',
  'gateway.note.denver': 'A half-day Rocky Mountain road trip west.',
  'gateway.note.grandJunction': 'The closest Colorado gateway.',
  'gateway.seeAllItineraries': 'See all Vernal itineraries',

  // — TourDecisionGuide —
  'decision.heading': 'Not sure which tour? Start here.',
  'decision.intro': "Tell us what matters most and we'll point you to the right guide.",
  'decision.q.firstTime': 'First time riding?',
  'decision.a.firstTime': "Start with the beginner's guide",
  'decision.q.children': 'Bringing children?',
  'decision.a.children': 'See the family UTV guide',
  'decision.q.couple': 'Traveling as a couple?',
  'decision.a.couple': 'Book a private tour for two',
  'decision.q.scenery': 'Looking for scenery?',
  'decision.a.scenery': 'Compare the most scenic trails',
  'decision.q.history': 'Looking for history?',
  'decision.a.history': 'Explore petroglyphs & rock art',
  'decision.q.adventure': 'Want maximum adventure?',
  'decision.a.adventure': 'Go remote on a backcountry tour',
  'decision.q.shortTime': 'Short on time?',
  'decision.a.shortTime': 'Book the next 3-hour tour',
  'decision.q.group': 'Large group?',
  'decision.a.group': 'Plan a group tour',

  // — CityLayout QuickFacts labels —
  'city.driveTime': 'Drive time',
  'city.distance': 'Distance',
  'city.route': 'Route',
  'city.nearestAirport': 'Nearest airport',

  // — Hub display names (single source for hubName(); mirror src/lib/hubs.ts) —
  'hub.utv': 'UTV Trails & Tours',
  'hub.atv': 'ATV Trails',
  'hub.jeep': 'Jeep Trails',
  'hub.dinosaur-national-monument': 'Dinosaur National Monument',
  'hub.things-to-do': 'Things to Do in Vernal',
  'hub.hiking': 'Hiking',
  'hub.camping': 'Camping',
  'hub.fishing': 'Fishing',
  'hub.scenic-drives': 'Scenic Drives',
  'hub.guides': 'Destination Guides',
};

// Spanish chrome dictionary (P3A). Formal "usted" register. Keys mirror EN
// 1:1 — master-fallback in t() covers any key added to EN before its
// Spanish counterpart lands. Brand, NAP, prices, fleet, place names, and
// people stay in the English value (never present here) per the
// multilingual handoff's proper-noun policy.
const ES: Dict = {
  'nav.home': 'Inicio',
  'nav.about': 'Acerca de',
  'nav.trails': 'Senderos',
  'nav.thingsToDo': 'Qué Hacer',
  'nav.dinosaurMonument': 'Monumento a los Dinosaurios',
  'nav.guides': 'Guías',
  'nav.food': 'Comida',
  'nav.info': 'Información',
  'nav.cancellationPolicy': 'Política de Cancelación',
  'nav.privacyPolicy': 'Política de Privacidad',
  'nav.faq': 'Preguntas Frecuentes',
  'nav.safetyGuidelines': 'Normas de Seguridad',
  'nav.whatToBring': 'Qué Llevar',
  'nav.itineraries': 'Itinerarios',

  'cta.bookNow': 'Reservar Ahora',
  'cta.bookYourAdventure': 'Reserve Su Aventura',

  'a11y.toggleMenu': 'Alternar menú',
  'a11y.breadcrumb': 'Ruta de navegación',
  'a11y.relatedArticles': 'Artículos relacionados',
  'a11y.allArticlesInHub': 'Todos los artículos de esta categoría',
  'a11y.keyTakeaways': 'Puntos clave',
  'a11y.relatedGuides': 'Guías relacionadas',

  'section.faq': 'Preguntas Frecuentes',
  'section.exploreThisHub': 'Explore Esta Categoría',
  'section.youMightAlsoLike': 'También le Podría Interesar',
  'section.keyTakeaways': 'Puntos Clave',
  'section.exploreVernal': 'Explore Vernal',
  'section.moreVernalGuides': 'Más Guías de Vernal',

  'footer.tagline': 'Viva la aventura de su vida en la tierra de los dinosaurios de Utah.',
  'footer.ourTrails': 'Nuestros Senderos',
  'footer.information': 'Información',
  'footer.contactInfo': 'Información de Contacto',
  'footer.copyrightSuffix': ' - Todos los derechos reservados.',
  'footer.link.utvTrailsTours': 'Senderos y Tours en UTV',
  'footer.link.thingsToDo': 'Qué Hacer',
  'footer.link.dinosaurNationalMonument': 'Monumento Nacional a los Dinosaurios',
  'footer.link.guides': 'Guías',
  'footer.link.visitingFromSLC': 'Visitando desde Salt Lake City',
  'footer.quickLinks': 'Enlaces Rápidos',
  'footer.link.ourTours': 'Nuestros Tours',
  'footer.link.ourFleet': 'Nuestra Flota',
  'footer.link.photoGallery': 'Galería de Fotos',

  'tour.value.family': 'La forma en que la mayoría de las familias culminan su viaje a Vernal.',
  'tour.value.adventure': 'Tours guiados en Kawasaki KRX 1000 por la Tierra de los Dinosaurios.',
  'tour.value.sunset': 'Senderos al atardecer, petroglifos y miradores de la zona agreste.',
  'tour.value.generic': 'Tours guiados en UTV por la Tierra de los Dinosaurios.',
  'tour.callForPricing': 'Llame para conocer los precios',
  'tour.threeHours': '3 horas',
  'tour.upToRiders': 'hasta {n} pasajeros',

  'reviews.googleReviews': 'reseñas de Google',
  'reviews.ratedAria': 'Calificado con {value} de 5 según {count} reseñas de Google',

  'author.writtenBy': 'Escrito por',
  'author.updated': 'Actualizado',
  'author.areasOfExpertise': 'Áreas de Especialización',
  'author.credentials': 'Credenciales y Experiencia',
  'author.aboutBusiness': 'Acerca de Adventure Tours Vernal',
  'author.articlesBy': 'Artículos de {name}',

  'time.morning': 'mañana',
  'time.lunch': 'almuerzo',
  'time.afternoon': 'tarde',
  'time.dinner': 'cena',
  'time.evening': 'noche',
  'itinerary.weatherBackup': 'Plan alternativo por clima',

  'gateway.heading': '¿Viene de fuera de la ciudad? Comience por su ruta de acceso.',
  'gateway.note.saltLakeCity': 'El clásico recorrido de ~3 horas sobre las montañas Uinta.',
  'gateway.note.denver': 'Una excursión de medio día por las Montañas Rocosas.',
  'gateway.note.grandJunction': 'La puerta de entrada más cercana desde Colorado.',
  'gateway.seeAllItineraries': 'Vea todos los itinerarios de Vernal',

  'decision.heading': '¿No sabe qué tour elegir? Comience aquí.',
  'decision.intro': 'Cuéntenos qué es lo más importante para usted y lo dirigiremos a la guía correcta.',
  'decision.q.firstTime': '¿Es su primera vez montando?',
  'decision.a.firstTime': 'Comience con la guía para principiantes',
  'decision.q.children': '¿Viaja con niños?',
  'decision.a.children': 'Vea la guía familiar de UTV',
  'decision.q.couple': '¿Viaja en pareja?',
  'decision.a.couple': 'Reserve un tour privado para dos',
  'decision.q.scenery': '¿Busca paisajes espectaculares?',
  'decision.a.scenery': 'Compare los senderos más pintorescos',
  'decision.q.history': '¿Busca historia?',
  'decision.a.history': 'Explore los petroglifos y el arte rupestre',
  'decision.q.adventure': '¿Quiere la máxima aventura?',
  'decision.a.adventure': 'Vaya a lo remoto en un tour por la zona agreste',
  'decision.q.shortTime': '¿Tiene poco tiempo?',
  'decision.a.shortTime': 'Reserve el próximo tour de 3 horas',
  'decision.q.group': '¿Grupo grande?',
  'decision.a.group': 'Planifique un tour grupal',

  'city.driveTime': 'Tiempo de manejo',
  'city.distance': 'Distancia',
  'city.route': 'Ruta',
  'city.nearestAirport': 'Aeropuerto más cercano',

  'hub.utv': 'Senderos y Tours en UTV',
  'hub.atv': 'Senderos para ATV',
  'hub.jeep': 'Senderos para Jeep',
  'hub.dinosaur-national-monument': 'Monumento Nacional a los Dinosaurios',
  'hub.things-to-do': 'Qué Hacer en Vernal',
  'hub.hiking': 'Senderismo',
  'hub.camping': 'Acampar',
  'hub.fishing': 'Pesca',
  'hub.scenic-drives': 'Rutas Panorámicas',
  'hub.guides': 'Guías del Destino',
};

// Italian chrome dictionary (P6, mirrors Spanish P3A). Formal "Lei" register.
// Keys mirror EN 1:1 — master-fallback in t() covers any key added to EN
// before its Italian counterpart lands. Brand, NAP, prices, fleet, place
// names, and people stay in the English value (never present here) per the
// multilingual handoff's proper-noun policy.
const IT: Dict = {
  'nav.home': 'Home',
  'nav.about': 'Chi Siamo',
  'nav.trails': 'Sentieri',
  'nav.thingsToDo': 'Cosa Fare',
  'nav.dinosaurMonument': 'Dinosaur Monument',
  'nav.guides': 'Guide',
  'nav.food': 'Ristoranti',
  'nav.info': 'Informazioni',
  'nav.cancellationPolicy': 'Politica di Cancellazione',
  'nav.privacyPolicy': 'Informativa sulla Privacy',
  'nav.faq': 'Domande Frequenti',
  'nav.safetyGuidelines': 'Norme di Sicurezza',
  'nav.whatToBring': 'Cosa Portare',
  'nav.itineraries': 'Itinerari',

  'cta.bookNow': 'Prenoti Ora',
  'cta.bookYourAdventure': 'Prenoti la Sua Avventura',

  'a11y.toggleMenu': 'Attiva/disattiva menu',
  'a11y.breadcrumb': 'Percorso di navigazione',
  'a11y.relatedArticles': 'Articoli correlati',
  'a11y.allArticlesInHub': 'Tutti gli articoli di questa categoria',
  'a11y.keyTakeaways': 'Punti chiave',
  'a11y.relatedGuides': 'Guide correlate',

  'section.faq': 'Domande Frequenti',
  'section.exploreThisHub': 'Esplori Questa Categoria',
  'section.youMightAlsoLike': 'Potrebbe InteressarLe Anche',
  'section.keyTakeaways': 'Punti Chiave',
  'section.exploreVernal': 'Esplori Vernal',
  'section.moreVernalGuides': 'Altre Guide su Vernal',

  'footer.tagline': "Viva l'avventura di una vita nella terra dei dinosauri dello Utah.",
  'footer.ourTrails': 'I Nostri Sentieri',
  'footer.information': 'Informazioni',
  'footer.contactInfo': 'Informazioni di Contatto',
  'footer.copyrightSuffix': ' - Tutti i diritti riservati.',
  'footer.link.utvTrailsTours': 'Sentieri e Tour in UTV',
  'footer.link.thingsToDo': 'Cosa Fare',
  'footer.link.dinosaurNationalMonument': 'Dinosaur National Monument',
  'footer.link.guides': 'Guide',
  'footer.link.visitingFromSLC': 'In Visita da Salt Lake City',
  'footer.quickLinks': 'Link Rapidi',
  'footer.link.ourTours': 'I Nostri Tour',
  'footer.link.ourFleet': 'La Nostra Flotta',
  'footer.link.photoGallery': 'Galleria Fotografica',

  'tour.value.family': 'Il modo in cui la maggior parte delle famiglie conclude il proprio viaggio a Vernal.',
  'tour.value.adventure': 'Tour guidati su Kawasaki KRX 1000 nella Terra dei Dinosauri.',
  'tour.value.sunset': "Sentieri all'ora dorata, petroglifi e punti panoramici nel backcountry.",
  'tour.value.generic': 'Tour guidati in UTV nella Terra dei Dinosauri.',
  'tour.callForPricing': 'Chiami per i prezzi',
  'tour.threeHours': '3 ore',
  'tour.upToRiders': 'fino a {n} passeggeri',

  'reviews.googleReviews': 'recensioni Google',
  'reviews.ratedAria': 'Valutato {value} su 5 in base a {count} recensioni Google',

  'author.writtenBy': 'Scritto da',
  'author.updated': 'Aggiornato',
  'author.areasOfExpertise': 'Aree di Competenza',
  'author.credentials': 'Credenziali ed Esperienza',
  'author.aboutBusiness': 'Chi è Adventure Tours Vernal',
  'author.articlesBy': 'Articoli di {name}',

  'time.morning': 'mattina',
  'time.lunch': 'pranzo',
  'time.afternoon': 'pomeriggio',
  'time.dinner': 'cena',
  'time.evening': 'sera',
  'itinerary.weatherBackup': 'Piano alternativo in caso di maltempo',

  'gateway.heading': 'Viene da fuori città? Inizi dal Suo percorso di accesso.',
  'gateway.note.saltLakeCity': "Il classico percorso di ~3 ore attraverso gli Uinta.",
  'gateway.note.denver': 'Una gita di mezza giornata attraverso le Montagne Rocciose.',
  'gateway.note.grandJunction': "La porta d'accesso più vicina dal Colorado.",
  'gateway.seeAllItineraries': 'Veda tutti gli itinerari di Vernal',

  'decision.heading': 'Non è sicuro di quale tour scegliere? Inizi da qui.',
  'decision.intro': 'Ci dica cosa conta di più per Lei e La indirizzeremo alla guida giusta.',
  'decision.q.firstTime': 'È la Sua prima volta in UTV?',
  'decision.a.firstTime': 'Inizi con la guida per principianti',
  'decision.q.children': 'Viaggia con bambini?',
  'decision.a.children': 'Veda la guida UTV per famiglie',
  'decision.q.couple': 'Viaggia in coppia?',
  'decision.a.couple': 'Prenoti un tour privato per due',
  'decision.q.scenery': 'Cerca paesaggi spettacolari?',
  'decision.a.scenery': 'Confronti i sentieri più panoramici',
  'decision.q.history': 'Cerca storia?',
  'decision.a.history': 'Esplori petroglifi e arte rupestre',
  'decision.q.adventure': 'Vuole la massima avventura?',
  'decision.a.adventure': 'Vada nel backcountry con un tour remoto',
  'decision.q.shortTime': 'Ha poco tempo a disposizione?',
  'decision.a.shortTime': 'Prenoti il prossimo tour di 3 ore',
  'decision.q.group': 'Gruppo numeroso?',
  'decision.a.group': 'Pianifichi un tour di gruppo',

  'city.driveTime': 'Tempo di guida',
  'city.distance': 'Distanza',
  'city.route': 'Percorso',
  'city.nearestAirport': 'Aeroporto più vicino',

  'hub.utv': 'Sentieri e Tour in UTV',
  'hub.atv': 'Sentieri per ATV',
  'hub.jeep': 'Sentieri per Jeep',
  'hub.dinosaur-national-monument': 'Dinosaur National Monument',
  'hub.things-to-do': 'Cosa Fare a Vernal',
  'hub.hiking': 'Escursionismo',
  'hub.camping': 'Campeggio',
  'hub.fishing': 'Pesca',
  'hub.scenic-drives': 'Strade Panoramiche',
  'hub.guides': 'Guide sulla Destinazione',
};

// One entry per locale. pt still ships English PLACEHOLDER values (P2D)
// until its own translation batch — master-fallback in t() covers any
// gap. es (P3A) and it (P6) are now real dictionaries.
const UI_STRINGS: Partial<Record<Locale, Dict>> = {
  en: EN,
  es: ES,
  it: IT,
  pt: { ...EN },
};

/**
 * Translate a UI-chrome key. Returns the locale's value, else the English
 * master, else the key itself (so a missing key is visible, never crashes).
 * `vars` fills `{placeholder}` tokens (e.g. t('tour.upToRiders', lang, { n: 2 })).
 */
export function t(key: string, lang: string = DEFAULT_LOCALE, vars?: Record<string, string | number>): string {
  const dict = UI_STRINGS[lang as Locale] ?? EN;
  let s = dict[key] ?? EN[key] ?? key;
  if (vars) for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, String(v));
  return s;
}

/**
 * Localized hub display name. Single source for the label that renders in
 * breadcrumbs, pillar cross-links, and footers. Slug stays language-invariant
 * (it is the URL/collection); only the visible name localizes.
 */
export function hubName(hub: string, lang: string = DEFAULT_LOCALE): string {
  return t(`hub.${hub}`, lang);
}
