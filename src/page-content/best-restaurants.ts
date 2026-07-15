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

/**
 * Locale-aware accessor (P2D pattern; Spanish populated P3D). Every
 * locale without a committed variant falls back to English. Callers that
 * don't need locale awareness keep importing `bodyHtml` directly.
 */
export function getBodyHtml(locale: string = DEFAULT_LOCALE): string {
  if (locale === 'es') return ES;
  return bodyHtml;
}
