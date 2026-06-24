/**
 * Contenido de las vistas internas por unidad del ecosistema (Forge,
 * Prospect). Cada entrada alimenta <ServiceDetailView />, que no conoce
 * nada específico de ninguna unidad. Para agregar una unidad nueva:
 * agregar una clave aquí con el mismo shape — no hay que tocar
 * ServiceDetailView.jsx ni la lógica de navegación en App.jsx.
 *
 * Estructura pensada como funnel, no como ficha informativa:
 * hero (qué es y qué promete) → overview/problem (orden configurable vía
 * sectionOrder) → capabilities (qué incluye: opcionalmente un bloque
 * `featured` de oferta de entrada + `categories` de capacidades
 * complementarias) → audience (para quién) → process (cómo funciona el
 * sistema) → scenarios/differentiators (orden configurable vía
 * midSectionOrder) → workflow opcional (cómo se implementa con el
 * cliente — distinto de process: habla de la relación comercial, no del
 * motor operativo) → finalCta (conversión).
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

  prospect: {
    id: 'prospect',
    title: 'Blue Sky Prospect',
    // Problema primero, luego "qué es" — a diferencia de Forge, acá interesa
    // que el visitante se reconozca en el dolor antes de leer la definición.
    sectionOrder: ['problem', 'overview'],
    // Diferencial antes de casos de uso: refuerza "no es una lista" antes
    // de mostrar escenarios, para que no se lean como ejemplos de leads sueltos.
    midSectionOrder: ['differentiators', 'scenarios'],
    hero: {
      subtitle: 'Prospección B2B asistida por IA, con criterio comercial y control humano.',
      text:
        'Blue Sky Prospect ayuda a empresas B2B a encontrar mejores cuentas, priorizar oportunidades y preparar mensajes comerciales con más foco, contexto y trazabilidad.',
      cta: { label: 'Solicitar diagnóstico' },
      secondaryCta: { label: 'Ver cómo funciona', targetId: 'prospect-view-capabilities' },
    },
    problem: {
      heading: 'La prospección no falla solo por falta de esfuerzo. Falla por falta de sistema.',
      items: [
        'No sé a qué empresas salir a buscar.',
        'Tengo contactos, pero no sé cuáles valen la pena.',
        'Mi equipo comercial pierde tiempo investigando.',
        'Mandamos mensajes, pero son genéricos.',
        'No tenemos seguimiento ordenado.',
        'El CRM está vacío o desactualizado.',
        'Dependemos demasiado de recomendaciones.',
        'Nos cuesta sostener una cadencia comercial constante.',
      ],
    },
    overview: {
      heading: 'Qué es Blue Sky Prospect',
      body:
        'Blue Sky Prospect es un servicio de prospección B2B asistido por IA que ayuda a empresas a transformar mercados objetivo en oportunidades comerciales accionables. Investigamos empresas, detectamos contactos potenciales, priorizamos leads, preparamos mensajes y ordenamos próximos pasos para que el equipo comercial pueda ejecutar con más criterio.',
      extra:
        'No reemplaza al equipo comercial: lo potencia. El sistema trabaja el frío; el comercial trabaja el interés.',
      highlight: 'La IA prepara. El criterio humano decide.',
    },
    capabilities: {
      heading: 'Qué incluye',
      featured: {
        kicker: 'Oferta de entrada',
        title: 'Sprint de Oportunidades B2B',
        description: 'Una primera base priorizada de oportunidades para salir a prospectar con más criterio.',
        examples: ['Empresas objetivo investigadas', 'Scoring y motivo de fit', 'Mensaje inicial y follow-ups sugeridos'],
        result: 'Una base accionable, lista para que el equipo comercial empiece a ejecutar.',
      },
      categoriesHeading: 'Capacidades complementarias',
      categories: [
        {
          title: 'Setup Prospect',
          description: 'Armado inicial del sistema de prospección desde cero.',
          examples: ['ICP documentado', 'Cuentas objetivo y contactos sugeridos', 'CRM simple en Sheet, Airtable o Notion'],
          result: 'Un sistema comercial inicial para prospectar con continuidad.',
        },
        {
          title: 'Prospect Assist Mensual',
          description: 'Acompañamiento recurrente para sostener la prospección.',
          examples: ['Nuevas cuentas y contactos cada mes', 'Actualización de seguimiento', 'Reporte mensual'],
          result: 'La prospección deja de ser una acción aislada y se vuelve una operación continua.',
        },
        {
          title: 'Auditoría de Prospección',
          description: 'Diagnóstico del proceso comercial actual.',
          examples: ['Revisión de ICP y base actual', 'Revisión de canales y mensajes', 'Plan de acción inicial'],
          result: 'Claridad sobre qué está frenando la generación de oportunidades, antes de invertir.',
        },
        {
          title: 'Mensajería Comercial B2B',
          description: 'Mensajes y follow-ups para empresas que ya tienen base o contactos.',
          examples: ['Mensaje inicial y variantes por segmento', 'Follow-ups y mensaje de reactivación', 'Guión breve de llamada'],
          result: 'Mejora la calidad del primer contacto comercial.',
        },
      ],
    },
    audience: {
      heading: 'Para quién está pensado',
      items: [
        'Founders B2B que todavía venden de forma manual.',
        'Equipos comerciales chicos sin SDR dedicado.',
        'Consultoras y agencias B2B.',
        'Software companies chicas o medianas.',
        'Empresas industriales con oferta B2B.',
        'Servicios profesionales que buscan nuevos clientes.',
        'Empresas con ticket medio o alto que dependen demasiado de referidos.',
        'Pymes que necesitan ordenar su prospección.',
      ],
    },
    process: {
      heading: 'Cómo funciona el sistema',
      subheading: 'El flujo operativo de prospección, de punta a punta.',
      steps: [
        { title: 'Entendemos tu oferta', description: 'Analizamos qué vendés, a quién, con qué ticket y en qué mercado.' },
        { title: 'Definimos el foco comercial', description: 'Clarificamos ICP, segmentos y criterios de búsqueda.' },
        { title: 'Investigamos empresas objetivo', description: 'Construimos una primera base de cuentas con sentido comercial.' },
        { title: 'Priorizamos oportunidades', description: 'Asignamos score y motivo de fit para ordenar el trabajo comercial.' },
        { title: 'Preparamos mensajes', description: 'Redactamos mensajes iniciales y follow-ups con contexto.' },
        { title: 'Entregamos próximos pasos', description: 'Dejamos una base accionable en Sheet o CRM simple, con recomendaciones de ejecución.' },
      ],
    },
    differentiators: {
      heading: 'No vendemos bases genéricas. Construimos criterio comercial.',
      lead: 'El objetivo no es contactar más por volumen. El objetivo es prospectar mejor.',
      items: [
        'No se limita a entregar contactos: investiga contexto antes de priorizar.',
        'Combina IA con revisión humana en cada etapa.',
        'Prioriza fit y calidad, no solo volumen.',
        'Entrega una base accionable, no un informe abstracto.',
        'Construye proceso y aprendizaje comercial, no solo contactos.',
        'No es scraping masivo ni automatización sin control.',
      ],
    },
    scenarios: {
      heading: 'Casos de uso',
      note: 'Escenarios de ejemplo, no casos reales confirmados.',
      items: [
        'Una empresa que arranca su primera prospección outbound y no sabe por dónde empezar.',
        'Un equipo comercial chico sin SDR dedicado que necesita ordenar su pipeline.',
        'Una consultora B2B que depende demasiado de referidos y quiere ampliar canales.',
        'Una empresa con un CRM desactualizado que necesita reordenar su base.',
        'Una empresa que ya tiene contactos pero no sabe cómo abordarlos con mensajes relevantes.',
        'Una empresa que necesita un diagnóstico antes de invertir en prospección.',
      ],
    },
    workflow: {
      heading: 'Cómo se trabaja con el cliente',
      subheading: 'El proceso comercial de implementación: onboarding y trabajo conjunto.',
      steps: [
        { title: 'Diagnóstico', description: 'Entendemos qué vende la empresa, a quién quiere llegar y qué oportunidad busca.' },
        { title: 'Definición de segmento', description: 'Se definen industrias, empresas, cargos, ubicación, tamaño y criterios de fit.' },
        { title: 'Configuración', description: 'Se acuerdan criterios, mensajes, canales y formato de entrega.' },
        { title: 'Primera ejecución supervisada', description: 'Se valida calidad de prospectos, mensajes y priorización antes de escalar.' },
        { title: 'Ajuste e iteración', description: 'Se mejora el sistema según resultados, aprendizaje comercial y feedback humano.' },
      ],
    },
    finalCta: {
      heading: 'Convertí tu prospección en un sistema comercial más claro.',
      text:
        'Blue Sky Prospect te ayuda a encontrar mejores oportunidades, priorizarlas y preparar el contacto con más contexto y menos improvisación.',
      cta: {
        label: 'Solicitar diagnóstico',
        href: 'https://api.whatsapp.com/send/?phone=5491171008349&text&type=phone_number&app_absent=0',
        external: true,
      },
      secondaryCta: { label: 'Coordinar una consulta' },
    },
  },
};
