import { SALES_BENEFITS } from '../constants/theme';
import { BenefitIcon, ArrowRightIcon } from './Icons';
import './Sales.css';

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

export default function Sales() {
  return (
    <section className="sales" id="blue-sky-sales">
      <div className="container">
        <div className="sales__header">
          <span className="section-label">03 — UNIDADES</span>
          <div className="section-divider" />

          <span className="sales__badge">En desarrollo · Consultas disponibles</span>

          <h2 className="section-heading">
            BLUE SKY<br/>SALES.
          </h2>

          <div className="sales__intro">
            <p className="sales__tagline">
              Ventas B2B asistidas por IA, con criterio comercial y control humano.
            </p>
            <p className="section-body">
              Blue Sky Sales es una unidad en desarrollo orientada a ayudar a empresas a ordenar su proceso comercial: investigación de cuentas, priorización de oportunidades, mensajes personalizados y seguimiento con asistencia de IA y control humano. Actualmente puede utilizarse como instancia de consulta para evaluar oportunidades, procesos de venta y criterios de prospección.
            </p>
            <p className="section-body" style={{ marginTop: '16px' }}>
              La IA prepara, ordena y recomienda. El equipo comercial decide, ajusta y ejecuta.
            </p>
          </div>
        </div>

        <div className="sales__grid">
          {SALES_BENEFITS.map((benefit) => (
            <BenefitCard key={benefit.id} benefit={benefit} />
          ))}
        </div>

        <div className="sales__cta-wrap">
          <a href="#contacto" className="sales__cta" id="sales-cta">
            Explorar Blue Sky Sales
            <ArrowRightIcon size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
