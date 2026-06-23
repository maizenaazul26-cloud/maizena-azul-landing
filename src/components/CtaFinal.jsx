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
              Si tu empresa necesita ordenar consultas, implementar tecnología comercial o revisar
              su proceso de ventas, Blue Sky Group puede ayudarte desde Forge y desde instancias
              de consulta con Blue Sky Sales.
            </p>
            <div className="cta-final__actions">
              <a href="https://api.whatsapp.com/send/?phone=5491171008349&text&type=phone_number&app_absent=0" className="cta-final__btn cta-final__btn--primary" target="_blank" rel="noopener noreferrer">
                Hablar sobre Forge
                <ArrowRightIcon size={18} />
              </a>
              <a href="#blue-sky-sales" className="cta-final__btn cta-final__btn--secondary">
                Consultar por Blue Sky Sales
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
