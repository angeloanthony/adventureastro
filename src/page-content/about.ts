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

/**
 * Locale-aware accessor (P2D pattern; Spanish populated P3A, Italian P6).
 * Every locale without a committed variant falls back to English. Callers
 * that don't need locale awareness keep importing `bodyHtml` directly.
 */
export function getBodyHtml(locale: string = DEFAULT_LOCALE): string {
  if (locale === 'es') return ES;
  if (locale === 'it') return IT;
  return bodyHtml;
}
