export function KpiCard({ label, value, note, tone = "neutral", href }) {
  const Tag = href ? "a" : "article";

  return (
    <Tag className={`kpi ${tone}`} href={href}>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{note}</small>
    </Tag>
  );
}
