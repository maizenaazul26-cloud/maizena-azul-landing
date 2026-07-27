import PageMeta from './PageMeta';
import SiteLink from './SiteLink';
import { LAST_REVIEWED_LABEL } from '../data/siteContent';
import './ContentPages.css';

export default function TermsPage({ onNavigate }) {
  return (
    <>
      <PageMeta
        title="Términos de uso | Blue Sky Group"
        description="Condiciones informativas de uso del sitio institucional de Blue Sky Group."
        path="/terminos"
      />
      <main className="content-page content-page--legal" id="main-content">
        <header className="content-page__hero">
          <div className="container">
            <span className="eyebrow eyebrow--light">Términos de uso</span>
            <h1>Condiciones para una presencia institucional.</h1>
            <p className="content-page__date">Última actualización: {LAST_REVIEWED_LABEL}</p>
          </div>
        </header>
        <article className="container legal-copy">
          <p className="legal-draft">
            Borrador informativo sujeto a revisión profesional. No constituye asesoramiento
            jurídico.
          </p>

          <h2>Finalidad del sitio</h2>
          <p>
            Este sitio presenta Blue Sky Group, sus unidades y sus líneas de trabajo. También
            ofrece un canal para iniciar consultas sobre proyectos, prensa, alianzas y temas
            institucionales.
          </p>

          <h2>Ausencia de oferta</h2>
          <p>
            La información publicada no constituye por sí sola una oferta vinculante, una
            contratación automática ni una condición comercial. Blue Sky Forge puede recibir
            consultas y evaluar proyectos; cualquier formalización requiere acuerdos específicos
            y la documentación legal y administrativa aplicable.
          </p>

          <h2>Sin cuentas, operaciones o fondos</h2>
          <p>
            El sitio no habilita registro, login, cuentas, operaciones, pagos o recepción de
            fondos. Blue Sky Group no solicita datos financieros a través de esta web.
          </p>

          <h2>Contenido sujeto a cambios</h2>
          <p>
            Las iniciativas, prototipos, diagramas y descripciones pueden cambiar, reemplazarse o
            discontinuarse sin implicar un compromiso de lanzamiento para Prospect o Commerce.
          </p>

          <h2>Sin asesoramiento</h2>
          <p>
            Ningún contenido constituye asesoramiento financiero, legal, regulatorio o comercial.
            Una actividad futura deberá evaluarse según sus condiciones y la normativa aplicable.
          </p>

          <h2>Enlaces externos</h2>
          <p>
            Los enlaces a canales o sitios externos se ofrecen como referencia. Su disponibilidad,
            seguridad y tratamiento de datos dependen de sus respectivos responsables.
          </p>

          <div className="inline-links">
            <SiteLink className="text-link" href="/estado-y-alcance" onNavigate={onNavigate}>
              Compliance
            </SiteLink>
            <SiteLink className="text-link" href="/privacidad" onNavigate={onNavigate}>
              Privacidad
            </SiteLink>
          </div>
        </article>
      </main>
    </>
  );
}
