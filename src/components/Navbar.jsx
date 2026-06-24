import { useState, useEffect } from 'react';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const nextScrolled = window.scrollY > 80;
      setScrolled(nextScrolled);
      // Clase global para que el Hero (hermano, no hijo del Navbar) reaccione.
      document.documentElement.classList.toggle('is-scrolled', nextScrolled);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      document.documentElement.classList.remove('is-scrolled');
    };
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Cerrar el menú con la tecla Escape
  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  const closeMenu = () => setMobileOpen(false);

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} id="navbar">
      <div className="navbar__inner container">
        <a href="#" className="navbar__logo" aria-label="Blue Sky Group Home">
          <span className="navbar__logo-text">BLUE SKY GROUP</span>
        </a>

        {/* Desktop navigation */}
        <ul className="navbar__links">
          <li>
            <a href="#que-es" className="navbar__link">
              Qué es
            </a>
          </li>

          <li
            className="navbar__dropdown-wrapper"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
            onFocus={() => setServicesOpen(true)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setServicesOpen(false);
              }
            }}
          >
            <button
              className="navbar__link navbar__link--has-dropdown"
              type="button"
              aria-expanded={servicesOpen}
              aria-controls="navbar-services-menu"
              onFocus={() => setServicesOpen(true)}
              onClick={() => setServicesOpen(!servicesOpen)}
            >
              Servicios
            </button>
            <div className="navbar__dropdown" id="navbar-services-menu">
              <a href="#blue-sky-forge" className="navbar__dropdown-link">
                Blue Sky Forge
              </a>
              <a href="#blue-sky-prospect" className="navbar__dropdown-link">
                Blue Sky Prospect
              </a>
              <a href="#blue-sky-commerce" className="navbar__dropdown-link">
                Blue Sky Commerce
              </a>
            </div>
          </li>

          <li>
            <a href="#contacto" className="navbar__link">
              Contacto
            </a>
          </li>
        </ul>



        <button
          className={`navbar__hamburger ${mobileOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          id="navbar-toggle"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile menu overlay */}
      <div
        id="mobile-menu"
        className={`mobile-menu ${mobileOpen ? 'mobile-menu--open' : ''}`}
        aria-hidden={!mobileOpen}
      >
        <div className="container mobile-menu__container">
          <nav className="mobile-menu__panel" aria-label="Navegación principal">
            <a href="#que-es" className="mobile-menu__link" onClick={closeMenu} tabIndex={mobileOpen ? 0 : -1}>
              <span className="mobile-menu__label">Qué es</span>
            </a>

            <div className="mobile-menu__group">
              <span className="mobile-menu__link mobile-menu__link--group">
                <span className="mobile-menu__label">Servicios</span>
              </span>
              <div className="mobile-menu__subitems">
                <a href="#blue-sky-forge" className="mobile-menu__sublink" onClick={closeMenu} tabIndex={mobileOpen ? 0 : -1}>
                  <span className="mobile-menu__subname">Blue Sky Forge</span>
                  <span className="mobile-menu__subtag mobile-menu__subtag--active">Unidad activa</span>
                </a>
                <a href="#blue-sky-prospect" className="mobile-menu__sublink" onClick={closeMenu} tabIndex={mobileOpen ? 0 : -1}>
                  <span className="mobile-menu__subname">Blue Sky Prospect</span>
                  <span className="mobile-menu__subtag mobile-menu__subtag--development">En desarrollo</span>
                </a>
                <a href="#blue-sky-commerce" className="mobile-menu__sublink" onClick={closeMenu} tabIndex={mobileOpen ? 0 : -1}>
                  <span className="mobile-menu__subname">Blue Sky Commerce</span>
                  <span className="mobile-menu__subtag">Futuro</span>
                </a>
              </div>
            </div>

            <a href="#contacto" className="mobile-menu__link" onClick={closeMenu} tabIndex={mobileOpen ? 0 : -1}>
              <span className="mobile-menu__label">Contacto</span>
            </a>
          </nav>
        </div>
      </div>

    </nav>
  );
}
