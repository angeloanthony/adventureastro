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

// Portuguese variant added P7-P6 (informal "tu" register, mirrors FR
// structure 1:1 — translated from English, not from French). "Dinosaur
// Country" -> "Terra dos Dinossauros" per the locked glossary's
// fixed-phrase entry. YouTube iframe `title` attributes ("Doc's Beach
// Vernal Utah") are proper nouns only — kept verbatim.
const PT = `

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
        <a href="/pt/">Início</a>
        <span>&#8250;</span>
        <span class="current">Trilhos</span>
      </nav>
      <div class="status-badge" style="animation:none;">Guia de Trilhos</div>
      <h1 class="trail-hero-title">Os Nossos Trilhos</h1>
      <div style="margin-top:14px;"><span style="display:inline-flex;align-items:center;gap:8px;padding:7px 15px;border:1px solid rgba(255,255,255,0.5);border-radius:999px;background:rgba(0,0,0,0.35);font-size:0.95rem;color:#fff;"><span aria-hidden="true" style="color:#f5c451;letter-spacing:1px;">★★★★★</span> <span><strong>${SITE.rating.value}</strong> &middot; ${SITE.rating.count} avaliações do Google</span></span></div>
      <div class="trail-hero-meta">
        <div class="trail-hero-meta-item"><span>&#128205;</span><span>Vernal, Utah</span></div>
        <div class="trail-hero-meta-item"><span>&#128106;</span><span>Para Todas as Idades</span></div>
        <div class="trail-hero-meta-item"><span>&#129413;</span><span>Fauna Selvagem e Petróglifos</span></div>
      </div>
    </div>
  </div>

  <!-- PRINCIPAL -->
  <div class="trail-main">

      <!-- CARROSSEL DOC'S BEACH -->
    <div class="docs-beach-section">
      <h2>Doc's Beach Vernal Utah</h2>
      <p>Imagens reais do backcountry de Vernal — sem filtros.</p>

      <div class="docs-beach-carousel">
        <button class="docs-beach-carousel-btn prev" aria-label="Vídeo anterior">&#8249;</button>

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

        <button class="docs-beach-carousel-btn next" aria-label="Vídeo seguinte">&#8250;</button>
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

    <!-- INTRO + BARRA LATERAL -->
    <div class="trail-intro">
      <div class="trail-intro-text">
        <h2>Cinco Trilhos Lendários na Terra dos Dinossauros de Utah</h2>
        <div class="section-divider"></div>
        <p>A Adventure Tours Vernal oferece cinco tours guiados de trilhos UTV através de alguns dos backcountry mais espetaculares da Uintah Basin. Quer estejas à procura de vistas de canyon deslumbrantes, petróglifos antigos ou encontros com a fauna selvagem, há um trilho para cada aventureiro.</p>
        <p>Todos os tours são guiados pelo Dave e pela Trudy Wilson a bordo de Kawasaki KRX 1000 side-by-side — construídos para conforto, potência e segurança. Desde as areias ribeirinhas de Doc's Beach até aos panoramas do topo da crista de Asphalt Ridge, cada passeio é uma experiência que não vais esquecer.</p>
        <p>Fica atento a águias-reais, águias-de-cabeça-branca, corujas, águias-pesqueiras, falcões, veados e até pumas pelo caminho — o backcountry de Vernal está repleto de fauna selvagem em cada curva.</p>
      </div>

      <div class="trail-highlights-box">
        <h3>Destaques do Trilho</h3>
        <ul class="highlight-list">
          <li><span class="hl-icon">&#129413;</span><span>Águias-Reais e de Cabeça Branca</span></li>
          <li><span class="hl-icon">&#129417;</span><span>Corujas, Águias-Pesqueiras e Falcões</span></li>
          <li><span class="hl-icon">&#129420;</span><span>Veados e Pumas</span></li>
          <li><span class="hl-icon">&#129704;</span><span>Petróglifos Antigos</span></li>
          <li><span class="hl-icon">&#127956;</span><span>Miradouros Panorâmicos</span></li>
          <li><span class="hl-icon">&#127754;</span><span>Vistas do Green River</span></li>
          <li><span class="hl-icon">&#128106;</span><span>Ideal para Famílias</span></li>
        </ul>
        <a href="/pt/booking/" class="tour-book-btn" style="display:block;text-align:center;margin-bottom:12px;">Reserva um Trilho</a>
        <a href="tel:435-219-9447" class="call-sidebar-btn">&#128222; (435) 219-9447</a>
      </div>
    </div>



    <!-- VÍDEO PROMOCIONAL — MOLDURA 3D -->
    <div class="promo-video-section">
      <h2>5 Trilhos. 5 Aventuras. 1 Lugar Extraordinário.</h2>
      <p>Descobre tudo o que o backcountry de Vernal tem para oferecer.</p>
      <div class="promo-video-3d-wrap">
        <div class="promo-video-frame">
          <div class="promo-video-screen">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/ugR79DX2CHE?si=8geOb3H2XYk8Q-js" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
        </div>
      </div>
    </div>

   <!-- GALERIA DE FOTOS -->
    <div class="photo-gallery-section">
      <h2>Um vislumbre do terreno, da paisagem e da aventura que te esperam nos trilhos.</h2>
        <div class="photo-grid">
        <div class="photo-grid-item featured">
          <img src="/images/Docs%20Beach.webp" alt="Tour guiado de UTV em Doc's Beach — Adventure Tours Vernal">
        </div>
        <div class="photo-grid-item">
          <img src="/images/Docs Beach 1.webp" alt="Trilho de UTV todo-o-terreno em Doc's Beach, Vernal Utah">
        </div>

      </div>
    </div>

    <!-- CHAMADA PARA AÇÃO -->
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
      <span class="trail-cta-watermark">A AVENTURA ESPERA-TE</span>
      <h3>Pronto para Percorrer os Trilhos?</h3>
      <p>Cinco destinos lendários. Reserva o teu tour guiado hoje e deixa que o Dave e a Trudy Wilson te mostrem do que se trata o backcountry de Vernal.</p>
      <div class="cta-buttons">
        <a href="/pt/booking/" class="cta-button primary">Reserva a Tua Aventura</a>
        <a href="tel:435-219-9447" class="cta-button secondary">&#128222; (435) 219-9447</a>
      </div>
    </div>

    <!-- MAPA DE ORIENTAÇÃO DOS SISTEMAS DE TRILHOS -->
    <p style="max-width:820px;margin:2rem auto 0;padding:0 1rem;text-align:center;line-height:1.7;">Cada passeio da Adventure Tours Vernal começa num único ponto de encontro na cidade e segue para um de cinco sistemas de trilhos distintos, cada um com o seu próprio terreno e carácter. O diagrama abaixo mostra como os cinco se relacionam antes de os explorares um a um.</p>

    <figure style="margin:2.5rem auto;max-width:820px;text-align:center;">
      <img src="/images/maps/vernal-utv-trail-systems.svg" alt="Diagrama esquemático dos cinco sistemas de trilhos de UTV da Adventure Tours Vernal — Doc's Beach, Moonshine Arch, Ashley Gorge, Asphalt Ridge e Outlaw Trail — dispostos como raios etiquetados à volta de um ponto central de encontro dos tours em Vernal, Utah. Mostra apenas os sistemas de trilhos e o seu ponto de partida comum, não está desenhado à escala e não mostra rotas, distâncias, direções ou localizações de início de trilho." width="1600" height="1200" loading="lazy" decoding="async" />
      <figcaption style="margin-top:0.75rem;font-size:0.9rem;line-height:1.6;color:#6E655C;">Cinco sistemas de trilhos distintos, um único ponto de encontro em Vernal. Diagrama esquemático — sem escala, e não mostra rotas, distâncias ou localizações de início de trilho.</figcaption>
    </figure>

    <!-- TODOS OS TRILHOS -->
<div class="other-trails-section">
  <h2>Explora Todos os Trilhos</h2>
  <div class="other-trails-grid">

    <div class="other-trail-card">
      <div class="other-trail-img" style="background-image:url('/images/48.webp');"></div>
      <div class="other-trail-info"><h3>Doc's Beach</h3><span>Todos os Níveis</span></div>
    </div>

    <div class="other-trail-card">
      <div class="other-trail-img" style="background-image:url('/images/42a.webp');"></div>
      <div class="other-trail-info"><h3>Moonshine Arch</h3><span>Panorâmico e Histórico</span></div>
    </div>

    <div class="other-trail-card">
      <div class="other-trail-img" style="background-image:url('/images/50a.webp');"></div>
      <div class="other-trail-info"><h3>Ashley Gorge</h3><span>Aventura no Canyon</span></div>
    </div>

    <div class="other-trail-card">
      <div class="other-trail-img" style="background-image:url('/images/51a.webp');"></div>
      <div class="other-trail-info"><h3>Outlaw Trail</h3><span>Rota Histórica</span></div>
    </div>

    <div class="other-trail-card">
      <div class="other-trail-img" style="background-image:url('/images/52a.webp');"></div>
      <div class="other-trail-info"><h3>Asphalt Ridge</h3><span>Vistas Panorâmicas</span></div>
    </div>

  </div>
</div>


  </div><!-- end .trail-main -->

  <div class="mobile-sticky-cta">
    <button onclick="location.href='/pt/booking/'">Reserva a Tua Aventura Agora</button>
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

const FR = `

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
        <a href="/fr/">Accueil</a>
        <span>&#8250;</span>
        <span class="current">Sentiers</span>
      </nav>
      <div class="status-badge" style="animation:none;">Guide des Sentiers</div>
      <h1 class="trail-hero-title">Nos Sentiers</h1>
      <div style="margin-top:14px;"><span style="display:inline-flex;align-items:center;gap:8px;padding:7px 15px;border:1px solid rgba(255,255,255,0.5);border-radius:999px;background:rgba(0,0,0,0.35);font-size:0.95rem;color:#fff;"><span aria-hidden="true" style="color:#f5c451;letter-spacing:1px;">★★★★★</span> <span><strong>${SITE.rating.value}</strong> &middot; ${SITE.rating.count} avis Google</span></span></div>
      <div class="trail-hero-meta">
        <div class="trail-hero-meta-item"><span>&#128205;</span><span>Vernal, Utah</span></div>
        <div class="trail-hero-meta-item"><span>&#128106;</span><span>Pour Tous les Âges</span></div>
        <div class="trail-hero-meta-item"><span>&#129413;</span><span>Faune et Pétroglyphes</span></div>
      </div>
    </div>
  </div>

  <!-- PRINCIPAL -->
  <div class="trail-main">

      <!-- CAROUSEL DOC'S BEACH -->
    <div class="docs-beach-section">
      <h2>Doc's Beach Vernal Utah</h2>
      <p>Des images authentiques du backcountry de Vernal — sans filtre.</p>

      <div class="docs-beach-carousel">
        <button class="docs-beach-carousel-btn prev" aria-label="Vidéo précédente">&#8249;</button>

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

        <button class="docs-beach-carousel-btn next" aria-label="Vidéo suivante">&#8250;</button>
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

    <!-- INTRO + BARRE LATÉRALE -->
    <div class="trail-intro">
      <div class="trail-intro-text">
        <h2>Cinq Sentiers Légendaires en Terre des Dinosaures de l'Utah</h2>
        <div class="section-divider"></div>
        <p>Adventure Tours Vernal propose cinq tours guidés en UTV à travers l'un des backcountry les plus spectaculaires de l'Uintah Basin. Que vous recherchiez de superbes vues sur les canyons, d'anciens pétroglyphes ou des rencontres avec la faune, il y a un sentier pour chaque aventurier.</p>
        <p>Tous les tours sont guidés par Dave et Trudy Wilson à bord de side-by-side Kawasaki KRX 1000 — conçus pour le confort, la puissance et la sécurité. Des sables riverains de Doc's Beach aux panoramas de crête d'Asphalt Ridge, chaque sortie est une expérience que vous n'oublierez pas.</p>
        <p>Gardez l'œil ouvert pour les aigles royaux, les pygargues à tête blanche, les hiboux, les balbuzards, les faucons, les cerfs et même les pumas en chemin — le backcountry de Vernal grouille de faune à chaque tournant.</p>
      </div>

      <div class="trail-highlights-box">
        <h3>Points Forts du Sentier</h3>
        <ul class="highlight-list">
          <li><span class="hl-icon">&#129413;</span><span>Aigles Royaux et Pygargues à Tête Blanche</span></li>
          <li><span class="hl-icon">&#129417;</span><span>Hiboux, Balbuzards et Faucons</span></li>
          <li><span class="hl-icon">&#129420;</span><span>Cerfs et Pumas</span></li>
          <li><span class="hl-icon">&#129704;</span><span>Pétroglyphes Anciens</span></li>
          <li><span class="hl-icon">&#127956;</span><span>Points de Vue Panoramiques</span></li>
          <li><span class="hl-icon">&#127754;</span><span>Vue sur le Green River</span></li>
          <li><span class="hl-icon">&#128106;</span><span>Idéal pour les Familles</span></li>
        </ul>
        <a href="/fr/booking/" class="tour-book-btn" style="display:block;text-align:center;margin-bottom:12px;">Réserver un Sentier</a>
        <a href="tel:435-219-9447" class="call-sidebar-btn">&#128222; (435) 219-9447</a>
      </div>
    </div>



    <!-- VIDÉO PROMOTIONNELLE — CADRE 3D -->
    <div class="promo-video-section">
      <h2>5 Sentiers. 5 Aventures. 1 Lieu Extraordinaire.</h2>
      <p>Découvrez un aperçu de tout ce que le backcountry de Vernal a à offrir.</p>
      <div class="promo-video-3d-wrap">
        <div class="promo-video-frame">
          <div class="promo-video-screen">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/ugR79DX2CHE?si=8geOb3H2XYk8Q-js" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
        </div>
      </div>
    </div>

   <!-- GALERIE PHOTO -->
    <div class="photo-gallery-section">
      <h2>Un aperçu du terrain, du paysage et de l'aventure qui vous attendent sur les sentiers.</h2>
        <div class="photo-grid">
        <div class="photo-grid-item featured">
          <img src="/images/Docs%20Beach.webp" alt="Tour guidé en UTV à Doc's Beach — Adventure Tours Vernal">
        </div>
        <div class="photo-grid-item">
          <img src="/images/Docs Beach 1.webp" alt="Sentier UTV hors-piste à Doc's Beach, Vernal Utah">
        </div>

      </div>
    </div>

    <!-- APPEL À L'ACTION -->
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
      <span class="trail-cta-watermark">L'AVENTURE VOUS ATTEND</span>
      <h3>Prêt à Prendre les Sentiers&nbsp;?</h3>
      <p>Cinq destinations légendaires. Réservez votre tour guidé dès aujourd'hui et laissez Dave et Trudy Wilson vous montrer ce qu'est le backcountry de Vernal.</p>
      <div class="cta-buttons">
        <a href="/fr/booking/" class="cta-button primary">Réservez Votre Aventure</a>
        <a href="tel:435-219-9447" class="cta-button secondary">&#128222; (435) 219-9447</a>
      </div>
    </div>

    <!-- CARTE D'ORIENTATION DES SYSTÈMES DE SENTIERS -->
    <p style="max-width:820px;margin:2rem auto 0;padding:0 1rem;text-align:center;line-height:1.7;">Chaque sortie Adventure Tours Vernal débute à un point de départ unique en ville et se dirige vers l'un des cinq systèmes de sentiers distincts, chacun avec son propre terrain et son propre caractère. Le schéma ci-dessous montre comment les cinq se relient avant que vous ne les exploriez un par un.</p>

    <figure style="margin:2.5rem auto;max-width:820px;text-align:center;">
      <img src="/images/maps/vernal-utv-trail-systems.svg" alt="Schéma des cinq systèmes de sentiers en UTV d'Adventure Tours Vernal — Doc's Beach, Moonshine Arch, Ashley Gorge, Asphalt Ridge et Outlaw Trail — disposés en rayons étiquetés autour d'un point de départ central des tours à Vernal, Utah. Il montre uniquement les systèmes de sentiers et leur point de départ commun, n'est pas dessiné à l'échelle et ne montre aucun itinéraire, distance, direction ou emplacement de départ de sentier." width="1600" height="1200" loading="lazy" decoding="async" />
      <figcaption style="margin-top:0.75rem;font-size:0.9rem;line-height:1.6;color:#6E655C;">Cinq systèmes de sentiers distincts, un seul point de départ à Vernal. Schéma — non à l'échelle, et ne montre aucun itinéraire, distance ou emplacement de départ de sentier.</figcaption>
    </figure>

    <!-- TOUS LES SENTIERS -->
<div class="other-trails-section">
  <h2>Explorez Tous les Sentiers</h2>
  <div class="other-trails-grid">

    <div class="other-trail-card">
      <div class="other-trail-img" style="background-image:url('/images/48.webp');"></div>
      <div class="other-trail-info"><h3>Doc's Beach</h3><span>Tous Niveaux</span></div>
    </div>

    <div class="other-trail-card">
      <div class="other-trail-img" style="background-image:url('/images/42a.webp');"></div>
      <div class="other-trail-info"><h3>Moonshine Arch</h3><span>Pittoresque et Historique</span></div>
    </div>

    <div class="other-trail-card">
      <div class="other-trail-img" style="background-image:url('/images/50a.webp');"></div>
      <div class="other-trail-info"><h3>Ashley Gorge</h3><span>Aventure en Canyon</span></div>
    </div>

    <div class="other-trail-card">
      <div class="other-trail-img" style="background-image:url('/images/51a.webp');"></div>
      <div class="other-trail-info"><h3>Outlaw Trail</h3><span>Itinéraire Historique</span></div>
    </div>

    <div class="other-trail-card">
      <div class="other-trail-img" style="background-image:url('/images/52a.webp');"></div>
      <div class="other-trail-info"><h3>Asphalt Ridge</h3><span>Vues Panoramiques</span></div>
    </div>

  </div>
</div>


  </div><!-- end .trail-main -->

  <div class="mobile-sticky-cta">
    <button onclick="location.href='/fr/booking/'">Réservez Votre Aventure Maintenant</button>
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

// German variant added P9A (informal "du" register, mirrors PT structure
// 1:1 — PT is the closer register match). "Dinosaur Country" -> "Land der
// Dinosaurier" per the locked glossary's fixed-phrase entry. "trail" is
// split by activity here: "Piste" throughout (UTV context). backcountry
// kept as the English loanword "das Backcountry". YouTube iframe `title`
// attributes ("Doc's Beach Vernal Utah") are proper nouns only — kept
// verbatim.
const DE = `

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
        <a href="/de/">Start</a>
        <span>&#8250;</span>
        <span class="current">Pisten</span>
      </nav>
      <div class="status-badge" style="animation:none;">Pisten-Guide</div>
      <h1 class="trail-hero-title">Unsere Pisten</h1>
      <div style="margin-top:14px;"><span style="display:inline-flex;align-items:center;gap:8px;padding:7px 15px;border:1px solid rgba(255,255,255,0.5);border-radius:999px;background:rgba(0,0,0,0.35);font-size:0.95rem;color:#fff;"><span aria-hidden="true" style="color:#f5c451;letter-spacing:1px;">★★★★★</span> <span><strong>${SITE.rating.value}</strong> &middot; ${SITE.rating.count} Google-Bewertungen</span></span></div>
      <div class="trail-hero-meta">
        <div class="trail-hero-meta-item"><span>&#128205;</span><span>Vernal, Utah</span></div>
        <div class="trail-hero-meta-item"><span>&#128106;</span><span>Alle Altersgruppen Willkommen</span></div>
        <div class="trail-hero-meta-item"><span>&#129413;</span><span>Wildtiere &amp; Petroglyphen</span></div>
      </div>
    </div>
  </div>

  <!-- HAUPTBEREICH -->
  <div class="trail-main">

      <!-- DOC'S BEACH KARUSSELL -->
    <div class="docs-beach-section">
      <h2>Doc's Beach Vernal Utah</h2>
      <p>Echte Fahrten aus Vernals Backcountry — ganz ohne Filter.</p>

      <div class="docs-beach-carousel">
        <button class="docs-beach-carousel-btn prev" aria-label="Vorheriges Video">&#8249;</button>

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

        <button class="docs-beach-carousel-btn next" aria-label="Nächstes Video">&#8250;</button>
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

    <!-- INTRO + SEITENLEISTE -->
    <div class="trail-intro">
      <div class="trail-intro-text">
        <h2>Fünf Legendäre Pisten im Land der Dinosaurier in Utah</h2>
        <div class="section-divider"></div>
        <p>Adventure Tours Vernal bietet fünf geführte UTV-Pistentouren durch einige der spektakulärsten Backcountry-Gebiete im Uintah Basin. Ob du atemberaubende Canyon-Ausblicke, uralte Petroglyphen oder Begegnungen mit Wildtieren suchst — hier findet jeder Abenteurer die passende Piste.</p>
        <p>Alle Touren werden von Dave und Trudy Wilson auf Kawasaki KRX 1000 Side-by-Sides geführt — gebaut für Komfort, Kraft und Sicherheit. Von den Flusssanden am Doc's Beach bis zu den Panoramen auf dem Bergkamm von Asphalt Ridge ist jede Fahrt ein Erlebnis, das du nicht vergessen wirst.</p>
        <p>Halte unterwegs Ausschau nach Steinadlern, Weißkopfseeadlern, Eulen, Fischadlern, Falken, Hirschen und sogar Pumas — Vernals Backcountry steckt an jeder Kurve voller Wildtiere.</p>
      </div>

      <div class="trail-highlights-box">
        <h3>Pisten-Highlights</h3>
        <ul class="highlight-list">
          <li><span class="hl-icon">&#129413;</span><span>Stein- &amp; Weißkopfseeadler</span></li>
          <li><span class="hl-icon">&#129417;</span><span>Eulen, Fischadler &amp; Falken</span></li>
          <li><span class="hl-icon">&#129420;</span><span>Hirsche &amp; Pumas</span></li>
          <li><span class="hl-icon">&#129704;</span><span>Uralte Petroglyphen</span></li>
          <li><span class="hl-icon">&#127956;</span><span>Aussichtspunkte</span></li>
          <li><span class="hl-icon">&#127754;</span><span>Ausblicke auf den Green River</span></li>
          <li><span class="hl-icon">&#128106;</span><span>Familienfreundlich</span></li>
        </ul>
        <a href="/de/booking/" class="tour-book-btn" style="display:block;text-align:center;margin-bottom:12px;">Piste Buchen</a>
        <a href="tel:435-219-9447" class="call-sidebar-btn">&#128222; (435) 219-9447</a>
      </div>
    </div>



    <!-- PROMO-VIDEO — 3D-RAHMEN -->
    <div class="promo-video-section">
      <h2>5 Pisten. 5 Abenteuer. 1 Außergewöhnlicher Ort.</h2>
      <p>Bekomme einen Vorgeschmack auf alles, was Vernals Backcountry zu bieten hat.</p>
      <div class="promo-video-3d-wrap">
        <div class="promo-video-frame">
          <div class="promo-video-screen">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/ugR79DX2CHE?si=8geOb3H2XYk8Q-js" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
        </div>
      </div>
    </div>

   <!-- FOTOGALERIE -->
    <div class="photo-gallery-section">
      <h2>Ein Einblick in das Gelände, die Landschaft und das Abenteuer, das auf den Pisten auf dich wartet.</h2>
        <div class="photo-grid">
        <div class="photo-grid-item featured">
          <img src="/images/Docs%20Beach.webp" alt="Geführte UTV-Tour am Doc's Beach — Adventure Tours Vernal">
        </div>
        <div class="photo-grid-item">
          <img src="/images/Docs Beach 1.webp" alt="Doc's Beach Offroad-UTV-Piste, Vernal Utah">
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
      <span class="trail-cta-watermark">DAS ABENTEUER WARTET</span>
      <h3>Bereit für die Pisten?</h3>
      <p>Fünf legendäre Ziele. Buche noch heute deine geführte Tour und lass dir von Dave und Trudy Wilson zeigen, was Vernals Backcountry ausmacht.</p>
      <div class="cta-buttons">
        <a href="/de/booking/" class="cta-button primary">Buche dein Abenteuer</a>
        <a href="tel:435-219-9447" class="cta-button secondary">&#128222; (435) 219-9447</a>
      </div>
    </div>

    <!-- ORIENTIERUNGSKARTE DER PISTENSYSTEME -->
    <p style="max-width:820px;margin:2rem auto 0;padding:0 1rem;text-align:center;line-height:1.7;">Jede Tour von Adventure Tours Vernal startet an einem einzigen Treffpunkt in der Stadt und führt zu einem von fünf unterschiedlichen Pistensystemen, jedes mit eigenem Gelände und eigenem Charakter. Das Diagramm unten zeigt, wie die fünf zusammenhängen, bevor du sie einzeln erkundest.</p>

    <figure style="margin:2.5rem auto;max-width:820px;text-align:center;">
      <img src="/images/maps/vernal-utv-trail-systems.svg" alt="Schematisches Diagramm der fünf UTV-Pistensysteme von Adventure Tours Vernal — Doc's Beach, Moonshine Arch, Ashley Gorge, Asphalt Ridge und Outlaw Trail — dargestellt als beschriftete Speichen rund um einen zentralen Treffpunkt der Touren in Vernal, Utah. Es zeigt nur die Pistensysteme und ihren gemeinsamen Ausgangspunkt, ist nicht maßstabsgetreu und zeigt keine Routen, Entfernungen, Richtungen oder Ausgangspunkte der einzelnen Pisten." width="1600" height="1200" loading="lazy" decoding="async" />
      <figcaption style="margin-top:0.75rem;font-size:0.9rem;line-height:1.6;color:#6E655C;">Fünf unterschiedliche Pistensysteme, ein Treffpunkt in Vernal. Schematisches Diagramm — nicht maßstabsgetreu, ohne Routen, Entfernungen oder Ausgangspunkte der einzelnen Pisten.</figcaption>
    </figure>

    <!-- ALLE PISTEN -->
<div class="other-trails-section">
  <h2>Alle Pisten Entdecken</h2>
  <div class="other-trails-grid">

    <div class="other-trail-card">
      <div class="other-trail-img" style="background-image:url('/images/48.webp');"></div>
      <div class="other-trail-info"><h3>Doc's Beach</h3><span>Alle Erfahrungsstufen</span></div>
    </div>

    <div class="other-trail-card">
      <div class="other-trail-img" style="background-image:url('/images/42a.webp');"></div>
      <div class="other-trail-info"><h3>Moonshine Arch</h3><span>Landschaftlich &amp; Historisch</span></div>
    </div>

    <div class="other-trail-card">
      <div class="other-trail-img" style="background-image:url('/images/50a.webp');"></div>
      <div class="other-trail-info"><h3>Ashley Gorge</h3><span>Canyon-Abenteuer</span></div>
    </div>

    <div class="other-trail-card">
      <div class="other-trail-img" style="background-image:url('/images/51a.webp');"></div>
      <div class="other-trail-info"><h3>Outlaw Trail</h3><span>Historische Route</span></div>
    </div>

    <div class="other-trail-card">
      <div class="other-trail-img" style="background-image:url('/images/52a.webp');"></div>
      <div class="other-trail-info"><h3>Asphalt Ridge</h3><span>Panoramablicke</span></div>
    </div>

  </div>
</div>


  </div><!-- end .trail-main -->

  <div class="mobile-sticky-cta">
    <button onclick="location.href='/de/booking/'">Buche Jetzt Dein Abenteuer</button>
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
  if (locale === 'pt') return PT;
  if (locale === 'fr') return FR;
  if (locale === 'de') return DE;
  return bodyHtml;
}
