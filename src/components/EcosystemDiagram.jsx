import { publicUnits } from '../data/siteContent';

const unitWorkLabel = {
  forge: 'Consultas y proyectos de implementación',
  prospect: 'Sistemas y flujos de prospectiva B2B',
  commerce: 'Exploración de una oportunidad futura',
};

export default function EcosystemDiagram() {
  return (
    <figure className="ecosystem-map" aria-labelledby="ecosystem-map-caption">
      <div className="ecosystem-map__holding">
        <span>Holding</span>
        <strong>Blue Sky Group</strong>
        <small>Visión, criterio y estructura común</small>
      </div>

      <div className="ecosystem-map__bridge" aria-hidden="true">
        <svg viewBox="0 0 600 90" preserveAspectRatio="none">
          <path d="M300 0 C300 36 88 24 88 90 M300 0V90 M300 0C300 36 512 24 512 90" />
          <circle cx="88" cy="86" r="4" />
          <circle cx="300" cy="86" r="4" />
          <circle cx="512" cy="86" r="4" />
        </svg>
      </div>

      <ol className="ecosystem-map__units">
        {publicUnits.map((unit, index) => (
          <li className="ecosystem-map__unit" key={unit.id}>
            <div className="ecosystem-map__unit-meta">
              <span>{String(index + 1).padStart(2, '0')}</span>
            </div>
            <strong>{unit.name}</strong>
            <p>{unit.descriptor}</p>
            <small>{unitWorkLabel[unit.id]}</small>
          </li>
        ))}
      </ol>

      <figcaption id="ecosystem-map-caption">
        Una dirección compartida conecta tres unidades con focos complementarios.
      </figcaption>
    </figure>
  );
}
