// faq.ts — extracted page body content (P2C). English source of truth
// for this page's body; rendered via set:html. Spanish variant added
// P3A (formal "usted").
import { SITE } from '../config/site';
import { DEFAULT_LOCALE } from '../lib/i18n';

export const bodyHtml = `

<!-- ================================================
     PAGE SUMMARY BLOCK — feeds Google AI Overviews
     ================================================ -->
<p class="page-summary" style="position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;" aria-hidden="false">
  Adventure Tours Vernal answers frequently asked questions about guided UTV tours in Vernal, Utah. Topics include pricing, age requirements, what to bring, weather policy, group tours, and tour options. Open daily 7am–7pm. Call (435) 219-9447.
</p>

<section id="faq" class="faq-section">
  <div class="faq-watermark">INTEL</div>

  <div class="container">
    <div class="section-header">
      <span class="status-badge">MISSION PREP</span>
      <!-- ================================================
           H1 — Added. Page had no H1 at all.
           Original H2 "Frequently Asked Questions" kept
           as H2 below for content hierarchy.
           ================================================ -->
      <h1 class="section-title" style="font-size:clamp(1.8rem,3.5vw,2.8rem);">UTV Tour FAQ — Adventure Tours Vernal</h1>
      <p class="section-subtitle">Gear up with the facts before you head into the Utah backcountry.</p>
      <p style="display:inline-flex;align-items:center;gap:8px;margin:14px auto 0;padding:7px 15px;border:1px solid rgba(212,118,78,0.5);border-radius:999px;background:#ffffff;box-shadow:0 1px 4px rgba(0,0,0,0.08);font-size:0.95rem;color:#4a4139;"><span aria-hidden="true" style="color:#e6a817;letter-spacing:1px;">★★★★★</span> <span><strong>${SITE.rating.value}</strong> &middot; ${SITE.rating.count} Google reviews</span></p>
    </div>

    <!-- ================================================
         ALL 15 FAQ ITEMS inside faq-container.
         Items 8-15 were previously outside this div
         which caused a structural/rendering bug.
         ================================================ -->
    <div class="faq-container">

      <div class="faq-item">
        <input type="checkbox" id="faq1" class="faq-toggle">
        <label for="faq1" class="faq-question">
          <span class="faq-index">01</span> CAN I BRING MY OWN MACHINE?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p><strong>You better believe it!</strong> Bringing your own machine allows more catered and even extreme rides. You can book online, but for a bring-your-own-machine or custom ride it's best to call or email us first to explain the type of riding you want to do.</p>
            <p>We provide Walkie Talkies and do our best to make sure everyone is having a blast (while staying comfortable.) On the more "hardcore" sections of a trail, we are happy to offer easier alternatives. We pride ourselves on knowing these areas extremely well and the numerous ways to enjoy them!</p>
            <p>Please communicate freely with your tour guide. If you do not feel comfortable navigating a certain part of the trail, please say so! Safety is priority number 1, followed closely by enjoyment.</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq2" class="faq-toggle">
        <label for="faq2" class="faq-question">
          <span class="faq-index">02</span> CAN I BRING A GROUP?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>Absolutely! Please contact us for your group tours. Let us know how big your group is and what you would like to see. We have many options and can discuss your needs for the group such as additional sights to stop and see, restaurants and hotel accommodations, bars, nightlife, kid-friendly activities, etc. We'd love to be a part of your group activities while you visit the beautiful Uintah Basin.</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq3" class="faq-toggle">
        <label for="faq3" class="faq-question">
          <span class="faq-index">03</span> WHAT ABOUT THE WEATHER?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>We operate sunshine or rain. However, in cases of extreme weather or in the event that we must cancel for other unforeseen circumstances, you will have the option to reschedule or receive a full refund.</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq4" class="faq-toggle">
        <label for="faq4" class="faq-question">
          <span class="faq-index">04</span> WHAT SHOULD I BRING?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>We will be outside for hours, please use good discretion. We do our best to keep emergency toilet paper and other essentials on hand for every tour. Nevertheless, if you think you might need it, best to bring it! Sunscreen, bugspray, and chapstick are never a bad idea.</p>
            <p>We suggest you bring <strong>sunglasses, a hat, a camera, a jacket, and closed-toe shoes.</strong> These are not required (but better to have it and not need it, right?) You may also wish to dress in layers as the temperature can fluctuate. We provide complimentary water and a small snack. If you have any allergies we recommend you bring something specific to your dietary restrictions. There is only so much room on the back of a side-by-side, so if you aren't sure what to pack, just ask!</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq5" class="faq-toggle">
        <label for="faq5" class="faq-question">
          <span class="faq-index">05</span> WHEN SHOULD I GET TO THE MEETING SPOT?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>For all tours please arrive <strong>30 minutes prior</strong> to your departure time. The tour reservation time is the actual departure time. We will not depart until all safety training is complete and you are familiar with your vehicle. Prior to departure, we will go over all orientation and safety measures such as waivers, gear selection, etc.</p>
            <p>After completing your reservation, you will receive an email confirmation containing important information about your selected tour. Please follow and read carefully. If you are not here with all business complete and gear selected when orientation begins, you may lose your spot on the tour, which is non-refundable. Like catching a school bus... if you're not there at the allotted time, you will get left behind!</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq6" class="faq-toggle">
        <label for="faq6" class="faq-question">
          <span class="faq-index">06</span> HOW OLD DO I HAVE TO BE?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>To drive our machines, you need to be at least <strong>18 years of age.</strong> To ride in our machines, you need to be at least <strong>2 years of age.</strong></p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq7" class="faq-toggle">
        <label for="faq7" class="faq-question">
          <span class="faq-index">07</span> CANCELLATION AND DEPOSITS?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>Click <a href="/cancellation-policy/" class="faq-link">HERE</a> for the full cancellation policy.</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq8" class="faq-toggle">
        <label for="faq8" class="faq-question">
          <span class="faq-index">08</span> HOW MUCH DO ATV TOURS COST?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>We offer one guided 3-hour tour on Kawasaki KRX 1000 side-by-sides:</p>
            <ul>
              <li><strong>$349 per machine</strong> — seats up to 2 riders</li>
              <li><strong>$125 ride-along</strong> — add a third rider as a passenger with a guide</li>
              <li><strong>$99 per hour</strong> — per machine, to extend your tour</li>
            </ul>
            <p>A 3-person minimum applies, and groups of up to 12 guests (6 machines) are welcome. <strong>Call <a href="tel:435-219-9447" class="faq-link">(435) 219-9447</a> for availability.</strong></p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq9" class="faq-toggle">
        <label for="faq9" class="faq-question">
          <span class="faq-index">09</span> DO I NEED ATV EXPERIENCE?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p><strong>No ATV experience is required!</strong> Adventure Tours Vernal welcomes complete beginners and provides full safety training before every tour.</p>
            <p>Our experienced guides walk you through operating the Kawasaki KRX 1000 side-by-sides step-by-step. We welcome all skill levels - from first-timers to experienced riders.</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq10" class="faq-toggle">
        <label for="faq10" class="faq-question">
          <span class="faq-index">10</span> CAN WE VISIT DINOSAUR NATIONAL MONUMENT?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p><strong>Yes!</strong> Our guided <strong>3-hour UTV tour</strong> explores backcountry trails near Dinosaur National Monument, including ancient rock formations and petroglyphs.</p>
            <p>The monument's famous wall of dinosaur bones is a separate National Park Service site — many guests pair a morning at the monument with an afternoon UTV tour through the surrounding Dinosaur Country backcountry.</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq11" class="faq-toggle">
        <label for="faq11" class="faq-question">
          <span class="faq-index">11</span> WHY CHOOSE ADVENTURE TOURS VERNAL?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>Adventure Tours Vernal is the <strong>only guided Kawasaki KRX 1000 tour company in Vernal, Utah.</strong> We offer exclusive access to:</p>
            <ul>
              <li>Hidden trails known only to locals</li>
              <li>Ancient petroglyphs and rock art</li>
              <li>Butch Cassidy hideouts</li>
              <li>Scenic arches and formations</li>
            </ul>
            <p>Expert local guides, professional safety equipment, and all skill levels welcome. <strong>Open daily 7am–7pm.</strong></p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq12" class="faq-toggle">
        <label for="faq12" class="faq-question">
          <span class="faq-index">12</span> HOW LONG ARE YOUR TOURS?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>Our standard guided tour runs about <strong>3 hours</strong>, with a choice of five trail systems to match your group and experience level:</p>
            <ul>
              <li><strong>Doc's Beach</strong>, <strong>Moonshine Arch</strong>, <strong>Ashley Gorge</strong>, <strong>Outlaw Trail</strong>, and <strong>Asphalt Ridge</strong></li>
              <li>You choose your trail system when you book</li>
              <li>Want more time? Extend for $99 per hour per machine</li>
            </ul>
            <p>Every tour includes safety equipment, training, water, and snacks.</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq13" class="faq-toggle">
        <label for="faq13" class="faq-question">
          <span class="faq-index">13</span> ARE YOUR TOURS FAMILY-FRIENDLY?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p><strong>Absolutely!</strong> Our guided tour is perfect for families with children. It features:</p>
            <ul>
              <li>Easy trails with gentle terrain</li>
              <li>Stunning desert vistas</li>
              <li>Photo opportunities</li>
              <li>2-seater side-by-sides; families book multiple machines to ride together</li>
            </ul>
            <p>No experience needed — full safety training provided. Kids must be at least 2 years old to ride as passengers.</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq14" class="faq-toggle">
        <label for="faq14" class="faq-question">
          <span class="faq-index">14</span> WHAT ARE YOUR HOURS?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>Adventure Tours Vernal is <strong>open daily from 7:00 AM to 7:00 PM</strong> Mountain Time, 7 days a week.</p>
            <p><strong>Call <a href="tel:435-219-9447" class="faq-link">(435) 219-9447</a></strong> to book your ATV tour or visit <a href="https://adventuretoursvernal.com" class="faq-link">adventuretoursvernal.com</a>.</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq15" class="faq-toggle">
        <label for="faq15" class="faq-question">
          <span class="faq-index">15</span> WHAT TOUR OPTIONS DO YOU OFFER?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>Adventure Tours Vernal offers one guided 3-hour tour on Kawasaki KRX 1000 side-by-sides, with a choice of five trail systems selected when you book:</p>
            <ul>
              <li>Doc's Beach</li>
              <li>Moonshine Arch</li>
              <li>Ashley Gorge</li>
              <li>Outlaw Trail</li>
              <li>Asphalt Ridge</li>
            </ul>
            <p>Every tour includes Kawasaki KRX 1000 side-by-sides, expert local guides, safety equipment, training, water, and snacks.</p>
          </div>
        </div>
      </div>

    </div><!-- end .faq-container -->
  </div>
</section>

<!-- Mobile Sticky CTA -->
<div class="mobile-sticky-cta">
  <button onclick="location.href='/booking/'">Book Your Ride Now</button>
</div>

<script is:inline>
document.addEventListener('DOMContentLoaded', function() {

  // Auto-close other FAQs when one opens
  const faqToggles = document.querySelectorAll('.faq-toggle');
  faqToggles.forEach(toggle => {
    toggle.addEventListener('change', function() {
      if (this.checked) {
        faqToggles.forEach(otherToggle => {
          if (otherToggle !== this && otherToggle.checked) {
            otherToggle.checked = false;
          }
        });
        setTimeout(() => {
          this.parentElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 300);
      }
    });
  });

  // Keyboard navigation
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach((question, index) => {
    question.setAttribute('tabindex', '0');
    question.setAttribute('role', 'button');
    question.setAttribute('aria-expanded', 'false');
    question.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const checkbox = this.previousElementSibling;
        checkbox.checked = !checkbox.checked;
        this.setAttribute('aria-expanded', checkbox.checked);
        checkbox.dispatchEvent(new Event('change'));
      }
      if (e.key === 'ArrowDown') { e.preventDefault(); if (faqQuestions[index + 1]) faqQuestions[index + 1].focus(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); if (faqQuestions[index - 1]) faqQuestions[index - 1].focus(); }
    });
    question.addEventListener('click', function() {
      const checkbox = this.previousElementSibling;
      setTimeout(() => { this.setAttribute('aria-expanded', checkbox.checked); }, 10);
    });
  });

  // URL hash linking
  if (window.location.hash) {
    const targetId = window.location.hash.substring(1);
    const targetCheckbox = document.getElementById(targetId);
    if (targetCheckbox && targetCheckbox.classList.contains('faq-toggle')) {
      targetCheckbox.checked = true;
      setTimeout(() => {
        targetCheckbox.parentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 500);
    }
  }

  // Smooth load animation
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    setTimeout(() => {
      item.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }, 100 * index);
  });
});
</script>

`;

const ES = `

<!-- ================================================
     BLOQUE DE RESUMEN DE PÁGINA — para Google AI Overviews
     ================================================ -->
<p class="page-summary" style="position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;" aria-hidden="false">
  Adventure Tours Vernal responde las preguntas frecuentes sobre los tours guiados en UTV en Vernal, Utah. Los temas incluyen precios, requisitos de edad, qué llevar, política de clima, tours grupales y opciones de tour. Abierto todos los días de 7am a 7pm. Llame al (435) 219-9447.
</p>

<section id="faq" class="faq-section">
  <div class="faq-watermark">INTEL</div>

  <div class="container">
    <div class="section-header">
      <span class="status-badge">PREPARACIÓN DE MISIÓN</span>
      <h1 class="section-title" style="font-size:clamp(1.8rem,3.5vw,2.8rem);">Preguntas Frecuentes sobre Tours en UTV — Adventure Tours Vernal</h1>
      <p class="section-subtitle">Prepárese con los datos antes de adentrarse en la zona agreste de Utah.</p>
      <p style="display:inline-flex;align-items:center;gap:8px;margin:14px auto 0;padding:7px 15px;border:1px solid rgba(212,118,78,0.5);border-radius:999px;background:#ffffff;box-shadow:0 1px 4px rgba(0,0,0,0.08);font-size:0.95rem;color:#4a4139;"><span aria-hidden="true" style="color:#e6a817;letter-spacing:1px;">★★★★★</span> <span><strong>${SITE.rating.value}</strong> &middot; ${SITE.rating.count} reseñas de Google</span></p>
    </div>

    <div class="faq-container">

      <div class="faq-item">
        <input type="checkbox" id="faq1" class="faq-toggle">
        <label for="faq1" class="faq-question">
          <span class="faq-index">01</span> ¿PUEDO TRAER MI PROPIA MÁQUINA?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p><strong>¡Claro que sí!</strong> Traer su propia máquina permite recorridos más personalizados e incluso más extremos. Puede reservar en línea, pero para traer su propia máquina o un recorrido personalizado, lo mejor es llamarnos o escribirnos primero para explicarnos el tipo de recorrido que desea hacer.</p>
            <p>Proporcionamos radios portátiles y hacemos todo lo posible para que todos la pasen increíble (manteniéndose cómodos). En las secciones más "intensas" de un sendero, con gusto ofrecemos alternativas más sencillas. Nos enorgullece conocer estas áreas a fondo y las muchas formas de disfrutarlas.</p>
            <p>Comuníquese libremente con su guía. Si no se siente cómodo recorriendo cierta parte del sendero, ¡dígalo! La seguridad es la prioridad número uno, seguida muy de cerca por la diversión.</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq2" class="faq-toggle">
        <label for="faq2" class="faq-question">
          <span class="faq-index">02</span> ¿PUEDO TRAER UN GRUPO?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>¡Por supuesto! Contáctenos para sus tours grupales. Cuéntenos qué tan grande es su grupo y qué le gustaría ver. Tenemos muchas opciones y podemos conversar sobre las necesidades de su grupo, como lugares adicionales para visitar, restaurantes y alojamiento en hoteles, bares, vida nocturna y actividades para niños en la Cuenca de Uintah. Nos encantaría formar parte de las actividades de su grupo durante su visita a la hermosa Cuenca de Uintah.</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq3" class="faq-toggle">
        <label for="faq3" class="faq-question">
          <span class="faq-index">03</span> ¿QUÉ PASA CON EL CLIMA?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>Operamos con sol o lluvia. Sin embargo, en casos de clima extremo o si debemos cancelar por otras circunstancias imprevistas, usted tendrá la opción de reprogramar o recibir un reembolso completo.</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq4" class="faq-toggle">
        <label for="faq4" class="faq-question">
          <span class="faq-index">04</span> ¿QUÉ DEBO LLEVAR?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>Estaremos afuera durante horas, así que use buen criterio. Hacemos lo posible por tener papel higiénico de emergencia y otros artículos esenciales disponibles en cada tour. Aun así, si cree que podría necesitar algo, ¡mejor tráigalo! El protector solar, el repelente de insectos y el bálsamo labial nunca están de más.</p>
            <p>Le sugerimos traer <strong>lentes de sol, un sombrero, una cámara, una chaqueta y zapatos cerrados.</strong> Esto no es obligatorio (pero es mejor tenerlo y no necesitarlo, ¿verdad?). También puede vestirse en capas, ya que la temperatura puede variar. Ofrecemos agua y un pequeño refrigerio de cortesía. Si tiene alguna alergia, le recomendamos traer algo específico para sus restricciones alimenticias. Hay espacio limitado en la parte trasera de un UTV, así que si no está seguro de qué llevar, ¡solo pregunte!</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq5" class="faq-toggle">
        <label for="faq5" class="faq-question">
          <span class="faq-index">05</span> ¿CUÁNDO DEBO LLEGAR AL PUNTO DE ENCUENTRO?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>Para todos los tours, por favor llegue <strong>30 minutos antes</strong> de su hora de salida. La hora de la reserva del tour es la hora real de salida. No saldremos hasta que se complete toda la capacitación de seguridad y usted esté familiarizado con su vehículo. Antes de la salida, repasaremos toda la orientación y las medidas de seguridad, como exenciones, selección de equipo, etc.</p>
            <p>Después de completar su reserva, recibirá un correo de confirmación con información importante sobre el tour seleccionado. Por favor léalo con atención. Si no está presente con todos los trámites completos y el equipo seleccionado cuando comience la orientación, podría perder su lugar en el tour, el cual no es reembolsable. Es como tomar el autobús escolar... ¡si no está ahí a la hora indicada, se quedará!</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq6" class="faq-toggle">
        <label for="faq6" class="faq-question">
          <span class="faq-index">06</span> ¿QUÉ EDAD DEBO TENER?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>Para conducir nuestras máquinas, debe tener al menos <strong>18 años de edad.</strong> Para viajar en nuestras máquinas, debe tener al menos <strong>2 años de edad.</strong></p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq7" class="faq-toggle">
        <label for="faq7" class="faq-question">
          <span class="faq-index">07</span> ¿CANCELACIONES Y DEPÓSITOS?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>Haga clic <a href="/es/cancellation-policy/" class="faq-link">AQUÍ</a> para ver la política de cancelación completa.</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq8" class="faq-toggle">
        <label for="faq8" class="faq-question">
          <span class="faq-index">08</span> ¿CUÁNTO CUESTAN LOS TOURS EN ATV?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>Ofrecemos un tour guiado de 3 horas en UTV Kawasaki KRX 1000:</p>
            <ul>
              <li><strong>$349 por máquina</strong> — para hasta 2 pasajeros</li>
              <li><strong>$125 por pasajero adicional</strong> — agregue un tercer pasajero con un guía</li>
              <li><strong>$99 por hora</strong> — por máquina, para extender su tour</li>
            </ul>
            <p>Se aplica un mínimo de 3 personas, y grupos de hasta 12 huéspedes (6 máquinas) son bienvenidos. <strong>Llame al <a href="tel:435-219-9447" class="faq-link">(435) 219-9447</a> para consultar disponibilidad.</strong></p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq9" class="faq-toggle">
        <label for="faq9" class="faq-question">
          <span class="faq-index">09</span> ¿NECESITO EXPERIENCIA EN ATV?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p><strong>¡No se necesita experiencia previa en ATV!</strong> Adventure Tours Vernal recibe con gusto a principiantes totales y ofrece capacitación de seguridad completa antes de cada tour.</p>
            <p>Nuestros guías experimentados le explican paso a paso cómo operar los UTV Kawasaki KRX 1000. Damos la bienvenida a todos los niveles de habilidad, desde quienes lo hacen por primera vez hasta conductores experimentados.</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq10" class="faq-toggle">
        <label for="faq10" class="faq-question">
          <span class="faq-index">10</span> ¿PODEMOS VISITAR EL MONUMENTO NACIONAL A LOS DINOSAURIOS?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p><strong>¡Sí!</strong> Nuestro <strong>tour guiado de 3 horas en UTV</strong> explora senderos de la zona agreste cerca de Dinosaur National Monument, incluyendo formaciones rocosas antiguas y petroglifos.</p>
            <p>El famoso muro de huesos de dinosaurio del monumento es un sitio independiente del Servicio de Parques Nacionales; muchos huéspedes combinan una mañana en el monumento con un tour en UTV por la tarde en la zona agreste circundante de Dinosaur Country.</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq11" class="faq-toggle">
        <label for="faq11" class="faq-question">
          <span class="faq-index">11</span> ¿POR QUÉ ELEGIR ADVENTURE TOURS VERNAL?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>Adventure Tours Vernal es la <strong>única empresa de tours guiados en Kawasaki KRX 1000 en Vernal, Utah.</strong> Ofrecemos acceso exclusivo a:</p>
            <ul>
              <li>Senderos ocultos conocidos solo por los locales</li>
              <li>Petroglifos antiguos y arte rupestre</li>
              <li>Escondites de Butch Cassidy</li>
              <li>Arcos y formaciones escénicas</li>
            </ul>
            <p>Guías locales expertos, equipo de seguridad profesional y todos los niveles de habilidad son bienvenidos. <strong>Abierto todos los días de 7am a 7pm.</strong></p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq12" class="faq-toggle">
        <label for="faq12" class="faq-question">
          <span class="faq-index">12</span> ¿CUÁNTO DURAN SUS TOURS?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>Nuestro tour guiado estándar dura aproximadamente <strong>3 horas</strong>, con una selección de cinco sistemas de senderos según su grupo y nivel de experiencia:</p>
            <ul>
              <li><strong>Doc's Beach</strong>, <strong>Moonshine Arch</strong>, <strong>Ashley Gorge</strong>, <strong>Outlaw Trail</strong> y <strong>Asphalt Ridge</strong></li>
              <li>Usted elige su sistema de senderos al reservar</li>
              <li>¿Quiere más tiempo? Extienda por $99 por hora por máquina</li>
            </ul>
            <p>Cada tour incluye equipo de seguridad, capacitación, agua y refrigerios.</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq13" class="faq-toggle">
        <label for="faq13" class="faq-question">
          <span class="faq-index">13</span> ¿SUS TOURS SON APTOS PARA FAMILIAS?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p><strong>¡Por supuesto!</strong> Nuestro tour guiado es perfecto para familias con niños. Incluye:</p>
            <ul>
              <li>Senderos fáciles con terreno suave</li>
              <li>Impresionantes vistas del desierto</li>
              <li>Oportunidades para fotos</li>
              <li>UTV de 2 asientos; las familias reservan varias máquinas para viajar juntas</li>
            </ul>
            <p>No se necesita experiencia; se ofrece capacitación de seguridad completa. Los niños deben tener al menos 2 años para viajar como pasajeros.</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq14" class="faq-toggle">
        <label for="faq14" class="faq-question">
          <span class="faq-index">14</span> ¿CUÁL ES SU HORARIO?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>Adventure Tours Vernal está <strong>abierto todos los días de 7:00am a 7:00pm</strong>, hora de la montaña, los 7 días de la semana.</p>
            <p><strong>Llame al <a href="tel:435-219-9447" class="faq-link">(435) 219-9447</a></strong> para reservar su tour en ATV o visite <a href="https://adventuretoursvernal.com" class="faq-link">adventuretoursvernal.com</a>.</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq15" class="faq-toggle">
        <label for="faq15" class="faq-question">
          <span class="faq-index">15</span> ¿QUÉ OPCIONES DE TOUR OFRECEN?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>Adventure Tours Vernal ofrece un tour guiado de 3 horas en UTV Kawasaki KRX 1000, con una selección de cinco sistemas de senderos al reservar:</p>
            <ul>
              <li>Doc's Beach</li>
              <li>Moonshine Arch</li>
              <li>Ashley Gorge</li>
              <li>Outlaw Trail</li>
              <li>Asphalt Ridge</li>
            </ul>
            <p>Cada tour incluye UTV Kawasaki KRX 1000, guías locales expertos, equipo de seguridad, capacitación, agua y refrigerios.</p>
          </div>
        </div>
      </div>

    </div><!-- end .faq-container -->
  </div>
</section>

<!-- Botón flotante para móvil -->
<div class="mobile-sticky-cta">
  <button onclick="location.href='/es/booking/'">Reserve Su Recorrido Ahora</button>
</div>

<script is:inline>
document.addEventListener('DOMContentLoaded', function() {

  // Auto-close other FAQs when one opens
  const faqToggles = document.querySelectorAll('.faq-toggle');
  faqToggles.forEach(toggle => {
    toggle.addEventListener('change', function() {
      if (this.checked) {
        faqToggles.forEach(otherToggle => {
          if (otherToggle !== this && otherToggle.checked) {
            otherToggle.checked = false;
          }
        });
        setTimeout(() => {
          this.parentElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 300);
      }
    });
  });

  // Keyboard navigation
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach((question, index) => {
    question.setAttribute('tabindex', '0');
    question.setAttribute('role', 'button');
    question.setAttribute('aria-expanded', 'false');
    question.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const checkbox = this.previousElementSibling;
        checkbox.checked = !checkbox.checked;
        this.setAttribute('aria-expanded', checkbox.checked);
        checkbox.dispatchEvent(new Event('change'));
      }
      if (e.key === 'ArrowDown') { e.preventDefault(); if (faqQuestions[index + 1]) faqQuestions[index + 1].focus(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); if (faqQuestions[index - 1]) faqQuestions[index - 1].focus(); }
    });
    question.addEventListener('click', function() {
      const checkbox = this.previousElementSibling;
      setTimeout(() => { this.setAttribute('aria-expanded', checkbox.checked); }, 10);
    });
  });

  // URL hash linking
  if (window.location.hash) {
    const targetId = window.location.hash.substring(1);
    const targetCheckbox = document.getElementById(targetId);
    if (targetCheckbox && targetCheckbox.classList.contains('faq-toggle')) {
      targetCheckbox.checked = true;
      setTimeout(() => {
        targetCheckbox.parentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 500);
    }
  }

  // Smooth load animation
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    setTimeout(() => {
      item.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }, 100 * index);
  });
});
</script>

`;

const IT = `

<!-- ================================================
     BLOCCO RIASSUNTO PAGINA — per Google AI Overviews
     ================================================ -->
<p class="page-summary" style="position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;" aria-hidden="false">
  Adventure Tours Vernal risponde alle domande più frequenti sui tour guidati in UTV a Vernal, Utah. Gli argomenti includono prezzi, requisiti di età, cosa portare, politica meteo, tour di gruppo e opzioni di tour. Aperto tutti i giorni dalle 7:00 alle 19:00. Chiami il (435) 219-9447.
</p>

<section id="faq" class="faq-section">
  <div class="faq-watermark">INTEL</div>

  <div class="container">
    <div class="section-header">
      <span class="status-badge">PREPARAZIONE MISSIONE</span>
      <h1 class="section-title" style="font-size:clamp(1.8rem,3.5vw,2.8rem);">Domande Frequenti sui Tour in UTV — Adventure Tours Vernal</h1>
      <p class="section-subtitle">Si prepari con le informazioni prima di addentrarsi nel backcountry dello Utah.</p>
      <p style="display:inline-flex;align-items:center;gap:8px;margin:14px auto 0;padding:7px 15px;border:1px solid rgba(212,118,78,0.5);border-radius:999px;background:#ffffff;box-shadow:0 1px 4px rgba(0,0,0,0.08);font-size:0.95rem;color:#4a4139;"><span aria-hidden="true" style="color:#e6a817;letter-spacing:1px;">★★★★★</span> <span><strong>${SITE.rating.value}</strong> &middot; ${SITE.rating.count} recensioni su Google</span></p>
    </div>

    <div class="faq-container">

      <div class="faq-item">
        <input type="checkbox" id="faq1" class="faq-toggle">
        <label for="faq1" class="faq-question">
          <span class="faq-index">01</span> POSSO PORTARE LA MIA MACCHINA?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p><strong>Certamente!</strong> Portare la propria macchina consente esperienze più personalizzate e persino più estreme. Può prenotare online, ma per portare la propria macchina o per un giro personalizzato è meglio chiamarci o scriverci prima per spiegarci il tipo di esperienza che desidera.</p>
            <p>Le forniamo radio ricetrasmittenti e facciamo del nostro meglio affinché tutti si divertano (restando comodi). Nei tratti più "impegnativi" di un sentiero, siamo lieti di offrire alternative più semplici. Siamo orgogliosi di conoscere queste zone a fondo e dei tanti modi per goderne!</p>
            <p>Comunichi liberamente con la sua guida. Se non si sente a proprio agio ad affrontare una parte del sentiero, lo dica pure! La sicurezza è la priorità numero uno, seguita da vicino dal divertimento.</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq2" class="faq-toggle">
        <label for="faq2" class="faq-question">
          <span class="faq-index">02</span> POSSO PORTARE UN GRUPPO?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>Assolutamente sì! La preghiamo di contattarci per i tour di gruppo. Ci faccia sapere quanto è grande il Suo gruppo e cosa vorrebbe vedere. Abbiamo molte opzioni e possiamo discutere le esigenze del Suo gruppo, come luoghi aggiuntivi da visitare, ristoranti e sistemazioni in hotel, bar, vita notturna, attività adatte ai bambini, ecc. Saremmo lieti di far parte delle attività del Suo gruppo durante la Sua visita alla splendida Uintah Basin.</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq3" class="faq-toggle">
        <label for="faq3" class="faq-question">
          <span class="faq-index">03</span> COSA SUCCEDE IN CASO DI MALTEMPO?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>Operiamo con sole o pioggia. Tuttavia, in caso di condizioni meteo estreme o qualora dovessimo annullare per altre circostanze impreviste, avrà la possibilità di riprogrammare o ricevere un rimborso completo.</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq4" class="faq-toggle">
        <label for="faq4" class="faq-question">
          <span class="faq-index">04</span> COSA DEVO PORTARE?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>Saremo all'aperto per ore, La preghiamo di usare buon senso. Facciamo del nostro meglio per avere carta igienica di emergenza e altri articoli essenziali a disposizione per ogni tour. Tuttavia, se pensa di averne bisogno, è meglio portarlo! Crema solare, spray antizanzare e burrocacao non sono mai una cattiva idea.</p>
            <p>Le consigliamo di portare <strong>occhiali da sole, un cappello, una macchina fotografica, una giacca e scarpe chiuse.</strong> Non sono obbligatori (ma è meglio averli e non averne bisogno, no?) Può anche vestirsi a strati poiché la temperatura può variare. Offriamo acqua e uno snack leggero in omaggio. In caso di allergie, Le consigliamo di portare qualcosa di specifico per le Sue esigenze alimentari. Lo spazio nella parte posteriore di un side-by-side è limitato, quindi se non è sicuro di cosa portare, ci chieda pure!</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq5" class="faq-toggle">
        <label for="faq5" class="faq-question">
          <span class="faq-index">05</span> QUANDO DEVO ARRIVARE AL PUNTO DI RITROVO?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>Per tutti i tour, La preghiamo di arrivare <strong>30 minuti prima</strong> dell'orario di partenza. L'orario di prenotazione del tour corrisponde all'orario effettivo di partenza. Non partiremo finché tutta la formazione sulla sicurezza non sarà completata e Lei non avrà preso familiarità con il Suo veicolo. Prima della partenza, esamineremo insieme l'orientamento e le misure di sicurezza, come le liberatorie, la scelta dell'equipaggiamento, ecc.</p>
            <p>Dopo aver completato la prenotazione, riceverà un'email di conferma con informazioni importanti sul tour selezionato. La preghiamo di seguirla e leggerla attentamente. Se non sarà presente con tutte le pratiche completate e l'equipaggiamento scelto all'inizio dell'orientamento, potrebbe perdere il Suo posto nel tour, che non è rimborsabile. Come per un autobus scolastico... se non è lì all'orario stabilito, resterà a terra!</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq6" class="faq-toggle">
        <label for="faq6" class="faq-question">
          <span class="faq-index">06</span> QUANTI ANNI DEVO AVERE?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>Per guidare le nostre macchine, deve avere almeno <strong>18 anni di età.</strong> Per viaggiare a bordo delle nostre macchine, deve avere almeno <strong>2 anni di età.</strong></p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq7" class="faq-toggle">
        <label for="faq7" class="faq-question">
          <span class="faq-index">07</span> CANCELLAZIONI E DEPOSITI?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>Clicchi <a href="/it/cancellation-policy/" class="faq-link">QUI</a> per la politica di cancellazione completa.</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq8" class="faq-toggle">
        <label for="faq8" class="faq-question">
          <span class="faq-index">08</span> QUANTO COSTANO I TOUR IN ATV?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>Offriamo un tour guidato di 3 ore su side-by-side Kawasaki KRX 1000:</p>
            <ul>
              <li><strong>$349 a macchina</strong> — fino a 2 passeggeri</li>
              <li><strong>$125 come passeggero aggiuntivo</strong> — aggiunga un terzo passeggero con una guida</li>
              <li><strong>$99 all'ora</strong> — a macchina, per prolungare il Suo tour</li>
            </ul>
            <p>È richiesto un minimo di 3 persone, e i gruppi fino a 12 ospiti (6 macchine) sono i benvenuti. <strong>Chiami il <a href="tel:435-219-9447" class="faq-link">(435) 219-9447</a> per la disponibilità.</strong></p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq9" class="faq-toggle">
        <label for="faq9" class="faq-question">
          <span class="faq-index">09</span> HO BISOGNO DI ESPERIENZA CON GLI ATV?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p><strong>Non è richiesta alcuna esperienza con gli ATV!</strong> Adventure Tours Vernal accoglie principianti assoluti e offre una formazione completa sulla sicurezza prima di ogni tour.</p>
            <p>Le nostre guide esperte Le mostrano passo dopo passo come utilizzare i side-by-side Kawasaki KRX 1000. Accogliamo tutti i livelli di abilità, dai principianti assoluti ai conduttori esperti.</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq10" class="faq-toggle">
        <label for="faq10" class="faq-question">
          <span class="faq-index">10</span> POSSIAMO VISITARE DINOSAUR NATIONAL MONUMENT?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p><strong>Sì!</strong> Il nostro <strong>tour guidato di 3 ore in UTV</strong> esplora sentieri nel backcountry vicino a Dinosaur National Monument, incluse antiche formazioni rocciose e petroglifi.</p>
            <p>Il famoso muro di ossa di dinosauro del monumento è un sito separato del National Park Service — molti ospiti abbinano una mattinata al monumento a un tour pomeridiano in UTV nel backcountry circostante della Terra dei Dinosauri.</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq11" class="faq-toggle">
        <label for="faq11" class="faq-question">
          <span class="faq-index">11</span> PERCHÉ SCEGLIERE ADVENTURE TOURS VERNAL?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>Adventure Tours Vernal è l'<strong>unica azienda di tour guidati in Kawasaki KRX 1000 a Vernal, Utah.</strong> Offriamo accesso esclusivo a:</p>
            <ul>
              <li>Sentieri nascosti conosciuti solo dai locali</li>
              <li>Antichi petroglifi e arte rupestre</li>
              <li>Nascondigli di Butch Cassidy</li>
              <li>Archi panoramici e formazioni scenografiche</li>
            </ul>
            <p>Guide locali esperte, equipaggiamento di sicurezza professionale e tutti i livelli di abilità sono benvenuti. <strong>Aperto tutti i giorni dalle 7:00 alle 19:00.</strong></p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq12" class="faq-toggle">
        <label for="faq12" class="faq-question">
          <span class="faq-index">12</span> QUANTO DURANO I VOSTRI TOUR?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>Il nostro tour guidato standard dura circa <strong>3 ore</strong>, con una scelta di cinque sistemi di sentieri per adattarsi al Suo gruppo e livello di esperienza:</p>
            <ul>
              <li><strong>Doc's Beach</strong>, <strong>Moonshine Arch</strong>, <strong>Ashley Gorge</strong>, <strong>Outlaw Trail</strong> e <strong>Asphalt Ridge</strong></li>
              <li>Sceglie il Suo sistema di sentieri al momento della prenotazione</li>
              <li>Vuole più tempo? Prolunghi per $99 all'ora a macchina</li>
            </ul>
            <p>Ogni tour include equipaggiamento di sicurezza, formazione, acqua e snack.</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq13" class="faq-toggle">
        <label for="faq13" class="faq-question">
          <span class="faq-index">13</span> I VOSTRI TOUR SONO ADATTI ALLE FAMIGLIE?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p><strong>Assolutamente sì!</strong> Il nostro tour guidato è perfetto per le famiglie con bambini. Include:</p>
            <ul>
              <li>Sentieri facili con terreno dolce</li>
              <li>Splendide vedute del deserto</li>
              <li>Opportunità fotografiche</li>
              <li>Side-by-side a 2 posti; le famiglie prenotano più macchine per viaggiare insieme</li>
            </ul>
            <p>Non è necessaria esperienza — viene fornita una formazione completa sulla sicurezza. I bambini devono avere almeno 2 anni per viaggiare come passeggeri.</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq14" class="faq-toggle">
        <label for="faq14" class="faq-question">
          <span class="faq-index">14</span> QUALI SONO I VOSTRI ORARI?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>Adventure Tours Vernal è <strong>aperto tutti i giorni dalle 7:00 alle 19:00</strong>, ora delle Montagne Rocciose, 7 giorni su 7.</p>
            <p><strong>Chiami il <a href="tel:435-219-9447" class="faq-link">(435) 219-9447</a></strong> per prenotare il Suo tour in ATV o visiti <a href="https://adventuretoursvernal.com" class="faq-link">adventuretoursvernal.com</a>.</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq15" class="faq-toggle">
        <label for="faq15" class="faq-question">
          <span class="faq-index">15</span> QUALI OPZIONI DI TOUR OFFRITE?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>Adventure Tours Vernal offre un tour guidato di 3 ore su side-by-side Kawasaki KRX 1000, con una scelta di cinque sistemi di sentieri selezionati al momento della prenotazione:</p>
            <ul>
              <li>Doc's Beach</li>
              <li>Moonshine Arch</li>
              <li>Ashley Gorge</li>
              <li>Outlaw Trail</li>
              <li>Asphalt Ridge</li>
            </ul>
            <p>Ogni tour include side-by-side Kawasaki KRX 1000, guide locali esperte, equipaggiamento di sicurezza, formazione, acqua e snack.</p>
          </div>
        </div>
      </div>

    </div><!-- end .faq-container -->
  </div>
</section>

<!-- Pulsante flottante per dispositivi mobili -->
<div class="mobile-sticky-cta">
  <button onclick="location.href='/it/booking/'">Prenoti il Suo Tour Ora</button>
</div>

<script is:inline>
document.addEventListener('DOMContentLoaded', function() {

  // Auto-close other FAQs when one opens
  const faqToggles = document.querySelectorAll('.faq-toggle');
  faqToggles.forEach(toggle => {
    toggle.addEventListener('change', function() {
      if (this.checked) {
        faqToggles.forEach(otherToggle => {
          if (otherToggle !== this && otherToggle.checked) {
            otherToggle.checked = false;
          }
        });
        setTimeout(() => {
          this.parentElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 300);
      }
    });
  });

  // Keyboard navigation
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach((question, index) => {
    question.setAttribute('tabindex', '0');
    question.setAttribute('role', 'button');
    question.setAttribute('aria-expanded', 'false');
    question.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const checkbox = this.previousElementSibling;
        checkbox.checked = !checkbox.checked;
        this.setAttribute('aria-expanded', checkbox.checked);
        checkbox.dispatchEvent(new Event('change'));
      }
      if (e.key === 'ArrowDown') { e.preventDefault(); if (faqQuestions[index + 1]) faqQuestions[index + 1].focus(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); if (faqQuestions[index - 1]) faqQuestions[index - 1].focus(); }
    });
    question.addEventListener('click', function() {
      const checkbox = this.previousElementSibling;
      setTimeout(() => { this.setAttribute('aria-expanded', checkbox.checked); }, 10);
    });
  });

  // URL hash linking
  if (window.location.hash) {
    const targetId = window.location.hash.substring(1);
    const targetCheckbox = document.getElementById(targetId);
    if (targetCheckbox && targetCheckbox.classList.contains('faq-toggle')) {
      targetCheckbox.checked = true;
      setTimeout(() => {
        targetCheckbox.parentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 500);
    }
  }

  // Smooth load animation
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    setTimeout(() => {
      item.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }, 100 * index);
  });
});
</script>

`;

const PT = `

<!-- ================================================
     BLOCO RESUMO DA PÁGINA — para Google AI Overviews
     ================================================ -->
<p class="page-summary" style="position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;" aria-hidden="false">
  A Adventure Tours Vernal responde às perguntas mais frequentes sobre tours guiados em UTV em Vernal, Utah. Os temas incluem preços, requisitos de idade, o que trazer, política de clima, tours em grupo e opções de tour. Aberto todos os dias das 7h às 19h. Liga para (435) 219-9447.
</p>

<section id="faq" class="faq-section">
  <div class="faq-watermark">INTEL</div>

  <div class="container">
    <div class="section-header">
      <span class="status-badge">PREPARAÇÃO DE MISSÃO</span>
      <h1 class="section-title" style="font-size:clamp(1.8rem,3.5vw,2.8rem);">Perguntas Frequentes sobre Tours em UTV — Adventure Tours Vernal</h1>
      <p class="section-subtitle">Prepara-te com os factos antes de te aventurares no backcountry de Utah.</p>
      <p style="display:inline-flex;align-items:center;gap:8px;margin:14px auto 0;padding:7px 15px;border:1px solid rgba(212,118,78,0.5);border-radius:999px;background:#ffffff;box-shadow:0 1px 4px rgba(0,0,0,0.08);font-size:0.95rem;color:#4a4139;"><span aria-hidden="true" style="color:#e6a817;letter-spacing:1px;">★★★★★</span> <span><strong>${SITE.rating.value}</strong> &middot; ${SITE.rating.count} avaliações no Google</span></p>
    </div>

    <div class="faq-container">

      <div class="faq-item">
        <input type="checkbox" id="faq1" class="faq-toggle">
        <label for="faq1" class="faq-question">
          <span class="faq-index">01</span> POSSO TRAZER A MINHA PRÓPRIA MÁQUINA?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p><strong>Claro que sim!</strong> Trazer a tua própria máquina permite passeios mais personalizados e até mais extremos. Podes reservar online, mas para um passeio com a tua própria máquina ou personalizado, o melhor é ligares-nos ou enviares-nos um email primeiro para explicares o tipo de passeio que queres fazer.</p>
            <p>Fornecemos walkie-talkies e fazemos os possíveis para que todos se divirtam imenso (mantendo-se confortáveis). Nas secções mais "intensas" de um trilho, temos todo o gosto em oferecer alternativas mais fáceis. Orgulhamo-nos de conhecer estas áreas extremamente bem e as inúmeras formas de as aproveitar!</p>
            <p>Comunica livremente com o teu guia. Se não te sentires confortável a percorrer uma determinada parte do trilho, di-lo! A segurança é a prioridade número um, seguida de perto pela diversão.</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq2" class="faq-toggle">
        <label for="faq2" class="faq-question">
          <span class="faq-index">02</span> POSSO TRAZER UM GRUPO?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>Sem dúvida! Contacta-nos para os teus tours em grupo. Diz-nos qual é o tamanho do teu grupo e o que gostarias de ver. Temos muitas opções e podemos falar sobre as necessidades do teu grupo, como locais adicionais para parar e visitar, restaurantes e alojamento em hotéis, bares, vida noturna, atividades para crianças, etc. Adorávamos fazer parte das atividades do teu grupo durante a tua visita à bela Uintah Basin.</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq3" class="faq-toggle">
        <label for="faq3" class="faq-question">
          <span class="faq-index">03</span> E QUANTO AO TEMPO?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>Operamos com sol ou chuva. No entanto, em casos de condições meteorológicas extremas ou caso tenhamos de cancelar por outras circunstâncias imprevistas, terás a opção de remarcar ou receber um reembolso total.</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq4" class="faq-toggle">
        <label for="faq4" class="faq-question">
          <span class="faq-index">04</span> O QUE DEVO TRAZER?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>Vamos estar ao ar livre durante horas, por isso usa bom senso. Fazemos os possíveis para ter papel higiénico de emergência e outros itens essenciais disponíveis em cada tour. Ainda assim, se achares que podes precisar de algo, o melhor é trazê-lo! Protetor solar, repelente de insetos e batom para os lábios nunca fazem mal.</p>
            <p>Sugerimos que tragas <strong>óculos de sol, um chapéu, uma máquina fotográfica, um casaco e sapatos fechados.</strong> Não são obrigatórios (mas é melhor ter e não precisar, certo?) Também podes vestir-te em camadas, já que a temperatura pode variar. Fornecemos água e um pequeno lanche de cortesia. Se tiveres alguma alergia, recomendamos que tragas algo específico para as tuas restrições alimentares. Há pouco espaço na parte de trás de um side-by-side, por isso, se não tiveres a certeza do que levar, é só perguntar!</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq5" class="faq-toggle">
        <label for="faq5" class="faq-question">
          <span class="faq-index">05</span> QUANDO DEVO CHEGAR AO PONTO DE ENCONTRO?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>Para todos os tours, chega <strong>30 minutos antes</strong> da tua hora de partida. A hora de reserva do tour é a hora real de partida. Não partimos até que toda a formação de segurança esteja concluída e estejas familiarizado com o teu veículo. Antes da partida, vamos rever toda a orientação e as medidas de segurança, como termos de responsabilidade, seleção de equipamento, etc.</p>
            <p>Depois de concluíres a tua reserva, vais receber um email de confirmação com informações importantes sobre o tour selecionado. Segue-o e lê-o com atenção. Se não estiveres presente com tudo tratado e o equipamento escolhido quando a orientação começar, podes perder o teu lugar no tour, que não é reembolsável. Tal como apanhar o autocarro escolar... se não estiveres lá à hora marcada, ficas para trás!</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq6" class="faq-toggle">
        <label for="faq6" class="faq-question">
          <span class="faq-index">06</span> QUE IDADE PRECISO DE TER?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>Para conduzires as nossas máquinas, precisas de ter pelo menos <strong>18 anos de idade.</strong> Para andares nas nossas máquinas, precisas de ter pelo menos <strong>2 anos de idade.</strong></p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq7" class="faq-toggle">
        <label for="faq7" class="faq-question">
          <span class="faq-index">07</span> CANCELAMENTOS E DEPÓSITOS?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>Clica <a href="/pt/cancellation-policy/" class="faq-link">AQUI</a> para veres a política de cancelamento completa.</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq8" class="faq-toggle">
        <label for="faq8" class="faq-question">
          <span class="faq-index">08</span> QUANTO CUSTAM OS TOURS EM ATV?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>Oferecemos um tour guiado de 3 horas em side-by-sides Kawasaki KRX 1000:</p>
            <ul>
              <li><strong>$349 por máquina</strong> — até 2 passageiros</li>
              <li><strong>$125 ride-along</strong> — adiciona um terceiro passageiro como passageiro com um guia</li>
              <li><strong>$99 por hora</strong> — por máquina, para estenderes o teu tour</li>
            </ul>
            <p>Aplica-se um mínimo de 3 pessoas, e grupos até 12 convidados (6 máquinas) são bem-vindos. <strong>Liga para <a href="tel:435-219-9447" class="faq-link">(435) 219-9447</a> para veres a disponibilidade.</strong></p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq9" class="faq-toggle">
        <label for="faq9" class="faq-question">
          <span class="faq-index">09</span> PRECISO DE EXPERIÊNCIA EM ATV?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p><strong>Não é necessária experiência em ATV!</strong> A Adventure Tours Vernal recebe de braços abertos principiantes totais e oferece formação de segurança completa antes de cada tour.</p>
            <p>Os nossos guias experientes ensinam-te passo a passo como operar os side-by-sides Kawasaki KRX 1000. Damos as boas-vindas a todos os níveis de experiência — desde principiantes até condutores experientes.</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq10" class="faq-toggle">
        <label for="faq10" class="faq-question">
          <span class="faq-index">10</span> PODEMOS VISITAR O DINOSAUR NATIONAL MONUMENT?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p><strong>Sim!</strong> O nosso <strong>tour guiado de 3 horas em UTV</strong> explora trilhos do backcountry perto do Dinosaur National Monument, incluindo antigas formações rochosas e petróglifos.</p>
            <p>O famoso muro de ossos de dinossauro do monumento é um local separado do National Park Service — muitos hóspedes combinam uma manhã no monumento com um tour em UTV à tarde pelo backcountry circundante da Terra dos Dinossauros.</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq11" class="faq-toggle">
        <label for="faq11" class="faq-question">
          <span class="faq-index">11</span> PORQUE ESCOLHER A ADVENTURE TOURS VERNAL?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>A Adventure Tours Vernal é a <strong>única empresa de tours guiados em Kawasaki KRX 1000 em Vernal, Utah.</strong> Oferecemos acesso exclusivo a:</p>
            <ul>
              <li>Trilhos escondidos conhecidos apenas pelos locais</li>
              <li>Petróglifos antigos e arte rupestre</li>
              <li>Esconderijos de Butch Cassidy</li>
              <li>Arcos e formações cénicas</li>
            </ul>
            <p>Guias locais especializados, equipamento de segurança profissional, e todos os níveis de experiência são bem-vindos. <strong>Aberto todos os dias das 7h às 19h.</strong></p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq12" class="faq-toggle">
        <label for="faq12" class="faq-question">
          <span class="faq-index">12</span> QUANTO TEMPO DURAM OS TOURS?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>O nosso tour guiado padrão dura cerca de <strong>3 horas</strong>, com uma escolha de cinco sistemas de trilhos para se adaptar ao teu grupo e nível de experiência:</p>
            <ul>
              <li><strong>Doc's Beach</strong>, <strong>Moonshine Arch</strong>, <strong>Ashley Gorge</strong>, <strong>Outlaw Trail</strong> e <strong>Asphalt Ridge</strong></li>
              <li>Escolhes o teu sistema de trilhos quando reservas</li>
              <li>Queres mais tempo? Prolonga por $99 por hora por máquina</li>
            </ul>
            <p>Cada tour inclui equipamento de segurança, formação, água e lanches.</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq13" class="faq-toggle">
        <label for="faq13" class="faq-question">
          <span class="faq-index">13</span> OS TOURS SÃO ADEQUADOS PARA FAMÍLIAS?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p><strong>Sem dúvida!</strong> O nosso tour guiado é perfeito para famílias com crianças. Inclui:</p>
            <ul>
              <li>Trilhos fáceis com terreno suave</li>
              <li>Vistas deslumbrantes do deserto</li>
              <li>Oportunidades para fotos</li>
              <li>Side-by-sides de 2 lugares; as famílias reservam várias máquinas para andarem juntas</li>
            </ul>
            <p>Não é necessária experiência — é fornecida formação de segurança completa. As crianças devem ter pelo menos 2 anos para andarem como passageiros.</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq14" class="faq-toggle">
        <label for="faq14" class="faq-question">
          <span class="faq-index">14</span> QUAL É O HORÁRIO?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>A Adventure Tours Vernal está <strong>aberta todos os dias das 7h00 às 19h00</strong>, hora das Montanhas Rochosas, 7 dias por semana.</p>
            <p><strong>Liga para <a href="tel:435-219-9447" class="faq-link">(435) 219-9447</a></strong> para reservares o teu tour em ATV ou visita <a href="https://adventuretoursvernal.com" class="faq-link">adventuretoursvernal.com</a>.</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq15" class="faq-toggle">
        <label for="faq15" class="faq-question">
          <span class="faq-index">15</span> QUE OPÇÕES DE TOUR OFERECE A ADVENTURE TOURS VERNAL?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>A Adventure Tours Vernal oferece um tour guiado de 3 horas em side-by-sides Kawasaki KRX 1000, com uma escolha de cinco sistemas de trilhos selecionados quando reservas:</p>
            <ul>
              <li>Doc's Beach</li>
              <li>Moonshine Arch</li>
              <li>Ashley Gorge</li>
              <li>Outlaw Trail</li>
              <li>Asphalt Ridge</li>
            </ul>
            <p>Cada tour inclui side-by-sides Kawasaki KRX 1000, guias locais especializados, equipamento de segurança, formação, água e lanches.</p>
          </div>
        </div>
      </div>

    </div><!-- end .faq-container -->
  </div>
</section>

<!-- Botão flutuante para dispositivos móveis -->
<div class="mobile-sticky-cta">
  <button onclick="location.href='/pt/booking/'">Reserva o Teu Tour Agora</button>
</div>

<script is:inline>
document.addEventListener('DOMContentLoaded', function() {

  // Auto-close other FAQs when one opens
  const faqToggles = document.querySelectorAll('.faq-toggle');
  faqToggles.forEach(toggle => {
    toggle.addEventListener('change', function() {
      if (this.checked) {
        faqToggles.forEach(otherToggle => {
          if (otherToggle !== this && otherToggle.checked) {
            otherToggle.checked = false;
          }
        });
        setTimeout(() => {
          this.parentElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 300);
      }
    });
  });

  // Keyboard navigation
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach((question, index) => {
    question.setAttribute('tabindex', '0');
    question.setAttribute('role', 'button');
    question.setAttribute('aria-expanded', 'false');
    question.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const checkbox = this.previousElementSibling;
        checkbox.checked = !checkbox.checked;
        this.setAttribute('aria-expanded', checkbox.checked);
        checkbox.dispatchEvent(new Event('change'));
      }
      if (e.key === 'ArrowDown') { e.preventDefault(); if (faqQuestions[index + 1]) faqQuestions[index + 1].focus(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); if (faqQuestions[index - 1]) faqQuestions[index - 1].focus(); }
    });
    question.addEventListener('click', function() {
      const checkbox = this.previousElementSibling;
      setTimeout(() => { this.setAttribute('aria-expanded', checkbox.checked); }, 10);
    });
  });

  // URL hash linking
  if (window.location.hash) {
    const targetId = window.location.hash.substring(1);
    const targetCheckbox = document.getElementById(targetId);
    if (targetCheckbox && targetCheckbox.classList.contains('faq-toggle')) {
      targetCheckbox.checked = true;
      setTimeout(() => {
        targetCheckbox.parentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 500);
    }
  }

  // Smooth load animation
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    setTimeout(() => {
      item.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }, 100 * index);
  });
});
</script>

`;

const FR = `

<!-- ================================================
     BLOC RÉSUMÉ DE PAGE — pour Google AI Overviews
     ================================================ -->
<p class="page-summary" style="position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;" aria-hidden="false">
  Adventure Tours Vernal répond aux questions fréquemment posées sur les tours guidés en UTV à Vernal, Utah. Les sujets incluent les tarifs, les exigences d'âge, quoi apporter, la politique météo, les tours de groupe et les options de tour. Ouvert tous les jours de 7h à 19h. Appelez le (435) 219-9447.
</p>

<section id="faq" class="faq-section">
  <div class="faq-watermark">INTEL</div>

  <div class="container">
    <div class="section-header">
      <span class="status-badge">PRÉPARATION DE MISSION</span>
      <h1 class="section-title" style="font-size:clamp(1.8rem,3.5vw,2.8rem);">FAQ Tours en UTV — Adventure Tours Vernal</h1>
      <p class="section-subtitle">Préparez-vous avec les informations avant de vous aventurer dans le backcountry de l'Utah.</p>
      <p style="display:inline-flex;align-items:center;gap:8px;margin:14px auto 0;padding:7px 15px;border:1px solid rgba(212,118,78,0.5);border-radius:999px;background:#ffffff;box-shadow:0 1px 4px rgba(0,0,0,0.08);font-size:0.95rem;color:#4a4139;"><span aria-hidden="true" style="color:#e6a817;letter-spacing:1px;">★★★★★</span> <span><strong>${SITE.rating.value}</strong> &middot; ${SITE.rating.count} avis Google</span></p>
    </div>

    <div class="faq-container">

      <div class="faq-item">
        <input type="checkbox" id="faq1" class="faq-toggle">
        <label for="faq1" class="faq-question">
          <span class="faq-index">01</span> PUIS-JE APPORTER MA PROPRE MACHINE ?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p><strong>Absolument !</strong> Apporter votre propre machine permet des sorties plus personnalisées et même plus extrêmes. Vous pouvez réserver en ligne, mais pour une sortie avec votre propre machine ou une sortie personnalisée, il est préférable de nous appeler ou de nous écrire au préalable afin de nous expliquer le type de sortie que vous souhaitez faire.</p>
            <p>Nous fournissons des talkies-walkies et faisons de notre mieux pour que tout le monde s'amuse (tout en restant confortable). Sur les sections les plus "intenses" d'une piste, nous sommes heureux de proposer des alternatives plus faciles. Nous sommes fiers de connaître ces zones à fond et les nombreuses façons d'en profiter !</p>
            <p>Communiquez librement avec votre guide. Si vous ne vous sentez pas à l'aise pour parcourir une partie de la piste, dites-le ! La sécurité est la priorité numéro un, suivie de près par le plaisir.</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq2" class="faq-toggle">
        <label for="faq2" class="faq-question">
          <span class="faq-index">02</span> PUIS-JE AMENER UN GROUPE ?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>Absolument ! Contactez-nous pour vos tours de groupe. Faites-nous savoir la taille de votre groupe et ce que vous aimeriez voir. Nous avons de nombreuses options et pouvons discuter des besoins de votre groupe, comme des sites supplémentaires à visiter, des restaurants et des hébergements en hôtel, des bars, la vie nocturne, des activités adaptées aux enfants, etc. Nous serions ravis de faire partie des activités de votre groupe lors de votre visite du magnifique Uintah Basin.</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq3" class="faq-toggle">
        <label for="faq3" class="faq-question">
          <span class="faq-index">03</span> QU'EN EST-IL DE LA MÉTÉO ?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>Nous opérons par beau temps comme par temps pluvieux. Cependant, en cas de conditions météorologiques extrêmes ou si nous devons annuler pour d'autres circonstances imprévues, vous aurez la possibilité de reporter votre réservation ou de recevoir un remboursement complet.</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq4" class="faq-toggle">
        <label for="faq4" class="faq-question">
          <span class="faq-index">04</span> QUE DOIS-JE APPORTER ?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>Nous serons dehors pendant plusieurs heures, merci d'utiliser votre bon sens. Nous faisons de notre mieux pour avoir du papier toilette d'urgence et d'autres articles essentiels disponibles pour chaque tour. Néanmoins, si vous pensez en avoir besoin, mieux vaut l'apporter ! La crème solaire, l'anti-moustique et le baume à lèvres ne sont jamais de trop.</p>
            <p>Nous vous suggérons d'apporter <strong>des lunettes de soleil, un chapeau, un appareil photo, une veste et des chaussures fermées.</strong> Ce n'est pas obligatoire (mais mieux vaut les avoir sans en avoir besoin, non ?) Vous pouvez aussi vous habiller en couches, car la température peut varier. Nous offrons de l'eau et une petite collation. Si vous avez des allergies, nous vous recommandons d'apporter quelque chose d'adapté à vos restrictions alimentaires. L'espace à l'arrière d'un side-by-side est limité, donc si vous ne savez pas quoi emporter, demandez-nous simplement !</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq5" class="faq-toggle">
        <label for="faq5" class="faq-question">
          <span class="faq-index">05</span> QUAND DOIS-JE ARRIVER AU POINT DE RENDEZ-VOUS ?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>Pour tous les tours, merci d'arriver <strong>30 minutes avant</strong> l'heure de départ. L'heure de réservation du tour correspond à l'heure réelle de départ. Nous ne partirons pas tant que toute la formation de sécurité ne sera pas terminée et que vous ne serez pas familiarisé avec votre véhicule. Avant le départ, nous passerons en revue toute l'orientation et les mesures de sécurité telles que les décharges de responsabilité, le choix de l'équipement, etc.</p>
            <p>Après avoir terminé votre réservation, vous recevrez un e-mail de confirmation contenant des informations importantes sur le tour sélectionné. Merci de le suivre et de le lire attentivement. Si vous n'êtes pas présent avec toutes les démarches terminées et l'équipement choisi au début de l'orientation, vous risquez de perdre votre place sur le tour, qui n'est pas remboursable. Comme pour attraper un bus scolaire... si vous n'êtes pas là à l'heure prévue, vous serez laissé derrière !</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq6" class="faq-toggle">
        <label for="faq6" class="faq-question">
          <span class="faq-index">06</span> QUEL ÂGE DOIS-JE AVOIR ?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>Pour conduire nos machines, vous devez avoir au moins <strong>18 ans.</strong> Pour être passager dans nos machines, vous devez avoir au moins <strong>2 ans.</strong></p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq7" class="faq-toggle">
        <label for="faq7" class="faq-question">
          <span class="faq-index">07</span> ANNULATIONS ET ACOMPTES ?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>Cliquez <a href="/fr/cancellation-policy/" class="faq-link">ICI</a> pour consulter la politique d'annulation complète.</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq8" class="faq-toggle">
        <label for="faq8" class="faq-question">
          <span class="faq-index">08</span> COMBIEN COÛTENT LES TOURS EN ATV ?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>Nous proposons un tour guidé de 3 heures sur des side-by-side Kawasaki KRX 1000 :</p>
            <ul>
              <li><strong>$349 par machine</strong> — jusqu'à 2 passagers</li>
              <li><strong>$125 ride-along (en tant que passager)</strong> — ajoutez un troisième passager avec un guide</li>
              <li><strong>$99 par heure</strong> — par machine, pour prolonger votre tour</li>
            </ul>
            <p>Un minimum de 3 personnes s'applique, et les groupes jusqu'à 12 invités (6 machines) sont les bienvenus. <strong>Appelez le <a href="tel:435-219-9447" class="faq-link">(435) 219-9447</a> pour connaître les disponibilités.</strong></p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq9" class="faq-toggle">
        <label for="faq9" class="faq-question">
          <span class="faq-index">09</span> AI-JE BESOIN D'EXPÉRIENCE EN ATV ?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p><strong>Aucune expérience en ATV n'est requise !</strong> Adventure Tours Vernal accueille les débutants complets et propose une formation de sécurité complète avant chaque tour.</p>
            <p>Nos guides expérimentés vous accompagnent étape par étape dans l'utilisation des side-by-side Kawasaki KRX 1000. Nous accueillons tous les niveaux — des débutants aux conducteurs expérimentés.</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq10" class="faq-toggle">
        <label for="faq10" class="faq-question">
          <span class="faq-index">10</span> POUVONS-NOUS VISITER DINOSAUR NATIONAL MONUMENT ?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p><strong>Oui !</strong> Notre <strong>tour guidé de 3 heures en UTV</strong> explore les pistes du backcountry près de Dinosaur National Monument, y compris d'anciennes formations rocheuses et des pétroglyphes.</p>
            <p>Le célèbre mur d'ossements de dinosaures du monument est un site distinct du National Park Service — de nombreux visiteurs associent une matinée au monument à un tour en UTV l'après-midi dans le backcountry environnant de la Terre des Dinosaures.</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq11" class="faq-toggle">
        <label for="faq11" class="faq-question">
          <span class="faq-index">11</span> POURQUOI CHOISIR ADVENTURE TOURS VERNAL ?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>Adventure Tours Vernal est la <strong>seule entreprise de tours guidés en Kawasaki KRX 1000 à Vernal, Utah.</strong> Nous offrons un accès exclusif à :</p>
            <ul>
              <li>Des pistes cachées connues seulement des habitants</li>
              <li>D'anciens pétroglyphes et art rupestre</li>
              <li>Les repaires de Butch Cassidy</li>
              <li>Des arches et formations panoramiques</li>
            </ul>
            <p>Guides locaux experts, équipement de sécurité professionnel, et tous les niveaux sont les bienvenus. <strong>Ouvert tous les jours de 7h à 19h.</strong></p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq12" class="faq-toggle">
        <label for="faq12" class="faq-question">
          <span class="faq-index">12</span> COMBIEN DE TEMPS DURENT VOS TOURS ?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>Notre tour guidé standard dure environ <strong>3 heures</strong>, avec un choix de cinq réseaux de pistes pour s'adapter à votre groupe et à votre niveau d'expérience :</p>
            <ul>
              <li><strong>Doc's Beach</strong>, <strong>Moonshine Arch</strong>, <strong>Ashley Gorge</strong>, <strong>Outlaw Trail</strong> et <strong>Asphalt Ridge</strong></li>
              <li>Vous choisissez votre réseau de pistes au moment de la réservation</li>
              <li>Vous voulez plus de temps ? Prolongez pour $99 par heure par machine</li>
            </ul>
            <p>Chaque tour comprend l'équipement de sécurité, la formation, l'eau et des collations.</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq13" class="faq-toggle">
        <label for="faq13" class="faq-question">
          <span class="faq-index">13</span> VOS TOURS SONT-ILS ADAPTÉS AUX FAMILLES ?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p><strong>Absolument !</strong> Notre tour guidé est parfait pour les familles avec enfants. Il comprend :</p>
            <ul>
              <li>Des pistes faciles au terrain doux</li>
              <li>Des vues magnifiques sur le désert</li>
              <li>Des occasions de photos</li>
              <li>Des side-by-side à 2 places ; les familles réservent plusieurs machines pour rouler ensemble</li>
            </ul>
            <p>Aucune expérience n'est nécessaire — une formation de sécurité complète est fournie. Les enfants doivent avoir au moins 2 ans pour être passagers.</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq14" class="faq-toggle">
        <label for="faq14" class="faq-question">
          <span class="faq-index">14</span> QUELS SONT VOS HORAIRES ?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>Adventure Tours Vernal est <strong>ouvert tous les jours de 7h00 à 19h00</strong> heure des Rocheuses, 7 jours sur 7.</p>
            <p><strong>Appelez le <a href="tel:435-219-9447" class="faq-link">(435) 219-9447</a></strong> pour réserver votre tour en ATV ou visitez <a href="https://adventuretoursvernal.com" class="faq-link">adventuretoursvernal.com</a>.</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq15" class="faq-toggle">
        <label for="faq15" class="faq-question">
          <span class="faq-index">15</span> QUELLES OPTIONS DE TOUR PROPOSEZ-VOUS ?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>Adventure Tours Vernal propose un tour guidé de 3 heures sur des side-by-side Kawasaki KRX 1000, avec un choix de cinq réseaux de pistes sélectionnés au moment de la réservation :</p>
            <ul>
              <li>Doc's Beach</li>
              <li>Moonshine Arch</li>
              <li>Ashley Gorge</li>
              <li>Outlaw Trail</li>
              <li>Asphalt Ridge</li>
            </ul>
            <p>Chaque tour comprend des side-by-side Kawasaki KRX 1000, des guides locaux experts, de l'équipement de sécurité, une formation, de l'eau et des collations.</p>
          </div>
        </div>
      </div>

    </div><!-- end .faq-container -->
  </div>
</section>

<!-- Bouton flottant pour mobile -->
<div class="mobile-sticky-cta">
  <button onclick="location.href='/fr/booking/'">Réservez Votre Tour Maintenant</button>
</div>

<script is:inline>
document.addEventListener('DOMContentLoaded', function() {

  // Auto-close other FAQs when one opens
  const faqToggles = document.querySelectorAll('.faq-toggle');
  faqToggles.forEach(toggle => {
    toggle.addEventListener('change', function() {
      if (this.checked) {
        faqToggles.forEach(otherToggle => {
          if (otherToggle !== this && otherToggle.checked) {
            otherToggle.checked = false;
          }
        });
        setTimeout(() => {
          this.parentElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 300);
      }
    });
  });

  // Keyboard navigation
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach((question, index) => {
    question.setAttribute('tabindex', '0');
    question.setAttribute('role', 'button');
    question.setAttribute('aria-expanded', 'false');
    question.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const checkbox = this.previousElementSibling;
        checkbox.checked = !checkbox.checked;
        this.setAttribute('aria-expanded', checkbox.checked);
        checkbox.dispatchEvent(new Event('change'));
      }
      if (e.key === 'ArrowDown') { e.preventDefault(); if (faqQuestions[index + 1]) faqQuestions[index + 1].focus(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); if (faqQuestions[index - 1]) faqQuestions[index - 1].focus(); }
    });
    question.addEventListener('click', function() {
      const checkbox = this.previousElementSibling;
      setTimeout(() => { this.setAttribute('aria-expanded', checkbox.checked); }, 10);
    });
  });

  // URL hash linking
  if (window.location.hash) {
    const targetId = window.location.hash.substring(1);
    const targetCheckbox = document.getElementById(targetId);
    if (targetCheckbox && targetCheckbox.classList.contains('faq-toggle')) {
      targetCheckbox.checked = true;
      setTimeout(() => {
        targetCheckbox.parentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 500);
    }
  }

  // Smooth load animation
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    setTimeout(() => {
      item.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }, 100 * index);
  });
});
</script>

`;

const DE = `

<!-- ================================================
     SEITENZUSAMMENFASSUNG — für Google AI Overviews
     ================================================ -->
<p class="page-summary" style="position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;" aria-hidden="false">
  Adventure Tours Vernal beantwortet häufig gestellte Fragen zu geführten UTV-Touren in Vernal, Utah. Themen sind Preise, Altersanforderungen, was du mitbringen solltest, die Wetterrichtlinie, Gruppentouren und Tour-Optionen. Täglich von 7 bis 19 Uhr geöffnet. Ruf an unter (435) 219-9447.
</p>

<section id="faq" class="faq-section">
  <div class="faq-watermark">INTEL</div>

  <div class="container">
    <div class="section-header">
      <span class="status-badge">MISSIONSVORBEREITUNG</span>
      <h1 class="section-title" style="font-size:clamp(1.8rem,3.5vw,2.8rem);">Häufig gestellte Fragen zu UTV-Touren — Adventure Tours Vernal</h1>
      <p class="section-subtitle">Rüste dich mit den Fakten aus, bevor du ins Backcountry von Utah aufbrichst.</p>
      <p style="display:inline-flex;align-items:center;gap:8px;margin:14px auto 0;padding:7px 15px;border:1px solid rgba(212,118,78,0.5);border-radius:999px;background:#ffffff;box-shadow:0 1px 4px rgba(0,0,0,0.08);font-size:0.95rem;color:#4a4139;"><span aria-hidden="true" style="color:#e6a817;letter-spacing:1px;">★★★★★</span> <span><strong>${SITE.rating.value}</strong> &middot; ${SITE.rating.count} Google-Bewertungen</span></p>
    </div>

    <div class="faq-container">

      <div class="faq-item">
        <input type="checkbox" id="faq1" class="faq-toggle">
        <label for="faq1" class="faq-question">
          <span class="faq-index">01</span> KANN ICH MEINE EIGENE MASCHINE MITBRINGEN?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p><strong>Und ob!</strong> Wenn du deine eigene Maschine mitbringst, sind individuellere und sogar extremere Touren möglich. Du kannst online buchen, aber für eine Tour mit eigener Maschine oder eine individuelle Tour rufst du uns am besten vorher an oder schreibst uns eine E-Mail, um zu erklären, welche Art von Tour du machen möchtest.</p>
            <p>Wir stellen Walkie-Talkies zur Verfügung und tun unser Bestes, damit alle eine tolle Zeit haben (und dabei bequem bleiben). Bei den anspruchsvolleren Abschnitten einer Piste bieten wir gerne einfachere Alternativen an. Wir sind stolz darauf, diese Gebiete extrem gut zu kennen und die zahlreichen Möglichkeiten, sie zu genießen!</p>
            <p>Sprich offen mit deinem Guide. Wenn du dich bei einem bestimmten Abschnitt der Piste nicht wohlfühlst, sag es einfach! Sicherheit hat oberste Priorität, dicht gefolgt vom Spaß.</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq2" class="faq-toggle">
        <label for="faq2" class="faq-question">
          <span class="faq-index">02</span> KANN ICH EINE GRUPPE MITBRINGEN?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>Auf jeden Fall! Kontaktiere uns für deine Gruppentouren. Sag uns, wie groß deine Gruppe ist und was ihr sehen möchtet. Wir haben viele Optionen und können über die Bedürfnisse deiner Gruppe sprechen, zum Beispiel zusätzliche Sehenswürdigkeiten, Restaurants und Hotelunterkünfte, Bars, Nachtleben, kinderfreundliche Aktivitäten usw. Wir würden uns freuen, Teil eurer Gruppenaktivitäten zu sein, während ihr das wunderschöne Uintah Basin besucht.</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq3" class="faq-toggle">
        <label for="faq3" class="faq-question">
          <span class="faq-index">03</span> WIE STEHT ES UM DAS WETTER?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>Wir fahren bei Sonnenschein genauso wie bei Regen. Bei extremem Wetter oder falls wir aus anderen unvorhersehbaren Gründen absagen müssen, hast du die Möglichkeit, umzubuchen oder eine vollständige Rückerstattung zu erhalten.</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq4" class="faq-toggle">
        <label for="faq4" class="faq-question">
          <span class="faq-index">04</span> WAS SOLLTE ICH MITBRINGEN?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>Wir sind stundenlang draußen unterwegs, nutze also deinen gesunden Menschenverstand. Wir geben unser Bestes, um bei jeder Tour Toilettenpapier für den Notfall und andere wichtige Dinge griffbereit zu haben. Wenn du aber denkst, dass du etwas brauchen könntest, bring es lieber mit! Sonnencreme, Insektenspray und Lippenbalsam sind nie eine schlechte Idee.</p>
            <p>Wir empfehlen dir, <strong>eine Sonnenbrille, einen Hut, eine Kamera, eine Jacke und geschlossene Schuhe</strong> mitzubringen. Das ist nicht vorgeschrieben (aber besser, du hast es und brauchst es nicht, oder?) Du kannst dich auch im Zwiebellook kleiden, da die Temperatur schwanken kann. Wir stellen kostenloses Wasser und einen kleinen Snack zur Verfügung. Falls du Allergien hast, empfehlen wir dir, etwas Passendes für deine Ernährungseinschränkungen mitzubringen. Auf der Rückbank eines Side-by-Side ist nur begrenzt Platz — wenn du dir nicht sicher bist, was du einpacken sollst, frag uns einfach!</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq5" class="faq-toggle">
        <label for="faq5" class="faq-question">
          <span class="faq-index">05</span> WANN SOLLTE ICH AM TREFFPUNKT SEIN?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>Bitte komm bei allen Touren <strong>30 Minuten vor</strong> deiner Abfahrtszeit an. Die Reservierungszeit der Tour entspricht der tatsächlichen Abfahrtszeit. Wir fahren erst los, wenn das gesamte Sicherheitstraining abgeschlossen ist und du mit deinem Fahrzeug vertraut bist. Vor der Abfahrt gehen wir die gesamte Einweisung und die Sicherheitsmaßnahmen durch, zum Beispiel Haftungsausschlüsse, Ausrüstungsauswahl usw.</p>
            <p>Nach Abschluss deiner Reservierung erhältst du eine Bestätigungs-E-Mail mit wichtigen Informationen zu deiner ausgewählten Tour. Bitte lies sie aufmerksam durch und befolge die Hinweise. Wenn bei Beginn der Einweisung nicht alle Formalitäten erledigt und die Ausrüstung ausgewählt sind, kannst du deinen Platz auf der Tour verlieren, der nicht erstattungsfähig ist. Wie beim Schulbus... wenn du nicht zur vereinbarten Zeit da bist, bleibst du zurück!</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq6" class="faq-toggle">
        <label for="faq6" class="faq-question">
          <span class="faq-index">06</span> WIE ALT MUSS ICH SEIN?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>Um unsere Maschinen zu fahren, musst du mindestens <strong>18 Jahre alt</strong> sein. Um als Mitfahrer mitzufahren, musst du mindestens <strong>2 Jahre alt</strong> sein.</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq7" class="faq-toggle">
        <label for="faq7" class="faq-question">
          <span class="faq-index">07</span> STORNIERUNG UND ANZAHLUNGEN?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>Klicke <a href="/de/cancellation-policy/" class="faq-link">HIER</a>, um die vollständige Stornierungsrichtlinie zu sehen.</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq8" class="faq-toggle">
        <label for="faq8" class="faq-question">
          <span class="faq-index">08</span> WAS KOSTEN DIE ATV-TOUREN?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>Wir bieten eine geführte 3-stündige Tour auf Kawasaki KRX 1000 Side-by-Sides an:</p>
            <ul>
              <li><strong>$349 pro Maschine</strong> — Platz für bis zu 2 Fahrer</li>
              <li><strong>$125 Ride-Along</strong> — füge einen dritten Mitfahrer mit einem Guide hinzu</li>
              <li><strong>$99 pro Stunde</strong> — pro Maschine, um deine Tour zu verlängern</li>
            </ul>
            <p>Es gilt ein Minimum von 3 Personen, und Gruppen mit bis zu 12 Gästen (6 Maschinen) sind willkommen. <strong>Ruf an unter <a href="tel:435-219-9447" class="faq-link">(435) 219-9447</a>, um die Verfügbarkeit zu erfahren.</strong></p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq9" class="faq-toggle">
        <label for="faq9" class="faq-question">
          <span class="faq-index">09</span> BRAUCHE ICH ATV-ERFAHRUNG?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p><strong>Es ist keine ATV-Erfahrung erforderlich!</strong> Adventure Tours Vernal heißt absolute Anfänger willkommen und bietet vor jeder Tour ein vollständiges Sicherheitstraining.</p>
            <p>Unsere erfahrenen Guides zeigen dir Schritt für Schritt, wie du die Kawasaki KRX 1000 Side-by-Sides bedienst. Wir heißen alle Erfahrungsstufen willkommen — von Erstfahrern bis zu erfahrenen Fahrern.</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq10" class="faq-toggle">
        <label for="faq10" class="faq-question">
          <span class="faq-index">10</span> KÖNNEN WIR DAS DINOSAUR NATIONAL MONUMENT BESUCHEN?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p><strong>Ja!</strong> Unsere <strong>geführte 3-stündige UTV-Tour</strong> erkundet Backcountry-Pisten in der Nähe des Dinosaur National Monument, einschließlich uralter Felsformationen und Petroglyphen.</p>
            <p>Die berühmte Wand aus Dinosaurierknochen des Monuments ist eine eigenständige Stätte des National Park Service — viele Gäste kombinieren einen Vormittag im Monument mit einer UTV-Tour am Nachmittag durch das umliegende Backcountry im Land der Dinosaurier.</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq11" class="faq-toggle">
        <label for="faq11" class="faq-question">
          <span class="faq-index">11</span> WARUM ADVENTURE TOURS VERNAL WÄHLEN?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>Adventure Tours Vernal ist das <strong>einzige Unternehmen für geführte Kawasaki KRX 1000 Touren in Vernal, Utah.</strong> Wir bieten exklusiven Zugang zu:</p>
            <ul>
              <li>Versteckten Pisten, die nur Einheimischen bekannt sind</li>
              <li>Uralten Petroglyphen und Felskunst</li>
              <li>Verstecken von Butch Cassidy</li>
              <li>Malerischen Bögen und Formationen</li>
            </ul>
            <p>Erfahrene lokale Guides, professionelle Sicherheitsausrüstung, und alle Erfahrungsstufen sind willkommen. <strong>Täglich von 7 bis 19 Uhr geöffnet.</strong></p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq12" class="faq-toggle">
        <label for="faq12" class="faq-question">
          <span class="faq-index">12</span> WIE LANGE DAUERN EURE TOUREN?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>Unsere geführte Standardtour dauert etwa <strong>3 Stunden</strong>, mit einer Auswahl von fünf Pistensystemen passend zu deiner Gruppe und deinem Erfahrungslevel:</p>
            <ul>
              <li><strong>Doc's Beach</strong>, <strong>Moonshine Arch</strong>, <strong>Ashley Gorge</strong>, <strong>Outlaw Trail</strong> und <strong>Asphalt Ridge</strong></li>
              <li>Du wählst dein Pistensystem bei der Buchung</li>
              <li>Möchtest du mehr Zeit? Verlängere für $99 pro Stunde pro Maschine</li>
            </ul>
            <p>Jede Tour beinhaltet Sicherheitsausrüstung, Training, Wasser und Snacks.</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq13" class="faq-toggle">
        <label for="faq13" class="faq-question">
          <span class="faq-index">13</span> SIND EURE TOUREN FAMILIENFREUNDLICH?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p><strong>Auf jeden Fall!</strong> Unsere geführte Tour ist perfekt für Familien mit Kindern. Sie bietet:</p>
            <ul>
              <li>Einfache Pisten mit sanftem Gelände</li>
              <li>Atemberaubende Ausblicke auf die Wüste</li>
              <li>Fotomöglichkeiten</li>
              <li>2-Sitzer Side-by-Sides; Familien buchen mehrere Maschinen, um gemeinsam zu fahren</li>
            </ul>
            <p>Keine Erfahrung nötig — ein vollständiges Sicherheitstraining wird bereitgestellt. Kinder müssen mindestens 2 Jahre alt sein, um als Mitfahrer mitzufahren.</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq14" class="faq-toggle">
        <label for="faq14" class="faq-question">
          <span class="faq-index">14</span> WAS SIND EURE ÖFFNUNGSZEITEN?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>Adventure Tours Vernal ist <strong>täglich von 7:00 bis 19:00 Uhr</strong> Mountain Time geöffnet, 7 Tage die Woche.</p>
            <p><strong>Ruf an unter <a href="tel:435-219-9447" class="faq-link">(435) 219-9447</a></strong>, um deine ATV-Tour zu buchen, oder besuche <a href="https://adventuretoursvernal.com" class="faq-link">adventuretoursvernal.com</a>.</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq15" class="faq-toggle">
        <label for="faq15" class="faq-question">
          <span class="faq-index">15</span> WELCHE TOUR-OPTIONEN BIETET IHR AN?
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>Adventure Tours Vernal bietet eine geführte 3-stündige Tour auf Kawasaki KRX 1000 Side-by-Sides an, mit einer Auswahl von fünf Pistensystemen, die du bei der Buchung auswählst:</p>
            <ul>
              <li>Doc's Beach</li>
              <li>Moonshine Arch</li>
              <li>Ashley Gorge</li>
              <li>Outlaw Trail</li>
              <li>Asphalt Ridge</li>
            </ul>
            <p>Jede Tour beinhaltet Kawasaki KRX 1000 Side-by-Sides, erfahrene lokale Guides, Sicherheitsausrüstung, Training, Wasser und Snacks.</p>
          </div>
        </div>
      </div>

    </div><!-- end .faq-container -->
  </div>
</section>

<!-- Mobiler Sticky-CTA-Button -->
<div class="mobile-sticky-cta">
  <button onclick="location.href='/de/booking/'">Jetzt deine Tour buchen</button>
</div>

<script is:inline>
document.addEventListener('DOMContentLoaded', function() {

  // Auto-close other FAQs when one opens
  const faqToggles = document.querySelectorAll('.faq-toggle');
  faqToggles.forEach(toggle => {
    toggle.addEventListener('change', function() {
      if (this.checked) {
        faqToggles.forEach(otherToggle => {
          if (otherToggle !== this && otherToggle.checked) {
            otherToggle.checked = false;
          }
        });
        setTimeout(() => {
          this.parentElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 300);
      }
    });
  });

  // Keyboard navigation
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach((question, index) => {
    question.setAttribute('tabindex', '0');
    question.setAttribute('role', 'button');
    question.setAttribute('aria-expanded', 'false');
    question.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const checkbox = this.previousElementSibling;
        checkbox.checked = !checkbox.checked;
        this.setAttribute('aria-expanded', checkbox.checked);
        checkbox.dispatchEvent(new Event('change'));
      }
      if (e.key === 'ArrowDown') { e.preventDefault(); if (faqQuestions[index + 1]) faqQuestions[index + 1].focus(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); if (faqQuestions[index - 1]) faqQuestions[index - 1].focus(); }
    });
    question.addEventListener('click', function() {
      const checkbox = this.previousElementSibling;
      setTimeout(() => { this.setAttribute('aria-expanded', checkbox.checked); }, 10);
    });
  });

  // URL hash linking
  if (window.location.hash) {
    const targetId = window.location.hash.substring(1);
    const targetCheckbox = document.getElementById(targetId);
    if (targetCheckbox && targetCheckbox.classList.contains('faq-toggle')) {
      targetCheckbox.checked = true;
      setTimeout(() => {
        targetCheckbox.parentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 500);
    }
  }

  // Smooth load animation
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    setTimeout(() => {
      item.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }, 100 * index);
  });
});
</script>

`;

const JA = `

<!-- ================================================
     ページ要約ブロック — Google AI Overviews 向け
     ================================================ -->
<p class="page-summary" style="position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;" aria-hidden="false">
  Adventure Tours Vernalが、ユタ州バーナルのガイド付きUTVツアーについてよくあるご質問にお答えします。料金、年齢制限、持ち物、天候時の対応、グループツアー、ツアーの選択肢などを扱っています。年中無休、午前7時〜午後7時営業。お電話は(435) 219-9447まで。
</p>

<section id="faq" class="faq-section">
  <div class="faq-watermark">INTEL</div>

  <div class="container">
    <div class="section-header">
      <span class="status-badge">ミッション準備</span>
      <h1 class="section-title" style="font-size:clamp(1.8rem,3.5vw,2.8rem);">UTVツアーのよくあるご質問 — Adventure Tours Vernal</h1>
      <p class="section-subtitle">ユタ州のバックカントリーへ出発する前に、知っておきたい情報をひととおり押さえておきましょう。</p>
      <p style="display:inline-flex;align-items:center;gap:8px;margin:14px auto 0;padding:7px 15px;border:1px solid rgba(212,118,78,0.5);border-radius:999px;background:#ffffff;box-shadow:0 1px 4px rgba(0,0,0,0.08);font-size:0.95rem;color:#4a4139;"><span aria-hidden="true" style="color:#e6a817;letter-spacing:1px;">★★★★★</span> <span><strong>${SITE.rating.value}</strong> &middot; ${SITE.rating.count}件のGoogleレビュー</span></p>
    </div>

    <div class="faq-container">

      <div class="faq-item">
        <input type="checkbox" id="faq1" class="faq-toggle">
        <label for="faq1" class="faq-question">
          <span class="faq-index">01</span> 自分のマシンを持ち込めますか？
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p><strong>もちろんです！</strong> ご自分のマシンをお持ち込みいただくと、よりご希望に沿った、さらには過激なライドも可能になります。オンラインでのご予約もできますが、マシンの持ち込みやカスタムライドをご希望の場合は、まずお電話かメールでどのような走りをしたいかをお聞かせいただくのが一番です。</p>
            <p>トランシーバーをお貸しし、皆さまが快適に、そして思いきり楽しめるよう全力を尽くします。トレイルのより「ハードコア」な区間では、より易しい迂回ルートも喜んでご案内します。私たちはこのエリアを知り尽くしていること、そして楽しみ方が何通りもあることを誇りにしています。</p>
            <p>ツアーガイドには何でも遠慮なくお伝えください。トレイルのある区間を走ることに不安を感じたら、どうぞそうおっしゃってください。安全が最優先事項の1番で、その次に大切なのが楽しむことです。</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq2" class="faq-toggle">
        <label for="faq2" class="faq-question">
          <span class="faq-index">02</span> グループで参加できますか？
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>もちろんです。グループツアーについてはぜひご連絡ください。人数と、ご覧になりたいものをお知らせください。ご用意している選択肢は数多くありますので、立ち寄って見学したい追加のスポット、レストランやホテルの宿泊、バー、ナイトライフ、お子さま向けのアクティビティなど、グループのご要望について一緒に検討できます。美しいUintah Basinへのご滞在中、皆さまのグループアクティビティの一員になれましたら嬉しく思います。</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq3" class="faq-toggle">
        <label for="faq3" class="faq-question">
          <span class="faq-index">03</span> 天候はどうなりますか？
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>晴れでも雨でもツアーは催行します。ただし、荒天の場合や、その他予期せぬ事情により中止せざるを得ない場合は、日程の変更または全額返金をお選びいただけます。</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq4" class="faq-toggle">
        <label for="faq4" class="faq-question">
          <span class="faq-index">04</span> 何を持っていけばよいですか？
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>数時間屋外で過ごしますので、ご自身の判断で必要なものをご用意ください。どのツアーでも、非常用のトイレットペーパーやその他の必需品はできる限り常備しています。とはいえ、必要になりそうだと思うものは、お持ちいただくのが一番です。日焼け止め、虫よけスプレー、リップクリームは決して無駄になりません。</p>
            <p><strong>サングラス、帽子、カメラ、ジャケット、つま先の覆われた靴</strong>のご持参をおすすめします。必須ではありません（とはいえ、持っていて使わないほうが安心ですよね）。気温が変動することがありますので、重ね着できる服装もよいでしょう。水と軽いスナックは無料でご用意しています。アレルギーのある方は、ご自身の食事制限に合ったものをお持ちいただくことをおすすめします。サイドバイサイドの後部に積めるスペースには限りがありますので、何を持っていくか迷われたら、お気軽にお尋ねください。</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq5" class="faq-toggle">
        <label for="faq5" class="faq-question">
          <span class="faq-index">05</span> 集合場所には何時に着けばよいですか？
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>すべてのツアーで、出発時刻の<strong>30分前</strong>にはお越しください。ご予約のツアー時刻が、実際の出発時刻です。安全講習がすべて終わり、車両に慣れていただくまでは出発しません。出発前に、免責同意書やギアの選定など、オリエンテーションと安全対策のすべてを確認します。</p>
            <p>ご予約が完了しますと、お選びいただいたツアーに関する重要な情報を記載した確認メールが届きます。よくお読みになり、内容に従ってください。オリエンテーション開始時に、手続きがすべて済みギアの選定も終えた状態でその場にいらっしゃらない場合、ツアーの参加枠を失うことがあり、その場合は返金いたしかねます。スクールバスに乗るのと同じで、決められた時刻にその場にいなければ、置いていかれてしまいます。</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq6" class="faq-toggle">
        <label for="faq6" class="faq-question">
          <span class="faq-index">06</span> 年齢制限はありますか？
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>当社のマシンを運転するには、<strong>18歳以上</strong>である必要があります。当社のマシンに同乗するには、<strong>2歳以上</strong>である必要があります。</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq7" class="faq-toggle">
        <label for="faq7" class="faq-question">
          <span class="faq-index">07</span> キャンセルとデポジットについて
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>キャンセルポリシーの全文は<a href="/ja/cancellation-policy/" class="faq-link">こちら</a>をご覧ください。</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq8" class="faq-toggle">
        <label for="faq8" class="faq-question">
          <span class="faq-index">08</span> ATVツアーの料金はいくらですか？
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>Kawasaki KRX 1000のサイドバイサイドで走る、ガイド付き3時間ツアーを1種類ご用意しています。</p>
            <ul>
              <li><strong>1台あたり$349</strong> — 最大2名まで乗車できます</li>
              <li><strong>同乗$125</strong> — ガイドの車両に3人目を同乗者として追加できます</li>
              <li><strong>1時間あたり$99</strong> — 1台につき、ツアーの延長料金です</li>
            </ul>
            <p>最少催行人数は3名で、最大12名（6台）までのグループを歓迎します。<strong>空き状況は<a href="tel:435-219-9447" class="faq-link">(435) 219-9447</a>までお電話でお問い合わせください。</strong></p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq9" class="faq-toggle">
        <label for="faq9" class="faq-question">
          <span class="faq-index">09</span> ATVの経験は必要ですか？
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p><strong>ATVの経験は一切必要ありません。</strong> Adventure Tours Vernalはまったくの初心者の方も歓迎しており、すべてのツアーの前に安全講習を一通り行います。</p>
            <p>経験豊富なガイドが、Kawasaki KRX 1000のサイドバイサイドの操作を一つひとつ手ほどきします。初めての方からベテランライダーまで、あらゆるレベルの方を歓迎します。</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq10" class="faq-toggle">
        <label for="faq10" class="faq-question">
          <span class="faq-index">10</span> Dinosaur National Monumentを訪れることはできますか？
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p><strong>はい！</strong> ガイド付きの<strong>3時間UTVツアー</strong>では、Dinosaur National Monument近くのバックカントリートレイルを走り、古代の岩層や岩絵を巡ります。</p>
            <p>モニュメントで有名な恐竜の骨の壁は、National Park Serviceが管理する別の施設です。午前中をモニュメントで過ごし、午後は周辺のDinosaur Countryのバックカントリーを走るUTVツアーに参加される方が多くいらっしゃいます。</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq11" class="faq-toggle">
        <label for="faq11" class="faq-question">
          <span class="faq-index">11</span> なぜAdventure Tours Vernalなのですか？
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>Adventure Tours Vernalは、<strong>ユタ州バーナルで唯一の、Kawasaki KRX 1000によるガイド付きツアー会社です。</strong> 次のような場所へ、独占的にご案内します。</p>
            <ul>
              <li>地元の人しか知らない隠れたトレイル</li>
              <li>古代の岩絵とロックアート</li>
              <li>Butch Cassidyの隠れ家</li>
              <li>景観の美しいアーチや岩層</li>
            </ul>
            <p>地元を知り尽くしたガイド、プロ仕様の安全装備、そしてあらゆるレベルの方を歓迎します。<strong>年中無休、午前7時〜午後7時営業。</strong></p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq12" class="faq-toggle">
        <label for="faq12" class="faq-question">
          <span class="faq-index">12</span> ツアーの所要時間はどのくらいですか？
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>標準のガイド付きツアーの所要時間は約<strong>3時間</strong>で、グループや経験レベルに合わせて5つのトレイルシステムからお選びいただけます。</p>
            <ul>
              <li><strong>Doc's Beach</strong>、<strong>Moonshine Arch</strong>、<strong>Ashley Gorge</strong>、<strong>Outlaw Trail</strong>、<strong>Asphalt Ridge</strong></li>
              <li>トレイルシステムはご予約時にお選びいただきます</li>
              <li>もっと走りたい方は、1台1時間あたり$99で延長できます</li>
            </ul>
            <p>すべてのツアーに、安全装備、講習、水、スナックが含まれます。</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq13" class="faq-toggle">
        <label for="faq13" class="faq-question">
          <span class="faq-index">13</span> ファミリー向けのツアーですか？
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p><strong>もちろんです！</strong> ガイド付きツアーは、お子さま連れのご家族にぴったりです。特長は次のとおりです。</p>
            <ul>
              <li>緩やかな地形の走りやすいトレイル</li>
              <li>息をのむような砂漠の眺望</li>
              <li>写真撮影にぴったりのスポット</li>
              <li>2人乗りのサイドバイサイド。ご家族は複数台をご予約いただき、一緒に走ります</li>
            </ul>
            <p>経験は不要です。安全講習を一通り行います。同乗者としてご参加いただくには、お子さまは2歳以上である必要があります。</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq14" class="faq-toggle">
        <label for="faq14" class="faq-question">
          <span class="faq-index">14</span> 営業時間を教えてください
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>Adventure Tours Vernalは、Mountain Timeで<strong>毎日午前7:00から午後7:00まで</strong>、週7日営業しています。</p>
            <p>ATVツアーのご予約は<strong><a href="tel:435-219-9447" class="faq-link">(435) 219-9447</a>までお電話</strong>いただくか、<a href="https://adventuretoursvernal.com" class="faq-link">adventuretoursvernal.com</a>をご覧ください。</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq15" class="faq-toggle">
        <label for="faq15" class="faq-question">
          <span class="faq-index">15</span> どのようなツアーがありますか？
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>Adventure Tours Vernalでは、Kawasaki KRX 1000のサイドバイサイドで走るガイド付き3時間ツアーを1種類ご用意しており、ご予約時に5つのトレイルシステムからお選びいただけます。</p>
            <ul>
              <li>Doc's Beach</li>
              <li>Moonshine Arch</li>
              <li>Ashley Gorge</li>
              <li>Outlaw Trail</li>
              <li>Asphalt Ridge</li>
            </ul>
            <p>すべてのツアーに、Kawasaki KRX 1000のサイドバイサイド、地元を知り尽くしたガイド、安全装備、講習、水、スナックが含まれます。</p>
          </div>
        </div>
      </div>

    </div><!-- end .faq-container -->
  </div>
</section>

<!-- モバイル用の固定CTAボタン -->
<div class="mobile-sticky-cta">
  <button onclick="location.href='/ja/booking/'">今すぐツアーを予約</button>
</div>

<script is:inline>
document.addEventListener('DOMContentLoaded', function() {

  // Auto-close other FAQs when one opens
  const faqToggles = document.querySelectorAll('.faq-toggle');
  faqToggles.forEach(toggle => {
    toggle.addEventListener('change', function() {
      if (this.checked) {
        faqToggles.forEach(otherToggle => {
          if (otherToggle !== this && otherToggle.checked) {
            otherToggle.checked = false;
          }
        });
        setTimeout(() => {
          this.parentElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 300);
      }
    });
  });

  // Keyboard navigation
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach((question, index) => {
    question.setAttribute('tabindex', '0');
    question.setAttribute('role', 'button');
    question.setAttribute('aria-expanded', 'false');
    question.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const checkbox = this.previousElementSibling;
        checkbox.checked = !checkbox.checked;
        this.setAttribute('aria-expanded', checkbox.checked);
        checkbox.dispatchEvent(new Event('change'));
      }
      if (e.key === 'ArrowDown') { e.preventDefault(); if (faqQuestions[index + 1]) faqQuestions[index + 1].focus(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); if (faqQuestions[index - 1]) faqQuestions[index - 1].focus(); }
    });
    question.addEventListener('click', function() {
      const checkbox = this.previousElementSibling;
      setTimeout(() => { this.setAttribute('aria-expanded', checkbox.checked); }, 10);
    });
  });

  // URL hash linking
  if (window.location.hash) {
    const targetId = window.location.hash.substring(1);
    const targetCheckbox = document.getElementById(targetId);
    if (targetCheckbox && targetCheckbox.classList.contains('faq-toggle')) {
      targetCheckbox.checked = true;
      setTimeout(() => {
        targetCheckbox.parentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 500);
    }
  }

  // Smooth load animation
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    setTimeout(() => {
      item.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }, 100 * index);
  });
});
</script>

`;

const ZH = `

<!-- ================================================
     PAGE SUMMARY BLOCK — feeds Google AI Overviews
     ================================================ -->
<p class="page-summary" style="position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;" aria-hidden="false">
  Adventure Tours Vernal 为你解答关于 Vernal（犹他州）导览式 UTV 行程的常见问题。内容涵盖价格、年龄要求、需携带物品、天气政策、团队行程以及行程选择。每天 7am–7pm 营业。请致电 (435) 219-9447。
</p>

<section id="faq" class="faq-section">
  <div class="faq-watermark">INTEL</div>

  <div class="container">
    <div class="section-header">
      <span class="status-badge">MISSION PREP</span>
      <h1 class="section-title" style="font-size:clamp(1.8rem,3.5vw,2.8rem);">UTV 行程常见问题 — Adventure Tours Vernal</h1>
      <p class="section-subtitle">在你出发前往犹他州荒野之前，先把这些事实装进行囊。</p>
      <p style="display:inline-flex;align-items:center;gap:8px;margin:14px auto 0;padding:7px 15px;border:1px solid rgba(212,118,78,0.5);border-radius:999px;background:#ffffff;box-shadow:0 1px 4px rgba(0,0,0,0.08);font-size:0.95rem;color:#4a4139;"><span aria-hidden="true" style="color:#e6a817;letter-spacing:1px;">★★★★★</span> <span><strong>${SITE.rating.value}</strong> &middot; ${SITE.rating.count} 条 Google 评价</span></p>
    </div>

    <div class="faq-container">

      <div class="faq-item">
        <input type="checkbox" id="faq1" class="faq-toggle">
        <label for="faq1" class="faq-question">
          <span class="faq-index">01</span> 我可以带上自己的越野车吗？
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p><strong>当然可以！</strong>带上自己的越野车，能够玩到更个性化、甚至更极限的路线。你可以在线预订，但如果是自带越野车或定制行程，最好先打电话或发邮件给我们，说明你想体验的骑行类型。</p>
            <p>我们会提供对讲机，并尽全力让每个人都玩得尽兴（同时又不失舒适）。在越野路线中更「硬核」的路段，我们很乐意提供更容易的替代方案。我们非常自豪于对这些区域了如指掌，也知道有无数种享受它们的方式！</p>
            <p>请与你的向导充分沟通。如果你对越野路线的某一段感到不放心，尽管说出来！安全是第一优先，紧随其后的就是尽情享受。</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq2" class="faq-toggle">
        <label for="faq2" class="faq-question">
          <span class="faq-index">02</span> 我可以带一个团队来吗？
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>当然可以！团队行程请联系我们。告诉我们你的团队有多大、想看些什么。我们有很多选择，可以一起商量你们团队的需求，比如额外的停靠观光点、餐厅和酒店住宿、酒吧、夜生活、适合孩子的活动等等。在你们畅游美丽的 Uintah Basin 期间，我们很乐意成为你们团队活动的一部分。</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq3" class="faq-toggle">
        <label for="faq3" class="faq-question">
          <span class="faq-index">03</span> 天气不好怎么办？
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>无论晴天还是下雨，我们都照常出行。不过，如遇极端天气，或因其他不可预见的情况我们不得不取消行程，你可以选择改期或获得全额退款。</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq4" class="faq-toggle">
        <label for="faq4" class="faq-question">
          <span class="faq-index">04</span> 我应该带些什么？
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>我们会在户外待上好几个小时，请自行妥善判断。我们会尽量为每一趟行程备好应急厕纸和其他必需品。不过，如果你觉得自己可能会用到，最好还是随身带上！防晒霜、驱蚊喷雾和润唇膏永远不会多余。</p>
            <p>我们建议你带上<strong>太阳镜、帽子、相机、外套和包脚的鞋子。</strong>这些并非必需（但有备无患，对吧？）。你也可以采用洋葱式穿搭，因为气温可能会有起伏。我们免费提供饮用水和小食。如果你有任何过敏情况，建议自备符合你饮食限制的食物。并排越野车后座的空间有限，所以如果你不确定该带什么，尽管问我们！</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq5" class="faq-toggle">
        <label for="faq5" class="faq-question">
          <span class="faq-index">05</span> 我应该什么时候到集合点？
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>所有行程都请在出发时间<strong>前 30 分钟</strong>到达。行程预订时间就是实际出发时间。在完成全部安全培训、你熟悉自己的车辆之前，我们不会出发。出发前，我们会逐项讲解所有的行前说明和安全事项，比如免责声明、装备选择等。</p>
            <p>完成预订后，你会收到一封确认邮件，里面包含关于你所选行程的重要信息。请仔细阅读并遵照执行。如果在行前说明开始时，你没有到场、手续没办完、装备没选好，你可能会失去这次行程的名额，且不予退款。这就像赶校车一样……到点不在，就会被落下！</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq6" class="faq-toggle">
        <label for="faq6" class="faq-question">
          <span class="faq-index">06</span> 我需要年满多少岁？
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>要驾驶我们的越野车，你需要至少<strong>年满 18 岁。</strong>要作为乘客乘坐我们的越野车，你需要至少<strong>年满 2 岁。</strong></p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq7" class="faq-toggle">
        <label for="faq7" class="faq-question">
          <span class="faq-index">07</span> 取消和押金？
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>点击<a href="/cancellation-policy/" class="faq-link">这里</a>查看完整的取消政策。</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq8" class="faq-toggle">
        <label for="faq8" class="faq-question">
          <span class="faq-index">08</span> ATV 行程要多少钱？
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>我们提供一种由 Kawasaki KRX 1000 并排越野车带你体验的导览式 3 小时行程：</p>
            <ul>
              <li><strong>每台车 $349</strong> — 最多可坐 2 名乘员</li>
              <li><strong>$125 同乘</strong> — 在有向导的车上加坐第三名乘客</li>
              <li><strong>每小时 $99</strong> — 每台车，用于延长你的行程</li>
            </ul>
            <p>需 3 人成行，最多可接待 12 位客人（6 台车）。<strong>请致电 <a href="tel:435-219-9447" class="faq-link">(435) 219-9447</a> 查询空位。</strong></p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq9" class="faq-toggle">
        <label for="faq9" class="faq-question">
          <span class="faq-index">09</span> 我需要有 ATV 经验吗？
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p><strong>不需要任何 ATV 经验！</strong>Adventure Tours Vernal 欢迎完全的新手，并在每趟行程前提供完整的安全培训。</p>
            <p>我们经验丰富的向导会手把手、一步步教你操作 Kawasaki KRX 1000 并排越野车。我们欢迎各种水平的人——从第一次上手的新手到老练的骑手。</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq10" class="faq-toggle">
        <label for="faq10" class="faq-question">
          <span class="faq-index">10</span> 我们可以顺道去 Dinosaur National Monument 吗？
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p><strong>可以！</strong>我们的导览式 <strong>3 小时 UTV 行程</strong>会探索 Dinosaur National Monument 附近的荒野越野路线，包括古老的岩层和岩画。</p>
            <p>纪念区里那面著名的恐龙骨墙是由 National Park Service 管理的另一处独立景点——许多客人会上午在纪念区游览，下午再参加一趟穿越周边恐龙之乡荒野的 UTV 行程。</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq11" class="faq-toggle">
        <label for="faq11" class="faq-question">
          <span class="faq-index">11</span> 为什么选择 ADVENTURE TOURS VERNAL？
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>Adventure Tours Vernal 是 <strong>Vernal（犹他州）唯一一家提供 Kawasaki KRX 1000 导览游的公司。</strong>我们提供独家进入以下地方的机会：</p>
            <ul>
              <li>只有当地人才知道的隐秘越野路线</li>
              <li>古老的岩画</li>
              <li>Butch Cassidy 的藏身之处</li>
              <li>风景优美的拱门和岩石地貌</li>
            </ul>
            <p>专业的本地向导、专业的安全装备，欢迎各种水平的人参加。<strong>每天 7am–7pm 营业。</strong></p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq12" class="faq-toggle">
        <label for="faq12" class="faq-question">
          <span class="faq-index">12</span> 你们的行程有多长？
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>我们的标准导览游大约 <strong>3 小时</strong>，提供五套越野路线供你选择，以匹配你的团队和经验水平：</p>
            <ul>
              <li><strong>Doc's Beach</strong>、<strong>Moonshine Arch</strong>、<strong>Ashley Gorge</strong>、<strong>Outlaw Trail</strong> 和 <strong>Asphalt Ridge</strong></li>
              <li>预订时由你选择越野路线</li>
              <li>想多玩一会儿？每台车每小时 $99 即可延长</li>
            </ul>
            <p>每趟行程都包含安全装备、培训、饮用水和小食。</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq13" class="faq-toggle">
        <label for="faq13" class="faq-question">
          <span class="faq-index">13</span> 你们的行程适合家庭参加吗？
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p><strong>当然！</strong>我们的导览游非常适合带孩子的家庭。它包含：</p>
            <ul>
              <li>地形平缓、轻松好走的越野路线</li>
              <li>令人惊叹的沙漠远景</li>
              <li>拍照的好机会</li>
              <li>2 座并排越野车；家庭会预订多台车一起出行</li>
            </ul>
            <p>无需任何经验——我们提供完整的安全培训。孩子须至少年满 2 岁才能作为乘客乘坐。</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq14" class="faq-toggle">
        <label for="faq14" class="faq-question">
          <span class="faq-index">14</span> 你们的营业时间是什么时候？
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>Adventure Tours Vernal <strong>每天从早上 7:00 到晚上 7:00 营业</strong>，采用 Mountain Time，每周 7 天。</p>
            <p><strong>请致电 <a href="tel:435-219-9447" class="faq-link">(435) 219-9447</a></strong> 预订你的 ATV 行程，或访问 <a href="https://adventuretoursvernal.com" class="faq-link">adventuretoursvernal.com</a>。</p>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq15" class="faq-toggle">
        <label for="faq15" class="faq-question">
          <span class="faq-index">15</span> 你们提供哪些行程选择？
        </label>
        <div class="faq-answer">
          <div class="answer-content">
            <p>Adventure Tours Vernal 提供一种由 Kawasaki KRX 1000 并排越野车带你体验的导览式 3 小时行程，预订时可从五套越野路线中选择：</p>
            <ul>
              <li>Doc's Beach</li>
              <li>Moonshine Arch</li>
              <li>Ashley Gorge</li>
              <li>Outlaw Trail</li>
              <li>Asphalt Ridge</li>
            </ul>
            <p>每趟行程都包含 Kawasaki KRX 1000 并排越野车、专业的本地向导、安全装备、培训、饮用水和小食。</p>
          </div>
        </div>
      </div>

    </div><!-- end .faq-container -->
  </div>
</section>

<!-- Mobile Sticky CTA -->
<div class="mobile-sticky-cta">
  <button onclick="location.href='/booking/'">立即预订你的行程</button>
</div>

<script is:inline>
document.addEventListener('DOMContentLoaded', function() {

  // Auto-close other FAQs when one opens
  const faqToggles = document.querySelectorAll('.faq-toggle');
  faqToggles.forEach(toggle => {
    toggle.addEventListener('change', function() {
      if (this.checked) {
        faqToggles.forEach(otherToggle => {
          if (otherToggle !== this && otherToggle.checked) {
            otherToggle.checked = false;
          }
        });
        setTimeout(() => {
          this.parentElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 300);
      }
    });
  });

  // Keyboard navigation
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach((question, index) => {
    question.setAttribute('tabindex', '0');
    question.setAttribute('role', 'button');
    question.setAttribute('aria-expanded', 'false');
    question.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const checkbox = this.previousElementSibling;
        checkbox.checked = !checkbox.checked;
        this.setAttribute('aria-expanded', checkbox.checked);
        checkbox.dispatchEvent(new Event('change'));
      }
      if (e.key === 'ArrowDown') { e.preventDefault(); if (faqQuestions[index + 1]) faqQuestions[index + 1].focus(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); if (faqQuestions[index - 1]) faqQuestions[index - 1].focus(); }
    });
    question.addEventListener('click', function() {
      const checkbox = this.previousElementSibling;
      setTimeout(() => { this.setAttribute('aria-expanded', checkbox.checked); }, 10);
    });
  });

  // URL hash linking
  if (window.location.hash) {
    const targetId = window.location.hash.substring(1);
    const targetCheckbox = document.getElementById(targetId);
    if (targetCheckbox && targetCheckbox.classList.contains('faq-toggle')) {
      targetCheckbox.checked = true;
      setTimeout(() => {
        targetCheckbox.parentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 500);
    }
  }

  // Smooth load animation
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    setTimeout(() => {
      item.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }, 100 * index);
  });
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
  if (locale === 'pt') return PT;
  if (locale === 'fr') return FR;
  if (locale === 'de') return DE;
  if (locale === 'zh') return ZH;
  if (locale === 'ja') return JA;
  return bodyHtml;
}
