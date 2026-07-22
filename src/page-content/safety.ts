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

const PT = `
<!-- BLOCO DE RESUMO DA PÁGINA -->
<p class="page-summary" style="position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;" aria-hidden="false">
  Diretrizes de segurança da Adventure Tours Vernal para tours guiados em UTV em Vernal, Utah. Os condutores devem ter 18 anos ou mais. Os passageiros devem ter 2 anos ou mais. Cinto de segurança obrigatório. Tolerância zero para álcool ou drogas. Briefing de segurança completo fornecido antes de cada tour. Liga para (435) 219-9447.
</p>

<section class="policy-section">
  <div class="container">
    <div class="section-header">
      <h1 class="section-title">Normas de Segurança</h1>
      <p class="section-subtitle">A tua segurança é a nossa prioridade número um. Por favor, revê estas normas antes da tua aventura.</p>
    </div>

    <div class="policy-container">

      <!-- ANTES DO TEU TOUR -->
      <div class="policy-card">
        <div class="policy-icon">📋</div>
        <h2 class="policy-heading">Antes do Teu Tour</h2>
        <div class="policy-list">
          <h3>Chegada e Registo:</h3>
          <ul>
            <li>Chega <strong>30 minutos antes</strong> para a orientação e o briefing de segurança</li>
            <li>Traz uma carta de condução válida (obrigatória para todos os condutores)</li>
            <li>Completa todas as declarações de responsabilidade e acordos necessários</li>
            <li>Participa na orientação de segurança obrigatória</li>
          </ul>
          <h3>Requisitos de Saúde e Condição Física:</h3>
          <ul>
            <li>Todos os participantes devem estar em boa forma física</li>
            <li>Informa o teu guia sobre qualquer condição médica, lesão ou preocupação</li>
            <li>As mulheres grávidas devem consultar o médico antes de participar</li>
            <li>Se tens problemas nas costas, no pescoço ou no coração, informa-nos com antecedência</li>
          </ul>
          <h3>Política sobre Álcool e Substâncias:</h3>
          <ul>
            <li><strong>Tolerância zero</strong> para álcool ou drogas</li>
            <li>Não te será permitido conduzir se estiveres sob a influência</li>
            <li>Não serão dados reembolsos por infrações</li>
          </ul>
        </div>
      </div>

      <!-- REQUISITOS DE IDADE -->
      <div class="policy-card">
        <div class="policy-icon">👥</div>
        <h2 class="policy-heading">Requisitos de Idade</h2>
        <div class="policy-table">
          <div class="policy-row">
            <div class="policy-timeframe">Para Conduzir</div>
            <div class="policy-refund refund-full">18 anos ou mais</div>
          </div>
          <div class="policy-row">
            <div class="policy-timeframe">Para Viajar como Passageiro</div>
            <div class="policy-refund refund-full">2 anos ou mais</div>
          </div>
        </div>
        <div class="policy-note">
          <strong>Importante:</strong> Todos os condutores devem apresentar uma carta de condução válida. Os pais/tutores devem assinar as declarações de responsabilidade para os menores.
        </div>
      </div>

      <!-- OPERAÇÃO DO VEÍCULO -->
      <div class="policy-card">
        <div class="policy-icon">🚙</div>
        <h2 class="policy-heading">Operação do Veículo e Segurança</h2>
        <div class="policy-list">
          <h3>Ao Operar o Veículo:</h3>
          <ul>
            <li>Usa sempre o cinto de segurança - sem exceções</li>
            <li>Mantém as mãos e os braços dentro do veículo em todos os momentos</li>
            <li>Nunca te levantes enquanto o veículo estiver em movimento</li>
            <li>Segue sempre as instruções do teu guia</li>
            <li>Mantém uma distância segura de outros veículos</li>
            <li>Usa o walkie-talkie para comunicar com o teu guia</li>
          </ul>
          <h3>Equipamento de Segurança (Obrigatório):</h3>
          <ul>
            <li>O cinto de segurança deve ser usado por todos os passageiros</li>
            <li>Capacetes (fornecidos mediante pedido)</li>
            <li>Óculos de segurança ou de sol recomendados</li>
          </ul>
          <h3>Ações Proibidas:</h3>
          <ul>
            <li>Correr ou exceder a velocidade</li>
            <li>Condução imprudente ou acrobacias</li>
            <li>Sair do trilho designado</li>
            <li>Operar o veículo sob a influência</li>
            <li>Ignorar as instruções do guia</li>
          </ul>
        </div>
        <div class="policy-warning">
          <strong>⚠️ Aviso:</strong> O incumprimento das normas de segurança pode resultar na interrupção imediata do teu tour sem reembolso. O comportamento imprudente anula todas as coberturas de seguro e declarações de responsabilidade por danos.
        </div>
      </div>

      <!-- SEGURANÇA DO TERRENO E DOS TRILHOS -->
      <div class="policy-card">
        <div class="policy-icon">⛰️</div>
        <h2 class="policy-heading">Segurança do Terreno e dos Trilhos</h2>
        <div class="policy-list">
          <h3>Condições do Trilho:</h3>
          <ul>
            <li>Os trilhos podem incluir rochas, subidas íngremes, travessias de água e terreno acidentado</li>
            <li>O tempo pode mudar rapidamente - está preparado</li>
            <li>Pó e terra são comuns - traz proteção para os olhos</li>
            <li>O sinal de telemóvel pode ser limitado em áreas remotas</li>
          </ul>
          <h3>Fica no Trilho:</h3>
          <ul>
            <li>Nunca saias dos trilhos designados</li>
            <li>Respeita a propriedade privada e os sinais afixados</li>
            <li>Segue os princípios Leave No Trace</li>
            <li>Não perturbes a fauna selvagem nem as plantas</li>
          </ul>
          <h3>Situações de Emergência:</h3>
          <ul>
            <li>Avisa o teu guia imediatamente se te sentires inseguro</li>
            <li>Usa o walkie-talkie para comunicar</li>
            <li>Kits de primeiros socorros estão disponíveis em cada tour</li>
            <li>O teu guia é treinado em primeiros socorros em ambiente selvagem</li>
          </ul>
        </div>
      </div>

      <!-- CLIMA E SEGURANÇA AMBIENTAL -->
      <div class="policy-card">
        <div class="policy-icon">🌦️</div>
        <h2 class="policy-heading">Clima e Segurança Ambiental</h2>
        <div class="policy-list">
          <h3>Preparação para o Clima:</h3>
          <ul>
            <li>Operamos na maioria das condições climatéricas</li>
            <li>Os tours podem ser cancelados ou reagendados em caso de clima extremo</li>
            <li>As temperaturas podem variar significativamente - veste-te em camadas</li>
            <li>Traz equipamento de chuva se o tempo parecer incerto</li>
          </ul>
          <h3>Proteção Solar:</h3>
          <ul>
            <li>O sol de Utah é intenso - usa protetor solar (FPS 30+)</li>
            <li>Traz óculos de sol com proteção UV</li>
            <li>Usa um chapéu ou bandana</li>
            <li>Mantém-te hidratado - água fornecida</li>
          </ul>
          <h3>Segurança com a Fauna Selvagem:</h3>
          <ul>
            <li>Não te aproximes nem alimentes a fauna selvagem</li>
            <li>Mantém uma distância segura de todos os animais</li>
            <li>Tem atenção às cobras, especialmente nos meses mais quentes</li>
            <li>Reporta qualquer avistamento de fauna selvagem ao teu guia</li>
          </ul>
        </div>
      </div>

      <!-- COMUNICAÇÃO -->
      <div class="policy-card">
        <div class="policy-icon">📡</div>
        <h2 class="policy-heading">Comunicação e Segurança de Grupo</h2>
        <div class="policy-list">
          <h3>Mantém-te Ligado:</h3>
          <ul>
            <li>Walkie-talkie fornecido para cada veículo</li>
            <li>Mantém o walkie-talkie ligado em todos os momentos</li>
            <li>Avisa o guia imediatamente se precisares de parar</li>
            <li>Nunca deixes o grupo sem informar o teu guia</li>
          </ul>
          <h3>Se Tiveres Problemas:</h3>
          <ul>
            <li>Para em segurança e usa o walkie-talkie</li>
            <li>Não tentes reparar problemas mecânicos sozinho</li>
            <li>Espera pela assistência do guia</li>
            <li>Nunca continues se o veículo parecer inseguro</li>
          </ul>
        </div>
      </div>

      <!-- DANOS E RESPONSABILIDADE -->
      <div class="policy-card">
        <div class="policy-icon">🛡️</div>
        <h2 class="policy-heading">Danos e Responsabilidade</h2>
        <div class="policy-list">
          <h3>Declaração de Responsabilidade por Danos ao Veículo:</h3>
          <ul>
            <li>Obrigatória para todos os tours</li>
            <li>Limita a tua responsabilidade ao valor da franquia</li>
            <li>Anulada se causada por condução imprudente</li>
            <li>Anulada se houver envolvimento de álcool/drogas</li>
          </ul>
          <h3>Procedimentos em Caso de Acidente:</h3>
          <ul>
            <li>Para imediatamente e avalia as lesões</li>
            <li>Contacta o guia via walkie-talkie</li>
            <li>Não movas pessoas feridas a menos que estejam em perigo imediato</li>
            <li>Documenta o incidente com fotos, se possível</li>
          </ul>
        </div>
        <div class="deductible-info">
          <h3>Informação Importante sobre o Seguro:</h3>
          <p>Estás coberto pelo nosso seguro de responsabilidade civil com uma <strong>franquia de $1,000 por acidente</strong>. Isto aplica-se independentemente da culpa. A Declaração de Responsabilidade por Danos ao Veículo pode ajudar a limitar os teus custos diretos por danos ao veículo.</p>
        </div>
      </div>

      <!-- AS TUAS RESPONSABILIDADES -->
      <div class="policy-card">
        <div class="policy-icon">✅</div>
        <h2 class="policy-heading">As Tuas Responsabilidades</h2>
        <div class="policy-list">
          <h3>Como Participante, Concordas em:</h3>
          <ul>
            <li>Seguir todas as instruções do guia</li>
            <li>Operar o veículo de forma segura e responsável</li>
            <li>Respeitar os outros participantes e o ambiente</li>
            <li>Comunicar qualquer preocupação imediatamente</li>
            <li>Preencher toda a documentação necessária com honestidade</li>
            <li>Aceitar a responsabilidade pessoal pela tua segurança</li>
          </ul>
        </div>
        <div class="policy-warning">
          <strong>Lembra-te:</strong> Andar de ATV/UTV envolve riscos inerentes. Embora tomemos todas as precauções para garantir a tua segurança, participas por tua conta e risco. Por favor, lê e compreende todas as declarações de responsabilidade antes de as assinares.
        </div>
      </div>

      <!-- CTA DE CONTACTO -->
      <div class="policy-cta">
        <h3>Tens Dúvidas sobre Segurança?</h3>
        <p>Se tiveres alguma preocupação ou dúvida de segurança antes do teu tour, contacta-nos. Estamos aqui para garantir que tens uma aventura segura e incrível!</p>
        <div class="cta-buttons">
          <a href="tel:435-219-9447" class="cta-button primary">📞 Liga para (435) 219-9447</a>
          <a href="/pt/booking/" class="cta-button secondary">Reserva a Tua Aventura Segura</a>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- CTA Fixo para Móvel -->
<div class="mobile-sticky-cta">
  <button onclick="location.href='/pt/booking/'">Reserva o Teu Passeio Agora</button>
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

const DE = `
<!-- SEITENZUSAMMENFASSUNG -->
<p class="page-summary" style="position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;" aria-hidden="false">
  Sicherheitshinweise von Adventure Tours Vernal für geführte UTV-Touren in Vernal, Utah. Fahrer müssen mindestens 18 Jahre alt sein. Mitfahrer müssen mindestens 2 Jahre alt sein. Sicherheitsgurt Pflicht. Nulltoleranz bei Alkohol oder Drogen. Vollständige Sicherheitseinweisung vor jeder Tour. Ruf uns an unter (435) 219-9447.
</p>

<section class="policy-section">
  <div class="container">
    <div class="section-header">
      <h1 class="section-title">Sicherheitshinweise</h1>
      <p class="section-subtitle">Deine Sicherheit ist unsere oberste Priorität. Bitte lies dir diese Hinweise vor deinem Abenteuer durch.</p>
    </div>

    <div class="policy-container">

      <!-- VOR DEINER TOUR -->
      <div class="policy-card">
        <div class="policy-icon">📋</div>
        <h2 class="policy-heading">Vor deiner Tour</h2>
        <div class="policy-list">
          <h3>Ankunft & Anmeldung:</h3>
          <ul>
            <li>Komm <strong>30 Minuten vorher</strong> für die Einweisung und die Sicherheitsbesprechung</li>
            <li>Bring einen gültigen Führerschein mit (für alle Fahrer erforderlich)</li>
            <li>Fülle alle erforderlichen Haftungsausschlüsse und Vereinbarungen aus</li>
            <li>Nimm an der verpflichtenden Sicherheitseinweisung teil</li>
          </ul>
          <h3>Gesundheits- und Fitnessanforderungen:</h3>
          <ul>
            <li>Alle Teilnehmer müssen bei guter körperlicher Gesundheit sein</li>
            <li>Informiere deinen Guide über gesundheitliche Beschwerden, Verletzungen oder Bedenken</li>
            <li>Schwangere sollten vor der Teilnahme ihren Arzt konsultieren</li>
            <li>Wenn du Rücken-, Nacken- oder Herzprobleme hast, informiere uns bitte im Voraus</li>
          </ul>
          <h3>Alkohol- und Drogenrichtlinie:</h3>
          <ul>
            <li><strong>Nulltoleranz</strong> bei Alkohol oder Drogen</li>
            <li>Du darfst nicht fahren, wenn du unter Einfluss stehst</li>
            <li>Bei Verstößen werden keine Rückerstattungen gewährt</li>
          </ul>
        </div>
      </div>

      <!-- ALTERSANFORDERUNGEN -->
      <div class="policy-card">
        <div class="policy-icon">👥</div>
        <h2 class="policy-heading">Altersanforderungen</h2>
        <div class="policy-table">
          <div class="policy-row">
            <div class="policy-timeframe">Zum Fahren</div>
            <div class="policy-refund refund-full">18+ Jahre</div>
          </div>
          <div class="policy-row">
            <div class="policy-timeframe">Als Mitfahrer</div>
            <div class="policy-refund refund-full">2+ Jahre</div>
          </div>
        </div>
        <div class="policy-note">
          <strong>Wichtig:</strong> Alle Fahrer müssen einen gültigen Führerschein vorlegen. Eltern/Erziehungsberechtigte müssen die Haftungsausschlüsse für Minderjährige unterschreiben.
        </div>
      </div>

      <!-- FAHRZEUGBEDIENUNG -->
      <div class="policy-card">
        <div class="policy-icon">🚙</div>
        <h2 class="policy-heading">Fahrzeugbedienung & Sicherheit</h2>
        <div class="policy-list">
          <h3>Beim Fahren des Fahrzeugs:</h3>
          <ul>
            <li>Trage immer deinen Sicherheitsgurt - keine Ausnahmen</li>
            <li>Halte Hände und Arme jederzeit im Fahrzeug</li>
            <li>Steh niemals auf, während das Fahrzeug in Bewegung ist</li>
            <li>Befolge jederzeit die Anweisungen deines Guides</li>
            <li>Halte einen sicheren Abstand zu anderen Fahrzeugen</li>
            <li>Nutze das Walkie-Talkie, um mit deinem Guide zu kommunizieren</li>
          </ul>
          <h3>Sicherheitsausrüstung (Pflicht):</h3>
          <ul>
            <li>Der Sicherheitsgurt muss von allen Mitfahrern getragen werden</li>
            <li>Helme (auf Anfrage erhältlich)</li>
            <li>Schutzbrille oder Sonnenbrille empfohlen</li>
          </ul>
          <h3>Verbotene Handlungen:</h3>
          <ul>
            <li>Rennen fahren oder rasen</li>
            <li>Rücksichtsloses Fahren oder Stunts</li>
            <li>Die vorgegebene Piste verlassen</li>
            <li>Das Fahrzeug unter Einfluss fahren</li>
            <li>Anweisungen des Guides ignorieren</li>
          </ul>
        </div>
        <div class="policy-warning">
          <strong>⚠️ Warnung:</strong> Bei Nichteinhaltung der Sicherheitsregeln kann deine Tour ohne Rückerstattung sofort beendet werden. Rücksichtsloses Verhalten macht sämtliche Versicherungs- und Schadensverzichtserklärungen ungültig.
        </div>
      </div>

      <!-- GELÄNDE- & PISTENSICHERHEIT -->
      <div class="policy-card">
        <div class="policy-icon">⛰️</div>
        <h2 class="policy-heading">Gelände- & Pistensicherheit</h2>
        <div class="policy-list">
          <h3>Pistenverhältnisse:</h3>
          <ul>
            <li>Die Pisten können Felsen, steile Anstiege, Wasserdurchquerungen und unwegsames Gelände umfassen</li>
            <li>Das Wetter kann sich schnell ändern - sei vorbereitet</li>
            <li>Staub und Schmutz sind üblich - bring einen Augenschutz mit</li>
            <li>Der Handyempfang kann in abgelegenen Gebieten eingeschränkt sein</li>
          </ul>
          <h3>Bleib auf der Piste:</h3>
          <ul>
            <li>Verlasse nie die vorgegebenen Pisten</li>
            <li>Respektiere Privatgrundstücke und ausgewiesene Schilder</li>
            <li>Befolge die Leave-No-Trace-Prinzipien</li>
            <li>Störe keine Wildtiere oder Pflanzen</li>
          </ul>
          <h3>Notfallsituationen:</h3>
          <ul>
            <li>Informiere deinen Guide sofort, wenn du dich unsicher fühlst</li>
            <li>Nutze das Walkie-Talkie zur Kommunikation</li>
            <li>Erste-Hilfe-Kits sind bei jeder Tour verfügbar</li>
            <li>Dein Guide ist in Erster Hilfe in der Wildnis ausgebildet</li>
          </ul>
        </div>
      </div>

      <!-- WETTER & UMWELTSICHERHEIT -->
      <div class="policy-card">
        <div class="policy-icon">🌦️</div>
        <h2 class="policy-heading">Wetter & Umweltsicherheit</h2>
        <div class="policy-list">
          <h3>Wettervorbereitung:</h3>
          <ul>
            <li>Wir sind bei den meisten Wetterbedingungen unterwegs</li>
            <li>Bei extremem Wetter können Touren abgesagt oder verschoben werden</li>
            <li>Die Temperaturen können stark schwanken - zieh dich in mehreren Schichten an</li>
            <li>Bring Regenkleidung mit, wenn das Wetter unsicher aussieht</li>
          </ul>
          <h3>Sonnenschutz:</h3>
          <ul>
            <li>Die Sonne in Utah ist intensiv - trage Sonnencreme (LSF 30+)</li>
            <li>Bring eine Sonnenbrille mit UV-Schutz mit</li>
            <li>Trage einen Hut oder ein Bandana</li>
            <li>Bleib hydriert - Wasser wird bereitgestellt</li>
          </ul>
          <h3>Wildtiersicherheit:</h3>
          <ul>
            <li>Nähere dich Wildtieren nicht und füttere sie nicht</li>
            <li>Halte zu allen Tieren einen sicheren Abstand</li>
            <li>Achte auf Schlangen, besonders in den wärmeren Monaten</li>
            <li>Melde deinem Guide jede Wildtiersichtung</li>
          </ul>
        </div>
      </div>

      <!-- KOMMUNIKATION -->
      <div class="policy-card">
        <div class="policy-icon">📡</div>
        <h2 class="policy-heading">Kommunikation & Gruppensicherheit</h2>
        <div class="policy-list">
          <h3>In Verbindung bleiben:</h3>
          <ul>
            <li>Walkie-Talkie für jedes Fahrzeug vorhanden</li>
            <li>Halte das Walkie-Talkie jederzeit eingeschaltet</li>
            <li>Informiere den Guide sofort, wenn du anhalten musst</li>
            <li>Verlasse die Gruppe nie, ohne deinen Guide zu informieren</li>
          </ul>
          <h3>Wenn du Probleme hast:</h3>
          <ul>
            <li>Halte sicher an und nutze das Walkie-Talkie</li>
            <li>Versuche nicht, mechanische Probleme selbst zu beheben</li>
            <li>Warte auf die Hilfe des Guides</li>
            <li>Fahr nie weiter, wenn das Fahrzeug unsicher erscheint</li>
          </ul>
        </div>
      </div>

      <!-- SCHÄDEN & HAFTUNG -->
      <div class="policy-card">
        <div class="policy-icon">🛡️</div>
        <h2 class="policy-heading">Schäden & Haftung</h2>
        <div class="policy-list">
          <h3>Verzichtserklärung für Fahrzeugschäden:</h3>
          <ul>
            <li>Für alle Touren erforderlich</li>
            <li>Begrenzt deine Haftung auf den Selbstbehalt</li>
            <li>Ungültig bei rücksichtslosem Fahren</li>
            <li>Ungültig, wenn Alkohol/Drogen im Spiel sind</li>
          </ul>
          <h3>Vorgehen bei Unfällen:</h3>
          <ul>
            <li>Sofort anhalten und Verletzungen prüfen</li>
            <li>Guide per Walkie-Talkie kontaktieren</li>
            <li>Verletzte Personen nicht bewegen, außer bei unmittelbarer Gefahr</li>
            <li>Den Vorfall wenn möglich mit Fotos dokumentieren</li>
          </ul>
        </div>
        <div class="deductible-info">
          <h3>Wichtige Versicherungsinformationen:</h3>
          <p>Du bist über unsere Haftpflichtversicherung mit einem <strong>Selbstbehalt von $1,000 pro Unfall</strong> versichert. Dies gilt unabhängig vom Verschulden. Die Verzichtserklärung für Fahrzeugschäden kann helfen, deine Kosten für Fahrzeugschäden zu begrenzen.</p>
        </div>
      </div>

      <!-- DEINE VERANTWORTLICHKEITEN -->
      <div class="policy-card">
        <div class="policy-icon">✅</div>
        <h2 class="policy-heading">Deine Verantwortlichkeiten</h2>
        <div class="policy-list">
          <h3>Als Teilnehmer erklärst du dich einverstanden mit Folgendem:</h3>
          <ul>
            <li>Alle Anweisungen des Guides befolgen</li>
            <li>Das Fahrzeug sicher und verantwortungsvoll bedienen</li>
            <li>Andere Teilnehmer und die Umwelt respektieren</li>
            <li>Bedenken sofort mitteilen</li>
            <li>Alle erforderlichen Unterlagen wahrheitsgemäß ausfüllen</li>
            <li>Die persönliche Verantwortung für deine eigene Sicherheit übernehmen</li>
          </ul>
        </div>
        <div class="policy-warning">
          <strong>Denk daran:</strong> ATV-/UTV-Fahren birgt inhärente Risiken. Auch wenn wir alle Vorkehrungen für deine Sicherheit treffen, nimmst du auf eigenes Risiko teil. Bitte lies alle Haftungsausschlüsse durch und verstehe sie, bevor du sie unterschreibst.
        </div>
      </div>

      <!-- KONTAKT CTA -->
      <div class="policy-cta">
        <h3>Fragen zur Sicherheit?</h3>
        <p>Wenn du vor deiner Tour Sicherheitsbedenken oder Fragen hast, kontaktiere uns. Wir sind da, um dir ein sicheres und großartiges Abenteuer zu ermöglichen!</p>
        <div class="cta-buttons">
          <a href="tel:435-219-9447" class="cta-button primary">📞 Ruf an (435) 219-9447</a>
          <a href="/de/booking/" class="cta-button secondary">Buche dein sicheres Abenteuer</a>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- Mobiler Sticky-CTA -->
<div class="mobile-sticky-cta">
  <button onclick="location.href='/de/booking/'">Jetzt deine Tour buchen</button>
</div>
`;

const JA = `
<!-- ページ要約ブロック -->
<p class="page-summary" style="position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;" aria-hidden="false">
  ユタ州バーナルのガイド付きUTVツアーに関するAdventure Tours Vernalの安全ガイドラインです。運転する方は18歳以上である必要があります。同乗する方は2歳以上である必要があります。シートベルトの着用は必須です。アルコールおよび薬物に対しては一切の例外を認めません。すべてのツアーの前に完全な安全説明を行います。お電話は (435) 219-9447 まで。
</p>

<section class="policy-section">
  <div class="container">
    <div class="section-header">
      <h1 class="section-title">安全ガイドライン</h1>
      <p class="section-subtitle">お客様の安全が私たちの最優先事項です。冒険に出発する前に、必ずこのガイドラインをお読みください。</p>
    </div>

    <div class="policy-container">

      <!-- ツアーの前に -->
      <div class="policy-card">
        <div class="policy-icon">📋</div>
        <h2 class="policy-heading">ツアーの前に</h2>
        <div class="policy-list">
          <h3>到着とチェックイン：</h3>
          <ul>
            <li>オリエンテーションと安全説明のため、<strong>30分前</strong>にお越しください</li>
            <li>有効な運転免許証をお持ちください（運転する方全員に必須です）</li>
            <li>必要な免責同意書と契約書にすべてご記入ください</li>
            <li>義務付けられている安全オリエンテーションに必ずご参加ください</li>
          </ul>
          <h3>健康状態と身体的な条件：</h3>
          <ul>
            <li>参加される方は全員、良好な健康状態である必要があります</li>
            <li>持病、けが、気になる点がある場合は、必ずガイドにお知らせください</li>
            <li>妊娠中の方は、参加前に必ず医師にご相談ください</li>
            <li>腰、首、心臓に疾患がある方は、事前に必ずお知らせください</li>
          </ul>
          <h3>アルコール・薬物に関する方針：</h3>
          <ul>
            <li>アルコールおよび薬物については<strong>一切の例外を認めません</strong></li>
            <li>影響下にある方は乗車していただけません</li>
            <li>違反があった場合、返金は一切ありません</li>
          </ul>
        </div>
      </div>

      <!-- 年齢制限 -->
      <div class="policy-card">
        <div class="policy-icon">👥</div>
        <h2 class="policy-heading">年齢制限</h2>
        <div class="policy-table">
          <div class="policy-row">
            <div class="policy-timeframe">運転する場合</div>
            <div class="policy-refund refund-full">18歳以上</div>
          </div>
          <div class="policy-row">
            <div class="policy-timeframe">同乗者として乗車する場合</div>
            <div class="policy-refund refund-full">2歳以上</div>
          </div>
        </div>
        <div class="policy-note">
          <strong>重要：</strong>運転する方は全員、有効な運転免許証をご提示ください。未成年者の免責同意書には、保護者の署名が必要です。
        </div>
      </div>

      <!-- 車両の操作 -->
      <div class="policy-card">
        <div class="policy-icon">🚙</div>
        <h2 class="policy-heading">車両の操作と安全</h2>
        <div class="policy-list">
          <h3>車両を操作するとき：</h3>
          <ul>
            <li>シートベルトは常に着用してください - 例外はありません</li>
            <li>手や腕は常に車内に入れておいてください</li>
            <li>車両の走行中に立ち上がることは絶対にしないでください</li>
            <li>ガイドの指示には常に従ってください</li>
            <li>他の車両とは安全な車間距離を保ってください</li>
            <li>ガイドとの連絡にはトランシーバーをお使いください</li>
          </ul>
          <h3>安全装備（必須）：</h3>
          <ul>
            <li>シートベルトは同乗者全員が着用しなければなりません</li>
            <li>ヘルメット（ご希望に応じてお貸しします）</li>
            <li>ゴーグルまたはサングラスの着用を推奨します</li>
          </ul>
          <h3>禁止事項：</h3>
          <ul>
            <li>競走やスピードの出し過ぎは禁止です</li>
            <li>無謀な運転やスタント行為は禁止です</li>
            <li>指定されたトレイルから外れることは禁止です</li>
            <li>影響下での車両の運転は禁止です</li>
            <li>ガイドの指示を無視することは禁止です</li>
          </ul>
        </div>
        <div class="policy-warning">
          <strong>⚠️ 警告：</strong>安全規則に従わない場合、ツアーを即時中止とし、返金は行いません。無謀な行為があった場合、すべての保険および損害免責の適用が無効になります。
        </div>
      </div>

      <!-- 地形とトレイルの安全 -->
      <div class="policy-card">
        <div class="policy-icon">⛰️</div>
        <h2 class="policy-heading">地形とトレイルの安全</h2>
        <div class="policy-list">
          <h3>トレイルの状況：</h3>
          <ul>
            <li>トレイルには岩、急な上り坂、渡渉箇所、荒れた地形が含まれることがあります</li>
            <li>天候は急変することがあります - 備えておいてください</li>
            <li>砂ぼこりや土は日常的です - 目を保護するものをお持ちください</li>
            <li>人里離れた場所では携帯電話の電波が届きにくいことがあります</li>
          </ul>
          <h3>トレイルから外れないでください：</h3>
          <ul>
            <li>指定されたトレイルから絶対に外れないでください</li>
            <li>私有地と掲示された標識を尊重してください</li>
            <li>Leave No Traceの原則に従ってください</li>
            <li>野生動物や植物を乱さないでください</li>
          </ul>
          <h3>緊急時の対応：</h3>
          <ul>
            <li>危険を感じたら、すぐにガイドにお知らせください</li>
            <li>連絡にはトランシーバーをお使いください</li>
            <li>救急セットはすべてのツアーに常備しています</li>
            <li>ガイドはウィルダネス・ファーストエイドの訓練を受けています</li>
          </ul>
        </div>
      </div>

      <!-- 天候と自然環境 -->
      <div class="policy-card">
        <div class="policy-icon">🌦️</div>
        <h2 class="policy-heading">天候と自然環境の安全</h2>
        <div class="policy-list">
          <h3>天候への備え：</h3>
          <ul>
            <li>ほとんどの天候ではツアーを実施しています</li>
            <li>荒天の場合、ツアーを中止または日程変更することがあります</li>
            <li>気温は大きく変動することがあります - 重ね着でお越しください</li>
            <li>天候が不安定な場合は、雨具をお持ちください</li>
          </ul>
          <h3>日差し対策：</h3>
          <ul>
            <li>ユタ州の日差しは強烈です - 日焼け止め（SPF 30+）を塗ってください</li>
            <li>UVカット機能のあるサングラスをお持ちください</li>
            <li>帽子またはバンダナを着用してください</li>
            <li>水分補給を欠かさないでください - 水はご用意しています</li>
          </ul>
          <h3>野生動物への対応：</h3>
          <ul>
            <li>野生動物に近づいたり、餌を与えたりしないでください</li>
            <li>すべての動物とは安全な距離を保ってください</li>
            <li>特に暖かい時期はヘビにご注意ください</li>
            <li>野生動物を見かけたら、ガイドにお知らせください</li>
          </ul>
        </div>
      </div>

      <!-- 通信 -->
      <div class="policy-card">
        <div class="policy-icon">📡</div>
        <h2 class="policy-heading">通信とグループの安全</h2>
        <div class="policy-list">
          <h3>連絡を保つために：</h3>
          <ul>
            <li>トランシーバーは車両ごとにご用意しています</li>
            <li>トランシーバーは常に電源を入れたままにしてください</li>
            <li>停止する必要があるときは、すぐにガイドにお知らせください</li>
            <li>ガイドに知らせずにグループから離れることは絶対にしないでください</li>
          </ul>
          <h3>問題が起きた場合：</h3>
          <ul>
            <li>安全な場所に停止し、トランシーバーをお使いください</li>
            <li>機械的な不具合をご自身で直そうとしないでください</li>
            <li>ガイドの助けをお待ちください</li>
            <li>車両に不安がある状態で走行を続けることは絶対にしないでください</li>
          </ul>
        </div>
      </div>

      <!-- 損害と賠償責任 -->
      <div class="policy-card">
        <div class="policy-icon">🛡️</div>
        <h2 class="policy-heading">損害と賠償責任</h2>
        <div class="policy-list">
          <h3>車両損害免責（Vehicle Damage Waiver）：</h3>
          <ul>
            <li>すべてのツアーで必須です</li>
            <li>お客様の負担を免責金額までに限定します</li>
            <li>無謀な運転が原因の場合は無効となります</li>
            <li>アルコール・薬物が関係する場合は無効となります</li>
          </ul>
          <h3>事故発生時の手順：</h3>
          <ul>
            <li>直ちに停止し、けがの有無を確認してください</li>
            <li>トランシーバーでガイドに連絡してください</li>
            <li>差し迫った危険がある場合を除き、けが人を動かさないでください</li>
            <li>可能であれば、写真で状況を記録してください</li>
          </ul>
        </div>
        <div class="deductible-info">
          <h3>保険に関する重要なお知らせ：</h3>
          <p>お客様は当社の賠償責任保険の対象となり、<strong>1事故あたり $1,000 の免責金額</strong>が適用されます。これは過失の有無にかかわらず適用されます。車両損害免責（Vehicle Damage Waiver）をご利用いただくと、車両の損害に対するお客様の自己負担額を抑えることができます。</p>
        </div>
      </div>

      <!-- お客様の責任 -->
      <div class="policy-card">
        <div class="policy-icon">✅</div>
        <h2 class="policy-heading">お客様の責任</h2>
        <div class="policy-list">
          <h3>参加者として、以下に同意していただきます：</h3>
          <ul>
            <li>ガイドの指示にすべて従うこと</li>
            <li>車両を安全かつ責任を持って操作すること</li>
            <li>他の参加者と自然環境を尊重すること</li>
            <li>気になる点があれば直ちに伝えること</li>
            <li>必要な書類にすべて正直に記入すること</li>
            <li>ご自身の安全について個人としての責任を負うこと</li>
          </ul>
        </div>
        <div class="policy-warning">
          <strong>ご注意ください：</strong>ATV・UTVでの走行には本質的な危険が伴います。私たちは安全のためにあらゆる予防措置を講じていますが、参加はお客様ご自身の責任において行っていただきます。署名する前に、すべての免責同意書を必ずお読みになり、内容をご理解ください。
        </div>
      </div>

      <!-- お問い合わせ CTA -->
      <div class="policy-cta">
        <h3>安全についてのご質問は？</h3>
        <p>ツアーの前に安全に関するご心配やご質問がありましたら、お気軽にお問い合わせください。安全で素晴らしい冒険をお届けするために、私たちがサポートします。</p>
        <div class="cta-buttons">
          <a href="tel:435-219-9447" class="cta-button primary">📞 お電話 (435) 219-9447</a>
          <a href="/ja/booking/" class="cta-button secondary">安全な冒険を予約する</a>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- モバイル固定CTA -->
<div class="mobile-sticky-cta">
  <button onclick="location.href='/ja/booking/'">今すぐツアーを予約</button>
</div>
`;

/**
 * Locale-aware accessor (P2D pattern; Spanish populated P3A, Italian P6,
 * French P8-P6, German P9, Japanese P10K).
 * Every locale without a committed variant falls back to English. Callers
 * that don't need locale awareness keep importing `bodyHtml` directly.
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
