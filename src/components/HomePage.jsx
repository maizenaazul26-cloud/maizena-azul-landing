import { useMemo } from 'react';
import FaqList from './FaqList';
import Hero from './Hero';
import PageMeta from './PageMeta';
import SiteLink from './SiteLink';
import { generalFaq, homeContent, principles, publicUnits, SITE_ORIGIN } from '../data/siteContent';
import { trackEvent } from '../lib/analytics';
import './HomePage.css';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_ORIGIN}/#organization`,
      name: 'Blue Sky Group',
      url: SITE_ORIGIN,
      logo: `${SITE_ORIGIN}/favicon.png`,
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_ORIGIN}/#website`,
      name: 'Blue Sky Group',
      url: SITE_ORIGIN,
      inLanguage: 'es-AR',
      publisher: {
        '@id': `${SITE_ORIGIN}/#organization`,
      },
    },
  ],
};

export default function HomePage({ onNavigate }) {
  const schema = useMemo(() => organizationSchema, []);

  return (
    <>
      <PageMeta
        title={homeContent.seo.title}
        description={homeContent.seo.description}
        path="/"
        structuredData={schema}
      />
      <main className="home-page" id="main-content">
        <Hero onNavigate={onNavigate} />

        <section className="home-section group-section" id="grupo" aria-labelledby="group-title">
          <div className="container home-split">
            <div>
              <span className="eyebrow">Blue Sky Group</span>
              <h2 id="group-title">Una estructura común para decidir, ejecutar y crecer con criterio.</h2>
            </div>
            <div className="home-copy">
              <p>
                El holding articula capacidades de tecnología, desarrollo comercial y exploración
                digital bajo una visión compartida. Cada unidad conserva un foco propio y aporta
                una perspectiva complementaria.
              </p>
              <p>
                Forge conecta necesidades concretas con implementación tecnológica. Prospect
                desarrolla sistemas para organizar la prospectiva B2B. Commerce mantiene abierta
                una línea futura de exploración sobre nuevas oportunidades digitales.
              </p>
              <p>
                Nos interesa construir relaciones claras, evaluar proyectos con contexto y
                convertir buenas ideas en estructuras capaces de generar valor real.
              </p>
            </div>
          </div>
        </section>

        <section
          className="home-section ecosystem-section"
          id="unidades"
          aria-labelledby="ecosystem-title"
        >
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">Ecosistema</span>
              <h2 id="ecosystem-title">Tres unidades, una misma dirección.</h2>
              <p>
                Blue Sky Group conecta implementación tecnológica, desarrollo comercial y nuevas
                oportunidades digitales. Cada unidad tiene un foco propio y complementa a las
                demás.
              </p>
            </div>
            <div className="unit-grid">
              {publicUnits.map((unit, index) => (
                <SiteLink
                  className="unit-card"
                  href={unit.path}
                  onNavigate={onNavigate}
                  onClick={() =>
                    trackEvent('unit_navigation', {
                      unit: unit.id,
                      location: 'home_ecosystem',
                    })
                  }
                  key={unit.id}
                >
                  <div className="unit-card__top">
                    <span className="unit-card__index">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <span className="unit-card__descriptor">{unit.descriptor}</span>
                  <h3>{unit.name}</h3>
                  <p>{unit.summary}</p>
                  <span className="unit-card__action">
                    {unit.cta.label} <span aria-hidden="true">→</span>
                  </span>
                </SiteLink>
              ))}
            </div>
          </div>
        </section>

        <section
          className="home-section purpose-section"
          id="proposito"
          aria-labelledby="purpose-title"
        >
          <div className="container">
            <div className="purpose-section__intro">
              <div>
                <span className="eyebrow eyebrow--light">Nuestra dirección</span>
                <h2 id="purpose-title">
                  Construir soluciones útiles, relaciones sólidas y negocios con visión de largo
                  plazo.
                </h2>
              </div>
              <p>
                Blue Sky Group nace para reunir capacidades que suelen funcionar por separado:
                tecnología, desarrollo comercial y exploración de nuevas oportunidades. El
                objetivo es transformar ideas concretas en estructuras capaces de generar valor
                real.
              </p>
            </div>
            <ol className="purpose-principles">
              {principles.map((principle, index) => (
                <li key={principle.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{principle.title}</h3>
                  <p>{principle.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          className="compliance-summary"
          id="compliance"
          aria-labelledby="compliance-title"
        >
          <div className="container compliance-summary__inner">
            <div>
              <span className="eyebrow eyebrow--light">Compliance</span>
              <h2 id="compliance-title">Transparencia para cada etapa.</h2>
            </div>
            <div>
              <p>
                Blue Sky Forge ya recibe consultas y evalúa posibles proyectos. Prospect continúa
                en desarrollo y no funciona como plataforma pública. Commerce permanece como una
                iniciativa futura en exploración conceptual.
              </p>
              <SiteLink
                className="text-link text-link--light"
                href="/estado-y-alcance"
                onNavigate={onNavigate}
              >
                Leer el marco completo <span aria-hidden="true">→</span>
              </SiteLink>
            </div>
          </div>
        </section>

        <section className="home-section faq-section" id="faq" aria-labelledby="faq-title">
          <div className="container faq-section__grid">
            <div>
              <span className="eyebrow">Preguntas frecuentes</span>
              <h2 id="faq-title">Respuestas claras para empezar una conversación.</h2>
            </div>
            <FaqList items={generalFaq} />
          </div>
        </section>

        <section className="institutional-contact" aria-labelledby="institutional-contact-title">
          <div className="container institutional-contact__inner">
            <span className="eyebrow eyebrow--light">Conversaciones abiertas</span>
            <h2 id="institutional-contact-title">
              Estamos abiertos a recibir consultas y explorar proyectos.
            </h2>
            <p>
              Podés escribirnos para conversar sobre una necesidad tecnológica, un nuevo proyecto,
              una alianza o una consulta institucional. Cada conversación se evalúa según la
              unidad y el alcance correspondiente.
            </p>
            <SiteLink
              className="button button--light"
              href="/contacto"
              onNavigate={onNavigate}
              onClick={() => trackEvent('institutional_contact_open', { location: 'home' })}
            >
              Realizar una consulta <span aria-hidden="true">→</span>
            </SiteLink>
          </div>
        </section>
      </main>
    </>
  );
}
