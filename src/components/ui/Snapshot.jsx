export function Snapshot({ label = "Snapshot", tone = "neutral" }) {
  return (
    <div className={`snapshot ${tone}`} aria-label={label}>
      <span className="scan-line" />
      <span className="snapshot-label">{label}</span>
    </div>
  );
}
