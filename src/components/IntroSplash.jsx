import { useEffect, useState } from 'react';
import './IntroSplash.css';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * IntroSplash — overlay azul de entrada.
 * Solo maneja el fondo; el texto animado de marca lo controla BrandMotion.
 * Sigue seteando .is-intro-complete en <html> para compatibilidad global.
 */
export default function IntroSplash() {
  const [visible, setVisible] = useState(() => !prefersReducedMotion());
  const [removed, setRemoved] = useState(() => prefersReducedMotion());

  useEffect(() => {
    const markIntroComplete = () => {
      document.documentElement.classList.add('is-intro-complete');
    };

    if (prefersReducedMotion()) {
      markIntroComplete();
      return;
    }

    // Overlay se desvanece cuando BrandMotion empieza a moverse al hero.
    // El timing se coordina con BrandMotion: ~1100ms de intro visible.
    const hideTimer = setTimeout(() => {
      setVisible(false);
      markIntroComplete();
    }, 1100);

    // Desmontar después de la transición de fade-out (600ms)
    const removeTimer = setTimeout(() => {
      setRemoved(true);
    }, 1700); // 1100 + 600

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (removed) return null;

  return (
    <div className={`intro-splash ${visible ? 'intro-splash--visible' : 'intro-splash--hidden'}`} />
  );
}
