import { useEffect, useRef } from 'react';
import { CheckIcon, ArrowRightIcon } from './Icons';
import './ServiceDetailView.css';

/**
 * Vista interna tipo subpágina para una unidad del ecosistema. Vive dentro
 * de la misma app/HTML — no es ruta, no es modal, no es panel desplegable.
 * App.jsx decide cuándo montarla (activeView !== 'home') y le pasa
 * `detail` + `onBack`. No conoce contenido propio de ninguna unidad.
 *
 * Estructura tipo funnel: hero (qué es y qué promete) → overview/problem
 * (orden configurable vía detail.sectionOrder) → capabilities (qué
 * construye) → audience (para quién) → process (cómo funciona) →
 * scenarios/differentiators (orden configurable vía detail.midSectionOrder)
 * → workflow opcional (cómo se trabaja con el cliente — solo si
 * detail.workflow existe) → finalCta (conversión).
 */
function OverviewSection({ overview }) {
  return (
    <section className="container service-view__section service-view__overview">
      <h2 className="service-view__section-heading">{overview.heading}</h2>
      <div className="service-view__overview-grid">
        <div className="service-view__overview-copy">
          <p>{overview.body}</p>
          {overview.extra && <p>{overview.extra}</p>}
        </div>
        {overview.highlight && <p className="service-view__overview-highlight">{overview.highlight}</p>}
      </div>
    </section>
  );
}

function ProblemSection({ problem }) {
  return (
    <section className="container service-view__section">
      <h2 className="service-view__section-heading">{problem.heading}</h2>
      <ul className="service-view__problem-grid">
        {problem.items.map((item) => (
          <li key={item} className="service-view__problem-item">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

function ScenariosSection({ scenarios }) {
  return (
    <section className="container service-view__section">
      <h2 className="service-view__section-heading">{scenarios.heading}</h2>
      <p className="service-view__scenarios-note">{scenarios.note}</p>
      <ul className="service-view__scenarios-grid">
        {scenarios.items.map((item) => (
          <li key={item} className="service-view__scenario">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

function DifferentiatorsSection({ differentiators }) {
  return (
    <section className="container service-view__section">
      <div className="service-view__diff-grid">
        <div className="service-view__diff-lead">
          <h2 className="service-view__section-heading">{differentiators.heading}</h2>
          <p>{differentiators.lead}</p>
        </div>
        <ul className="service-view__differentiators">
          {differentiators.items.map((item) => (
            <li key={item} className="service-view__differentiator">
              <CheckIcon size={16} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/**
 * Reusada para `process` ("cómo funciona el sistema": flujo operativo) y
 * `workflow` ("cómo se trabaja con el cliente": onboarding comercial).
 * `variant="muted"` les da un fondo distinto para que no se confundan
 * visualmente siendo dos bloques de steps consecutivos en el documento.
 */
function ProcessSection({ process, headingId, variant }) {
  return (
    <section
      className={`container service-view__section ${variant === 'muted' ? 'service-view__section--muted' : ''}`}
      id={headingId}
    >
      <h2 className="service-view__section-heading">{process.heading}</h2>
      {process.subheading && <p className="service-view__section-subheading">{process.subheading}</p>}
      <ol className={`service-view__steps service-view__steps--count-${process.steps.length}`}>
        {process.steps.map((step, index) => (
          <li key={step.title} className="service-view__step">
            <span className="service-view__step-number">{String(index + 1).padStart(2, '0')}</span>
            <div className="service-view__step-body">
              <h3 className="service-view__step-title">{step.title}</h3>
              <p className="service-view__step-desc">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default function ServiceDetailView({ detail, onBack }) {
  const headingRef = useRef(null);

  // Entra como una página nueva: arriba del todo, con foco en el heading
  // para que un lector de pantalla anuncie el cambio de contexto.
  useEffect(() => {
    window.scrollTo(0, 0);
    headingRef.current?.focus();
  }, []);

  // Escape vuelve a home, igual que el botón "Volver".
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onBack();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onBack]);

  const scrollToCapabilities = (event) => {
    event.preventDefault();
    document.getElementById(detail.hero.secondaryCta.targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main className="service-view" id={`vista-${detail.id}`}>
      {/* ── 1. Hero: marca + retorno integrado + promesa + CTAs ── */}
      <header className="service-view__hero">
        <div className="container">
          <div className="service-view__hero-top">
            <h1 ref={headingRef} className="service-view__title" tabIndex={-1}>
              {detail.title}
            </h1>
            <button type="button" className="service-view__back" onClick={onBack}>
              <span aria-hidden="true">←</span> Volver a Blue Sky Group
            </button>
          </div>

          <p className="service-view__subtitle">{detail.hero.subtitle}</p>
          <p className="service-view__hero-text">{detail.hero.text}</p>

          <div className="service-view__hero-actions">
            <a href={detail.finalCta.cta.href} className="service-view__cta" target="_blank" rel="noopener noreferrer">
              {detail.hero.cta.label}
              <ArrowRightIcon size={18} color="currentColor" />
            </a>
            {detail.hero.secondaryCta && (
              <a href={`#${detail.hero.secondaryCta.targetId}`} className="service-view__cta-ghost" onClick={scrollToCapabilities}>
                {detail.hero.secondaryCta.label}
              </a>
            )}
          </div>
        </div>
      </header>

      <div className="service-view__body">
        {/* ── 2-3. Qué es / Problema — orden configurable por unidad ── */}
        {(detail.sectionOrder ?? ['overview', 'problem']).map((key) =>
          key === 'overview' ? (
            <OverviewSection key="overview" overview={detail.overview} />
          ) : (
            <ProblemSection key="problem" problem={detail.problem} />
          )
        )}

        {/* ── 4. Qué incluye: oferta de entrada destacada + capacidades complementarias ── */}
        <section className="container service-view__section" id={detail.hero.secondaryCta?.targetId}>
          <h2 className="service-view__section-heading">{detail.capabilities.heading}</h2>

          {detail.capabilities.featured && (
            <div className="service-view__category service-view__category--featured">
              <span className="service-view__category-tag">{detail.capabilities.featured.kicker}</span>
              <h3 className="service-view__category-title">{detail.capabilities.featured.title}</h3>
              <p className="service-view__category-desc">{detail.capabilities.featured.description}</p>
              <ul className="service-view__category-examples">
                {detail.capabilities.featured.examples.map((example) => (
                  <li key={example}>{example}</li>
                ))}
              </ul>
              <p className="service-view__category-result">{detail.capabilities.featured.result}</p>
            </div>
          )}

          {detail.capabilities.categoriesHeading && (
            <h3 className="service-view__categories-heading">{detail.capabilities.categoriesHeading}</h3>
          )}

          <div className="service-view__categories">
            {detail.capabilities.categories.map((category) => (
              <div key={category.title} className="service-view__category">
                <h3 className="service-view__category-title">{category.title}</h3>
                <p className="service-view__category-desc">{category.description}</p>
                <ul className="service-view__category-examples">
                  {category.examples.map((example) => (
                    <li key={example}>{example}</li>
                  ))}
                </ul>
                <p className="service-view__category-result">{category.result}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 5. Para quién ── */}
        <section className="container service-view__section">
          <h2 className="service-view__section-heading">{detail.audience.heading}</h2>
          <ul className="service-view__audience-grid">
            {detail.audience.items.map((item) => (
              <li key={item} className="service-view__audience-item">
                <CheckIcon size={16} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── 6. Cómo funciona el sistema ── */}
        <ProcessSection process={detail.process} />

        {/* ── 7-8. Casos de uso / Diferencial — orden configurable ── */}
        {(detail.midSectionOrder ?? ['scenarios', 'differentiators']).map((key) =>
          key === 'scenarios' ? (
            <ScenariosSection key="scenarios" scenarios={detail.scenarios} />
          ) : (
            <DifferentiatorsSection key="differentiators" differentiators={detail.differentiators} />
          )
        )}

        {/* ── 9. Cómo se trabaja con el cliente (opcional, solo si la unidad lo define) ── */}
        {detail.workflow && <ProcessSection process={detail.workflow} variant="muted" />}

        {/* ── 10. CTA final ── */}
        <section className="service-view__final">
          <div className="container service-view__final-inner">
            <h2 className="service-view__final-heading">{detail.finalCta.heading}</h2>
            <p className="service-view__final-text">{detail.finalCta.text}</p>
            <div className="service-view__final-actions">
              <a
                href={detail.finalCta.cta.href}
                className="service-view__cta"
                target={detail.finalCta.cta.external ? '_blank' : undefined}
                rel={detail.finalCta.cta.external ? 'noopener noreferrer' : undefined}
              >
                {detail.finalCta.cta.label}
                <ArrowRightIcon size={18} color="currentColor" />
              </a>
              {detail.finalCta.secondaryCta && (
                <a
                  href={detail.finalCta.cta.href}
                  className="service-view__cta-ghost service-view__cta-ghost--on-primary"
                  target={detail.finalCta.cta.external ? '_blank' : undefined}
                  rel={detail.finalCta.cta.external ? 'noopener noreferrer' : undefined}
                >
                  {detail.finalCta.secondaryCta.label}
                </a>
              )}
            </div>
            <button type="button" className="service-view__back-bottom" onClick={onBack}>
              Volver al ecosistema
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
