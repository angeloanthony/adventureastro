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
  'a11y.breadcrumb': 'Localização',
  'a11y.relatedArticles': 'Artigos relacionados',
  'a11y.allArticlesInHub': 'Todos os artigos desta categoria',
  'a11y.keyTakeaways': 'Pontos-chave',
  'a11y.relatedGuides': 'Guias relacionados',

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
  "a11y.breadcrumb": "Fil d'Ariane",
  'a11y.relatedArticles': 'Articles connexes',
  'a11y.allArticlesInHub': 'Tous les articles de cette catégorie',
  'a11y.keyTakeaways': 'Points clés',
  'a11y.relatedGuides': 'Guides connexes',

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
  'a11y.breadcrumb': 'Brotkrümelnavigation',
  'a11y.relatedArticles': 'Verwandte Artikel',
  'a11y.allArticlesInHub': 'Alle Artikel dieser Kategorie',
  'a11y.keyTakeaways': 'Das Wichtigste in Kürze',
  'a11y.relatedGuides': 'Verwandte Guides',

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
};

// One entry per locale. es (P3A), it (P6), pt (P7A), fr (P8-P6), and de
// (P9-inline) are all real dictionaries now — every registered locale has a
// translated UI chrome.
const UI_STRINGS: Partial<Record<Locale, Dict>> = {
  en: EN,
  es: ES,
  it: IT,
  pt: PT,
  fr: FR,
  de: DE,
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
