import { mockApi } from "../api/mockApi";
import { Shell } from "../components/layout/Shell";
import { ActivityList } from "../components/lists/ActivityList";
import { EventMiniList } from "../components/lists/EventMiniList";
import { UnifiedFeed } from "../components/lists/UnifiedFeed";
import { KpiCard } from "../components/ui/KpiCard";
import { Metric } from "../components/ui/Metric";
import { Section } from "../components/ui/Section";
import { StatusPill } from "../components/ui/StatusPill";
import { ROUTES } from "../config/routes";
import { vehicleHistory } from "../data/mockData";

export function DashboardPage() {
  const overview = mockApi.overview();

  return (
    <Shell page="dashboard" title="Security & Surveillance Overview" eyebrow="River Valley Skyline">
      <div className="hero-strip">
        <div>
          <h2>River Valley Skyline</h2>
          <p>Residential perimeter, vehicle, and security personnel monitoring.</p>
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
        <Section title="Intrusion Summary" meta="9:00 PM - 5:00 AM">
          <div className="status-row">
            <StatusPill>Monitoring Active</StatusPill>
            <span>4 monitored cameras</span>
            <span>Current status: Active alert</span>
          </div>
          <EventMiniList items={mockApi.intrusionEvents().slice(0, 3)} kind="intrusion" />
        </Section>
        <Section title="Vehicle Summary" meta="Today">
          <div className="metric-list">
            <Metric label="Vehicles currently inside" value={overview.vehiclesInside} />
            <Metric label="Today's entries" value={overview.todayEntries} />
            <Metric label="Today's exits" value={overview.todayExits} />
            <Metric label="Listed vehicles" value="126" />
            <Metric label="Non-listed vehicles" value={overview.nonListed} />
          </div>
          <ActivityList items={vehicleHistory.slice(0, 3)} />
        </Section>
        <Section title="Security Summary" meta="Personnel detection">
          <div className="security-current">
            <strong>Current security presence: 3 guards</strong>
            <span>Last detected location: Main Gate</span>
            <span>Last detection time: 10:48 AM</span>
          </div>
          <EventMiniList items={mockApi.securityActivity().slice(0, 3)} kind="security" />
        </Section>
        <Section title="Recent Events" meta="Unified feed">
          <UnifiedFeed events={mockApi.unifiedEvents().slice(0, 5)} />
        </Section>
      </div>
    </Shell>
  );
}
