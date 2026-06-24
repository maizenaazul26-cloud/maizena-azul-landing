import { PROSPECT_BENEFITS } from '../constants/theme';
import { BenefitIcon, ArrowRightIcon } from './Icons';
import './Prospect.css';

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

export default function Prospect({ onExplore }) {
  return (
    <section className="prospect" id="blue-sky-prospect">
      <div className="container">
        <div className="prospect__header">
          <span className="prospect__badge prospect__badge--active">
            Servicio activo
          </span>

          <h2 className="section-heading">
            BLUE SKY<br/>PROSPECT.
          </h2>

          <div className="prospect__intro">
            <p className="prospect__tagline">
              Ventas B2B asistidas por IA y control humano.
            </p>
            <p className="section-body">
              Blue Sky Prospect es el servicio activo de Blue Sky Group: combina inteligencia artificial para identificar, calificar y preparar oportunidades comerciales, con el control y criterio del equipo humano para tomar las decisiones clave.
            </p>
            <p className="section-body" style={{ marginTop: '16px' }}>
              La IA prepara, ordena y recomienda. El equipo humano decide, negocia y ejecuta.
            </p>
          </div>
        </div>

        <div className="prospect__grid">
          {PROSPECT_BENEFITS.map((benefit) => (
            <BenefitCard key={benefit.id} benefit={benefit} />
          ))}
        </div>

        <div className="prospect__cta-wrap">
          <button type="button" className="prospect__cta" id="prospect-cta" onClick={onExplore}>
            Explorar Blue Sky Prospect
            <ArrowRightIcon size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
