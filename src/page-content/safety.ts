// safety.ts — extracted page body content (P2C). English source of truth
// for this page's body; rendered via set:html. Spanish variant added P3A
// (formal "usted").
import { DEFAULT_LOCALE } from '../lib/i18n';

export const bodyHtml = `
<!-- PAGE SUMMARY BLOCK -->
<p class="page-summary" style="position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;" aria-hidden="false">
  Adventure Tours Vernal safety guidelines for guided UTV tours in Vernal, Utah. Drivers must be 18+. Passengers must be 2+. Seatbelts required. Zero tolerance for alcohol or drugs. Full safety briefing provided before every tour. Call (435) 219-9447.
</p>

<section class="policy-section">
  <div class="container">
    <div class="section-header">
      <h1 class="section-title">Safety Guidelines</h1>
      <p class="section-subtitle">Your safety is our #1 priority. Please review these guidelines before your adventure.</p>
    </div>

    <div class="policy-container">

      <!-- BEFORE YOUR TOUR -->
      <div class="policy-card">
        <div class="policy-icon">📋</div>
        <h2 class="policy-heading">Before Your Tour</h2>
        <div class="policy-list">
          <h3>Arrival & Check-In:</h3>
          <ul>
            <li>Arrive <strong>30 minutes early</strong> for orientation and safety briefing</li>
            <li>Bring a valid driver's license (required for all drivers)</li>
            <li>Complete all required waivers and agreements</li>
            <li>Attend the mandatory safety orientation</li>
          </ul>
          <h3>Health & Physical Requirements:</h3>
          <ul>
            <li>All participants must be in good physical health</li>
            <li>Notify your guide of any medical conditions, injuries, or concerns</li>
            <li>Pregnant women should consult their doctor before participating</li>
            <li>If you have back, neck, or heart conditions, please inform us in advance</li>
          </ul>
          <h3>Alcohol & Substance Policy:</h3>
          <ul>
            <li><strong>Zero tolerance</strong> for alcohol or drugs</li>
            <li>You will not be permitted to ride if under the influence</li>
            <li>No refunds will be given for violations</li>
          </ul>
        </div>
      </div>

      <!-- AGE REQUIREMENTS -->
      <div class="policy-card">
        <div class="policy-icon">👥</div>
        <h2 class="policy-heading">Age Requirements</h2>
        <div class="policy-table">
          <div class="policy-row">
            <div class="policy-timeframe">To Drive</div>
            <div class="policy-refund refund-full">18+ Years Old</div>
          </div>
          <div class="policy-row">
            <div class="policy-timeframe">To Ride as Passenger</div>
            <div class="policy-refund refund-full">2+ Years Old</div>
          </div>
        </div>
        <div class="policy-note">
          <strong>Important:</strong> All drivers must present a valid driver's license. Parents/guardians must sign waivers for minors.
        </div>
      </div>

      <!-- VEHICLE OPERATION -->
      <div class="policy-card">
        <div class="policy-icon">🚙</div>
        <h2 class="policy-heading">Vehicle Operation & Safety</h2>
        <div class="policy-list">
          <h3>Operating the Vehicle:</h3>
          <ul>
            <li>Always wear your seatbelt - no exceptions</li>
            <li>Keep hands and arms inside the vehicle at all times</li>
            <li>Never stand up while the vehicle is in motion</li>
            <li>Follow your guide's instructions at all times</li>
            <li>Maintain a safe distance from other vehicles</li>
            <li>Use walkie-talkies to communicate with your guide</li>
          </ul>
          <h3>Safety Equipment (Required):</h3>
          <ul>
            <li>Seatbelts must be worn by all passengers</li>
            <li>Helmets (provided upon request)</li>
            <li>Safety goggles or sunglasses recommended</li>
          </ul>
          <h3>Prohibited Actions:</h3>
          <ul>
            <li>Racing or speeding</li>
            <li>Reckless driving or stunts</li>
            <li>Leaving the designated trail</li>
            <li>Operating vehicle under the influence</li>
            <li>Ignoring guide instructions</li>
          </ul>
        </div>
        <div class="policy-warning">
          <strong>⚠️ Warning:</strong> Failure to follow safety rules may result in immediate termination of your tour with no refund. Reckless behavior voids all insurance and damage waivers.
        </div>
      </div>

      <!-- TERRAIN & TRAIL SAFETY -->
      <div class="policy-card">
        <div class="policy-icon">⛰️</div>
        <h2 class="policy-heading">Terrain & Trail Safety</h2>
        <div class="policy-list">
          <h3>Trail Conditions:</h3>
          <ul>
            <li>Trails may include rocks, steep inclines, water crossings, and rough terrain</li>
            <li>Weather can change quickly - be prepared</li>
            <li>Dust and dirt are common - bring eye protection</li>
            <li>Cell service may be limited in remote areas</li>
          </ul>
          <h3>Stay on Trail:</h3>
          <ul>
            <li>Never leave designated trails</li>
            <li>Respect private property and posted signs</li>
            <li>Follow Leave No Trace principles</li>
            <li>Do not disturb wildlife or plants</li>
          </ul>
          <h3>Emergency Situations:</h3>
          <ul>
            <li>Alert your guide immediately if you feel unsafe</li>
            <li>Use walkie-talkie for communication</li>
            <li>First aid kits are available on every tour</li>
            <li>Your guide is trained in wilderness first aid</li>
          </ul>
        </div>
      </div>

      <!-- WEATHER & ENVIRONMENTAL -->
      <div class="policy-card">
        <div class="policy-icon">🌦️</div>
        <h2 class="policy-heading">Weather & Environmental Safety</h2>
        <div class="policy-list">
          <h3>Weather Preparedness:</h3>
          <ul>
            <li>We operate in most weather conditions</li>
            <li>Tours may be cancelled or rescheduled for extreme weather</li>
            <li>Temperatures can vary significantly - dress in layers</li>
            <li>Bring rain gear if weather looks uncertain</li>
          </ul>
          <h3>Sun Protection:</h3>
          <ul>
            <li>Utah sun is intense - wear sunscreen (SPF 30+)</li>
            <li>Bring sunglasses with UV protection</li>
            <li>Wear a hat or bandana</li>
            <li>Stay hydrated - water provided</li>
          </ul>
          <h3>Wildlife Safety:</h3>
          <ul>
            <li>Do not approach or feed wildlife</li>
            <li>Keep a safe distance from all animals</li>
            <li>Be aware of snakes, especially in warmer months</li>
            <li>Report any wildlife sightings to your guide</li>
          </ul>
        </div>
      </div>

      <!-- COMMUNICATION -->
      <div class="policy-card">
        <div class="policy-icon">📡</div>
        <h2 class="policy-heading">Communication & Group Safety</h2>
        <div class="policy-list">
          <h3>Staying Connected:</h3>
          <ul>
            <li>Walkie-talkies provided for each vehicle</li>
            <li>Keep walkie-talkie on at all times</li>
            <li>Alert guide immediately if you need to stop</li>
            <li>Never leave the group without informing your guide</li>
          </ul>
          <h3>If You Experience Problems:</h3>
          <ul>
            <li>Stop safely and use walkie-talkie</li>
            <li>Do not attempt to fix mechanical issues yourself</li>
            <li>Wait for guide assistance</li>
            <li>Never continue if vehicle seems unsafe</li>
          </ul>
        </div>
      </div>

      <!-- DAMAGE & LIABILITY -->
      <div class="policy-card">
        <div class="policy-icon">🛡️</div>
        <h2 class="policy-heading">Damage & Liability</h2>
        <div class="policy-list">
          <h3>Vehicle Damage Waiver:</h3>
          <ul>
            <li>Required for all tours</li>
            <li>Limits your liability to deductible amount</li>
            <li>Void if caused by reckless driving</li>
            <li>Void if alcohol/drugs are involved</li>
          </ul>
          <h3>Accident Procedures:</h3>
          <ul>
            <li>Stop immediately and assess injuries</li>
            <li>Contact guide via walkie-talkie</li>
            <li>Do not move injured persons unless in immediate danger</li>
            <li>Document the incident with photos if possible</li>
          </ul>
        </div>
        <div class="deductible-info">
          <h3>Important Insurance Information:</h3>
          <p>You are covered under our liability insurance with a <strong>$1,000 deductible per accident</strong>. This applies regardless of fault. The Vehicle Damage Waiver can help limit your out-of-pocket costs for vehicle damage.</p>
        </div>
      </div>

      <!-- YOUR RESPONSIBILITIES -->
      <div class="policy-card">
        <div class="policy-icon">✅</div>
        <h2 class="policy-heading">Your Responsibilities</h2>
        <div class="policy-list">
          <h3>As a Participant, You Agree To:</h3>
          <ul>
            <li>Follow all guide instructions</li>
            <li>Operate vehicle safely and responsibly</li>
            <li>Respect other riders and the environment</li>
            <li>Communicate any concerns immediately</li>
            <li>Complete all required paperwork honestly</li>
            <li>Accept personal responsibility for your safety</li>
          </ul>
        </div>
        <div class="policy-warning">
          <strong>Remember:</strong> ATV/UTV riding involves inherent risks. While we take every precaution to ensure your safety, you participate at your own risk. Please read and understand all waivers before signing.
        </div>
      </div>

      <!-- CONTACT CTA -->
      <div class="policy-cta">
        <h3>Questions About Safety?</h3>
        <p>If you have any safety concerns or questions before your tour, please contact us. We're here to ensure you have a safe and amazing adventure!</p>
        <div class="cta-buttons">
          <a href="tel:435-219-9447" class="cta-button primary">📞 Call (435) 219-9447</a>
          <a href="/booking/" class="cta-button secondary">Book Your Safe Adventure</a>
        </div>
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
<!-- BLOQUE DE RESUMEN DE PÁGINA -->
<p class="page-summary" style="position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;" aria-hidden="false">
  Normas de seguridad de Adventure Tours Vernal para tours guiados en UTV en Vernal, Utah. Los conductores deben tener 18 años o más. Los pasajeros deben tener 2 años o más. Cinturón de seguridad obligatorio. Tolerancia cero al alcohol o las drogas. Se ofrece una sesión informativa de seguridad completa antes de cada tour. Llame al (435) 219-9447.
</p>

<section class="policy-section">
  <div class="container">
    <div class="section-header">
      <h1 class="section-title">Normas de Seguridad</h1>
      <p class="section-subtitle">Su seguridad es nuestra prioridad número uno. Por favor revise estas normas antes de su aventura.</p>
    </div>

    <div class="policy-container">

      <!-- ANTES DE SU TOUR -->
      <div class="policy-card">
        <div class="policy-icon">📋</div>
        <h2 class="policy-heading">Antes de Su Tour</h2>
        <div class="policy-list">
          <h3>Llegada y Registro:</h3>
          <ul>
            <li>Llegue <strong>30 minutos antes</strong> para la orientación y la sesión informativa de seguridad</li>
            <li>Traiga una licencia de conducir vigente (obligatoria para todos los conductores)</li>
            <li>Complete todas las exenciones y acuerdos requeridos</li>
            <li>Asista a la orientación de seguridad obligatoria</li>
          </ul>
          <h3>Requisitos de Salud y Condición Física:</h3>
          <ul>
            <li>Todos los participantes deben estar en buen estado de salud</li>
            <li>Informe a su guía sobre cualquier condición médica, lesión o inquietud</li>
            <li>Las mujeres embarazadas deben consultar con su médico antes de participar</li>
            <li>Si tiene afecciones de espalda, cuello o corazón, infórmenos con anticipación</li>
          </ul>
          <h3>Política sobre Alcohol y Sustancias:</h3>
          <ul>
            <li><strong>Tolerancia cero</strong> al alcohol o las drogas</li>
            <li>No se le permitirá conducir si se encuentra bajo la influencia</li>
            <li>No se otorgarán reembolsos por infracciones</li>
          </ul>
        </div>
      </div>

      <!-- REQUISITOS DE EDAD -->
      <div class="policy-card">
        <div class="policy-icon">👥</div>
        <h2 class="policy-heading">Requisitos de Edad</h2>
        <div class="policy-table">
          <div class="policy-row">
            <div class="policy-timeframe">Para Conducir</div>
            <div class="policy-refund refund-full">18 años o más</div>
          </div>
          <div class="policy-row">
            <div class="policy-timeframe">Para Viajar como Pasajero</div>
            <div class="policy-refund refund-full">2 años o más</div>
          </div>
        </div>
        <div class="policy-note">
          <strong>Importante:</strong> Todos los conductores deben presentar una licencia de conducir vigente. Los padres o tutores deben firmar las exenciones de los menores de edad.
        </div>
      </div>

      <!-- OPERACIÓN DEL VEHÍCULO -->
      <div class="policy-card">
        <div class="policy-icon">🚙</div>
        <h2 class="policy-heading">Operación del Vehículo y Seguridad</h2>
        <div class="policy-list">
          <h3>Al Operar el Vehículo:</h3>
          <ul>
            <li>Use siempre su cinturón de seguridad, sin excepciones</li>
            <li>Mantenga manos y brazos dentro del vehículo en todo momento</li>
            <li>Nunca se ponga de pie mientras el vehículo esté en movimiento</li>
            <li>Siga las instrucciones de su guía en todo momento</li>
            <li>Mantenga una distancia segura de otros vehículos</li>
            <li>Use el radio portátil para comunicarse con su guía</li>
          </ul>
          <h3>Equipo de Seguridad (Obligatorio):</h3>
          <ul>
            <li>Todos los pasajeros deben usar cinturón de seguridad</li>
            <li>Cascos (disponibles a solicitud)</li>
            <li>Se recomiendan gafas de seguridad o lentes de sol</li>
          </ul>
          <h3>Acciones Prohibidas:</h3>
          <ul>
            <li>Correr carreras o exceso de velocidad</li>
            <li>Conducción imprudente o acrobacias</li>
            <li>Salirse del sendero designado</li>
            <li>Operar el vehículo bajo la influencia</li>
            <li>Ignorar las instrucciones del guía</li>
          </ul>
        </div>
        <div class="policy-warning">
          <strong>⚠️ Advertencia:</strong> El incumplimiento de las normas de seguridad puede resultar en la terminación inmediata de su tour sin reembolso. El comportamiento imprudente anula todas las coberturas de seguro y exenciones por daños.
        </div>
      </div>

      <!-- SEGURIDAD EN EL TERRENO Y LOS SENDEROS -->
      <div class="policy-card">
        <div class="policy-icon">⛰️</div>
        <h2 class="policy-heading">Seguridad en el Terreno y los Senderos</h2>
        <div class="policy-list">
          <h3>Condiciones del Sendero:</h3>
          <ul>
            <li>Los senderos pueden incluir rocas, pendientes pronunciadas, cruces de agua y terreno accidentado</li>
            <li>El clima puede cambiar rápidamente; esté preparado</li>
            <li>El polvo y la tierra son comunes; traiga protección para los ojos</li>
            <li>La señal de celular puede ser limitada en zonas remotas</li>
          </ul>
          <h3>Manténgase en el Sendero:</h3>
          <ul>
            <li>Nunca se salga de los senderos designados</li>
            <li>Respete la propiedad privada y los letreros indicados</li>
            <li>Siga los principios de "No Deje Rastro"</li>
            <li>No perturbe la fauna ni la vegetación</li>
          </ul>
          <h3>Situaciones de Emergencia:</h3>
          <ul>
            <li>Avise a su guía de inmediato si se siente inseguro</li>
            <li>Use el radio portátil para comunicarse</li>
            <li>Hay botiquines de primeros auxilios disponibles en cada tour</li>
            <li>Su guía está capacitado en primeros auxilios en zonas silvestres</li>
          </ul>
        </div>
      </div>

      <!-- CLIMA Y SEGURIDAD AMBIENTAL -->
      <div class="policy-card">
        <div class="policy-icon">🌦️</div>
        <h2 class="policy-heading">Clima y Seguridad Ambiental</h2>
        <div class="policy-list">
          <h3>Preparación para el Clima:</h3>
          <ul>
            <li>Operamos en la mayoría de las condiciones climáticas</li>
            <li>Los tours pueden cancelarse o reprogramarse por clima extremo</li>
            <li>Las temperaturas pueden variar considerablemente; vístase en capas</li>
            <li>Traiga equipo para la lluvia si el clima parece incierto</li>
          </ul>
          <h3>Protección Solar:</h3>
          <ul>
            <li>El sol de Utah es intenso; use protector solar (FPS 30 o más)</li>
            <li>Traiga lentes de sol con protección UV</li>
            <li>Use sombrero o bandana</li>
            <li>Manténgase hidratado; le proporcionamos agua</li>
          </ul>
          <h3>Seguridad ante la Fauna Silvestre:</h3>
          <ul>
            <li>No se acerque ni alimente a los animales silvestres</li>
            <li>Mantenga una distancia segura de todos los animales</li>
            <li>Tenga cuidado con las serpientes, especialmente en los meses más cálidos</li>
            <li>Informe a su guía sobre cualquier avistamiento de fauna silvestre</li>
          </ul>
        </div>
      </div>

      <!-- COMUNICACIÓN -->
      <div class="policy-card">
        <div class="policy-icon">📡</div>
        <h2 class="policy-heading">Comunicación y Seguridad Grupal</h2>
        <div class="policy-list">
          <h3>Manténgase Conectado:</h3>
          <ul>
            <li>Se proporciona radio portátil para cada vehículo</li>
            <li>Mantenga el radio portátil encendido en todo momento</li>
            <li>Avise a su guía de inmediato si necesita detenerse</li>
            <li>Nunca se separe del grupo sin informar a su guía</li>
          </ul>
          <h3>Si Tiene Algún Problema:</h3>
          <ul>
            <li>Deténgase de manera segura y use el radio portátil</li>
            <li>No intente reparar problemas mecánicos usted mismo</li>
            <li>Espere la asistencia del guía</li>
            <li>Nunca continúe si el vehículo parece inseguro</li>
          </ul>
        </div>
      </div>

      <!-- DAÑOS Y RESPONSABILIDAD -->
      <div class="policy-card">
        <div class="policy-icon">🛡️</div>
        <h2 class="policy-heading">Daños y Responsabilidad</h2>
        <div class="policy-list">
          <h3>Exención por Daños al Vehículo:</h3>
          <ul>
            <li>Requerida para todos los tours</li>
            <li>Limita su responsabilidad al monto del deducible</li>
            <li>Se anula si es causada por conducción imprudente</li>
            <li>Se anula si hay alcohol o drogas involucrados</li>
          </ul>
          <h3>Procedimientos en Caso de Accidente:</h3>
          <ul>
            <li>Deténgase de inmediato y evalúe las lesiones</li>
            <li>Contacte al guía por radio portátil</li>
            <li>No mueva a las personas lesionadas a menos que estén en peligro inmediato</li>
            <li>Documente el incidente con fotos si es posible</li>
          </ul>
        </div>
        <div class="deductible-info">
          <h3>Información Importante sobre el Seguro:</h3>
          <p>Usted está cubierto bajo nuestro seguro de responsabilidad civil con un <strong>deducible de $1,000 por accidente</strong>. Esto aplica independientemente de quién tenga la culpa. La Exención por Daños al Vehículo puede ayudar a limitar sus costos de bolsillo por daños al vehículo.</p>
        </div>
      </div>

      <!-- SUS RESPONSABILIDADES -->
      <div class="policy-card">
        <div class="policy-icon">✅</div>
        <h2 class="policy-heading">Sus Responsabilidades</h2>
        <div class="policy-list">
          <h3>Como Participante, Usted Acepta:</h3>
          <ul>
            <li>Seguir todas las instrucciones del guía</li>
            <li>Operar el vehículo de forma segura y responsable</li>
            <li>Respetar a los demás participantes y el medio ambiente</li>
            <li>Comunicar cualquier inquietud de inmediato</li>
            <li>Completar honestamente todo el papeleo requerido</li>
            <li>Aceptar la responsabilidad personal de su propia seguridad</li>
          </ul>
        </div>
        <div class="policy-warning">
          <strong>Recuerde:</strong> Andar en ATV/UTV conlleva riesgos inherentes. Aunque tomamos todas las precauciones para garantizar su seguridad, usted participa bajo su propio riesgo. Por favor lea y comprenda todas las exenciones antes de firmarlas.
        </div>
      </div>

      <!-- LLAMADA A LA ACCIÓN -->
      <div class="policy-cta">
        <h3>¿Preguntas Sobre Seguridad?</h3>
        <p>Si tiene alguna inquietud o pregunta de seguridad antes de su tour, contáctenos. ¡Estamos aquí para garantizar que tenga una aventura segura e increíble!</p>
        <div class="cta-buttons">
          <a href="tel:435-219-9447" class="cta-button primary">📞 Llame al (435) 219-9447</a>
          <a href="/es/booking/" class="cta-button secondary">Reserve Su Aventura Segura</a>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- Botón flotante para móvil -->
<div class="mobile-sticky-cta">
  <button onclick="location.href='/es/booking/'">Reserve Su Recorrido Ahora</button>
</div>
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
