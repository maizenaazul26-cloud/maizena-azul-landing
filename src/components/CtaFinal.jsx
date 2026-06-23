import { ArrowRightIcon } from './Icons';
import './CtaFinal.css';

export default function CtaFinal() {
  return (
    <section className="cta-final" id="contacto">
      <div className="container">
        <div className="cta-final__inner">
          <div className="cta-final__card">
            <span className="section-label section-label--center">08 — CONTACTO</span>
            <div className="section-divider section-divider--center" />

            <h2 className="cta-final__title">
              CONSTRUYAMOS EL PRÓXIMO<br/>SISTEMA COMERCIAL<br/>DE TU EMPRESA.
            </h2>
            <p className="cta-final__text">
              Si tu empresa necesita ordenar consultas, implementar tecnología comercial o mejorar
              su proceso de ventas B2B, Blue Sky Group puede ayudarte desde sus unidades activas:
              Forge y Sales.
            </p>
            <div className="cta-final__actions">
              <a href="https://api.whatsapp.com/send/?phone=5491171008349&text&type=phone_number&app_absent=0" className="cta-final__btn cta-final__btn--primary" target="_blank" rel="noopener noreferrer">
                Coordinar reunión
                <ArrowRightIcon size={18} />
              </a>
              <a href="#blue-sky-sales" className="cta-final__btn cta-final__btn--secondary">
                Conocer Blue Sky Sales
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
