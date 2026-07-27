const fs = require('node:fs');
const path = require('node:path');
const puppeteer = require('puppeteer-core');

const ROOT_URL = process.env.CAPTURE_URL || 'http://localhost:5174/';
const OUTPUT_DIR = path.join(__dirname, 'review-screenshots');
const CHROME_CANDIDATES = [
  process.env.PUPPETEER_EXECUTABLE_PATH,
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
].filter(Boolean);
const VIEWPORTS = [
  { width: 1920, height: 1080 },
  { width: 1440, height: 900 },
  { width: 1024, height: 768 },
  { width: 768, height: 1024 },
  { width: 430, height: 932 },
  { width: 390, height: 844 },
  { width: 360, height: 800 },
];
const ROUTES = [
  '/',
  '/forge',
  '/prospect',
  '/commerce',
  '/estado-y-alcance',
  '/contacto',
  '/privacidad',
  '/terminos',
];

let activeBrowser;

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
const urlFor = (route, { skipMotion = false } = {}) => {
  const url = new URL(route, ROOT_URL);
  if (skipMotion && url.pathname === '/' && !url.hash) {
    url.searchParams.set('motion', 'skip');
  }
  return url.href;
};

function findBrowser() {
  const executablePath = CHROME_CANDIDATES.find((candidate) => fs.existsSync(candidate));
  if (!executablePath) {
    throw new Error(
      'No se encontró Chrome/Edge. Definí PUPPETEER_EXECUTABLE_PATH para ejecutar capturas.',
    );
  }
  return executablePath;
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function routeName(route) {
  if (route === '/') return 'home';
  return route.slice(1).replaceAll('/', '-');
}

(async () => {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const styleFiles = [
    path.join(__dirname, 'src', 'index.css'),
    ...fs
      .readdirSync(path.join(__dirname, 'src', 'components'))
      .filter((file) => file.endsWith('.css'))
      .map((file) => path.join(__dirname, 'src', 'components', file)),
  ];
  const styleSource = styleFiles.map((file) => fs.readFileSync(file, 'utf8')).join('\n');
  for (const retiredBlue of ['#0557c2', '#3d8ef2', '#509af3', '#83b7f7']) {
    assert(
      !styleSource.toLowerCase().includes(retiredBlue),
      `El CSS conserva el azul retirado ${retiredBlue}`,
    );
  }

  const browser = await puppeteer.launch({
    executablePath: findBrowser(),
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });
  activeBrowser = browser;
  const page = await browser.newPage();
  const consoleErrors = [];
  const networkErrors = [];

  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });
  page.on('pageerror', (error) => consoleErrors.push(error.message));
  page.on('requestfailed', (request) => {
    networkErrors.push(`${request.failure()?.errorText || 'request failed'} ${request.url()}`);
  });
  page.on('response', (response) => {
    if (response.status() >= 400) {
      networkErrors.push(`${response.status()} ${response.url()}`);
    }
  });

  const screenshot = async (name, options = {}) => {
    await page.screenshot({
      path: path.join(OUTPUT_DIR, `benchmark-${name}.png`),
      ...options,
    });
  };

  const goto = async (route, { motion = false } = {}) => {
    await page.goto(urlFor(route, { skipMotion: !motion }), { waitUntil: 'networkidle0' });
    await page.waitForSelector('#main-content');
    await page.evaluate(() => window.scrollTo(0, 0));
    await delay(120);
  };

  const waitForMotionTime = async (milliseconds) => {
    const elapsed = await page.evaluate(() => performance.now());
    if (elapsed < milliseconds) await delay(milliseconds - elapsed);
  };

  const readLandingMeasurement = async (viewport) => {
    await page.waitForFunction(() => document.documentElement.dataset.brandMotionLanding, {
      timeout: 3500,
    });
    const measurement = await page.evaluate(() => {
      const landing = JSON.parse(document.documentElement.dataset.brandMotionLanding);
      const target = document.querySelector('.hero__brand-title').getBoundingClientRect();
      return {
        ...landing,
        finalTarget: {
          x: target.x,
          y: target.y,
          width: target.width,
          height: target.height,
        },
        bodyOverflow: getComputedStyle(document.body).overflow,
        rootOverflow: getComputedStyle(document.documentElement).overflow,
      };
    });

    for (const [property, value] of Object.entries(measurement.delta)) {
      assert(
        Math.abs(value) <= 1,
        `${viewport.width}px: delta ${property} fuera de tolerancia (${value}px)`,
      );
    }
    for (const property of ['x', 'y', 'width', 'height']) {
      const handoffDelta = measurement.target[property] - measurement.finalTarget[property];
      assert(
        Math.abs(handoffDelta) <= 1,
        `${viewport.width}px: target ${property} se moviÃ³ ${handoffDelta}px tras el hand-off`,
      );
    }

    return {
      viewport: `${viewport.width}x${viewport.height}`,
      ...measurement,
    };
  };

  const captureMotionSequence = async (viewport, label, captureFrames = false) => {
    await page.setViewport({ ...viewport, deviceScaleFactor: 1 });
    await page.goto(urlFor(`/?motion=run&capture=${viewport.width}`), {
      waitUntil: 'domcontentloaded',
    });
    await page.waitForSelector('.brand-motion');

    if (captureFrames) {
      await waitForMotionTime(400);
      await screenshot(`motion-${label}-intro`);
      for (const frame of [1300, 1500, 1700]) {
        await waitForMotionTime(frame);
        await screenshot(`motion-${label}-flip-${frame}`);
      }
    }

    const measurement = await readLandingMeasurement(viewport);
    await delay(500);
    if (captureFrames) await screenshot(`motion-${label}-hero-final`);
    await assertNoOverflow(`motion ${viewport.width}`);
    return measurement;
  };

  const assertNoOverflow = async (label) => {
    const dimensions = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    assert(
      dimensions.scrollWidth <= dimensions.clientWidth + 1,
      `${label}: overflow horizontal ${dimensions.scrollWidth}px > ${dimensions.clientWidth}px`,
    );
  };

  const assertMeta = async (expectedPath) => {
    const meta = await page.evaluate(() => ({
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.content,
      canonical: document.querySelector('link[rel="canonical"]')?.href,
      robots: document.querySelector('meta[name="robots"]')?.content,
    }));
    assert(meta.title, `${expectedPath}: falta title`);
    assert(meta.description, `${expectedPath}: falta description`);
    assert(
      meta.canonical === `https://www.blueskygroup.com.ar${expectedPath}`,
      `${expectedPath}: canonical inesperado ${meta.canonical}`,
    );
    assert(meta.robots === 'index, follow', `${expectedPath}: robots inesperado`);
  };

  const assertInstitutionalContract = async (label) => {
    const contract = await page.evaluate(() => {
      const actions = Array.from(document.querySelectorAll('a, button'))
        .filter((element) => element.offsetParent !== null)
        .map((element) => element.textContent.replace(/\s+/g, ' ').trim());
      return {
        actions,
        forms: document.querySelectorAll('form').length,
        registrationFields: document.querySelectorAll(
          'input[type="password"], input[name*="register"], input[name*="login"]',
        ).length,
      };
    });
    const forbidden =
      /hablar con ventas|solicitar (una )?demo|contratar ahora|solicitar presupuesto|crear cuenta|registrarse|empezar ahora|invertir|operar ahora/i;

    assert(contract.forms === 0, `${label}: se encontró un formulario público`);
    assert(contract.registrationFields === 0, `${label}: se encontraron campos de registro`);
    assert(
      !contract.actions.some((action) => forbidden.test(action)),
      `${label}: CTA comercial contradictorio`,
    );
  };

  const motionMeasurements = [];
  for (const viewport of VIEWPORTS) {
    const label =
      viewport.width === 1440 ? 'desktop' : viewport.width === 390 ? 'mobile' : `${viewport.width}`;
    motionMeasurements.push(
      await captureMotionSequence(
        viewport,
        label,
        viewport.width === 1440 || viewport.width === 390,
      ),
    );
  }
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'brand-motion-measurements.json'),
    `${JSON.stringify(motionMeasurements, null, 2)}\n`,
  );

  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto(urlFor('/?motion=run&scroll-lock=1'), { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.brand-motion');
  await waitForMotionTime(520);
  await page.mouse.wheel({ deltaY: 700 });
  await delay(80);
  const lockedScroll = await page.evaluate(() => ({
    scrollY: window.scrollY,
    bodyOverflowY: getComputedStyle(document.body).overflowY,
    rootOverflow: getComputedStyle(document.documentElement).overflow,
  }));
  assert(lockedScroll.scrollY === 0, `El scroll-lock permitiÃ³ ${lockedScroll.scrollY}px`);
  assert(
    lockedScroll.bodyOverflowY === 'hidden' || lockedScroll.rootOverflow.includes('hidden'),
    'La intro no bloqueÃ³ overflow',
  );
  await page.waitForFunction(() => document.documentElement.dataset.brandMotionLanding, {
    timeout: 3500,
  });

  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await page.goto(urlFor('/?motion=run&keyboard=1'), { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.brand-motion');
  await page.keyboard.press('Tab');
  await page.waitForFunction(() => !document.querySelector('.brand-motion'));
  assert(
    await page.$eval('.skip-link', (link) => document.activeElement === link),
    'Tab no salto la intro ni llevo el foco al skip link',
  );

  await page.setViewport({ width: 1024, height: 768, deviceScaleFactor: 1 });
  await page.goto(urlFor('/?motion=run&resize=1'), { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.brand-motion');
  await page.setViewport({ width: 1000, height: 768, deviceScaleFactor: 1 });
  await page.waitForFunction(() => !document.querySelector('.brand-motion'));
  const resizeLanding = await page.evaluate(() =>
    JSON.parse(document.documentElement.dataset.brandMotionLanding),
  );
  assert(resizeLanding.reason === 'resize', 'Resize no completo inmediatamente el hand-off');

  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await goto('/');
  await assertNoOverflow('home desktop');
  await assertMeta('/');
  await assertInstitutionalContract('home');

  const homeContract = await page.evaluate(() => ({
    h1Label: document.querySelector('h1')?.getAttribute('aria-label'),
    h1Lines: Array.from(document.querySelectorAll('.hero__brand-title > span')).map((line) =>
      line.textContent.trim(),
    ),
    statement: document.querySelector('.hero__statement')?.textContent.trim(),
    heroEyebrowPresent: Boolean(document.querySelector('.hero__content > .eyebrow')),
    statusBarPresent: Boolean(document.querySelector('.status-bar')),
    unitLinks: Array.from(document.querySelectorAll('.unit-card')).map((link) =>
      link.getAttribute('href'),
    ),
    statusLabels: Array.from(document.querySelectorAll('.unit-card .status-badge')).map((badge) =>
      badge.textContent.replace(/\s+/g, ' ').trim(),
    ),
    oldSections: ['construccion', 'disponibilidad', 'roadmap'].filter((id) =>
      document.getElementById(id),
    ),
    purposePresent: Boolean(document.getElementById('proposito')),
    faqItems: document.querySelectorAll('#faq details').length,
    fontLoaded: document.fonts.check('16px Inter'),
    fontResourceLoaded: performance
      .getEntriesByType('resource')
      .some((entry) => entry.name.includes('/fonts/inter-latin.woff2')),
    navbar: (() => {
      const brand = document.querySelector('.navbar__brand').getBoundingClientRect();
      const links = document.querySelector('.navbar__links').getBoundingClientRect();
      const contact = document.querySelector('.navbar__cta').getBoundingClientRect();
      return {
        brandCenter: brand.left + brand.width / 2,
        linksCenter: links.left + links.width / 2,
        contactCenter: contact.left + contact.width / 2,
        brandOpacity: getComputedStyle(document.querySelector('.navbar__brand')).opacity,
      };
    })(),
    ecosystem: {
      holding: document.querySelector('.ecosystem-map__holding')?.textContent,
      units: document.querySelectorAll('.ecosystem-map__unit').length,
      connector: Boolean(document.querySelector('.ecosystem-map__bridge svg path')),
      statusCount: document.querySelectorAll('.ecosystem-map .status-badge, .ecosystem-map__status')
        .length,
      unitStyles: Array.from(document.querySelectorAll('.ecosystem-map__unit')).map((unit) => ({
        background: getComputedStyle(unit).backgroundColor,
        borderColor: getComputedStyle(unit).borderColor,
        borderStyle: getComputedStyle(unit).borderStyle,
      })),
    },
    unitCards: Array.from(document.querySelectorAll('.unit-card')).map((card) => {
      const rect = card.getBoundingClientRect();
      return {
        id: card.getAttribute('href'),
        y: rect.y,
        height: rect.height,
        background: getComputedStyle(card).backgroundColor,
        color: getComputedStyle(card).color,
        borderColor: getComputedStyle(card).borderColor,
        borderRadius: getComputedStyle(card).borderRadius,
        padding: getComputedStyle(card).padding,
      };
    }),
    navbarText: document.querySelector('.navbar__links')?.textContent.replace(/\s+/g, ' ').trim(),
    unitsTrigger: {
      text: document.querySelector('.navbar__units-button')?.textContent.trim(),
      childCount: document.querySelector('.navbar__units-button')?.childElementCount,
    },
    compliance: {
      background: getComputedStyle(document.querySelector('.compliance-summary')).backgroundColor,
      unitStyles: Array.from(document.querySelectorAll('.compliance-unit')).map((unit) => ({
        background: getComputedStyle(unit).backgroundColor,
        color: getComputedStyle(unit).color,
        borderColor: getComputedStyle(unit).borderColor,
      })),
    },
    buttonRadii: [
      getComputedStyle(document.querySelector('.hero .button--light')).borderRadius,
      getComputedStyle(document.querySelector('.hero .button--outline-light')).borderRadius,
    ],
    palette: {
      primary: getComputedStyle(document.documentElement)
        .getPropertyValue('--color-brand-primary')
        .trim(),
      hover: getComputedStyle(document.documentElement)
        .getPropertyValue('--color-brand-primary-hover')
        .trim(),
      active: getComputedStyle(document.documentElement)
        .getPropertyValue('--color-brand-primary-active')
        .trim(),
      legacyPrimary: getComputedStyle(document.documentElement).getPropertyValue('--primary').trim(),
    },
    schemaTypes: Array.from(
      document.querySelectorAll('script[type="application/ld+json"]'),
    ).flatMap((script) => {
      const data = JSON.parse(script.textContent);
      return data['@graph']?.map((item) => item['@type']) || [data['@type']];
    }),
  }));
  assert(
    homeContract.h1Label === 'We Build What Moves Business' &&
      homeContract.h1Lines.join(' / ') === 'We Build What / Moves Business',
    'El hero no conserva el slogan estructural en dos lÃ­neas',
  );
  assert(
    homeContract.statement ===
      'Conectamos capacidades para convertir ideas en soluciones con visión de largo plazo.',
    'El hero no comunica el statement institucional esperado',
  );
  assert(!homeContract.heroEyebrowPresent, 'El hero conserva la tercera mención de marca');
  assert(!homeContract.statusBarPresent, 'El cartel superior sigue montado');
  assert(
    ['/forge', '/prospect', '/commerce'].every((route) => homeContract.unitLinks.includes(route)),
    'Falta una ruta de unidad en el ecosistema',
  );
  assert(homeContract.statusLabels.length === 0, 'Las cards todavía muestran badges de estado');
  assert(
    homeContract.oldSections.length === 0 && homeContract.purposePresent,
    `Secciones obsoletas o propósito ausente: ${JSON.stringify(homeContract.oldSections)}`,
  );
  assert(homeContract.faqItems >= 10, 'La home no expone la FAQ institucional completa');
  assert(
    homeContract.fontLoaded && homeContract.fontResourceLoaded,
    'Inter local no cargo o no se uso',
  );
  assert(homeContract.navbar.brandOpacity === '1', 'La marca no es visible en la navbar');
  assert(
    homeContract.navbar.brandCenter < homeContract.navbar.linksCenter &&
      Math.abs(homeContract.navbar.linksCenter - 720) <= 2 &&
      homeContract.navbar.contactCenter > homeContract.navbar.linksCenter,
    `Distribucion incorrecta de navbar: ${JSON.stringify(homeContract.navbar)}`,
  );
  assert(
    homeContract.ecosystem.holding.includes('Blue Sky Group') &&
      homeContract.ecosystem.units === 3 &&
      homeContract.ecosystem.connector &&
      homeContract.ecosystem.statusCount === 0,
    'El mapa del ecosistema no representa holding, conexiones y tres unidades',
  );
  assert(
    homeContract.ecosystem.unitStyles.every(
      (style) =>
        style.background === homeContract.ecosystem.unitStyles[0].background &&
        style.borderColor === homeContract.ecosystem.unitStyles[0].borderColor &&
        style.borderStyle === homeContract.ecosystem.unitStyles[0].borderStyle,
    ),
    `Los nodos del ecosistema no comparten tratamiento: ${JSON.stringify(
      homeContract.ecosystem.unitStyles,
    )}`,
  );
  assert(
    Math.max(...homeContract.unitCards.map((card) => card.y)) -
        Math.min(...homeContract.unitCards.map((card) => card.y)) <=
      1 &&
      Math.max(...homeContract.unitCards.map((card) => card.height)) -
        Math.min(...homeContract.unitCards.map((card) => card.height)) <=
        1,
    `Las cards no están alineadas: ${JSON.stringify(homeContract.unitCards)}`,
  );
  assert(
    homeContract.unitCards.every(
      (card) =>
        card.background === homeContract.unitCards[0].background &&
        card.color === homeContract.unitCards[0].color &&
        card.borderColor === homeContract.unitCards[0].borderColor &&
        card.borderRadius === homeContract.unitCards[0].borderRadius &&
        card.padding === homeContract.unitCards[0].padding,
    ) && homeContract.unitCards[0].background === 'rgb(255, 255, 255)',
    `Las tres cards no comparten el mismo tratamiento: ${JSON.stringify(
      homeContract.unitCards,
    )}`,
  );
  assert(
    homeContract.compliance.background === 'rgb(6, 111, 238)' &&
      homeContract.compliance.unitStyles.every(
        (style) =>
          style.background === homeContract.compliance.unitStyles[0].background &&
          style.color === homeContract.compliance.unitStyles[0].color &&
          style.borderColor === homeContract.compliance.unitStyles[0].borderColor,
      ),
    `Compliance no respeta el azul oficial o conserva cards divergentes: ${JSON.stringify(
      homeContract.compliance,
    )}`,
  );
  assert(
    homeContract.navbarText.includes('Propósito') &&
      !homeContract.navbarText.includes('Estado') &&
      !homeContract.navbarText.includes('Qué construimos'),
    `La navegación conserva enlaces obsoletos: ${homeContract.navbarText}`,
  );
  assert(
    homeContract.buttonRadii[0] !== homeContract.buttonRadii[1],
    'Los CTA principales y secundarios usan la misma geometria',
  );
  assert(
    homeContract.palette.primary === '#066fee' &&
      homeContract.palette.hover === '#066fee' &&
      homeContract.palette.active === '#066fee' &&
      homeContract.palette.legacyPrimary === '',
    `Paleta de marca inesperada: ${JSON.stringify(homeContract.palette)}`,
  );
  assert(
    homeContract.unitsTrigger.text === 'Unidades' &&
      homeContract.unitsTrigger.childCount === 0,
    `El trigger de Unidades conserva un indicador: ${JSON.stringify(
      homeContract.unitsTrigger,
    )}`,
  );
  assert(
    homeContract.schemaTypes.includes('Organization') &&
      homeContract.schemaTypes.includes('WebSite') &&
      !homeContract.schemaTypes.includes('Service'),
    'El schema institucional es incorrecto',
  );
  await screenshot('desktop-home');
  await screenshot('desktop-home-full', { fullPage: true });
  await page.click('.hero__actions a[href="/#unidades"]');
  await page.waitForFunction(() => window.location.hash === '#unidades' && window.scrollY > 100);
  await goto('/');
  await page.click('.hero__actions a[href="/contacto"]');
  await page.waitForFunction(() => window.location.pathname === '/contacto');
  await goto('/');
  await page.evaluate(() => window.scrollTo(0, 420));
  await delay(240);
  const scrolledBrandContract = await page.evaluate(() => {
    const navbar = document.querySelector('.navbar');
    return {
      scrolled: navbar.classList.contains('navbar--scrolled'),
      brandOpacity: getComputedStyle(document.querySelector('.navbar__brand')).opacity,
      background: getComputedStyle(navbar).backgroundColor,
    };
  });
  assert(scrolledBrandContract.scrolled, 'La navbar no adopta su estado de scroll');
  assert(scrolledBrandContract.brandOpacity === '1', 'La marca pierde visibilidad al hacer scroll');
  assert(
    scrolledBrandContract.background === 'rgb(6, 111, 238)',
    `La navbar no usa el azul oficial: ${scrolledBrandContract.background}`,
  );
  await screenshot('desktop-hero-scrolled', {
    clip: { x: 0, y: 0, width: 1440, height: 620 },
  });
  await screenshot('desktop-navbar-scrolled', {
    clip: { x: 0, y: 0, width: 1440, height: 150 },
  });
  await page.evaluate(() => window.scrollTo(0, 0));
  await delay(120);

  await page.hover('.navbar__units-button');
  await page.waitForFunction(
    () => getComputedStyle(document.querySelector('.navbar__dropdown')).opacity === '1',
  );
  await delay(230);
  await page.hover('.navbar__units-button');
  const dropdownContract = await page.evaluate(() => ({
    opacity: getComputedStyle(document.querySelector('.navbar__dropdown')).opacity,
    links: document.querySelectorAll('.navbar__dropdown-link').length,
    badges: document.querySelectorAll('.navbar__dropdown .status-badge').length,
    text: document.querySelector('.navbar__dropdown').textContent.replace(/\s+/g, ' ').trim(),
  }));
  assert(dropdownContract.opacity === '1', 'El dropdown no alcanzó opacidad estable');
  assert(dropdownContract.links === 3, 'El dropdown no muestra las tres iniciativas');
  assert(
    dropdownContract.badges === 0 &&
      !/en desarrollo|exploración conceptual/i.test(dropdownContract.text),
    `El dropdown conserva estados operativos: ${dropdownContract.text}`,
  );
  await screenshot('desktop-dropdown-unidades', {
    clip: { x: 0, y: 0, width: 1440, height: 520 },
  });
  await page.focus('.navbar__units-button');
  await page.waitForFunction(
    () =>
      document.querySelector('.navbar__units-button').ariaExpanded === 'true' &&
      getComputedStyle(document.querySelector('.navbar__dropdown')).opacity === '1',
  );
  await page.keyboard.press('Escape');
  await page.waitForFunction(
    () => document.querySelector('.navbar__units-button').ariaExpanded === 'false',
  );
  assert(
    await page.$eval('.navbar__units-button', (button) => document.activeElement === button),
    'Escape no devolvio el foco al trigger del dropdown',
  );
  await page.click('.navbar__units-button');
  await page.waitForFunction(
    () => document.querySelector('.navbar__units-button').ariaExpanded === 'true',
  );
  await page.click('.hero__brand-title');
  await page.waitForFunction(
    () => document.querySelector('.navbar__units-button').ariaExpanded === 'false',
  );
  await page.click('.navbar__units-button');
  await page.waitForFunction(
    () => document.querySelector('.navbar__units-button').ariaExpanded === 'true',
  );
  await page.click('.navbar__dropdown-link[href="/forge"]');
  await page.waitForFunction(() => window.location.pathname === '/forge');
  await goto('/');

  for (const route of ROUTES.slice(1)) {
    await goto(route);
    await assertNoOverflow(`${route} desktop`);
    await assertMeta(route);
    await assertInstitutionalContract(route);
    await screenshot(`desktop-${routeName(route)}`);
  }

  const unitVisuals = [];
  for (const route of ['/forge', '/prospect', '/commerce']) {
    await goto(route);
    const unitContract = await page.evaluate(() => ({
      h1Count: document.querySelectorAll('h1').length,
      status: document.querySelector('.unit-hero__state strong')?.textContent.trim(),
      badgeCount: document.querySelectorAll('.unit-hero .status-badge, .unit-final-cta .status-badge')
        .length,
      serviceSchemas: Array.from(
        document.querySelectorAll('script[type="application/ld+json"]'),
      ).filter((script) => JSON.parse(script.textContent)['@type'] === 'Service').length,
      finalActions: Array.from(document.querySelectorAll('.unit-final-cta a')).map((link) =>
        link.textContent.replace(/\s+/g, ' ').trim(),
      ),
      heroBackground: getComputedStyle(document.querySelector('.unit-hero')).backgroundColor,
      finalBackground: getComputedStyle(document.querySelector('.unit-final-cta')).backgroundColor,
    }));
    assert(unitContract.h1Count === 1, `${route}: debe existir un solo h1`);
    assert(unitContract.status, `${route}: falta el estado contextual cerca del título`);
    assert(unitContract.badgeCount === 0, `${route}: conserva badges de estado redundantes`);
    assert(unitContract.serviceSchemas === 0, `${route}: no debe declarar schema Service`);
    assert(
      unitContract.finalActions.includes('Leer compliance') &&
        unitContract.finalActions.some((action) =>
          ['Realizar una consulta', 'Conversar sobre un proyecto'].includes(action),
        ),
      `${route}: cierre institucional incompleto`,
    );
    unitVisuals.push({ route, ...unitContract });
  }
  const forgeVisual = unitVisuals.find((unit) => unit.route === '/forge');
  const prospectVisual = unitVisuals.find((unit) => unit.route === '/prospect');
  const commerceVisual = unitVisuals.find((unit) => unit.route === '/commerce');
  assert(
    forgeVisual.heroBackground === 'rgb(6, 111, 238)' &&
      prospectVisual.heroBackground === forgeVisual.heroBackground &&
      prospectVisual.finalBackground === forgeVisual.finalBackground,
    `Forge y Prospect no comparten el azul oficial: ${JSON.stringify(unitVisuals)}`,
  );
  assert(
    commerceVisual.heroBackground === 'rgb(10, 10, 10)' &&
      commerceVisual.finalBackground === 'rgb(10, 10, 10)',
    `Commerce no conserva la variante negra: ${JSON.stringify(commerceVisual)}`,
  );

  await goto('/estado-y-alcance');
  const scopeContract = await page.evaluate(() => ({
    text: document.querySelector('#main-content').textContent.replace(/\s+/g, ' '),
    heroBackground: getComputedStyle(document.querySelector('.content-page__hero')).backgroundColor,
    unitStyles: Array.from(document.querySelectorAll('.compliance-unit')).map((unit) => ({
      background: getComputedStyle(unit).backgroundColor,
      color: getComputedStyle(unit).color,
      borderColor: getComputedStyle(unit).borderColor,
      borderRadius: getComputedStyle(unit).borderRadius,
      padding: getComputedStyle(unit).padding,
    })),
  }));
  const scopeText = scopeContract.text;
  assert(
    scopeContract.heroBackground === 'rgb(6, 111, 238)' &&
      scopeContract.unitStyles.every(
        (style) =>
          style.background === scopeContract.unitStyles[0].background &&
          style.color === scopeContract.unitStyles[0].color &&
          style.borderColor === scopeContract.unitStyles[0].borderColor &&
          style.borderRadius === scopeContract.unitStyles[0].borderRadius &&
          style.padding === scopeContract.unitStyles[0].padding,
      ),
    `Compliance conserva azules o cards divergentes: ${JSON.stringify(scopeContract)}`,
  );
  for (const statement of [
    'Forge recibe consultas y evalúa posibles proyectos',
    'Prospect continúa en desarrollo',
    'Commerce es una iniciativa futura',
    'La formalización de Forge requiere evaluación',
    'El sitio no procesa pagos',
    'no constituye asesoramiento jurídico',
  ]) {
    assert(scopeText.toLowerCase().includes(statement.toLowerCase()), `Falta alcance: ${statement}`);
  }

  await goto('/contacto');
  const contactContract = await page.evaluate(() => ({
    categoryCount: document.querySelectorAll('.contact-options__grid article').length,
    messages: Array.from(document.querySelectorAll('a[href^="https://wa.me/"]')).map((link) =>
      decodeURIComponent(link.href),
    ),
  }));
  assert(contactContract.categoryCount === 3, 'Contacto no muestra las tres categorías');
  assert(
    contactContract.messages.some((message) => message.includes('consulta de prensa')) &&
      contactContract.messages.some((message) => message.includes('alianza institucional')),
    'Los mensajes institucionales no conservan la categoría',
  );
  assert(
    contactContract.messages.every(
      (message) =>
        message.includes('Página de origen: /contacto') &&
        !/presupuesto|contratar|demo/i.test(message),
    ),
    'El contacto externo perdió origen o contiene intención comercial',
  );

  await goto('/');
  await page.focus('#contratacion summary');
  await page.keyboard.press('Enter');
  assert(await page.$eval('#contratacion', (details) => details.open), 'FAQ no abre por teclado');

  await goto('/ruta-inexistente');
  const robots404 = await page.$eval('meta[name="robots"]', (element) => element.content);
  assert(robots404 === 'noindex, follow', 'La página 404 debe ser noindex, follow');
  await screenshot('desktop-404');

  for (const legacy of ['forge', 'prospect', 'commerce']) {
    await page.goto(urlFor(`/#${legacy}`), { waitUntil: 'networkidle0' });
    await page.waitForFunction((slug) => window.location.pathname === `/${slug}`, {}, legacy);
    assert(
      new URL(page.url()).pathname === `/${legacy}`,
      `El redirect legado #${legacy} falló`,
    );
  }

  await goto('/');
  await page.evaluate(() => window.scrollTo(0, 900));
  await delay(100);
  const savedScroll = await page.evaluate(() => window.scrollY);
  await page.evaluate(() => document.querySelector('.unit-card[href="/forge"]').click());
  await page.waitForFunction(() => window.location.pathname === '/forge');
  await page.waitForFunction(() => window.scrollY <= 2);
  await page.evaluate(() => window.history.back());
  await page.waitForFunction(() => window.location.pathname === '/');
  await delay(150);
  const restoredScroll = await page.evaluate(() => window.scrollY);
  assert(
    Math.abs(restoredScroll - savedScroll) <= 2,
    `El scroll no se restauró: ${restoredScroll}px vs ${savedScroll}px`,
  );

  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await goto('/');
  await assertNoOverflow('home mobile');
  await screenshot('mobile-home');
  await screenshot('mobile-home-full', { fullPage: true });
  await page.evaluate(() => window.scrollTo(0, 420));
  await delay(240);
  await screenshot('mobile-hero-scrolled');
  await page.evaluate(() => window.scrollTo(0, 0));
  await delay(120);
  await page.click('.navbar__toggle');
  await page.waitForSelector('.mobile-menu--open');
  await delay(450);
  const mobileContract = await page.evaluate(() => ({
    expanded: document.querySelector('.navbar__toggle').ariaExpanded,
    mainInert: document.querySelector('main').inert,
    activeText: document.activeElement?.textContent.replace(/\s+/g, ' ').trim(),
    unitsSummary: {
      text: document
        .querySelector('.mobile-menu__units > summary')
        .textContent.replace(/\s+/g, ' ')
        .trim(),
      childCount: document.querySelector('.mobile-menu__units > summary').childElementCount,
    },
    touchTargets: Array.from(
      document.querySelectorAll(
        '.navbar__cta, .navbar__toggle, .mobile-menu a, .mobile-menu summary',
      ),
    )
      .filter((element) => element.getBoundingClientRect().width > 0)
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return { label: element.textContent.trim(), width: rect.width, height: rect.height };
      }),
  }));
  assert(mobileContract.expanded === 'true', 'El menú mobile no actualizó aria-expanded');
  assert(mobileContract.mainInert, 'El contenido principal no quedó inert');
  assert(
    mobileContract.touchTargets.some((target) => target.label === 'Contacto'),
    'El acceso visible a contacto se perdió en mobile',
  );
  assert(
    mobileContract.activeText.includes('Grupo'),
    `El foco no entró al menú mobile: ${mobileContract.activeText}`,
  );
  assert(
    mobileContract.touchTargets.every((target) => target.width >= 44 && target.height >= 44),
    `Area tactil menor a 44px: ${JSON.stringify(mobileContract.touchTargets)}`,
  );
  assert(
    mobileContract.unitsSummary.text === '02Unidades' &&
      mobileContract.unitsSummary.childCount === 1,
    `Unidades conserva un indicador mobile: ${JSON.stringify(mobileContract.unitsSummary)}`,
  );
  await page.click('.mobile-menu__units > summary');
  assert(
    await page.$eval('.mobile-menu__units', (details) => details.open),
    'El acordeón de unidades no abre',
  );
  await screenshot('mobile-menu-open');
  await page.keyboard.press('Escape');
  await page.waitForFunction(
    () => !document.querySelector('.mobile-menu').classList.contains('mobile-menu--open'),
  );
  assert(
    await page.$eval('.navbar__toggle', (toggle) => document.activeElement === toggle),
    'El foco no volvió al disparador del menú',
  );

  await page.click('.navbar__toggle');
  await page.waitForSelector('.mobile-menu--open');
  await page.$eval('.mobile-menu__units', (details) => {
    details.open = true;
  });
  await page.click('.mobile-menu__unit[href="/forge"]');
  await page.waitForFunction(() => window.location.pathname === '/forge');
  assert(
    await page.$eval('.mobile-menu', (menu) => !menu.classList.contains('mobile-menu--open')),
    'El menu mobile no cierra al seleccionar una unidad',
  );

  for (const route of ['/forge', '/prospect', '/commerce', '/estado-y-alcance', '/contacto']) {
    await goto(route);
    await assertNoOverflow(`${route} mobile`);
    await screenshot(`mobile-${routeName(route)}`);
  }

  for (const viewport of VIEWPORTS) {
    await page.setViewport({ ...viewport, deviceScaleFactor: 1 });
    await goto('/');
    await assertNoOverflow(`home ${viewport.width}`);
    await screenshot(`viewport-${viewport.width}-home`);

    await goto('/estado-y-alcance');
    await assertNoOverflow(`estado ${viewport.width}`);
  }

  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await goto('/');
  const reducedContract = await page.evaluate(() => ({
    active: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
    heroDuration: getComputedStyle(document.querySelector('.hero__content')).animationDuration,
    brandMotion: Boolean(document.querySelector('.brand-motion')),
    brandAnimating: document.documentElement.classList.contains('is-brand-animating'),
    bodyOverflowY: getComputedStyle(document.body).overflowY,
  }));
  assert(reducedContract.active, 'prefers-reduced-motion no quedó activo');
  assert(reducedContract.scrollBehavior === 'auto', 'Reduced motion no desactivó smooth scroll');
  assert(
    Number.parseFloat(reducedContract.heroDuration) <= 0.01,
    'Reduced motion no redujo la animación del hero',
  );
  assert(!reducedContract.brandMotion, 'Reduced motion monto BrandMotion');
  assert(!reducedContract.brandAnimating, 'Reduced motion dejo activa la clase de intro');
  assert(
    reducedContract.bodyOverflowY !== 'hidden',
    'Reduced motion dejo el scroll bloqueado',
  );
  await screenshot('reduced-motion-home');

  await page.setJavaScriptEnabled(false);
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto(urlFor('/'), { waitUntil: 'networkidle0' });
  assert(await page.$('noscript'), 'Falta fallback sin JavaScript');
  const noScriptText = await page.$eval('noscript', (element) =>
    element.textContent.replace(/\s+/g, ' ').trim(),
  );
  const noScriptEyebrow = await page.$('noscript .noscript-hero strong');
  assert(
    noScriptText.includes('Forge') &&
      noScriptText.includes('consultas') &&
      !noScriptEyebrow,
    'El fallback sin JavaScript conserva la narrativa anterior',
  );
  await screenshot('desktop-no-js');
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await page.goto(urlFor('/'), { waitUntil: 'networkidle0' });
  await screenshot('mobile-no-js');

  assert(consoleErrors.length === 0, `Errores de consola:\n${consoleErrors.join('\n')}`);
  assert(networkErrors.length === 0, `Errores de red:\n${networkErrors.join('\n')}`);

  await browser.close();
  activeBrowser = null;
  console.log(`Capturas y smoke tests completados en ${OUTPUT_DIR}`);
})().catch((error) => {
  console.error(error);
  activeBrowser?.close().catch(() => {});
  process.exitCode = 1;
});
