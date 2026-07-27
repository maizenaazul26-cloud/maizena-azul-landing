import PageMeta from './PageMeta';
import SiteLink from './SiteLink';
import StatusBadge from './StatusBadge';
import { LAST_REVIEWED_LABEL, publicUnits } from '../data/siteContent';
import './ContentPages.css';

const complianceCopy = {
  forge:
    'Blue Sky Forge recibe consultas y evalúa posibles proyectos de implementación tecnológica. La formalización contractual y la facturación están sujetas a la evaluación del alcance, los acuerdos específicos y la finalización de la documentación legal y administrativa aplicable.',
  prospect:
    'Blue Sky Prospect continúa en desarrollo. Puede presentarse institucionalmente y recibir consultas o manifestaciones de interés, pero todavía no funciona como plataforma pública ni ofrece acceso de usuario.',
  commerce:
    'Blue Sky Commerce es una iniciativa futura en exploración conceptual. No se encuentra habilitada comercialmente y no tiene producto, operación ni fecha de lanzamiento confirmados.',
};

export default function StatusScopePage({ onNavigate }) {
  return (
    <>
      <PageMeta
        title="Compliance | Blue Sky Group"
        description="Marco actual de consultas, disponibilidad y alcance operativo de Blue Sky Group, Forge, Prospect y Commerce."
        path="/estado-y-alcance"
      />
      <main className="content-page content-page--status" id="main-content">
        <header className="content-page__hero">
          <div className="container content-page__hero-grid">
            <div>
              <span className="eyebrow eyebrow--light">Compliance</span>
              <h1>Transparencia sobre el alcance actual.</h1>
            </div>
            <div>
              <p>
                Cada unidad se encuentra en una situación distinta. Este marco explica qué
                conversaciones están abiertas y qué condiciones requieren una instancia adicional
                de evaluación o formalización.
              </p>
              <span className="content-page__date">
                Última actualización: {LAST_REVIEWED_LABEL}
              </span>
            </div>
          </div>
        </header>

        <section className="content-section" aria-labelledby="compliance-units-title">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">Situación por unidad</span>
              <h2 id="compliance-units-title">Tres focos, tres alcances diferentes.</h2>
              <p>
                La recepción de una consulta no equivale a una contratación automática ni a la
                disponibilidad pública de todas las iniciativas.
              </p>
            </div>
            <div className="compliance-units">
              {publicUnits.map((unit) => (
                <article className="compliance-unit" key={unit.id}>
                  <StatusBadge status={unit.status} />
                  <h3>{unit.name}</h3>
                  <p>{complianceCopy[unit.id]}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section content-section--muted" aria-labelledby="channels-title">
          <div className="container legal-grid">
            <div>
              <span className="eyebrow">Conversaciones disponibles</span>
              <h2 id="channels-title">Qué podemos conversar hoy.</h2>
            </div>
            <ul className="scope-list">
              <li>Necesidades y posibles proyectos de implementación tecnológica con Forge.</li>
              <li>Consultas y manifestaciones de interés vinculadas con Prospect.</li>
              <li>Prensa, alianzas y conversaciones institucionales.</li>
              <li>Preguntas sobre la visión y las unidades de Blue Sky Group.</li>
            </ul>
          </div>
        </section>

        <section className="content-section" aria-labelledby="scope-title">
          <div className="container legal-grid">
            <div>
              <span className="eyebrow">Alcance operativo</span>
              <h2 id="scope-title">Qué requiere una instancia adicional.</h2>
            </div>
            <ul className="scope-list">
              <li>Una consulta no confirma presupuesto, contratación, plazo ni disponibilidad.</li>
              <li>La formalización de Forge requiere evaluación y acuerdos específicos.</li>
              <li>Prospect no habilita registro, login, plataforma o acceso de usuario.</li>
              <li>Commerce no procesa operaciones ni se encuentra habilitada comercialmente.</li>
              <li>El sitio no procesa pagos, transferencias ni recibe fondos.</li>
            </ul>
          </div>
        </section>

        <section className="content-section content-section--dark" aria-labelledby="legal-note-title">
          <div className="container legal-grid">
            <div>
              <span className="status-label">Borrador informativo</span>
              <h2 id="legal-note-title">Revisión profesional pendiente.</h2>
            </div>
            <div className="legal-copy legal-copy--embedded">
              <p>
                Este marco describe el funcionamiento actual del sitio y no constituye
                asesoramiento jurídico. Debe revisarse junto con la documentación definitiva de
                la entidad, la jurisdicción y cualquier actividad formal.
              </p>
              <div className="inline-links">
                <SiteLink className="text-link text-link--light" href="/privacidad" onNavigate={onNavigate}>
                  Privacidad
                </SiteLink>
                <SiteLink className="text-link text-link--light" href="/terminos" onNavigate={onNavigate}>
                  Términos
                </SiteLink>
                <SiteLink className="text-link text-link--light" href="/contacto" onNavigate={onNavigate}>
                  Realizar una consulta
                </SiteLink>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
