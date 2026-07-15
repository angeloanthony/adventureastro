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

/**
 * Locale-aware accessor (P2D pattern; Spanish populated P3A). Every
 * locale without a committed variant falls back to English. Callers that
 * don't need locale awareness keep importing `bodyHtml` directly.
 */
export function getBodyHtml(locale: string = DEFAULT_LOCALE): string {
  if (locale === 'es') return ES;
  return bodyHtml;
}
