import EcosystemDiagram from './EcosystemDiagram';
import SiteLink from './SiteLink';
import { homeContent } from '../data/siteContent';
import { trackEvent } from '../lib/analytics';
import './Hero.css';

export default function Hero({ onNavigate }) {
  return (
    <header className="hero" id="inicio">
      <div className="container hero__inner">
        <div className="hero__copy">
          <h1 className="hero__brand-title hero__title" aria-label="We Build What Moves Business">
            <span className="hero__title-line">We Build What</span>
            <span className="hero__title-line">Moves Business</span>
          </h1>
          <div className="hero__content">
            <p className="hero__statement">{homeContent.title}</p>
            <p className="hero__lead">{homeContent.lead}</p>
            <div className="hero__actions">
              <SiteLink
                className="button button--light"
                href="/#unidades"
                onNavigate={onNavigate}
                onClick={() => trackEvent('ecosystem_explore', { location: 'hero' })}
              >
                Explorar las unidades
                <span aria-hidden="true">→</span>
              </SiteLink>
              <SiteLink
                className="button button--outline-light"
                href="/contacto"
                onNavigate={onNavigate}
                onClick={() => trackEvent('institutional_contact_open', { location: 'hero' })}
              >
                Realizar una consulta
              </SiteLink>
            </div>
          </div>
        </div>
        <div className="hero__diagram">
          <EcosystemDiagram />
        </div>
      </div>
    </header>
  );
}
