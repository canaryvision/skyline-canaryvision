import { useFirebaseData } from "../hooks/useFirebaseData";
import { Shell } from "../components/layout/Shell";
import { ActivityList } from "../components/lists/ActivityList";
import { EventMiniList } from "../components/lists/EventMiniList";
import { UnifiedFeed } from "../components/lists/UnifiedFeed";
import { KpiCard } from "../components/ui/KpiCard";
import { Metric } from "../components/ui/Metric";
import { Section } from "../components/ui/Section";
import { StatusPill } from "../components/ui/StatusPill";
import { ROUTES } from "../config/routes";

export function DashboardPage() {
  const { overview, vehicles, intrusions, security, unifiedEvents } = useFirebaseData();

  return (
    <Shell page="dashboard" title="Security & Surveillance Overview" eyebrow="Skyline Riverville">
      <div className="firebase-status-banner">
        <div className="firebase-badge">
          <span className="live-dot" />
          <strong>Firebase Firestore Realtime Feed</strong>
        </div>
        <div className="firebase-meta">
          <span>Project: <code>canaryvision-poc</code></span>
          <span>Collection: <code>Vehicle</code></span>
          <span>Live Documents: <strong>{vehicles.length}</strong></span>
          <span>Status: <strong className="green-text">Active Stream</strong></span>
        </div>
      </div>

      <div className="hero-strip">
        <div>
          <h2>Skyline Riverville</h2>
          <p>Residential perimeter, vehicle, and security personnel monitoring powered by Firebase.</p>
        </div>
        <StatusPill>System Operational</StatusPill>
        <div className="hero-meta"><span>Cameras Online</span><strong>{overview.camerasOnline}</strong></div>
        <div className="hero-meta"><span>Last Updated</span><strong>{overview.lastUpdated}</strong></div>
      </div>

      <div className="kpi-grid">
        <KpiCard label="Active Intrusion Alerts" value={overview.activeIntrusions} note="Requires operator review" tone="danger" href={ROUTES.intrusion} />
        <KpiCard label="Vehicles Inside" value={overview.vehiclesInside} note="Live occupancy" href={ROUTES.vehicles} />
        <KpiCard label="Today's Vehicle Entries" value={overview.todayEntries} note="Since 12:00 AM" href={ROUTES.vehicles} />
        <KpiCard label="Today's Vehicle Exits" value={overview.todayExits} note="Validated exits" href={ROUTES.vehicles} />
        <KpiCard label="Non-Listed Vehicles" value={overview.nonListed} note="Watch list review" tone="warn" href={ROUTES.vehicles} />
        <KpiCard label="Security Personnel Detected" value={overview.securityDetected} note="Across active cameras" href={ROUTES.security} />
      </div>

      <div className="dashboard-grid">
        <Section title="Intrusion Summary" meta="Perimeter status">
          <div className="status-row">
            <StatusPill tone={overview.activeIntrusions > 0 ? "danger" : "ok"}>
              {overview.activeIntrusions > 0 ? "Monitoring Active - Alert" : "Monitoring Active - Clear"}
            </StatusPill>
            <span>Live Firestore</span>
          </div>
          <EventMiniList items={intrusions.slice(0, 3)} kind="intrusion" />
        </Section>
        <Section title="Vehicle Summary" meta="Today">
          <div className="metric-list">
            <Metric label="Vehicles currently inside" value={overview.vehiclesInside} />
            <Metric label="Today's entries" value={overview.todayEntries} />
            <Metric label="Today's exits" value={overview.todayExits} />
            <Metric label="Non-listed vehicles" value={overview.nonListed} />
          </div>
          <ActivityList items={vehicles.slice(0, 3)} />
        </Section>
        <Section title="Security Summary" meta="Personnel detection">
          <div className="security-current">
            <strong>Current security presence: {security.length} guard(s)</strong>
            <span>Last detected location: {security[0]?.location || "Main Gate"}</span>
            <span>Last detection time: {security[0]?.time || "Live"}</span>
          </div>
          <EventMiniList items={security.slice(0, 3)} kind="security" />
        </Section>
        <Section title="Recent Events" meta="Unified feed">
          <UnifiedFeed events={unifiedEvents.slice(0, 5)} />
        </Section>
      </div>
    </Shell>
  );
}
