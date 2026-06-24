import { EcosystemConnector } from './Icons';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero__inner">
        <div className="hero__content">
          <h1 className="hero__title">
            <span className="hero__title-line">Blue Sky</span>
            <span className="hero__title-line">Group</span>
          </h1>

          <div className="hero__info-block">
            <p className="hero__lead">
              Holding de soluciones comerciales y tecnológicas para empresas.
            </p>

            <p className="hero__subtitle">
              Diseñamos e implementamos infraestructura tecnológica y estratégica para que tu empresa deje de perder oportunidades, automatice procesos manuales y escale sus ventas de forma predecible.
            </p>
          </div>

          <div className="hero__actions">
            <a href="#blue-sky-forge" className="hero__btn hero__btn--primary" id="hero-cta-primary">
              Conocer Blue Sky Forge
            </a>
            <a href="#blue-sky-prospect" className="hero__btn hero__btn--secondary" id="hero-cta-secondary">
              Explorar Blue Sky Prospect
            </a>
          </div>

          <div className="hero__ecosystem" aria-label="Arquitectura del ecosistema Blue Sky Group" id="ecosistema">
            <span className="hero__eco-overline">El ecosistema</span>
            <div className="hero__eco-track">
              <div className="hero__eco-node">
                <span className="hero__eco-tag">Holding</span>
                <span className="hero__eco-name">Blue Sky Group</span>
              </div>
              <span className="hero__eco-arrow" aria-hidden="true">
                <EcosystemConnector />
              </span>
              <div className="hero__eco-node hero__eco-node--active">
                <span className="hero__eco-tag hero__eco-tag--active">Unidad activa</span>
                <span className="hero__eco-name">Blue Sky Forge</span>
              </div>
              <span className="hero__eco-arrow" aria-hidden="true">
                <EcosystemConnector />
              </span>
              <div className="hero__eco-node hero__eco-node--development">
                <span className="hero__eco-tag hero__eco-tag--development">En desarrollo · Consultas disponibles</span>
                <span className="hero__eco-name">Blue Sky Prospect</span>
              </div>
              <span className="hero__eco-arrow" aria-hidden="true">
                <EcosystemConnector />
              </span>
              <div className="hero__eco-node hero__eco-node--future">
                <span className="hero__eco-tag">Próxima implementación</span>
                <span className="hero__eco-name">Blue Sky Commerce</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
