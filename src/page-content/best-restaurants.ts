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
        <a href="/es/utv/best-utv-trails-vernal/" class="related-card"><h4>Mejores Senderos para UTV Cerca de Vernal</h4><p>Los mejores senderos todoterreno de la Cuenca de Uintah — de principiante a experto.</p></a>
        <a href="/es/guides/vernal-weather-guide/" class="related-card"><h4>Guía del Clima de Vernal</h4><p>Planifique actividades al aire libre según el clima estacional de Vernal.</p></a>
        <a href="/es/guides/what-to-wear-utv-tour/" class="related-card"><h4>Qué Ponerse en un Tour en UTV</h4><p>Capas de ropa, protección solar y calzado para tours en el desierto.</p></a>
        <a href="/es/dinosaur-national-monument/petroglyphs-rock-art-vernal/" class="related-card"><h4>Petroglifos y Arte Rupestre</h4><p>Antiguo arte rupestre Fremont y Ute en nuestros tours guiados.</p></a>
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

const PT = `

  <!-- Coupon Modal -->
  <div class="coupon-modal-overlay" id="couponModal"><div class="coupon-modal">
    <button class="coupon-modal-close" id="couponModalClose">&times;</button>
    <div class="coupon-modal-icon">🎟️</div>
    <h2>Desconto da Adventure Tours</h2>
    <p class="modal-restaurant" id="modalRestaurant"></p>
    <div class="modal-code-box"><div class="modal-code" id="modalCode"></div><div class="modal-discount" id="modalDiscount"></div></div>
    <p class="modal-instructions">Mostra este ecrã ao teu empregado de mesa para resgatares o teu desconto. Válido para hóspedes da Adventure Tours Vernal com reserva confirmada.</p>
    <div class="modal-branding"><img src="/images/logo.webp" alt="Adventure Tours Vernal" height="40"><span>adventuretoursvernal.com</span></div>
  </div></div>

  <main class="restaurant-page">
    <!-- Hero -->
    <div class="dining-hero"><div class="dining-hero-bg"></div><div class="dining-hero-overlay"></div>
      <div class="dining-hero-content">
        <nav aria-label="Navegação estrutural"><a href="/pt/">Início</a><span>›</span><span style="color:rgba(255,255,255,0.9)">Melhores Restaurantes em Vernal</span></nav>
        <h1>Come Como um Local em Vernal, Utah</h1>
        <p>Os nossos hóspedes perguntam-nos todas as semanas: <em>"Onde devemos comer?"</em> Depois de anos a viver aqui, estas são as nossas escolhas honestas — e <strong>vais receber descontos exclusivos</strong> em cada um deles só por reservares um tour.</p>
      </div>
    </div>

    <!-- Discount Banner -->
    <div class="discount-banner">
      <div class="discount-banner-icon">🎟️</div>
      <div class="discount-banner-text">
        <h2>Descontos Gastronómicos Exclusivos para Hóspedes de Tours</h2>
        <p>Reserva um <a href="/pt/booking/" style="color:var(--desert-gold);font-weight:700">tour em UTV com a Adventure Tours Vernal</a> e desbloqueia <strong>códigos de desconto exclusivos</strong> nos restaurantes abaixo. Toca em <strong>"Mostrar ao Empregado"</strong> em qualquer cartão para abrires um cupão em ecrã inteiro no teu telemóvel.</p>
      </div>
    </div>

    <!-- Filters -->
    <div class="category-filters" id="categoryFilters">
      <button class="filter-btn active" data-filter="all">🍽️ Todos os Restaurantes</button>
      <button class="filter-btn" data-filter="casual">🍕 Informal</button>
      <button class="filter-btn" data-filter="breakfast">☕ Pequeno-Almoço e Tascas</button>
      <button class="filter-btn" data-filter="steakhouse">🥩 Grelhados</button>
      <button class="filter-btn" data-filter="mexican">🌮 Mexicana e Internacional</button>
    </div>

    <!-- Restaurant Grid -->
    <div class="restaurant-grid" id="restaurantGrid">

      <!-- 4 Brothers Pizza -->
      <div class="restaurant-card" data-category="casual">
        <div class="card-image" style="background-image:url('/images/102.webp')"><span class="cuisine-badge">Pizza</span><span class="discount-tag">🎟️ 10% de Desconto</span></div>
        <div class="card-body">
          <h3>4 Brothers Pizza</h3>
          <p class="card-address">📍 1060 Market Dr. #5, Vernal, UT 84078</p>
          <p class="card-description">A pizzaria de referência na cidade — massa consistente, coberturas generosas, e nunca falha. Come no local ou leva uma caixa a caminho do hotel.</p>
          <div class="card-actions">
            <a href="tel:+14357892222" class="card-action-btn action-call">📞 Ligar</a>
            <a href="https://maps.google.com/?q=4+Brothers+Pizza+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Mapa</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Desconto para Hóspedes de Tours</div>
            <div class="coupon-row"><div class="coupon-code">ATV-PIZZA10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-PIZZA10')">Copiar</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('4 Brothers Pizza','ATV-PIZZA10','10% de Desconto no Teu Pedido')">📱 Mostrar ao Empregado</button>
            <p class="coupon-note">Válido com confirmação de reserva da Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- Country Grub -->
      <div class="restaurant-card" data-category="casual">
        <div class="card-image" style="background-image:url('/images/103.webp')"><span class="cuisine-badge">Hambúrgueres</span><span class="discount-tag">🎟️ 10% de Desconto</span></div>
        <div class="card-body">
          <h3>Country Grub Hamburger Restaurant</h3>
          <p class="card-address">📍 2416 W 1500 E, Vernal, UT 84078</p>
          <p class="card-description">Hambúrgueres clássicos americanos como deve ser — carne bem temperada, batatas fritas estaladiças, e a refeição perfeita depois de um dia ao ar livre.</p>
          <div class="card-actions">
            <a href="tel:+14357891414" class="card-action-btn action-call">📞 Ligar</a>
            <a href="https://maps.google.com/?q=Country+Grub+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Mapa</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Desconto para Hóspedes de Tours</div>
            <div class="coupon-row"><div class="coupon-code">ATV-GRUB10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-GRUB10')">Copiar</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Country Grub','ATV-GRUB10','10% de Desconto no Teu Pedido')">📱 Mostrar ao Empregado</button>
            <p class="coupon-note">Válido com confirmação de reserva da Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- Get Grilled -->
      <div class="restaurant-card" data-category="casual">
        <div class="card-image" style="background-image:url('/images/95a.webp')"><span class="cuisine-badge">Sandes</span><span class="discount-tag">🎟️ Bebida Grátis</span></div>
        <div class="card-body">
          <h3>Get Grilled Sandwiches</h3>
          <p class="card-address">📍 1096 W Hwy 40, Vernal, UT 84078</p>
          <p class="card-description">Ótimo para um almoço rápido — sandes acabadas de fazer e serviço rápido mesmo junto à autoestrada. Perfeito a caminho de, ou a voltar de, Dinosaur National Monument.</p>
          <div class="card-actions">
            <a href="tel:+14357893900" class="card-action-btn action-call">📞 Ligar</a>
            <a href="https://maps.google.com/?q=Get+Grilled+Sandwiches+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Mapa</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Desconto para Hóspedes de Tours</div>
            <div class="coupon-row"><div class="coupon-code">ATV-GRILL1</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-GRILL1')">Copiar</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Get Grilled Sandwiches','ATV-GRILL1','Bebida Grátis com Qualquer Sandes')">📱 Mostrar ao Empregado</button>
            <p class="coupon-note">Válido com confirmação de reserva da Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- Abby's Café -->
      <div class="restaurant-card" data-category="breakfast">
        <div class="card-image" style="background-image:url('/images/105.webp')"><span class="cuisine-badge">Pequeno-Almoço</span><span class="discount-tag">🎟️ 10% de Desconto</span></div>
        <div class="card-body">
          <h3>Abby's Café</h3>
          <p class="card-address">📍 73 W Main St., Vernal, UT 84078</p>
          <p class="card-description">Um favorito local de longa data para o pequeno-almoço e comida reconfortante. O tipo de sítio onde a empregada conhece metade da sala pelo nome. Perfeito antes de um tour matinal.</p>
          <div class="card-actions">
            <a href="tel:+14357891366" class="card-action-btn action-call">📞 Ligar</a>
            <a href="https://maps.google.com/?q=Abbys+Cafe+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Mapa</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Desconto para Hóspedes de Tours</div>
            <div class="coupon-row"><div class="coupon-code">ATV-ABBY10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-ABBY10')">Copiar</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Abby\\'s Café','ATV-ABBY10','10% de Desconto no Pequeno-Almoço')">📱 Mostrar ao Empregado</button>
            <p class="coupon-note">Válido com confirmação de reserva da Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- Betty's Café -->
      <div class="restaurant-card" data-category="breakfast">
        <div class="card-image" style="background-image:url('/images/97a.webp')"><span class="cuisine-badge">Tasca</span><span class="discount-tag">🎟️ Café Grátis</span></div>
        <div class="card-body">
          <h3>Betty's Café</h3>
          <p class="card-address">📍 416 W Main St., Vernal, UT 84078</p>
          <p class="card-description">Ambiente de tasca à moda antiga, refeições substanciais e serviço simpático. O Betty's alimenta Vernal há anos, e as porções não têm diminuído.</p>
          <div class="card-actions">
            <a href="tel:+14357810827" class="card-action-btn action-call">📞 Ligar</a>
            <a href="https://maps.google.com/?q=Bettys+Cafe+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Mapa</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Desconto para Hóspedes de Tours</div>
            <div class="coupon-row"><div class="coupon-code">ATV-BETTY1</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-BETTY1')">Copiar</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Betty\\'s Café','ATV-BETTY1','Café Grátis com Qualquer Refeição')">📱 Mostrar ao Empregado</button>
            <p class="coupon-note">Válido com confirmação de reserva da Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- Swain's Steakhouse -->
      <div class="restaurant-card" data-category="steakhouse">
        <div class="card-image" style="background-image:url('/images/99a.webp')"><span class="cuisine-badge">Churrascaria</span><span class="discount-tag">🎟️ 15% de Desconto</span></div>
        <div class="card-body">
          <h3>Swain's Steakhouse</h3>
          <p class="card-address">📍 29 S Vernal Ave., Vernal, UT 84078</p>
          <p class="card-description">O que há de mais próximo de alta cozinha em Vernal — e é muito bom. Se só vais fazer uma refeição sentada na cidade, que seja esta. Os bifes são cozinhados como deve ser.</p>
          <div class="card-actions">
            <a href="tel:+14357892671" class="card-action-btn action-call">📞 Ligar</a>
            <a href="https://maps.google.com/?q=Swains+Steakhouse+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Mapa</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Desconto para Hóspedes de Tours</div>
            <div class="coupon-row"><div class="coupon-code">ATV-STEAK15</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-STEAK15')">Copiar</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Swain\\'s Steakhouse','ATV-STEAK15','15% de Desconto no Teu Jantar')">📱 Mostrar ao Empregado</button>
            <p class="coupon-note">Válido com confirmação de reserva da Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- 7-11 Ranch -->
      <div class="restaurant-card" data-category="steakhouse">
        <div class="card-image" style="background-image:url('/images/100a.webp')"><span class="cuisine-badge">Western</span><span class="discount-tag">🎟️ 10% de Desconto</span></div>
        <div class="card-body">
          <h3>7-11 Ranch Restaurant</h3>
          <p class="card-address">📍 77 E Main St., Vernal, UT 84078</p>
          <p class="card-description">Charme rústico do Oeste, porções substanciais e o tipo de ambiente que te lembra que estás no verdadeiro Oeste rural. Ótimo para famílias.</p>
          <div class="card-actions">
            <a href="tel:+14357891170" class="card-action-btn action-call">📞 Ligar</a>
            <a href="https://maps.google.com/?q=7-11+Ranch+Restaurant+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Mapa</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Desconto para Hóspedes de Tours</div>
            <div class="coupon-row"><div class="coupon-code">ATV-RANCH10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-RANCH10')">Copiar</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('7-11 Ranch Restaurant','ATV-RANCH10','10% de Desconto no Teu Pedido')">📱 Mostrar ao Empregado</button>
            <p class="coupon-note">Válido com confirmação de reserva da Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- Red Canyon Lodge -->
      <div class="restaurant-card" data-category="steakhouse">
        <div class="card-image" style="background-image:url('/images/101a.webp')"><span class="cuisine-badge">Cozinha de Lodge</span><span class="discount-tag">🎟️ 10% de Desconto</span></div>
        <div class="card-body">
          <h3>Red Canyon Lodge</h3>
          <p class="card-address">📍 2450 Red Canyon Rd, Dutch John, UT 84023</p>
          <p class="card-description">Cerca de uma hora a norte, em direção a Flaming Gorge — mas a paisagem por si só já vale a viagem. Boa comida num deslumbrante ambiente de lodge de montanha.</p>
          <div class="card-actions">
            <a href="tel:+14358892090" class="card-action-btn action-call">📞 Ligar</a>
            <a href="https://www.redcanyonlodge.com" target="_blank" rel="noopener" class="card-action-btn action-website">🌐 Site</a>
            <a href="https://maps.google.com/?q=Red+Canyon+Lodge+Dutch+John+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Mapa</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Desconto para Hóspedes de Tours</div>
            <div class="coupon-row"><div class="coupon-code">ATV-CANYON10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-CANYON10')">Copiar</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Red Canyon Lodge','ATV-CANYON10','10% de Desconto na Refeição')">📱 Mostrar ao Empregado</button>
            <p class="coupon-note">Válido com confirmação de reserva da Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- Plaza Mexicana -->
      <div class="restaurant-card" data-category="mexican">
        <div class="card-image" style="background-image:url('/images/102a.webp')"><span class="cuisine-badge">Mexicana</span><span class="discount-tag">🎟️ 10% de Desconto</span></div>
        <div class="card-body">
          <h3>Plaza Mexicana</h3>
          <p class="card-address">📍 55 E Main St., Vernal, UT 84078</p>
          <p class="card-description">Sabores autênticos, ambiente acolhedor, e o tipo de restaurante ao qual as famílias voltam sempre que visitam Vernal. As enchiladas e o chile verde são os destaques.</p>
          <div class="card-actions">
            <a href="tel:+14357893340" class="card-action-btn action-call">📞 Ligar</a>
            <a href="https://maps.google.com/?q=Plaza+Mexicana+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Mapa</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Desconto para Hóspedes de Tours</div>
            <div class="coupon-row"><div class="coupon-code">ATV-PLAZA10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-PLAZA10')">Copiar</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Plaza Mexicana','ATV-PLAZA10','10% de Desconto no Teu Pedido')">📱 Mostrar ao Empregado</button>
            <p class="coupon-note">Válido com confirmação de reserva da Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- Mi Hacienda -->
      <div class="restaurant-card" data-category="mexican">
        <div class="card-image" style="background-image:url('/images/103a.webp')"><span class="cuisine-badge">Mexicana</span><span class="discount-tag">🎟️ 15% de Desconto</span></div>
        <div class="card-body">
          <h3>Mi Hacienda</h3>
          <p class="card-address">📍 2075 US-40, Suite A, Vernal, UT 84078 (Towne Center)</p>
          <p class="card-description">Um dos restaurantes mais populares da cidade, sem dúvida. Ótimos tacos, enchiladas consistentes, e as margaritas são exatamente o que apetece depois de uma tarde poeirenta nos trilhos.</p>
          <div class="card-actions">
            <a href="tel:+14357810099" class="card-action-btn action-call">📞 (435) 781-0099</a>
            <a href="https://maps.google.com/?q=Mi+Hacienda+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Mapa</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Desconto para Hóspedes de Tours</div>
            <div class="coupon-row"><div class="coupon-code">ATV-MIH15</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-MIH15')">Copiar</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Mi Hacienda','ATV-MIH15','15% de Desconto no Teu Pedido')">📱 Mostrar ao Empregado</button>
            <p class="coupon-note">Válido com confirmação de reserva da Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- Canton Canyon City -->
      <div class="restaurant-card" data-category="mexican">
        <div class="card-image" style="background-image:url('/images/104a.png')"><span class="cuisine-badge">Chinesa</span><span class="discount-tag">🎟️ 10% de Desconto</span></div>
        <div class="card-body">
          <h3>Canton Canyon City Chinese Restaurant</h3>
          <p class="card-address">📍 1175 W Hwy 40, Vernal, UT 84078</p>
          <p class="card-description">Uma opção fiável de cozinha chinesa com porções generosas. Quando quiseres uma pausa dos hambúrgueres e dos bifes, o Canton não desilude. Menu adequado para toda a família.</p>
          <div class="card-actions">
            <a href="tel:+14357891388" class="card-action-btn action-call">📞 Ligar</a>
            <a href="https://maps.google.com/?q=Canton+Canyon+City+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Mapa</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Desconto para Hóspedes de Tours</div>
            <div class="coupon-row"><div class="coupon-code">ATV-CANTON10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-CANTON10')">Copiar</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Canton Canyon City','ATV-CANTON10','10% de Desconto no Teu Pedido')">📱 Mostrar ao Empregado</button>
            <p class="coupon-note">Válido com confirmação de reserva da Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- La Cabaña -->
      <div class="restaurant-card" data-category="mexican">
        <div class="card-image" style="background-image:url('/images/98a.webp')"><span class="cuisine-badge">Mexicana</span><span class="discount-tag">🎟️ 10% de Desconto</span></div>
        <div class="card-body">
          <h3>La Cabaña</h3>
          <p class="card-address">📍 120 E Main St, Vernal, UT 84078</p>
          <p class="card-description">Comida mexicana autêntica mesmo no centro — fajitas a chiar, enchiladas enroladas à mão, e tacos ao estilo de rua. Um favorito local de longa data para uma refeição substancial depois do passeio.</p>
          <div class="card-actions">
            <a href="tel:+14357893151" class="card-action-btn action-call">📞 Ligar</a>
            <a href="https://maps.google.com/?q=La+Cabana+Restaurant+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Mapa</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Desconto para Hóspedes de Tours</div>
            <div class="coupon-row"><div class="coupon-code">ATV-CABANA10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-CABANA10')">Copiar</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('La Cabaña','ATV-CABANA10','10% de Desconto no Teu Pedido')">📱 Mostrar ao Empregado</button>
            <p class="coupon-note">Válido com confirmação de reserva da Adventure Tours</p>
          </div>
        </div>
      </div>

    </div>

    <!-- Tips -->
    <section>
      <div class="section-header"><h2 class="section-title">Dicas para Comer em Vernal</h2><p class="section-subtitle">Algumas coisas a saber antes de saíres para comer.</p></div>
      <div class="rest-tips-grid">
        <div class="rest-tip-card"><div class="rest-tip-icon">⏰</div><h3>Planeia à Volta dos Horários dos Tours</h3><p>Os nossos <a href="/pt/utv/" style="color:var(--burnt-orange);font-weight:600">tours em UTV</a> duram cerca de três horas. Quem sai de manhã fica com fome no início da tarde. Tour ao fim da tarde? Vai direto ao Swain's ou à Plaza Mexicana.</p></div>
        <div class="rest-tip-card"><div class="rest-tip-icon">📅</div><h3>Os Fins de Semana Enchem-se</h3><p>Os locais populares enchem-se às sextas e sábados à noite — especialmente no verão. Tens um grupo? Liga com antecedência para reservar mesa no Swain's ou no 7-11 Ranch.</p></div>
        <div class="rest-tip-card"><div class="rest-tip-icon">💵</div><h3>O Dinheiro Ainda Funciona</h3><p>A maioria dos restaurantes aceita cartões, mas alguns cafés mais pequenos preferem dinheiro. Leva algum contigo quando visitares o Utah rural.</p></div>
        <div class="rest-tip-card"><div class="rest-tip-icon">🦕</div><h3>Vais ao Monumento?</h3><p>Come algo no centro, na Main Street, antes de seguires para leste até ao <a href="https://www.nps.gov/dino" target="_blank" rel="noopener" style="color:var(--burnt-orange);font-weight:600">Dinosaur National Monument</a>. La Cabaña e Plaza Mexicana são paragens rápidas e substanciais no caminho.</p></div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="article-faq" style="background:white;border-radius:25px;padding:50px 45px;box-shadow:0 20px 60px rgba(0,0,0,0.08);border:1px solid rgba(212,118,78,0.1);margin-bottom:50px">
      <h2 style="font-family:var(--font-heading);font-size:1.6rem;font-weight:700;color:var(--charcoal);text-align:center;margin-bottom:30px;border:none;padding:0">Perguntas Frequentes</h2>
      <div class="faq-item"><h3>Quais são os melhores restaurantes em Vernal, Utah?</h3><p>As melhores escolhas incluem a 4 Brothers Pizza para refeições informais, o Betty's Café para o pequeno-almoço, o Swain's Steakhouse para um jantar sentado, e a Plaza Mexicana para comida mexicana autêntica. Os hóspedes dos tours recebem códigos de desconto exclusivos em cada um.</p></div>
      <div class="faq-item"><h3>Há restaurantes perto do Dinosaur National Monument?</h3><p>Sim — Vernal é a cidade de entrada e todos os restaurantes desta página ficam a poucos minutos de carro do monumento. Locais no centro como La Cabaña e Plaza Mexicana, na Main Street, são uma paragem fácil a caminho de leste, em direção ao Quarry Visitor Center.</p></div>
      <div class="faq-item"><h3>Como uso os códigos de desconto de restauração da Adventure Tours?</h3><p>Cada cartão de restaurante tem um código de cupão único. Toca em "Mostrar ao Empregado" para abrires um cupão em ecrã inteiro no teu telemóvel, ou menciona o código ao fazeres o pedido. Válido com uma reserva confirmada da Adventure Tours.</p></div>
      <div class="faq-item"><h3>Onde devo comer depois de um tour em UTV?</h3><p>Depois de um tour de três horas, a maioria dos hóspedes quer algo substancial. 4 Brothers Pizza, Country Grub e 7-11 Ranch são escolhas populares após o passeio, com porções generosas.</p></div>
      <div class="faq-item"><h3>Há alta cozinha em Vernal?</h3><p>A oferta de Vernal é mais informal, mas o Swain's Steakhouse e o Red Canyon Lodge, perto de Flaming Gorge, oferecem experiências mais requintadas que valem a visita.</p></div>
    </section>

    <!-- CTA -->
    <div class="article-cta" style="border-radius:25px">
      <h3>Pronto para Explorar Vernal?</h3>
      <p>Reserva um tour guiado em UTV por petróglifos antigos, canyons de rocha vermelha e trilhos do deserto — e depois desbloqueia descontos gastronómicos exclusivos em cada restaurante desta página.</p>
      <a href="/pt/booking/" class="cta-btn">Reserva o Teu Tour</a>
      <a href="tel:+14352199447" class="cta-phone">📞 (435) 219-9447</a>
    </div>

    <!-- Related -->
    <div class="related-articles">
      <h3>Mais Guias de Viagem de Vernal</h3>
      <div class="related-grid">
        <a href="/pt/utv/best-utv-trails-vernal/" class="related-card"><h4>Melhores Trilhos de UTV Perto de Vernal</h4><p>Os melhores trilhos todo-o-terreno na Bacia de Uintah — do principiante ao especialista.</p></a>
        <a href="/pt/guides/vernal-weather-guide/" class="related-card"><h4>Guia do Tempo em Vernal</h4><p>Planeia atividades ao ar livre de acordo com o clima sazonal de Vernal.</p></a>
        <a href="/pt/guides/what-to-wear-utv-tour/" class="related-card"><h4>O Que Vestir num Tour em UTV</h4><p>Camadas de roupa, proteção solar e calçado para tours no deserto.</p></a>
        <a href="/pt/dinosaur-national-monument/petroglyphs-rock-art-vernal/" class="related-card"><h4>Petróglifos e Arte Rupestre</h4><p>Arte rupestre antiga Fremont e Ute nos nossos tours guiados.</p></a>
      </div>
    </div>
  </main>

  <script is:inline>
    document.querySelectorAll('.filter-btn').forEach(function(btn){btn.addEventListener('click',function(){document.querySelectorAll('.filter-btn').forEach(function(b){b.classList.remove('active')});btn.classList.add('active');var f=btn.dataset.filter;document.querySelectorAll('.restaurant-card').forEach(function(c){if(f==='all'||c.dataset.category===f){c.classList.remove('hidden');c.style.animation='fadeInUp 0.4s ease forwards'}else{c.classList.add('hidden')}})})});
    function copyCoupon(btn,code){navigator.clipboard?navigator.clipboard.writeText(code).then(function(){btn.textContent='✓ Copiado!';btn.classList.add('copied');setTimeout(function(){btn.textContent='Copiar';btn.classList.remove('copied')},2000)}):function(){var e=document.createElement('textarea');e.value=code;document.body.appendChild(e);e.select();document.execCommand('copy');document.body.removeChild(e);btn.textContent='✓ Copiado!';btn.classList.add('copied');setTimeout(function(){btn.textContent='Copiar';btn.classList.remove('copied')},2000)}()}
    function showCouponModal(r,c,d){document.getElementById('modalRestaurant').textContent=r;document.getElementById('modalCode').textContent=c;document.getElementById('modalDiscount').textContent=d;document.getElementById('couponModal').classList.add('visible');document.body.style.overflow='hidden'}
    document.getElementById('couponModalClose').addEventListener('click',function(){document.getElementById('couponModal').classList.remove('visible');document.body.style.overflow=''});
    document.getElementById('couponModal').addEventListener('click',function(e){if(e.target===e.currentTarget){document.getElementById('couponModal').classList.remove('visible');document.body.style.overflow=''}});
  </script>
`;

const DE = `

  <!-- Coupon Modal -->
  <div class="coupon-modal-overlay" id="couponModal"><div class="coupon-modal">
    <button class="coupon-modal-close" id="couponModalClose">&times;</button>
    <div class="coupon-modal-icon">🎟️</div>
    <h2>Adventure Tours Rabatt</h2>
    <p class="modal-restaurant" id="modalRestaurant"></p>
    <div class="modal-code-box"><div class="modal-code" id="modalCode"></div><div class="modal-discount" id="modalDiscount"></div></div>
    <p class="modal-instructions">Zeig diesen Bildschirm deinem Kellner, um deinen Rabatt einzulösen. Gültig für Gäste von Adventure Tours Vernal mit bestätigter Buchung.</p>
    <div class="modal-branding"><img src="/images/logo.webp" alt="Adventure Tours Vernal" height="40"><span>adventuretoursvernal.com</span></div>
  </div></div>

  <main class="restaurant-page">
    <!-- Hero -->
    <div class="dining-hero"><div class="dining-hero-bg"></div><div class="dining-hero-overlay"></div>
      <div class="dining-hero-content">
        <nav aria-label="Brotkrümelnavigation"><a href="/de/">Startseite</a><span>›</span><span style="color:rgba(255,255,255,0.9)">Beste Restaurants in Vernal</span></nav>
        <h1>Iss wie ein Einheimischer in Vernal, Utah</h1>
        <p>Unsere Gäste fragen uns jede Woche: <em>"Wo sollen wir essen?"</em> Nach Jahren, die wir hier leben, sind das unsere ehrlichen Empfehlungen — und <strong>du bekommst bei jedem einzelnen exklusive Rabatte</strong>, nur weil du eine Tour buchst.</p>
      </div>
    </div>

    <!-- Discount Banner -->
    <div class="discount-banner">
      <div class="discount-banner-icon">🎟️</div>
      <div class="discount-banner-text">
        <h2>Exklusive Restaurant-Rabatte für Tour-Gäste</h2>
        <p>Buche eine <a href="/de/booking/" style="color:var(--desert-gold);font-weight:700">UTV-Tour mit Adventure Tours Vernal</a> und schalte <strong>exklusive Gutscheincodes</strong> bei den Restaurants unten frei. Tippe auf <strong>"Dem Kellner zeigen"</strong> bei einer beliebigen Karte, um einen Vollbild-Gutschein auf deinem Handy zu öffnen.</p>
      </div>
    </div>

    <!-- Filters -->
    <div class="category-filters" id="categoryFilters">
      <button class="filter-btn active" data-filter="all">🍽️ Alle Restaurants</button>
      <button class="filter-btn" data-filter="casual">🍕 Lässig</button>
      <button class="filter-btn" data-filter="breakfast">☕ Frühstück &amp; Diners</button>
      <button class="filter-btn" data-filter="steakhouse">🥩 Steakhouses</button>
      <button class="filter-btn" data-filter="mexican">🌮 Mexikanisch &amp; International</button>
    </div>

    <!-- Restaurant Grid -->
    <div class="restaurant-grid" id="restaurantGrid">

      <!-- 4 Brothers Pizza -->
      <div class="restaurant-card" data-category="casual">
        <div class="card-image" style="background-image:url('/images/102.webp')"><span class="cuisine-badge">Pizza</span><span class="discount-tag">🎟️ 10% Rabatt</span></div>
        <div class="card-body">
          <h3>4 Brothers Pizza</h3>
          <p class="card-address">📍 1060 Market Dr. #5, Vernal, UT 84078</p>
          <p class="card-description">Die Pizzeria Nummer eins in der Stadt — solider Boden, großzügige Beläge, und es passt einfach immer. Iss vor Ort oder nimm dir eine Box mit auf dem Rückweg zum Hotel.</p>
          <div class="card-actions">
            <a href="tel:+14357892222" class="card-action-btn action-call">📞 Anrufen</a>
            <a href="https://maps.google.com/?q=4+Brothers+Pizza+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Karte</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Rabatt für Tour-Gäste</div>
            <div class="coupon-row"><div class="coupon-code">ATV-PIZZA10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-PIZZA10')">Kopieren</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('4 Brothers Pizza','ATV-PIZZA10','10% Rabatt auf deine Bestellung')">📱 Dem Kellner zeigen</button>
            <p class="coupon-note">Gültig mit Buchungsbestätigung von Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- Country Grub -->
      <div class="restaurant-card" data-category="casual">
        <div class="card-image" style="background-image:url('/images/103.webp')"><span class="cuisine-badge">Burger</span><span class="discount-tag">🎟️ 10% Rabatt</span></div>
        <div class="card-body">
          <h3>Country Grub Hamburger Restaurant</h3>
          <p class="card-address">📍 2416 W 1500 E, Vernal, UT 84078</p>
          <p class="card-description">Klassische amerikanische Burger, richtig gemacht — gut gewürzte Patties, knusprige Pommes, und genau die Mahlzeit, die nach einem Tag draußen perfekt passt.</p>
          <div class="card-actions">
            <a href="tel:+14357891414" class="card-action-btn action-call">📞 Anrufen</a>
            <a href="https://maps.google.com/?q=Country+Grub+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Karte</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Rabatt für Tour-Gäste</div>
            <div class="coupon-row"><div class="coupon-code">ATV-GRUB10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-GRUB10')">Kopieren</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Country Grub','ATV-GRUB10','10% Rabatt auf deine Bestellung')">📱 Dem Kellner zeigen</button>
            <p class="coupon-note">Gültig mit Buchungsbestätigung von Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- Get Grilled -->
      <div class="restaurant-card" data-category="casual">
        <div class="card-image" style="background-image:url('/images/95a.webp')"><span class="cuisine-badge">Sandwiches</span><span class="discount-tag">🎟️ Kostenloses Getränk</span></div>
        <div class="card-body">
          <h3>Get Grilled Sandwiches</h3>
          <p class="card-address">📍 1096 W Hwy 40, Vernal, UT 84078</p>
          <p class="card-description">Ideal für ein schnelles Mittagessen — frisch gemachte Sandwiches und schneller Service direkt am Highway. Perfekt auf deinem Weg zum oder vom Dinosaur National Monument.</p>
          <div class="card-actions">
            <a href="tel:+14357893900" class="card-action-btn action-call">📞 Anrufen</a>
            <a href="https://maps.google.com/?q=Get+Grilled+Sandwiches+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Karte</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Rabatt für Tour-Gäste</div>
            <div class="coupon-row"><div class="coupon-code">ATV-GRILL1</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-GRILL1')">Kopieren</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Get Grilled Sandwiches','ATV-GRILL1','Kostenloses Getränk zu jedem Sandwich')">📱 Dem Kellner zeigen</button>
            <p class="coupon-note">Gültig mit Buchungsbestätigung von Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- Abby's Café -->
      <div class="restaurant-card" data-category="breakfast">
        <div class="card-image" style="background-image:url('/images/105.webp')"><span class="cuisine-badge">Frühstück</span><span class="discount-tag">🎟️ 10% Rabatt</span></div>
        <div class="card-body">
          <h3>Abby's Café</h3>
          <p class="card-address">📍 73 W Main St., Vernal, UT 84078</p>
          <p class="card-description">Ein langjähriger Favorit der Einheimischen für Frühstück und Comfort Food. Die Art von Lokal, in dem die Kellnerin die halbe Runde beim Namen kennt. Perfekt vor einer Tour am Morgen.</p>
          <div class="card-actions">
            <a href="tel:+14357891366" class="card-action-btn action-call">📞 Anrufen</a>
            <a href="https://maps.google.com/?q=Abbys+Cafe+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Karte</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Rabatt für Tour-Gäste</div>
            <div class="coupon-row"><div class="coupon-code">ATV-ABBY10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-ABBY10')">Kopieren</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Abby\\'s Café','ATV-ABBY10','10% Rabatt aufs Frühstück')">📱 Dem Kellner zeigen</button>
            <p class="coupon-note">Gültig mit Buchungsbestätigung von Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- Betty's Café -->
      <div class="restaurant-card" data-category="breakfast">
        <div class="card-image" style="background-image:url('/images/97a.webp')"><span class="cuisine-badge">Diner</span><span class="discount-tag">🎟️ Kostenloser Kaffee</span></div>
        <div class="card-body">
          <h3>Betty's Café</h3>
          <p class="card-address">📍 416 W Main St., Vernal, UT 84078</p>
          <p class="card-description">Diner-Atmosphäre alter Schule mit deftigen Gerichten und freundlichem Service. Betty's versorgt Vernal schon seit Jahren, und die Portionen sind nicht kleiner geworden.</p>
          <div class="card-actions">
            <a href="tel:+14357810827" class="card-action-btn action-call">📞 Anrufen</a>
            <a href="https://maps.google.com/?q=Bettys+Cafe+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Karte</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Rabatt für Tour-Gäste</div>
            <div class="coupon-row"><div class="coupon-code">ATV-BETTY1</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-BETTY1')">Kopieren</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Betty\\'s Café','ATV-BETTY1','Kostenloser Kaffee zu jeder Mahlzeit')">📱 Dem Kellner zeigen</button>
            <p class="coupon-note">Gültig mit Buchungsbestätigung von Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- Swain's Steakhouse -->
      <div class="restaurant-card" data-category="steakhouse">
        <div class="card-image" style="background-image:url('/images/99a.webp')"><span class="cuisine-badge">Steakhouse</span><span class="discount-tag">🎟️ 15% Rabatt</span></div>
        <div class="card-body">
          <h3>Swain's Steakhouse</h3>
          <p class="card-address">📍 29 S Vernal Ave., Vernal, UT 84078</p>
          <p class="card-description">Das Nächste an gehobener Küche, das du in Vernal findest — und es ist wirklich gut. Wenn du dir nur ein Essen mit Bedienung in der Stadt gönnst, dann dieses. Die Steaks werden genau richtig zubereitet.</p>
          <div class="card-actions">
            <a href="tel:+14357892671" class="card-action-btn action-call">📞 Anrufen</a>
            <a href="https://maps.google.com/?q=Swains+Steakhouse+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Karte</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Rabatt für Tour-Gäste</div>
            <div class="coupon-row"><div class="coupon-code">ATV-STEAK15</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-STEAK15')">Kopieren</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Swain\\'s Steakhouse','ATV-STEAK15','15% Rabatt auf dein Abendessen')">📱 Dem Kellner zeigen</button>
            <p class="coupon-note">Gültig mit Buchungsbestätigung von Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- 7-11 Ranch -->
      <div class="restaurant-card" data-category="steakhouse">
        <div class="card-image" style="background-image:url('/images/100a.webp')"><span class="cuisine-badge">Western</span><span class="discount-tag">🎟️ 10% Rabatt</span></div>
        <div class="card-body">
          <h3>7-11 Ranch Restaurant</h3>
          <p class="card-address">📍 77 E Main St., Vernal, UT 84078</p>
          <p class="card-description">Rustikaler Western-Charme, deftige Portionen, und genau die Atmosphäre, die dich daran erinnert, dass du im echten ländlichen Westen bist. Toll für Familien.</p>
          <div class="card-actions">
            <a href="tel:+14357891170" class="card-action-btn action-call">📞 Anrufen</a>
            <a href="https://maps.google.com/?q=7-11+Ranch+Restaurant+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Karte</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Rabatt für Tour-Gäste</div>
            <div class="coupon-row"><div class="coupon-code">ATV-RANCH10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-RANCH10')">Kopieren</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('7-11 Ranch Restaurant','ATV-RANCH10','10% Rabatt auf deine Bestellung')">📱 Dem Kellner zeigen</button>
            <p class="coupon-note">Gültig mit Buchungsbestätigung von Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- Red Canyon Lodge -->
      <div class="restaurant-card" data-category="steakhouse">
        <div class="card-image" style="background-image:url('/images/101a.webp')"><span class="cuisine-badge">Lodge-Küche</span><span class="discount-tag">🎟️ 10% Rabatt</span></div>
        <div class="card-body">
          <h3>Red Canyon Lodge</h3>
          <p class="card-address">📍 2450 Red Canyon Rd, Dutch John, UT 84023</p>
          <p class="card-description">Etwa eine Stunde nördlich in Richtung Flaming Gorge — aber allein die Landschaft macht die Fahrt wert. Gutes Essen in einer beeindruckenden Berghütten-Kulisse.</p>
          <div class="card-actions">
            <a href="tel:+14358892090" class="card-action-btn action-call">📞 Anrufen</a>
            <a href="https://www.redcanyonlodge.com" target="_blank" rel="noopener" class="card-action-btn action-website">🌐 Website</a>
            <a href="https://maps.google.com/?q=Red+Canyon+Lodge+Dutch+John+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Karte</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Rabatt für Tour-Gäste</div>
            <div class="coupon-row"><div class="coupon-code">ATV-CANYON10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-CANYON10')">Kopieren</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Red Canyon Lodge','ATV-CANYON10','10% Rabatt aufs Essen')">📱 Dem Kellner zeigen</button>
            <p class="coupon-note">Gültig mit Buchungsbestätigung von Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- Plaza Mexicana -->
      <div class="restaurant-card" data-category="mexican">
        <div class="card-image" style="background-image:url('/images/102a.webp')"><span class="cuisine-badge">Mexikanisch</span><span class="discount-tag">🎟️ 10% Rabatt</span></div>
        <div class="card-body">
          <h3>Plaza Mexicana</h3>
          <p class="card-address">📍 55 E Main St., Vernal, UT 84078</p>
          <p class="card-description">Authentische Aromen, einladende Atmosphäre, und genau das Restaurant, zu dem Familien bei jedem Besuch in Vernal wieder zurückkehren. Enchiladas und Chile Verde sind die Highlights.</p>
          <div class="card-actions">
            <a href="tel:+14357893340" class="card-action-btn action-call">📞 Anrufen</a>
            <a href="https://maps.google.com/?q=Plaza+Mexicana+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Karte</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Rabatt für Tour-Gäste</div>
            <div class="coupon-row"><div class="coupon-code">ATV-PLAZA10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-PLAZA10')">Kopieren</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Plaza Mexicana','ATV-PLAZA10','10% Rabatt auf deine Bestellung')">📱 Dem Kellner zeigen</button>
            <p class="coupon-note">Gültig mit Buchungsbestätigung von Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- Mi Hacienda -->
      <div class="restaurant-card" data-category="mexican">
        <div class="card-image" style="background-image:url('/images/103a.webp')"><span class="cuisine-badge">Mexikanisch</span><span class="discount-tag">🎟️ 15% Rabatt</span></div>
        <div class="card-body">
          <h3>Mi Hacienda</h3>
          <p class="card-address">📍 2075 US-40, Suite A, Vernal, UT 84078 (Towne Center)</p>
          <p class="card-description">Eines der beliebtesten Restaurants der Stadt, ganz einfach. Tolle Tacos, solide Enchiladas, und die Margaritas sind genau das, was du nach einem staubigen Nachmittag auf den Pisten willst.</p>
          <div class="card-actions">
            <a href="tel:+14357810099" class="card-action-btn action-call">📞 (435) 781-0099</a>
            <a href="https://maps.google.com/?q=Mi+Hacienda+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Karte</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Rabatt für Tour-Gäste</div>
            <div class="coupon-row"><div class="coupon-code">ATV-MIH15</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-MIH15')">Kopieren</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Mi Hacienda','ATV-MIH15','15% Rabatt auf deine Bestellung')">📱 Dem Kellner zeigen</button>
            <p class="coupon-note">Gültig mit Buchungsbestätigung von Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- Canton Canyon City -->
      <div class="restaurant-card" data-category="mexican">
        <div class="card-image" style="background-image:url('/images/104a.png')"><span class="cuisine-badge">Chinesisch</span><span class="discount-tag">🎟️ 10% Rabatt</span></div>
        <div class="card-body">
          <h3>Canton Canyon City Chinese Restaurant</h3>
          <p class="card-address">📍 1175 W Hwy 40, Vernal, UT 84078</p>
          <p class="card-description">Eine zuverlässige Option für chinesische Küche mit großzügigen Portionen. Wenn du mal eine Pause von Burgern und Steaks brauchst, liefert Canton genau das. Familienfreundliche Speisekarte.</p>
          <div class="card-actions">
            <a href="tel:+14357891388" class="card-action-btn action-call">📞 Anrufen</a>
            <a href="https://maps.google.com/?q=Canton+Canyon+City+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Karte</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Rabatt für Tour-Gäste</div>
            <div class="coupon-row"><div class="coupon-code">ATV-CANTON10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-CANTON10')">Kopieren</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Canton Canyon City','ATV-CANTON10','10% Rabatt auf deine Bestellung')">📱 Dem Kellner zeigen</button>
            <p class="coupon-note">Gültig mit Buchungsbestätigung von Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- La Cabaña -->
      <div class="restaurant-card" data-category="mexican">
        <div class="card-image" style="background-image:url('/images/98a.webp')"><span class="cuisine-badge">Mexikanisch</span><span class="discount-tag">🎟️ 10% Rabatt</span></div>
        <div class="card-body">
          <h3>La Cabaña</h3>
          <p class="card-address">📍 120 E Main St, Vernal, UT 84078</p>
          <p class="card-description">Authentisches mexikanisches Essen mitten in der Innenstadt — brutzelnde Fajitas, von Hand gerollte Enchiladas und Street-Style-Tacos. Ein langjähriger Favorit der Einheimischen für eine deftige Mahlzeit nach der Tour.</p>
          <div class="card-actions">
            <a href="tel:+14357893151" class="card-action-btn action-call">📞 Anrufen</a>
            <a href="https://maps.google.com/?q=La+Cabana+Restaurant+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 Karte</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ Rabatt für Tour-Gäste</div>
            <div class="coupon-row"><div class="coupon-code">ATV-CABANA10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-CABANA10')">Kopieren</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('La Cabaña','ATV-CABANA10','10% Rabatt auf deine Bestellung')">📱 Dem Kellner zeigen</button>
            <p class="coupon-note">Gültig mit Buchungsbestätigung von Adventure Tours</p>
          </div>
        </div>
      </div>

    </div>

    <!-- Tips -->
    <section>
      <div class="section-header"><h2 class="section-title">Tipps fürs Essen in Vernal</h2><p class="section-subtitle">Ein paar Dinge, die du wissen solltest, bevor du losziehst zum Essen.</p></div>
      <div class="rest-tips-grid">
        <div class="rest-tip-card"><div class="rest-tip-icon">⏰</div><h3>Plane um die Tour-Zeiten herum</h3><p>Unsere <a href="/de/utv/" style="color:var(--burnt-orange);font-weight:600">UTV-Touren</a> dauern etwa drei Stunden. Wer morgens fährt, hat am frühen Nachmittag Hunger. Abendtour? Dann geht's direkt zu Swain's oder zur Plaza Mexicana.</p></div>
        <div class="rest-tip-card"><div class="rest-tip-icon">📅</div><h3>An Wochenenden wird's voll</h3><p>Beliebte Lokale sind freitags und samstags abends schnell voll — besonders im Sommer. Bist du mit einer größeren Gruppe unterwegs? Ruf vorher an, um einen Tisch bei Swain's oder im 7-11 Ranch zu reservieren.</p></div>
        <div class="rest-tip-card"><div class="rest-tip-icon">💵</div><h3>Bargeld funktioniert immer noch</h3><p>Die meisten Restaurants akzeptieren Karten, aber ein paar kleinere Cafés freuen sich über Bargeld. Hab etwas dabei, wenn du im ländlichen Utah unterwegs bist.</p></div>
        <div class="rest-tip-card"><div class="rest-tip-icon">🦕</div><h3>Auf dem Weg zum Monument?</h3><p>Iss etwas in der Innenstadt an der Main Street, bevor es nach Osten zum <a href="https://www.nps.gov/dino" target="_blank" rel="noopener" style="color:var(--burnt-orange);font-weight:600">Dinosaur National Monument</a> geht. La Cabaña und Plaza Mexicana sind schnelle, deftige Stopps auf dem Weg dorthin.</p></div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="article-faq" style="background:white;border-radius:25px;padding:50px 45px;box-shadow:0 20px 60px rgba(0,0,0,0.08);border:1px solid rgba(212,118,78,0.1);margin-bottom:50px">
      <h2 style="font-family:var(--font-heading);font-size:1.6rem;font-weight:700;color:var(--charcoal);text-align:center;margin-bottom:30px;border:none;padding:0">Häufig gestellte Fragen</h2>
      <div class="faq-item"><h3>Was sind die besten Restaurants in Vernal, Utah?</h3><p>Zu den Top-Empfehlungen gehören 4 Brothers Pizza für zwanglose Küche, Betty's Café fürs Frühstück, Swain's Steakhouse für ein Abendessen mit Bedienung, und Plaza Mexicana für authentisches mexikanisches Essen. Tour-Gäste bekommen bei jedem exklusive Rabattcodes.</p></div>
      <div class="faq-item"><h3>Gibt es Restaurants in der Nähe des Dinosaur National Monument?</h3><p>Ja — Vernal ist die Tor-Stadt, und alle Restaurants auf dieser Seite liegen nur eine kurze Fahrt vom Monument entfernt. Lokale in der Innenstadt wie La Cabaña und Plaza Mexicana an der Main Street sind ein einfacher Stopp auf dem Weg nach Osten zum Quarry Visitor Center.</p></div>
      <div class="faq-item"><h3>Wie benutze ich die Restaurant-Rabattcodes von Adventure Tours?</h3><p>Jede Restaurant-Karte hat einen eigenen Gutscheincode. Tippe auf "Dem Kellner zeigen", um einen Vollbild-Gutschein auf deinem Handy anzuzeigen, oder nenne den Code bei der Bestellung. Gültig mit einer bestätigten Buchung bei Adventure Tours.</p></div>
      <div class="faq-item"><h3>Wo sollte ich nach einer UTV-Tour essen?</h3><p>Nach einer dreistündigen Tour wollen die meisten Gäste etwas Deftiges. 4 Brothers Pizza, Country Grub und 7-11 Ranch sind beliebte Ziele nach der Fahrt, mit großzügigen Portionen.</p></div>
      <div class="faq-item"><h3>Gibt es gehobene Küche in Vernal?</h3><p>Vernal ist eher zwanglos unterwegs, aber Swain's Steakhouse und Red Canyon Lodge in der Nähe von Flaming Gorge bieten gehobene Erlebnisse mit Bedienung, die einen Besuch wert sind.</p></div>
    </section>

    <!-- CTA -->
    <div class="article-cta" style="border-radius:25px">
      <h3>Bereit, Vernal zu erkunden?</h3>
      <p>Buche eine geführte UTV-Tour durch uralte Petroglyphen, Red-Rock-Canyons und Wüstenpisten — und schalte danach exklusive Restaurant-Rabatte bei jedem Restaurant auf dieser Seite frei.</p>
      <a href="/de/booking/" class="cta-btn">Buche deine Tour</a>
      <a href="tel:+14352199447" class="cta-phone">📞 (435) 219-9447</a>
    </div>

    <!-- Related -->
    <div class="related-articles">
      <h3>Weitere Reiseführer für Vernal</h3>
      <div class="related-grid">
        <a href="/de/utv/best-utv-trails-vernal/" class="related-card"><h4>Beste UTV-Pisten in der Nähe von Vernal</h4><p>Top-Offroad-Pisten im Uintah Basin — für Einsteiger bis Profis.</p></a>
        <a href="/de/guides/vernal-weather-guide/" class="related-card"><h4>Wetterführer für Vernal</h4><p>Plane deine Outdoor-Aktivitäten rund um das saisonale Wetter in Vernal.</p></a>
        <a href="/de/guides/what-to-wear-utv-tour/" class="related-card"><h4>Was du bei einer UTV-Tour anziehen solltest</h4><p>Schichten, Sonnenschutz und Schuhwerk für Wüstentouren.</p></a>
        <a href="/de/dinosaur-national-monument/petroglyphs-rock-art-vernal/" class="related-card"><h4>Petroglyphen &amp; Felskunst</h4><p>Uralte Felskunst der Fremont und Ute auf unseren geführten Touren.</p></a>
      </div>
    </div>
  </main>

  <script is:inline>
    document.querySelectorAll('.filter-btn').forEach(function(btn){btn.addEventListener('click',function(){document.querySelectorAll('.filter-btn').forEach(function(b){b.classList.remove('active')});btn.classList.add('active');var f=btn.dataset.filter;document.querySelectorAll('.restaurant-card').forEach(function(c){if(f==='all'||c.dataset.category===f){c.classList.remove('hidden');c.style.animation='fadeInUp 0.4s ease forwards'}else{c.classList.add('hidden')}})})});
    function copyCoupon(btn,code){navigator.clipboard?navigator.clipboard.writeText(code).then(function(){btn.textContent='✓ Kopiert!';btn.classList.add('copied');setTimeout(function(){btn.textContent='Kopieren';btn.classList.remove('copied')},2000)}):function(){var e=document.createElement('textarea');e.value=code;document.body.appendChild(e);e.select();document.execCommand('copy');document.body.removeChild(e);btn.textContent='✓ Kopiert!';btn.classList.add('copied');setTimeout(function(){btn.textContent='Kopieren';btn.classList.remove('copied')},2000)}()}
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

const JA = `

  <!-- Coupon Modal -->
  <div class="coupon-modal-overlay" id="couponModal"><div class="coupon-modal">
    <button class="coupon-modal-close" id="couponModalClose">&times;</button>
    <div class="coupon-modal-icon">🎟️</div>
    <h2>Adventure Toursの割引</h2>
    <p class="modal-restaurant" id="modalRestaurant"></p>
    <div class="modal-code-box"><div class="modal-code" id="modalCode"></div><div class="modal-discount" id="modalDiscount"></div></div>
    <p class="modal-instructions">この画面を店員にお見せいただくと割引が適用されます。ご予約が確定しているAdventure Tours Vernalのお客様が対象です。</p>
    <div class="modal-branding"><img src="/images/logo.webp" alt="Adventure Tours Vernal" height="40"><span>adventuretoursvernal.com</span></div>
  </div></div>

  <main class="restaurant-page">
    <!-- Hero -->
    <div class="dining-hero"><div class="dining-hero-bg"></div><div class="dining-hero-overlay"></div>
      <div class="dining-hero-content">
        <nav aria-label="パンくずリスト"><a href="/ja/">ホーム</a><span>›</span><span style="color:rgba(255,255,255,0.9)">バーナルのおすすめレストラン</span></nav>
        <h1>ユタ州バーナルで地元の人のように食べる</h1>
        <p>お客様から毎週のように聞かれます。<em>「どこで食べたらいいですか?」</em>何年もここで暮らしてきた私たちの、正直なおすすめがこちらです——しかも<strong>ツアーをご予約いただくだけで、そのすべてのお店で限定割引</strong>をご利用いただけます。</p>
      </div>
    </div>

    <!-- Discount Banner -->
    <div class="discount-banner">
      <div class="discount-banner-icon">🎟️</div>
      <div class="discount-banner-text">
        <h2>ツアーご参加者限定のお食事割引</h2>
        <p><a href="/ja/booking/" style="color:var(--desert-gold);font-weight:700">Adventure Tours VernalのUTVツアー</a>をご予約いただくと、下記のレストランで使える<strong>限定クーポンコード</strong>が手に入ります。各カードの<strong>「店員に見せる」</strong>をタップすると、スマートフォンに全画面のクーポンが表示されます。</p>
      </div>
    </div>

    <!-- Filters -->
    <div class="category-filters" id="categoryFilters">
      <button class="filter-btn active" data-filter="all">🍽️ すべてのレストラン</button>
      <button class="filter-btn" data-filter="casual">🍕 カジュアル</button>
      <button class="filter-btn" data-filter="breakfast">☕ 朝食 &amp; ダイナー</button>
      <button class="filter-btn" data-filter="steakhouse">🥩 ステーキハウス</button>
      <button class="filter-btn" data-filter="mexican">🌮 メキシカン &amp; 各国料理</button>
    </div>

    <!-- Restaurant Grid -->
    <div class="restaurant-grid" id="restaurantGrid">

      <!-- 4 Brothers Pizza -->
      <div class="restaurant-card" data-category="casual">
        <div class="card-image" style="background-image:url('/images/102.webp')"><span class="cuisine-badge">ピザ</span><span class="discount-tag">🎟️ 10%オフ</span></div>
        <div class="card-body">
          <h3>4 Brothers Pizza</h3>
          <p class="card-address">📍 1060 Market Dr. #5, Vernal, UT 84078</p>
          <p class="card-description">町で一番の定番ピザ店です。しっかりした生地にたっぷりのトッピングで、いつ来ても外れがありません。店内で召し上がるのも、ホテルへ戻る途中に1箱お持ち帰りいただくのもおすすめです。</p>
          <div class="card-actions">
            <a href="tel:+14357892222" class="card-action-btn action-call">📞 電話</a>
            <a href="https://maps.google.com/?q=4+Brothers+Pizza+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 地図</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ ツアーご参加者割引</div>
            <div class="coupon-row"><div class="coupon-code">ATV-PIZZA10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-PIZZA10')">コピー</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('4 Brothers Pizza','ATV-PIZZA10','ご注文が10%オフ')">📱 店員に見せる</button>
            <p class="coupon-note">Adventure Toursの予約確認のご提示で有効です</p>
          </div>
        </div>
      </div>

      <!-- Country Grub -->
      <div class="restaurant-card" data-category="casual">
        <div class="card-image" style="background-image:url('/images/103.webp')"><span class="cuisine-badge">バーガー</span><span class="discount-tag">🎟️ 10%オフ</span></div>
        <div class="card-body">
          <h3>Country Grub Hamburger Restaurant</h3>
          <p class="card-address">📍 2416 W 1500 E, Vernal, UT 84078</p>
          <p class="card-description">王道のアメリカンバーガーをきちんと仕上げるお店です。しっかり味付けされたパティにカリッとしたフライドポテト、外で一日過ごしたあとにぴったりの一皿です。</p>
          <div class="card-actions">
            <a href="tel:+14357891414" class="card-action-btn action-call">📞 電話</a>
            <a href="https://maps.google.com/?q=Country+Grub+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 地図</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ ツアーご参加者割引</div>
            <div class="coupon-row"><div class="coupon-code">ATV-GRUB10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-GRUB10')">コピー</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Country Grub','ATV-GRUB10','ご注文が10%オフ')">📱 店員に見せる</button>
            <p class="coupon-note">Adventure Toursの予約確認のご提示で有効です</p>
          </div>
        </div>
      </div>

      <!-- Get Grilled -->
      <div class="restaurant-card" data-category="casual">
        <div class="card-image" style="background-image:url('/images/95a.webp')"><span class="cuisine-badge">サンドイッチ</span><span class="discount-tag">🎟️ ドリンク無料</span></div>
        <div class="card-body">
          <h3>Get Grilled Sandwiches</h3>
          <p class="card-address">📍 1096 W Hwy 40, Vernal, UT 84078</p>
          <p class="card-description">さっとランチを済ませたいときに最適です。作りたてのサンドイッチと素早い接客、ハイウェイのすぐ脇という立地も便利です。Dinosaur National Monumentへの行き帰りにぴったりです。</p>
          <div class="card-actions">
            <a href="tel:+14357893900" class="card-action-btn action-call">📞 電話</a>
            <a href="https://maps.google.com/?q=Get+Grilled+Sandwiches+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 地図</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ ツアーご参加者割引</div>
            <div class="coupon-row"><div class="coupon-code">ATV-GRILL1</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-GRILL1')">コピー</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Get Grilled Sandwiches','ATV-GRILL1','サンドイッチご注文でドリンク1杯無料')">📱 店員に見せる</button>
            <p class="coupon-note">Adventure Toursの予約確認のご提示で有効です</p>
          </div>
        </div>
      </div>

      <!-- Abby's Café -->
      <div class="restaurant-card" data-category="breakfast">
        <div class="card-image" style="background-image:url('/images/105.webp')"><span class="cuisine-badge">朝食</span><span class="discount-tag">🎟️ 10%オフ</span></div>
        <div class="card-body">
          <h3>Abby's Café</h3>
          <p class="card-address">📍 73 W Main St., Vernal, UT 84078</p>
          <p class="card-description">朝食とほっとする家庭料理で、長年地元の方に愛されてきたお店です。店員さんが店内の半分のお客さんを名前で呼ぶような、そんな雰囲気があります。午前のツアーの前にぴったりです。</p>
          <div class="card-actions">
            <a href="tel:+14357891366" class="card-action-btn action-call">📞 電話</a>
            <a href="https://maps.google.com/?q=Abbys+Cafe+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 地図</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ ツアーご参加者割引</div>
            <div class="coupon-row"><div class="coupon-code">ATV-ABBY10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-ABBY10')">コピー</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Abby\\'s Café','ATV-ABBY10','朝食が10%オフ')">📱 店員に見せる</button>
            <p class="coupon-note">Adventure Toursの予約確認のご提示で有効です</p>
          </div>
        </div>
      </div>

      <!-- Betty's Café -->
      <div class="restaurant-card" data-category="breakfast">
        <div class="card-image" style="background-image:url('/images/97a.webp')"><span class="cuisine-badge">ダイナー</span><span class="discount-tag">🎟️ コーヒー無料</span></div>
        <div class="card-body">
          <h3>Betty's Café</h3>
          <p class="card-address">📍 416 W Main St., Vernal, UT 84078</p>
          <p class="card-description">昔ながらのダイナーの雰囲気に、ボリュームのある料理と気さくな接客。Betty's Caféは長年バーナルの人々のお腹を満たしてきましたが、盛りの良さは今も変わりません。</p>
          <div class="card-actions">
            <a href="tel:+14357810827" class="card-action-btn action-call">📞 電話</a>
            <a href="https://maps.google.com/?q=Bettys+Cafe+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 地図</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ ツアーご参加者割引</div>
            <div class="coupon-row"><div class="coupon-code">ATV-BETTY1</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-BETTY1')">コピー</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Betty\\'s Café','ATV-BETTY1','お食事ご注文でコーヒー無料')">📱 店員に見せる</button>
            <p class="coupon-note">Adventure Toursの予約確認のご提示で有効です</p>
          </div>
        </div>
      </div>

      <!-- Swain's Steakhouse -->
      <div class="restaurant-card" data-category="steakhouse">
        <div class="card-image" style="background-image:url('/images/99a.webp')"><span class="cuisine-badge">ステーキハウス</span><span class="discount-tag">🎟️ 15%オフ</span></div>
        <div class="card-body">
          <h3>Swain's Steakhouse</h3>
          <p class="card-address">📍 29 S Vernal Ave., Vernal, UT 84078</p>
          <p class="card-description">バーナルで最も本格的なレストランに近い一軒で、味も確かです。町でゆっくり座っての食事が1回だけなら、ここを選んでください。ステーキの焼き加減が見事です。</p>
          <div class="card-actions">
            <a href="tel:+14357892671" class="card-action-btn action-call">📞 電話</a>
            <a href="https://maps.google.com/?q=Swains+Steakhouse+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 地図</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ ツアーご参加者割引</div>
            <div class="coupon-row"><div class="coupon-code">ATV-STEAK15</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-STEAK15')">コピー</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Swain\\'s Steakhouse','ATV-STEAK15','ディナーが15%オフ')">📱 店員に見せる</button>
            <p class="coupon-note">Adventure Toursの予約確認のご提示で有効です</p>
          </div>
        </div>
      </div>

      <!-- 7-11 Ranch -->
      <div class="restaurant-card" data-category="steakhouse">
        <div class="card-image" style="background-image:url('/images/100a.webp')"><span class="cuisine-badge">ウエスタン</span><span class="discount-tag">🎟️ 10%オフ</span></div>
        <div class="card-body">
          <h3>7-11 Ranch Restaurant</h3>
          <p class="card-address">📍 77 E Main St., Vernal, UT 84078</p>
          <p class="card-description">素朴なウエスタンの趣とボリュームのある料理で、本物の西部の田舎町にいることを実感させてくれるお店です。ご家族連れにもおすすめです。</p>
          <div class="card-actions">
            <a href="tel:+14357891170" class="card-action-btn action-call">📞 電話</a>
            <a href="https://maps.google.com/?q=7-11+Ranch+Restaurant+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 地図</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ ツアーご参加者割引</div>
            <div class="coupon-row"><div class="coupon-code">ATV-RANCH10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-RANCH10')">コピー</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('7-11 Ranch Restaurant','ATV-RANCH10','ご注文が10%オフ')">📱 店員に見せる</button>
            <p class="coupon-note">Adventure Toursの予約確認のご提示で有効です</p>
          </div>
        </div>
      </div>

      <!-- Red Canyon Lodge -->
      <div class="restaurant-card" data-category="steakhouse">
        <div class="card-image" style="background-image:url('/images/101a.webp')"><span class="cuisine-badge">ロッジダイニング</span><span class="discount-tag">🎟️ 10%オフ</span></div>
        <div class="card-body">
          <h3>Red Canyon Lodge</h3>
          <p class="card-address">📍 2450 Red Canyon Rd, Dutch John, UT 84023</p>
          <p class="card-description">Flaming Gorge方面へ北に約1時間ですが、景色だけでも足を運ぶ価値があります。息をのむような山のロッジで、美味しい料理をお楽しみいただけます。</p>
          <div class="card-actions">
            <a href="tel:+14358892090" class="card-action-btn action-call">📞 電話</a>
            <a href="https://www.redcanyonlodge.com" target="_blank" rel="noopener" class="card-action-btn action-website">🌐 ウェブサイト</a>
            <a href="https://maps.google.com/?q=Red+Canyon+Lodge+Dutch+John+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 地図</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ ツアーご参加者割引</div>
            <div class="coupon-row"><div class="coupon-code">ATV-CANYON10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-CANYON10')">コピー</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Red Canyon Lodge','ATV-CANYON10','お食事が10%オフ')">📱 店員に見せる</button>
            <p class="coupon-note">Adventure Toursの予約確認のご提示で有効です</p>
          </div>
        </div>
      </div>

      <!-- Plaza Mexicana -->
      <div class="restaurant-card" data-category="mexican">
        <div class="card-image" style="background-image:url('/images/102a.webp')"><span class="cuisine-badge">メキシカン</span><span class="discount-tag">🎟️ 10%オフ</span></div>
        <div class="card-body">
          <h3>Plaza Mexicana</h3>
          <p class="card-address">📍 55 E Main St., Vernal, UT 84078</p>
          <p class="card-description">本格的な味わいと居心地の良い雰囲気で、バーナルを訪れるたびにご家族で通いたくなるお店です。エンチラーダとチレ・ベルデが特におすすめです。</p>
          <div class="card-actions">
            <a href="tel:+14357893340" class="card-action-btn action-call">📞 電話</a>
            <a href="https://maps.google.com/?q=Plaza+Mexicana+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 地図</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ ツアーご参加者割引</div>
            <div class="coupon-row"><div class="coupon-code">ATV-PLAZA10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-PLAZA10')">コピー</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Plaza Mexicana','ATV-PLAZA10','ご注文が10%オフ')">📱 店員に見せる</button>
            <p class="coupon-note">Adventure Toursの予約確認のご提示で有効です</p>
          </div>
        </div>
      </div>

      <!-- Mi Hacienda -->
      <div class="restaurant-card" data-category="mexican">
        <div class="card-image" style="background-image:url('/images/103a.webp')"><span class="cuisine-badge">メキシカン</span><span class="discount-tag">🎟️ 15%オフ</span></div>
        <div class="card-body">
          <h3>Mi Hacienda</h3>
          <p class="card-address">📍 2075 US-40, Suite A, Vernal, UT 84078 (Towne Center)</p>
          <p class="card-description">文句なしに町で最も人気のあるレストランの1つです。タコスは絶品、エンチラーダも堅実で、砂ぼこりにまみれた午後のトレイル走行のあとには、マルガリータがまさに求めていた一杯です。</p>
          <div class="card-actions">
            <a href="tel:+14357810099" class="card-action-btn action-call">📞 (435) 781-0099</a>
            <a href="https://maps.google.com/?q=Mi+Hacienda+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 地図</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ ツアーご参加者割引</div>
            <div class="coupon-row"><div class="coupon-code">ATV-MIH15</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-MIH15')">コピー</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Mi Hacienda','ATV-MIH15','ご注文が15%オフ')">📱 店員に見せる</button>
            <p class="coupon-note">Adventure Toursの予約確認のご提示で有効です</p>
          </div>
        </div>
      </div>

      <!-- Canton Canyon City -->
      <div class="restaurant-card" data-category="mexican">
        <div class="card-image" style="background-image:url('/images/104a.png')"><span class="cuisine-badge">中華</span><span class="discount-tag">🎟️ 10%オフ</span></div>
        <div class="card-body">
          <h3>Canton Canyon City Chinese Restaurant</h3>
          <p class="card-address">📍 1175 W Hwy 40, Vernal, UT 84078</p>
          <p class="card-description">ボリュームたっぷりの中華が食べられる、頼りになる一軒です。バーガーやステーキが続いて少し気分を変えたいときに、Cantonが応えてくれます。ご家族向けのメニューも揃っています。</p>
          <div class="card-actions">
            <a href="tel:+14357891388" class="card-action-btn action-call">📞 電話</a>
            <a href="https://maps.google.com/?q=Canton+Canyon+City+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 地図</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ ツアーご参加者割引</div>
            <div class="coupon-row"><div class="coupon-code">ATV-CANTON10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-CANTON10')">コピー</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Canton Canyon City','ATV-CANTON10','ご注文が10%オフ')">📱 店員に見せる</button>
            <p class="coupon-note">Adventure Toursの予約確認のご提示で有効です</p>
          </div>
        </div>
      </div>

      <!-- La Cabaña -->
      <div class="restaurant-card" data-category="mexican">
        <div class="card-image" style="background-image:url('/images/98a.webp')"><span class="cuisine-badge">メキシカン</span><span class="discount-tag">🎟️ 10%オフ</span></div>
        <div class="card-body">
          <h3>La Cabaña</h3>
          <p class="card-address">📍 120 E Main St, Vernal, UT 84078</p>
          <p class="card-description">ダウンタウンのど真ん中で味わえる本格メキシコ料理です。ジュージューと音を立てるファヒータ、手巻きのエンチラーダ、屋台風のタコス。ライドのあとのしっかりした食事として、長年地元で愛されています。</p>
          <div class="card-actions">
            <a href="tel:+14357893151" class="card-action-btn action-call">📞 電話</a>
            <a href="https://maps.google.com/?q=La+Cabana+Restaurant+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 地図</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ ツアーご参加者割引</div>
            <div class="coupon-row"><div class="coupon-code">ATV-CABANA10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-CABANA10')">コピー</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('La Cabaña','ATV-CABANA10','ご注文が10%オフ')">📱 店員に見せる</button>
            <p class="coupon-note">Adventure Toursの予約確認のご提示で有効です</p>
          </div>
        </div>
      </div>

    </div>

    <!-- Tips -->
    <section>
      <div class="section-header"><h2 class="section-title">バーナルでの食事のヒント</h2><p class="section-subtitle">食事に出かける前に知っておきたいことをいくつかご紹介します。</p></div>
      <div class="rest-tips-grid">
        <div class="rest-tip-card"><div class="rest-tip-icon">⏰</div><h3>ツアーの時間に合わせて計画を</h3><p>私たちの<a href="/ja/utv/" style="color:var(--burnt-orange);font-weight:600">UTVツアー</a>は約3時間です。午前中に走った方は、午後の早い時間にはお腹が空いてきます。夕方のツアーでしたら、そのままSwain'sかPlaza Mexicanaへどうぞ。</p></div>
        <div class="rest-tip-card"><div class="rest-tip-icon">📅</div><h3>週末は混み合います</h3><p>人気のお店は金曜と土曜の夜に満席になります——特に夏場は顕著です。グループでお越しでしたら、Swain'sや7-11 Ranchのテーブルを事前にお電話でご予約ください。</p></div>
        <div class="rest-tip-card"><div class="rest-tip-icon">💵</div><h3>現金も役に立ちます</h3><p>ほとんどのレストランはカードが使えますが、小さなカフェの中には現金が喜ばれるお店もあります。ユタ州の田舎を訪れる際は、少し手元にご用意ください。</p></div>
        <div class="rest-tip-card"><div class="rest-tip-icon">🦕</div><h3>Monumentへ向かう予定ですか?</h3><p>東の<a href="https://www.nps.gov/dino" target="_blank" rel="noopener" style="color:var(--burnt-orange);font-weight:600">Dinosaur National Monument</a>へ向けて走り出す前に、ダウンタウンのMain Streetで食事を済ませておきましょう。La CabañaとPlaza Mexicanaは、道すがら手早くしっかり食べられる立ち寄り先です。</p></div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="article-faq" style="background:white;border-radius:25px;padding:50px 45px;box-shadow:0 20px 60px rgba(0,0,0,0.08);border:1px solid rgba(212,118,78,0.1);margin-bottom:50px">
      <h2 style="font-family:var(--font-heading);font-size:1.6rem;font-weight:700;color:var(--charcoal);text-align:center;margin-bottom:30px;border:none;padding:0">よくあるご質問</h2>
      <div class="faq-item"><h3>ユタ州バーナルでおすすめのレストランはどこですか?</h3><p>カジュアルな食事なら4 Brothers Pizza、朝食ならBetty's Café、ゆっくり座ってのディナーならSwain's Steakhouse、本格的なメキシコ料理ならPlaza Mexicanaが上位のおすすめです。ツアーご参加者は、そのそれぞれで限定の割引コードをご利用いただけます。</p></div>
      <div class="faq-item"><h3>Dinosaur National Monumentの近くにレストランはありますか?</h3><p>はい——バーナルは玄関口となる町で、このページのレストランはいずれもモニュメントから車ですぐです。Main Street沿いのLa CabañaやPlaza Mexicanaといったダウンタウンのお店は、東のQuarry Visitor Centerへ向かう途中に立ち寄りやすい場所にあります。</p></div>
      <div class="faq-item"><h3>Adventure Toursのお食事割引コードはどのように使いますか?</h3><p>各レストランのカードに専用のクーポンコードが記載されています。「店員に見せる」をタップするとスマートフォンに全画面のクーポンが表示されますので、それをお見せいただくか、ご注文の際にコードをお伝えください。Adventure Toursのご予約が確定している方が対象です。</p></div>
      <div class="faq-item"><h3>UTVツアーのあとはどこで食べるのがおすすめですか?</h3><p>3時間のツアーのあとは、しっかりしたものを召し上がりたい方がほとんどです。4 Brothers Pizza、Country Grub、7-11 Ranchは、盛りの良さでツアー後に人気の選択肢です。</p></div>
      <div class="faq-item"><h3>バーナルに高級レストランはありますか?</h3><p>バーナルの飲食店はカジュアルなお店が中心ですが、Swain's SteakhouseとFlaming Gorge近くのRed Canyon Lodgeでは、ゆっくり座って楽しむ上質な食事をお楽しみいただけます。訪れる価値のある2軒です。</p></div>
    </section>

    <!-- CTA -->
    <div class="article-cta" style="border-radius:25px">
      <h3>バーナルを冒険する準備はできましたか?</h3>
      <p>古代の岩絵、赤い岩のキャニオン、砂漠のトレイルを巡るガイド付きUTVツアーをご予約ください。ご予約いただくと、このページのすべてのレストランで限定のお食事割引をご利用いただけます。</p>
      <a href="/ja/booking/" class="cta-btn">ツアーを予約する</a>
      <a href="tel:+14352199447" class="cta-phone">📞 (435) 219-9447</a>
    </div>

    <!-- Related -->
    <div class="related-articles">
      <h3>バーナルの旅行ガイドをもっと見る</h3>
      <div class="related-grid">
        <a href="/ja/utv/best-utv-trails-vernal/" class="related-card"><h4>バーナル周辺のおすすめUTVトレイル</h4><p>Uintah Basinの人気オフロードトレイル——初心者から上級者まで。</p></a>
        <a href="/ja/guides/vernal-weather-guide/" class="related-card"><h4>バーナルの天候ガイド</h4><p>バーナルの季節ごとの天候に合わせてアウトドアの計画を立てましょう。</p></a>
        <a href="/ja/guides/what-to-wear-utv-tour/" class="related-card"><h4>UTVツアーの服装</h4><p>砂漠のツアーのための重ね着、日焼け対策、履き物。</p></a>
        <a href="/ja/dinosaur-national-monument/petroglyphs-rock-art-vernal/" class="related-card"><h4>岩絵 &amp; ロックアート</h4><p>ガイド付きツアーで巡るFremontとUteの古代の岩絵。</p></a>
      </div>
    </div>
  </main>

  <script is:inline>
    document.querySelectorAll('.filter-btn').forEach(function(btn){btn.addEventListener('click',function(){document.querySelectorAll('.filter-btn').forEach(function(b){b.classList.remove('active')});btn.classList.add('active');var f=btn.dataset.filter;document.querySelectorAll('.restaurant-card').forEach(function(c){if(f==='all'||c.dataset.category===f){c.classList.remove('hidden');c.style.animation='fadeInUp 0.4s ease forwards'}else{c.classList.add('hidden')}})})});
    function copyCoupon(btn,code){navigator.clipboard?navigator.clipboard.writeText(code).then(function(){btn.textContent='✓ コピーしました!';btn.classList.add('copied');setTimeout(function(){btn.textContent='コピー';btn.classList.remove('copied')},2000)}):function(){var e=document.createElement('textarea');e.value=code;document.body.appendChild(e);e.select();document.execCommand('copy');document.body.removeChild(e);btn.textContent='✓ コピーしました!';btn.classList.add('copied');setTimeout(function(){btn.textContent='コピー';btn.classList.remove('copied')},2000)}()}
    function showCouponModal(r,c,d){document.getElementById('modalRestaurant').textContent=r;document.getElementById('modalCode').textContent=c;document.getElementById('modalDiscount').textContent=d;document.getElementById('couponModal').classList.add('visible');document.body.style.overflow='hidden'}
    document.getElementById('couponModalClose').addEventListener('click',function(){document.getElementById('couponModal').classList.remove('visible');document.body.style.overflow=''});
    document.getElementById('couponModal').addEventListener('click',function(e){if(e.target===e.currentTarget){document.getElementById('couponModal').classList.remove('visible');document.body.style.overflow=''}});
  </script>
`;

const ZH = `

  <!-- Coupon Modal -->
  <div class="coupon-modal-overlay" id="couponModal"><div class="coupon-modal">
    <button class="coupon-modal-close" id="couponModalClose">&times;</button>
    <div class="coupon-modal-icon">🎟️</div>
    <h2>Adventure Tours 折扣</h2>
    <p class="modal-restaurant" id="modalRestaurant"></p>
    <div class="modal-code-box"><div class="modal-code" id="modalCode"></div><div class="modal-discount" id="modalDiscount"></div></div>
    <p class="modal-instructions">向服务员出示此屏幕即可享受折扣。仅限已确认预订的 Adventure Tours Vernal 客人使用。</p>
    <div class="modal-branding"><img src="/images/logo.webp" alt="Adventure Tours Vernal" height="40"><span>adventuretoursvernal.com</span></div>
  </div></div>

  <main class="restaurant-page">
    <!-- Hero -->
    <div class="dining-hero"><div class="dining-hero-bg"></div><div class="dining-hero-overlay"></div>
      <div class="dining-hero-content">
        <nav aria-label="面包屑导航"><a href="/zh/">首页</a><span>›</span><span style="color:rgba(255,255,255,0.9)">Vernal 最佳餐厅</span></nav>
        <h1>在犹他州 Vernal 像本地人一样吃</h1>
        <p>我们的客人每周都会问：<em>「我们该去哪儿吃?」</em>在这里生活多年后，这些就是我们最真诚的推荐——而且<strong>只要预订一次行程，你在每一家都能享受专属折扣</strong>。</p>
      </div>
    </div>

    <!-- Discount Banner -->
    <div class="discount-banner">
      <div class="discount-banner-icon">🎟️</div>
      <div class="discount-banner-text">
        <h2>行程客人专属餐饮折扣</h2>
        <p>预订一次 <a href="/zh/booking/" style="color:var(--desert-gold);font-weight:700">Adventure Tours Vernal 的 UTV 行程</a>，即可解锁下列餐厅的<strong>专属优惠码</strong>。在任意卡片上点按<strong>「出示给服务员」</strong>，即可在手机上调出全屏优惠券。</p>
      </div>
    </div>

    <!-- Filters -->
    <div class="category-filters" id="categoryFilters">
      <button class="filter-btn active" data-filter="all">🍽️ 全部餐厅</button>
      <button class="filter-btn" data-filter="casual">🍕 休闲简餐</button>
      <button class="filter-btn" data-filter="breakfast">☕ 早餐 &amp; 小馆</button>
      <button class="filter-btn" data-filter="steakhouse">🥩 牛排馆</button>
      <button class="filter-btn" data-filter="mexican">🌮 墨西哥 &amp; 各国料理</button>
    </div>

    <!-- Restaurant Grid -->
    <div class="restaurant-grid" id="restaurantGrid">

      <!-- 4 Brothers Pizza -->
      <div class="restaurant-card" data-category="casual">
        <div class="card-image" style="background-image:url('/images/102.webp')"><span class="cuisine-badge">比萨</span><span class="discount-tag">🎟️ 10% Off</span></div>
        <div class="card-body">
          <h3>4 Brothers Pizza</h3>
          <p class="card-address">📍 1060 Market Dr. #5, Vernal, UT 84078</p>
          <p class="card-description">镇上首选的比萨店——扎实的饼底、丰盛的配料，每次都不会让人失望。可以堂食，也可以在回酒店的路上带一盒走。</p>
          <div class="card-actions">
            <a href="tel:+14357892222" class="card-action-btn action-call">📞 致电</a>
            <a href="https://maps.google.com/?q=4+Brothers+Pizza+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 地图</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ 行程客人折扣</div>
            <div class="coupon-row"><div class="coupon-code">ATV-PIZZA10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-PIZZA10')">复制</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('4 Brothers Pizza','ATV-PIZZA10','订单享 10% Off')">📱 出示给服务员</button>
            <p class="coupon-note">凭 Adventure Tours 预订确认有效</p>
          </div>
        </div>
      </div>

      <!-- Country Grub -->
      <div class="restaurant-card" data-category="casual">
        <div class="card-image" style="background-image:url('/images/103.webp')"><span class="cuisine-badge">汉堡</span><span class="discount-tag">🎟️ 10% Off</span></div>
        <div class="card-body">
          <h3>Country Grub Hamburger Restaurant</h3>
          <p class="card-address">📍 2416 W 1500 E, Vernal, UT 84078</p>
          <p class="card-description">把经典美式汉堡做得地道——调味到位的肉饼、酥脆的薯条，正是户外玩了一天之后最想吃的那种一餐。</p>
          <div class="card-actions">
            <a href="tel:+14357891414" class="card-action-btn action-call">📞 致电</a>
            <a href="https://maps.google.com/?q=Country+Grub+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 地图</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ 行程客人折扣</div>
            <div class="coupon-row"><div class="coupon-code">ATV-GRUB10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-GRUB10')">复制</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Country Grub','ATV-GRUB10','订单享 10% Off')">📱 出示给服务员</button>
            <p class="coupon-note">凭 Adventure Tours 预订确认有效</p>
          </div>
        </div>
      </div>

      <!-- Get Grilled -->
      <div class="restaurant-card" data-category="casual">
        <div class="card-image" style="background-image:url('/images/95a.webp')"><span class="cuisine-badge">三明治</span><span class="discount-tag">🎟️ Free Drink</span></div>
        <div class="card-body">
          <h3>Get Grilled Sandwiches</h3>
          <p class="card-address">📍 1096 W Hwy 40, Vernal, UT 84078</p>
          <p class="card-description">快速午餐的好去处——现做的三明治、上菜利落，就在公路边上。往返 Dinosaur National Monument 的路上再合适不过。</p>
          <div class="card-actions">
            <a href="tel:+14357893900" class="card-action-btn action-call">📞 致电</a>
            <a href="https://maps.google.com/?q=Get+Grilled+Sandwiches+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 地图</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ 行程客人折扣</div>
            <div class="coupon-row"><div class="coupon-code">ATV-GRILL1</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-GRILL1')">复制</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Get Grilled Sandwiches','ATV-GRILL1','任意三明治赠一杯饮料')">📱 出示给服务员</button>
            <p class="coupon-note">凭 Adventure Tours 预订确认有效</p>
          </div>
        </div>
      </div>

      <!-- Abby's Café -->
      <div class="restaurant-card" data-category="breakfast">
        <div class="card-image" style="background-image:url('/images/105.webp')"><span class="cuisine-badge">早餐</span><span class="discount-tag">🎟️ 10% Off</span></div>
        <div class="card-body">
          <h3>Abby's Café</h3>
          <p class="card-address">📍 73 W Main St., Vernal, UT 84078</p>
          <p class="card-description">本地人钟爱多年的早餐与家常菜馆。在这种地方，服务员能叫出店里半数客人的名字。晨间行程出发前最适合来一顿。</p>
          <div class="card-actions">
            <a href="tel:+14357891366" class="card-action-btn action-call">📞 致电</a>
            <a href="https://maps.google.com/?q=Abbys+Cafe+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 地图</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ 行程客人折扣</div>
            <div class="coupon-row"><div class="coupon-code">ATV-ABBY10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-ABBY10')">复制</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Abby\\'s Café','ATV-ABBY10','早餐享 10% Off')">📱 出示给服务员</button>
            <p class="coupon-note">凭 Adventure Tours 预订确认有效</p>
          </div>
        </div>
      </div>

      <!-- Betty's Café -->
      <div class="restaurant-card" data-category="breakfast">
        <div class="card-image" style="background-image:url('/images/97a.webp')"><span class="cuisine-badge">小馆</span><span class="discount-tag">🎟️ Free Coffee</span></div>
        <div class="card-body">
          <h3>Betty's Café</h3>
          <p class="card-address">📍 416 W Main St., Vernal, UT 84078</p>
          <p class="card-description">老派小馆的气氛，配上分量十足的餐食和亲切的服务。Betty's 多年来一直喂饱着 Vernal，分量至今没有缩水。</p>
          <div class="card-actions">
            <a href="tel:+14357810827" class="card-action-btn action-call">📞 致电</a>
            <a href="https://maps.google.com/?q=Bettys+Cafe+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 地图</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ 行程客人折扣</div>
            <div class="coupon-row"><div class="coupon-code">ATV-BETTY1</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-BETTY1')">复制</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Betty\\'s Café','ATV-BETTY1','任意餐食赠一杯咖啡')">📱 出示给服务员</button>
            <p class="coupon-note">凭 Adventure Tours 预订确认有效</p>
          </div>
        </div>
      </div>

      <!-- Swain's Steakhouse -->
      <div class="restaurant-card" data-category="steakhouse">
        <div class="card-image" style="background-image:url('/images/99a.webp')"><span class="cuisine-badge">牛排馆</span><span class="discount-tag">🎟️ 15% Off</span></div>
        <div class="card-body">
          <h3>Swain's Steakhouse</h3>
          <p class="card-address">📍 29 S Vernal Ave., Vernal, UT 84078</p>
          <p class="card-description">这是 Vernal 最接近高档餐厅的一家——而且水准很高。如果你在镇上只打算好好坐下来吃一顿，就选这里。牛排的火候恰到好处。</p>
          <div class="card-actions">
            <a href="tel:+14357892671" class="card-action-btn action-call">📞 致电</a>
            <a href="https://maps.google.com/?q=Swains+Steakhouse+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 地图</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ 行程客人折扣</div>
            <div class="coupon-row"><div class="coupon-code">ATV-STEAK15</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-STEAK15')">复制</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Swain\\'s Steakhouse','ATV-STEAK15','晚餐享 15% Off')">📱 出示给服务员</button>
            <p class="coupon-note">凭 Adventure Tours 预订确认有效</p>
          </div>
        </div>
      </div>

      <!-- 7-11 Ranch -->
      <div class="restaurant-card" data-category="steakhouse">
        <div class="card-image" style="background-image:url('/images/100a.webp')"><span class="cuisine-badge">西部风味</span><span class="discount-tag">🎟️ 10% Off</span></div>
        <div class="card-body">
          <h3>7-11 Ranch Restaurant</h3>
          <p class="card-address">📍 77 E Main St., Vernal, UT 84078</p>
          <p class="card-description">质朴的西部风情、扎实的分量，再加上那种让你真切感到身处西部乡野的氛围。很适合全家人一起来。</p>
          <div class="card-actions">
            <a href="tel:+14357891170" class="card-action-btn action-call">📞 致电</a>
            <a href="https://maps.google.com/?q=7-11+Ranch+Restaurant+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 地图</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ 行程客人折扣</div>
            <div class="coupon-row"><div class="coupon-code">ATV-RANCH10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-RANCH10')">复制</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('7-11 Ranch Restaurant','ATV-RANCH10','订单享 10% Off')">📱 出示给服务员</button>
            <p class="coupon-note">凭 Adventure Tours 预订确认有效</p>
          </div>
        </div>
      </div>

      <!-- Red Canyon Lodge -->
      <div class="restaurant-card" data-category="steakhouse">
        <div class="card-image" style="background-image:url('/images/101a.webp')"><span class="cuisine-badge">山间旅舍餐饮</span><span class="discount-tag">🎟️ 10% Off</span></div>
        <div class="card-body">
          <h3>Red Canyon Lodge</h3>
          <p class="card-address">📍 2450 Red Canyon Rd, Dutch John, UT 84023</p>
          <p class="card-description">往北朝 Flaming Gorge 方向约一小时车程——单是沿途风景就值回这趟路。在美得惊人的山间旅舍里，享受一顿好菜。</p>
          <div class="card-actions">
            <a href="tel:+14358892090" class="card-action-btn action-call">📞 致电</a>
            <a href="https://www.redcanyonlodge.com" target="_blank" rel="noopener" class="card-action-btn action-website">🌐 网站</a>
            <a href="https://maps.google.com/?q=Red+Canyon+Lodge+Dutch+John+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 地图</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ 行程客人折扣</div>
            <div class="coupon-row"><div class="coupon-code">ATV-CANYON10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-CANYON10')">复制</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Red Canyon Lodge','ATV-CANYON10','餐饮享 10% Off')">📱 出示给服务员</button>
            <p class="coupon-note">凭 Adventure Tours 预订确认有效</p>
          </div>
        </div>
      </div>

      <!-- Plaza Mexicana -->
      <div class="restaurant-card" data-category="mexican">
        <div class="card-image" style="background-image:url('/images/102a.webp')"><span class="cuisine-badge">墨西哥菜</span><span class="discount-tag">🎟️ 10% Off</span></div>
        <div class="card-body">
          <h3>Plaza Mexicana</h3>
          <p class="card-address">📍 55 E Main St., Vernal, UT 84078</p>
          <p class="card-description">地道的风味、热情的氛围，是那种家家户户每次来 Vernal 都会再度光顾的餐厅。招牌是 enchiladas 和 chile verde。</p>
          <div class="card-actions">
            <a href="tel:+14357893340" class="card-action-btn action-call">📞 致电</a>
            <a href="https://maps.google.com/?q=Plaza+Mexicana+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 地图</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ 行程客人折扣</div>
            <div class="coupon-row"><div class="coupon-code">ATV-PLAZA10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-PLAZA10')">复制</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Plaza Mexicana','ATV-PLAZA10','订单享 10% Off')">📱 出示给服务员</button>
            <p class="coupon-note">凭 Adventure Tours 预订确认有效</p>
          </div>
        </div>
      </div>

      <!-- Mi Hacienda -->
      <div class="restaurant-card" data-category="mexican">
        <div class="card-image" style="background-image:url('/images/103a.webp')"><span class="cuisine-badge">墨西哥菜</span><span class="discount-tag">🎟️ 15% Off</span></div>
        <div class="card-body">
          <h3>Mi Hacienda</h3>
          <p class="card-address">📍 2075 US-40, Suite A, Vernal, UT 84078 (Towne Center)</p>
          <p class="card-description">毫无疑问是镇上最受欢迎的餐厅之一。塔可很棒，enchiladas 也扎实，而在越野路线上尘土飞扬地跑了一下午后，玛格丽特正是你最想来的一杯。</p>
          <div class="card-actions">
            <a href="tel:+14357810099" class="card-action-btn action-call">📞 (435) 781-0099</a>
            <a href="https://maps.google.com/?q=Mi+Hacienda+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 地图</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ 行程客人折扣</div>
            <div class="coupon-row"><div class="coupon-code">ATV-MIH15</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-MIH15')">复制</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Mi Hacienda','ATV-MIH15','订单享 15% Off')">📱 出示给服务员</button>
            <p class="coupon-note">凭 Adventure Tours 预订确认有效</p>
          </div>
        </div>
      </div>

      <!-- Canton Canyon City -->
      <div class="restaurant-card" data-category="mexican">
        <div class="card-image" style="background-image:url('/images/104a.png')"><span class="cuisine-badge">中餐</span><span class="discount-tag">🎟️ 10% Off</span></div>
        <div class="card-body">
          <h3>Canton Canyon City Chinese Restaurant</h3>
          <p class="card-address">📍 1175 W Hwy 40, Vernal, UT 84078</p>
          <p class="card-description">一家分量十足、值得信赖的中餐馆。当你想从汉堡和牛排里换换口味时，Canton 不会让你失望。菜单也很适合全家人。</p>
          <div class="card-actions">
            <a href="tel:+14357891388" class="card-action-btn action-call">📞 致电</a>
            <a href="https://maps.google.com/?q=Canton+Canyon+City+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 地图</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ 行程客人折扣</div>
            <div class="coupon-row"><div class="coupon-code">ATV-CANTON10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-CANTON10')">复制</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Canton Canyon City','ATV-CANTON10','订单享 10% Off')">📱 出示给服务员</button>
            <p class="coupon-note">凭 Adventure Tours 预订确认有效</p>
          </div>
        </div>
      </div>

      <!-- La Cabaña -->
      <div class="restaurant-card" data-category="mexican">
        <div class="card-image" style="background-image:url('/images/98a.webp')"><span class="cuisine-badge">墨西哥菜</span><span class="discount-tag">🎟️ 10% Off</span></div>
        <div class="card-body">
          <h3>La Cabaña</h3>
          <p class="card-address">📍 120 E Main St, Vernal, UT 84078</p>
          <p class="card-description">就在市中心的地道墨西哥菜——滋滋作响的法士达、手卷的 enchiladas，还有街头风味的塔可。多年来一直是本地人骑行后好好吃一顿的心头好。</p>
          <div class="card-actions">
            <a href="tel:+14357893151" class="card-action-btn action-call">📞 致电</a>
            <a href="https://maps.google.com/?q=La+Cabana+Restaurant+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 地图</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ 行程客人折扣</div>
            <div class="coupon-row"><div class="coupon-code">ATV-CABANA10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-CABANA10')">复制</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('La Cabaña','ATV-CABANA10','订单享 10% Off')">📱 出示给服务员</button>
            <p class="coupon-note">凭 Adventure Tours 预订确认有效</p>
          </div>
        </div>
      </div>

    </div>

    <!-- Tips -->
    <section>
      <div class="section-header"><h2 class="section-title">在 Vernal 用餐的小贴士</h2><p class="section-subtitle">出门吃饭前，有几件事值得先知道。</p></div>
      <div class="rest-tips-grid">
        <div class="rest-tip-card"><div class="rest-tip-icon">⏰</div><h3>围绕行程时间来安排</h3><p>我们的 <a href="/zh/utv/" style="color:var(--burnt-orange);font-weight:600">UTV 行程</a>大约 3 小时。上午出发的人到下午早些时候就饿了。傍晚的行程呢?直接去 Swain's 或 Plaza Mexicana 吧。</p></div>
        <div class="rest-tip-card"><div class="rest-tip-icon">📅</div><h3>周末很热闹</h3><p>热门餐厅在周五和周六晚上会坐满——夏天尤其如此。人多的话，记得提前打电话给 Swain's 或 7-11 Ranch 订位。</p></div>
        <div class="rest-tip-card"><div class="rest-tip-icon">💵</div><h3>现金依然管用</h3><p>大多数餐厅都收卡，但少数小咖啡馆更乐意收现金。在犹他州乡下游玩时，随身备一点现金。</p></div>
        <div class="rest-tip-card"><div class="rest-tip-icon">🦕</div><h3>要去 Monument 吗?</h3><p>在向东开往 <a href="https://www.nps.gov/dino" target="_blank" rel="noopener" style="color:var(--burnt-orange);font-weight:600">Dinosaur National Monument</a> 之前，先在市中心的 Main Street 上吃一顿。La Cabaña 和 Plaza Mexicana 都是出发路上又快又实在的落脚点。</p></div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="article-faq" style="background:white;border-radius:25px;padding:50px 45px;box-shadow:0 20px 60px rgba(0,0,0,0.08);border:1px solid rgba(212,118,78,0.1);margin-bottom:50px">
      <h2 style="font-family:var(--font-heading);font-size:1.6rem;font-weight:700;color:var(--charcoal);text-align:center;margin-bottom:30px;border:none;padding:0">常见问题</h2>
      <div class="faq-item"><h3>犹他州 Vernal 最好的餐厅有哪些?</h3><p>首选包括休闲用餐的 4 Brothers Pizza、早餐的 Betty's Café、坐下来好好吃晚餐的 Swain's Steakhouse，以及地道墨西哥菜的 Plaza Mexicana。行程客人在每一家都能享受专属优惠码。</p></div>
      <div class="faq-item"><h3>Dinosaur National Monument 附近有餐厅吗?</h3><p>有——Vernal 是通往这里的门户小镇，本页所有餐厅距离纪念地都只有很短的车程。Main Street 上的 La Cabaña 和 Plaza Mexicana 这类市中心店，是往东前往 Quarry Visitor Center 途中顺路的落脚点。</p></div>
      <div class="faq-item"><h3>Adventure Tours 的餐饮优惠码怎么用?</h3><p>每张餐厅卡片都有一个专属优惠码。点按「出示给服务员」即可在手机上显示全屏优惠券，或在点餐时报出优惠码。凭已确认的 Adventure Tours 预订有效。</p></div>
      <div class="faq-item"><h3>UTV 行程之后该去哪儿吃?</h3><p>结束 3 小时的行程后，大多数客人都想吃点实在的。4 Brothers Pizza、Country Grub 和 7-11 Ranch 都是分量十足、深受欢迎的骑行后之选。</p></div>
      <div class="faq-item"><h3>Vernal 有高档餐厅吗?</h3><p>Vernal 的餐饮以休闲为主，但 Swain's Steakhouse 和 Flaming Gorge 附近的 Red Canyon Lodge 都提供值得一去的高档堂食体验。</p></div>
    </section>

    <!-- CTA -->
    <div class="article-cta" style="border-radius:25px">
      <h3>准备好探索 Vernal 了吗?</h3>
      <p>预订一次穿越古老岩画、红岩峡谷与沙漠越野路线的 UTV 导览游——然后在本页每一家餐厅解锁专属餐饮折扣。</p>
      <a href="/zh/booking/" class="cta-btn">预订你的行程</a>
      <a href="tel:+14352199447" class="cta-phone">📞 (435) 219-9447</a>
    </div>

    <!-- Related -->
    <div class="related-articles">
      <h3>更多 Vernal 旅行攻略</h3>
      <div class="related-grid">
        <a href="/zh/utv/best-utv-trails-vernal/" class="related-card"><h4>Vernal 周边最佳 UTV 越野路线</h4><p>Uintah Basin 顶级越野路线——从初学者到高手。</p></a>
        <a href="/zh/guides/vernal-weather-guide/" class="related-card"><h4>Vernal 天气攻略</h4><p>围绕 Vernal 的季节天气来安排户外活动。</p></a>
        <a href="/zh/guides/what-to-wear-utv-tour/" class="related-card"><h4>UTV 行程穿什么</h4><p>沙漠行程的分层穿搭、防晒与鞋履。</p></a>
        <a href="/zh/dinosaur-national-monument/petroglyphs-rock-art-vernal/" class="related-card"><h4>岩画 &amp; 岩石艺术</h4><p>在我们的导览游中探访古老的 Fremont 与 Ute 岩画。</p></a>
      </div>
    </div>
  </main>

  <script is:inline>
    document.querySelectorAll('.filter-btn').forEach(function(btn){btn.addEventListener('click',function(){document.querySelectorAll('.filter-btn').forEach(function(b){b.classList.remove('active')});btn.classList.add('active');var f=btn.dataset.filter;document.querySelectorAll('.restaurant-card').forEach(function(c){if(f==='all'||c.dataset.category===f){c.classList.remove('hidden');c.style.animation='fadeInUp 0.4s ease forwards'}else{c.classList.add('hidden')}})})});
    function copyCoupon(btn,code){navigator.clipboard?navigator.clipboard.writeText(code).then(function(){btn.textContent='✓ 已复制!';btn.classList.add('copied');setTimeout(function(){btn.textContent='复制';btn.classList.remove('copied')},2000)}):function(){var e=document.createElement('textarea');e.value=code;document.body.appendChild(e);e.select();document.execCommand('copy');document.body.removeChild(e);btn.textContent='✓ 已复制!';btn.classList.add('copied');setTimeout(function(){btn.textContent='复制';btn.classList.remove('copied')},2000)}()}
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
// AR — AR-2 Phase F batch 4. Restaurant names, addresses, coupon codes, element ids,
// `data-filter`/`data-category` values and every `onclick` handler are preserved verbatim; only
// visible prose and the user-facing strings the inline script writes are translated.
//
// ⚠⚠ 7-11 Ranch IS A COLLISION BETWEEN TWO FROZEN RULES, AND §2.2 ALONE WOULD SHIP THE NAME
// BACKWARDS. §2.2 keeps a restaurant name Latin and verbatim because a reader matches it against
// a sign; §3.6 says a bare digit-separator-digit run in Arabic prose reverses. This name is both.
// Measured in slot 1, negative controls red in the same pass:
//     7-11 Ranch   bare       -> visual "Ranch 11-7"   ✘  a real business name, displayed wrong
//     7-11 Ranch   in <bdi>   -> visual "7-11 Ranch"   ✔
// So every occurrence is isolated. "Keep it verbatim" and "keep it readable" turned out to be
// different instructions, and no gate in this repository can see the difference.
//
// ⚠ THE COUPON MODAL WRITES NAMES WITH textContent, WHERE NO MARKUP CAN REACH — and policy §5.2
// forbids U+200E/U+200F/U+2066–2069, so the usual escape hatch is closed too. The fix keeps the
// id contract and moves it one element in: `modalRestaurant` and `modalCode` are now <bdi>
// elements INSIDE their <p>, so `getElementById(...).textContent = r` still resolves to the same
// id and the value lands isolated. `modalDiscount` is deliberately NOT isolated — its string is
// Arabic. This is markup, the same family as <bdi> itself, not a forbidden control character.
const AR = `

  <!-- نافذة القسيمة -->
  <div class="coupon-modal-overlay" id="couponModal"><div class="coupon-modal">
    <button class="coupon-modal-close" id="couponModalClose">&times;</button>
    <div class="coupon-modal-icon">🎟️</div>
    <h2>خصم Adventure Tours</h2>
    <p class="modal-restaurant"><bdi id="modalRestaurant"></bdi></p>
    <div class="modal-code-box"><div class="modal-code"><bdi id="modalCode"></bdi></div><div class="modal-discount" id="modalDiscount"></div></div>
    <p class="modal-instructions">أظهر هذه الشاشة للنادل للحصول على خصمك. صالحة لضيوف شركة Adventure Tours Vernal الذين لديهم حجز مؤكّد.</p>
    <div class="modal-branding"><img src="/images/logo.webp" alt="Adventure Tours Vernal" height="40"><span>adventuretoursvernal.com</span></div>
  </div></div>

  <main class="restaurant-page">
    <!-- الواجهة -->
    <div class="dining-hero"><div class="dining-hero-bg"></div><div class="dining-hero-overlay"></div>
      <div class="dining-hero-content">
        <nav aria-label="مسار التنقّل"><a href="/">الرئيسية</a><span>›</span><span style="color:rgba(255,255,255,0.9)">أفضل مطاعم Vernal</span></nav>
        <h1>كُل كما يأكل أهل المكان في Vernal بولاية يوتا</h1>
        <p>يسألنا ضيوفنا كل أسبوع: <em>«أين ينبغي أن نأكل؟»</em> وبعد سنوات من العيش هنا، هذه اختياراتنا الصادقة، و<strong>ستحصل على خصومات حصرية</strong> في كل واحد منها لمجرّد حجزك جولة.</p>
      </div>
    </div>

    <!-- شريط الخصومات -->
    <div class="discount-banner">
      <div class="discount-banner-icon">🎟️</div>
      <div class="discount-banner-text">
        <h2>خصومات طعام حصرية لضيوف الجولات</h2>
        <p>احجز <a href="/ar/booking/" style="color:var(--desert-gold);font-weight:700">جولة UTV مع شركة Adventure Tours Vernal</a> لتفتح <strong>رموز قسائم حصرية</strong> في المطاعم أدناه. اضغط <strong>«أظهرها للنادل»</strong> على أي بطاقة لعرض قسيمة بملء الشاشة على هاتفك.</p>
      </div>
    </div>

    <!-- المرشّحات -->
    <div class="category-filters" id="categoryFilters">
      <button class="filter-btn active" data-filter="all">🍽️ كل المطاعم</button>
      <button class="filter-btn" data-filter="casual">🍕 غير رسمية</button>
      <button class="filter-btn" data-filter="breakfast">☕ الفطور والمطاعم الشعبية</button>
      <button class="filter-btn" data-filter="steakhouse">🥩 مطاعم شرائح اللحم</button>
      <button class="filter-btn" data-filter="mexican">🌮 مكسيكية وعالمية</button>
    </div>

    <!-- شبكة المطاعم -->
    <div class="restaurant-grid" id="restaurantGrid">

      <!-- 4 Brothers Pizza -->
      <div class="restaurant-card" data-category="casual">
        <div class="card-image" style="background-image:url('/images/102.webp')"><span class="cuisine-badge">بيتزا</span><span class="discount-tag">🎟️ خصم 10 بالمئة</span></div>
        <div class="card-body">
          <h3>4 Brothers Pizza</h3>
          <p class="card-address">📍 <bdi>1060 Market Dr. #5, Vernal, UT 84078</bdi></p>
          <p class="card-description">مكان البيتزا الأول في البلدة، بعجينة متينة وإضافات سخيّة، ولا يخيب أبدًا. تناولها في المطعم أو خذ علبة معك في طريق العودة إلى الفندق.</p>
          <div class="card-actions">
            <a href="tel:+14357892222" class="card-action-btn action-call">📞 اتصل</a>
            <a href="https://maps.google.com/?q=4+Brothers+Pizza+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 الخريطة</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ خصم ضيوف الجولات</div>
            <div class="coupon-row"><div class="coupon-code">ATV-PIZZA10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-PIZZA10')">انسخ</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('4 Brothers Pizza','ATV-PIZZA10','خصم 10 بالمئة على طلبك')">📱 أظهرها للنادل</button>
            <p class="coupon-note">صالحة مع تأكيد حجز لدى Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- Country Grub -->
      <div class="restaurant-card" data-category="casual">
        <div class="card-image" style="background-image:url('/images/103.webp')"><span class="cuisine-badge">برغر</span><span class="discount-tag">🎟️ خصم 10 بالمئة</span></div>
        <div class="card-body">
          <h3>Country Grub Hamburger Restaurant</h3>
          <p class="card-address">📍 <bdi>2416 W 1500 E, Vernal, UT 84078</bdi></p>
          <p class="card-description">برغر أمريكي كلاسيكي مصنوع كما ينبغي، بأقراص لحم متبّلة جيدًا وبطاطس مقرمشة، من الوجبات التي تقع موقعها تمامًا بعد يوم في الهواء الطلق.</p>
          <div class="card-actions">
            <a href="tel:+14357891414" class="card-action-btn action-call">📞 اتصل</a>
            <a href="https://maps.google.com/?q=Country+Grub+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 الخريطة</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ خصم ضيوف الجولات</div>
            <div class="coupon-row"><div class="coupon-code">ATV-GRUB10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-GRUB10')">انسخ</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Country Grub','ATV-GRUB10','خصم 10 بالمئة على طلبك')">📱 أظهرها للنادل</button>
            <p class="coupon-note">صالحة مع تأكيد حجز لدى Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- Get Grilled -->
      <div class="restaurant-card" data-category="casual">
        <div class="card-image" style="background-image:url('/images/95a.webp')"><span class="cuisine-badge">سندويتشات</span><span class="discount-tag">🎟️ مشروب مجاني</span></div>
        <div class="card-body">
          <h3>Get Grilled Sandwiches</h3>
          <p class="card-address">📍 <bdi>1096 W Hwy 40, Vernal, UT 84078</bdi></p>
          <p class="card-description">ممتاز لغداء سريع، بسندويتشات تُحضَّر طازجة وخدمة سريعة على الطريق السريع مباشرة. مثالي في طريقك إلى Dinosaur National Monument أو عودتك منه.</p>
          <div class="card-actions">
            <a href="tel:+14357893900" class="card-action-btn action-call">📞 اتصل</a>
            <a href="https://maps.google.com/?q=Get+Grilled+Sandwiches+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 الخريطة</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ خصم ضيوف الجولات</div>
            <div class="coupon-row"><div class="coupon-code">ATV-GRILL1</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-GRILL1')">انسخ</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Get Grilled Sandwiches','ATV-GRILL1','مشروب مجاني مع أي سندويتش')">📱 أظهرها للنادل</button>
            <p class="coupon-note">صالحة مع تأكيد حجز لدى Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- Abby's Café -->
      <div class="restaurant-card" data-category="breakfast">
        <div class="card-image" style="background-image:url('/images/105.webp')"><span class="cuisine-badge">فطور</span><span class="discount-tag">🎟️ خصم 10 بالمئة</span></div>
        <div class="card-body">
          <h3>Abby's Café</h3>
          <p class="card-address">📍 <bdi>73 W Main St., Vernal, UT 84078</bdi></p>
          <p class="card-description">مقصد محلي محبوب منذ زمن طويل للفطور وطعام البيت الدافئ. من الأماكن التي تعرف فيها النادلة نصف الحاضرين بأسمائهم. مثالي قبل جولة صباحية.</p>
          <div class="card-actions">
            <a href="tel:+14357891366" class="card-action-btn action-call">📞 اتصل</a>
            <a href="https://maps.google.com/?q=Abbys+Cafe+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 الخريطة</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ خصم ضيوف الجولات</div>
            <div class="coupon-row"><div class="coupon-code">ATV-ABBY10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-ABBY10')">انسخ</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Abby\\'s Café','ATV-ABBY10','خصم 10 بالمئة على الفطور')">📱 أظهرها للنادل</button>
            <p class="coupon-note">صالحة مع تأكيد حجز لدى Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- Betty's Café -->
      <div class="restaurant-card" data-category="breakfast">
        <div class="card-image" style="background-image:url('/images/97a.webp')"><span class="cuisine-badge">مطعم شعبي</span><span class="discount-tag">🎟️ قهوة مجانية</span></div>
        <div class="card-body">
          <h3>Betty's Café</h3>
          <p class="card-address">📍 <bdi>416 W Main St., Vernal, UT 84078</bdi></p>
          <p class="card-description">أجواء مطعم شعبي على الطراز القديم بوجبات دسمة وخدمة ودودة. يُطعم Betty's أهل Vernal منذ سنوات، ولم تصغر الحصص.</p>
          <div class="card-actions">
            <a href="tel:+14357810827" class="card-action-btn action-call">📞 اتصل</a>
            <a href="https://maps.google.com/?q=Bettys+Cafe+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 الخريطة</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ خصم ضيوف الجولات</div>
            <div class="coupon-row"><div class="coupon-code">ATV-BETTY1</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-BETTY1')">انسخ</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Betty\\'s Café','ATV-BETTY1','قهوة مجانية مع أي وجبة')">📱 أظهرها للنادل</button>
            <p class="coupon-note">صالحة مع تأكيد حجز لدى Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- Swain's Steakhouse -->
      <div class="restaurant-card" data-category="steakhouse">
        <div class="card-image" style="background-image:url('/images/99a.webp')"><span class="cuisine-badge">شرائح لحم</span><span class="discount-tag">🎟️ خصم 15 بالمئة</span></div>
        <div class="card-body">
          <h3>Swain's Steakhouse</h3>
          <p class="card-address">📍 <bdi>29 S Vernal Ave., Vernal, UT 84078</bdi></p>
          <p class="card-description">أقرب ما يكون إلى المطاعم الفاخرة في Vernal، وهو جيد جدًا بحقّ. إن كنت ستتناول وجبة واحدة جالسًا في البلدة فاجعلها هنا. وشرائح اللحم تُطهى كما ينبغي.</p>
          <div class="card-actions">
            <a href="tel:+14357892671" class="card-action-btn action-call">📞 اتصل</a>
            <a href="https://maps.google.com/?q=Swains+Steakhouse+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 الخريطة</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ خصم ضيوف الجولات</div>
            <div class="coupon-row"><div class="coupon-code">ATV-STEAK15</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-STEAK15')">انسخ</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Swain\\'s Steakhouse','ATV-STEAK15','خصم 15 بالمئة على عشائك')">📱 أظهرها للنادل</button>
            <p class="coupon-note">صالحة مع تأكيد حجز لدى Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- 7-11 Ranch -->
      <div class="restaurant-card" data-category="steakhouse">
        <div class="card-image" style="background-image:url('/images/100a.webp')"><span class="cuisine-badge">غربي</span><span class="discount-tag">🎟️ خصم 10 بالمئة</span></div>
        <div class="card-body">
          <h3><bdi>7-11 Ranch Restaurant</bdi></h3>
          <p class="card-address">📍 <bdi>77 E Main St., Vernal, UT 84078</bdi></p>
          <p class="card-description">سحر غربي ريفي وحصص دسمة، وأجواء تذكّرك بأنك في الغرب الريفي الحقيقي. ممتاز للعائلات.</p>
          <div class="card-actions">
            <a href="tel:+14357891170" class="card-action-btn action-call">📞 اتصل</a>
            <a href="https://maps.google.com/?q=7-11+Ranch+Restaurant+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 الخريطة</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ خصم ضيوف الجولات</div>
            <div class="coupon-row"><div class="coupon-code">ATV-RANCH10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-RANCH10')">انسخ</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('7-11 Ranch Restaurant','ATV-RANCH10','خصم 10 بالمئة على طلبك')">📱 أظهرها للنادل</button>
            <p class="coupon-note">صالحة مع تأكيد حجز لدى Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- Red Canyon Lodge -->
      <div class="restaurant-card" data-category="steakhouse">
        <div class="card-image" style="background-image:url('/images/101a.webp')"><span class="cuisine-badge">مطعم نُزُل</span><span class="discount-tag">🎟️ خصم 10 بالمئة</span></div>
        <div class="card-body">
          <h3>Red Canyon Lodge</h3>
          <p class="card-address">📍 <bdi>2450 Red Canyon Rd, Dutch John, UT 84023</bdi></p>
          <p class="card-description">على بعد نحو ساعة شمالًا باتجاه Flaming Gorge، لكن المشهد وحده يستحقّ الرحلة. طعام ممتاز في نُزُل جبلي بديع.</p>
          <div class="card-actions">
            <a href="tel:+14358892090" class="card-action-btn action-call">📞 اتصل</a>
            <a href="https://www.redcanyonlodge.com" target="_blank" rel="noopener" class="card-action-btn action-website">🌐 الموقع</a>
            <a href="https://maps.google.com/?q=Red+Canyon+Lodge+Dutch+John+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 الخريطة</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ خصم ضيوف الجولات</div>
            <div class="coupon-row"><div class="coupon-code">ATV-CANYON10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-CANYON10')">انسخ</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Red Canyon Lodge','ATV-CANYON10','خصم 10 بالمئة على الطعام')">📱 أظهرها للنادل</button>
            <p class="coupon-note">صالحة مع تأكيد حجز لدى Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- Plaza Mexicana -->
      <div class="restaurant-card" data-category="mexican">
        <div class="card-image" style="background-image:url('/images/102a.webp')"><span class="cuisine-badge">مكسيكي</span><span class="discount-tag">🎟️ خصم 10 بالمئة</span></div>
        <div class="card-body">
          <h3>Plaza Mexicana</h3>
          <p class="card-address">📍 <bdi>55 E Main St., Vernal, UT 84078</bdi></p>
          <p class="card-description">نكهات أصيلة وأجواء مرحّبة، ومن المطاعم التي تعود إليها العائلات في كل زيارة إلى Vernal. والإنشيلادا والتشيلي الأخضر من أبرز أطباقه.</p>
          <div class="card-actions">
            <a href="tel:+14357893340" class="card-action-btn action-call">📞 اتصل</a>
            <a href="https://maps.google.com/?q=Plaza+Mexicana+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 الخريطة</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ خصم ضيوف الجولات</div>
            <div class="coupon-row"><div class="coupon-code">ATV-PLAZA10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-PLAZA10')">انسخ</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Plaza Mexicana','ATV-PLAZA10','خصم 10 بالمئة على طلبك')">📱 أظهرها للنادل</button>
            <p class="coupon-note">صالحة مع تأكيد حجز لدى Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- Mi Hacienda -->
      <div class="restaurant-card" data-category="mexican">
        <div class="card-image" style="background-image:url('/images/103a.webp')"><span class="cuisine-badge">مكسيكي</span><span class="discount-tag">🎟️ خصم 15 بالمئة</span></div>
        <div class="card-body">
          <h3>Mi Hacienda</h3>
          <p class="card-address">📍 <bdi>2075 US-40, Suite A, Vernal, UT 84078 (Towne Center)</bdi></p>
          <p class="card-description">من أشهر مطاعم البلدة بلا منازع. تاكو ممتاز وإنشيلادا متقنة، والمارغريتا هي بالضبط ما تريده بعد أصيل مغبرّ على المسارات.</p>
          <div class="card-actions">
            <a href="tel:+14357810099" class="card-action-btn action-call">📞 <bdi>(435) 781-0099</bdi></a>
            <a href="https://maps.google.com/?q=Mi+Hacienda+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 الخريطة</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ خصم ضيوف الجولات</div>
            <div class="coupon-row"><div class="coupon-code">ATV-MIH15</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-MIH15')">انسخ</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Mi Hacienda','ATV-MIH15','خصم 15 بالمئة على طلبك')">📱 أظهرها للنادل</button>
            <p class="coupon-note">صالحة مع تأكيد حجز لدى Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- Canton Canyon City -->
      <div class="restaurant-card" data-category="mexican">
        <div class="card-image" style="background-image:url('/images/104a.png')"><span class="cuisine-badge">صيني</span><span class="discount-tag">🎟️ خصم 10 بالمئة</span></div>
        <div class="card-body">
          <h3>Canton Canyon City Chinese Restaurant</h3>
          <p class="card-address">📍 <bdi>1175 W Hwy 40, Vernal, UT 84078</bdi></p>
          <p class="card-description">خيار موثوق للمطبخ الصيني بحصص سخيّة. وحين تريد استراحة من البرغر وشرائح اللحم، يفي Canton بالغرض. وقائمته مناسبة للعائلات.</p>
          <div class="card-actions">
            <a href="tel:+14357891388" class="card-action-btn action-call">📞 اتصل</a>
            <a href="https://maps.google.com/?q=Canton+Canyon+City+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 الخريطة</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ خصم ضيوف الجولات</div>
            <div class="coupon-row"><div class="coupon-code">ATV-CANTON10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-CANTON10')">انسخ</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('Canton Canyon City','ATV-CANTON10','خصم 10 بالمئة على طلبك')">📱 أظهرها للنادل</button>
            <p class="coupon-note">صالحة مع تأكيد حجز لدى Adventure Tours</p>
          </div>
        </div>
      </div>

      <!-- La Cabaña -->
      <div class="restaurant-card" data-category="mexican">
        <div class="card-image" style="background-image:url('/images/98a.webp')"><span class="cuisine-badge">مكسيكي</span><span class="discount-tag">🎟️ خصم 10 بالمئة</span></div>
        <div class="card-body">
          <h3>La Cabaña</h3>
          <p class="card-address">📍 <bdi>120 E Main St, Vernal, UT 84078</bdi></p>
          <p class="card-description">طعام مكسيكي أصيل في وسط المدينة مباشرة: فاهيتا تُقدَّم وهي تُزَقزِق، وإنشيلادا ملفوفة يدويًا، وتاكو على طريقة الشارع. مقصد محلي محبوب منذ زمن لوجبة دسمة بعد الجولة.</p>
          <div class="card-actions">
            <a href="tel:+14357893151" class="card-action-btn action-call">📞 اتصل</a>
            <a href="https://maps.google.com/?q=La+Cabana+Restaurant+Vernal+UT" target="_blank" rel="noopener" class="card-action-btn action-map">📍 الخريطة</a>
          </div>
          <div class="coupon-section">
            <div class="coupon-label">🎟️ خصم ضيوف الجولات</div>
            <div class="coupon-row"><div class="coupon-code">ATV-CABANA10</div><button class="coupon-copy-btn" onclick="copyCoupon(this,'ATV-CABANA10')">انسخ</button></div>
            <button class="coupon-copy-btn coupon-show-btn" onclick="showCouponModal('La Cabaña','ATV-CABANA10','خصم 10 بالمئة على طلبك')">📱 أظهرها للنادل</button>
            <p class="coupon-note">صالحة مع تأكيد حجز لدى Adventure Tours</p>
          </div>
        </div>
      </div>

    </div>

    <!-- نصائح -->
    <section>
      <div class="section-header"><h2 class="section-title">نصائح لتناول الطعام في Vernal</h2><p class="section-subtitle">بضعة أمور تعرفها قبل خروجك للأكل.</p></div>
      <div class="rest-tips-grid">
        <div class="rest-tip-card"><div class="rest-tip-icon">⏰</div><h3>خطّط حول مواعيد الجولات</h3><p>تستغرق <a href="/ar/utv/" style="color:var(--burnt-orange);font-weight:600">جولات UTV</a> لدينا نحو 3 ساعات. ومن يركب صباحًا يجوع مع أوائل العصر. أما جولات المساء فتوجّه بعدها مباشرة إلى Swain's أو Plaza Mexicana.</p></div>
        <div class="rest-tip-card"><div class="rest-tip-icon">📅</div><h3>عطلة نهاية الأسبوع مزدحمة</h3><p>تمتلئ الأماكن الشهيرة ليلتَي الجمعة والسبت، خصوصًا في الصيف. ومعك مجموعة؟ اتصل مسبقًا لحجز طاولة في Swain's أو <bdi>7-11 Ranch</bdi>.</p></div>
        <div class="rest-tip-card"><div class="rest-tip-icon">💵</div><h3>النقد ما يزال مفيدًا</h3><p>تقبل معظم المطاعم البطاقات، لكن بعض المقاهي الصغيرة تفضّل النقد. أبقِ شيئًا منه معك عند زيارة أرياف يوتا.</p></div>
        <div class="rest-tip-card"><div class="rest-tip-icon">🦕</div><h3>متوجّه إلى النصب؟</h3><p>تناول وجبة في وسط المدينة على الشارع الرئيسي قبل القيادة شرقًا إلى <a href="https://www.nps.gov/dino" target="_blank" rel="noopener" style="color:var(--burnt-orange);font-weight:600">Dinosaur National Monument</a>. ومطعما La Cabaña وPlaza Mexicana محطتان سريعتان دسمتان في طريق الخروج.</p></div>
      </div>
    </section>

    <!-- الأسئلة الشائعة -->
    <section class="article-faq" style="background:white;border-radius:25px;padding:50px 45px;box-shadow:0 20px 60px rgba(0,0,0,0.08);border:1px solid rgba(212,118,78,0.1);margin-bottom:50px">
      <h2 style="font-family:var(--font-heading);font-size:1.6rem;font-weight:700;color:var(--charcoal);text-align:center;margin-bottom:30px;border:none;padding:0">الأسئلة الشائعة</h2>
      <div class="faq-item"><h3>ما أفضل المطاعم في Vernal بولاية يوتا؟</h3><p>من أبرز الاختيارات مطعم 4 Brothers Pizza للأكل غير الرسمي، وBetty's Café للفطور، وSwain's Steakhouse لعشاء جالس، وPlaza Mexicana للطعام المكسيكي الأصيل. ويحصل ضيوف الجولات على رموز خصم حصرية في كل واحد منها.</p></div>
      <div class="faq-item"><h3>هل توجد مطاعم قرب Dinosaur National Monument؟</h3><p>نعم. Vernal هي البلدة البوابة، وكل المطاعم في هذه الصفحة على بعد قيادة قصيرة من النصب. ومطاعم وسط المدينة مثل La Cabaña وPlaza Mexicana على الشارع الرئيسي محطة سهلة في الطريق شرقًا نحو Quarry Visitor Center.</p></div>
      <div class="faq-item"><h3>كيف أستخدم رموز خصم الطعام من Adventure Tours؟</h3><p>لكل بطاقة مطعم رمز قسيمة خاصّ بها. اضغط «أظهرها للنادل» لعرض قسيمة بملء الشاشة على هاتفك، أو اذكر الرمز عند الطلب. وهي صالحة مع حجز مؤكّد لدى Adventure Tours.</p></div>
      <div class="faq-item"><h3>أين ينبغي أن آكل بعد جولة UTV؟</h3><p>بعد جولة مدتها 3 ساعات يريد معظم الضيوف شيئًا دسمًا. ومطاعم 4 Brothers Pizza وCountry Grub و<bdi>7-11 Ranch</bdi> اختيارات شائعة بعد الجولة بحصص سخيّة.</p></div>
      <div class="faq-item"><h3>هل توجد مطاعم فاخرة في Vernal؟</h3><p>مشهد Vernal أقرب إلى غير الرسمي، لكن Swain's Steakhouse وRed Canyon Lodge قرب Flaming Gorge يقدّمان تجربتَي جلوس راقيتين تستحقّان الزيارة.</p></div>
    </section>

    <!-- دعوة إلى الحجز -->
    <div class="article-cta" style="border-radius:25px">
      <h3>هل أنت مستعدّ لاستكشاف Vernal؟</h3>
      <p>احجز جولة UTV مُرشَدة بين النقوش الصخرية القديمة وأخاديد الصخر الأحمر ومسارات الصحراء، ثم افتح خصومات طعام حصرية في كل مطعم على هذه الصفحة.</p>
      <a href="/ar/booking/" class="cta-btn">احجز جولتك</a>
      <a href="tel:+14352199447" class="cta-phone">📞 <bdi>(435) 219-9447</bdi></a>
    </div>

    <!-- ذات صلة -->
    <div class="related-articles">
      <h3>مزيد من أدلّة السفر إلى Vernal</h3>
      <div class="related-grid">
        <a href="/ar/utv/best-utv-trails-vernal/" class="related-card"><h4>أفضل مسارات UTV قرب Vernal</h4><p>أبرز المسارات الوعرة في منطقة Uintah Basin، من المبتدئ إلى الخبير.</p></a>
        <a href="/ar/guides/vernal-weather-guide/" class="related-card"><h4>دليل طقس Vernal</h4><p>خطّط لأنشطتك في الهواء الطلق حول طقس Vernal الموسمي.</p></a>
        <a href="/ar/guides/what-to-wear-utv-tour/" class="related-card"><h4>ماذا ترتدي في جولة UTV</h4><p>الطبقات والوقاية من الشمس والأحذية لجولات الصحراء.</p></a>
        <a href="/ar/dinosaur-national-monument/petroglyphs-rock-art-vernal/" class="related-card"><h4>النقوش والفنون الصخرية</h4><p>فنون Fremont وUte الصخرية القديمة في جولاتنا المُرشَدة.</p></a>
      </div>
    </div>
  </main>

  <script is:inline>
    document.querySelectorAll('.filter-btn').forEach(function(btn){btn.addEventListener('click',function(){document.querySelectorAll('.filter-btn').forEach(function(b){b.classList.remove('active')});btn.classList.add('active');var f=btn.dataset.filter;document.querySelectorAll('.restaurant-card').forEach(function(c){if(f==='all'||c.dataset.category===f){c.classList.remove('hidden');c.style.animation='fadeInUp 0.4s ease forwards'}else{c.classList.add('hidden')}})})});
    function copyCoupon(btn,code){navigator.clipboard?navigator.clipboard.writeText(code).then(function(){btn.textContent='✓ تم النسخ!';btn.classList.add('copied');setTimeout(function(){btn.textContent='انسخ';btn.classList.remove('copied')},2000)}):function(){var e=document.createElement('textarea');e.value=code;document.body.appendChild(e);e.select();document.execCommand('copy');document.body.removeChild(e);btn.textContent='✓ تم النسخ!';btn.classList.add('copied');setTimeout(function(){btn.textContent='انسخ';btn.classList.remove('copied')},2000)}()}
    function showCouponModal(r,c,d){document.getElementById('modalRestaurant').textContent=r;document.getElementById('modalCode').textContent=c;document.getElementById('modalDiscount').textContent=d;document.getElementById('couponModal').classList.add('visible');document.body.style.overflow='hidden'}
    document.getElementById('couponModalClose').addEventListener('click',function(){document.getElementById('couponModal').classList.remove('visible');document.body.style.overflow=''});
    document.getElementById('couponModal').addEventListener('click',function(e){if(e.target===e.currentTarget){document.getElementById('couponModal').classList.remove('visible');document.body.style.overflow=''}});
  </script>
`;

export function getBodyHtml(locale: string = DEFAULT_LOCALE): string {
  if (locale === 'ar') return AR;
  if (locale === 'es') return ES;
  if (locale === 'it') return IT;
  if (locale === 'pt') return PT;
  if (locale === 'fr') return FR;
  if (locale === 'de') return DE;
  if (locale === 'zh') return ZH;
  if (locale === 'ja') return JA;
  return bodyHtml;
}
