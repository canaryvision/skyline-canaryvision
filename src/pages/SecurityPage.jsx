import { useFirebaseData } from "../hooks/useFirebaseData";
import { Shell } from "../components/layout/Shell";
import { EventMiniList } from "../components/lists/EventMiniList";
import { Metric } from "../components/ui/Metric";
import { Section } from "../components/ui/Section";
import { Snapshot } from "../components/ui/Snapshot";
import { StatusPill } from "../components/ui/StatusPill";

export function SecurityPage() {
  const { security } = useFirebaseData();
  const latest = security[0] || {};

  return (
    <Shell page="security" title="Security Monitoring" eyebrow="Security personnel monitoring">
      <div className="summary-strip">
        <Metric label="Current security presence" value={`${security.length} guard(s)`} />
        <Metric label="Last detected location" value={latest.location || "Main Gate"} />
        <Metric label="Last detection time" value={latest.time || "Live"} />
        <Metric label="Detected cameras" value={security.length} />
      </div>
      <Section title="Recent Movement" meta="Personnel activity">
        <EventMiniList items={security} kind="security" />
      </Section>
      <Section title="Detected Cameras" meta="Today">
        <div className="camera-grid compact">
          {security.map((item) => (
            <article key={item.id} className="camera-card">
              <header><div><strong>{item.camera}</strong><span>{item.location}</span></div><StatusPill>{item.status}</StatusPill></header>
              <Snapshot label={item.person} />
              <footer><span>{item.person}</span><time>{item.time}</time></footer>
            </article>
          ))}
        </div>
      </Section>
    </Shell>
  );
}
