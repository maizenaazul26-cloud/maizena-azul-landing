import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import BrandMotion from './components/BrandMotion';
import ContactPage from './components/ContactPage';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import NotFoundPage from './components/NotFoundPage';
import PrivacyPage from './components/PrivacyPage';
import ServiceDetailView from './components/ServiceDetailView';
import StatusScopePage from './components/StatusScopePage';
import TermsPage from './components/TermsPage';
import { unitsBySlug } from './data/siteContent';
import { getLegacyRedirect, normalizePath, resolveRoute, ROUTES } from './router';

function getInitialLocation() {
  const legacyRedirect = getLegacyRedirect(window.location.pathname, window.location.hash);
  if (legacyRedirect) {
    window.history.replaceState({ scrollY: 0 }, '', legacyRedirect);
  }
  return `${window.location.pathname}${window.location.search}${window.location.hash}`;
}

function shouldSkipBrandMotion() {
  const params = new URLSearchParams(window.location.search);
  return (
    window.location.pathname !== '/' ||
    Boolean(window.location.hash) ||
    params.get('motion') === 'skip' ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

export default function App() {
  const [location, setLocation] = useState(getInitialLocation);
  const [brandMotionComplete, setBrandMotionComplete] = useState(shouldSkipBrandMotion);
  const pendingScrollRef = useRef({ type: 'top', value: 0 });
  const pathname = normalizePath(new URL(location, window.location.origin).pathname);
  const route = resolveRoute(pathname);

  useLayoutEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';

    const onPopState = (event) => {
      pendingScrollRef.current = Number.isFinite(event.state?.scrollY)
        ? { type: 'position', value: event.state.scrollY }
        : { type: 'top', value: 0 };
      setLocation(`${window.location.pathname}${window.location.search}${window.location.hash}`);
    };

    window.addEventListener('popstate', onPopState);
    return () => {
      window.removeEventListener('popstate', onPopState);
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useLayoutEffect(() => {
    const target = pendingScrollRef.current;
    const currentHash = window.location.hash;

    window.requestAnimationFrame(() => {
      if (target.type === 'position') {
        window.scrollTo({ top: target.value, behavior: 'instant' });
      } else if (currentHash) {
        document.getElementById(currentHash.slice(1))?.scrollIntoView();
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    });
  }, [location]);

  const navigate = useCallback((to) => {
    const nextUrl = new URL(to, window.location.origin);
    const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    const nextLocation = `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`;

    if (nextLocation === currentUrl) {
      if (nextUrl.hash) {
        document.getElementById(nextUrl.hash.slice(1))?.scrollIntoView();
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    window.history.replaceState(
      { ...(window.history.state || {}), scrollY: window.scrollY },
      '',
      currentUrl,
    );
    window.history.pushState({ scrollY: 0 }, '', nextLocation);
    pendingScrollRef.current = nextUrl.hash
      ? { type: 'anchor', value: nextUrl.hash.slice(1) }
      : { type: 'top', value: 0 };
    setLocation(nextLocation);
  }, []);

  const completeBrandMotion = useCallback(() => {
    setBrandMotionComplete(true);
  }, []);

  let page;
  if (route === ROUTES.home) {
    page = <HomePage onNavigate={navigate} />;
  } else if (route === ROUTES.forge) {
    page = <ServiceDetailView unit={unitsBySlug.forge} onNavigate={navigate} />;
  } else if (route === ROUTES.prospect) {
    page = <ServiceDetailView unit={unitsBySlug.prospect} onNavigate={navigate} />;
  } else if (route === ROUTES.commerce) {
    page = <ServiceDetailView unit={unitsBySlug.commerce} onNavigate={navigate} />;
  } else if (route === ROUTES.status) {
    page = <StatusScopePage onNavigate={navigate} />;
  } else if (route === ROUTES.contact) {
    page = <ContactPage onNavigate={navigate} />;
  } else if (route === ROUTES.privacy) {
    page = <PrivacyPage onNavigate={navigate} />;
  } else if (route === ROUTES.terms) {
    page = <TermsPage onNavigate={navigate} />;
  } else {
    page = <NotFoundPage onNavigate={navigate} />;
  }

  return (
    <>
      {route === ROUTES.home && !brandMotionComplete ? (
        <BrandMotion onComplete={completeBrandMotion} />
      ) : null}
      <a className="skip-link" href="#main-content">
        Saltar al contenido
      </a>
      <Navbar key={pathname} onNavigate={navigate} />
      {page}
      <Footer onNavigate={navigate} />
    </>
  );
}
