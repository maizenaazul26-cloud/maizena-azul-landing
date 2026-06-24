import './CtaFinal.css';

export default function CtaFinal() {
  return (
    <section className="cta-final" id="contacto">
      <div className="container">
        <div className="cta-final__inner">
          <div className="cta-final__card">

            <div className="section-divider section-divider--center" />

            <h2 className="cta-final__title">
              ES HORA DE PROFESIONALIZAR<br/>TU OPERACIÓN COMERCIAL.
            </h2>
            <p className="cta-final__text">
              Si tu empresa necesita dejar atrás el desorden, implementar tecnología comercial o revisar su proceso de ventas, Blue Sky Group puede ayudarte desde su ecosistema de soluciones.
            </p>
            <div className="cta-final__actions">
              <a href="https://api.whatsapp.com/send/?phone=5491171008349&text&type=phone_number&app_absent=0" className="cta-final__btn cta-final__btn--primary" target="_blank" rel="noopener noreferrer">
                Contactate con nosotros
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
