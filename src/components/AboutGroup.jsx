import './AboutGroup.css';

export default function AboutGroup() {
  return (
    <section className="about" id="que-es">
      <div className="container">
        <div className="about__inner">

          <div className="section-divider" />

          <h2 className="section-heading">
            BLUE SKY GROUP<br/>
            ES UN HOLDING<br/>
            DE SOLUCIONES<br/>
            COMERCIALES Y<br/>
            TECNOLÓGICAS.
          </h2>

          <div className="about__grid">
            <div className="about__content">
              <p className="section-body">
                Blue Sky Group opera como un holding estratégico de soluciones para empresas. A través de unidades especializadas, transformamos la anarquía operativa —la dependencia exclusiva de la memoria humana, Excel, WhatsApp y tareas repetitivas— en sistemas de ventas estructurados, escalables y guiados por datos.
              </p>
              <p className="section-body" style={{ marginTop: '16px' }}>
                Hoy el grupo concentra su actividad en <strong>Blue Sky Forge</strong>, unidad de
                implementación tecnológica activa, y <strong>Blue Sky Prospect</strong>, unidad en desarrollo
                orientada a ventas B2B asistidas por IA. <strong>Blue Sky
                Commerce</strong> representa la próxima construcción del ecosistema.
              </p>
            </div>

            <div className="about__markers">
              <div className="about__marker">
                <div className="about__marker-dot about__marker-dot--active" />
                <div className="about__marker-content">
                  <span className="about__marker-label">Unidad activa</span>
                  <span className="about__marker-name">Blue Sky Forge</span>
                </div>
              </div>
              <div className="about__marker-line" />
              <div className="about__marker">
                <div className="about__marker-dot about__marker-dot--development" />
                <div className="about__marker-content">
                  <span className="about__marker-label">En desarrollo · Consultas disponibles</span>
                  <span className="about__marker-name">Blue Sky Prospect</span>
                </div>
              </div>
              <div className="about__marker-line" />
              <div className="about__marker">
                <div className="about__marker-dot about__marker-dot--future" />
                <div className="about__marker-content">
                  <span className="about__marker-label">Próxima implementación</span>
                  <span className="about__marker-name">Blue Sky Commerce</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
