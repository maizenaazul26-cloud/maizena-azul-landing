import PageMeta from './PageMeta';
import SiteLink from './SiteLink';
import { LAST_REVIEWED_LABEL } from '../data/siteContent';
import './ContentPages.css';

export default function PrivacyPage({ onNavigate }) {
  return (
    <>
      <PageMeta
        title="Privacidad | Blue Sky Group"
        description="Alcance actual del tratamiento de datos en el sitio institucional de Blue Sky Group."
        path="/privacidad"
      />
      <main className="content-page content-page--legal" id="main-content">
        <header className="content-page__hero">
          <div className="container">
            <span className="eyebrow eyebrow--light">Privacidad</span>
            <h1>Datos y canales en el estado actual del sitio.</h1>
            <p className="content-page__date">Última actualización: {LAST_REVIEWED_LABEL}</p>
          </div>
        </header>
        <article className="container legal-copy">
          <p className="legal-draft">
            Borrador informativo sujeto a revisión profesional y a la confirmación de la
            infraestructura definitiva.
          </p>

          <h2>Datos tratados por el sitio</h2>
          <p>
            Actualmente no hay formularios, cuentas, registros, pagos ni áreas privadas
            habilitados. La aplicación puede procesar datos técnicos esenciales requeridos para
            entregar la página, según la infraestructura de hosting utilizada.
          </p>

          <h2>Analítica</h2>
          <p>
            El código prepara eventos locales compatibles con <code>dataLayer</code>, pero no
            declara un proveedor externo de analítica ni instala cookies no esenciales.
          </p>

          <h2>Canales externos</h2>
          <p>
            Los enlaces de contacto abren WhatsApp. Los datos que una persona decida enviar allí
            son tratados por ese servicio y por quien reciba la comunicación, conforme a sus
            condiciones aplicables.
          </p>

          <h2>Finalidad del contacto</h2>
          <p>
            El canal permite realizar consultas sobre posibles proyectos, manifestaciones de
            interés, prensa, alianzas y temas institucionales. No funciona como formulario de
            registro, pago o acceso a una plataforma.
          </p>

          <h2>Consultas sobre datos</h2>
          <p>
            Para consultar, corregir o solicitar la eliminación de información enviada
            voluntariamente, utilizá el canal institucional e indicá que se trata de una consulta
            de privacidad.
          </p>

          <div className="inline-links">
            <SiteLink className="text-link" href="/contacto" onNavigate={onNavigate}>
              Contacto institucional
            </SiteLink>
            <SiteLink className="text-link" href="/terminos" onNavigate={onNavigate}>
              Términos
            </SiteLink>
          </div>
        </article>
      </main>
    </>
  );
}
