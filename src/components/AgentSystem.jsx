import { AGENT_SYSTEM_CARDS } from '../constants/theme';
import { BenefitIcon } from './Icons';
import './AgentSystem.css';

// TODO: revisar y reemplazar iconografía del sistema de agentes por íconos más
// precisos y consistentes con ventas B2B, CRM y agentes 24/7.
const cardIcons = ['target', 'organize', 'focus', 'message', 'qualify', 'segment'];

export default function AgentSystem() {
  return (
    <section className="agent-system" id="agent-system">
      <div className="container">
        <div className="agent-system__inner">
          <span className="section-label">05 — SISTEMA DE AGENTES DE BLUE SKY SALES</span>
          <div className="section-divider" />

          <h2 className="section-heading">
            AGENTES COMERCIALES<br/>
            PARA INVESTIGACIÓN,<br/>
            CRM Y SEGUIMIENTO 24/7.
          </h2>

          <div className="agent-system__content">
            <p className="section-body">
              Blue Sky Sales incorpora agentes diseñados para asistir tareas comerciales clave: búsqueda de empresas, identificación de contactos, organización de oportunidades, scoring de cuentas, preparación de mensajes y seguimiento comercial.
            </p>
            <p className="section-body" style={{ marginTop: '16px' }}>
              La propuesta de valor está en combinar CRM, investigación comercial y agentes en un sistema orientado a ordenar la actividad de ventas B2B, siempre con control humano sobre las decisiones finales.
            </p>
          </div>

          <div className="agent-system__grid">
            {AGENT_SYSTEM_CARDS.map((card, index) => (
              <div key={index} className="agent-card">
                <div className="agent-card__icon">
                  <BenefitIcon type={cardIcons[index % cardIcons.length]} size={24} />
                </div>
                <h3 className="agent-card__title">{card.title}</h3>
                <p className="agent-card__desc">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
