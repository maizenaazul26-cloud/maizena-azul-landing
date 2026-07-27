import SiteLink from './SiteLink';
import { LAST_REVIEWED_LABEL, publicUnits } from '../data/siteContent';
import './Footer.css';

export default function Footer({ onNavigate }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <div>
              <img src="/favicon.png" alt="" width="38" height="38" />
              <strong>Blue Sky Group</strong>
            </div>
            <p>Grupo institucional que desarrolla iniciativas de tecnología y nuevas capacidades.</p>
          </div>

          <nav aria-label="Unidades">
            <span>Unidades</span>
            {publicUnits.map((unit) => (
              <SiteLink href={unit.path} onNavigate={onNavigate} key={unit.id}>
                {unit.name}
              </SiteLink>
            ))}
          </nav>

          <nav aria-label="Información institucional">
            <span>Información</span>
            <SiteLink href="/#grupo" onNavigate={onNavigate}>
              Grupo
            </SiteLink>
            <SiteLink href="/#proposito" onNavigate={onNavigate}>
              Propósito
            </SiteLink>
            <SiteLink href="/estado-y-alcance" onNavigate={onNavigate}>
              Compliance
            </SiteLink>
            <SiteLink href="/#faq" onNavigate={onNavigate}>
              Preguntas frecuentes
            </SiteLink>
            <SiteLink href="/contacto" onNavigate={onNavigate}>
              Contacto
            </SiteLink>
          </nav>

          <nav aria-label="Información legal">
            <span>Legal</span>
            <SiteLink href="/privacidad" onNavigate={onNavigate}>
              Privacidad
            </SiteLink>
            <SiteLink href="/terminos" onNavigate={onNavigate}>
              Términos
            </SiteLink>
          </nav>
        </div>

        <p className="footer__disclaimer">
          Blue Sky Group articula unidades con distintos niveles de actividad y madurez. Forge
          recibe consultas y evalúa posibles proyectos; Prospect continúa en desarrollo y Commerce
          permanece como iniciativa futura. Consultá Compliance para conocer el alcance actual.
        </p>

        <div className="footer__bottom">
          <span>© 2026 Blue Sky Group</span>
          <span>Última actualización: {LAST_REVIEWED_LABEL}</span>
          <span>Sitio institucional</span>
        </div>
      </div>
    </footer>
  );
}
