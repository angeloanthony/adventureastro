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
  'a11y.languageMenu': 'Language',
  'a11y.breadcrumb': 'Breadcrumb',
  'a11y.relatedArticles': 'Related articles',
  'a11y.allArticlesInHub': 'All articles in this hub',
  'a11y.keyTakeaways': 'Key takeaways',
  'a11y.relatedGuides': 'Related guides',
  'a11y.playVideo': 'Play video: {title}',

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
  // Unit-bearing VALUES, not just labels: a localized label over an English
  // value ("Fahrzeit → 3 hours") is the leak Gate 4a part (b) exists to catch.
  'city.driveTimeValue': '{n} hours',
  'city.distanceValue': '{n} miles',

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

  // — Header weather strip (WeatherTicker) —
  // Station NAMES are deliberately absent: they are proper nouns and live in
  // src/config/weather-locations.ts, Latin and verbatim in every locale, for
  // the same reason 'hub.dinosaur-national-monument' is untranslated below.
  // The condition keys are WMO code GROUPS, not codes — the mapping from the
  // 28 codes Open-Meteo can return to these 12 labels is the component's.
  'wx.region': 'Live weather across Vernal and dinosaur country',
  'wx.live': 'LIVE',
  'wx.loading': 'Loading live conditions…',
  'wx.error': 'Live conditions are temporarily unavailable.',
  'wx.feelsLike': 'Feels like',
  'wx.wind': 'Wind',
  'wx.humidity': 'Humidity',
  'wx.precip': 'Chance of precipitation',
  'wx.visibility': 'Visibility',
  'wx.cond.clear': 'Clear',
  'wx.cond.mainlyClear': 'Mainly clear',
  'wx.cond.partly': 'Partly cloudy',
  'wx.cond.overcast': 'Overcast',
  'wx.cond.fog': 'Fog',
  'wx.cond.drizzle': 'Drizzle',
  'wx.cond.rain': 'Rain',
  'wx.cond.freezingRain': 'Freezing rain',
  'wx.cond.snow': 'Snow',
  'wx.cond.showers': 'Showers',
  'wx.cond.snowShowers': 'Snow showers',
  'wx.cond.thunder': 'Thunderstorm',
  'wx.dir.n': 'N',
  'wx.dir.ne': 'NE',
  'wx.dir.e': 'E',
  'wx.dir.se': 'SE',
  'wx.dir.s': 'S',
  'wx.dir.sw': 'SW',
  'wx.dir.w': 'W',
  'wx.dir.nw': 'NW',
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
  'a11y.languageMenu': 'Idioma',
  'a11y.breadcrumb': 'Ruta de navegación',
  'a11y.relatedArticles': 'Artículos relacionados',
  'a11y.allArticlesInHub': 'Todos los artículos de esta categoría',
  'a11y.keyTakeaways': 'Puntos clave',
  'a11y.relatedGuides': 'Guías relacionadas',
  'a11y.playVideo': 'Reproducir video: {title}',

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
  'city.driveTimeValue': '{n} horas',
  'city.distanceValue': '{n} millas',

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

  // — Franja meteorológica del encabezado —
  'wx.region': 'Clima en vivo en Vernal y la región de los dinosaurios',
  'wx.live': 'EN VIVO',
  'wx.loading': 'Cargando las condiciones en vivo…',
  'wx.error': 'Las condiciones en vivo no están disponibles en este momento.',
  'wx.feelsLike': 'Sensación',
  'wx.wind': 'Viento',
  'wx.humidity': 'Humedad',
  'wx.precip': 'Probabilidad de precipitación',
  'wx.visibility': 'Visibilidad',
  'wx.cond.clear': 'Despejado',
  'wx.cond.mainlyClear': 'Mayormente despejado',
  'wx.cond.partly': 'Parcialmente nublado',
  'wx.cond.overcast': 'Nublado',
  'wx.cond.fog': 'Niebla',
  'wx.cond.drizzle': 'Llovizna',
  'wx.cond.rain': 'Lluvia',
  'wx.cond.freezingRain': 'Lluvia helada',
  'wx.cond.snow': 'Nieve',
  'wx.cond.showers': 'Chubascos',
  'wx.cond.snowShowers': 'Chubascos de nieve',
  'wx.cond.thunder': 'Tormenta eléctrica',
  // Los puntos hacia el oeste divergen del inglés: O (Oeste), no W.
  'wx.dir.n': 'N',
  'wx.dir.ne': 'NE',
  'wx.dir.e': 'E',
  'wx.dir.se': 'SE',
  'wx.dir.s': 'S',
  'wx.dir.sw': 'SO',
  'wx.dir.w': 'O',
  'wx.dir.nw': 'NO',
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
  'a11y.languageMenu': 'Lingua',
  'a11y.breadcrumb': 'Percorso di navigazione',
  'a11y.relatedArticles': 'Articoli correlati',
  'a11y.allArticlesInHub': 'Tutti gli articoli di questa categoria',
  'a11y.keyTakeaways': 'Punti chiave',
  'a11y.relatedGuides': 'Guide correlate',
  'a11y.playVideo': 'Riproduci il video: {title}',

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
  'city.driveTimeValue': '{n} ore',
  'city.distanceValue': '{n} miglia',

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

  // — Striscia meteo dell'intestazione —
  'wx.region': 'Meteo in tempo reale a Vernal e nella terra dei dinosauri',
  'wx.live': 'LIVE',
  'wx.loading': 'Caricamento delle condizioni in tempo reale…',
  'wx.error': 'Le condizioni in tempo reale non sono al momento disponibili.',
  'wx.feelsLike': 'Percepita',
  'wx.wind': 'Vento',
  'wx.humidity': 'Umidità',
  'wx.precip': 'Probabilità di precipitazioni',
  'wx.visibility': 'Visibilità',
  'wx.cond.clear': 'Sereno',
  'wx.cond.mainlyClear': 'Quasi sereno',
  'wx.cond.partly': 'Poco nuvoloso',
  'wx.cond.overcast': 'Coperto',
  'wx.cond.fog': 'Nebbia',
  'wx.cond.drizzle': 'Pioviggine',
  'wx.cond.rain': 'Pioggia',
  'wx.cond.freezingRain': 'Pioggia gelata',
  'wx.cond.snow': 'Neve',
  'wx.cond.showers': 'Rovesci',
  'wx.cond.snowShowers': 'Rovesci di neve',
  'wx.cond.thunder': 'Temporale',
  // I punti verso ovest divergono dall'inglese: O (Ovest), non W.
  'wx.dir.n': 'N',
  'wx.dir.ne': 'NE',
  'wx.dir.e': 'E',
  'wx.dir.se': 'SE',
  'wx.dir.s': 'S',
  'wx.dir.sw': 'SO',
  'wx.dir.w': 'O',
  'wx.dir.nw': 'NO',
};

// Portuguese chrome dictionary (P7A infra). European Portuguese (pt-PT),
// informal "tu" register (owner-confirmed 2026-07-16 — a deliberate
// departure from the formal ES "usted" / IT "Lei" precedent). Keys mirror
// EN 1:1 — master-fallback in t() covers any key added to EN before its
// Portuguese counterpart lands. Brand, NAP, prices, fleet, place names, and
// people stay in the English value (never present here) per the
// multilingual handoff's proper-noun policy.
const PT: Dict = {
  'nav.home': 'Início',
  'nav.about': 'Sobre',
  'nav.trails': 'Trilhos',
  'nav.thingsToDo': 'O Que Fazer',
  'nav.dinosaurMonument': 'Dinosaur Monument',
  'nav.guides': 'Guias',
  'nav.food': 'Restaurantes',
  'nav.info': 'Informações',
  'nav.cancellationPolicy': 'Política de Cancelamento',
  'nav.privacyPolicy': 'Política de Privacidade',
  'nav.faq': 'Perguntas Frequentes',
  'nav.safetyGuidelines': 'Normas de Segurança',
  'nav.whatToBring': 'O Que Levar',
  'nav.itineraries': 'Itinerários',

  'cta.bookNow': 'Reserva Já',
  'cta.bookYourAdventure': 'Reserva a Tua Aventura',

  'a11y.toggleMenu': 'Alternar menu',
  'a11y.languageMenu': 'Idioma',
  'a11y.breadcrumb': 'Localização',
  'a11y.relatedArticles': 'Artigos relacionados',
  'a11y.allArticlesInHub': 'Todos os artigos desta categoria',
  'a11y.keyTakeaways': 'Pontos-chave',
  'a11y.relatedGuides': 'Guias relacionados',
  'a11y.playVideo': 'Reproduzir vídeo: {title}',

  'section.faq': 'Perguntas Frequentes',
  'section.exploreThisHub': 'Explora Esta Categoria',
  'section.youMightAlsoLike': 'Também Poderás Gostar',
  'section.keyTakeaways': 'Pontos-Chave',
  'section.exploreVernal': 'Explora Vernal',
  'section.moreVernalGuides': 'Mais Guias de Vernal',

  'footer.tagline': 'Vive a aventura de uma vida na terra dos dinossauros do Utah.',
  'footer.ourTrails': 'Os Nossos Trilhos',
  'footer.information': 'Informações',
  'footer.contactInfo': 'Informações de Contacto',
  'footer.copyrightSuffix': ' - Todos os direitos reservados.',
  'footer.link.utvTrailsTours': 'Trilhos e Tours em UTV',
  'footer.link.thingsToDo': 'O Que Fazer',
  'footer.link.dinosaurNationalMonument': 'Dinosaur National Monument',
  'footer.link.guides': 'Guias',
  'footer.link.visitingFromSLC': 'A Visitar a Partir de Salt Lake City',
  'footer.quickLinks': 'Ligações Rápidas',
  'footer.link.ourTours': 'Os Nossos Tours',
  'footer.link.ourFleet': 'A Nossa Frota',
  'footer.link.photoGallery': 'Galeria de Fotos',

  'tour.value.family': 'A forma como a maioria das famílias termina a viagem a Vernal.',
  'tour.value.adventure': 'Tours guiados em Kawasaki KRX 1000 pela Terra dos Dinossauros.',
  'tour.value.sunset': 'Trilhos ao pôr do sol, petróglifos e miradouros no backcountry.',
  'tour.value.generic': 'Tours guiados em UTV pela Terra dos Dinossauros.',
  'tour.callForPricing': 'Liga para saberes os preços',
  'tour.threeHours': '3 horas',
  'tour.upToRiders': 'até {n} passageiros',

  'reviews.googleReviews': 'avaliações do Google',
  'reviews.ratedAria': 'Classificação de {value} em 5 com base em {count} avaliações do Google',

  'author.writtenBy': 'Escrito por',
  'author.updated': 'Atualizado',
  'author.areasOfExpertise': 'Áreas de Especialização',
  'author.credentials': 'Credenciais e Experiência',
  'author.aboutBusiness': 'Sobre a Adventure Tours Vernal',
  'author.articlesBy': 'Artigos de {name}',

  'time.morning': 'manhã',
  'time.lunch': 'almoço',
  'time.afternoon': 'tarde',
  'time.dinner': 'jantar',
  'time.evening': 'noite',
  'itinerary.weatherBackup': 'Plano alternativo em caso de mau tempo',

  'gateway.heading': 'Vens de fora da cidade? Começa pela tua rota de acesso.',
  'gateway.note.saltLakeCity': 'O clássico percurso de ~3 horas pelas montanhas Uinta.',
  'gateway.note.denver': 'Uma viagem de meio dia pelas Montanhas Rochosas.',
  'gateway.note.grandJunction': 'A porta de entrada mais próxima a partir do Colorado.',
  'gateway.seeAllItineraries': 'Vê todos os itinerários de Vernal',

  'decision.heading': 'Não sabes qual tour escolher? Começa aqui.',
  'decision.intro': 'Diz-nos o que é mais importante para ti e indicamos-te o guia certo.',
  'decision.q.firstTime': 'É a tua primeira vez a conduzir?',
  'decision.a.firstTime': 'Começa com o guia para principiantes',
  'decision.q.children': 'Vais levar crianças?',
  'decision.a.children': 'Vê o guia UTV para famílias',
  'decision.q.couple': 'Vais viajar em casal?',
  'decision.a.couple': 'Reserva um tour privado para dois',
  'decision.q.scenery': 'Procuras paisagens deslumbrantes?',
  'decision.a.scenery': 'Compara os trilhos mais panorâmicos',
  'decision.q.history': 'Procuras história?',
  'decision.a.history': 'Explora petróglifos e arte rupestre',
  'decision.q.adventure': 'Queres a máxima aventura?',
  'decision.a.adventure': 'Vai até ao backcountry num tour remoto',
  'decision.q.shortTime': 'Tens pouco tempo?',
  'decision.a.shortTime': 'Reserva o próximo tour de 3 horas',
  'decision.q.group': 'Grupo grande?',
  'decision.a.group': 'Planeia um tour em grupo',

  'city.driveTime': 'Tempo de viagem',
  'city.distance': 'Distância',
  'city.route': 'Rota',
  'city.nearestAirport': 'Aeroporto mais próximo',
  'city.driveTimeValue': '{n} horas',
  'city.distanceValue': '{n} milhas',

  'hub.utv': 'Trilhos e Tours em UTV',
  'hub.atv': 'Trilhos para ATV',
  'hub.jeep': 'Trilhos para Jeep',
  'hub.dinosaur-national-monument': 'Dinosaur National Monument',
  'hub.things-to-do': 'O Que Fazer em Vernal',
  'hub.hiking': 'Caminhadas',
  'hub.camping': 'Campismo',
  'hub.fishing': 'Pesca',
  'hub.scenic-drives': 'Estradas Panorâmicas',
  'hub.guides': 'Guias do Destino',

  // — Faixa meteorológica do cabeçalho —
  'wx.region': 'Meteorologia em direto em Vernal e na terra dos dinossauros',
  'wx.live': 'EM DIRETO',
  'wx.loading': 'A carregar as condições em direto…',
  'wx.error': 'As condições em direto não estão disponíveis de momento.',
  'wx.feelsLike': 'Sensação',
  'wx.wind': 'Vento',
  'wx.humidity': 'Humidade',
  'wx.precip': 'Probabilidade de precipitação',
  'wx.visibility': 'Visibilidade',
  'wx.cond.clear': 'Céu limpo',
  'wx.cond.mainlyClear': 'Pouco nublado',
  'wx.cond.partly': 'Parcialmente nublado',
  'wx.cond.overcast': 'Encoberto',
  'wx.cond.fog': 'Nevoeiro',
  'wx.cond.drizzle': 'Chuvisco',
  'wx.cond.rain': 'Chuva',
  'wx.cond.freezingRain': 'Chuva gelada',
  'wx.cond.snow': 'Neve',
  'wx.cond.showers': 'Aguaceiros',
  'wx.cond.snowShowers': 'Aguaceiros de neve',
  'wx.cond.thunder': 'Trovoada',
  // Os pontos para oeste divergem do inglês: O (Oeste), não W.
  'wx.dir.n': 'N',
  'wx.dir.ne': 'NE',
  'wx.dir.e': 'E',
  'wx.dir.se': 'SE',
  'wx.dir.s': 'S',
  'wx.dir.sw': 'SO',
  'wx.dir.w': 'O',
  'wx.dir.nw': 'NO',
};

// French chrome dictionary (P8-P6, mirrors Italian P6). Formal "vous" register
// (mirrors Spanish "usted" / Italian "Lei" — not Portuguese's informal "tu").
// Keys mirror EN 1:1 — master-fallback in t() covers any key added to EN
// before its French counterpart lands. Brand, NAP, prices, fleet, place
// names, and people stay in the English value (never present here) per the
// multilingual handoff's proper-noun policy. "Dinosaur National Monument" /
// "Dinosaur Monument" kept English (official park name), matching the IT/PT
// precedent rather than the earlier ES translation of the same key.
const FR: Dict = {
  'nav.home': 'Accueil',
  'nav.about': 'À Propos',
  'nav.trails': 'Sentiers',
  'nav.thingsToDo': 'Que Faire',
  'nav.dinosaurMonument': 'Dinosaur Monument',
  'nav.guides': 'Guides',
  'nav.food': 'Restaurants',
  'nav.info': 'Informations',
  'nav.cancellationPolicy': "Politique d'Annulation",
  'nav.privacyPolicy': 'Politique de Confidentialité',
  'nav.faq': 'Questions Fréquentes',
  'nav.safetyGuidelines': 'Consignes de Sécurité',
  'nav.whatToBring': 'Quoi Apporter',
  'nav.itineraries': 'Itinéraires',

  'cta.bookNow': 'Réservez Maintenant',
  'cta.bookYourAdventure': 'Réservez Votre Aventure',

  'a11y.toggleMenu': 'Basculer le menu',
  'a11y.languageMenu': 'Langue',
  "a11y.breadcrumb": "Fil d'Ariane",
  'a11y.relatedArticles': 'Articles connexes',
  'a11y.allArticlesInHub': 'Tous les articles de cette catégorie',
  'a11y.keyTakeaways': 'Points clés',
  'a11y.relatedGuides': 'Guides connexes',
  'a11y.playVideo': 'Lire la vidéo : {title}',

  'section.faq': 'Questions Fréquentes',
  'section.exploreThisHub': 'Explorez Cette Catégorie',
  'section.youMightAlsoLike': 'Vous Pourriez Aussi Aimer',
  'section.keyTakeaways': 'Points Clés',
  'section.exploreVernal': 'Explorez Vernal',
  'section.moreVernalGuides': 'Plus de Guides sur Vernal',

  'footer.tagline': "Vivez l'aventure d'une vie dans la terre des dinosaures de l'Utah.",
  'footer.ourTrails': 'Nos Sentiers',
  'footer.information': 'Informations',
  'footer.contactInfo': 'Coordonnées',
  'footer.copyrightSuffix': ' - Tous droits réservés.',
  'footer.link.utvTrailsTours': 'Sentiers et Circuits en UTV',
  'footer.link.thingsToDo': 'Que Faire',
  'footer.link.dinosaurNationalMonument': 'Dinosaur National Monument',
  'footer.link.guides': 'Guides',
  'footer.link.visitingFromSLC': 'Visite depuis Salt Lake City',
  'footer.quickLinks': 'Liens Rapides',
  'footer.link.ourTours': 'Nos Circuits',
  'footer.link.ourFleet': 'Notre Flotte',
  'footer.link.photoGallery': 'Galerie Photo',

  'tour.value.family': 'La façon dont la plupart des familles concluent leur séjour à Vernal.',
  'tour.value.adventure': 'Circuits guidés en Kawasaki KRX 1000 à travers la Terre des Dinosaures.',
  'tour.value.sunset': "Sentiers à l'heure dorée, pétroglyphes et points de vue dans le backcountry.",
  'tour.value.generic': 'Circuits guidés en UTV à travers la Terre des Dinosaures.',
  'tour.callForPricing': 'Appelez pour connaître les tarifs',
  'tour.threeHours': '3 heures',
  'tour.upToRiders': "jusqu'à {n} passagers",

  'reviews.googleReviews': 'avis Google',
  'reviews.ratedAria': "Noté {value} sur 5 d'après {count} avis Google",

  'author.writtenBy': 'Écrit par',
  'author.updated': 'Mis à jour',
  'author.areasOfExpertise': "Domaines d'Expertise",
  'author.credentials': 'Références et Expérience',
  'author.aboutBusiness': "À Propos d'Adventure Tours Vernal",
  'author.articlesBy': 'Articles de {name}',

  'time.morning': 'matin',
  'time.lunch': 'déjeuner',
  'time.afternoon': 'après-midi',
  'time.dinner': 'dîner',
  'time.evening': 'soirée',
  'itinerary.weatherBackup': 'Plan de secours en cas de mauvais temps',

  'gateway.heading': "Vous venez d'ailleurs ? Commencez par votre itinéraire d'accès.",
  'gateway.note.saltLakeCity': "Le classique trajet d'environ 3 heures par les Uintas.",
  'gateway.note.denver': "Une excursion d'une demi-journée dans les Rocheuses.",
  'gateway.note.grandJunction': "La porte d'entrée la plus proche depuis le Colorado.",
  'gateway.seeAllItineraries': 'Voir tous les itinéraires de Vernal',

  'decision.heading': 'Vous ne savez pas quel circuit choisir ? Commencez ici.',
  'decision.intro': 'Dites-nous ce qui compte le plus pour vous et nous vous dirigerons vers le bon guide.',
  'decision.q.firstTime': 'Première fois en UTV ?',
  'decision.a.firstTime': 'Commencez par le guide pour débutants',
  'decision.q.children': 'Vous voyagez avec des enfants ?',
  'decision.a.children': 'Consultez le guide UTV en famille',
  'decision.q.couple': 'Vous voyagez en couple ?',
  'decision.a.couple': 'Réservez un circuit privé pour deux',
  'decision.q.scenery': 'Vous cherchez de beaux paysages ?',
  'decision.a.scenery': 'Comparez les sentiers les plus panoramiques',
  'decision.q.history': "Vous cherchez l'histoire ?",
  'decision.a.history': "Découvrez les pétroglyphes et l'art rupestre",
  'decision.q.adventure': "Vous voulez le maximum d'aventure ?",
  'decision.a.adventure': 'Partez loin de tout sur un circuit dans le backcountry',
  'decision.q.shortTime': 'Vous manquez de temps ?',
  'decision.a.shortTime': 'Réservez le prochain circuit de 3 heures',
  'decision.q.group': 'Grand groupe ?',
  'decision.a.group': 'Planifiez un circuit de groupe',

  'city.driveTime': 'Temps de trajet',
  'city.distance': 'Distance',
  'city.route': 'Itinéraire',
  'city.nearestAirport': 'Aéroport le plus proche',
  'city.driveTimeValue': '{n} heures',
  'city.distanceValue': '{n} miles',

  'hub.utv': 'Sentiers et Circuits en UTV',
  'hub.atv': 'Sentiers pour ATV',
  'hub.jeep': 'Sentiers pour Jeep',
  'hub.dinosaur-national-monument': 'Dinosaur National Monument',
  'hub.things-to-do': 'Que Faire à Vernal',
  'hub.hiking': 'Randonnée',
  'hub.camping': 'Camping',
  'hub.fishing': 'Pêche',
  'hub.scenic-drives': 'Routes Panoramiques',
  'hub.guides': 'Guides de Destination',

  // — Bandeau météo de l'en-tête —
  'wx.region': 'Météo en direct à Vernal et au pays des dinosaures',
  'wx.live': 'EN DIRECT',
  'wx.loading': 'Chargement des conditions en direct…',
  'wx.error': 'Les conditions en direct sont momentanément indisponibles.',
  'wx.feelsLike': 'Ressenti',
  'wx.wind': 'Vent',
  'wx.humidity': 'Humidité',
  'wx.precip': 'Probabilité de précipitations',
  'wx.visibility': 'Visibilité',
  'wx.cond.clear': 'Ciel dégagé',
  'wx.cond.mainlyClear': 'Peu nuageux',
  'wx.cond.partly': 'Partiellement nuageux',
  'wx.cond.overcast': 'Couvert',
  'wx.cond.fog': 'Brouillard',
  'wx.cond.drizzle': 'Bruine',
  'wx.cond.rain': 'Pluie',
  'wx.cond.freezingRain': 'Pluie verglaçante',
  'wx.cond.snow': 'Neige',
  'wx.cond.showers': 'Averses',
  'wx.cond.snowShowers': 'Averses de neige',
  'wx.cond.thunder': 'Orage',
  // Les points vers l'ouest divergent de l'anglais : O (Ouest), pas W.
  'wx.dir.n': 'N',
  'wx.dir.ne': 'NE',
  'wx.dir.e': 'E',
  'wx.dir.se': 'SE',
  'wx.dir.s': 'S',
  'wx.dir.sw': 'SO',
  'wx.dir.w': 'O',
  'wx.dir.nw': 'NO',
};

// German chrome dictionary (P9-inline). Informal "du" register (locked
// against the existing German MDX corpus — 59x du/21x dich/13x dir vs. 1
// stray formal hit — mirrors Portuguese's informal "tu", not the formal
// ES/IT/FR precedent). Keys mirror EN 1:1 — master-fallback in t() covers
// any key added to EN before its German counterpart lands. Brand, NAP,
// prices, fleet, place names, and people stay in the English value (never
// present here) per the multilingual handoff's proper-noun policy.
// "Dinosaur National Monument" / "Dinosaur Monument" kept English (official
// park name), matching the IT/PT/FR precedent. "Trail" follows the locked
// German MDX split: Pisten for UTV/ATV/Jeep (off-road), Wandern/Wanderweg
// for hiking — never one blanket term. "Dinosaur Country" → "Land der
// Dinosaurier" and "Key Takeaways" → "Das Wichtigste in Kürze" reuse the
// exact locked phrases from the P9 MDX batches, not new translations.
const DE: Dict = {
  'nav.home': 'Startseite',
  'nav.about': 'Über uns',
  'nav.trails': 'Pisten',
  'nav.thingsToDo': 'Aktivitäten',
  'nav.dinosaurMonument': 'Dinosaur Monument',
  'nav.guides': 'Guides',
  'nav.food': 'Restaurants',
  'nav.info': 'Informationen',
  'nav.cancellationPolicy': 'Stornierungsbedingungen',
  'nav.privacyPolicy': 'Datenschutzerklärung',
  'nav.faq': 'Häufige Fragen',
  'nav.safetyGuidelines': 'Sicherheitshinweise',
  'nav.whatToBring': 'Packliste',
  'nav.itineraries': 'Reisepläne',

  'cta.bookNow': 'Jetzt Buchen',
  'cta.bookYourAdventure': 'Buche Dein Abenteuer',

  'a11y.toggleMenu': 'Menü umschalten',
  'a11y.languageMenu': 'Sprache',
  'a11y.breadcrumb': 'Brotkrümelnavigation',
  'a11y.relatedArticles': 'Verwandte Artikel',
  'a11y.allArticlesInHub': 'Alle Artikel dieser Kategorie',
  'a11y.keyTakeaways': 'Das Wichtigste in Kürze',
  'a11y.relatedGuides': 'Verwandte Guides',
  'a11y.playVideo': 'Video abspielen: {title}',

  'section.faq': 'Häufige Fragen',
  'section.exploreThisHub': 'Diese Kategorie Entdecken',
  'section.youMightAlsoLike': 'Das Könnte Dir Auch Gefallen',
  'section.keyTakeaways': 'Das Wichtigste in Kürze',
  'section.exploreVernal': 'Vernal Entdecken',
  'section.moreVernalGuides': 'Weitere Guides zu Vernal',

  'footer.tagline': 'Erlebe das Abenteuer deines Lebens im Land der Dinosaurier in Utah.',
  'footer.ourTrails': 'Unsere Pisten',
  'footer.information': 'Informationen',
  'footer.contactInfo': 'Kontaktinformationen',
  'footer.copyrightSuffix': ' - Alle Rechte vorbehalten.',
  'footer.link.utvTrailsTours': 'UTV-Touren und Pisten',
  'footer.link.thingsToDo': 'Aktivitäten',
  'footer.link.dinosaurNationalMonument': 'Dinosaur National Monument',
  'footer.link.guides': 'Guides',
  'footer.link.visitingFromSLC': 'Anreise ab Salt Lake City',
  'footer.quickLinks': 'Schnellzugriff',
  'footer.link.ourTours': 'Unsere Touren',
  'footer.link.ourFleet': 'Unsere Fahrzeugflotte',
  'footer.link.photoGallery': 'Fotogalerie',

  'tour.value.family': 'So beenden die meisten Familien ihren Vernal-Trip.',
  'tour.value.adventure': 'Geführte Touren im Kawasaki KRX 1000 durchs Land der Dinosaurier.',
  'tour.value.sunset': 'Pisten bei Sonnenuntergang, Petroglyphen und Aussichtspunkte im Backcountry.',
  'tour.value.generic': 'Geführte UTV-Touren durchs Land der Dinosaurier.',
  'tour.callForPricing': 'Ruf an für Preise',
  'tour.threeHours': '3 Stunden',
  'tour.upToRiders': 'bis zu {n} Personen',

  'reviews.googleReviews': 'Google-Bewertungen',
  'reviews.ratedAria': 'Bewertet mit {value} von 5 basierend auf {count} Google-Bewertungen',

  'author.writtenBy': 'Geschrieben von',
  'author.updated': 'Aktualisiert',
  'author.areasOfExpertise': 'Fachgebiete',
  'author.credentials': 'Qualifikationen und Erfahrung',
  'author.aboutBusiness': 'Über Adventure Tours Vernal',
  'author.articlesBy': 'Artikel von {name}',

  'time.morning': 'Morgen',
  'time.lunch': 'Mittagessen',
  'time.afternoon': 'Nachmittag',
  'time.dinner': 'Abendessen',
  'time.evening': 'Abend',
  'itinerary.weatherBackup': 'Ausweichplan bei schlechtem Wetter',

  'gateway.heading': 'Von auswärts unterwegs? Starte mit deiner Anreiseroute.',
  'gateway.note.saltLakeCity': 'Die klassische, rund 3-stündige Fahrt durch die Uintas.',
  'gateway.note.denver': 'Ein halbtägiger Ausflug durch die Rocky Mountains.',
  'gateway.note.grandJunction': 'Das nächstgelegene Tor von Colorado aus.',
  'gateway.seeAllItineraries': 'Alle Reisepläne für Vernal ansehen',

  'decision.heading': 'Nicht sicher, welche Tour die richtige ist? Fang hier an.',
  'decision.intro': 'Sag uns, was dir am wichtigsten ist, und wir zeigen dir den passenden Guide.',
  'decision.q.firstTime': 'Ist es dein erstes Mal am Steuer?',
  'decision.a.firstTime': 'Starte mit dem Guide für Einsteiger',
  'decision.q.children': 'Reist du mit Kindern?',
  'decision.a.children': 'Sieh dir den UTV-Guide für Familien an',
  'decision.q.couple': 'Reist du als Paar?',
  'decision.a.couple': 'Buche eine private Tour für zwei',
  'decision.q.scenery': 'Suchst du atemberaubende Landschaften?',
  'decision.a.scenery': 'Vergleiche die schönsten Panoramastrecken',
  'decision.q.history': 'Interessierst du dich für Geschichte?',
  'decision.a.history': 'Entdecke Petroglyphen und Felskunst',
  'decision.q.adventure': 'Willst du das volle Abenteuer?',
  'decision.a.adventure': 'Geh mit einer abgelegenen Tour ins Backcountry',
  'decision.q.shortTime': 'Wenig Zeit?',
  'decision.a.shortTime': 'Buche die nächste 3-Stunden-Tour',
  'decision.q.group': 'Große Gruppe?',
  'decision.a.group': 'Plane eine Gruppentour',

  'city.driveTime': 'Fahrzeit',
  'city.distance': 'Entfernung',
  'city.route': 'Route',
  'city.nearestAirport': 'Nächster Flughafen',
  'city.driveTimeValue': '{n} Stunden',
  'city.distanceValue': '{n} Meilen',

  'hub.utv': 'UTV-Touren und Pisten',
  'hub.atv': 'ATV-Pisten',
  'hub.jeep': 'Jeep-Pisten',
  'hub.dinosaur-national-monument': 'Dinosaur National Monument',
  'hub.things-to-do': 'Aktivitäten in Vernal',
  'hub.hiking': 'Wandern',
  'hub.camping': 'Camping',
  'hub.fishing': 'Angeln',
  'hub.scenic-drives': 'Panoramastraßen',
  'hub.guides': 'Guides',

  // — Wetterband im Kopfbereich —
  // Kein Eintrag spricht die Leserin oder den Leser an, daher stellt sich die
  // du/Sie-Frage aus A1–A8 hier nicht.
  'wx.region': 'Live-Wetter in Vernal und im Dinosaurierland',
  'wx.live': 'LIVE',
  'wx.loading': 'Aktuelle Bedingungen werden geladen…',
  'wx.error': 'Die aktuellen Bedingungen sind derzeit nicht verfügbar.',
  'wx.feelsLike': 'Gefühlt',
  'wx.wind': 'Wind',
  'wx.humidity': 'Luftfeuchtigkeit',
  'wx.precip': 'Niederschlagswahrscheinlichkeit',
  'wx.visibility': 'Sichtweite',
  'wx.cond.clear': 'Klar',
  'wx.cond.mainlyClear': 'Überwiegend klar',
  'wx.cond.partly': 'Teilweise bewölkt',
  'wx.cond.overcast': 'Bedeckt',
  'wx.cond.fog': 'Nebel',
  'wx.cond.drizzle': 'Nieselregen',
  'wx.cond.rain': 'Regen',
  'wx.cond.freezingRain': 'Gefrierender Regen',
  'wx.cond.snow': 'Schnee',
  'wx.cond.showers': 'Schauer',
  'wx.cond.snowShowers': 'Schneeschauer',
  'wx.cond.thunder': 'Gewitter',
  // Ost weicht vom Englischen ab: O (Ost), nicht E.
  'wx.dir.n': 'N',
  'wx.dir.ne': 'NO',
  'wx.dir.e': 'O',
  'wx.dir.se': 'SO',
  'wx.dir.s': 'S',
  'wx.dir.sw': 'SW',
  'wx.dir.w': 'W',
  'wx.dir.nw': 'NW',
};

// Japanese chrome dictionary (P10K). Polite です・ます register, matching the
// locked register of the 57 ja MDX spokes. Keys mirror EN 1:1. Official park
// names ("Dinosaur National Monument" / "Dinosaur Monument") stay English,
// matching the IT/PT/FR/DE precedent. Every term here reuses a phrase already
// locked during the P10 MDX batches rather than inventing a new one:
// "Key Takeaways" → 要点まとめ, "Dinosaur Country" → 恐竜の国, "scenic drives"
// → 絶景ドライブ, hiking → ハイキング, camping → キャンプ, fishing → 釣り,
// trail → トレイル, backcountry → バックカントリー, petroglyphs → 岩絵.
const JA: Dict = {
  'nav.home': 'ホーム',
  'nav.about': '私たちについて',
  'nav.trails': 'トレイル',
  'nav.thingsToDo': '楽しみ方',
  'nav.dinosaurMonument': 'Dinosaur Monument',
  'nav.guides': 'ガイド',
  'nav.food': 'レストラン',
  'nav.info': 'ご案内',
  'nav.cancellationPolicy': 'キャンセルポリシー',
  'nav.privacyPolicy': 'プライバシーポリシー',
  'nav.faq': 'よくあるご質問',
  'nav.safetyGuidelines': '安全ガイドライン',
  'nav.whatToBring': '持ち物',
  'nav.itineraries': '旅程',

  'cta.bookNow': '今すぐ予約',
  'cta.bookYourAdventure': '冒険を予約する',

  'a11y.toggleMenu': 'メニューの開閉',
  'a11y.languageMenu': '言語',
  'a11y.breadcrumb': 'パンくずリスト',
  'a11y.relatedArticles': '関連記事',
  'a11y.allArticlesInHub': 'このハブのすべての記事',
  'a11y.keyTakeaways': '要点まとめ',
  'a11y.relatedGuides': '関連ガイド',
  'a11y.playVideo': '動画を再生：{title}',

  'section.faq': 'よくあるご質問',
  'section.exploreThisHub': 'このハブを見る',
  'section.youMightAlsoLike': 'こちらもおすすめ',
  'section.keyTakeaways': '要点まとめ',
  'section.exploreVernal': 'バーナルを知る',
  'section.moreVernalGuides': 'バーナルのガイドをもっと見る',

  'footer.tagline': 'ユタ州の恐竜の国で、一生に一度の冒険を。',
  'footer.ourTrails': 'トレイル一覧',
  'footer.information': 'ご案内',
  'footer.contactInfo': 'お問い合わせ',
  'footer.copyrightSuffix': ' - 無断転載を禁じます。',
  'footer.link.utvTrailsTours': 'UTVトレイルとツアー',
  'footer.link.thingsToDo': '楽しみ方',
  'footer.link.dinosaurNationalMonument': 'Dinosaur National Monument',
  'footer.link.guides': 'ガイド',
  'footer.link.visitingFromSLC': 'Salt Lake Cityからお越しの方',
  'footer.quickLinks': 'クイックリンク',
  'footer.link.ourTours': 'ツアー一覧',
  'footer.link.ourFleet': '車両紹介',
  'footer.link.photoGallery': 'フォトギャラリー',

  'tour.value.family': '多くのご家族が、バーナルの旅をこれで締めくくります。',
  'tour.value.adventure': 'Kawasaki KRX 1000で行く、恐竜の国のガイド付きツアー。',
  'tour.value.sunset': '黄金の光のトレイル、岩絵、そしてバックカントリーの展望ポイント。',
  'tour.value.generic': '恐竜の国を巡るガイド付きUTVツアー。',
  'tour.callForPricing': '料金はお電話で',
  'tour.threeHours': '3時間',
  'tour.upToRiders': '最大{n}名まで',

  'reviews.googleReviews': 'Googleレビュー',
  'reviews.ratedAria': 'Googleレビュー{count}件で、5段階中{value}の評価',

  'author.writtenBy': '執筆',
  'author.updated': '更新',
  'author.areasOfExpertise': '専門分野',
  'author.credentials': '経歴と実績',
  'author.aboutBusiness': 'Adventure Tours Vernalについて',
  'author.articlesBy': '{name}の記事',

  'time.morning': '午前',
  'time.lunch': '昼食',
  'time.afternoon': '午後',
  'time.dinner': '夕食',
  'time.evening': '夕方',
  'itinerary.weatherBackup': '悪天候時の代替プラン',

  'gateway.heading': '遠方からお越しですか。まずは玄関口のルートから。',
  'gateway.note.saltLakeCity': 'Uintasを越える、定番の約3時間の道のり。',
  'gateway.note.denver': 'Rocky Mountainsを西へ、半日がかりのロードトリップ。',
  'gateway.note.grandJunction': 'コロラド側から最も近い玄関口。',
  'gateway.seeAllItineraries': 'バーナルの旅程をすべて見る',

  'decision.heading': 'どのツアーか迷ったら、ここから。',
  'decision.intro': '何を大切にされたいかをお聞かせください。ぴったりのガイドをご案内します。',
  'decision.q.firstTime': '初めてのご乗車ですか。',
  'decision.a.firstTime': '初心者向けガイドから始める',
  'decision.q.children': 'お子さま連れですか。',
  'decision.a.children': 'ファミリー向けUTVガイドを見る',
  'decision.q.couple': 'カップルでのご旅行ですか。',
  'decision.a.couple': '二人だけのプライベートツアーを予約する',
  'decision.q.scenery': '景色を楽しみたいですか。',
  'decision.a.scenery': '最も景観の良いトレイルを比べる',
  'decision.q.history': '歴史に触れたいですか。',
  'decision.a.history': '岩絵とロックアートを訪ねる',
  'decision.q.adventure': '冒険を最大限に味わいたいですか。',
  'decision.a.adventure': 'バックカントリーツアーで奥地へ',
  'decision.q.shortTime': 'お時間が限られていますか。',
  'decision.a.shortTime': '次の3時間ツアーを予約する',
  'decision.q.group': '大人数のグループですか。',
  'decision.a.group': 'グループツアーを計画する',

  'city.driveTime': '所要時間',
  'city.distance': '距離',
  'city.route': 'ルート',
  'city.nearestAirport': '最寄りの空港',
  'city.driveTimeValue': '{n}時間',
  'city.distanceValue': '{n}マイル',

  'hub.utv': 'UTVトレイルとツアー',
  'hub.atv': 'ATVトレイル',
  'hub.jeep': 'Jeepトレイル',
  'hub.dinosaur-national-monument': 'Dinosaur National Monument',
  'hub.things-to-do': 'バーナルの楽しみ方',
  'hub.hiking': 'ハイキング',
  'hub.camping': 'キャンプ',
  'hub.fishing': '釣り',
  'hub.scenic-drives': '絶景ドライブ',
  'hub.guides': 'ガイド',

  // — ヘッダーの気象ストリップ —
  // 地名は訳さない（JA の地名方針どおり、バーナルのみ例外）。
  'wx.region': 'バーナル周辺のライブ天気',
  'wx.live': 'ライブ',
  'wx.loading': '現在の気象状況を読み込んでいます…',
  'wx.error': '現在の気象情報は一時的にご利用いただけません。',
  'wx.feelsLike': '体感',
  'wx.wind': '風',
  'wx.humidity': '湿度',
  'wx.precip': '降水確率',
  'wx.visibility': '視程',
  'wx.cond.clear': '快晴',
  'wx.cond.mainlyClear': 'おおむね晴れ',
  'wx.cond.partly': '晴れ時々曇り',
  'wx.cond.overcast': '曇り',
  'wx.cond.fog': '霧',
  'wx.cond.drizzle': '霧雨',
  'wx.cond.rain': '雨',
  'wx.cond.freezingRain': '着氷性の雨',
  'wx.cond.snow': '雪',
  'wx.cond.showers': 'にわか雨',
  'wx.cond.snowShowers': 'にわか雪',
  'wx.cond.thunder': '雷雨',
  'wx.dir.n': '北',
  'wx.dir.ne': '北東',
  'wx.dir.e': '東',
  'wx.dir.se': '南東',
  'wx.dir.s': '南',
  'wx.dir.sw': '南西',
  'wx.dir.w': '西',
  'wx.dir.nw': '北西',
};

// Simplified Chinese chrome dictionary (Z2), written for readers in mainland
// China. Keys mirror EN 1:1 (structural reference = DE; non-Latin-script
// implementation reference = JA). The glossary decisions locked here bind the
// Z3 MDX batches and the Z4 inline pages — reuse them, do not re-derive:
//
//   • PROPER NAMES — two tiers, and the split is deliberate. A place with an
//     ESTABLISHED mainland Chinese exonym uses it (Utah → 犹他州, Salt Lake
//     City → 盐湖城, Rocky Mountains → 落基山脉, Colorado → 科罗拉多州). A place
//     with NO established Chinese name stays English rather than being given an
//     invented transliteration — Vernal, Uintas, Flaming Gorge, Ashley National
//     Forest, Red Fleet, Green River, Dinosaur National Monument / Dinosaur
//     Monument. This follows handoff §3 ("keep English") for the unnamed tier
//     while honouring "prefer established terminology" for the named tier. It
//     deliberately diverges from ja, which transliterated Vernal → バーナル:
//     Japanese orthography expects katakana for foreign toponyms, whereas
//     Chinese prose mixes Latin proper nouns freely, and 弗纳尔 would be an
//     invention. `Vernal` is also inside the frozen brand `Adventure Tours
//     Vernal` and is what a reader types into a search box.
//   • CJK/Latin SPACING — one space between Chinese characters and any Latin
//     run or Arabic numeral ('探索 Vernal', '3 小时', 'UTV 越野路线'). Applied
//     uniformly; this is the zh-CN typographic convention.
//   • LOCKED TERMS — Dinosaur Country → 恐龙之乡 (an established Chinese
//     collocation for fossil country, not a coinage) · Key Takeaways → 要点速览
//     · guides (the travel sense) → 攻略, the standard mainland travel word,
//     never the flatter 指南 · petroglyphs → 岩画 · backcountry → 荒野深处 ·
//     tour (the product) → 行程 / 之旅 · hub (the content grouping) → 专题.
//   • TRAIL SPLIT — mirrors the locked DE Pisten/Wanderweg split: off-road
//     (UTV/ATV/Jeep) → 越野路线; hiking → 徒步 / 步道. Never one blanket word.
//   • Brand, NAP, prices, and fleet (Kawasaki KRX 1000) never appear here in
//     translated form, per the handoff's proper-noun policy.
const ZH: Dict = {
  'nav.home': '首页',
  'nav.about': '关于我们',
  'nav.trails': '越野路线',
  'nav.thingsToDo': '玩什么',
  'nav.dinosaurMonument': 'Dinosaur Monument',
  'nav.guides': '攻略',
  'nav.food': '美食',
  'nav.info': '实用信息',
  'nav.cancellationPolicy': '取消政策',
  'nav.privacyPolicy': '隐私政策',
  'nav.faq': '常见问题',
  'nav.safetyGuidelines': '安全须知',
  'nav.whatToBring': '携带物品',
  'nav.itineraries': '行程',

  'cta.bookNow': '立即预订',
  'cta.bookYourAdventure': '预订你的冒险之旅',

  'a11y.toggleMenu': '切换菜单',
  'a11y.languageMenu': '语言',
  'a11y.breadcrumb': '面包屑导航',
  'a11y.relatedArticles': '相关文章',
  'a11y.allArticlesInHub': '本专题的全部文章',
  'a11y.keyTakeaways': '要点速览',
  'a11y.relatedGuides': '相关攻略',
  'a11y.playVideo': '播放视频：{title}',

  'section.faq': '常见问题',
  'section.exploreThisHub': '探索本专题',
  'section.youMightAlsoLike': '你可能还喜欢',
  'section.keyTakeaways': '要点速览',
  'section.exploreVernal': '探索 Vernal',
  'section.moreVernalGuides': '更多 Vernal 攻略',

  'footer.tagline': '在犹他州的恐龙之乡，开启一生难忘的冒险。',
  'footer.ourTrails': '我们的越野路线',
  'footer.information': '实用信息',
  'footer.contactInfo': '联系方式',
  'footer.copyrightSuffix': ' - 版权所有。',
  'footer.link.utvTrailsTours': 'UTV 越野路线与导览游',
  'footer.link.thingsToDo': '玩什么',
  'footer.link.dinosaurNationalMonument': 'Dinosaur National Monument',
  'footer.link.guides': '攻略',
  'footer.link.visitingFromSLC': '从盐湖城出发',
  'footer.quickLinks': '快速链接',
  'footer.link.ourTours': '我们的行程',
  'footer.link.ourFleet': '我们的车队',
  'footer.link.photoGallery': '照片集',

  'tour.value.family': '大多数家庭都用它为 Vernal 之行画上句号。',
  'tour.value.adventure': '由向导带队，驾驶 Kawasaki KRX 1000 穿越恐龙之乡。',
  'tour.value.sunset': '黄金时刻的越野路线、岩画，以及荒野深处的观景点。',
  'tour.value.generic': '由向导带队的 UTV 之旅，穿越恐龙之乡。',
  'tour.callForPricing': '致电咨询价格',
  'tour.threeHours': '3 小时',
  'tour.upToRiders': '最多 {n} 人',

  'reviews.googleReviews': 'Google 评价',
  'reviews.ratedAria': '根据 {count} 条 Google 评价，评分为 5 分中的 {value} 分',

  'author.writtenBy': '作者',
  'author.updated': '更新于',
  'author.areasOfExpertise': '专长领域',
  'author.credentials': '资历与经验',
  'author.aboutBusiness': '关于 Adventure Tours Vernal',
  'author.articlesBy': '{name} 的文章',

  'time.morning': '上午',
  'time.lunch': '午餐',
  'time.afternoon': '下午',
  'time.dinner': '晚餐',
  'time.evening': '傍晚',
  'itinerary.weatherBackup': '恶劣天气备选方案',

  'gateway.heading': '从外地前来？先看看你的出发路线。',
  'gateway.note.saltLakeCity': '翻越 Uintas 的经典路线，约 3 小时车程。',
  'gateway.note.denver': '向西穿越落基山脉的半日自驾之旅。',
  'gateway.note.grandJunction': '科罗拉多州最近的出发地。',
  'gateway.seeAllItineraries': '查看 Vernal 的全部行程',

  'decision.heading': '不确定选哪个行程？从这里开始。',
  'decision.intro': '告诉我们你最看重什么，我们为你推荐合适的攻略。',
  'decision.q.firstTime': '第一次驾驶越野车？',
  'decision.a.firstTime': '从新手攻略开始',
  'decision.q.children': '带着孩子？',
  'decision.a.children': '查看家庭 UTV 攻略',
  'decision.q.couple': '两人同行？',
  'decision.a.couple': '预订双人私人行程',
  'decision.q.scenery': '想看风景？',
  'decision.a.scenery': '比较最美的越野路线',
  'decision.q.history': '想了解历史？',
  'decision.a.history': '探访岩画与岩刻艺术',
  'decision.q.adventure': '想要极致冒险？',
  'decision.a.adventure': '深入荒野，来一趟秘境之旅',
  'decision.q.shortTime': '时间紧张？',
  'decision.a.shortTime': '预订下一场 3 小时行程',
  'decision.q.group': '多人团体？',
  'decision.a.group': '规划团体行程',

  'city.driveTime': '车程',
  'city.distance': '距离',
  'city.route': '路线',
  'city.nearestAirport': '最近的机场',
  'city.driveTimeValue': '{n} 小时',
  'city.distanceValue': '{n} 英里',

  'hub.utv': 'UTV 越野路线与导览游',
  'hub.atv': 'ATV 越野路线',
  'hub.jeep': 'Jeep 越野路线',
  'hub.dinosaur-national-monument': 'Dinosaur National Monument',
  'hub.things-to-do': 'Vernal 玩什么',
  'hub.hiking': '徒步',
  'hub.camping': '露营',
  'hub.fishing': '钓鱼',
  'hub.scenic-drives': '景观自驾',
  'hub.guides': '攻略',

  // — 页眉实时天气条 —
  // 地名保持拉丁字母原样，与 'hub.dinosaur-national-monument' 一致。
  'wx.region': 'Vernal 及恐龙之乡的实时天气',
  'wx.live': '实时',
  'wx.loading': '正在加载实时天气…',
  'wx.error': '实时天气信息暂时无法获取。',
  'wx.feelsLike': '体感',
  'wx.wind': '风速',
  'wx.humidity': '湿度',
  'wx.precip': '降水概率',
  'wx.visibility': '能见度',
  'wx.cond.clear': '晴',
  'wx.cond.mainlyClear': '大致晴朗',
  'wx.cond.partly': '局部多云',
  'wx.cond.overcast': '阴',
  'wx.cond.fog': '雾',
  'wx.cond.drizzle': '毛毛雨',
  'wx.cond.rain': '雨',
  'wx.cond.freezingRain': '冻雨',
  'wx.cond.snow': '雪',
  'wx.cond.showers': '阵雨',
  'wx.cond.snowShowers': '阵雪',
  'wx.cond.thunder': '雷暴',
  'wx.dir.n': '北',
  'wx.dir.ne': '东北',
  'wx.dir.e': '东',
  'wx.dir.se': '东南',
  'wx.dir.s': '南',
  'wx.dir.sw': '西南',
  'wx.dir.w': '西',
  'wx.dir.nw': '西北',
};

// ── Arabic chrome dictionary (AR-1) — Modern Standard Arabic, dir="rtl" ─────
//
// The FIRST right-to-left dictionary in this file. It ships complete and ahead
// of any Arabic corpus, on purpose: t() fails soft, so a partial Arabic
// dictionary would render English chrome on an RTL page and still pass the
// build, the validator and every gate — the exact JA failure of 2026-07-22,
// made harder to spot because English chrome inside an RTL layout reads as a
// direction bug rather than a missing translation. Chrome first, corpus later.
//
// REGISTER — Modern Standard Arabic (فصحى معاصرة), never a regional dialect.
//   The house register across locales is informal-but-respectful (de = du,
//   zh = 你, ja = です・ます). Arabic's equivalent is direct second-person
//   address WITHOUT honorific distancing (حضرتك / سيادتكم are wrong here).
//   Arabic marks gender on verbs, pronouns and imperatives, so the policy is
//   two-part and deliberate:
//     • Prefer impersonal / verbal-noun phrasing wherever the English does not
//       actually address the reader ('Drive time' → 'مدة القيادة', not a verb).
//     • Where the English DOES address the reader, use masculine singular as
//       the unmarked form ('احجز الآن'). This is a linguistic default, not an
//       assumption about the reader; Arabic has no gender-neutral imperative,
//       and the alternatives (احجز/ي, أو صيغة الجمع) are worse: slash-forms are
//       unreadable by screen readers and plural forms read as corporate.
//   Recorded in full, with the rejected alternatives, in
//   docs/rtl/AR1-arabic-policy.md §2 — do not re-decide it per string.
//
// NUMERALS — Western digits (0-9) corpus-wide, never Arabic-Indic (٠-٩).
//   Every number on this site is a US fact a reader must match against a road
//   sign, a booking screen or a phone keypad. See policy §3, and the ⚠ on
//   LocaleMeta.hreflang in i18n.ts: the machine-formatted half of this policy
//   is enforced by the locale tag, not by anything written here.
//
// PROPER NOUNS — mixed strategy, by function, not by category (policy §4):
//   • ARABIC where an established exonym exists and the reader will never need
//     to match the Latin form on the ground: يوتا (Utah), سولت ليك سيتي,
//     دنفر, كولورادو, جبال روكي.
//   • LATIN, verbatim, for every wayfinding name — the reader navigates rural
//     Utah on English signage and books through an English system:
//     Vernal · Dinosaur National Monument · Uintas · Kawasaki KRX 1000 ·
//     Adventure Tours Vernal · Google · UTV / ATV / Jeep.
//   A Latin run inside Arabic prose is therefore NORMAL here, not an oversight,
//   which is exactly why bidi isolation is a first-class concern for this
//   locale rather than an edge case.
//
// LOCKED TERMS — Dinosaur Country → أرض الديناصورات · Key Takeaways →
//   أبرز النقاط · trail (the route) → مسار · backcountry → عمق البرية ·
//   petroglyphs / rock art → النقوش والرسوم الصخرية · tour (the product) →
//   جولة · hub (the content grouping) → قسم · guide (the article) → دليل.
//   Never one blanket word for 'trail': مسار is the route, and the vehicle
//   classes (UTV/ATV/Jeep) stay Latin beside it.
const AR: Dict = {
  // — Navigation —
  'nav.home': 'الرئيسية',
  'nav.about': 'من نحن',
  'nav.trails': 'المسارات',
  'nav.thingsToDo': 'الأنشطة',
  'nav.dinosaurMonument': 'Dinosaur Monument',
  'nav.guides': 'الأدلة',
  'nav.food': 'المطاعم',
  'nav.info': 'معلومات',
  'nav.cancellationPolicy': 'سياسة الإلغاء',
  'nav.privacyPolicy': 'سياسة الخصوصية',
  'nav.faq': 'الأسئلة الشائعة',
  'nav.safetyGuidelines': 'إرشادات السلامة',
  'nav.whatToBring': 'ما تحتاج إحضاره',
  'nav.itineraries': 'برامج الرحلات',

  // — CTAs —
  'cta.bookNow': 'احجز الآن',
  'cta.bookYourAdventure': 'احجز مغامرتك',

  // — Accessibility (aria-labels) —
  'a11y.toggleMenu': 'إظهار القائمة أو إخفاؤها',
  'a11y.languageMenu': 'اللغة',
  'a11y.breadcrumb': 'مسار التنقل',
  'a11y.relatedArticles': 'مقالات ذات صلة',
  'a11y.allArticlesInHub': 'جميع المقالات في هذا القسم',
  'a11y.keyTakeaways': 'أبرز النقاط',
  'a11y.relatedGuides': 'أدلة ذات صلة',
  'a11y.playVideo': 'تشغيل الفيديو: {title}',

  // — Section headings —
  'section.faq': 'الأسئلة الشائعة',
  'section.exploreThisHub': 'استكشف هذا القسم',
  'section.youMightAlsoLike': 'قد يعجبك أيضاً',
  'section.keyTakeaways': 'أبرز النقاط',
  'section.exploreVernal': 'استكشف Vernal',
  'section.moreVernalGuides': 'المزيد من أدلة Vernal',

  // — Footer chrome —
  'footer.tagline': 'عش مغامرة العمر في أرض الديناصورات بولاية يوتا.',
  'footer.ourTrails': 'مساراتنا',
  'footer.information': 'معلومات',
  'footer.contactInfo': 'معلومات التواصل',
  'footer.copyrightSuffix': ' - جميع الحقوق محفوظة.',
  'footer.link.utvTrailsTours': 'مسارات وجولات UTV',
  'footer.link.thingsToDo': 'الأنشطة',
  'footer.link.dinosaurNationalMonument': 'Dinosaur National Monument',
  'footer.link.guides': 'الأدلة',
  'footer.link.visitingFromSLC': 'قادم من سولت ليك سيتي',
  'footer.quickLinks': 'روابط سريعة',
  'footer.link.ourTours': 'جولاتنا',
  'footer.link.ourFleet': 'أسطولنا',
  'footer.link.photoGallery': 'معرض الصور',

  // — TourCta —
  'tour.value.family': 'الجولة التي تختم بها معظم العائلات رحلتها إلى Vernal.',
  'tour.value.adventure': 'جولات بصحبة مرشد على متن Kawasaki KRX 1000 عبر أرض الديناصورات.',
  'tour.value.sunset': 'مسارات عند الغروب، ونقوش صخرية، ومطلات في عمق البرية.',
  'tour.value.generic': 'جولات UTV بصحبة مرشد عبر أرض الديناصورات.',
  'tour.callForPricing': 'اتصل للاستفسار عن السعر',
  'tour.threeHours': '3 ساعات',
  // `{n}` is always 2 here, but the phrasing is chosen to stay grammatical for
  // any n: Arabic changes the noun's case and number after 3-10 and again after
  // 11, so 'حتى {n} راكبين' would be wrong for every value except 2.
  'tour.upToRiders': 'حتى {n} من الركاب',

  // — TrustBadge —
  'reviews.googleReviews': 'تقييمات Google',
  'reviews.ratedAria': 'حصلت على {value} من 5 بناءً على {count} تقييماً على Google',

  // — AuthorByline + AuthorLayout —
  'author.writtenBy': 'بقلم',
  'author.updated': 'آخر تحديث',
  'author.areasOfExpertise': 'مجالات الخبرة',
  'author.credentials': 'المؤهلات والخبرة',
  'author.aboutBusiness': 'عن Adventure Tours Vernal',
  'author.articlesBy': 'مقالات بقلم {name}',

  // — ItineraryDay —
  'time.morning': 'صباحاً',
  'time.lunch': 'الغداء',
  'time.afternoon': 'بعد الظهر',
  'time.dinner': 'العشاء',
  'time.evening': 'المساء',
  'itinerary.weatherBackup': 'خطة بديلة لسوء الأحوال الجوية',

  // — GatewayRoutes —
  'gateway.heading': 'قادم من خارج المدينة؟ ابدأ بمسار الوصول.',
  'gateway.note.saltLakeCity': 'الطريق الكلاسيكي عبر جبال Uintas، نحو 3 ساعات بالسيارة.',
  'gateway.note.denver': 'رحلة نصف يوم غرباً عبر جبال روكي.',
  'gateway.note.grandJunction': 'أقرب نقطة انطلاق من ولاية كولورادو.',
  'gateway.seeAllItineraries': 'اطّلع على جميع برامج الرحلات في Vernal',

  // — TourDecisionGuide —
  'decision.heading': 'غير متأكد من الجولة المناسبة؟ ابدأ من هنا.',
  'decision.intro': 'أخبرنا بما يهمك أكثر، ونرشدك إلى الدليل المناسب.',
  'decision.q.firstTime': 'أول مرة تقود مركبة UTV؟',
  'decision.a.firstTime': 'ابدأ بدليل المبتدئين',
  'decision.q.children': 'برفقة أطفال؟',
  'decision.a.children': 'اطّلع على دليل UTV للعائلات',
  'decision.q.couple': 'مسافران فقط؟',
  'decision.a.couple': 'احجز جولة خاصة لشخصين',
  'decision.q.scenery': 'تبحث عن المناظر الطبيعية؟',
  'decision.a.scenery': 'قارن بين أجمل المسارات',
  'decision.q.history': 'تبحث عن التاريخ؟',
  'decision.a.history': 'استكشف النقوش والرسوم الصخرية',
  'decision.q.adventure': 'تريد أقصى قدر من المغامرة؟',
  'decision.a.adventure': 'توغّل في عمق البرية',
  'decision.q.shortTime': 'وقتك ضيق؟',
  'decision.a.shortTime': 'احجز الجولة القادمة التي تستغرق 3 ساعات',
  'decision.q.group': 'مجموعة كبيرة؟',
  'decision.a.group': 'خطّط لجولة جماعية',

  // — CityLayout QuickFacts —
  'city.driveTime': 'مدة القيادة',
  'city.distance': 'المسافة',
  'city.route': 'الطريق',
  'city.nearestAirport': 'أقرب مطار',
  'city.driveTimeValue': '{n} ساعات',
  'city.distanceValue': '{n} ميل',

  // — Hub display names —
  'hub.utv': 'مسارات وجولات UTV',
  'hub.atv': 'مسارات ATV',
  'hub.jeep': 'مسارات Jeep',
  'hub.dinosaur-national-monument': 'Dinosaur National Monument',
  'hub.things-to-do': 'أنشطة في Vernal',
  'hub.hiking': 'المشي في الطبيعة',
  'hub.camping': 'التخييم',
  'hub.fishing': 'صيد الأسماك',
  'hub.scenic-drives': 'الطرق الخلابة',
  'hub.guides': 'الأدلة',

  // — شريط الطقس في الترويسة —
  // أسماء المواقع تبقى باللاتينية حرفيًا، مثل 'hub.dinosaur-national-monument'.
  // القيم المقيسة (72°F و18%) تُعزل في المكوّن عبر المنسّق المشترك، لا هنا.
  'wx.region': 'حالة الطقس المباشرة في Vernal وأرض الديناصورات',
  'wx.live': 'مباشر',
  'wx.loading': 'جارٍ تحميل حالة الطقس الحالية…',
  'wx.error': 'حالة الطقس المباشرة غير متاحة حاليًا.',
  'wx.feelsLike': 'محسوسة',
  'wx.wind': 'الرياح',
  'wx.humidity': 'الرطوبة',
  'wx.precip': 'احتمال هطول الأمطار',
  'wx.visibility': 'مدى الرؤية',
  'wx.cond.clear': 'صافٍ',
  'wx.cond.mainlyClear': 'صافٍ غالبًا',
  'wx.cond.partly': 'غائم جزئيًا',
  'wx.cond.overcast': 'غائم',
  'wx.cond.fog': 'ضباب',
  'wx.cond.drizzle': 'رذاذ',
  'wx.cond.rain': 'مطر',
  'wx.cond.freezingRain': 'مطر متجمد',
  'wx.cond.snow': 'ثلج',
  'wx.cond.showers': 'زخات مطر',
  'wx.cond.snowShowers': 'زخات ثلج',
  'wx.cond.thunder': 'عاصفة رعدية',
  'wx.dir.n': 'شمال',
  'wx.dir.ne': 'شمال شرق',
  'wx.dir.e': 'شرق',
  'wx.dir.se': 'جنوب شرق',
  'wx.dir.s': 'جنوب',
  'wx.dir.sw': 'جنوب غرب',
  'wx.dir.w': 'غرب',
  'wx.dir.nw': 'شمال غرب',
};

// One entry per locale. es (P3A), it (P6), pt (P7A), fr (P8-P6), de
// (P9-inline), ja (P10K), zh (Z2) and ar (AR-1) are all real dictionaries now —
// every registered locale has a translated UI chrome.
const UI_STRINGS: Partial<Record<Locale, Dict>> = {
  en: EN,
  es: ES,
  it: IT,
  pt: PT,
  fr: FR,
  de: DE,
  ja: JA,
  zh: ZH,
  ar: AR,
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
