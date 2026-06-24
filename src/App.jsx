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

export default function App() {
  return (
    <>
      <IntroSplash />
      <BrandMotion />
      <Navbar />
      <main>
        <Hero />
        <AboutGroup />
        <EcosystemFlow />
        <Forge />
        <Prospect />
        <Commerce />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
