# Secuencia de marca en 3 estados: Intro → Hero → Navbar (iteración 17)

Animación principal de marca: `Intro central → Hero arriba a la izquierda → Navbar compacto al scrollear`. Construida sobre lo ya aprobado (lógica de scroll, links con transform, desvanecimiento mobile). No se hizo push ni deploy.

## 1. Archivos modificados

- `src/components/IntroSplash.jsx` — al ocultarse el splash agrega la clase global **`.is-intro-complete`** en `<html>` (también en el camino de `prefers-reduced-motion`).
- `src/components/IntroSplash.css` — **salida del texto con scale/fade**: `.intro-splash--hidden .intro-splash__text { opacity: 0; transform: scale(0.9) translateY(-20px) }` con transición 600ms. Detalle técnico: `animation: none` libera el `fill: forwards` de `introPulse`, cuyos valores pisarían la transición (el estado base coincide con el último keyframe, así que no hay salto).
- `src/components/Hero.css` — **entrada decorativa del título** (`heroTitleSettle`, 600ms, settle desde +18px) disparada por `.is-intro-complete:not(.is-scrolled)`. Sin `fill: forwards`: al terminar vuelven a mandar los estilos normales y el estado `.is-scrolled` no queda pisado. Si JS falla, no hay clase y el título es visible desde el inicio.
- `src/components/Navbar.css` — `.mobile-menu__brand` en mayúsculas (weight 800, 16px, tracking +0.02em), consistente con la marca del navbar.
- `capture.cjs` — aliases de capturas con los nombres requeridos.

## 2. Secuencia validada (medida con Puppeteer en 1440/1024/768/430/390px)

1. **Intro**: `BLUE SKY GROUP` centrado exacto (cx = mitad del viewport), fondo azul, texto blanco.
2. **Salida** (~1.2s–1.8s): texto a `opacity: 0` con `scale(0.9) translateY(-20px)` en transición real (no corte), overlay desvaneciéndose en paralelo.
3. **Hero**: `.is-intro-complete` presente, splash desmontado del DOM, título `BLUE SKY / GROUP` arriba a la izquierda con settle suave, **links a la derecha** (1200/1440 · 784/1024), CTA extremo derecho.
4. **Scrolled**: título grande `opacity 0.18` (desktop) / `0` (mobile), marca chica `BLUE SKY GROUP` aparece (`opacity 0→1`), links deslizados al centro con transform, CTA a la derecha.
5. **Menú mobile abierto**: `BLUE SKY GROUP` uppercase arriba a la izquierda, X funcional, links numerados, CTA.

Sin overflow horizontal ni errores de consola en ningún ancho.

## 3. `npm run build`

OK — 199ms, 0 errores.

## 4. Capturas

![Desktop Intro](./review-screenshots/desktop-intro.png)
![Desktop Hero tras intro](./review-screenshots/desktop-hero-after-intro.png)
![Desktop Navbar Scrolled](./review-screenshots/desktop-navbar-scrolled.png)
![Mobile Intro](./review-screenshots/mobile-intro.png)
![Mobile Hero tras intro](./review-screenshots/mobile-hero-after-intro.png)
![Mobile Navbar Scrolled](./review-screenshots/mobile-hero-scrolled.png)
![Mobile Menú abierto](./review-screenshots/mobile-menu-open.png)

## 5. Pendientes reales

- Ninguno de este cambio.

Nota de entorno: `puppeteer` (dev-tool de capturas, fuera de package.json) había sido podado por un `npm install`; se reinstaló con `--no-save`.

---

# Rollback de la iteración 15 (iteración 16)

Se revirtió quirúrgicamente el ajuste de la iteración 15 (subir el título grande con compensación de top bearing). No se hizo push ni deploy.

- `src/components/Hero.css`: `.hero` padding-top **88px → 104px** (restaurado); `.hero__title` **`margin-top: -0.14em` eliminado**.
- Sin tocar Navbar.css/jsx (no fueron modificados por la iteración 15).
- Se conservó todo lo aprobado: animación de scroll (`.navbar--scrolled`, `.is-scrolled`), marca chica que aparece, links que se deslizan al centro, desvanecimiento mobile del título, dropdown Servicios, menú mobile y links externos.
- `npm run build`: OK, 0 errores (hash CSS idéntico al de la iteración 14). Sin overflow ni errores de consola en 1440/768/390px.

El hero queda en el estado previo a la iteración 15.

---

# Subir el título grande a la franja del navbar (iteración 15 — revertida)

Ajuste fino: el título grande arrancaba visualmente más abajo que la navegación por el espacio interno de la fuente. No se hizo push ni deploy.

## 1. Archivo modificado

- `src/components/Hero.css` (único). No se tocó Navbar.css, Hero.jsx ni App.jsx.

## 2. Qué hacía que el hero quedara bajo

Dos cosas: (a) `.hero { padding: 104px ... }` y (b) — la principal — el **top bearing de la fuente**: con `line-height: 0.9` sobre `font-size ~158px`, la caja de línea empieza en 104px pero las mayúsculas (ink) arrancan ~35–45px más abajo dentro de esa caja. Medido: navbar bottom 90px, pero las letras de "BLUE SKY" se veían recién hacia ~140px → gap visual grande contra la nav.

## 3. Ajuste aplicado

- `.hero` padding-top **104px → 88px**.
- `.hero__title` con **`margin-top: -0.14em`**: compensa el top bearing de la fuente (en `em` → escala con el font-size responsive). Así las mayúsculas del título arrancan en la franja del navbar. Resultado: la primera línea "BLUE SKY" comparte altura visual con `Qué es / Servicios / Contacto / Coordinar reunión →`.

## 4. Links a la derecha en top (confirmación)

Sin cambios en Navbar.css. Medido: en top los links terminan en x=1200 (1440) / 784 (1024) — **a la derecha**, junto al CTA. No centrados.

## 5. Links al centro solo en scroll (confirmación)

`.navbar--scrolled .navbar__links { transform: translateX(...) }` intacto: en scrolled los links se deslizan al centro, CTA derecha, marca chica izquierda, título grande se desvanece. Animación previa sin tocar.

## 6. `npm run build`

OK — 144ms, 0 errores.

## 7. Validaciones

- Desktop 1440/1024: título en la franja del navbar; links a la derecha; sin overflow.
- Mobile 768/430/390: título sin cortes ni encimado con el header (caja a ~117–122px, navbar bottom ~92px → clearance); hamburguesa OK; sin overflow.
- Sin errores de consola. Transición scrolled y menú mobile sin cambios.

![Desktop Hero (top)](./review-screenshots/desktop-hero.png)
![Desktop Navbar Scrolled](./review-screenshots/desktop-navbar-scrolled.png)
![Mobile Hero](./review-screenshots/mobile-hero.png)
![Mobile Navbar Scrolled](./review-screenshots/mobile-hero-scrolled.png)

## 8. Pendientes reales

- Ninguno de este cambio.

---

# Fix regresión: links a la derecha en top + título alineado con navbar (iteración 14)

Corrección de la regresión donde los links quedaban semicentrados en top-of-page y el título grande quedaba más abajo, desalineado del navbar. No se hizo push ni deploy.

## Causa de la regresión

El grid anterior era `minmax(180px,1fr) auto minmax(180px,1fr)` con los links en la **columna central** (`justify-self: center`) y un `translateX` positivo que no alcanzaba el borde derecho (la columna 3 reservaba 180–465px). Resultado: links **semicentrados ya en top**. Además, `.hero { padding-top: 132px }` dejaba ~60px de gap muerto entre el navbar (~72–90px) y el título.

## Archivos modificados

- `src/components/Navbar.css` — grid de 3 zonas reorientado: links a la derecha en top, deslizan al centro en scrolled.
- `src/components/Hero.css` — `padding-top` 132 → 104px (título en la franja del navbar).
- `src/components/Navbar.jsx` — **sin cambios** (lógica de scroll reutilizada).

## Navbar.css

Grid `1fr auto auto` (zona-izq/marca · links · CTA):
- `.navbar__links` → columna 2, **`justify-self: end`** → en **top quedan a la derecha**, pegados antes del CTA (`translateX(0)`).
- `.navbar--scrolled .navbar__links` → `transform: translateX(clamp(-360px, -24vw, -120px))` → **se deslizan hacia el centro** (negativo, desde la derecha). Transición `520ms cubic-bezier(0.22,1,0.36,1)`.
- `.navbar__cta-desktop` → columna 3, fija a la derecha. `.navbar__logo` → columna 1, oculta en top, visible en scrolled.
- Sin animar `justify-content`/`margin` (solo `transform`).

## Hero.css

`padding-top` 132 → **104px**: el título arranca justo debajo del navbar fixed (gap medido ~14px), compartiendo la franja superior con la navegación. Mobile mantiene 132px (clearance del header).

## Validación medida

| viewport | TOP links | navBottom→titleTop gap | SCROLLED links centro | logo top→scrolled | título top→scrolled |
|---|---|---|---|---|---|
| 1440 | derecha (right 1200, CTA 1408) | 90→104 = **14px** | x=745 (≈720 centro) | 0→1 | 1→0.18 |
| 1280 | derecha (right 1040, CTA 1248) | 14px | x=623 (≈640 centro) | 0→1 | 1→0.18 |
| 768/430/390 | n/a (overlay) | 40px | n/a | 0→1 | 1→**0** (se desvanece) |

Sin overflow horizontal en ningún viewport; sin errores de consola.

## `npm run build`

OK — 197ms, 0 errores.

## Confirmaciones

- **Top desktop**: título grande arriba-izquierda alineado con la nav; links a la derecha; CTA extremo derecho; marca chica ausente. ✓
- **Scrolled desktop**: marca chica izquierda; links deslizados al centro; CTA derecha; título grande atenuado. ✓
- **Top mobile**: domina el grande, sin marca chica. ✓
- **Scrolled mobile**: marca chica aparece, grande se desvanece, hamburguesa OK. ✓
- Menú mobile, dropdown Servicios, IntroSplash, anchors y links externos sin cambios.

![Desktop Hero (top)](./review-screenshots/desktop-hero.png)
![Desktop Navbar Scrolled](./review-screenshots/desktop-navbar-scrolled.png)
![Mobile Hero](./review-screenshots/mobile-hero.png)
![Mobile Navbar Scrolled](./review-screenshots/mobile-hero-scrolled.png)
![Mobile Menú Servicios](./review-screenshots/mobile-menu-servicios.png)

## Pendientes reales

- Ninguno de este cambio.

---

# Fix de saltos: links con transform (desktop) + marcas sin convivir (mobile) (iteración 13)

Dos correcciones de microinteracción: el salto de los links al scrollear (desktop) y la convivencia de marcas grande/chica (mobile). No se hizo push ni deploy.

## 1. Archivos modificados

- `src/components/Navbar.css` — grid de 3 zonas + transform para los links; marca chica mobile que aparece al scrollear.
- `src/components/Hero.css` — el título grande se desvanece por completo en mobile al scrollear.
- `src/components/Navbar.jsx` — **sin cambios** (la lógica `window.scrollY > 80` + `.is-scrolled` ya existía y se reutilizó).

## 2. Navbar.css

**Desktop (`@media min-width: 769px`):** el `.navbar__inner` pasó de `flex` con `justify-content`/`margin-inline: auto` (no animables → salto) a un **grid estable de 3 columnas** `minmax(180px,1fr) auto minmax(180px,1fr)`:
- `.navbar__logo` → columna 1, `justify-self: start`.
- `.navbar__links` → columna 2, `justify-self: center`, con `transform: translateX(clamp(96px, 12vw, 240px))` en top y `translateX(0)` en `.navbar--scrolled`, transición `transform 520ms cubic-bezier(0.22,1,0.36,1)`. **Se deslizan**, no saltan.
- `.navbar__cta-desktop` → columna 3, `justify-self: end` (no se mueve).
Se eliminó la antigua `transition: margin` y las reglas de `justify-content`/`margin-inline: auto` del estado scrolled.

**Mobile (`@media max-width: 768px`):** la marca chica pasó de "siempre visible" a **oculta en top** (`opacity:0; visibility:hidden; transform: translateY(-4px)`) y **revelada al scrollear** (`.navbar--scrolled .navbar__logo`), con `visibility/opacity/transform` (no `display`, que no anima). La hamburguesa siempre visible.

## 3. Navbar.jsx

No se tocó. Confirmado que ya togglea `.is-scrolled` en `<html>` y mantiene `.navbar--scrolled`.

## 4. Hero.css

- Easing del título a `cubic-bezier(0.22, 1, 0.36, 1)` (más premium).
- **Mobile**: `@media (max-width: 768px) .is-scrolled .hero__title { opacity: 0; transform: translateY(-24px) scale(0.96); pointer-events: none }` — el título grande **se desvanece por completo** para no convivir con la marca chica. Desktop mantiene `opacity: 0.18` (condensación). Visible por defecto (no es estado base).

## 5. Links con transform (confirmación)

Medido a 1440px: `.navbar__links` pasa de `translateX(172.8px)` (top) a `translateX(0)` (scrolled) — animado con `transform`, sin salto de layout. En mobile el transform es `none` (los links viven en el overlay; reglas acotadas a desktop).

## 6. Mobile: grande se desvanece, chica aparece (confirmación)

Medido a 768/430/390px: título grande `opacity 1 → 0`; marca chica del header `opacity 0 → 1`. Ya no conviven. Hamburguesa siempre visible.

## 7. `npm run build`

OK — 140ms, 0 errores.

## 8. Validaciones

- Sin overflow horizontal en 1440 / 768 / 430 / 390px; sin errores de consola.
- Menú mobile abre/cierra, dropdown Servicios, IntroSplash, anchors y links externos sin cambios.

![Desktop Hero (top)](./review-screenshots/desktop-hero.png)
![Desktop Hero condensándose](./review-screenshots/desktop-hero-condensing.png)
![Desktop Navbar Scrolled](./review-screenshots/desktop-navbar-scrolled.png)
![Mobile Hero](./review-screenshots/mobile-hero.png)
![Mobile Navbar Scrolled](./review-screenshots/mobile-hero-scrolled.png)
![Mobile Menú Servicios](./review-screenshots/mobile-menu-servicios.png)

## 9. Pendientes reales

- Ninguno de este cambio.

---

# Título grande que se condensa al scrollear + clase global is-scrolled (iteración 12)

Se añadió la clase global `.is-scrolled` y la animación del título grande del hero al scrollear (se condensa hacia el navbar). El navbar 3-zonas y el título arriba-izquierda ya estaban de la iteración 11. No se hizo push ni deploy.

## 1. Archivos modificados

- `src/components/Navbar.jsx` — el listener de scroll existente ahora también togglea `.is-scrolled` en `<html>`.
- `src/components/Hero.css` — transición + estado condensado del título bajo `.is-scrolled`.
- `src/components/IntroSplash.css` — más respiración del título inicial.

## 2. Navbar.jsx

Se **reutilizó** el `useEffect` con `window.scrollY > 80` (no se creó lógica nueva). Ahora, además de `setScrolled`, hace `document.documentElement.classList.toggle('is-scrolled', nextScrolled)` — así el Hero (hermano del Navbar, no hijo) puede reaccionar por CSS. Se llama una vez al montar y se limpia la clase en el cleanup.

## 3. Navbar.css

Sin cambios en esta iteración: la marca chica que aparece a la izquierda, los links centrados (`.navbar--scrolled .navbar__links { margin-inline: auto }`), el CTA a la derecha y las transiciones ya estaban implementados y validados.

## 4. Hero.css

- `.hero__title` recibió `transform-origin: left top` y `transition: opacity 420ms, transform 420ms`. **Visible por defecto** (`opacity:1`).
- `.is-scrolled .hero__title { opacity: 0.18; transform: translateY(-24px) scale(0.96); }` — el título grande pierde protagonismo suavemente, como condensándose hacia el navbar, donde aparece la marca chica.
- `prefers-reduced-motion`: anula el transform.

## 5. IntroSplash.css

Más aire: desktop `letter-spacing -0.06 → -0.05em`, `line-height 0.92 → 0.94`, `font-size min(9vw,205px) → min(8.8vw,200px)`. Mobile `line-height 0.96 → 1`, `-0.05 → -0.04em`. Duración, fade out, reduced motion, desmontaje, fondo azul y texto blanco intactos.

## 6. Reutilización de `window.scrollY > 80`

Confirmado: se reutilizó el listener existente, no se duplicó.

## 7. Clase global `.is-scrolled`

Confirmado: se agrega/remueve en `document.documentElement` (`<html>`). Medido: ausente en top, presente tras 80px de scroll, en los 4 viewports.

## 8. Estado top-of-page (confirmación visual)

Título grande arriba-izquierda, fully visible (`opacity:1`), navegación derecha. (`desktop-hero.png`)

## 9. Estado scrolled (confirmación visual)

Marca chica `BLUE SKY GROUP` izquierda · links centro · CTA derecha; el título grande del hero se atenúa a `opacity:0.18` y sube. (`desktop-navbar-scrolled.png`, `desktop-hero-condensing.png`)

## 10. `npm run build`

OK — 243ms, 0 errores.

## 11. Validaciones

- Medido en 1440 / 768 / 430 / 390px: `.is-scrolled` togglea bien; título `opacity 1 → 0.18` + transform; logo `opacity 0 → 1`. Sin overflow horizontal, sin errores de consola.
- Menú mobile, dropdown Servicios, IntroSplash y links externos sin cambios.

![Desktop Hero (top)](./review-screenshots/desktop-hero.png)
![Desktop Hero condensándose](./review-screenshots/desktop-hero-condensing.png)
![Desktop Navbar Scrolled](./review-screenshots/desktop-navbar-scrolled.png)
![Mobile Hero](./review-screenshots/mobile-hero.png)
![Mobile Menú Servicios](./review-screenshots/mobile-menu-servicios.png)

## 12. Pendientes reales

- El fade del título grande también ocurre en mobile al pasar 80px (el título se atenúa al scrollear el fold). Es coherente con la intención; si se prefiere desactivarlo en mobile, se puede acotar `.is-scrolled .hero__title` a `min-width: 769px`. No bloqueante.

---

# Hero arriba-izquierda + navbar 3-zonas al scrollear (iteración 11)

Reubicación del título grande a la franja superior y transición del navbar a logo-izquierda / links-centro / CTA-derecha al scrollear. Sin tocar paleta, fuente ni secciones internas. No se hizo push ni deploy.

## Diagnóstico

- El `BLUE SKY GROUP` grande estaba **centrado verticalmente** en el hero (`align-items: center`), apareciendo más abajo y desconectado de la navegación (arriba a la derecha): se leían como dos bloques separados.
- Al scrollear, la marca chica aparecía pero los links quedaban agrupados a la derecha (`space-between`), no centrados.

## Archivos modificados

- `src/components/Hero.css` — título a la franja superior.
- `src/components/Navbar.jsx` — marca a `BLUE SKY GROUP` (uppercase).
- `src/components/Navbar.css` — marca chica uppercase; links al centro en scrolled.
- `capture.cjs` — captura `desktop-navbar-scrolled`.

## Reubicación del título grande

- `.hero` pasó de `align-items: center` a **`flex-start`** y `padding-top` 152 → **132px**: el título arranca arriba a la izquierda, a la altura visual de la navegación derecha, marcando la portada desde el primer frame.
- El hero mantiene `min-height: 100vh`, pero el contenido (título + copy + CTAs + ecosistema) lo llena: medido heroH 1044 / ecoBottom 956 a 900px de alto → **sin hueco vacío**.
- Título sin cambios de tamaño (`clamp(72px, 11vw, 190px)`, `line-height: 0.9`, `letter-spacing: -0.05em`): masivo y con aire.

## Marca chica en el navbar al scrollear

- En top-of-page la marca está oculta (`opacity:0; visibility:hidden`) — el título gigante porta la marca; no es contenido crítico.
- Al pasar 80px (`navbar--scrolled`), aparece **`BLUE SKY GROUP`** en versión chica uppercase (peso 800, 16px) con fade + slide sutil, a la izquierda.

## Links al centro

- En scrolled, `.navbar__inner` pasa a `justify-content: flex-start` y `.navbar__links` recibe **`margin-inline: auto`**: las auto-margins absorben el espacio libre → logo pinned izquierda, **links centrados** (medido: centro en x≈700 sobre 1440), CTA pinned derecha. Transición suave (`transition: margin`).

## Comportamiento desktop

`Top:` título grande arriba-izquierda · navegación derecha. `Scrolled:` navbar compacto con marca chica izquierda · links centro · CTA derecha.

## Comportamiento mobile

Header con `BLUE SKY GROUP` chico (uppercase) a la izquierda + hamburguesa (siempre visible, identifica la barra); título grande del hero debajo sin cortes ni encimado. Menú fullscreen, dropdown y links intactos. Sin transición de centrado (los links viven en el overlay).

## IntroSplash

Sin cambios en esta iteración (ya quedó con buena respiración: desktop `line-height 0.92 / -0.06em`, mobile `0.96 / -0.05em`). Validado que sigue funcionando.

## Validaciones

- `npm run build`: **OK, 230ms, 0 errores.**
- Sin overflow horizontal en 1440 / 768 / 430 / 390px; sin errores de consola.
- Logo desktop `opacity 0→1` al scrollear; links de x≈1082 (derecha) → x≈700 (centro). Dropdown Servicios, menú mobile, IntroSplash y links externos OK.

![Desktop Hero](./review-screenshots/desktop-hero.png)
![Desktop Navbar Scrolled](./review-screenshots/desktop-navbar-scrolled.png)
![Mobile Hero](./review-screenshots/mobile-hero.png)
![Mobile Navbar Scrolled](./review-screenshots/mobile-hero-scrolled.png)
![Mobile Menú Servicios](./review-screenshots/mobile-menu-servicios.png)

## Pendientes reales

- En mobile, "BLUE SKY GROUP" aparece chico en el header y grande en el hero a la vez (franjas distintas, no compiten). Si se prefiere, se puede ocultar el del header en top-of-page mobile; quedó visible porque ayuda a identificar la barra. No bloqueante.

---

# Respiración del título + marca chica al scrollear (iteración 10)

Tres correcciones: aire en el título grande (hero + splash) y transición de marca chica en el navbar al scrollear. No se hizo push ni deploy.

## Diagnóstico

- El título `BLUE SKY GROUP` del hero estaba apretado: `line-height: 0.82` + `letter-spacing: -0.07em` enciman las dos líneas.
- El splash compartía el problema (`-0.075em`).
- La marca chica del navbar estaba **siempre oculta** en desktop; faltaba que reapareciera, integrada, al scrollear.

## Archivos modificados

- `src/components/Hero.css` — respiración del título (desktop y mobile).
- `src/components/IntroSplash.css` — respiración del título inicial.
- `src/components/Navbar.jsx` — umbral de scroll 20 → 80px (evita jitter cerca del top).
- `src/components/Navbar.css` — transición de marca chica por scroll.
- `capture.cjs` — capturas de estados scrolleados (element-screenshot para el navbar fixed).

## Título del hero

- Desktop: `line-height` 0.82 → **0.9**, `letter-spacing` -0.07 → **-0.05em**, `margin-bottom` 44 → 48px. Sigue masivo (`clamp(72px, 11vw, 190px)`), con más aire entre líneas.
- Mobile: `line-height` 0.86 → **0.92**, `letter-spacing` -0.06 → **-0.045em**.

## IntroSplash

- Desktop: `line-height` 0.88 → **0.92**, `letter-spacing` -0.075 → **-0.06em** (font `min(9vw, 205px)`). Imponente, no apretado.
- Mobile: `line-height` 0.9 → **0.96**, `letter-spacing` -0.065 → **-0.05em**. Fondo azul, texto blanco, animación y `prefers-reduced-motion` sin cambios.

## Transición de scroll en el navbar

- **Top-of-page (desktop):** navegación a la derecha, marca chica oculta (`opacity:0; visibility:hidden`) — el título gigante del hero porta la marca. No es contenido crítico.
- **Scrolleado (desktop):** al pasar 80px, la clase `navbar--scrolled` revela "Blue Sky Group" con un fade + slide sutil (`translateX(-8px)→0`) y el navbar pasa a `space-between` y se compacta (padding + sombra ya existentes). Transición suave, sobria.
- **Mobile:** la marca chica está **siempre visible** (header identificado) + hamburguesa; sin transición de aparición. Menú fullscreen/cerrar/links intactos.
- Implementación: estado `scrolled` con listener `passive` limpiado en unmount; sin re-renders innecesarios (React descarta el set si el booleano no cambia). `prefers-reduced-motion` anula el slide.

## Validaciones

- `npm run build`: **OK, 148ms, 0 errores.**
- Medido: logo desktop `opacity 0`→`1` al scrollear; mobile siempre `1`. Sin overflow horizontal ni errores de consola en 1440 / 768 / 430 / 390px.
- Dropdown Servicios, menú mobile, IntroSplash y links externos sin cambios.

![Desktop Hero](./review-screenshots/desktop-hero.png)
![Desktop Navbar (top)](./review-screenshots/desktop-navbar.png)
![Desktop Navbar (scrolled)](./review-screenshots/desktop-hero-scrolled.png)
![Mobile Hero](./review-screenshots/mobile-hero.png)
![Mobile Navbar (scrolled)](./review-screenshots/mobile-hero-scrolled.png)
![Mobile Menú Servicios](./review-screenshots/mobile-menu-servicios.png)

## Pendientes reales

- Ninguno de este cambio.

---

# Navbar editorial — marca chica fuera en desktop (iteración 9)

Limpieza de la duplicación de marca y reubicación de la navegación. Solo Navbar. No se hizo push ni deploy.

## Diagnóstico

El navbar mostraba "Blue Sky Group" chico arriba a la izquierda, duplicando el título gigante `BLUE SKY GROUP` del hero y restándole impacto. El navbar usaba `.container` (1120px), por lo que su borde derecho no coincidía con el del hero (`.hero__inner`, 1440px).

## Archivos modificados

- `src/components/Navbar.css` (único archivo). El JSX no cambió: el `<a>` del logo sigue en el DOM (enlace home, accesibilidad), solo se oculta por CSS en desktop.

## Marca chica del navbar — desktop

- **Oculta** (`.navbar__logo { display: none }`) en desktop. El título gigante del hero queda como único protagonista de marca.
- `.navbar__inner` pasa a `justify-content: flex-end` → la navegación (Qué es / Servicios / Contacto / Coordinar reunión →) se alinea a la derecha.

## Marca / header — mobile

- **Se mantiene** "Blue Sky Group" chico a la izquierda (identifica el header, que si no quedaría solo con la hamburguesa) + hamburguesa a la derecha (`justify-content: space-between`). El menú fullscreen, botón cerrar y links siguen intactos.

## Ajuste de alineación

- `.navbar .navbar__inner` ahora usa `width: min(100% - 64px, 1440px)` (mobile: `100% - 32px`), igualando el ancho del hero para que la navegación quede al ras del borde derecho de la composición.

## Validaciones

- `npm run build`: **OK, 153ms, 0 errores.**
- Logo: `display: none` en 1366/1440/1920px; `flex` en 768/430/390px (medido).
- Sin overflow horizontal en ningún ancho; sin errores de consola.
- Menú mobile abre/cierra OK; navegación, dropdown Servicios, CTA y anclas internas sin cambios.

![Desktop Hero](./review-screenshots/desktop-hero.png)
![Mobile Hero](./review-screenshots/mobile-hero.png)
![Mobile Menú Servicios](./review-screenshots/mobile-menu-servicios.png)

## Pendientes reales

- Ninguno de este cambio.

---

# Rediseño del Hero — más editorial y masivo (iteración 8)

Rediseño puntual del hero hacia una composición más abierta y dominante. Sin tocar paleta, fuente, narrativa, IntroSplash ni secciones internas. No se hizo push ni deploy.

## Diagnóstico del hero anterior

- Título tope `148px` — fuerte, pero no masivo.
- El hero usaba el `.container` global (`min(100% - 48px, 1120px)`), que lo encerraba a 1120px y dejaba mucho azul vacío a los lados en pantallas grandes.
- `min-height: 100vh` con poco contenido → aire azul sin intención arriba/abajo.

## Archivos modificados

- `src/components/Hero.jsx` — el wrapper pasó de `.container .hero__container` a un `.hero__inner` propio; el título se divide en dos líneas controladas (`Blue Sky` / `Group`).
- `src/components/Hero.css` — contenedor propio, título masivo, espaciado y ecosistema.

No se tocó `index.css` (el `.container` global queda igual para el resto de la web), ni Navbar, ni links externos.

## Desktop

- **Contenedor propio** `.hero__inner: width: min(100% - 64px, 1440px)` — abre la composición y acerca el título al borde izquierdo sin afectar otras secciones (que siguen con el container de 1120px).
- **Título** `clamp(72px, 11vw, 190px)`, `line-height: 0.82`, `letter-spacing: -0.07em`, en dos líneas `BLUE SKY` / `GROUP`. Escala real: 150px @1366 · 158px @1440 · 190px @1920.
- Copy y CTAs a la izquierda con la misma jerarquía; padding del hero `152px/88px`.

## Mobile

- Título `clamp(64px, 18vw, 108px)`, `line-height: 0.86` — grande y protagonista (70px @390 · 77px @430 · 108px @768), sin cortes.
- `.hero__inner` a `min(100% - 40px, 1440px)`; botones full-width apilados; ecosistema en una columna con flechas rotadas.

## Módulo ecosistema

- Más ancho (`max-width: 1100px`, alineado al bloque de texto) y con más respiración interna (`padding: 32px 36px`). Mantiene fondo translúcido, borde sutil, Prospect destacado en blanco como "Servicio activo" y Commerce como "Próxima implementación". Sin colores nuevos.

## Validaciones

- `npm run build`: **OK, 147ms, 0 errores.**
- Sin overflow horizontal en 1920 / 1440 / 1366 / 768 / 430 / 390px. Sin errores de consola.
- IntroSplash sin cambios y funcionando; transición Hero → Qué es limpia, sin huecos.

![Desktop Hero](./review-screenshots/desktop-hero.png)
![Mobile Hero](./review-screenshots/mobile-hero.png)

## Pendientes reales

- Ninguno de este cambio. (Sigue abierto, de iteraciones previas, el `TODO` de iconografía del sistema de agentes.)

---

# Reversión — Text Gradient Scroll (iteración 7)

Se **revirtió por completo** el efecto `TextGradientScroll` agregado en la iteración 6.

- Eliminados: `src/components/TextGradientScroll.jsx`, `src/components/TextGradientScroll.css`, `review-screenshots/desktop-text-gradient-scroll.png`, `review-screenshots/mobile-text-gradient-scroll.png`.
- `src/App.jsx`: removido el import y el `<TextGradientScroll />` entre Hero y AboutGroup.
- `capture.cjs`: removidas las capturas y el helper `shotElement` del efecto.
- No se instaló ninguna dependencia para este efecto (era CSS/JS puro), por lo que no hubo nada que desinstalar.

El resto de la landing (IntroSplash, Hero, Navbar/menú mobile, Qué es, Prospect, agentes, proceso, Commerce con C2C, Contacto y links externos de WhatsApp / Blue Sky Prospect) queda intacto. La transición Hero → Qué es vuelve a ser la anterior.

---

# IntroSplash horizontal en una línea (iteración 5)

Mejora puntual del splash inicial para acercarlo a la referencia original: `BLUE SKY GROUP` en **una sola línea** en desktop, más ancho y dominante, con sombra sutil. Solo se tocó IntroSplash. No se hizo push ni deploy.

## Archivos modificados

- `src/components/IntroSplash.css` (único archivo). El JSX no necesitó cambios; la clase real del título es `.intro-splash__text`.

## Valores CSS finales del título

Desktop:
```css
.intro-splash__text {
  font-size: min(9.3vw, 210px);   /* escala con el ancho, tope 210px */
  line-height: 0.88;
  letter-spacing: -0.075em;
  white-space: nowrap;            /* fuerza una sola línea */
  max-width: calc(100vw - 48px);
  text-align: center;
  text-shadow: 0 18px 38px rgba(0, 0, 0, 0.18);
}
```

Mobile (`max-width: 768px`):
```css
.intro-splash__text {
  font-size: clamp(64px, 19vw, 118px);
  line-height: 0.9;
  letter-spacing: -0.065em;
  white-space: normal;            /* permite dos líneas equilibradas */
  max-width: min(92vw, 640px);
  text-shadow: 0 12px 28px rgba(0, 0, 0, 0.16);
}
```

Decisión técnica: en desktop usé `min(9.3vw, 210px)` con `white-space: nowrap` en lugar de un `clamp(72px, 11vw, 210px)`. Con `11vw` el texto (~14 caracteres en Inter 900) se desbordaba en anchos angostos de desktop; `9.3vw` garantiza una línea desde 769px hasta ultra-wide sin overflow, manteniendo presencia.

## Confirmaciones (medidas reales con Puppeteer)

- **Desktop una línea:** ✅ a 769 / 820 / 1024 / 1280 / 1366 / 1440 / 1600 / 1920px el título queda en **1 línea**. Ej.: 1440px → texto 1030px de ancho en viewport de 1440px; 1920px → 1374px. Font-size escala 71px → 178px.
- **Mobile dos líneas:** ✅ a 768 / 430 / 390px parte en `BLUE SKY` / `GROUP`, equilibrado.
- **Sin overflow horizontal** en ninguno de los anchos probados.
- **Sin errores de consola.**
- El hero aparece correctamente después del splash (sin pantalla gris/vacía).
- Animación, duración, fade out, desmontaje y `prefers-reduced-motion` sin cambios.

## Captura del splash

El sistema de capturas **sí** captura el splash: en `capture.cjs` se hace `reload({waitUntil:'domcontentloaded'})` + espera de 400ms (antes de que se oculte a ~1.2s) y se toma la captura. `desktop-splash.png` y `mobile-splash.png` fueron regeneradas y reflejan el cambio.

![Desktop Splash](./review-screenshots/desktop-splash.png)
![Mobile Splash](./review-screenshots/mobile-splash.png)

## `npm run build`

OK — 247ms, 0 errores.

---

# Mejora del menú mobile (iteración 4)

Mejora visual puntual del overlay de navegación mobile. Sin tocar paleta, fuente ni estructura de navegación. No se hizo push ni deploy.

## Diagnóstico del menú anterior

- Overlay con `justify-content: center`: todo flotaba en el medio, mucho espacio vacío sin intención.
- No había estructura header/cuerpo/footer: ni marca ni botón cerrar dedicado dentro del overlay.
- El "cerrar" era el propio hamburger transformado en X (24px, poco integrado, sin área táctil cómoda ni hover claro).
- Subitems de Servicios con guiones "—" básicos, sin bloque visual ni jerarquía.
- CTA en el medio de la lista, sin sensación de cierre.
- Sin tecla Escape; `aria-label="Toggle menu"` genérico.

## Archivos modificados

- `src/components/Navbar.jsx` — overlay mobile reescrito como `.mobile-menu` con composición header / cuerpo / footer; botón cerrar dedicado con SVG; `aria-controls`, `aria-label="Abrir menú"` / `"Cerrar menú"`; cierre con Escape; `tabIndex` condicional en los links del overlay.
- `src/components/Navbar.css` — nuevo bloque `.mobile-menu` (header, links numerados, grupo Servicios con borde izquierdo y labels de estado, footer CTA); hamburger a 44×44px; eliminados los estilos del overlay viejo; `prefers-reduced-motion` y fallback para pantallas bajas (`max-height: 680px`).

## Cambios aplicados

- **Composición:** header (marca "Blue Sky Group" izq. + botón cerrar der.), cuerpo central con los 3 links, footer con CTA anclado abajo.
- **Botón cerrar:** 44×44px, cuadrado redondeado con borde blanco translúcido, ícono X SVG centrado, hover/focus visible. Sin estilos de navegador.
- **Links principales:** numeración discreta `01/02/03`, uppercase, peso 800, divisores sutiles, line-height equilibrado.
- **Subitems Servicios:** bloque con borde izquierdo e indentación; menor tamaño que los principales; "Blue Sky Prospect · Servicio activo" y "Blue Sky Commerce · En desarrollo".
- **CTA:** blanco/texto azul, full-width, anclado al footer como cierre natural; respeta `safe-area-inset-bottom`.
- **Espacio vertical:** cuerpo centrado con `100dvh`; en pantallas bajas pasa a `flex-start` con scroll para que todo entre.

## Accesibilidad

- `aria-expanded` en el hamburger; `aria-controls="mobile-menu"`; `aria-hidden` en el overlay según estado.
- `aria-label="Cerrar menú"` en el botón cerrar; focus visible en cerrar y CTA.
- Cierre con tecla **Escape**.
- Áreas táctiles ≥ 44px (hamburger y cerrar).
- `tabIndex={-1}` en los links del overlay cuando está cerrado (no son tabbables ocultos).

## Validaciones

- `npm run build`: **OK, 141ms, 0 errores.**
- 390 / 430 / 768px: **sin overflow horizontal**, sin errores de consola.
- Abrir → `body overflow: hidden`, menú `visible`, `aria-expanded="true"`.
- Cerrar → `body overflow` restaurado, menú `hidden`.
- Capturas regeneradas: `mobile-menu-servicios`, `mobile-hero`, `mobile-full-page`.

![Mobile Menú Servicios](./review-screenshots/mobile-menu-servicios.png)

## Pendientes reales

- El menú mobile no atrapa el foco (focus trap) mientras está abierto; se podría agregar si se quiere a11y estricta, pero no es bloqueante.

---

# Ajuste puntual — IntroSplash + Hero (iteración 2)

Mejora puntual sobre la landing aprobada. Sin rediseño global, sin cambios de paleta/fuente/identidad, sin tocar la arquitectura narrativa. No se hizo push ni deploy.

## A. IntroSplash agrandado

- **Archivo:** `src/components/IntroSplash.css`.
- Tamaño desktop: `clamp(64px, 15vw, 220px)` → **`clamp(80px, 19vw, 300px)`**. Ahora `BLUE SKY GROUP` domina la pantalla como golpe de marca.
- `letter-spacing` -0.05em → -0.06em, `line-height` 0.85 → 0.86, `max-width` 90vw → 94vw.
- **Media query mobile nueva** (`max-width: 768px`): `clamp(56px, 18vw, 120px)`, `line-height: 0.9`, sin overflow ni cortes (verificado en 390/430px).
- `prefers-reduced-motion` explícito: anula la animación del texto (el componente ya se desmonta del DOM y respeta reduced-motion en el JSX).
- Sin spinner, sin logo B, sin efectos nuevos. Fondo azul, texto blanco, uppercase, peso 900, centrado.

## B. Hero con más presencia

- **Archivos:** `src/components/Hero.jsx` / `Hero.css`.
- Título: `clamp(52px, 9.5vw, 128px)` → **`clamp(56px, 10.5vw, 148px)`**, rhythm vertical más ajustado (menos azul muerto).
- **Módulo de ecosistema rediseñado** de tira inline a **banda premium full-width** con overline "El ecosistema" y tres nodos en card propia, conectados por flechas:
  - Holding · Blue Sky Group (marca madre).
  - **Servicio activo · Blue Sky Prospect** — destacado en superficie blanca, texto azul/oscuro.
  - Próxima implementación · Blue Sky Commerce (atenuado, futuro).
- Grid `1fr auto 1fr auto 1fr` en desktop; se apila a 1 columna con flechas rotadas en mobile. Breakpoint intermedio 769–980px para que no se apriete en tablet.
- Copy del hero sin cambios (título, bajada, texto, CTAs).

## C. Ajuste en Blue Sky Commerce

- **Archivo:** `src/components/Commerce.jsx`.
- Se agregó el chip **C2C** a la grilla de modelos de intercambio.
- Se actualizó el texto descriptivo inferior para incluir explícitamente "C2C".
- El nodo de C2C se integró perfectamente al flujo `display: flex; flex-wrap: wrap;` preexistente, por lo que NO rompe la grilla visual ni genera overflow horizontal en ningún viewport (el salto de línea ocurre naturalmente cuando falta espacio).
- Se mantiene el badge "En desarrollo" y la estructura visual de la tarjeta central.

## Validaciones (iteraciones 2 y 3)

- `npm run build`: **OK, 211ms, 0 errores.**
- Sin overflow horizontal en **390 / 430 / 768 / 932 / 1440 px**. Sin errores de consola.
- **No se reintrodujo `opacity: 0` dependiente de JS:** `Hero.css` sin `opacity: 0`; el Hero renderiza contenido estático (sin `useInView`). El único `opacity:0` del splash es de transición/keyframe y el componente se desmonta.
- Capturas nuevas: `desktop-splash`, `mobile-splash`, hero y full-page desktop/mobile regenerados.

### Splash
![Desktop Splash](./review-screenshots/desktop-splash.png)
![Mobile Splash](./review-screenshots/mobile-splash.png)

---

# Revisión Visual Integral — Blue Sky Group Landing (iteración 1)

Iteración de mejora visual integral manteniendo identidad aprobada: azul institucional `#066fee`, fondo gris claro `#eef0f4`, tipografía Inter, títulos masivos uppercase y sistema de secciones numeradas.

## 1. Diagnóstico inicial

- **Bug crítico confirmado por capturas:** la sección 03 "Qué resuelve Blue Sky Prospect" (`Problem`) estaba **invisible** en producción. `Problem.css` definía `opacity: 0` + `translateY` por defecto y dependía de IntersectionObserver para mostrarse — exactamente el error prohibido. En el full-page desktop aparecía un bloque vacío gigante entre Prospect y el Proceso.
- Link roto: el CTA de Prospect apuntaba a `#contact` (la sección es `#contacto`).
- Variable CSS inexistente: `var(--bg-soft)` en `AgentSystem.css` (no definida en `:root`).
- Card de Commerce rota en mobile: `padding: 0 0 0 20px` eliminaba todo el padding interno.
- Orden narrativo invertido: el Proceso (04) aparecía antes que el Sistema de Agentes (05); la cadencia esperada es Prospect → qué resuelve → agentes → proceso.
- Las 6 cards del sistema de agentes usaban el mismo ícono "target" repetido.
- Exceso de centrado: Qué es, Prospect, Agentes y Proceso eran todos bloques centrados idénticos, sin cadencia editorial.
- Dropdown de Servicios con gap de hover (se podía cortar al mover el mouse hacia el panel).

## 2. Alternativa elegida para el hero

**Alternativa B — Hero con arquitectura de ecosistema** (sobre la base masiva de la Alternativa A):

- `BLUE SKY GROUP` dominante (clamp 52px → 128px), fondo azul sólido, alineado a la izquierda.
- Bajada y subtexto en bloque con borde lateral semitransparente.
- CTAs "Conocer servicios" / "Coordinar reunión".
- **Nuevo módulo de ecosistema** debajo: `Holding (Blue Sky Group) → Servicio activo (Blue Sky Prospect) → Próxima implementación (Blue Sky Commerce)`, en un contenedor sobrio con borde translúcido. En mobile se apila verticalmente con flechas rotadas.

Razón: comunica en el primer fold la arquitectura holding → servicio activo → futura implementación sin sacrificar el impacto institucional de la marca, y lee bien en desktop y mobile.

## 3. Archivos modificados

- `src/App.jsx` — reorden: AgentSystem antes de HowItWorks.
- `src/components/Hero.jsx` / `Hero.css` — módulo ecosistema, sin observer, padding mobile corregido.
- `src/components/AboutGroup.jsx` / `AboutGroup.css` — layout editorial 2 columnas (texto + módulo Prospect/Commerce vertical).
- `src/components/Prospect.jsx` / `Prospect.css` — badge "Servicio activo", header editorial izquierda, tagline "Agentic-as-a-Service para prospección B2B.", CTA `#contacto`.
- `src/components/Problem.jsx` / `Problem.css` — **eliminado `opacity: 0` dependiente de observer** (sección era invisible).
- `src/components/AgentSystem.jsx` / `AgentSystem.css` — renumerada 04, banda blanca de cadencia, íconos variados del set existente, fix `--bg-soft`, TODO de iconografía conservado.
- `src/components/HowItWorks.jsx` / `HowItWorks.css` — renumerada 05, título más contenido, pasos como timeline con línea superior; cards verticales en mobile.
- `src/components/Commerce.jsx` / `Commerce.css` — copy completo (B2B/B2C/C2B), chip "Oportunidades" agregado, fix padding mobile, mapa de chips con fondo sólido.
- `src/components/CtaFinal.jsx` / `CtaFinal.css` — título mejor proporcionado, padding responsive de la card azul, `<br/>` removidos en mobile.
- `src/components/Navbar.jsx` / `Navbar.css` — puente de hover del dropdown, `aria-expanded` en hamburger.
- `capture.cjs` — espera del dropdown aumentada (la captura salía a mitad del fade).

## 4. Cambios por sección

| Sección | Cambio |
|---|---|
| Intro splash | Sin cambios: ya cumplía spec (~1.8s total, respeta `prefers-reduced-motion`, se desmonta del DOM). |
| Hero | Alternativa B: título masivo + módulo de arquitectura del ecosistema. |
| 01 Qué es | Editorial a la izquierda; módulo Prospect/Commerce como card lateral en desktop. |
| 02 Prospect | Badge "Servicio activo", subtítulo oficial, más peso visual, grid 3 col intacta. |
| 03 Qué resuelve | **Ahora visible** (antes invisible por opacity 0). |
| 04 Sistema de agentes | Antes del proceso; banda blanca; cards grises; íconos diferenciados. |
| 05 Proceso | Subordinado a Prospect: título más chico, timeline horizontal desktop / cards mobile. |
| 06 Commerce | Card central con mapa de chips completo (8 nodos), badge "En desarrollo", tono futuro. |
| 07 Contacto | Card azul premium, título contenido, sin superposiciones en mobile. |

## 5. Navegación

- Estructura confirmada: Qué es / Servicios (dropdown: Blue Sky Prospect, Blue Sky Commerce) / Contacto + CTA "Coordinar reunión →" a `#contacto`.
- "Proceso" y "Commerce" no aparecen como ítems principales.
- Dropdown desktop: puente invisible de hover (no se corta al mover el mouse al panel).
- Mobile: menú full-screen azul, subitems de Servicios visibles, body se desbloquea al cerrar.
- `scroll-margin-top: 96px` activo en todas las secciones; el header sticky no tapa títulos.

## 6. Responsive

Validado por captura y por script en 390 / 430 / 768 / 1440 px:

- **Sin overflow horizontal en ningún viewport** (scrollWidth == clientWidth en los 4).
- Hero mobile: padding superior reducido (180→140px), CTAs full-width, ecosistema apilado vertical.
- Commerce mobile: padding de card restaurado (32/24px).
- Contacto mobile: card 56/28px, título sin `<br/>` forzados.
- Sin errores de consola.

## 7. Confirmaciones

- ✅ Paleta intacta (`#066fee`, `#eef0f4`, blancos y grises existentes) y tipografía Inter sin cambios.
- ✅ **No existe ningún `opacity: 0` dependiente de JS/IntersectionObserver en secciones renderizadas.** Se eliminó `useInView` de todos los componentes montados; los únicos `opacity: 0` restantes son keyframes decorativos, estados de interacción del navbar y el splash (que se desmonta). Los archivos legacy no montados (Contact, Ecosystem, Units, Vision) no se renderizan.
- ✅ SEO/metadata sin cambios (`lang="es"`, title, description, OG, theme-color, favicon ya correctos).
- ✅ `npm run build`: OK en 148ms, 0 errores.

## 8. Screenshots (re-generados, rutas relativas)

### Desktop
![Desktop Full Page](./review-screenshots/desktop-full-page.png)
![Desktop Hero](./review-screenshots/desktop-hero.png)
![Qué es](./review-screenshots/desktop-que-es.png)
![Prospect](./review-screenshots/desktop-prospect.png)
![Sistema de agentes](./review-screenshots/desktop-agent-system.png)
![Commerce](./review-screenshots/desktop-commerce.png)
![Contacto](./review-screenshots/desktop-contacto.png)
![Dropdown Servicios](./review-screenshots/desktop-dropdown-servicios.png)

### Mobile
![Mobile Full Page](./review-screenshots/mobile-full-page.png)
![Mobile Hero](./review-screenshots/mobile-hero.png)
![Mobile Qué es](./review-screenshots/mobile-que-es.png)
![Mobile Prospect](./review-screenshots/mobile-prospect.png)
![Mobile Agentes](./review-screenshots/mobile-agent-system.png)
![Mobile Commerce](./review-screenshots/mobile-commerce.png)
![Mobile Contacto](./review-screenshots/mobile-contacto.png)
![Mobile Menú Servicios](./review-screenshots/mobile-menu-servicios.png)

## 9. Pendientes reales

- `TODO` (en `AgentSystem.jsx`): reemplazar iconografía del sistema de agentes por íconos más precisos y consistentes con prospección, CRM y agentes 24/7. Por ahora se mapearon íconos distintos del set existente por card.
- Los componentes legacy no usados (`Contact`, `Ecosystem`, `Units`, `Vision`) podrían eliminarse del repo en una limpieza futura.
- Aprobación visual final antes de push/deploy.
