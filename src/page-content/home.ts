// home.ts — extracted homepage body content (P2C). English source of
// truth; rendered via set:html. Escaped ` and ${ inside inline <script>
// blocks are preserved verbatim; only ${SITE.*} interpolates. Spanish
// variant added P3A (formal "usted"). SCOPING DECISION: the ~90-image
// gallery carousel's alt text and captions are reused byte-identical
// (English) in the Spanish variant — high volume, low SEO priority
// versus the page's primary conversion copy, flagged as remaining work
// in the P3A delivery notes rather than rushed in this batch.
import { SITE } from "../config/site";
import { DEFAULT_LOCALE } from "../lib/i18n";

export const bodyHtml = `

  <!-- AI Summary Block -->
  <p class="page-summary" style="position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;" aria-hidden="false">
    Adventure Tours Vernal provides guided Kawasaki KRX 1000 side-by-side UTV tours in Vernal, Utah. Trails include Doc's Beach, Moonshine Arch, Ashley Gorge, Outlaw Trail, and Asphalt Ridge. Tours feature petroglyphs, rock art, and ancient ruins. $349 per machine for a 3-hour guided tour (up to 2 riders). $125 ride-along with a guide. 3-person minimum. Up to 12 guests per tour across 6 machines. Utah's top-rated UTV tour operator with a 5.0-star rating from 82 Google reviews. Open daily 7am–7pm. Call (435) 219-9447 to book.
  </p>

  <!-- Hero Section -->
  <div class="hero">
    <div class="trail-hero-video-bg">
  <iframe
    src="https://www.youtube.com/embed/BHOABkrNnnE?autoplay=1&mute=1&loop=1&playlist=BHOABkrNnnE&controls=0&showinfo=0&rel=0&playsinline=1"
    frameborder="0"
    allow="autoplay; encrypted-media"
    allowfullscreen>
  </iframe>
</div>
    <div class="hero-overlay"></div>

    <div class="hero-video-wrapper">
      <div class="video-frame-3d">
        <div class="video-frame-inner">
          <div class="video-play-overlay" id="videoPlayOverlay" onclick="playHeroVideo()">
            <img src="https://img.youtube.com/vi/eFfvKxkiyzU/maxresdefault.jpg" alt="Watch Adventure Tours Vernal in action — guided UTV tours in Vernal, Utah" class="video-thumbnail">
            <div class="play-overlay-content">
              <div class="play-icon-circle">▶</div>
              <span class="play-overlay-text">Click to watch the video</span>
            </div>
          </div>
          <div id="heroVideoContainer"></div>
        </div>
      </div>
    </div>

    <div class="hero-content">
      <h1 class="hero-title" style="font-size:clamp(1.8rem,4vw,3rem);font-weight:800;color:#fff;text-shadow:0 2px 12px rgba(0,0,0,0.5);margin-bottom:0.5rem;">
        Guided UTV Tours in Vernal, Utah
      </h1>
      <p class="hero-subtitle">Experience the thrill of Utah's backcountry with guided Kawasaki KRX 1000 Side-by-Side adventures</p>
      <div style="margin-top:14px;"><span style="display:inline-flex;align-items:center;gap:8px;padding:7px 15px;border:1px solid rgba(255,255,255,0.5);border-radius:999px;background:rgba(0,0,0,0.35);font-size:0.95rem;color:#fff;"><span aria-hidden="true" style="color:#f5c451;letter-spacing:1px;">★★★★★</span> <span><strong>${SITE.rating.value}</strong> &middot; ${SITE.rating.count} Google reviews</span></span></div>
    </div>

    <div class="scroll-indicator"><span></span></div>
  </div>

    <!-- PRICING CARDS -->
    <div class="pricing-section">
      <h2>Simple, Transparent Pricing</h2>
      <p>No hidden fees — just adventure. 3-person minimum per tour.</p>
      <div class="pricing-grid">
        <div class="pricing-card featured">
          <div class="pricing-label">Per Machine</div>
          <div class="pricing-title">1–2 Riders, 1 KRX 1000</div>
          <div class="pricing-amount">$349</div>
          <div class="pricing-per">per machine / 3-hour guided tour</div>
          <ul class="pricing-features">
            <li>Kawasaki KRX 1000 2-seater</li>
            <li>Up to 2 riders per machine</li>
            <li>Expert local guides (Dave &amp; Trudy)</li>
            <li>Choice of 5 trail systems</li>
            <li>FOX 2.5 PODIUM LSC shocks</li>
            <li>Full safety briefing &amp; gear</li>
          </ul>
          <a href="/booking/" class="tour-book-btn" style="display:block;text-align:center;text-decoration:none;">Book Now</a>
        </div>
        <div class="pricing-card">
          <div class="pricing-label">Ride-Along Add-On</div>
          <div class="pricing-title">Ride with Dave or Trudy</div>
          <div class="pricing-amount">$125</div>
          <div class="pricing-per">per passenger / 3-hour guided tour</div>
          <ul class="pricing-features">
            <li>Add a 3rd person to your group</li>
            <li>Rides as passenger with a guide</li>
            <li>Requires at least 1 machine rental</li>
            <li>2 ride-along spots available per tour</li>
            <li>All the adventure, no driving required</li>
          </ul>
          <a href="/booking/" class="tour-book-btn" style="display:block;text-align:center;text-decoration:none;">Book Now</a>
        </div>
        <div class="pricing-card">
          <div class="pricing-label">Groups</div>
          <div class="pricing-title">Up to 12 Guests</div>
          <div class="pricing-amount">Call</div>
          <div class="pricing-per">custom group pricing</div>
          <ul class="pricing-features">
            <li>Up to 6 machines available</li>
            <li>10 guests in 5 machines + 2 ride-alongs</li>
            <li>Dave &amp; Trudy guide together</li>
            <li>Ideal for families &amp; reunions</li>
            <li>$99/hr per machine for additional time</li>
          </ul>
          <a href="tel:435-219-9447" class="tour-book-btn" style="display:block;text-align:center;text-decoration:none;">📞 (435) 219-9447</a>
        </div>
      </div>
    </div>

      <!-- Single Book Button below all trails -->
      <div style="text-align:center;margin-top:50px;">
        <a href="/booking/" class="btn btn-primary" style="font-size:1.25rem;padding:22px 70px;">
          📅 Book Your Adventure
        </a>
        <p style="margin-top:14px;font-size:0.95rem;color:var(--charcoal);opacity:0.65;font-family:var(--font-body);">
          You'll choose your trail during booking — open daily 7am–7pm
        </p>
      </div>

    </div>
  </section>

  <!-- Why Vernal Section -->
  <section id="why-vernal">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Why Choose Vernal?</h2>
        <p class="section-subtitle">Discover what makes this corner of Utah an off-road paradise</p>
      </div>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-image" style="background:#000;">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/PoCN4Lo9Lkk?si=CMj5hK0r2l5GeKFM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style="display:block;width:100%;height:100%;border:0;"></iframe>
          </div>
          <div class="feature-content">
            <h3 class="feature-title">Dinosaur National Monument</h3>
            <p class="feature-description">Ride through prehistoric landscapes where ancient giants once roamed, with access to world-class fossil sites. <a href="/dinosaur-national-monument/" style="color:var(--burnt-orange);font-weight:600;">UTV tours near the monument →</a></p>
          </div>
        </div>
        <div class="feature-card">
          <div class="feature-image" style="background:#000;">
            <iframe title="Video Embed" src="https://www.nps.gov/media/video/embed.htm?id=CD297DBD-5955-4AA8-BC53-1798793EC221" width="480" height="306" frameborder="0" scrolling="auto" allowfullscreen style="display:block;width:100%;height:100%;border:0;"></iframe>
          </div>
          <div class="feature-content">
            <h3 class="feature-title">Evidence of Ancient Civilization</h3>
            <p class="feature-description">Discover petroglyphs, rock art, and ruins — thousands of years of indigenous history preserved in the stone and canyons of the Uintah Basin. <a href="/dinosaur-national-monument/petroglyphs-rock-art-vernal/" style="color:var(--burnt-orange);font-weight:600;">Explore rock art sites →</a></p>
          </div>
        </div>
        <div class="feature-card">
          <div class="feature-image" style="background:#000;">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/2fdxwBHky_Y?si=Mio585KlceDKRTHT" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style="display:block;width:100%;height:100%;border:0;"></iframe>
          </div>
          <div class="feature-content">
            <h3 class="feature-title">Hidden Trails</h3>
            <p class="feature-description">Access secret routes and local favorites known only to Vernal natives — landscapes you won't find anywhere else. <a href="/utv/backcountry-tours-vernal-utah/" style="color:var(--burnt-orange);font-weight:600;">Backcountry tour details →</a></p>
          </div>
        </div>
        <div class="feature-card">
          <div class="feature-image" style="background:#000;">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/hmKWG8GZBiw?si=Nq5dULfRSYvpRsAQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style="display:block;width:100%;height:100%;border:0;"></iframe>
          </div>
          <div class="feature-content">
            <h3 class="feature-title">Scenic Arches</h3>
            <p class="feature-description">Discover natural sandstone arches and formations that rival Utah's most famous parks, without the crowds. <a href="/utv/best-utv-trails-vernal/" style="color:var(--burnt-orange);font-weight:600;">See all 5 trail systems →</a></p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Vehicles Section -->
  <section id="vehicles">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Our Fleet</h2>
        <p class="section-subtitle">6 Kawasaki KRX 1000 machines available — maintained for safety and performance</p>
      </div>
      <div class="vehicles-grid">
        <div class="vehicle-card">
          <div class="vehicle-image" data-bg="/images/9.webp"></div>
          <div class="vehicle-content">
            <h3 class="vehicle-name">Kawasaki KRX 1000</h3>
            <ul class="vehicle-specs">
              <li><span class="spec-label">Fleet Size:</span><span class="spec-value">6 Machines Available</span></li>
              <li><span class="spec-label">Passengers:</span><span class="spec-value">2-Seater</span></li>
              <li><span class="spec-label">Suspension:</span><span class="spec-value">FOX 2.5 PODIUM LSC Shocks</span></li>
              <li><span class="spec-label">Best For:</span><span class="spec-value">Rock Crawling &amp; Comfort</span></li>
              <li><span class="spec-label">Safety:</span><span class="spec-value">Full Roll Cage + Power Steering</span></li>
              <li><span class="spec-label">Capacity:</span><span class="spec-value">Up to 12 guests per tour</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>

 <!-- Gallery Section -->
  <section id="gallery">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Photo Gallery</h2>
        <p class="section-subtitle">See the adventure that awaits you</p>
      </div>
      <div class="carousel-container">
        <div class="carousel-main">
          <button class="carousel-btn carousel-prev" aria-label="Previous image"><span>‹</span></button>
          <div class="carousel-track-container">
            <div class="carousel-track">
              <div class="carousel-slide active"><img src="/images/1a.webp" alt="Side-by-side UTV parked in a sandstone alcove on an Adventure Tours Vernal UTV tour"><div class="carousel-caption">Exploring a Sandstone Alcove</div></div>
              <div class="carousel-slide"><img src="/images/1.webp" alt="Lineup of Kawasaki KRX 1000 side-by-sides staged before a guided UTV tour in Vernal Utah"><div class="carousel-caption">UTV Lineup Staging</div></div>
              <div class="carousel-slide"><img src="/images/2.webp" alt="Blue side-by-side UTV kicking up dust on a desert trail near Vernal Utah"><div class="carousel-caption">Kicking Up Dust</div></div>
              <div class="carousel-slide"><img src="/images/3.webp" alt="Group riding side-by-side UTVs on a backcountry trail near Vernal Utah"><div class="carousel-caption">Group on the Trail</div></div>
              <div class="carousel-slide"><img src="/images/4.webp" alt="Riders resting under a sandstone overhang at sunset on an Adventure Tours Vernal UTV tour"><div class="carousel-caption">Sunset Rock Overhang</div></div>
              <div class="carousel-slide"><img src="/images/5.webp" alt="Looking out from inside a sandstone cave on a guided UTV tour near Vernal Utah"><div class="carousel-caption">Inside a Sandstone Cave</div></div>
              <div class="carousel-slide"><img src="/images/6.webp" alt="Family posing inside a sandstone cave on an Adventure Tours Vernal UTV tour"><div class="carousel-caption">Family Cave Photo</div></div>
              <div class="carousel-slide"><img src="/images/7.webp" alt="UTV tire perched on a canyon rim overlooking Ashley Gorge near Vernal Utah"><div class="carousel-caption">On the Canyon's Edge</div></div>
              <div class="carousel-slide"><img src="/images/3a.webp" alt="Desert badlands landscape at sunset on a backcountry UTV tour near Vernal Utah"><div class="carousel-caption">Desert Badlands Sunset</div></div>
              <div class="carousel-slide"><img src="/images/8.webp" alt="Side-by-side UTV climbing a slickrock ridge on a guided tour near Vernal Utah"><div class="carousel-caption">Climbing a Slickrock Ridge</div></div>
              <div class="carousel-slide"><img src="/images/8a.webp" alt="Blue side-by-side UTV speeding through the high desert near Vernal Utah"><div class="carousel-caption">Speeding Through the Desert</div></div>
              <div class="carousel-slide"><img src="/images/9.webp" alt="Kawasaki KRX 1000 side-by-sides lined up under a rock overhang near Vernal Utah"><div class="carousel-caption">Lineup Under the Overhang</div></div>
              <div class="carousel-slide"><img src="/images/6a.webp" alt="Group stopped with their side-by-side UTVs along a backcountry trail near Vernal Utah"><div class="carousel-caption">Trailside Group Stop</div></div>
              <div class="carousel-slide"><img src="/images/10.webp" alt="Side-by-side UTV beside a slickrock canyon vista on a guided tour near Vernal Utah"><div class="carousel-caption">Slickrock Canyon Vista</div></div>
              <div class="carousel-slide"><img src="/images/11.webp" alt="Side-by-side UTV parked inside a sandstone cave near Vernal Utah"><div class="carousel-caption">UTV Inside the Cave</div></div>
              <div class="carousel-slide"><img src="/images/12.webp" alt="Towering sandstone cave wall on an Adventure Tours Vernal backcountry tour"><div class="carousel-caption">Towering Cave Wall</div></div>
              <div class="carousel-slide"><img src="/images/13.webp" alt="Rider leaping off a cliff into the water on an Adventure Tours Vernal outing near Vernal Utah"><div class="carousel-caption">Cliff Jumping Splash</div></div>
              <div class="carousel-slide"><img src="/images/14.webp" alt="Convoy of side-by-side UTVs on a mountain trail during a guided tour near Vernal Utah"><div class="carousel-caption">Convoy on the Mountain Trail</div></div>
              <div class="carousel-slide"><img src="/images/15a.webp" alt="Side-by-side UTV on slickrock at dusk near Dinosaur National Monument, Vernal Utah"><div class="carousel-caption">Dusk Desert Ride</div></div>
              <div class="carousel-slide"><img src="/images/35a.webp" alt="Three Kawasaki KRX 1000 side-by-sides silhouetted against a sunburst at sunset near Vernal Utah"><div class="carousel-caption">Sunset Trio Silhouette</div></div>
              <div class="carousel-slide"><img src="/images/16a.webp" alt="Riders standing atop slickrock beside their Kawasaki KRX 1000 side-by-sides near Vernal Utah"><div class="carousel-caption">Riders Atop the Slickrock</div></div>
              <div class="carousel-slide"><img src="/images/17a.webp" alt="Two side-by-side UTVs parked on slickrock near Vernal Utah"><div class="carousel-caption">Two UTVs on Slickrock</div></div>
              <div class="carousel-slide"><img src="/images/18a.webp" alt="Mud-covered side-by-side UTVs on slickrock after a guided tour near Vernal Utah"><div class="carousel-caption">Muddy UTVs on the Rock</div></div>
              <div class="carousel-slide"><img src="/images/19a.webp" alt="Muddy side-by-side UTV on a rock dome at an overlook near Vernal Utah"><div class="carousel-caption">Muddy UTV at the Overlook</div></div>
              <div class="carousel-slide"><img src="/images/20.webp" alt="Blue side-by-side UTV on slickrock high above the canyon near Vernal Utah"><div class="carousel-caption">Blue UTV on Slickrock</div></div>
              <div class="carousel-slide"><img src="/images/21a.webp" alt="Side-by-side UTVs silhouetted at sunset on a guided tour near Vernal Utah"><div class="carousel-caption">UTVs at Sunset</div></div>
              <div class="carousel-slide"><img src="/images/22a.webp" alt="Side-by-side UTV silhouetted against a sunburst on a sunset ride through the Utah desert backcountry"><div class="carousel-caption">Sunburst Silhouette</div></div>
              <div class="carousel-slide"><img src="/images/23a.webp" alt="Two side-by-side UTVs perched on a boulder on a backcountry tour near Vernal Utah"><div class="carousel-caption">Twin UTVs on a Boulder</div></div>
              <div class="carousel-slide"><img src="/images/23.webp" alt="Hikers exploring a sandstone arch on an Adventure Tours Vernal outing in Vernal Utah"><div class="carousel-caption">Hikers at the Sandstone Arch</div></div>
              <div class="carousel-slide"><img src="/images/24.webp" alt="Side-by-side UTVs atop a large boulder with a desert view near Vernal Utah"><div class="carousel-caption">UTVs Atop the Boulder</div></div>
              <div class="carousel-slide"><img src="/images/25.webp" alt="Muddy side-by-side UTVs overlooking the valley on a backcountry trail near Vernal Utah"><div class="carousel-caption">Muddy UTVs With a View</div></div>
              <div class="carousel-slide"><img src="/images/26.webp" alt="Side-by-side UTVs on a ridgetop at dusk near Vernal Utah"><div class="carousel-caption">Ridgetop UTVs at Dusk</div></div>
              <div class="carousel-slide"><img src="/images/27.webp" alt="Side-by-side UTVs on a rock ridge formation on a guided tour in Vernal Utah"><div class="carousel-caption">UTVs on the Rock Ridge</div></div>
              <div class="carousel-slide"><img src="/images/28.webp" alt="Side-by-side UTVs in the high desert on a backcountry tour near Vernal Utah"><div class="carousel-caption">UTVs in the High Desert</div></div>
              <div class="carousel-slide"><img src="/images/29.webp" alt="Side-by-side UTV at a slickrock dome overlook near Vernal Utah"><div class="carousel-caption">Slickrock Dome Overlook</div></div>
              <div class="carousel-slide"><img src="/images/30.webp" alt="Canyon country overlook on a backcountry UTV tour near Vernal Utah"><div class="carousel-caption">Canyon Country Overlook</div></div>
              <div class="carousel-slide"><img src="/images/31.webp" alt="Side-by-side UTV climbing the slickrock on a guided tour near Vernal Utah"><div class="carousel-caption">Climbing the Slickrock</div></div>
              <div class="carousel-slide"><img src="/images/32.webp" alt="Side-by-side UTV descending a steep rock face on a guided tour near Vernal Utah"><div class="carousel-caption">UTV Descending the Rock</div></div>
              <div class="carousel-slide"><img src="/images/33.webp" alt="Side-by-side UTV cresting boulders on a backcountry trail near Vernal Utah"><div class="carousel-caption">UTV Cresting the Boulders</div></div>
              <div class="carousel-slide"><img src="/images/34.webp" alt="Green side-by-side UTV on a desert trail near Vernal Utah"><div class="carousel-caption">Green UTV on the Trail</div></div>
              <div class="carousel-slide"><img src="/images/35.webp" alt="Side-by-side UTVs climbing slickrock on a guided tour near Vernal Utah"><div class="carousel-caption">UTVs Climbing Slickrock</div></div>
              <div class="carousel-slide"><img src="/images/36.webp" alt="Side-by-side UTVs on the slickrock on a backcountry tour near Vernal Utah"><div class="carousel-caption">UTVs on the Slickrock</div></div>
              <div class="carousel-slide"><img src="/images/37.webp" alt="Side-by-side UTVs climbing a sandstone ridge near Vernal Utah"><div class="carousel-caption">Climbing a Sandstone Ridge</div></div>
              <div class="carousel-slide"><img src="/images/39a.webp" alt="Side-by-side UTV parked below a desert butte near Vernal Utah"><div class="carousel-caption">Parked at the Butte</div></div>
              <div class="carousel-slide"><img src="/images/39.webp" alt="View through a rock arch toward a desert butte near Vernal Utah"><div class="carousel-caption">Through the Rock Arch</div></div>
              <div class="carousel-slide"><img src="/images/40.webp" alt="Muddy side-by-side UTV climbing rocks on a backcountry tour near Vernal Utah"><div class="carousel-caption">Muddy Rig Climbing</div></div>
              <div class="carousel-slide"><img src="/images/41.webp" alt="Side-by-side UTVs parked under a natural rock arch near Vernal Utah"><div class="carousel-caption">Side-by-Sides Under the Arch</div></div>
              <div class="carousel-slide"><img src="/images/42.webp" alt="Two side-by-side UTVs on a canyon trail through the Utah backcountry"><div class="carousel-caption">Canyon Trail Duo</div></div>
              <div class="carousel-slide"><img src="/images/43.webp" alt="Side-by-side UTV on a steep slickrock descent near Vernal Utah"><div class="carousel-caption">Steep Slickrock Descent</div></div>
              <div class="carousel-slide"><img src="/images/44.webp" alt="Guided side-by-side UTV rock crawl through a sandstone wash near Vernal Utah"><div class="carousel-caption">Guided Rock Crawl</div></div>
              <div class="carousel-slide"><img src="/images/45.webp" alt="Desert overlook at dusk on a backcountry UTV tour near Vernal Utah"><div class="carousel-caption">Overlook at Dusk</div></div>
              <div class="carousel-slide"><img src="/images/46.webp" alt="Side-by-side UTV tackling a deep rut on a backcountry trail near Vernal Utah"><div class="carousel-caption">Tackling the Rut</div></div>
              <div class="carousel-slide"><img src="/images/47.webp" alt="Side-by-side UTV splashing through a river crossing near Vernal Utah"><div class="carousel-caption">Splashing River Crossing</div></div>
              <div class="carousel-slide"><img src="/images/48.webp" alt="Doc's Beach trailhead sign on an Adventure Tours Vernal UTV tour near Vernal Utah"><div class="carousel-caption">Doc's Beach Trails</div></div>
              <div class="carousel-slide"><img src="/images/49.webp" alt="Fleet of Kawasaki KRX 1000 side-by-sides staged for a guided tour in Vernal Utah"><div class="carousel-caption">Staged Fleet Lineup</div></div>
              <div class="carousel-slide"><img src="/images/50.webp" alt="Tour group stopped with their side-by-side UTVs near Vernal Utah"><div class="carousel-caption">Group Trail Stop</div></div>
              <div class="carousel-slide"><img src="/images/51.webp" alt="Tour group with Kawasaki KRX 1000 side-by-sides on a ridge near Vernal Utah"><div class="carousel-caption">Tour Group Photo</div></div>
              <div class="carousel-slide"><img src="/images/52.webp" alt="Long line of side-by-side UTVs staged and ready for a guided tour near Vernal Utah"><div class="carousel-caption">Lined Up and Ready</div></div>
              <div class="carousel-slide"><img src="/images/53.webp" alt="Fleet of side-by-side UTVs staged on a hilltop near Vernal Utah"><div class="carousel-caption">Fleet at the Hilltop</div></div>
              <div class="carousel-slide"><img src="/images/54a.webp" alt="Side-by-side UTV charging through a muddy backcountry trail near Vernal Utah"><div class="carousel-caption">Muddy Trail Charge</div></div>
              <div class="carousel-slide"><img src="/images/55.webp" alt="Green Kawasaki side-by-side UTV crossing a muddy rut near Vernal Utah"><div class="carousel-caption">Green Machine in the Mud</div></div>
              <div class="carousel-slide"><img src="/images/56.webp" alt="Tour group gathered under a rock overhang with their side-by-side UTVs near Vernal Utah"><div class="carousel-caption">Group Under the Overhang</div></div>
              <div class="carousel-slide"><img src="/images/57a.webp" alt="Side-by-side UTVs parked at a cliffside on a guided tour near Vernal Utah"><div class="carousel-caption">UTVs at the Cliffside</div></div>
              <div class="carousel-slide"><img src="/images/58a.webp" alt="Rocky trail vista on a backcountry UTV tour near Vernal Utah"><div class="carousel-caption">Rock Trail Vista</div></div>
              <div class="carousel-slide"><img src="/images/58.webp" alt="Rider jumping off a cliff for a cool-down on an Adventure Tours Vernal outing near Vernal Utah"><div class="carousel-caption">Cliff Jump Cool Down</div></div>
              <div class="carousel-slide"><img src="/images/59.webp" alt="Side-by-side UTVs staged below a slickrock dome near Vernal Utah"><div class="carousel-caption">UTVs Staged Below</div></div>
              <div class="carousel-slide"><img src="/images/60.webp" alt="Blue side-by-side UTV conquering a slickrock dome with a guide near Vernal Utah"><div class="carousel-caption">Conquering the Slickrock</div></div>
              <div class="carousel-slide"><img src="/images/61.webp" alt="Three side-by-side UTVs rock crawling through the Utah backcountry"><div class="carousel-caption">Rock Crawling Trio</div></div>
              <div class="carousel-slide"><img src="/images/62a.webp" alt="Riders exploring cliff dwellings on an Adventure Tours Vernal UTV tour"><div class="carousel-caption">Exploring Cliff Dwellings</div></div>
              <div class="carousel-slide"><img src="/images/42a.webp" alt="Large natural sandstone arch above the valley on a guided UTV tour near Vernal Utah"><div class="carousel-caption">Natural Sandstone Arch</div></div>
              <div class="carousel-slide"><img src="/images/63.webp" alt="Tour group at a rock arch at sunset near Vernal Utah"><div class="carousel-caption">Sunset Arch Crew</div></div>
              <div class="carousel-slide"><img src="/images/64.webp" alt="Inside a sandstone cave on an Adventure Tours Vernal backcountry tour"><div class="carousel-caption">Inside the Cave</div></div>
              <div class="carousel-slide"><img src="/images/65a.webp" alt="Side-by-side UTV on a slickrock summit climb near Vernal Utah"><div class="carousel-caption">Slickrock Summit Climb</div></div>
              <div class="carousel-slide"><img src="/images/65.webp" alt="Side-by-side UTV on a river crossing adventure near Vernal Utah"><div class="carousel-caption">River Crossing Adventure</div></div>
              <div class="carousel-slide"><img src="/images/66.webp" alt="Side-by-side UTV parked at a canyon overlook near Vernal Utah"><div class="carousel-caption">Parked Machine Profile</div></div>
              <div class="carousel-slide"><img src="/images/67.webp" alt="Side-by-side UTV sending it over a sand dune near Vernal Utah"><div class="carousel-caption">Sand Dune Send</div></div>
              <div class="carousel-slide"><img src="/images/68.webp" alt="Side-by-side UTV parked beside a sandstone arch near Vernal Utah"><div class="carousel-caption">Parked at the Arch</div></div>
              <div class="carousel-slide"><img src="/images/70.webp" alt="Golden sandstone arch on a backcountry UTV tour near Vernal Utah"><div class="carousel-caption">Golden Rock Arch</div></div>
              <div class="carousel-slide"><img src="/images/71.webp" alt="Window opening in a sandstone cave near Vernal Utah"><div class="carousel-caption">Sandstone Cave Window</div></div>
              <div class="carousel-slide"><img src="/images/72.webp" alt="Trail along a towering canyon wall near Vernal Utah"><div class="carousel-caption">Canyon Wall Trail</div></div>
              <div class="carousel-slide"><img src="/images/73.webp" alt="Side-by-side UTVs parked under a sandstone arch near Vernal Utah"><div class="carousel-caption">UTVs Under the Arch</div></div>
              <div class="carousel-slide"><img src="/images/74.webp" alt="Interior of a sandstone cave on an Adventure Tours Vernal tour near Vernal Utah"><div class="carousel-caption">Cave Interior View</div></div>
              <div class="carousel-slide"><img src="/images/75.webp" alt="Towering rock overhang on a backcountry UTV tour near Vernal Utah"><div class="carousel-caption">Towering Rock Overhang</div></div>
              <div class="carousel-slide"><img src="/images/76.webp" alt="Three side-by-side UTVs on the canyon rim near Vernal Utah"><div class="carousel-caption">Three UTVs on the Canyon Rim</div></div>
              <div class="carousel-slide"><img src="/images/77.webp" alt="Couple posing at a cliff edge overlooking the canyon near Vernal Utah"><div class="carousel-caption">Couple at the Cliff Edge</div></div>
              <div class="carousel-slide"><img src="/images/78.webp" alt="Autumn canyon overlook on a backcountry UTV trail near Vernal Utah"><div class="carousel-caption">Autumn Canyon Overlook</div></div>
              <div class="carousel-slide"><img src="/images/79.webp" alt="Side-by-side UTV on an aspen-lined trail near Vernal Utah"><div class="carousel-caption">Aspen Trail Ride</div></div>
              <div class="carousel-slide"><img src="/images/80.webp" alt="Side-by-side UTV on a slickrock descent near Vernal Utah"><div class="carousel-caption">Slickrock Descent</div></div>
              <div class="carousel-slide"><img src="/images/81.webp" alt="Golden aspen trail on a guided side-by-side adventure near Vernal Utah"><div class="carousel-caption">Golden Aspen Trail</div></div>
              <div class="carousel-slide"><img src="/images/82.webp" alt="Side-by-side UTVs above the canyon on a backcountry tour near Vernal Utah"><div class="carousel-caption">UTVs Above the Canyon</div></div>
              <div class="carousel-slide"><img src="/images/83.webp" alt="View through a sandstone arch on an Adventure Tours Vernal tour near Vernal Utah"><div class="carousel-caption">Through the Arch</div></div>
              <div class="carousel-slide"><img src="/images/84.webp" alt="Side-by-side UTVs on slickrock under a stormy sky near Vernal Utah"><div class="carousel-caption">Slickrock Under the Storm</div></div>
              <div class="carousel-slide"><img src="/images/38.webp" alt="Blue side-by-side UTV kicking up dust on a desert trail near Vernal Utah"><div class="carousel-caption">Desert Dust Trail</div></div>
              <div class="carousel-slide"><img src="/images/85.webp" alt="Inside a sandstone cave looking out a window opening near Vernal Utah"><div class="carousel-caption">Inside a Sandstone Cave</div></div>
              <div class="carousel-slide"><img src="/images/86.webp" alt="Side-by-side UTVs at a mountaintop staging point near Vernal Utah"><div class="carousel-caption">Mountaintop Staging Point</div></div>
              <div class="carousel-slide"><img src="/images/87.webp" alt="Three side-by-side UTVs lined up on a guided tour near Vernal Utah"><div class="carousel-caption">Three UTVs Lined Up</div></div>
              <div class="carousel-slide"><img src="/images/99.webp" alt="Slickrock ridge view on a backcountry UTV tour near Vernal Utah"><div class="carousel-caption">Slickrock Ridge View</div></div>
              <div class="carousel-slide"><img src="/images/90.webp" alt="Side-by-side UTV climbing the slickrock near Vernal Utah"><div class="carousel-caption">Climbing the Slickrock</div></div>
              <div class="carousel-slide"><img src="/images/91.webp" alt="Side-by-side UTV on a slickrock climb under a stormy sky near Vernal Utah"><div class="carousel-caption">Stormy Slickrock Climb</div></div>
              <div class="carousel-slide"><img src="/images/92.webp" alt="Side-by-side UTV throwing dust on a desert trail near Vernal Utah"><div class="carousel-caption">Airborne Dust Trail</div></div>
              <div class="carousel-slide"><img src="/images/93.webp" alt="Side-by-side UTV on a steep ledge climb near Vernal Utah"><div class="carousel-caption">Steep Ledge Climb</div></div>
              <div class="carousel-slide"><img src="/images/94.webp" alt="Side-by-side UTV spraying sand through a turn near Vernal Utah"><div class="carousel-caption">Sand Spray Turn</div></div>
              <div class="carousel-slide"><img src="/images/95.webp" alt="Side-by-side UTV flying an American flag at rest near Vernal Utah"><div class="carousel-caption">American Flag UTV</div></div>
              <div class="carousel-slide"><img src="/images/96.webp" alt="Side-by-side UTV at a cliff edge at dusk near Vernal Utah"><div class="carousel-caption">Cliff Edge at Dusk</div></div>
              <div class="carousel-slide"><img src="/images/97.webp" alt="Side-by-side UTV on a ridgeline at twilight in the Utah desert backcountry"><div class="carousel-caption">Ridgeline at Twilight</div></div>
            </div>
          </div>
          <button class="carousel-btn carousel-next" aria-label="Next image"><span>›</span></button>
        </div>
        <div class="carousel-indicators"></div>
        <div class="carousel-thumbnails"></div>
      </div>
    </div>
  </section>

  <!-- Booking Section -->
  <section id="booking">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Ready for Adventure?</h2>
        <p class="section-subtitle">Book online instantly or give us a call — we're here daily 7am–7pm</p>
      </div>
      <div class="booking-container">
        <div class="phone-cta-wrapper">

          <!-- Online Booking Button -->
          <div style="margin-bottom:35px;">
            <a href="/booking/" class="btn btn-primary" style="font-size:1.2rem;padding:20px 60px;">
              📅 Book Your Adventure Online
            </a>
            <p style="margin-top:12px;font-size:0.95rem;color:var(--charcoal);opacity:0.7;font-family:var(--font-body);">
              Choose your trail, date &amp; time — instant confirmation
            </p>
          </div>

          <!-- Divider -->
          <div style="display:flex;align-items:center;gap:20px;margin:10px 0 30px;">
            <div style="flex:1;height:1px;background:rgba(212,118,78,0.15);"></div>
            <span style="font-family:var(--font-heading);font-weight:700;color:var(--charcoal);opacity:0.5;font-size:0.9rem;">OR CALL US</span>
            <div style="flex:1;height:1px;background:rgba(212,118,78,0.15);"></div>
          </div>

          <!-- Phone -->
          <div class="phone-icon">📞</div>
          <h3 class="phone-cta-title">Call To Book Your Tour</h3>
          <a href="tel:435-219-9447" class="phone-number-display">(435) 219-9447</a>
          <p class="phone-cta-subtitle">Open Daily • 7am - 7pm Mountain Time</p>

          <div class="phone-benefits">
            <div class="phone-benefit"><span class="benefit-icon">✓</span><span>Instant Confirmation</span></div>
            <div class="phone-benefit"><span class="benefit-icon">✓</span><span>Expert Local Guides</span></div>
            <div class="phone-benefit"><span class="benefit-icon">✓</span><span>Flexible Scheduling</span></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- About CTA Section -->
  <section id="about">
    <div class="container">
      <div class="about-cta-simple">
        <h2 class="section-title">Meet the Wilson Family</h2>
        <p class="section-subtitle">Locally owned, safety-focused, adventure-driven since day one</p>
        <p>Learn about our story, our passion for the Uintah Basin, and why Adventure Tours Vernal is the premier UTV tour company in Vernal, Utah.</p>
        <a href="/about/" class="cta-button primary">Learn Our Story</a>
      </div>
    </div>
  </section>

  <div class="about-features">
    <div class="about-feature">
      <div class="about-feature-icon">✅</div>
      <span class="about-feature-text">Expert Local Guides with Deep Knowledge</span>
    </div>
    <div class="about-feature">
      <div class="about-feature-icon">🏅</div>
      <span class="about-feature-text">Professional Safety Training &amp; Equipment</span>
    </div>
    <div class="about-feature">
      <div class="about-feature-icon">🛡️</div>
      <span class="about-feature-text">All Skill Levels Welcome</span>
    </div>
    <div class="about-feature">
      <div class="about-feature-icon">🌟</div>
      <span class="about-feature-text">Fully Licensed &amp; Insured</span>
    </div>
  </div>
  <div class="about-image"></div>

  <!-- Explore Vernal Guides Section -->
  <section id="explore-guides" style="padding:var(--section-padding);background:var(--light-sand);">
    <div class="container" style="max-width:var(--container-max);margin:0 auto;">
      <div class="section-header">
        <h2 class="section-title">Explore Vernal</h2>
        <p class="section-subtitle">Plan your trip with our local guides — everything you need to know about Vernal, Utah</p>
      </div>
      <div class="related-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:18px;max-width:1000px;margin:0 auto;">
        <a href="/things-to-do/" class="related-card" style="background:white;border-radius:14px;padding:20px;text-decoration:none;border:1px solid rgba(212,118,78,0.1);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);display:block;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;font-weight:700;color:var(--burnt-orange);margin-bottom:6px;">Things to Do in Vernal</h4>
          <p style="font-size:0.88rem;color:var(--charcoal);opacity:0.7;line-height:1.5;margin:0;">The complete guide to activities and attractions.</p>
        </a>
        <a href="/things-to-do/vernal-utah-attractions/" class="related-card" style="background:white;border-radius:14px;padding:20px;text-decoration:none;border:1px solid rgba(212,118,78,0.1);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);display:block;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;font-weight:700;color:var(--burnt-orange);margin-bottom:6px;">Top Vernal Attractions</h4>
          <p style="font-size:0.88rem;color:var(--charcoal);opacity:0.7;line-height:1.5;margin:0;">Must-see sights and places to visit.</p>
        </a>
        <a href="/things-to-do/fun-things-to-do-vernal-utah-kids/" class="related-card" style="background:white;border-radius:14px;padding:20px;text-decoration:none;border:1px solid rgba(212,118,78,0.1);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);display:block;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;font-weight:700;color:var(--burnt-orange);margin-bottom:6px;">Family Activities</h4>
          <p style="font-size:0.88rem;color:var(--charcoal);opacity:0.7;line-height:1.5;margin:0;">Fun things to do with kids in Vernal.</p>
        </a>
        <a href="/things-to-do/" class="related-card" style="background:white;border-radius:14px;padding:20px;text-decoration:none;border:1px solid rgba(212,118,78,0.1);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);display:block;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;font-weight:700;color:var(--burnt-orange);margin-bottom:6px;">Outdoor Activities</h4>
          <p style="font-size:0.88rem;color:var(--charcoal);opacity:0.7;line-height:1.5;margin:0;">Hiking, fishing, UTV tours, and more.</p>
        </a>
        <a href="/atv-trails-vernal-utah/" class="related-card" style="background:white;border-radius:14px;padding:20px;text-decoration:none;border:1px solid rgba(212,118,78,0.1);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);display:block;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;font-weight:700;color:var(--burnt-orange);margin-bottom:6px;">ATV Trails Near Vernal</h4>
          <p style="font-size:0.88rem;color:var(--charcoal);opacity:0.7;line-height:1.5;margin:0;">Off-road trail systems and terrain guide.</p>
        </a>
        <a href="/utv/side-by-side-rentals-vernal-utah/" class="related-card" style="background:white;border-radius:14px;padding:20px;text-decoration:none;border:1px solid rgba(212,118,78,0.1);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);display:block;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;font-weight:700;color:var(--burnt-orange);margin-bottom:6px;">Side-by-Side Tours vs. Rentals</h4>
          <p style="font-size:0.88rem;color:var(--charcoal);opacity:0.7;line-height:1.5;margin:0;">Why guided tours beat self-guided rentals.</p>
        </a>
        <a href="/dinosaur-national-monument/" class="related-card" style="background:white;border-radius:14px;padding:20px;text-decoration:none;border:1px solid rgba(212,118,78,0.1);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);display:block;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;font-weight:700;color:var(--burnt-orange);margin-bottom:6px;">Dinosaur Monument Tours</h4>
          <p style="font-size:0.88rem;color:var(--charcoal);opacity:0.7;line-height:1.5;margin:0;">UTV tours near the monument.</p>
        </a>
        <a href="/dinosaur-national-monument/visiting-dinosaur-national-monument/" class="related-card" style="background:white;border-radius:14px;padding:20px;text-decoration:none;border:1px solid rgba(212,118,78,0.1);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);display:block;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;font-weight:700;color:var(--burnt-orange);margin-bottom:6px;">Ultimate Guide to Dinosaur National Monument</h4>
          <p style="font-size:0.88rem;color:var(--charcoal);opacity:0.7;line-height:1.5;margin:0;">The complete trip-planning guide — fossils, petroglyphs, drives &amp; more.</p>
        </a>
        <a href="/utv/group-utv-tours-vernal/" class="related-card" style="background:white;border-radius:14px;padding:20px;text-decoration:none;border:1px solid rgba(212,118,78,0.1);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);display:block;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;font-weight:700;color:var(--burnt-orange);margin-bottom:6px;">Group & Private Tours</h4>
          <p style="font-size:0.88rem;color:var(--charcoal);opacity:0.7;line-height:1.5;margin:0;">Families, reunions, corporate outings.</p>
        </a>
      </div>
    </div>
  </section>

  <!-- Mobile Sticky CTA -->
  <div class="mobile-sticky-cta">
    <button onclick="location.href='/booking/'">Book Your Ride Now</button>
  </div>

  <script is:inline src="https://player.vimeo.com/api/player.js"></script>
  <script is:inline>
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    // Background images from data attributes
    document.querySelectorAll('[data-bg]').forEach(element => {
      element.style.backgroundImage = \`url('\${element.getAttribute('data-bg')}')\`;
      element.style.backgroundSize = 'cover';
      element.style.backgroundPosition = 'center';
    });

    // Scroll indicator fade
    window.addEventListener('scroll', () => {
      const scrollIndicator = document.querySelector('.scroll-indicator');
      if (scrollIndicator) scrollIndicator.style.opacity = window.pageYOffset > 100 ? '0' : '1';
    });

    // Carousel
    class Carousel {
      constructor() {
        this.track = document.querySelector('.carousel-track');
        this.slides = Array.from(document.querySelectorAll('.carousel-slide'));
        this.prevBtn = document.querySelector('.carousel-prev');
        this.nextBtn = document.querySelector('.carousel-next');
        this.indicatorsContainer = document.querySelector('.carousel-indicators');
        this.currentIndex = 0;
        this.autoPlayInterval = null;
        this.isTransitioning = false;
        this.init();
      }
      init() {
        this.createIndicators();
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        document.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowLeft') this.prevSlide();
          if (e.key === 'ArrowRight') this.nextSlide();
        });
        this.addTouchSupport();
        this.startAutoPlay();
        this.track.parentElement.parentElement.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.track.parentElement.parentElement.addEventListener('mouseleave', () => this.startAutoPlay());
      }
      createIndicators() {
        this.slides.forEach((_, index) => {
          const indicator = document.createElement('button');
          indicator.classList.add('carousel-indicator');
          if (index === 0) indicator.classList.add('active');
          indicator.addEventListener('click', () => this.goToSlide(index));
          this.indicatorsContainer.appendChild(indicator);
        });
        this.indicators = Array.from(this.indicatorsContainer.querySelectorAll('.carousel-indicator'));
      }
      updateCarousel() {
        if (this.isTransitioning) return;
        this.isTransitioning = true;
        this.track.style.transform = \`translateX(-\${this.currentIndex * 100}%)\`;
        this.slides.forEach((slide, index) => slide.classList.toggle('active', index === this.currentIndex));
        this.indicators.forEach((indicator, index) => indicator.classList.toggle('active', index === this.currentIndex));
        setTimeout(() => { this.isTransitioning = false; }, 500);
      }
      nextSlide() { this.currentIndex = (this.currentIndex + 1) % this.slides.length; this.updateCarousel(); }
      prevSlide() { this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length; this.updateCarousel(); }
      goToSlide(index) { this.currentIndex = index; this.updateCarousel(); }
      startAutoPlay() { this.autoPlayInterval = setInterval(() => this.nextSlide(), 5000); }
      stopAutoPlay() { if (this.autoPlayInterval) { clearInterval(this.autoPlayInterval); this.autoPlayInterval = null; } }
      addTouchSupport() {
        let touchStartX = 0;
        this.track.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; });
        this.track.addEventListener('touchend', (e) => {
          const diff = touchStartX - e.changedTouches[0].screenX;
          if (Math.abs(diff) > 50) diff > 0 ? this.nextSlide() : this.prevSlide();
        });
      }
    }
    if (document.querySelector('.carousel-track')) new Carousel();

    // Floating video
    function closeFloatingVideo() {
      document.getElementById('floatingVideo').style.display = 'none';
    }
    window.addEventListener('scroll', () => {
      const floatingVideo = document.getElementById('floatingVideo');
      if (window.pageYOffset > 300 && floatingVideo) floatingVideo.classList.add('visible');
    });

    // Scroll spy
    function updateActiveNavLink() {
      const sections = document.querySelectorAll('section[id]');
      const navLinks = document.querySelectorAll('.nav-menu > li > a[href^="#"]:not(.dropdown-toggle)');
      let currentSection = '';
      const scrollPosition = window.pageYOffset + 200;
      sections.forEach(section => {
        if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
          currentSection = section.getAttribute('id');
        }
      });
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === \`#\${currentSection}\`) link.classList.add('active');
      });
    }
    window.addEventListener('scroll', updateActiveNavLink);
    window.addEventListener('load', updateActiveNavLink);

    // Hero video play
    function playHeroVideo() {
      document.getElementById('videoPlayOverlay').classList.add('hidden');
      document.getElementById('heroVideoContainer').innerHTML = '<iframe src="https://www.youtube.com/embed/eFfvKxkiyzU?si=rAXO-MccKZ1-6GgK&autoplay=1" title="Adventure Tours Vernal — Guided UTV Tours in Vernal Utah" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>';
    }
  </script>


  <!-- Best Western Lodging Promo -->
  <a href="https://bestwesternvernal.com" target="_blank" rel="noopener" class="bw-promo-badge" id="bwPromoBadge">
    <div class="bw-promo-badge-inner">
      <button class="bw-badge-close" onclick="event.preventDefault();event.stopPropagation();dismissBwBadge();return false;" aria-label="Close promo">&times;</button>
      <div class="bw-badge-text-wrap">
        <div class="bw-badge-eyebrow">
          <span class="pulse-dot"></span>
          Stay &amp; Ride Deal
        </div>
        <div class="bw-badge-offer">
          <span class="highlight">10% Off</span> Lodging
        </div>
        <p class="bw-badge-detail">
          Book at <strong>Best Western Vernal</strong> &mdash; mention <strong>&ldquo;Adventure Tours&rdquo;</strong> when you call.
        </p>
        <div class="bw-badge-cta-row">
          <span class="bw-badge-button">Book Lodging &rarr;</span>
          <span class="bw-badge-logo-text">bestwesternvernal.com</span>
        </div>
      </div>
    </div>
  </a>

  <!-- High Class Limousine Promo -->
  <a href="https://highclasslimousineservices.com/" target="_blank" rel="noopener" class="hcl-promo-badge" id="hclPromoBadge">
    <div class="hcl-promo-badge-inner">
      <button class="hcl-badge-close" onclick="event.preventDefault();event.stopPropagation();dismissHclBadge();return false;" aria-label="Close promo">&times;</button>
      <div class="hcl-badge-text-wrap">
        <div class="hcl-badge-eyebrow">
          <span class="pulse-dot"></span>
          Arrive in Style
        </div>
        <div class="hcl-badge-offer">
          <span class="highlight">High Class</span> Limousine
        </div>
        <p class="hcl-badge-detail">
          Weddings, proms, airport &amp; nights out across the Basin. <strong>Class Isn&rsquo;t Extinct.</strong>
        </p>
        <div class="hcl-badge-cta-row">
          <span class="hcl-badge-button">Ride in Style &rarr;</span>
          <span class="hcl-badge-logo-text">highclasslimousineservices.com</span>
        </div>
      </div>
    </div>
  </a>

  <script is:inline>
    // Dismiss badge for this session
    function dismissBwBadge() {
  var badge = document.getElementById('bwPromoBadge');
  if (badge) badge.classList.add('dismissed');
}
    function dismissHclBadge() {
  var badge = document.getElementById('hclPromoBadge');
  if (badge) badge.classList.add('dismissed');
}
</script>
`;

const ES = `

  <!-- Bloque de Resumen IA -->
  <p class="page-summary" style="position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;" aria-hidden="false">
    Adventure Tours Vernal ofrece tours guiados en UTV Kawasaki KRX 1000 en Vernal, Utah. Los senderos incluyen Doc's Beach, Moonshine Arch, Ashley Gorge, Outlaw Trail y Asphalt Ridge. Los tours presentan petroglifos, arte rupestre y ruinas antiguas. $349 por máquina para un tour guiado de 3 horas (hasta 2 pasajeros). $125 por pasajero adicional con un guía. Mínimo de 3 personas. Hasta 12 huéspedes por tour en 6 máquinas. La empresa de tours en UTV mejor calificada de Utah, con 5.0 estrellas de 82 reseñas de Google. Abierto todos los días de 7am a 7pm. Llame al (435) 219-9447 para reservar.
  </p>

  <!-- Sección Hero -->
  <div class="hero">
    <div class="trail-hero-video-bg">
  <iframe
    src="https://www.youtube.com/embed/BHOABkrNnnE?autoplay=1&mute=1&loop=1&playlist=BHOABkrNnnE&controls=0&showinfo=0&rel=0&playsinline=1"
    frameborder="0"
    allow="autoplay; encrypted-media"
    allowfullscreen>
  </iframe>
</div>
    <div class="hero-overlay"></div>

    <div class="hero-video-wrapper">
      <div class="video-frame-3d">
        <div class="video-frame-inner">
          <div class="video-play-overlay" id="videoPlayOverlay" onclick="playHeroVideo()">
            <img src="https://img.youtube.com/vi/eFfvKxkiyzU/maxresdefault.jpg" alt="Vea Adventure Tours Vernal en acción — tours guiados en UTV en Vernal, Utah" class="video-thumbnail">
            <div class="play-overlay-content">
              <div class="play-icon-circle">▶</div>
              <span class="play-overlay-text">Haga clic para ver el video</span>
            </div>
          </div>
          <div id="heroVideoContainer"></div>
        </div>
      </div>
    </div>

    <div class="hero-content">
      <h1 class="hero-title" style="font-size:clamp(1.8rem,4vw,3rem);font-weight:800;color:#fff;text-shadow:0 2px 12px rgba(0,0,0,0.5);margin-bottom:0.5rem;">
        Tours Guiados en UTV en Vernal, Utah
      </h1>
      <p class="hero-subtitle">Viva la emoción de la zona agreste de Utah con aventuras guiadas en UTV Kawasaki KRX 1000</p>
      <div style="margin-top:14px;"><span style="display:inline-flex;align-items:center;gap:8px;padding:7px 15px;border:1px solid rgba(255,255,255,0.5);border-radius:999px;background:rgba(0,0,0,0.35);font-size:0.95rem;color:#fff;"><span aria-hidden="true" style="color:#f5c451;letter-spacing:1px;">★★★★★</span> <span><strong>${SITE.rating.value}</strong> &middot; ${SITE.rating.count} reseñas de Google</span></span></div>
    </div>

    <div class="scroll-indicator"><span></span></div>
  </div>

    <!-- TARJETAS DE PRECIOS -->
    <div class="pricing-section">
      <h2>Precios Simples y Transparentes</h2>
      <p>Sin cargos ocultos — solo aventura. Mínimo de 3 personas por tour.</p>
      <div class="pricing-grid">
        <div class="pricing-card featured">
          <div class="pricing-label">Por Máquina</div>
          <div class="pricing-title">1–2 Pasajeros, 1 KRX 1000</div>
          <div class="pricing-amount">$349</div>
          <div class="pricing-per">por máquina / tour guiado de 3 horas</div>
          <ul class="pricing-features">
            <li>Kawasaki KRX 1000 de 2 asientos</li>
            <li>Hasta 2 pasajeros por máquina</li>
            <li>Guías locales expertos (Dave y Trudy)</li>
            <li>Elección de 5 sistemas de senderos</li>
            <li>Amortiguadores FOX 2.5 PODIUM LSC</li>
            <li>Sesión informativa de seguridad y equipo completo</li>
          </ul>
          <a href="/es/booking/" class="tour-book-btn" style="display:block;text-align:center;text-decoration:none;">Reserve Ahora</a>
        </div>
        <div class="pricing-card">
          <div class="pricing-label">Complemento de Pasajero</div>
          <div class="pricing-title">Viaje con Dave o Trudy</div>
          <div class="pricing-amount">$125</div>
          <div class="pricing-per">por pasajero / tour guiado de 3 horas</div>
          <ul class="pricing-features">
            <li>Agregue una tercera persona a su grupo</li>
            <li>Viaja como pasajero con un guía</li>
            <li>Requiere al menos 1 máquina rentada</li>
            <li>2 lugares de pasajero adicional disponibles por tour</li>
            <li>Toda la aventura, sin necesidad de conducir</li>
          </ul>
          <a href="/es/booking/" class="tour-book-btn" style="display:block;text-align:center;text-decoration:none;">Reserve Ahora</a>
        </div>
        <div class="pricing-card">
          <div class="pricing-label">Grupos</div>
          <div class="pricing-title">Hasta 12 Huéspedes</div>
          <div class="pricing-amount">Llame</div>
          <div class="pricing-per">precios personalizados para grupos</div>
          <ul class="pricing-features">
            <li>Hasta 6 máquinas disponibles</li>
            <li>10 huéspedes en 5 máquinas + 2 pasajeros adicionales</li>
            <li>Dave y Trudy guían juntos</li>
            <li>Ideal para familias y reuniones</li>
            <li>$99/hora por máquina para tiempo adicional</li>
          </ul>
          <a href="tel:435-219-9447" class="tour-book-btn" style="display:block;text-align:center;text-decoration:none;">📞 (435) 219-9447</a>
        </div>
      </div>
    </div>

      <!-- Botón único de reserva debajo de todos los senderos -->
      <div style="text-align:center;margin-top:50px;">
        <a href="/es/booking/" class="btn btn-primary" style="font-size:1.25rem;padding:22px 70px;">
          📅 Reserve Su Aventura
        </a>
        <p style="margin-top:14px;font-size:0.95rem;color:var(--charcoal);opacity:0.65;font-family:var(--font-body);">
          Elegirá su sendero durante la reserva — abierto todos los días de 7am a 7pm
        </p>
      </div>

    </div>
  </section>

  <!-- Sección Por Qué Vernal -->
  <section id="why-vernal">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">¿Por Qué Elegir Vernal?</h2>
        <p class="section-subtitle">Descubra lo que hace de este rincón de Utah un paraíso todo terreno</p>
      </div>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-image" style="background:#000;">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/PoCN4Lo9Lkk?si=CMj5hK0r2l5GeKFM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style="display:block;width:100%;height:100%;border:0;"></iframe>
          </div>
          <div class="feature-content">
            <h3 class="feature-title">Dinosaur National Monument</h3>
            <p class="feature-description">Recorra paisajes prehistóricos donde alguna vez deambularon gigantes antiguos, con acceso a yacimientos fósiles de clase mundial. <a href="/dinosaur-national-monument/" style="color:var(--burnt-orange);font-weight:600;">Tours en UTV cerca del monumento →</a></p>
          </div>
        </div>
        <div class="feature-card">
          <div class="feature-image" style="background:#000;">
            <iframe title="Video Embed" src="https://www.nps.gov/media/video/embed.htm?id=CD297DBD-5955-4AA8-BC53-1798793EC221" width="480" height="306" frameborder="0" scrolling="auto" allowfullscreen style="display:block;width:100%;height:100%;border:0;"></iframe>
          </div>
          <div class="feature-content">
            <h3 class="feature-title">Evidencia de Civilización Antigua</h3>
            <p class="feature-description">Descubra petroglifos, arte rupestre y ruinas — miles de años de historia indígena preservados en la piedra y los cañones de la Cuenca de Uintah. <a href="/dinosaur-national-monument/petroglyphs-rock-art-vernal/" style="color:var(--burnt-orange);font-weight:600;">Explore los sitios de arte rupestre →</a></p>
          </div>
        </div>
        <div class="feature-card">
          <div class="feature-image" style="background:#000;">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/2fdxwBHky_Y?si=Mio585KlceDKRTHT" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style="display:block;width:100%;height:100%;border:0;"></iframe>
          </div>
          <div class="feature-content">
            <h3 class="feature-title">Senderos Ocultos</h3>
            <p class="feature-description">Acceda a rutas secretas y favoritos locales conocidos solo por los habitantes de Vernal — paisajes que no encontrará en ningún otro lugar. <a href="/utv/backcountry-tours-vernal-utah/" style="color:var(--burnt-orange);font-weight:600;">Detalles del tour por la zona agreste →</a></p>
          </div>
        </div>
        <div class="feature-card">
          <div class="feature-image" style="background:#000;">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/hmKWG8GZBiw?si=Nq5dULfRSYvpRsAQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style="display:block;width:100%;height:100%;border:0;"></iframe>
          </div>
          <div class="feature-content">
            <h3 class="feature-title">Arcos Escénicos</h3>
            <p class="feature-description">Descubra arcos y formaciones naturales de piedra arenisca que rivalizan con los parques más famosos de Utah, sin las multitudes. <a href="/utv/best-utv-trails-vernal/" style="color:var(--burnt-orange);font-weight:600;">Vea los 5 sistemas de senderos →</a></p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Sección de Vehículos -->
  <section id="vehicles">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Nuestra Flota</h2>
        <p class="section-subtitle">6 UTV Kawasaki KRX 1000 disponibles — mantenidos para su seguridad y rendimiento</p>
      </div>
      <div class="vehicles-grid">
        <div class="vehicle-card">
          <div class="vehicle-image" data-bg="/images/9.webp"></div>
          <div class="vehicle-content">
            <h3 class="vehicle-name">Kawasaki KRX 1000</h3>
            <ul class="vehicle-specs">
              <li><span class="spec-label">Tamaño de la Flota:</span><span class="spec-value">6 Máquinas Disponibles</span></li>
              <li><span class="spec-label">Pasajeros:</span><span class="spec-value">2 Asientos</span></li>
              <li><span class="spec-label">Suspensión:</span><span class="spec-value">Amortiguadores FOX 2.5 PODIUM LSC</span></li>
              <li><span class="spec-label">Ideal Para:</span><span class="spec-value">Escalada en Roca y Comodidad</span></li>
              <li><span class="spec-label">Seguridad:</span><span class="spec-value">Jaula Antivuelco Completa + Dirección Asistida</span></li>
              <li><span class="spec-label">Capacidad:</span><span class="spec-value">Hasta 12 huéspedes por tour</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>

 <!-- Sección de Galería -->
  <section id="gallery">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Galería de Fotos</h2>
        <p class="section-subtitle">Vea la aventura que le espera</p>
      </div>
      <div class="carousel-container">
        <div class="carousel-main">
          <button class="carousel-btn carousel-prev" aria-label="Imagen anterior"><span>‹</span></button>
          <div class="carousel-track-container">
            <div class="carousel-track">
              <div class="carousel-slide active"><img src="/images/1a.webp" alt="Side-by-side UTV parked in a sandstone alcove on an Adventure Tours Vernal UTV tour"><div class="carousel-caption">Exploring a Sandstone Alcove</div></div>
              <div class="carousel-slide"><img src="/images/1.webp" alt="Lineup of Kawasaki KRX 1000 side-by-sides staged before a guided UTV tour in Vernal Utah"><div class="carousel-caption">UTV Lineup Staging</div></div>
              <div class="carousel-slide"><img src="/images/2.webp" alt="Blue side-by-side UTV kicking up dust on a desert trail near Vernal Utah"><div class="carousel-caption">Kicking Up Dust</div></div>
              <div class="carousel-slide"><img src="/images/3.webp" alt="Group riding side-by-side UTVs on a backcountry trail near Vernal Utah"><div class="carousel-caption">Group on the Trail</div></div>
              <div class="carousel-slide"><img src="/images/4.webp" alt="Riders resting under a sandstone overhang at sunset on an Adventure Tours Vernal UTV tour"><div class="carousel-caption">Sunset Rock Overhang</div></div>
              <div class="carousel-slide"><img src="/images/5.webp" alt="Looking out from inside a sandstone cave on a guided UTV tour near Vernal Utah"><div class="carousel-caption">Inside a Sandstone Cave</div></div>
              <div class="carousel-slide"><img src="/images/6.webp" alt="Family posing inside a sandstone cave on an Adventure Tours Vernal UTV tour"><div class="carousel-caption">Family Cave Photo</div></div>
              <div class="carousel-slide"><img src="/images/7.webp" alt="UTV tire perched on a canyon rim overlooking Ashley Gorge near Vernal Utah"><div class="carousel-caption">On the Canyon's Edge</div></div>
              <div class="carousel-slide"><img src="/images/3a.webp" alt="Desert badlands landscape at sunset on a backcountry UTV tour near Vernal Utah"><div class="carousel-caption">Desert Badlands Sunset</div></div>
              <div class="carousel-slide"><img src="/images/8.webp" alt="Side-by-side UTV climbing a slickrock ridge on a guided tour near Vernal Utah"><div class="carousel-caption">Climbing a Slickrock Ridge</div></div>
              <div class="carousel-slide"><img src="/images/8a.webp" alt="Blue side-by-side UTV speeding through the high desert near Vernal Utah"><div class="carousel-caption">Speeding Through the Desert</div></div>
              <div class="carousel-slide"><img src="/images/9.webp" alt="Kawasaki KRX 1000 side-by-sides lined up under a rock overhang near Vernal Utah"><div class="carousel-caption">Lineup Under the Overhang</div></div>
              <div class="carousel-slide"><img src="/images/6a.webp" alt="Group stopped with their side-by-side UTVs along a backcountry trail near Vernal Utah"><div class="carousel-caption">Trailside Group Stop</div></div>
              <div class="carousel-slide"><img src="/images/10.webp" alt="Side-by-side UTV beside a slickrock canyon vista on a guided tour near Vernal Utah"><div class="carousel-caption">Slickrock Canyon Vista</div></div>
              <div class="carousel-slide"><img src="/images/11.webp" alt="Side-by-side UTV parked inside a sandstone cave near Vernal Utah"><div class="carousel-caption">UTV Inside the Cave</div></div>
              <div class="carousel-slide"><img src="/images/12.webp" alt="Towering sandstone cave wall on an Adventure Tours Vernal backcountry tour"><div class="carousel-caption">Towering Cave Wall</div></div>
              <div class="carousel-slide"><img src="/images/13.webp" alt="Rider leaping off a cliff into the water on an Adventure Tours Vernal outing near Vernal Utah"><div class="carousel-caption">Cliff Jumping Splash</div></div>
              <div class="carousel-slide"><img src="/images/14.webp" alt="Convoy of side-by-side UTVs on a mountain trail during a guided tour near Vernal Utah"><div class="carousel-caption">Convoy on the Mountain Trail</div></div>
              <div class="carousel-slide"><img src="/images/15a.webp" alt="Side-by-side UTV on slickrock at dusk near Dinosaur National Monument, Vernal Utah"><div class="carousel-caption">Dusk Desert Ride</div></div>
              <div class="carousel-slide"><img src="/images/35a.webp" alt="Three Kawasaki KRX 1000 side-by-sides silhouetted against a sunburst at sunset near Vernal Utah"><div class="carousel-caption">Sunset Trio Silhouette</div></div>
              <div class="carousel-slide"><img src="/images/16a.webp" alt="Riders standing atop slickrock beside their Kawasaki KRX 1000 side-by-sides near Vernal Utah"><div class="carousel-caption">Riders Atop the Slickrock</div></div>
              <div class="carousel-slide"><img src="/images/17a.webp" alt="Two side-by-side UTVs parked on slickrock near Vernal Utah"><div class="carousel-caption">Two UTVs on Slickrock</div></div>
              <div class="carousel-slide"><img src="/images/18a.webp" alt="Mud-covered side-by-side UTVs on slickrock after a guided tour near Vernal Utah"><div class="carousel-caption">Muddy UTVs on the Rock</div></div>
              <div class="carousel-slide"><img src="/images/19a.webp" alt="Muddy side-by-side UTV on a rock dome at an overlook near Vernal Utah"><div class="carousel-caption">Muddy UTV at the Overlook</div></div>
              <div class="carousel-slide"><img src="/images/20.webp" alt="Blue side-by-side UTV on slickrock high above the canyon near Vernal Utah"><div class="carousel-caption">Blue UTV on Slickrock</div></div>
              <div class="carousel-slide"><img src="/images/21a.webp" alt="Side-by-side UTVs silhouetted at sunset on a guided tour near Vernal Utah"><div class="carousel-caption">UTVs at Sunset</div></div>
              <div class="carousel-slide"><img src="/images/22a.webp" alt="Side-by-side UTV silhouetted against a sunburst on a sunset ride through the Utah desert backcountry"><div class="carousel-caption">Sunburst Silhouette</div></div>
              <div class="carousel-slide"><img src="/images/23a.webp" alt="Two side-by-side UTVs perched on a boulder on a backcountry tour near Vernal Utah"><div class="carousel-caption">Twin UTVs on a Boulder</div></div>
              <div class="carousel-slide"><img src="/images/23.webp" alt="Hikers exploring a sandstone arch on an Adventure Tours Vernal outing in Vernal Utah"><div class="carousel-caption">Hikers at the Sandstone Arch</div></div>
              <div class="carousel-slide"><img src="/images/24.webp" alt="Side-by-side UTVs atop a large boulder with a desert view near Vernal Utah"><div class="carousel-caption">UTVs Atop the Boulder</div></div>
              <div class="carousel-slide"><img src="/images/25.webp" alt="Muddy side-by-side UTVs overlooking the valley on a backcountry trail near Vernal Utah"><div class="carousel-caption">Muddy UTVs With a View</div></div>
              <div class="carousel-slide"><img src="/images/26.webp" alt="Side-by-side UTVs on a ridgetop at dusk near Vernal Utah"><div class="carousel-caption">Ridgetop UTVs at Dusk</div></div>
              <div class="carousel-slide"><img src="/images/27.webp" alt="Side-by-side UTVs on a rock ridge formation on a guided tour in Vernal Utah"><div class="carousel-caption">UTVs on the Rock Ridge</div></div>
              <div class="carousel-slide"><img src="/images/28.webp" alt="Side-by-side UTVs in the high desert on a backcountry tour near Vernal Utah"><div class="carousel-caption">UTVs in the High Desert</div></div>
              <div class="carousel-slide"><img src="/images/29.webp" alt="Side-by-side UTV at a slickrock dome overlook near Vernal Utah"><div class="carousel-caption">Slickrock Dome Overlook</div></div>
              <div class="carousel-slide"><img src="/images/30.webp" alt="Canyon country overlook on a backcountry UTV tour near Vernal Utah"><div class="carousel-caption">Canyon Country Overlook</div></div>
              <div class="carousel-slide"><img src="/images/31.webp" alt="Side-by-side UTV climbing the slickrock on a guided tour near Vernal Utah"><div class="carousel-caption">Climbing the Slickrock</div></div>
              <div class="carousel-slide"><img src="/images/32.webp" alt="Side-by-side UTV descending a steep rock face on a guided tour near Vernal Utah"><div class="carousel-caption">UTV Descending the Rock</div></div>
              <div class="carousel-slide"><img src="/images/33.webp" alt="Side-by-side UTV cresting boulders on a backcountry trail near Vernal Utah"><div class="carousel-caption">UTV Cresting the Boulders</div></div>
              <div class="carousel-slide"><img src="/images/34.webp" alt="Green side-by-side UTV on a desert trail near Vernal Utah"><div class="carousel-caption">Green UTV on the Trail</div></div>
              <div class="carousel-slide"><img src="/images/35.webp" alt="Side-by-side UTVs climbing slickrock on a guided tour near Vernal Utah"><div class="carousel-caption">UTVs Climbing Slickrock</div></div>
              <div class="carousel-slide"><img src="/images/36.webp" alt="Side-by-side UTVs on the slickrock on a backcountry tour near Vernal Utah"><div class="carousel-caption">UTVs on the Slickrock</div></div>
              <div class="carousel-slide"><img src="/images/37.webp" alt="Side-by-side UTVs climbing a sandstone ridge near Vernal Utah"><div class="carousel-caption">Climbing a Sandstone Ridge</div></div>
              <div class="carousel-slide"><img src="/images/39a.webp" alt="Side-by-side UTV parked below a desert butte near Vernal Utah"><div class="carousel-caption">Parked at the Butte</div></div>
              <div class="carousel-slide"><img src="/images/39.webp" alt="View through a rock arch toward a desert butte near Vernal Utah"><div class="carousel-caption">Through the Rock Arch</div></div>
              <div class="carousel-slide"><img src="/images/40.webp" alt="Muddy side-by-side UTV climbing rocks on a backcountry tour near Vernal Utah"><div class="carousel-caption">Muddy Rig Climbing</div></div>
              <div class="carousel-slide"><img src="/images/41.webp" alt="Side-by-side UTVs parked under a natural rock arch near Vernal Utah"><div class="carousel-caption">Side-by-Sides Under the Arch</div></div>
              <div class="carousel-slide"><img src="/images/42.webp" alt="Two side-by-side UTVs on a canyon trail through the Utah backcountry"><div class="carousel-caption">Canyon Trail Duo</div></div>
              <div class="carousel-slide"><img src="/images/43.webp" alt="Side-by-side UTV on a steep slickrock descent near Vernal Utah"><div class="carousel-caption">Steep Slickrock Descent</div></div>
              <div class="carousel-slide"><img src="/images/44.webp" alt="Guided side-by-side UTV rock crawl through a sandstone wash near Vernal Utah"><div class="carousel-caption">Guided Rock Crawl</div></div>
              <div class="carousel-slide"><img src="/images/45.webp" alt="Desert overlook at dusk on a backcountry UTV tour near Vernal Utah"><div class="carousel-caption">Overlook at Dusk</div></div>
              <div class="carousel-slide"><img src="/images/46.webp" alt="Side-by-side UTV tackling a deep rut on a backcountry trail near Vernal Utah"><div class="carousel-caption">Tackling the Rut</div></div>
              <div class="carousel-slide"><img src="/images/47.webp" alt="Side-by-side UTV splashing through a river crossing near Vernal Utah"><div class="carousel-caption">Splashing River Crossing</div></div>
              <div class="carousel-slide"><img src="/images/48.webp" alt="Doc's Beach trailhead sign on an Adventure Tours Vernal UTV tour near Vernal Utah"><div class="carousel-caption">Doc's Beach Trails</div></div>
              <div class="carousel-slide"><img src="/images/49.webp" alt="Fleet of Kawasaki KRX 1000 side-by-sides staged for a guided tour in Vernal Utah"><div class="carousel-caption">Staged Fleet Lineup</div></div>
              <div class="carousel-slide"><img src="/images/50.webp" alt="Tour group stopped with their side-by-side UTVs near Vernal Utah"><div class="carousel-caption">Group Trail Stop</div></div>
              <div class="carousel-slide"><img src="/images/51.webp" alt="Tour group with Kawasaki KRX 1000 side-by-sides on a ridge near Vernal Utah"><div class="carousel-caption">Tour Group Photo</div></div>
              <div class="carousel-slide"><img src="/images/52.webp" alt="Long line of side-by-side UTVs staged and ready for a guided tour near Vernal Utah"><div class="carousel-caption">Lined Up and Ready</div></div>
              <div class="carousel-slide"><img src="/images/53.webp" alt="Fleet of side-by-side UTVs staged on a hilltop near Vernal Utah"><div class="carousel-caption">Fleet at the Hilltop</div></div>
              <div class="carousel-slide"><img src="/images/54a.webp" alt="Side-by-side UTV charging through a muddy backcountry trail near Vernal Utah"><div class="carousel-caption">Muddy Trail Charge</div></div>
              <div class="carousel-slide"><img src="/images/55.webp" alt="Green Kawasaki side-by-side UTV crossing a muddy rut near Vernal Utah"><div class="carousel-caption">Green Machine in the Mud</div></div>
              <div class="carousel-slide"><img src="/images/56.webp" alt="Tour group gathered under a rock overhang with their side-by-side UTVs near Vernal Utah"><div class="carousel-caption">Group Under the Overhang</div></div>
              <div class="carousel-slide"><img src="/images/57a.webp" alt="Side-by-side UTVs parked at a cliffside on a guided tour near Vernal Utah"><div class="carousel-caption">UTVs at the Cliffside</div></div>
              <div class="carousel-slide"><img src="/images/58a.webp" alt="Rocky trail vista on a backcountry UTV tour near Vernal Utah"><div class="carousel-caption">Rock Trail Vista</div></div>
              <div class="carousel-slide"><img src="/images/58.webp" alt="Rider jumping off a cliff for a cool-down on an Adventure Tours Vernal outing near Vernal Utah"><div class="carousel-caption">Cliff Jump Cool Down</div></div>
              <div class="carousel-slide"><img src="/images/59.webp" alt="Side-by-side UTVs staged below a slickrock dome near Vernal Utah"><div class="carousel-caption">UTVs Staged Below</div></div>
              <div class="carousel-slide"><img src="/images/60.webp" alt="Blue side-by-side UTV conquering a slickrock dome with a guide near Vernal Utah"><div class="carousel-caption">Conquering the Slickrock</div></div>
              <div class="carousel-slide"><img src="/images/61.webp" alt="Three side-by-side UTVs rock crawling through the Utah backcountry"><div class="carousel-caption">Rock Crawling Trio</div></div>
              <div class="carousel-slide"><img src="/images/62a.webp" alt="Riders exploring cliff dwellings on an Adventure Tours Vernal UTV tour"><div class="carousel-caption">Exploring Cliff Dwellings</div></div>
              <div class="carousel-slide"><img src="/images/42a.webp" alt="Large natural sandstone arch above the valley on a guided UTV tour near Vernal Utah"><div class="carousel-caption">Natural Sandstone Arch</div></div>
              <div class="carousel-slide"><img src="/images/63.webp" alt="Tour group at a rock arch at sunset near Vernal Utah"><div class="carousel-caption">Sunset Arch Crew</div></div>
              <div class="carousel-slide"><img src="/images/64.webp" alt="Inside a sandstone cave on an Adventure Tours Vernal backcountry tour"><div class="carousel-caption">Inside the Cave</div></div>
              <div class="carousel-slide"><img src="/images/65a.webp" alt="Side-by-side UTV on a slickrock summit climb near Vernal Utah"><div class="carousel-caption">Slickrock Summit Climb</div></div>
              <div class="carousel-slide"><img src="/images/65.webp" alt="Side-by-side UTV on a river crossing adventure near Vernal Utah"><div class="carousel-caption">River Crossing Adventure</div></div>
              <div class="carousel-slide"><img src="/images/66.webp" alt="Side-by-side UTV parked at a canyon overlook near Vernal Utah"><div class="carousel-caption">Parked Machine Profile</div></div>
              <div class="carousel-slide"><img src="/images/67.webp" alt="Side-by-side UTV sending it over a sand dune near Vernal Utah"><div class="carousel-caption">Sand Dune Send</div></div>
              <div class="carousel-slide"><img src="/images/68.webp" alt="Side-by-side UTV parked beside a sandstone arch near Vernal Utah"><div class="carousel-caption">Parked at the Arch</div></div>
              <div class="carousel-slide"><img src="/images/70.webp" alt="Golden sandstone arch on a backcountry UTV tour near Vernal Utah"><div class="carousel-caption">Golden Rock Arch</div></div>
              <div class="carousel-slide"><img src="/images/71.webp" alt="Window opening in a sandstone cave near Vernal Utah"><div class="carousel-caption">Sandstone Cave Window</div></div>
              <div class="carousel-slide"><img src="/images/72.webp" alt="Trail along a towering canyon wall near Vernal Utah"><div class="carousel-caption">Canyon Wall Trail</div></div>
              <div class="carousel-slide"><img src="/images/73.webp" alt="Side-by-side UTVs parked under a sandstone arch near Vernal Utah"><div class="carousel-caption">UTVs Under the Arch</div></div>
              <div class="carousel-slide"><img src="/images/74.webp" alt="Interior of a sandstone cave on an Adventure Tours Vernal tour near Vernal Utah"><div class="carousel-caption">Cave Interior View</div></div>
              <div class="carousel-slide"><img src="/images/75.webp" alt="Towering rock overhang on a backcountry UTV tour near Vernal Utah"><div class="carousel-caption">Towering Rock Overhang</div></div>
              <div class="carousel-slide"><img src="/images/76.webp" alt="Three side-by-side UTVs on the canyon rim near Vernal Utah"><div class="carousel-caption">Three UTVs on the Canyon Rim</div></div>
              <div class="carousel-slide"><img src="/images/77.webp" alt="Couple posing at a cliff edge overlooking the canyon near Vernal Utah"><div class="carousel-caption">Couple at the Cliff Edge</div></div>
              <div class="carousel-slide"><img src="/images/78.webp" alt="Autumn canyon overlook on a backcountry UTV trail near Vernal Utah"><div class="carousel-caption">Autumn Canyon Overlook</div></div>
              <div class="carousel-slide"><img src="/images/79.webp" alt="Side-by-side UTV on an aspen-lined trail near Vernal Utah"><div class="carousel-caption">Aspen Trail Ride</div></div>
              <div class="carousel-slide"><img src="/images/80.webp" alt="Side-by-side UTV on a slickrock descent near Vernal Utah"><div class="carousel-caption">Slickrock Descent</div></div>
              <div class="carousel-slide"><img src="/images/81.webp" alt="Golden aspen trail on a guided side-by-side adventure near Vernal Utah"><div class="carousel-caption">Golden Aspen Trail</div></div>
              <div class="carousel-slide"><img src="/images/82.webp" alt="Side-by-side UTVs above the canyon on a backcountry tour near Vernal Utah"><div class="carousel-caption">UTVs Above the Canyon</div></div>
              <div class="carousel-slide"><img src="/images/83.webp" alt="View through a sandstone arch on an Adventure Tours Vernal tour near Vernal Utah"><div class="carousel-caption">Through the Arch</div></div>
              <div class="carousel-slide"><img src="/images/84.webp" alt="Side-by-side UTVs on slickrock under a stormy sky near Vernal Utah"><div class="carousel-caption">Slickrock Under the Storm</div></div>
              <div class="carousel-slide"><img src="/images/38.webp" alt="Blue side-by-side UTV kicking up dust on a desert trail near Vernal Utah"><div class="carousel-caption">Desert Dust Trail</div></div>
              <div class="carousel-slide"><img src="/images/85.webp" alt="Inside a sandstone cave looking out a window opening near Vernal Utah"><div class="carousel-caption">Inside a Sandstone Cave</div></div>
              <div class="carousel-slide"><img src="/images/86.webp" alt="Side-by-side UTVs at a mountaintop staging point near Vernal Utah"><div class="carousel-caption">Mountaintop Staging Point</div></div>
              <div class="carousel-slide"><img src="/images/87.webp" alt="Three side-by-side UTVs lined up on a guided tour near Vernal Utah"><div class="carousel-caption">Three UTVs Lined Up</div></div>
              <div class="carousel-slide"><img src="/images/99.webp" alt="Slickrock ridge view on a backcountry UTV tour near Vernal Utah"><div class="carousel-caption">Slickrock Ridge View</div></div>
              <div class="carousel-slide"><img src="/images/90.webp" alt="Side-by-side UTV climbing the slickrock near Vernal Utah"><div class="carousel-caption">Climbing the Slickrock</div></div>
              <div class="carousel-slide"><img src="/images/91.webp" alt="Side-by-side UTV on a slickrock climb under a stormy sky near Vernal Utah"><div class="carousel-caption">Stormy Slickrock Climb</div></div>
              <div class="carousel-slide"><img src="/images/92.webp" alt="Side-by-side UTV throwing dust on a desert trail near Vernal Utah"><div class="carousel-caption">Airborne Dust Trail</div></div>
              <div class="carousel-slide"><img src="/images/93.webp" alt="Side-by-side UTV on a steep ledge climb near Vernal Utah"><div class="carousel-caption">Steep Ledge Climb</div></div>
              <div class="carousel-slide"><img src="/images/94.webp" alt="Side-by-side UTV spraying sand through a turn near Vernal Utah"><div class="carousel-caption">Sand Spray Turn</div></div>
              <div class="carousel-slide"><img src="/images/95.webp" alt="Side-by-side UTV flying an American flag at rest near Vernal Utah"><div class="carousel-caption">American Flag UTV</div></div>
              <div class="carousel-slide"><img src="/images/96.webp" alt="Side-by-side UTV at a cliff edge at dusk near Vernal Utah"><div class="carousel-caption">Cliff Edge at Dusk</div></div>
              <div class="carousel-slide"><img src="/images/97.webp" alt="Side-by-side UTV on a ridgeline at twilight in the Utah desert backcountry"><div class="carousel-caption">Ridgeline at Twilight</div></div>
            </div>
          </div>
          <button class="carousel-btn carousel-next" aria-label="Siguiente imagen"><span>›</span></button>
        </div>
        <div class="carousel-indicators"></div>
        <div class="carousel-thumbnails"></div>
      </div>
    </div>
  </section>

  <!-- Sección de Reserva -->
  <section id="booking">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">¿Listo para la Aventura?</h2>
        <p class="section-subtitle">Reserve en línea al instante o llámenos — estamos aquí todos los días de 7am a 7pm</p>
      </div>
      <div class="booking-container">
        <div class="phone-cta-wrapper">

          <!-- Botón de Reserva en Línea -->
          <div style="margin-bottom:35px;">
            <a href="/es/booking/" class="btn btn-primary" style="font-size:1.2rem;padding:20px 60px;">
              📅 Reserve Su Aventura en Línea
            </a>
            <p style="margin-top:12px;font-size:0.95rem;color:var(--charcoal);opacity:0.7;font-family:var(--font-body);">
              Elija su sendero, fecha y hora — confirmación instantánea
            </p>
          </div>

          <!-- Divisor -->
          <div style="display:flex;align-items:center;gap:20px;margin:10px 0 30px;">
            <div style="flex:1;height:1px;background:rgba(212,118,78,0.15);"></div>
            <span style="font-family:var(--font-heading);font-weight:700;color:var(--charcoal);opacity:0.5;font-size:0.9rem;">O LLÁMENOS</span>
            <div style="flex:1;height:1px;background:rgba(212,118,78,0.15);"></div>
          </div>

          <!-- Teléfono -->
          <div class="phone-icon">📞</div>
          <h3 class="phone-cta-title">Llame para Reservar Su Tour</h3>
          <a href="tel:435-219-9447" class="phone-number-display">(435) 219-9447</a>
          <p class="phone-cta-subtitle">Abierto Todos los Días • 7am - 7pm Hora de la Montaña</p>

          <div class="phone-benefits">
            <div class="phone-benefit"><span class="benefit-icon">✓</span><span>Confirmación Instantánea</span></div>
            <div class="phone-benefit"><span class="benefit-icon">✓</span><span>Guías Locales Expertos</span></div>
            <div class="phone-benefit"><span class="benefit-icon">✓</span><span>Horarios Flexibles</span></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Sección CTA Acerca de -->
  <section id="about">
    <div class="container">
      <div class="about-cta-simple">
        <h2 class="section-title">Conozca a la Familia Wilson</h2>
        <p class="section-subtitle">De propiedad local, enfocada en la seguridad, impulsada por la aventura desde el primer día</p>
        <p>Conozca nuestra historia, nuestra pasión por la Cuenca de Uintah, y por qué Adventure Tours Vernal es la empresa líder de tours en UTV en Vernal, Utah.</p>
        <a href="/es/about/" class="cta-button primary">Conozca Nuestra Historia</a>
      </div>
    </div>
  </section>

  <div class="about-features">
    <div class="about-feature">
      <div class="about-feature-icon">✅</div>
      <span class="about-feature-text">Guías Locales Expertos con Amplio Conocimiento</span>
    </div>
    <div class="about-feature">
      <div class="about-feature-icon">🏅</div>
      <span class="about-feature-text">Capacitación y Equipo de Seguridad Profesional</span>
    </div>
    <div class="about-feature">
      <div class="about-feature-icon">🛡️</div>
      <span class="about-feature-text">Todos los Niveles de Habilidad son Bienvenidos</span>
    </div>
    <div class="about-feature">
      <div class="about-feature-icon">🌟</div>
      <span class="about-feature-text">Totalmente Licenciados y Asegurados</span>
    </div>
  </div>
  <div class="about-image"></div>

  <!-- Sección Explore Guías de Vernal -->
  <section id="explore-guides" style="padding:var(--section-padding);background:var(--light-sand);">
    <div class="container" style="max-width:var(--container-max);margin:0 auto;">
      <div class="section-header">
        <h2 class="section-title">Explore Vernal</h2>
        <p class="section-subtitle">Planifique su viaje con nuestros guías locales — todo lo que necesita saber sobre Vernal, Utah</p>
      </div>
      <div class="related-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:18px;max-width:1000px;margin:0 auto;">
        <a href="/things-to-do/" class="related-card" style="background:white;border-radius:14px;padding:20px;text-decoration:none;border:1px solid rgba(212,118,78,0.1);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);display:block;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;font-weight:700;color:var(--burnt-orange);margin-bottom:6px;">Qué Hacer en Vernal</h4>
          <p style="font-size:0.88rem;color:var(--charcoal);opacity:0.7;line-height:1.5;margin:0;">La guía completa de actividades y atracciones.</p>
        </a>
        <a href="/things-to-do/vernal-utah-attractions/" class="related-card" style="background:white;border-radius:14px;padding:20px;text-decoration:none;border:1px solid rgba(212,118,78,0.1);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);display:block;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;font-weight:700;color:var(--burnt-orange);margin-bottom:6px;">Las Mejores Atracciones de Vernal</h4>
          <p style="font-size:0.88rem;color:var(--charcoal);opacity:0.7;line-height:1.5;margin:0;">Lugares y sitios imprescindibles para visitar.</p>
        </a>
        <a href="/things-to-do/fun-things-to-do-vernal-utah-kids/" class="related-card" style="background:white;border-radius:14px;padding:20px;text-decoration:none;border:1px solid rgba(212,118,78,0.1);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);display:block;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;font-weight:700;color:var(--burnt-orange);margin-bottom:6px;">Actividades Familiares</h4>
          <p style="font-size:0.88rem;color:var(--charcoal);opacity:0.7;line-height:1.5;margin:0;">Actividades divertidas para hacer con niños en Vernal.</p>
        </a>
        <a href="/things-to-do/" class="related-card" style="background:white;border-radius:14px;padding:20px;text-decoration:none;border:1px solid rgba(212,118,78,0.1);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);display:block;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;font-weight:700;color:var(--burnt-orange);margin-bottom:6px;">Actividades al Aire Libre</h4>
          <p style="font-size:0.88rem;color:var(--charcoal);opacity:0.7;line-height:1.5;margin:0;">Senderismo, pesca, tours en UTV y más.</p>
        </a>
        <a href="/atv-trails-vernal-utah/" class="related-card" style="background:white;border-radius:14px;padding:20px;text-decoration:none;border:1px solid rgba(212,118,78,0.1);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);display:block;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;font-weight:700;color:var(--burnt-orange);margin-bottom:6px;">Senderos para ATV Cerca de Vernal</h4>
          <p style="font-size:0.88rem;color:var(--charcoal);opacity:0.7;line-height:1.5;margin:0;">Sistemas de senderos todo terreno y guía del terreno.</p>
        </a>
        <a href="/utv/side-by-side-rentals-vernal-utah/" class="related-card" style="background:white;border-radius:14px;padding:20px;text-decoration:none;border:1px solid rgba(212,118,78,0.1);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);display:block;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;font-weight:700;color:var(--burnt-orange);margin-bottom:6px;">Tours en UTV vs. Alquileres</h4>
          <p style="font-size:0.88rem;color:var(--charcoal);opacity:0.7;line-height:1.5;margin:0;">Por qué los tours guiados son mejores que los alquileres por cuenta propia.</p>
        </a>
        <a href="/dinosaur-national-monument/" class="related-card" style="background:white;border-radius:14px;padding:20px;text-decoration:none;border:1px solid rgba(212,118,78,0.1);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);display:block;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;font-weight:700;color:var(--burnt-orange);margin-bottom:6px;">Tours al Monumento a los Dinosaurios</h4>
          <p style="font-size:0.88rem;color:var(--charcoal);opacity:0.7;line-height:1.5;margin:0;">Tours en UTV cerca del monumento.</p>
        </a>
        <a href="/dinosaur-national-monument/visiting-dinosaur-national-monument/" class="related-card" style="background:white;border-radius:14px;padding:20px;text-decoration:none;border:1px solid rgba(212,118,78,0.1);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);display:block;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;font-weight:700;color:var(--burnt-orange);margin-bottom:6px;">Guía Definitiva de Dinosaur National Monument</h4>
          <p style="font-size:0.88rem;color:var(--charcoal);opacity:0.7;line-height:1.5;margin:0;">La guía completa para planificar su viaje — fósiles, petroglifos, rutas y más.</p>
        </a>
        <a href="/utv/group-utv-tours-vernal/" class="related-card" style="background:white;border-radius:14px;padding:20px;text-decoration:none;border:1px solid rgba(212,118,78,0.1);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);display:block;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;font-weight:700;color:var(--burnt-orange);margin-bottom:6px;">Tours Grupales y Privados</h4>
          <p style="font-size:0.88rem;color:var(--charcoal);opacity:0.7;line-height:1.5;margin:0;">Familias, reuniones y salidas corporativas.</p>
        </a>
      </div>
    </div>
  </section>

  <!-- Botón flotante para móvil -->
  <div class="mobile-sticky-cta">
    <button onclick="location.href='/es/booking/'">Reserve Su Recorrido Ahora</button>
  </div>

  <script is:inline src="https://player.vimeo.com/api/player.js"></script>
  <script is:inline>
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    // Background images from data attributes
    document.querySelectorAll('[data-bg]').forEach(element => {
      element.style.backgroundImage = \`url('\${element.getAttribute('data-bg')}')\`;
      element.style.backgroundSize = 'cover';
      element.style.backgroundPosition = 'center';
    });

    // Scroll indicator fade
    window.addEventListener('scroll', () => {
      const scrollIndicator = document.querySelector('.scroll-indicator');
      if (scrollIndicator) scrollIndicator.style.opacity = window.pageYOffset > 100 ? '0' : '1';
    });

    // Carousel
    class Carousel {
      constructor() {
        this.track = document.querySelector('.carousel-track');
        this.slides = Array.from(document.querySelectorAll('.carousel-slide'));
        this.prevBtn = document.querySelector('.carousel-prev');
        this.nextBtn = document.querySelector('.carousel-next');
        this.indicatorsContainer = document.querySelector('.carousel-indicators');
        this.currentIndex = 0;
        this.autoPlayInterval = null;
        this.isTransitioning = false;
        this.init();
      }
      init() {
        this.createIndicators();
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        document.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowLeft') this.prevSlide();
          if (e.key === 'ArrowRight') this.nextSlide();
        });
        this.addTouchSupport();
        this.startAutoPlay();
        this.track.parentElement.parentElement.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.track.parentElement.parentElement.addEventListener('mouseleave', () => this.startAutoPlay());
      }
      createIndicators() {
        this.slides.forEach((_, index) => {
          const indicator = document.createElement('button');
          indicator.classList.add('carousel-indicator');
          if (index === 0) indicator.classList.add('active');
          indicator.addEventListener('click', () => this.goToSlide(index));
          this.indicatorsContainer.appendChild(indicator);
        });
        this.indicators = Array.from(this.indicatorsContainer.querySelectorAll('.carousel-indicator'));
      }
      updateCarousel() {
        if (this.isTransitioning) return;
        this.isTransitioning = true;
        this.track.style.transform = \`translateX(-\${this.currentIndex * 100}%)\`;
        this.slides.forEach((slide, index) => slide.classList.toggle('active', index === this.currentIndex));
        this.indicators.forEach((indicator, index) => indicator.classList.toggle('active', index === this.currentIndex));
        setTimeout(() => { this.isTransitioning = false; }, 500);
      }
      nextSlide() { this.currentIndex = (this.currentIndex + 1) % this.slides.length; this.updateCarousel(); }
      prevSlide() { this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length; this.updateCarousel(); }
      goToSlide(index) { this.currentIndex = index; this.updateCarousel(); }
      startAutoPlay() { this.autoPlayInterval = setInterval(() => this.nextSlide(), 5000); }
      stopAutoPlay() { if (this.autoPlayInterval) { clearInterval(this.autoPlayInterval); this.autoPlayInterval = null; } }
      addTouchSupport() {
        let touchStartX = 0;
        this.track.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; });
        this.track.addEventListener('touchend', (e) => {
          const diff = touchStartX - e.changedTouches[0].screenX;
          if (Math.abs(diff) > 50) diff > 0 ? this.nextSlide() : this.prevSlide();
        });
      }
    }
    if (document.querySelector('.carousel-track')) new Carousel();

    // Floating video
    function closeFloatingVideo() {
      document.getElementById('floatingVideo').style.display = 'none';
    }
    window.addEventListener('scroll', () => {
      const floatingVideo = document.getElementById('floatingVideo');
      if (window.pageYOffset > 300 && floatingVideo) floatingVideo.classList.add('visible');
    });

    // Scroll spy
    function updateActiveNavLink() {
      const sections = document.querySelectorAll('section[id]');
      const navLinks = document.querySelectorAll('.nav-menu > li > a[href^="#"]:not(.dropdown-toggle)');
      let currentSection = '';
      const scrollPosition = window.pageYOffset + 200;
      sections.forEach(section => {
        if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
          currentSection = section.getAttribute('id');
        }
      });
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === \`#\${currentSection}\`) link.classList.add('active');
      });
    }
    window.addEventListener('scroll', updateActiveNavLink);
    window.addEventListener('load', updateActiveNavLink);

    // Hero video play
    function playHeroVideo() {
      document.getElementById('videoPlayOverlay').classList.add('hidden');
      document.getElementById('heroVideoContainer').innerHTML = '<iframe src="https://www.youtube.com/embed/eFfvKxkiyzU?si=rAXO-MccKZ1-6GgK&autoplay=1" title="Adventure Tours Vernal — Guided UTV Tours in Vernal Utah" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>';
    }
  </script>


  <!-- Promoción Best Western Lodging -->
  <a href="https://bestwesternvernal.com" target="_blank" rel="noopener" class="bw-promo-badge" id="bwPromoBadge">
    <div class="bw-promo-badge-inner">
      <button class="bw-badge-close" onclick="event.preventDefault();event.stopPropagation();dismissBwBadge();return false;" aria-label="Cerrar promoción">&times;</button>
      <div class="bw-badge-text-wrap">
        <div class="bw-badge-eyebrow">
          <span class="pulse-dot"></span>
          Oferta de Hospedaje y Aventura
        </div>
        <div class="bw-badge-offer">
          <span class="highlight">10% de Descuento</span> en Hospedaje
        </div>
        <p class="bw-badge-detail">
          Reserve en <strong>Best Western Vernal</strong> &mdash; mencione <strong>&ldquo;Adventure Tours&rdquo;</strong> al llamar.
        </p>
        <div class="bw-badge-cta-row">
          <span class="bw-badge-button">Reserve Hospedaje &rarr;</span>
          <span class="bw-badge-logo-text">bestwesternvernal.com</span>
        </div>
      </div>
    </div>
  </a>

  <!-- Promoción High Class Limousine -->
  <a href="https://highclasslimousineservices.com/" target="_blank" rel="noopener" class="hcl-promo-badge" id="hclPromoBadge">
    <div class="hcl-promo-badge-inner">
      <button class="hcl-badge-close" onclick="event.preventDefault();event.stopPropagation();dismissHclBadge();return false;" aria-label="Cerrar promoción">&times;</button>
      <div class="hcl-badge-text-wrap">
        <div class="hcl-badge-eyebrow">
          <span class="pulse-dot"></span>
          Llegue con Estilo
        </div>
        <div class="hcl-badge-offer">
          <span class="highlight">High Class</span> Limousine
        </div>
        <p class="hcl-badge-detail">
          Bodas, graduaciones, aeropuerto y noches de diversión por toda la Cuenca. <strong>La Clase No Está Extinta.</strong>
        </p>
        <div class="hcl-badge-cta-row">
          <span class="hcl-badge-button">Viaje con Estilo &rarr;</span>
          <span class="hcl-badge-logo-text">highclasslimousineservices.com</span>
        </div>
      </div>
    </div>
  </a>

  <script is:inline>
    // Dismiss badge for this session
    function dismissBwBadge() {
  var badge = document.getElementById('bwPromoBadge');
  if (badge) badge.classList.add('dismissed');
}
    function dismissHclBadge() {
  var badge = document.getElementById('hclPromoBadge');
  if (badge) badge.classList.add('dismissed');
}
</script>
`;

const IT = `

  <!-- Blocco di Riepilogo IA -->
  <p class="page-summary" style="position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;" aria-hidden="false">
    Adventure Tours Vernal offre tour guidati in UTV side-by-side Kawasaki KRX 1000 a Vernal, Utah. I sentieri includono Doc's Beach, Moonshine Arch, Ashley Gorge, Outlaw Trail e Asphalt Ridge. I tour presentano petroglifi, arte rupestre e antiche rovine. $349 a macchina per un tour guidato di 3 ore (fino a 2 passeggeri). $125 per un ride-along (come passeggero) con una guida. Minimo 3 persone. Fino a 12 ospiti per tour su 6 macchine. L'operatore di tour in UTV più apprezzato dello Utah, con una valutazione di 5.0 stelle da 82 recensioni su Google. Aperto tutti i giorni dalle 7 alle 19. Chiami il (435) 219-9447 per prenotare.
  </p>

  <!-- Sezione Hero -->
  <div class="hero">
    <div class="trail-hero-video-bg">
  <iframe
    src="https://www.youtube.com/embed/BHOABkrNnnE?autoplay=1&mute=1&loop=1&playlist=BHOABkrNnnE&controls=0&showinfo=0&rel=0&playsinline=1"
    frameborder="0"
    allow="autoplay; encrypted-media"
    allowfullscreen>
  </iframe>
</div>
    <div class="hero-overlay"></div>

    <div class="hero-video-wrapper">
      <div class="video-frame-3d">
        <div class="video-frame-inner">
          <div class="video-play-overlay" id="videoPlayOverlay" onclick="playHeroVideo()">
            <img src="https://img.youtube.com/vi/eFfvKxkiyzU/maxresdefault.jpg" alt="Guardi Adventure Tours Vernal in azione — tour guidati in UTV a Vernal, Utah" class="video-thumbnail">
            <div class="play-overlay-content">
              <div class="play-icon-circle">▶</div>
              <span class="play-overlay-text">Clicchi per guardare il video</span>
            </div>
          </div>
          <div id="heroVideoContainer"></div>
        </div>
      </div>
    </div>

    <div class="hero-content">
      <h1 class="hero-title" style="font-size:clamp(1.8rem,4vw,3rem);font-weight:800;color:#fff;text-shadow:0 2px 12px rgba(0,0,0,0.5);margin-bottom:0.5rem;">
        Tour Guidati in UTV a Vernal, Utah
      </h1>
      <p class="hero-subtitle">Viva l'emozione del backcountry dello Utah con avventure guidate su side-by-side Kawasaki KRX 1000</p>
      <div style="margin-top:14px;"><span style="display:inline-flex;align-items:center;gap:8px;padding:7px 15px;border:1px solid rgba(255,255,255,0.5);border-radius:999px;background:rgba(0,0,0,0.35);font-size:0.95rem;color:#fff;"><span aria-hidden="true" style="color:#f5c451;letter-spacing:1px;">★★★★★</span> <span><strong>${SITE.rating.value}</strong> &middot; ${SITE.rating.count} recensioni Google</span></span></div>
    </div>

    <div class="scroll-indicator"><span></span></div>
  </div>

    <!-- CARTE DEI PREZZI -->
    <div class="pricing-section">
      <h2>Prezzi Semplici e Trasparenti</h2>
      <p>Nessun costo nascosto — solo avventura. Minimo 3 persone per tour.</p>
      <div class="pricing-grid">
        <div class="pricing-card featured">
          <div class="pricing-label">A Macchina</div>
          <div class="pricing-title">1–2 Passeggeri, 1 KRX 1000</div>
          <div class="pricing-amount">$349</div>
          <div class="pricing-per">a macchina / tour guidato di 3 ore</div>
          <ul class="pricing-features">
            <li>Kawasaki KRX 1000 a 2 posti</li>
            <li>Fino a 2 passeggeri per macchina</li>
            <li>Guide locali esperte (Dave e Trudy)</li>
            <li>Scelta tra 5 sistemi di sentieri</li>
            <li>Ammortizzatori FOX 2.5 PODIUM LSC</li>
            <li>Briefing di sicurezza completo e attrezzatura</li>
          </ul>
          <a href="/it/booking/" class="tour-book-btn" style="display:block;text-align:center;text-decoration:none;">Prenoti Ora</a>
        </div>
        <div class="pricing-card">
          <div class="pricing-label">Extra Ride-Along</div>
          <div class="pricing-title">Ride-along con Dave o Trudy</div>
          <div class="pricing-amount">$125</div>
          <div class="pricing-per">a persona / tour guidato di 3 ore</div>
          <ul class="pricing-features">
            <li>Aggiunga una terza persona al Suo gruppo</li>
            <li>Viaggia come passeggero con una guida</li>
            <li>Richiede almeno 1 macchina noleggiata</li>
            <li>2 posti ride-along disponibili per tour</li>
            <li>Tutta l'avventura, senza dover guidare</li>
          </ul>
          <a href="/it/booking/" class="tour-book-btn" style="display:block;text-align:center;text-decoration:none;">Prenoti Ora</a>
        </div>
        <div class="pricing-card">
          <div class="pricing-label">Gruppi</div>
          <div class="pricing-title">Fino a 12 Ospiti</div>
          <div class="pricing-amount">Chiami</div>
          <div class="pricing-per">prezzi personalizzati per gruppi</div>
          <ul class="pricing-features">
            <li>Fino a 6 macchine disponibili</li>
            <li>10 ospiti su 5 macchine + 2 ride-along</li>
            <li>Dave e Trudy guidano insieme</li>
            <li>Ideale per famiglie e riunioni</li>
            <li>$99/ora a macchina per tempo aggiuntivo</li>
          </ul>
          <a href="tel:435-219-9447" class="tour-book-btn" style="display:block;text-align:center;text-decoration:none;">📞 (435) 219-9447</a>
        </div>
      </div>
    </div>

      <!-- Pulsante di prenotazione unico sotto tutti i sentieri -->
      <div style="text-align:center;margin-top:50px;">
        <a href="/it/booking/" class="btn btn-primary" style="font-size:1.25rem;padding:22px 70px;">
          📅 Prenoti La Sua Avventura
        </a>
        <p style="margin-top:14px;font-size:0.95rem;color:var(--charcoal);opacity:0.65;font-family:var(--font-body);">
          Sceglierà il Suo sentiero durante la prenotazione — aperto tutti i giorni dalle 7 alle 19
        </p>
      </div>

    </div>
  </section>

  <!-- Sezione Perché Vernal -->
  <section id="why-vernal">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Perché Scegliere Vernal?</h2>
        <p class="section-subtitle">Scopra cosa rende questo angolo dello Utah un paradiso fuoristrada</p>
      </div>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-image" style="background:#000;">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/PoCN4Lo9Lkk?si=CMj5hK0r2l5GeKFM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style="display:block;width:100%;height:100%;border:0;"></iframe>
          </div>
          <div class="feature-content">
            <h3 class="feature-title">Dinosaur National Monument</h3>
            <p class="feature-description">Attraversi paesaggi preistorici dove un tempo vagavano giganti antichi, con accesso a siti fossili di livello mondiale. <a href="/it/dinosaur-national-monument/" style="color:var(--burnt-orange);font-weight:600;">Tour in UTV vicino al monumento →</a></p>
          </div>
        </div>
        <div class="feature-card">
          <div class="feature-image" style="background:#000;">
            <iframe title="Video Embed" src="https://www.nps.gov/media/video/embed.htm?id=CD297DBD-5955-4AA8-BC53-1798793EC221" width="480" height="306" frameborder="0" scrolling="auto" allowfullscreen style="display:block;width:100%;height:100%;border:0;"></iframe>
          </div>
          <div class="feature-content">
            <h3 class="feature-title">Testimonianze di Civiltà Antica</h3>
            <p class="feature-description">Scopra petroglifi, arte rupestre e rovine — migliaia di anni di storia indigena conservati nella pietra e nei canyon dell'Uintah Basin. <a href="/it/dinosaur-national-monument/petroglyphs-rock-art-vernal/" style="color:var(--burnt-orange);font-weight:600;">Esplori i siti di arte rupestre →</a></p>
          </div>
        </div>
        <div class="feature-card">
          <div class="feature-image" style="background:#000;">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/2fdxwBHky_Y?si=Mio585KlceDKRTHT" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style="display:block;width:100%;height:100%;border:0;"></iframe>
          </div>
          <div class="feature-content">
            <h3 class="feature-title">Sentieri Nascosti</h3>
            <p class="feature-description">Acceda a percorsi segreti e luoghi preferiti conosciuti solo dagli abitanti di Vernal — paesaggi che non troverà da nessun'altra parte. <a href="/it/utv/backcountry-tours-vernal-utah/" style="color:var(--burnt-orange);font-weight:600;">Dettagli del tour nel backcountry →</a></p>
          </div>
        </div>
        <div class="feature-card">
          <div class="feature-image" style="background:#000;">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/hmKWG8GZBiw?si=Nq5dULfRSYvpRsAQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style="display:block;width:100%;height:100%;border:0;"></iframe>
          </div>
          <div class="feature-content">
            <h3 class="feature-title">Archi Panoramici</h3>
            <p class="feature-description">Scopra archi e formazioni naturali di arenaria che rivaleggiano con i parchi più famosi dello Utah, senza la folla. <a href="/it/utv/best-utv-trails-vernal/" style="color:var(--burnt-orange);font-weight:600;">Veda tutti i 5 sistemi di sentieri →</a></p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Sezione Veicoli -->
  <section id="vehicles">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">La Nostra Flotta</h2>
        <p class="section-subtitle">6 macchine Kawasaki KRX 1000 disponibili — mantenute per sicurezza e prestazioni</p>
      </div>
      <div class="vehicles-grid">
        <div class="vehicle-card">
          <div class="vehicle-image" data-bg="/images/9.webp"></div>
          <div class="vehicle-content">
            <h3 class="vehicle-name">Kawasaki KRX 1000</h3>
            <ul class="vehicle-specs">
              <li><span class="spec-label">Dimensione Flotta:</span><span class="spec-value">6 Macchine Disponibili</span></li>
              <li><span class="spec-label">Passeggeri:</span><span class="spec-value">2 Posti</span></li>
              <li><span class="spec-label">Sospensioni:</span><span class="spec-value">Ammortizzatori FOX 2.5 PODIUM LSC</span></li>
              <li><span class="spec-label">Ideale Per:</span><span class="spec-value">Rock Crawling e Comfort</span></li>
              <li><span class="spec-label">Sicurezza:</span><span class="spec-value">Gabbia di Sicurezza Completa + Servosterzo</span></li>
              <li><span class="spec-label">Capacità:</span><span class="spec-value">Fino a 12 ospiti per tour</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>

 <!-- Sezione Galleria -->
  <section id="gallery">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Galleria Fotografica</h2>
        <p class="section-subtitle">Veda l'avventura che La aspetta</p>
      </div>
      <div class="carousel-container">
        <div class="carousel-main">
          <button class="carousel-btn carousel-prev" aria-label="Immagine precedente"><span>‹</span></button>
          <div class="carousel-track-container">
            <div class="carousel-track">
              <div class="carousel-slide active"><img src="/images/1a.webp" alt="Side-by-side UTV parked in a sandstone alcove on an Adventure Tours Vernal UTV tour"><div class="carousel-caption">Exploring a Sandstone Alcove</div></div>
              <div class="carousel-slide"><img src="/images/1.webp" alt="Lineup of Kawasaki KRX 1000 side-by-sides staged before a guided UTV tour in Vernal Utah"><div class="carousel-caption">UTV Lineup Staging</div></div>
              <div class="carousel-slide"><img src="/images/2.webp" alt="Blue side-by-side UTV kicking up dust on a desert trail near Vernal Utah"><div class="carousel-caption">Kicking Up Dust</div></div>
              <div class="carousel-slide"><img src="/images/3.webp" alt="Group riding side-by-side UTVs on a backcountry trail near Vernal Utah"><div class="carousel-caption">Group on the Trail</div></div>
              <div class="carousel-slide"><img src="/images/4.webp" alt="Riders resting under a sandstone overhang at sunset on an Adventure Tours Vernal UTV tour"><div class="carousel-caption">Sunset Rock Overhang</div></div>
              <div class="carousel-slide"><img src="/images/5.webp" alt="Looking out from inside a sandstone cave on a guided UTV tour near Vernal Utah"><div class="carousel-caption">Inside a Sandstone Cave</div></div>
              <div class="carousel-slide"><img src="/images/6.webp" alt="Family posing inside a sandstone cave on an Adventure Tours Vernal UTV tour"><div class="carousel-caption">Family Cave Photo</div></div>
              <div class="carousel-slide"><img src="/images/7.webp" alt="UTV tire perched on a canyon rim overlooking Ashley Gorge near Vernal Utah"><div class="carousel-caption">On the Canyon's Edge</div></div>
              <div class="carousel-slide"><img src="/images/3a.webp" alt="Desert badlands landscape at sunset on a backcountry UTV tour near Vernal Utah"><div class="carousel-caption">Desert Badlands Sunset</div></div>
              <div class="carousel-slide"><img src="/images/8.webp" alt="Side-by-side UTV climbing a slickrock ridge on a guided tour near Vernal Utah"><div class="carousel-caption">Climbing a Slickrock Ridge</div></div>
              <div class="carousel-slide"><img src="/images/8a.webp" alt="Blue side-by-side UTV speeding through the high desert near Vernal Utah"><div class="carousel-caption">Speeding Through the Desert</div></div>
              <div class="carousel-slide"><img src="/images/9.webp" alt="Kawasaki KRX 1000 side-by-sides lined up under a rock overhang near Vernal Utah"><div class="carousel-caption">Lineup Under the Overhang</div></div>
              <div class="carousel-slide"><img src="/images/6a.webp" alt="Group stopped with their side-by-side UTVs along a backcountry trail near Vernal Utah"><div class="carousel-caption">Trailside Group Stop</div></div>
              <div class="carousel-slide"><img src="/images/10.webp" alt="Side-by-side UTV beside a slickrock canyon vista on a guided tour near Vernal Utah"><div class="carousel-caption">Slickrock Canyon Vista</div></div>
              <div class="carousel-slide"><img src="/images/11.webp" alt="Side-by-side UTV parked inside a sandstone cave near Vernal Utah"><div class="carousel-caption">UTV Inside the Cave</div></div>
              <div class="carousel-slide"><img src="/images/12.webp" alt="Towering sandstone cave wall on an Adventure Tours Vernal backcountry tour"><div class="carousel-caption">Towering Cave Wall</div></div>
              <div class="carousel-slide"><img src="/images/13.webp" alt="Rider leaping off a cliff into the water on an Adventure Tours Vernal outing near Vernal Utah"><div class="carousel-caption">Cliff Jumping Splash</div></div>
              <div class="carousel-slide"><img src="/images/14.webp" alt="Convoy of side-by-side UTVs on a mountain trail during a guided tour near Vernal Utah"><div class="carousel-caption">Convoy on the Mountain Trail</div></div>
              <div class="carousel-slide"><img src="/images/15a.webp" alt="Side-by-side UTV on slickrock at dusk near Dinosaur National Monument, Vernal Utah"><div class="carousel-caption">Dusk Desert Ride</div></div>
              <div class="carousel-slide"><img src="/images/35a.webp" alt="Three Kawasaki KRX 1000 side-by-sides silhouetted against a sunburst at sunset near Vernal Utah"><div class="carousel-caption">Sunset Trio Silhouette</div></div>
              <div class="carousel-slide"><img src="/images/16a.webp" alt="Riders standing atop slickrock beside their Kawasaki KRX 1000 side-by-sides near Vernal Utah"><div class="carousel-caption">Riders Atop the Slickrock</div></div>
              <div class="carousel-slide"><img src="/images/17a.webp" alt="Two side-by-side UTVs parked on slickrock near Vernal Utah"><div class="carousel-caption">Two UTVs on Slickrock</div></div>
              <div class="carousel-slide"><img src="/images/18a.webp" alt="Mud-covered side-by-side UTVs on slickrock after a guided tour near Vernal Utah"><div class="carousel-caption">Muddy UTVs on the Rock</div></div>
              <div class="carousel-slide"><img src="/images/19a.webp" alt="Muddy side-by-side UTV on a rock dome at an overlook near Vernal Utah"><div class="carousel-caption">Muddy UTV at the Overlook</div></div>
              <div class="carousel-slide"><img src="/images/20.webp" alt="Blue side-by-side UTV on slickrock high above the canyon near Vernal Utah"><div class="carousel-caption">Blue UTV on Slickrock</div></div>
              <div class="carousel-slide"><img src="/images/21a.webp" alt="Side-by-side UTVs silhouetted at sunset on a guided tour near Vernal Utah"><div class="carousel-caption">UTVs at Sunset</div></div>
              <div class="carousel-slide"><img src="/images/22a.webp" alt="Side-by-side UTV silhouetted against a sunburst on a sunset ride through the Utah desert backcountry"><div class="carousel-caption">Sunburst Silhouette</div></div>
              <div class="carousel-slide"><img src="/images/23a.webp" alt="Two side-by-side UTVs perched on a boulder on a backcountry tour near Vernal Utah"><div class="carousel-caption">Twin UTVs on a Boulder</div></div>
              <div class="carousel-slide"><img src="/images/23.webp" alt="Hikers exploring a sandstone arch on an Adventure Tours Vernal outing in Vernal Utah"><div class="carousel-caption">Hikers at the Sandstone Arch</div></div>
              <div class="carousel-slide"><img src="/images/24.webp" alt="Side-by-side UTVs atop a large boulder with a desert view near Vernal Utah"><div class="carousel-caption">UTVs Atop the Boulder</div></div>
              <div class="carousel-slide"><img src="/images/25.webp" alt="Muddy side-by-side UTVs overlooking the valley on a backcountry trail near Vernal Utah"><div class="carousel-caption">Muddy UTVs With a View</div></div>
              <div class="carousel-slide"><img src="/images/26.webp" alt="Side-by-side UTVs on a ridgetop at dusk near Vernal Utah"><div class="carousel-caption">Ridgetop UTVs at Dusk</div></div>
              <div class="carousel-slide"><img src="/images/27.webp" alt="Side-by-side UTVs on a rock ridge formation on a guided tour in Vernal Utah"><div class="carousel-caption">UTVs on the Rock Ridge</div></div>
              <div class="carousel-slide"><img src="/images/28.webp" alt="Side-by-side UTVs in the high desert on a backcountry tour near Vernal Utah"><div class="carousel-caption">UTVs in the High Desert</div></div>
              <div class="carousel-slide"><img src="/images/29.webp" alt="Side-by-side UTV at a slickrock dome overlook near Vernal Utah"><div class="carousel-caption">Slickrock Dome Overlook</div></div>
              <div class="carousel-slide"><img src="/images/30.webp" alt="Canyon country overlook on a backcountry UTV tour near Vernal Utah"><div class="carousel-caption">Canyon Country Overlook</div></div>
              <div class="carousel-slide"><img src="/images/31.webp" alt="Side-by-side UTV climbing the slickrock on a guided tour near Vernal Utah"><div class="carousel-caption">Climbing the Slickrock</div></div>
              <div class="carousel-slide"><img src="/images/32.webp" alt="Side-by-side UTV descending a steep rock face on a guided tour near Vernal Utah"><div class="carousel-caption">UTV Descending the Rock</div></div>
              <div class="carousel-slide"><img src="/images/33.webp" alt="Side-by-side UTV cresting boulders on a backcountry trail near Vernal Utah"><div class="carousel-caption">UTV Cresting the Boulders</div></div>
              <div class="carousel-slide"><img src="/images/34.webp" alt="Green side-by-side UTV on a desert trail near Vernal Utah"><div class="carousel-caption">Green UTV on the Trail</div></div>
              <div class="carousel-slide"><img src="/images/35.webp" alt="Side-by-side UTVs climbing slickrock on a guided tour near Vernal Utah"><div class="carousel-caption">UTVs Climbing Slickrock</div></div>
              <div class="carousel-slide"><img src="/images/36.webp" alt="Side-by-side UTVs on the slickrock on a backcountry tour near Vernal Utah"><div class="carousel-caption">UTVs on the Slickrock</div></div>
              <div class="carousel-slide"><img src="/images/37.webp" alt="Side-by-side UTVs climbing a sandstone ridge near Vernal Utah"><div class="carousel-caption">Climbing a Sandstone Ridge</div></div>
              <div class="carousel-slide"><img src="/images/39a.webp" alt="Side-by-side UTV parked below a desert butte near Vernal Utah"><div class="carousel-caption">Parked at the Butte</div></div>
              <div class="carousel-slide"><img src="/images/39.webp" alt="View through a rock arch toward a desert butte near Vernal Utah"><div class="carousel-caption">Through the Rock Arch</div></div>
              <div class="carousel-slide"><img src="/images/40.webp" alt="Muddy side-by-side UTV climbing rocks on a backcountry tour near Vernal Utah"><div class="carousel-caption">Muddy Rig Climbing</div></div>
              <div class="carousel-slide"><img src="/images/41.webp" alt="Side-by-side UTVs parked under a natural rock arch near Vernal Utah"><div class="carousel-caption">Side-by-Sides Under the Arch</div></div>
              <div class="carousel-slide"><img src="/images/42.webp" alt="Two side-by-side UTVs on a canyon trail through the Utah backcountry"><div class="carousel-caption">Canyon Trail Duo</div></div>
              <div class="carousel-slide"><img src="/images/43.webp" alt="Side-by-side UTV on a steep slickrock descent near Vernal Utah"><div class="carousel-caption">Steep Slickrock Descent</div></div>
              <div class="carousel-slide"><img src="/images/44.webp" alt="Guided side-by-side UTV rock crawl through a sandstone wash near Vernal Utah"><div class="carousel-caption">Guided Rock Crawl</div></div>
              <div class="carousel-slide"><img src="/images/45.webp" alt="Desert overlook at dusk on a backcountry UTV tour near Vernal Utah"><div class="carousel-caption">Overlook at Dusk</div></div>
              <div class="carousel-slide"><img src="/images/46.webp" alt="Side-by-side UTV tackling a deep rut on a backcountry trail near Vernal Utah"><div class="carousel-caption">Tackling the Rut</div></div>
              <div class="carousel-slide"><img src="/images/47.webp" alt="Side-by-side UTV splashing through a river crossing near Vernal Utah"><div class="carousel-caption">Splashing River Crossing</div></div>
              <div class="carousel-slide"><img src="/images/48.webp" alt="Doc's Beach trailhead sign on an Adventure Tours Vernal UTV tour near Vernal Utah"><div class="carousel-caption">Doc's Beach Trails</div></div>
              <div class="carousel-slide"><img src="/images/49.webp" alt="Fleet of Kawasaki KRX 1000 side-by-sides staged for a guided tour in Vernal Utah"><div class="carousel-caption">Staged Fleet Lineup</div></div>
              <div class="carousel-slide"><img src="/images/50.webp" alt="Tour group stopped with their side-by-side UTVs near Vernal Utah"><div class="carousel-caption">Group Trail Stop</div></div>
              <div class="carousel-slide"><img src="/images/51.webp" alt="Tour group with Kawasaki KRX 1000 side-by-sides on a ridge near Vernal Utah"><div class="carousel-caption">Tour Group Photo</div></div>
              <div class="carousel-slide"><img src="/images/52.webp" alt="Long line of side-by-side UTVs staged and ready for a guided tour near Vernal Utah"><div class="carousel-caption">Lined Up and Ready</div></div>
              <div class="carousel-slide"><img src="/images/53.webp" alt="Fleet of side-by-side UTVs staged on a hilltop near Vernal Utah"><div class="carousel-caption">Fleet at the Hilltop</div></div>
              <div class="carousel-slide"><img src="/images/54a.webp" alt="Side-by-side UTV charging through a muddy backcountry trail near Vernal Utah"><div class="carousel-caption">Muddy Trail Charge</div></div>
              <div class="carousel-slide"><img src="/images/55.webp" alt="Green Kawasaki side-by-side UTV crossing a muddy rut near Vernal Utah"><div class="carousel-caption">Green Machine in the Mud</div></div>
              <div class="carousel-slide"><img src="/images/56.webp" alt="Tour group gathered under a rock overhang with their side-by-side UTVs near Vernal Utah"><div class="carousel-caption">Group Under the Overhang</div></div>
              <div class="carousel-slide"><img src="/images/57a.webp" alt="Side-by-side UTVs parked at a cliffside on a guided tour near Vernal Utah"><div class="carousel-caption">UTVs at the Cliffside</div></div>
              <div class="carousel-slide"><img src="/images/58a.webp" alt="Rocky trail vista on a backcountry UTV tour near Vernal Utah"><div class="carousel-caption">Rock Trail Vista</div></div>
              <div class="carousel-slide"><img src="/images/58.webp" alt="Rider jumping off a cliff for a cool-down on an Adventure Tours Vernal outing near Vernal Utah"><div class="carousel-caption">Cliff Jump Cool Down</div></div>
              <div class="carousel-slide"><img src="/images/59.webp" alt="Side-by-side UTVs staged below a slickrock dome near Vernal Utah"><div class="carousel-caption">UTVs Staged Below</div></div>
              <div class="carousel-slide"><img src="/images/60.webp" alt="Blue side-by-side UTV conquering a slickrock dome with a guide near Vernal Utah"><div class="carousel-caption">Conquering the Slickrock</div></div>
              <div class="carousel-slide"><img src="/images/61.webp" alt="Three side-by-side UTVs rock crawling through the Utah backcountry"><div class="carousel-caption">Rock Crawling Trio</div></div>
              <div class="carousel-slide"><img src="/images/62a.webp" alt="Riders exploring cliff dwellings on an Adventure Tours Vernal UTV tour"><div class="carousel-caption">Exploring Cliff Dwellings</div></div>
              <div class="carousel-slide"><img src="/images/42a.webp" alt="Large natural sandstone arch above the valley on a guided UTV tour near Vernal Utah"><div class="carousel-caption">Natural Sandstone Arch</div></div>
              <div class="carousel-slide"><img src="/images/63.webp" alt="Tour group at a rock arch at sunset near Vernal Utah"><div class="carousel-caption">Sunset Arch Crew</div></div>
              <div class="carousel-slide"><img src="/images/64.webp" alt="Inside a sandstone cave on an Adventure Tours Vernal backcountry tour"><div class="carousel-caption">Inside the Cave</div></div>
              <div class="carousel-slide"><img src="/images/65a.webp" alt="Side-by-side UTV on a slickrock summit climb near Vernal Utah"><div class="carousel-caption">Slickrock Summit Climb</div></div>
              <div class="carousel-slide"><img src="/images/65.webp" alt="Side-by-side UTV on a river crossing adventure near Vernal Utah"><div class="carousel-caption">River Crossing Adventure</div></div>
              <div class="carousel-slide"><img src="/images/66.webp" alt="Side-by-side UTV parked at a canyon overlook near Vernal Utah"><div class="carousel-caption">Parked Machine Profile</div></div>
              <div class="carousel-slide"><img src="/images/67.webp" alt="Side-by-side UTV sending it over a sand dune near Vernal Utah"><div class="carousel-caption">Sand Dune Send</div></div>
              <div class="carousel-slide"><img src="/images/68.webp" alt="Side-by-side UTV parked beside a sandstone arch near Vernal Utah"><div class="carousel-caption">Parked at the Arch</div></div>
              <div class="carousel-slide"><img src="/images/70.webp" alt="Golden sandstone arch on a backcountry UTV tour near Vernal Utah"><div class="carousel-caption">Golden Rock Arch</div></div>
              <div class="carousel-slide"><img src="/images/71.webp" alt="Window opening in a sandstone cave near Vernal Utah"><div class="carousel-caption">Sandstone Cave Window</div></div>
              <div class="carousel-slide"><img src="/images/72.webp" alt="Trail along a towering canyon wall near Vernal Utah"><div class="carousel-caption">Canyon Wall Trail</div></div>
              <div class="carousel-slide"><img src="/images/73.webp" alt="Side-by-side UTVs parked under a sandstone arch near Vernal Utah"><div class="carousel-caption">UTVs Under the Arch</div></div>
              <div class="carousel-slide"><img src="/images/74.webp" alt="Interior of a sandstone cave on an Adventure Tours Vernal tour near Vernal Utah"><div class="carousel-caption">Cave Interior View</div></div>
              <div class="carousel-slide"><img src="/images/75.webp" alt="Towering rock overhang on a backcountry UTV tour near Vernal Utah"><div class="carousel-caption">Towering Rock Overhang</div></div>
              <div class="carousel-slide"><img src="/images/76.webp" alt="Three side-by-side UTVs on the canyon rim near Vernal Utah"><div class="carousel-caption">Three UTVs on the Canyon Rim</div></div>
              <div class="carousel-slide"><img src="/images/77.webp" alt="Couple posing at a cliff edge overlooking the canyon near Vernal Utah"><div class="carousel-caption">Couple at the Cliff Edge</div></div>
              <div class="carousel-slide"><img src="/images/78.webp" alt="Autumn canyon overlook on a backcountry UTV trail near Vernal Utah"><div class="carousel-caption">Autumn Canyon Overlook</div></div>
              <div class="carousel-slide"><img src="/images/79.webp" alt="Side-by-side UTV on an aspen-lined trail near Vernal Utah"><div class="carousel-caption">Aspen Trail Ride</div></div>
              <div class="carousel-slide"><img src="/images/80.webp" alt="Side-by-side UTV on a slickrock descent near Vernal Utah"><div class="carousel-caption">Slickrock Descent</div></div>
              <div class="carousel-slide"><img src="/images/81.webp" alt="Golden aspen trail on a guided side-by-side adventure near Vernal Utah"><div class="carousel-caption">Golden Aspen Trail</div></div>
              <div class="carousel-slide"><img src="/images/82.webp" alt="Side-by-side UTVs above the canyon on a backcountry tour near Vernal Utah"><div class="carousel-caption">UTVs Above the Canyon</div></div>
              <div class="carousel-slide"><img src="/images/83.webp" alt="View through a sandstone arch on an Adventure Tours Vernal tour near Vernal Utah"><div class="carousel-caption">Through the Arch</div></div>
              <div class="carousel-slide"><img src="/images/84.webp" alt="Side-by-side UTVs on slickrock under a stormy sky near Vernal Utah"><div class="carousel-caption">Slickrock Under the Storm</div></div>
              <div class="carousel-slide"><img src="/images/38.webp" alt="Blue side-by-side UTV kicking up dust on a desert trail near Vernal Utah"><div class="carousel-caption">Desert Dust Trail</div></div>
              <div class="carousel-slide"><img src="/images/85.webp" alt="Inside a sandstone cave looking out a window opening near Vernal Utah"><div class="carousel-caption">Inside a Sandstone Cave</div></div>
              <div class="carousel-slide"><img src="/images/86.webp" alt="Side-by-side UTVs at a mountaintop staging point near Vernal Utah"><div class="carousel-caption">Mountaintop Staging Point</div></div>
              <div class="carousel-slide"><img src="/images/87.webp" alt="Three side-by-side UTVs lined up on a guided tour near Vernal Utah"><div class="carousel-caption">Three UTVs Lined Up</div></div>
              <div class="carousel-slide"><img src="/images/99.webp" alt="Slickrock ridge view on a backcountry UTV tour near Vernal Utah"><div class="carousel-caption">Slickrock Ridge View</div></div>
              <div class="carousel-slide"><img src="/images/90.webp" alt="Side-by-side UTV climbing the slickrock near Vernal Utah"><div class="carousel-caption">Climbing the Slickrock</div></div>
              <div class="carousel-slide"><img src="/images/91.webp" alt="Side-by-side UTV on a slickrock climb under a stormy sky near Vernal Utah"><div class="carousel-caption">Stormy Slickrock Climb</div></div>
              <div class="carousel-slide"><img src="/images/92.webp" alt="Side-by-side UTV throwing dust on a desert trail near Vernal Utah"><div class="carousel-caption">Airborne Dust Trail</div></div>
              <div class="carousel-slide"><img src="/images/93.webp" alt="Side-by-side UTV on a steep ledge climb near Vernal Utah"><div class="carousel-caption">Steep Ledge Climb</div></div>
              <div class="carousel-slide"><img src="/images/94.webp" alt="Side-by-side UTV spraying sand through a turn near Vernal Utah"><div class="carousel-caption">Sand Spray Turn</div></div>
              <div class="carousel-slide"><img src="/images/95.webp" alt="Side-by-side UTV flying an American flag at rest near Vernal Utah"><div class="carousel-caption">American Flag UTV</div></div>
              <div class="carousel-slide"><img src="/images/96.webp" alt="Side-by-side UTV at a cliff edge at dusk near Vernal Utah"><div class="carousel-caption">Cliff Edge at Dusk</div></div>
              <div class="carousel-slide"><img src="/images/97.webp" alt="Side-by-side UTV on a ridgeline at twilight in the Utah desert backcountry"><div class="carousel-caption">Ridgeline at Twilight</div></div>
            </div>
          </div>
          <button class="carousel-btn carousel-next" aria-label="Immagine successiva"><span>›</span></button>
        </div>
        <div class="carousel-indicators"></div>
        <div class="carousel-thumbnails"></div>
      </div>
    </div>
  </section>

  <!-- Sezione Prenotazione -->
  <section id="booking">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Pronti per l'Avventura?</h2>
        <p class="section-subtitle">Prenoti online all'istante o ci chiami — siamo qui tutti i giorni dalle 7 alle 19</p>
      </div>
      <div class="booking-container">
        <div class="phone-cta-wrapper">

          <!-- Pulsante di Prenotazione Online -->
          <div style="margin-bottom:35px;">
            <a href="/it/booking/" class="btn btn-primary" style="font-size:1.2rem;padding:20px 60px;">
              📅 Prenoti La Sua Avventura Online
            </a>
            <p style="margin-top:12px;font-size:0.95rem;color:var(--charcoal);opacity:0.7;font-family:var(--font-body);">
              Scelga il Suo sentiero, data e ora — conferma istantanea
            </p>
          </div>

          <!-- Divisore -->
          <div style="display:flex;align-items:center;gap:20px;margin:10px 0 30px;">
            <div style="flex:1;height:1px;background:rgba(212,118,78,0.15);"></div>
            <span style="font-family:var(--font-heading);font-weight:700;color:var(--charcoal);opacity:0.5;font-size:0.9rem;">OPPURE CI CHIAMI</span>
            <div style="flex:1;height:1px;background:rgba(212,118,78,0.15);"></div>
          </div>

          <!-- Telefono -->
          <div class="phone-icon">📞</div>
          <h3 class="phone-cta-title">Chiami Per Prenotare Il Suo Tour</h3>
          <a href="tel:435-219-9447" class="phone-number-display">(435) 219-9447</a>
          <p class="phone-cta-subtitle">Aperto Tutti i Giorni • dalle 7 alle 19 (Ora delle Montagne Rocciose)</p>

          <div class="phone-benefits">
            <div class="phone-benefit"><span class="benefit-icon">✓</span><span>Conferma Istantanea</span></div>
            <div class="phone-benefit"><span class="benefit-icon">✓</span><span>Guide Locali Esperte</span></div>
            <div class="phone-benefit"><span class="benefit-icon">✓</span><span>Orari Flessibili</span></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Sezione CTA Chi Siamo -->
  <section id="about">
    <div class="container">
      <div class="about-cta-simple">
        <h2 class="section-title">Conosca la Famiglia Wilson</h2>
        <p class="section-subtitle">Di proprietà locale, orientata alla sicurezza, guidata dalla passione per l'avventura fin dal primo giorno</p>
        <p>Scopra la nostra storia, la nostra passione per l'Uintah Basin, e perché Adventure Tours Vernal è la principale azienda di tour in UTV a Vernal, Utah.</p>
        <a href="/it/about/" class="cta-button primary">Scopra La Nostra Storia</a>
      </div>
    </div>
  </section>

  <div class="about-features">
    <div class="about-feature">
      <div class="about-feature-icon">✅</div>
      <span class="about-feature-text">Guide Locali Esperte con Conoscenza Approfondita</span>
    </div>
    <div class="about-feature">
      <div class="about-feature-icon">🏅</div>
      <span class="about-feature-text">Formazione e Attrezzatura di Sicurezza Professionale</span>
    </div>
    <div class="about-feature">
      <div class="about-feature-icon">🛡️</div>
      <span class="about-feature-text">Tutti i Livelli di Abilità Sono Benvenuti</span>
    </div>
    <div class="about-feature">
      <div class="about-feature-icon">🌟</div>
      <span class="about-feature-text">Completamente Autorizzati e Assicurati</span>
    </div>
  </div>
  <div class="about-image"></div>

  <!-- Sezione Esplora Vernal -->
  <section id="explore-guides" style="padding:var(--section-padding);background:var(--light-sand);">
    <div class="container" style="max-width:var(--container-max);margin:0 auto;">
      <div class="section-header">
        <h2 class="section-title">Esplori Vernal</h2>
        <p class="section-subtitle">Pianifichi il Suo viaggio con le nostre guide locali — tutto ciò che deve sapere su Vernal, Utah</p>
      </div>
      <div class="related-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:18px;max-width:1000px;margin:0 auto;">
        <a href="/it/things-to-do/" class="related-card" style="background:white;border-radius:14px;padding:20px;text-decoration:none;border:1px solid rgba(212,118,78,0.1);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);display:block;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;font-weight:700;color:var(--burnt-orange);margin-bottom:6px;">Cosa Fare a Vernal</h4>
          <p style="font-size:0.88rem;color:var(--charcoal);opacity:0.7;line-height:1.5;margin:0;">La guida completa ad attività e attrazioni.</p>
        </a>
        <a href="/it/things-to-do/vernal-utah-attractions/" class="related-card" style="background:white;border-radius:14px;padding:20px;text-decoration:none;border:1px solid rgba(212,118,78,0.1);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);display:block;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;font-weight:700;color:var(--burnt-orange);margin-bottom:6px;">Le Migliori Attrazioni di Vernal</h4>
          <p style="font-size:0.88rem;color:var(--charcoal);opacity:0.7;line-height:1.5;margin:0;">Luoghi e siti da non perdere.</p>
        </a>
        <a href="/it/things-to-do/fun-things-to-do-vernal-utah-kids/" class="related-card" style="background:white;border-radius:14px;padding:20px;text-decoration:none;border:1px solid rgba(212,118,78,0.1);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);display:block;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;font-weight:700;color:var(--burnt-orange);margin-bottom:6px;">Attività per Famiglie</h4>
          <p style="font-size:0.88rem;color:var(--charcoal);opacity:0.7;line-height:1.5;margin:0;">Attività divertenti da fare con i bambini a Vernal.</p>
        </a>
        <a href="/it/things-to-do/" class="related-card" style="background:white;border-radius:14px;padding:20px;text-decoration:none;border:1px solid rgba(212,118,78,0.1);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);display:block;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;font-weight:700;color:var(--burnt-orange);margin-bottom:6px;">Attività all'Aperto</h4>
          <p style="font-size:0.88rem;color:var(--charcoal);opacity:0.7;line-height:1.5;margin:0;">Escursionismo, pesca, tour in UTV e altro ancora.</p>
        </a>
        <a href="/it/atv-trails-vernal-utah/" class="related-card" style="background:white;border-radius:14px;padding:20px;text-decoration:none;border:1px solid rgba(212,118,78,0.1);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);display:block;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;font-weight:700;color:var(--burnt-orange);margin-bottom:6px;">Sentieri ATV Vicino a Vernal</h4>
          <p style="font-size:0.88rem;color:var(--charcoal);opacity:0.7;line-height:1.5;margin:0;">Sistemi di sentieri fuoristrada e guida al terreno.</p>
        </a>
        <a href="/it/utv/side-by-side-rentals-vernal-utah/" class="related-card" style="background:white;border-radius:14px;padding:20px;text-decoration:none;border:1px solid rgba(212,118,78,0.1);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);display:block;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;font-weight:700;color:var(--burnt-orange);margin-bottom:6px;">Tour in Side-by-Side vs. Noleggi</h4>
          <p style="font-size:0.88rem;color:var(--charcoal);opacity:0.7;line-height:1.5;margin:0;">Perché i tour guidati sono meglio dei noleggi autonomi.</p>
        </a>
        <a href="/it/dinosaur-national-monument/" class="related-card" style="background:white;border-radius:14px;padding:20px;text-decoration:none;border:1px solid rgba(212,118,78,0.1);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);display:block;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;font-weight:700;color:var(--burnt-orange);margin-bottom:6px;">Tour al Monumento dei Dinosauri</h4>
          <p style="font-size:0.88rem;color:var(--charcoal);opacity:0.7;line-height:1.5;margin:0;">Tour in UTV vicino al monumento.</p>
        </a>
        <a href="/it/dinosaur-national-monument/visiting-dinosaur-national-monument/" class="related-card" style="background:white;border-radius:14px;padding:20px;text-decoration:none;border:1px solid rgba(212,118,78,0.1);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);display:block;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;font-weight:700;color:var(--burnt-orange);margin-bottom:6px;">Guida Definitiva a Dinosaur National Monument</h4>
          <p style="font-size:0.88rem;color:var(--charcoal);opacity:0.7;line-height:1.5;margin:0;">La guida completa per pianificare il viaggio — fossili, petroglifi, percorsi e altro ancora.</p>
        </a>
        <a href="/it/utv/group-utv-tours-vernal/" class="related-card" style="background:white;border-radius:14px;padding:20px;text-decoration:none;border:1px solid rgba(212,118,78,0.1);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);display:block;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;font-weight:700;color:var(--burnt-orange);margin-bottom:6px;">Tour di Gruppo e Privati</h4>
          <p style="font-size:0.88rem;color:var(--charcoal);opacity:0.7;line-height:1.5;margin:0;">Famiglie, riunioni, uscite aziendali.</p>
        </a>
      </div>
    </div>
  </section>

  <!-- CTA Fissa per Mobile -->
  <div class="mobile-sticky-cta">
    <button onclick="location.href='/it/booking/'">Prenoti Il Suo Giro Ora</button>
  </div>

  <script is:inline src="https://player.vimeo.com/api/player.js"></script>
  <script is:inline>
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    // Background images from data attributes
    document.querySelectorAll('[data-bg]').forEach(element => {
      element.style.backgroundImage = \`url('\${element.getAttribute('data-bg')}')\`;
      element.style.backgroundSize = 'cover';
      element.style.backgroundPosition = 'center';
    });

    // Scroll indicator fade
    window.addEventListener('scroll', () => {
      const scrollIndicator = document.querySelector('.scroll-indicator');
      if (scrollIndicator) scrollIndicator.style.opacity = window.pageYOffset > 100 ? '0' : '1';
    });

    // Carousel
    class Carousel {
      constructor() {
        this.track = document.querySelector('.carousel-track');
        this.slides = Array.from(document.querySelectorAll('.carousel-slide'));
        this.prevBtn = document.querySelector('.carousel-prev');
        this.nextBtn = document.querySelector('.carousel-next');
        this.indicatorsContainer = document.querySelector('.carousel-indicators');
        this.currentIndex = 0;
        this.autoPlayInterval = null;
        this.isTransitioning = false;
        this.init();
      }
      init() {
        this.createIndicators();
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        document.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowLeft') this.prevSlide();
          if (e.key === 'ArrowRight') this.nextSlide();
        });
        this.addTouchSupport();
        this.startAutoPlay();
        this.track.parentElement.parentElement.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.track.parentElement.parentElement.addEventListener('mouseleave', () => this.startAutoPlay());
      }
      createIndicators() {
        this.slides.forEach((_, index) => {
          const indicator = document.createElement('button');
          indicator.classList.add('carousel-indicator');
          if (index === 0) indicator.classList.add('active');
          indicator.addEventListener('click', () => this.goToSlide(index));
          this.indicatorsContainer.appendChild(indicator);
        });
        this.indicators = Array.from(this.indicatorsContainer.querySelectorAll('.carousel-indicator'));
      }
      updateCarousel() {
        if (this.isTransitioning) return;
        this.isTransitioning = true;
        this.track.style.transform = \`translateX(-\${this.currentIndex * 100}%)\`;
        this.slides.forEach((slide, index) => slide.classList.toggle('active', index === this.currentIndex));
        this.indicators.forEach((indicator, index) => indicator.classList.toggle('active', index === this.currentIndex));
        setTimeout(() => { this.isTransitioning = false; }, 500);
      }
      nextSlide() { this.currentIndex = (this.currentIndex + 1) % this.slides.length; this.updateCarousel(); }
      prevSlide() { this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length; this.updateCarousel(); }
      goToSlide(index) { this.currentIndex = index; this.updateCarousel(); }
      startAutoPlay() { this.autoPlayInterval = setInterval(() => this.nextSlide(), 5000); }
      stopAutoPlay() { if (this.autoPlayInterval) { clearInterval(this.autoPlayInterval); this.autoPlayInterval = null; } }
      addTouchSupport() {
        let touchStartX = 0;
        this.track.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; });
        this.track.addEventListener('touchend', (e) => {
          const diff = touchStartX - e.changedTouches[0].screenX;
          if (Math.abs(diff) > 50) diff > 0 ? this.nextSlide() : this.prevSlide();
        });
      }
    }
    if (document.querySelector('.carousel-track')) new Carousel();

    // Floating video
    function closeFloatingVideo() {
      document.getElementById('floatingVideo').style.display = 'none';
    }
    window.addEventListener('scroll', () => {
      const floatingVideo = document.getElementById('floatingVideo');
      if (window.pageYOffset > 300 && floatingVideo) floatingVideo.classList.add('visible');
    });

    // Scroll spy
    function updateActiveNavLink() {
      const sections = document.querySelectorAll('section[id]');
      const navLinks = document.querySelectorAll('.nav-menu > li > a[href^="#"]:not(.dropdown-toggle)');
      let currentSection = '';
      const scrollPosition = window.pageYOffset + 200;
      sections.forEach(section => {
        if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
          currentSection = section.getAttribute('id');
        }
      });
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === \`#\${currentSection}\`) link.classList.add('active');
      });
    }
    window.addEventListener('scroll', updateActiveNavLink);
    window.addEventListener('load', updateActiveNavLink);

    // Hero video play
    function playHeroVideo() {
      document.getElementById('videoPlayOverlay').classList.add('hidden');
      document.getElementById('heroVideoContainer').innerHTML = '<iframe src="https://www.youtube.com/embed/eFfvKxkiyzU?si=rAXO-MccKZ1-6GgK&autoplay=1" title="Adventure Tours Vernal — Guided UTV Tours in Vernal Utah" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>';
    }
  </script>


  <!-- Promozione Best Western Lodging -->
  <a href="https://bestwesternvernal.com" target="_blank" rel="noopener" class="bw-promo-badge" id="bwPromoBadge">
    <div class="bw-promo-badge-inner">
      <button class="bw-badge-close" onclick="event.preventDefault();event.stopPropagation();dismissBwBadge();return false;" aria-label="Chiudi promozione">&times;</button>
      <div class="bw-badge-text-wrap">
        <div class="bw-badge-eyebrow">
          <span class="pulse-dot"></span>
          Offerta Soggiorno e Avventura
        </div>
        <div class="bw-badge-offer">
          <span class="highlight">10% di Sconto</span> sull'Alloggio
        </div>
        <p class="bw-badge-detail">
          Prenoti presso <strong>Best Western Vernal</strong> &mdash; menzioni <strong>&ldquo;Adventure Tours&rdquo;</strong> quando chiama.
        </p>
        <div class="bw-badge-cta-row">
          <span class="bw-badge-button">Prenoti l'Alloggio &rarr;</span>
          <span class="bw-badge-logo-text">bestwesternvernal.com</span>
        </div>
      </div>
    </div>
  </a>

  <!-- Promozione High Class Limousine -->
  <a href="https://highclasslimousineservices.com/" target="_blank" rel="noopener" class="hcl-promo-badge" id="hclPromoBadge">
    <div class="hcl-promo-badge-inner">
      <button class="hcl-badge-close" onclick="event.preventDefault();event.stopPropagation();dismissHclBadge();return false;" aria-label="Chiudi promozione">&times;</button>
      <div class="hcl-badge-text-wrap">
        <div class="hcl-badge-eyebrow">
          <span class="pulse-dot"></span>
          Arrivi con Stile
        </div>
        <div class="hcl-badge-offer">
          <span class="highlight">High Class</span> Limousine
        </div>
        <p class="hcl-badge-detail">
          Matrimoni, feste di fine anno, aeroporto e serate in giro per tutto l'Uintah Basin. <strong>La Classe Non Si È Estinta.</strong>
        </p>
        <div class="hcl-badge-cta-row">
          <span class="hcl-badge-button">Viaggi con Stile &rarr;</span>
          <span class="hcl-badge-logo-text">highclasslimousineservices.com</span>
        </div>
      </div>
    </div>
  </a>

  <script is:inline>
    // Dismiss badge for this session
    function dismissBwBadge() {
  var badge = document.getElementById('bwPromoBadge');
  if (badge) badge.classList.add('dismissed');
}
    function dismissHclBadge() {
  var badge = document.getElementById('hclPromoBadge');
  if (badge) badge.classList.add('dismissed');
}
</script>
`;

const PT = `

  <!-- Bloco de Resumo IA -->
  <p class="page-summary" style="position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;" aria-hidden="false">
    A Adventure Tours Vernal oferece tours guiados em UTV side-by-side Kawasaki KRX 1000 em Vernal, Utah. As trilhas incluem Doc's Beach, Moonshine Arch, Ashley Gorge, Outlaw Trail e Asphalt Ridge. Os tours apresentam petróglifos, arte rupestre e ruínas antigas. $349 por máquina para um tour guiado de 3 horas (até 2 passageiros). $125 para ride-along com um guia. Mínimo de 3 pessoas. Até 12 convidados por tour em 6 máquinas. O operador de tours em UTV mais bem avaliado de Utah, com uma classificação de 5.0 estrelas em 82 avaliações no Google. Aberto todos os dias das 7h às 19h. Liga para (435) 219-9447 para reservar.
  </p>

  <!-- Secção Hero -->
  <div class="hero">
    <div class="trail-hero-video-bg">
  <iframe
    src="https://www.youtube.com/embed/BHOABkrNnnE?autoplay=1&mute=1&loop=1&playlist=BHOABkrNnnE&controls=0&showinfo=0&rel=0&playsinline=1"
    frameborder="0"
    allow="autoplay; encrypted-media"
    allowfullscreen>
  </iframe>
</div>
    <div class="hero-overlay"></div>

    <div class="hero-video-wrapper">
      <div class="video-frame-3d">
        <div class="video-frame-inner">
          <div class="video-play-overlay" id="videoPlayOverlay" onclick="playHeroVideo()">
            <img src="https://img.youtube.com/vi/eFfvKxkiyzU/maxresdefault.jpg" alt="Vê a Adventure Tours Vernal em ação — tours guiados em UTV em Vernal, Utah" class="video-thumbnail">
            <div class="play-overlay-content">
              <div class="play-icon-circle">▶</div>
              <span class="play-overlay-text">Clica para ver o vídeo</span>
            </div>
          </div>
          <div id="heroVideoContainer"></div>
        </div>
      </div>
    </div>

    <div class="hero-content">
      <h1 class="hero-title" style="font-size:clamp(1.8rem,4vw,3rem);font-weight:800;color:#fff;text-shadow:0 2px 12px rgba(0,0,0,0.5);margin-bottom:0.5rem;">
        Tours Guiados em UTV em Vernal, Utah
      </h1>
      <p class="hero-subtitle">Vive a emoção do backcountry de Utah com aventuras guiadas em Kawasaki KRX 1000 Side-by-Side</p>
      <div style="margin-top:14px;"><span style="display:inline-flex;align-items:center;gap:8px;padding:7px 15px;border:1px solid rgba(255,255,255,0.5);border-radius:999px;background:rgba(0,0,0,0.35);font-size:0.95rem;color:#fff;"><span aria-hidden="true" style="color:#f5c451;letter-spacing:1px;">★★★★★</span> <span><strong>${SITE.rating.value}</strong> &middot; ${SITE.rating.count} avaliações no Google</span></span></div>
    </div>

    <div class="scroll-indicator"><span></span></div>
  </div>

    <!-- CARTÕES DE PREÇOS -->
    <div class="pricing-section">
      <h2>Preços Simples e Transparentes</h2>
      <p>Sem taxas escondidas — só aventura. Mínimo de 3 pessoas por tour.</p>
      <div class="pricing-grid">
        <div class="pricing-card featured">
          <div class="pricing-label">Por Máquina</div>
          <div class="pricing-title">1–2 Passageiros, 1 KRX 1000</div>
          <div class="pricing-amount">$349</div>
          <div class="pricing-per">por máquina / tour guiado de 3 horas</div>
          <ul class="pricing-features">
            <li>Kawasaki KRX 1000 de 2 lugares</li>
            <li>Até 2 passageiros por máquina</li>
            <li>Guias locais especializados (Dave e Trudy)</li>
            <li>Escolha entre 5 sistemas de trilhas</li>
            <li>Amortecedores FOX 2.5 PODIUM LSC</li>
            <li>Briefing de segurança completo e equipamento</li>
          </ul>
          <a href="/pt/booking/" class="tour-book-btn" style="display:block;text-align:center;text-decoration:none;">Reserva Agora</a>
        </div>
        <div class="pricing-card">
          <div class="pricing-label">Extra Ride-Along</div>
          <div class="pricing-title">Anda com o Dave ou a Trudy</div>
          <div class="pricing-amount">$125</div>
          <div class="pricing-per">por passageiro / tour guiado de 3 horas</div>
          <ul class="pricing-features">
            <li>Adiciona uma 3ª pessoa ao teu grupo</li>
            <li>Vai como passageiro com um guia</li>
            <li>Requer o aluguer de pelo menos 1 máquina</li>
            <li>2 lugares de ride-along disponíveis por tour</li>
            <li>Toda a aventura, sem precisares de conduzir</li>
          </ul>
          <a href="/pt/booking/" class="tour-book-btn" style="display:block;text-align:center;text-decoration:none;">Reserva Agora</a>
        </div>
        <div class="pricing-card">
          <div class="pricing-label">Grupos</div>
          <div class="pricing-title">Até 12 Convidados</div>
          <div class="pricing-amount">Liga</div>
          <div class="pricing-per">preços personalizados para grupos</div>
          <ul class="pricing-features">
            <li>Até 6 máquinas disponíveis</li>
            <li>10 convidados em 5 máquinas + 2 ride-alongs</li>
            <li>Dave e Trudy guiam juntos</li>
            <li>Ideal para famílias e reuniões</li>
            <li>$99/hora por máquina para tempo adicional</li>
          </ul>
          <a href="tel:435-219-9447" class="tour-book-btn" style="display:block;text-align:center;text-decoration:none;">📞 (435) 219-9447</a>
        </div>
      </div>
    </div>

      <!-- Botão Único de Reserva abaixo de todas as trilhas -->
      <div style="text-align:center;margin-top:50px;">
        <a href="/pt/booking/" class="btn btn-primary" style="font-size:1.25rem;padding:22px 70px;">
          📅 Reserva a Tua Aventura
        </a>
        <p style="margin-top:14px;font-size:0.95rem;color:var(--charcoal);opacity:0.65;font-family:var(--font-body);">
          Vais escolher a tua trilha durante a reserva — aberto todos os dias das 7h às 19h
        </p>
      </div>

    </div>
  </section>

  <!-- Secção Porque Vernal -->
  <section id="why-vernal">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Porque Escolher Vernal?</h2>
        <p class="section-subtitle">Descobre o que faz deste canto de Utah um paraíso off-road</p>
      </div>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-image" style="background:#000;">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/PoCN4Lo9Lkk?si=CMj5hK0r2l5GeKFM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style="display:block;width:100%;height:100%;border:0;"></iframe>
          </div>
          <div class="feature-content">
            <h3 class="feature-title">Dinosaur National Monument</h3>
            <p class="feature-description">Percorre paisagens pré-históricas onde antigos gigantes outrora vagueavam, com acesso a sítios fósseis de classe mundial. <a href="/pt/dinosaur-national-monument/" style="color:var(--burnt-orange);font-weight:600;">Tours em UTV perto do monumento →</a></p>
          </div>
        </div>
        <div class="feature-card">
          <div class="feature-image" style="background:#000;">
            <iframe title="Video Embed" src="https://www.nps.gov/media/video/embed.htm?id=CD297DBD-5955-4AA8-BC53-1798793EC221" width="480" height="306" frameborder="0" scrolling="auto" allowfullscreen style="display:block;width:100%;height:100%;border:0;"></iframe>
          </div>
          <div class="feature-content">
            <h3 class="feature-title">Vestígios de Civilização Antiga</h3>
            <p class="feature-description">Descobre petróglifos, arte rupestre e ruínas — milhares de anos de história indígena preservados na pedra e nos canyons da Uintah Basin. <a href="/pt/dinosaur-national-monument/petroglyphs-rock-art-vernal/" style="color:var(--burnt-orange);font-weight:600;">Explora os sítios de arte rupestre →</a></p>
          </div>
        </div>
        <div class="feature-card">
          <div class="feature-image" style="background:#000;">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/2fdxwBHky_Y?si=Mio585KlceDKRTHT" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style="display:block;width:100%;height:100%;border:0;"></iframe>
          </div>
          <div class="feature-content">
            <h3 class="feature-title">Trilhas Escondidas</h3>
            <p class="feature-description">Acede a rotas secretas e favoritas locais conhecidas apenas pelos nativos de Vernal — paisagens que não vais encontrar em mais lado nenhum. <a href="/pt/utv/backcountry-tours-vernal-utah/" style="color:var(--burnt-orange);font-weight:600;">Detalhes do tour no backcountry →</a></p>
          </div>
        </div>
        <div class="feature-card">
          <div class="feature-image" style="background:#000;">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/hmKWG8GZBiw?si=Nq5dULfRSYvpRsAQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style="display:block;width:100%;height:100%;border:0;"></iframe>
          </div>
          <div class="feature-content">
            <h3 class="feature-title">Arcos Cénicos</h3>
            <p class="feature-description">Descobre arcos naturais de arenito e formações que rivalizam com os parques mais famosos de Utah, sem as multidões. <a href="/pt/utv/best-utv-trails-vernal/" style="color:var(--burnt-orange);font-weight:600;">Vê todos os 5 sistemas de trilhas →</a></p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Secção Veículos -->
  <section id="vehicles">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">A Nossa Frota</h2>
        <p class="section-subtitle">6 máquinas Kawasaki KRX 1000 disponíveis — mantidas para segurança e desempenho</p>
      </div>
      <div class="vehicles-grid">
        <div class="vehicle-card">
          <div class="vehicle-image" data-bg="/images/9.webp"></div>
          <div class="vehicle-content">
            <h3 class="vehicle-name">Kawasaki KRX 1000</h3>
            <ul class="vehicle-specs">
              <li><span class="spec-label">Tamanho da Frota:</span><span class="spec-value">6 Máquinas Disponíveis</span></li>
              <li><span class="spec-label">Passageiros:</span><span class="spec-value">2 Lugares</span></li>
              <li><span class="spec-label">Suspensão:</span><span class="spec-value">Amortecedores FOX 2.5 PODIUM LSC</span></li>
              <li><span class="spec-label">Ideal Para:</span><span class="spec-value">Rock Crawling e Conforto</span></li>
              <li><span class="spec-label">Segurança:</span><span class="spec-value">Gaiola de Proteção Completa + Direção Assistida</span></li>
              <li><span class="spec-label">Capacidade:</span><span class="spec-value">Até 12 convidados por tour</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>

 <!-- Secção Galeria -->
  <section id="gallery">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Galeria de Fotos</h2>
        <p class="section-subtitle">Vê a aventura que te espera</p>
      </div>
      <div class="carousel-container">
        <div class="carousel-main">
          <button class="carousel-btn carousel-prev" aria-label="Imagem anterior"><span>‹</span></button>
          <div class="carousel-track-container">
            <div class="carousel-track">
              <div class="carousel-slide active"><img src="/images/1a.webp" alt="Side-by-side UTV parked in a sandstone alcove on an Adventure Tours Vernal UTV tour"><div class="carousel-caption">Exploring a Sandstone Alcove</div></div>
              <div class="carousel-slide"><img src="/images/1.webp" alt="Lineup of Kawasaki KRX 1000 side-by-sides staged before a guided UTV tour in Vernal Utah"><div class="carousel-caption">UTV Lineup Staging</div></div>
              <div class="carousel-slide"><img src="/images/2.webp" alt="Blue side-by-side UTV kicking up dust on a desert trail near Vernal Utah"><div class="carousel-caption">Kicking Up Dust</div></div>
              <div class="carousel-slide"><img src="/images/3.webp" alt="Group riding side-by-side UTVs on a backcountry trail near Vernal Utah"><div class="carousel-caption">Group on the Trail</div></div>
              <div class="carousel-slide"><img src="/images/4.webp" alt="Riders resting under a sandstone overhang at sunset on an Adventure Tours Vernal UTV tour"><div class="carousel-caption">Sunset Rock Overhang</div></div>
              <div class="carousel-slide"><img src="/images/5.webp" alt="Looking out from inside a sandstone cave on a guided UTV tour near Vernal Utah"><div class="carousel-caption">Inside a Sandstone Cave</div></div>
              <div class="carousel-slide"><img src="/images/6.webp" alt="Family posing inside a sandstone cave on an Adventure Tours Vernal UTV tour"><div class="carousel-caption">Family Cave Photo</div></div>
              <div class="carousel-slide"><img src="/images/7.webp" alt="UTV tire perched on a canyon rim overlooking Ashley Gorge near Vernal Utah"><div class="carousel-caption">On the Canyon's Edge</div></div>
              <div class="carousel-slide"><img src="/images/3a.webp" alt="Desert badlands landscape at sunset on a backcountry UTV tour near Vernal Utah"><div class="carousel-caption">Desert Badlands Sunset</div></div>
              <div class="carousel-slide"><img src="/images/8.webp" alt="Side-by-side UTV climbing a slickrock ridge on a guided tour near Vernal Utah"><div class="carousel-caption">Climbing a Slickrock Ridge</div></div>
              <div class="carousel-slide"><img src="/images/8a.webp" alt="Blue side-by-side UTV speeding through the high desert near Vernal Utah"><div class="carousel-caption">Speeding Through the Desert</div></div>
              <div class="carousel-slide"><img src="/images/9.webp" alt="Kawasaki KRX 1000 side-by-sides lined up under a rock overhang near Vernal Utah"><div class="carousel-caption">Lineup Under the Overhang</div></div>
              <div class="carousel-slide"><img src="/images/6a.webp" alt="Group stopped with their side-by-side UTVs along a backcountry trail near Vernal Utah"><div class="carousel-caption">Trailside Group Stop</div></div>
              <div class="carousel-slide"><img src="/images/10.webp" alt="Side-by-side UTV beside a slickrock canyon vista on a guided tour near Vernal Utah"><div class="carousel-caption">Slickrock Canyon Vista</div></div>
              <div class="carousel-slide"><img src="/images/11.webp" alt="Side-by-side UTV parked inside a sandstone cave near Vernal Utah"><div class="carousel-caption">UTV Inside the Cave</div></div>
              <div class="carousel-slide"><img src="/images/12.webp" alt="Towering sandstone cave wall on an Adventure Tours Vernal backcountry tour"><div class="carousel-caption">Towering Cave Wall</div></div>
              <div class="carousel-slide"><img src="/images/13.webp" alt="Rider leaping off a cliff into the water on an Adventure Tours Vernal outing near Vernal Utah"><div class="carousel-caption">Cliff Jumping Splash</div></div>
              <div class="carousel-slide"><img src="/images/14.webp" alt="Convoy of side-by-side UTVs on a mountain trail during a guided tour near Vernal Utah"><div class="carousel-caption">Convoy on the Mountain Trail</div></div>
              <div class="carousel-slide"><img src="/images/15a.webp" alt="Side-by-side UTV on slickrock at dusk near Dinosaur National Monument, Vernal Utah"><div class="carousel-caption">Dusk Desert Ride</div></div>
              <div class="carousel-slide"><img src="/images/35a.webp" alt="Three Kawasaki KRX 1000 side-by-sides silhouetted against a sunburst at sunset near Vernal Utah"><div class="carousel-caption">Sunset Trio Silhouette</div></div>
              <div class="carousel-slide"><img src="/images/16a.webp" alt="Riders standing atop slickrock beside their Kawasaki KRX 1000 side-by-sides near Vernal Utah"><div class="carousel-caption">Riders Atop the Slickrock</div></div>
              <div class="carousel-slide"><img src="/images/17a.webp" alt="Two side-by-side UTVs parked on slickrock near Vernal Utah"><div class="carousel-caption">Two UTVs on Slickrock</div></div>
              <div class="carousel-slide"><img src="/images/18a.webp" alt="Mud-covered side-by-side UTVs on slickrock after a guided tour near Vernal Utah"><div class="carousel-caption">Muddy UTVs on the Rock</div></div>
              <div class="carousel-slide"><img src="/images/19a.webp" alt="Muddy side-by-side UTV on a rock dome at an overlook near Vernal Utah"><div class="carousel-caption">Muddy UTV at the Overlook</div></div>
              <div class="carousel-slide"><img src="/images/20.webp" alt="Blue side-by-side UTV on slickrock high above the canyon near Vernal Utah"><div class="carousel-caption">Blue UTV on Slickrock</div></div>
              <div class="carousel-slide"><img src="/images/21a.webp" alt="Side-by-side UTVs silhouetted at sunset on a guided tour near Vernal Utah"><div class="carousel-caption">UTVs at Sunset</div></div>
              <div class="carousel-slide"><img src="/images/22a.webp" alt="Side-by-side UTV silhouetted against a sunburst on a sunset ride through the Utah desert backcountry"><div class="carousel-caption">Sunburst Silhouette</div></div>
              <div class="carousel-slide"><img src="/images/23a.webp" alt="Two side-by-side UTVs perched on a boulder on a backcountry tour near Vernal Utah"><div class="carousel-caption">Twin UTVs on a Boulder</div></div>
              <div class="carousel-slide"><img src="/images/23.webp" alt="Hikers exploring a sandstone arch on an Adventure Tours Vernal outing in Vernal Utah"><div class="carousel-caption">Hikers at the Sandstone Arch</div></div>
              <div class="carousel-slide"><img src="/images/24.webp" alt="Side-by-side UTVs atop a large boulder with a desert view near Vernal Utah"><div class="carousel-caption">UTVs Atop the Boulder</div></div>
              <div class="carousel-slide"><img src="/images/25.webp" alt="Muddy side-by-side UTVs overlooking the valley on a backcountry trail near Vernal Utah"><div class="carousel-caption">Muddy UTVs With a View</div></div>
              <div class="carousel-slide"><img src="/images/26.webp" alt="Side-by-side UTVs on a ridgetop at dusk near Vernal Utah"><div class="carousel-caption">Ridgetop UTVs at Dusk</div></div>
              <div class="carousel-slide"><img src="/images/27.webp" alt="Side-by-side UTVs on a rock ridge formation on a guided tour in Vernal Utah"><div class="carousel-caption">UTVs on the Rock Ridge</div></div>
              <div class="carousel-slide"><img src="/images/28.webp" alt="Side-by-side UTVs in the high desert on a backcountry tour near Vernal Utah"><div class="carousel-caption">UTVs in the High Desert</div></div>
              <div class="carousel-slide"><img src="/images/29.webp" alt="Side-by-side UTV at a slickrock dome overlook near Vernal Utah"><div class="carousel-caption">Slickrock Dome Overlook</div></div>
              <div class="carousel-slide"><img src="/images/30.webp" alt="Canyon country overlook on a backcountry UTV tour near Vernal Utah"><div class="carousel-caption">Canyon Country Overlook</div></div>
              <div class="carousel-slide"><img src="/images/31.webp" alt="Side-by-side UTV climbing the slickrock on a guided tour near Vernal Utah"><div class="carousel-caption">Climbing the Slickrock</div></div>
              <div class="carousel-slide"><img src="/images/32.webp" alt="Side-by-side UTV descending a steep rock face on a guided tour near Vernal Utah"><div class="carousel-caption">UTV Descending the Rock</div></div>
              <div class="carousel-slide"><img src="/images/33.webp" alt="Side-by-side UTV cresting boulders on a backcountry trail near Vernal Utah"><div class="carousel-caption">UTV Cresting the Boulders</div></div>
              <div class="carousel-slide"><img src="/images/34.webp" alt="Green side-by-side UTV on a desert trail near Vernal Utah"><div class="carousel-caption">Green UTV on the Trail</div></div>
              <div class="carousel-slide"><img src="/images/35.webp" alt="Side-by-side UTVs climbing slickrock on a guided tour near Vernal Utah"><div class="carousel-caption">UTVs Climbing Slickrock</div></div>
              <div class="carousel-slide"><img src="/images/36.webp" alt="Side-by-side UTVs on the slickrock on a backcountry tour near Vernal Utah"><div class="carousel-caption">UTVs on the Slickrock</div></div>
              <div class="carousel-slide"><img src="/images/37.webp" alt="Side-by-side UTVs climbing a sandstone ridge near Vernal Utah"><div class="carousel-caption">Climbing a Sandstone Ridge</div></div>
              <div class="carousel-slide"><img src="/images/39a.webp" alt="Side-by-side UTV parked below a desert butte near Vernal Utah"><div class="carousel-caption">Parked at the Butte</div></div>
              <div class="carousel-slide"><img src="/images/39.webp" alt="View through a rock arch toward a desert butte near Vernal Utah"><div class="carousel-caption">Through the Rock Arch</div></div>
              <div class="carousel-slide"><img src="/images/40.webp" alt="Muddy side-by-side UTV climbing rocks on a backcountry tour near Vernal Utah"><div class="carousel-caption">Muddy Rig Climbing</div></div>
              <div class="carousel-slide"><img src="/images/41.webp" alt="Side-by-side UTVs parked under a natural rock arch near Vernal Utah"><div class="carousel-caption">Side-by-Sides Under the Arch</div></div>
              <div class="carousel-slide"><img src="/images/42.webp" alt="Two side-by-side UTVs on a canyon trail through the Utah backcountry"><div class="carousel-caption">Canyon Trail Duo</div></div>
              <div class="carousel-slide"><img src="/images/43.webp" alt="Side-by-side UTV on a steep slickrock descent near Vernal Utah"><div class="carousel-caption">Steep Slickrock Descent</div></div>
              <div class="carousel-slide"><img src="/images/44.webp" alt="Guided side-by-side UTV rock crawl through a sandstone wash near Vernal Utah"><div class="carousel-caption">Guided Rock Crawl</div></div>
              <div class="carousel-slide"><img src="/images/45.webp" alt="Desert overlook at dusk on a backcountry UTV tour near Vernal Utah"><div class="carousel-caption">Overlook at Dusk</div></div>
              <div class="carousel-slide"><img src="/images/46.webp" alt="Side-by-side UTV tackling a deep rut on a backcountry trail near Vernal Utah"><div class="carousel-caption">Tackling the Rut</div></div>
              <div class="carousel-slide"><img src="/images/47.webp" alt="Side-by-side UTV splashing through a river crossing near Vernal Utah"><div class="carousel-caption">Splashing River Crossing</div></div>
              <div class="carousel-slide"><img src="/images/48.webp" alt="Doc's Beach trailhead sign on an Adventure Tours Vernal UTV tour near Vernal Utah"><div class="carousel-caption">Doc's Beach Trails</div></div>
              <div class="carousel-slide"><img src="/images/49.webp" alt="Fleet of Kawasaki KRX 1000 side-by-sides staged for a guided tour in Vernal Utah"><div class="carousel-caption">Staged Fleet Lineup</div></div>
              <div class="carousel-slide"><img src="/images/50.webp" alt="Tour group stopped with their side-by-side UTVs near Vernal Utah"><div class="carousel-caption">Group Trail Stop</div></div>
              <div class="carousel-slide"><img src="/images/51.webp" alt="Tour group with Kawasaki KRX 1000 side-by-sides on a ridge near Vernal Utah"><div class="carousel-caption">Tour Group Photo</div></div>
              <div class="carousel-slide"><img src="/images/52.webp" alt="Long line of side-by-side UTVs staged and ready for a guided tour near Vernal Utah"><div class="carousel-caption">Lined Up and Ready</div></div>
              <div class="carousel-slide"><img src="/images/53.webp" alt="Fleet of side-by-side UTVs staged on a hilltop near Vernal Utah"><div class="carousel-caption">Fleet at the Hilltop</div></div>
              <div class="carousel-slide"><img src="/images/54a.webp" alt="Side-by-side UTV charging through a muddy backcountry trail near Vernal Utah"><div class="carousel-caption">Muddy Trail Charge</div></div>
              <div class="carousel-slide"><img src="/images/55.webp" alt="Green Kawasaki side-by-side UTV crossing a muddy rut near Vernal Utah"><div class="carousel-caption">Green Machine in the Mud</div></div>
              <div class="carousel-slide"><img src="/images/56.webp" alt="Tour group gathered under a rock overhang with their side-by-side UTVs near Vernal Utah"><div class="carousel-caption">Group Under the Overhang</div></div>
              <div class="carousel-slide"><img src="/images/57a.webp" alt="Side-by-side UTVs parked at a cliffside on a guided tour near Vernal Utah"><div class="carousel-caption">UTVs at the Cliffside</div></div>
              <div class="carousel-slide"><img src="/images/58a.webp" alt="Rocky trail vista on a backcountry UTV tour near Vernal Utah"><div class="carousel-caption">Rock Trail Vista</div></div>
              <div class="carousel-slide"><img src="/images/58.webp" alt="Rider jumping off a cliff for a cool-down on an Adventure Tours Vernal outing near Vernal Utah"><div class="carousel-caption">Cliff Jump Cool Down</div></div>
              <div class="carousel-slide"><img src="/images/59.webp" alt="Side-by-side UTVs staged below a slickrock dome near Vernal Utah"><div class="carousel-caption">UTVs Staged Below</div></div>
              <div class="carousel-slide"><img src="/images/60.webp" alt="Blue side-by-side UTV conquering a slickrock dome with a guide near Vernal Utah"><div class="carousel-caption">Conquering the Slickrock</div></div>
              <div class="carousel-slide"><img src="/images/61.webp" alt="Three side-by-side UTVs rock crawling through the Utah backcountry"><div class="carousel-caption">Rock Crawling Trio</div></div>
              <div class="carousel-slide"><img src="/images/62a.webp" alt="Riders exploring cliff dwellings on an Adventure Tours Vernal UTV tour"><div class="carousel-caption">Exploring Cliff Dwellings</div></div>
              <div class="carousel-slide"><img src="/images/42a.webp" alt="Large natural sandstone arch above the valley on a guided UTV tour near Vernal Utah"><div class="carousel-caption">Natural Sandstone Arch</div></div>
              <div class="carousel-slide"><img src="/images/63.webp" alt="Tour group at a rock arch at sunset near Vernal Utah"><div class="carousel-caption">Sunset Arch Crew</div></div>
              <div class="carousel-slide"><img src="/images/64.webp" alt="Inside a sandstone cave on an Adventure Tours Vernal backcountry tour"><div class="carousel-caption">Inside the Cave</div></div>
              <div class="carousel-slide"><img src="/images/65a.webp" alt="Side-by-side UTV on a slickrock summit climb near Vernal Utah"><div class="carousel-caption">Slickrock Summit Climb</div></div>
              <div class="carousel-slide"><img src="/images/65.webp" alt="Side-by-side UTV on a river crossing adventure near Vernal Utah"><div class="carousel-caption">River Crossing Adventure</div></div>
              <div class="carousel-slide"><img src="/images/66.webp" alt="Side-by-side UTV parked at a canyon overlook near Vernal Utah"><div class="carousel-caption">Parked Machine Profile</div></div>
              <div class="carousel-slide"><img src="/images/67.webp" alt="Side-by-side UTV sending it over a sand dune near Vernal Utah"><div class="carousel-caption">Sand Dune Send</div></div>
              <div class="carousel-slide"><img src="/images/68.webp" alt="Side-by-side UTV parked beside a sandstone arch near Vernal Utah"><div class="carousel-caption">Parked at the Arch</div></div>
              <div class="carousel-slide"><img src="/images/70.webp" alt="Golden sandstone arch on a backcountry UTV tour near Vernal Utah"><div class="carousel-caption">Golden Rock Arch</div></div>
              <div class="carousel-slide"><img src="/images/71.webp" alt="Window opening in a sandstone cave near Vernal Utah"><div class="carousel-caption">Sandstone Cave Window</div></div>
              <div class="carousel-slide"><img src="/images/72.webp" alt="Trail along a towering canyon wall near Vernal Utah"><div class="carousel-caption">Canyon Wall Trail</div></div>
              <div class="carousel-slide"><img src="/images/73.webp" alt="Side-by-side UTVs parked under a sandstone arch near Vernal Utah"><div class="carousel-caption">UTVs Under the Arch</div></div>
              <div class="carousel-slide"><img src="/images/74.webp" alt="Interior of a sandstone cave on an Adventure Tours Vernal tour near Vernal Utah"><div class="carousel-caption">Cave Interior View</div></div>
              <div class="carousel-slide"><img src="/images/75.webp" alt="Towering rock overhang on a backcountry UTV tour near Vernal Utah"><div class="carousel-caption">Towering Rock Overhang</div></div>
              <div class="carousel-slide"><img src="/images/76.webp" alt="Three side-by-side UTVs on the canyon rim near Vernal Utah"><div class="carousel-caption">Three UTVs on the Canyon Rim</div></div>
              <div class="carousel-slide"><img src="/images/77.webp" alt="Couple posing at a cliff edge overlooking the canyon near Vernal Utah"><div class="carousel-caption">Couple at the Cliff Edge</div></div>
              <div class="carousel-slide"><img src="/images/78.webp" alt="Autumn canyon overlook on a backcountry UTV trail near Vernal Utah"><div class="carousel-caption">Autumn Canyon Overlook</div></div>
              <div class="carousel-slide"><img src="/images/79.webp" alt="Side-by-side UTV on an aspen-lined trail near Vernal Utah"><div class="carousel-caption">Aspen Trail Ride</div></div>
              <div class="carousel-slide"><img src="/images/80.webp" alt="Side-by-side UTV on a slickrock descent near Vernal Utah"><div class="carousel-caption">Slickrock Descent</div></div>
              <div class="carousel-slide"><img src="/images/81.webp" alt="Golden aspen trail on a guided side-by-side adventure near Vernal Utah"><div class="carousel-caption">Golden Aspen Trail</div></div>
              <div class="carousel-slide"><img src="/images/82.webp" alt="Side-by-side UTVs above the canyon on a backcountry tour near Vernal Utah"><div class="carousel-caption">UTVs Above the Canyon</div></div>
              <div class="carousel-slide"><img src="/images/83.webp" alt="View through a sandstone arch on an Adventure Tours Vernal tour near Vernal Utah"><div class="carousel-caption">Through the Arch</div></div>
              <div class="carousel-slide"><img src="/images/84.webp" alt="Side-by-side UTVs on slickrock under a stormy sky near Vernal Utah"><div class="carousel-caption">Slickrock Under the Storm</div></div>
              <div class="carousel-slide"><img src="/images/38.webp" alt="Blue side-by-side UTV kicking up dust on a desert trail near Vernal Utah"><div class="carousel-caption">Desert Dust Trail</div></div>
              <div class="carousel-slide"><img src="/images/85.webp" alt="Inside a sandstone cave looking out a window opening near Vernal Utah"><div class="carousel-caption">Inside a Sandstone Cave</div></div>
              <div class="carousel-slide"><img src="/images/86.webp" alt="Side-by-side UTVs at a mountaintop staging point near Vernal Utah"><div class="carousel-caption">Mountaintop Staging Point</div></div>
              <div class="carousel-slide"><img src="/images/87.webp" alt="Three side-by-side UTVs lined up on a guided tour near Vernal Utah"><div class="carousel-caption">Three UTVs Lined Up</div></div>
              <div class="carousel-slide"><img src="/images/99.webp" alt="Slickrock ridge view on a backcountry UTV tour near Vernal Utah"><div class="carousel-caption">Slickrock Ridge View</div></div>
              <div class="carousel-slide"><img src="/images/90.webp" alt="Side-by-side UTV climbing the slickrock near Vernal Utah"><div class="carousel-caption">Climbing the Slickrock</div></div>
              <div class="carousel-slide"><img src="/images/91.webp" alt="Side-by-side UTV on a slickrock climb under a stormy sky near Vernal Utah"><div class="carousel-caption">Stormy Slickrock Climb</div></div>
              <div class="carousel-slide"><img src="/images/92.webp" alt="Side-by-side UTV throwing dust on a desert trail near Vernal Utah"><div class="carousel-caption">Airborne Dust Trail</div></div>
              <div class="carousel-slide"><img src="/images/93.webp" alt="Side-by-side UTV on a steep ledge climb near Vernal Utah"><div class="carousel-caption">Steep Ledge Climb</div></div>
              <div class="carousel-slide"><img src="/images/94.webp" alt="Side-by-side UTV spraying sand through a turn near Vernal Utah"><div class="carousel-caption">Sand Spray Turn</div></div>
              <div class="carousel-slide"><img src="/images/95.webp" alt="Side-by-side UTV flying an American flag at rest near Vernal Utah"><div class="carousel-caption">American Flag UTV</div></div>
              <div class="carousel-slide"><img src="/images/96.webp" alt="Side-by-side UTV at a cliff edge at dusk near Vernal Utah"><div class="carousel-caption">Cliff Edge at Dusk</div></div>
              <div class="carousel-slide"><img src="/images/97.webp" alt="Side-by-side UTV on a ridgeline at twilight in the Utah desert backcountry"><div class="carousel-caption">Ridgeline at Twilight</div></div>
            </div>
          </div>
          <button class="carousel-btn carousel-next" aria-label="Próxima imagem"><span>›</span></button>
        </div>
        <div class="carousel-indicators"></div>
        <div class="carousel-thumbnails"></div>
      </div>
    </div>
  </section>

  <!-- Secção Reserva -->
  <section id="booking">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Pronto para a Aventura?</h2>
        <p class="section-subtitle">Reserva online instantaneamente ou liga-nos — estamos aqui todos os dias das 7h às 19h</p>
      </div>
      <div class="booking-container">
        <div class="phone-cta-wrapper">

          <!-- Botão de Reserva Online -->
          <div style="margin-bottom:35px;">
            <a href="/pt/booking/" class="btn btn-primary" style="font-size:1.2rem;padding:20px 60px;">
              📅 Reserva a Tua Aventura Online
            </a>
            <p style="margin-top:12px;font-size:0.95rem;color:var(--charcoal);opacity:0.7;font-family:var(--font-body);">
              Escolhe a tua trilha, data e hora — confirmação instantânea
            </p>
          </div>

          <!-- Divisor -->
          <div style="display:flex;align-items:center;gap:20px;margin:10px 0 30px;">
            <div style="flex:1;height:1px;background:rgba(212,118,78,0.15);"></div>
            <span style="font-family:var(--font-heading);font-weight:700;color:var(--charcoal);opacity:0.5;font-size:0.9rem;">OU LIGA-NOS</span>
            <div style="flex:1;height:1px;background:rgba(212,118,78,0.15);"></div>
          </div>

          <!-- Telefone -->
          <div class="phone-icon">📞</div>
          <h3 class="phone-cta-title">Liga Para Reservar o Teu Tour</h3>
          <a href="tel:435-219-9447" class="phone-number-display">(435) 219-9447</a>
          <p class="phone-cta-subtitle">Aberto Todos os Dias • das 7h às 19h (Hora das Montanhas Rochosas)</p>

          <div class="phone-benefits">
            <div class="phone-benefit"><span class="benefit-icon">✓</span><span>Confirmação Instantânea</span></div>
            <div class="phone-benefit"><span class="benefit-icon">✓</span><span>Guias Locais Especializados</span></div>
            <div class="phone-benefit"><span class="benefit-icon">✓</span><span>Horários Flexíveis</span></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Secção CTA Sobre Nós -->
  <section id="about">
    <div class="container">
      <div class="about-cta-simple">
        <h2 class="section-title">Conhece a Família Wilson</h2>
        <p class="section-subtitle">De propriedade local, focada na segurança, apaixonada pela aventura desde o primeiro dia</p>
        <p>Descobre a nossa história, a nossa paixão pela Uintah Basin, e porque a Adventure Tours Vernal é a principal empresa de tours em UTV em Vernal, Utah.</p>
        <a href="/pt/about/" class="cta-button primary">Descobre a Nossa História</a>
      </div>
    </div>
  </section>

  <div class="about-features">
    <div class="about-feature">
      <div class="about-feature-icon">✅</div>
      <span class="about-feature-text">Guias Locais Especializados com Conhecimento Profundo</span>
    </div>
    <div class="about-feature">
      <div class="about-feature-icon">🏅</div>
      <span class="about-feature-text">Treino de Segurança Profissional e Equipamento</span>
    </div>
    <div class="about-feature">
      <div class="about-feature-icon">🛡️</div>
      <span class="about-feature-text">Todos os Níveis de Experiência São Bem-Vindos</span>
    </div>
    <div class="about-feature">
      <div class="about-feature-icon">🌟</div>
      <span class="about-feature-text">Totalmente Licenciada e Segurada</span>
    </div>
  </div>
  <div class="about-image"></div>

  <!-- Secção Explora os Guias de Vernal -->
  <section id="explore-guides" style="padding:var(--section-padding);background:var(--light-sand);">
    <div class="container" style="max-width:var(--container-max);margin:0 auto;">
      <div class="section-header">
        <h2 class="section-title">Explora Vernal</h2>
        <p class="section-subtitle">Planeia a tua viagem com os nossos guias locais — tudo o que precisas de saber sobre Vernal, Utah</p>
      </div>
      <div class="related-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:18px;max-width:1000px;margin:0 auto;">
        <a href="/pt/things-to-do/" class="related-card" style="background:white;border-radius:14px;padding:20px;text-decoration:none;border:1px solid rgba(212,118,78,0.1);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);display:block;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;font-weight:700;color:var(--burnt-orange);margin-bottom:6px;">O Que Fazer em Vernal</h4>
          <p style="font-size:0.88rem;color:var(--charcoal);opacity:0.7;line-height:1.5;margin:0;">O guia completo de atividades e atrações.</p>
        </a>
        <a href="/pt/things-to-do/vernal-utah-attractions/" class="related-card" style="background:white;border-radius:14px;padding:20px;text-decoration:none;border:1px solid rgba(212,118,78,0.1);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);display:block;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;font-weight:700;color:var(--burnt-orange);margin-bottom:6px;">Melhores Atrações de Vernal</h4>
          <p style="font-size:0.88rem;color:var(--charcoal);opacity:0.7;line-height:1.5;margin:0;">Locais imperdíveis para visitar.</p>
        </a>
        <a href="/pt/things-to-do/fun-things-to-do-vernal-utah-kids/" class="related-card" style="background:white;border-radius:14px;padding:20px;text-decoration:none;border:1px solid rgba(212,118,78,0.1);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);display:block;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;font-weight:700;color:var(--burnt-orange);margin-bottom:6px;">Atividades em Família</h4>
          <p style="font-size:0.88rem;color:var(--charcoal);opacity:0.7;line-height:1.5;margin:0;">Coisas divertidas para fazer com crianças em Vernal.</p>
        </a>
        <a href="/pt/things-to-do/" class="related-card" style="background:white;border-radius:14px;padding:20px;text-decoration:none;border:1px solid rgba(212,118,78,0.1);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);display:block;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;font-weight:700;color:var(--burnt-orange);margin-bottom:6px;">Atividades ao Ar Livre</h4>
          <p style="font-size:0.88rem;color:var(--charcoal);opacity:0.7;line-height:1.5;margin:0;">Caminhadas, pesca, tours em UTV, e muito mais.</p>
        </a>
        <a href="/pt/atv-trails-vernal-utah/" class="related-card" style="background:white;border-radius:14px;padding:20px;text-decoration:none;border:1px solid rgba(212,118,78,0.1);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);display:block;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;font-weight:700;color:var(--burnt-orange);margin-bottom:6px;">Trilhas de ATV Perto de Vernal</h4>
          <p style="font-size:0.88rem;color:var(--charcoal);opacity:0.7;line-height:1.5;margin:0;">Sistemas de trilhas off-road e guia de terreno.</p>
        </a>
        <a href="/pt/utv/side-by-side-rentals-vernal-utah/" class="related-card" style="background:white;border-radius:14px;padding:20px;text-decoration:none;border:1px solid rgba(212,118,78,0.1);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);display:block;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;font-weight:700;color:var(--burnt-orange);margin-bottom:6px;">Tours em Side-by-Side vs. Aluguer</h4>
          <p style="font-size:0.88rem;color:var(--charcoal);opacity:0.7;line-height:1.5;margin:0;">Porque os tours guiados são melhores do que aluguer autónomo.</p>
        </a>
        <a href="/pt/dinosaur-national-monument/" class="related-card" style="background:white;border-radius:14px;padding:20px;text-decoration:none;border:1px solid rgba(212,118,78,0.1);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);display:block;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;font-weight:700;color:var(--burnt-orange);margin-bottom:6px;">Tours ao Monumento dos Dinossauros</h4>
          <p style="font-size:0.88rem;color:var(--charcoal);opacity:0.7;line-height:1.5;margin:0;">Tours em UTV perto do monumento.</p>
        </a>
        <a href="/pt/dinosaur-national-monument/visiting-dinosaur-national-monument/" class="related-card" style="background:white;border-radius:14px;padding:20px;text-decoration:none;border:1px solid rgba(212,118,78,0.1);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);display:block;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;font-weight:700;color:var(--burnt-orange);margin-bottom:6px;">Guia Definitivo do Dinosaur National Monument</h4>
          <p style="font-size:0.88rem;color:var(--charcoal);opacity:0.7;line-height:1.5;margin:0;">O guia completo para planear a tua viagem — fósseis, petróglifos, passeios de carro e muito mais.</p>
        </a>
        <a href="/pt/utv/group-utv-tours-vernal/" class="related-card" style="background:white;border-radius:14px;padding:20px;text-decoration:none;border:1px solid rgba(212,118,78,0.1);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);display:block;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;font-weight:700;color:var(--burnt-orange);margin-bottom:6px;">Tours em Grupo e Privados</h4>
          <p style="font-size:0.88rem;color:var(--charcoal);opacity:0.7;line-height:1.5;margin:0;">Famílias, reuniões, eventos empresariais.</p>
        </a>
      </div>
    </div>
  </section>

  <!-- CTA Fixo para Mobile -->
  <div class="mobile-sticky-cta">
    <button onclick="location.href='/pt/booking/'">Reserva o Teu Passeio Agora</button>
  </div>

  <script is:inline src="https://player.vimeo.com/api/player.js"></script>
  <script is:inline>
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    // Background images from data attributes
    document.querySelectorAll('[data-bg]').forEach(element => {
      element.style.backgroundImage = \`url('\${element.getAttribute('data-bg')}')\`;
      element.style.backgroundSize = 'cover';
      element.style.backgroundPosition = 'center';
    });

    // Scroll indicator fade
    window.addEventListener('scroll', () => {
      const scrollIndicator = document.querySelector('.scroll-indicator');
      if (scrollIndicator) scrollIndicator.style.opacity = window.pageYOffset > 100 ? '0' : '1';
    });

    // Carousel
    class Carousel {
      constructor() {
        this.track = document.querySelector('.carousel-track');
        this.slides = Array.from(document.querySelectorAll('.carousel-slide'));
        this.prevBtn = document.querySelector('.carousel-prev');
        this.nextBtn = document.querySelector('.carousel-next');
        this.indicatorsContainer = document.querySelector('.carousel-indicators');
        this.currentIndex = 0;
        this.autoPlayInterval = null;
        this.isTransitioning = false;
        this.init();
      }
      init() {
        this.createIndicators();
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        document.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowLeft') this.prevSlide();
          if (e.key === 'ArrowRight') this.nextSlide();
        });
        this.addTouchSupport();
        this.startAutoPlay();
        this.track.parentElement.parentElement.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.track.parentElement.parentElement.addEventListener('mouseleave', () => this.startAutoPlay());
      }
      createIndicators() {
        this.slides.forEach((_, index) => {
          const indicator = document.createElement('button');
          indicator.classList.add('carousel-indicator');
          if (index === 0) indicator.classList.add('active');
          indicator.addEventListener('click', () => this.goToSlide(index));
          this.indicatorsContainer.appendChild(indicator);
        });
        this.indicators = Array.from(this.indicatorsContainer.querySelectorAll('.carousel-indicator'));
      }
      updateCarousel() {
        if (this.isTransitioning) return;
        this.isTransitioning = true;
        this.track.style.transform = \`translateX(-\${this.currentIndex * 100}%)\`;
        this.slides.forEach((slide, index) => slide.classList.toggle('active', index === this.currentIndex));
        this.indicators.forEach((indicator, index) => indicator.classList.toggle('active', index === this.currentIndex));
        setTimeout(() => { this.isTransitioning = false; }, 500);
      }
      nextSlide() { this.currentIndex = (this.currentIndex + 1) % this.slides.length; this.updateCarousel(); }
      prevSlide() { this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length; this.updateCarousel(); }
      goToSlide(index) { this.currentIndex = index; this.updateCarousel(); }
      startAutoPlay() { this.autoPlayInterval = setInterval(() => this.nextSlide(), 5000); }
      stopAutoPlay() { if (this.autoPlayInterval) { clearInterval(this.autoPlayInterval); this.autoPlayInterval = null; } }
      addTouchSupport() {
        let touchStartX = 0;
        this.track.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; });
        this.track.addEventListener('touchend', (e) => {
          const diff = touchStartX - e.changedTouches[0].screenX;
          if (Math.abs(diff) > 50) diff > 0 ? this.nextSlide() : this.prevSlide();
        });
      }
    }
    if (document.querySelector('.carousel-track')) new Carousel();

    // Floating video
    function closeFloatingVideo() {
      document.getElementById('floatingVideo').style.display = 'none';
    }
    window.addEventListener('scroll', () => {
      const floatingVideo = document.getElementById('floatingVideo');
      if (window.pageYOffset > 300 && floatingVideo) floatingVideo.classList.add('visible');
    });

    // Scroll spy
    function updateActiveNavLink() {
      const sections = document.querySelectorAll('section[id]');
      const navLinks = document.querySelectorAll('.nav-menu > li > a[href^="#"]:not(.dropdown-toggle)');
      let currentSection = '';
      const scrollPosition = window.pageYOffset + 200;
      sections.forEach(section => {
        if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
          currentSection = section.getAttribute('id');
        }
      });
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === \`#\${currentSection}\`) link.classList.add('active');
      });
    }
    window.addEventListener('scroll', updateActiveNavLink);
    window.addEventListener('load', updateActiveNavLink);

    // Hero video play
    function playHeroVideo() {
      document.getElementById('videoPlayOverlay').classList.add('hidden');
      document.getElementById('heroVideoContainer').innerHTML = '<iframe src="https://www.youtube.com/embed/eFfvKxkiyzU?si=rAXO-MccKZ1-6GgK&autoplay=1" title="Adventure Tours Vernal — Guided UTV Tours in Vernal Utah" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>';
    }
  </script>


  <!-- Promoção de Alojamento Best Western -->
  <a href="https://bestwesternvernal.com" target="_blank" rel="noopener" class="bw-promo-badge" id="bwPromoBadge">
    <div class="bw-promo-badge-inner">
      <button class="bw-badge-close" onclick="event.preventDefault();event.stopPropagation();dismissBwBadge();return false;" aria-label="Fechar promoção">&times;</button>
      <div class="bw-badge-text-wrap">
        <div class="bw-badge-eyebrow">
          <span class="pulse-dot"></span>
          Oferta Estadia e Passeio
        </div>
        <div class="bw-badge-offer">
          <span class="highlight">10% de Desconto</span> em Alojamento
        </div>
        <p class="bw-badge-detail">
          Reserva no <strong>Best Western Vernal</strong> &mdash; menciona <strong>&ldquo;Adventure Tours&rdquo;</strong> quando ligares.
        </p>
        <div class="bw-badge-cta-row">
          <span class="bw-badge-button">Reserva Alojamento &rarr;</span>
          <span class="bw-badge-logo-text">bestwesternvernal.com</span>
        </div>
      </div>
    </div>
  </a>

  <!-- Promoção High Class Limousine -->
  <a href="https://highclasslimousineservices.com/" target="_blank" rel="noopener" class="hcl-promo-badge" id="hclPromoBadge">
    <div class="hcl-promo-badge-inner">
      <button class="hcl-badge-close" onclick="event.preventDefault();event.stopPropagation();dismissHclBadge();return false;" aria-label="Fechar promoção">&times;</button>
      <div class="hcl-badge-text-wrap">
        <div class="hcl-badge-eyebrow">
          <span class="pulse-dot"></span>
          Chega com Estilo
        </div>
        <div class="hcl-badge-offer">
          <span class="highlight">High Class</span> Limousine
        </div>
        <p class="hcl-badge-detail">
          Casamentos, bailes de finalistas, aeroporto e noites fora por toda a Basin. <strong>A Classe Não Está Extinta.</strong>
        </p>
        <div class="hcl-badge-cta-row">
          <span class="hcl-badge-button">Anda com Estilo &rarr;</span>
          <span class="hcl-badge-logo-text">highclasslimousineservices.com</span>
        </div>
      </div>
    </div>
  </a>

  <script is:inline>
    // Dismiss badge for this session
    function dismissBwBadge() {
  var badge = document.getElementById('bwPromoBadge');
  if (badge) badge.classList.add('dismissed');
}
    function dismissHclBadge() {
  var badge = document.getElementById('hclPromoBadge');
  if (badge) badge.classList.add('dismissed');
}
</script>
`;

const FR = `

  <!-- Bloc de Résumé IA -->
  <p class="page-summary" style="position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;" aria-hidden="false">
    Adventure Tours Vernal propose des tours guidés en UTV side-by-side Kawasaki KRX 1000 à Vernal, Utah. Les pistes incluent Doc's Beach, Moonshine Arch, Ashley Gorge, Outlaw Trail et Asphalt Ridge. Les tours proposent des pétroglyphes, de l'art rupestre et des ruines anciennes. $349 par machine pour un tour guidé de 3 heures (jusqu'à 2 passagers). $125 pour un ride-along avec un guide. Minimum 3 personnes. Jusqu'à 12 invités par tour sur 6 machines. L'opérateur de tours en UTV le mieux noté de l'Utah, avec une note de 5.0 étoiles sur 82 avis Google. Ouvert tous les jours de 7h à 19h. Appelez le (435) 219-9447 pour réserver.
  </p>

  <!-- Section Hero -->
  <div class="hero">
    <div class="trail-hero-video-bg">
  <iframe
    src="https://www.youtube.com/embed/BHOABkrNnnE?autoplay=1&mute=1&loop=1&playlist=BHOABkrNnnE&controls=0&showinfo=0&rel=0&playsinline=1"
    frameborder="0"
    allow="autoplay; encrypted-media"
    allowfullscreen>
  </iframe>
</div>
    <div class="hero-overlay"></div>

    <div class="hero-video-wrapper">
      <div class="video-frame-3d">
        <div class="video-frame-inner">
          <div class="video-play-overlay" id="videoPlayOverlay" onclick="playHeroVideo()">
            <img src="https://img.youtube.com/vi/eFfvKxkiyzU/maxresdefault.jpg" alt="Regardez Adventure Tours Vernal en action — tours guidés en UTV à Vernal, Utah" class="video-thumbnail">
            <div class="play-overlay-content">
              <div class="play-icon-circle">▶</div>
              <span class="play-overlay-text">Cliquez pour regarder la vidéo</span>
            </div>
          </div>
          <div id="heroVideoContainer"></div>
        </div>
      </div>
    </div>

    <div class="hero-content">
      <h1 class="hero-title" style="font-size:clamp(1.8rem,4vw,3rem);font-weight:800;color:#fff;text-shadow:0 2px 12px rgba(0,0,0,0.5);margin-bottom:0.5rem;">
        Tours Guidés en UTV à Vernal, Utah
      </h1>
      <p class="hero-subtitle">Vivez le frisson du backcountry de l'Utah avec des aventures guidées en side-by-side Kawasaki KRX 1000</p>
      <div style="margin-top:14px;"><span style="display:inline-flex;align-items:center;gap:8px;padding:7px 15px;border:1px solid rgba(255,255,255,0.5);border-radius:999px;background:rgba(0,0,0,0.35);font-size:0.95rem;color:#fff;"><span aria-hidden="true" style="color:#f5c451;letter-spacing:1px;">★★★★★</span> <span><strong>${SITE.rating.value}</strong> &middot; ${SITE.rating.count} avis Google</span></span></div>
    </div>

    <div class="scroll-indicator"><span></span></div>
  </div>

    <!-- CARTES DE TARIFICATION -->
    <div class="pricing-section">
      <h2>Tarification Simple et Transparente</h2>
      <p>Aucun frais caché — juste l'aventure. Minimum 3 personnes par tour.</p>
      <div class="pricing-grid">
        <div class="pricing-card featured">
          <div class="pricing-label">Par Machine</div>
          <div class="pricing-title">1–2 Passagers, 1 KRX 1000</div>
          <div class="pricing-amount">$349</div>
          <div class="pricing-per">par machine / tour guidé de 3 heures</div>
          <ul class="pricing-features">
            <li>Kawasaki KRX 1000 2 places</li>
            <li>Jusqu'à 2 passagers par machine</li>
            <li>Guides locaux experts (Dave et Trudy)</li>
            <li>Choix parmi 5 systèmes de pistes</li>
            <li>Amortisseurs FOX 2.5 PODIUM LSC</li>
            <li>Briefing de sécurité complet et équipement</li>
          </ul>
          <a href="/fr/booking/" class="tour-book-btn" style="display:block;text-align:center;text-decoration:none;">Réservez Maintenant</a>
        </div>
        <div class="pricing-card">
          <div class="pricing-label">Supplément Ride-Along</div>
          <div class="pricing-title">Ride-along avec Dave ou Trudy</div>
          <div class="pricing-amount">$125</div>
          <div class="pricing-per">par personne / tour guidé de 3 heures</div>
          <ul class="pricing-features">
            <li>Ajoutez une 3e personne à votre groupe</li>
            <li>Voyage en tant que passager avec un guide</li>
            <li>Nécessite la location d'au moins 1 machine</li>
            <li>2 places ride-along disponibles par tour</li>
            <li>Toute l'aventure, sans avoir à conduire</li>
          </ul>
          <a href="/fr/booking/" class="tour-book-btn" style="display:block;text-align:center;text-decoration:none;">Réservez Maintenant</a>
        </div>
        <div class="pricing-card">
          <div class="pricing-label">Groupes</div>
          <div class="pricing-title">Jusqu'à 12 Invités</div>
          <div class="pricing-amount">Appelez</div>
          <div class="pricing-per">tarification de groupe personnalisée</div>
          <ul class="pricing-features">
            <li>Jusqu'à 6 machines disponibles</li>
            <li>10 invités sur 5 machines + 2 ride-along</li>
            <li>Dave et Trudy guident ensemble</li>
            <li>Idéal pour les familles et les réunions</li>
            <li>$99/heure par machine pour du temps supplémentaire</li>
          </ul>
          <a href="tel:435-219-9447" class="tour-book-btn" style="display:block;text-align:center;text-decoration:none;">📞 (435) 219-9447</a>
        </div>
      </div>
    </div>

      <!-- Bouton de réservation unique sous toutes les pistes -->
      <div style="text-align:center;margin-top:50px;">
        <a href="/fr/booking/" class="btn btn-primary" style="font-size:1.25rem;padding:22px 70px;">
          📅 Réservez Votre Aventure
        </a>
        <p style="margin-top:14px;font-size:0.95rem;color:var(--charcoal);opacity:0.65;font-family:var(--font-body);">
          Vous choisirez votre piste lors de la réservation — ouvert tous les jours de 7h à 19h
        </p>
      </div>

    </div>
  </section>

  <!-- Section Pourquoi Vernal -->
  <section id="why-vernal">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Pourquoi Choisir Vernal ?</h2>
        <p class="section-subtitle">Découvrez ce qui fait de ce coin de l'Utah un paradis du hors-piste</p>
      </div>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-image" style="background:#000;">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/PoCN4Lo9Lkk?si=CMj5hK0r2l5GeKFM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style="display:block;width:100%;height:100%;border:0;"></iframe>
          </div>
          <div class="feature-content">
            <h3 class="feature-title">Dinosaur National Monument</h3>
            <p class="feature-description">Parcourez des paysages préhistoriques où erraient jadis des géants anciens, avec accès à des sites fossilifères de renommée mondiale. <a href="/fr/dinosaur-national-monument/" style="color:var(--burnt-orange);font-weight:600;">Tours en UTV près du monument →</a></p>
          </div>
        </div>
        <div class="feature-card">
          <div class="feature-image" style="background:#000;">
            <iframe title="Video Embed" src="https://www.nps.gov/media/video/embed.htm?id=CD297DBD-5955-4AA8-BC53-1798793EC221" width="480" height="306" frameborder="0" scrolling="auto" allowfullscreen style="display:block;width:100%;height:100%;border:0;"></iframe>
          </div>
          <div class="feature-content">
            <h3 class="feature-title">Témoignages de Civilisation Ancienne</h3>
            <p class="feature-description">Découvrez des pétroglyphes, de l'art rupestre et des ruines — des milliers d'années d'histoire indigène préservées dans la pierre et les canyons de l'Uintah Basin. <a href="/fr/dinosaur-national-monument/petroglyphs-rock-art-vernal/" style="color:var(--burnt-orange);font-weight:600;">Découvrez les sites d'art rupestre →</a></p>
          </div>
        </div>
        <div class="feature-card">
          <div class="feature-image" style="background:#000;">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/2fdxwBHky_Y?si=Mio585KlceDKRTHT" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style="display:block;width:100%;height:100%;border:0;"></iframe>
          </div>
          <div class="feature-content">
            <h3 class="feature-title">Pistes Cachées</h3>
            <p class="feature-description">Accédez à des itinéraires secrets et des lieux favoris connus uniquement des habitants de Vernal — des paysages que vous ne trouverez nulle part ailleurs. <a href="/fr/utv/backcountry-tours-vernal-utah/" style="color:var(--burnt-orange);font-weight:600;">Détails du tour dans le backcountry →</a></p>
          </div>
        </div>
        <div class="feature-card">
          <div class="feature-image" style="background:#000;">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/hmKWG8GZBiw?si=Nq5dULfRSYvpRsAQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style="display:block;width:100%;height:100%;border:0;"></iframe>
          </div>
          <div class="feature-content">
            <h3 class="feature-title">Arches Panoramiques</h3>
            <p class="feature-description">Découvrez des arches et formations naturelles de grès qui rivalisent avec les parcs les plus célèbres de l'Utah, sans la foule. <a href="/fr/utv/best-utv-trails-vernal/" style="color:var(--burnt-orange);font-weight:600;">Voyez les 5 systèmes de pistes →</a></p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Section Véhicules -->
  <section id="vehicles">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Notre Flotte</h2>
        <p class="section-subtitle">6 machines Kawasaki KRX 1000 disponibles — entretenues pour la sécurité et la performance</p>
      </div>
      <div class="vehicles-grid">
        <div class="vehicle-card">
          <div class="vehicle-image" data-bg="/images/9.webp"></div>
          <div class="vehicle-content">
            <h3 class="vehicle-name">Kawasaki KRX 1000</h3>
            <ul class="vehicle-specs">
              <li><span class="spec-label">Taille de la Flotte :</span><span class="spec-value">6 Machines Disponibles</span></li>
              <li><span class="spec-label">Passagers :</span><span class="spec-value">2 Places</span></li>
              <li><span class="spec-label">Suspension :</span><span class="spec-value">Amortisseurs FOX 2.5 PODIUM LSC</span></li>
              <li><span class="spec-label">Idéal Pour :</span><span class="spec-value">Rock Crawling et Confort</span></li>
              <li><span class="spec-label">Sécurité :</span><span class="spec-value">Cage de Sécurité Complète + Direction Assistée</span></li>
              <li><span class="spec-label">Capacité :</span><span class="spec-value">Jusqu'à 12 invités par tour</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>

 <!-- Section Galerie -->
  <section id="gallery">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Galerie Photo</h2>
        <p class="section-subtitle">Découvrez l'aventure qui vous attend</p>
      </div>
      <div class="carousel-container">
        <div class="carousel-main">
          <button class="carousel-btn carousel-prev" aria-label="Image précédente"><span>‹</span></button>
          <div class="carousel-track-container">
            <div class="carousel-track">
              <div class="carousel-slide active"><img src="/images/1a.webp" alt="Side-by-side UTV parked in a sandstone alcove on an Adventure Tours Vernal UTV tour"><div class="carousel-caption">Exploring a Sandstone Alcove</div></div>
              <div class="carousel-slide"><img src="/images/1.webp" alt="Lineup of Kawasaki KRX 1000 side-by-sides staged before a guided UTV tour in Vernal Utah"><div class="carousel-caption">UTV Lineup Staging</div></div>
              <div class="carousel-slide"><img src="/images/2.webp" alt="Blue side-by-side UTV kicking up dust on a desert trail near Vernal Utah"><div class="carousel-caption">Kicking Up Dust</div></div>
              <div class="carousel-slide"><img src="/images/3.webp" alt="Group riding side-by-side UTVs on a backcountry trail near Vernal Utah"><div class="carousel-caption">Group on the Trail</div></div>
              <div class="carousel-slide"><img src="/images/4.webp" alt="Riders resting under a sandstone overhang at sunset on an Adventure Tours Vernal UTV tour"><div class="carousel-caption">Sunset Rock Overhang</div></div>
              <div class="carousel-slide"><img src="/images/5.webp" alt="Looking out from inside a sandstone cave on a guided UTV tour near Vernal Utah"><div class="carousel-caption">Inside a Sandstone Cave</div></div>
              <div class="carousel-slide"><img src="/images/6.webp" alt="Family posing inside a sandstone cave on an Adventure Tours Vernal UTV tour"><div class="carousel-caption">Family Cave Photo</div></div>
              <div class="carousel-slide"><img src="/images/7.webp" alt="UTV tire perched on a canyon rim overlooking Ashley Gorge near Vernal Utah"><div class="carousel-caption">On the Canyon's Edge</div></div>
              <div class="carousel-slide"><img src="/images/3a.webp" alt="Desert badlands landscape at sunset on a backcountry UTV tour near Vernal Utah"><div class="carousel-caption">Desert Badlands Sunset</div></div>
              <div class="carousel-slide"><img src="/images/8.webp" alt="Side-by-side UTV climbing a slickrock ridge on a guided tour near Vernal Utah"><div class="carousel-caption">Climbing a Slickrock Ridge</div></div>
              <div class="carousel-slide"><img src="/images/8a.webp" alt="Blue side-by-side UTV speeding through the high desert near Vernal Utah"><div class="carousel-caption">Speeding Through the Desert</div></div>
              <div class="carousel-slide"><img src="/images/9.webp" alt="Kawasaki KRX 1000 side-by-sides lined up under a rock overhang near Vernal Utah"><div class="carousel-caption">Lineup Under the Overhang</div></div>
              <div class="carousel-slide"><img src="/images/6a.webp" alt="Group stopped with their side-by-side UTVs along a backcountry trail near Vernal Utah"><div class="carousel-caption">Trailside Group Stop</div></div>
              <div class="carousel-slide"><img src="/images/10.webp" alt="Side-by-side UTV beside a slickrock canyon vista on a guided tour near Vernal Utah"><div class="carousel-caption">Slickrock Canyon Vista</div></div>
              <div class="carousel-slide"><img src="/images/11.webp" alt="Side-by-side UTV parked inside a sandstone cave near Vernal Utah"><div class="carousel-caption">UTV Inside the Cave</div></div>
              <div class="carousel-slide"><img src="/images/12.webp" alt="Towering sandstone cave wall on an Adventure Tours Vernal backcountry tour"><div class="carousel-caption">Towering Cave Wall</div></div>
              <div class="carousel-slide"><img src="/images/13.webp" alt="Rider leaping off a cliff into the water on an Adventure Tours Vernal outing near Vernal Utah"><div class="carousel-caption">Cliff Jumping Splash</div></div>
              <div class="carousel-slide"><img src="/images/14.webp" alt="Convoy of side-by-side UTVs on a mountain trail during a guided tour near Vernal Utah"><div class="carousel-caption">Convoy on the Mountain Trail</div></div>
              <div class="carousel-slide"><img src="/images/15a.webp" alt="Side-by-side UTV on slickrock at dusk near Dinosaur National Monument, Vernal Utah"><div class="carousel-caption">Dusk Desert Ride</div></div>
              <div class="carousel-slide"><img src="/images/35a.webp" alt="Three Kawasaki KRX 1000 side-by-sides silhouetted against a sunburst at sunset near Vernal Utah"><div class="carousel-caption">Sunset Trio Silhouette</div></div>
              <div class="carousel-slide"><img src="/images/16a.webp" alt="Riders standing atop slickrock beside their Kawasaki KRX 1000 side-by-sides near Vernal Utah"><div class="carousel-caption">Riders Atop the Slickrock</div></div>
              <div class="carousel-slide"><img src="/images/17a.webp" alt="Two side-by-side UTVs parked on slickrock near Vernal Utah"><div class="carousel-caption">Two UTVs on Slickrock</div></div>
              <div class="carousel-slide"><img src="/images/18a.webp" alt="Mud-covered side-by-side UTVs on slickrock after a guided tour near Vernal Utah"><div class="carousel-caption">Muddy UTVs on the Rock</div></div>
              <div class="carousel-slide"><img src="/images/19a.webp" alt="Muddy side-by-side UTV on a rock dome at an overlook near Vernal Utah"><div class="carousel-caption">Muddy UTV at the Overlook</div></div>
              <div class="carousel-slide"><img src="/images/20.webp" alt="Blue side-by-side UTV on slickrock high above the canyon near Vernal Utah"><div class="carousel-caption">Blue UTV on Slickrock</div></div>
              <div class="carousel-slide"><img src="/images/21a.webp" alt="Side-by-side UTVs silhouetted at sunset on a guided tour near Vernal Utah"><div class="carousel-caption">UTVs at Sunset</div></div>
              <div class="carousel-slide"><img src="/images/22a.webp" alt="Side-by-side UTV silhouetted against a sunburst on a sunset ride through the Utah desert backcountry"><div class="carousel-caption">Sunburst Silhouette</div></div>
              <div class="carousel-slide"><img src="/images/23a.webp" alt="Two side-by-side UTVs perched on a boulder on a backcountry tour near Vernal Utah"><div class="carousel-caption">Twin UTVs on a Boulder</div></div>
              <div class="carousel-slide"><img src="/images/23.webp" alt="Hikers exploring a sandstone arch on an Adventure Tours Vernal outing in Vernal Utah"><div class="carousel-caption">Hikers at the Sandstone Arch</div></div>
              <div class="carousel-slide"><img src="/images/24.webp" alt="Side-by-side UTVs atop a large boulder with a desert view near Vernal Utah"><div class="carousel-caption">UTVs Atop the Boulder</div></div>
              <div class="carousel-slide"><img src="/images/25.webp" alt="Muddy side-by-side UTVs overlooking the valley on a backcountry trail near Vernal Utah"><div class="carousel-caption">Muddy UTVs With a View</div></div>
              <div class="carousel-slide"><img src="/images/26.webp" alt="Side-by-side UTVs on a ridgetop at dusk near Vernal Utah"><div class="carousel-caption">Ridgetop UTVs at Dusk</div></div>
              <div class="carousel-slide"><img src="/images/27.webp" alt="Side-by-side UTVs on a rock ridge formation on a guided tour in Vernal Utah"><div class="carousel-caption">UTVs on the Rock Ridge</div></div>
              <div class="carousel-slide"><img src="/images/28.webp" alt="Side-by-side UTVs in the high desert on a backcountry tour near Vernal Utah"><div class="carousel-caption">UTVs in the High Desert</div></div>
              <div class="carousel-slide"><img src="/images/29.webp" alt="Side-by-side UTV at a slickrock dome overlook near Vernal Utah"><div class="carousel-caption">Slickrock Dome Overlook</div></div>
              <div class="carousel-slide"><img src="/images/30.webp" alt="Canyon country overlook on a backcountry UTV tour near Vernal Utah"><div class="carousel-caption">Canyon Country Overlook</div></div>
              <div class="carousel-slide"><img src="/images/31.webp" alt="Side-by-side UTV climbing the slickrock on a guided tour near Vernal Utah"><div class="carousel-caption">Climbing the Slickrock</div></div>
              <div class="carousel-slide"><img src="/images/32.webp" alt="Side-by-side UTV descending a steep rock face on a guided tour near Vernal Utah"><div class="carousel-caption">UTV Descending the Rock</div></div>
              <div class="carousel-slide"><img src="/images/33.webp" alt="Side-by-side UTV cresting boulders on a backcountry trail near Vernal Utah"><div class="carousel-caption">UTV Cresting the Boulders</div></div>
              <div class="carousel-slide"><img src="/images/34.webp" alt="Green side-by-side UTV on a desert trail near Vernal Utah"><div class="carousel-caption">Green UTV on the Trail</div></div>
              <div class="carousel-slide"><img src="/images/35.webp" alt="Side-by-side UTVs climbing slickrock on a guided tour near Vernal Utah"><div class="carousel-caption">UTVs Climbing Slickrock</div></div>
              <div class="carousel-slide"><img src="/images/36.webp" alt="Side-by-side UTVs on the slickrock on a backcountry tour near Vernal Utah"><div class="carousel-caption">UTVs on the Slickrock</div></div>
              <div class="carousel-slide"><img src="/images/37.webp" alt="Side-by-side UTVs climbing a sandstone ridge near Vernal Utah"><div class="carousel-caption">Climbing a Sandstone Ridge</div></div>
              <div class="carousel-slide"><img src="/images/39a.webp" alt="Side-by-side UTV parked below a desert butte near Vernal Utah"><div class="carousel-caption">Parked at the Butte</div></div>
              <div class="carousel-slide"><img src="/images/39.webp" alt="View through a rock arch toward a desert butte near Vernal Utah"><div class="carousel-caption">Through the Rock Arch</div></div>
              <div class="carousel-slide"><img src="/images/40.webp" alt="Muddy side-by-side UTV climbing rocks on a backcountry tour near Vernal Utah"><div class="carousel-caption">Muddy Rig Climbing</div></div>
              <div class="carousel-slide"><img src="/images/41.webp" alt="Side-by-side UTVs parked under a natural rock arch near Vernal Utah"><div class="carousel-caption">Side-by-Sides Under the Arch</div></div>
              <div class="carousel-slide"><img src="/images/42.webp" alt="Two side-by-side UTVs on a canyon trail through the Utah backcountry"><div class="carousel-caption">Canyon Trail Duo</div></div>
              <div class="carousel-slide"><img src="/images/43.webp" alt="Side-by-side UTV on a steep slickrock descent near Vernal Utah"><div class="carousel-caption">Steep Slickrock Descent</div></div>
              <div class="carousel-slide"><img src="/images/44.webp" alt="Guided side-by-side UTV rock crawl through a sandstone wash near Vernal Utah"><div class="carousel-caption">Guided Rock Crawl</div></div>
              <div class="carousel-slide"><img src="/images/45.webp" alt="Desert overlook at dusk on a backcountry UTV tour near Vernal Utah"><div class="carousel-caption">Overlook at Dusk</div></div>
              <div class="carousel-slide"><img src="/images/46.webp" alt="Side-by-side UTV tackling a deep rut on a backcountry trail near Vernal Utah"><div class="carousel-caption">Tackling the Rut</div></div>
              <div class="carousel-slide"><img src="/images/47.webp" alt="Side-by-side UTV splashing through a river crossing near Vernal Utah"><div class="carousel-caption">Splashing River Crossing</div></div>
              <div class="carousel-slide"><img src="/images/48.webp" alt="Doc's Beach trailhead sign on an Adventure Tours Vernal UTV tour near Vernal Utah"><div class="carousel-caption">Doc's Beach Trails</div></div>
              <div class="carousel-slide"><img src="/images/49.webp" alt="Fleet of Kawasaki KRX 1000 side-by-sides staged for a guided tour in Vernal Utah"><div class="carousel-caption">Staged Fleet Lineup</div></div>
              <div class="carousel-slide"><img src="/images/50.webp" alt="Tour group stopped with their side-by-side UTVs near Vernal Utah"><div class="carousel-caption">Group Trail Stop</div></div>
              <div class="carousel-slide"><img src="/images/51.webp" alt="Tour group with Kawasaki KRX 1000 side-by-sides on a ridge near Vernal Utah"><div class="carousel-caption">Tour Group Photo</div></div>
              <div class="carousel-slide"><img src="/images/52.webp" alt="Long line of side-by-side UTVs staged and ready for a guided tour near Vernal Utah"><div class="carousel-caption">Lined Up and Ready</div></div>
              <div class="carousel-slide"><img src="/images/53.webp" alt="Fleet of side-by-side UTVs staged on a hilltop near Vernal Utah"><div class="carousel-caption">Fleet at the Hilltop</div></div>
              <div class="carousel-slide"><img src="/images/54a.webp" alt="Side-by-side UTV charging through a muddy backcountry trail near Vernal Utah"><div class="carousel-caption">Muddy Trail Charge</div></div>
              <div class="carousel-slide"><img src="/images/55.webp" alt="Green Kawasaki side-by-side UTV crossing a muddy rut near Vernal Utah"><div class="carousel-caption">Green Machine in the Mud</div></div>
              <div class="carousel-slide"><img src="/images/56.webp" alt="Tour group gathered under a rock overhang with their side-by-side UTVs near Vernal Utah"><div class="carousel-caption">Group Under the Overhang</div></div>
              <div class="carousel-slide"><img src="/images/57a.webp" alt="Side-by-side UTVs parked at a cliffside on a guided tour near Vernal Utah"><div class="carousel-caption">UTVs at the Cliffside</div></div>
              <div class="carousel-slide"><img src="/images/58a.webp" alt="Rocky trail vista on a backcountry UTV tour near Vernal Utah"><div class="carousel-caption">Rock Trail Vista</div></div>
              <div class="carousel-slide"><img src="/images/58.webp" alt="Rider jumping off a cliff for a cool-down on an Adventure Tours Vernal outing near Vernal Utah"><div class="carousel-caption">Cliff Jump Cool Down</div></div>
              <div class="carousel-slide"><img src="/images/59.webp" alt="Side-by-side UTVs staged below a slickrock dome near Vernal Utah"><div class="carousel-caption">UTVs Staged Below</div></div>
              <div class="carousel-slide"><img src="/images/60.webp" alt="Blue side-by-side UTV conquering a slickrock dome with a guide near Vernal Utah"><div class="carousel-caption">Conquering the Slickrock</div></div>
              <div class="carousel-slide"><img src="/images/61.webp" alt="Three side-by-side UTVs rock crawling through the Utah backcountry"><div class="carousel-caption">Rock Crawling Trio</div></div>
              <div class="carousel-slide"><img src="/images/62a.webp" alt="Riders exploring cliff dwellings on an Adventure Tours Vernal UTV tour"><div class="carousel-caption">Exploring Cliff Dwellings</div></div>
              <div class="carousel-slide"><img src="/images/42a.webp" alt="Large natural sandstone arch above the valley on a guided UTV tour near Vernal Utah"><div class="carousel-caption">Natural Sandstone Arch</div></div>
              <div class="carousel-slide"><img src="/images/63.webp" alt="Tour group at a rock arch at sunset near Vernal Utah"><div class="carousel-caption">Sunset Arch Crew</div></div>
              <div class="carousel-slide"><img src="/images/64.webp" alt="Inside a sandstone cave on an Adventure Tours Vernal backcountry tour"><div class="carousel-caption">Inside the Cave</div></div>
              <div class="carousel-slide"><img src="/images/65a.webp" alt="Side-by-side UTV on a slickrock summit climb near Vernal Utah"><div class="carousel-caption">Slickrock Summit Climb</div></div>
              <div class="carousel-slide"><img src="/images/65.webp" alt="Side-by-side UTV on a river crossing adventure near Vernal Utah"><div class="carousel-caption">River Crossing Adventure</div></div>
              <div class="carousel-slide"><img src="/images/66.webp" alt="Side-by-side UTV parked at a canyon overlook near Vernal Utah"><div class="carousel-caption">Parked Machine Profile</div></div>
              <div class="carousel-slide"><img src="/images/67.webp" alt="Side-by-side UTV sending it over a sand dune near Vernal Utah"><div class="carousel-caption">Sand Dune Send</div></div>
              <div class="carousel-slide"><img src="/images/68.webp" alt="Side-by-side UTV parked beside a sandstone arch near Vernal Utah"><div class="carousel-caption">Parked at the Arch</div></div>
              <div class="carousel-slide"><img src="/images/70.webp" alt="Golden sandstone arch on a backcountry UTV tour near Vernal Utah"><div class="carousel-caption">Golden Rock Arch</div></div>
              <div class="carousel-slide"><img src="/images/71.webp" alt="Window opening in a sandstone cave near Vernal Utah"><div class="carousel-caption">Sandstone Cave Window</div></div>
              <div class="carousel-slide"><img src="/images/72.webp" alt="Trail along a towering canyon wall near Vernal Utah"><div class="carousel-caption">Canyon Wall Trail</div></div>
              <div class="carousel-slide"><img src="/images/73.webp" alt="Side-by-side UTVs parked under a sandstone arch near Vernal Utah"><div class="carousel-caption">UTVs Under the Arch</div></div>
              <div class="carousel-slide"><img src="/images/74.webp" alt="Interior of a sandstone cave on an Adventure Tours Vernal tour near Vernal Utah"><div class="carousel-caption">Cave Interior View</div></div>
              <div class="carousel-slide"><img src="/images/75.webp" alt="Towering rock overhang on a backcountry UTV tour near Vernal Utah"><div class="carousel-caption">Towering Rock Overhang</div></div>
              <div class="carousel-slide"><img src="/images/76.webp" alt="Three side-by-side UTVs on the canyon rim near Vernal Utah"><div class="carousel-caption">Three UTVs on the Canyon Rim</div></div>
              <div class="carousel-slide"><img src="/images/77.webp" alt="Couple posing at a cliff edge overlooking the canyon near Vernal Utah"><div class="carousel-caption">Couple at the Cliff Edge</div></div>
              <div class="carousel-slide"><img src="/images/78.webp" alt="Autumn canyon overlook on a backcountry UTV trail near Vernal Utah"><div class="carousel-caption">Autumn Canyon Overlook</div></div>
              <div class="carousel-slide"><img src="/images/79.webp" alt="Side-by-side UTV on an aspen-lined trail near Vernal Utah"><div class="carousel-caption">Aspen Trail Ride</div></div>
              <div class="carousel-slide"><img src="/images/80.webp" alt="Side-by-side UTV on a slickrock descent near Vernal Utah"><div class="carousel-caption">Slickrock Descent</div></div>
              <div class="carousel-slide"><img src="/images/81.webp" alt="Golden aspen trail on a guided side-by-side adventure near Vernal Utah"><div class="carousel-caption">Golden Aspen Trail</div></div>
              <div class="carousel-slide"><img src="/images/82.webp" alt="Side-by-side UTVs above the canyon on a backcountry tour near Vernal Utah"><div class="carousel-caption">UTVs Above the Canyon</div></div>
              <div class="carousel-slide"><img src="/images/83.webp" alt="View through a sandstone arch on an Adventure Tours Vernal tour near Vernal Utah"><div class="carousel-caption">Through the Arch</div></div>
              <div class="carousel-slide"><img src="/images/84.webp" alt="Side-by-side UTVs on slickrock under a stormy sky near Vernal Utah"><div class="carousel-caption">Slickrock Under the Storm</div></div>
              <div class="carousel-slide"><img src="/images/38.webp" alt="Blue side-by-side UTV kicking up dust on a desert trail near Vernal Utah"><div class="carousel-caption">Desert Dust Trail</div></div>
              <div class="carousel-slide"><img src="/images/85.webp" alt="Inside a sandstone cave looking out a window opening near Vernal Utah"><div class="carousel-caption">Inside a Sandstone Cave</div></div>
              <div class="carousel-slide"><img src="/images/86.webp" alt="Side-by-side UTVs at a mountaintop staging point near Vernal Utah"><div class="carousel-caption">Mountaintop Staging Point</div></div>
              <div class="carousel-slide"><img src="/images/87.webp" alt="Three side-by-side UTVs lined up on a guided tour near Vernal Utah"><div class="carousel-caption">Three UTVs Lined Up</div></div>
              <div class="carousel-slide"><img src="/images/99.webp" alt="Slickrock ridge view on a backcountry UTV tour near Vernal Utah"><div class="carousel-caption">Slickrock Ridge View</div></div>
              <div class="carousel-slide"><img src="/images/90.webp" alt="Side-by-side UTV climbing the slickrock near Vernal Utah"><div class="carousel-caption">Climbing the Slickrock</div></div>
              <div class="carousel-slide"><img src="/images/91.webp" alt="Side-by-side UTV on a slickrock climb under a stormy sky near Vernal Utah"><div class="carousel-caption">Stormy Slickrock Climb</div></div>
              <div class="carousel-slide"><img src="/images/92.webp" alt="Side-by-side UTV throwing dust on a desert trail near Vernal Utah"><div class="carousel-caption">Airborne Dust Trail</div></div>
              <div class="carousel-slide"><img src="/images/93.webp" alt="Side-by-side UTV on a steep ledge climb near Vernal Utah"><div class="carousel-caption">Steep Ledge Climb</div></div>
              <div class="carousel-slide"><img src="/images/94.webp" alt="Side-by-side UTV spraying sand through a turn near Vernal Utah"><div class="carousel-caption">Sand Spray Turn</div></div>
              <div class="carousel-slide"><img src="/images/95.webp" alt="Side-by-side UTV flying an American flag at rest near Vernal Utah"><div class="carousel-caption">American Flag UTV</div></div>
              <div class="carousel-slide"><img src="/images/96.webp" alt="Side-by-side UTV at a cliff edge at dusk near Vernal Utah"><div class="carousel-caption">Cliff Edge at Dusk</div></div>
              <div class="carousel-slide"><img src="/images/97.webp" alt="Side-by-side UTV on a ridgeline at twilight in the Utah desert backcountry"><div class="carousel-caption">Ridgeline at Twilight</div></div>
            </div>
          </div>
          <button class="carousel-btn carousel-next" aria-label="Image suivante"><span>›</span></button>
        </div>
        <div class="carousel-indicators"></div>
        <div class="carousel-thumbnails"></div>
      </div>
    </div>
  </section>

  <!-- Section Réservation -->
  <section id="booking">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Prêt pour l'Aventure ?</h2>
        <p class="section-subtitle">Réservez en ligne instantanément ou appelez-nous — nous sommes là tous les jours de 7h à 19h</p>
      </div>
      <div class="booking-container">
        <div class="phone-cta-wrapper">

          <!-- Bouton de Réservation en Ligne -->
          <div style="margin-bottom:35px;">
            <a href="/fr/booking/" class="btn btn-primary" style="font-size:1.2rem;padding:20px 60px;">
              📅 Réservez Votre Aventure en Ligne
            </a>
            <p style="margin-top:12px;font-size:0.95rem;color:var(--charcoal);opacity:0.7;font-family:var(--font-body);">
              Choisissez votre piste, la date et l'heure — confirmation instantanée
            </p>
          </div>

          <!-- Séparateur -->
          <div style="display:flex;align-items:center;gap:20px;margin:10px 0 30px;">
            <div style="flex:1;height:1px;background:rgba(212,118,78,0.15);"></div>
            <span style="font-family:var(--font-heading);font-weight:700;color:var(--charcoal);opacity:0.5;font-size:0.9rem;">OU APPELEZ-NOUS</span>
            <div style="flex:1;height:1px;background:rgba(212,118,78,0.15);"></div>
          </div>

          <!-- Téléphone -->
          <div class="phone-icon">📞</div>
          <h3 class="phone-cta-title">Appelez Pour Réserver Votre Tour</h3>
          <a href="tel:435-219-9447" class="phone-number-display">(435) 219-9447</a>
          <p class="phone-cta-subtitle">Ouvert Tous les Jours • de 7h à 19h (Heure des Rocheuses)</p>

          <div class="phone-benefits">
            <div class="phone-benefit"><span class="benefit-icon">✓</span><span>Confirmation Instantanée</span></div>
            <div class="phone-benefit"><span class="benefit-icon">✓</span><span>Guides Locaux Experts</span></div>
            <div class="phone-benefit"><span class="benefit-icon">✓</span><span>Horaires Flexibles</span></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Section CTA À Propos -->
  <section id="about">
    <div class="container">
      <div class="about-cta-simple">
        <h2 class="section-title">Découvrez la Famille Wilson</h2>
        <p class="section-subtitle">Détenue localement, axée sur la sécurité, portée par la passion de l'aventure depuis le premier jour</p>
        <p>Découvrez notre histoire, notre passion pour l'Uintah Basin, et pourquoi Adventure Tours Vernal est la première entreprise de tours en UTV à Vernal, Utah.</p>
        <a href="/fr/about/" class="cta-button primary">Découvrez Notre Histoire</a>
      </div>
    </div>
  </section>

  <div class="about-features">
    <div class="about-feature">
      <div class="about-feature-icon">✅</div>
      <span class="about-feature-text">Guides Locaux Experts avec une Connaissance Approfondie</span>
    </div>
    <div class="about-feature">
      <div class="about-feature-icon">🏅</div>
      <span class="about-feature-text">Formation et Équipement de Sécurité Professionnels</span>
    </div>
    <div class="about-feature">
      <div class="about-feature-icon">🛡️</div>
      <span class="about-feature-text">Tous les Niveaux sont Bienvenus</span>
    </div>
    <div class="about-feature">
      <div class="about-feature-icon">🌟</div>
      <span class="about-feature-text">Entièrement Agréés et Assurés</span>
    </div>
  </div>
  <div class="about-image"></div>

  <!-- Section Explorer Vernal -->
  <section id="explore-guides" style="padding:var(--section-padding);background:var(--light-sand);">
    <div class="container" style="max-width:var(--container-max);margin:0 auto;">
      <div class="section-header">
        <h2 class="section-title">Explorez Vernal</h2>
        <p class="section-subtitle">Planifiez votre voyage avec nos guides locaux — tout ce que vous devez savoir sur Vernal, Utah</p>
      </div>
      <div class="related-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:18px;max-width:1000px;margin:0 auto;">
        <a href="/fr/things-to-do/" class="related-card" style="background:white;border-radius:14px;padding:20px;text-decoration:none;border:1px solid rgba(212,118,78,0.1);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);display:block;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;font-weight:700;color:var(--burnt-orange);margin-bottom:6px;">Que Faire à Vernal</h4>
          <p style="font-size:0.88rem;color:var(--charcoal);opacity:0.7;line-height:1.5;margin:0;">Le guide complet des activités et attractions.</p>
        </a>
        <a href="/fr/things-to-do/vernal-utah-attractions/" class="related-card" style="background:white;border-radius:14px;padding:20px;text-decoration:none;border:1px solid rgba(212,118,78,0.1);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);display:block;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;font-weight:700;color:var(--burnt-orange);margin-bottom:6px;">Meilleures Attractions de Vernal</h4>
          <p style="font-size:0.88rem;color:var(--charcoal);opacity:0.7;line-height:1.5;margin:0;">Sites incontournables et lieux à visiter.</p>
        </a>
        <a href="/fr/things-to-do/fun-things-to-do-vernal-utah-kids/" class="related-card" style="background:white;border-radius:14px;padding:20px;text-decoration:none;border:1px solid rgba(212,118,78,0.1);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);display:block;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;font-weight:700;color:var(--burnt-orange);margin-bottom:6px;">Activités en Famille</h4>
          <p style="font-size:0.88rem;color:var(--charcoal);opacity:0.7;line-height:1.5;margin:0;">Activités amusantes à faire avec les enfants à Vernal.</p>
        </a>
        <a href="/fr/things-to-do/" class="related-card" style="background:white;border-radius:14px;padding:20px;text-decoration:none;border:1px solid rgba(212,118,78,0.1);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);display:block;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;font-weight:700;color:var(--burnt-orange);margin-bottom:6px;">Activités de Plein Air</h4>
          <p style="font-size:0.88rem;color:var(--charcoal);opacity:0.7;line-height:1.5;margin:0;">Randonnée, pêche, tours en UTV et plus encore.</p>
        </a>
        <a href="/fr/atv-trails-vernal-utah/" class="related-card" style="background:white;border-radius:14px;padding:20px;text-decoration:none;border:1px solid rgba(212,118,78,0.1);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);display:block;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;font-weight:700;color:var(--burnt-orange);margin-bottom:6px;">Pistes ATV Près de Vernal</h4>
          <p style="font-size:0.88rem;color:var(--charcoal);opacity:0.7;line-height:1.5;margin:0;">Systèmes de pistes hors-piste et guide du terrain.</p>
        </a>
        <a href="/fr/utv/side-by-side-rentals-vernal-utah/" class="related-card" style="background:white;border-radius:14px;padding:20px;text-decoration:none;border:1px solid rgba(212,118,78,0.1);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);display:block;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;font-weight:700;color:var(--burnt-orange);margin-bottom:6px;">Tours en Side-by-Side vs. Locations</h4>
          <p style="font-size:0.88rem;color:var(--charcoal);opacity:0.7;line-height:1.5;margin:0;">Pourquoi les tours guidés sont meilleurs que les locations autonomes.</p>
        </a>
        <a href="/fr/dinosaur-national-monument/" class="related-card" style="background:white;border-radius:14px;padding:20px;text-decoration:none;border:1px solid rgba(212,118,78,0.1);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);display:block;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;font-weight:700;color:var(--burnt-orange);margin-bottom:6px;">Tours au Monument des Dinosaures</h4>
          <p style="font-size:0.88rem;color:var(--charcoal);opacity:0.7;line-height:1.5;margin:0;">Tours en UTV près du monument.</p>
        </a>
        <a href="/fr/dinosaur-national-monument/visiting-dinosaur-national-monument/" class="related-card" style="background:white;border-radius:14px;padding:20px;text-decoration:none;border:1px solid rgba(212,118,78,0.1);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);display:block;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;font-weight:700;color:var(--burnt-orange);margin-bottom:6px;">Guide Ultime de Dinosaur National Monument</h4>
          <p style="font-size:0.88rem;color:var(--charcoal);opacity:0.7;line-height:1.5;margin:0;">Le guide complet pour planifier votre voyage — fossiles, pétroglyphes, parcours et plus encore.</p>
        </a>
        <a href="/fr/utv/group-utv-tours-vernal/" class="related-card" style="background:white;border-radius:14px;padding:20px;text-decoration:none;border:1px solid rgba(212,118,78,0.1);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);display:block;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;font-weight:700;color:var(--burnt-orange);margin-bottom:6px;">Tours de Groupe et Privés</h4>
          <p style="font-size:0.88rem;color:var(--charcoal);opacity:0.7;line-height:1.5;margin:0;">Familles, réunions, sorties d'entreprise.</p>
        </a>
      </div>
    </div>
  </section>

  <!-- CTA Fixe pour Mobile -->
  <div class="mobile-sticky-cta">
    <button onclick="location.href='/fr/booking/'">Réservez Votre Sortie Maintenant</button>
  </div>

  <script is:inline src="https://player.vimeo.com/api/player.js"></script>
  <script is:inline>
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    // Background images from data attributes
    document.querySelectorAll('[data-bg]').forEach(element => {
      element.style.backgroundImage = \`url('\${element.getAttribute('data-bg')}')\`;
      element.style.backgroundSize = 'cover';
      element.style.backgroundPosition = 'center';
    });

    // Scroll indicator fade
    window.addEventListener('scroll', () => {
      const scrollIndicator = document.querySelector('.scroll-indicator');
      if (scrollIndicator) scrollIndicator.style.opacity = window.pageYOffset > 100 ? '0' : '1';
    });

    // Carousel
    class Carousel {
      constructor() {
        this.track = document.querySelector('.carousel-track');
        this.slides = Array.from(document.querySelectorAll('.carousel-slide'));
        this.prevBtn = document.querySelector('.carousel-prev');
        this.nextBtn = document.querySelector('.carousel-next');
        this.indicatorsContainer = document.querySelector('.carousel-indicators');
        this.currentIndex = 0;
        this.autoPlayInterval = null;
        this.isTransitioning = false;
        this.init();
      }
      init() {
        this.createIndicators();
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        document.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowLeft') this.prevSlide();
          if (e.key === 'ArrowRight') this.nextSlide();
        });
        this.addTouchSupport();
        this.startAutoPlay();
        this.track.parentElement.parentElement.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.track.parentElement.parentElement.addEventListener('mouseleave', () => this.startAutoPlay());
      }
      createIndicators() {
        this.slides.forEach((_, index) => {
          const indicator = document.createElement('button');
          indicator.classList.add('carousel-indicator');
          if (index === 0) indicator.classList.add('active');
          indicator.addEventListener('click', () => this.goToSlide(index));
          this.indicatorsContainer.appendChild(indicator);
        });
        this.indicators = Array.from(this.indicatorsContainer.querySelectorAll('.carousel-indicator'));
      }
      updateCarousel() {
        if (this.isTransitioning) return;
        this.isTransitioning = true;
        this.track.style.transform = \`translateX(-\${this.currentIndex * 100}%)\`;
        this.slides.forEach((slide, index) => slide.classList.toggle('active', index === this.currentIndex));
        this.indicators.forEach((indicator, index) => indicator.classList.toggle('active', index === this.currentIndex));
        setTimeout(() => { this.isTransitioning = false; }, 500);
      }
      nextSlide() { this.currentIndex = (this.currentIndex + 1) % this.slides.length; this.updateCarousel(); }
      prevSlide() { this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length; this.updateCarousel(); }
      goToSlide(index) { this.currentIndex = index; this.updateCarousel(); }
      startAutoPlay() { this.autoPlayInterval = setInterval(() => this.nextSlide(), 5000); }
      stopAutoPlay() { if (this.autoPlayInterval) { clearInterval(this.autoPlayInterval); this.autoPlayInterval = null; } }
      addTouchSupport() {
        let touchStartX = 0;
        this.track.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; });
        this.track.addEventListener('touchend', (e) => {
          const diff = touchStartX - e.changedTouches[0].screenX;
          if (Math.abs(diff) > 50) diff > 0 ? this.nextSlide() : this.prevSlide();
        });
      }
    }
    if (document.querySelector('.carousel-track')) new Carousel();

    // Floating video
    function closeFloatingVideo() {
      document.getElementById('floatingVideo').style.display = 'none';
    }
    window.addEventListener('scroll', () => {
      const floatingVideo = document.getElementById('floatingVideo');
      if (window.pageYOffset > 300 && floatingVideo) floatingVideo.classList.add('visible');
    });

    // Scroll spy
    function updateActiveNavLink() {
      const sections = document.querySelectorAll('section[id]');
      const navLinks = document.querySelectorAll('.nav-menu > li > a[href^="#"]:not(.dropdown-toggle)');
      let currentSection = '';
      const scrollPosition = window.pageYOffset + 200;
      sections.forEach(section => {
        if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
          currentSection = section.getAttribute('id');
        }
      });
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === \`#\${currentSection}\`) link.classList.add('active');
      });
    }
    window.addEventListener('scroll', updateActiveNavLink);
    window.addEventListener('load', updateActiveNavLink);

    // Hero video play
    function playHeroVideo() {
      document.getElementById('videoPlayOverlay').classList.add('hidden');
      document.getElementById('heroVideoContainer').innerHTML = '<iframe src="https://www.youtube.com/embed/eFfvKxkiyzU?si=rAXO-MccKZ1-6GgK&autoplay=1" title="Adventure Tours Vernal — Guided UTV Tours in Vernal Utah" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>';
    }
  </script>


  <!-- Promotion Best Western Lodging -->
  <a href="https://bestwesternvernal.com" target="_blank" rel="noopener" class="bw-promo-badge" id="bwPromoBadge">
    <div class="bw-promo-badge-inner">
      <button class="bw-badge-close" onclick="event.preventDefault();event.stopPropagation();dismissBwBadge();return false;" aria-label="Fermer la promotion">&times;</button>
      <div class="bw-badge-text-wrap">
        <div class="bw-badge-eyebrow">
          <span class="pulse-dot"></span>
          Offre Séjour et Aventure
        </div>
        <div class="bw-badge-offer">
          <span class="highlight">10% de Réduction</span> sur l'Hébergement
        </div>
        <p class="bw-badge-detail">
          Réservez chez <strong>Best Western Vernal</strong> &mdash; mentionnez <strong>&ldquo;Adventure Tours&rdquo;</strong> lors de votre appel.
        </p>
        <div class="bw-badge-cta-row">
          <span class="bw-badge-button">Réservez l'Hébergement &rarr;</span>
          <span class="bw-badge-logo-text">bestwesternvernal.com</span>
        </div>
      </div>
    </div>
  </a>

  <!-- Promotion High Class Limousine -->
  <a href="https://highclasslimousineservices.com/" target="_blank" rel="noopener" class="hcl-promo-badge" id="hclPromoBadge">
    <div class="hcl-promo-badge-inner">
      <button class="hcl-badge-close" onclick="event.preventDefault();event.stopPropagation();dismissHclBadge();return false;" aria-label="Fermer la promotion">&times;</button>
      <div class="hcl-badge-text-wrap">
        <div class="hcl-badge-eyebrow">
          <span class="pulse-dot"></span>
          Arrivez avec Style
        </div>
        <div class="hcl-badge-offer">
          <span class="highlight">High Class</span> Limousine
        </div>
        <p class="hcl-badge-detail">
          Mariages, bals de fin d'année, aéroport et soirées à travers tout l'Uintah Basin. <strong>La Classe N'est Pas Éteinte.</strong>
        </p>
        <div class="hcl-badge-cta-row">
          <span class="hcl-badge-button">Roulez avec Style &rarr;</span>
          <span class="hcl-badge-logo-text">highclasslimousineservices.com</span>
        </div>
      </div>
    </div>
  </a>

  <script is:inline>
    // Dismiss badge for this session
    function dismissBwBadge() {
  var badge = document.getElementById('bwPromoBadge');
  if (badge) badge.classList.add('dismissed');
}
    function dismissHclBadge() {
  var badge = document.getElementById('hclPromoBadge');
  if (badge) badge.classList.add('dismissed');
}
</script>
`;

const DE = `

  <!-- KI-Zusammenfassung -->
  <p class="page-summary" style="position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;" aria-hidden="false">
    Adventure Tours Vernal bietet geführte UTV-Touren mit dem Kawasaki KRX 1000 Side-by-Side in Vernal, Utah. Zu den Pisten gehören Doc's Beach, Moonshine Arch, Ashley Gorge, Outlaw Trail und Asphalt Ridge. Auf den Touren erwarten dich Petroglyphen, Felskunst und antike Ruinen. $349 pro Fahrzeug für eine geführte 3-Stunden-Tour (bis zu 2 Personen). $125 für einen Mitfahrer mit Guide. Mindestens 3 Personen. Bis zu 12 Gäste pro Tour auf 6 Fahrzeugen. Utahs bestbewerteter UTV-Tour-Anbieter mit einer 5.0-Sterne-Bewertung aus 82 Google-Rezensionen. Täglich geöffnet von 7 bis 19 Uhr. Ruf (435) 219-9447 an, um zu buchen.
  </p>

  <!-- Hero-Bereich -->
  <div class="hero">
    <div class="trail-hero-video-bg">
  <iframe
    src="https://www.youtube.com/embed/BHOABkrNnnE?autoplay=1&mute=1&loop=1&playlist=BHOABkrNnnE&controls=0&showinfo=0&rel=0&playsinline=1"
    frameborder="0"
    allow="autoplay; encrypted-media"
    allowfullscreen>
  </iframe>
</div>
    <div class="hero-overlay"></div>

    <div class="hero-video-wrapper">
      <div class="video-frame-3d">
        <div class="video-frame-inner">
          <div class="video-play-overlay" id="videoPlayOverlay" onclick="playHeroVideo()">
            <img src="https://img.youtube.com/vi/eFfvKxkiyzU/maxresdefault.jpg" alt="Sieh dir Adventure Tours Vernal in Aktion an — geführte UTV-Touren in Vernal, Utah" class="video-thumbnail">
            <div class="play-overlay-content">
              <div class="play-icon-circle">▶</div>
              <span class="play-overlay-text">Klick, um das Video anzusehen</span>
            </div>
          </div>
          <div id="heroVideoContainer"></div>
        </div>
      </div>
    </div>

    <div class="hero-content">
      <h1 class="hero-title" style="font-size:clamp(1.8rem,4vw,3rem);font-weight:800;color:#fff;text-shadow:0 2px 12px rgba(0,0,0,0.5);margin-bottom:0.5rem;">
        Geführte UTV-Touren in Vernal, Utah
      </h1>
      <p class="hero-subtitle">Erlebe den Nervenkitzel von Utahs Backcountry bei geführten Abenteuern mit dem Kawasaki KRX 1000 Side-by-Side</p>
      <div style="margin-top:14px;"><span style="display:inline-flex;align-items:center;gap:8px;padding:7px 15px;border:1px solid rgba(255,255,255,0.5);border-radius:999px;background:rgba(0,0,0,0.35);font-size:0.95rem;color:#fff;"><span aria-hidden="true" style="color:#f5c451;letter-spacing:1px;">★★★★★</span> <span><strong>${SITE.rating.value}</strong> &middot; ${SITE.rating.count} Google-Rezensionen</span></span></div>
    </div>

    <div class="scroll-indicator"><span></span></div>
  </div>

    <!-- PREISKARTEN -->
    <div class="pricing-section">
      <h2>Einfache, transparente Preise</h2>
      <p>Keine versteckten Gebühren — nur Abenteuer. Mindestens 3 Personen pro Tour.</p>
      <div class="pricing-grid">
        <div class="pricing-card featured">
          <div class="pricing-label">Pro Fahrzeug</div>
          <div class="pricing-title">1–2 Personen, 1 KRX 1000</div>
          <div class="pricing-amount">$349</div>
          <div class="pricing-per">pro Fahrzeug / geführte 3-Stunden-Tour</div>
          <ul class="pricing-features">
            <li>Kawasaki KRX 1000, 2-Sitzer</li>
            <li>Bis zu 2 Personen pro Fahrzeug</li>
            <li>Erfahrene lokale Guides (Dave und Trudy)</li>
            <li>Auswahl aus 5 Pistensystemen</li>
            <li>FOX 2.5 PODIUM LSC Stoßdämpfer</li>
            <li>Vollständiges Sicherheitsbriefing und Ausrüstung</li>
          </ul>
          <a href="/de/booking/" class="tour-book-btn" style="display:block;text-align:center;text-decoration:none;">Jetzt buchen</a>
        </div>
        <div class="pricing-card">
          <div class="pricing-label">Mitfahrer-Zusatzoption</div>
          <div class="pricing-title">Fahr mit Dave oder Trudy mit</div>
          <div class="pricing-amount">$125</div>
          <div class="pricing-per">pro Person / geführte 3-Stunden-Tour</div>
          <ul class="pricing-features">
            <li>Füge deiner Gruppe eine 3. Person hinzu</li>
            <li>Fährt als Mitfahrer mit einem Guide mit</li>
            <li>Erfordert die Miete von mindestens 1 Fahrzeug</li>
            <li>2 Mitfahrer-Plätze pro Tour verfügbar</li>
            <li>Das volle Abenteuer, ganz ohne selbst zu fahren</li>
          </ul>
          <a href="/de/booking/" class="tour-book-btn" style="display:block;text-align:center;text-decoration:none;">Jetzt buchen</a>
        </div>
        <div class="pricing-card">
          <div class="pricing-label">Gruppen</div>
          <div class="pricing-title">Bis zu 12 Gäste</div>
          <div class="pricing-amount">Anrufen</div>
          <div class="pricing-per">individuelle Gruppenpreise</div>
          <ul class="pricing-features">
            <li>Bis zu 6 Fahrzeuge verfügbar</li>
            <li>10 Gäste auf 5 Fahrzeugen + 2 Mitfahrer</li>
            <li>Dave und Trudy führen gemeinsam</li>
            <li>Ideal für Familien und Treffen</li>
            <li>$99/Std. pro Fahrzeug für zusätzliche Zeit</li>
          </ul>
          <a href="tel:435-219-9447" class="tour-book-btn" style="display:block;text-align:center;text-decoration:none;">📞 (435) 219-9447</a>
        </div>
      </div>
    </div>

      <!-- Einzelner Buchen-Button unter allen Pisten -->
      <div style="text-align:center;margin-top:50px;">
        <a href="/de/booking/" class="btn btn-primary" style="font-size:1.25rem;padding:22px 70px;">
          📅 Buche dein Abenteuer
        </a>
        <p style="margin-top:14px;font-size:0.95rem;color:var(--charcoal);opacity:0.65;font-family:var(--font-body);">
          Du wählst deine Piste bei der Buchung — täglich geöffnet von 7 bis 19 Uhr
        </p>
      </div>

    </div>
  </section>

  <!-- Bereich Warum Vernal -->
  <section id="why-vernal">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Warum Vernal wählen?</h2>
        <p class="section-subtitle">Entdecke, was diese Ecke Utahs zu einem Offroad-Paradies macht</p>
      </div>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-image" style="background:#000;">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/PoCN4Lo9Lkk?si=CMj5hK0r2l5GeKFM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style="display:block;width:100%;height:100%;border:0;"></iframe>
          </div>
          <div class="feature-content">
            <h3 class="feature-title">Dinosaur National Monument</h3>
            <p class="feature-description">Fahr durch prähistorische Landschaften, in denen einst uralte Riesen wandelten, mit Zugang zu erstklassigen Fossilienfundstellen. <a href="/de/dinosaur-national-monument/" style="color:var(--burnt-orange);font-weight:600;">UTV-Touren in der Nähe des Monuments →</a></p>
          </div>
        </div>
        <div class="feature-card">
          <div class="feature-image" style="background:#000;">
            <iframe title="Video Embed" src="https://www.nps.gov/media/video/embed.htm?id=CD297DBD-5955-4AA8-BC53-1798793EC221" width="480" height="306" frameborder="0" scrolling="auto" allowfullscreen style="display:block;width:100%;height:100%;border:0;"></iframe>
          </div>
          <div class="feature-content">
            <h3 class="feature-title">Spuren einer alten Zivilisation</h3>
            <p class="feature-description">Entdecke Petroglyphen, Felskunst und Ruinen — Tausende Jahre indigener Geschichte, bewahrt im Gestein und in den Canyons des Uintah Basin. <a href="/de/dinosaur-national-monument/petroglyphs-rock-art-vernal/" style="color:var(--burnt-orange);font-weight:600;">Felskunst-Fundorte erkunden →</a></p>
          </div>
        </div>
        <div class="feature-card">
          <div class="feature-image" style="background:#000;">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/2fdxwBHky_Y?si=Mio585KlceDKRTHT" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style="display:block;width:100%;height:100%;border:0;"></iframe>
          </div>
          <div class="feature-content">
            <h3 class="feature-title">Versteckte Pisten</h3>
            <p class="feature-description">Erreiche geheime Routen und lokale Lieblingsplätze, die nur Einheimische aus Vernal kennen — Landschaften, die du sonst nirgendwo findest. <a href="/de/utv/backcountry-tours-vernal-utah/" style="color:var(--burnt-orange);font-weight:600;">Details zur Backcountry-Tour →</a></p>
          </div>
        </div>
        <div class="feature-card">
          <div class="feature-image" style="background:#000;">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/hmKWG8GZBiw?si=Nq5dULfRSYvpRsAQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style="display:block;width:100%;height:100%;border:0;"></iframe>
          </div>
          <div class="feature-content">
            <h3 class="feature-title">Malerische Felsbögen</h3>
            <p class="feature-description">Entdecke natürliche Sandsteinbögen und Formationen, die es mit Utahs berühmtesten Parks aufnehmen können — ganz ohne Menschenmassen. <a href="/de/utv/best-utv-trails-vernal/" style="color:var(--burnt-orange);font-weight:600;">Alle 5 Pistensysteme ansehen →</a></p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Bereich Fahrzeuge -->
  <section id="vehicles">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Unsere Flotte</h2>
        <p class="section-subtitle">6 Kawasaki KRX 1000 Fahrzeuge verfügbar — gewartet für Sicherheit und Leistung</p>
      </div>
      <div class="vehicles-grid">
        <div class="vehicle-card">
          <div class="vehicle-image" data-bg="/images/9.webp"></div>
          <div class="vehicle-content">
            <h3 class="vehicle-name">Kawasaki KRX 1000</h3>
            <ul class="vehicle-specs">
              <li><span class="spec-label">Flottengröße:</span><span class="spec-value">6 Fahrzeuge verfügbar</span></li>
              <li><span class="spec-label">Passagiere:</span><span class="spec-value">2-Sitzer</span></li>
              <li><span class="spec-label">Federung:</span><span class="spec-value">FOX 2.5 PODIUM LSC Stoßdämpfer</span></li>
              <li><span class="spec-label">Am besten für:</span><span class="spec-value">Rock Crawling und Komfort</span></li>
              <li><span class="spec-label">Sicherheit:</span><span class="spec-value">Vollständiger Überrollkäfig + Servolenkung</span></li>
              <li><span class="spec-label">Kapazität:</span><span class="spec-value">Bis zu 12 Gäste pro Tour</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>

 <!-- Bereich Galerie -->
  <section id="gallery">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Fotogalerie</h2>
        <p class="section-subtitle">Sieh dir das Abenteuer an, das auf dich wartet</p>
      </div>
      <div class="carousel-container">
        <div class="carousel-main">
          <button class="carousel-btn carousel-prev" aria-label="Vorheriges Bild"><span>‹</span></button>
          <div class="carousel-track-container">
            <div class="carousel-track">
              <div class="carousel-slide active"><img src="/images/1a.webp" alt="Side-by-side UTV parked in a sandstone alcove on an Adventure Tours Vernal UTV tour"><div class="carousel-caption">Exploring a Sandstone Alcove</div></div>
              <div class="carousel-slide"><img src="/images/1.webp" alt="Lineup of Kawasaki KRX 1000 side-by-sides staged before a guided UTV tour in Vernal Utah"><div class="carousel-caption">UTV Lineup Staging</div></div>
              <div class="carousel-slide"><img src="/images/2.webp" alt="Blue side-by-side UTV kicking up dust on a desert trail near Vernal Utah"><div class="carousel-caption">Kicking Up Dust</div></div>
              <div class="carousel-slide"><img src="/images/3.webp" alt="Group riding side-by-side UTVs on a backcountry trail near Vernal Utah"><div class="carousel-caption">Group on the Trail</div></div>
              <div class="carousel-slide"><img src="/images/4.webp" alt="Riders resting under a sandstone overhang at sunset on an Adventure Tours Vernal UTV tour"><div class="carousel-caption">Sunset Rock Overhang</div></div>
              <div class="carousel-slide"><img src="/images/5.webp" alt="Looking out from inside a sandstone cave on a guided UTV tour near Vernal Utah"><div class="carousel-caption">Inside a Sandstone Cave</div></div>
              <div class="carousel-slide"><img src="/images/6.webp" alt="Family posing inside a sandstone cave on an Adventure Tours Vernal UTV tour"><div class="carousel-caption">Family Cave Photo</div></div>
              <div class="carousel-slide"><img src="/images/7.webp" alt="UTV tire perched on a canyon rim overlooking Ashley Gorge near Vernal Utah"><div class="carousel-caption">On the Canyon's Edge</div></div>
              <div class="carousel-slide"><img src="/images/3a.webp" alt="Desert badlands landscape at sunset on a backcountry UTV tour near Vernal Utah"><div class="carousel-caption">Desert Badlands Sunset</div></div>
              <div class="carousel-slide"><img src="/images/8.webp" alt="Side-by-side UTV climbing a slickrock ridge on a guided tour near Vernal Utah"><div class="carousel-caption">Climbing a Slickrock Ridge</div></div>
              <div class="carousel-slide"><img src="/images/8a.webp" alt="Blue side-by-side UTV speeding through the high desert near Vernal Utah"><div class="carousel-caption">Speeding Through the Desert</div></div>
              <div class="carousel-slide"><img src="/images/9.webp" alt="Kawasaki KRX 1000 side-by-sides lined up under a rock overhang near Vernal Utah"><div class="carousel-caption">Lineup Under the Overhang</div></div>
              <div class="carousel-slide"><img src="/images/6a.webp" alt="Group stopped with their side-by-side UTVs along a backcountry trail near Vernal Utah"><div class="carousel-caption">Trailside Group Stop</div></div>
              <div class="carousel-slide"><img src="/images/10.webp" alt="Side-by-side UTV beside a slickrock canyon vista on a guided tour near Vernal Utah"><div class="carousel-caption">Slickrock Canyon Vista</div></div>
              <div class="carousel-slide"><img src="/images/11.webp" alt="Side-by-side UTV parked inside a sandstone cave near Vernal Utah"><div class="carousel-caption">UTV Inside the Cave</div></div>
              <div class="carousel-slide"><img src="/images/12.webp" alt="Towering sandstone cave wall on an Adventure Tours Vernal backcountry tour"><div class="carousel-caption">Towering Cave Wall</div></div>
              <div class="carousel-slide"><img src="/images/13.webp" alt="Rider leaping off a cliff into the water on an Adventure Tours Vernal outing near Vernal Utah"><div class="carousel-caption">Cliff Jumping Splash</div></div>
              <div class="carousel-slide"><img src="/images/14.webp" alt="Convoy of side-by-side UTVs on a mountain trail during a guided tour near Vernal Utah"><div class="carousel-caption">Convoy on the Mountain Trail</div></div>
              <div class="carousel-slide"><img src="/images/15a.webp" alt="Side-by-side UTV on slickrock at dusk near Dinosaur National Monument, Vernal Utah"><div class="carousel-caption">Dusk Desert Ride</div></div>
              <div class="carousel-slide"><img src="/images/35a.webp" alt="Three Kawasaki KRX 1000 side-by-sides silhouetted against a sunburst at sunset near Vernal Utah"><div class="carousel-caption">Sunset Trio Silhouette</div></div>
              <div class="carousel-slide"><img src="/images/16a.webp" alt="Riders standing atop slickrock beside their Kawasaki KRX 1000 side-by-sides near Vernal Utah"><div class="carousel-caption">Riders Atop the Slickrock</div></div>
              <div class="carousel-slide"><img src="/images/17a.webp" alt="Two side-by-side UTVs parked on slickrock near Vernal Utah"><div class="carousel-caption">Two UTVs on Slickrock</div></div>
              <div class="carousel-slide"><img src="/images/18a.webp" alt="Mud-covered side-by-side UTVs on slickrock after a guided tour near Vernal Utah"><div class="carousel-caption">Muddy UTVs on the Rock</div></div>
              <div class="carousel-slide"><img src="/images/19a.webp" alt="Muddy side-by-side UTV on a rock dome at an overlook near Vernal Utah"><div class="carousel-caption">Muddy UTV at the Overlook</div></div>
              <div class="carousel-slide"><img src="/images/20.webp" alt="Blue side-by-side UTV on slickrock high above the canyon near Vernal Utah"><div class="carousel-caption">Blue UTV on Slickrock</div></div>
              <div class="carousel-slide"><img src="/images/21a.webp" alt="Side-by-side UTVs silhouetted at sunset on a guided tour near Vernal Utah"><div class="carousel-caption">UTVs at Sunset</div></div>
              <div class="carousel-slide"><img src="/images/22a.webp" alt="Side-by-side UTV silhouetted against a sunburst on a sunset ride through the Utah desert backcountry"><div class="carousel-caption">Sunburst Silhouette</div></div>
              <div class="carousel-slide"><img src="/images/23a.webp" alt="Two side-by-side UTVs perched on a boulder on a backcountry tour near Vernal Utah"><div class="carousel-caption">Twin UTVs on a Boulder</div></div>
              <div class="carousel-slide"><img src="/images/23.webp" alt="Hikers exploring a sandstone arch on an Adventure Tours Vernal outing in Vernal Utah"><div class="carousel-caption">Hikers at the Sandstone Arch</div></div>
              <div class="carousel-slide"><img src="/images/24.webp" alt="Side-by-side UTVs atop a large boulder with a desert view near Vernal Utah"><div class="carousel-caption">UTVs Atop the Boulder</div></div>
              <div class="carousel-slide"><img src="/images/25.webp" alt="Muddy side-by-side UTVs overlooking the valley on a backcountry trail near Vernal Utah"><div class="carousel-caption">Muddy UTVs With a View</div></div>
              <div class="carousel-slide"><img src="/images/26.webp" alt="Side-by-side UTVs on a ridgetop at dusk near Vernal Utah"><div class="carousel-caption">Ridgetop UTVs at Dusk</div></div>
              <div class="carousel-slide"><img src="/images/27.webp" alt="Side-by-side UTVs on a rock ridge formation on a guided tour in Vernal Utah"><div class="carousel-caption">UTVs on the Rock Ridge</div></div>
              <div class="carousel-slide"><img src="/images/28.webp" alt="Side-by-side UTVs in the high desert on a backcountry tour near Vernal Utah"><div class="carousel-caption">UTVs in the High Desert</div></div>
              <div class="carousel-slide"><img src="/images/29.webp" alt="Side-by-side UTV at a slickrock dome overlook near Vernal Utah"><div class="carousel-caption">Slickrock Dome Overlook</div></div>
              <div class="carousel-slide"><img src="/images/30.webp" alt="Canyon country overlook on a backcountry UTV tour near Vernal Utah"><div class="carousel-caption">Canyon Country Overlook</div></div>
              <div class="carousel-slide"><img src="/images/31.webp" alt="Side-by-side UTV climbing the slickrock on a guided tour near Vernal Utah"><div class="carousel-caption">Climbing the Slickrock</div></div>
              <div class="carousel-slide"><img src="/images/32.webp" alt="Side-by-side UTV descending a steep rock face on a guided tour near Vernal Utah"><div class="carousel-caption">UTV Descending the Rock</div></div>
              <div class="carousel-slide"><img src="/images/33.webp" alt="Side-by-side UTV cresting boulders on a backcountry trail near Vernal Utah"><div class="carousel-caption">UTV Cresting the Boulders</div></div>
              <div class="carousel-slide"><img src="/images/34.webp" alt="Green side-by-side UTV on a desert trail near Vernal Utah"><div class="carousel-caption">Green UTV on the Trail</div></div>
              <div class="carousel-slide"><img src="/images/35.webp" alt="Side-by-side UTVs climbing slickrock on a guided tour near Vernal Utah"><div class="carousel-caption">UTVs Climbing Slickrock</div></div>
              <div class="carousel-slide"><img src="/images/36.webp" alt="Side-by-side UTVs on the slickrock on a backcountry tour near Vernal Utah"><div class="carousel-caption">UTVs on the Slickrock</div></div>
              <div class="carousel-slide"><img src="/images/37.webp" alt="Side-by-side UTVs climbing a sandstone ridge near Vernal Utah"><div class="carousel-caption">Climbing a Sandstone Ridge</div></div>
              <div class="carousel-slide"><img src="/images/39a.webp" alt="Side-by-side UTV parked below a desert butte near Vernal Utah"><div class="carousel-caption">Parked at the Butte</div></div>
              <div class="carousel-slide"><img src="/images/39.webp" alt="View through a rock arch toward a desert butte near Vernal Utah"><div class="carousel-caption">Through the Rock Arch</div></div>
              <div class="carousel-slide"><img src="/images/40.webp" alt="Muddy side-by-side UTV climbing rocks on a backcountry tour near Vernal Utah"><div class="carousel-caption">Muddy Rig Climbing</div></div>
              <div class="carousel-slide"><img src="/images/41.webp" alt="Side-by-side UTVs parked under a natural rock arch near Vernal Utah"><div class="carousel-caption">Side-by-Sides Under the Arch</div></div>
              <div class="carousel-slide"><img src="/images/42.webp" alt="Two side-by-side UTVs on a canyon trail through the Utah backcountry"><div class="carousel-caption">Canyon Trail Duo</div></div>
              <div class="carousel-slide"><img src="/images/43.webp" alt="Side-by-side UTV on a steep slickrock descent near Vernal Utah"><div class="carousel-caption">Steep Slickrock Descent</div></div>
              <div class="carousel-slide"><img src="/images/44.webp" alt="Guided side-by-side UTV rock crawl through a sandstone wash near Vernal Utah"><div class="carousel-caption">Guided Rock Crawl</div></div>
              <div class="carousel-slide"><img src="/images/45.webp" alt="Desert overlook at dusk on a backcountry UTV tour near Vernal Utah"><div class="carousel-caption">Overlook at Dusk</div></div>
              <div class="carousel-slide"><img src="/images/46.webp" alt="Side-by-side UTV tackling a deep rut on a backcountry trail near Vernal Utah"><div class="carousel-caption">Tackling the Rut</div></div>
              <div class="carousel-slide"><img src="/images/47.webp" alt="Side-by-side UTV splashing through a river crossing near Vernal Utah"><div class="carousel-caption">Splashing River Crossing</div></div>
              <div class="carousel-slide"><img src="/images/48.webp" alt="Doc's Beach trailhead sign on an Adventure Tours Vernal UTV tour near Vernal Utah"><div class="carousel-caption">Doc's Beach Trails</div></div>
              <div class="carousel-slide"><img src="/images/49.webp" alt="Fleet of Kawasaki KRX 1000 side-by-sides staged for a guided tour in Vernal Utah"><div class="carousel-caption">Staged Fleet Lineup</div></div>
              <div class="carousel-slide"><img src="/images/50.webp" alt="Tour group stopped with their side-by-side UTVs near Vernal Utah"><div class="carousel-caption">Group Trail Stop</div></div>
              <div class="carousel-slide"><img src="/images/51.webp" alt="Tour group with Kawasaki KRX 1000 side-by-sides on a ridge near Vernal Utah"><div class="carousel-caption">Tour Group Photo</div></div>
              <div class="carousel-slide"><img src="/images/52.webp" alt="Long line of side-by-side UTVs staged and ready for a guided tour near Vernal Utah"><div class="carousel-caption">Lined Up and Ready</div></div>
              <div class="carousel-slide"><img src="/images/53.webp" alt="Fleet of side-by-side UTVs staged on a hilltop near Vernal Utah"><div class="carousel-caption">Fleet at the Hilltop</div></div>
              <div class="carousel-slide"><img src="/images/54a.webp" alt="Side-by-side UTV charging through a muddy backcountry trail near Vernal Utah"><div class="carousel-caption">Muddy Trail Charge</div></div>
              <div class="carousel-slide"><img src="/images/55.webp" alt="Green Kawasaki side-by-side UTV crossing a muddy rut near Vernal Utah"><div class="carousel-caption">Green Machine in the Mud</div></div>
              <div class="carousel-slide"><img src="/images/56.webp" alt="Tour group gathered under a rock overhang with their side-by-side UTVs near Vernal Utah"><div class="carousel-caption">Group Under the Overhang</div></div>
              <div class="carousel-slide"><img src="/images/57a.webp" alt="Side-by-side UTVs parked at a cliffside on a guided tour near Vernal Utah"><div class="carousel-caption">UTVs at the Cliffside</div></div>
              <div class="carousel-slide"><img src="/images/58a.webp" alt="Rocky trail vista on a backcountry UTV tour near Vernal Utah"><div class="carousel-caption">Rock Trail Vista</div></div>
              <div class="carousel-slide"><img src="/images/58.webp" alt="Rider jumping off a cliff for a cool-down on an Adventure Tours Vernal outing near Vernal Utah"><div class="carousel-caption">Cliff Jump Cool Down</div></div>
              <div class="carousel-slide"><img src="/images/59.webp" alt="Side-by-side UTVs staged below a slickrock dome near Vernal Utah"><div class="carousel-caption">UTVs Staged Below</div></div>
              <div class="carousel-slide"><img src="/images/60.webp" alt="Blue side-by-side UTV conquering a slickrock dome with a guide near Vernal Utah"><div class="carousel-caption">Conquering the Slickrock</div></div>
              <div class="carousel-slide"><img src="/images/61.webp" alt="Three side-by-side UTVs rock crawling through the Utah backcountry"><div class="carousel-caption">Rock Crawling Trio</div></div>
              <div class="carousel-slide"><img src="/images/62a.webp" alt="Riders exploring cliff dwellings on an Adventure Tours Vernal UTV tour"><div class="carousel-caption">Exploring Cliff Dwellings</div></div>
              <div class="carousel-slide"><img src="/images/42a.webp" alt="Large natural sandstone arch above the valley on a guided UTV tour near Vernal Utah"><div class="carousel-caption">Natural Sandstone Arch</div></div>
              <div class="carousel-slide"><img src="/images/63.webp" alt="Tour group at a rock arch at sunset near Vernal Utah"><div class="carousel-caption">Sunset Arch Crew</div></div>
              <div class="carousel-slide"><img src="/images/64.webp" alt="Inside a sandstone cave on an Adventure Tours Vernal backcountry tour"><div class="carousel-caption">Inside the Cave</div></div>
              <div class="carousel-slide"><img src="/images/65a.webp" alt="Side-by-side UTV on a slickrock summit climb near Vernal Utah"><div class="carousel-caption">Slickrock Summit Climb</div></div>
              <div class="carousel-slide"><img src="/images/65.webp" alt="Side-by-side UTV on a river crossing adventure near Vernal Utah"><div class="carousel-caption">River Crossing Adventure</div></div>
              <div class="carousel-slide"><img src="/images/66.webp" alt="Side-by-side UTV parked at a canyon overlook near Vernal Utah"><div class="carousel-caption">Parked Machine Profile</div></div>
              <div class="carousel-slide"><img src="/images/67.webp" alt="Side-by-side UTV sending it over a sand dune near Vernal Utah"><div class="carousel-caption">Sand Dune Send</div></div>
              <div class="carousel-slide"><img src="/images/68.webp" alt="Side-by-side UTV parked beside a sandstone arch near Vernal Utah"><div class="carousel-caption">Parked at the Arch</div></div>
              <div class="carousel-slide"><img src="/images/70.webp" alt="Golden sandstone arch on a backcountry UTV tour near Vernal Utah"><div class="carousel-caption">Golden Rock Arch</div></div>
              <div class="carousel-slide"><img src="/images/71.webp" alt="Window opening in a sandstone cave near Vernal Utah"><div class="carousel-caption">Sandstone Cave Window</div></div>
              <div class="carousel-slide"><img src="/images/72.webp" alt="Trail along a towering canyon wall near Vernal Utah"><div class="carousel-caption">Canyon Wall Trail</div></div>
              <div class="carousel-slide"><img src="/images/73.webp" alt="Side-by-side UTVs parked under a sandstone arch near Vernal Utah"><div class="carousel-caption">UTVs Under the Arch</div></div>
              <div class="carousel-slide"><img src="/images/74.webp" alt="Interior of a sandstone cave on an Adventure Tours Vernal tour near Vernal Utah"><div class="carousel-caption">Cave Interior View</div></div>
              <div class="carousel-slide"><img src="/images/75.webp" alt="Towering rock overhang on a backcountry UTV tour near Vernal Utah"><div class="carousel-caption">Towering Rock Overhang</div></div>
              <div class="carousel-slide"><img src="/images/76.webp" alt="Three side-by-side UTVs on the canyon rim near Vernal Utah"><div class="carousel-caption">Three UTVs on the Canyon Rim</div></div>
              <div class="carousel-slide"><img src="/images/77.webp" alt="Couple posing at a cliff edge overlooking the canyon near Vernal Utah"><div class="carousel-caption">Couple at the Cliff Edge</div></div>
              <div class="carousel-slide"><img src="/images/78.webp" alt="Autumn canyon overlook on a backcountry UTV trail near Vernal Utah"><div class="carousel-caption">Autumn Canyon Overlook</div></div>
              <div class="carousel-slide"><img src="/images/79.webp" alt="Side-by-side UTV on an aspen-lined trail near Vernal Utah"><div class="carousel-caption">Aspen Trail Ride</div></div>
              <div class="carousel-slide"><img src="/images/80.webp" alt="Side-by-side UTV on a slickrock descent near Vernal Utah"><div class="carousel-caption">Slickrock Descent</div></div>
              <div class="carousel-slide"><img src="/images/81.webp" alt="Golden aspen trail on a guided side-by-side adventure near Vernal Utah"><div class="carousel-caption">Golden Aspen Trail</div></div>
              <div class="carousel-slide"><img src="/images/82.webp" alt="Side-by-side UTVs above the canyon on a backcountry tour near Vernal Utah"><div class="carousel-caption">UTVs Above the Canyon</div></div>
              <div class="carousel-slide"><img src="/images/83.webp" alt="View through a sandstone arch on an Adventure Tours Vernal tour near Vernal Utah"><div class="carousel-caption">Through the Arch</div></div>
              <div class="carousel-slide"><img src="/images/84.webp" alt="Side-by-side UTVs on slickrock under a stormy sky near Vernal Utah"><div class="carousel-caption">Slickrock Under the Storm</div></div>
              <div class="carousel-slide"><img src="/images/38.webp" alt="Blue side-by-side UTV kicking up dust on a desert trail near Vernal Utah"><div class="carousel-caption">Desert Dust Trail</div></div>
              <div class="carousel-slide"><img src="/images/85.webp" alt="Inside a sandstone cave looking out a window opening near Vernal Utah"><div class="carousel-caption">Inside a Sandstone Cave</div></div>
              <div class="carousel-slide"><img src="/images/86.webp" alt="Side-by-side UTVs at a mountaintop staging point near Vernal Utah"><div class="carousel-caption">Mountaintop Staging Point</div></div>
              <div class="carousel-slide"><img src="/images/87.webp" alt="Three side-by-side UTVs lined up on a guided tour near Vernal Utah"><div class="carousel-caption">Three UTVs Lined Up</div></div>
              <div class="carousel-slide"><img src="/images/99.webp" alt="Slickrock ridge view on a backcountry UTV tour near Vernal Utah"><div class="carousel-caption">Slickrock Ridge View</div></div>
              <div class="carousel-slide"><img src="/images/90.webp" alt="Side-by-side UTV climbing the slickrock near Vernal Utah"><div class="carousel-caption">Climbing the Slickrock</div></div>
              <div class="carousel-slide"><img src="/images/91.webp" alt="Side-by-side UTV on a slickrock climb under a stormy sky near Vernal Utah"><div class="carousel-caption">Stormy Slickrock Climb</div></div>
              <div class="carousel-slide"><img src="/images/92.webp" alt="Side-by-side UTV throwing dust on a desert trail near Vernal Utah"><div class="carousel-caption">Airborne Dust Trail</div></div>
              <div class="carousel-slide"><img src="/images/93.webp" alt="Side-by-side UTV on a steep ledge climb near Vernal Utah"><div class="carousel-caption">Steep Ledge Climb</div></div>
              <div class="carousel-slide"><img src="/images/94.webp" alt="Side-by-side UTV spraying sand through a turn near Vernal Utah"><div class="carousel-caption">Sand Spray Turn</div></div>
              <div class="carousel-slide"><img src="/images/95.webp" alt="Side-by-side UTV flying an American flag at rest near Vernal Utah"><div class="carousel-caption">American Flag UTV</div></div>
              <div class="carousel-slide"><img src="/images/96.webp" alt="Side-by-side UTV at a cliff edge at dusk near Vernal Utah"><div class="carousel-caption">Cliff Edge at Dusk</div></div>
              <div class="carousel-slide"><img src="/images/97.webp" alt="Side-by-side UTV on a ridgeline at twilight in the Utah desert backcountry"><div class="carousel-caption">Ridgeline at Twilight</div></div>
            </div>
          </div>
          <button class="carousel-btn carousel-next" aria-label="Nächstes Bild"><span>›</span></button>
        </div>
        <div class="carousel-indicators"></div>
        <div class="carousel-thumbnails"></div>
      </div>
    </div>
  </section>

  <!-- Bereich Buchung -->
  <section id="booking">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Bereit für das Abenteuer?</h2>
        <p class="section-subtitle">Buche sofort online oder ruf uns an — wir sind täglich von 7 bis 19 Uhr für dich da</p>
      </div>
      <div class="booking-container">
        <div class="phone-cta-wrapper">

          <!-- Online-Buchungs-Button -->
          <div style="margin-bottom:35px;">
            <a href="/de/booking/" class="btn btn-primary" style="font-size:1.2rem;padding:20px 60px;">
              📅 Buche dein Abenteuer online
            </a>
            <p style="margin-top:12px;font-size:0.95rem;color:var(--charcoal);opacity:0.7;font-family:var(--font-body);">
              Wähle deine Piste, Datum und Uhrzeit — sofortige Bestätigung
            </p>
          </div>

          <!-- Trennlinie -->
          <div style="display:flex;align-items:center;gap:20px;margin:10px 0 30px;">
            <div style="flex:1;height:1px;background:rgba(212,118,78,0.15);"></div>
            <span style="font-family:var(--font-heading);font-weight:700;color:var(--charcoal);opacity:0.5;font-size:0.9rem;">ODER RUF UNS AN</span>
            <div style="flex:1;height:1px;background:rgba(212,118,78,0.15);"></div>
          </div>

          <!-- Telefon -->
          <div class="phone-icon">📞</div>
          <h3 class="phone-cta-title">Ruf an, um deine Tour zu buchen</h3>
          <a href="tel:435-219-9447" class="phone-number-display">(435) 219-9447</a>
          <p class="phone-cta-subtitle">Täglich geöffnet • 7–19 Uhr (Rocky-Mountain-Zeit)</p>

          <div class="phone-benefits">
            <div class="phone-benefit"><span class="benefit-icon">✓</span><span>Sofortige Bestätigung</span></div>
            <div class="phone-benefit"><span class="benefit-icon">✓</span><span>Erfahrene lokale Guides</span></div>
            <div class="phone-benefit"><span class="benefit-icon">✓</span><span>Flexible Terminplanung</span></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Bereich Über-uns-CTA -->
  <section id="about">
    <div class="container">
      <div class="about-cta-simple">
        <h2 class="section-title">Lern die Familie Wilson kennen</h2>
        <p class="section-subtitle">Lokal geführt, sicherheitsorientiert, seit dem ersten Tag mit Leidenschaft für Abenteuer</p>
        <p>Erfahre mehr über unsere Geschichte, unsere Leidenschaft für das Uintah Basin, und warum Adventure Tours Vernal das führende UTV-Tourunternehmen in Vernal, Utah ist.</p>
        <a href="/de/about/" class="cta-button primary">Erfahre unsere Geschichte</a>
      </div>
    </div>
  </section>

  <div class="about-features">
    <div class="about-feature">
      <div class="about-feature-icon">✅</div>
      <span class="about-feature-text">Erfahrene lokale Guides mit fundiertem Wissen</span>
    </div>
    <div class="about-feature">
      <div class="about-feature-icon">🏅</div>
      <span class="about-feature-text">Professionelles Sicherheitstraining und Ausrüstung</span>
    </div>
    <div class="about-feature">
      <div class="about-feature-icon">🛡️</div>
      <span class="about-feature-text">Alle Erfahrungsstufen willkommen</span>
    </div>
    <div class="about-feature">
      <div class="about-feature-icon">🌟</div>
      <span class="about-feature-text">Vollständig lizenziert und versichert</span>
    </div>
  </div>
  <div class="about-image"></div>

  <!-- Bereich Vernal Erkunden -->
  <section id="explore-guides" style="padding:var(--section-padding);background:var(--light-sand);">
    <div class="container" style="max-width:var(--container-max);margin:0 auto;">
      <div class="section-header">
        <h2 class="section-title">Vernal erkunden</h2>
        <p class="section-subtitle">Plane deine Reise mit unseren lokalen Guides — alles, was du über Vernal, Utah wissen musst</p>
      </div>
      <div class="related-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:18px;max-width:1000px;margin:0 auto;">
        <a href="/de/things-to-do/" class="related-card" style="background:white;border-radius:14px;padding:20px;text-decoration:none;border:1px solid rgba(212,118,78,0.1);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);display:block;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;font-weight:700;color:var(--burnt-orange);margin-bottom:6px;">Unternehmungen in Vernal</h4>
          <p style="font-size:0.88rem;color:var(--charcoal);opacity:0.7;line-height:1.5;margin:0;">Der komplette Guide zu Aktivitäten und Sehenswürdigkeiten.</p>
        </a>
        <a href="/de/things-to-do/vernal-utah-attractions/" class="related-card" style="background:white;border-radius:14px;padding:20px;text-decoration:none;border:1px solid rgba(212,118,78,0.1);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);display:block;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;font-weight:700;color:var(--burnt-orange);margin-bottom:6px;">Top-Attraktionen in Vernal</h4>
          <p style="font-size:0.88rem;color:var(--charcoal);opacity:0.7;line-height:1.5;margin:0;">Sehenswürdigkeiten und Orte, die du nicht verpassen solltest.</p>
        </a>
        <a href="/de/things-to-do/fun-things-to-do-vernal-utah-kids/" class="related-card" style="background:white;border-radius:14px;padding:20px;text-decoration:none;border:1px solid rgba(212,118,78,0.1);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);display:block;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;font-weight:700;color:var(--burnt-orange);margin-bottom:6px;">Familienaktivitäten</h4>
          <p style="font-size:0.88rem;color:var(--charcoal);opacity:0.7;line-height:1.5;margin:0;">Spaß mit Kindern in Vernal.</p>
        </a>
        <a href="/de/things-to-do/" class="related-card" style="background:white;border-radius:14px;padding:20px;text-decoration:none;border:1px solid rgba(212,118,78,0.1);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);display:block;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;font-weight:700;color:var(--burnt-orange);margin-bottom:6px;">Aktivitäten im Freien</h4>
          <p style="font-size:0.88rem;color:var(--charcoal);opacity:0.7;line-height:1.5;margin:0;">Wandern, Angeln, UTV-Touren und mehr.</p>
        </a>
        <a href="/de/atv-trails-vernal-utah/" class="related-card" style="background:white;border-radius:14px;padding:20px;text-decoration:none;border:1px solid rgba(212,118,78,0.1);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);display:block;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;font-weight:700;color:var(--burnt-orange);margin-bottom:6px;">ATV-Pisten in der Nähe von Vernal</h4>
          <p style="font-size:0.88rem;color:var(--charcoal);opacity:0.7;line-height:1.5;margin:0;">Offroad-Pistensysteme und Geländeführer.</p>
        </a>
        <a href="/de/utv/side-by-side-rentals-vernal-utah/" class="related-card" style="background:white;border-radius:14px;padding:20px;text-decoration:none;border:1px solid rgba(212,118,78,0.1);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);display:block;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;font-weight:700;color:var(--burnt-orange);margin-bottom:6px;">Side-by-Side-Touren vs. Vermietung</h4>
          <p style="font-size:0.88rem;color:var(--charcoal);opacity:0.7;line-height:1.5;margin:0;">Warum geführte Touren besser sind als selbstgeführte Vermietungen.</p>
        </a>
        <a href="/de/dinosaur-national-monument/" class="related-card" style="background:white;border-radius:14px;padding:20px;text-decoration:none;border:1px solid rgba(212,118,78,0.1);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);display:block;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;font-weight:700;color:var(--burnt-orange);margin-bottom:6px;">Dinosaurier-Monument-Touren</h4>
          <p style="font-size:0.88rem;color:var(--charcoal);opacity:0.7;line-height:1.5;margin:0;">UTV-Touren in der Nähe des Monuments.</p>
        </a>
        <a href="/de/dinosaur-national-monument/visiting-dinosaur-national-monument/" class="related-card" style="background:white;border-radius:14px;padding:20px;text-decoration:none;border:1px solid rgba(212,118,78,0.1);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);display:block;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;font-weight:700;color:var(--burnt-orange);margin-bottom:6px;">Der ultimative Guide zum Dinosaur National Monument</h4>
          <p style="font-size:0.88rem;color:var(--charcoal);opacity:0.7;line-height:1.5;margin:0;">Der komplette Guide für deine Reiseplanung — Fossilien, Petroglyphen, Panoramastraßen und mehr.</p>
        </a>
        <a href="/de/utv/group-utv-tours-vernal/" class="related-card" style="background:white;border-radius:14px;padding:20px;text-decoration:none;border:1px solid rgba(212,118,78,0.1);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);display:block;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;font-weight:700;color:var(--burnt-orange);margin-bottom:6px;">Gruppen- und Privattouren</h4>
          <p style="font-size:0.88rem;color:var(--charcoal);opacity:0.7;line-height:1.5;margin:0;">Familien, Treffen, Firmenausflüge.</p>
        </a>
      </div>
    </div>
  </section>

  <!-- Mobiler Sticky-CTA -->
  <div class="mobile-sticky-cta">
    <button onclick="location.href='/de/booking/'">Jetzt deine Tour buchen</button>
  </div>

  <script is:inline src="https://player.vimeo.com/api/player.js"></script>
  <script is:inline>
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    // Background images from data attributes
    document.querySelectorAll('[data-bg]').forEach(element => {
      element.style.backgroundImage = \`url('\${element.getAttribute('data-bg')}')\`;
      element.style.backgroundSize = 'cover';
      element.style.backgroundPosition = 'center';
    });

    // Scroll indicator fade
    window.addEventListener('scroll', () => {
      const scrollIndicator = document.querySelector('.scroll-indicator');
      if (scrollIndicator) scrollIndicator.style.opacity = window.pageYOffset > 100 ? '0' : '1';
    });

    // Carousel
    class Carousel {
      constructor() {
        this.track = document.querySelector('.carousel-track');
        this.slides = Array.from(document.querySelectorAll('.carousel-slide'));
        this.prevBtn = document.querySelector('.carousel-prev');
        this.nextBtn = document.querySelector('.carousel-next');
        this.indicatorsContainer = document.querySelector('.carousel-indicators');
        this.currentIndex = 0;
        this.autoPlayInterval = null;
        this.isTransitioning = false;
        this.init();
      }
      init() {
        this.createIndicators();
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        document.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowLeft') this.prevSlide();
          if (e.key === 'ArrowRight') this.nextSlide();
        });
        this.addTouchSupport();
        this.startAutoPlay();
        this.track.parentElement.parentElement.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.track.parentElement.parentElement.addEventListener('mouseleave', () => this.startAutoPlay());
      }
      createIndicators() {
        this.slides.forEach((_, index) => {
          const indicator = document.createElement('button');
          indicator.classList.add('carousel-indicator');
          if (index === 0) indicator.classList.add('active');
          indicator.addEventListener('click', () => this.goToSlide(index));
          this.indicatorsContainer.appendChild(indicator);
        });
        this.indicators = Array.from(this.indicatorsContainer.querySelectorAll('.carousel-indicator'));
      }
      updateCarousel() {
        if (this.isTransitioning) return;
        this.isTransitioning = true;
        this.track.style.transform = \`translateX(-\${this.currentIndex * 100}%)\`;
        this.slides.forEach((slide, index) => slide.classList.toggle('active', index === this.currentIndex));
        this.indicators.forEach((indicator, index) => indicator.classList.toggle('active', index === this.currentIndex));
        setTimeout(() => { this.isTransitioning = false; }, 500);
      }
      nextSlide() { this.currentIndex = (this.currentIndex + 1) % this.slides.length; this.updateCarousel(); }
      prevSlide() { this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length; this.updateCarousel(); }
      goToSlide(index) { this.currentIndex = index; this.updateCarousel(); }
      startAutoPlay() { this.autoPlayInterval = setInterval(() => this.nextSlide(), 5000); }
      stopAutoPlay() { if (this.autoPlayInterval) { clearInterval(this.autoPlayInterval); this.autoPlayInterval = null; } }
      addTouchSupport() {
        let touchStartX = 0;
        this.track.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; });
        this.track.addEventListener('touchend', (e) => {
          const diff = touchStartX - e.changedTouches[0].screenX;
          if (Math.abs(diff) > 50) diff > 0 ? this.nextSlide() : this.prevSlide();
        });
      }
    }
    if (document.querySelector('.carousel-track')) new Carousel();

    // Floating video
    function closeFloatingVideo() {
      document.getElementById('floatingVideo').style.display = 'none';
    }
    window.addEventListener('scroll', () => {
      const floatingVideo = document.getElementById('floatingVideo');
      if (window.pageYOffset > 300 && floatingVideo) floatingVideo.classList.add('visible');
    });

    // Scroll spy
    function updateActiveNavLink() {
      const sections = document.querySelectorAll('section[id]');
      const navLinks = document.querySelectorAll('.nav-menu > li > a[href^="#"]:not(.dropdown-toggle)');
      let currentSection = '';
      const scrollPosition = window.pageYOffset + 200;
      sections.forEach(section => {
        if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
          currentSection = section.getAttribute('id');
        }
      });
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === \`#\${currentSection}\`) link.classList.add('active');
      });
    }
    window.addEventListener('scroll', updateActiveNavLink);
    window.addEventListener('load', updateActiveNavLink);

    // Hero video play
    function playHeroVideo() {
      document.getElementById('videoPlayOverlay').classList.add('hidden');
      document.getElementById('heroVideoContainer').innerHTML = '<iframe src="https://www.youtube.com/embed/eFfvKxkiyzU?si=rAXO-MccKZ1-6GgK&autoplay=1" title="Adventure Tours Vernal — Guided UTV Tours in Vernal Utah" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>';
    }
  </script>


  <!-- Best Western Unterkunfts-Promo -->
  <a href="https://bestwesternvernal.com" target="_blank" rel="noopener" class="bw-promo-badge" id="bwPromoBadge">
    <div class="bw-promo-badge-inner">
      <button class="bw-badge-close" onclick="event.preventDefault();event.stopPropagation();dismissBwBadge();return false;" aria-label="Promo schließen">&times;</button>
      <div class="bw-badge-text-wrap">
        <div class="bw-badge-eyebrow">
          <span class="pulse-dot"></span>
          Übernachtungs- und Tour-Angebot
        </div>
        <div class="bw-badge-offer">
          <span class="highlight">10% Rabatt</span> auf Unterkunft
        </div>
        <p class="bw-badge-detail">
          Buche im <strong>Best Western Vernal</strong> &mdash; erwähne <strong>"Adventure Tours"</strong>, wenn du anrufst.
        </p>
        <div class="bw-badge-cta-row">
          <span class="bw-badge-button">Unterkunft buchen &rarr;</span>
          <span class="bw-badge-logo-text">bestwesternvernal.com</span>
        </div>
      </div>
    </div>
  </a>

  <!-- High Class Limousine Promo -->
  <a href="https://highclasslimousineservices.com/" target="_blank" rel="noopener" class="hcl-promo-badge" id="hclPromoBadge">
    <div class="hcl-promo-badge-inner">
      <button class="hcl-badge-close" onclick="event.preventDefault();event.stopPropagation();dismissHclBadge();return false;" aria-label="Promo schließen">&times;</button>
      <div class="hcl-badge-text-wrap">
        <div class="hcl-badge-eyebrow">
          <span class="pulse-dot"></span>
          Stilvoll ankommen
        </div>
        <div class="hcl-badge-offer">
          <span class="highlight">High Class</span> Limousine
        </div>
        <p class="hcl-badge-detail">
          Hochzeiten, Abschlussbälle, Flughafentransfers und Ausflüge in der ganzen Uintah Basin. <strong>Klasse stirbt nicht aus.</strong>
        </p>
        <div class="hcl-badge-cta-row">
          <span class="hcl-badge-button">Stilvoll unterwegs &rarr;</span>
          <span class="hcl-badge-logo-text">highclasslimousineservices.com</span>
        </div>
      </div>
    </div>
  </a>

  <script is:inline>
    // Dismiss badge for this session
    function dismissBwBadge() {
  var badge = document.getElementById('bwPromoBadge');
  if (badge) badge.classList.add('dismissed');
}
    function dismissHclBadge() {
  var badge = document.getElementById('hclPromoBadge');
  if (badge) badge.classList.add('dismissed');
}
</script>
`;

const JA = `

  <!-- AI向け要約ブロック -->
  <p class="page-summary" style="position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;" aria-hidden="false">
    Adventure Tours Vernalは、ユタ州バーナルでKawasaki KRX 1000サイドバイサイドUTVのガイド付きツアーを催行しています。トレイルはDoc's Beach、Moonshine Arch、Ashley Gorge、Outlaw Trail、Asphalt Ridgeです。ツアーではペトログリフや岩絵、古代の遺構をご覧いただけます。3時間のガイドツアーは1台$349（最大2名乗車）。ガイドの車両への同乗は1名$125です。最少催行人数は3名。1ツアーにつき6台・最大12名まで対応します。Googleレビュー82件で5.0という、ユタ州で最も高い評価を受けているUTVツアー会社です。年中無休、午前7時〜午後7時営業。ご予約は(435) 219-9447までお電話ください。
  </p>

  <!-- ヒーローセクション -->
  <div class="hero">
    <div class="trail-hero-video-bg">
  <iframe
    src="https://www.youtube.com/embed/BHOABkrNnnE?autoplay=1&mute=1&loop=1&playlist=BHOABkrNnnE&controls=0&showinfo=0&rel=0&playsinline=1"
    frameborder="0"
    allow="autoplay; encrypted-media"
    allowfullscreen>
  </iframe>
</div>
    <div class="hero-overlay"></div>

    <div class="hero-video-wrapper">
      <div class="video-frame-3d">
        <div class="video-frame-inner">
          <div class="video-play-overlay" id="videoPlayOverlay" onclick="playHeroVideo()">
            <img src="https://img.youtube.com/vi/eFfvKxkiyzU/maxresdefault.jpg" alt="Adventure Tours Vernalの走りをご覧ください — ユタ州バーナルのガイド付きUTVツアー" class="video-thumbnail">
            <div class="play-overlay-content">
              <div class="play-icon-circle">▶</div>
              <span class="play-overlay-text">クリックして動画を再生</span>
            </div>
          </div>
          <div id="heroVideoContainer"></div>
        </div>
      </div>
    </div>

    <div class="hero-content">
      <h1 class="hero-title" style="font-size:clamp(1.8rem,4vw,3rem);font-weight:800;color:#fff;text-shadow:0 2px 12px rgba(0,0,0,0.5);margin-bottom:0.5rem;">
        ユタ州バーナルのガイド付きUTVツアー
      </h1>
      <p class="hero-subtitle">Kawasaki KRX 1000サイドバイサイドのガイド付きアドベンチャーで、ユタのバックカントリーの興奮を味わってください</p>
      <div style="margin-top:14px;"><span style="display:inline-flex;align-items:center;gap:8px;padding:7px 15px;border:1px solid rgba(255,255,255,0.5);border-radius:999px;background:rgba(0,0,0,0.35);font-size:0.95rem;color:#fff;"><span aria-hidden="true" style="color:#f5c451;letter-spacing:1px;">★★★★★</span> <span><strong>${SITE.rating.value}</strong> &middot; ${SITE.rating.count}件のGoogleレビュー</span></span></div>
    </div>

    <div class="scroll-indicator"><span></span></div>
  </div>

    <!-- 料金カード -->
    <div class="pricing-section">
      <h2>シンプルで明朗な料金</h2>
      <p>隠れた費用は一切ありません — あるのは冒険だけです。1ツアーにつき最少3名から。</p>
      <div class="pricing-grid">
        <div class="pricing-card featured">
          <div class="pricing-label">1台あたり</div>
          <div class="pricing-title">1–2名乗車、KRX 1000を1台</div>
          <div class="pricing-amount">$349</div>
          <div class="pricing-per">1台あたり / 3時間のガイドツアー</div>
          <ul class="pricing-features">
            <li>Kawasaki KRX 1000（2人乗り）</li>
            <li>1台につき最大2名まで乗車できます</li>
            <li>地元を知り尽くしたガイド（Dave &amp; Trudy）</li>
            <li>5つのトレイルシステムから選べます</li>
            <li>FOX 2.5 PODIUM LSC ショック</li>
            <li>安全説明と装備一式つき</li>
          </ul>
          <a href="/ja/booking/" class="tour-book-btn" style="display:block;text-align:center;text-decoration:none;">今すぐ予約</a>
        </div>
        <div class="pricing-card">
          <div class="pricing-label">同乗オプション</div>
          <div class="pricing-title">DaveまたはTrudyの車両に同乗</div>
          <div class="pricing-amount">$125</div>
          <div class="pricing-per">同乗者1名あたり / 3時間のガイドツアー</div>
          <ul class="pricing-features">
            <li>グループに3人目を追加できます</li>
            <li>ガイドの車両に乗客として同乗します</li>
            <li>1台以上のレンタルが必要です</li>
            <li>1ツアーにつき同乗枠は2席です</li>
            <li>運転せずに冒険をまるごと楽しめます</li>
          </ul>
          <a href="/ja/booking/" class="tour-book-btn" style="display:block;text-align:center;text-decoration:none;">今すぐ予約</a>
        </div>
        <div class="pricing-card">
          <div class="pricing-label">グループ</div>
          <div class="pricing-title">最大12名まで</div>
          <div class="pricing-amount">お電話で</div>
          <div class="pricing-per">グループ向けの個別料金</div>
          <ul class="pricing-features">
            <li>最大6台までご用意できます</li>
            <li>5台に10名 + 同乗2名</li>
            <li>DaveとTrudyが2人でご案内します</li>
            <li>ご家族や親族の集まりに最適です</li>
            <li>延長時間は1台あたり$99/hr</li>
          </ul>
          <a href="tel:435-219-9447" class="tour-book-btn" style="display:block;text-align:center;text-decoration:none;">📞 (435) 219-9447</a>
        </div>
      </div>
    </div>

      <!-- 全トレイルの下に置く予約ボタン -->
      <div style="text-align:center;margin-top:50px;">
        <a href="/ja/booking/" class="btn btn-primary" style="font-size:1.25rem;padding:22px 70px;">
          📅 冒険を予約する
        </a>
        <p style="margin-top:14px;font-size:0.95rem;color:var(--charcoal);opacity:0.65;font-family:var(--font-body);">
          トレイルはご予約時にお選びいただけます — 年中無休、午前7時〜午後7時営業
        </p>
      </div>

    </div>
  </section>

  <!-- なぜバーナルなのかセクション -->
  <section id="why-vernal">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">なぜバーナルなのか</h2>
        <p class="section-subtitle">ユタ州のこの一角がオフロードの楽園である理由をご紹介します</p>
      </div>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-image" style="background:#000;">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/PoCN4Lo9Lkk?si=CMj5hK0r2l5GeKFM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style="display:block;width:100%;height:100%;border:0;"></iframe>
          </div>
          <div class="feature-content">
            <h3 class="feature-title">Dinosaur National Monument</h3>
            <p class="feature-description">かつて太古の巨大生物が歩き回った先史時代の風景を走り抜け、世界有数の化石産地へ足を延ばせます。 <a href="/dinosaur-national-monument/" style="color:var(--burnt-orange);font-weight:600;">モニュメント周辺のUTVツアー →</a></p>
          </div>
        </div>
        <div class="feature-card">
          <div class="feature-image" style="background:#000;">
            <iframe title="Video Embed" src="https://www.nps.gov/media/video/embed.htm?id=CD297DBD-5955-4AA8-BC53-1798793EC221" width="480" height="306" frameborder="0" scrolling="auto" allowfullscreen style="display:block;width:100%;height:100%;border:0;"></iframe>
          </div>
          <div class="feature-content">
            <h3 class="feature-title">古代文明の痕跡</h3>
            <p class="feature-description">ペトログリフや岩絵、遺構を訪ねます — Uintah Basinの岩と峡谷に、数千年にわたる先住民の歴史が刻まれています。 <a href="/ja/dinosaur-national-monument/petroglyphs-rock-art-vernal/" style="color:var(--burnt-orange);font-weight:600;">岩絵のあるスポットを見る →</a></p>
          </div>
        </div>
        <div class="feature-card">
          <div class="feature-image" style="background:#000;">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/2fdxwBHky_Y?si=Mio585KlceDKRTHT" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style="display:block;width:100%;height:100%;border:0;"></iframe>
          </div>
          <div class="feature-content">
            <h3 class="feature-title">知る人ぞ知るトレイル</h3>
            <p class="feature-description">地元バーナルの人しか知らない秘密のルートやお気に入りの場所へご案内します — ほかでは出会えない景色が広がります。 <a href="/ja/utv/backcountry-tours-vernal-utah/" style="color:var(--burnt-orange);font-weight:600;">バックカントリーツアーの詳細 →</a></p>
          </div>
        </div>
        <div class="feature-card">
          <div class="feature-image" style="background:#000;">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/hmKWG8GZBiw?si=Nq5dULfRSYvpRsAQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style="display:block;width:100%;height:100%;border:0;"></iframe>
          </div>
          <div class="feature-content">
            <h3 class="feature-title">絶景のアーチ</h3>
            <p class="feature-description">ユタ州の名高い国立公園にも引けを取らない天然の砂岩アーチや奇岩を、人混みなしで楽しめます。 <a href="/ja/utv/best-utv-trails-vernal/" style="color:var(--burnt-orange);font-weight:600;">5つのトレイルシステムをすべて見る →</a></p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 車両セクション -->
  <section id="vehicles">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">私たちの車両</h2>
        <p class="section-subtitle">Kawasaki KRX 1000を6台ご用意 — 安全性と走行性能のために整備しています</p>
      </div>
      <div class="vehicles-grid">
        <div class="vehicle-card">
          <div class="vehicle-image" data-bg="/images/9.webp"></div>
          <div class="vehicle-content">
            <h3 class="vehicle-name">Kawasaki KRX 1000</h3>
            <ul class="vehicle-specs">
              <li><span class="spec-label">保有台数：</span><span class="spec-value">6台ご用意しています</span></li>
              <li><span class="spec-label">乗車定員：</span><span class="spec-value">2人乗り</span></li>
              <li><span class="spec-label">サスペンション：</span><span class="spec-value">FOX 2.5 PODIUM LSC ショック</span></li>
              <li><span class="spec-label">得意な走り：</span><span class="spec-value">ロッククロールと快適性</span></li>
              <li><span class="spec-label">安全装備：</span><span class="spec-value">フルロールケージ + パワーステアリング</span></li>
              <li><span class="spec-label">対応人数：</span><span class="spec-value">1ツアーにつき最大12名</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>

 <!-- ギャラリーセクション -->
  <section id="gallery">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">フォトギャラリー</h2>
        <p class="section-subtitle">これから始まる冒険をご覧ください</p>
      </div>
      <div class="carousel-container">
        <div class="carousel-main">
          <button class="carousel-btn carousel-prev" aria-label="前の画像"><span>‹</span></button>
          <div class="carousel-track-container">
            <div class="carousel-track">
              <div class="carousel-slide active"><img src="/images/1a.webp" alt="Side-by-side UTV parked in a sandstone alcove on an Adventure Tours Vernal UTV tour"><div class="carousel-caption">Exploring a Sandstone Alcove</div></div>
              <div class="carousel-slide"><img src="/images/1.webp" alt="Lineup of Kawasaki KRX 1000 side-by-sides staged before a guided UTV tour in Vernal Utah"><div class="carousel-caption">UTV Lineup Staging</div></div>
              <div class="carousel-slide"><img src="/images/2.webp" alt="Blue side-by-side UTV kicking up dust on a desert trail near Vernal Utah"><div class="carousel-caption">Kicking Up Dust</div></div>
              <div class="carousel-slide"><img src="/images/3.webp" alt="Group riding side-by-side UTVs on a backcountry trail near Vernal Utah"><div class="carousel-caption">Group on the Trail</div></div>
              <div class="carousel-slide"><img src="/images/4.webp" alt="Riders resting under a sandstone overhang at sunset on an Adventure Tours Vernal UTV tour"><div class="carousel-caption">Sunset Rock Overhang</div></div>
              <div class="carousel-slide"><img src="/images/5.webp" alt="Looking out from inside a sandstone cave on a guided UTV tour near Vernal Utah"><div class="carousel-caption">Inside a Sandstone Cave</div></div>
              <div class="carousel-slide"><img src="/images/6.webp" alt="Family posing inside a sandstone cave on an Adventure Tours Vernal UTV tour"><div class="carousel-caption">Family Cave Photo</div></div>
              <div class="carousel-slide"><img src="/images/7.webp" alt="UTV tire perched on a canyon rim overlooking Ashley Gorge near Vernal Utah"><div class="carousel-caption">On the Canyon's Edge</div></div>
              <div class="carousel-slide"><img src="/images/3a.webp" alt="Desert badlands landscape at sunset on a backcountry UTV tour near Vernal Utah"><div class="carousel-caption">Desert Badlands Sunset</div></div>
              <div class="carousel-slide"><img src="/images/8.webp" alt="Side-by-side UTV climbing a slickrock ridge on a guided tour near Vernal Utah"><div class="carousel-caption">Climbing a Slickrock Ridge</div></div>
              <div class="carousel-slide"><img src="/images/8a.webp" alt="Blue side-by-side UTV speeding through the high desert near Vernal Utah"><div class="carousel-caption">Speeding Through the Desert</div></div>
              <div class="carousel-slide"><img src="/images/9.webp" alt="Kawasaki KRX 1000 side-by-sides lined up under a rock overhang near Vernal Utah"><div class="carousel-caption">Lineup Under the Overhang</div></div>
              <div class="carousel-slide"><img src="/images/6a.webp" alt="Group stopped with their side-by-side UTVs along a backcountry trail near Vernal Utah"><div class="carousel-caption">Trailside Group Stop</div></div>
              <div class="carousel-slide"><img src="/images/10.webp" alt="Side-by-side UTV beside a slickrock canyon vista on a guided tour near Vernal Utah"><div class="carousel-caption">Slickrock Canyon Vista</div></div>
              <div class="carousel-slide"><img src="/images/11.webp" alt="Side-by-side UTV parked inside a sandstone cave near Vernal Utah"><div class="carousel-caption">UTV Inside the Cave</div></div>
              <div class="carousel-slide"><img src="/images/12.webp" alt="Towering sandstone cave wall on an Adventure Tours Vernal backcountry tour"><div class="carousel-caption">Towering Cave Wall</div></div>
              <div class="carousel-slide"><img src="/images/13.webp" alt="Rider leaping off a cliff into the water on an Adventure Tours Vernal outing near Vernal Utah"><div class="carousel-caption">Cliff Jumping Splash</div></div>
              <div class="carousel-slide"><img src="/images/14.webp" alt="Convoy of side-by-side UTVs on a mountain trail during a guided tour near Vernal Utah"><div class="carousel-caption">Convoy on the Mountain Trail</div></div>
              <div class="carousel-slide"><img src="/images/15a.webp" alt="Side-by-side UTV on slickrock at dusk near Dinosaur National Monument, Vernal Utah"><div class="carousel-caption">Dusk Desert Ride</div></div>
              <div class="carousel-slide"><img src="/images/35a.webp" alt="Three Kawasaki KRX 1000 side-by-sides silhouetted against a sunburst at sunset near Vernal Utah"><div class="carousel-caption">Sunset Trio Silhouette</div></div>
              <div class="carousel-slide"><img src="/images/16a.webp" alt="Riders standing atop slickrock beside their Kawasaki KRX 1000 side-by-sides near Vernal Utah"><div class="carousel-caption">Riders Atop the Slickrock</div></div>
              <div class="carousel-slide"><img src="/images/17a.webp" alt="Two side-by-side UTVs parked on slickrock near Vernal Utah"><div class="carousel-caption">Two UTVs on Slickrock</div></div>
              <div class="carousel-slide"><img src="/images/18a.webp" alt="Mud-covered side-by-side UTVs on slickrock after a guided tour near Vernal Utah"><div class="carousel-caption">Muddy UTVs on the Rock</div></div>
              <div class="carousel-slide"><img src="/images/19a.webp" alt="Muddy side-by-side UTV on a rock dome at an overlook near Vernal Utah"><div class="carousel-caption">Muddy UTV at the Overlook</div></div>
              <div class="carousel-slide"><img src="/images/20.webp" alt="Blue side-by-side UTV on slickrock high above the canyon near Vernal Utah"><div class="carousel-caption">Blue UTV on Slickrock</div></div>
              <div class="carousel-slide"><img src="/images/21a.webp" alt="Side-by-side UTVs silhouetted at sunset on a guided tour near Vernal Utah"><div class="carousel-caption">UTVs at Sunset</div></div>
              <div class="carousel-slide"><img src="/images/22a.webp" alt="Side-by-side UTV silhouetted against a sunburst on a sunset ride through the Utah desert backcountry"><div class="carousel-caption">Sunburst Silhouette</div></div>
              <div class="carousel-slide"><img src="/images/23a.webp" alt="Two side-by-side UTVs perched on a boulder on a backcountry tour near Vernal Utah"><div class="carousel-caption">Twin UTVs on a Boulder</div></div>
              <div class="carousel-slide"><img src="/images/23.webp" alt="Hikers exploring a sandstone arch on an Adventure Tours Vernal outing in Vernal Utah"><div class="carousel-caption">Hikers at the Sandstone Arch</div></div>
              <div class="carousel-slide"><img src="/images/24.webp" alt="Side-by-side UTVs atop a large boulder with a desert view near Vernal Utah"><div class="carousel-caption">UTVs Atop the Boulder</div></div>
              <div class="carousel-slide"><img src="/images/25.webp" alt="Muddy side-by-side UTVs overlooking the valley on a backcountry trail near Vernal Utah"><div class="carousel-caption">Muddy UTVs With a View</div></div>
              <div class="carousel-slide"><img src="/images/26.webp" alt="Side-by-side UTVs on a ridgetop at dusk near Vernal Utah"><div class="carousel-caption">Ridgetop UTVs at Dusk</div></div>
              <div class="carousel-slide"><img src="/images/27.webp" alt="Side-by-side UTVs on a rock ridge formation on a guided tour in Vernal Utah"><div class="carousel-caption">UTVs on the Rock Ridge</div></div>
              <div class="carousel-slide"><img src="/images/28.webp" alt="Side-by-side UTVs in the high desert on a backcountry tour near Vernal Utah"><div class="carousel-caption">UTVs in the High Desert</div></div>
              <div class="carousel-slide"><img src="/images/29.webp" alt="Side-by-side UTV at a slickrock dome overlook near Vernal Utah"><div class="carousel-caption">Slickrock Dome Overlook</div></div>
              <div class="carousel-slide"><img src="/images/30.webp" alt="Canyon country overlook on a backcountry UTV tour near Vernal Utah"><div class="carousel-caption">Canyon Country Overlook</div></div>
              <div class="carousel-slide"><img src="/images/31.webp" alt="Side-by-side UTV climbing the slickrock on a guided tour near Vernal Utah"><div class="carousel-caption">Climbing the Slickrock</div></div>
              <div class="carousel-slide"><img src="/images/32.webp" alt="Side-by-side UTV descending a steep rock face on a guided tour near Vernal Utah"><div class="carousel-caption">UTV Descending the Rock</div></div>
              <div class="carousel-slide"><img src="/images/33.webp" alt="Side-by-side UTV cresting boulders on a backcountry trail near Vernal Utah"><div class="carousel-caption">UTV Cresting the Boulders</div></div>
              <div class="carousel-slide"><img src="/images/34.webp" alt="Green side-by-side UTV on a desert trail near Vernal Utah"><div class="carousel-caption">Green UTV on the Trail</div></div>
              <div class="carousel-slide"><img src="/images/35.webp" alt="Side-by-side UTVs climbing slickrock on a guided tour near Vernal Utah"><div class="carousel-caption">UTVs Climbing Slickrock</div></div>
              <div class="carousel-slide"><img src="/images/36.webp" alt="Side-by-side UTVs on the slickrock on a backcountry tour near Vernal Utah"><div class="carousel-caption">UTVs on the Slickrock</div></div>
              <div class="carousel-slide"><img src="/images/37.webp" alt="Side-by-side UTVs climbing a sandstone ridge near Vernal Utah"><div class="carousel-caption">Climbing a Sandstone Ridge</div></div>
              <div class="carousel-slide"><img src="/images/39a.webp" alt="Side-by-side UTV parked below a desert butte near Vernal Utah"><div class="carousel-caption">Parked at the Butte</div></div>
              <div class="carousel-slide"><img src="/images/39.webp" alt="View through a rock arch toward a desert butte near Vernal Utah"><div class="carousel-caption">Through the Rock Arch</div></div>
              <div class="carousel-slide"><img src="/images/40.webp" alt="Muddy side-by-side UTV climbing rocks on a backcountry tour near Vernal Utah"><div class="carousel-caption">Muddy Rig Climbing</div></div>
              <div class="carousel-slide"><img src="/images/41.webp" alt="Side-by-side UTVs parked under a natural rock arch near Vernal Utah"><div class="carousel-caption">Side-by-Sides Under the Arch</div></div>
              <div class="carousel-slide"><img src="/images/42.webp" alt="Two side-by-side UTVs on a canyon trail through the Utah backcountry"><div class="carousel-caption">Canyon Trail Duo</div></div>
              <div class="carousel-slide"><img src="/images/43.webp" alt="Side-by-side UTV on a steep slickrock descent near Vernal Utah"><div class="carousel-caption">Steep Slickrock Descent</div></div>
              <div class="carousel-slide"><img src="/images/44.webp" alt="Guided side-by-side UTV rock crawl through a sandstone wash near Vernal Utah"><div class="carousel-caption">Guided Rock Crawl</div></div>
              <div class="carousel-slide"><img src="/images/45.webp" alt="Desert overlook at dusk on a backcountry UTV tour near Vernal Utah"><div class="carousel-caption">Overlook at Dusk</div></div>
              <div class="carousel-slide"><img src="/images/46.webp" alt="Side-by-side UTV tackling a deep rut on a backcountry trail near Vernal Utah"><div class="carousel-caption">Tackling the Rut</div></div>
              <div class="carousel-slide"><img src="/images/47.webp" alt="Side-by-side UTV splashing through a river crossing near Vernal Utah"><div class="carousel-caption">Splashing River Crossing</div></div>
              <div class="carousel-slide"><img src="/images/48.webp" alt="Doc's Beach trailhead sign on an Adventure Tours Vernal UTV tour near Vernal Utah"><div class="carousel-caption">Doc's Beach Trails</div></div>
              <div class="carousel-slide"><img src="/images/49.webp" alt="Fleet of Kawasaki KRX 1000 side-by-sides staged for a guided tour in Vernal Utah"><div class="carousel-caption">Staged Fleet Lineup</div></div>
              <div class="carousel-slide"><img src="/images/50.webp" alt="Tour group stopped with their side-by-side UTVs near Vernal Utah"><div class="carousel-caption">Group Trail Stop</div></div>
              <div class="carousel-slide"><img src="/images/51.webp" alt="Tour group with Kawasaki KRX 1000 side-by-sides on a ridge near Vernal Utah"><div class="carousel-caption">Tour Group Photo</div></div>
              <div class="carousel-slide"><img src="/images/52.webp" alt="Long line of side-by-side UTVs staged and ready for a guided tour near Vernal Utah"><div class="carousel-caption">Lined Up and Ready</div></div>
              <div class="carousel-slide"><img src="/images/53.webp" alt="Fleet of side-by-side UTVs staged on a hilltop near Vernal Utah"><div class="carousel-caption">Fleet at the Hilltop</div></div>
              <div class="carousel-slide"><img src="/images/54a.webp" alt="Side-by-side UTV charging through a muddy backcountry trail near Vernal Utah"><div class="carousel-caption">Muddy Trail Charge</div></div>
              <div class="carousel-slide"><img src="/images/55.webp" alt="Green Kawasaki side-by-side UTV crossing a muddy rut near Vernal Utah"><div class="carousel-caption">Green Machine in the Mud</div></div>
              <div class="carousel-slide"><img src="/images/56.webp" alt="Tour group gathered under a rock overhang with their side-by-side UTVs near Vernal Utah"><div class="carousel-caption">Group Under the Overhang</div></div>
              <div class="carousel-slide"><img src="/images/57a.webp" alt="Side-by-side UTVs parked at a cliffside on a guided tour near Vernal Utah"><div class="carousel-caption">UTVs at the Cliffside</div></div>
              <div class="carousel-slide"><img src="/images/58a.webp" alt="Rocky trail vista on a backcountry UTV tour near Vernal Utah"><div class="carousel-caption">Rock Trail Vista</div></div>
              <div class="carousel-slide"><img src="/images/58.webp" alt="Rider jumping off a cliff for a cool-down on an Adventure Tours Vernal outing near Vernal Utah"><div class="carousel-caption">Cliff Jump Cool Down</div></div>
              <div class="carousel-slide"><img src="/images/59.webp" alt="Side-by-side UTVs staged below a slickrock dome near Vernal Utah"><div class="carousel-caption">UTVs Staged Below</div></div>
              <div class="carousel-slide"><img src="/images/60.webp" alt="Blue side-by-side UTV conquering a slickrock dome with a guide near Vernal Utah"><div class="carousel-caption">Conquering the Slickrock</div></div>
              <div class="carousel-slide"><img src="/images/61.webp" alt="Three side-by-side UTVs rock crawling through the Utah backcountry"><div class="carousel-caption">Rock Crawling Trio</div></div>
              <div class="carousel-slide"><img src="/images/62a.webp" alt="Riders exploring cliff dwellings on an Adventure Tours Vernal UTV tour"><div class="carousel-caption">Exploring Cliff Dwellings</div></div>
              <div class="carousel-slide"><img src="/images/42a.webp" alt="Large natural sandstone arch above the valley on a guided UTV tour near Vernal Utah"><div class="carousel-caption">Natural Sandstone Arch</div></div>
              <div class="carousel-slide"><img src="/images/63.webp" alt="Tour group at a rock arch at sunset near Vernal Utah"><div class="carousel-caption">Sunset Arch Crew</div></div>
              <div class="carousel-slide"><img src="/images/64.webp" alt="Inside a sandstone cave on an Adventure Tours Vernal backcountry tour"><div class="carousel-caption">Inside the Cave</div></div>
              <div class="carousel-slide"><img src="/images/65a.webp" alt="Side-by-side UTV on a slickrock summit climb near Vernal Utah"><div class="carousel-caption">Slickrock Summit Climb</div></div>
              <div class="carousel-slide"><img src="/images/65.webp" alt="Side-by-side UTV on a river crossing adventure near Vernal Utah"><div class="carousel-caption">River Crossing Adventure</div></div>
              <div class="carousel-slide"><img src="/images/66.webp" alt="Side-by-side UTV parked at a canyon overlook near Vernal Utah"><div class="carousel-caption">Parked Machine Profile</div></div>
              <div class="carousel-slide"><img src="/images/67.webp" alt="Side-by-side UTV sending it over a sand dune near Vernal Utah"><div class="carousel-caption">Sand Dune Send</div></div>
              <div class="carousel-slide"><img src="/images/68.webp" alt="Side-by-side UTV parked beside a sandstone arch near Vernal Utah"><div class="carousel-caption">Parked at the Arch</div></div>
              <div class="carousel-slide"><img src="/images/70.webp" alt="Golden sandstone arch on a backcountry UTV tour near Vernal Utah"><div class="carousel-caption">Golden Rock Arch</div></div>
              <div class="carousel-slide"><img src="/images/71.webp" alt="Window opening in a sandstone cave near Vernal Utah"><div class="carousel-caption">Sandstone Cave Window</div></div>
              <div class="carousel-slide"><img src="/images/72.webp" alt="Trail along a towering canyon wall near Vernal Utah"><div class="carousel-caption">Canyon Wall Trail</div></div>
              <div class="carousel-slide"><img src="/images/73.webp" alt="Side-by-side UTVs parked under a sandstone arch near Vernal Utah"><div class="carousel-caption">UTVs Under the Arch</div></div>
              <div class="carousel-slide"><img src="/images/74.webp" alt="Interior of a sandstone cave on an Adventure Tours Vernal tour near Vernal Utah"><div class="carousel-caption">Cave Interior View</div></div>
              <div class="carousel-slide"><img src="/images/75.webp" alt="Towering rock overhang on a backcountry UTV tour near Vernal Utah"><div class="carousel-caption">Towering Rock Overhang</div></div>
              <div class="carousel-slide"><img src="/images/76.webp" alt="Three side-by-side UTVs on the canyon rim near Vernal Utah"><div class="carousel-caption">Three UTVs on the Canyon Rim</div></div>
              <div class="carousel-slide"><img src="/images/77.webp" alt="Couple posing at a cliff edge overlooking the canyon near Vernal Utah"><div class="carousel-caption">Couple at the Cliff Edge</div></div>
              <div class="carousel-slide"><img src="/images/78.webp" alt="Autumn canyon overlook on a backcountry UTV trail near Vernal Utah"><div class="carousel-caption">Autumn Canyon Overlook</div></div>
              <div class="carousel-slide"><img src="/images/79.webp" alt="Side-by-side UTV on an aspen-lined trail near Vernal Utah"><div class="carousel-caption">Aspen Trail Ride</div></div>
              <div class="carousel-slide"><img src="/images/80.webp" alt="Side-by-side UTV on a slickrock descent near Vernal Utah"><div class="carousel-caption">Slickrock Descent</div></div>
              <div class="carousel-slide"><img src="/images/81.webp" alt="Golden aspen trail on a guided side-by-side adventure near Vernal Utah"><div class="carousel-caption">Golden Aspen Trail</div></div>
              <div class="carousel-slide"><img src="/images/82.webp" alt="Side-by-side UTVs above the canyon on a backcountry tour near Vernal Utah"><div class="carousel-caption">UTVs Above the Canyon</div></div>
              <div class="carousel-slide"><img src="/images/83.webp" alt="View through a sandstone arch on an Adventure Tours Vernal tour near Vernal Utah"><div class="carousel-caption">Through the Arch</div></div>
              <div class="carousel-slide"><img src="/images/84.webp" alt="Side-by-side UTVs on slickrock under a stormy sky near Vernal Utah"><div class="carousel-caption">Slickrock Under the Storm</div></div>
              <div class="carousel-slide"><img src="/images/38.webp" alt="Blue side-by-side UTV kicking up dust on a desert trail near Vernal Utah"><div class="carousel-caption">Desert Dust Trail</div></div>
              <div class="carousel-slide"><img src="/images/85.webp" alt="Inside a sandstone cave looking out a window opening near Vernal Utah"><div class="carousel-caption">Inside a Sandstone Cave</div></div>
              <div class="carousel-slide"><img src="/images/86.webp" alt="Side-by-side UTVs at a mountaintop staging point near Vernal Utah"><div class="carousel-caption">Mountaintop Staging Point</div></div>
              <div class="carousel-slide"><img src="/images/87.webp" alt="Three side-by-side UTVs lined up on a guided tour near Vernal Utah"><div class="carousel-caption">Three UTVs Lined Up</div></div>
              <div class="carousel-slide"><img src="/images/99.webp" alt="Slickrock ridge view on a backcountry UTV tour near Vernal Utah"><div class="carousel-caption">Slickrock Ridge View</div></div>
              <div class="carousel-slide"><img src="/images/90.webp" alt="Side-by-side UTV climbing the slickrock near Vernal Utah"><div class="carousel-caption">Climbing the Slickrock</div></div>
              <div class="carousel-slide"><img src="/images/91.webp" alt="Side-by-side UTV on a slickrock climb under a stormy sky near Vernal Utah"><div class="carousel-caption">Stormy Slickrock Climb</div></div>
              <div class="carousel-slide"><img src="/images/92.webp" alt="Side-by-side UTV throwing dust on a desert trail near Vernal Utah"><div class="carousel-caption">Airborne Dust Trail</div></div>
              <div class="carousel-slide"><img src="/images/93.webp" alt="Side-by-side UTV on a steep ledge climb near Vernal Utah"><div class="carousel-caption">Steep Ledge Climb</div></div>
              <div class="carousel-slide"><img src="/images/94.webp" alt="Side-by-side UTV spraying sand through a turn near Vernal Utah"><div class="carousel-caption">Sand Spray Turn</div></div>
              <div class="carousel-slide"><img src="/images/95.webp" alt="Side-by-side UTV flying an American flag at rest near Vernal Utah"><div class="carousel-caption">American Flag UTV</div></div>
              <div class="carousel-slide"><img src="/images/96.webp" alt="Side-by-side UTV at a cliff edge at dusk near Vernal Utah"><div class="carousel-caption">Cliff Edge at Dusk</div></div>
              <div class="carousel-slide"><img src="/images/97.webp" alt="Side-by-side UTV on a ridgeline at twilight in the Utah desert backcountry"><div class="carousel-caption">Ridgeline at Twilight</div></div>
            </div>
          </div>
          <button class="carousel-btn carousel-next" aria-label="次の画像"><span>›</span></button>
        </div>
        <div class="carousel-indicators"></div>
        <div class="carousel-thumbnails"></div>
      </div>
    </div>
  </section>

  <!-- 予約セクション -->
  <section id="booking">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">冒険の準備はできましたか？</h2>
        <p class="section-subtitle">オンラインならその場でご予約いただけます。お電話でも承ります — 毎日午前7時〜午後7時対応</p>
      </div>
      <div class="booking-container">
        <div class="phone-cta-wrapper">

          <!-- オンライン予約ボタン -->
          <div style="margin-bottom:35px;">
            <a href="/ja/booking/" class="btn btn-primary" style="font-size:1.2rem;padding:20px 60px;">
              📅 オンラインで冒険を予約
            </a>
            <p style="margin-top:12px;font-size:0.95rem;color:var(--charcoal);opacity:0.7;font-family:var(--font-body);">
              トレイル・日付・時間をお選びください — その場で予約確定
            </p>
          </div>

          <!-- 区切り線 -->
          <div style="display:flex;align-items:center;gap:20px;margin:10px 0 30px;">
            <div style="flex:1;height:1px;background:rgba(212,118,78,0.15);"></div>
            <span style="font-family:var(--font-heading);font-weight:700;color:var(--charcoal);opacity:0.5;font-size:0.9rem;">またはお電話で</span>
            <div style="flex:1;height:1px;background:rgba(212,118,78,0.15);"></div>
          </div>

          <!-- 電話 -->
          <div class="phone-icon">📞</div>
          <h3 class="phone-cta-title">お電話でツアーをご予約ください</h3>
          <a href="tel:435-219-9447" class="phone-number-display">(435) 219-9447</a>
          <p class="phone-cta-subtitle">年中無休 • 午前7時〜午後7時（山岳部時間）</p>

          <div class="phone-benefits">
            <div class="phone-benefit"><span class="benefit-icon">✓</span><span>その場で予約確定</span></div>
            <div class="phone-benefit"><span class="benefit-icon">✓</span><span>地元を知り尽くしたガイド</span></div>
            <div class="phone-benefit"><span class="benefit-icon">✓</span><span>柔軟なスケジュール調整</span></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 私たちについてのCTAセクション -->
  <section id="about">
    <div class="container">
      <div class="about-cta-simple">
        <h2 class="section-title">Wilson一家をご紹介します</h2>
        <p class="section-subtitle">地元経営、安全第一、初日から変わらない冒険への情熱</p>
        <p>私たちの歩み、Uintah Basinへの思い、そしてAdventure Tours Vernalがユタ州バーナルを代表するUTVツアー会社である理由をご覧ください。</p>
        <a href="/ja/about/" class="cta-button primary">私たちの物語を読む</a>
      </div>
    </div>
  </section>

  <div class="about-features">
    <div class="about-feature">
      <div class="about-feature-icon">✅</div>
      <span class="about-feature-text">土地を知り尽くした地元ガイド</span>
    </div>
    <div class="about-feature">
      <div class="about-feature-icon">🏅</div>
      <span class="about-feature-text">プロ仕様の安全講習と装備</span>
    </div>
    <div class="about-feature">
      <div class="about-feature-icon">🛡️</div>
      <span class="about-feature-text">経験レベルを問わず歓迎</span>
    </div>
    <div class="about-feature">
      <div class="about-feature-icon">🌟</div>
      <span class="about-feature-text">認可・保険を完備</span>
    </div>
  </div>
  <div class="about-image"></div>

  <!-- バーナルを知るガイドセクション -->
  <section id="explore-guides" style="padding:var(--section-padding);background:var(--light-sand);">
    <div class="container" style="max-width:var(--container-max);margin:0 auto;">
      <div class="section-header">
        <h2 class="section-title">バーナルを知る</h2>
        <p class="section-subtitle">地元ガイドの情報で旅を計画しましょう — ユタ州バーナルで知っておきたいことをまとめました</p>
      </div>
      <div class="related-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:18px;max-width:1000px;margin:0 auto;">
        <a href="/things-to-do/" class="related-card" style="background:white;border-radius:14px;padding:20px;text-decoration:none;border:1px solid rgba(212,118,78,0.1);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);display:block;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;font-weight:700;color:var(--burnt-orange);margin-bottom:6px;">バーナルの楽しみ方</h4>
          <p style="font-size:0.88rem;color:var(--charcoal);opacity:0.7;line-height:1.5;margin:0;">アクティビティと見どころの完全ガイドです。</p>
        </a>
        <a href="/ja/things-to-do/vernal-utah-attractions/" class="related-card" style="background:white;border-radius:14px;padding:20px;text-decoration:none;border:1px solid rgba(212,118,78,0.1);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);display:block;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;font-weight:700;color:var(--burnt-orange);margin-bottom:6px;">バーナルの人気スポット</h4>
          <p style="font-size:0.88rem;color:var(--charcoal);opacity:0.7;line-height:1.5;margin:0;">訪れておきたい名所と見どころ。</p>
        </a>
        <a href="/ja/things-to-do/fun-things-to-do-vernal-utah-kids/" class="related-card" style="background:white;border-radius:14px;padding:20px;text-decoration:none;border:1px solid rgba(212,118,78,0.1);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);display:block;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;font-weight:700;color:var(--burnt-orange);margin-bottom:6px;">ファミリー向けアクティビティ</h4>
          <p style="font-size:0.88rem;color:var(--charcoal);opacity:0.7;line-height:1.5;margin:0;">バーナルで子ども連れで楽しめること。</p>
        </a>
        <a href="/things-to-do/" class="related-card" style="background:white;border-radius:14px;padding:20px;text-decoration:none;border:1px solid rgba(212,118,78,0.1);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);display:block;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;font-weight:700;color:var(--burnt-orange);margin-bottom:6px;">アウトドアアクティビティ</h4>
          <p style="font-size:0.88rem;color:var(--charcoal);opacity:0.7;line-height:1.5;margin:0;">ハイキング、釣り、UTVツアーなど。</p>
        </a>
        <a href="/atv-trails-vernal-utah/" class="related-card" style="background:white;border-radius:14px;padding:20px;text-decoration:none;border:1px solid rgba(212,118,78,0.1);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);display:block;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;font-weight:700;color:var(--burnt-orange);margin-bottom:6px;">バーナル周辺のATVトレイル</h4>
          <p style="font-size:0.88rem;color:var(--charcoal);opacity:0.7;line-height:1.5;margin:0;">オフロードのトレイルシステムと地形ガイド。</p>
        </a>
        <a href="/ja/utv/side-by-side-rentals-vernal-utah/" class="related-card" style="background:white;border-radius:14px;padding:20px;text-decoration:none;border:1px solid rgba(212,118,78,0.1);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);display:block;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;font-weight:700;color:var(--burnt-orange);margin-bottom:6px;">サイドバイサイド：ツアーとレンタルの比較</h4>
          <p style="font-size:0.88rem;color:var(--charcoal);opacity:0.7;line-height:1.5;margin:0;">ガイド付きツアーがセルフレンタルより優れている理由。</p>
        </a>
        <a href="/dinosaur-national-monument/" class="related-card" style="background:white;border-radius:14px;padding:20px;text-decoration:none;border:1px solid rgba(212,118,78,0.1);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);display:block;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;font-weight:700;color:var(--burnt-orange);margin-bottom:6px;">Dinosaur National Monumentのツアー</h4>
          <p style="font-size:0.88rem;color:var(--charcoal);opacity:0.7;line-height:1.5;margin:0;">モニュメント周辺のUTVツアー。</p>
        </a>
        <a href="/ja/dinosaur-national-monument/visiting-dinosaur-national-monument/" class="related-card" style="background:white;border-radius:14px;padding:20px;text-decoration:none;border:1px solid rgba(212,118,78,0.1);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);display:block;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;font-weight:700;color:var(--burnt-orange);margin-bottom:6px;">Dinosaur National Monument 完全ガイド</h4>
          <p style="font-size:0.88rem;color:var(--charcoal);opacity:0.7;line-height:1.5;margin:0;">化石、ペトログリフ、絶景ドライブまで網羅した旅行計画の完全ガイド。</p>
        </a>
        <a href="/ja/utv/group-utv-tours-vernal/" class="related-card" style="background:white;border-radius:14px;padding:20px;text-decoration:none;border:1px solid rgba(212,118,78,0.1);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);display:block;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;font-weight:700;color:var(--burnt-orange);margin-bottom:6px;">グループ・プライベートツアー</h4>
          <p style="font-size:0.88rem;color:var(--charcoal);opacity:0.7;line-height:1.5;margin:0;">ご家族、親族の集まり、社員旅行に。</p>
        </a>
      </div>
    </div>
  </section>

  <!-- モバイル固定CTA -->
  <div class="mobile-sticky-cta">
    <button onclick="location.href='/ja/booking/'">今すぐ予約する</button>
  </div>

  <script is:inline src="https://player.vimeo.com/api/player.js"></script>
  <script is:inline>
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    // Background images from data attributes
    document.querySelectorAll('[data-bg]').forEach(element => {
      element.style.backgroundImage = \`url('\${element.getAttribute('data-bg')}')\`;
      element.style.backgroundSize = 'cover';
      element.style.backgroundPosition = 'center';
    });

    // Scroll indicator fade
    window.addEventListener('scroll', () => {
      const scrollIndicator = document.querySelector('.scroll-indicator');
      if (scrollIndicator) scrollIndicator.style.opacity = window.pageYOffset > 100 ? '0' : '1';
    });

    // Carousel
    class Carousel {
      constructor() {
        this.track = document.querySelector('.carousel-track');
        this.slides = Array.from(document.querySelectorAll('.carousel-slide'));
        this.prevBtn = document.querySelector('.carousel-prev');
        this.nextBtn = document.querySelector('.carousel-next');
        this.indicatorsContainer = document.querySelector('.carousel-indicators');
        this.currentIndex = 0;
        this.autoPlayInterval = null;
        this.isTransitioning = false;
        this.init();
      }
      init() {
        this.createIndicators();
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        document.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowLeft') this.prevSlide();
          if (e.key === 'ArrowRight') this.nextSlide();
        });
        this.addTouchSupport();
        this.startAutoPlay();
        this.track.parentElement.parentElement.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.track.parentElement.parentElement.addEventListener('mouseleave', () => this.startAutoPlay());
      }
      createIndicators() {
        this.slides.forEach((_, index) => {
          const indicator = document.createElement('button');
          indicator.classList.add('carousel-indicator');
          if (index === 0) indicator.classList.add('active');
          indicator.addEventListener('click', () => this.goToSlide(index));
          this.indicatorsContainer.appendChild(indicator);
        });
        this.indicators = Array.from(this.indicatorsContainer.querySelectorAll('.carousel-indicator'));
      }
      updateCarousel() {
        if (this.isTransitioning) return;
        this.isTransitioning = true;
        this.track.style.transform = \`translateX(-\${this.currentIndex * 100}%)\`;
        this.slides.forEach((slide, index) => slide.classList.toggle('active', index === this.currentIndex));
        this.indicators.forEach((indicator, index) => indicator.classList.toggle('active', index === this.currentIndex));
        setTimeout(() => { this.isTransitioning = false; }, 500);
      }
      nextSlide() { this.currentIndex = (this.currentIndex + 1) % this.slides.length; this.updateCarousel(); }
      prevSlide() { this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length; this.updateCarousel(); }
      goToSlide(index) { this.currentIndex = index; this.updateCarousel(); }
      startAutoPlay() { this.autoPlayInterval = setInterval(() => this.nextSlide(), 5000); }
      stopAutoPlay() { if (this.autoPlayInterval) { clearInterval(this.autoPlayInterval); this.autoPlayInterval = null; } }
      addTouchSupport() {
        let touchStartX = 0;
        this.track.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; });
        this.track.addEventListener('touchend', (e) => {
          const diff = touchStartX - e.changedTouches[0].screenX;
          if (Math.abs(diff) > 50) diff > 0 ? this.nextSlide() : this.prevSlide();
        });
      }
    }
    if (document.querySelector('.carousel-track')) new Carousel();

    // Floating video
    function closeFloatingVideo() {
      document.getElementById('floatingVideo').style.display = 'none';
    }
    window.addEventListener('scroll', () => {
      const floatingVideo = document.getElementById('floatingVideo');
      if (window.pageYOffset > 300 && floatingVideo) floatingVideo.classList.add('visible');
    });

    // Scroll spy
    function updateActiveNavLink() {
      const sections = document.querySelectorAll('section[id]');
      const navLinks = document.querySelectorAll('.nav-menu > li > a[href^="#"]:not(.dropdown-toggle)');
      let currentSection = '';
      const scrollPosition = window.pageYOffset + 200;
      sections.forEach(section => {
        if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
          currentSection = section.getAttribute('id');
        }
      });
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === \`#\${currentSection}\`) link.classList.add('active');
      });
    }
    window.addEventListener('scroll', updateActiveNavLink);
    window.addEventListener('load', updateActiveNavLink);

    // Hero video play
    function playHeroVideo() {
      document.getElementById('videoPlayOverlay').classList.add('hidden');
      document.getElementById('heroVideoContainer').innerHTML = '<iframe src="https://www.youtube.com/embed/eFfvKxkiyzU?si=rAXO-MccKZ1-6GgK&autoplay=1" title="Adventure Tours Vernal — Guided UTV Tours in Vernal Utah" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>';
    }
  </script>


  <!-- Best Western 宿泊プロモーション -->
  <a href="https://bestwesternvernal.com" target="_blank" rel="noopener" class="bw-promo-badge" id="bwPromoBadge">
    <div class="bw-promo-badge-inner">
      <button class="bw-badge-close" onclick="event.preventDefault();event.stopPropagation();dismissBwBadge();return false;" aria-label="プロモーションを閉じる">&times;</button>
      <div class="bw-badge-text-wrap">
        <div class="bw-badge-eyebrow">
          <span class="pulse-dot"></span>
          宿泊＆ツアーの特典
        </div>
        <div class="bw-badge-offer">
          <span class="highlight">10%オフ</span> 宿泊料金
        </div>
        <p class="bw-badge-detail">
          ご予約は<strong>Best Western Vernal</strong>へ &mdash; お電話の際に<strong>&ldquo;Adventure Tours&rdquo;</strong>とお伝えください。
        </p>
        <div class="bw-badge-cta-row">
          <span class="bw-badge-button">宿泊を予約する &rarr;</span>
          <span class="bw-badge-logo-text">bestwesternvernal.com</span>
        </div>
      </div>
    </div>
  </a>

  <!-- High Class Limousine プロモーション -->
  <a href="https://highclasslimousineservices.com/" target="_blank" rel="noopener" class="hcl-promo-badge" id="hclPromoBadge">
    <div class="hcl-promo-badge-inner">
      <button class="hcl-badge-close" onclick="event.preventDefault();event.stopPropagation();dismissHclBadge();return false;" aria-label="プロモーションを閉じる">&times;</button>
      <div class="hcl-badge-text-wrap">
        <div class="hcl-badge-eyebrow">
          <span class="pulse-dot"></span>
          スタイリッシュに到着
        </div>
        <div class="hcl-badge-offer">
          <span class="highlight">High Class</span> Limousine
        </div>
        <p class="hcl-badge-detail">
          結婚式、プロム、空港送迎、Uintah Basin一帯での夜のお出かけに。<strong>気品は絶滅していません。</strong>
        </p>
        <div class="hcl-badge-cta-row">
          <span class="hcl-badge-button">スタイリッシュに移動 &rarr;</span>
          <span class="hcl-badge-logo-text">highclasslimousineservices.com</span>
        </div>
      </div>
    </div>
  </a>

  <script is:inline>
    // Dismiss badge for this session
    function dismissBwBadge() {
  var badge = document.getElementById('bwPromoBadge');
  if (badge) badge.classList.add('dismissed');
}
    function dismissHclBadge() {
  var badge = document.getElementById('hclPromoBadge');
  if (badge) badge.classList.add('dismissed');
}
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
  if (locale === 'pt') return PT;
  if (locale === 'fr') return FR;
  if (locale === 'de') return DE;
  if (locale === 'ja') return JA;
  return bodyHtml;
}
