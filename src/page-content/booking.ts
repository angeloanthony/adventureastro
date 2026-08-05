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

const PT = `

  <!-- Página -->
  <div class="booking-page">

    <!-- Cabeçalho -->
    <div class="page-header">
      <h1 class="page-title">Reserva a Tua Aventura</h1>
      <p class="page-subtitle">Todos os tours usam UTVs Kawasaki KRX 1000 side-by-side com guias locais especializados — escolhe o teu trilho ao reservar!</p>
      <div style="text-align:center;margin-top:12px;"><span style="display:inline-flex;align-items:center;gap:8px;padding:7px 15px;border:1px solid rgba(212,118,78,0.35);border-radius:999px;background:rgba(212,118,78,0.08);font-size:0.95rem;color:#4a4139;"><span aria-hidden="true" style="color:#e6a817;letter-spacing:1px;">★★★★★</span> <span><strong>${SITE.rating.value}</strong> &middot; ${SITE.rating.count} avaliações do Google</span></span></div>
      <div class="calendar-badge">
        📅 Calendário ao Vivo &bull; Reserva Instantânea &bull; Vê os Horários Disponíveis
      </div>

      <!-- INTEGRAÇÃO EM LINHA DO CAL.COM -->
<div id="cal-booking-inline" style="width:100%; min-height:700px; margin-top:30px; border-radius:12px; overflow:hidden;"></div>
    </div>

    <!-- Secção de Trilhos -->
    <section class="tours-section">
      <div class="section-intro">
        <h2>5 Trilhos para Explorar</h2>
        <p>Explora os nossos trilhos abaixo, depois clica em <strong>"Reserva a Tua Aventura"</strong> para escolheres a tua data, hora e trilho — tudo num só lugar.</p>
      </div>

      <p style="max-width:820px;margin:1rem auto 0;padding:0 1rem;text-align:center;line-height:1.7;">Seja qual for o trilho que escolhas abaixo, cada tour guiado parte do mesmo ponto de partida em Vernal. Este diagrama mostra os cinco sistemas de trilhos que podes escolher ao reservar.</p>

      <figure style="margin:2.5rem auto;max-width:820px;text-align:center;">
        <img src="/images/maps/vernal-utv-trail-systems.svg" alt="Diagrama esquemático de reserva que mostra os cinco sistemas de trilhos UTV que os hóspedes podem escolher perto de Vernal, Utah — Doc's Beach, Moonshine Arch, Ashley Gorge, Asphalt Ridge e Outlaw Trail — cada um representado como um raio identificado que parte do único ponto de partida dos tours em Vernal onde cada tour começa. Sem escala; não mostra rotas, distâncias, direções nem início de trilhos." width="1600" height="1200" loading="lazy" decoding="async" />
        <figcaption style="margin-top:0.75rem;font-size:0.9rem;line-height:1.6;color:#6E655C;">Escolhe qualquer um dos cinco sistemas de trilhos ao reservar — todos os tours partem de um único ponto de partida em Vernal. Apenas esquemático, sem escala.</figcaption>
      </figure>

      <div class="tours-grid">

        <!-- Doc's Beach -->
        <div class="tour-card">
          <div class="tour-image" style="background-image: url('/images/Docs Beach.webp');">
            <span class="difficulty-badge trail-badge">Doc's Beach</span>
          </div>
          <div class="tour-content">
            <h3 class="tour-title">Doc's Beach</h3>
            <p class="tour-description">Desce até um dos destinos ribeirinhos mais adorados de Vernal. Leitos de areia do deserto, terreno aberto e vistas deslumbrantes do corredor do Green River fazem deste um favorito para todos os níveis de habilidade.</p>
            <div class="tour-details">
              <div class="tour-detail">
                <span class="tour-detail-icon">📍</span>
                <span>Zona do Green River</span>
              </div>
              <div class="tour-detail">
                <span class="tour-detail-icon">⭐</span>
                <span>Todos os Níveis</span>
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
            <p class="tour-description">Serpenteia por escarpados canyons de rocha vermelha até um deslumbrante arco natural de arenito escondido nas profundezas do backcountry. Um destino cénico e inesquecível que rivaliza com os parques mais famosos de Utah — sem as multidões.</p>
            <div class="tour-details">
              <div class="tour-detail">
                <span class="tour-detail-icon">📍</span>
                <span>Canyon de Rocha Vermelha</span>
              </div>
              <div class="tour-detail">
                <span class="tour-detail-icon">⭐</span>
                <span>Cénico e Histórico</span>
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
            <p class="tour-description">Desce até ao dramático corredor do canyon de Ashley Gorge, onde imponentes paredes de arenito emolduram um sinuoso vale fluvial. Um dos percursos mais impressionantes de todo o Uintah Basin.</p>
            <div class="tour-details">
              <div class="tour-detail">
                <span class="tour-detail-icon">📍</span>
                <span>Ashley National Forest</span>
              </div>
              <div class="tour-detail">
                <span class="tour-detail-icon">⭐</span>
                <span>Aventura no Canyon</span>
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
            <p class="tour-description">Percorre a rota outrora usada por Butch Cassidy e pelo Wild Bunch. Este histórico trilho no backcountry atravessa terras de canyons e vastos planaltos de deserto alto onde os foras-da-lei outrora desapareciam na natureza selvagem.</p>
            <div class="tour-details">
              <div class="tour-detail">
                <span class="tour-detail-icon">📍</span>
                <span>Terra dos Canyons</span>
              </div>
              <div class="tour-detail">
                <span class="tour-detail-icon">⭐</span>
                <span>Rota Histórica</span>
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
            <p class="tour-description">Sobe até ao topo de Asphalt Ridge para vistas panorâmicas de 360 graus sobre a Terra dos Dinossauros, as Uintah Mountains e o vasto deserto alto abaixo. A experiência UTV definitiva no topo de uma crista, perto de Vernal.</p>
            <div class="tour-details">
              <div class="tour-detail">
                <span class="tour-detail-icon">📍</span>
                <span>Crista do Uintah Basin</span>
              </div>
              <div class="tour-detail">
                <span class="tour-detail-icon">⭐</span>
                <span>Vistas Panorâmicas</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    <div style="text-align:center; margin-top:50px; padding:20px 0;">
      <p style="font-size:1.05rem; color:#666; font-family:var(--font-body);">Usa o calendário acima para escolheres a tua data e trilho.</p>
    </div>

    </section>

    <!-- Secção de Ajuda -->
    <section class="help-section">
      <h3>Precisas de Ajuda para Reservar?</h3>
      <p>Liga-nos e ajudamos-te pessoalmente a escolher o trilho perfeito e a encontrar um horário que funcione para ti.</p>
      <a href="tel:435-219-9447" class="phone-cta">(435) 219-9447</a>
      <p class="hours">Aberto Todos os Dias &bull; 7am – 7pm Hora da Montanha</p>
    </section>

  </div>

  <!-- Botão Flutuante para Móvel -->
  <div class="mobile-sticky-cta">
    <button onclick="window.open('https://cal.com/adventuretoursvernal/trails', '_blank')">Reserva o Teu Passeio Agora</button>
  </div>

  <!-- Script de Integração em Linha do Cal.com -->
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

const DE = `

  <!-- Seite -->
  <div class="booking-page">

    <!-- Kopfbereich -->
    <div class="page-header">
      <h1 class="page-title">Buche dein Abenteuer</h1>
      <p class="page-subtitle">Alle Touren nutzen Kawasaki KRX 1000 Side-by-Sides mit erfahrenen ortskundigen Guides — wähle deine Piste bei der Buchung!</p>
      <div style="text-align:center;margin-top:12px;"><span style="display:inline-flex;align-items:center;gap:8px;padding:7px 15px;border:1px solid rgba(212,118,78,0.35);border-radius:999px;background:rgba(212,118,78,0.08);font-size:0.95rem;color:#4a4139;"><span aria-hidden="true" style="color:#e6a817;letter-spacing:1px;">★★★★★</span> <span><strong>${SITE.rating.value}</strong> &middot; ${SITE.rating.count} Google-Bewertungen</span></span></div>
      <div class="calendar-badge">
        📅 Live-Kalender &bull; Sofortbuchung &bull; Sieh dir die verfügbaren Zeiten an
      </div>

      <!-- CAL.COM INLINE-EMBED -->
<div id="cal-booking-inline" style="width:100%; min-height:700px; margin-top:30px; border-radius:12px; overflow:hidden;"></div>
    </div>

    <!-- Pisten-Bereich -->
    <section class="tours-section">
      <div class="section-intro">
        <h2>5 Pisten zum Erkunden</h2>
        <p>Schau dir unsere Pisten unten an und klicke dann auf <strong>"Buche dein Abenteuer"</strong>, um Datum, Uhrzeit und Piste auszuwählen — alles an einem Ort.</p>
      </div>

      <p style="max-width:820px;margin:1rem auto 0;padding:0 1rem;text-align:center;line-height:1.7;">Egal, welche Piste du unten wählst, jede geführte Tour startet vom selben Treffpunkt in Vernal. Dieses Diagramm zeigt die fünf Pistensysteme, aus denen du bei der Buchung wählen kannst.</p>

      <figure style="margin:2.5rem auto;max-width:820px;text-align:center;">
        <img src="/images/maps/vernal-utv-trail-systems.svg" alt="Schematisches Buchungsdiagramm, das die fünf UTV-Pistensysteme zeigt, die Gäste in der Nähe von Vernal, Utah, wählen können — Doc's Beach, Moonshine Arch, Ashley Gorge, Asphalt Ridge und Outlaw Trail — jeweils als beschrifteter Strahl dargestellt, der vom einzigen Vernal-Tour-Treffpunkt ausgeht, an dem jede Tour beginnt. Nicht maßstabsgetreu; es zeigt keine Routen, Entfernungen, Richtungen oder Startpunkte." width="1600" height="1200" loading="lazy" decoding="async" />
        <figcaption style="margin-top:0.75rem;font-size:0.9rem;line-height:1.6;color:#6E655C;">Wähle bei der Buchung eines der fünf Pistensysteme — alle Touren starten von einem Treffpunkt in Vernal. Nur schematisch, nicht maßstabsgetreu.</figcaption>
      </figure>

      <div class="tours-grid">

        <!-- Doc's Beach -->
        <div class="tour-card">
          <div class="tour-image" style="background-image: url('/images/Docs Beach.webp');">
            <span class="difficulty-badge trail-badge">Doc's Beach</span>
          </div>
          <div class="tour-content">
            <h3 class="tour-title">Doc's Beach</h3>
            <p class="tour-description">Fahr hinunter zu einem der beliebtesten Ziele am Fluss in Vernal. Sandige Wüstenrinnen, offenes Gelände und beeindruckende Ausblicke auf den Green-River-Korridor machen diesen Ort zum Favoriten für alle Erfahrungsstufen.</p>
            <div class="tour-details">
              <div class="tour-detail">
                <span class="tour-detail-icon">📍</span>
                <span>Green-River-Gebiet</span>
              </div>
              <div class="tour-detail">
                <span class="tour-detail-icon">⭐</span>
                <span>Alle Erfahrungsstufen</span>
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
            <p class="tour-description">Schlängle dich durch schroffe Rotfels-Canyons zu einem atemberaubenden natürlichen Sandsteinbogen, tief versteckt im Backcountry. Ein malerisches, unvergessliches Ziel, das es mit Utahs berühmtesten Parks aufnehmen kann — nur ohne die Menschenmassen.</p>
            <div class="tour-details">
              <div class="tour-detail">
                <span class="tour-detail-icon">📍</span>
                <span>Rotfels-Canyon</span>
              </div>
              <div class="tour-detail">
                <span class="tour-detail-icon">⭐</span>
                <span>Malerisch &amp; Historisch</span>
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
            <p class="tour-description">Tauche ab in den dramatischen Canyon-Korridor von Ashley Gorge, wo hoch aufragende Sandsteinwände ein gewundenes Flusstal einrahmen. Eine der eindrucksvollsten Fahrten im gesamten Uintah Basin.</p>
            <div class="tour-details">
              <div class="tour-detail">
                <span class="tour-detail-icon">📍</span>
                <span>Ashley National Forest</span>
              </div>
              <div class="tour-detail">
                <span class="tour-detail-icon">⭐</span>
                <span>Canyon-Abenteuer</span>
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
            <p class="tour-description">Fahr die Route, die einst von Butch Cassidy und der Wild Bunch genutzt wurde. Diese historische Backcountry-Piste führt durch Canyon-Land und weite Hochwüsten-Plateaus, auf denen Gesetzlose einst in der Wildnis verschwanden.</p>
            <div class="tour-details">
              <div class="tour-detail">
                <span class="tour-detail-icon">📍</span>
                <span>Canyon-Land</span>
              </div>
              <div class="tour-detail">
                <span class="tour-detail-icon">⭐</span>
                <span>Historische Route</span>
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
            <p class="tour-description">Steig hinauf zum Gipfel von Asphalt Ridge für einen 360-Grad-Panoramablick auf das Land der Dinosaurier, die Uintah Mountains und die weite Hochwüste darunter. Das ultimative UTV-Erlebnis auf einem Gebirgskamm, nahe Vernal.</p>
            <div class="tour-details">
              <div class="tour-detail">
                <span class="tour-detail-icon">📍</span>
                <span>Uintah-Basin-Kamm</span>
              </div>
              <div class="tour-detail">
                <span class="tour-detail-icon">⭐</span>
                <span>Panoramablick</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    <div style="text-align:center; margin-top:50px; padding:20px 0;">
      <p style="font-size:1.05rem; color:#666; font-family:var(--font-body);">Nutze den Kalender oben, um dein Datum und deine Piste auszuwählen.</p>
    </div>

    </section>

    <!-- Hilfe-Bereich -->
    <section class="help-section">
      <h3>Brauchst du Hilfe bei der Buchung?</h3>
      <p>Ruf uns an und wir helfen dir persönlich, die perfekte Piste zu finden und eine Zeit, die für dich passt.</p>
      <a href="tel:435-219-9447" class="phone-cta">(435) 219-9447</a>
      <p class="hours">Täglich geöffnet &bull; 7am – 7pm Mountain-Zeit</p>
    </section>

  </div>

  <!-- Mobiler Sticky-Button -->
  <div class="mobile-sticky-cta">
    <button onclick="window.open('https://cal.com/adventuretoursvernal/trails', '_blank')">Jetzt deine Tour buchen</button>
  </div>

  <!-- Cal.com Inline-Embed-Skript -->
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

const JA = `

  <!-- ページ -->
  <div class="booking-page">

    <!-- ヘッダー -->
    <div class="page-header">
      <h1 class="page-title">アドベンチャーをご予約ください</h1>
      <p class="page-subtitle">すべてのツアーでKawasaki KRX 1000のサイド・バイ・サイドを使用し、地元を知り尽くしたガイドがご案内します — ご予約時にお好きなトレイルをお選びください！</p>
      <div style="text-align:center;margin-top:12px;"><span style="display:inline-flex;align-items:center;gap:8px;padding:7px 15px;border:1px solid rgba(212,118,78,0.35);border-radius:999px;background:rgba(212,118,78,0.08);font-size:0.95rem;color:#4a4139;"><span aria-hidden="true" style="color:#e6a817;letter-spacing:1px;">★★★★★</span> <span><strong>${SITE.rating.value}</strong> &middot; ${SITE.rating.count}件のGoogleレビュー</span></span></div>
      <div class="calendar-badge">
        📅 リアルタイムカレンダー &bull; 即時予約 &bull; 空き時間を確認
      </div>

      <!-- CAL.COM インライン埋め込み -->
<div id="cal-booking-inline" style="width:100%; min-height:700px; margin-top:30px; border-radius:12px; overflow:hidden;"></div>
    </div>

    <!-- トレイルのセクション -->
    <section class="tours-section">
      <div class="section-intro">
        <h2>探索できる5つのトレイル</h2>
        <p>下のトレイルをご覧いただき、<strong>「アドベンチャーをご予約ください」</strong>から日付・時間・トレイルをまとめてお選びください。</p>
      </div>

      <p style="max-width:820px;margin:1rem auto 0;padding:0 1rem;text-align:center;line-height:1.7;">下のどのトレイルをお選びいただいても、ガイド付きツアーはすべてバーナルの同じ集合場所から出発します。この図は、ご予約時にお選びいただける5つのトレイルシステムを示しています。</p>

      <figure style="margin:2.5rem auto;max-width:820px;text-align:center;">
        <img src="/images/maps/vernal-utv-trail-systems.svg" alt="Vernal, Utah周辺でゲストがお選びいただける5つのUTVトレイルシステム — Doc's Beach、Moonshine Arch、Ashley Gorge、Asphalt Ridge、Outlaw Trail — を示す予約用の概略図。すべてのツアーが始まるVernalの唯一の集合場所から放射状に伸びる、ラベル付きの線としてそれぞれを表示しています。縮尺は正確ではありません。ルート、距離、方角、トレイルヘッドは示していません。" width="1600" height="1200" loading="lazy" decoding="async" />
        <figcaption style="margin-top:0.75rem;font-size:0.9rem;line-height:1.6;color:#6E655C;">ご予約時に5つのトレイルシステムのいずれかをお選びください — すべてのツアーはVernalの1か所の集合場所から出発します。概略図のみで、縮尺は正確ではありません。</figcaption>
      </figure>

      <div class="tours-grid">

        <!-- Doc's Beach -->
        <div class="tour-card">
          <div class="tour-image" style="background-image: url('/images/Docs Beach.webp');">
            <span class="difficulty-badge trail-badge">Doc's Beach</span>
          </div>
          <div class="tour-content">
            <h3 class="tour-title">Doc's Beach</h3>
            <p class="tour-description">バーナルで最も愛されている川沿いの目的地のひとつまで下っていきます。砂地の砂漠のワッシュ、開けた地形、そしてGreen River沿いの見事な眺めが、あらゆるスキルレベルの方に人気の理由です。</p>
            <div class="tour-details">
              <div class="tour-detail">
                <span class="tour-detail-icon">📍</span>
                <span>Green Riverエリア</span>
              </div>
              <div class="tour-detail">
                <span class="tour-detail-icon">⭐</span>
                <span>あらゆるスキルレベル</span>
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
            <p class="tour-description">荒々しい赤い岩のキャニオンを縫うように進み、バックカントリーの奥深くに隠れた見事な天然の砂岩アーチへ向かいます。ユタ州で最も有名な国立公園にも引けを取らない景観を持ちながら、混雑とは無縁の忘れられない目的地です。</p>
            <div class="tour-details">
              <div class="tour-detail">
                <span class="tour-detail-icon">📍</span>
                <span>レッドロックキャニオン</span>
              </div>
              <div class="tour-detail">
                <span class="tour-detail-icon">⭐</span>
                <span>景観 &amp; 歴史</span>
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
            <p class="tour-description">そびえ立つ砂岩の壁が曲がりくねった川の谷を縁取る、迫力あるAshley Gorgeのキャニオン地帯へと下っていきます。Uintah Basin全体でも屈指の、目を見張るライドです。</p>
            <div class="tour-details">
              <div class="tour-detail">
                <span class="tour-detail-icon">📍</span>
                <span>Ashley National Forest</span>
              </div>
              <div class="tour-detail">
                <span class="tour-detail-icon">⭐</span>
                <span>キャニオンアドベンチャー</span>
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
            <p class="tour-description">かつてButch Cassidyとthe Wild Bunchが使ったルートを走ります。この歴史あるバックカントリートレイルは、無法者たちがかつて荒野へと姿を消したキャニオン地帯と、広々とした高地砂漠の台地を貫いています。</p>
            <div class="tour-details">
              <div class="tour-detail">
                <span class="tour-detail-icon">📍</span>
                <span>キャニオンカントリー</span>
              </div>
              <div class="tour-detail">
                <span class="tour-detail-icon">⭐</span>
                <span>歴史あるルート</span>
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
            <p class="tour-description">Asphalt Ridgeの頂上まで登り、Dinosaur Country、Uintah Mountains、そして眼下に広がる広大な高地砂漠の360度の眺望を楽しみます。バーナル周辺で味わえる、尾根の上での究極のUTV体験です。</p>
            <div class="tour-details">
              <div class="tour-detail">
                <span class="tour-detail-icon">📍</span>
                <span>Uintah Basinの尾根</span>
              </div>
              <div class="tour-detail">
                <span class="tour-detail-icon">⭐</span>
                <span>パノラマの眺め</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    <div style="text-align:center; margin-top:50px; padding:20px 0;">
      <p style="font-size:1.05rem; color:#666; font-family:var(--font-body);">上のカレンダーから、日付とトレイルをお選びください。</p>
    </div>

    </section>

    <!-- ヘルプのセクション -->
    <section class="help-section">
      <h3>ご予約でお困りですか？</h3>
      <p>お電話ください。ぴったりのトレイル選びと、ご都合の良い時間探しを私たちが直接お手伝いします。</p>
      <a href="tel:435-219-9447" class="phone-cta">(435) 219-9447</a>
      <p class="hours">年中無休 &bull; 7am – 7pm マウンテンタイム</p>
    </section>

  </div>

  <!-- モバイル固定CTA -->
  <div class="mobile-sticky-cta">
    <button onclick="window.open('https://cal.com/adventuretoursvernal/trails', '_blank')">今すぐツアーを予約する</button>
  </div>

  <!-- Cal.com インライン埋め込みスクリプト -->
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

const ZH = `

  <!-- 页面 -->
  <div class="booking-page">

    <!-- 页眉 -->
    <div class="page-header">
      <h1 class="page-title">预订你的探险之旅</h1>
      <p class="page-subtitle">所有行程均使用 Kawasaki KRX 1000 并排越野车，由熟悉当地的资深向导带队 — 预订时挑选你的越野路线！</p>
      <div style="text-align:center;margin-top:12px;"><span style="display:inline-flex;align-items:center;gap:8px;padding:7px 15px;border:1px solid rgba(212,118,78,0.35);border-radius:999px;background:rgba(212,118,78,0.08);font-size:0.95rem;color:#4a4139;"><span aria-hidden="true" style="color:#e6a817;letter-spacing:1px;">★★★★★</span> <span><strong>${SITE.rating.value}</strong> &middot; ${SITE.rating.count} 条 Google 评论</span></span></div>
      <div class="calendar-badge">
        📅 实时日历 &bull; 即时预订 &bull; 查看可预约时间
      </div>

      <!-- CAL.COM INLINE EMBED -->
<div id="cal-booking-inline" style="width:100%; min-height:700px; margin-top:30px; border-radius:12px; overflow:hidden;"></div>
    </div>

    <!-- 越野路线部分 -->
    <section class="tours-section">
      <div class="section-intro">
        <h2>5 条可探索的越野路线</h2>
        <p>在下方浏览我们的越野路线，然后点击 <strong>“预订你的探险之旅”</strong>，在同一处选好日期、时间和路线。</p>
      </div>

      <p style="max-width:820px;margin:1rem auto 0;padding:0 1rem;text-align:center;line-height:1.7;">无论你在下方选择哪条路线，每次导览游都从 Vernal 同一个集合点出发。这张示意图展示了你在预订时可以选择的五套越野路线系统。</p>

      <figure style="margin:2.5rem auto;max-width:820px;text-align:center;">
        <img src="/images/maps/vernal-utv-trail-systems.svg" alt="预订用示意图，展示宾客在 Vernal, Utah 附近可选的五套 UTV 越野路线系统 — Doc's Beach、Moonshine Arch、Ashley Gorge、Asphalt Ridge 和 Outlaw Trail — 每条都以带标签的辐射线呈现，从每次行程出发的 Vernal 唯一集合点向外延伸。图非按比例绘制；不显示路线、距离、方向或登山口。" width="1600" height="1200" loading="lazy" decoding="async" />
        <figcaption style="margin-top:0.75rem;font-size:0.9rem;line-height:1.6;color:#6E655C;">预订时任选五套越野路线系统之一 — 所有行程都从 Vernal 的一个集合点出发。仅为示意图，非按比例绘制。</figcaption>
      </figure>

      <div class="tours-grid">

        <!-- Doc's Beach -->
        <div class="tour-card">
          <div class="tour-image" style="background-image: url('/images/Docs Beach.webp');">
            <span class="difficulty-badge trail-badge">Doc's Beach</span>
          </div>
          <div class="tour-content">
            <h3 class="tour-title">Doc's Beach</h3>
            <p class="tour-description">一路驶向 Vernal 最受喜爱的河畔目的地之一。沙质的沙漠冲沟、开阔的地形，以及 Green River 河道沿线的壮丽景色，让这里成为各种水平骑手的心头好。</p>
            <div class="tour-details">
              <div class="tour-detail">
                <span class="tour-detail-icon">📍</span>
                <span>Green River 一带</span>
              </div>
              <div class="tour-detail">
                <span class="tour-detail-icon">⭐</span>
                <span>适合各种水平</span>
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
            <p class="tour-description">在崎岖的红岩峡谷间穿行，抵达一座藏在荒野深处的壮丽天然砂岩拱门。这处景色迷人、令人难忘的目的地足以媲美犹他州最著名的公园 — 却没有人潮。</p>
            <div class="tour-details">
              <div class="tour-detail">
                <span class="tour-detail-icon">📍</span>
                <span>红岩峡谷</span>
              </div>
              <div class="tour-detail">
                <span class="tour-detail-icon">⭐</span>
                <span>景色 &amp; 历史</span>
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
            <p class="tour-description">深入壮观的 Ashley Gorge 峡谷地带，高耸的砂岩崖壁环抱着一条蜿蜒的河谷。这是整个 Uintah Basin 里视觉冲击力数一数二的一段越野。</p>
            <div class="tour-details">
              <div class="tour-detail">
                <span class="tour-detail-icon">📍</span>
                <span>Ashley National Forest</span>
              </div>
              <div class="tour-detail">
                <span class="tour-detail-icon">⭐</span>
                <span>峡谷探险</span>
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
            <p class="tour-description">骑行在当年 Butch Cassidy 与 Wild Bunch 使用过的路线上。这条历史悠久的荒野越野路线穿越峡谷地带和开阔的高地沙漠台地，昔日不法之徒曾在此遁入荒野。</p>
            <div class="tour-details">
              <div class="tour-detail">
                <span class="tour-detail-icon">📍</span>
                <span>峡谷之乡</span>
              </div>
              <div class="tour-detail">
                <span class="tour-detail-icon">⭐</span>
                <span>历史路线</span>
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
            <p class="tour-description">登上 Asphalt Ridge 之巅，360 度饱览恐龙之乡、Uintah Mountains 以及脚下辽阔的高地沙漠。这是 Vernal 周边极致的山脊 UTV 体验。</p>
            <div class="tour-details">
              <div class="tour-detail">
                <span class="tour-detail-icon">📍</span>
                <span>Uintah Basin 山脊</span>
              </div>
              <div class="tour-detail">
                <span class="tour-detail-icon">⭐</span>
                <span>全景视野</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    <div style="text-align:center; margin-top:50px; padding:20px 0;">
      <p style="font-size:1.05rem; color:#666; font-family:var(--font-body);">用上方的日历挑选你的日期和越野路线。</p>
    </div>

    </section>

    <!-- 帮助部分 -->
    <section class="help-section">
      <h3>预订需要帮助吗？</h3>
      <p>给我们打个电话，我们会亲自帮你挑选最合适的越野路线，并找到适合你的时间。</p>
      <a href="tel:435-219-9447" class="phone-cta">(435) 219-9447</a>
      <p class="hours">每日营业 &bull; 7am – 7pm 山区时间</p>
    </section>

  </div>

  <!-- Mobile Sticky CTA -->
  <div class="mobile-sticky-cta">
    <button onclick="window.open('https://cal.com/adventuretoursvernal/trails', '_blank')">立即预订你的越野之旅</button>
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

// AR — AR-2 Phase F batch 2. The Cal.com embed script, the `cal-booking-inline` element id,
// every style attribute and both `${SITE.rating.*}` interpolations are preserved verbatim:
// they are functional, not linguistic, exactly as the file header says of the other locales.
//
// Opening hours are SPELLED OUT rather than carried over as `7am – 7pm`. Probe slot 1
// measured `7am` and `7pm` safe bare, but the dashed range joining them was not measured,
// and §3.6's standing guidance is that the corpus spells measures out. Writing
// `من 7 صباحًا حتى 7 مساءً` reads better in Arabic and removes the question entirely.
const AR = `

  <!-- الصفحة -->
  <div class="booking-page">

    <!-- الترويسة -->
    <div class="page-header">
      <h1 class="page-title">احجز مغامرتك</h1>
      <p class="page-subtitle">تستخدم جميع الجولات مركبات Kawasaki KRX 1000 بمقعدين مع مرشدين محليين خبراء — اختر مسارك عند الحجز!</p>
      <div style="text-align:center;margin-top:12px;"><span style="display:inline-flex;align-items:center;gap:8px;padding:7px 15px;border:1px solid rgba(212,118,78,0.35);border-radius:999px;background:rgba(212,118,78,0.08);font-size:0.95rem;color:#4a4139;"><span aria-hidden="true" style="color:#e6a817;letter-spacing:1px;">★★★★★</span> <span><strong>${SITE.rating.value}</strong> &middot; ${SITE.rating.count} تقييمًا على Google</span></span></div>
      <div class="calendar-badge">
        📅 تقويم مباشر &bull; حجز فوري &bull; اطّلع على الأوقات المتاحة
      </div>

      <!-- CAL.COM INLINE EMBED -->
<div id="cal-booking-inline" style="width:100%; min-height:700px; margin-top:30px; border-radius:12px; overflow:hidden;"></div>
    </div>

    <!-- قسم المسارات -->
    <section class="tours-section">
      <div class="section-intro">
        <h2>5 مسارات لاستكشافها</h2>
        <p>تصفّح مساراتنا أدناه، ثم اضغط <strong>"احجز مغامرتك"</strong> لاختيار التاريخ والوقت والمسار — في مكان واحد.</p>
      </div>

      <p style="max-width:820px;margin:1rem auto 0;padding:0 1rem;text-align:center;line-height:1.7;">أيًّا كان المسار الذي تختاره أدناه، تنطلق كل جولة مُرشَدة من نقطة التجمّع نفسها في Vernal. ويوضّح هذا الرسم أنظمة المسارات الخمسة التي يمكنك الاختيار منها عند الحجز.</p>

      <figure style="margin:2.5rem auto;max-width:820px;text-align:center;">
        <img src="/images/maps/vernal-utv-trail-systems.svg" alt="رسم تخطيطي للحجز يوضّح أنظمة مسارات UTV الخمسة التي يمكن للضيوف الاختيار منها قرب Vernal في يوتا — مسار Doc's Beach ومسار Moonshine Arch ومسار Ashley Gorge ومسار Asphalt Ridge ومسار Outlaw Trail — ويظهر كل منها فرعًا معنونًا يتفرّع من نقطة تجمّع الجولات الوحيدة في Vernal حيث تبدأ كل جولة. الرسم ليس بمقياس رسم، ولا يعرض طرقًا ولا مسافات ولا اتجاهات ولا مداخل مسارات." width="1600" height="1200" loading="lazy" decoding="async" />
        <figcaption style="margin-top:0.75rem;font-size:0.9rem;line-height:1.6;color:#6E655C;">اختر أيًّا من أنظمة المسارات الخمسة عند الحجز — تنطلق كل الجولات من نقطة تجمّع واحدة في Vernal. رسم تخطيطي فقط، وليس بمقياس رسم.</figcaption>
      </figure>

      <div class="tours-grid">

        <!-- Doc's Beach -->
        <div class="tour-card">
          <div class="tour-image" style="background-image: url('/images/Docs Beach.webp');">
            <span class="difficulty-badge trail-badge">Doc's Beach</span>
          </div>
          <div class="tour-content">
            <h3 class="tour-title">Doc's Beach</h3>
            <p class="tour-description">انطلق نزولًا إلى واحدة من أحبّ وجهات Vernal على ضفاف النهر. المجاري الرملية الصحراوية والتضاريس المفتوحة والإطلالات الخلابة على ممر Green River تجعل منه مفضّلًا لكل المستويات.</p>
            <div class="tour-details">
              <div class="tour-detail">
                <span class="tour-detail-icon">📍</span>
                <span>منطقة Green River</span>
              </div>
              <div class="tour-detail">
                <span class="tour-detail-icon">⭐</span>
                <span>كل المستويات</span>
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
            <p class="tour-description">تلوَّ في أخاديد الصخر الأحمر الوعرة وصولًا إلى قوس رملي طبيعي مذهل مخبّأ في عمق المناطق النائية. وجهة بديعة لا تُنسى تنافس أشهر منتزهات يوتا — دون زحام.</p>
            <div class="tour-details">
              <div class="tour-detail">
                <span class="tour-detail-icon">📍</span>
                <span>أخدود الصخر الأحمر</span>
              </div>
              <div class="tour-detail">
                <span class="tour-detail-icon">⭐</span>
                <span>بديع وتاريخي</span>
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
            <p class="tour-description">انحدر إلى ممر أخدود Ashley Gorge المهيب حيث تؤطّر الجدران الرملية الشاهقة واديًا نهريًا متعرّجًا. وهي من أكثر الجولات إبهارًا للنظر في منطقة Uintah Basin كلها.</p>
            <div class="tour-details">
              <div class="tour-detail">
                <span class="tour-detail-icon">📍</span>
                <span>غابة Ashley National Forest</span>
              </div>
              <div class="tour-detail">
                <span class="tour-detail-icon">⭐</span>
                <span>مغامرة أخاديد</span>
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
            <p class="tour-description">اسلك الطريق الذي استخدمته يومًا عصابة Butch Cassidy and the Wild Bunch. يشقّ هذا المسار التاريخي في المناطق النائية بلاد الأخاديد وهضاب الصحراء المرتفعة المفتوحة حيث كان الخارجون على القانون يختفون في البرّية.</p>
            <div class="tour-details">
              <div class="tour-detail">
                <span class="tour-detail-icon">📍</span>
                <span>بلاد الأخاديد</span>
              </div>
              <div class="tour-detail">
                <span class="tour-detail-icon">⭐</span>
                <span>طريق تاريخي</span>
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
            <p class="tour-description">اصعد إلى قمة Asphalt Ridge لتحظى بإطلالات شاملة بزاوية 360 درجة على أرض الديناصورات وجبال Uintah والصحراء المرتفعة الشاسعة في الأسفل. إنها تجربة UTV المثلى على قمم الحواف قرب Vernal.</p>
            <div class="tour-details">
              <div class="tour-detail">
                <span class="tour-detail-icon">📍</span>
                <span>حافة Uintah Basin</span>
              </div>
              <div class="tour-detail">
                <span class="tour-detail-icon">⭐</span>
                <span>إطلالات بانورامية</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    <div style="text-align:center; margin-top:50px; padding:20px 0;">
      <p style="font-size:1.05rem; color:#666; font-family:var(--font-body);">استخدم التقويم أعلاه لاختيار التاريخ والمسار.</p>
    </div>

    </section>

    <!-- قسم المساعدة -->
    <section class="help-section">
      <h3>تحتاج مساعدة في الحجز؟</h3>
      <p>اتصل بنا وسنساعدك شخصيًا على اختيار المسار الأنسب وإيجاد وقت يناسبك.</p>
      <a href="tel:435-219-9447" class="phone-cta"><bdi>(435) 219-9447</bdi></a>
      <p class="hours">نفتح يوميًا &bull; من 7 صباحًا حتى 7 مساءً بالتوقيت الجبلي</p>
    </section>

  </div>

  <!-- شريط الحجز الثابت للجوال -->
  <div class="mobile-sticky-cta">
    <button onclick="window.open('https://cal.com/adventuretoursvernal/trails', '_blank')">احجز جولتك الآن</button>
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

/**
 * Locale-aware accessor (P2D pattern; Spanish populated P3A, Arabic AR-2 Phase F
 * batch 2). Every locale without a committed variant falls back to English. Callers
 * that don't need locale awareness keep importing `bodyHtml` directly.
 */
export function getBodyHtml(locale: string = DEFAULT_LOCALE): string {
  if (locale === 'es') return ES;
  if (locale === 'it') return IT;
  if (locale === 'pt') return PT;
  if (locale === 'fr') return FR;
  if (locale === 'de') return DE;
  if (locale === 'zh') return ZH;
  if (locale === 'ja') return JA;
  if (locale === 'ar') return AR;
  return bodyHtml;
}
