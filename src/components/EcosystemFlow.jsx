import { ArrowRightIcon } from './Icons';
import './EcosystemFlow.css';

const FLOW_STEPS = [
  {
    order: '01',
    tag: 'Holding',
    name: 'Blue Sky Group',
    description:
      'La marca madre. No vende ni implementa directamente: organiza y gobierna las unidades que sí lo hacen, cada una con foco propio dentro del mismo ecosistema.',
  },
  {
    order: '02',
    tag: 'Unidad activa',
    name: 'Blue Sky Forge',
    description:
      'Implementación tecnológica. Construye los sistemas comerciales y operativos —captura de consultas, bases de leads, tableros, automatizaciones— que una empresa necesita para dejar de depender de WhatsApp, Excel y memoria humana.',
  },
  {
    order: '03',
    tag: 'Unidad activa',
    name: 'Blue Sky Prospect',
    description:
      'Ventas B2B asistidas. Una vez que la empresa tiene el sistema ordenado, Sales investiga cuentas, prioriza oportunidades, prepara mensajes y estructura el seguimiento con IA y control humano.',
  },
  {
    order: '04',
    tag: 'Próxima fase',
    name: 'Blue Sky Commerce',
    description:
      'La siguiente construcción del ecosistema, todavía en desarrollo: explorar comercio digital y nuevas formas de conexión entre empresas. No es un servicio activo hoy.',
  },
];

export default function EcosystemFlow() {
  return (
    <section className="eco-flow" id="como-funciona">
      <div className="container">
        <div className="eco-flow__header">

          <div className="section-divider" />
          <h2 className="section-heading">
            UN HOLDING,<br/>
            DOS UNIDADES ACTIVAS<br/>
            Y UNA PRÓXIMA FASE.
          </h2>
          <p className="section-body">
            Blue Sky Group no opera como un producto único: ordena un recorrido. Primero el holding
            define la estructura, después Forge implementa la base tecnológica, luego Sales activa
            la venta B2B sobre esa base, y Commerce queda como la próxima construcción del ecosistema.
          </p>
        </div>

        <div className="eco-flow__track">
          {FLOW_STEPS.map((step, index) => (
            <div
              key={step.order}
              className={`eco-flow__step ${index === FLOW_STEPS.length - 1 ? 'eco-flow__step--future' : ''}`}
            >
              <div className="eco-flow__step-card">
                <span className="eco-flow__step-order">{step.order}</span>
                <span className="eco-flow__step-tag">{step.tag}</span>
                <h3 className="eco-flow__step-name">{step.name}</h3>
                <p className="eco-flow__step-desc">{step.description}</p>
              </div>
              {index < FLOW_STEPS.length - 1 && (
                <span className="eco-flow__connector" aria-hidden="true">
                  <ArrowRightIcon size={20} />
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
