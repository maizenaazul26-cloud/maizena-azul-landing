# Blue Sky Group

Sitio institucional de Blue Sky Group, construido con React 19, Vite 8 y CSS propio.

La web presenta tres unidades con alcances diferentes. Blue Sky Forge recibe consultas y evalúa
posibles proyectos de implementación; Blue Sky Prospect continúa en desarrollo y Blue Sky
Commerce permanece como iniciativa futura. El sitio no habilita cuentas, pagos ni operaciones.

## Rutas públicas

- `/`
- `/forge`
- `/prospect`
- `/commerce`
- `/estado-y-alcance`
- `/contacto`
- `/privacidad`
- `/terminos`

Las rutas desconocidas muestran una página 404 cliente con `noindex`. Vercel usa el rewrite de
`vercel.json` para que las rutas directas y las recargas lleguen a la aplicación. Los enlaces
históricos `/#forge`, `/#prospect` y `/#commerce` redirigen a sus rutas reales.

## Arquitectura

```text
src/
|-- components/
|   |-- HomePage.jsx/css
|   |-- ServiceDetailView.jsx/css
|   |-- StatusScopePage.jsx
|   |-- ContactPage.jsx
|   |-- PrivacyPage.jsx
|   |-- TermsPage.jsx
|   |-- Navbar.jsx/css
|   |-- Footer.jsx/css
|   |-- EcosystemDiagram.jsx
|   |-- StatusBadge.jsx
|   |-- FaqList.jsx
|   |-- PageMeta.jsx
|   `-- SiteLink.jsx
|-- data/
|   `-- siteContent.js
|-- lib/
|   |-- analytics.js
|   `-- contact.js
|-- router.js
`-- App.jsx
```

`src/data/siteContent.js` es la fuente única para nombres, descriptores, estados, recepción de
consultas, límites, fechas, CTA, FAQ, SEO y categorías de contacto.

El proyecto es JavaScript. El modelo utiliza definiciones JSDoc para mantener un contrato tipado
sin migrar el stack ni sumar TypeScript como dependencia.

## Estados

| Unidad | Estado | Alcance actual |
|---|---|---|
| Blue Sky Forge | Consultas abiertas | Evalúa posibles proyectos de implementación |
| Blue Sky Prospect | En desarrollo | Recibe consultas e interés; sin plataforma pública |
| Blue Sky Commerce | Exploración conceptual | Iniciativa futura |

También están modelados `internal-pilot` y `available`, pero ninguna unidad los usa actualmente.

## Funciones desactivadas

`featureFlags.commercialContact` está en `true` para reflejar el canal de proyectos y consultas.
Se mantienen en `false`:

- Registro público.
- Waitlist.
- Formulario de leads.
- Pagos.
- Área privada.

No existe backend de formularios confirmado. El contacto público abre el número institucional ya
configurado para consultas generales, conversaciones sobre proyectos, prensa y alianzas, sin
presentarlo como contratación de servicios.

## Sistema visual

La paleta oficial y sus fuentes verificadas se documentan en
`docs/BSG_COLOR_SYSTEM.md`. Los tokens cromáticos, de espaciado, radio, botones y motion viven en
`src/index.css`; los componentes consumen esos roles semánticos sin introducir azules alternativos.

## Analítica

`src/lib/analytics.js` agrega eventos a `window.dataLayer` y emite `bsg:analytics`. No instala un
proveedor externo ni cookies no esenciales.

Eventos actuales:

- `ecosystem_explore`
- `unit_navigation`
- `unit_page_view`
- `institutional_contact_open`
- `institutional_contact_click`
- `mobile_menu_toggle`

## Motion y accesibilidad

Los tokens generales de motion viven en `src/index.css`; los tiempos del intro de marca están
centralizados en `src/constants/motion.js`. `BrandMotion` reutiliza las métricas CSS del título
real, espera la fuente, bloquea scroll durante la secuencia y entrega el título con FLIP sin
crossfade. `prefers-reduced-motion` salta el intro, el stagger, los desplazamientos y el scroll
suave.

El menú mobile incluye focus trap, cierre con Escape, devolución del foco y contenido principal
`inert` mientras está abierto.

## Textos legales

`/estado-y-alcance`, `/privacidad` y `/terminos` describen el comportamiento actual del sitio.
Son borradores informativos sujetos a revisión por un profesional que conozca la entidad, la
jurisdicción, las actividades futuras y el tratamiento real de datos.

## Desarrollo y validación

```bash
npm install
npm run dev -- --port 5174
npm run lint
npm test
npm run build
npm run preview -- --port 4174
node capture.cjs
```

En PowerShell con política de scripts restringida, usar `npm.cmd`.

`capture.cjs` detecta Chrome o Edge instalados, admite `CAPTURE_URL` y valida rutas, navegación,
teclado, red, consola, reduced motion, fallback sin JavaScript y overflow en siete viewports. Las
mediciones del hand-off se guardan en
`review-screenshots/brand-motion-measurements.json`.
