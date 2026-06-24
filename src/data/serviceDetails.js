/**
 * Contenido de las vistas internas por unidad del ecosistema (Forge hoy,
 * Prospect después). Cada entrada alimenta <ServiceDetailView />, que no
 * conoce nada específico de ninguna unidad. Para agregar una unidad nueva:
 * agregar una clave aquí (ej. serviceDetails.prospect) con el mismo shape
 * — no hay que tocar ServiceDetailView.jsx ni la lógica de navegación en
 * App.jsx.
 *
 * Estructura pensada como funnel, no como ficha informativa:
 * hero (qué es y qué promete) → overview (qué es, en detalle) →
 * problem (reconocimiento) → capabilities (qué construye, por categoría) →
 * audience (para quién) → process (cómo trabaja) →
 * scenarios (tangibilidad) → differentiators (por qué) →
 * finalCta (conversión).
 */
export const serviceDetails = {
  forge: {
    id: 'forge',
    title: 'Blue Sky Forge',
    hero: {
      subtitle: 'Convertimos necesidades comerciales y operativas en herramientas digitales reales.',
      text:
        'Blue Sky Forge es la unidad tecnológica de Blue Sky Group. Diseñamos y construimos soluciones digitales para empresas, pymes, profesionales y startups que necesitan vender mejor, operar mejor, automatizar procesos o convertir una idea en una herramienta funcional.',
      cta: { label: 'Coordinar una consulta' },
      secondaryCta: { label: 'Ver qué podemos construir', targetId: 'forge-view-capabilities' },
    },
    overview: {
      heading: 'Qué es Blue Sky Forge',
      body:
        'Blue Sky Forge trabaja sobre problemas comerciales y operativos que pueden resolverse con tecnología. No parte de una herramienta prearmada: primero entiende el negocio, el proceso y el objetivo. Después diseña una solución concreta, usable y alineada a lo que la empresa necesita lograr.',
      extra:
        'Puede ser una landing para captar consultas, un sistema interno, una automatización, un dashboard, un agente IA, una integración o un MVP para validar una idea.',
      highlight: 'Primero entendemos el problema. Después construimos la herramienta.',
    },
    problem: {
      heading: 'Cuando la operación pide una herramienta',
      items: [
        'Mi empresa vende por WhatsApp, Excel y procesos manuales.',
        'Tengo una idea, pero no sé cómo convertirla en una herramienta real.',
        'Necesito una landing que explique mejor lo que hago.',
        'Quiero automatizar tareas, pero no sé por dónde empezar.',
        'Tengo información comercial dispersa.',
        'Necesito validar un MVP sin armar una estructura técnica enorme.',
      ],
    },
    capabilities: {
      heading: 'Qué construimos',
      categories: [
        {
          title: 'Presencia y captación',
          description: 'Para explicar mejor una propuesta y convertir visitas en consultas.',
          examples: ['Landing pages comerciales', 'Sitios web institucionales', 'Páginas de captación de leads'],
          result: 'Una presencia digital que convierte visitas en consultas reales.',
        },
        {
          title: 'Automatización e IA',
          description: 'Para reducir tareas repetitivas y responder más rápido sin perder control humano.',
          examples: ['Automatizaciones de procesos', 'Chatbots y asistentes', 'Agentes IA para tareas específicas'],
          result: 'Respuestas más rápidas, sin perder el criterio humano en las decisiones clave.',
        },
        {
          title: 'Operación interna',
          description: 'Para ordenar información, procesos y decisiones.',
          examples: ['Sistemas internos', 'Dashboards comerciales', 'Integraciones', 'Módulos comerciales básicos'],
          result: 'Visibilidad clara para decidir con datos, no con memoria ni intuición.',
        },
        {
          title: 'Validación y producto',
          description: 'Para probar una idea antes de invertir fuerte.',
          examples: ['MVPs', 'Prototipos funcionales', 'Herramientas iniciales de validación'],
          result: 'Algo tangible para mostrar, testear y ajustar antes de escalar.',
        },
      ],
    },
    audience: {
      heading: 'Para quién está pensado',
      items: [
        'Empresas que necesitan digitalizar procesos.',
        'Pymes que quieren vender mejor.',
        'Profesionales independientes con operación comercial.',
        'Responsables inscriptos con procesos manuales.',
        'Startups que necesitan validar un MVP.',
        'Equipos comerciales que necesitan ordenar leads.',
        'Negocios que quieren incorporar IA sin armar un equipo técnico propio.',
        'Emprendimientos que quieren llevar una idea a una solución funcional.',
      ],
    },
    process: {
      heading: 'Cómo trabajamos',
      steps: [
        { title: 'Diagnóstico', description: 'Entendemos el negocio, el flujo actual, el problema y el objetivo.' },
        { title: 'Diseño de solución', description: 'Definimos qué herramienta tiene sentido construir.' },
        { title: 'Construcción funcional', description: 'Desarrollamos una primera versión usable, clara y orientada a negocio.' },
        { title: 'Validación', description: 'Probamos con uso real o con el equipo interno.' },
        { title: 'Iteración', description: 'Mejoramos en base a feedback, uso y nuevas necesidades.' },
      ],
    },
    scenarios: {
      heading: 'Casos de uso',
      note: 'Escenarios de ejemplo, no casos reales confirmados.',
      items: [
        'Una pyme que necesita una landing para captar consultas.',
        'Un equipo comercial que quiere ordenar leads.',
        'Un profesional que vende por WhatsApp y necesita automatizar el seguimiento.',
        'Una startup que quiere validar un MVP.',
        'Una empresa que necesita un dashboard simple para tomar decisiones.',
        'Un negocio que quiere incorporar IA en tareas repetitivas.',
      ],
    },
    differentiators: {
      heading: 'Por qué Blue Sky Forge',
      lead: 'No vendemos software genérico: construimos soluciones aplicadas al negocio.',
      items: [
        'Pensamos primero el problema comercial.',
        'Diseñamos soluciones usables, no sistemas innecesariamente complejos.',
        'Construimos herramientas orientadas a resultado.',
        'Integramos diseño, tecnología e inteligencia comercial.',
        'Buscamos claridad, velocidad y utilidad real.',
      ],
    },
    finalCta: {
      heading: 'Convertí una idea o un problema en una solución concreta.',
      text:
        'Si tenés una idea, un proceso trabado o una necesidad comercial que podría resolverse con tecnología, Blue Sky Forge puede ayudarte a convertirlo en una solución clara, usable y orientada a negocio.',
      cta: {
        label: 'Coordinar una consulta',
        href: 'https://api.whatsapp.com/send/?phone=5491171008349&text&type=phone_number&app_absent=0',
        external: true,
      },
      secondaryCta: { label: 'Evaluar una idea' },
    },
  },
};
