import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import IntroSplash from './components/IntroSplash';
import BrandMotion from './components/BrandMotion';
import Hero from './components/Hero';
import AboutGroup from './components/AboutGroup';
import EcosystemFlow from './components/EcosystemFlow';
import Forge from './components/Forge';
import Prospect from './components/Prospect';
import Commerce from './components/Commerce';
import CtaFinal from './components/CtaFinal';
import Footer from './components/Footer';
import ServiceDetailView from './components/ServiceDetailView';
import { serviceDetails } from './data/serviceDetails';

// Vistas internas reconocidas por hash (#forge, #prospect). 'home' no es un
// hash propio: cualquier hash que no matchee una unidad cae ahí.
const VIEW_HASHES = Object.keys(serviceDetails);

function getViewFromHash() {
  const hash = window.location.hash.replace('#', '');
  return VIEW_HASHES.includes(hash) ? hash : 'home';
}

export default function App() {
  const [activeView, setActiveView] = useState(getViewFromHash);

  // El hash es la fuente de verdad: permite deep-link a #forge y que el
  // botón "atrás" del navegador salga de la vista interna.
  useEffect(() => {
    const onHashChange = () => setActiveView(getViewFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const openView = (view) => {
    window.location.hash = view;
    setActiveView(view);
  };

  const closeView = () => {
    // Vuelve cerca de la sección de origen, no al tope absoluto de la página.
    // El hash destino (#blue-sky-forge) no matchea VIEW_HASHES, así que
    // cualquier 'hashchange' posterior también resuelve a 'home'.
    const sectionAnchor = `blue-sky-${activeView}`;
    setActiveView('home');
    window.location.hash = sectionAnchor;
  };

  if (activeView !== 'home') {
    return (
      <>
        <ServiceDetailView detail={serviceDetails[activeView]} onBack={closeView} />
      </>
    );
  }

  return (
    <>
      <IntroSplash />
      <BrandMotion />
      <Navbar />
      <main>
        <Hero />
        <AboutGroup />
        <EcosystemFlow />
        <Forge onExplore={() => openView('forge')} />
        <Prospect onExplore={() => openView('prospect')} />
        <Commerce />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
