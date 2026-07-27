import { useEffect, useRef, useState } from 'react';
import SiteLink from './SiteLink';
import { publicUnits } from '../data/siteContent';
import { trackEvent } from '../lib/analytics';
import './Navbar.css';

const homeSections = ['grupo', 'unidades', 'proposito', 'faq'];

export default function Navbar({ onNavigate }) {
  const currentPath = window.location.pathname;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [unitsOpen, setUnitsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const toggleRef = useRef(null);
  const panelRef = useRef(null);
  const unitsButtonRef = useRef(null);
  const unitsWrapperRef = useRef(null);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);
        frame = 0;
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, [currentPath]);

  useEffect(() => {
    if (currentPath !== '/' || !('IntersectionObserver' in window)) return undefined;

    const sections = homeSections
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: '-28% 0px -58% 0px', threshold: [0.05, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [currentPath]);

  useEffect(() => {
    if (!mobileOpen) return undefined;

    const surfaces = [document.querySelector('main'), document.querySelector('footer')].filter(
      Boolean,
    );
    document.documentElement.classList.add('is-mobile-menu-open');
    surfaces.forEach((surface) => {
      surface.inert = true;
    });

    const selector = 'a[href], button:not([disabled]), summary';
    const focusables = panelRef.current?.querySelectorAll(selector) || [];
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const timer = window.setTimeout(() => first?.focus(), 40);

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
        window.requestAnimationFrame(() => toggleRef.current?.focus());
        return;
      }
      if (event.key !== 'Tab' || focusables.length === 0) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', onKeyDown);
      document.documentElement.classList.remove('is-mobile-menu-open');
      surfaces.forEach((surface) => {
        surface.inert = false;
      });
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!unitsOpen) return undefined;

    const closeOnOutsidePointer = (event) => {
      if (!unitsWrapperRef.current?.contains(event.target)) setUnitsOpen(false);
    };

    document.addEventListener('pointerdown', closeOnOutsidePointer);
    return () => document.removeEventListener('pointerdown', closeOnOutsidePointer);
  }, [unitsOpen]);

  const handleNavigate = (to) => {
    setMobileOpen(false);
    setUnitsOpen(false);
    onNavigate(to);
  };

  const toggleMobile = () => {
    const next = !mobileOpen;
    setMobileOpen(next);
    trackEvent('mobile_menu_toggle', { action: next ? 'open' : 'close' });
  };

  const locationCurrent = (section) =>
    currentPath === '/' && activeSection === section ? 'location' : undefined;
  const pageCurrent = (path) => (currentPath === path ? 'page' : undefined);

  return (
    <nav
      className={[
        'navbar',
        currentPath === '/' ? 'navbar--home' : '',
        scrolled ? 'navbar--scrolled' : '',
        mobileOpen ? 'navbar--mobile-open' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label="Navegación principal"
    >
      <div className="container navbar__inner">
        <SiteLink
          className="navbar__brand"
          href="/"
          onNavigate={handleNavigate}
          aria-label="Blue Sky Group, inicio"
          aria-current={pageCurrent('/')}
        >
          <img src="/favicon.png" alt="" width="34" height="34" />
          <span>Blue Sky Group</span>
        </SiteLink>

        <ul className="navbar__links">
          <li>
            <SiteLink
              className="navbar__link"
              href="/#grupo"
              onNavigate={handleNavigate}
              aria-current={locationCurrent('grupo')}
            >
              Grupo
            </SiteLink>
          </li>
          <li
            ref={unitsWrapperRef}
            className={`navbar__dropdown-wrapper ${
              unitsOpen ? 'navbar__dropdown-wrapper--open' : ''
            }`}
            onMouseEnter={() => setUnitsOpen(true)}
            onMouseLeave={() => setUnitsOpen(false)}
            onFocus={() => setUnitsOpen(true)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setUnitsOpen(false);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                setUnitsOpen(false);
                unitsButtonRef.current?.focus();
              }
            }}
          >
            <button
              ref={unitsButtonRef}
              className="navbar__link navbar__units-button"
              type="button"
              aria-expanded={unitsOpen}
              aria-controls="units-menu"
              aria-current={
                publicUnits.some((unit) => unit.path === currentPath) ? 'page' : locationCurrent('unidades')
              }
              onClick={() => setUnitsOpen(true)}
            >
              Unidades
            </button>
            <div className="navbar__dropdown" id="units-menu">
              {publicUnits.map((unit) => (
                <SiteLink
                  className="navbar__dropdown-link"
                  href={unit.path}
                  onNavigate={handleNavigate}
                  aria-current={pageCurrent(unit.path)}
                  key={unit.id}
                >
                  <span>
                    <strong>{unit.name}</strong>
                    <small>{unit.descriptor}</small>
                  </span>
                </SiteLink>
              ))}
            </div>
          </li>
          <li>
            <SiteLink
              className="navbar__link"
              href="/#proposito"
              onNavigate={handleNavigate}
              aria-current={locationCurrent('proposito')}
            >
              Propósito
            </SiteLink>
          </li>
          <li>
            <SiteLink
              className="navbar__link"
              href="/#faq"
              onNavigate={handleNavigate}
              aria-current={locationCurrent('faq')}
            >
              FAQ
            </SiteLink>
          </li>
        </ul>

        <SiteLink
          className="navbar__cta"
          href="/contacto"
          onNavigate={handleNavigate}
          aria-current={pageCurrent('/contacto')}
          onClick={() => trackEvent('institutional_contact_open', { location: 'navbar' })}
        >
          Contacto
        </SiteLink>

        <button
          ref={toggleRef}
          className={`navbar__toggle ${mobileOpen ? 'navbar__toggle--open' : ''}`}
          type="button"
          aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={toggleMobile}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div
        className={`mobile-menu ${mobileOpen ? 'mobile-menu--open' : ''}`}
        id="mobile-menu"
        aria-hidden={!mobileOpen}
      >
        <div className="container mobile-menu__inner" ref={panelRef}>
          <div className="mobile-menu__context">
            <strong>Una dirección compartida</strong>
            <span>Tres unidades complementarias</span>
          </div>

          <SiteLink
            className="mobile-menu__link"
            href="/#grupo"
            onNavigate={handleNavigate}
            tabIndex={mobileOpen ? 0 : -1}
          >
            <span>01</span>
            Grupo
          </SiteLink>

          <details className="mobile-menu__units">
            <summary>
              <span>02</span>
              Unidades
            </summary>
            <div>
              {publicUnits.map((unit) => (
                <SiteLink
                  className="mobile-menu__unit"
                  href={unit.path}
                  onNavigate={handleNavigate}
                  tabIndex={mobileOpen ? 0 : -1}
                  key={unit.id}
                >
                  <span>
                    <strong>{unit.name}</strong>
                    <small>{unit.descriptor}</small>
                  </span>
                </SiteLink>
              ))}
            </div>
          </details>

          <SiteLink
            className="mobile-menu__link"
            href="/#proposito"
            onNavigate={handleNavigate}
            tabIndex={mobileOpen ? 0 : -1}
          >
            <span>03</span>
            Propósito
          </SiteLink>
          <SiteLink
            className="mobile-menu__link"
            href="/#faq"
            onNavigate={handleNavigate}
            tabIndex={mobileOpen ? 0 : -1}
          >
            <span>04</span>
            Preguntas frecuentes
          </SiteLink>
          <SiteLink
            className="mobile-menu__link mobile-menu__contact"
            href="/contacto"
            onNavigate={handleNavigate}
            tabIndex={mobileOpen ? 0 : -1}
          >
            <span>05</span>
            Contacto
          </SiteLink>
        </div>
      </div>
    </nav>
  );
}
