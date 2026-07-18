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

const IT = `
<!-- BLOCCO RIEPILOGO PAGINA -->
<p class="page-summary" style="position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;" aria-hidden="false">
  Norme di sicurezza di Adventure Tours Vernal per i tour guidati in UTV a Vernal, Utah. I conducenti devono avere almeno 18 anni. I passeggeri devono avere almeno 2 anni. Cinture di sicurezza obbligatorie. Tolleranza zero per alcol o droghe. Briefing di sicurezza completo fornito prima di ogni tour. Chiami il (435) 219-9447.
</p>

<section class="policy-section">
  <div class="container">
    <div class="section-header">
      <h1 class="section-title">Norme di Sicurezza</h1>
      <p class="section-subtitle">La Sua sicurezza è la nostra priorità assoluta. La preghiamo di leggere queste norme prima della Sua avventura.</p>
    </div>

    <div class="policy-container">

      <!-- PRIMA DEL TOUR -->
      <div class="policy-card">
        <div class="policy-icon">📋</div>
        <h2 class="policy-heading">Prima del Tour</h2>
        <div class="policy-list">
          <h3>Arrivo e Registrazione:</h3>
          <ul>
            <li>Arrivi <strong>con 30 minuti di anticipo</strong> per l'orientamento e il briefing di sicurezza</li>
            <li>Porti con sé una patente di guida valida (obbligatoria per tutti i conducenti)</li>
            <li>Completi tutte le liberatorie e gli accordi richiesti</li>
            <li>Partecipi all'orientamento di sicurezza obbligatorio</li>
          </ul>
          <h3>Requisiti di Salute e Fisici:</h3>
          <ul>
            <li>Tutti i partecipanti devono essere in buone condizioni fisiche</li>
            <li>Informi la guida su eventuali condizioni mediche, lesioni o preoccupazioni</li>
            <li>Le donne in gravidanza devono consultare il proprio medico prima di partecipare</li>
            <li>Se soffre di problemi alla schiena, al collo o al cuore, La preghiamo di informarci in anticipo</li>
          </ul>
          <h3>Politica su Alcol e Sostanze:</h3>
          <ul>
            <li><strong>Tolleranza zero</strong> per alcol o droghe</li>
            <li>Non Le sarà permesso di guidare se si trova sotto l'effetto di alcol o droghe</li>
            <li>Non saranno concessi rimborsi in caso di infrazioni</li>
          </ul>
        </div>
      </div>

      <!-- REQUISITI DI ETÀ -->
      <div class="policy-card">
        <div class="policy-icon">👥</div>
        <h2 class="policy-heading">Requisiti di Età</h2>
        <div class="policy-table">
          <div class="policy-row">
            <div class="policy-timeframe">Per Guidare</div>
            <div class="policy-refund refund-full">18 anni o più</div>
          </div>
          <div class="policy-row">
            <div class="policy-timeframe">Per Viaggiare come Passeggero</div>
            <div class="policy-refund refund-full">2 anni o più</div>
          </div>
        </div>
        <div class="policy-note">
          <strong>Importante:</strong> Tutti i conducenti devono presentare una patente di guida valida. I genitori/tutori devono firmare le liberatorie per i minori.
        </div>
      </div>

      <!-- OPERAZIONE DEL VEICOLO -->
      <div class="policy-card">
        <div class="policy-icon">🚙</div>
        <h2 class="policy-heading">Operazione del Veicolo e Sicurezza</h2>
        <div class="policy-list">
          <h3>Durante la Guida del Veicolo:</h3>
          <ul>
            <li>Indossi sempre la cintura di sicurezza, senza eccezioni</li>
            <li>Tenga sempre mani e braccia all'interno del veicolo</li>
            <li>Non si alzi mai in piedi mentre il veicolo è in movimento</li>
            <li>Segua sempre le istruzioni della guida</li>
            <li>Mantenga una distanza di sicurezza dagli altri veicoli</li>
            <li>Usi il walkie-talkie per comunicare con la guida</li>
          </ul>
          <h3>Dispositivi di Sicurezza (Obbligatori):</h3>
          <ul>
            <li>Le cinture di sicurezza devono essere indossate da tutti i passeggeri</li>
            <li>Caschi (disponibili su richiesta)</li>
            <li>Si consigliano occhiali di sicurezza o da sole</li>
          </ul>
          <h3>Azioni Vietate:</h3>
          <ul>
            <li>Gareggiare o superare i limiti di velocità</li>
            <li>Guida spericolata o acrobazie</li>
            <li>Uscire dal sentiero designato</li>
            <li>Guidare il veicolo sotto l'effetto di alcol o droghe</li>
            <li>Ignorare le istruzioni della guida</li>
          </ul>
        </div>
        <div class="policy-warning">
          <strong>⚠️ Avviso:</strong> Il mancato rispetto delle norme di sicurezza può comportare l'interruzione immediata del tour senza rimborso. Un comportamento spericolato annulla tutte le coperture assicurative e le liberatorie per danni.
        </div>
      </div>

      <!-- SICUREZZA DEL TERRENO E DEI SENTIERI -->
      <div class="policy-card">
        <div class="policy-icon">⛰️</div>
        <h2 class="policy-heading">Sicurezza del Terreno e dei Sentieri</h2>
        <div class="policy-list">
          <h3>Condizioni dei Sentieri:</h3>
          <ul>
            <li>I sentieri possono includere rocce, salite ripide, attraversamenti d'acqua e terreno accidentato</li>
            <li>Il tempo può cambiare rapidamente: sia preparato/a</li>
            <li>Polvere e sporco sono comuni; porti una protezione per gli occhi</li>
            <li>Il segnale del cellulare può essere limitato nelle zone remote</li>
          </ul>
          <h3>Rimanga sul Sentiero:</h3>
          <ul>
            <li>Non esca mai dai sentieri designati</li>
            <li>Rispetti la proprietà privata e i cartelli segnaletici</li>
            <li>Segua i principi "Non Lasciare Traccia"</li>
            <li>Non disturbi la fauna selvatica né le piante</li>
          </ul>
          <h3>Situazioni di Emergenza:</h3>
          <ul>
            <li>Avvisi immediatamente la guida se si sente in pericolo</li>
            <li>Usi il walkie-talkie per comunicare</li>
            <li>Kit di primo soccorso disponibili su ogni tour</li>
            <li>La guida è formata in primo soccorso in ambiente selvaggio</li>
          </ul>
        </div>
      </div>

      <!-- CLIMA E AMBIENTE -->
      <div class="policy-card">
        <div class="policy-icon">🌦️</div>
        <h2 class="policy-heading">Clima e Sicurezza Ambientale</h2>
        <div class="policy-list">
          <h3>Preparazione al Clima:</h3>
          <ul>
            <li>Operiamo nella maggior parte delle condizioni climatiche</li>
            <li>I tour possono essere annullati o riprogrammati in caso di condizioni climatiche estreme</li>
            <li>Le temperature possono variare notevolmente: si vesta a strati</li>
            <li>Porti un abbigliamento antipioggia se il tempo sembra incerto</li>
          </ul>
          <h3>Protezione Solare:</h3>
          <ul>
            <li>Il sole dello Utah è intenso: usi una protezione solare (SPF 30 o superiore)</li>
            <li>Porti occhiali da sole con protezione UV</li>
            <li>Indossi un cappello o una bandana</li>
            <li>Si mantenga idratato/a: acqua fornita</li>
          </ul>
          <h3>Sicurezza nei Confronti della Fauna Selvatica:</h3>
          <ul>
            <li>Non si avvicini né dia da mangiare alla fauna selvatica</li>
            <li>Mantenga una distanza di sicurezza da tutti gli animali</li>
            <li>Faccia attenzione ai serpenti, specialmente nei mesi più caldi</li>
            <li>Segnali qualsiasi avvistamento di fauna selvatica alla guida</li>
          </ul>
        </div>
      </div>

      <!-- COMUNICAZIONE -->
      <div class="policy-card">
        <div class="policy-icon">📡</div>
        <h2 class="policy-heading">Comunicazione e Sicurezza di Gruppo</h2>
        <div class="policy-list">
          <h3>Rimanere in Contatto:</h3>
          <ul>
            <li>Walkie-talkie fornito per ogni veicolo</li>
            <li>Tenga sempre acceso il walkie-talkie</li>
            <li>Avvisi immediatamente la guida se ha bisogno di fermarsi</li>
            <li>Non si allontani mai dal gruppo senza informare la guida</li>
          </ul>
          <h3>In Caso di Problemi:</h3>
          <ul>
            <li>Si fermi in sicurezza e usi il walkie-talkie</li>
            <li>Non tenti di risolvere da solo/a eventuali problemi meccanici</li>
            <li>Attenda l'assistenza della guida</li>
            <li>Non prosegua mai se il veicolo sembra non sicuro</li>
          </ul>
        </div>
      </div>

      <!-- DANNI E RESPONSABILITÀ -->
      <div class="policy-card">
        <div class="policy-icon">🛡️</div>
        <h2 class="policy-heading">Danni e Responsabilità</h2>
        <div class="policy-list">
          <h3>Liberatoria per Danni al Veicolo:</h3>
          <ul>
            <li>Obbligatoria per tutti i tour</li>
            <li>Limita la Sua responsabilità all'importo della franchigia</li>
            <li>Nulla se causata da guida spericolata</li>
            <li>Nulla se sono coinvolti alcol o droghe</li>
          </ul>
          <h3>Procedure in Caso di Incidente:</h3>
          <ul>
            <li>Si fermi immediatamente e valuti eventuali lesioni</li>
            <li>Contatti la guida tramite walkie-talkie</li>
            <li>Non sposti le persone ferite a meno che non siano in pericolo immediato</li>
            <li>Documenti l'incidente con foto, se possibile</li>
          </ul>
        </div>
        <div class="deductible-info">
          <h3>Informazioni Importanti sull'Assicurazione:</h3>
          <p>Lei è coperto/a dalla nostra assicurazione di responsabilità civile con una <strong>franchigia di $1,000 per incidente</strong>. Questo si applica indipendentemente dalla colpa. La Liberatoria per Danni al Veicolo può aiutare a limitare le Sue spese vive per i danni al veicolo.</p>
        </div>
      </div>

      <!-- LE SUE RESPONSABILITÀ -->
      <div class="policy-card">
        <div class="policy-icon">✅</div>
        <h2 class="policy-heading">Le Sue Responsabilità</h2>
        <div class="policy-list">
          <h3>In Qualità di Partecipante, Lei Accetta Di:</h3>
          <ul>
            <li>Seguire tutte le istruzioni della guida</li>
            <li>Guidare il veicolo in modo sicuro e responsabile</li>
            <li>Rispettare gli altri partecipanti e l'ambiente</li>
            <li>Comunicare immediatamente qualsiasi preoccupazione</li>
            <li>Completare onestamente tutta la documentazione richiesta</li>
            <li>Accettare la responsabilità personale della propria sicurezza</li>
          </ul>
        </div>
        <div class="policy-warning">
          <strong>Ricordi:</strong> La guida di ATV/UTV comporta rischi intrinseci. Sebbene adottiamo ogni precauzione per garantire la Sua sicurezza, Lei partecipa a proprio rischio. La preghiamo di leggere e comprendere tutte le liberatorie prima di firmarle.
        </div>
      </div>

      <!-- CONTATTO CTA -->
      <div class="policy-cta">
        <h3>Domande sulla Sicurezza?</h3>
        <p>Se ha dubbi o domande sulla sicurezza prima del Suo tour, ci contatti. Siamo qui per garantirLe un'avventura sicura e straordinaria!</p>
        <div class="cta-buttons">
          <a href="tel:435-219-9447" class="cta-button primary">📞 Chiami il (435) 219-9447</a>
          <a href="/it/booking/" class="cta-button secondary">Prenoti la Sua Avventura Sicura</a>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- Pulsante Fisso per Mobile -->
<div class="mobile-sticky-cta">
  <button onclick="location.href='/it/booking/'">Prenoti il Suo Tour Ora</button>
</div>
`;

const FR = `
<!-- BLOC RÉSUMÉ DE PAGE -->
<p class="page-summary" style="position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;" aria-hidden="false">
  Consignes de sécurité d'Adventure Tours Vernal pour les tours guidés en UTV à Vernal, Utah. Les conducteurs doivent avoir 18 ans ou plus. Les passagers doivent avoir 2 ans ou plus. Ceinture de sécurité obligatoire. Tolérance zéro envers l'alcool ou les drogues. Un briefing de sécurité complet est fourni avant chaque tour. Appelez le (435) 219-9447.
</p>

<section class="policy-section">
  <div class="container">
    <div class="section-header">
      <h1 class="section-title">Consignes de Sécurité</h1>
      <p class="section-subtitle">Votre sécurité est notre priorité numéro un. Veuillez lire ces consignes avant votre aventure.</p>
    </div>

    <div class="policy-container">

      <!-- AVANT VOTRE TOUR -->
      <div class="policy-card">
        <div class="policy-icon">📋</div>
        <h2 class="policy-heading">Avant Votre Tour</h2>
        <div class="policy-list">
          <h3>Arrivée et Enregistrement&nbsp;:</h3>
          <ul>
            <li>Arrivez <strong>30 minutes à l'avance</strong> pour l'orientation et le briefing de sécurité</li>
            <li>Apportez un permis de conduire valide (obligatoire pour tous les conducteurs)</li>
            <li>Complétez toutes les décharges et accords requis</li>
            <li>Participez à l'orientation de sécurité obligatoire</li>
          </ul>
          <h3>Exigences de Santé et de Condition Physique&nbsp;:</h3>
          <ul>
            <li>Tous les participants doivent être en bonne santé physique</li>
            <li>Informez votre guide de toute condition médicale, blessure ou préoccupation</li>
            <li>Les femmes enceintes doivent consulter leur médecin avant de participer</li>
            <li>Si vous avez des problèmes de dos, de cou ou de cœur, veuillez nous en informer à l'avance</li>
          </ul>
          <h3>Politique sur l'Alcool et les Substances&nbsp;:</h3>
          <ul>
            <li><strong>Tolérance zéro</strong> envers l'alcool ou les drogues</li>
            <li>Vous ne serez pas autorisé à conduire si vous êtes sous l'influence</li>
            <li>Aucun remboursement ne sera accordé en cas d'infraction</li>
          </ul>
        </div>
      </div>

      <!-- EXIGENCES D'ÂGE -->
      <div class="policy-card">
        <div class="policy-icon">👥</div>
        <h2 class="policy-heading">Exigences d'Âge</h2>
        <div class="policy-table">
          <div class="policy-row">
            <div class="policy-timeframe">Pour Conduire</div>
            <div class="policy-refund refund-full">18 ans ou plus</div>
          </div>
          <div class="policy-row">
            <div class="policy-timeframe">Pour Voyager en tant que Passager</div>
            <div class="policy-refund refund-full">2 ans ou plus</div>
          </div>
        </div>
        <div class="policy-note">
          <strong>Important&nbsp;:</strong> Tous les conducteurs doivent présenter un permis de conduire valide. Les parents/tuteurs doivent signer les décharges pour les mineurs.
        </div>
      </div>

      <!-- CONDUITE DU VÉHICULE -->
      <div class="policy-card">
        <div class="policy-icon">🚙</div>
        <h2 class="policy-heading">Conduite du Véhicule et Sécurité</h2>
        <div class="policy-list">
          <h3>En Conduisant le Véhicule&nbsp;:</h3>
          <ul>
            <li>Portez toujours votre ceinture de sécurité, sans exception</li>
            <li>Gardez les mains et les bras à l'intérieur du véhicule en tout temps</li>
            <li>Ne vous levez jamais pendant que le véhicule est en mouvement</li>
            <li>Suivez toujours les instructions de votre guide</li>
            <li>Maintenez une distance de sécurité par rapport aux autres véhicules</li>
            <li>Utilisez le talkie-walkie pour communiquer avec votre guide</li>
          </ul>
          <h3>Équipement de Sécurité (Obligatoire)&nbsp;:</h3>
          <ul>
            <li>La ceinture de sécurité doit être portée par tous les passagers</li>
            <li>Casques (disponibles sur demande)</li>
            <li>Lunettes de sécurité ou de soleil recommandées</li>
          </ul>
          <h3>Actions Interdites&nbsp;:</h3>
          <ul>
            <li>Faire la course ou rouler à excès de vitesse</li>
            <li>Conduite imprudente ou acrobaties</li>
            <li>Quitter la piste désignée</li>
            <li>Conduire le véhicule sous l'influence</li>
            <li>Ignorer les instructions du guide</li>
          </ul>
        </div>
        <div class="policy-warning">
          <strong>⚠️ Avertissement&nbsp;:</strong> Le non-respect des consignes de sécurité peut entraîner l'interruption immédiate de votre tour sans remboursement. Un comportement imprudent annule toutes les couvertures d'assurance et décharges pour dommages.
        </div>
      </div>

      <!-- SÉCURITÉ DU TERRAIN ET DES PISTES -->
      <div class="policy-card">
        <div class="policy-icon">⛰️</div>
        <h2 class="policy-heading">Sécurité du Terrain et des Pistes</h2>
        <div class="policy-list">
          <h3>Conditions de Piste&nbsp;:</h3>
          <ul>
            <li>Les pistes peuvent inclure des rochers, des pentes raides, des traversées d'eau et un terrain accidenté</li>
            <li>La météo peut changer rapidement&nbsp;: soyez prêt</li>
            <li>La poussière et la terre sont fréquentes&nbsp;: apportez une protection pour les yeux</li>
            <li>Le signal de téléphone portable peut être limité dans les zones reculées</li>
          </ul>
          <h3>Restez sur la Piste&nbsp;:</h3>
          <ul>
            <li>Ne quittez jamais les pistes désignées</li>
            <li>Respectez la propriété privée et les panneaux affichés</li>
            <li>Suivez les principes "Ne Laissez Aucune Trace"</li>
            <li>Ne dérangez pas la faune ni la végétation</li>
          </ul>
          <h3>Situations d'Urgence&nbsp;:</h3>
          <ul>
            <li>Alertez immédiatement votre guide si vous vous sentez en danger</li>
            <li>Utilisez le talkie-walkie pour communiquer</li>
            <li>Des trousses de premiers secours sont disponibles sur chaque tour</li>
            <li>Votre guide est formé aux premiers secours en milieu sauvage</li>
          </ul>
        </div>
      </div>

      <!-- MÉTÉO ET SÉCURITÉ ENVIRONNEMENTALE -->
      <div class="policy-card">
        <div class="policy-icon">🌦️</div>
        <h2 class="policy-heading">Météo et Sécurité Environnementale</h2>
        <div class="policy-list">
          <h3>Préparation Météo&nbsp;:</h3>
          <ul>
            <li>Nous opérons dans la plupart des conditions météorologiques</li>
            <li>Les tours peuvent être annulés ou reprogrammés en cas de météo extrême</li>
            <li>Les températures peuvent varier considérablement&nbsp;: habillez-vous en couches</li>
            <li>Apportez un équipement de pluie si le temps semble incertain</li>
          </ul>
          <h3>Protection Solaire&nbsp;:</h3>
          <ul>
            <li>Le soleil de l'Utah est intense&nbsp;: portez de la crème solaire (FPS 30 ou plus)</li>
            <li>Apportez des lunettes de soleil avec protection UV</li>
            <li>Portez un chapeau ou un bandana</li>
            <li>Restez hydraté&nbsp;: eau fournie</li>
          </ul>
          <h3>Sécurité face à la Faune Sauvage&nbsp;:</h3>
          <ul>
            <li>N'approchez pas et ne nourrissez pas la faune sauvage</li>
            <li>Maintenez une distance de sécurité par rapport à tous les animaux</li>
            <li>Faites attention aux serpents, surtout durant les mois les plus chauds</li>
            <li>Signalez toute observation de faune sauvage à votre guide</li>
          </ul>
        </div>
      </div>

      <!-- COMMUNICATION -->
      <div class="policy-card">
        <div class="policy-icon">📡</div>
        <h2 class="policy-heading">Communication et Sécurité de Groupe</h2>
        <div class="policy-list">
          <h3>Rester en Contact&nbsp;:</h3>
          <ul>
            <li>Talkie-walkie fourni pour chaque véhicule</li>
            <li>Gardez le talkie-walkie allumé en tout temps</li>
            <li>Alertez immédiatement le guide si vous devez vous arrêter</li>
            <li>Ne quittez jamais le groupe sans informer votre guide</li>
          </ul>
          <h3>En Cas de Problème&nbsp;:</h3>
          <ul>
            <li>Arrêtez-vous en toute sécurité et utilisez le talkie-walkie</li>
            <li>N'essayez pas de réparer vous-même les problèmes mécaniques</li>
            <li>Attendez l'assistance du guide</li>
            <li>Ne continuez jamais si le véhicule semble dangereux</li>
          </ul>
        </div>
      </div>

      <!-- DOMMAGES ET RESPONSABILITÉ -->
      <div class="policy-card">
        <div class="policy-icon">🛡️</div>
        <h2 class="policy-heading">Dommages et Responsabilité</h2>
        <div class="policy-list">
          <h3>Décharge pour Dommages au Véhicule&nbsp;:</h3>
          <ul>
            <li>Requise pour tous les tours</li>
            <li>Limite votre responsabilité au montant de la franchise</li>
            <li>Nulle si causée par une conduite imprudente</li>
            <li>Nulle si de l'alcool ou des drogues sont impliqués</li>
          </ul>
          <h3>Procédures en Cas d'Accident&nbsp;:</h3>
          <ul>
            <li>Arrêtez-vous immédiatement et évaluez les blessures</li>
            <li>Contactez le guide par talkie-walkie</li>
            <li>Ne déplacez pas les personnes blessées sauf en cas de danger immédiat</li>
            <li>Documentez l'incident avec des photos si possible</li>
          </ul>
        </div>
        <div class="deductible-info">
          <h3>Informations Importantes sur l'Assurance&nbsp;:</h3>
          <p>Vous êtes couvert par notre assurance responsabilité civile avec une <strong>franchise de $1,000 par accident</strong>. Cela s'applique indépendamment de la faute. La Décharge pour Dommages au Véhicule peut aider à limiter vos frais personnels pour les dommages au véhicule.</p>
        </div>
      </div>

      <!-- VOS RESPONSABILITÉS -->
      <div class="policy-card">
        <div class="policy-icon">✅</div>
        <h2 class="policy-heading">Vos Responsabilités</h2>
        <div class="policy-list">
          <h3>En tant que Participant, Vous Acceptez de&nbsp;:</h3>
          <ul>
            <li>Suivre toutes les instructions du guide</li>
            <li>Conduire le véhicule de manière sûre et responsable</li>
            <li>Respecter les autres participants et l'environnement</li>
            <li>Communiquer immédiatement toute préoccupation</li>
            <li>Compléter honnêtement tous les documents requis</li>
            <li>Accepter la responsabilité personnelle de votre sécurité</li>
          </ul>
        </div>
        <div class="policy-warning">
          <strong>Rappel&nbsp;:</strong> La conduite en ATV/UTV comporte des risques inhérents. Bien que nous prenions toutes les précautions pour assurer votre sécurité, vous participez à vos propres risques. Veuillez lire et comprendre toutes les décharges avant de les signer.
        </div>
      </div>

      <!-- APPEL À L'ACTION -->
      <div class="policy-cta">
        <h3>Des Questions sur la Sécurité&nbsp;?</h3>
        <p>Si vous avez des préoccupations ou des questions de sécurité avant votre tour, veuillez nous contacter. Nous sommes là pour vous garantir une aventure sûre et incroyable&nbsp;!</p>
        <div class="cta-buttons">
          <a href="tel:435-219-9447" class="cta-button primary">📞 Appelez le (435) 219-9447</a>
          <a href="/fr/booking/" class="cta-button secondary">Réservez Votre Aventure en Toute Sécurité</a>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- Bouton Flottant Mobile -->
<div class="mobile-sticky-cta">
  <button onclick="location.href='/fr/booking/'">Réservez Votre Tour Maintenant</button>
</div>
`;

/**
 * Locale-aware accessor (P2D pattern; Spanish populated P3A, Italian P6,
 * French P8-P6).
 * Every locale without a committed variant falls back to English. Callers
 * that don't need locale awareness keep importing `bodyHtml` directly.
 */
export function getBodyHtml(locale: string = DEFAULT_LOCALE): string {
  if (locale === 'es') return ES;
  if (locale === 'it') return IT;
  if (locale === 'fr') return FR;
  return bodyHtml;
}
