import './Commerce.css';

export default function Commerce() {
  return (
    <section className="commerce" id="blue-sky-commerce">
      <div className="container">
        <div className="commerce__inner">
          <span className="section-label">07 — FUTURO</span>
          <div className="section-divider" />

          <div className="commerce__header">
            <h2 className="section-heading">
              BLUE SKY COMMERCE.
            </h2>
          </div>

          <div className="commerce__content-center">
            <div className="commerce__card commerce__card--central">
              <div className="commerce__badge">Futuro · Próxima implementación</div>
              <h3 className="commerce__title">La próxima construcción del ecosistema Blue Sky Group.</h3>
              <p className="commerce__desc">
                Blue Sky Commerce es una unidad futura orientada a explorar modelos de comercio digital,
                conexión entre empresas, canales comerciales y nuevas formas de transacción dentro del
                ecosistema Blue Sky Group.
              </p>

              <div className="commerce__map">
                <div className="commerce__map-item">B2B</div>
                <div className="commerce__map-item">B2C</div>
                <div className="commerce__map-item">C2B</div>
                <div className="commerce__map-item">C2C</div>
                <div className="commerce__map-item commerce__map-item--light">Empresas</div>
                <div className="commerce__map-item commerce__map-item--light">Personas</div>
                <div className="commerce__map-item commerce__map-item--light">Productos</div>
                <div className="commerce__map-item commerce__map-item--light">Servicios</div>
                <div className="commerce__map-item commerce__map-item--light">Oportunidades</div>
              </div>

              <p className="commerce__desc" style={{ marginTop: '24px' }}>
                La visión a futuro es explorar relaciones comerciales entre distintos modelos de intercambio
                —B2B, B2C, C2B, C2C y otros esquemas— donde la oferta y la demanda puedan encontrarse de forma
                más ordenada. Su desarrollo es una etapa posterior del ecosistema, no un servicio activo hoy.
              </p>
              <p className="commerce__desc">
                Mientras Blue Sky Forge y Blue Sky Sales son las unidades activas del holding, Blue Sky
                Commerce representa la visión futura: la próxima construcción del ecosistema, todavía en desarrollo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
