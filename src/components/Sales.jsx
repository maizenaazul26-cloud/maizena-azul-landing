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

          <span className="sales__badge">Unidad activa · Ventas B2B asistidas</span>

          <h2 className="section-heading">
            BLUE SKY<br/>SALES.
          </h2>

          <div className="sales__intro">
            <p className="sales__tagline">
              Investigación comercial, scoring, mensajes y seguimiento para vender con más criterio.
            </p>
            <p className="section-body">
              Blue Sky Sales ayuda a empresas B2B a ordenar su proceso comercial: identifica cuentas
              objetivo, investiga oportunidades, prioriza contactos, prepara mensajes personalizados y
              estructura el seguimiento con asistencia de IA y control humano.
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
