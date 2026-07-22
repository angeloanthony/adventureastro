// about.ts — extracted page body content (P2C). English source of truth
// for this page's body; rendered via set:html. Spanish variant added P3A
// (formal "usted" for the visitor-facing voice; Dave's first-person "I"
// in the Our History/Our Future story kept first-person singular, exactly
// mirroring the English narration).
import { DEFAULT_LOCALE } from '../lib/i18n';

export const bodyHtml = `
<!-- ================================================
     PAGE SUMMARY BLOCK — feeds Google AI Overviews
     and Bing Copilot. Placed at top of content.
     ================================================ -->
<p class="page-summary" style="position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;" aria-hidden="false">
  Adventure Tours Vernal is a locally owned UTV tour company in Vernal, Utah, founded by Dave and Trudy Wilson. Dave Wilson is the owner and lead guide, offering guided Kawasaki KRX 1000 side-by-side tours through the Uintah Basin. Rated 5.0 stars from 82 Google reviews. Call (435) 219-9447.
</p>

<!-- Hero Section — H1 now keyword-relevant while keeping brand voice -->
<section class="about-hero" style="position:relative; overflow:hidden;">
  <div class="about-hero-video-bg">
    <iframe
      src="https://www.youtube.com/embed/LsqbwVkwrbw?autoplay=1&mute=1&loop=1&playlist=LsqbwVkwrbw&controls=0&rel=0&playsinline=1"
      frameborder="0"
      allow="autoplay; encrypted-media"
      allowfullscreen>
    </iframe>
  </div>
  <div class="about-hero-overlay"></div>
  <div class="about-hero-content">
    <h1 class="about-hero-title">UTV Tours in Vernal, Utah — Built by Adventure</h1>
    <p class="about-hero-subtitle">Your Gateway to the Uintah Basin's Greatest Adventures</p>
    <p class="about-hero-subtitle" style="font-weight:600;">★★★★★ Rated 5.0 from 82 Google reviews — every tour personally guided by Dave &amp; Trudy Wilson</p>
  </div>
</section>

<!-- Main About Content -->
<section class="about-main">
  <div class="container">

    <!-- Mission Statement -->
    <div class="about-card mission-card">
      <div class="mission-content">
        <h2 class="about-heading">The First. The Best. The Ultimate UTV Experience.</h2>
        <p class="lead-text">We strive to not only become the first, but best UTV tour company in the Uintah Basin! Adventure Tours Vernal provides the safest and most thrilling adventures while using the best <strong>Kawasaki</strong> KRX Side-by-Sides.</p>
        <p>Our Adventure Tours showcase amazing trails of scenic canyons and elevated history. We include local treasures such as:</p>

        <div class="highlights-grid">
          <div class="highlight-item">
            <div class="highlight-icon">🏞️</div>
            <div class="highlight-text">
              <strong>Flaming Gorge</strong>
              <p>Stunning red rock canyons and pristine waters</p>
            </div>
            <div class="video-embed-wrapper">
              <iframe
                src="https://www.youtube.com/embed/tktE4GbS9gQ?si=PwYv9yMUs-yYAM4U"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen></iframe>
            </div>
          </div>
          <div class="highlight-item">
            <div class="highlight-icon">🦕</div>
            <div class="highlight-text">
              <strong>Dinosaur Monument</strong>
              <p>Ancient fossil beds and prehistoric landscapes</p>
            </div>
            <div class="video-embed-wrapper">
              <iframe
                src="https://www.youtube.com/embed/PoCN4Lo9Lkk?si=OYkfE56RP_uMcHoF"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen></iframe>
            </div>
          </div>
          <div class="highlight-item">
            <div class="highlight-icon">🛶</div>
            <div class="highlight-text">
              <strong>Green River</strong>
              <p>World-class rafting and fishing destination</p>
            </div>
            <div class="video-embed-wrapper">
              <iframe
                src="https://www.youtube.com/embed/p05cObabbjg?si=gjsw6MKCJHx6s6Vq"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen></iframe>
            </div>
          </div>
          <div class="highlight-item">
            <div class="highlight-icon">🗿</div>
            <div class="highlight-text">
              <strong>Ancient Petroglyphs</strong>
              <p>Thousands of years of indigenous history</p>
            </div>
            <div class="video-embed-wrapper">
              <iframe
                src="https://www.youtube.com/embed/fwzaXWfuFdk?si=Xt1_DCIPRzqx7QDL"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen></iframe>
            </div>
          </div>
          <div class="highlight-item">
            <div class="highlight-icon">⛰️</div>
            <div class="highlight-text">
              <strong>Uintah Mountains</strong>
              <p>Majestic peaks and alpine wilderness</p>
            </div>
            <div class="video-embed-wrapper">
              <iframe
                src="https://www.youtube.com/embed/AanVVzP0_oM?si=5GOFOiI5MBc5dm1D"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen></iframe>
            </div>
          </div>
          <div class="highlight-item">
            <div class="highlight-icon">🌈</div>
            <div class="highlight-text">
              <strong>Fantasy Canyon</strong>
              <p>Otherworldly rock formations and desert beauty</p>
            </div>
            <div class="video-embed-wrapper">
              <iframe
                src="https://www.youtube.com/embed/m64J-ovzTf4?si=FLULmmhzbq8zDzV2"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Our Story -->
    <div class="our-story-section">
      <div class="story-content">
        <h2 class="section-title">Our History</h2>
        <div class="story-text">
          <p class="story-intro">Adventure isn't just what we do—it's who we are.</p>

          <p>After growing up in the Salt Lake Valley and spending my youth exploring the Wasatch and Oquirrh Mountains I knew I had found a lifelong passion. As a child of the '80s, with a lot of freedom to roam, my brothers and I would go Mountain Biking, Jeeping, Hiking, Snowmobiling, Skiing, Camping, Horse Back Riding, Rappelling, Cliff Jumping, Cave Exploring, etc... We spent plenty of unforgettable weekends at our family cabin.</p>

          <p>From an early age, I knew the adrenaline rush is what I craved. After a few broken bones, and perhaps an axle or two, I never lost my spirit for the outdoors.</p>

          <p>My Beautiful-Amazing-Gorgeous-Awesome-Wonderful-Wife & Best Friend - Trudy and I moved to Vernal, Utah. After our relocation, we fell in love with the Uintah Basin area and decided to direct our passion towards sharing the natural wonders we have come to love so much with Friends, Family, and Visitors.</p>
        </div>
      </div>

      <!-- Family Photo Section -->
      <div class="family-section">
        <div class="family-photo-container">
          <img src="/images/wilson-family.webp" alt="Dave and Trudy Wilson, owners of Adventure Tours Vernal, with their family" class="family-photo">
          <div class="family-photo-caption">
            <h3>Meet the Wilson Family</h3>
            <p>Dave and Trudy Wilson with their four children and grandson</p>
            <p class="family-names">8 Boys, Ansley, Trinity, Scott, and Chandler - Little Z-man</p>
            <p class="guide-profile-links">Meet your guides: <a href="/about/dave/">Dave Wilson</a> &amp; <a href="/about/trudy/">Trudy Wilson</a></p>
          </div>
        </div>
      </div>
    </div>

    <!-- Our Future -->
    <div class="about-card future-card">
      <h2 class="about-heading">Our Future</h2>
      <div class="future-content">
        <p class="lead-text">Adventure Tours Vernal was born from our love of experiences.</p>

        <p>Once our family relocated we started investing in family memories. This lifelong passion led to the purchase of ATVs, Mountain Bikes, Snowmobiles, Boat, Camping, Hunting, and Fishing equipment and most of all the investment in our community of expanding friends and family.</p>

        <p>Our family found we were practically begging people to come visit the beauty we had found in our own backyard! In our personal outings we discovered caves, trails, experienced history, and enjoyed beautiful scenery beyond our expectations.</p>

        <p>Today we share that firsthand knowledge on every ride — from our <a href="/utv/backcountry-tours-vernal-utah/">guided backcountry tours</a> through remote canyons and petroglyph sites to the <a href="/utv/best-utv-trails-vernal/">five trail systems we run near Vernal</a>. It's the same country we explored ourselves, now scouted, mapped, and led in person.</p>

        <p>That "backyard" is bigger than one town. It's a multi-state region — Dinosaur National Monument reaching from Utah into Colorado, Flaming Gorge spilling north into Wyoming, the High Uintas rising to the west — with Vernal sitting right at its center.</p>

        <figure style="margin:2.5rem auto;max-width:820px;text-align:center;">
          <img src="/images/maps/vernal-dinosaur-country-overview.svg" alt="Schematic orientation diagram of Dinosaur Country as the multi-state region Adventure Tours Vernal calls home, centered on Vernal, Utah as the basecamp, with four labeled realms: Dinosaur National Monument (spanning Utah and Colorado), Flaming Gorge (reaching from Utah into Wyoming), the High Uintas and Ashley National Forest, and the surrounding Uintah Basin. It shows regional relationships only and is not to scale, distance, or compass direction; state labels show reach, not a mapped boundary." width="1600" height="1200" loading="lazy" decoding="async" />
          <figcaption style="margin-top:0.75rem;font-size:0.9rem;line-height:1.6;color:#6E655C;">The backyard we mean: a multi-state region reaching into Colorado and Wyoming, with Vernal at its heart. Orientation diagram, not to scale.</figcaption>
        </figure>

        <div class="vision-box">
          <h3>Our Vision</h3>
          <p>A.T.V. is here to indulge in the majestic scenery we have in our backyard. Come relax, and stay a while, you won't regret it!</p>
          <p>It's our hope you'll leave with unforgettable memories of the Uintah Basin - also with beautiful photos, fascinating history, and stories to tell your friends about.</p>
          <p><strong>You'll be back for more, we guarantee it!</strong></p>
        </div>
      </div>
    </div>

    <!-- Why Choose Us -->
    <div class="why-choose-section">
      <h2 class="section-title">Why Choose Adventure Tours Vernal?</h2>
      <div class="why-grid">
        <div class="why-item">
          <div class="why-icon">🏆</div>
          <h3>First & Best</h3>
          <p>The premier UTV tour company in the Uintah Basin</p>
        </div>
        <div class="why-item">
          <div class="why-icon">🛡️</div>
          <h3>Safety First</h3>
          <p>Top-of-the-line equipment and expert guides</p>
        </div>
        <div class="why-item">
          <div class="why-icon">🌟</div>
          <h3>Local Experts</h3>
          <p>We know this land like the back of our hand</p>
        </div>
        <div class="why-item">
          <div class="why-icon">❤️</div>
          <h3>Family Passion</h3>
          <p>Sharing our love of adventure with you</p>
        </div>
        <div class="why-item">
          <div class="why-icon">🏔️</div>
          <h3>Hidden Gems</h3>
          <p>Access to trails and views others don't know</p>
        </div>
        <div class="why-item">
          <div class="why-icon">✨</div>
          <h3>Unforgettable</h3>
          <p>Memories that last a lifetime</p>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="about-cta">
      <h2>Ready to Experience the Adventure?</h2>
      <p>Join the Wilson family and discover why Vernal, Utah is the ultimate outdoor playground.</p>
      <div class="cta-buttons">
        <a href="/booking/" class="cta-button primary">Book Your Adventure</a>
        <a href="tel:435-219-9447" class="cta-button secondary">📞 Call (435) 219-9447</a>
      </div>
    </div>

  </div>
</section>

<!-- Mobile Sticky CTA -->
<div class="mobile-sticky-cta">
  <button onclick="location.href='/booking/'">Book Your Ride Now</button>
</div>
`;

const ES = `
<!-- ================================================
     BLOQUE DE RESUMEN DE PÁGINA — para Google AI Overviews
     y Bing Copilot. Colocado al inicio del contenido.
     ================================================ -->
<p class="page-summary" style="position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;" aria-hidden="false">
  Adventure Tours Vernal es una empresa de tours en UTV de propiedad local en Vernal, Utah, fundada por Dave y Trudy Wilson. Dave Wilson es el propietario y guía principal, y ofrece tours guiados en UTV Kawasaki KRX 1000 por la Cuenca de Uintah. Calificado con 5.0 estrellas de 82 reseñas de Google. Llame al (435) 219-9447.
</p>

<!-- Sección Hero -->
<section class="about-hero" style="position:relative; overflow:hidden;">
  <div class="about-hero-video-bg">
    <iframe
      src="https://www.youtube.com/embed/LsqbwVkwrbw?autoplay=1&mute=1&loop=1&playlist=LsqbwVkwrbw&controls=0&rel=0&playsinline=1"
      frameborder="0"
      allow="autoplay; encrypted-media"
      allowfullscreen>
    </iframe>
  </div>
  <div class="about-hero-overlay"></div>
  <div class="about-hero-content">
    <h1 class="about-hero-title">Tours en UTV en Vernal, Utah — Construidos con Pasión por la Aventura</h1>
    <p class="about-hero-subtitle">Su puerta de entrada a las grandes aventuras de la Cuenca de Uintah</p>
    <p class="about-hero-subtitle" style="font-weight:600;">★★★★★ Calificado con 5.0 de 82 reseñas de Google — cada tour guiado personalmente por Dave y Trudy Wilson</p>
  </div>
</section>

<!-- Contenido Principal -->
<section class="about-main">
  <div class="container">

    <!-- Declaración de Misión -->
    <div class="about-card mission-card">
      <div class="mission-content">
        <h2 class="about-heading">La Primera. La Mejor. La Experiencia Definitiva en UTV.</h2>
        <p class="lead-text">¡Nos esforzamos por ser no solo la primera, sino la mejor empresa de tours en UTV de la Cuenca de Uintah! Adventure Tours Vernal ofrece las aventuras más seguras y emocionantes utilizando los mejores UTV <strong>Kawasaki</strong> KRX.</p>
        <p>Nuestros Tours de Aventura muestran senderos increíbles de cañones escénicos e historia elevada. Incluimos tesoros locales como:</p>

        <div class="highlights-grid">
          <div class="highlight-item">
            <div class="highlight-icon">🏞️</div>
            <div class="highlight-text">
              <strong>Flaming Gorge</strong>
              <p>Impresionantes cañones de roca roja y aguas cristalinas</p>
            </div>
            <div class="video-embed-wrapper">
              <iframe
                src="https://www.youtube.com/embed/tktE4GbS9gQ?si=PwYv9yMUs-yYAM4U"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen></iframe>
            </div>
          </div>
          <div class="highlight-item">
            <div class="highlight-icon">🦕</div>
            <div class="highlight-text">
              <strong>Monumento a los Dinosaurios</strong>
              <p>Antiguos yacimientos fósiles y paisajes prehistóricos</p>
            </div>
            <div class="video-embed-wrapper">
              <iframe
                src="https://www.youtube.com/embed/PoCN4Lo9Lkk?si=OYkfE56RP_uMcHoF"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen></iframe>
            </div>
          </div>
          <div class="highlight-item">
            <div class="highlight-icon">🛶</div>
            <div class="highlight-text">
              <strong>Green River</strong>
              <p>Destino de rafting y pesca de clase mundial</p>
            </div>
            <div class="video-embed-wrapper">
              <iframe
                src="https://www.youtube.com/embed/p05cObabbjg?si=gjsw6MKCJHx6s6Vq"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen></iframe>
            </div>
          </div>
          <div class="highlight-item">
            <div class="highlight-icon">🗿</div>
            <div class="highlight-text">
              <strong>Petroglifos Antiguos</strong>
              <p>Miles de años de historia indígena</p>
            </div>
            <div class="video-embed-wrapper">
              <iframe
                src="https://www.youtube.com/embed/fwzaXWfuFdk?si=Xt1_DCIPRzqx7QDL"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen></iframe>
            </div>
          </div>
          <div class="highlight-item">
            <div class="highlight-icon">⛰️</div>
            <div class="highlight-text">
              <strong>Montañas Uintah</strong>
              <p>Picos majestuosos y naturaleza alpina</p>
            </div>
            <div class="video-embed-wrapper">
              <iframe
                src="https://www.youtube.com/embed/AanVVzP0_oM?si=5GOFOiI5MBc5dm1D"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen></iframe>
            </div>
          </div>
          <div class="highlight-item">
            <div class="highlight-icon">🌈</div>
            <div class="highlight-text">
              <strong>Fantasy Canyon</strong>
              <p>Formaciones rocosas de otro mundo y belleza del desierto</p>
            </div>
            <div class="video-embed-wrapper">
              <iframe
                src="https://www.youtube.com/embed/m64J-ovzTf4?si=FLULmmhzbq8zDzV2"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Nuestra Historia -->
    <div class="our-story-section">
      <div class="story-content">
        <h2 class="section-title">Nuestra Historia</h2>
        <div class="story-text">
          <p class="story-intro">La aventura no es solo lo que hacemos, es quiénes somos.</p>

          <p>Después de crecer en el Valle de Salt Lake y pasar mi juventud explorando las montañas Wasatch y Oquirrh, supe que había encontrado una pasión para toda la vida. Como niño de los años 80, con mucha libertad para explorar, mis hermanos y yo salíamos a andar en bicicleta de montaña, en Jeep, a caminar, a andar en moto de nieve, a esquiar, a acampar, a montar a caballo, a rapelear, a saltar desde acantilados, a explorar cuevas, etc. Pasamos muchos fines de semana inolvidables en la cabaña de nuestra familia.</p>

          <p>Desde muy joven, supe que lo que ansiaba era esa descarga de adrenalina. Después de algunos huesos rotos, y quizás uno que otro eje, nunca perdí mi espíritu por el aire libre.</p>

          <p>Mi Hermosa-Increíble-Preciosa-Maravillosa Esposa y Mejor Amiga — Trudy, y yo nos mudamos a Vernal, Utah. Después de nuestra mudanza, nos enamoramos de la zona de la Cuenca de Uintah y decidimos dirigir nuestra pasión hacia compartir las maravillas naturales que llegamos a amar tanto con amigos, familiares y visitantes.</p>
        </div>
      </div>

      <!-- Sección Foto Familiar -->
      <div class="family-section">
        <div class="family-photo-container">
          <img src="/images/wilson-family.webp" alt="Dave y Trudy Wilson, propietarios de Adventure Tours Vernal, con su familia" class="family-photo">
          <div class="family-photo-caption">
            <h3>Conozca a la Familia Wilson</h3>
            <p>Dave y Trudy Wilson con sus cuatro hijos y su nieto</p>
            <p class="family-names">8 Boys, Ansley, Trinity, Scott y Chandler - Little Z-man</p>
            <p class="guide-profile-links">Conozca a sus guías: <a href="/about/dave/">Dave Wilson</a> y <a href="/about/trudy/">Trudy Wilson</a></p>
          </div>
        </div>
      </div>
    </div>

    <!-- Nuestro Futuro -->
    <div class="about-card future-card">
      <h2 class="about-heading">Nuestro Futuro</h2>
      <div class="future-content">
        <p class="lead-text">Adventure Tours Vernal nació de nuestro amor por las experiencias.</p>

        <p>Una vez que nuestra familia se mudó, comenzamos a invertir en recuerdos familiares. Esta pasión de toda la vida nos llevó a comprar ATVs, bicicletas de montaña, motos de nieve, un bote, y equipo de campamento, caza y pesca, y sobre todo a invertir en nuestra creciente comunidad de amigos y familiares.</p>

        <p>Nuestra familia descubrió que prácticamente le rogábamos a la gente que viniera a visitar la belleza que habíamos encontrado en nuestro propio patio trasero. En nuestras salidas personales descubrimos cuevas, senderos, vivimos historia y disfrutamos de paisajes hermosos más allá de nuestras expectativas.</p>

        <p>Hoy compartimos ese conocimiento de primera mano en cada recorrido — desde nuestros <a href="/utv/backcountry-tours-vernal-utah/">tours guiados por la zona agreste</a> a través de cañones remotos y sitios de petroglifos, hasta los <a href="/utv/best-utv-trails-vernal/">cinco sistemas de senderos que operamos cerca de Vernal</a>. Es el mismo territorio que nosotros mismos exploramos, ahora explorado, mapeado y guiado en persona.</p>

        <p>Ese "patio trasero" es más grande que un solo pueblo. Es una región multiestatal — Dinosaur National Monument se extiende desde Utah hasta Colorado, Flaming Gorge se adentra al norte en Wyoming, las High Uintas se elevan al oeste — con Vernal justo en el centro.</p>

        <figure style="margin:2.5rem auto;max-width:820px;text-align:center;">
          <img src="/images/maps/vernal-dinosaur-country-overview.svg" alt="Diagrama esquemático de orientación de Dinosaur Country como la región multiestatal donde Adventure Tours Vernal tiene su hogar, centrado en Vernal, Utah como campamento base, con cuatro reinos señalados: Dinosaur National Monument (que abarca Utah y Colorado), Flaming Gorge (que se extiende desde Utah hasta Wyoming), las High Uintas y Ashley National Forest, y la Cuenca de Uintah circundante. Muestra únicamente relaciones regionales y no está a escala, distancia ni dirección de brújula; las etiquetas estatales muestran alcance, no un límite mapeado." width="1600" height="1200" loading="lazy" decoding="async" />
          <figcaption style="margin-top:0.75rem;font-size:0.9rem;line-height:1.6;color:#6E655C;">El patio trasero al que nos referimos: una región multiestatal que se extiende hasta Colorado y Wyoming, con Vernal en su corazón. Diagrama de orientación, no está a escala.</figcaption>
        </figure>

        <div class="vision-box">
          <h3>Nuestra Visión</h3>
          <p>A.T.V. está aquí para disfrutar del paisaje majestuoso que tenemos en nuestro patio trasero. Venga a relajarse y quédese un rato, no se arrepentirá.</p>
          <p>Esperamos que se vaya con recuerdos inolvidables de la Cuenca de Uintah, además de hermosas fotos, historia fascinante e historias que contarles a sus amigos.</p>
          <p><strong>¡Volverá por más, se lo garantizamos!</strong></p>
        </div>
      </div>
    </div>

    <!-- Por Qué Elegirnos -->
    <div class="why-choose-section">
      <h2 class="section-title">¿Por Qué Elegir Adventure Tours Vernal?</h2>
      <div class="why-grid">
        <div class="why-item">
          <div class="why-icon">🏆</div>
          <h3>La Primera y la Mejor</h3>
          <p>La empresa líder de tours en UTV de la Cuenca de Uintah</p>
        </div>
        <div class="why-item">
          <div class="why-icon">🛡️</div>
          <h3>Seguridad Primero</h3>
          <p>Equipo de primera línea y guías expertos</p>
        </div>
        <div class="why-item">
          <div class="why-icon">🌟</div>
          <h3>Expertos Locales</h3>
          <p>Conocemos esta tierra como la palma de nuestra mano</p>
        </div>
        <div class="why-item">
          <div class="why-icon">❤️</div>
          <h3>Pasión Familiar</h3>
          <p>Compartiendo nuestro amor por la aventura con usted</p>
        </div>
        <div class="why-item">
          <div class="why-icon">🏔️</div>
          <h3>Joyas Escondidas</h3>
          <p>Acceso a senderos y vistas que otros no conocen</p>
        </div>
        <div class="why-item">
          <div class="why-icon">✨</div>
          <h3>Inolvidable</h3>
          <p>Recuerdos que duran toda la vida</p>
        </div>
      </div>
    </div>

    <!-- Sección de Llamada a la Acción -->
    <div class="about-cta">
      <h2>¿Listo para Vivir la Aventura?</h2>
      <p>Únase a la familia Wilson y descubra por qué Vernal, Utah es el parque de diversiones al aire libre definitivo.</p>
      <div class="cta-buttons">
        <a href="/es/booking/" class="cta-button primary">Reserve Su Aventura</a>
        <a href="tel:435-219-9447" class="cta-button secondary">📞 Llame al (435) 219-9447</a>
      </div>
    </div>

  </div>
</section>

<!-- Botón flotante para móvil -->
<div class="mobile-sticky-cta">
  <button onclick="location.href='/es/booking/'">Reserve Su Recorrido Ahora</button>
</div>
`;

const IT = `
<!-- ================================================
     BLOCCO RIASSUNTIVO DELLA PAGINA — per Google AI Overviews
     e Bing Copilot. Posizionato all'inizio del contenuto.
     ================================================ -->
<p class="page-summary" style="position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;" aria-hidden="false">
  Adventure Tours Vernal è un'azienda di tour in UTV a conduzione locale a Vernal, Utah, fondata da Dave e Trudy Wilson. Dave Wilson è il proprietario e la guida principale, e offre tour guidati in UTV Kawasaki KRX 1000 side-by-side attraverso l'Uintah Basin. Valutata 5.0 stelle su 82 recensioni Google. Chiami il (435) 219-9447.
</p>

<!-- Sezione Hero -->
<section class="about-hero" style="position:relative; overflow:hidden;">
  <div class="about-hero-video-bg">
    <iframe
      src="https://www.youtube.com/embed/LsqbwVkwrbw?autoplay=1&mute=1&loop=1&playlist=LsqbwVkwrbw&controls=0&rel=0&playsinline=1"
      frameborder="0"
      allow="autoplay; encrypted-media"
      allowfullscreen>
    </iframe>
  </div>
  <div class="about-hero-overlay"></div>
  <div class="about-hero-content">
    <h1 class="about-hero-title">Tour in UTV a Vernal, Utah — Costruiti con Passione per l'Avventura</h1>
    <p class="about-hero-subtitle">La Sua porta d'ingresso alle più grandi avventure dell'Uintah Basin</p>
    <p class="about-hero-subtitle" style="font-weight:600;">★★★★★ Valutata 5.0 su 82 recensioni Google — ogni tour guidato personalmente da Dave e Trudy Wilson</p>
  </div>
</section>

<!-- Contenuto Principale -->
<section class="about-main">
  <div class="container">

    <!-- Dichiarazione di Missione -->
    <div class="about-card mission-card">
      <div class="mission-content">
        <h2 class="about-heading">La Prima. La Migliore. L'Esperienza Definitiva in UTV.</h2>
        <p class="lead-text">Ci impegniamo a diventare non solo la prima, ma la migliore azienda di tour in UTV dell'Uintah Basin! Adventure Tours Vernal offre le avventure più sicure ed emozionanti utilizzando i migliori side-by-side <strong>Kawasaki</strong> KRX.</p>
        <p>I nostri Tour d'Avventura mostrano sentieri straordinari tra canyon panoramici e storia elevata. Includiamo tesori locali come:</p>

        <div class="highlights-grid">
          <div class="highlight-item">
            <div class="highlight-icon">🏞️</div>
            <div class="highlight-text">
              <strong>Flaming Gorge</strong>
              <p>Splendidi canyon di roccia rossa e acque cristalline</p>
            </div>
            <div class="video-embed-wrapper">
              <iframe
                src="https://www.youtube.com/embed/tktE4GbS9gQ?si=PwYv9yMUs-yYAM4U"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen></iframe>
            </div>
          </div>
          <div class="highlight-item">
            <div class="highlight-icon">🦕</div>
            <div class="highlight-text">
              <strong>Monumento ai Dinosauri</strong>
              <p>Antichi giacimenti fossili e paesaggi preistorici</p>
            </div>
            <div class="video-embed-wrapper">
              <iframe
                src="https://www.youtube.com/embed/PoCN4Lo9Lkk?si=OYkfE56RP_uMcHoF"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen></iframe>
            </div>
          </div>
          <div class="highlight-item">
            <div class="highlight-icon">🛶</div>
            <div class="highlight-text">
              <strong>Green River</strong>
              <p>Destinazione di rafting e pesca di livello mondiale</p>
            </div>
            <div class="video-embed-wrapper">
              <iframe
                src="https://www.youtube.com/embed/p05cObabbjg?si=gjsw6MKCJHx6s6Vq"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen></iframe>
            </div>
          </div>
          <div class="highlight-item">
            <div class="highlight-icon">🗿</div>
            <div class="highlight-text">
              <strong>Antichi Petroglifi</strong>
              <p>Migliaia di anni di storia indigena</p>
            </div>
            <div class="video-embed-wrapper">
              <iframe
                src="https://www.youtube.com/embed/fwzaXWfuFdk?si=Xt1_DCIPRzqx7QDL"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen></iframe>
            </div>
          </div>
          <div class="highlight-item">
            <div class="highlight-icon">⛰️</div>
            <div class="highlight-text">
              <strong>Montagne Uintah</strong>
              <p>Vette maestose e natura alpina incontaminata</p>
            </div>
            <div class="video-embed-wrapper">
              <iframe
                src="https://www.youtube.com/embed/AanVVzP0_oM?si=5GOFOiI5MBc5dm1D"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen></iframe>
            </div>
          </div>
          <div class="highlight-item">
            <div class="highlight-icon">🌈</div>
            <div class="highlight-text">
              <strong>Fantasy Canyon</strong>
              <p>Formazioni rocciose fuori dal mondo e bellezza del deserto</p>
            </div>
            <div class="video-embed-wrapper">
              <iframe
                src="https://www.youtube.com/embed/m64J-ovzTf4?si=FLULmmhzbq8zDzV2"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- La Nostra Storia -->
    <div class="our-story-section">
      <div class="story-content">
        <h2 class="section-title">La Nostra Storia</h2>
        <div class="story-text">
          <p class="story-intro">L'avventura non è solo ciò che facciamo — è ciò che siamo.</p>

          <p>Dopo essere cresciuto nella Salt Lake Valley e aver trascorso la mia giovinezza esplorando le montagne Wasatch e Oquirrh, ho capito di aver trovato una passione per tutta la vita. Da bambino degli anni '80, con molta libertà di girovagare, io e i miei fratelli andavamo in mountain bike, in Jeep, a fare escursioni, in motoslitta, a sciare, in campeggio, a cavallo, in rappel, a tuffarci dalle scogliere, a esplorare grotte, e così via... Abbiamo trascorso tanti weekend indimenticabili nella baita di famiglia.</p>

          <p>Fin da piccolo, sapevo che era la scarica di adrenalina ciò che desideravo. Dopo qualche osso rotto, e forse un asse o due, non ho mai perso il mio spirito per l'aria aperta.</p>

          <p>Io e la mia Bellissima-Straordinaria-Splendida-Fantastica-Meravigliosa Moglie e Migliore Amica — Trudy, ci siamo trasferiti a Vernal, Utah. Dopo il trasferimento, ci siamo innamorati della zona dell'Uintah Basin e abbiamo deciso di dedicare la nostra passione a condividere le meraviglie naturali che abbiamo imparato ad amare così tanto con amici, famiglia e visitatori.</p>
        </div>
      </div>

      <!-- Sezione Foto di Famiglia -->
      <div class="family-section">
        <div class="family-photo-container">
          <img src="/images/wilson-family.webp" alt="Dave e Trudy Wilson, proprietari di Adventure Tours Vernal, con la loro famiglia" class="family-photo">
          <div class="family-photo-caption">
            <h3>Conosca la Famiglia Wilson</h3>
            <p>Dave e Trudy Wilson con i loro quattro figli e il nipote</p>
            <p class="family-names">8 Boys, Ansley, Trinity, Scott e Chandler - Little Z-man</p>
            <p class="guide-profile-links">Conosca le Sue guide: <a href="/about/dave/">Dave Wilson</a> &amp; <a href="/about/trudy/">Trudy Wilson</a></p>
          </div>
        </div>
      </div>
    </div>

    <!-- Il Nostro Futuro -->
    <div class="about-card future-card">
      <h2 class="about-heading">Il Nostro Futuro</h2>
      <div class="future-content">
        <p class="lead-text">Adventure Tours Vernal è nata dal nostro amore per le esperienze.</p>

        <p>Una volta trasferita la nostra famiglia, abbiamo iniziato a investire in ricordi familiari. Questa passione di una vita ci ha portato all'acquisto di ATV, mountain bike, motoslitte, una barca, e attrezzatura da campeggio, caccia e pesca, e soprattutto all'investimento nella nostra crescente comunità di amici e familiari.</p>

        <p>La nostra famiglia si è resa conto che stavamo praticamente supplicando le persone di venire a visitare la bellezza che avevamo trovato nel nostro «cortile di casa»! Nelle nostre uscite personali abbiamo scoperto grotte, sentieri, vissuto la storia e goduto di paesaggi meravigliosi oltre le nostre aspettative.</p>

        <p>Oggi condividiamo quella conoscenza diretta in ogni giro — dai nostri <a href="/it/utv/backcountry-tours-vernal-utah/">tour guidati nel backcountry</a> attraverso canyon remoti e siti di petroglifi, fino ai <a href="/it/utv/best-utv-trails-vernal/">cinque sistemi di sentieri che gestiamo vicino a Vernal</a>. È lo stesso territorio che abbiamo esplorato noi stessi, ora esplorato, mappato e guidato di persona.</p>

        <p>Quel «cortile di casa» è più grande di una singola città. È una regione multistatale — il Dinosaur National Monument si estende dallo Utah al Colorado, Flaming Gorge si spinge a nord fino al Wyoming, le High Uintas si innalzano a ovest — con Vernal proprio al centro.</p>

        <figure style="margin:2.5rem auto;max-width:820px;text-align:center;">
          <img src="/images/maps/vernal-dinosaur-country-overview.svg" alt="Diagramma schematico di orientamento della Terra dei Dinosauri come regione multistatale che Adventure Tours Vernal chiama casa, centrato su Vernal, Utah come campo base, con quattro aree etichettate: Dinosaur National Monument (che si estende tra Utah e Colorado), Flaming Gorge (che si spinge dallo Utah fino al Wyoming), le High Uintas e la Ashley National Forest, e l'Uintah Basin circostante. Mostra solo relazioni regionali e non è in scala, distanza o direzione della bussola; le etichette statali indicano l'estensione, non un confine mappato." width="1600" height="1200" loading="lazy" decoding="async" />
          <figcaption style="margin-top:0.75rem;font-size:0.9rem;line-height:1.6;color:#6E655C;">Il «cortile di casa» a cui ci riferiamo: una regione multistatale che si estende fino al Colorado e al Wyoming, con Vernal nel suo cuore. Diagramma di orientamento, non in scala.</figcaption>
        </figure>

        <div class="vision-box">
          <h3>La Nostra Visione</h3>
          <p>A.T.V. è qui per godersi il paesaggio maestoso che abbiamo nel nostro cortile di casa. Venga a rilassarsi, e si fermi un po', non se ne pentirà!</p>
          <p>Speriamo che parta con ricordi indimenticabili dell'Uintah Basin — oltre a bellissime foto, storia affascinante e racconti da condividere con i Suoi amici.</p>
          <p><strong>Tornerà per averne ancora, glielo garantiamo!</strong></p>
        </div>
      </div>
    </div>

    <!-- Perché Sceglierci -->
    <div class="why-choose-section">
      <h2 class="section-title">Perché Scegliere Adventure Tours Vernal?</h2>
      <div class="why-grid">
        <div class="why-item">
          <div class="why-icon">🏆</div>
          <h3>La Prima e la Migliore</h3>
          <p>La principale azienda di tour in UTV dell'Uintah Basin</p>
        </div>
        <div class="why-item">
          <div class="why-icon">🛡️</div>
          <h3>La Sicurezza Prima di Tutto</h3>
          <p>Attrezzatura all'avanguardia e guide esperte</p>
        </div>
        <div class="why-item">
          <div class="why-icon">🌟</div>
          <h3>Esperti Locali</h3>
          <p>Conosciamo questa terra come le nostre tasche</p>
        </div>
        <div class="why-item">
          <div class="why-icon">❤️</div>
          <h3>Passione di Famiglia</h3>
          <p>Condividiamo con Lei il nostro amore per l'avventura</p>
        </div>
        <div class="why-item">
          <div class="why-icon">🏔️</div>
          <h3>Gemme Nascoste</h3>
          <p>Accesso a sentieri e panorami che altri non conoscono</p>
        </div>
        <div class="why-item">
          <div class="why-icon">✨</div>
          <h3>Indimenticabile</h3>
          <p>Ricordi che durano tutta la vita</p>
        </div>
      </div>
    </div>

    <!-- Sezione Call to Action -->
    <div class="about-cta">
      <h2>Pronto a Vivere l'Avventura?</h2>
      <p>Si unisca alla famiglia Wilson e scopra perché Vernal, Utah è il parco giochi all'aperto definitivo.</p>
      <div class="cta-buttons">
        <a href="/it/booking/" class="cta-button primary">Prenoti la Sua Avventura</a>
        <a href="tel:435-219-9447" class="cta-button secondary">📞 Chiami il (435) 219-9447</a>
      </div>
    </div>

  </div>
</section>

<!-- Pulsante flottante per mobile -->
<div class="mobile-sticky-cta">
  <button onclick="location.href='/it/booking/'">Prenoti Ora il Suo Giro</button>
</div>
`;

const PT = `
<!-- ================================================
     BLOCO DE RESUMO DA PÁGINA — alimenta o Google AI Overviews
     e o Bing Copilot. Colocado no início do conteúdo.
     ================================================ -->
<p class="page-summary" style="position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;" aria-hidden="false">
  A Adventure Tours Vernal é uma empresa de tours em UTV de propriedade local em Vernal, Utah, fundada por Dave e Trudy Wilson. Dave Wilson é o proprietário e guia principal, oferecendo tours guiados em UTV Kawasaki KRX 1000 side-by-side pela Uintah Basin. Avaliada com 5.0 estrelas em 82 avaliações do Google. Liga para (435) 219-9447.
</p>

<!-- Secção Hero -->
<section class="about-hero" style="position:relative; overflow:hidden;">
  <div class="about-hero-video-bg">
    <iframe
      src="https://www.youtube.com/embed/LsqbwVkwrbw?autoplay=1&mute=1&loop=1&playlist=LsqbwVkwrbw&controls=0&rel=0&playsinline=1"
      frameborder="0"
      allow="autoplay; encrypted-media"
      allowfullscreen>
    </iframe>
  </div>
  <div class="about-hero-overlay"></div>
  <div class="about-hero-content">
    <h1 class="about-hero-title">Tours em UTV em Vernal, Utah — Construídos pela Aventura</h1>
    <p class="about-hero-subtitle">A Tua Porta de Entrada para as Maiores Aventuras da Uintah Basin</p>
    <p class="about-hero-subtitle" style="font-weight:600;">★★★★★ Avaliado com 5.0 em 82 avaliações do Google — cada tour guiado pessoalmente por Dave &amp; Trudy Wilson</p>
  </div>
</section>

<!-- Conteúdo Principal -->
<section class="about-main">
  <div class="container">

    <!-- Declaração de Missão -->
    <div class="about-card mission-card">
      <div class="mission-content">
        <h2 class="about-heading">A Primeira. A Melhor. A Experiência Definitiva em UTV.</h2>
        <p class="lead-text">Esforçamo-nos por não ser apenas a primeira, mas a melhor empresa de tours em UTV da Uintah Basin! A Adventure Tours Vernal proporciona as aventuras mais seguras e emocionantes, utilizando os melhores side-by-side <strong>Kawasaki</strong> KRX.</p>
        <p>Os nossos Tours de Aventura mostram trilhos incríveis de canhões cénicos e história em destaque. Incluímos tesouros locais como:</p>

        <div class="highlights-grid">
          <div class="highlight-item">
            <div class="highlight-icon">🏞️</div>
            <div class="highlight-text">
              <strong>Flaming Gorge</strong>
              <p>Canhões deslumbrantes de rocha vermelha e águas cristalinas</p>
            </div>
            <div class="video-embed-wrapper">
              <iframe
                src="https://www.youtube.com/embed/tktE4GbS9gQ?si=PwYv9yMUs-yYAM4U"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen></iframe>
            </div>
          </div>
          <div class="highlight-item">
            <div class="highlight-icon">🦕</div>
            <div class="highlight-text">
              <strong>Dinosaur Monument</strong>
              <p>Antigos leitos fósseis e paisagens pré-históricas</p>
            </div>
            <div class="video-embed-wrapper">
              <iframe
                src="https://www.youtube.com/embed/PoCN4Lo9Lkk?si=OYkfE56RP_uMcHoF"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen></iframe>
            </div>
          </div>
          <div class="highlight-item">
            <div class="highlight-icon">🛶</div>
            <div class="highlight-text">
              <strong>Green River</strong>
              <p>Destino de rafting e pesca de classe mundial</p>
            </div>
            <div class="video-embed-wrapper">
              <iframe
                src="https://www.youtube.com/embed/p05cObabbjg?si=gjsw6MKCJHx6s6Vq"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen></iframe>
            </div>
          </div>
          <div class="highlight-item">
            <div class="highlight-icon">🗿</div>
            <div class="highlight-text">
              <strong>Petróglifos Antigos</strong>
              <p>Milhares de anos de história indígena</p>
            </div>
            <div class="video-embed-wrapper">
              <iframe
                src="https://www.youtube.com/embed/fwzaXWfuFdk?si=Xt1_DCIPRzqx7QDL"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen></iframe>
            </div>
          </div>
          <div class="highlight-item">
            <div class="highlight-icon">⛰️</div>
            <div class="highlight-text">
              <strong>Montanhas Uintah</strong>
              <p>Picos majestosos e natureza alpina selvagem</p>
            </div>
            <div class="video-embed-wrapper">
              <iframe
                src="https://www.youtube.com/embed/AanVVzP0_oM?si=5GOFOiI5MBc5dm1D"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen></iframe>
            </div>
          </div>
          <div class="highlight-item">
            <div class="highlight-icon">🌈</div>
            <div class="highlight-text">
              <strong>Fantasy Canyon</strong>
              <p>Formações rochosas de outro mundo e beleza do deserto</p>
            </div>
            <div class="video-embed-wrapper">
              <iframe
                src="https://www.youtube.com/embed/m64J-ovzTf4?si=FLULmmhzbq8zDzV2"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- A Nossa História -->
    <div class="our-story-section">
      <div class="story-content">
        <h2 class="section-title">A Nossa História</h2>
        <div class="story-text">
          <p class="story-intro">A aventura não é apenas o que fazemos — é quem somos.</p>

          <p>Depois de crescer no Salt Lake Valley e passar a minha juventude a explorar as montanhas Wasatch e Oquirrh, soube que tinha encontrado uma paixão para a vida toda. Como criança dos anos 80, com muita liberdade para andar por aí, os meus irmãos e eu andávamos de Mountain Bike, de Jeep, fazíamos caminhadas, andávamos de mota de neve, esquiávamos, acampávamos, andávamos a cavalo, fazíamos rapel, saltávamos de falésias, explorávamos grutas, etc... Passámos imensos fins de semana inesquecíveis na cabana da família.</p>

          <p>Desde muito cedo, soube que era a descarga de adrenalina que eu ansiava. Depois de alguns ossos partidos, e talvez um ou dois eixos, nunca perdi o meu espírito pelo ar livre.</p>

          <p>A minha Linda-Incrível-Maravilhosa-Fantástica-Espantosa Esposa e Melhor Amiga — a Trudy — e eu mudámo-nos para Vernal, Utah. Depois da mudança, apaixonámo-nos pela zona da Uintah Basin e decidimos direcionar a nossa paixão para partilhar as maravilhas naturais que passámos a amar tanto com Amigos, Família e Visitantes.</p>
        </div>
      </div>

      <!-- Secção da Foto de Família -->
      <div class="family-section">
        <div class="family-photo-container">
          <img src="/images/wilson-family.webp" alt="Dave e Trudy Wilson, proprietários da Adventure Tours Vernal, com a família" class="family-photo">
          <div class="family-photo-caption">
            <h3>Conhece a Família Wilson</h3>
            <p>Dave e Trudy Wilson com os quatro filhos e o neto</p>
            <p class="family-names">8 Boys, Ansley, Trinity, Scott e Chandler - Little Z-man</p>
            <p class="guide-profile-links">Conhece os teus guias: <a href="/about/dave/">Dave Wilson</a> &amp; <a href="/about/trudy/">Trudy Wilson</a></p>
          </div>
        </div>
      </div>
    </div>

    <!-- O Nosso Futuro -->
    <div class="about-card future-card">
      <h2 class="about-heading">O Nosso Futuro</h2>
      <div class="future-content">
        <p class="lead-text">A Adventure Tours Vernal nasceu do nosso amor pelas experiências.</p>

        <p>Assim que a nossa família se mudou, começámos a investir em memórias de família. Esta paixão de sempre levou-nos a comprar ATVs, Mountain Bikes, motos de neve, um barco, e equipamento de campismo, caça e pesca, e sobretudo ao investimento na nossa crescente comunidade de amigos e família.</p>

        <p>A nossa família percebeu que estávamos praticamente a implorar às pessoas que viessem visitar a beleza que tínhamos encontrado no nosso próprio quintal! Nas nossas saídas pessoais descobrimos grutas, trilhos, vivemos a história e desfrutámos de paisagens lindíssimas para além das nossas expectativas.</p>

        <p>Hoje partilhamos esse conhecimento de primeira mão em cada passeio — desde os nossos <a href="/pt/utv/backcountry-tours-vernal-utah/">tours guiados pelo backcountry</a> através de canhões remotos e locais com petróglifos até aos <a href="/pt/utv/best-utv-trails-vernal/">cinco sistemas de trilhos que gerimos perto de Vernal</a>. É o mesmo território que nós próprios explorámos, agora reconhecido, mapeado e guiado pessoalmente.</p>

        <p>Esse "quintal" é maior do que uma única cidade. É uma região multiestatal — o Dinosaur National Monument que se estende de Utah até ao Colorado, Flaming Gorge que avança para norte até Wyoming, as High Uintas que se erguem a oeste — com Vernal mesmo no centro.</p>

        <figure style="margin:2.5rem auto;max-width:820px;text-align:center;">
          <img src="/images/maps/vernal-dinosaur-country-overview.svg" alt="Diagrama esquemático de orientação da Terra dos Dinossauros como a região multiestatal a que a Adventure Tours Vernal chama casa, centrado em Vernal, Utah como base, com quatro áreas identificadas: Dinosaur National Monument (que abrange Utah e Colorado), Flaming Gorge (que se estende de Utah até Wyoming), as High Uintas e a Ashley National Forest, e a Uintah Basin circundante. Mostra apenas relações regionais e não está à escala, distância ou direção da bússola; as etiquetas dos estados mostram alcance, não uma fronteira mapeada." width="1600" height="1200" loading="lazy" decoding="async" />
          <figcaption style="margin-top:0.75rem;font-size:0.9rem;line-height:1.6;color:#6E655C;">O quintal a que nos referimos: uma região multiestatal que se estende até ao Colorado e a Wyoming, com Vernal no seu coração. Diagrama de orientação, não está à escala.</figcaption>
        </figure>

        <div class="vision-box">
          <h3>A Nossa Visão</h3>
          <p>A A.T.V. está aqui para desfrutares da paisagem majestosa que temos no nosso quintal. Vem relaxar, e fica um pouco, não vais arrepender-te!</p>
          <p>É nossa esperança que partas com memórias inesquecíveis da Uintah Basin — e também com fotos lindas, história fascinante e histórias para contares aos teus amigos.</p>
          <p><strong>Vais voltar para mais, garantimos-te isso!</strong></p>
        </div>
      </div>
    </div>

    <!-- Porque Nos Escolher -->
    <div class="why-choose-section">
      <h2 class="section-title">Porque Escolher a Adventure Tours Vernal?</h2>
      <div class="why-grid">
        <div class="why-item">
          <div class="why-icon">🏆</div>
          <h3>A Primeira e a Melhor</h3>
          <p>A principal empresa de tours em UTV da Uintah Basin</p>
        </div>
        <div class="why-item">
          <div class="why-icon">🛡️</div>
          <h3>Segurança em Primeiro Lugar</h3>
          <p>Equipamento de topo de gama e guias especializados</p>
        </div>
        <div class="why-item">
          <div class="why-icon">🌟</div>
          <h3>Especialistas Locais</h3>
          <p>Conhecemos esta terra como a palma da mão</p>
        </div>
        <div class="why-item">
          <div class="why-icon">❤️</div>
          <h3>Paixão de Família</h3>
          <p>A partilhar contigo o nosso amor pela aventura</p>
        </div>
        <div class="why-item">
          <div class="why-icon">🏔️</div>
          <h3>Joias Escondidas</h3>
          <p>Acesso a trilhos e vistas que outros não conhecem</p>
        </div>
        <div class="why-item">
          <div class="why-icon">✨</div>
          <h3>Inesquecível</h3>
          <p>Memórias que duram toda a vida</p>
        </div>
      </div>
    </div>

    <!-- Secção de Chamada à Ação -->
    <div class="about-cta">
      <h2>Pronto para Viveres a Aventura?</h2>
      <p>Junta-te à família Wilson e descobre porque é que Vernal, Utah é o parque de diversões ao ar livre definitivo.</p>
      <div class="cta-buttons">
        <a href="/pt/booking/" class="cta-button primary">Reserva a Tua Aventura</a>
        <a href="tel:435-219-9447" class="cta-button secondary">📞 Liga para (435) 219-9447</a>
      </div>
    </div>

  </div>
</section>

<!-- Botão fixo para móvel -->
<div class="mobile-sticky-cta">
  <button onclick="location.href='/pt/booking/'">Reserva o Teu Passeio Agora</button>
</div>
`;

const FR = `
<!-- ================================================
     BLOC RÉSUMÉ DE PAGE — pour Google AI Overviews
     et Bing Copilot. Placé en début de contenu.
     ================================================ -->
<p class="page-summary" style="position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;" aria-hidden="false">
  Adventure Tours Vernal est une entreprise de tours en UTV détenue localement à Vernal, Utah, fondée par Dave et Trudy Wilson. Dave Wilson est le propriétaire et guide principal, proposant des tours guidés en UTV Kawasaki KRX 1000 side-by-side à travers l'Uintah Basin. Noté 5.0 étoiles sur 82 avis Google. Appelez le (435) 219-9447.
</p>

<!-- Section Hero -->
<section class="about-hero" style="position:relative; overflow:hidden;">
  <div class="about-hero-video-bg">
    <iframe
      src="https://www.youtube.com/embed/LsqbwVkwrbw?autoplay=1&mute=1&loop=1&playlist=LsqbwVkwrbw&controls=0&rel=0&playsinline=1"
      frameborder="0"
      allow="autoplay; encrypted-media"
      allowfullscreen>
    </iframe>
  </div>
  <div class="about-hero-overlay"></div>
  <div class="about-hero-content">
    <h1 class="about-hero-title">Tours en UTV à Vernal, Utah — Construits par l'Aventure</h1>
    <p class="about-hero-subtitle">Votre Porte d'Entrée vers les Plus Grandes Aventures de l'Uintah Basin</p>
    <p class="about-hero-subtitle" style="font-weight:600;">★★★★★ Noté 5.0 sur 82 avis Google — chaque tour personnellement guidé par Dave &amp; Trudy Wilson</p>
  </div>
</section>

<!-- Contenu Principal -->
<section class="about-main">
  <div class="container">

    <!-- Déclaration de Mission -->
    <div class="about-card mission-card">
      <div class="mission-content">
        <h2 class="about-heading">La Première. La Meilleure. L'Expérience UTV Ultime.</h2>
        <p class="lead-text">Nous nous efforçons de devenir non seulement la première, mais la meilleure entreprise de tours en UTV de l'Uintah Basin&nbsp;! Adventure Tours Vernal propose les aventures les plus sûres et les plus palpitantes avec les meilleurs side-by-side <strong>Kawasaki</strong> KRX.</p>
        <p>Nos Tours d'Aventure font découvrir des pistes extraordinaires à travers des canyons pittoresques et une histoire mise en valeur. Nous incluons des trésors locaux tels que&nbsp;:</p>

        <div class="highlights-grid">
          <div class="highlight-item">
            <div class="highlight-icon">🏞️</div>
            <div class="highlight-text">
              <strong>Flaming Gorge</strong>
              <p>Des canyons de roche rouge saisissants et des eaux cristallines</p>
            </div>
            <div class="video-embed-wrapper">
              <iframe
                src="https://www.youtube.com/embed/tktE4GbS9gQ?si=PwYv9yMUs-yYAM4U"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen></iframe>
            </div>
          </div>
          <div class="highlight-item">
            <div class="highlight-icon">🦕</div>
            <div class="highlight-text">
              <strong>Dinosaur Monument</strong>
              <p>D'anciens gisements de fossiles et des paysages préhistoriques</p>
            </div>
            <div class="video-embed-wrapper">
              <iframe
                src="https://www.youtube.com/embed/PoCN4Lo9Lkk?si=OYkfE56RP_uMcHoF"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen></iframe>
            </div>
          </div>
          <div class="highlight-item">
            <div class="highlight-icon">🛶</div>
            <div class="highlight-text">
              <strong>Green River</strong>
              <p>Une destination de rafting et de pêche de classe mondiale</p>
            </div>
            <div class="video-embed-wrapper">
              <iframe
                src="https://www.youtube.com/embed/p05cObabbjg?si=gjsw6MKCJHx6s6Vq"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen></iframe>
            </div>
          </div>
          <div class="highlight-item">
            <div class="highlight-icon">🗿</div>
            <div class="highlight-text">
              <strong>Pétroglyphes Anciens</strong>
              <p>Des milliers d'années d'histoire autochtone</p>
            </div>
            <div class="video-embed-wrapper">
              <iframe
                src="https://www.youtube.com/embed/fwzaXWfuFdk?si=Xt1_DCIPRzqx7QDL"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen></iframe>
            </div>
          </div>
          <div class="highlight-item">
            <div class="highlight-icon">⛰️</div>
            <div class="highlight-text">
              <strong>Montagnes Uintah</strong>
              <p>Des sommets majestueux et une nature alpine sauvage</p>
            </div>
            <div class="video-embed-wrapper">
              <iframe
                src="https://www.youtube.com/embed/AanVVzP0_oM?si=5GOFOiI5MBc5dm1D"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen></iframe>
            </div>
          </div>
          <div class="highlight-item">
            <div class="highlight-icon">🌈</div>
            <div class="highlight-text">
              <strong>Fantasy Canyon</strong>
              <p>Des formations rocheuses d'un autre monde et la beauté du désert</p>
            </div>
            <div class="video-embed-wrapper">
              <iframe
                src="https://www.youtube.com/embed/m64J-ovzTf4?si=FLULmmhzbq8zDzV2"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Notre Histoire -->
    <div class="our-story-section">
      <div class="story-content">
        <h2 class="section-title">Notre Histoire</h2>
        <div class="story-text">
          <p class="story-intro">L'aventure n'est pas seulement ce que nous faisons — c'est qui nous sommes.</p>

          <p>Après avoir grandi dans la Salt Lake Valley et passé ma jeunesse à explorer les montagnes Wasatch et Oquirrh, j'ai su que j'avais trouvé une passion pour la vie. Enfant des années 80, avec beaucoup de liberté pour vagabonder, mes frères et moi faisions du vélo de montagne, de la Jeep, de la randonnée, de la motoneige, du ski, du camping, de l'équitation, du rappel, du saut de falaise, de l'exploration de grottes, etc. Nous avons passé de nombreux week-ends inoubliables dans le chalet de notre famille.</p>

          <p>Dès mon plus jeune âge, je savais que c'était la montée d'adrénaline que je recherchais. Après quelques os cassés, et peut-être un essieu ou deux, je n'ai jamais perdu mon esprit pour le plein air.</p>

          <p>Ma Magnifique-Incroyable-Superbe-Formidable-Merveilleuse Épouse et Meilleure Amie — Trudy, et moi avons déménagé à Vernal, Utah. Après notre déménagement, nous sommes tombés amoureux de la région de l'Uintah Basin et avons décidé d'orienter notre passion vers le partage des merveilles naturelles que nous en sommes venus à tant aimer avec nos amis, notre famille et nos visiteurs.</p>
        </div>
      </div>

      <!-- Section Photo de Famille -->
      <div class="family-section">
        <div class="family-photo-container">
          <img src="/images/wilson-family.webp" alt="Dave et Trudy Wilson, propriétaires d'Adventure Tours Vernal, avec leur famille" class="family-photo">
          <div class="family-photo-caption">
            <h3>Découvrez la Famille Wilson</h3>
            <p>Dave et Trudy Wilson avec leurs quatre enfants et leur petit-fils</p>
            <p class="family-names">8 Boys, Ansley, Trinity, Scott et Chandler - Little Z-man</p>
            <p class="guide-profile-links">Découvrez vos guides&nbsp;: <a href="/about/dave/">Dave Wilson</a> &amp; <a href="/about/trudy/">Trudy Wilson</a></p>
          </div>
        </div>
      </div>
    </div>

    <!-- Notre Avenir -->
    <div class="about-card future-card">
      <h2 class="about-heading">Notre Avenir</h2>
      <div class="future-content">
        <p class="lead-text">Adventure Tours Vernal est née de notre amour des expériences.</p>

        <p>Une fois notre famille installée, nous avons commencé à investir dans des souvenirs familiaux. Cette passion de toujours nous a menés à l'achat d'ATV, de vélos de montagne, de motoneiges, d'un bateau, et d'équipement de camping, de chasse et de pêche, et surtout à investir dans notre communauté grandissante d'amis et de famille.</p>

        <p>Notre famille s'est rendu compte que nous suppliions pratiquement les gens de venir découvrir la beauté que nous avions trouvée dans notre propre arrière-cour&nbsp;! Lors de nos sorties personnelles, nous avons découvert des grottes, des pistes, vécu l'histoire et profité de paysages magnifiques au-delà de nos attentes.</p>

        <p>Aujourd'hui, nous partageons cette connaissance directe à chaque sortie — de nos <a href="/utv/backcountry-tours-vernal-utah/">tours guidés en backcountry</a> à travers des canyons isolés et des sites de pétroglyphes jusqu'aux <a href="/utv/best-utv-trails-vernal/">cinq réseaux de pistes que nous exploitons près de Vernal</a>. C'est le même territoire que nous avons exploré nous-mêmes, désormais reconnu, cartographié et guidé en personne.</p>

        <p>Cette "arrière-cour" est plus grande qu'une seule ville. C'est une région multi-états — Dinosaur National Monument s'étendant de l'Utah au Colorado, Flaming Gorge se prolongeant au nord jusqu'au Wyoming, les High Uintas s'élevant à l'ouest — avec Vernal en plein centre.</p>

        <figure style="margin:2.5rem auto;max-width:820px;text-align:center;">
          <img src="/images/maps/vernal-dinosaur-country-overview.svg" alt="Diagramme schématique d'orientation de la Terre des Dinosaures en tant que région multi-états qu'Adventure Tours Vernal appelle chez elle, centré sur Vernal, Utah comme camp de base, avec quatre zones identifiées&nbsp;: Dinosaur National Monument (s'étendant sur l'Utah et le Colorado), Flaming Gorge (se prolongeant de l'Utah jusqu'au Wyoming), les High Uintas et l'Ashley National Forest, et l'Uintah Basin environnant. Il montre uniquement des relations régionales et n'est pas à l'échelle, ni en distance, ni en direction de boussole&nbsp;; les étiquettes d'états indiquent l'étendue, pas une frontière cartographiée." width="1600" height="1200" loading="lazy" decoding="async" />
          <figcaption style="margin-top:0.75rem;font-size:0.9rem;line-height:1.6;color:#6E655C;">L'arrière-cour dont nous parlons&nbsp;: une région multi-états s'étendant jusqu'au Colorado et au Wyoming, avec Vernal en son cœur. Diagramme d'orientation, pas à l'échelle.</figcaption>
        </figure>

        <div class="vision-box">
          <h3>Notre Vision</h3>
          <p>A.T.V. est là pour se laisser porter par le paysage majestueux que nous avons dans notre arrière-cour. Venez vous détendre, et restez un moment, vous ne le regretterez pas&nbsp;!</p>
          <p>Nous espérons que vous repartirez avec des souvenirs inoubliables de l'Uintah Basin — ainsi que de belles photos, une histoire fascinante et des histoires à raconter à vos amis.</p>
          <p><strong>Vous reviendrez pour plus, nous vous le garantissons&nbsp;!</strong></p>
        </div>
      </div>
    </div>

    <!-- Pourquoi Nous Choisir -->
    <div class="why-choose-section">
      <h2 class="section-title">Pourquoi Choisir Adventure Tours Vernal&nbsp;?</h2>
      <div class="why-grid">
        <div class="why-item">
          <div class="why-icon">🏆</div>
          <h3>La Première et la Meilleure</h3>
          <p>L'entreprise phare de tours en UTV de l'Uintah Basin</p>
        </div>
        <div class="why-item">
          <div class="why-icon">🛡️</div>
          <h3>La Sécurité Avant Tout</h3>
          <p>Un équipement haut de gamme et des guides experts</p>
        </div>
        <div class="why-item">
          <div class="why-icon">🌟</div>
          <h3>Experts Locaux</h3>
          <p>Nous connaissons cette terre comme notre poche</p>
        </div>
        <div class="why-item">
          <div class="why-icon">❤️</div>
          <h3>Passion Familiale</h3>
          <p>Partager notre amour de l'aventure avec vous</p>
        </div>
        <div class="why-item">
          <div class="why-icon">🏔️</div>
          <h3>Trésors Cachés</h3>
          <p>Accès à des pistes et des vues que d'autres ne connaissent pas</p>
        </div>
        <div class="why-item">
          <div class="why-icon">✨</div>
          <h3>Inoubliable</h3>
          <p>Des souvenirs qui durent toute une vie</p>
        </div>
      </div>
    </div>

    <!-- Section Appel à l'Action -->
    <div class="about-cta">
      <h2>Prêt à Vivre l'Aventure&nbsp;?</h2>
      <p>Rejoignez la famille Wilson et découvrez pourquoi Vernal, Utah est le terrain de jeu extérieur ultime.</p>
      <div class="cta-buttons">
        <a href="/fr/booking/" class="cta-button primary">Réservez Votre Aventure</a>
        <a href="tel:435-219-9447" class="cta-button secondary">📞 Appelez le (435) 219-9447</a>
      </div>
    </div>

  </div>
</section>

<!-- Bouton flottant mobile -->
<div class="mobile-sticky-cta">
  <button onclick="location.href='/fr/booking/'">Réservez Votre Sortie Maintenant</button>
</div>
`;

const DE = `
<!-- ================================================
     SEITENZUSAMMENFASSUNG — für Google AI Overviews
     und Bing Copilot. Am Anfang des Inhalts platziert.
     ================================================ -->
<p class="page-summary" style="position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;" aria-hidden="false">
  Adventure Tours Vernal ist ein lokal geführtes UTV-Tourunternehmen in Vernal, Utah, gegründet von Dave und Trudy Wilson. Dave Wilson ist der Inhaber und Chef-Guide und bietet geführte Kawasaki KRX 1000 Side-by-Side-Touren durch das Uintah Basin an. Bewertet mit 5.0 Sternen aus 82 Google-Rezensionen. Ruf an unter (435) 219-9447.
</p>

<!-- Hero-Bereich -->
<section class="about-hero" style="position:relative; overflow:hidden;">
  <div class="about-hero-video-bg">
    <iframe
      src="https://www.youtube.com/embed/LsqbwVkwrbw?autoplay=1&mute=1&loop=1&playlist=LsqbwVkwrbw&controls=0&rel=0&playsinline=1"
      frameborder="0"
      allow="autoplay; encrypted-media"
      allowfullscreen>
    </iframe>
  </div>
  <div class="about-hero-overlay"></div>
  <div class="about-hero-content">
    <h1 class="about-hero-title">UTV-Touren in Vernal, Utah — Erbaut aus Abenteuerlust</h1>
    <p class="about-hero-subtitle">Dein Tor zu den größten Abenteuern des Uintah Basin</p>
    <p class="about-hero-subtitle" style="font-weight:600;">★★★★★ Bewertet mit 5.0 aus 82 Google-Rezensionen — jede Tour persönlich geführt von Dave &amp; Trudy Wilson</p>
  </div>
</section>

<!-- Hauptinhalt -->
<section class="about-main">
  <div class="container">

    <!-- Missionserklärung -->
    <div class="about-card mission-card">
      <div class="mission-content">
        <h2 class="about-heading">Die Erste. Die Beste. Das ultimative UTV-Erlebnis.</h2>
        <p class="lead-text">Wir wollen nicht nur das erste, sondern das beste UTV-Tourunternehmen im Uintah Basin werden! Adventure Tours Vernal bietet die sichersten und aufregendsten Abenteuer mit den besten <strong>Kawasaki</strong> KRX Side-by-Sides.</p>
        <p>Unsere Abenteuertouren zeigen dir fantastische Pisten durch malerische Canyons und lebendige Geschichte. Dazu gehören lokale Schätze wie:</p>

        <div class="highlights-grid">
          <div class="highlight-item">
            <div class="highlight-icon">🏞️</div>
            <div class="highlight-text">
              <strong>Flaming Gorge</strong>
              <p>Atemberaubende Rotfelsen-Canyons und unberührte Gewässer</p>
            </div>
            <div class="video-embed-wrapper">
              <iframe
                src="https://www.youtube.com/embed/tktE4GbS9gQ?si=PwYv9yMUs-yYAM4U"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen></iframe>
            </div>
          </div>
          <div class="highlight-item">
            <div class="highlight-icon">🦕</div>
            <div class="highlight-text">
              <strong>Dinosaur Monument</strong>
              <p>Uralte Fossilienlagerstätten und prähistorische Landschaften</p>
            </div>
            <div class="video-embed-wrapper">
              <iframe
                src="https://www.youtube.com/embed/PoCN4Lo9Lkk?si=OYkfE56RP_uMcHoF"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen></iframe>
            </div>
          </div>
          <div class="highlight-item">
            <div class="highlight-icon">🛶</div>
            <div class="highlight-text">
              <strong>Green River</strong>
              <p>Weltklasse-Ziel für Rafting und Angeln</p>
            </div>
            <div class="video-embed-wrapper">
              <iframe
                src="https://www.youtube.com/embed/p05cObabbjg?si=gjsw6MKCJHx6s6Vq"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen></iframe>
            </div>
          </div>
          <div class="highlight-item">
            <div class="highlight-icon">🗿</div>
            <div class="highlight-text">
              <strong>Alte Petroglyphen</strong>
              <p>Jahrtausende indigener Geschichte</p>
            </div>
            <div class="video-embed-wrapper">
              <iframe
                src="https://www.youtube.com/embed/fwzaXWfuFdk?si=Xt1_DCIPRzqx7QDL"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen></iframe>
            </div>
          </div>
          <div class="highlight-item">
            <div class="highlight-icon">⛰️</div>
            <div class="highlight-text">
              <strong>Uintah-Berge</strong>
              <p>Majestätische Gipfel und alpine Wildnis</p>
            </div>
            <div class="video-embed-wrapper">
              <iframe
                src="https://www.youtube.com/embed/AanVVzP0_oM?si=5GOFOiI5MBc5dm1D"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen></iframe>
            </div>
          </div>
          <div class="highlight-item">
            <div class="highlight-icon">🌈</div>
            <div class="highlight-text">
              <strong>Fantasy Canyon</strong>
              <p>Fremdartige Felsformationen und Wüstenschönheit</p>
            </div>
            <div class="video-embed-wrapper">
              <iframe
                src="https://www.youtube.com/embed/m64J-ovzTf4?si=FLULmmhzbq8zDzV2"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Unsere Geschichte -->
    <div class="our-story-section">
      <div class="story-content">
        <h2 class="section-title">Unsere Geschichte</h2>
        <div class="story-text">
          <p class="story-intro">Abenteuer ist nicht nur, was wir tun — es ist, wer wir sind.</p>

          <p>Nachdem ich im Salt Lake Valley aufgewachsen war und meine Jugend mit der Erkundung der Wasatch- und Oquirrh-Berge verbracht hatte, wusste ich, dass ich eine lebenslange Leidenschaft gefunden hatte. Als Kind der 80er-Jahre, mit viel Freiheit zum Herumstreifen, fuhren meine Brüder und ich Mountainbike, fuhren Jeep, wanderten, fuhren Schneemobil, fuhren Ski, campten, ritten, seilten uns ab, sprangen von Klippen, erkundeten Höhlen, usw... Wir verbrachten unzählige unvergessliche Wochenenden in unserer Familienhütte.</p>

          <p>Schon früh wusste ich, dass es der Adrenalinkick war, nach dem ich mich sehnte. Nach ein paar gebrochenen Knochen und vielleicht der einen oder anderen Achse habe ich nie meine Begeisterung für die Natur verloren.</p>

          <p>Meine Wunderschöne-Erstaunliche-Bezaubernde-Großartige-Wundervolle Ehefrau und beste Freundin — Trudy — und ich zogen nach Vernal, Utah. Nach unserem Umzug verliebten wir uns in die Region Uintah Basin und beschlossen, unsere Leidenschaft darauf zu richten, die Naturwunder, die wir so sehr lieben gelernt haben, mit Freunden, Familie und Besuchern zu teilen.</p>
        </div>
      </div>

      <!-- Familienfoto-Bereich -->
      <div class="family-section">
        <div class="family-photo-container">
          <img src="/images/wilson-family.webp" alt="Dave und Trudy Wilson, Inhaber von Adventure Tours Vernal, mit ihrer Familie" class="family-photo">
          <div class="family-photo-caption">
            <h3>Lerne die Familie Wilson kennen</h3>
            <p>Dave und Trudy Wilson mit ihren vier Kindern und ihrem Enkel</p>
            <p class="family-names">8 Boys, Ansley, Trinity, Scott und Chandler - Little Z-man</p>
            <p class="guide-profile-links">Lerne deine Guides kennen: <a href="/about/dave/">Dave Wilson</a> &amp; <a href="/about/trudy/">Trudy Wilson</a></p>
          </div>
        </div>
      </div>
    </div>

    <!-- Unsere Zukunft -->
    <div class="about-card future-card">
      <h2 class="about-heading">Unsere Zukunft</h2>
      <div class="future-content">
        <p class="lead-text">Adventure Tours Vernal wurde aus unserer Liebe zu Erlebnissen geboren.</p>

        <p>Sobald unsere Familie umgezogen war, begannen wir, in Familienerinnerungen zu investieren. Diese lebenslange Leidenschaft führte zum Kauf von ATVs, Mountainbikes, Schneemobilen, einem Boot sowie Camping-, Jagd- und Angelausrüstung — und vor allem zur Investition in unsere wachsende Gemeinschaft aus Freunden und Familie.</p>

        <p>Unsere Familie merkte, dass wir die Leute praktisch anbettelten, die Schönheit zu besuchen, die wir in unserem eigenen Hinterhof gefunden hatten! Auf unseren eigenen Ausflügen entdeckten wir Höhlen und Wanderwege, erlebten Geschichte und genossen wunderschöne Landschaften, die unsere Erwartungen übertrafen.</p>

        <p>Heute teilen wir dieses Insiderwissen auf jeder Fahrt — von unseren <a href="/de/utv/backcountry-tours-vernal-utah/">geführten Backcountry-Touren</a> durch abgelegene Canyons und Petroglyphen-Stätten bis zu den <a href="/de/utv/best-utv-trails-vernal/">fünf Pistensystemen, die wir in der Nähe von Vernal betreiben</a>. Es ist dasselbe Land, das wir selbst erkundet haben, jetzt erforscht, kartiert und persönlich geführt.</p>

        <p>Dieser "Hinterhof" ist größer als eine einzige Stadt. Es ist eine Region über mehrere Bundesstaaten hinweg — das Dinosaur National Monument reicht von Utah bis nach Colorado, Flaming Gorge erstreckt sich nach Norden bis Wyoming, die High Uintas erheben sich im Westen — mit Vernal genau in der Mitte.</p>

        <figure style="margin:2.5rem auto;max-width:820px;text-align:center;">
          <img src="/images/maps/vernal-dinosaur-country-overview.svg" alt="Schematisches Orientierungsdiagramm des Landes der Dinosaurier als die Region über mehrere Bundesstaaten, die Adventure Tours Vernal ihr Zuhause nennt, zentriert auf Vernal, Utah als Basislager, mit vier gekennzeichneten Bereichen: Dinosaur National Monument (erstreckt sich über Utah und Colorado), Flaming Gorge (reicht von Utah bis nach Wyoming), die High Uintas und der Ashley National Forest sowie das umliegende Uintah Basin. Es zeigt nur regionale Zusammenhänge und ist weder maßstabsgetreu noch entfernungs- oder kompassgenau; die Staatsbezeichnungen zeigen die Reichweite, keine kartierte Grenze." width="1600" height="1200" loading="lazy" decoding="async" />
          <figcaption style="margin-top:0.75rem;font-size:0.9rem;line-height:1.6;color:#6E655C;">Der Hinterhof, von dem wir sprechen: eine Region über mehrere Bundesstaaten, die bis nach Colorado und Wyoming reicht, mit Vernal in ihrem Herzen. Orientierungsdiagramm, nicht maßstabsgetreu.</figcaption>
        </figure>

        <div class="vision-box">
          <h3>Unsere Vision</h3>
          <p>A.T.V. ist da, damit du die majestätische Landschaft in unserem Hinterhof genießen kannst. Komm vorbei, entspann dich, und bleib eine Weile — du wirst es nicht bereuen!</p>
          <p>Wir hoffen, dass du mit unvergesslichen Erinnerungen an das Uintah Basin nach Hause fährst — dazu mit schönen Fotos, faszinierender Geschichte und Geschichten, die du deinen Freunden erzählen kannst.</p>
          <p><strong>Du kommst garantiert wieder, das versprechen wir dir!</strong></p>
        </div>
      </div>
    </div>

    <!-- Warum uns wählen -->
    <div class="why-choose-section">
      <h2 class="section-title">Warum Adventure Tours Vernal wählen?</h2>
      <div class="why-grid">
        <div class="why-item">
          <div class="why-icon">🏆</div>
          <h3>Die Erste & Beste</h3>
          <p>Das führende UTV-Tourunternehmen im Uintah Basin</p>
        </div>
        <div class="why-item">
          <div class="why-icon">🛡️</div>
          <h3>Sicherheit zuerst</h3>
          <p>Erstklassige Ausrüstung und erfahrene Guides</p>
        </div>
        <div class="why-item">
          <div class="why-icon">🌟</div>
          <h3>Lokale Experten</h3>
          <p>Wir kennen dieses Land wie unsere Westentasche</p>
        </div>
        <div class="why-item">
          <div class="why-icon">❤️</div>
          <h3>Familiäre Leidenschaft</h3>
          <p>Wir teilen unsere Abenteuerlust mit dir</p>
        </div>
        <div class="why-item">
          <div class="why-icon">🏔️</div>
          <h3>Versteckte Schätze</h3>
          <p>Zugang zu Pisten und Ausblicken, die andere nicht kennen</p>
        </div>
        <div class="why-item">
          <div class="why-icon">✨</div>
          <h3>Unvergesslich</h3>
          <p>Erinnerungen, die ein Leben lang halten</p>
        </div>
      </div>
    </div>

    <!-- CTA-Bereich -->
    <div class="about-cta">
      <h2>Bereit, das Abenteuer zu erleben?</h2>
      <p>Werde Teil der Familie Wilson und entdecke, warum Vernal, Utah der ultimative Outdoor-Spielplatz ist.</p>
      <div class="cta-buttons">
        <a href="/de/booking/" class="cta-button primary">Buche dein Abenteuer</a>
        <a href="tel:435-219-9447" class="cta-button secondary">📞 Ruf an unter (435) 219-9447</a>
      </div>
    </div>

  </div>
</section>

<!-- Mobiler Sticky-Button -->
<div class="mobile-sticky-cta">
  <button onclick="location.href='/de/booking/'">Buche jetzt deine Tour</button>
</div>
`;

const JA = `
<!-- ================================================
     ページ要約ブロック — Google AI Overviews と
     Bing Copilot 向け。コンテンツ冒頭に配置。
     ================================================ -->
<p class="page-summary" style="position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;" aria-hidden="false">
  Adventure Tours Vernalは、Dave WilsonとTrudy Wilsonが立ち上げた、ユタ州バーナルの地元経営のUTVツアー会社です。Dave Wilsonがオーナー兼チーフガイドを務め、Kawasaki KRX 1000のサイドバイサイドでUintah Basinをめぐるガイド付きツアーをご提供しています。Googleのレビュー82件で5.0の評価をいただいています。お電話は(435) 219-9447まで。
</p>

<!-- ヒーローセクション -->
<section class="about-hero" style="position:relative; overflow:hidden;">
  <div class="about-hero-video-bg">
    <iframe
      src="https://www.youtube.com/embed/LsqbwVkwrbw?autoplay=1&mute=1&loop=1&playlist=LsqbwVkwrbw&controls=0&rel=0&playsinline=1"
      frameborder="0"
      allow="autoplay; encrypted-media"
      allowfullscreen>
    </iframe>
  </div>
  <div class="about-hero-overlay"></div>
  <div class="about-hero-content">
    <h1 class="about-hero-title">ユタ州バーナルのUTVツアー — 冒険から生まれた会社</h1>
    <p class="about-hero-subtitle">Uintah Basin最高の冒険への入口です</p>
    <p class="about-hero-subtitle" style="font-weight:600;">★★★★★ Googleのレビュー82件で5.0の評価 — すべてのツアーをDave &amp; Trudy Wilsonが自ら案内します</p>
  </div>
</section>

<!-- 本文セクション -->
<section class="about-main">
  <div class="container">

    <!-- ミッション -->
    <div class="about-card mission-card">
      <div class="mission-content">
        <h2 class="about-heading">最初の一社。最高の一社。究極のUTV体験。</h2>
        <p class="lead-text">私たちが目指しているのは、Uintah Basinで最初のUTVツアー会社になることだけではありません。最高の一社になることです。Adventure Tours Vernalは、最高の<strong>Kawasaki</strong> KRXサイドバイサイドを使い、いちばん安全で、いちばんスリルのある冒険をご提供しています。</p>
        <p>私たちのアドベンチャーツアーでは、景観の美しい峡谷と、高台に刻まれた歴史をたどる素晴らしいトレイルをご覧いただけます。たとえば、こんな地元の宝物をめぐります。</p>

        <div class="highlights-grid">
          <div class="highlight-item">
            <div class="highlight-icon">🏞️</div>
            <div class="highlight-text">
              <strong>Flaming Gorge</strong>
              <p>息をのむような赤い岩の峡谷と、澄みきった水</p>
            </div>
            <div class="video-embed-wrapper">
              <iframe
                src="https://www.youtube.com/embed/tktE4GbS9gQ?si=PwYv9yMUs-yYAM4U"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen></iframe>
            </div>
          </div>
          <div class="highlight-item">
            <div class="highlight-icon">🦕</div>
            <div class="highlight-text">
              <strong>Dinosaur Monument</strong>
              <p>太古の化石層と、先史時代の風景</p>
            </div>
            <div class="video-embed-wrapper">
              <iframe
                src="https://www.youtube.com/embed/PoCN4Lo9Lkk?si=OYkfE56RP_uMcHoF"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen></iframe>
            </div>
          </div>
          <div class="highlight-item">
            <div class="highlight-icon">🛶</div>
            <div class="highlight-text">
              <strong>Green River</strong>
              <p>世界有数のラフティングとフィッシングの舞台</p>
            </div>
            <div class="video-embed-wrapper">
              <iframe
                src="https://www.youtube.com/embed/p05cObabbjg?si=gjsw6MKCJHx6s6Vq"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen></iframe>
            </div>
          </div>
          <div class="highlight-item">
            <div class="highlight-icon">🗿</div>
            <div class="highlight-text">
              <strong>古代の岩絵</strong>
              <p>何千年にもわたる先住民の歴史</p>
            </div>
            <div class="video-embed-wrapper">
              <iframe
                src="https://www.youtube.com/embed/fwzaXWfuFdk?si=Xt1_DCIPRzqx7QDL"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen></iframe>
            </div>
          </div>
          <div class="highlight-item">
            <div class="highlight-icon">⛰️</div>
            <div class="highlight-text">
              <strong>ユインタ山脈</strong>
              <p>雄大な峰々と、高山の原野</p>
            </div>
            <div class="video-embed-wrapper">
              <iframe
                src="https://www.youtube.com/embed/AanVVzP0_oM?si=5GOFOiI5MBc5dm1D"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen></iframe>
            </div>
          </div>
          <div class="highlight-item">
            <div class="highlight-icon">🌈</div>
            <div class="highlight-text">
              <strong>Fantasy Canyon</strong>
              <p>この世のものとは思えない岩の造形と、砂漠の美しさ</p>
            </div>
            <div class="video-embed-wrapper">
              <iframe
                src="https://www.youtube.com/embed/m64J-ovzTf4?si=FLULmmhzbq8zDzV2"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 私たちの歩み -->
    <div class="our-story-section">
      <div class="story-content">
        <h2 class="section-title">私たちの歩み</h2>
        <div class="story-text">
          <p class="story-intro">冒険は、私たちが「していること」ではありません。私たちそのものです。</p>

          <p>Salt Lake Valleyで育ち、若いころをWasatchとOquirrhの山々を歩きまわって過ごすうちに、これは一生ものの情熱だと気づきました。自由に走りまわれた80年代の子どもだった私と兄弟は、マウンテンバイク、ジープ、ハイキング、スノーモービル、スキー、キャンプ、乗馬、ラッペリング、崖からの飛び込み、洞窟探検……と、思いつくかぎりのことをやってきました。家族の山小屋で過ごした忘れられない週末も、数えきれないほどあります。</p>

          <p>幼いころから、自分が求めているのはアドレナリンの高鳴りなのだと分かっていました。骨を何本か折り、たぶんアクスルも1本や2本は折りましたが、それでもアウトドアへの気持ちが冷めることはありませんでした。</p>

          <p>美しくて、すごくて、ゴージャスで、最高で、素晴らしい妻であり親友でもある Trudy と私は、ユタ州バーナルに移り住みました。引っ越してからというもの、私たちはUintah Basinという土地にすっかり惚れ込み、この情熱を、心から愛するようになった自然の驚異を友人や家族、そして訪れる方々と分かち合うことに向けようと決めたのです。</p>
        </div>
      </div>

      <!-- 家族写真セクション -->
      <div class="family-section">
        <div class="family-photo-container">
          <img src="/images/wilson-family.webp" alt="Adventure Tours Vernalのオーナーである Dave Wilson と Trudy Wilson、そして家族" class="family-photo">
          <div class="family-photo-caption">
            <h3>Wilson一家のご紹介</h3>
            <p>Dave WilsonとTrudy Wilson、4人の子どもたち、そして孫</p>
            <p class="family-names">8 Boys、Ansley、Trinity、Scott、Chandler - Little Z-man</p>
            <p class="guide-profile-links">ガイドのご紹介： <a href="/about/dave/">Dave Wilson</a> &amp; <a href="/about/trudy/">Trudy Wilson</a></p>
          </div>
        </div>
      </div>
    </div>

    <!-- 私たちのこれから -->
    <div class="about-card future-card">
      <h2 class="about-heading">私たちのこれから</h2>
      <div class="future-content">
        <p class="lead-text">Adventure Tours Vernalは、体験することへの私たちの愛情から生まれました。</p>

        <p>家族でこの土地に移り住んでから、私たちは家族の思い出に投資しはじめました。この一生ものの情熱が、ATV、マウンテンバイク、スノーモービル、ボート、キャンプ・ハンティング・フィッシングの道具の購入につながり、そして何より、広がっていく友人と家族というコミュニティへの投資につながっていきました。</p>

        <p>気がつけば私たちは、自分たちの裏庭で見つけたこの美しさをぜひ見に来てほしいと、周りの人たちにほとんど懇願していました。プライベートで出かけるたびに、洞窟を見つけ、トレイルを見つけ、歴史に触れ、想像をはるかに超える景色を楽しんできました。</p>

        <p>今日では、そこで得た知識を一回一回のツアーでお伝えしています。人里離れた峡谷や岩絵の遺跡をめぐる<a href="/ja/utv/backcountry-tours-vernal-utah/">ガイド付きバックカントリーツアー</a>から、<a href="/ja/utv/best-utv-trails-vernal/">バーナル近郊で運行している5つのトレイルシステム</a>まで。どれも私たち自身が歩きまわってきた土地であり、いまはそれを下見し、地図に落とし込み、直接ご案内しています。</p>

        <p>この「裏庭」は、ひとつの町にはおさまりません。複数の州にまたがる広大な地域です。Dinosaur National Monumentはユタ州からコロラド州へと広がり、Flaming Gorgeは北のワイオミング州へ、High Uintasは西にそびえています。そして、そのちょうど真ん中にバーナルがあります。</p>

        <figure style="margin:2.5rem auto;max-width:820px;text-align:center;">
          <img src="/images/maps/vernal-dinosaur-country-overview.svg" alt="Adventure Tours Vernalが拠点とする、複数の州にまたがる地域「恐竜の国」の概念図。ベースキャンプであるユタ州バーナルを中心に、4つのエリアが示されています。Dinosaur National Monument（ユタ州とコロラド州にまたがる）、Flaming Gorge（ユタ州からワイオミング州へと広がる）、High UintasとAshley National Forest、そして周囲に広がるUintah Basinです。地域どうしの位置関係のみを示したもので、縮尺・距離・方位は正確ではありません。州名は広がりを示すものであり、地図上の境界線ではありません。" width="1600" height="1200" loading="lazy" decoding="async" />
          <figcaption style="margin-top:0.75rem;font-size:0.9rem;line-height:1.6;color:#6E655C;">私たちが言う「裏庭」とは、コロラド州とワイオミング州にまで届く、複数の州にまたがる地域のこと。その中心にバーナルがあります。方位図であり、縮尺は正確ではありません。</figcaption>
        </figure>

        <div class="vision-box">
          <h3>私たちのビジョン</h3>
          <p>A.T.V.は、この裏庭に広がる雄大な景色を思いきり味わっていただくためにあります。ゆっくりして、少し長く滞在してみてください。後悔はさせません。</p>
          <p>Uintah Basinでの忘れられない思い出とともに、美しい写真、興味深い歴史、そして友人に話したくなるエピソードを持ち帰っていただけたら、これほど嬉しいことはありません。</p>
          <p><strong>きっとまた来たくなります。これは保証します！</strong></p>
        </div>
      </div>
    </div>

    <!-- 選ばれる理由 -->
    <div class="why-choose-section">
      <h2 class="section-title">Adventure Tours Vernalが選ばれる理由</h2>
      <div class="why-grid">
        <div class="why-item">
          <div class="why-icon">🏆</div>
          <h3>最初にして最高</h3>
          <p>Uintah Basin随一のUTVツアー会社です</p>
        </div>
        <div class="why-item">
          <div class="why-icon">🛡️</div>
          <h3>安全が第一</h3>
          <p>最高水準の装備と、経験豊富なガイド</p>
        </div>
        <div class="why-item">
          <div class="why-icon">🌟</div>
          <h3>地元を知り尽くしたガイド</h3>
          <p>この土地のことなら、手のひらのように分かります</p>
        </div>
        <div class="why-item">
          <div class="why-icon">❤️</div>
          <h3>家族の情熱</h3>
          <p>冒険への愛情を、皆さまと分かち合います</p>
        </div>
        <div class="why-item">
          <div class="why-icon">🏔️</div>
          <h3>知られざる名所</h3>
          <p>ほかの人が知らないトレイルと眺めへご案内します</p>
        </div>
        <div class="why-item">
          <div class="why-icon">✨</div>
          <h3>忘れられない一日</h3>
          <p>一生ものの思い出になります</p>
        </div>
      </div>
    </div>

    <!-- CTAセクション -->
    <div class="about-cta">
      <h2>冒険に出かける準備はできましたか？</h2>
      <p>Wilson一家と一緒に、ユタ州バーナルが究極のアウトドアの遊び場である理由を確かめてください。</p>
      <div class="cta-buttons">
        <a href="/ja/booking/" class="cta-button primary">冒険を予約する</a>
        <a href="tel:435-219-9447" class="cta-button secondary">📞 (435) 219-9447に電話する</a>
      </div>
    </div>

  </div>
</section>

<!-- モバイル用固定CTA -->
<div class="mobile-sticky-cta">
  <button onclick="location.href='/ja/booking/'">今すぐツアーを予約する</button>
</div>
`;

/**
 * Locale-aware accessor (P2D pattern; Spanish populated P3A, Italian P6,
 * French added P8, German added P9, Japanese added P10K).
 * Every locale without a committed variant falls back to English. Callers
 * that don't need locale awareness keep importing `bodyHtml` directly.
 */
export function getBodyHtml(locale: string = DEFAULT_LOCALE): string {
  if (locale === 'es') return ES;
  if (locale === 'it') return IT;
  if (locale === 'pt') return PT;
  if (locale === 'fr') return FR;
  if (locale === 'de') return DE;
  if (locale === 'ja') return JA;
  return bodyHtml;
}
