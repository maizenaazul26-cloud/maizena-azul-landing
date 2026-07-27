# Blue Sky Group — Trazabilidad institucional P0, P1 y P2

Fuente: `Informe_Benchmark_Web_Blue_Sky_Group_2026-07-25.md`.

## P0

| Requisito | Implementación | Evidencia |
|---|---|---|
| Fuente única | Estados, consultas, límites, revisión y flags | `src/data/siteContent.js`, tests |
| Navegación | Desktop, dropdown, mobile accordion, foco y estado activo | `Navbar.jsx`, `Navbar.css` |
| Hero | Copy institucional y organigrama semántico del ecosistema | `Hero.jsx`, `EcosystemDiagram.jsx` |
| Grupo y ecosistema | Rol del holding y tres iniciativas diferenciadas | `HomePage.jsx` |
| Páginas internas | Forge, Prospect y Commerce con plantilla común | `ServiceDetailView.jsx` |
| Propósito | Dirección institucional y cuatro principios concretos | `siteContent.js`, `HomePage.jsx` |
| Compliance | Alcance diferenciado de Forge, Prospect y Commerce | `StatusScopePage.jsx` |
| FAQ | Doce preguntas globales y FAQ por unidad | `FaqList.jsx`, `siteContent.js` |
| Contacto | Proyectos, consultas, prensa y alianzas; sin formulario | `ContactPage.jsx`, `contact.js` |
| Footer | Unidades, navegación, legales y marco de alcance | `Footer.jsx` |
| SEO | Metadata, canonical, sitemap, robots y manifest | `PageMeta.jsx`, `public/`, `index.html` |
| Sistema cromático | Paleta verificada contra assets y tokens originales | `docs/BSG_COLOR_SYSTEM.md`, `src/index.css` |

## P1

| Requisito | Implementación | Evidencia |
|---|---|---|
| Tokens de motion | 140/220/420 ms, curvas, distancias y stagger | `src/index.css` |
| Intro de marca | Clon estructural de dos líneas, métricas compartidas, FLIP y hand-off sin crossfade | `BrandMotion.jsx`, `BrandMotion.css`, `motion.js` |
| Robustez del intro | Espera de fuente, scroll-lock, cleanup, resize, teclado y timeout | `BrandMotion.jsx`, `capture.cjs` |
| Motion funcional | Navbar, tarjetas, menú, FAQ y línea SVG | CSS de componentes |
| Reduced motion | Animación mínima y scroll automático | `src/index.css`, `capture.cjs` |
| Ecosistema visual | Organigrama HTML accesible con conectores SVG, composición fluida en desktop y lectura vertical en mobile | `EcosystemDiagram.jsx`, `Hero.css` |
| Validación visual | Siete viewports, rutas, teclado, red, no-JS y delta de aterrizaje | `capture.cjs`, `review-screenshots/brand-motion-measurements.json` |

## P2

| Requisito | Implementación | Evidencia |
|---|---|---|
| Estados futuros | `internal-pilot` y `available` modelados | `siteContent.js` |
| Funciones futuras | Registro, waitlist, leads, pagos y área privada en `false`; contacto comercial activo | `featureFlags` |
| Contenido futuro | Colecciones vacías sin rutas públicas | `contentCollections` |
| Analítica | Capa local compatible con `dataLayer`, sin proveedor | `analytics.js` |

## Decisiones prudentes

- No se migró de Vite a Next.js: el stack actual resuelve el alcance sin reescritura.
- No se agregó TypeScript; se incorporó contrato JSDoc sobre la fuente de datos.
- Se eliminó el formulario sin backend y el adaptador de leads.
- No se publicaron waitlist, registro, login, pagos u operaciones.
- Los textos legales quedan marcados como borradores sujetos a revisión profesional.
