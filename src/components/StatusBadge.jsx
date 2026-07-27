export default function StatusBadge({ status, light = false }) {
  return (
    <span
      className={`status-badge status-badge--${status.id}${light ? ' status-badge--light' : ''}`}
    >
      {status.icon ? (
        <span className="status-badge__icon" aria-hidden="true">
          {status.icon}
        </span>
      ) : null}
      {status.label}
    </span>
  );
}
