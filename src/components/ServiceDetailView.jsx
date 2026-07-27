import { useEffect, useRef } from 'react';
import FaqList from './FaqList';
import PageMeta from './PageMeta';
import SiteLink from './SiteLink';
import { LAST_REVIEWED_LABEL } from '../data/siteContent';
import { trackEvent } from '../lib/analytics';
import './ServiceDetailView.css';

export default function ServiceDetailView({ unit, onNavigate }) {
  const headingRef = useRef(null);
  const trackedUnitRef = useRef(null);
  const isForge = unit.id === 'forge';

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
    if (trackedUnitRef.current === unit.id) return;

    trackEvent('unit_page_view', {
      unit: unit.id,
      status: unit.status.id,
      public_availability: unit.publicAvailability,
    });
    trackedUnitRef.current = unit.id;
  }, [unit.id, unit.publicAvailability, unit.status.id]);

  return (
    <>
      <PageMeta
        title={unit.seo.title}
        description={unit.seo.description}
        path={unit.path}
      />
      <main className={`unit-page unit-page--${unit.id}`} id="main-content">
        <header className="unit-hero">
          <div className="container">
            <nav className="breadcrumb" aria-label="Migas de pan">
              <SiteLink href="/" onNavigate={onNavigate}>
                Blue Sky Group
              </SiteLink>
              <span aria-hidden="true">/</span>
              <SiteLink href="/#unidades" onNavigate={onNavigate}>
                Iniciativas
              </SiteLink>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{unit.shortName}</span>
            </nav>

            <div className="unit-hero__grid">
              <div>
                <span className="unit-hero__descriptor">{unit.descriptor}</span>
                <h1 ref={headingRef} tabIndex="-1">
                  {unit.name}
                </h1>
                <p className="unit-hero__lead">{unit.summary}</p>
              </div>
              <aside className="unit-hero__state" aria-label={`Estado de ${unit.name}`}>
                <span>Estado institucional</span>
                <strong>{unit.status.label}</strong>
                <p>{unit.status.description}</p>
                <small>Última revisión: {LAST_REVIEWED_LABEL}</small>
              </aside>
            </div>
          </div>
        </header>

        <section className="unit-section" aria-labelledby={`${unit.id}-purpose`}>
          <div className="container unit-split">
            <div>
              <span className="eyebrow">Propósito</span>
              <h2 id={`${unit.id}-purpose`}>
                {isForge
                  ? 'La forma en que abordamos cada proyecto.'
                  : 'La dirección que estamos investigando.'}
              </h2>
            </div>
            <div className="unit-copy">
              <p>{unit.purpose}</p>
              {isForge ? (
                <p>
                  Cada alcance se conversa y evalúa según su contexto antes de definir una
                  propuesta o un acuerdo específico.
                </p>
              ) : (
                <p>
                  Esta descripción es institucional. No representa una plataforma disponible ni
                  un compromiso de lanzamiento.
                </p>
              )}
            </div>
          </div>
        </section>

        <section
          className="unit-section unit-section--muted"
          aria-labelledby={`${unit.id}-focus`}
        >
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">Líneas de trabajo</span>
              <h2 id={`${unit.id}-focus`}>
                {isForge ? 'Capacidades para abordar necesidades concretas.' : 'Capacidades que orientan la exploración.'}
              </h2>
              <p>
                {isForge
                  ? 'El alcance y la combinación adecuada se definen para cada proyecto.'
                  : 'Son áreas en construcción, no funcionalidades públicas disponibles.'}
              </p>
            </div>
            <div className="capability-grid">
              {unit.focusAreas.map((area, index) => (
                <article key={area.name}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{area.name}</h3>
                  <p>{area.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="unit-section" aria-labelledby={`${unit.id}-artifacts`}>
          <div className="container unit-split">
            <div>
              <span className="eyebrow">Trabajo en curso</span>
              <h2 id={`${unit.id}-artifacts`}>
                {isForge
                  ? 'Herramientas para definir y ejecutar con claridad.'
                  : 'Artefactos para aprender, revisar y decidir.'}
              </h2>
            </div>
            <ol className="deliverable-list">
              {unit.workArtifacts.map((artifact, index) => (
                <li key={artifact}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {artifact}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="unit-section unit-section--dark" aria-labelledby={`${unit.id}-method`}>
          <div className="container">
            <span className="eyebrow eyebrow--light">Proceso</span>
            <h2 id={`${unit.id}-method`}>Construcción por etapas y con revisión explícita.</h2>
            <ol className="unit-method">
              {unit.method.map((step, index) => (
                <li key={step.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          className="unit-section unit-limits"
          aria-labelledby={`${unit.id}-limits`}
        >
          <div className="container unit-split">
            <div>
              <span className="eyebrow">{isForge ? 'Alcance actual' : 'Estado y límites'}</span>
              <h2 id={`${unit.id}-limits`}>
                {isForge
                  ? 'Cómo encuadramos una conversación inicial.'
                  : 'Qué no está disponible actualmente.'}
              </h2>
            </div>
            <ul className="plain-list plain-list--numbered">
              {unit.limits.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="unit-section faq-section" aria-labelledby={`${unit.id}-faq`}>
          <div className="container faq-section__grid">
            <div>
              <span className="eyebrow">Preguntas frecuentes</span>
              <h2 id={`${unit.id}-faq`}>Claridad para dar el próximo paso.</h2>
            </div>
            <FaqList items={unit.faq} />
          </div>
        </section>

        <section className="unit-final-cta" aria-labelledby={`${unit.id}-next`}>
          <div className="container unit-final-cta__inner">
            <h2 id={`${unit.id}-next`}>{unit.contact.heading}</h2>
            <p>{unit.contact.body}</p>
            <div className="unit-final-cta__actions">
              <SiteLink
                className="button button--light"
                href="/contacto"
                onNavigate={onNavigate}
              >
                {unit.contact.cta}
              </SiteLink>
              <SiteLink
                className="button button--outline-light"
                href="/estado-y-alcance"
                onNavigate={onNavigate}
              >
                Leer compliance
              </SiteLink>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
