export function StatusPill({ children, tone = "ok" }) {
  return <span className={`pill ${tone}`}>{children}</span>;
}
