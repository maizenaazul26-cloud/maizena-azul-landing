import { FORGE_BENEFITS, FORGE_STEPS } from '../constants/theme';
import { BenefitIcon, ArrowRightIcon } from './Icons';
import './Prospect.css';
import './Forge.css';


function BenefitCard({ benefit }) {
  return (
    <div className="benefit-card">
      <div className="benefit-card__icon">
        <BenefitIcon type={benefit.icon} size={24} />
      </div>
      <h3 className="benefit-card__title">{benefit.title}</h3>
      <p className="benefit-card__desc">{benefit.description}</p>
    </div>
  );
}

export default function Forge({ onExplore }) {
  return (
    <section className="forge" id="blue-sky-forge">
      <div className="container">
        <div className="forge__header">

          <div className="section-divider" />

          <span className="forge__badge">Unidad tecnológica</span>

          <h2 className="section-heading">
            BLUE SKY<br/>FORGE.
          </h2>

          <div className="forge__intro">
            <p className="forge__tagline">
              Sistemas comerciales simples para empresas reales.
            </p>
            <p className="section-body">
              Blue Sky Forge es nuestra unidad de implementación tecnológica. Reemplazamos la improvisación en ventas por procesos blindados. Si tu equipo comercial depende de anotadores, Excel y WhatsApp, implementamos el ecosistema mínimo viable para capturar, gestionar y cerrar oportunidades sin fricción.
            </p>
            <p className="section-body" style={{ marginTop: '16px' }}>
              No somos una agencia web ni una software factory clásica. Somos una unidad enfocada en implementaciones acotadas, rápidas y útiles para que una empresa deje de perder ventas por desorden administrativo.
            </p>
          </div>
        </div>

        <div className="forge__grid">
          {FORGE_BENEFITS.map((benefit) => (
            <BenefitCard key={benefit.id} benefit={benefit} />
          ))}
        </div>

        <div className="forge__offer">
          <span className="forge__offer-label">Oferta inicial</span>
          <h3 className="forge__offer-title">Sistema Comercial Básico para no perder consultas</h3>
          <p className="forge__offer-desc">
            Una implementación mínima para que una empresa pueda capturar consultas, ordenarlas,
            recibir notificaciones, hacer seguimiento y visualizar oportunidades sin depender de
            procesos manuales dispersos.
          </p>
          <ul className="forge__offer-list">
            <li>Landing o formulario de captura</li>
            <li>Base de leads ordenada</li>
            <li>Notificaciones automáticas</li>
            <li>Tablero simple de seguimiento</li>
            <li>Automatizaciones puntuales</li>
            <li>Guía de uso para el equipo</li>
          </ul>
        </div>

        <div className="forge__steps">
          {FORGE_STEPS.map((step) => (
            <div key={step.number} className="forge__step">
              <div className="forge__step-number">{step.number}</div>
              <div className="forge__step-content">
                <h4 className="forge__step-title">{step.title}</h4>
                <p className="forge__step-desc">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="forge__cta-wrap">
          <button type="button" className="forge__cta" id="forge-cta" onClick={onExplore}>
            Explorar Blue Sky Forge
            <ArrowRightIcon size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
