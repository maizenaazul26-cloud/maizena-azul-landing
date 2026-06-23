import './AboutGroup.css';

export default function AboutGroup() {
  return (
    <section className="about" id="que-es">
      <div className="container">
        <div className="about__inner">
          <span className="section-label">01 — QUÉ ES BLUE SKY GROUP</span>
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
                Blue Sky Group es un holding orientado a crear y operar soluciones comerciales,
                tecnológicas y digitales para empresas. Desde sus unidades, transforma procesos
                dispersos —prospección, seguimiento, captación de consultas, automatización e
                implementación tecnológica— en sistemas más ordenados, medibles y accionables.
              </p>
              <p className="section-body" style={{ marginTop: '16px' }}>
                Hoy el grupo concentra su actividad en <strong>Blue Sky Forge</strong>, unidad de
                implementación tecnológica, y <strong>Blue Sky Sales</strong>, unidad comercial
                enfocada en ventas B2B asistidas por IA y control humano. <strong>Blue Sky
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
                <div className="about__marker-dot about__marker-dot--active" />
                <div className="about__marker-content">
                  <span className="about__marker-label">Unidad activa</span>
                  <span className="about__marker-name">Blue Sky Sales</span>
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
