// booking.ts — extracted page body content (P2C). English source of truth
// for this page's body; rendered via set:html. Spanish variant added
// P3A (formal "usted"). The Cal.com embed script is functional, not
// linguistic — kept byte-identical (same calLink) in both locales.
import { SITE } from '../config/site';
import { DEFAULT_LOCALE } from '../lib/i18n';

export const bodyHtml = `

  <!-- Page -->
  <div class="booking-page">

    <!-- Header -->
    <div class="page-header">
      <h1 class="page-title">Book Your Adventure</h1>
      <p class="page-subtitle">All tours use Kawasaki KRX 1000 side-by-sides with expert local guides — pick your trail when you book!</p>
      <div style="text-align:center;margin-top:12px;"><span style="display:inline-flex;align-items:center;gap:8px;padding:7px 15px;border:1px solid rgba(212,118,78,0.35);border-radius:999px;background:rgba(212,118,78,0.08);font-size:0.95rem;color:#4a4139;"><span aria-hidden="true" style="color:#e6a817;letter-spacing:1px;">★★★★★</span> <span><strong>${SITE.rating.value}</strong> &middot; ${SITE.rating.count} Google reviews</span></span></div>
      <div class="calendar-badge">
        📅 Live Calendar &bull; Instant Booking &bull; See Available Times
      </div>

      <!-- CAL.COM INLINE EMBED -->
<div id="cal-booking-inline" style="width:100%; min-height:700px; margin-top:30px; border-radius:12px; overflow:hidden;"></div>
    </div>

    <!-- Trails Section -->
    <section class="tours-section">
      <div class="section-intro">
        <h2>5 Trails to Explore</h2>
        <p>Browse our trails below, then hit <strong>"Book Your Adventure"</strong> to pick your date, time, and trail — all in one place.</p>
      </div>

      <p style="max-width:820px;margin:1rem auto 0;padding:0 1rem;text-align:center;line-height:1.7;">Whichever trail you choose below, every guided tour departs from the same staging point in Vernal. This diagram shows the five trail systems you can pick from when you book.</p>

      <figure style="margin:2.5rem auto;max-width:820px;text-align:center;">
        <img src="/images/maps/vernal-utv-trail-systems.svg" alt="Schematic booking diagram showing the five UTV trail systems guests can choose near Vernal, Utah — Doc's Beach, Moonshine Arch, Ashley Gorge, Asphalt Ridge, and Outlaw Trail — each shown as a labeled spoke radiating from the single Vernal tour staging point where every tour begins. Not to scale; it shows no routes, distances, directions, or trailheads." width="1600" height="1200" loading="lazy" decoding="async" />
        <figcaption style="margin-top:0.75rem;font-size:0.9rem;line-height:1.6;color:#6E655C;">Pick any of the five trail systems when you book — all tours leave from one Vernal staging point. Schematic only, not to scale.</figcaption>
      </figure>

      <div class="tours-grid">

        <!-- Doc's Beach -->
        <div class="tour-card">
          <div class="tour-image" style="background-image: url('/images/Docs Beach.webp');">
            <span class="difficulty-badge trail-badge">Doc's Beach</span>
          </div>
          <div class="tour-content">
            <h3 class="tour-title">Doc's Beach</h3>
            <p class="tour-description">Ride down to one of Vernal's most beloved riverside destinations. Sandy desert washes, open terrain, and stunning views of the Green River corridor make this a favorite for all skill levels.</p>
            <div class="tour-details">
              <div class="tour-detail">
                <span class="tour-detail-icon">📍</span>
                <span>Green River Area</span>
              </div>
              <div class="tour-detail">
                <span class="tour-detail-icon">⭐</span>
                <span>All Skill Levels</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Moonshine Arch -->
        <div class="tour-card">
          <div class="tour-image" style="background-image: url('/images/Moonshine Arch.webp');">
            <span class="difficulty-badge trail-badge">Moonshine Arch</span>
          </div>
          <div class="tour-content">
            <h3 class="tour-title">Moonshine Arch</h3>
            <p class="tour-description">Wind through rugged red rock canyons to a stunning natural sandstone arch hidden deep in the backcountry. A scenic and unforgettable destination that rivals Utah's most famous parks — without the crowds.</p>
            <div class="tour-details">
              <div class="tour-detail">
                <span class="tour-detail-icon">📍</span>
                <span>Red Rock Canyon</span>
              </div>
              <div class="tour-detail">
                <span class="tour-detail-icon">⭐</span>
                <span>Scenic &amp; Historic</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Ashley Gorge -->
        <div class="tour-card">
          <div class="tour-image" style="background-image: url('/images/50a.webp');">
            <span class="difficulty-badge trail-badge">Ashley Gorge</span>
          </div>
          <div class="tour-content">
            <h3 class="tour-title">Ashley Gorge</h3>
            <p class="tour-description">Descend into the dramatic Ashley Gorge canyon corridor where towering sandstone walls frame a winding river valley. One of the most visually striking rides in the entire Uintah Basin.</p>
            <div class="tour-details">
              <div class="tour-detail">
                <span class="tour-detail-icon">📍</span>
                <span>Ashley National Forest</span>
              </div>
              <div class="tour-detail">
                <span class="tour-detail-icon">⭐</span>
                <span>Canyon Adventure</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Outlaw Trail -->
        <div class="tour-card">
          <div class="tour-image" style="background-image: url('/images/51a.webp');">
            <span class="difficulty-badge trail-badge">Outlaw Trail</span>
          </div>
          <div class="tour-content">
            <h3 class="tour-title">Outlaw Trail</h3>
            <p class="tour-description">Ride the route once used by Butch Cassidy and the Wild Bunch. This historic backcountry trail cuts through canyon country and wide-open high desert plateaus where outlaws once vanished into the wilderness.</p>
            <div class="tour-details">
              <div class="tour-detail">
                <span class="tour-detail-icon">📍</span>
                <span>Canyon Country</span>
              </div>
              <div class="tour-detail">
                <span class="tour-detail-icon">⭐</span>
                <span>Historic Route</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Asphalt Ridge -->
        <div class="tour-card">
          <div class="tour-image" style="background-image: url('/images/52a.webp');">
            <span class="difficulty-badge trail-badge">Asphalt Ridge</span>
          </div>
          <div class="tour-content">
            <h3 class="tour-title">Asphalt Ridge</h3>
            <p class="tour-description">Climb to the top of Asphalt Ridge for sweeping 360-degree views of Dinosaur Country, the Uintah Mountains, and the vast high desert below. The ultimate ridge-top UTV experience near Vernal.</p>
            <div class="tour-details">
              <div class="tour-detail">
                <span class="tour-detail-icon">📍</span>
                <span>Uintah Basin Ridge</span>
              </div>
              <div class="tour-detail">
                <span class="tour-detail-icon">⭐</span>
                <span>Panoramic Views</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    <div style="text-align:center; margin-top:50px; padding:20px 0;">
      <p style="font-size:1.05rem; color:#666; font-family:var(--font-body);">Use the calendar above to pick your date and trail.</p>
    </div>

    </section>

    <!-- Help Section -->
    <section class="help-section">
      <h3>Need Help Booking?</h3>
      <p>Give us a call and we'll personally help you choose the perfect trail and find a time that works for you.</p>
      <a href="tel:435-219-9447" class="phone-cta">(435) 219-9447</a>
      <p class="hours">Open Daily &bull; 7am – 7pm Mountain Time</p>
    </section>

  </div>

  <!-- Mobile Sticky CTA -->
  <div class="mobile-sticky-cta">
    <button onclick="window.open('https://cal.com/adventuretoursvernal/trails', '_blank')">Book Your Ride Now</button>
  </div>

  <!-- Cal.com Inline Embed Script -->
<script is:inline type="text/javascript">
  (function (C, A, L) {
    let p = function (a, ar) { a.q.push(ar); };
    let d = C.document;
    C.Cal = C.Cal || function () {
      let cal = C.Cal; let ar = arguments;
      if (!cal.loaded) {
        cal.ns = {}; cal.q = cal.q || [];
        d.head.appendChild(d.createElement("script")).src = A;
        cal.loaded = true;
      }
      if (ar[0] === L) {
        const api = function () { p(api, arguments); };
        const namespace = ar[1];
        api.q = api.q || [];
        if (typeof namespace === "string") {
          cal.ns[namespace] = cal.ns[namespace] || api;
          p(cal.ns[namespace], ar);
          p(cal, [L, namespace, ar[2]]);
        } else p(cal, ar);
        return;
      }
      p(cal, ar);
    };
  })(window, "https://app.cal.com/embed/embed.js", "init");

  Cal("init", { origin: "https://cal.com" });

  Cal("inline", {
  elementOrSelector: "#cal-booking-inline",
  calLink: "adventuretoursvernal/trails",
  layout: "month_view",
  config: { 
    duration: 180,
    overlayCalendar: true
  }
});

  Cal("ui", {
    theme: "light",
    styles: { branding: { brandColor: "#d4764e" } },
    hideEventTypeDetails: false,
    layout: "month_view"
  });
</script>
`;

const ES = `

  <!-- Página -->
  <div class="booking-page">

    <!-- Encabezado -->
    <div class="page-header">
      <h1 class="page-title">Reserve Su Aventura</h1>
      <p class="page-subtitle">Todos los tours utilizan UTV Kawasaki KRX 1000 con guías locales expertos — ¡elija su sendero al reservar!</p>
      <div style="text-align:center;margin-top:12px;"><span style="display:inline-flex;align-items:center;gap:8px;padding:7px 15px;border:1px solid rgba(212,118,78,0.35);border-radius:999px;background:rgba(212,118,78,0.08);font-size:0.95rem;color:#4a4139;"><span aria-hidden="true" style="color:#e6a817;letter-spacing:1px;">★★★★★</span> <span><strong>${SITE.rating.value}</strong> &middot; ${SITE.rating.count} reseñas de Google</span></span></div>
      <div class="calendar-badge">
        📅 Calendario en Vivo &bull; Reserva Instantánea &bull; Vea los Horarios Disponibles
      </div>

      <!-- INCRUSTACIÓN EN LÍNEA DE CAL.COM -->
<div id="cal-booking-inline" style="width:100%; min-height:700px; margin-top:30px; border-radius:12px; overflow:hidden;"></div>
    </div>

    <!-- Sección de Senderos -->
    <section class="tours-section">
      <div class="section-intro">
        <h2>5 Senderos para Explorar</h2>
        <p>Explore nuestros senderos a continuación, luego presione <strong>"Reserve Su Aventura"</strong> para elegir su fecha, hora y sendero — todo en un solo lugar.</p>
      </div>

      <p style="max-width:820px;margin:1rem auto 0;padding:0 1rem;text-align:center;line-height:1.7;">Sin importar el sendero que elija a continuación, cada tour guiado sale del mismo punto de encuentro en Vernal. Este diagrama muestra los cinco sistemas de senderos entre los que puede elegir al reservar.</p>

      <figure style="margin:2.5rem auto;max-width:820px;text-align:center;">
        <img src="/images/maps/vernal-utv-trail-systems.svg" alt="Diagrama esquemático de reserva que muestra los cinco sistemas de senderos en UTV que los huéspedes pueden elegir cerca de Vernal, Utah — Doc's Beach, Moonshine Arch, Ashley Gorge, Asphalt Ridge y Outlaw Trail — cada uno representado como un radio etiquetado que parte del único punto de encuentro de tours en Vernal donde comienza cada recorrido. No está a escala; no muestra rutas, distancias, direcciones ni cabeceras de sendero." width="1600" height="1200" loading="lazy" decoding="async" />
        <figcaption style="margin-top:0.75rem;font-size:0.9rem;line-height:1.6;color:#6E655C;">Elija cualquiera de los cinco sistemas de senderos al reservar — todos los tours salen de un solo punto de encuentro en Vernal. Solo esquemático, no a escala.</figcaption>
      </figure>

      <div class="tours-grid">

        <!-- Doc's Beach -->
        <div class="tour-card">
          <div class="tour-image" style="background-image: url('/images/Docs Beach.webp');">
            <span class="difficulty-badge trail-badge">Doc's Beach</span>
          </div>
          <div class="tour-content">
            <h3 class="tour-title">Doc's Beach</h3>
            <p class="tour-description">Descienda hasta uno de los destinos ribereños más queridos de Vernal. Los cauces de arena del desierto, el terreno abierto y las impresionantes vistas del corredor del Green River hacen de este un favorito para todos los niveles de habilidad.</p>
            <div class="tour-details">
              <div class="tour-detail">
                <span class="tour-detail-icon">📍</span>
                <span>Zona del Green River</span>
              </div>
              <div class="tour-detail">
                <span class="tour-detail-icon">⭐</span>
                <span>Todos los Niveles</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Moonshine Arch -->
        <div class="tour-card">
          <div class="tour-image" style="background-image: url('/images/Moonshine Arch.webp');">
            <span class="difficulty-badge trail-badge">Moonshine Arch</span>
          </div>
          <div class="tour-content">
            <h3 class="tour-title">Moonshine Arch</h3>
            <p class="tour-description">Serpentee por escarpados cañones de roca roja hasta un impresionante arco natural de piedra arenisca escondido en lo profundo de la zona agreste. Un destino escénico e inolvidable que rivaliza con los parques más famosos de Utah, sin las multitudes.</p>
            <div class="tour-details">
              <div class="tour-detail">
                <span class="tour-detail-icon">📍</span>
                <span>Cañón de Roca Roja</span>
              </div>
              <div class="tour-detail">
                <span class="tour-detail-icon">⭐</span>
                <span>Escénico e Histórico</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Ashley Gorge -->
        <div class="tour-card">
          <div class="tour-image" style="background-image: url('/images/50a.webp');">
            <span class="difficulty-badge trail-badge">Ashley Gorge</span>
          </div>
          <div class="tour-content">
            <h3 class="tour-title">Ashley Gorge</h3>
            <p class="tour-description">Descienda al dramático corredor del cañón de Ashley Gorge, donde imponentes paredes de piedra arenisca enmarcan un sinuoso valle fluvial. Uno de los recorridos más impresionantes de toda la Cuenca de Uintah.</p>
            <div class="tour-details">
              <div class="tour-detail">
                <span class="tour-detail-icon">📍</span>
                <span>Ashley National Forest</span>
              </div>
              <div class="tour-detail">
                <span class="tour-detail-icon">⭐</span>
                <span>Aventura en Cañón</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Outlaw Trail -->
        <div class="tour-card">
          <div class="tour-image" style="background-image: url('/images/51a.webp');">
            <span class="difficulty-badge trail-badge">Outlaw Trail</span>
          </div>
          <div class="tour-content">
            <h3 class="tour-title">Outlaw Trail</h3>
            <p class="tour-description">Recorra la ruta que alguna vez usaron Butch Cassidy y su Wild Bunch. Este histórico sendero de la zona agreste atraviesa tierras de cañones y amplias mesetas del alto desierto donde los forajidos alguna vez desaparecían en la naturaleza.</p>
            <div class="tour-details">
              <div class="tour-detail">
                <span class="tour-detail-icon">📍</span>
                <span>Tierra de Cañones</span>
              </div>
              <div class="tour-detail">
                <span class="tour-detail-icon">⭐</span>
                <span>Ruta Histórica</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Asphalt Ridge -->
        <div class="tour-card">
          <div class="tour-image" style="background-image: url('/images/52a.webp');">
            <span class="difficulty-badge trail-badge">Asphalt Ridge</span>
          </div>
          <div class="tour-content">
            <h3 class="tour-title">Asphalt Ridge</h3>
            <p class="tour-description">Suba hasta la cima de Asphalt Ridge para disfrutar de vistas panorámicas de 360 grados de Dinosaur Country, las Montañas Uintah y el vasto alto desierto que se extiende abajo. La experiencia definitiva en UTV sobre una cresta, cerca de Vernal.</p>
            <div class="tour-details">
              <div class="tour-detail">
                <span class="tour-detail-icon">📍</span>
                <span>Cresta de la Cuenca de Uintah</span>
              </div>
              <div class="tour-detail">
                <span class="tour-detail-icon">⭐</span>
                <span>Vistas Panorámicas</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    <div style="text-align:center; margin-top:50px; padding:20px 0;">
      <p style="font-size:1.05rem; color:#666; font-family:var(--font-body);">Use el calendario de arriba para elegir su fecha y sendero.</p>
    </div>

    </section>

    <!-- Sección de Ayuda -->
    <section class="help-section">
      <h3>¿Necesita Ayuda para Reservar?</h3>
      <p>Llámenos y con gusto le ayudaremos personalmente a elegir el sendero perfecto y encontrar un horario que le funcione.</p>
      <a href="tel:435-219-9447" class="phone-cta">(435) 219-9447</a>
      <p class="hours">Abierto Todos los Días &bull; 7am – 7pm Hora de la Montaña</p>
    </section>

  </div>

  <!-- Botón flotante para móvil -->
  <div class="mobile-sticky-cta">
    <button onclick="window.open('https://cal.com/adventuretoursvernal/trails', '_blank')">Reserve Su Recorrido Ahora</button>
  </div>

  <!-- Script de incrustación en línea de Cal.com -->
<script is:inline type="text/javascript">
  (function (C, A, L) {
    let p = function (a, ar) { a.q.push(ar); };
    let d = C.document;
    C.Cal = C.Cal || function () {
      let cal = C.Cal; let ar = arguments;
      if (!cal.loaded) {
        cal.ns = {}; cal.q = cal.q || [];
        d.head.appendChild(d.createElement("script")).src = A;
        cal.loaded = true;
      }
      if (ar[0] === L) {
        const api = function () { p(api, arguments); };
        const namespace = ar[1];
        api.q = api.q || [];
        if (typeof namespace === "string") {
          cal.ns[namespace] = cal.ns[namespace] || api;
          p(cal.ns[namespace], ar);
          p(cal, [L, namespace, ar[2]]);
        } else p(cal, ar);
        return;
      }
      p(cal, ar);
    };
  })(window, "https://app.cal.com/embed/embed.js", "init");

  Cal("init", { origin: "https://cal.com" });

  Cal("inline", {
  elementOrSelector: "#cal-booking-inline",
  calLink: "adventuretoursvernal/trails",
  layout: "month_view",
  config: {
    duration: 180,
    overlayCalendar: true
  }
});

  Cal("ui", {
    theme: "light",
    styles: { branding: { brandColor: "#d4764e" } },
    hideEventTypeDetails: false,
    layout: "month_view"
  });
</script>
`;

const IT = `

  <!-- Pagina -->
  <div class="booking-page">

    <!-- Intestazione -->
    <div class="page-header">
      <h1 class="page-title">Prenoti la Sua Avventura</h1>
      <p class="page-subtitle">Tutti i tour utilizzano UTV Kawasaki KRX 1000 con guide locali esperte — scelga il Suo sentiero al momento della prenotazione!</p>
      <div style="text-align:center;margin-top:12px;"><span style="display:inline-flex;align-items:center;gap:8px;padding:7px 15px;border:1px solid rgba(212,118,78,0.35);border-radius:999px;background:rgba(212,118,78,0.08);font-size:0.95rem;color:#4a4139;"><span aria-hidden="true" style="color:#e6a817;letter-spacing:1px;">★★★★★</span> <span><strong>${SITE.rating.value}</strong> &middot; ${SITE.rating.count} recensioni su Google</span></span></div>
      <div class="calendar-badge">
        📅 Calendario in Tempo Reale &bull; Prenotazione Istantanea &bull; Veda gli Orari Disponibili
      </div>

      <!-- EMBED IN LINEA DI CAL.COM -->
<div id="cal-booking-inline" style="width:100%; min-height:700px; margin-top:30px; border-radius:12px; overflow:hidden;"></div>
    </div>

    <!-- Sezione Sentieri -->
    <section class="tours-section">
      <div class="section-intro">
        <h2>5 Sentieri da Esplorare</h2>
        <p>Esplori i nostri sentieri qui sotto, poi prema <strong>"Prenoti la Sua Avventura"</strong> per scegliere data, ora e sentiero — tutto in un unico posto.</p>
      </div>

      <p style="max-width:820px;margin:1rem auto 0;padding:0 1rem;text-align:center;line-height:1.7;">Qualunque sentiero scelga qui sotto, ogni tour guidato parte dallo stesso punto di ritrovo a Vernal. Questo diagramma mostra i cinque sistemi di sentieri tra cui può scegliere al momento della prenotazione.</p>

      <figure style="margin:2.5rem auto;max-width:820px;text-align:center;">
        <img src="/images/maps/vernal-utv-trail-systems.svg" alt="Diagramma schematico di prenotazione che mostra i cinque sistemi di sentieri UTV tra cui gli ospiti possono scegliere vicino a Vernal, Utah — Doc's Beach, Moonshine Arch, Ashley Gorge, Asphalt Ridge e Outlaw Trail — ciascuno rappresentato come un raggio etichettato che si irradia dall'unico punto di ritrovo dei tour a Vernal dove ha inizio ogni tour. Non in scala; non mostra percorsi, distanze, direzioni o inizi del sentiero." width="1600" height="1200" loading="lazy" decoding="async" />
        <figcaption style="margin-top:0.75rem;font-size:0.9rem;line-height:1.6;color:#6E655C;">Scelga uno qualsiasi dei cinque sistemi di sentieri al momento della prenotazione — tutti i tour partono da un unico punto di ritrovo a Vernal. Solo schematico, non in scala.</figcaption>
      </figure>

      <div class="tours-grid">

        <!-- Doc's Beach -->
        <div class="tour-card">
          <div class="tour-image" style="background-image: url('/images/Docs Beach.webp');">
            <span class="difficulty-badge trail-badge">Doc's Beach</span>
          </div>
          <div class="tour-content">
            <h3 class="tour-title">Doc's Beach</h3>
            <p class="tour-description">Scenda fino a una delle destinazioni fluviali più amate di Vernal. I letti di sabbia del deserto, il terreno aperto e le splendide viste sul corridoio del Green River la rendono una destinazione preferita per tutti i livelli di abilità.</p>
            <div class="tour-details">
              <div class="tour-detail">
                <span class="tour-detail-icon">📍</span>
                <span>Zona del Green River</span>
              </div>
              <div class="tour-detail">
                <span class="tour-detail-icon">⭐</span>
                <span>Tutti i Livelli</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Moonshine Arch -->
        <div class="tour-card">
          <div class="tour-image" style="background-image: url('/images/Moonshine Arch.webp');">
            <span class="difficulty-badge trail-badge">Moonshine Arch</span>
          </div>
          <div class="tour-content">
            <h3 class="tour-title">Moonshine Arch</h3>
            <p class="tour-description">Si snodi tra aspri canyon di roccia rossa fino a uno splendido arco naturale di arenaria nascosto nel profondo del backcountry. Una destinazione panoramica e indimenticabile che rivaleggia con i parchi più famosi dello Utah — senza la folla.</p>
            <div class="tour-details">
              <div class="tour-detail">
                <span class="tour-detail-icon">📍</span>
                <span>Canyon di Roccia Rossa</span>
              </div>
              <div class="tour-detail">
                <span class="tour-detail-icon">⭐</span>
                <span>Panoramico e Storico</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Ashley Gorge -->
        <div class="tour-card">
          <div class="tour-image" style="background-image: url('/images/50a.webp');">
            <span class="difficulty-badge trail-badge">Ashley Gorge</span>
          </div>
          <div class="tour-content">
            <h3 class="tour-title">Ashley Gorge</h3>
            <p class="tour-description">Scenda nel drammatico corridoio del canyon di Ashley Gorge, dove imponenti pareti di arenaria incorniciano una sinuosa vallata fluviale. Uno dei percorsi più suggestivi di tutto lo Uintah Basin.</p>
            <div class="tour-details">
              <div class="tour-detail">
                <span class="tour-detail-icon">📍</span>
                <span>Ashley National Forest</span>
              </div>
              <div class="tour-detail">
                <span class="tour-detail-icon">⭐</span>
                <span>Avventura nel Canyon</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Outlaw Trail -->
        <div class="tour-card">
          <div class="tour-image" style="background-image: url('/images/51a.webp');">
            <span class="difficulty-badge trail-badge">Outlaw Trail</span>
          </div>
          <div class="tour-content">
            <h3 class="tour-title">Outlaw Trail</h3>
            <p class="tour-description">Percorra la strada un tempo usata da Butch Cassidy e dalla Wild Bunch. Questo storico sentiero nel backcountry attraversa terre di canyon e ampi altopiani di alto deserto dove un tempo i fuorilegge sparivano nella natura selvaggia.</p>
            <div class="tour-details">
              <div class="tour-detail">
                <span class="tour-detail-icon">📍</span>
                <span>Terra dei Canyon</span>
              </div>
              <div class="tour-detail">
                <span class="tour-detail-icon">⭐</span>
                <span>Percorso Storico</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Asphalt Ridge -->
        <div class="tour-card">
          <div class="tour-image" style="background-image: url('/images/52a.webp');">
            <span class="difficulty-badge trail-badge">Asphalt Ridge</span>
          </div>
          <div class="tour-content">
            <h3 class="tour-title">Asphalt Ridge</h3>
            <p class="tour-description">Salga in cima ad Asphalt Ridge per viste panoramiche a 360 gradi sulla Terra dei Dinosauri, sulle Uintah Mountains e sul vasto alto deserto sottostante. L'esperienza UTV definitiva in cresta, vicino a Vernal.</p>
            <div class="tour-details">
              <div class="tour-detail">
                <span class="tour-detail-icon">📍</span>
                <span>Cresta dello Uintah Basin</span>
              </div>
              <div class="tour-detail">
                <span class="tour-detail-icon">⭐</span>
                <span>Viste Panoramiche</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    <div style="text-align:center; margin-top:50px; padding:20px 0;">
      <p style="font-size:1.05rem; color:#666; font-family:var(--font-body);">Usi il calendario qui sopra per scegliere la Sua data e il Suo sentiero.</p>
    </div>

    </section>

    <!-- Sezione di Aiuto -->
    <section class="help-section">
      <h3>Ha Bisogno di Aiuto per Prenotare?</h3>
      <p>Ci chiami e La aiuteremo personalmente a scegliere il sentiero perfetto e a trovare un orario adatto a Lei.</p>
      <a href="tel:435-219-9447" class="phone-cta">(435) 219-9447</a>
      <p class="hours">Aperto Tutti i Giorni &bull; 7am – 7pm Ora della Montagna</p>
    </section>

  </div>

  <!-- Pulsante flottante per mobile -->
  <div class="mobile-sticky-cta">
    <button onclick="window.open('https://cal.com/adventuretoursvernal/trails', '_blank')">Prenoti il Suo Tour Ora</button>
  </div>

  <!-- Script embed in linea di Cal.com -->
<script is:inline type="text/javascript">
  (function (C, A, L) {
    let p = function (a, ar) { a.q.push(ar); };
    let d = C.document;
    C.Cal = C.Cal || function () {
      let cal = C.Cal; let ar = arguments;
      if (!cal.loaded) {
        cal.ns = {}; cal.q = cal.q || [];
        d.head.appendChild(d.createElement("script")).src = A;
        cal.loaded = true;
      }
      if (ar[0] === L) {
        const api = function () { p(api, arguments); };
        const namespace = ar[1];
        api.q = api.q || [];
        if (typeof namespace === "string") {
          cal.ns[namespace] = cal.ns[namespace] || api;
          p(cal.ns[namespace], ar);
          p(cal, [L, namespace, ar[2]]);
        } else p(cal, ar);
        return;
      }
      p(cal, ar);
    };
  })(window, "https://app.cal.com/embed/embed.js", "init");

  Cal("init", { origin: "https://cal.com" });

  Cal("inline", {
  elementOrSelector: "#cal-booking-inline",
  calLink: "adventuretoursvernal/trails",
  layout: "month_view",
  config: {
    duration: 180,
    overlayCalendar: true
  }
});

  Cal("ui", {
    theme: "light",
    styles: { branding: { brandColor: "#d4764e" } },
    hideEventTypeDetails: false,
    layout: "month_view"
  });
</script>
`;

const FR = `

  <!-- Page -->
  <div class="booking-page">

    <!-- En-tête -->
    <div class="page-header">
      <h1 class="page-title">Réservez Votre Aventure</h1>
      <p class="page-subtitle">Tous les tours utilisent des UTV Kawasaki KRX 1000 side-by-side avec des guides locaux experts — choisissez votre piste au moment de la réservation&nbsp;!</p>
      <div style="text-align:center;margin-top:12px;"><span style="display:inline-flex;align-items:center;gap:8px;padding:7px 15px;border:1px solid rgba(212,118,78,0.35);border-radius:999px;background:rgba(212,118,78,0.08);font-size:0.95rem;color:#4a4139;"><span aria-hidden="true" style="color:#e6a817;letter-spacing:1px;">★★★★★</span> <span><strong>${SITE.rating.value}</strong> &middot; ${SITE.rating.count} avis Google</span></span></div>
      <div class="calendar-badge">
        📅 Calendrier en Direct &bull; Réservation Instantanée &bull; Consultez les Horaires Disponibles
      </div>

      <!-- INTÉGRATION EN LIGNE DE CAL.COM -->
<div id="cal-booking-inline" style="width:100%; min-height:700px; margin-top:30px; border-radius:12px; overflow:hidden;"></div>
    </div>

    <!-- Section des Pistes -->
    <section class="tours-section">
      <div class="section-intro">
        <h2>5 Pistes à Explorer</h2>
        <p>Parcourez nos pistes ci-dessous, puis cliquez sur <strong>"Réservez Votre Aventure"</strong> pour choisir votre date, votre heure et votre piste — le tout au même endroit.</p>
      </div>

      <p style="max-width:820px;margin:1rem auto 0;padding:0 1rem;text-align:center;line-height:1.7;">Quelle que soit la piste que vous choisissez ci-dessous, chaque tour guidé part du même point de départ à Vernal. Ce diagramme montre les cinq systèmes de pistes parmi lesquels vous pouvez choisir au moment de la réservation.</p>

      <figure style="margin:2.5rem auto;max-width:820px;text-align:center;">
        <img src="/images/maps/vernal-utv-trail-systems.svg" alt="Diagramme schématique de réservation montrant les cinq systèmes de pistes UTV que les clients peuvent choisir près de Vernal, Utah — Doc's Beach, Moonshine Arch, Ashley Gorge, Asphalt Ridge et Outlaw Trail — chacun représenté comme un rayon étiqueté partant du point de départ unique des tours à Vernal où commence chaque tour. Pas à l'échelle&nbsp;; il ne montre ni itinéraires, ni distances, ni directions, ni départs de piste." width="1600" height="1200" loading="lazy" decoding="async" />
        <figcaption style="margin-top:0.75rem;font-size:0.9rem;line-height:1.6;color:#6E655C;">Choisissez l'un des cinq systèmes de pistes au moment de la réservation — tous les tours partent d'un même point de départ à Vernal. Schématique uniquement, pas à l'échelle.</figcaption>
      </figure>

      <div class="tours-grid">

        <!-- Doc's Beach -->
        <div class="tour-card">
          <div class="tour-image" style="background-image: url('/images/Docs Beach.webp');">
            <span class="difficulty-badge trail-badge">Doc's Beach</span>
          </div>
          <div class="tour-content">
            <h3 class="tour-title">Doc's Beach</h3>
            <p class="tour-description">Descendez vers l'une des destinations riveraines les plus appréciées de Vernal. Des lits de sable désertiques, un terrain ouvert et des vues magnifiques sur le corridor du Green River en font un favori pour tous les niveaux.</p>
            <div class="tour-details">
              <div class="tour-detail">
                <span class="tour-detail-icon">📍</span>
                <span>Zone du Green River</span>
              </div>
              <div class="tour-detail">
                <span class="tour-detail-icon">⭐</span>
                <span>Tous Niveaux</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Moonshine Arch -->
        <div class="tour-card">
          <div class="tour-image" style="background-image: url('/images/Moonshine Arch.webp');">
            <span class="difficulty-badge trail-badge">Moonshine Arch</span>
          </div>
          <div class="tour-content">
            <h3 class="tour-title">Moonshine Arch</h3>
            <p class="tour-description">Serpentez à travers des canyons de roche rouge accidentés jusqu'à une magnifique arche naturelle de grès cachée au cœur du backcountry. Une destination panoramique et inoubliable qui rivalise avec les parcs les plus célèbres de l'Utah — sans la foule.</p>
            <div class="tour-details">
              <div class="tour-detail">
                <span class="tour-detail-icon">📍</span>
                <span>Canyon de Roche Rouge</span>
              </div>
              <div class="tour-detail">
                <span class="tour-detail-icon">⭐</span>
                <span>Panoramique et Historique</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Ashley Gorge -->
        <div class="tour-card">
          <div class="tour-image" style="background-image: url('/images/50a.webp');">
            <span class="difficulty-badge trail-badge">Ashley Gorge</span>
          </div>
          <div class="tour-content">
            <h3 class="tour-title">Ashley Gorge</h3>
            <p class="tour-description">Descendez dans le spectaculaire corridor du canyon d'Ashley Gorge, où d'imposantes parois de grès encadrent une vallée fluviale sinueuse. L'un des tours les plus impressionnants de tout l'Uintah Basin.</p>
            <div class="tour-details">
              <div class="tour-detail">
                <span class="tour-detail-icon">📍</span>
                <span>Ashley National Forest</span>
              </div>
              <div class="tour-detail">
                <span class="tour-detail-icon">⭐</span>
                <span>Aventure en Canyon</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Outlaw Trail -->
        <div class="tour-card">
          <div class="tour-image" style="background-image: url('/images/51a.webp');">
            <span class="difficulty-badge trail-badge">Outlaw Trail</span>
          </div>
          <div class="tour-content">
            <h3 class="tour-title">Outlaw Trail</h3>
            <p class="tour-description">Parcourez l'itinéraire autrefois emprunté par Butch Cassidy et la Wild Bunch. Cette piste historique du backcountry traverse un pays de canyons et de vastes plateaux de haut désert où les hors-la-loi disparaissaient autrefois dans la nature sauvage.</p>
            <div class="tour-details">
              <div class="tour-detail">
                <span class="tour-detail-icon">📍</span>
                <span>Pays des Canyons</span>
              </div>
              <div class="tour-detail">
                <span class="tour-detail-icon">⭐</span>
                <span>Itinéraire Historique</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Asphalt Ridge -->
        <div class="tour-card">
          <div class="tour-image" style="background-image: url('/images/52a.webp');">
            <span class="difficulty-badge trail-badge">Asphalt Ridge</span>
          </div>
          <div class="tour-content">
            <h3 class="tour-title">Asphalt Ridge</h3>
            <p class="tour-description">Montez au sommet d'Asphalt Ridge pour des vues panoramiques à 360 degrés sur la Terre des Dinosaures, les Uintah Mountains et le vaste haut désert en contrebas. L'expérience ultime en UTV sur une crête, près de Vernal.</p>
            <div class="tour-details">
              <div class="tour-detail">
                <span class="tour-detail-icon">📍</span>
                <span>Crête de l'Uintah Basin</span>
              </div>
              <div class="tour-detail">
                <span class="tour-detail-icon">⭐</span>
                <span>Vues Panoramiques</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    <div style="text-align:center; margin-top:50px; padding:20px 0;">
      <p style="font-size:1.05rem; color:#666; font-family:var(--font-body);">Utilisez le calendrier ci-dessus pour choisir votre date et votre piste.</p>
    </div>

    </section>

    <!-- Section d'Aide -->
    <section class="help-section">
      <h3>Besoin d'Aide pour Réserver&nbsp;?</h3>
      <p>Appelez-nous et nous vous aiderons personnellement à choisir la piste parfaite et à trouver un horaire qui vous convient.</p>
      <a href="tel:435-219-9447" class="phone-cta">(435) 219-9447</a>
      <p class="hours">Ouvert Tous les Jours &bull; 7am – 7pm Heure de la Montagne</p>
    </section>

  </div>

  <!-- Bouton flottant pour mobile -->
  <div class="mobile-sticky-cta">
    <button onclick="window.open('https://cal.com/adventuretoursvernal/trails', '_blank')">Réservez Votre Tour Maintenant</button>
  </div>

  <!-- Script d'intégration en ligne de Cal.com -->
<script is:inline type="text/javascript">
  (function (C, A, L) {
    let p = function (a, ar) { a.q.push(ar); };
    let d = C.document;
    C.Cal = C.Cal || function () {
      let cal = C.Cal; let ar = arguments;
      if (!cal.loaded) {
        cal.ns = {}; cal.q = cal.q || [];
        d.head.appendChild(d.createElement("script")).src = A;
        cal.loaded = true;
      }
      if (ar[0] === L) {
        const api = function () { p(api, arguments); };
        const namespace = ar[1];
        api.q = api.q || [];
        if (typeof namespace === "string") {
          cal.ns[namespace] = cal.ns[namespace] || api;
          p(cal.ns[namespace], ar);
          p(cal, [L, namespace, ar[2]]);
        } else p(cal, ar);
        return;
      }
      p(cal, ar);
    };
  })(window, "https://app.cal.com/embed/embed.js", "init");

  Cal("init", { origin: "https://cal.com" });

  Cal("inline", {
  elementOrSelector: "#cal-booking-inline",
  calLink: "adventuretoursvernal/trails",
  layout: "month_view",
  config: {
    duration: 180,
    overlayCalendar: true
  }
});

  Cal("ui", {
    theme: "light",
    styles: { branding: { brandColor: "#d4764e" } },
    hideEventTypeDetails: false,
    layout: "month_view"
  });
</script>
`;

/**
 * Locale-aware accessor (P2D pattern; Spanish populated P3A). Every
 * locale without a committed variant falls back to English. Callers that
 * don't need locale awareness keep importing `bodyHtml` directly.
 */
export function getBodyHtml(locale: string = DEFAULT_LOCALE): string {
  if (locale === 'es') return ES;
  if (locale === 'it') return IT;
  if (locale === 'fr') return FR;
  return bodyHtml;
}
