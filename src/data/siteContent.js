export const SITE_ORIGIN = 'https://www.blueskygroup.com.ar';
export const WHATSAPP_NUMBER = '5491171008349';
export const LAST_REVIEWED_AT = '2026-07-25';
export const LAST_REVIEWED_LABEL = '25 de julio de 2026';

/**
 * @typedef {'consultation' | 'development' | 'internal-pilot' | 'concept' | 'available'} UnitStatusId
 * @typedef {{
 *   id: UnitStatusId,
 *   label: string,
 *   icon: string,
 *   publicAvailability: boolean,
 *   description: string
 * }} UnitStatus
 */

/** @type {Readonly<Record<UnitStatusId, UnitStatus>>} */
export const launchStatuses = Object.freeze({
  consultation: Object.freeze({
    id: 'consultation',
    label: 'Consultas abiertas',
    icon: '',
    publicAvailability: false,
    description: 'Recepción de consultas y evaluación inicial de posibles proyectos.',
  }),
  development: Object.freeze({
    id: 'development',
    label: 'En desarrollo',
    icon: '◇',
    publicAvailability: false,
    description: 'Construcción activa sin disponibilidad pública.',
  }),
  'internal-pilot': Object.freeze({
    id: 'internal-pilot',
    label: 'Piloto interno',
    icon: '△',
    publicAvailability: false,
    description: 'Validación controlada sin acceso público.',
  }),
  concept: Object.freeze({
    id: 'concept',
    label: 'Exploración conceptual',
    icon: '○',
    publicAvailability: false,
    description: 'Línea de exploración sin lanzamiento confirmado.',
  }),
  available: Object.freeze({
    id: 'available',
    label: 'Disponible',
    icon: '✓',
    publicAvailability: true,
    description: 'Estado reservado para una disponibilidad futura confirmada.',
  }),
});

export const featureFlags = Object.freeze({
  publicRegistration: false,
  waitlist: false,
  leadForm: false,
  commercialContact: true,
  payments: false,
  privateArea: false,
});

const forgeFaq = [
  {
    id: 'forge-disponibilidad',
    question: '¿Puedo consultar por un proyecto de implementación?',
    answer:
      'Sí. Blue Sky Forge recibe consultas y evalúa posibles proyectos de implementación tecnológica. Cada necesidad se analiza antes de definir alcance, tiempos y próximos pasos.',
  },
  {
    id: 'forge-prototipos',
    question: '¿Los sistemas descriptos ya están funcionando?',
    answer:
      'No necesariamente. Los flujos, integraciones y prototipos pueden representar direcciones de trabajo sujetas a pruebas, cambios o discontinuación antes de cualquier disponibilidad.',
  },
  {
    id: 'forge-contacto',
    question: '¿Una consulta confirma la contratación?',
    answer:
      'No. La formalización contractual y la facturación están sujetas a la evaluación del proyecto, los acuerdos específicos y la finalización de la documentación legal y administrativa aplicable.',
  },
];

const prospectFaq = [
  {
    id: 'prospect-disponibilidad',
    question: '¿Blue Sky Prospect ofrece servicios de prospección?',
    answer:
      'No. Blue Sky Prospect se encuentra en desarrollo y no ofrece servicios, plataforma ni acceso al público. La página explica las capacidades que se están diseñando.',
  },
  {
    id: 'prospect-capacidades',
    question: '¿CRM, automatización y reporting ya están disponibles?',
    answer:
      'No. Son áreas de exploración y construcción de Blue Sky Prospect. Cualquier flujo o interfaz mencionada es conceptual o está sujeta a validación.',
  },
  {
    id: 'prospect-control-humano',
    question: '¿La iniciativa contempla control humano?',
    answer:
      'Sí como principio de diseño. Las decisiones relevantes, la revisión de mensajes y cualquier interacción futura requieren participación humana. Esto no implica que exista hoy un servicio operativo.',
  },
];

const commerceFaq = [
  {
    id: 'commerce-confirmacion',
    question: '¿Blue Sky Commerce es un producto confirmado?',
    answer:
      'No. Blue Sky Commerce es una exploración conceptual dentro de la visión futura del grupo. No representa un producto, servicio ni lanzamiento confirmado.',
  },
  {
    id: 'commerce-fecha',
    question: '¿Existe una fecha prevista?',
    answer:
      'No existe una fecha pública. La iniciativa puede cambiar, reformularse o discontinuarse según los aprendizajes del grupo.',
  },
  {
    id: 'commerce-contacto',
    question: '¿Se reciben propuestas comerciales para Commerce?',
    answer:
      'No se reciben solicitudes de servicio ni contratación. El canal publicado es exclusivamente institucional y contempla consultas generales, de prensa o alianzas.',
  },
];

/**
 * @typedef {{
 *   id: 'forge' | 'prospect' | 'commerce',
 *   slug: 'forge' | 'prospect' | 'commerce',
 *   name: string,
 *   shortName: string,
 *   descriptor: string,
 *   path: string,
 *   visibility: 'public',
 *   status: UnitStatus,
 *   publicAvailability: false,
 *   acceptsProjectInquiries: boolean,
 *   processesOperations: false,
 *   acceptsFunds: false,
 *   lastReviewedAt: string,
 *   summary: string,
 *   purpose: string,
 *   focusAreas: Array<{name: string, description: string}>,
 *   workArtifacts: string[],
 *   method: Array<{title: string, description: string}>,
 *   limits: string[],
 *   cta: {label: string},
 *   contact: {heading: string, body: string, cta: string},
 *   seo: {title: string, description: string},
 *   faq: Array<{id: string, question: string, answer: string}>
 * }} BusinessUnit
 */

/** @type {BusinessUnit[]} */
export const units = [
  {
    id: 'forge',
    slug: 'forge',
    name: 'Blue Sky Forge',
    shortName: 'Forge',
    descriptor: 'Implementación tecnológica',
    path: '/forge',
    visibility: 'public',
    status: launchStatuses.consultation,
    publicAvailability: false,
    acceptsProjectInquiries: true,
    processesOperations: false,
    acceptsFunds: false,
    lastReviewedAt: LAST_REVIEWED_AT,
    summary:
      'Unidad de implementación tecnológica que recibe consultas y evalúa proyectos para convertir necesidades concretas en sistemas útiles y sostenibles.',
    purpose:
      'Forge conversa con organizaciones y equipos para comprender una necesidad, definir un alcance viable y evaluar una posible implementación tecnológica. El objetivo es construir soluciones claras, mantenibles y proporcionadas al problema.',
    focusAreas: [
      {
        name: 'Arquitectura de soluciones',
        description: 'Exploración de estructuras técnicas simples, mantenibles y acordes al problema.',
      },
      {
        name: 'Prototipos e integraciones',
        description: 'Pruebas acotadas para validar flujos, conexiones y restricciones reales.',
      },
      {
        name: 'Sistemas internos',
        description: 'Diseño de herramientas que podrían ordenar información y tareas específicas.',
      },
      {
        name: 'MVP y aprendizaje',
        description: 'Versiones iniciales para aprender antes de definir una dirección de producto.',
      },
    ],
    workArtifacts: [
      'Hipótesis y alcance de investigación',
      'Mapas de flujo y decisiones técnicas',
      'Prototipos sujetos a validación',
      'Registro de aprendizajes y límites',
    ],
    method: [
      { title: 'Investigar', description: 'Comprender el contexto, el problema y sus restricciones.' },
      { title: 'Diseñar', description: 'Definir una hipótesis técnica pequeña y revisable.' },
      { title: 'Prototipar', description: 'Construir una representación suficiente para aprender.' },
      { title: 'Validar', description: 'Revisar utilidad, riesgos y próximos pasos posibles.' },
    ],
    limits: [
      'Recibe consultas y evalúa proyectos de implementación tecnológica.',
      'Cada necesidad se analiza antes de definir alcance, tiempos y condiciones.',
      'La formalización contractual y la facturación están sujetas a la documentación legal y administrativa aplicable.',
      'El sitio no procesa pagos ni confirma contrataciones de forma automática.',
    ],
    cta: { label: 'Conocer Forge' },
    contact: {
      heading: '¿Tenés una necesidad tecnológica para evaluar?',
      body:
        'Contanos el contexto. Blue Sky Forge ya recibe consultas y evalúa posibles proyectos de implementación tecnológica.',
      cta: 'Conversar sobre un proyecto',
    },
    seo: {
      title: 'Blue Sky Forge | Implementación tecnológica',
      description:
        'Conocé Blue Sky Forge y conversá sobre posibles proyectos de implementación tecnológica.',
    },
    faq: forgeFaq,
  },
  {
    id: 'prospect',
    slug: 'prospect',
    name: 'Blue Sky Prospect',
    shortName: 'Prospect',
    descriptor: 'Sistemas de prospectiva B2B',
    path: '/prospect',
    visibility: 'public',
    status: launchStatuses.development,
    publicAvailability: false,
    acceptsProjectInquiries: true,
    processesOperations: false,
    acceptsFunds: false,
    lastReviewedAt: LAST_REVIEWED_AT,
    summary:
      'Iniciativa en desarrollo que investiga sistemas para organizar prospección B2B, información comercial y seguimiento con control humano.',
    purpose:
      'Prospect concentra la exploración de CRM, automatización, priorización, mensajería, dashboards y reporting. Estas capacidades todavía no se ofrecen como plataforma ni servicio.',
    focusAreas: [
      {
        name: 'Investigación y foco',
        description: 'Modelos para estructurar segmentos, cuentas y criterios de relevancia.',
      },
      {
        name: 'CRM y seguimiento',
        description: 'Flujos conceptuales para registrar contexto, decisiones y próximos pasos.',
      },
      {
        name: 'Automatización supervisada',
        description: 'Exploración de asistencia técnica con revisión humana en puntos críticos.',
      },
      {
        name: 'Dashboards y reporting',
        description: 'Formas de visualizar actividad, calidad de datos y aprendizajes.',
      },
    ],
    workArtifacts: [
      'Hipótesis de proceso y criterios de foco',
      'Flujos conceptuales de CRM y seguimiento',
      'Prototipos de interfaces y automatizaciones',
      'Registro de validaciones y control humano',
    ],
    method: [
      { title: 'Investigar', description: 'Comprender los procesos y la información disponible.' },
      { title: 'Diseñar', description: 'Definir criterios, flujos y responsabilidades humanas.' },
      { title: 'Prototipar', description: 'Representar sistemas y automatizaciones de forma controlada.' },
      { title: 'Validar', description: 'Evaluar claridad, utilidad, riesgos y calidad del proceso.' },
    ],
    limits: [
      'No ofrece servicios de prospección al público.',
      'No existe registro, plataforma ni acceso de usuario.',
      'No ejecuta contactos, operaciones o decisiones comerciales.',
      'No promete resultados ni una fecha de lanzamiento.',
    ],
    cta: { label: 'Conocer Prospect' },
    contact: {
      heading: '¿Querés conocer o seguir la iniciativa?',
      body:
        'Recibimos consultas y manifestaciones de interés sobre Blue Sky Prospect mientras el sistema continúa en desarrollo.',
      cta: 'Realizar una consulta',
    },
    seo: {
      title: 'Blue Sky Prospect | Iniciativa en desarrollo',
      description:
        'Conocé Blue Sky Prospect, una iniciativa en desarrollo sobre CRM, prospectiva B2B, automatización supervisada y reporting.',
    },
    faq: prospectFaq,
  },
  {
    id: 'commerce',
    slug: 'commerce',
    name: 'Blue Sky Commerce',
    shortName: 'Commerce',
    descriptor: 'Iniciativa futura',
    path: '/commerce',
    visibility: 'public',
    status: launchStatuses.concept,
    publicAvailability: false,
    acceptsProjectInquiries: false,
    processesOperations: false,
    acceptsFunds: false,
    lastReviewedAt: LAST_REVIEWED_AT,
    summary:
      'Línea futura de exploración sobre nuevas experiencias de comercio digital dentro del ecosistema Blue Sky.',
    purpose:
      'Commerce permite expresar una dirección de investigación sin presentarla como producto confirmado. Su alcance, formato y continuidad todavía no están definidos.',
    focusAreas: [
      {
        name: 'Contextos de comercio',
        description: 'Observación de problemas y oportunidades que podrían justificar una iniciativa.',
      },
      {
        name: 'Experiencias digitales',
        description: 'Exploración conceptual de recorridos, información y confianza.',
      },
      {
        name: 'Integración futura',
        description: 'Análisis preliminar de cómo podría relacionarse con otras capacidades del grupo.',
      },
    ],
    workArtifacts: [
      'Preguntas de investigación',
      'Mapas conceptuales',
      'Hipótesis sujetas a revisión',
      'Registro de decisiones futuras',
    ],
    method: [
      { title: 'Observar', description: 'Reconocer contextos sin asumir una solución.' },
      { title: 'Investigar', description: 'Formular preguntas y límites iniciales.' },
      { title: 'Evaluar', description: 'Determinar si existe una dirección que merezca profundización.' },
    ],
    limits: [
      'No es un producto o servicio confirmado.',
      'No procesa operaciones ni recibe fondos.',
      'No tiene fecha de lanzamiento ni acceso previsto.',
      'La iniciativa puede reformularse o discontinuarse.',
    ],
    cta: { label: 'Conocer la visión' },
    contact: {
      heading: '¿Querés conversar sobre la visión futura?',
      body:
        'Podés escribirnos para conocer el enfoque institucional de Commerce o compartir una perspectiva vinculada con su campo de exploración.',
      cta: 'Realizar una consulta',
    },
    seo: {
      title: 'Blue Sky Commerce | Exploración conceptual',
      description:
        'Conocé la visión de Blue Sky Commerce, una iniciativa futura en exploración conceptual y sin lanzamiento confirmado.',
    },
    faq: commerceFaq,
  },
];

export const publicUnits = units.filter((unit) => unit.visibility === 'public');
export const unitsBySlug = Object.fromEntries(units.map((unit) => [unit.slug, unit]));

export const principles = [
  {
    title: 'Utilidad antes que complejidad',
    description:
      'Diseñamos soluciones alrededor de problemas reales, sin sumar tecnología porque sí.',
  },
  {
    title: 'Ejecución con criterio',
    description:
      'Avanzamos con objetivos claros, decisiones revisables y una mirada práctica sobre cada alcance.',
  },
  {
    title: 'Relaciones de largo plazo',
    description:
      'Priorizamos vínculos transparentes, colaboración genuina y compromisos que puedan sostenerse.',
  },
  {
    title: 'Evolución responsable',
    description:
      'Cada unidad puede aprender y crecer sin perder claridad sobre lo disponible, lo que se desarrolla y la visión futura.',
  },
];

export const homeContent = {
  title: 'Conectamos capacidades para convertir ideas en soluciones con visión de largo plazo.',
  lead:
    'Reunimos implementación tecnológica, desarrollo comercial y exploración de nuevas oportunidades digitales. Estamos abiertos a recibir consultas y conversar sobre proyectos.',
  seo: {
    title: 'Blue Sky Group | Tecnología, desarrollo comercial y nuevas oportunidades',
    description:
      'Blue Sky Group articula Blue Sky Forge, Blue Sky Prospect y Blue Sky Commerce bajo una visión compartida.',
  },
};

export const generalFaq = [
  {
    id: 'que-es-blue-sky-group',
    question: '¿Qué es Blue Sky Group?',
    answer:
      'Blue Sky Group es un grupo que desarrolla iniciativas vinculadas con tecnología y nuevas capacidades empresariales. La web presenta su visión, sus unidades y el trabajo actualmente en curso.',
  },
  {
    id: 'unidades-del-grupo',
    question: '¿Qué unidades forman parte del grupo?',
    answer:
      'Blue Sky Forge se enfoca en implementación tecnológica, Blue Sky Prospect desarrolla sistemas de prospectiva B2B y Blue Sky Commerce explora una dirección futura de comercio digital.',
  },
  {
    id: 'servicios-disponibles',
    question: '¿Puedo consultar por un proyecto?',
    answer:
      'Sí. Blue Sky Forge recibe consultas y evalúa posibles proyectos de implementación tecnológica. Prospect también recibe consultas y manifestaciones de interés, aunque todavía no funciona como plataforma pública.',
  },
  {
    id: 'contratacion',
    question: '¿Cómo se formaliza un proyecto con Forge?',
    answer:
      'Una conversación inicial permite comprender la necesidad y evaluar el encuadre del proyecto. La contratación formal y la facturación están sujetas a acuerdos específicos y a la finalización de la documentación legal y administrativa aplicable.',
  },
  {
    id: 'registro',
    question: '¿Puedo registrarme o crear una cuenta?',
    answer:
      'No. El sitio no ofrece registro, login, acceso a plataforma ni cuentas de usuario.',
  },
  {
    id: 'operaciones-y-fondos',
    question: '¿Puedo realizar una operación o enviar fondos?',
    answer:
      'No. Blue Sky Group no procesa operaciones ni recibe fondos a través de este sitio. No envíes dinero o información financiera ante comunicaciones que afirmen lo contrario.',
  },
  {
    id: 'fecha-de-lanzamiento',
    question: '¿Cuándo estará disponible Blue Sky Prospect?',
    answer:
      'No existe una fecha pública confirmada. El desarrollo se realiza por etapas y cualquier cambio relevante se publicará en Compliance.',
  },
  {
    id: 'prototipos',
    question: '¿Todo lo que aparece en la web ya está funcionando?',
    answer:
      'No necesariamente. Diagramas, interfaces y flujos pueden representar conceptos o prototipos sujetos a cambios, reemplazo o discontinuación.',
  },
  {
    id: 'precios',
    question: '¿Existen precios o condiciones comerciales?',
    answer:
      'No se publican precios generales. Los posibles proyectos de Forge requieren una evaluación de alcance antes de conversar condiciones específicas.',
  },
  {
    id: 'regulacion',
    question: '¿La información implica una autorización regulatoria?',
    answer:
      'No. La presentación institucional no implica autorización o licencia para realizar actividades reguladas. Cualquier actividad futura deberá evaluarse conforme a la normativa aplicable.',
  },
  {
    id: 'privacidad',
    question: '¿Qué datos recopila este sitio?',
    answer:
      'El sitio no tiene formularios, cuentas ni pagos habilitados. Los canales externos pueden tratar los datos que una persona decida enviar voluntariamente. La Política de privacidad explica el alcance actual.',
  },
  {
    id: 'contacto',
    question: '¿Cómo puedo comunicarme?',
    answer:
      'Estamos abiertos a recibir consultas generales, conversar sobre nuevos proyectos, prensa o posibles alianzas. El mensaje inicia una conversación para comprender el contexto y evaluar el próximo paso.',
  },
];

export const contactCategories = [
  {
    id: 'general',
    label: 'Proyectos y consultas',
    description: 'Ideas, preguntas institucionales y conversaciones iniciales sobre nuevos proyectos.',
    intent: 'conversar sobre un proyecto o realizar una consulta institucional',
  },
  {
    id: 'press',
    label: 'Prensa',
    description: 'Consultas periodísticas, entrevistas o información institucional.',
    intent: 'realizar una consulta de prensa',
  },
  {
    id: 'partnerships',
    label: 'Alianzas',
    description: 'Conversaciones institucionales sobre investigación o colaboración futura.',
    intent: 'conversar sobre una posible alianza institucional',
  },
];

export const contentCollections = Object.freeze({
  updates: [],
  cases: [],
  resources: [],
});
