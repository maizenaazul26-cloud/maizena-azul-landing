import PageMeta from './PageMeta';
import SiteLink from './SiteLink';
import './ContentPages.css';

export default function NotFoundPage({ onNavigate }) {
  return (
    <>
      <PageMeta
        title="Página no encontrada | Blue Sky Group"
        description="La página solicitada no está disponible."
        path={window.location.pathname}
        noIndex
      />
      <main className="not-found" id="main-content">
        <div className="container not-found__inner">
          <span className="eyebrow eyebrow--light">404</span>
          <h1>Esta ruta no forma parte del sitio institucional.</h1>
          <p>Podés volver al inicio o iniciar una conversación con Blue Sky Group.</p>
          <div className="not-found__actions">
            <SiteLink className="button button--light" href="/" onNavigate={onNavigate}>
              Volver al inicio
            </SiteLink>
            <SiteLink
              className="button button--outline-light"
              href="/contacto"
              onNavigate={onNavigate}
            >
              Realizar una consulta
            </SiteLink>
          </div>
        </div>
      </main>
    </>
  );
}
