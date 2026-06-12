const puppeteer = require('puppeteer');
const fs = require('fs');

// Alias: guarda la misma captura bajo un segundo nombre requerido
const alias = (from, to) => {
  const src = `review-screenshots/${from}.png`;
  if (fs.existsSync(src)) fs.copyFileSync(src, `review-screenshots/${to}.png`);
};

(async () => {
  const browser = await puppeteer.launch({
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
  });
  const page = await browser.newPage();
  
  // Ensure the page is fully loaded, including CSS
  await page.goto('http://localhost:5174', { waitUntil: 'networkidle0' });

  const takeScreenshot = async (name, clip) => {
    if (clip) {
      await page.screenshot({ path: `review-screenshots/${name}.png`, clip });
    } else {
      await page.screenshot({ path: `review-screenshots/${name}.png`, fullPage: true });
    }
  };

  const getElementClip = async (selector) => {
    const el = await page.$(selector);
    if (!el) return null;
    return await el.boundingBox();
  };

  const captureAfterReload = async (name, delay, clip) => {
    await page.reload({ waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, delay));
    await takeScreenshot(name, clip);
  };

  // --- DESKTOP ---
  await page.setViewport({ width: 1440, height: 900 });
  // Capture splash while it is on screen (hides at ~1.2s)
  await page.reload({ waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 900));
  await takeScreenshot('desktop-splash', { x: 0, y: 0, width: 1440, height: 900 });
  alias('desktop-splash', 'desktop-intro');

  await captureAfterReload('desktop-flip-1300', 1300, { x: 0, y: 0, width: 1440, height: 900 });
  await captureAfterReload('desktop-flip-1500', 1500, { x: 0, y: 0, width: 1440, height: 900 });
  await captureAfterReload('desktop-flip-1700', 1700, { x: 0, y: 0, width: 1440, height: 900 });

  await new Promise(r => setTimeout(r, 2000)); // Wait for IntroSplash to complete

  // Desktop sections
  await takeScreenshot('desktop-full-page');
  await takeScreenshot('desktop-hero', await getElementClip('.hero'));
  alias('desktop-hero', 'desktop-hero-after-intro');
  // Navbar at top-of-page (no brand) — fixed element, screenshot the element
  {
    const nav = await page.$('.navbar');
    if (nav) await nav.screenshot({ path: 'review-screenshots/desktop-navbar.png' });
  }
  // Scrolled state: brand appears left, links center, CTA right
  await page.evaluate(() => window.scrollTo(0, 600));
  await new Promise(r => setTimeout(r, 600));
  {
    const nav = await page.$('.navbar');
    if (nav) {
      await nav.screenshot({ path: 'review-screenshots/desktop-hero-scrolled.png' });
      await nav.screenshot({ path: 'review-screenshots/desktop-navbar-scrolled.png' });
    }
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 400));
  await takeScreenshot('desktop-que-es', await getElementClip('#que-es'));
  await takeScreenshot('desktop-prospect', await getElementClip('#blue-sky-prospect'));
  await takeScreenshot('desktop-agent-system', await getElementClip('#agent-system'));
  await takeScreenshot('desktop-commerce', await getElementClip('#blue-sky-commerce'));
  await takeScreenshot('desktop-contacto', await getElementClip('#contacto'));

  // Desktop dropdown
  await page.hover('.navbar__link--has-dropdown');
  await new Promise(r => setTimeout(r, 1000));
  await page.hover('.navbar__link--has-dropdown');
  await page.waitForFunction(() => {
    const dropdown = document.querySelector('.navbar__dropdown');
    return dropdown && getComputedStyle(dropdown).opacity === '1';
  });
  // Capture the top part showing the navbar and dropdown
  await takeScreenshot('desktop-dropdown-servicios', { x: 0, y: 0, width: 1440, height: 400 });

  // --- MOBILE ---
  await page.setViewport({ width: 390, height: 844 });
  // Capture mobile splash
  await page.reload({ waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 900));
  await takeScreenshot('mobile-splash', { x: 0, y: 0, width: 390, height: 844 });
  alias('mobile-splash', 'mobile-intro');

  await captureAfterReload('mobile-flip-1300', 1300, { x: 0, y: 0, width: 390, height: 844 });
  await captureAfterReload('mobile-flip-1500', 1500, { x: 0, y: 0, width: 390, height: 844 });
  await captureAfterReload('mobile-flip-1700', 1700, { x: 0, y: 0, width: 390, height: 844 });

  await page.reload({ waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 2200));

  // Mobile scrolled state (header) — fixed element
  await page.evaluate(() => window.scrollTo(0, 600));
  await new Promise(r => setTimeout(r, 600));
  {
    const nav = await page.$('.navbar');
    if (nav) await nav.screenshot({ path: 'review-screenshots/mobile-hero-scrolled.png' });
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 400));

  // Mobile sections
  await takeScreenshot('mobile-full-page');
  await takeScreenshot('mobile-hero', await getElementClip('.hero'));
  alias('mobile-hero', 'mobile-hero-after-intro');
  await takeScreenshot('mobile-que-es', await getElementClip('#que-es'));
  await takeScreenshot('mobile-prospect', await getElementClip('#blue-sky-prospect'));
  await takeScreenshot('mobile-agent-system', await getElementClip('#agent-system'));
  await takeScreenshot('mobile-commerce', await getElementClip('#blue-sky-commerce'));
  await takeScreenshot('mobile-contacto', await getElementClip('#contacto'));

  // Mobile menu
  await page.click('.navbar__hamburger');
  await new Promise(r => setTimeout(r, 500));
  await takeScreenshot('mobile-menu-servicios', { x: 0, y: 0, width: 390, height: 844 });
  alias('mobile-menu-servicios', 'mobile-menu-open');

  await browser.close();
  console.log('Screenshots captured successfully!');
})();
