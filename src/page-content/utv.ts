// utv.ts — extracted page body content (P2C). English source of truth
// for this page's body; rendered via set:html. Spanish variant added P3A
// (formal "usted"). "Dinosaur Country" is the site's own descriptive
// nickname (not an official place name per the multilingual handoff's
// proper-noun list), so it's translated as "Tierra de los Dinosaurios"
// consistently across every Spanish page. YouTube iframe `title`
// attributes ("Doc's Beach Vernal Utah") are proper nouns only — kept
// verbatim in both locales.
import { SITE } from '../config/site';
import { DEFAULT_LOCALE } from '../lib/i18n';

export const bodyHtml = `

  <!-- HERO -->
  <div class="trail-hero">
    <div class="trail-hero-video-bg">
  <iframe
  src="https://www.youtube.com/embed/YQVFzCTh4m4?autoplay=1&mute=1&loop=1&playlist=YQVFzCTh4m4&controls=0&showinfo=0&rel=0&playsinline=1"
  frameborder="0"
  allow="autoplay; encrypted-media"
  allowfullscreen>
</iframe>
</div>
    <div class="trail-hero-overlay"></div>
    <div class="trail-hero-content">
      <nav class="trail-breadcrumb" aria-label="Breadcrumb">
        <a href="/">Home</a>
        <span>&#8250;</span>
        <span class="current">Trails</span>
      </nav>
      <div class="status-badge" style="animation:none;">Trail Guide</div>
      <h1 class="trail-hero-title">Our Trails</h1>
      <div style="margin-top:14px;"><span style="display:inline-flex;align-items:center;gap:8px;padding:7px 15px;border:1px solid rgba(255,255,255,0.5);border-radius:999px;background:rgba(0,0,0,0.35);font-size:0.95rem;color:#fff;"><span aria-hidden="true" style="color:#f5c451;letter-spacing:1px;">★★★★★</span> <span><strong>${SITE.rating.value}</strong> &middot; ${SITE.rating.count} Google reviews</span></span></div>
      <div class="trail-hero-meta">
        <div class="trail-hero-meta-item"><span>&#128205;</span><span>Vernal, Utah</span></div>
        <div class="trail-hero-meta-item"><span>&#128106;</span><span>All Ages Welcome</span></div>
        <div class="trail-hero-meta-item"><span>&#129413;</span><span>Wildlife &amp; Petroglyphs</span></div>
      </div>
    </div>
  </div>

  <!-- MAIN -->
  <div class="trail-main">

      <!-- DOC'S BEACH CAROUSEL -->
    <div class="docs-beach-section">
      <h2>Doc's Beach Vernal Utah</h2>
      <p>Real rides from Vernal's backcountry — no filter needed.</p>

      <div class="docs-beach-carousel">
        <button class="docs-beach-carousel-btn prev" aria-label="Previous video">&#8249;</button>

        <div class="docs-beach-carousel-track-wrap">
          <div class="docs-beach-carousel-track">

            <div class="docs-beach-carousel-slide">
              <div class="docs-beach-portrait-frame">
                <div class="docs-beach-portrait-screen">
                  <iframe src="https://www.youtube.com/embed/U4RogvmCLFU" title="Doc's Beach Vernal Utah" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen scrolling="no"></iframe>
                </div>
              </div>
            </div>

            <div class="docs-beach-carousel-slide">
              <div class="docs-beach-portrait-frame">
                <div class="docs-beach-portrait-screen">
                  <iframe src="https://www.youtube.com/embed/keP0VM7arfU" title="Doc's Beach Vernal Utah" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen scrolling="no"></iframe>
                </div>
              </div>
            </div>

            <div class="docs-beach-carousel-slide">
              <div class="docs-beach-portrait-frame">
                <div class="docs-beach-portrait-screen">
                  <iframe src="https://www.youtube.com/embed/zVhDfvb3W3U" title="Doc's Beach Vernal Utah" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen scrolling="no"></iframe>
                </div>
              </div>
            </div>

            <div class="docs-beach-carousel-slide">
              <div class="docs-beach-portrait-frame">
                <div class="docs-beach-portrait-screen">
                  <iframe src="https://www.youtube.com/embed/NHmuaQLcenk" title="Doc's Beach Vernal Utah" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen scrolling="no"></iframe>
                </div>
              </div>
            </div>

            <div class="docs-beach-carousel-slide">
              <div class="docs-beach-portrait-frame">
                <div class="docs-beach-portrait-screen">
                  <iframe src="https://www.youtube.com/embed/Pld_Ud8Vg58" title="Doc's Beach Vernal Utah" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen scrolling="no"></iframe>
                </div>
              </div>
            </div>

            <div class="docs-beach-carousel-slide">
              <div class="docs-beach-portrait-frame">
                <div class="docs-beach-portrait-screen">
                  <iframe src="https://www.youtube.com/embed/_28bv0vq_OY" title="Doc's Beach Vernal Utah" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen scrolling="no"></iframe>
                </div>
              </div>
            </div>

            <div class="docs-beach-carousel-slide">
              <div class="docs-beach-portrait-frame">
                <div class="docs-beach-portrait-screen">
                  <iframe src="https://www.youtube.com/embed/guQRW68vlIQ" title="Doc's Beach Vernal Utah" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen scrolling="no"></iframe>
                </div>
              </div>
            </div>

            <div class="docs-beach-carousel-slide">
              <div class="docs-beach-portrait-frame">
                <div class="docs-beach-portrait-screen">
                  <iframe src="https://www.youtube.com/embed/IfIEozbAWXc" title="Doc's Beach Vernal Utah" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen scrolling="no"></iframe>
                </div>
              </div>
            </div>

            <div class="docs-beach-carousel-slide">
              <div class="docs-beach-portrait-frame">
                <div class="docs-beach-portrait-screen">
                  <iframe src="https://www.youtube.com/embed/c0Ikw96DuUk" title="Doc's Beach Vernal Utah" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen scrolling="no"></iframe>
                </div>
              </div>
            </div>

            <div class="docs-beach-carousel-slide">
              <div class="docs-beach-portrait-frame">
                <div class="docs-beach-portrait-screen">
                  <iframe src="https://www.youtube.com/embed/Qpqn3COiM-c" title="Doc's Beach Vernal Utah" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen scrolling="no"></iframe>
                </div>
              </div>
            </div>

            <div class="docs-beach-carousel-slide">
              <div class="docs-beach-portrait-frame">
                <div class="docs-beach-portrait-screen">
                  <iframe src="https://www.youtube.com/embed/vEX-XavayK8" title="Doc's Beach Vernal Utah" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen scrolling="no"></iframe>
                </div>
              </div>
            </div>

            <div class="docs-beach-carousel-slide">
              <div class="docs-beach-portrait-frame">
                <div class="docs-beach-portrait-screen">
                  <iframe src="https://www.youtube.com/embed/LsqbwVkwrbw" title="Doc's Beach Vernal Utah" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen scrolling="no"></iframe>
                </div>
              </div>
            </div>

            <div class="docs-beach-carousel-slide">
              <div class="docs-beach-portrait-frame">
                <div class="docs-beach-portrait-screen">
                  <iframe src="https://www.youtube.com/embed/YQVFzCTh4m4" title="Doc's Beach Vernal Utah" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen scrolling="no"></iframe>
                </div>
              </div>
            </div>

            <div class="docs-beach-carousel-slide">
              <div class="docs-beach-portrait-frame">
                <div class="docs-beach-portrait-screen">
                  <iframe src="https://www.youtube.com/embed/BHOABkrNnnE" title="Doc's Beach Vernal Utah" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen scrolling="no"></iframe>
                </div>
              </div>
            </div>

            <div class="docs-beach-carousel-slide">
              <div class="docs-beach-portrait-frame">
                <div class="docs-beach-portrait-screen">
                  <iframe src="https://www.youtube.com/embed/tC9hDT--vNE" title="Doc's Beach Vernal Utah" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen scrolling="no"></iframe>
                </div>
              </div>
            </div>

            <div class="docs-beach-carousel-slide">
              <div class="docs-beach-portrait-frame">
                <div class="docs-beach-portrait-screen">
                  <iframe src="https://www.youtube.com/embed/_GEkyZvT1NY" title="Doc's Beach Vernal Utah" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen scrolling="no"></iframe>
                </div>
              </div>
            </div>

            <div class="docs-beach-carousel-slide">
              <div class="docs-beach-portrait-frame">
                <div class="docs-beach-portrait-screen">
                  <iframe src="https://www.youtube.com/embed/9o5CePPqr9k" title="Doc's Beach Vernal Utah" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen scrolling="no"></iframe>
                </div>
              </div>
            </div>

            <div class="docs-beach-carousel-slide">
              <div class="docs-beach-portrait-frame">
                <div class="docs-beach-portrait-screen">
                  <iframe src="https://www.youtube.com/embed/AkBqq7C6XhM" title="Doc's Beach Vernal Utah" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen scrolling="no"></iframe>
                </div>
              </div>
            </div>

            <div class="docs-beach-carousel-slide">
              <div class="docs-beach-portrait-frame">
                <div class="docs-beach-portrait-screen">
                  <iframe src="https://www.youtube.com/embed/0j4NYKi5rl4" title="Doc's Beach Vernal Utah" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen scrolling="no"></iframe>
                </div>
              </div>
            </div>

            <div class="docs-beach-carousel-slide">
              <div class="docs-beach-portrait-frame">
                <div class="docs-beach-portrait-screen">
                  <iframe src="https://www.youtube.com/embed/oXR3mkEPxQc" title="Doc's Beach Vernal Utah" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen scrolling="no"></iframe>
                </div>
              </div>
            </div>

            <div class="docs-beach-carousel-slide">
              <div class="docs-beach-portrait-frame">
                <div class="docs-beach-portrait-screen">
                  <iframe src="https://www.youtube.com/embed/ugR79DX2CHE" title="Doc's Beach Vernal Utah" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen scrolling="no"></iframe>
                </div>
              </div>
            </div>


          </div>
        </div>

        <button class="docs-beach-carousel-btn next" aria-label="Next video">&#8250;</button>
      </div>

      <div class="docs-beach-carousel-dots">
        <button class="docs-beach-dot active" data-index="0"></button>
        <button class="docs-beach-dot" data-index="1"></button>
        <button class="docs-beach-dot" data-index="2"></button>
        <button class="docs-beach-dot" data-index="3"></button>
        <button class="docs-beach-dot" data-index="4"></button>
        <button class="docs-beach-dot" data-index="5"></button>
        <button class="docs-beach-dot" data-index="6"></button>
        <button class="docs-beach-dot" data-index="7"></button>
        <button class="docs-beach-dot" data-index="8"></button>
        <button class="docs-beach-dot" data-index="9"></button>
        <button class="docs-beach-dot" data-index="10"></button>
        <button class="docs-beach-dot" data-index="11"></button>
        <button class="docs-beach-dot" data-index="12"></button>
        <button class="docs-beach-dot" data-index="13"></button>
        <button class="docs-beach-dot" data-index="14"></button>
        <button class="docs-beach-dot" data-index="15"></button>
        <button class="docs-beach-dot" data-index="16"></button>
        <button class="docs-beach-dot" data-index="17"></button>
        <button class="docs-beach-dot" data-index="18"></button>
        <button class="docs-beach-dot" data-index="19"></button>
        <button class="docs-beach-dot" data-index="20"></button>
      </div>
    </div>

    <!-- INTRO + SIDEBAR -->
    <div class="trail-intro">
      <div class="trail-intro-text">
        <h2>Five Legendary Trails in Utah's Dinosaur Country</h2>
        <div class="section-divider"></div>
        <p>Adventure Tours Vernal offers five guided UTV trail tours through some of the most spectacular backcountry in the Uintah Basin. Whether you're chasing sweeping canyon views, ancient petroglyphs, or wildlife encounters, there's a trail for every adventurer.</p>
        <p>All tours are guided by Dave and Trudy Wilson aboard Kawasaki KRX 1000 side-by-sides — built for comfort, power, and safety. From the riverside sands of Doc's Beach to the ridge-top panoramas of Asphalt Ridge, every ride is an experience you won't forget.</p>
        <p>Keep your eyes open for golden eagles, bald eagles, owls, osprey, falcon, deer, and even cougar along the way — Vernal's backcountry is alive with wildlife at every turn.</p>
      </div>

      <div class="trail-highlights-box">
        <h3>Trail Highlights</h3>
        <ul class="highlight-list">
          <li><span class="hl-icon">&#129413;</span><span>Golden &amp; Bald Eagles</span></li>
          <li><span class="hl-icon">&#129417;</span><span>Owls, Osprey &amp; Falcon</span></li>
          <li><span class="hl-icon">&#129420;</span><span>Deer &amp; Cougar</span></li>
          <li><span class="hl-icon">&#129704;</span><span>Ancient Petroglyphs</span></li>
          <li><span class="hl-icon">&#127956;</span><span>Scenic Overlooks</span></li>
          <li><span class="hl-icon">&#127754;</span><span>Green River Views</span></li>
          <li><span class="hl-icon">&#128106;</span><span>Family Friendly</span></li>
        </ul>
        <a href="/booking/" class="tour-book-btn" style="display:block;text-align:center;margin-bottom:12px;">Book a Trail</a>
        <a href="tel:435-219-9447" class="call-sidebar-btn">&#128222; (435) 219-9447</a>
      </div>
    </div>

  

    <!-- PROMO VIDEO — 3D FRAME -->
    <div class="promo-video-section">
      <h2>5 Trails. 5 Adventures. 1 Extraordinary Place.</h2>
      <p>Get a taste of everything Vernal's backcountry has to offer.</p>
      <div class="promo-video-3d-wrap">
        <div class="promo-video-frame">
          <div class="promo-video-screen">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/ugR79DX2CHE?si=8geOb3H2XYk8Q-js" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
        </div>
      </div>
    </div>

   <!-- PHOTO GALLERY -->
    <div class="photo-gallery-section">
      <h2>A glimpse of the terrain, scenery, and adventure waiting for you on the trails.</h2>
        <div class="photo-grid">
        <div class="photo-grid-item featured">
          <img src="/images/Docs%20Beach.webp" alt="Doc's Beach guided UTV tour — Adventure Tours Vernal">
        </div>
        <div class="photo-grid-item">
          <img src="/images/Docs Beach 1.webp" alt="Doc's Beach off-road UTV trail Vernal Utah">
        </div>
        
      </div>
    </div>

    <!-- CTA -->
    <div class="policy-cta trail-cta" style="position:relative; overflow:hidden;">
  <div class="cta-video-bg">
    <iframe
      src="https://www.youtube.com/embed/U4RogvmCLFU?autoplay=1&mute=1&loop=1&playlist=U4RogvmCLFU&controls=0&showinfo=0&rel=0&playsinline=1"
      frameborder="0"
      allow="autoplay; encrypted-media"
      allowfullscreen>
    </iframe>
  </div>
  <div class="cta-video-overlay"></div>
      <span class="trail-cta-watermark">ADVENTURE AWAITS</span>
      <h3>Ready to Hit the Trails?</h3>
      <p>Five legendary destinations. Book your guided tour today and let Dave and Trudy Wilson show you what Vernal's backcountry is all about.</p>
      <div class="cta-buttons">
        <a href="/booking/" class="cta-button primary">Book Your Adventure</a>
        <a href="tel:435-219-9447" class="cta-button secondary">&#128222; (435) 219-9447</a>
      </div>
    </div>

    <!-- TRAIL SYSTEMS ORIENTATION MAP -->
    <p style="max-width:820px;margin:2rem auto 0;padding:0 1rem;text-align:center;line-height:1.7;">Every Adventure Tours Vernal ride begins at a single staging point in town and heads out to one of five distinct trail systems, each with its own terrain and character. The diagram below shows how the five relate before you explore them one by one.</p>

    <figure style="margin:2.5rem auto;max-width:820px;text-align:center;">
      <img src="/images/maps/vernal-utv-trail-systems.svg" alt="Schematic diagram of Adventure Tours Vernal's five UTV trail systems — Doc's Beach, Moonshine Arch, Ashley Gorge, Asphalt Ridge, and Outlaw Trail — arranged as labeled spokes around a central Vernal, Utah tour staging point. It shows the trail systems and their shared starting point only, and is not drawn to scale and shows no routes, distances, directions, or trailhead locations." width="1600" height="1200" loading="lazy" decoding="async" />
      <figcaption style="margin-top:0.75rem;font-size:0.9rem;line-height:1.6;color:#6E655C;">Five distinct trail systems, one Vernal staging point. Schematic diagram — not to scale, and it shows no routes, distances, or trailhead locations.</figcaption>
    </figure>

    <!-- ALL TRAILS -->
<div class="other-trails-section">
  <h2>Explore All Trails</h2>
  <div class="other-trails-grid">

    <div class="other-trail-card">
      <div class="other-trail-img" style="background-image:url('/images/48.webp');"></div>
      <div class="other-trail-info"><h3>Doc's Beach</h3><span>All Skill Levels</span></div>
    </div>

    <div class="other-trail-card">
      <div class="other-trail-img" style="background-image:url('/images/42a.webp');"></div>
      <div class="other-trail-info"><h3>Moonshine Arch</h3><span>Scenic &amp; Historic</span></div>
    </div>

    <div class="other-trail-card">
      <div class="other-trail-img" style="background-image:url('/images/50a.webp');"></div>
      <div class="other-trail-info"><h3>Ashley Gorge</h3><span>Canyon Adventure</span></div>
    </div>

    <div class="other-trail-card">
      <div class="other-trail-img" style="background-image:url('/images/51a.webp');"></div>
      <div class="other-trail-info"><h3>Outlaw Trail</h3><span>Historic Route</span></div>
    </div>

    <div class="other-trail-card">
      <div class="other-trail-img" style="background-image:url('/images/52a.webp');"></div>
      <div class="other-trail-info"><h3>Asphalt Ridge</h3><span>Panoramic Views</span></div>
    </div>

  </div>
</div>


  </div><!-- end .trail-main -->

  <div class="mobile-sticky-cta">
    <button onclick="location.href='/booking/'">Book Your Adventure Now</button>
  </div>

  <script is:inline>
    // Doc's Beach Carousel
    (function() {
      var track = document.querySelector('.docs-beach-carousel-track');
      var slides = document.querySelectorAll('.docs-beach-carousel-slide');
      var dots = document.querySelectorAll('.docs-beach-dot');
      var prevBtn = document.querySelector('.docs-beach-carousel-btn.prev');
      var nextBtn = document.querySelector('.docs-beach-carousel-btn.next');
      var current = 0;
      var total = slides.length;

      function goTo(index) {
        current = (index + total) % total;
        track.style.transform = 'translateX(-' + (current * 100) + '%)';
        dots.forEach(function(d, i) {
          d.classList.toggle('active', i === current);
        });
      }

      prevBtn.addEventListener('click', function() { goTo(current - 1); });
      nextBtn.addEventListener('click', function() { goTo(current + 1); });
      dots.forEach(function(dot) {
        dot.addEventListener('click', function() { goTo(parseInt(this.dataset.index)); });
      });
    })();
  </script>
`;

const ES = `

  <!-- HERO -->
  <div class="trail-hero">
    <div class="trail-hero-video-bg">
  <iframe
  src="https://www.youtube.com/embed/YQVFzCTh4m4?autoplay=1&mute=1&loop=1&playlist=YQVFzCTh4m4&controls=0&showinfo=0&rel=0&playsinline=1"
  frameborder="0"
  allow="autoplay; encrypted-media"
  allowfullscreen>
</iframe>
</div>
    <div class="trail-hero-overlay"></div>
    <div class="trail-hero-content">
      <nav class="trail-breadcrumb" aria-label="Breadcrumb">
        <a href="/es/">Inicio</a>
        <span>&#8250;</span>
        <span class="current">Senderos</span>
      </nav>
      <div class="status-badge" style="animation:none;">Guía de Senderos</div>
      <h1 class="trail-hero-title">Nuestros Senderos</h1>
      <div style="margin-top:14px;"><span style="display:inline-flex;align-items:center;gap:8px;padding:7px 15px;border:1px solid rgba(255,255,255,0.5);border-radius:999px;background:rgba(0,0,0,0.35);font-size:0.95rem;color:#fff;"><span aria-hidden="true" style="color:#f5c451;letter-spacing:1px;">★★★★★</span> <span><strong>${SITE.rating.value}</strong> &middot; ${SITE.rating.count} reseñas de Google</span></span></div>
      <div class="trail-hero-meta">
        <div class="trail-hero-meta-item"><span>&#128205;</span><span>Vernal, Utah</span></div>
        <div class="trail-hero-meta-item"><span>&#128106;</span><span>Todas las Edades son Bienvenidas</span></div>
        <div class="trail-hero-meta-item"><span>&#129413;</span><span>Fauna Silvestre y Petroglifos</span></div>
      </div>
    </div>
  </div>

  <!-- PRINCIPAL -->
  <div class="trail-main">

      <!-- CARRUSEL DE DOC'S BEACH -->
    <div class="docs-beach-section">
      <h2>Doc's Beach Vernal Utah</h2>
      <p>Recorridos reales por la zona agreste de Vernal — sin filtros.</p>

      <div class="docs-beach-carousel">
        <button class="docs-beach-carousel-btn prev" aria-label="Video anterior">&#8249;</button>

        <div class="docs-beach-carousel-track-wrap">
          <div class="docs-beach-carousel-track">

            <div class="docs-beach-carousel-slide">
              <div class="docs-beach-portrait-frame">
                <div class="docs-beach-portrait-screen">
                  <iframe src="https://www.youtube.com/embed/U4RogvmCLFU" title="Doc's Beach Vernal Utah" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen scrolling="no"></iframe>
                </div>
              </div>
            </div>

            <div class="docs-beach-carousel-slide">
              <div class="docs-beach-portrait-frame">
                <div class="docs-beach-portrait-screen">
                  <iframe src="https://www.youtube.com/embed/keP0VM7arfU" title="Doc's Beach Vernal Utah" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen scrolling="no"></iframe>
                </div>
              </div>
            </div>

            <div class="docs-beach-carousel-slide">
              <div class="docs-beach-portrait-frame">
                <div class="docs-beach-portrait-screen">
                  <iframe src="https://www.youtube.com/embed/zVhDfvb3W3U" title="Doc's Beach Vernal Utah" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen scrolling="no"></iframe>
                </div>
              </div>
            </div>

            <div class="docs-beach-carousel-slide">
              <div class="docs-beach-portrait-frame">
                <div class="docs-beach-portrait-screen">
                  <iframe src="https://www.youtube.com/embed/NHmuaQLcenk" title="Doc's Beach Vernal Utah" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen scrolling="no"></iframe>
                </div>
              </div>
            </div>

            <div class="docs-beach-carousel-slide">
              <div class="docs-beach-portrait-frame">
                <div class="docs-beach-portrait-screen">
                  <iframe src="https://www.youtube.com/embed/Pld_Ud8Vg58" title="Doc's Beach Vernal Utah" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen scrolling="no"></iframe>
                </div>
              </div>
            </div>

            <div class="docs-beach-carousel-slide">
              <div class="docs-beach-portrait-frame">
                <div class="docs-beach-portrait-screen">
                  <iframe src="https://www.youtube.com/embed/_28bv0vq_OY" title="Doc's Beach Vernal Utah" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen scrolling="no"></iframe>
                </div>
              </div>
            </div>

            <div class="docs-beach-carousel-slide">
              <div class="docs-beach-portrait-frame">
                <div class="docs-beach-portrait-screen">
                  <iframe src="https://www.youtube.com/embed/guQRW68vlIQ" title="Doc's Beach Vernal Utah" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen scrolling="no"></iframe>
                </div>
              </div>
            </div>

            <div class="docs-beach-carousel-slide">
              <div class="docs-beach-portrait-frame">
                <div class="docs-beach-portrait-screen">
                  <iframe src="https://www.youtube.com/embed/IfIEozbAWXc" title="Doc's Beach Vernal Utah" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen scrolling="no"></iframe>
                </div>
              </div>
            </div>

            <div class="docs-beach-carousel-slide">
              <div class="docs-beach-portrait-frame">
                <div class="docs-beach-portrait-screen">
                  <iframe src="https://www.youtube.com/embed/c0Ikw96DuUk" title="Doc's Beach Vernal Utah" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen scrolling="no"></iframe>
                </div>
              </div>
            </div>

            <div class="docs-beach-carousel-slide">
              <div class="docs-beach-portrait-frame">
                <div class="docs-beach-portrait-screen">
                  <iframe src="https://www.youtube.com/embed/Qpqn3COiM-c" title="Doc's Beach Vernal Utah" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen scrolling="no"></iframe>
                </div>
              </div>
            </div>

            <div class="docs-beach-carousel-slide">
              <div class="docs-beach-portrait-frame">
                <div class="docs-beach-portrait-screen">
                  <iframe src="https://www.youtube.com/embed/vEX-XavayK8" title="Doc's Beach Vernal Utah" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen scrolling="no"></iframe>
                </div>
              </div>
            </div>

            <div class="docs-beach-carousel-slide">
              <div class="docs-beach-portrait-frame">
                <div class="docs-beach-portrait-screen">
                  <iframe src="https://www.youtube.com/embed/LsqbwVkwrbw" title="Doc's Beach Vernal Utah" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen scrolling="no"></iframe>
                </div>
              </div>
            </div>

            <div class="docs-beach-carousel-slide">
              <div class="docs-beach-portrait-frame">
                <div class="docs-beach-portrait-screen">
                  <iframe src="https://www.youtube.com/embed/YQVFzCTh4m4" title="Doc's Beach Vernal Utah" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen scrolling="no"></iframe>
                </div>
              </div>
            </div>

            <div class="docs-beach-carousel-slide">
              <div class="docs-beach-portrait-frame">
                <div class="docs-beach-portrait-screen">
                  <iframe src="https://www.youtube.com/embed/BHOABkrNnnE" title="Doc's Beach Vernal Utah" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen scrolling="no"></iframe>
                </div>
              </div>
            </div>

            <div class="docs-beach-carousel-slide">
              <div class="docs-beach-portrait-frame">
                <div class="docs-beach-portrait-screen">
                  <iframe src="https://www.youtube.com/embed/tC9hDT--vNE" title="Doc's Beach Vernal Utah" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen scrolling="no"></iframe>
                </div>
              </div>
            </div>

            <div class="docs-beach-carousel-slide">
              <div class="docs-beach-portrait-frame">
                <div class="docs-beach-portrait-screen">
                  <iframe src="https://www.youtube.com/embed/_GEkyZvT1NY" title="Doc's Beach Vernal Utah" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen scrolling="no"></iframe>
                </div>
              </div>
            </div>

            <div class="docs-beach-carousel-slide">
              <div class="docs-beach-portrait-frame">
                <div class="docs-beach-portrait-screen">
                  <iframe src="https://www.youtube.com/embed/9o5CePPqr9k" title="Doc's Beach Vernal Utah" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen scrolling="no"></iframe>
                </div>
              </div>
            </div>

            <div class="docs-beach-carousel-slide">
              <div class="docs-beach-portrait-frame">
                <div class="docs-beach-portrait-screen">
                  <iframe src="https://www.youtube.com/embed/AkBqq7C6XhM" title="Doc's Beach Vernal Utah" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen scrolling="no"></iframe>
                </div>
              </div>
            </div>

            <div class="docs-beach-carousel-slide">
              <div class="docs-beach-portrait-frame">
                <div class="docs-beach-portrait-screen">
                  <iframe src="https://www.youtube.com/embed/0j4NYKi5rl4" title="Doc's Beach Vernal Utah" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen scrolling="no"></iframe>
                </div>
              </div>
            </div>

            <div class="docs-beach-carousel-slide">
              <div class="docs-beach-portrait-frame">
                <div class="docs-beach-portrait-screen">
                  <iframe src="https://www.youtube.com/embed/oXR3mkEPxQc" title="Doc's Beach Vernal Utah" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen scrolling="no"></iframe>
                </div>
              </div>
            </div>

            <div class="docs-beach-carousel-slide">
              <div class="docs-beach-portrait-frame">
                <div class="docs-beach-portrait-screen">
                  <iframe src="https://www.youtube.com/embed/ugR79DX2CHE" title="Doc's Beach Vernal Utah" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen scrolling="no"></iframe>
                </div>
              </div>
            </div>


          </div>
        </div>

        <button class="docs-beach-carousel-btn next" aria-label="Video siguiente">&#8250;</button>
      </div>

      <div class="docs-beach-carousel-dots">
        <button class="docs-beach-dot active" data-index="0"></button>
        <button class="docs-beach-dot" data-index="1"></button>
        <button class="docs-beach-dot" data-index="2"></button>
        <button class="docs-beach-dot" data-index="3"></button>
        <button class="docs-beach-dot" data-index="4"></button>
        <button class="docs-beach-dot" data-index="5"></button>
        <button class="docs-beach-dot" data-index="6"></button>
        <button class="docs-beach-dot" data-index="7"></button>
        <button class="docs-beach-dot" data-index="8"></button>
        <button class="docs-beach-dot" data-index="9"></button>
        <button class="docs-beach-dot" data-index="10"></button>
        <button class="docs-beach-dot" data-index="11"></button>
        <button class="docs-beach-dot" data-index="12"></button>
        <button class="docs-beach-dot" data-index="13"></button>
        <button class="docs-beach-dot" data-index="14"></button>
        <button class="docs-beach-dot" data-index="15"></button>
        <button class="docs-beach-dot" data-index="16"></button>
        <button class="docs-beach-dot" data-index="17"></button>
        <button class="docs-beach-dot" data-index="18"></button>
        <button class="docs-beach-dot" data-index="19"></button>
        <button class="docs-beach-dot" data-index="20"></button>
      </div>
    </div>

    <!-- INTRO + SIDEBAR -->
    <div class="trail-intro">
      <div class="trail-intro-text">
        <h2>Cinco Senderos Legendarios en la Tierra de los Dinosaurios de Utah</h2>
        <div class="section-divider"></div>
        <p>Adventure Tours Vernal ofrece cinco tours guiados en UTV a través de algunos de los paisajes más espectaculares de la zona agreste de la Cuenca de Uintah. Ya sea que busque vistas impresionantes de cañones, petroglifos antiguos o encuentros con la fauna silvestre, hay un sendero para cada aventurero.</p>
        <p>Todos los tours son guiados por Dave y Trudy Wilson a bordo de UTV Kawasaki KRX 1000 — construidos para comodidad, potencia y seguridad. Desde las arenas ribereñas de Doc's Beach hasta las panorámicas desde la cresta de Asphalt Ridge, cada recorrido es una experiencia que no olvidará.</p>
        <p>Esté atento a águilas doradas, águilas calvas, búhos, águilas pescadoras, halcones, venados e incluso pumas en el camino — la zona agreste de Vernal está llena de vida silvestre en cada curva.</p>
      </div>

      <div class="trail-highlights-box">
        <h3>Aspectos Destacados del Sendero</h3>
        <ul class="highlight-list">
          <li><span class="hl-icon">&#129413;</span><span>Águilas Doradas y Calvas</span></li>
          <li><span class="hl-icon">&#129417;</span><span>Búhos, Águilas Pescadoras y Halcones</span></li>
          <li><span class="hl-icon">&#129420;</span><span>Venados y Pumas</span></li>
          <li><span class="hl-icon">&#129704;</span><span>Petroglifos Antiguos</span></li>
          <li><span class="hl-icon">&#127956;</span><span>Miradores Escénicos</span></li>
          <li><span class="hl-icon">&#127754;</span><span>Vistas del Green River</span></li>
          <li><span class="hl-icon">&#128106;</span><span>Apto para Familias</span></li>
        </ul>
        <a href="/es/booking/" class="tour-book-btn" style="display:block;text-align:center;margin-bottom:12px;">Reserve un Sendero</a>
        <a href="tel:435-219-9447" class="call-sidebar-btn">&#128222; (435) 219-9447</a>
      </div>
    </div>



    <!-- VIDEO PROMOCIONAL — MARCO 3D -->
    <div class="promo-video-section">
      <h2>5 Senderos. 5 Aventuras. 1 Lugar Extraordinario.</h2>
      <p>Disfrute un adelanto de todo lo que ofrece la zona agreste de Vernal.</p>
      <div class="promo-video-3d-wrap">
        <div class="promo-video-frame">
          <div class="promo-video-screen">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/ugR79DX2CHE?si=8geOb3H2XYk8Q-js" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
        </div>
      </div>
    </div>

   <!-- GALERÍA DE FOTOS -->
    <div class="photo-gallery-section">
      <h2>Un vistazo al terreno, el paisaje y la aventura que le esperan en los senderos.</h2>
        <div class="photo-grid">
        <div class="photo-grid-item featured">
          <img src="/images/Docs%20Beach.webp" alt="Tour guiado en UTV por Doc's Beach — Adventure Tours Vernal">
        </div>
        <div class="photo-grid-item">
          <img src="/images/Docs Beach 1.webp" alt="Sendero todo terreno en UTV por Doc's Beach, Vernal Utah">
        </div>

      </div>
    </div>

    <!-- LLAMADA A LA ACCIÓN -->
    <div class="policy-cta trail-cta" style="position:relative; overflow:hidden;">
  <div class="cta-video-bg">
    <iframe
      src="https://www.youtube.com/embed/U4RogvmCLFU?autoplay=1&mute=1&loop=1&playlist=U4RogvmCLFU&controls=0&showinfo=0&rel=0&playsinline=1"
      frameborder="0"
      allow="autoplay; encrypted-media"
      allowfullscreen>
    </iframe>
  </div>
  <div class="cta-video-overlay"></div>
      <span class="trail-cta-watermark">LA AVENTURA LO ESPERA</span>
      <h3>¿Listo para Recorrer los Senderos?</h3>
      <p>Cinco destinos legendarios. Reserve su tour guiado hoy y deje que Dave y Trudy Wilson le muestren de qué se trata la zona agreste de Vernal.</p>
      <div class="cta-buttons">
        <a href="/es/booking/" class="cta-button primary">Reserve Su Aventura</a>
        <a href="tel:435-219-9447" class="cta-button secondary">&#128222; (435) 219-9447</a>
      </div>
    </div>

    <!-- MAPA DE ORIENTACIÓN DE LOS SISTEMAS DE SENDEROS -->
    <p style="max-width:820px;margin:2rem auto 0;padding:0 1rem;text-align:center;line-height:1.7;">Cada recorrido de Adventure Tours Vernal comienza en un único punto de encuentro en la ciudad y se dirige hacia uno de cinco sistemas de senderos distintos, cada uno con su propio terreno y carácter. El siguiente diagrama muestra cómo se relacionan los cinco antes de que los explore uno por uno.</p>

    <figure style="margin:2.5rem auto;max-width:820px;text-align:center;">
      <img src="/images/maps/vernal-utv-trail-systems.svg" alt="Diagrama esquemático de los cinco sistemas de senderos en UTV de Adventure Tours Vernal — Doc's Beach, Moonshine Arch, Ashley Gorge, Asphalt Ridge y Outlaw Trail — organizados como radios etiquetados alrededor de un punto central de encuentro de tours en Vernal, Utah. Muestra únicamente los sistemas de senderos y su punto de partida compartido, no está dibujado a escala y no muestra rutas, distancias, direcciones ni ubicaciones de cabeceras de sendero." width="1600" height="1200" loading="lazy" decoding="async" />
      <figcaption style="margin-top:0.75rem;font-size:0.9rem;line-height:1.6;color:#6E655C;">Cinco sistemas de senderos distintos, un solo punto de encuentro en Vernal. Diagrama esquemático — no a escala, y no muestra rutas, distancias ni ubicaciones de cabeceras de sendero.</figcaption>
    </figure>

    <!-- TODOS LOS SENDEROS -->
<div class="other-trails-section">
  <h2>Explore Todos los Senderos</h2>
  <div class="other-trails-grid">

    <div class="other-trail-card">
      <div class="other-trail-img" style="background-image:url('/images/48.webp');"></div>
      <div class="other-trail-info"><h3>Doc's Beach</h3><span>Todos los Niveles</span></div>
    </div>

    <div class="other-trail-card">
      <div class="other-trail-img" style="background-image:url('/images/42a.webp');"></div>
      <div class="other-trail-info"><h3>Moonshine Arch</h3><span>Escénico e Histórico</span></div>
    </div>

    <div class="other-trail-card">
      <div class="other-trail-img" style="background-image:url('/images/50a.webp');"></div>
      <div class="other-trail-info"><h3>Ashley Gorge</h3><span>Aventura en Cañón</span></div>
    </div>

    <div class="other-trail-card">
      <div class="other-trail-img" style="background-image:url('/images/51a.webp');"></div>
      <div class="other-trail-info"><h3>Outlaw Trail</h3><span>Ruta Histórica</span></div>
    </div>

    <div class="other-trail-card">
      <div class="other-trail-img" style="background-image:url('/images/52a.webp');"></div>
      <div class="other-trail-info"><h3>Asphalt Ridge</h3><span>Vistas Panorámicas</span></div>
    </div>

  </div>
</div>


  </div><!-- end .trail-main -->

  <div class="mobile-sticky-cta">
    <button onclick="location.href='/es/booking/'">Reserve Su Aventura Ahora</button>
  </div>

  <script is:inline>
    // Doc's Beach Carousel
    (function() {
      var track = document.querySelector('.docs-beach-carousel-track');
      var slides = document.querySelectorAll('.docs-beach-carousel-slide');
      var dots = document.querySelectorAll('.docs-beach-dot');
      var prevBtn = document.querySelector('.docs-beach-carousel-btn.prev');
      var nextBtn = document.querySelector('.docs-beach-carousel-btn.next');
      var current = 0;
      var total = slides.length;

      function goTo(index) {
        current = (index + total) % total;
        track.style.transform = 'translateX(-' + (current * 100) + '%)';
        dots.forEach(function(d, i) {
          d.classList.toggle('active', i === current);
        });
      }

      prevBtn.addEventListener('click', function() { goTo(current - 1); });
      nextBtn.addEventListener('click', function() { goTo(current + 1); });
      dots.forEach(function(dot) {
        dot.addEventListener('click', function() { goTo(parseInt(this.dataset.index)); });
      });
    })();
  </script>
`;

// Italian variant added P6 (formal "Lei" register, mirrors ES structure
// 1:1). "Dinosaur Country" -> "Terra dei Dinosauri" per the locked
// glossary's fixed-phrase entry. YouTube iframe `title` attributes
// ("Doc's Beach Vernal Utah") are proper nouns only — kept verbatim.
const IT = `

  <!-- HERO -->
  <div class="trail-hero">
    <div class="trail-hero-video-bg">
  <iframe
  src="https://www.youtube.com/embed/YQVFzCTh4m4?autoplay=1&mute=1&loop=1&playlist=YQVFzCTh4m4&controls=0&showinfo=0&rel=0&playsinline=1"
  frameborder="0"
  allow="autoplay; encrypted-media"
  allowfullscreen>
</iframe>
</div>
    <div class="trail-hero-overlay"></div>
    <div class="trail-hero-content">
      <nav class="trail-breadcrumb" aria-label="Breadcrumb">
        <a href="/it/">Home</a>
        <span>&#8250;</span>
        <span class="current">Sentieri</span>
      </nav>
      <div class="status-badge" style="animation:none;">Guida ai Sentieri</div>
      <h1 class="trail-hero-title">I Nostri Sentieri</h1>
      <div style="margin-top:14px;"><span style="display:inline-flex;align-items:center;gap:8px;padding:7px 15px;border:1px solid rgba(255,255,255,0.5);border-radius:999px;background:rgba(0,0,0,0.35);font-size:0.95rem;color:#fff;"><span aria-hidden="true" style="color:#f5c451;letter-spacing:1px;">★★★★★</span> <span><strong>${SITE.rating.value}</strong> &middot; ${SITE.rating.count} recensioni Google</span></span></div>
      <div class="trail-hero-meta">
        <div class="trail-hero-meta-item"><span>&#128205;</span><span>Vernal, Utah</span></div>
        <div class="trail-hero-meta-item"><span>&#128106;</span><span>Adatto a Tutte le Età</span></div>
        <div class="trail-hero-meta-item"><span>&#129413;</span><span>Fauna Selvatica e Petroglifi</span></div>
      </div>
    </div>
  </div>

  <!-- PRINCIPALE -->
  <div class="trail-main">

      <!-- CAROSELLO DI DOC'S BEACH -->
    <div class="docs-beach-section">
      <h2>Doc's Beach Vernal Utah</h2>
      <p>Riprese autentiche dal backcountry di Vernal — senza filtri.</p>

      <div class="docs-beach-carousel">
        <button class="docs-beach-carousel-btn prev" aria-label="Video precedente">&#8249;</button>

        <div class="docs-beach-carousel-track-wrap">
          <div class="docs-beach-carousel-track">

            <div class="docs-beach-carousel-slide">
              <div class="docs-beach-portrait-frame">
                <div class="docs-beach-portrait-screen">
                  <iframe src="https://www.youtube.com/embed/U4RogvmCLFU" title="Doc's Beach Vernal Utah" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen scrolling="no"></iframe>
                </div>
              </div>
            </div>

            <div class="docs-beach-carousel-slide">
              <div class="docs-beach-portrait-frame">
                <div class="docs-beach-portrait-screen">
                  <iframe src="https://www.youtube.com/embed/keP0VM7arfU" title="Doc's Beach Vernal Utah" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen scrolling="no"></iframe>
                </div>
              </div>
            </div>

            <div class="docs-beach-carousel-slide">
              <div class="docs-beach-portrait-frame">
                <div class="docs-beach-portrait-screen">
                  <iframe src="https://www.youtube.com/embed/zVhDfvb3W3U" title="Doc's Beach Vernal Utah" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen scrolling="no"></iframe>
                </div>
              </div>
            </div>

            <div class="docs-beach-carousel-slide">
              <div class="docs-beach-portrait-frame">
                <div class="docs-beach-portrait-screen">
                  <iframe src="https://www.youtube.com/embed/NHmuaQLcenk" title="Doc's Beach Vernal Utah" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen scrolling="no"></iframe>
                </div>
              </div>
            </div>

            <div class="docs-beach-carousel-slide">
              <div class="docs-beach-portrait-frame">
                <div class="docs-beach-portrait-screen">
                  <iframe src="https://www.youtube.com/embed/Pld_Ud8Vg58" title="Doc's Beach Vernal Utah" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen scrolling="no"></iframe>
                </div>
              </div>
            </div>

            <div class="docs-beach-carousel-slide">
              <div class="docs-beach-portrait-frame">
                <div class="docs-beach-portrait-screen">
                  <iframe src="https://www.youtube.com/embed/_28bv0vq_OY" title="Doc's Beach Vernal Utah" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen scrolling="no"></iframe>
                </div>
              </div>
            </div>

            <div class="docs-beach-carousel-slide">
              <div class="docs-beach-portrait-frame">
                <div class="docs-beach-portrait-screen">
                  <iframe src="https://www.youtube.com/embed/guQRW68vlIQ" title="Doc's Beach Vernal Utah" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen scrolling="no"></iframe>
                </div>
              </div>
            </div>

            <div class="docs-beach-carousel-slide">
              <div class="docs-beach-portrait-frame">
                <div class="docs-beach-portrait-screen">
                  <iframe src="https://www.youtube.com/embed/IfIEozbAWXc" title="Doc's Beach Vernal Utah" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen scrolling="no"></iframe>
                </div>
              </div>
            </div>

            <div class="docs-beach-carousel-slide">
              <div class="docs-beach-portrait-frame">
                <div class="docs-beach-portrait-screen">
                  <iframe src="https://www.youtube.com/embed/c0Ikw96DuUk" title="Doc's Beach Vernal Utah" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen scrolling="no"></iframe>
                </div>
              </div>
            </div>

            <div class="docs-beach-carousel-slide">
              <div class="docs-beach-portrait-frame">
                <div class="docs-beach-portrait-screen">
                  <iframe src="https://www.youtube.com/embed/Qpqn3COiM-c" title="Doc's Beach Vernal Utah" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen scrolling="no"></iframe>
                </div>
              </div>
            </div>

            <div class="docs-beach-carousel-slide">
              <div class="docs-beach-portrait-frame">
                <div class="docs-beach-portrait-screen">
                  <iframe src="https://www.youtube.com/embed/vEX-XavayK8" title="Doc's Beach Vernal Utah" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen scrolling="no"></iframe>
                </div>
              </div>
            </div>

            <div class="docs-beach-carousel-slide">
              <div class="docs-beach-portrait-frame">
                <div class="docs-beach-portrait-screen">
                  <iframe src="https://www.youtube.com/embed/LsqbwVkwrbw" title="Doc's Beach Vernal Utah" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen scrolling="no"></iframe>
                </div>
              </div>
            </div>

            <div class="docs-beach-carousel-slide">
              <div class="docs-beach-portrait-frame">
                <div class="docs-beach-portrait-screen">
                  <iframe src="https://www.youtube.com/embed/YQVFzCTh4m4" title="Doc's Beach Vernal Utah" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen scrolling="no"></iframe>
                </div>
              </div>
            </div>

            <div class="docs-beach-carousel-slide">
              <div class="docs-beach-portrait-frame">
                <div class="docs-beach-portrait-screen">
                  <iframe src="https://www.youtube.com/embed/BHOABkrNnnE" title="Doc's Beach Vernal Utah" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen scrolling="no"></iframe>
                </div>
              </div>
            </div>

            <div class="docs-beach-carousel-slide">
              <div class="docs-beach-portrait-frame">
                <div class="docs-beach-portrait-screen">
                  <iframe src="https://www.youtube.com/embed/tC9hDT--vNE" title="Doc's Beach Vernal Utah" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen scrolling="no"></iframe>
                </div>
              </div>
            </div>

            <div class="docs-beach-carousel-slide">
              <div class="docs-beach-portrait-frame">
                <div class="docs-beach-portrait-screen">
                  <iframe src="https://www.youtube.com/embed/_GEkyZvT1NY" title="Doc's Beach Vernal Utah" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen scrolling="no"></iframe>
                </div>
              </div>
            </div>

            <div class="docs-beach-carousel-slide">
              <div class="docs-beach-portrait-frame">
                <div class="docs-beach-portrait-screen">
                  <iframe src="https://www.youtube.com/embed/9o5CePPqr9k" title="Doc's Beach Vernal Utah" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen scrolling="no"></iframe>
                </div>
              </div>
            </div>

            <div class="docs-beach-carousel-slide">
              <div class="docs-beach-portrait-frame">
                <div class="docs-beach-portrait-screen">
                  <iframe src="https://www.youtube.com/embed/AkBqq7C6XhM" title="Doc's Beach Vernal Utah" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen scrolling="no"></iframe>
                </div>
              </div>
            </div>

            <div class="docs-beach-carousel-slide">
              <div class="docs-beach-portrait-frame">
                <div class="docs-beach-portrait-screen">
                  <iframe src="https://www.youtube.com/embed/0j4NYKi5rl4" title="Doc's Beach Vernal Utah" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen scrolling="no"></iframe>
                </div>
              </div>
            </div>

            <div class="docs-beach-carousel-slide">
              <div class="docs-beach-portrait-frame">
                <div class="docs-beach-portrait-screen">
                  <iframe src="https://www.youtube.com/embed/oXR3mkEPxQc" title="Doc's Beach Vernal Utah" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen scrolling="no"></iframe>
                </div>
              </div>
            </div>

            <div class="docs-beach-carousel-slide">
              <div class="docs-beach-portrait-frame">
                <div class="docs-beach-portrait-screen">
                  <iframe src="https://www.youtube.com/embed/ugR79DX2CHE" title="Doc's Beach Vernal Utah" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen scrolling="no"></iframe>
                </div>
              </div>
            </div>


          </div>
        </div>

        <button class="docs-beach-carousel-btn next" aria-label="Video successivo">&#8250;</button>
      </div>

      <div class="docs-beach-carousel-dots">
        <button class="docs-beach-dot active" data-index="0"></button>
        <button class="docs-beach-dot" data-index="1"></button>
        <button class="docs-beach-dot" data-index="2"></button>
        <button class="docs-beach-dot" data-index="3"></button>
        <button class="docs-beach-dot" data-index="4"></button>
        <button class="docs-beach-dot" data-index="5"></button>
        <button class="docs-beach-dot" data-index="6"></button>
        <button class="docs-beach-dot" data-index="7"></button>
        <button class="docs-beach-dot" data-index="8"></button>
        <button class="docs-beach-dot" data-index="9"></button>
        <button class="docs-beach-dot" data-index="10"></button>
        <button class="docs-beach-dot" data-index="11"></button>
        <button class="docs-beach-dot" data-index="12"></button>
        <button class="docs-beach-dot" data-index="13"></button>
        <button class="docs-beach-dot" data-index="14"></button>
        <button class="docs-beach-dot" data-index="15"></button>
        <button class="docs-beach-dot" data-index="16"></button>
        <button class="docs-beach-dot" data-index="17"></button>
        <button class="docs-beach-dot" data-index="18"></button>
        <button class="docs-beach-dot" data-index="19"></button>
        <button class="docs-beach-dot" data-index="20"></button>
      </div>
    </div>

    <!-- INTRO + BARRA LATERALE -->
    <div class="trail-intro">
      <div class="trail-intro-text">
        <h2>Cinque Sentieri Leggendari nella Terra dei Dinosauri dello Utah</h2>
        <div class="section-divider"></div>
        <p>Adventure Tours Vernal offre cinque tour guidati in UTV attraverso alcuni dei paesaggi più spettacolari del backcountry dello Uintah Basin. Che si cerchino viste mozzafiato sui canyon, antichi petroglifi o incontri con la fauna selvatica, c'è un sentiero adatto a ogni avventuriero.</p>
        <p>Tutti i tour sono guidati da Dave e Trudy Wilson a bordo di UTV Kawasaki KRX 1000 side-by-side — costruiti per comfort, potenza e sicurezza. Dalle sabbie fluviali di Doc's Beach ai panorami di cresta di Asphalt Ridge, ogni tour è un'esperienza che non dimenticherà.</p>
        <p>Tenga d'occhio aquile reali, aquile calve, gufi, falchi pescatori, falchi, cervi e persino puma lungo il percorso — il backcountry di Vernal è pieno di fauna selvatica a ogni curva.</p>
      </div>

      <div class="trail-highlights-box">
        <h3>Punti Salienti del Sentiero</h3>
        <ul class="highlight-list">
          <li><span class="hl-icon">&#129413;</span><span>Aquile Reali e Calve</span></li>
          <li><span class="hl-icon">&#129417;</span><span>Gufi, Falchi Pescatori e Falchi</span></li>
          <li><span class="hl-icon">&#129420;</span><span>Cervi e Puma</span></li>
          <li><span class="hl-icon">&#129704;</span><span>Antichi Petroglifi</span></li>
          <li><span class="hl-icon">&#127956;</span><span>Punti Panoramici</span></li>
          <li><span class="hl-icon">&#127754;</span><span>Vista sul Green River</span></li>
          <li><span class="hl-icon">&#128106;</span><span>Adatto alle Famiglie</span></li>
        </ul>
        <a href="/it/booking/" class="tour-book-btn" style="display:block;text-align:center;margin-bottom:12px;">Prenoti un Sentiero</a>
        <a href="tel:435-219-9447" class="call-sidebar-btn">&#128222; (435) 219-9447</a>
      </div>
    </div>



    <!-- VIDEO PROMOZIONALE — CORNICE 3D -->
    <div class="promo-video-section">
      <h2>5 Sentieri. 5 Avventure. 1 Luogo Straordinario.</h2>
      <p>Scopra un assaggio di tutto ciò che il backcountry di Vernal ha da offrire.</p>
      <div class="promo-video-3d-wrap">
        <div class="promo-video-frame">
          <div class="promo-video-screen">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/ugR79DX2CHE?si=8geOb3H2XYk8Q-js" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
        </div>
      </div>
    </div>

   <!-- GALLERIA FOTOGRAFICA -->
    <div class="photo-gallery-section">
      <h2>Uno sguardo al terreno, al paesaggio e all'avventura che La attendono sui sentieri.</h2>
        <div class="photo-grid">
        <div class="photo-grid-item featured">
          <img src="/images/Docs%20Beach.webp" alt="Tour guidato in UTV a Doc's Beach — Adventure Tours Vernal">
        </div>
        <div class="photo-grid-item">
          <img src="/images/Docs Beach 1.webp" alt="Sentiero UTV fuoristrada a Doc's Beach, Vernal Utah">
        </div>

      </div>
    </div>

    <!-- CHIAMATA ALL'AZIONE -->
    <div class="policy-cta trail-cta" style="position:relative; overflow:hidden;">
  <div class="cta-video-bg">
    <iframe
      src="https://www.youtube.com/embed/U4RogvmCLFU?autoplay=1&mute=1&loop=1&playlist=U4RogvmCLFU&controls=0&showinfo=0&rel=0&playsinline=1"
      frameborder="0"
      allow="autoplay; encrypted-media"
      allowfullscreen>
    </iframe>
  </div>
  <div class="cta-video-overlay"></div>
      <span class="trail-cta-watermark">L'AVVENTURA LA ASPETTA</span>
      <h3>Pronto a Percorrere i Sentieri?</h3>
      <p>Cinque destinazioni leggendarie. Prenoti il Suo tour guidato oggi stesso e lasci che Dave e Trudy Wilson Le mostrino di cosa si tratta il backcountry di Vernal.</p>
      <div class="cta-buttons">
        <a href="/it/booking/" class="cta-button primary">Prenoti la Sua Avventura</a>
        <a href="tel:435-219-9447" class="cta-button secondary">&#128222; (435) 219-9447</a>
      </div>
    </div>

    <!-- MAPPA DI ORIENTAMENTO DEI SISTEMI DI SENTIERI -->
    <p style="max-width:820px;margin:2rem auto 0;padding:0 1rem;text-align:center;line-height:1.7;">Ogni tour di Adventure Tours Vernal parte da un unico punto di ritrovo in città e si dirige verso uno dei cinque sistemi di sentieri distinti, ciascuno con il proprio terreno e carattere. Lo schema qui sotto mostra come si relazionano i cinque sistemi prima di esplorarli uno per uno.</p>

    <figure style="margin:2.5rem auto;max-width:820px;text-align:center;">
      <img src="/images/maps/vernal-utv-trail-systems.svg" alt="Diagramma schematico dei cinque sistemi di sentieri UTV di Adventure Tours Vernal — Doc's Beach, Moonshine Arch, Ashley Gorge, Asphalt Ridge e Outlaw Trail — disposti come raggi etichettati attorno a un punto centrale di ritrovo dei tour a Vernal, Utah. Mostra solo i sistemi di sentieri e il loro punto di partenza comune, non è disegnato in scala e non mostra percorsi, distanze, direzioni o punti di inizio dei sentieri." width="1600" height="1200" loading="lazy" decoding="async" />
      <figcaption style="margin-top:0.75rem;font-size:0.9rem;line-height:1.6;color:#6E655C;">Cinque sistemi di sentieri distinti, un solo punto di ritrovo a Vernal. Diagramma schematico — non in scala, e non mostra percorsi, distanze o punti di inizio dei sentieri.</figcaption>
    </figure>

    <!-- TUTTI I SENTIERI -->
<div class="other-trails-section">
  <h2>Esplori Tutti i Sentieri</h2>
  <div class="other-trails-grid">

    <div class="other-trail-card">
      <div class="other-trail-img" style="background-image:url('/images/48.webp');"></div>
      <div class="other-trail-info"><h3>Doc's Beach</h3><span>Tutti i Livelli</span></div>
    </div>

    <div class="other-trail-card">
      <div class="other-trail-img" style="background-image:url('/images/42a.webp');"></div>
      <div class="other-trail-info"><h3>Moonshine Arch</h3><span>Panoramico e Storico</span></div>
    </div>

    <div class="other-trail-card">
      <div class="other-trail-img" style="background-image:url('/images/50a.webp');"></div>
      <div class="other-trail-info"><h3>Ashley Gorge</h3><span>Avventura nel Canyon</span></div>
    </div>

    <div class="other-trail-card">
      <div class="other-trail-img" style="background-image:url('/images/51a.webp');"></div>
      <div class="other-trail-info"><h3>Outlaw Trail</h3><span>Percorso Storico</span></div>
    </div>

    <div class="other-trail-card">
      <div class="other-trail-img" style="background-image:url('/images/52a.webp');"></div>
      <div class="other-trail-info"><h3>Asphalt Ridge</h3><span>Vedute Panoramiche</span></div>
    </div>

  </div>
</div>


  </div><!-- end .trail-main -->

  <div class="mobile-sticky-cta">
    <button onclick="location.href='/it/booking/'">Prenoti la Sua Avventura Ora</button>
  </div>

  <script is:inline>
    // Doc's Beach Carousel
    (function() {
      var track = document.querySelector('.docs-beach-carousel-track');
      var slides = document.querySelectorAll('.docs-beach-carousel-slide');
      var dots = document.querySelectorAll('.docs-beach-dot');
      var prevBtn = document.querySelector('.docs-beach-carousel-btn.prev');
      var nextBtn = document.querySelector('.docs-beach-carousel-btn.next');
      var current = 0;
      var total = slides.length;

      function goTo(index) {
        current = (index + total) % total;
        track.style.transform = 'translateX(-' + (current * 100) + '%)';
        dots.forEach(function(d, i) {
          d.classList.toggle('active', i === current);
        });
      }

      prevBtn.addEventListener('click', function() { goTo(current - 1); });
      nextBtn.addEventListener('click', function() { goTo(current + 1); });
      dots.forEach(function(dot) {
        dot.addEventListener('click', function() { goTo(parseInt(this.dataset.index)); });
      });
    })();
  </script>
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
