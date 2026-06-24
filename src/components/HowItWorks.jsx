import { PROSPECT_STEPS as SALES_STEPS } from '../constants/theme';
import './HowItWorks.css';

export default function HowItWorks() {
  return (
    <section className="how" id="how-it-works">
      <div className="container">
        <div className="how__header">

          <div className="section-divider" />
          <h2 className="section-heading how__heading">
            LA METODOLOGÍA DE VENTAS:<br/>DE LA INVESTIGACIÓN<br/>AL CIERRE.
          </h2>
        </div>

        <div className="how__steps">
          {SALES_STEPS.map((step) => (
            <div key={step.number} className="how__step">
              <div className="how__step-number">{step.number}</div>
              <div className="how__step-content">
                <h3 className="how__step-title">{step.title}</h3>
                <p className="how__step-desc">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
