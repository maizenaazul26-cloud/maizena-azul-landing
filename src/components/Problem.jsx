import './Problem.css';

const painPoints = [
  'Bases de contactos poco claras o desactualizadas',
  'Mensajes comerciales genéricos que no generan respuesta',
  'Bajo seguimiento de oportunidades abiertas',
  'Poca visibilidad sobre qué contactos tienen potencial real',
];

export default function Problem() {
  return (
    <section className="problem" id="problem">
      <div className="container">
        <div className="problem__inner">
          <span className="section-label">04 — QUÉ RESUELVE BLUE SKY SALES</span>
          <div className="section-divider" />

          <div className="problem__content-grid">
            <div className="problem__left">
              <h2 className="section-heading">
                LA VENTA B2B<br/>
                SIGUE SIENDO DEMASIADO<br/>
                MANUAL Y DESORDENADA.
              </h2>
              <p className="section-body" style={{ marginTop: '32px' }}>
                Muchas empresas B2B tienen oportunidades comerciales, pero sus
                procesos de ventas siguen dependiendo de bases poco claras,
                búsquedas manuales, mensajes genéricos y bajo seguimiento.
              </p>
              <p className="section-body" style={{ marginTop: '16px' }}>
                Blue Sky Sales nace para transformar ese proceso en un sistema
                más claro, inteligente y accionable.
              </p>
            </div>

            <div className="problem__right">
              <ul className="problem__list">
                {painPoints.map((point, index) => (
                  <li key={index} className="problem__item">
                    <div className="problem__item-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
