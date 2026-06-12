import Navbar from './components/Navbar';
import IntroSplash from './components/IntroSplash';
import BrandMotion from './components/BrandMotion';
import Hero from './components/Hero';
import AboutGroup from './components/AboutGroup';
import Problem from './components/Problem';
import Prospect from './components/Prospect';
import HowItWorks from './components/HowItWorks';
import AgentSystem from './components/AgentSystem';
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
        <Prospect />
        <Problem />
        <AgentSystem />
        <HowItWorks />
        <Commerce />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
