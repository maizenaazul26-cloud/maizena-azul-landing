import { useCallback, useEffect, useRef, useState } from 'react';
import './BrandMotion.css';

const EASING = 'cubic-bezier(0.22, 1, 0.36, 1)';
const FONT_READY_TIMEOUT = 800;
const INTRO_DURATION = 1100;
const PULSE_DURATION = 500;
const FLIP_DURATION = 800;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const waitForFonts = () => {
  if (typeof document === 'undefined' || !document.fonts?.ready) {
    return Promise.resolve();
  }

  return Promise.race([
    document.fonts.ready,
    new Promise((resolve) => {
      window.setTimeout(resolve, FONT_READY_TIMEOUT);
    }),
  ]);
};

export default function BrandMotion() {
  const [phase, setPhase] = useState(() => (
    prefersReducedMotion() ? 'removed' : 'intro'
  ));
  const textRef = useRef(null);
  const timersRef = useRef([]);
  const previousOverflowRef = useRef('');
  const previousHtmlOverflowRef = useRef('');
  const finishedRef = useRef(false);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
  }, []);

  const unlockScroll = useCallback(() => {
    document.body.style.overflow = previousOverflowRef.current;
    document.documentElement.style.overflow = previousHtmlOverflowRef.current;
  }, []);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    clearTimers();

    const heroTitle = document.querySelector('.hero__title');
    if (heroTitle) {
      heroTitle.style.transition = 'none';
    }

    document.documentElement.classList.remove('is-brand-animating');
    unlockScroll();
    setPhase('removed');

    if (heroTitle) {
      void heroTitle.offsetHeight;
      window.requestAnimationFrame(() => {
        heroTitle.style.transition = '';
      });
    }
  }, [clearTimers, unlockScroll]);

  const measureGlyphs = useCallback((el) => {
    const lineRects = [...el.querySelectorAll('.brand-motion__line')]
      .map((line) => line.getBoundingClientRect());

    if (!lineRects.length) return el.getBoundingClientRect();

    const left = Math.min(...lineRects.map((rect) => rect.left));
    const top = Math.min(...lineRects.map((rect) => rect.top));
    const right = Math.max(...lineRects.map((rect) => rect.right));
    const bottom = Math.max(...lineRects.map((rect) => rect.bottom));

    return {
      left,
      top,
      width: right - left,
      height: bottom - top,
    };
  }, []);

  const getHeroRect = useCallback(() => {
    const heroTitle = document.querySelector('.hero__title');
    return heroTitle?.getBoundingClientRect() ?? null;
  }, []);

  const prepareIntro = useCallback(() => {
    const el = textRef.current;
    const heroRect = getHeroRect();
    if (!el || !heroRect) return false;

    el.style.left = `${heroRect.left}px`;
    el.style.top = `${heroRect.top}px`;
    el.style.width = `${heroRect.width}px`;
    el.style.transition = 'none';
    el.style.transformOrigin = 'left top';
    el.style.transform = 'none';
    el.style.opacity = '0';

    void el.offsetHeight;

    const glyphRect = measureGlyphs(el);
    const targetCoverage = window.innerWidth <= 768 ? 0.88 : 0.76;
    const maxScale = window.innerWidth <= 768 ? 1.08 : 1.55;
    const introScale = Math.min(
      maxScale,
      Math.max(1, (window.innerWidth * targetCoverage) / glyphRect.width)
    );
    const introLeft = (window.innerWidth - glyphRect.width * introScale) / 2;
    const introTop = (window.innerHeight - glyphRect.height * introScale) / 2;
    const dx = introLeft - heroRect.left;
    const dy = introTop - heroRect.top;
    const introTransform = `translate(${dx}px, ${dy}px) scale(${introScale})`;

    el.dataset.introTransform = introTransform;
    el.style.transform = `translate(${dx}px, ${dy}px) scale(${introScale * 0.96})`;

    window.requestAnimationFrame(() => {
      if (finishedRef.current || !textRef.current) return;
      textRef.current.style.transition = [
        `transform ${PULSE_DURATION}ms ${EASING}`,
        `opacity ${PULSE_DURATION}ms ${EASING}`,
      ].join(', ');
      textRef.current.style.transform = introTransform;
      textRef.current.style.opacity = '1';
    });

    return true;
  }, [getHeroRect, measureGlyphs]);

  const startFlip = useCallback(() => {
    const el = textRef.current;
    const heroRect = getHeroRect();
    if (!el || !heroRect) {
      finish();
      return;
    }

    el.style.left = `${heroRect.left}px`;
    el.style.top = `${heroRect.top}px`;
    el.style.width = `${heroRect.width}px`;
    el.style.transition = `transform ${FLIP_DURATION}ms ${EASING}`;
    el.style.transform = 'none';
    setPhase('toHero');

    const onTransitionEnd = (event) => {
      if (event.target === el && event.propertyName === 'transform') {
        el.removeEventListener('transitionend', onTransitionEnd);
        finish();
      }
    };

    el.addEventListener('transitionend', onTransitionEnd);
    timersRef.current.push(window.setTimeout(() => {
      el.removeEventListener('transitionend', onTransitionEnd);
      finish();
    }, FLIP_DURATION + 80));
  }, [finish, getHeroRect]);

  useEffect(() => {
    if (prefersReducedMotion()) {
      document.documentElement.classList.add('is-intro-complete');
      return undefined;
    }

    let cancelled = false;
    finishedRef.current = false;
    previousOverflowRef.current = document.body.style.overflow;
    previousHtmlOverflowRef.current = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.classList.add('is-brand-animating');

    const handleResize = () => {
      finish();
    };

    window.addEventListener('resize', handleResize);

    waitForFonts().then(() => {
      if (cancelled || finishedRef.current) return;
      if (!prepareIntro()) {
        finish();
        return;
      }
      timersRef.current.push(window.setTimeout(startFlip, INTRO_DURATION));
    });

    return () => {
      cancelled = true;
      window.removeEventListener('resize', handleResize);
      clearTimers();
      document.documentElement.classList.remove('is-brand-animating');
      unlockScroll();
    };
  }, [clearTimers, finish, prepareIntro, startFlip, unlockScroll]);

  if (phase === 'removed') return null;

  return (
    <div className={`brand-motion brand-motion--${phase}`} aria-hidden="true">
      <div className="brand-motion__text" ref={textRef}>
        <span className="brand-motion__line">Blue Sky</span>
        <span className="brand-motion__line">Group</span>
      </div>
    </div>
  );
}
