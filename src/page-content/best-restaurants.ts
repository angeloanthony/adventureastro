// best-restaurants.ts — extracted page body content (P2C). English source of truth
// for this page's body; rendered via set:html. Spanish variant added P3D (formal
// "usted"). Restaurant names, addresses, phone numbers, and coupon codes are
// business data — kept byte-identical in both locales, never translated/altered.
import { DEFAULT_LOCALE } from '../lib/i18n';

export const bodyHtml = `

  <!-- Coupon Modal -->
  <div class="coupon-modal-overlay" id="couponModal"><div class="coupon-modal">
    <button class="coupon-modal-close" id="couponModalClose">&times;</button>
    <div class="coupon-modal-icon">🎟️</div>
    <h2>Adventure Tours Discount</h2>
    <p class="modal-restaurant" id="modalRestaurant"></p>
    <div class="modal-code-box"><div class="modal-code" id="modalCode"></div><div class="modal-discount" id="modalDiscount"></div></div>
    <p class="modal-instructions">Show this screen to your server to redeem your discount. Valid for Adventure Tours Vernal guests with a confirmed booking.</p>
    <div class="modal-branding"><img src="/images/logo.webp" alt="Adventure Tours Vernal" height="40"><span>adventuretoursvernal.com</span></div>
  </div></div>

  <main class="restaurant-page">
    <!-- Hero -->
    <div class="dining-hero"><div class="dining-hero-bg"></div><div class="dining-hero-overlay"></div>
      <div class="dining-hero-content">
        <nav aria-label="Breadcrumb"><a href="/">Home</a><span>›</span><span style="color:rgba(255,255,255,0.9)">Best Restaurants in Vernal</span></nav>
        <h1>Eat Like a Local in Vernal, Utah</h1>
        <p>Our guests ask us every week: <em>"Where should we eat?"</em> After years of living here, these are our honest picks — and <strong>you'll get exclusive discounts</strong> at every one just for booking a tour.</p>
      </div>
    </div>

    <!-- Discount Banner -->
    <div class="discount-banner">
      <div class="discount-banner-icon">🎟️</div>
      <div class="discount-banner-text">
        <h2>Exclusive Dining Discounts for Tour Guests</h2>
        <p>Book a <a href="/booking/" style="color:var(--desert-gold);font-weight:700">UTV tour with Adventure Tours Vernal</a> and unlock <strong>exclusive coupon codes</strong> at the restaurants below. Tap <strong>"Show to Server"</strong> on any card to pull up a full-screen coupon on your phone.</p>
      </div>
    </div>

    <!-- Filters -->
    <div class="category-filters" id="categoryFilters">
      <button class="filter-btn active" data-filter="all">🍽️ All Restaurants</button>
      <button class="filter-btn" data-filter="casual">🍕 Casual</button>
      <button class="filter-btn" data-filter="breakfast">☕ Breakfast &amp; Diners</button>
      <button class="filter-btn" data-filter="steakhouse">🥩 Steakhouses</button>
      <button class="filter-btn" data-filter="mexican">🌮 Mexican &amp; International</button>
    </div>

    <!-- Restaurant Grid -->
    <div class="restaurant-grid" id="restaurantGrid">

      <!-- 4 Brothers Pizza -->
      <div class="restaurant-card" data-category="casual">
        <div class="card-image" style="background-image:url('/images/102.webp')"><span class="cuisine-badge">Pizza</span><span class="discount-tag">🎟️ 10% Off</span></div>
        <div class="card-body">
          <h3>4 Brothers Pizza</h3>
          <p class="card-address">📍 1060 Market Dr. #5, Vernal, UT 84078</p>
          <p class="card-description">The go-to pizza spot in town — solid crust, generous toppings, and it works every time. Dine in or grab a box on the way back to the hotel.</p>
          <div class="card-actions">
            <a href="tel:+14357892222" class="card-action-btn action-call">📞 Call</a>
            <a href="https://maps.google.com/?q=4+Brothers+Pizza+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Map</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Tour Guest Discount</div>
            <div class="coupon-row"><div class="coupon-code">ATV-PIZZA10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-PIZZA10')">Copy</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('4 Brothers Pizza','ATV-PIZZA10','10% Off Your Order')">📱 Show to Server</button>
            <p class="coupon-note">Valid with Adventure Tours booking confirmation</p>
          </div>
        </div>
      </div>

      <!-- Country Grub -->
      <div class="restaurant-card" data-category="casual">
        <div class="card-image" style="background-image:url('/images/103.webp')"><span class="cuisine-badge">Burgers</span><span class="discount-tag">🎟️ 10% Off</span></div>
        <div class="card-body">
          <h3>Country Grub Hamburger Restaurant</h3>
          <p class="card-address">📍 2416 W 1500 E, Vernal, UT 84078</p>
          <p class="card-description">Classic American burgers done right — well-seasoned patties, crispy fries, and the kind of meal that hits perfectly after a day outdoors.</p>
          <div class="card-actions">
            <a href="tel:+14357891414" class="card-action-btn action-call">📞 Call</a>
            <a href="https://maps.google.com/?q=Country+Grub+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Map</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Tour Guest Discount</div>
            <div class="coupon-row"><div class="coupon-code">ATV-GRUB10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-GRUB10')">Copy</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Country Grub','ATV-GRUB10','10% Off Your Order')">📱 Show to Server</button>
            <p class="coupon-note">Valid with Adventure Tours booking confirmation</p>
          </div>
        </div>
      </div>

      <!-- Get Grilled -->
      <div class="restaurant-card" data-category="casual">
        <div class="card-image" style="background-image:url('/images/95a.webp')"><span class="cuisine-badge">Sandwiches</span><span class="discount-tag">🎟️ Free Drink</span></div>
        <div class="card-body">
          <h3>Get Grilled Sandwiches</h3>
          <p class="card-address">📍 1096 W Hwy 40, Vernal, UT 84078</p>
          <p class="card-description">Great for a quick lunch — fresh-made sandwiches and fast service right off the highway. Perfect on your way to or from Dinosaur National Monument.</p>
          <div class="card-actions">
            <a href="tel:+14357893900" class="card-action-btn action-call">📞 Call</a>
            <a href="https://maps.google.com/?q=Get+Grilled+Sandwiches+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Map</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Tour Guest Discount</div>
            <div class="coupon-row"><div class="coupon-code">ATV-GRILL1</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-GRILL1')">Copy</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Get Grilled Sandwiches','ATV-GRILL1','Free Drink with Any Sandwich')">📱 Show to Server</button>
            <p class="coupon-note">Valid with Adventure Tours booking confirmation</p>
          </div>
        </div>
      </div>

      <!-- Abby's Café -->
      <div class="restaurant-card" data-category="breakfast">
        <div class="card-image" style="background-image:url('/images/105.webp')"><span class="cuisine-badge">Breakfast</span><span class="discount-tag">🎟️ 10% Off</span></div>
        <div class="card-body">
          <h3>Abby's Café</h3>
          <p class="card-address">📍 73 W Main St., Vernal, UT 84078</p>
          <p class="card-description">A longtime local favorite for breakfast and comfort food. The kind of place where the waitress knows half the room by name. Perfect before a morning tour.</p>
          <div class="card-actions">
            <a href="tel:+14357891366" class="card-action-btn action-call">📞 Call</a>
            <a href="https://maps.google.com/?q=Abbys+Cafe+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Map</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Tour Guest Discount</div>
            <div class="coupon-row"><div class="coupon-code">ATV-ABBY10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-ABBY10')">Copy</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Abby\\'s Café','ATV-ABBY10','10% Off Breakfast')">📱 Show to Server</button>
            <p class="coupon-note">Valid with Adventure Tours booking confirmation</p>
          </div>
        </div>
      </div>

      <!-- Betty's Café -->
      <div class="restaurant-card" data-category="breakfast">
        <div class="card-image" style="background-image:url('/images/97a.webp')"><span class="cuisine-badge">Diner</span><span class="discount-tag">🎟️ Free Coffee</span></div>
        <div class="card-body">
          <h3>Betty's Café</h3>
          <p class="card-address">📍 416 W Main St., Vernal, UT 84078</p>
          <p class="card-description">Old-school diner vibes with hearty meals and friendly service. Betty's has been feeding Vernal for years, and the portions haven't gotten smaller.</p>
          <div class="card-actions">
            <a href="tel:+14357810827" class="card-action-btn action-call">📞 Call</a>
            <a href="https://maps.google.com/?q=Bettys+Cafe+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Map</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Tour Guest Discount</div>
            <div class="coupon-row"><div class="coupon-code">ATV-BETTY1</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-BETTY1')">Copy</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Betty\\'s Café','ATV-BETTY1','Free Coffee with Any Meal')">📱 Show to Server</button>
            <p class="coupon-note">Valid with Adventure Tours booking confirmation</p>
          </div>
        </div>
      </div>

      <!-- Swain's Steakhouse -->
      <div class="restaurant-card" data-category="steakhouse">
        <div class="card-image" style="background-image:url('/images/99a.webp')"><span class="cuisine-badge">Steakhouse</span><span class="discount-tag">🎟️ 15% Off</span></div>
        <div class="card-body">
          <h3>Swain's Steakhouse</h3>
          <p class="card-address">📍 29 S Vernal Ave., Vernal, UT 84078</p>
          <p class="card-description">The closest thing to fine dining in Vernal — and it's very good. If you're only doing one sit-down meal in town, make it this one. Steaks are cooked right.</p>
          <div class="card-actions">
            <a href="tel:+14357892671" class="card-action-btn action-call">📞 Call</a>
            <a href="https://maps.google.com/?q=Swains+Steakhouse+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Map</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Tour Guest Discount</div>
            <div class="coupon-row"><div class="coupon-code">ATV-STEAK15</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-STEAK15')">Copy</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Swain\\'s Steakhouse','ATV-STEAK15','15% Off Your Dinner')">📱 Show to Server</button>
            <p class="coupon-note">Valid with Adventure Tours booking confirmation</p>
          </div>
        </div>
      </div>

      <!-- 7-11 Ranch -->
      <div class="restaurant-card" data-category="steakhouse">
        <div class="card-image" style="background-image:url('/images/100a.webp')"><span class="cuisine-badge">Western</span><span class="discount-tag">🎟️ 10% Off</span></div>
        <div class="card-body">
          <h3>7-11 Ranch Restaurant</h3>
          <p class="card-address">📍 77 E Main St., Vernal, UT 84078</p>
          <p class="card-description">Rustic Western charm, hearty portions, and the kind of atmosphere that reminds you you're in the real rural West. Great for families.</p>
          <div class="card-actions">
            <a href="tel:+14357891170" class="card-action-btn action-call">📞 Call</a>
            <a href="https://maps.google.com/?q=7-11+Ranch+Restaurant+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Map</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Tour Guest Discount</div>
            <div class="coupon-row"><div class="coupon-code">ATV-RANCH10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-RANCH10')">Copy</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('7-11 Ranch Restaurant','ATV-RANCH10','10% Off Your Order')">📱 Show to Server</button>
            <p class="coupon-note">Valid with Adventure Tours booking confirmation</p>
          </div>
        </div>
      </div>

      <!-- Red Canyon Lodge -->
      <div class="restaurant-card" data-category="steakhouse">
        <div class="card-image" style="background-image:url('/images/101a.webp')"><span class="cuisine-badge">Lodge Dining</span><span class="discount-tag">🎟️ 10% Off</span></div>
        <div class="card-body">
          <h3>Red Canyon Lodge</h3>
          <p class="card-address">📍 2450 Red Canyon Rd, Dutch John, UT 84023</p>
          <p class="card-description">About an hour north toward Flaming Gorge — but the scenery alone makes it worth the trip. Great food in a stunning mountain lodge setting.</p>
          <div class="card-actions">
            <a href="tel:+14358892090" class="card-action-btn action-call">📞 Call</a>
            <a href="https://www.redcanyonlodge.com" target="_blank" rel="noopener" class="card-action-btn action-website">🌐 Website</a>
            <a href="https://maps.google.com/?q=Red+Canyon+Lodge+Dutch+John+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Map</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Tour Guest Discount</div>
            <div class="coupon-row"><div class="coupon-code">ATV-CANYON10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-CANYON10')">Copy</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Red Canyon Lodge','ATV-CANYON10','10% Off Dining')">📱 Show to Server</button>
            <p class="coupon-note">Valid with Adventure Tours booking confirmation</p>
          </div>
        </div>
      </div>

      <!-- Plaza Mexicana -->
      <div class="restaurant-card" data-category="mexican">
        <div class="card-image" style="background-image:url('/images/102a.webp')"><span class="cuisine-badge">Mexican</span><span class="discount-tag">🎟️ 10% Off</span></div>
        <div class="card-body">
          <h3>Plaza Mexicana</h3>
          <p class="card-address">📍 55 E Main St., Vernal, UT 84078</p>
          <p class="card-description">Authentic flavors, welcoming atmosphere, and the kind of restaurant families come back to every time they visit Vernal. Enchiladas and chile verde are standouts.</p>
          <div class="card-actions">
            <a href="tel:+14357893340" class="card-action-btn action-call">📞 Call</a>
            <a href="https://maps.google.com/?q=Plaza+Mexicana+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Map</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Tour Guest Discount</div>
            <div class="coupon-row"><div class="coupon-code">ATV-PLAZA10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-PLAZA10')">Copy</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Plaza Mexicana','ATV-PLAZA10','10% Off Your Order')">📱 Show to Server</button>
            <p class="coupon-note">Valid with Adventure Tours booking confirmation</p>
          </div>
        </div>
      </div>

      <!-- Mi Hacienda -->
      <div class="restaurant-card" data-category="mexican">
        <div class="card-image" style="background-image:url('/images/103a.webp')"><span class="cuisine-badge">Mexican</span><span class="discount-tag">🎟️ 15% Off</span></div>
        <div class="card-body">
          <h3>Mi Hacienda</h3>
          <p class="card-address">📍 2075 US-40, Suite A, Vernal, UT 84078 (Towne Center)</p>
          <p class="card-description">One of the most popular restaurants in town, period. Great tacos, solid enchiladas, and the margaritas are exactly what you want after a dusty afternoon on the trails.</p>
          <div class="card-actions">
            <a href="tel:+14357810099" class="card-action-btn action-call">📞 (435) 781-0099</a>
            <a href="https://maps.google.com/?q=Mi+Hacienda+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Map</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Tour Guest Discount</div>
            <div class="coupon-row"><div class="coupon-code">ATV-MIH15</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-MIH15')">Copy</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Mi Hacienda','ATV-MIH15','15% Off Your Order')">📱 Show to Server</button>
            <p class="coupon-note">Valid with Adventure Tours booking confirmation</p>
          </div>
        </div>
      </div>

      <!-- Canton Canyon City -->
      <div class="restaurant-card" data-category="mexican">
        <div class="card-image" style="background-image:url('/images/104a.png')"><span class="cuisine-badge">Chinese</span><span class="discount-tag">🎟️ 10% Off</span></div>
        <div class="card-body">
          <h3>Canton Canyon City Chinese Restaurant</h3>
          <p class="card-address">📍 1175 W Hwy 40, Vernal, UT 84078</p>
          <p class="card-description">A reliable option for Chinese cuisine with generous portions. When you want a break from burgers and steaks, Canton delivers. Family-friendly menu.</p>
          <div class="card-actions">
            <a href="tel:+14357891388" class="card-action-btn action-call">📞 Call</a>
            <a href="https://maps.google.com/?q=Canton+Canyon+City+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Map</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Tour Guest Discount</div>
            <div class="coupon-row"><div class="coupon-code">ATV-CANTON10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-CANTON10')">Copy</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Canton Canyon City','ATV-CANTON10','10% Off Your Order')">📱 Show to Server</button>
            <p class="coupon-note">Valid with Adventure Tours booking confirmation</p>
          </div>
        </div>
      </div>

      <!-- La Cabaña -->
      <div class="restaurant-card" data-category="mexican">
        <div class="card-image" style="background-image:url('/images/98a.webp')"><span class="cuisine-badge">Mexican</span><span class="discount-tag">🎟️ 10% Off</span></div>
        <div class="card-body">
          <h3>La Cabaña</h3>
          <p class="card-address">📍 120 E Main St, Vernal, UT 84078</p>
          <p class="card-description">Authentic Mexican food right downtown — sizzling fajitas, hand-rolled enchiladas, and street-style tacos. A longtime local favorite for a hearty post-ride meal.</p>
          <div class="card-actions">
            <a href="tel:+14357893151" class="card-action-btn action-call">📞 Call</a>
            <a href="https://maps.google.com/?q=La+Cabana+Restaurant+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Map</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Tour Guest Discount</div>
            <div class="coupon-row"><div class="coupon-code">ATV-CABANA10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-CABANA10')">Copy</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('La Cabaña','ATV-CABANA10','10% Off Your Order')">📱 Show to Server</button>
            <p class="coupon-note">Valid with Adventure Tours booking confirmation</p>
          </div>
        </div>
      </div>

    </div>

    <!-- Tips -->
    <section>
      <div class="section-header"><h2 class="section-title">Tips for Dining in Vernal</h2><p class="section-subtitle">A few things to know before you head out to eat.</p></div>
      <div class="rest-tips-grid">
        <div class="rest-tip-card"><div class="rest-tip-icon">⏰</div><h3>Plan Around Tour Times</h3><p>Our <a href="/utv/" style="color:var(--burnt-orange);font-weight:600">UTV tours</a> run about three hours. Morning riders are hungry by early afternoon. Evening tours? Head straight to Swain's or Plaza Mexicana.</p></div>
        <div class="rest-tip-card"><div class="rest-tip-icon">📅</div><h3>Weekends Get Busy</h3><p>Popular spots fill up Friday and Saturday nights — especially summer. Got a group? Call ahead for a table at Swain's or 7-11 Ranch.</p></div>
        <div class="rest-tip-card"><div class="rest-tip-icon">💵</div><h3>Cash Still Works</h3><p>Most restaurants accept cards, but a few smaller cafés appreciate cash. Keep some on hand when visiting rural Utah.</p></div>
        <div class="rest-tip-card"><div class="rest-tip-icon">🦕</div><h3>Heading to the Monument?</h3><p>Grab a meal downtown on Main Street before the drive east to <a href="https://www.nps.gov/dino" target="_blank" rel="noopener" style="color:var(--burnt-orange);font-weight:600">Dinosaur National Monument</a>. La Cabaña and Plaza Mexicana are quick, hearty stops on the way out.</p></div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="article-faq" style="background:white;border-radius:25px;padding:50px 45px;box-shadow:0 20px 60px rgba(0,0,0,0.08);border:1px solid rgba(212,118,78,0.1);margin-bottom:50px">
      <h2 style="font-family:var(--font-heading);font-size:1.6rem;font-weight:700;color:var(--charcoal);text-align:center;margin-bottom:30px;border:none;padding:0">Frequently Asked Questions</h2>
      <div class="faq-item"><h3>What are the best restaurants in Vernal, Utah?</h3><p>Top picks include 4 Brothers Pizza for casual dining, Betty's Café for breakfast, Swain's Steakhouse for sit-down dinner, and Plaza Mexicana for authentic Mexican food. Tour guests get exclusive discount codes at each.</p></div>
      <div class="faq-item"><h3>Are there restaurants near Dinosaur National Monument?</h3><p>Yes — Vernal is the gateway town and all restaurants on this page are a short drive from the monument. Downtown spots like La Cabaña and Plaza Mexicana on Main Street are an easy stop on the way east toward the Quarry Visitor Center.</p></div>
      <div class="faq-item"><h3>How do I use the Adventure Tours dining discount codes?</h3><p>Each restaurant card has a unique coupon code. Tap "Show to Server" to display a full-screen coupon on your phone, or mention the code when ordering. Valid with a confirmed Adventure Tours booking.</p></div>
      <div class="faq-item"><h3>Where should I eat after a UTV tour?</h3><p>After a three-hour tour, most guests want something hearty. 4 Brothers Pizza, Country Grub, and 7-11 Ranch are popular post-ride picks with generous portions.</p></div>
      <div class="faq-item"><h3>Is there fine dining in Vernal?</h3><p>Vernal's scene is more casual, but Swain's Steakhouse and Red Canyon Lodge near Flaming Gorge offer upscale sit-down experiences worth the visit.</p></div>
    </section>

    <!-- CTA -->
    <div class="article-cta" style="border-radius:25px">
      <h3>Ready to Explore Vernal?</h3>
      <p>Book a guided UTV tour through ancient petroglyphs, red rock canyons, and desert trails — then unlock exclusive dining discounts at every restaurant on this page.</p>
      <a href="/booking/" class="cta-btn">Book Your Tour</a>
      <a href="tel:+14352199447" class="cta-phone">📞 (435) 219-9447</a>
    </div>

    <!-- Related -->
    <div class="related-articles">
      <h3>More Vernal Travel Guides</h3>
      <div class="related-grid">
        <a href="/utv/best-utv-trails-vernal/" class="related-card"><h4>Best UTV Trails Near Vernal</h4><p>Top off-road trails in the Uintah Basin — beginner to expert.</p></a>
        <a href="/guides/vernal-weather-guide/" class="related-card"><h4>Vernal Weather Guide</h4><p>Plan outdoor activities around Vernal's seasonal weather.</p></a>
        <a href="/guides/what-to-wear-utv-tour/" class="related-card"><h4>What to Wear on a UTV Tour</h4><p>Layering, sun protection, and footwear for desert tours.</p></a>
        <a href="/dinosaur-national-monument/petroglyphs-rock-art-vernal/" class="related-card"><h4>Petroglyphs &amp; Rock Art</h4><p>Ancient Fremont and Ute rock art on our guided tours.</p></a>
      </div>
    </div>
  </main>

  <script is:inline>
    document.querySelectorAll('.filter-btn').forEach(function(btn){btn.addEventListener('click',function(){document.querySelectorAll('.filter-btn').forEach(function(b){b.classList.remove('active')});btn.classList.add('active');var f=btn.dataset.filter;document.querySelectorAll('.restaurant-card').forEach(function(c){if(f==='all'||c.dataset.category===f){c.classList.remove('hidden');c.style.animation='fadeInUp 0.4s ease forwards'}else{c.classList.add('hidden')}})})});
    function copyCoupon(btn,code){navigator.clipboard?navigator.clipboard.writeText(code).then(function(){btn.textContent='✓ Copied!';btn.classList.add('copied');setTimeout(function(){btn.textContent='Copy';btn.classList.remove('copied')},2000)}):function(){var e=document.createElement('textarea');e.value=code;document.body.appendChild(e);e.select();document.execCommand('copy');document.body.removeChild(e);btn.textContent='✓ Copied!';btn.classList.add('copied');setTimeout(function(){btn.textContent='Copy';btn.classList.remove('copied')},2000)}()}
    function showCouponModal(r,c,d){document.getElementById('modalRestaurant').textContent=r;document.getElementById('modalCode').textContent=c;document.getElementById('modalDiscount').textContent=d;document.getElementById('couponModal').classList.add('visible');document.body.style.overflow='hidden'}
    document.getElementById('couponModalClose').addEventListener('click',function(){document.getElementById('couponModal').classList.remove('visible');document.body.style.overflow=''});
    document.getElementById('couponModal').addEventListener('click',function(e){if(e.target===e.currentTarget){document.getElementById('couponModal').classList.remove('visible');document.body.style.overflow=''}});
  </script>
`;

const ES = `

  <!-- Coupon Modal -->
  <div class="coupon-modal-overlay" id="couponModal"><div class="coupon-modal">
    <button class="coupon-modal-close" id="couponModalClose">&times;</button>
    <div class="coupon-modal-icon">🎟️</div>
    <h2>Descuento de Adventure Tours</h2>
    <p class="modal-restaurant" id="modalRestaurant"></p>
    <div class="modal-code-box"><div class="modal-code" id="modalCode"></div><div class="modal-discount" id="modalDiscount"></div></div>
    <p class="modal-instructions">Muestre esta pantalla a su mesero para canjear su descuento. Válido para huéspedes de Adventure Tours Vernal con reserva confirmada.</p>
    <div class="modal-branding"><img src="/images/logo.webp" alt="Adventure Tours Vernal" height="40"><span>adventuretoursvernal.com</span></div>
  </div></div>

  <main class="restaurant-page">
    <!-- Hero -->
    <div class="dining-hero"><div class="dining-hero-bg"></div><div class="dining-hero-overlay"></div>
      <div class="dining-hero-content">
        <nav aria-label="Ruta de navegación"><a href="/es/">Inicio</a><span>›</span><span style="color:rgba(255,255,255,0.9)">Mejores Restaurantes en Vernal</span></nav>
        <h1>Coma Como un Local en Vernal, Utah</h1>
        <p>Nuestros huéspedes nos preguntan cada semana: <em>"¿Dónde deberíamos comer?"</em> Después de años viviendo aquí, estas son nuestras recomendaciones honestas — y <strong>recibirá descuentos exclusivos</strong> en cada una solo por reservar un tour.</p>
      </div>
    </div>

    <!-- Discount Banner -->
    <div class="discount-banner">
      <div class="discount-banner-icon">🎟️</div>
      <div class="discount-banner-text">
        <h2>Descuentos Exclusivos para Huéspedes de Tours</h2>
        <p>Reserve un <a href="/es/booking/" style="color:var(--desert-gold);font-weight:700">tour en UTV con Adventure Tours Vernal</a> y desbloquee <strong>códigos de descuento exclusivos</strong> en los restaurantes a continuación. Toque <strong>"Mostrar al Mesero"</strong> en cualquier tarjeta para mostrar un cupón a pantalla completa en su teléfono.</p>
      </div>
    </div>

    <!-- Filters -->
    <div class="category-filters" id="categoryFilters">
      <button class="filter-btn active" data-filter="all">🍽️ Todos los Restaurantes</button>
      <button class="filter-btn" data-filter="casual">🍕 Informal</button>
      <button class="filter-btn" data-filter="breakfast">☕ Desayunos y Fondas</button>
      <button class="filter-btn" data-filter="steakhouse">🥩 Asadores</button>
      <button class="filter-btn" data-filter="mexican">🌮 Mexicana e Internacional</button>
    </div>

    <!-- Restaurant Grid -->
    <div class="restaurant-grid" id="restaurantGrid">

      <!-- 4 Brothers Pizza -->
      <div class="restaurant-card" data-category="casual">
        <div class="card-image" style="background-image:url('/images/102.webp')"><span class="cuisine-badge">Pizza</span><span class="discount-tag">🎟️ 10% de Descuento</span></div>
        <div class="card-body">
          <h3>4 Brothers Pizza</h3>
          <p class="card-address">📍 1060 Market Dr. #5, Vernal, UT 84078</p>
          <p class="card-description">La pizzería de referencia en la ciudad — masa consistente, ingredientes generosos y siempre acierta. Coma en el local o lleve una caja de regreso al hotel.</p>
          <div class="card-actions">
            <a href="tel:+14357892222" class="card-action-btn action-call">📞 Llamar</a>
            <a href="https://maps.google.com/?q=4+Brothers+Pizza+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Mapa</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Descuento para Huéspedes de Tours</div>
            <div class="coupon-row"><div class="coupon-code">ATV-PIZZA10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-PIZZA10')">Copiar</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('4 Brothers Pizza','ATV-PIZZA10','10% de Descuento en Su Pedido')">📱 Mostrar al Mesero</button>
            <p class="coupon-note">Válido con confirmación de reserva de Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- Country Grub -->
      <div class="restaurant-card" data-category="casual">
        <div class="card-image" style="background-image:url('/images/103.webp')"><span class="cuisine-badge">Hamburguesas</span><span class="discount-tag">🎟️ 10% de Descuento</span></div>
        <div class="card-body">
          <h3>Country Grub Hamburger Restaurant</h3>
          <p class="card-address">📍 2416 W 1500 E, Vernal, UT 84078</p>
          <p class="card-description">Hamburguesas clásicas americanas bien hechas — carne bien sazonada, papas fritas crujientes, y la comida perfecta después de un día al aire libre.</p>
          <div class="card-actions">
            <a href="tel:+14357891414" class="card-action-btn action-call">📞 Llamar</a>
            <a href="https://maps.google.com/?q=Country+Grub+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Mapa</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Descuento para Huéspedes de Tours</div>
            <div class="coupon-row"><div class="coupon-code">ATV-GRUB10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-GRUB10')">Copiar</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Country Grub','ATV-GRUB10','10% de Descuento en Su Pedido')">📱 Mostrar al Mesero</button>
            <p class="coupon-note">Válido con confirmación de reserva de Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- Get Grilled -->
      <div class="restaurant-card" data-category="casual">
        <div class="card-image" style="background-image:url('/images/95a.webp')"><span class="cuisine-badge">Sándwiches</span><span class="discount-tag">🎟️ Bebida Gratis</span></div>
        <div class="card-body">
          <h3>Get Grilled Sandwiches</h3>
          <p class="card-address">📍 1096 W Hwy 40, Vernal, UT 84078</p>
          <p class="card-description">Ideal para un almuerzo rápido — sándwiches recién hechos y servicio ágil justo al lado de la carretera. Perfecto de camino a o desde Dinosaur National Monument.</p>
          <div class="card-actions">
            <a href="tel:+14357893900" class="card-action-btn action-call">📞 Llamar</a>
            <a href="https://maps.google.com/?q=Get+Grilled+Sandwiches+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Mapa</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Descuento para Huéspedes de Tours</div>
            <div class="coupon-row"><div class="coupon-code">ATV-GRILL1</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-GRILL1')">Copiar</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Get Grilled Sandwiches','ATV-GRILL1','Bebida Gratis con Cualquier Sándwich')">📱 Mostrar al Mesero</button>
            <p class="coupon-note">Válido con confirmación de reserva de Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- Abby's Café -->
      <div class="restaurant-card" data-category="breakfast">
        <div class="card-image" style="background-image:url('/images/105.webp')"><span class="cuisine-badge">Desayuno</span><span class="discount-tag">🎟️ 10% de Descuento</span></div>
        <div class="card-body">
          <h3>Abby's Café</h3>
          <p class="card-address">📍 73 W Main St., Vernal, UT 84078</p>
          <p class="card-description">Un favorito local de siempre para el desayuno y la comida reconfortante. El tipo de lugar donde la mesera conoce a la mitad del salón por su nombre. Perfecto antes de un tour matutino.</p>
          <div class="card-actions">
            <a href="tel:+14357891366" class="card-action-btn action-call">📞 Llamar</a>
            <a href="https://maps.google.com/?q=Abbys+Cafe+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Mapa</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Descuento para Huéspedes de Tours</div>
            <div class="coupon-row"><div class="coupon-code">ATV-ABBY10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-ABBY10')">Copiar</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Abby\\'s Café','ATV-ABBY10','10% de Descuento en el Desayuno')">📱 Mostrar al Mesero</button>
            <p class="coupon-note">Válido con confirmación de reserva de Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- Betty's Café -->
      <div class="restaurant-card" data-category="breakfast">
        <div class="card-image" style="background-image:url('/images/97a.webp')"><span class="cuisine-badge">Fonda</span><span class="discount-tag">🎟️ Café Gratis</span></div>
        <div class="card-body">
          <h3>Betty's Café</h3>
          <p class="card-address">📍 416 W Main St., Vernal, UT 84078</p>
          <p class="card-description">Ambiente de fonda a la antigua, comidas abundantes y servicio amable. Betty's lleva años alimentando a Vernal, y las porciones no se han reducido.</p>
          <div class="card-actions">
            <a href="tel:+14357810827" class="card-action-btn action-call">📞 Llamar</a>
            <a href="https://maps.google.com/?q=Bettys+Cafe+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Mapa</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Descuento para Huéspedes de Tours</div>
            <div class="coupon-row"><div class="coupon-code">ATV-BETTY1</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-BETTY1')">Copiar</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Betty\\'s Café','ATV-BETTY1','Café Gratis con Cualquier Comida')">📱 Mostrar al Mesero</button>
            <p class="coupon-note">Válido con confirmación de reserva de Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- Swain's Steakhouse -->
      <div class="restaurant-card" data-category="steakhouse">
        <div class="card-image" style="background-image:url('/images/99a.webp')"><span class="cuisine-badge">Asador</span><span class="discount-tag">🎟️ 15% de Descuento</span></div>
        <div class="card-body">
          <h3>Swain's Steakhouse</h3>
          <p class="card-address">📍 29 S Vernal Ave., Vernal, UT 84078</p>
          <p class="card-description">Lo más cercano a la alta cocina en Vernal — y es muy bueno. Si solo va a tener una cena sentada en la ciudad, que sea esta. Los cortes se preparan como deben ser.</p>
          <div class="card-actions">
            <a href="tel:+14357892671" class="card-action-btn action-call">📞 Llamar</a>
            <a href="https://maps.google.com/?q=Swains+Steakhouse+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Mapa</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Descuento para Huéspedes de Tours</div>
            <div class="coupon-row"><div class="coupon-code">ATV-STEAK15</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-STEAK15')">Copiar</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Swain\\'s Steakhouse','ATV-STEAK15','15% de Descuento en Su Cena')">📱 Mostrar al Mesero</button>
            <p class="coupon-note">Válido con confirmación de reserva de Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- 7-11 Ranch -->
      <div class="restaurant-card" data-category="steakhouse">
        <div class="card-image" style="background-image:url('/images/100a.webp')"><span class="cuisine-badge">Estilo del Oeste</span><span class="discount-tag">🎟️ 10% de Descuento</span></div>
        <div class="card-body">
          <h3>7-11 Ranch Restaurant</h3>
          <p class="card-address">📍 77 E Main St., Vernal, UT 84078</p>
          <p class="card-description">Encanto rústico del Oeste, porciones abundantes y el tipo de ambiente que le recuerda que está en el auténtico Oeste rural. Ideal para familias.</p>
          <div class="card-actions">
            <a href="tel:+14357891170" class="card-action-btn action-call">📞 Llamar</a>
            <a href="https://maps.google.com/?q=7-11+Ranch+Restaurant+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Mapa</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Descuento para Huéspedes de Tours</div>
            <div class="coupon-row"><div class="coupon-code">ATV-RANCH10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-RANCH10')">Copiar</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('7-11 Ranch Restaurant','ATV-RANCH10','10% de Descuento en Su Pedido')">📱 Mostrar al Mesero</button>
            <p class="coupon-note">Válido con confirmación de reserva de Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- Red Canyon Lodge -->
      <div class="restaurant-card" data-category="steakhouse">
        <div class="card-image" style="background-image:url('/images/101a.webp')"><span class="cuisine-badge">Comida de Lodge</span><span class="discount-tag">🎟️ 10% de Descuento</span></div>
        <div class="card-body">
          <h3>Red Canyon Lodge</h3>
          <p class="card-address">📍 2450 Red Canyon Rd, Dutch John, UT 84023</p>
          <p class="card-description">Cerca de una hora al norte hacia Flaming Gorge — pero el paisaje por sí solo hace que valga la pena el viaje. Buena comida en un impresionante entorno de lodge de montaña.</p>
          <div class="card-actions">
            <a href="tel:+14358892090" class="card-action-btn action-call">📞 Llamar</a>
            <a href="https://www.redcanyonlodge.com" target="_blank" rel="noopener" class="card-action-btn action-website">🌐 Sitio Web</a>
            <a href="https://maps.google.com/?q=Red+Canyon+Lodge+Dutch+John+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Mapa</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Descuento para Huéspedes de Tours</div>
            <div class="coupon-row"><div class="coupon-code">ATV-CANYON10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-CANYON10')">Copiar</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Red Canyon Lodge','ATV-CANYON10','10% de Descuento en la Comida')">📱 Mostrar al Mesero</button>
            <p class="coupon-note">Válido con confirmación de reserva de Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- Plaza Mexicana -->
      <div class="restaurant-card" data-category="mexican">
        <div class="card-image" style="background-image:url('/images/102a.webp')"><span class="cuisine-badge">Mexicana</span><span class="discount-tag">🎟️ 10% de Descuento</span></div>
        <div class="card-body">
          <h3>Plaza Mexicana</h3>
          <p class="card-address">📍 55 E Main St., Vernal, UT 84078</p>
          <p class="card-description">Sabores auténticos, ambiente acogedor y el tipo de restaurante al que las familias vuelven cada vez que visitan Vernal. Las enchiladas y el chile verde son los platos destacados.</p>
          <div class="card-actions">
            <a href="tel:+14357893340" class="card-action-btn action-call">📞 Llamar</a>
            <a href="https://maps.google.com/?q=Plaza+Mexicana+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Mapa</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Descuento para Huéspedes de Tours</div>
            <div class="coupon-row"><div class="coupon-code">ATV-PLAZA10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-PLAZA10')">Copiar</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Plaza Mexicana','ATV-PLAZA10','10% de Descuento en Su Pedido')">📱 Mostrar al Mesero</button>
            <p class="coupon-note">Válido con confirmación de reserva de Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- Mi Hacienda -->
      <div class="restaurant-card" data-category="mexican">
        <div class="card-image" style="background-image:url('/images/103a.webp')"><span class="cuisine-badge">Mexicana</span><span class="discount-tag">🎟️ 15% de Descuento</span></div>
        <div class="card-body">
          <h3>Mi Hacienda</h3>
          <p class="card-address">📍 2075 US-40, Suite A, Vernal, UT 84078 (Towne Center)</p>
          <p class="card-description">Uno de los restaurantes más populares de la ciudad, sin lugar a dudas. Buenos tacos, enchiladas consistentes, y las margaritas son justo lo que se necesita después de una tarde polvorienta en los senderos.</p>
          <div class="card-actions">
            <a href="tel:+14357810099" class="card-action-btn action-call">📞 (435) 781-0099</a>
            <a href="https://maps.google.com/?q=Mi+Hacienda+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Mapa</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Descuento para Huéspedes de Tours</div>
            <div class="coupon-row"><div class="coupon-code">ATV-MIH15</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-MIH15')">Copiar</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Mi Hacienda','ATV-MIH15','15% de Descuento en Su Pedido')">📱 Mostrar al Mesero</button>
            <p class="coupon-note">Válido con confirmación de reserva de Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- Canton Canyon City -->
      <div class="restaurant-card" data-category="mexican">
        <div class="card-image" style="background-image:url('/images/104a.png')"><span class="cuisine-badge">China</span><span class="discount-tag">🎟️ 10% de Descuento</span></div>
        <div class="card-body">
          <h3>Canton Canyon City Chinese Restaurant</h3>
          <p class="card-address">📍 1175 W Hwy 40, Vernal, UT 84078</p>
          <p class="card-description">Una opción confiable de cocina china con porciones generosas. Cuando quiera un descanso de las hamburguesas y los cortes, Canton no decepciona. Menú apto para toda la familia.</p>
          <div class="card-actions">
            <a href="tel:+14357891388" class="card-action-btn action-call">📞 Llamar</a>
            <a href="https://maps.google.com/?q=Canton+Canyon+City+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Mapa</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Descuento para Huéspedes de Tours</div>
            <div class="coupon-row"><div class="coupon-code">ATV-CANTON10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-CANTON10')">Copiar</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Canton Canyon City','ATV-CANTON10','10% de Descuento en Su Pedido')">📱 Mostrar al Mesero</button>
            <p class="coupon-note">Válido con confirmación de reserva de Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- La Cabaña -->
      <div class="restaurant-card" data-category="mexican">
        <div class="card-image" style="background-image:url('/images/98a.webp')"><span class="cuisine-badge">Mexicana</span><span class="discount-tag">🎟️ 10% de Descuento</span></div>
        <div class="card-body">
          <h3>La Cabaña</h3>
          <p class="card-address">📍 120 E Main St, Vernal, UT 84078</p>
          <p class="card-description">Comida mexicana auténtica justo en el centro — fajitas chisporroteantes, enchiladas hechas a mano y tacos estilo callejero. Un favorito local de siempre para una comida abundante después del recorrido.</p>
          <div class="card-actions">
            <a href="tel:+14357893151" class="card-action-btn action-call">📞 Llamar</a>
            <a href="https://maps.google.com/?q=La+Cabana+Restaurant+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Mapa</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Descuento para Huéspedes de Tours</div>
            <div class="coupon-row"><div class="coupon-code">ATV-CABANA10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-CABANA10')">Copiar</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('La Cabaña','ATV-CABANA10','10% de Descuento en Su Pedido')">📱 Mostrar al Mesero</button>
            <p class="coupon-note">Válido con confirmación de reserva de Adventure Tours</p>
          </div>
        </div>
      </div>

    </div>

    <!-- Tips -->
    <section>
      <div class="section-header"><h2 class="section-title">Consejos para Comer en Vernal</h2><p class="section-subtitle">Algunas cosas que debe saber antes de salir a comer.</p></div>
      <div class="rest-tips-grid">
        <div class="rest-tip-card"><div class="rest-tip-icon">⏰</div><h3>Planifique Según los Horarios del Tour</h3><p>Nuestros <a href="/es/utv/" style="color:var(--burnt-orange);font-weight:600">tours en UTV</a> duran unas tres horas. Los que salen por la mañana tienen hambre a primera hora de la tarde. ¿Tour vespertino? Vaya directo a Swain's o Plaza Mexicana.</p></div>
        <div class="rest-tip-card"><div class="rest-tip-icon">📅</div><h3>Los Fines de Semana Se Llenan</h3><p>Los lugares populares se llenan los viernes y sábados por la noche — especialmente en verano. ¿Tiene un grupo? Llame con anticipación para reservar mesa en Swain's o 7-11 Ranch.</p></div>
        <div class="rest-tip-card"><div class="rest-tip-icon">💵</div><h3>El Efectivo Sigue Funcionando</h3><p>La mayoría de los restaurantes aceptan tarjetas, pero algunas cafeterías más pequeñas prefieren efectivo. Lleve algo de dinero en efectivo al visitar el Utah rural.</p></div>
        <div class="rest-tip-card"><div class="rest-tip-icon">🦕</div><h3>¿Va Camino al Monumento?</h3><p>Coma algo en el centro, en Main Street, antes del trayecto hacia el este a <a href="https://www.nps.gov/dino" target="_blank" rel="noopener" style="color:var(--burnt-orange);font-weight:600">Dinosaur National Monument</a>. La Cabaña y Plaza Mexicana son paradas rápidas y abundantes en el camino.</p></div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="article-faq" style="background:white;border-radius:25px;padding:50px 45px;box-shadow:0 20px 60px rgba(0,0,0,0.08);border:1px solid rgba(212,118,78,0.1);margin-bottom:50px">
      <h2 style="font-family:var(--font-heading);font-size:1.6rem;font-weight:700;color:var(--charcoal);text-align:center;margin-bottom:30px;border:none;padding:0">Preguntas Frecuentes</h2>
      <div class="faq-item"><h3>¿Cuáles son los mejores restaurantes en Vernal, Utah?</h3><p>Entre las mejores opciones están 4 Brothers Pizza para comida informal, Betty's Café para el desayuno, Swain's Steakhouse para una cena sentada, y Plaza Mexicana para comida mexicana auténtica. Los huéspedes de los tours reciben códigos de descuento exclusivos en cada uno.</p></div>
      <div class="faq-item"><h3>¿Hay restaurantes cerca de Dinosaur National Monument?</h3><p>Sí — Vernal es la ciudad de entrada y todos los restaurantes de esta página están a poca distancia en auto del monumento. Lugares del centro como La Cabaña y Plaza Mexicana en Main Street son una parada fácil de camino al este hacia el Quarry Visitor Center.</p></div>
      <div class="faq-item"><h3>¿Cómo uso los códigos de descuento gastronómico de Adventure Tours?</h3><p>Cada tarjeta de restaurante tiene un código de cupón único. Toque "Mostrar al Mesero" para mostrar un cupón a pantalla completa en su teléfono, o mencione el código al ordenar. Válido con una reserva confirmada de Adventure Tours.</p></div>
      <div class="faq-item"><h3>¿Dónde debería comer después de un tour en UTV?</h3><p>Después de un tour de tres horas, la mayoría de los huéspedes quiere algo abundante. 4 Brothers Pizza, Country Grub y 7-11 Ranch son opciones populares después del recorrido, con porciones generosas.</p></div>
      <div class="faq-item"><h3>¿Hay alta cocina en Vernal?</h3><p>El ambiente gastronómico de Vernal es más informal, pero Swain's Steakhouse y Red Canyon Lodge cerca de Flaming Gorge ofrecen experiencias de cena más refinadas que valen la visita.</p></div>
    </section>

    <!-- CTA -->
    <div class="article-cta" style="border-radius:25px">
      <h3>¿Listo para Explorar Vernal?</h3>
      <p>Reserve un tour guiado en UTV por antiguos petroglifos, cañones de roca roja y senderos del desierto — y luego desbloquee descuentos gastronómicos exclusivos en cada restaurante de esta página.</p>
      <a href="/es/booking/" class="cta-btn">Reserve Su Tour</a>
      <a href="tel:+14352199447" class="cta-phone">📞 (435) 219-9447</a>
    </div>

    <!-- Related -->
    <div class="related-articles">
      <h3>Más Guías de Viaje de Vernal</h3>
      <div class="related-grid">
        <a href="/utv/best-utv-trails-vernal/" class="related-card"><h4>Mejores Senderos para UTV Cerca de Vernal</h4><p>Los mejores senderos todoterreno de la Cuenca de Uintah — de principiante a experto.</p></a>
        <a href="/guides/vernal-weather-guide/" class="related-card"><h4>Guía del Clima de Vernal</h4><p>Planifique actividades al aire libre según el clima estacional de Vernal.</p></a>
        <a href="/guides/what-to-wear-utv-tour/" class="related-card"><h4>Qué Ponerse en un Tour en UTV</h4><p>Capas de ropa, protección solar y calzado para tours en el desierto.</p></a>
        <a href="/dinosaur-national-monument/petroglyphs-rock-art-vernal/" class="related-card"><h4>Petroglifos y Arte Rupestre</h4><p>Antiguo arte rupestre Fremont y Ute en nuestros tours guiados.</p></a>
      </div>
    </div>
  </main>

  <script is:inline>
    document.querySelectorAll('.filter-btn').forEach(function(btn){btn.addEventListener('click',function(){document.querySelectorAll('.filter-btn').forEach(function(b){b.classList.remove('active')});btn.classList.add('active');var f=btn.dataset.filter;document.querySelectorAll('.restaurant-card').forEach(function(c){if(f==='all'||c.dataset.category===f){c.classList.remove('hidden');c.style.animation='fadeInUp 0.4s ease forwards'}else{c.classList.add('hidden')}})})});
    function copyCoupon(btn,code){navigator.clipboard?navigator.clipboard.writeText(code).then(function(){btn.textContent='✓ ¡Copiado!';btn.classList.add('copied');setTimeout(function(){btn.textContent='Copiar';btn.classList.remove('copied')},2000)}):function(){var e=document.createElement('textarea');e.value=code;document.body.appendChild(e);e.select();document.execCommand('copy');document.body.removeChild(e);btn.textContent='✓ ¡Copiado!';btn.classList.add('copied');setTimeout(function(){btn.textContent='Copiar';btn.classList.remove('copied')},2000)}()}
    function showCouponModal(r,c,d){document.getElementById('modalRestaurant').textContent=r;document.getElementById('modalCode').textContent=c;document.getElementById('modalDiscount').textContent=d;document.getElementById('couponModal').classList.add('visible');document.body.style.overflow='hidden'}
    document.getElementById('couponModalClose').addEventListener('click',function(){document.getElementById('couponModal').classList.remove('visible');document.body.style.overflow=''});
    document.getElementById('couponModal').addEventListener('click',function(e){if(e.target===e.currentTarget){document.getElementById('couponModal').classList.remove('visible');document.body.style.overflow=''}});
  </script>
`;

const IT = `

  <!-- Coupon Modal -->
  <div class="coupon-modal-overlay" id="couponModal"><div class="coupon-modal">
    <button class="coupon-modal-close" id="couponModalClose">&times;</button>
    <div class="coupon-modal-icon">🎟️</div>
    <h2>Sconto Adventure Tours</h2>
    <p class="modal-restaurant" id="modalRestaurant"></p>
    <div class="modal-code-box"><div class="modal-code" id="modalCode"></div><div class="modal-discount" id="modalDiscount"></div></div>
    <p class="modal-instructions">Mostri questa schermata al Suo cameriere per riscattare lo sconto. Valido per gli ospiti di Adventure Tours Vernal con prenotazione confermata.</p>
    <div class="modal-branding"><img src="/images/logo.webp" alt="Adventure Tours Vernal" height="40"><span>adventuretoursvernal.com</span></div>
  </div></div>

  <main class="restaurant-page">
    <!-- Hero -->
    <div class="dining-hero"><div class="dining-hero-bg"></div><div class="dining-hero-overlay"></div>
      <div class="dining-hero-content">
        <nav aria-label="Percorso di navigazione"><a href="/it/">Home</a><span>›</span><span style="color:rgba(255,255,255,0.9)">Migliori Ristoranti a Vernal</span></nav>
        <h1>Mangi Come un Local a Vernal, Utah</h1>
        <p>I nostri ospiti ce lo chiedono ogni settimana: <em>"Dove dovremmo mangiare?"</em> Dopo anni vissuti qui, queste sono le nostre scelte più sincere — e <strong>riceverà sconti esclusivi</strong> in ognuno di questi locali semplicemente prenotando un tour.</p>
      </div>
    </div>

    <!-- Discount Banner -->
    <div class="discount-banner">
      <div class="discount-banner-icon">🎟️</div>
      <div class="discount-banner-text">
        <h2>Sconti Esclusivi per gli Ospiti dei Tour</h2>
        <p>Prenoti un <a href="/it/booking/" style="color:var(--desert-gold);font-weight:700">tour in UTV con Adventure Tours Vernal</a> e sblocchi <strong>codici sconto esclusivi</strong> nei ristoranti qui sotto. Tocchi <strong>"Mostra al Cameriere"</strong> su qualsiasi scheda per visualizzare un coupon a schermo intero sul Suo telefono.</p>
      </div>
    </div>

    <!-- Filters -->
    <div class="category-filters" id="categoryFilters">
      <button class="filter-btn active" data-filter="all">🍽️ Tutti i Ristoranti</button>
      <button class="filter-btn" data-filter="casual">🍕 Informale</button>
      <button class="filter-btn" data-filter="breakfast">☕ Colazione e Tavole Calde</button>
      <button class="filter-btn" data-filter="steakhouse">🥩 Steakhouse</button>
      <button class="filter-btn" data-filter="mexican">🌮 Messicana e Internazionale</button>
    </div>

    <!-- Restaurant Grid -->
    <div class="restaurant-grid" id="restaurantGrid">

      <!-- 4 Brothers Pizza -->
      <div class="restaurant-card" data-category="casual">
        <div class="card-image" style="background-image:url('/images/102.webp')"><span class="cuisine-badge">Pizza</span><span class="discount-tag">🎟️ 10% di Sconto</span></div>
        <div class="card-body">
          <h3>4 Brothers Pizza</h3>
          <p class="card-address">📍 1060 Market Dr. #5, Vernal, UT 84078</p>
          <p class="card-description">La pizzeria di riferimento in città — impasto solido, farciture generose, e funziona sempre. Mangi sul posto o porti via una scatola per il ritorno in hotel.</p>
          <div class="card-actions">
            <a href="tel:+14357892222" class="card-action-btn action-call">📞 Chiami</a>
            <a href="https://maps.google.com/?q=4+Brothers+Pizza+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Mappa</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Sconto per Ospiti dei Tour</div>
            <div class="coupon-row"><div class="coupon-code">ATV-PIZZA10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-PIZZA10')">Copia</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('4 Brothers Pizza','ATV-PIZZA10','10% di Sconto sul Suo Ordine')">📱 Mostra al Cameriere</button>
            <p class="coupon-note">Valido con conferma di prenotazione Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- Country Grub -->
      <div class="restaurant-card" data-category="casual">
        <div class="card-image" style="background-image:url('/images/103.webp')"><span class="cuisine-badge">Hamburger</span><span class="discount-tag">🎟️ 10% di Sconto</span></div>
        <div class="card-body">
          <h3>Country Grub Hamburger Restaurant</h3>
          <p class="card-address">📍 2416 W 1500 E, Vernal, UT 84078</p>
          <p class="card-description">Classici hamburger americani fatti come si deve — carne ben condita, patatine croccanti, e il pasto perfetto dopo una giornata all'aperto.</p>
          <div class="card-actions">
            <a href="tel:+14357891414" class="card-action-btn action-call">📞 Chiami</a>
            <a href="https://maps.google.com/?q=Country+Grub+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Mappa</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Sconto per Ospiti dei Tour</div>
            <div class="coupon-row"><div class="coupon-code">ATV-GRUB10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-GRUB10')">Copia</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Country Grub','ATV-GRUB10','10% di Sconto sul Suo Ordine')">📱 Mostra al Cameriere</button>
            <p class="coupon-note">Valido con conferma di prenotazione Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- Get Grilled -->
      <div class="restaurant-card" data-category="casual">
        <div class="card-image" style="background-image:url('/images/95a.webp')"><span class="cuisine-badge">Sandwich</span><span class="discount-tag">🎟️ Bevanda Gratis</span></div>
        <div class="card-body">
          <h3>Get Grilled Sandwiches</h3>
          <p class="card-address">📍 1096 W Hwy 40, Vernal, UT 84078</p>
          <p class="card-description">Ottimo per un pranzo veloce — sandwich preparati al momento e servizio rapido proprio lungo l'autostrada. Perfetto andando verso Dinosaur National Monument o tornando indietro.</p>
          <div class="card-actions">
            <a href="tel:+14357893900" class="card-action-btn action-call">📞 Chiami</a>
            <a href="https://maps.google.com/?q=Get+Grilled+Sandwiches+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Mappa</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Sconto per Ospiti dei Tour</div>
            <div class="coupon-row"><div class="coupon-code">ATV-GRILL1</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-GRILL1')">Copia</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Get Grilled Sandwiches','ATV-GRILL1','Bevanda Gratis con Qualsiasi Sandwich')">📱 Mostra al Cameriere</button>
            <p class="coupon-note">Valido con conferma di prenotazione Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- Abby's Café -->
      <div class="restaurant-card" data-category="breakfast">
        <div class="card-image" style="background-image:url('/images/105.webp')"><span class="cuisine-badge">Colazione</span><span class="discount-tag">🎟️ 10% di Sconto</span></div>
        <div class="card-body">
          <h3>Abby's Café</h3>
          <p class="card-address">📍 73 W Main St., Vernal, UT 84078</p>
          <p class="card-description">Un locale storico amato dai locali per colazioni e cucina casalinga. Il tipo di posto dove la cameriera conosce metà della sala per nome. Perfetto prima di un tour mattutino.</p>
          <div class="card-actions">
            <a href="tel:+14357891366" class="card-action-btn action-call">📞 Chiami</a>
            <a href="https://maps.google.com/?q=Abbys+Cafe+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Mappa</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Sconto per Ospiti dei Tour</div>
            <div class="coupon-row"><div class="coupon-code">ATV-ABBY10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-ABBY10')">Copia</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Abby\\'s Café','ATV-ABBY10','10% di Sconto sulla Colazione')">📱 Mostra al Cameriere</button>
            <p class="coupon-note">Valido con conferma di prenotazione Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- Betty's Café -->
      <div class="restaurant-card" data-category="breakfast">
        <div class="card-image" style="background-image:url('/images/97a.webp')"><span class="cuisine-badge">Tavola Calda</span><span class="discount-tag">🎟️ Caffè Gratis</span></div>
        <div class="card-body">
          <h3>Betty's Café</h3>
          <p class="card-address">📍 416 W Main St., Vernal, UT 84078</p>
          <p class="card-description">Atmosfera da tavola calda d'altri tempi, pasti abbondanti e servizio cordiale. Betty's sfama Vernal da anni, e le porzioni non si sono mai ridotte.</p>
          <div class="card-actions">
            <a href="tel:+14357810827" class="card-action-btn action-call">📞 Chiami</a>
            <a href="https://maps.google.com/?q=Bettys+Cafe+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Mappa</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Sconto per Ospiti dei Tour</div>
            <div class="coupon-row"><div class="coupon-code">ATV-BETTY1</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-BETTY1')">Copia</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Betty\\'s Café','ATV-BETTY1','Caffè Gratis con Qualsiasi Pasto')">📱 Mostra al Cameriere</button>
            <p class="coupon-note">Valido con conferma di prenotazione Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- Swain's Steakhouse -->
      <div class="restaurant-card" data-category="steakhouse">
        <div class="card-image" style="background-image:url('/images/99a.webp')"><span class="cuisine-badge">Steakhouse</span><span class="discount-tag">🎟️ 15% di Sconto</span></div>
        <div class="card-body">
          <h3>Swain's Steakhouse</h3>
          <p class="card-address">📍 29 S Vernal Ave., Vernal, UT 84078</p>
          <p class="card-description">Il locale più vicino alla cucina raffinata a Vernal — ed è davvero ottimo. Se ha in programma una sola cena al tavolo in città, che sia questa. Le bistecche sono cotte a puntino.</p>
          <div class="card-actions">
            <a href="tel:+14357892671" class="card-action-btn action-call">📞 Chiami</a>
            <a href="https://maps.google.com/?q=Swains+Steakhouse+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Mappa</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Sconto per Ospiti dei Tour</div>
            <div class="coupon-row"><div class="coupon-code">ATV-STEAK15</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-STEAK15')">Copia</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Swain\\'s Steakhouse','ATV-STEAK15','15% di Sconto sulla Cena')">📱 Mostra al Cameriere</button>
            <p class="coupon-note">Valido con conferma di prenotazione Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- 7-11 Ranch -->
      <div class="restaurant-card" data-category="steakhouse">
        <div class="card-image" style="background-image:url('/images/100a.webp')"><span class="cuisine-badge">Western</span><span class="discount-tag">🎟️ 10% di Sconto</span></div>
        <div class="card-body">
          <h3>7-11 Ranch Restaurant</h3>
          <p class="card-address">📍 77 E Main St., Vernal, UT 84078</p>
          <p class="card-description">Fascino rustico da Far West, porzioni abbondanti e l'atmosfera autentica del vero West rurale. Ottimo per le famiglie.</p>
          <div class="card-actions">
            <a href="tel:+14357891170" class="card-action-btn action-call">📞 Chiami</a>
            <a href="https://maps.google.com/?q=7-11+Ranch+Restaurant+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Mappa</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Sconto per Ospiti dei Tour</div>
            <div class="coupon-row"><div class="coupon-code">ATV-RANCH10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-RANCH10')">Copia</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('7-11 Ranch Restaurant','ATV-RANCH10','10% di Sconto sul Suo Ordine')">📱 Mostra al Cameriere</button>
            <p class="coupon-note">Valido con conferma di prenotazione Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- Red Canyon Lodge -->
      <div class="restaurant-card" data-category="steakhouse">
        <div class="card-image" style="background-image:url('/images/101a.webp')"><span class="cuisine-badge">Cucina di Lodge</span><span class="discount-tag">🎟️ 10% di Sconto</span></div>
        <div class="card-body">
          <h3>Red Canyon Lodge</h3>
          <p class="card-address">📍 2450 Red Canyon Rd, Dutch John, UT 84023</p>
          <p class="card-description">Circa un'ora a nord verso Flaming Gorge — ma il panorama da solo vale il viaggio. Ottimo cibo in una splendida cornice da lodge di montagna.</p>
          <div class="card-actions">
            <a href="tel:+14358892090" class="card-action-btn action-call">📞 Chiami</a>
            <a href="https://www.redcanyonlodge.com" target="_blank" rel="noopener" class="card-action-btn action-website">🌐 Sito Web</a>
            <a href="https://maps.google.com/?q=Red+Canyon+Lodge+Dutch+John+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Mappa</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Sconto per Ospiti dei Tour</div>
            <div class="coupon-row"><div class="coupon-code">ATV-CANYON10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-CANYON10')">Copia</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Red Canyon Lodge','ATV-CANYON10','10% di Sconto sul Pasto')">📱 Mostra al Cameriere</button>
            <p class="coupon-note">Valido con conferma di prenotazione Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- Plaza Mexicana -->
      <div class="restaurant-card" data-category="mexican">
        <div class="card-image" style="background-image:url('/images/102a.webp')"><span class="cuisine-badge">Messicana</span><span class="discount-tag">🎟️ 10% di Sconto</span></div>
        <div class="card-body">
          <h3>Plaza Mexicana</h3>
          <p class="card-address">📍 55 E Main St., Vernal, UT 84078</p>
          <p class="card-description">Sapori autentici, atmosfera accogliente, e il tipo di ristorante a cui le famiglie tornano ogni volta che visitano Vernal. Le enchiladas e il chile verde sono i piatti forti.</p>
          <div class="card-actions">
            <a href="tel:+14357893340" class="card-action-btn action-call">📞 Chiami</a>
            <a href="https://maps.google.com/?q=Plaza+Mexicana+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Mappa</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Sconto per Ospiti dei Tour</div>
            <div class="coupon-row"><div class="coupon-code">ATV-PLAZA10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-PLAZA10')">Copia</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Plaza Mexicana','ATV-PLAZA10','10% di Sconto sul Suo Ordine')">📱 Mostra al Cameriere</button>
            <p class="coupon-note">Valido con conferma di prenotazione Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- Mi Hacienda -->
      <div class="restaurant-card" data-category="mexican">
        <div class="card-image" style="background-image:url('/images/103a.webp')"><span class="cuisine-badge">Messicana</span><span class="discount-tag">🎟️ 15% di Sconto</span></div>
        <div class="card-body">
          <h3>Mi Hacienda</h3>
          <p class="card-address">📍 2075 US-40, Suite A, Vernal, UT 84078 (Towne Center)</p>
          <p class="card-description">Uno dei ristoranti più frequentati della città, senza dubbio. Ottimi tacos, enchiladas sempre riuscite, e i margarita sono esattamente ciò che serve dopo un pomeriggio polveroso sui sentieri.</p>
          <div class="card-actions">
            <a href="tel:+14357810099" class="card-action-btn action-call">📞 (435) 781-0099</a>
            <a href="https://maps.google.com/?q=Mi+Hacienda+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Mappa</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Sconto per Ospiti dei Tour</div>
            <div class="coupon-row"><div class="coupon-code">ATV-MIH15</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-MIH15')">Copia</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Mi Hacienda','ATV-MIH15','15% di Sconto sul Suo Ordine')">📱 Mostra al Cameriere</button>
            <p class="coupon-note">Valido con conferma di prenotazione Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- Canton Canyon City -->
      <div class="restaurant-card" data-category="mexican">
        <div class="card-image" style="background-image:url('/images/104a.png')"><span class="cuisine-badge">Cinese</span><span class="discount-tag">🎟️ 10% di Sconto</span></div>
        <div class="card-body">
          <h3>Canton Canyon City Chinese Restaurant</h3>
          <p class="card-address">📍 1175 W Hwy 40, Vernal, UT 84078</p>
          <p class="card-description">Un'opzione affidabile per la cucina cinese con porzioni generose. Quando desidera una pausa da hamburger e bistecche, Canton non delude. Menu adatto a tutta la famiglia.</p>
          <div class="card-actions">
            <a href="tel:+14357891388" class="card-action-btn action-call">📞 Chiami</a>
            <a href="https://maps.google.com/?q=Canton+Canyon+City+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Mappa</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Sconto per Ospiti dei Tour</div>
            <div class="coupon-row"><div class="coupon-code">ATV-CANTON10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-CANTON10')">Copia</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Canton Canyon City','ATV-CANTON10','10% di Sconto sul Suo Ordine')">📱 Mostra al Cameriere</button>
            <p class="coupon-note">Valido con conferma di prenotazione Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- La Cabaña -->
      <div class="restaurant-card" data-category="mexican">
        <div class="card-image" style="background-image:url('/images/98a.webp')"><span class="cuisine-badge">Messicana</span><span class="discount-tag">🎟️ 10% di Sconto</span></div>
        <div class="card-body">
          <h3>La Cabaña</h3>
          <p class="card-address">📍 120 E Main St, Vernal, UT 84078</p>
          <p class="card-description">Autentica cucina messicana proprio in centro — fajitas sfrigolanti, enchiladas fatte a mano, e tacos in stile di strada. Un locale storico amato dai locali per un pasto abbondante dopo il giro.</p>
          <div class="card-actions">
            <a href="tel:+14357893151" class="card-action-btn action-call">📞 Chiami</a>
            <a href="https://maps.google.com/?q=La+Cabana+Restaurant+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Mappa</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Sconto per Ospiti dei Tour</div>
            <div class="coupon-row"><div class="coupon-code">ATV-CABANA10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-CABANA10')">Copia</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('La Cabaña','ATV-CABANA10','10% di Sconto sul Suo Ordine')">📱 Mostra al Cameriere</button>
            <p class="coupon-note">Valido con conferma di prenotazione Adventure Tours</p>
          </div>
        </div>
      </div>

    </div>

    <!-- Tips -->
    <section>
      <div class="section-header"><h2 class="section-title">Consigli per Mangiare a Vernal</h2><p class="section-subtitle">Alcune cose da sapere prima di uscire per un pasto.</p></div>
      <div class="rest-tips-grid">
        <div class="rest-tip-card"><div class="rest-tip-icon">⏰</div><h3>Pianifichi in Base agli Orari del Tour</h3><p>I nostri <a href="/it/utv/" style="color:var(--burnt-orange);font-weight:600">tour in UTV</a> durano circa tre ore. Chi parte al mattino ha fame nel primo pomeriggio. Tour serale? Vada direttamente da Swain's o Plaza Mexicana.</p></div>
        <div class="rest-tip-card"><div class="rest-tip-icon">📅</div><h3>I Weekend Sono Affollati</h3><p>I locali più richiesti si riempiono il venerdì e il sabato sera — specialmente d'estate. Ha un gruppo? Chiami in anticipo per prenotare un tavolo da Swain's o al 7-11 Ranch.</p></div>
        <div class="rest-tip-card"><div class="rest-tip-icon">💵</div><h3>I Contanti Sono Sempre Utili</h3><p>La maggior parte dei ristoranti accetta carte, ma alcuni piccoli caffè preferiscono i contanti. Tenga con sé un po' di contanti quando visita lo Utah rurale.</p></div>
        <div class="rest-tip-card"><div class="rest-tip-icon">🦕</div><h3>Diretti al Monumento?</h3><p>Faccia un pasto in centro, su Main Street, prima del tragitto verso est fino a <a href="https://www.nps.gov/dino" target="_blank" rel="noopener" style="color:var(--burnt-orange);font-weight:600">Dinosaur National Monument</a>. La Cabaña e Plaza Mexicana sono soste rapide e abbondanti lungo il percorso.</p></div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="article-faq" style="background:white;border-radius:25px;padding:50px 45px;box-shadow:0 20px 60px rgba(0,0,0,0.08);border:1px solid rgba(212,118,78,0.1);margin-bottom:50px">
      <h2 style="font-family:var(--font-heading);font-size:1.6rem;font-weight:700;color:var(--charcoal);text-align:center;margin-bottom:30px;border:none;padding:0">Domande Frequenti</h2>
      <div class="faq-item"><h3>Quali sono i migliori ristoranti a Vernal, Utah?</h3><p>Tra le scelte migliori ci sono 4 Brothers Pizza per un pasto informale, Betty's Café per la colazione, Swain's Steakhouse per una cena al tavolo, e Plaza Mexicana per autentica cucina messicana. Gli ospiti dei tour ricevono codici sconto esclusivi in ciascuno di questi locali.</p></div>
      <div class="faq-item"><h3>Ci sono ristoranti vicino a Dinosaur National Monument?</h3><p>Sì — Vernal è la città d'accesso e tutti i ristoranti di questa pagina si trovano a breve distanza in auto dal monumento. Locali del centro come La Cabaña e Plaza Mexicana su Main Street sono una sosta comoda lungo il percorso verso est fino al Quarry Visitor Center.</p></div>
      <div class="faq-item"><h3>Come uso i codici sconto gastronomici di Adventure Tours?</h3><p>Ogni scheda ristorante ha un codice coupon univoco. Tocchi "Mostra al Cameriere" per visualizzare un coupon a schermo intero sul Suo telefono, oppure menzioni il codice al momento dell'ordine. Valido con una prenotazione confermata di Adventure Tours.</p></div>
      <div class="faq-item"><h3>Dove dovrei mangiare dopo un tour in UTV?</h3><p>Dopo un tour di tre ore, la maggior parte degli ospiti desidera qualcosa di sostanzioso. 4 Brothers Pizza, Country Grub e 7-11 Ranch sono scelte popolari dopo il giro, con porzioni generose.</p></div>
      <div class="faq-item"><h3>C'è cucina raffinata a Vernal?</h3><p>L'offerta di Vernal è più informale, ma Swain's Steakhouse e Red Canyon Lodge vicino a Flaming Gorge offrono esperienze al tavolo più raffinate che meritano la visita.</p></div>
    </section>

    <!-- CTA -->
    <div class="article-cta" style="border-radius:25px">
      <h3>Pronto a Esplorare Vernal?</h3>
      <p>Prenoti un tour guidato in UTV tra antichi petroglifi, canyon di roccia rossa e sentieri del deserto — poi sblocchi sconti gastronomici esclusivi in ogni ristorante di questa pagina.</p>
      <a href="/it/booking/" class="cta-btn">Prenoti il Suo Tour</a>
      <a href="tel:+14352199447" class="cta-phone">📞 (435) 219-9447</a>
    </div>

    <!-- Related -->
    <div class="related-articles">
      <h3>Altre Guide di Viaggio a Vernal</h3>
      <div class="related-grid">
        <a href="/it/utv/best-utv-trails-vernal/" class="related-card"><h4>Migliori Sentieri UTV Vicino a Vernal</h4><p>I migliori sentieri fuoristrada nell'Uintah Basin — da principiante a esperto.</p></a>
        <a href="/it/guides/vernal-weather-guide/" class="related-card"><h4>Guida al Clima di Vernal</h4><p>Pianifichi le attività all'aperto in base al clima stagionale di Vernal.</p></a>
        <a href="/it/guides/what-to-wear-utv-tour/" class="related-card"><h4>Cosa Indossare per un Tour in UTV</h4><p>Abbigliamento a strati, protezione solare e calzature per i tour nel deserto.</p></a>
        <a href="/it/dinosaur-national-monument/petroglyphs-rock-art-vernal/" class="related-card"><h4>Petroglifi e Arte Rupestre</h4><p>Antica arte rupestre Fremont e Ute nei nostri tour guidati.</p></a>
      </div>
    </div>
  </main>

  <script is:inline>
    document.querySelectorAll('.filter-btn').forEach(function(btn){btn.addEventListener('click',function(){document.querySelectorAll('.filter-btn').forEach(function(b){b.classList.remove('active')});btn.classList.add('active');var f=btn.dataset.filter;document.querySelectorAll('.restaurant-card').forEach(function(c){if(f==='all'||c.dataset.category===f){c.classList.remove('hidden');c.style.animation='fadeInUp 0.4s ease forwards'}else{c.classList.add('hidden')}})})});
    function copyCoupon(btn,code){navigator.clipboard?navigator.clipboard.writeText(code).then(function(){btn.textContent='✓ Copiato!';btn.classList.add('copied');setTimeout(function(){btn.textContent='Copia';btn.classList.remove('copied')},2000)}):function(){var e=document.createElement('textarea');e.value=code;document.body.appendChild(e);e.select();document.execCommand('copy');document.body.removeChild(e);btn.textContent='✓ Copiato!';btn.classList.add('copied');setTimeout(function(){btn.textContent='Copia';btn.classList.remove('copied')},2000)}()}
    function showCouponModal(r,c,d){document.getElementById('modalRestaurant').textContent=r;document.getElementById('modalCode').textContent=c;document.getElementById('modalDiscount').textContent=d;document.getElementById('couponModal').classList.add('visible');document.body.style.overflow='hidden'}
    document.getElementById('couponModalClose').addEventListener('click',function(){document.getElementById('couponModal').classList.remove('visible');document.body.style.overflow=''});
    document.getElementById('couponModal').addEventListener('click',function(e){if(e.target===e.currentTarget){document.getElementById('couponModal').classList.remove('visible');document.body.style.overflow=''}});
  </script>
`;

const FR = `

  <!-- Coupon Modal -->
  <div class="coupon-modal-overlay" id="couponModal"><div class="coupon-modal">
    <button class="coupon-modal-close" id="couponModalClose">&times;</button>
    <div class="coupon-modal-icon">🎟️</div>
    <h2>Réduction Adventure Tours</h2>
    <p class="modal-restaurant" id="modalRestaurant"></p>
    <div class="modal-code-box"><div class="modal-code" id="modalCode"></div><div class="modal-discount" id="modalDiscount"></div></div>
    <p class="modal-instructions">Montrez cet écran à votre serveur pour bénéficier de votre réduction. Valable pour les clients d'Adventure Tours Vernal avec une réservation confirmée.</p>
    <div class="modal-branding"><img src="/images/logo.webp" alt="Adventure Tours Vernal" height="40"><span>adventuretoursvernal.com</span></div>
  </div></div>

  <main class="restaurant-page">
    <!-- Hero -->
    <div class="dining-hero"><div class="dining-hero-bg"></div><div class="dining-hero-overlay"></div>
      <div class="dining-hero-content">
        <nav aria-label="Fil d'Ariane"><a href="/fr/">Accueil</a><span>›</span><span style="color:rgba(255,255,255,0.9)">Meilleurs Restaurants à Vernal</span></nav>
        <h1>Mangez Comme un Local à Vernal, Utah</h1>
        <p>Nos clients nous demandent chaque semaine : <em>"Où devrions-nous manger ?"</em> Après des années passées ici, voici nos recommandations honnêtes — et <strong>vous recevrez des réductions exclusives</strong> dans chacun d'eux simplement en réservant un tour.</p>
      </div>
    </div>

    <!-- Discount Banner -->
    <div class="discount-banner">
      <div class="discount-banner-icon">🎟️</div>
      <div class="discount-banner-text">
        <h2>Réductions Exclusives pour les Clients des Tours</h2>
        <p>Réservez un <a href="/fr/booking/" style="color:var(--desert-gold);font-weight:700">tour en UTV avec Adventure Tours Vernal</a> et débloquez des <strong>codes de réduction exclusifs</strong> dans les restaurants ci-dessous. Appuyez sur <strong>"Montrer au Serveur"</strong> sur n'importe quelle carte pour afficher un coupon plein écran sur votre téléphone.</p>
      </div>
    </div>

    <!-- Filters -->
    <div class="category-filters" id="categoryFilters">
      <button class="filter-btn active" data-filter="all">🍽️ Tous les Restaurants</button>
      <button class="filter-btn" data-filter="casual">🍕 Décontracté</button>
      <button class="filter-btn" data-filter="breakfast">☕ Petit-Déjeuner et Cafés</button>
      <button class="filter-btn" data-filter="steakhouse">🥩 Grillades</button>
      <button class="filter-btn" data-filter="mexican">🌮 Mexicaine et Internationale</button>
    </div>

    <!-- Restaurant Grid -->
    <div class="restaurant-grid" id="restaurantGrid">

      <!-- 4 Brothers Pizza -->
      <div class="restaurant-card" data-category="casual">
        <div class="card-image" style="background-image:url('/images/102.webp')"><span class="cuisine-badge">Pizza</span><span class="discount-tag">🎟️ 10% de Réduction</span></div>
        <div class="card-body">
          <h3>4 Brothers Pizza</h3>
          <p class="card-address">📍 1060 Market Dr. #5, Vernal, UT 84078</p>
          <p class="card-description">La pizzeria incontournable en ville — pâte solide, garnitures généreuses, et ça marche à chaque fois. Mangez sur place ou emportez une boîte pour le retour à l'hôtel.</p>
          <div class="card-actions">
            <a href="tel:+14357892222" class="card-action-btn action-call">📞 Appeler</a>
            <a href="https://maps.google.com/?q=4+Brothers+Pizza+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Carte</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Réduction pour Clients du Tour</div>
            <div class="coupon-row"><div class="coupon-code">ATV-PIZZA10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-PIZZA10')">Copier</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('4 Brothers Pizza','ATV-PIZZA10','10% de Réduction sur Votre Commande')">📱 Montrer au Serveur</button>
            <p class="coupon-note">Valable avec confirmation de réservation Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- Country Grub -->
      <div class="restaurant-card" data-category="casual">
        <div class="card-image" style="background-image:url('/images/103.webp')"><span class="cuisine-badge">Hamburgers</span><span class="discount-tag">🎟️ 10% de Réduction</span></div>
        <div class="card-body">
          <h3>Country Grub Hamburger Restaurant</h3>
          <p class="card-address">📍 2416 W 1500 E, Vernal, UT 84078</p>
          <p class="card-description">De vrais hamburgers américains bien préparés — steaks hachés bien assaisonnés, frites croustillantes, et le repas parfait après une journée en plein air.</p>
          <div class="card-actions">
            <a href="tel:+14357891414" class="card-action-btn action-call">📞 Appeler</a>
            <a href="https://maps.google.com/?q=Country+Grub+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Carte</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Réduction pour Clients du Tour</div>
            <div class="coupon-row"><div class="coupon-code">ATV-GRUB10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-GRUB10')">Copier</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Country Grub','ATV-GRUB10','10% de Réduction sur Votre Commande')">📱 Montrer au Serveur</button>
            <p class="coupon-note">Valable avec confirmation de réservation Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- Get Grilled -->
      <div class="restaurant-card" data-category="casual">
        <div class="card-image" style="background-image:url('/images/95a.webp')"><span class="cuisine-badge">Sandwichs</span><span class="discount-tag">🎟️ Boisson Gratuite</span></div>
        <div class="card-body">
          <h3>Get Grilled Sandwiches</h3>
          <p class="card-address">📍 1096 W Hwy 40, Vernal, UT 84078</p>
          <p class="card-description">Idéal pour un déjeuner rapide — sandwichs préparés sur place et service rapide juste en bordure de l'autoroute. Parfait en allant vers Dinosaur National Monument ou en en revenant.</p>
          <div class="card-actions">
            <a href="tel:+14357893900" class="card-action-btn action-call">📞 Appeler</a>
            <a href="https://maps.google.com/?q=Get+Grilled+Sandwiches+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Carte</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Réduction pour Clients du Tour</div>
            <div class="coupon-row"><div class="coupon-code">ATV-GRILL1</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-GRILL1')">Copier</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Get Grilled Sandwiches','ATV-GRILL1','Boisson Gratuite avec N\\'importe Quel Sandwich')">📱 Montrer au Serveur</button>
            <p class="coupon-note">Valable avec confirmation de réservation Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- Abby's Café -->
      <div class="restaurant-card" data-category="breakfast">
        <div class="card-image" style="background-image:url('/images/105.webp')"><span class="cuisine-badge">Petit-Déjeuner</span><span class="discount-tag">🎟️ 10% de Réduction</span></div>
        <div class="card-body">
          <h3>Abby's Café</h3>
          <p class="card-address">📍 73 W Main St., Vernal, UT 84078</p>
          <p class="card-description">Un favori local de longue date pour le petit-déjeuner et la cuisine réconfortante. Le genre d'endroit où la serveuse connaît la moitié de la salle par son prénom. Parfait avant un tour matinal.</p>
          <div class="card-actions">
            <a href="tel:+14357891366" class="card-action-btn action-call">📞 Appeler</a>
            <a href="https://maps.google.com/?q=Abbys+Cafe+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Carte</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Réduction pour Clients du Tour</div>
            <div class="coupon-row"><div class="coupon-code">ATV-ABBY10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-ABBY10')">Copier</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Abby\\'s Café','ATV-ABBY10','10% de Réduction sur le Petit-Déjeuner')">📱 Montrer au Serveur</button>
            <p class="coupon-note">Valable avec confirmation de réservation Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- Betty's Café -->
      <div class="restaurant-card" data-category="breakfast">
        <div class="card-image" style="background-image:url('/images/97a.webp')"><span class="cuisine-badge">Café</span><span class="discount-tag">🎟️ Café Gratuit</span></div>
        <div class="card-body">
          <h3>Betty's Café</h3>
          <p class="card-address">📍 416 W Main St., Vernal, UT 84078</p>
          <p class="card-description">Ambiance de café à l'ancienne, repas copieux et service amical. Betty's nourrit Vernal depuis des années, et les portions n'ont pas rétréci.</p>
          <div class="card-actions">
            <a href="tel:+14357810827" class="card-action-btn action-call">📞 Appeler</a>
            <a href="https://maps.google.com/?q=Bettys+Cafe+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Carte</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Réduction pour Clients du Tour</div>
            <div class="coupon-row"><div class="coupon-code">ATV-BETTY1</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-BETTY1')">Copier</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Betty\\'s Café','ATV-BETTY1','Café Gratuit avec N\\'importe Quel Repas')">📱 Montrer au Serveur</button>
            <p class="coupon-note">Valable avec confirmation de réservation Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- Swain's Steakhouse -->
      <div class="restaurant-card" data-category="steakhouse">
        <div class="card-image" style="background-image:url('/images/99a.webp')"><span class="cuisine-badge">Steakhouse</span><span class="discount-tag">🎟️ 15% de Réduction</span></div>
        <div class="card-body">
          <h3>Swain's Steakhouse</h3>
          <p class="card-address">📍 29 S Vernal Ave., Vernal, UT 84078</p>
          <p class="card-description">Ce qui se rapproche le plus de la gastronomie à Vernal — et c'est très bon. Si vous ne devez faire qu'un seul repas assis en ville, que ce soit celui-ci. Les steaks sont cuits à la perfection.</p>
          <div class="card-actions">
            <a href="tel:+14357892671" class="card-action-btn action-call">📞 Appeler</a>
            <a href="https://maps.google.com/?q=Swains+Steakhouse+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Carte</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Réduction pour Clients du Tour</div>
            <div class="coupon-row"><div class="coupon-code">ATV-STEAK15</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-STEAK15')">Copier</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Swain\\'s Steakhouse','ATV-STEAK15','15% de Réduction sur Votre Dîner')">📱 Montrer au Serveur</button>
            <p class="coupon-note">Valable avec confirmation de réservation Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- 7-11 Ranch -->
      <div class="restaurant-card" data-category="steakhouse">
        <div class="card-image" style="background-image:url('/images/100a.webp')"><span class="cuisine-badge">Western</span><span class="discount-tag">🎟️ 10% de Réduction</span></div>
        <div class="card-body">
          <h3>7-11 Ranch Restaurant</h3>
          <p class="card-address">📍 77 E Main St., Vernal, UT 84078</p>
          <p class="card-description">Charme rustique de l'Ouest, portions généreuses et une ambiance qui vous rappelle que vous êtes dans le véritable Far West rural. Idéal pour les familles.</p>
          <div class="card-actions">
            <a href="tel:+14357891170" class="card-action-btn action-call">📞 Appeler</a>
            <a href="https://maps.google.com/?q=7-11+Ranch+Restaurant+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Carte</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Réduction pour Clients du Tour</div>
            <div class="coupon-row"><div class="coupon-code">ATV-RANCH10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-RANCH10')">Copier</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('7-11 Ranch Restaurant','ATV-RANCH10','10% de Réduction sur Votre Commande')">📱 Montrer au Serveur</button>
            <p class="coupon-note">Valable avec confirmation de réservation Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- Red Canyon Lodge -->
      <div class="restaurant-card" data-category="steakhouse">
        <div class="card-image" style="background-image:url('/images/101a.webp')"><span class="cuisine-badge">Cuisine de Lodge</span><span class="discount-tag">🎟️ 10% de Réduction</span></div>
        <div class="card-body">
          <h3>Red Canyon Lodge</h3>
          <p class="card-address">📍 2450 Red Canyon Rd, Dutch John, UT 84023</p>
          <p class="card-description">Environ une heure au nord vers Flaming Gorge — mais le paysage à lui seul justifie le déplacement. Une excellente cuisine dans un cadre magnifique de lodge de montagne.</p>
          <div class="card-actions">
            <a href="tel:+14358892090" class="card-action-btn action-call">📞 Appeler</a>
            <a href="https://www.redcanyonlodge.com" target="_blank" rel="noopener" class="card-action-btn action-website">🌐 Site Web</a>
            <a href="https://maps.google.com/?q=Red+Canyon+Lodge+Dutch+John+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Carte</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Réduction pour Clients du Tour</div>
            <div class="coupon-row"><div class="coupon-code">ATV-CANYON10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-CANYON10')">Copier</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Red Canyon Lodge','ATV-CANYON10','10% de Réduction sur le Repas')">📱 Montrer au Serveur</button>
            <p class="coupon-note">Valable avec confirmation de réservation Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- Plaza Mexicana -->
      <div class="restaurant-card" data-category="mexican">
        <div class="card-image" style="background-image:url('/images/102a.webp')"><span class="cuisine-badge">Mexicaine</span><span class="discount-tag">🎟️ 10% de Réduction</span></div>
        <div class="card-body">
          <h3>Plaza Mexicana</h3>
          <p class="card-address">📍 55 E Main St., Vernal, UT 84078</p>
          <p class="card-description">Saveurs authentiques, ambiance chaleureuse, et le genre de restaurant où les familles reviennent à chaque visite à Vernal. Les enchiladas et le chile verde sont les incontournables.</p>
          <div class="card-actions">
            <a href="tel:+14357893340" class="card-action-btn action-call">📞 Appeler</a>
            <a href="https://maps.google.com/?q=Plaza+Mexicana+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Carte</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Réduction pour Clients du Tour</div>
            <div class="coupon-row"><div class="coupon-code">ATV-PLAZA10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-PLAZA10')">Copier</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Plaza Mexicana','ATV-PLAZA10','10% de Réduction sur Votre Commande')">📱 Montrer au Serveur</button>
            <p class="coupon-note">Valable avec confirmation de réservation Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- Mi Hacienda -->
      <div class="restaurant-card" data-category="mexican">
        <div class="card-image" style="background-image:url('/images/103a.webp')"><span class="cuisine-badge">Mexicaine</span><span class="discount-tag">🎟️ 15% de Réduction</span></div>
        <div class="card-body">
          <h3>Mi Hacienda</h3>
          <p class="card-address">📍 2075 US-40, Suite A, Vernal, UT 84078 (Towne Center)</p>
          <p class="card-description">L'un des restaurants les plus populaires de la ville, tout simplement. D'excellents tacos, des enchiladas savoureuses, et les margaritas sont exactement ce qu'il vous faut après un après-midi poussiéreux sur les pistes.</p>
          <div class="card-actions">
            <a href="tel:+14357810099" class="card-action-btn action-call">📞 (435) 781-0099</a>
            <a href="https://maps.google.com/?q=Mi+Hacienda+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Carte</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Réduction pour Clients du Tour</div>
            <div class="coupon-row"><div class="coupon-code">ATV-MIH15</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-MIH15')">Copier</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Mi Hacienda','ATV-MIH15','15% de Réduction sur Votre Commande')">📱 Montrer au Serveur</button>
            <p class="coupon-note">Valable avec confirmation de réservation Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- Canton Canyon City -->
      <div class="restaurant-card" data-category="mexican">
        <div class="card-image" style="background-image:url('/images/104a.png')"><span class="cuisine-badge">Chinoise</span><span class="discount-tag">🎟️ 10% de Réduction</span></div>
        <div class="card-body">
          <h3>Canton Canyon City Chinese Restaurant</h3>
          <p class="card-address">📍 1175 W Hwy 40, Vernal, UT 84078</p>
          <p class="card-description">Une valeur sûre pour la cuisine chinoise avec des portions généreuses. Quand vous voulez une pause des hamburgers et des steaks, Canton répond présent. Menu adapté aux familles.</p>
          <div class="card-actions">
            <a href="tel:+14357891388" class="card-action-btn action-call">📞 Appeler</a>
            <a href="https://maps.google.com/?q=Canton+Canyon+City+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Carte</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Réduction pour Clients du Tour</div>
            <div class="coupon-row"><div class="coupon-code">ATV-CANTON10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-CANTON10')">Copier</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Canton Canyon City','ATV-CANTON10','10% de Réduction sur Votre Commande')">📱 Montrer au Serveur</button>
            <p class="coupon-note">Valable avec confirmation de réservation Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- La Cabaña -->
      <div class="restaurant-card" data-category="mexican">
        <div class="card-image" style="background-image:url('/images/98a.webp')"><span class="cuisine-badge">Mexicaine</span><span class="discount-tag">🎟️ 10% de Réduction</span></div>
        <div class="card-body">
          <h3>La Cabaña</h3>
          <p class="card-address">📍 120 E Main St, Vernal, UT 84078</p>
          <p class="card-description">Cuisine mexicaine authentique en plein centre-ville — fajitas grésillantes, enchiladas roulées à la main, et tacos de rue. Un favori local de longue date pour un repas copieux après le tour.</p>
          <div class="card-actions">
            <a href="tel:+14357893151" class="card-action-btn action-call">📞 Appeler</a>
            <a href="https://maps.google.com/?q=La+Cabana+Restaurant+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Carte</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Réduction pour Clients du Tour</div>
            <div class="coupon-row"><div class="coupon-code">ATV-CABANA10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-CABANA10')">Copier</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('La Cabaña','ATV-CABANA10','10% de Réduction sur Votre Commande')">📱 Montrer au Serveur</button>
            <p class="coupon-note">Valable avec confirmation de réservation Adventure Tours</p>
          </div>
        </div>
      </div>

    </div>

    <!-- Tips -->
    <section>
      <div class="section-header"><h2 class="section-title">Conseils pour Manger à Vernal</h2><p class="section-subtitle">Quelques choses à savoir avant de sortir manger.</p></div>
      <div class="rest-tips-grid">
        <div class="rest-tip-card"><div class="rest-tip-icon">⏰</div><h3>Planifiez Selon les Horaires du Tour</h3><p>Nos <a href="/fr/utv/" style="color:var(--burnt-orange);font-weight:600">tours en UTV</a> durent environ trois heures. Ceux qui partent le matin ont faim en début d'après-midi. Tour en soirée ? Allez directement chez Swain's ou Plaza Mexicana.</p></div>
        <div class="rest-tip-card"><div class="rest-tip-icon">📅</div><h3>Les Week-ends Sont Chargés</h3><p>Les endroits populaires se remplissent les vendredis et samedis soirs — surtout en été. Vous avez un groupe ? Appelez à l'avance pour réserver une table chez Swain's ou 7-11 Ranch.</p></div>
        <div class="rest-tip-card"><div class="rest-tip-icon">💵</div><h3>L'Argent Liquide Fonctionne Toujours</h3><p>La plupart des restaurants acceptent les cartes, mais quelques petits cafés apprécient l'argent liquide. Gardez-en sur vous lors de votre visite dans l'Utah rural.</p></div>
        <div class="rest-tip-card"><div class="rest-tip-icon">🦕</div><h3>Vous Allez au Monument ?</h3><p>Prenez un repas dans le centre-ville, sur Main Street, avant de prendre la route vers l'est jusqu'à <a href="https://www.nps.gov/dino" target="_blank" rel="noopener" style="color:var(--burnt-orange);font-weight:600">Dinosaur National Monument</a>. La Cabaña et Plaza Mexicana sont des arrêts rapides et copieux sur le chemin.</p></div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="article-faq" style="background:white;border-radius:25px;padding:50px 45px;box-shadow:0 20px 60px rgba(0,0,0,0.08);border:1px solid rgba(212,118,78,0.1);margin-bottom:50px">
      <h2 style="font-family:var(--font-heading);font-size:1.6rem;font-weight:700;color:var(--charcoal);text-align:center;margin-bottom:30px;border:none;padding:0">Questions Fréquentes</h2>
      <div class="faq-item"><h3>Quels sont les meilleurs restaurants à Vernal, Utah ?</h3><p>Parmi les meilleurs choix : 4 Brothers Pizza pour un repas décontracté, Betty's Café pour le petit-déjeuner, Swain's Steakhouse pour un dîner assis, et Plaza Mexicana pour une cuisine mexicaine authentique. Les clients des tours reçoivent des codes de réduction exclusifs dans chacun d'eux.</p></div>
      <div class="faq-item"><h3>Y a-t-il des restaurants près de Dinosaur National Monument ?</h3><p>Oui — Vernal est la ville d'entrée et tous les restaurants de cette page se trouvent à courte distance en voiture du monument. Les adresses du centre-ville comme La Cabaña et Plaza Mexicana sur Main Street constituent un arrêt facile en allant vers l'est en direction du Quarry Visitor Center.</p></div>
      <div class="faq-item"><h3>Comment utiliser les codes de réduction restauration d'Adventure Tours ?</h3><p>Chaque carte de restaurant possède un code de réduction unique. Appuyez sur "Montrer au Serveur" pour afficher un coupon plein écran sur votre téléphone, ou mentionnez le code lors de votre commande. Valable avec une réservation Adventure Tours confirmée.</p></div>
      <div class="faq-item"><h3>Où manger après un tour en UTV ?</h3><p>Après un tour de trois heures, la plupart des clients veulent quelque chose de copieux. 4 Brothers Pizza, Country Grub et 7-11 Ranch sont des choix populaires après le tour, avec des portions généreuses.</p></div>
      <div class="faq-item"><h3>Y a-t-il de la gastronomie à Vernal ?</h3><p>L'offre de Vernal est plutôt décontractée, mais Swain's Steakhouse et Red Canyon Lodge près de Flaming Gorge proposent des expériences assises plus raffinées qui valent le déplacement.</p></div>
    </section>

    <!-- CTA -->
    <div class="article-cta" style="border-radius:25px">
      <h3>Prêt à Explorer Vernal ?</h3>
      <p>Réservez un tour guidé en UTV à travers d'anciens pétroglyphes, des canyons de roche rouge et des pistes désertiques — puis débloquez des réductions exclusives dans chaque restaurant de cette page.</p>
      <a href="/fr/booking/" class="cta-btn">Réservez Votre Tour</a>
      <a href="tel:+14352199447" class="cta-phone">📞 (435) 219-9447</a>
    </div>

    <!-- Related -->
    <div class="related-articles">
      <h3>Plus de Guides de Voyage à Vernal</h3>
      <div class="related-grid">
        <a href="/fr/utv/best-utv-trails-vernal/" class="related-card"><h4>Meilleurs Sentiers UTV Près de Vernal</h4><p>Les meilleures pistes tout-terrain du bassin de l'Uintah — du débutant à l'expert.</p></a>
        <a href="/fr/guides/vernal-weather-guide/" class="related-card"><h4>Guide Météo de Vernal</h4><p>Planifiez vos activités de plein air selon la météo saisonnière de Vernal.</p></a>
        <a href="/fr/guides/what-to-wear-utv-tour/" class="related-card"><h4>Que Porter pour un Tour en UTV</h4><p>Superposition de vêtements, protection solaire et chaussures pour les tours dans le désert.</p></a>
        <a href="/fr/dinosaur-national-monument/petroglyphs-rock-art-vernal/" class="related-card"><h4>Pétroglyphes et Art Rupestre</h4><p>Art rupestre ancien Fremont et Ute sur nos tours guidés.</p></a>
      </div>
    </div>
  </main>

  <script is:inline>
    document.querySelectorAll('.filter-btn').forEach(function(btn){btn.addEventListener('click',function(){document.querySelectorAll('.filter-btn').forEach(function(b){b.classList.remove('active')});btn.classList.add('active');var f=btn.dataset.filter;document.querySelectorAll('.restaurant-card').forEach(function(c){if(f==='all'||c.dataset.category===f){c.classList.remove('hidden');c.style.animation='fadeInUp 0.4s ease forwards'}else{c.classList.add('hidden')}})})});
    function copyCoupon(btn,code){navigator.clipboard?navigator.clipboard.writeText(code).then(function(){btn.textContent='✓ Copié !';btn.classList.add('copied');setTimeout(function(){btn.textContent='Copier';btn.classList.remove('copied')},2000)}):function(){var e=document.createElement('textarea');e.value=code;document.body.appendChild(e);e.select();document.execCommand('copy');document.body.removeChild(e);btn.textContent='✓ Copié !';btn.classList.add('copied');setTimeout(function(){btn.textContent='Copier';btn.classList.remove('copied')},2000)}()}
    function showCouponModal(r,c,d){document.getElementById('modalRestaurant').textContent=r;document.getElementById('modalCode').textContent=c;document.getElementById('modalDiscount').textContent=d;document.getElementById('couponModal').classList.add('visible');document.body.style.overflow='hidden'}
    document.getElementById('couponModalClose').addEventListener('click',function(){document.getElementById('couponModal').classList.remove('visible');document.body.style.overflow=''});
    document.getElementById('couponModal').addEventListener('click',function(e){if(e.target===e.currentTarget){document.getElementById('couponModal').classList.remove('visible');document.body.style.overflow=''}});
  </script>
`;

/**
 * Locale-aware accessor (P2D pattern; Spanish populated P3D). Every
 * locale without a committed variant falls back to English. Callers that
 * don't need locale awareness keep importing `bodyHtml` directly.
 */
export function getBodyHtml(locale: string = DEFAULT_LOCALE): string {
  if (locale === 'es') return ES;
  if (locale === 'it') return IT;
  if (locale === 'fr') return FR;
  return bodyHtml;
}
