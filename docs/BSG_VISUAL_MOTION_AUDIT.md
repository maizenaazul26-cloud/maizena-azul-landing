# BSG Visual & Motion Audit — Blue Sky Group Landing

**Fecha:** 2026-06-11
**Tipo:** Auditoría read-only (no se modificó código de producción)
**Alcance:** Estructura, diseño visual, narrativa, hero, navbar, mobile, animaciones, secuencia de marca, arquitectura de motion, backlog y prompts de ejecución.

---

## 1. Resumen ejecutivo

La landing está en un estado **mucho más maduro de lo que sugiere el pedido**: tras 17+ iteraciones documentadas en `visual_review.md`, el sistema de scroll (marca chica en navbar, links con transform, desvanecimiento del título en mobile), el menú mobile, el dropdown y la narrativa holding → Prospect → Commerce ya funcionan y están validados. El build pasa en 161ms sin errores.

**El problema central es uno solo y es geométrico:** el componente `BrandMotion` (nuevo, sin commitear) implementa la secuencia `Intro central → Hero` con técnica FLIP correcta, pero **anima un texto de UNA línea (`BLUE SKY GROUP`, nowrap) hacia un target de DOS líneas (`BLUE SKY` / `GROUP`)**. Las cajas no comparten relación de aspecto, el `scale` uniforme (`Math.min(scaleX, scaleY)`) llega a ~70% del tamaño real del título, y el crossfade final (350ms out / 480ms in) es un **swap visible entre dos formas distintas**, no un morph. La sensación de "el texto se achica y se reorganiza" no existe: hay sustitución.

**Recomendación principal:** conservar la arquitectura `BrandMotion` (Opción B, ya elegida implícitamente y correcta) pero **rehacer su geometría**: el texto animado debe renderizarse con la misma estructura de dos líneas y las mismas métricas tipográficas que `.hero__title`, de modo que el FLIP sea un `translate + scale` uniforme entre cajas de aspecto idéntico y la llegada sea pixel-perfect, eliminando el crossfade (hand-off en un frame). Todo el sistema de scroll (Estado 3) debe conservarse tal cual.

---

## 2. Estado actual de la landing

### 2.1 Inventario de componentes

| Componente | Archivo | Está montado | Función visual | Riesgo |
|---|---|---|---|---|
| App | `src/App.jsx` | — (raíz) | Orquesta orden de render | Bajo |
| IntroSplash | `src/components/IntroSplash.jsx/.css` | ✅ | Overlay azul de entrada (solo fondo; ya no porta texto) | Bajo |
| **BrandMotion** | `src/components/BrandMotion.jsx/.css` | ✅ (nuevo, **sin commitear**) | Texto `BLUE SKY GROUP` fijo: intro centrado → FLIP al hero → crossfade | **Alto** (geometría rota, ver §4) |
| Navbar | `src/components/Navbar.jsx/.css` | ✅ | Nav fixed, marca chica en scroll, dropdown, menú mobile | Medio (solo dropdown) |
| Hero | `src/components/Hero.jsx/.css` | ✅ | Título 2 líneas arriba-izq, copy, CTAs, banda ecosistema | Bajo |
| AboutGroup | `src/components/AboutGroup.jsx/.css` | ✅ (`#que-es`) | Sección 01 editorial | Bajo |
| Prospect | `src/components/Prospect.jsx/.css` | ✅ (`#blue-sky-prospect`) | Sección 02, servicio activo | Bajo |
| Problem | `src/components/Problem.jsx/.css` | ✅ (`#problem`) | Sección 03, qué resuelve | Bajo (fix de opacity ya aplicado en it. 1) |
| AgentSystem | `src/components/AgentSystem.jsx/.css` | ✅ (`#agent-system`) | Sección 04, sistema de agentes | Bajo (TODO iconografía) |
| HowItWorks | `src/components/HowItWorks.jsx/.css` | ✅ (`#how-it-works`) | Sección 05, proceso | Bajo |
| Commerce | `src/components/Commerce.jsx/.css` | ✅ (`#blue-sky-commerce`) | Sección 06, futuro (badge "En desarrollo") | Bajo |
| CtaFinal | `src/components/CtaFinal.jsx/.css` | ✅ (`#contacto`) | Card azul de contacto final | Bajo |
| Footer | `src/components/Footer.jsx/.css` | ✅ | Pie institucional | Bajo |
| Icons | `src/components/Icons.jsx` | ✅ (importado) | Set de íconos SVG | Bajo |
| Contact | `src/components/Contact.jsx/.css` | ❌ legacy | Usa `useInView` (patrón prohibido) | Ruido de repo |
| Ecosystem | `src/components/Ecosystem.jsx/.css` | ❌ legacy | Usa `useInView` | Ruido de repo |
| Units | `src/components/Units.jsx/.css` | ❌ legacy | Usa `useInView` ×2 | Ruido de repo |
| Vision | `src/components/Vision.jsx/.css` | ❌ legacy | Usa `useInView` | Ruido de repo |
| useInView | `src/hooks/useInView.js` | ❌ (solo legacy lo usa) | Hook IntersectionObserver | Ruido de repo |
| theme | `src/constants/theme.js` | ❓ (constantes) | — | Bajo |
| CSS global | `src/index.css` | ✅ | Design system, tipografía, secciones | Bajo |
| Capturas | `capture.cjs` | dev-tool | Puppeteer → `review-screenshots/` | Medio (puppeteer fuera de package.json, se poda con cada `npm install`) |

### 2.2 Orden real de renderizado (confirmado en `App.jsx`)

```txt
IntroSplash      (overlay azul, z-index 9999, se desmonta a 1700ms)
BrandMotion      (texto de marca fijo, z-index 10000, se desmonta a 2250ms)  ← NUEVO
Navbar           (fixed, z-index 1000)
main:
  Hero           (#hero)
  AboutGroup     (#que-es)
  Prospect       (#blue-sky-prospect)
  Problem        (#problem)
  AgentSystem    (#agent-system)
  HowItWorks     (#how-it-works)
  Commerce       (#blue-sky-commerce)
  CtaFinal       (#contacto)
Footer
```

**Cambios vs. el orden de referencia del brief:** se agregó `BrandMotion` (nuevo); `Prospect` va antes de `Problem` (decisión narrativa de la iteración 1, correcta); el contacto vive en `CtaFinal` (no en el legacy `Contact`). El resto coincide.

### 2.3 Estado del working tree

`BrandMotion.jsx/.css` están **untracked** y `App.jsx`, `Hero.css`, `IntroSplash.jsx/.css`, `Navbar.css` tienen cambios sin commitear: la iteración de BrandMotion es trabajo en curso, no aprobado. `visual_review.md` documenta hasta la iteración 17 (versión previa, donde IntroSplash aún portaba el texto).

---

## 3. Diagnóstico visual

### 3.1 Identidad de marca — fuerte, lograda

- El azul institucional `#066fee` plano + Inter 900 uppercase + títulos masivos comunican **holding tecnológico institucional**, no demo ni startup genérica. La landing *sí* parece marca madre.
- La banda "El ecosistema" en el hero (Holding → Servicio activo → Próxima implementación) es el mejor activo narrativo de la página: comunica la arquitectura completa en el primer fold, con Prospect correctamente destacado en blanco y Commerce correctamente atenuado como futuro.
- Consistencia de color alta: una sola familia de azules + grises fríos. `--bg-dark: #1a1a2e` está definido y sin uso (legacy).
- Secciones internas (fondo `#eef0f4`, títulos negros masivos, labels numerados `01 —`) tienen cadencia editorial sólida y consistente.

### 3.2 Jerarquía visual

- **Hero:** jerarquía correcta — título (158px @1440) → lead con borde lateral → subtítulo → CTAs → ecosistema. El título arranca a ~104px del techo, alineado a la franja del navbar (validado en iteración 14: gap 14px).
- **CTAs:** primario blanco sólido / secundario outline — jerarquía clara. El CTA "Coordinar reunión" se repite en navbar + hero + menú mobile + CtaFinal: aceptable (es la conversión única de la página).
- **Flujo narrativo:** Qué es → Prospect → Qué resuelve → Agentes → Proceso → Commerce → Contacto. Correcto: lo activo antes que lo futuro, Commerce nunca parece producto consolidado.

### 3.3 Layout

- **Desktop:** la mitad derecha del hero (entre la nav y la banda de ecosistema) es **azul vacío** a 1440px+. Es un minimalismo defendible, pero a 1920px el desbalance izquierda/derecha se acentúa. Oportunidad P2 (no bug): un elemento estructural sutil (regla vertical, coordenadas tipográficas, marca de agua geométrica al 4–6% de opacidad) — nunca ilustración decorativa.
- **Mobile (390px):** composición limpia — título 2 líneas sin cortes, botones full-width, ecosistema apilado con flechas rotadas. Sin overflow horizontal (validado en iteraciones previas y visible en capturas de hoy).
- Sin cortes de texto detectados en las capturas actuales (los fixes de iteraciones 10–16 ya resolvieron los históricos).

### 3.4 Tipografía

- Escala desktop coherente: hero `clamp(72px, 11vw, 190px)`, headings de sección `clamp(48px, 8vw, 96px)`, body 16–18px. Mobile baja bien (`18vw` hero, `10vw` headings).
- `line-height: 0.9` + `letter-spacing: -0.05em` en el título: ajustado tras iteraciones 10–12, hoy respira bien.
- **Riesgo tipográfico real:** Inter se carga por `@import` de Google Fonts (render-blocking + posible FOUT). El texto de BrandMotion aparece a los 0–400ms; si la fuente no llegó, el intro se dibuja con fallback y "salta" al cargar Inter. Ver riesgos (§10).
- Detalle menor: `section { scroll-margin-top: 96px }` está duplicado en `index.css` (líneas 65–67 y 96–98).

### 3.5 Navegación

- **Top-of-page desktop (correcto, cumple el brief):** marca chica oculta, links a la derecha junto al CTA (grid `1fr auto auto`, `justify-self: end`), CTA extremo derecho. No hay links centrados al cargar.
- **Scrolled desktop (correcto):** marca chica `BLUE SKY GROUP` fade+slide a la izquierda, links se deslizan al centro con `transform: translateX(clamp(-360px, -24vw, -120px))` (no anima layout — bien), CTA fijo a la derecha. Sin saltos: validado por las mediciones de iteraciones 13–14.
- **Dropdown Servicios:** estructura correcta (puente de hover, panel blanco). **Problema observado:** en la captura de hoy (`desktop-dropdown-servicios.png`) el panel aparece a media opacidad con texto lavado pese a que `capture.cjs` espera 1000ms tras el hover (transición: 250ms). Puede ser artefacto de captura (pérdida de hover en Puppeteer) o un retrigger real de `transition: all`. **Requiere verificación manual en browser** antes de tocar nada. Además, el trigger "Servicios" es un `<span>` no enfocable: el dropdown es inaccesible por teclado.
- **Menú mobile:** excelente — composición header/cuerpo/footer, links numerados 01/02/03, subitems de Servicios con tags de estado, CTA anclado abajo, Escape, aria, áreas táctiles 44px. Es la pieza más pulida de la landing. Falta solo focus-trap (no bloqueante).

### 3.6 Mobile específico

- Hero mobile: título protagonista sin cortes; convivencia de marcas resuelta (grande visible en top, chica aparece solo en scroll, el grande se desvanece a `opacity: 0` — iteración 13). Correcto según el brief.
- `padding-top: 132px` del hero mobile es un valor mágico acoplado a la altura real del navbar (~92px): frágil si el navbar cambia de padding. Documentado como riesgo, no como bug activo.
- Menú abierto: el bloque central queda visualmente bajo en pantallas altas (844px) por el `justify-content: center` — aceptable, con fallback correcto para pantallas bajas.

---

## 4. Diagnóstico de animaciones

### 4.1 Inventario completo

| Animación | Archivo | Clase/Componente | Qué hace | Problema | Recomendación |
|---|---|---|---|---|---|
| Overlay intro | `IntroSplash.css` | `.intro-splash--hidden` | Fade-out del fondo azul (600ms) a los 1100ms | Ninguno funcional; lint error (setState en effect, camino reduced-motion) | Conservar; fix lint |
| Pulse-in de marca | `BrandMotion.css` | `brandPulseIn` | Texto entra con scale 0.94→1 + fade (400ms) | `transform-origin: left top` heredado del base → el pulse escala desde la esquina sup-izq, no desde el centro | Origin `center` durante fase intro |
| **FLIP intro→hero** | `BrandMotion.jsx` | `applyFlip()` | Mide `.hero__title`, traslada+escala el texto fijo hacia él (800ms) | **Mismatch geométrico 1 línea → 2 líneas; scale uniforme `min()` llega a ~70% del target; ver §4.2** | **Rehacer geometría (P1)** |
| Crossfade final | `BrandMotion.css` + `Hero.css` | `.brand-motion--done` / `.is-brand-animating` | Brand text fade-out 350ms; hero title fade-in 480ms | Al no coincidir las formas, el crossfade es un swap visible con doble imagen | Eliminar: con geometría idéntica el hand-off es de 1 frame |
| Hero title scrolled | `Hero.css` | `.is-scrolled .hero__title` | Desktop: opacity 0.18 + translateY(-24px) scale(0.96); mobile: opacity 0 | Ninguno — cumple el Estado 3 del brief | Conservar tal cual |
| Marca chica navbar | `Navbar.css` | `.navbar--scrolled .navbar__logo` | Fade + slide-down 320ms al pasar 80px de scroll | Ninguno | Conservar |
| Links del navbar | `Navbar.css` | `.navbar--scrolled .navbar__links` | `translateX` 520ms hacia el centro (no anima layout) | Ninguno | Conservar |
| Navbar compacto | `Navbar.css` | `.navbar--scrolled` | padding 24→16px + sombra | `transition: all` (anima más de lo necesario) | Acotar a `padding, box-shadow` |
| Dropdown Servicios | `Navbar.css` | `.navbar__dropdown` | opacity+visibility+translateY al hover | Captura de hoy lo muestra a media opacidad (verificar); `transition: all`; trigger no enfocable | Verificar en browser; acotar transición; a11y teclado |
| Menú mobile | `Navbar.css` | `.mobile-menu--open` | Fade + translateY(-12px→0) del overlay completo | Funciona; la entrada es plana (todo el bloque a la vez) | P3: stagger sutil de links (60–80ms) |
| Botones / CTA | `Hero.css`, `Navbar.css` | `:hover` | translateY(-2px) + sombra | Ninguno | Conservar |
| Secciones internas | — | — | **No hay animación de aparición** (decisión de iteración 1: se eliminó todo `opacity: 0` + observer) | Las secciones entran "secas" | P4 opcional: reveal CSS-only no bloqueante (ver §7) |
| `fadeInUp` / `fadeIn` / `pulse` | `index.css` | keyframes globales | Definidos; `fadeInUp`/`fadeIn` sin consumidores montados | Código muerto leve | Limpiar o reutilizar en P4 |
| Legacy `useInView` | `Contact/Ecosystem/Units/Vision.jsx` | hook | Observer + estados | **No montados** — pero contienen el patrón `opacity: 0` dependiente de JS prohibido | Eliminar archivos en limpieza |

### 4.2 Diagnóstico específico de la secuencia de marca (lo más importante)

Respuestas precisas a las 10 preguntas del brief:

1. **Qué existe hoy.** La secuencia completa está implementada: `IntroSplash` (overlay), `BrandMotion` (texto centrado 1100ms → FLIP 800ms → crossfade 350ms → unmount a 2250ms), `.is-brand-animating` oculta el `.hero__title` real durante la animación, y el Estado 3 (scroll) funciona por separado con `.is-scrolled`. La coordinación de timings entre IntroSplash (fade a 1100ms) y BrandMotion (FLIP a 1100ms) es correcta.

2. **Qué falta.** (a) Igualdad geométrica entre el texto animado y el target; (b) hand-off invisible (hoy hay crossfade entre formas distintas); (c) espera de `document.fonts.ready` antes de medir; (d) manejo de scroll/resize durante los 2.25s de animación; (e) capturas de los estados intermedios del FLIP (1300–1700ms) para validar la transición con evidencia.

3. **Qué está mal implementado.** El núcleo: `BrandMotion` renderiza `BLUE SKY GROUP` en **una línea** (`white-space: nowrap`, `font-size: min(8.8vw, 200px)`) y el target `.hero__title` son **dos líneas** (`Blue Sky` / `Group`, `clamp(72px, 11vw, 190px)`). A 1440px: caja origen ≈ 1030×119px, caja target ≈ 720×285px. `scale = Math.min(0.70, 2.39) = 0.70` → el texto llega a la esquina del título real como una línea de ~89px, mientras el título verdadero es un bloque de dos líneas de 158px. **El morph es imposible con esta geometría.**

4. **Qué parte es solo fade.** El final de la secuencia: la "transformación" en el título real es un crossfade (brand text 350ms out, hero title 480ms in vía `.is-brand-animating`). También la aparición de la marca chica del navbar en scroll es fade puro (correcto y suficiente para el Estado 3).

5. **Qué parte es layout real.** El FLIP sí mide el DOM real (`getBoundingClientRect` del `.hero__title`) y aplica `translate + scale` por transform — la técnica es la correcta y debe conservarse. El grid de 3 zonas del navbar y el slide de links también son layout real estable animado solo por transform (bien hecho).

6. **Qué parte rompe el hero.** Ninguna de forma permanente: `.is-brand-animating .hero__title { opacity: 0 !important }` se limpia tanto en el flujo normal como en el cleanup del effect, y el hero es estático y visible por defecto si JS falla. El riesgo es transitorio: si el usuario scrollea durante los 800ms del FLIP, el target (en el documento) se mueve pero el texto animado es `position: fixed` → aterriza en el lugar equivocado y el crossfade revela el título en otra posición.

7. **Qué parte genera cortes.** Hoy no hay cortes de texto (los históricos se corrigieron en iteraciones 10–16). En mobile, el texto de BrandMotion permite wrap (2 líneas) pero **centrado** (`text-align: center`), mientras el hero title mobile es alineado a la izquierda: al aterrizar, las líneas no coinciden horizontalmente.

8. **Qué parte no se ve aunque el código diga que existe.** (a) Los estados intermedios del FLIP: `capture.cjs` captura a 400ms (intro) y a +2s (final), nunca el vuelo 1100–1900ms — no hay evidencia visual de la calidad de la transición; (b) la transición `font-size` declarada en `.brand-motion--toHero` nunca ocurre (el font-size no cambia); (c) el dropdown a media opacidad en la captura (verificar si es artefacto).

9. **Qué debería rehacerse.** Solo la geometría interna de `BrandMotion`: el texto animado debe ser un clon estructural del `.hero__title` (dos `<span>` apilados, misma fuente/peso/line-height/letter-spacing/text-transform), mostrado centrado a escala mayor en el intro, y llevado al target con `translate + scale` uniforme entre cajas de **aspecto idéntico**. Con llegada pixel-perfect, el crossfade se reemplaza por un swap de 1 frame (mostrar hero title + desmontar BrandMotion en el mismo frame). Desktop e intro mobile comparten la misma estructura de 2 líneas (el intro mobile actual ya muestra 2 líneas — solo hay que alinear el text-align al aterrizar o aceptar el centrado solo mientras está centrado en pantalla).

10. **Qué debería conservarse.** Todo lo demás: la arquitectura de fases con timeouts y cleanup; `prefers-reduced-motion` (saltar todo); `.is-brand-animating` como mecanismo de ocultamiento; IntroSplash como overlay separado; **todo el Estado 3** (`.is-scrolled`, marca chica, links con transform, desvanecimiento mobile); el menú mobile; el sistema de capturas; la regla "contenido crítico visible sin JS".

---

## 5. Problemas críticos (priorizados)

1. **[P1 — el más importante] Mismatch geométrico del FLIP de marca** (§4.2.3). La animación principal existe pero el morph no es creíble: swap visible 1 línea → 2 líneas a ~70% de escala.
2. **[P0] `npm run lint` falla** — 2 errores `react-hooks/set-state-in-effect` (`BrandMotion.jsx:86`, `IntroSplash.jsx:21`, ambos en el camino reduced-motion) + 1 directive eslint-disable sin uso + 1 warning deps en `useInView.js`. Bloquea cualquier gate de CI futuro.
3. **[P0 — verificar] Dropdown Servicios a media opacidad** en la captura de hoy. Si es real (no artefacto de Puppeteer), el panel queda ilegible (texto celeste sobre blanco translúcido).
4. **[P1] FLIP sin protección contra scroll/resize/fonts** durante los 2.25s: medición antes de `document.fonts.ready` (FOUT de Inter por `@import`), y target medido en coordenadas de viewport que se invalidan si el usuario scrollea durante el vuelo.
5. **[P2] Accesibilidad del dropdown**: trigger `<span>` no enfocable; sin soporte de teclado.
6. **[P3] Deuda de repo**: 4 componentes legacy con el patrón `useInView`/`opacity:0` prohibido, keyframes globales sin consumidores, `--bg-dark` sin uso, `scroll-margin-top` duplicado, puppeteer fuera de `package.json` (se poda en cada install).

---

## 6. Propuesta estética ideal

### 6.1 Hero ideal

- **Marca:** `BLUE SKY / GROUP` en dos líneas, arriba a la izquierda, primera línea compartiendo franja óptica con los links de la derecha (estado actual ya lo logra: gap navbar→título ~14px). Mantener `clamp(72px, 11vw, 190px)`, `line-height: 0.9`, `letter-spacing: -0.05em`.
- **Aire superior:** el actual `padding-top: clamp(80px, 8vw, 104px)` es correcto — ni pegado al techo ni hundido. No volver a la compensación de top-bearing revertida en iteración 16 sin medición previa.
- **Subtítulo:** conservar el bloque con borde lateral (lead + body, max 600px). Es el contrapunto editorial correcto al título masivo.
- **Botones:** conservar par primario/secundario. Microajuste P2: unificar el radio (28px) y el ritmo de padding con el CTA del navbar.
- **Módulo ecosistema:** conservar como cierre del fold. Refinamientos P2: reemplazar las flechas de texto `→` por un conector SVG fino (línea con punta, 1px, blanco 35%), y dar al nodo Commerce un tratamiento "blueprint" (borde dashed sutil) para reforzar "futuro, no producto activo".
- **Mitad derecha vacía (desktop ancho):** una sola intervención estructural sutil — p. ej. una regla vertical hairline blanca al 8% a la altura del título, o el monograma geométrico de BSG en stroke al 4–6% — alineada a la grilla. Nada ilustrativo, nada animado.

### 6.2 Navbar ideal

- **Top-of-page:** exactamente como hoy — sin marca chica, links + CTA a la derecha. No centrar nada al cargar.
- **Scrolled:** como hoy (marca chica izq / links centro / CTA der) + compactación 24→16px. Acotar la transición a `padding, box-shadow`. Considerar (P5) un hairline inferior `rgba(255,255,255,0.12)` en estado scrolled en vez de sombra negra, más institucional sobre azul.
- **Dropdown:** panel blanco, radio 12px, sombra suave; reemplazar `transition: all` por `opacity, transform, visibility`; trigger como `<button>` con `aria-expanded` y apertura por focus (P2).
- **Mobile:** conservar el menú actual íntegro; agregar stagger sutil de entrada de links (60–80ms entre ítems, translateY 8px + fade) — única mejora de motion que necesita.

### 6.3 Sistema de motion ideal

Principios: **una sola animación protagonista** (la secuencia de marca); todo lo demás es soporte sutil. Solo `transform` y `opacity`. Easing institucional unificado: `cubic-bezier(0.22, 1, 0.36, 1)` (ya en uso). Nada de parallax, partículas, blur dinámico ni efectos "gamer". `prefers-reduced-motion` salta todo.

| Momento | Especificación |
|---|---|
| **Intro (0–1100ms)** | Fondo azul pleno; `BLUE SKY / GROUP` en 2 líneas centradas, escala ~1.4–1.6× del tamaño hero; entrada fade + scale 0.96→1 (500ms) desde el **centro** |
| **Intro → Hero (1100–1900ms)** | FLIP `translate + scale` uniforme hacia la caja real del `.hero__title` (misma estructura ⇒ aspecto idéntico ⇒ llegada exacta); overlay del splash se desvanece en paralelo; al frame final, swap instantáneo al título real (sin crossfade) |
| **Contenido del hero (1500–2100ms)** | Lead, CTAs y ecosistema entran con fade + translateY(12px) escalonado 80ms, solapado con el final del FLIP (la página se "completa alrededor" de la marca) — CSS only, contenido visible por defecto si JS falla |
| **Hero → Navbar (scroll)** | Conservar el sistema actual: título grande se atenúa (0.18 desktop / 0 mobile) + sube levemente; marca chica fade-in 320ms; links slide 520ms; CTA inmóvil |
| **Dropdown** | opacity + translateY(6px), 200ms in / 150ms out |
| **Menú mobile** | Overlay actual + stagger de links 60–80ms |
| **Botones/cards** | Conservar hover translateY(-2px) + sombra |

---

## 7. Arquitectura recomendada

**Recomendación: Opción B — componente `BrandMotion` dedicado (conservar y corregir el existente).**

| Opción | Veredicto | Justificación |
|---|---|---|
| A — CSS simple sobre componentes actuales | ❌ | El viaje intro-central → hero-target exige medir el DOM real (posición del título depende de viewport, clamp y fuente). Con CSS puro los valores serían hardcodeados y frágiles — exactamente la clase de bug que estas 17 iteraciones vinieron pagando. |
| **B — `BrandMotion` (FLIP)** | ✅ | **Ya existe y la técnica es correcta**; el defecto es geométrico, no arquitectónico. React state + `getBoundingClientRect` + transform/opacity, sin librerías. Aislado: si falla, se desmonta y la página queda intacta (hero estático visible). Costo de corrección bajo comparado con reescribir. |
| C — Reescritura parcial de Hero/Navbar | ❌ | Hero y Navbar funcionan y están validados por mediciones. Reescribirlos arriesga regresiones en lo único que ya está bien (Estado 3 completo). No es estrictamente necesario. |

**Especificación de la corrección de `BrandMotion` (para el implementador):**

1. El markup animado replica al target: `<span class="brand-motion__line">Blue Sky</span><span class="brand-motion__line">Group</span>` con **exactamente** las mismas propiedades tipográficas que `.hero__title` (`font-size: clamp(72px, 11vw, 190px)`, `font-weight: 900`, `line-height: 0.9`, `letter-spacing: -0.05em`, `text-transform: uppercase`, columna, alineación izquierda). El tamaño del intro se logra **solo con `transform: scale(S)`** sobre esa base (S ≈ 1.3–1.5 desktop, a definir por ancho disponible), nunca cambiando font-size ⇒ el aspect ratio queda idéntico por construcción.
2. FLIP: First = caja centrada escalada; Last = `.hero__title.getBoundingClientRect()`; animar `translate(dx, dy) scale(S→1)` con origin `left top` durante el vuelo (origin `center` solo para el pulse del intro).
3. Esperar `document.fonts.ready` (con timeout de seguridad ~800ms) antes de la primera medición.
4. Hand-off: en el frame en que termina la transición (`transitionend` + fallback timeout), remover `.is-brand-animating` y desmontar BrandMotion **en el mismo commit de render** — sin crossfade.
5. Congelar la página durante la animación (el splash ya bloquea pointer-events; añadir `overflow: hidden` en `body` durante los ~2s, o re-medir y compensar si se permite scroll). Listener de `resize` → saltar al estado final inmediatamente.
6. Reduced-motion: comportamiento actual (saltar todo) + fix del lint (inicializar el estado con una función lazy `useState(() => prefersReducedMotion ? 'removed' : 'intro')` en lugar de setState dentro del effect).
7. Mobile: misma estructura de 2 líneas; el intro puede mostrarse centrado en pantalla, pero las líneas alineadas a la izquierda dentro de su propia caja (como el target), para que el aterrizaje coincida línea por línea.

---

## 8. Backlog priorizado

| Prioridad | Cambio | Impacto visual | Riesgo técnico | Archivos | Modelo recomendado |
|---|---|---|---|---|---|
| P0 | Verificar y corregir opacidad/contraste del dropdown Servicios (¿artefacto de captura o bug?) | Medio | Bajo | `Navbar.css`, `capture.cjs` | Sonnet 4.6 |
| P0 | Fix lint: setState-in-effect (BrandMotion, IntroSplash) + directive sin uso + deps de useInView | Nulo (higiene) | Bajo | `BrandMotion.jsx`, `IntroSplash.jsx`, `useInView.js` | Sonnet 4.6 |
| P0 | Acotar `transition: all` del navbar y dropdown a propiedades explícitas | Bajo | Bajo | `Navbar.css` | Sonnet 4.6 |
| **P1** | **Rehacer geometría de BrandMotion: clon 2 líneas del hero title, scale-only, hand-off sin crossfade (spec §7)** | **Muy alto** | Medio | `BrandMotion.jsx/.css`, `Hero.css` (coordinación) | **Opus 4.6** |
| P1 | Robustez del FLIP: `document.fonts.ready`, scroll-lock durante animación, handler de resize | Alto (evita fallos visibles) | Medio | `BrandMotion.jsx` | Opus 4.6 |
| P1 | Capturas de estados intermedios del FLIP (1300/1500/1700ms) en capture.cjs | — (evidencia) | Bajo | `capture.cjs` | Sonnet 4.6 |
| P2 | Entrada escalonada del contenido del hero tras el FLIP (CSS-only, visible sin JS) | Alto | Bajo | `Hero.css`, `IntroSplash.jsx` (clase `.is-intro-complete` ya existe) | Sonnet 4.6 |
| P2 | Refinar banda ecosistema: conectores SVG, tratamiento blueprint de Commerce | Medio | Bajo | `Hero.jsx/.css`, `Icons.jsx` | Gemini 3.1 Pro o Sonnet 4.6 |
| P2 | Dropdown accesible por teclado (trigger button, aria-expanded, focus) | Bajo visual / alto a11y | Bajo | `Navbar.jsx/.css` | Sonnet 4.6 |
| P2 | Elemento estructural sutil en la mitad derecha del hero desktop ancho | Medio | Bajo | `Hero.jsx/.css` | Gemini 3.1 Pro |
| P3 | Stagger de links del menú mobile (60–80ms) | Medio (mobile) | Bajo | `Navbar.css` | Gemini 3.5 Flash o Sonnet 4.6 |
| P3 | Revisión de padding-top mágico (132px) del hero mobile → derivarlo de variable compartida con navbar | Bajo | Bajo | `Hero.css`, `Navbar.css`, `index.css` | Gemini 3.5 Flash |
| P4 | Reveal sutil de secciones internas (CSS `animation` no bloqueante o `animation-timeline` con fallback; nunca `opacity:0` dependiente de JS) | Medio | Medio | `index.css` + secciones | Sonnet 4.6 |
| P4 | Iconografía definitiva del sistema de agentes (TODO abierto desde iteración 1) | Medio | Bajo | `Icons.jsx`, `AgentSystem.jsx` | Gemini 3.1 Pro |
| P5 | Limpieza de repo: eliminar Contact/Ecosystem/Units/Vision + useInView, keyframes muertos, `--bg-dark`, duplicado scroll-margin-top; puppeteer como devDependency | Nulo | Bajo | varios | Gemini 3.5 Flash |
| P5 | Self-host de Inter (woff2 + preload) para eliminar FOUT del intro | Bajo (estabilidad del intro) | Bajo | `index.html`, `index.css` | Sonnet 4.6 |

---

## 9. Riesgos técnicos

1. **Medición antes de fuente cargada:** Inter llega por `@import` (render-blocking parcial, FOUT posible). Si `applyFlip()` mide con la fuente fallback, dx/dy/scale quedan mal y el texto aterriza desplazado. Mitigación: `document.fonts.ready` + self-host P5.
2. **Scroll/resize durante los 2.25s de animación:** el target se mide en coordenadas de viewport; cualquier scroll durante el vuelo desincroniza el aterrizaje. Mitigación: scroll-lock temporal o re-medición.
3. **Doble fuente de verdad tipográfica:** BrandMotion debe replicar las métricas del hero title; si alguien cambia `Hero.css` sin tocar `BrandMotion.css`, el aterrizaje se rompe silenciosamente. Mitigación: variables CSS compartidas (`--hero-title-size`, etc.) consumidas por ambos.
4. **`.is-brand-animating` con `!important`:** si un error JS impide llegar al cleanup, el título queda oculto. El cleanup del effect lo cubre en React; un error catastrófico no. Mitigación: timeout de seguridad independiente.
5. **Timings hardcodeados duplicados** entre `IntroSplash.jsx` (1100/1700) y `BrandMotion.jsx` (1100/1900/2250): cambiar uno sin el otro rompe la coordinación. Mitigación: constantes compartidas (p. ej. `src/constants/motion.js`).
6. **Puppeteer fuera de `package.json`:** cada `npm install` lo poda y el sistema de capturas muere (ya pasó, documentado en iteración 17; hoy volvió a pasar). Mitigación: devDependency.
7. **Legacy con patrón prohibido:** si alguien monta Contact/Ecosystem/Units/Vision sin leer la historia, reintroduce el bug de secciones invisibles de la iteración 1. Mitigación: eliminarlos (P5).
8. **Capturas ciegas a la transición:** sin frames intermedios del FLIP, cualquier regresión del morph pasa invisible por el pipeline de validación actual.

---

## 10. Prompts listos para otros modelos

> Regla común a todos: trabajar sobre el repo `maizena-azul-landing`, branch local. **No hacer push, no hacer deploy, no instalar dependencias de producción.** Validar siempre con `npm run build` (y `npm run lint` donde se indique). Las capturas usan `node capture.cjs` con el dev server en `http://localhost:5174` (`npm run dev -- --port 5174`); si puppeteer no está en `node_modules`, instalarlo solo con `npm install puppeteer --no-save`.

### Prompt 1 — Auditoría técnica final read-only (Sonnet 4.6 o Gemini 3.5 Flash)

```
Rol: frontend auditor read-only. NO modifiques ningún archivo.

Contexto: landing React+Vite de Blue Sky Group. Existe una auditoría previa en
docs/BSG_VISUAL_MOTION_AUDIT.md — leela primero. Tu trabajo es verificar en browser
real lo que la auditoría dejó marcado como "a verificar".

Tareas:
1. npm run dev -- --port 5174 y abrir la página en desktop 1440x900 y mobile 390x844.
2. Verificar el dropdown "Servicios" con hover real: ¿el panel llega a opacity 1 y
   el texto es legible? Comparar contra review-screenshots/desktop-dropdown-servicios.png
   (que lo muestra a media opacidad). Determinar si era artefacto de captura o bug real.
3. Observar la secuencia completa de BrandMotion (recargar varias veces):
   describir con precisión qué se ve entre los ms 1100 y 2250 (¿salto visible al
   crossfade? ¿cambia el tamaño/forma del texto al final?).
4. Scrollear DURANTE la animación de intro y reportar qué pasa con el texto animado.
5. Probar con DevTools > Rendering > prefers-reduced-motion: reduce.
6. Listar todo bug visual real observado, con viewport, paso de reproducción y severidad.

Output: reporte markdown en la respuesta (no crear archivos). No declarar "todo OK"
sin haber reproducido cada punto.

Validación: ninguna build necesaria (read-only).
```

### Prompt 2 — Corrección P0 (Sonnet 4.6)

```
Rol: frontend senior. Cambios quirúrgicos, mínimos y verificables.

Contexto: leer docs/BSG_VISUAL_MOTION_AUDIT.md §5 y §8 (P0). La landing funciona;
no rediseñar nada.

Archivos permitidos: src/components/Navbar.css, src/components/BrandMotion.jsx,
src/components/IntroSplash.jsx, src/hooks/useInView.js, capture.cjs.

Tareas:
1. npm run lint debe quedar en 0 errores y 0 warnings:
   - BrandMotion.jsx e IntroSplash.jsx: en el camino prefers-reduced-motion, NO llamar
     setState dentro del cuerpo del effect; usar inicialización lazy del estado
     (useState(() => ...)) manteniendo el comportamiento exacto (saltar la animación
     y marcar is-intro-complete).
   - Eliminar la directive eslint-disable sin uso (BrandMotion.jsx:70).
   - useInView.js: resolver el warning de deps sin cambiar la semántica.
2. Navbar.css: reemplazar los `transition: all` (.navbar, .navbar__dropdown, .navbar__cta,
   .navbar__link, botones) por listas explícitas de propiedades (padding, box-shadow,
   opacity, transform, visibility, background, border-color según corresponda).
3. Dropdown Servicios: si el Prompt 1 confirmó bug real de opacidad, corregirlo;
   si era artefacto, ajustar capture.cjs para capturar el estado hover estable
   (re-hover inmediatamente antes del screenshot).

Restricciones: no tocar timings de BrandMotion, no tocar Hero.css, no cambiar markup.

Validación: npm run lint (0/0), npm run build OK, secuencia de intro y dropdown
funcionando igual que antes (verificación visual en dev server).

Output esperado: diff acotado a los archivos listados + nota de validación.
```

### Prompt 3 — Implementar BrandMotion correcto (Opus 4.6)

```
Rol: motion engineer senior. Esta es la tarea principal del proyecto.

Contexto obligatorio: docs/BSG_VISUAL_MOTION_AUDIT.md §4.2 (diagnóstico), §6.3 (motion
ideal) y §7 (spec de corrección). El BrandMotion actual (src/components/BrandMotion.jsx/.css)
usa FLIP correctamente pero anima un texto de UNA línea hacia un target de DOS líneas:
el aterrizaje no coincide y el crossfade final es un swap visible. Hay que rehacer su
geometría conservando la arquitectura.

Archivos: src/components/BrandMotion.jsx, src/components/BrandMotion.css,
src/components/Hero.css (solo si hace falta exponer variables), src/constants/motion.js
(nuevo, opcional, para timings compartidos), src/components/IntroSplash.jsx (solo timings).

Spec:
1. El texto animado debe ser un clon estructural del .hero__title: dos líneas
   ("Blue Sky" / "Group"), MISMAS métricas (font-size clamp(72px,11vw,190px), weight 900,
   line-height 0.9, letter-spacing -0.05em, uppercase, columna alineada a la izquierda).
   Extraer esas métricas a variables CSS compartidas (ej. --brand-title-*) consumidas
   por Hero.css y BrandMotion.css para que no puedan divergir.
2. El tamaño grande del intro se logra SOLO con transform: scale(S) (S calculado para
   que el bloque ocupe ~70-80% del ancho de viewport, tope razonable), nunca con
   font-size distinto. Centrado en pantalla durante el intro.
3. Esperar document.fonts.ready (con timeout de fallback de 800ms) antes de iniciar
   la secuencia y antes de medir.
4. FLIP a los ~1100ms: medir .hero__title con getBoundingClientRect y animar
   translate+scale (origin left top) durante 800ms con cubic-bezier(0.22,1,0.36,1).
   Como las cajas tienen el mismo aspect ratio, la llegada debe ser pixel-perfect.
5. Hand-off SIN crossfade: en transitionend (con fallback setTimeout), en el mismo
   frame remover .is-brand-animating y desmontar BrandMotion. No debe percibirse
   ningún cambio en el píxel del título.
6. Durante la animación: bloquear scroll (body overflow hidden, restaurar al terminar);
   en resize, saltar inmediatamente al estado final.
7. prefers-reduced-motion: saltar todo (estado inicial lazy, sin setState en effect).
8. Mobile (≤768px): misma estructura de 2 líneas alineadas a la izquierda dentro de su
   caja, centrada en pantalla durante el intro; el aterrizaje debe coincidir línea
   por línea con el hero title mobile.

Restricciones: sin librerías; solo transform/opacity; no tocar el sistema de scroll
(.is-scrolled, marca chica, links) ni el menú mobile; el hero debe seguir siendo
visible sin JS.

Validación:
- npm run build y npm run lint en verde.
- Agregar a capture.cjs capturas de los estados intermedios del FLIP
  (~1300/1500/1700ms tras reload) en desktop y mobile, y regenerar todas las capturas.
- Verificar a 1440/1024/768/390px: aterrizaje exacto (superponer captura del frame
  final del FLIP con desktop-hero: el título no debe moverse ni un píxel al hand-off).
- Verificar scroll durante animación y reduced-motion.

Output esperado: código + capturas regeneradas + tabla de mediciones (viewport,
posición de aterrizaje vs posición real del título, delta en px — debe ser 0).
```

### Prompt 4 — Mobile polish (Gemini 3.5 Flash o Sonnet 4.6)

```
Rol: UI engineer mobile-first. Cambios acotados de polish, sin rediseño.

Contexto: docs/BSG_VISUAL_MOTION_AUDIT.md §3.6, §6.2 y backlog P3. El menú mobile ya
es la pieza más pulida; solo refinarlo.

Archivos: src/components/Navbar.css, src/components/Hero.css, src/index.css.

Tareas:
1. Stagger de entrada en el menú mobile: al abrir (.mobile-menu--open), los links
   (01/02/03 + subitems + CTA) entran con fade + translateY(8px) escalonados 60-80ms
   (transition-delay por nth-child). Al cerrar, salida inmediata sin stagger.
   Respetar prefers-reduced-motion (sin delays ni transforms).
2. Logo/marca: confirmar que BLUE SKY GROUP chico del header y del menú abierto
   comparten exactamente los mismos estilos (weight 800, 16px, tracking 0.02em,
   uppercase); unificar en una clase o variable si están duplicados.
3. Transición grande/chico en scroll mobile: verificar que el título grande llega a
   opacity 0 ANTES de que la marca chica llegue a 1 (no deben convivir a media
   opacidad); ajustar delays si conviven.
4. Derivar el padding-top mágico del hero mobile (132px) de una variable compartida
   con la altura del navbar (ej. --navbar-height-mobile), manteniendo el resultado
   visual actual.
5. Botones mobile: verificar área táctil ≥44px y consistencia de radius/padding entre
   hero, menú y CtaFinal.

Restricciones: no tocar BrandMotion, no tocar desktop (≥769px), no cambiar markup JSX
salvo que el punto 2 lo exija mínimamente.

Validación: npm run build OK; sin overflow horizontal en 390/430/768; regenerar
mobile-menu-open, mobile-hero, mobile-hero-scrolled, mobile-full-page con capture.cjs.

Output esperado: diff + capturas + confirmación de no-convivencia de marcas.
```

### Prompt 5 — Visual polish final (Gemini 3.1 Pro o Sonnet 4.6)

```
Rol: director de arte digital ejecutando el pase final premium. Sutileza > cantidad.

Contexto: docs/BSG_VISUAL_MOTION_AUDIT.md §6 (propuesta estética) y backlog P2/P4/P5.
Prerequisito: Prompts 2 y 3 ya aplicados.

Archivos: src/components/Hero.jsx/.css, src/components/Navbar.css,
src/components/Icons.jsx, src/index.css, index.html.

Tareas:
1. Banda ecosistema del hero: reemplazar flechas de texto "→" por conector SVG fino
   (línea 1px con punta, blanco 35%, vertical en mobile); nodo Commerce con borde
   dashed sutil (tratamiento blueprint de "próxima implementación"). Prospect sigue
   siendo el único nodo blanco sólido.
2. Composición desktop ancho (≥1440px): UNA intervención estructural sutil en la zona
   derecha vacía del hero (regla vertical hairline blanca 8% o monograma geométrico
   stroke 4-6% alineado a grilla). Nada ilustrativo, nada animado, nada que compita
   con el título.
3. Entrada escalonada del contenido del hero post-intro (si no la hizo el Prompt 3):
   lead/CTAs/ecosistema con fade + translateY(12px), delays 80ms, disparada por la
   clase .is-intro-complete existente, CSS-only, contenido visible por defecto si JS
   falla (la animación solo corre si la clase aparece; sin clase = estado final).
4. Dropdown Servicios: timing 200ms in / 150ms out, translateY(6px), trigger como
   <button> con aria-expanded y apertura por focus (teclado).
5. Espaciados: pase de consistencia vertical entre secciones (--section-padding) y
   de radius/padding entre todos los CTAs de la página.
6. Limpieza: eliminar src/components/{Contact,Ecosystem,Units,Vision}.{jsx,css} y
   src/hooks/useInView.js (no montados, patrón prohibido), keyframes globales sin uso
   (fadeInUp/fadeIn si nadie los consume tras el punto 3), --bg-dark, y el
   scroll-margin-top duplicado en index.css. Self-host de Inter (woff2 en public/ +
   @font-face + preload en index.html) eliminando el @import de Google Fonts.

Restricciones: no tocar BrandMotion ni el sistema de scroll; paleta y tipografía
intactas; cero animaciones nuevas fuera de lo listado.

Validación: npm run build y npm run lint en verde; sin overflow en
1920/1440/1024/768/390; regenerar TODAS las capturas con capture.cjs; verificar que
la página renderiza completa con JS deshabilitado.

Output esperado: diff + capturas + checklist de validación punto por punto.
```

---

## 11. Validaciones ejecutadas (en esta auditoría)

| Comando | Resultado |
|---|---|
| `npm run build` | ✅ OK — 161ms, 0 errores (vite 8.0.16; CSS 26.17 kB, JS 217.60 kB) |
| `npm run lint` | ❌ **2 errores, 2 warnings** — `react-hooks/set-state-in-effect` en `BrandMotion.jsx:86` y `IntroSplash.jsx:21`; directive sin uso en `BrandMotion.jsx:70`; deps en `useInView.js:26` |

No se ejecutó push, deploy, ni instalación de dependencias.

---

## 12. Capturas

**No se regeneraron** en esta auditoría: `puppeteer` no está en `node_modules` (fue podado por un `npm install`, problema recurrente documentado — no está en `package.json`) y la consigna prohíbe instalar librerías. **No fue necesario regenerarlas:** las capturas existentes en `review-screenshots/` están fechadas hoy (2026-06-11 19:37) y reflejan el working tree actual con BrandMotion.

Mapeo contra la lista mínima requerida:

| Requerida | Estado |
|---|---|
| desktop-full-page.png | ✅ existe |
| desktop-intro.png | ✅ existe (texto centrado en 1 línea — confirma el diagnóstico §4.2) |
| desktop-hero-top.png | ⚠️ existe como `desktop-hero.png` / `desktop-hero-after-intro.png` (falta solo el alias de nombre) |
| desktop-hero-scrolled.png | ✅ existe |
| desktop-navbar-scrolled.png | ✅ existe |
| desktop-dropdown-servicios.png | ✅ existe (muestra el panel a media opacidad — verificar, ver §5.3) |
| mobile-full-page.png | ✅ existe |
| mobile-intro.png | ✅ existe (2 líneas centradas) |
| mobile-hero-top.png | ⚠️ existe como `mobile-hero.png` / `mobile-hero-after-intro.png` |
| mobile-hero-scrolled.png | ✅ existe |
| mobile-menu-open.png | ✅ existe |
| mobile-contacto.png | ✅ existe |

**Faltante real del pipeline:** capturas de los estados intermedios del FLIP (~1300/1500/1700ms) — sin ellas, la calidad de la transición principal no tiene evidencia. Incluido en backlog P1 y en el Prompt 3.

---

## 13. Próximo paso recomendado

1. **Ejecutar Prompt 1** (verificación en browser: dropdown + observación directa de la secuencia BrandMotion) — 15 minutos, de-riesga todo lo demás.
2. **Ejecutar Prompt 2** (P0: lint + transitions) — deja el repo en verde.
3. **Ejecutar Prompt 3 con Opus** (la corrección geométrica de BrandMotion) — es el 80% del valor pendiente de la landing.
4. Recién después, Prompts 4 y 5 (polish).
5. Commitear la iteración de BrandMotion solo después del Prompt 3 (hoy está sin commitear y en estado intermedio).
