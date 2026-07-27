import PageMeta from './PageMeta';
import SiteLink from './SiteLink';
import { contactCategories } from '../data/siteContent';
import { buildInstitutionalContactUrl } from '../lib/contact';
import { trackEvent } from '../lib/analytics';
import './ContentPages.css';

export default function ContactPage({ onNavigate }) {
  return (
    <>
      <PageMeta
        title="Contacto institucional | Blue Sky Group"
        description="Canal de Blue Sky Group para consultas generales, nuevos proyectos, prensa y posibles alianzas."
        path="/contacto"
      />
      <main className="content-page" id="main-content">
        <header className="content-page__hero">
          <div className="container content-page__hero-grid">
            <div>
              <span className="eyebrow eyebrow--light">Contacto institucional</span>
              <h1>Estamos abiertos a conversar.</h1>
            </div>
            <div>
              <p>
                Recibimos consultas sobre proyectos tecnológicos, manifestaciones de interés en
                nuestras unidades, prensa y posibles alianzas. Contanos el contexto para evaluar
                el mejor punto de partida.
              </p>
            </div>
          </div>
        </header>

        <section className="content-section contact-options" aria-labelledby="contact-options-title">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">Canal disponible</span>
              <h2 id="contact-options-title">Elegí el mejor punto de partida.</h2>
              <p>
                El enlace abre WhatsApp con el motivo de la consulta. El sitio no almacena
                formularios y permite iniciar una conversación directa.
              </p>
            </div>
            <div className="contact-options__grid">
              {contactCategories.map((category, index) => (
                <article key={category.id}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{category.label}</h3>
                  <p>{category.description}</p>
                  <a
                    className="text-link"
                    href={buildInstitutionalContactUrl({
                      categoryId: category.id,
                      page: '/contacto',
                    })}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() =>
                      trackEvent('institutional_contact_click', {
                        category: category.id,
                        destination: 'whatsapp',
                      })
                    }
                  >
                    Iniciar conversación <span aria-hidden="true">→</span>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section content-section--muted" aria-labelledby="contact-scope-title">
          <div className="container legal-grid">
            <div>
              <span className="eyebrow">Alcance del contacto</span>
              <h2 id="contact-scope-title">Una conversación para evaluar encaje y próximos pasos.</h2>
            </div>
            <div className="legal-copy legal-copy--embedded">
              <p>
                Un mensaje no confirma presupuesto, contratación o disponibilidad. Nos permite
                comprender el contexto antes de evaluar un proyecto, una colaboración o una
                consulta institucional. No envíes fondos, contraseñas o información financiera.
              </p>
              <div className="inline-links">
                <SiteLink className="text-link" href="/estado-y-alcance" onNavigate={onNavigate}>
                  Compliance
                </SiteLink>
                <SiteLink className="text-link" href="/privacidad" onNavigate={onNavigate}>
                  Privacidad
                </SiteLink>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
