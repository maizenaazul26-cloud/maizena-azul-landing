import { ArrowRightIcon, EcosystemConnector } from './Icons';
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
              Holding de soluciones comerciales para empresas.
            </p>

            <p className="hero__subtitle">
              Desarrollamos servicios e infraestructura comercial para ayudar a empresas a crecer, ordenar procesos y conectar mejor con sus mercados.
            </p>
          </div>

          <div className="hero__actions">
            <a href="#blue-sky-prospect" className="hero__btn hero__btn--primary" id="hero-cta-primary">
              Conocer servicios
              <ArrowRightIcon size={18} />
            </a>
            <a href="#contacto" className="hero__btn hero__btn--secondary" id="hero-cta-secondary">
              Coordinar reunión
            </a>
          </div>

          <div className="hero__ecosystem" aria-label="Arquitectura del ecosistema Blue Sky Group">
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
                <span className="hero__eco-tag hero__eco-tag--active">Servicio activo</span>
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
