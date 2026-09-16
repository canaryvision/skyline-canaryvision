import { mockApi } from "../api/mockApi";
import { Shell } from "../components/layout/Shell";
import { EventMiniList } from "../components/lists/EventMiniList";
import { Metric } from "../components/ui/Metric";
import { Section } from "../components/ui/Section";
import { Snapshot } from "../components/ui/Snapshot";
import { StatusPill } from "../components/ui/StatusPill";
import { securityActivity } from "../data/mockData";

export function SecurityPage() {
  return (
    <Shell page="security" title="Security Monitoring" eyebrow="Security personnel monitoring">
      <div className="summary-strip">
        <Metric label="Current security presence" value="3 guards" />
        <Metric label="Last detected location" value="Main Gate" />
        <Metric label="Last detection time" value="10:48 AM" />
        <Metric label="Detected cameras" value="4" />
      </div>
      <Section title="Recent Movement" meta="Personnel activity">
        <EventMiniList items={mockApi.securityActivity()} kind="security" />
      </Section>
      <Section title="Detected Cameras" meta="Today">
        <div className="camera-grid compact">
          {securityActivity.map((item) => (
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
