import { useLayoutEffect, useRef } from 'react';
import { BRAND_MOTION_EASING, BRAND_MOTION_TIMING } from '../constants/motion';
import './BrandMotion.css';

function rectSnapshot(rect) {
  return {
    x: rect.x,
    y: rect.y,
    width: rect.width,
    height: rect.height,
  };
}

function transformFor(x, y, scale) {
  return `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
}

export default function BrandMotion({ onComplete }) {
  const overlayRef = useRef(null);
  const backdropRef = useRef(null);
  const titleRef = useRef(null);

  useLayoutEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    const overlay = overlayRef.current;
    const backdrop = backdropRef.current;
    const title = titleRef.current;
    const target = document.querySelector('.hero__brand-title');
    const startedAt = performance.now();
    const timers = new Set();
    let active = true;
    let completed = false;

    const previousStyles = {
      rootOverflow: root.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyPaddingRight: body.style.paddingRight,
    };

    const restorePage = () => {
      root.style.overflow = previousStyles.rootOverflow;
      body.style.overflow = previousStyles.bodyOverflow;
      body.style.paddingRight = previousStyles.bodyPaddingRight;
    };

    const schedule = (callback, delay) => {
      const timer = window.setTimeout(() => {
        timers.delete(timer);
        callback();
      }, delay);
      timers.add(timer);
      return timer;
    };

    const clearTimers = () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      timers.clear();
    };

    const complete = (reason = 'transitionend') => {
      if (!active || completed) return;
      completed = true;
      clearTimers();

      const animatedRect = title?.getBoundingClientRect();
      const targetRect = target?.getBoundingClientRect();
      if (animatedRect && targetRect) {
        const landing = {
          reason,
          animated: rectSnapshot(animatedRect),
          target: rectSnapshot(targetRect),
          delta: {
            x: animatedRect.x - targetRect.x,
            y: animatedRect.y - targetRect.y,
            width: animatedRect.width - targetRect.width,
            height: animatedRect.height - targetRect.height,
          },
        };
        window.__bsgBrandMotionLanding = landing;
        root.dataset.brandMotionLanding = JSON.stringify(landing);
      }

      if (title) title.style.visibility = 'hidden';
      root.classList.remove('is-brand-animating');
      root.classList.add('is-intro-complete');
      onComplete();
      window.requestAnimationFrame(restorePage);
    };

    const snapAndComplete = (reason) => {
      if (!title || !target) {
        complete(reason);
        return;
      }
      const targetRect = target.getBoundingClientRect();
      title.style.transition = 'none';
      title.style.left = `${targetRect.left}px`;
      title.style.top = `${targetRect.top}px`;
      title.style.width = `${targetRect.width}px`;
      title.style.transform = 'translate3d(0, 0, 0) scale(1)';
      title.style.opacity = '1';
      complete(reason);
    };

    const onResize = () => snapAndComplete('resize');
    const onTransitionEnd = (event) => {
      if (
        overlay?.dataset.phase === 'flip' &&
        event.target === title &&
        event.propertyName === 'transform'
      ) {
        complete('transitionend');
      }
    };
    const onKeyDown = (event) => {
      if (event.key === 'Tab') snapAndComplete('keyboard');
    };

    root.classList.remove('is-intro-complete');
    root.classList.add('is-brand-animating');
    delete root.dataset.brandMotionLanding;

    const scrollbarWidth = Math.max(0, window.innerWidth - root.clientWidth);
    const bodyPadding = Number.parseFloat(getComputedStyle(body).paddingRight) || 0;
    root.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    if (scrollbarWidth) body.style.paddingRight = `${bodyPadding + scrollbarWidth}px`;

    window.addEventListener('resize', onResize);
    window.addEventListener('keydown', onKeyDown, true);
    title?.addEventListener('transitionend', onTransitionEnd);

    const prepare = async () => {
      if (!title || !target || !overlay || !backdrop) {
        snapAndComplete('missing-target');
        return;
      }

      const fontFallback = new Promise((resolve) => {
        schedule(resolve, BRAND_MOTION_TIMING.fontReadyTimeout);
      });
      const fontsReady = document.fonts?.ready?.catch(() => undefined) ?? Promise.resolve();
      await Promise.race([fontsReady, fontFallback]);
      if (!active || completed) return;

      const targetRect = target.getBoundingClientRect();
      title.style.left = `${targetRect.left}px`;
      title.style.top = `${targetRect.top}px`;
      title.style.width = `${targetRect.width}px`;

      const desiredWidth = Math.min(
        window.innerWidth * (window.innerWidth <= 768 ? 0.78 : 0.76),
        1200,
      );
      const minimumScale = window.innerWidth <= 768 ? 0.86 : 1;
      const introScale = Math.min(1.5, Math.max(minimumScale, desiredWidth / targetRect.width));
      const sourceLeft = (window.innerWidth - targetRect.width * introScale) / 2;
      const sourceTop = (window.innerHeight - targetRect.height * introScale) / 2;
      const sourceX = sourceLeft - targetRect.left;
      const sourceY = sourceTop - targetRect.top;
      const pulseScale = introScale * 0.94;
      const pulseX = sourceX + (targetRect.width * (introScale - pulseScale)) / 2;
      const pulseY = sourceY + (targetRect.height * (introScale - pulseScale)) / 2;

      overlay.dataset.phase = 'intro';
      title.style.transition = 'none';
      title.style.opacity = '0';
      title.style.transform = transformFor(pulseX, pulseY, pulseScale);
      title.getBoundingClientRect();

      window.requestAnimationFrame(() => {
        if (!active || completed) return;
        title.style.transition = [
          `transform ${BRAND_MOTION_TIMING.pulseDuration}ms ${BRAND_MOTION_EASING}`,
          `opacity ${BRAND_MOTION_TIMING.pulseDuration}ms ${BRAND_MOTION_EASING}`,
        ].join(', ');
        title.style.opacity = '1';
        title.style.transform = transformFor(sourceX, sourceY, introScale);
      });

      const elapsed = performance.now() - startedAt;
      schedule(() => {
        if (!active || completed) return;
        overlay.dataset.phase = 'flip';
        backdrop.classList.add('brand-motion__backdrop--revealing');
        title.style.transition = `transform ${BRAND_MOTION_TIMING.flipDuration}ms ${BRAND_MOTION_EASING}`;
        title.style.transform = 'translate3d(0, 0, 0) scale(1)';
        schedule(
          () => complete('timeout'),
          BRAND_MOTION_TIMING.flipDuration + BRAND_MOTION_TIMING.safetyBuffer,
        );
      }, Math.max(0, BRAND_MOTION_TIMING.flipDelay - elapsed));
    };

    prepare().catch(() => snapAndComplete('error'));

    return () => {
      active = false;
      clearTimers();
      window.removeEventListener('resize', onResize);
      window.removeEventListener('keydown', onKeyDown, true);
      title?.removeEventListener('transitionend', onTransitionEnd);
      root.classList.remove('is-brand-animating');
      if (!completed) restorePage();
    };
  }, [onComplete]);

  return (
    <div className="brand-motion" data-phase="loading" ref={overlayRef} aria-hidden="true">
      <div className="brand-motion__backdrop" ref={backdropRef} />
      <div className="brand-motion__title" ref={titleRef}>
        <span className="brand-motion__line">We Build What</span>
        <span className="brand-motion__line">Moves Business</span>
      </div>
    </div>
  );
}
