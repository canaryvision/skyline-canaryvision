import { useState } from "react";
import { useFirebaseData } from "../hooks/useFirebaseData";
import { Shell } from "../components/layout/Shell";
import { Icon } from "../components/ui/Icon";
import { Filters } from "../components/ui/Filters";
import { Metric } from "../components/ui/Metric";
import { Section } from "../components/ui/Section";
import { Snapshot } from "../components/ui/Snapshot";
import { StatusPill } from "../components/ui/StatusPill";

export function IntrusionPage() {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [camera, setCamera] = useState("");

  const { intrusions, cameras, activeIntrusions } = useFirebaseData();

  const active = intrusions.find((i) => i.status === "Active") || intrusions[0];
  const events = intrusions.filter((event) => {
    const term = `${event.camera} ${event.zone} ${event.status}`.toLowerCase();
    return (!search || term.includes(search.toLowerCase())) && (!status || event.status === status) && (!camera || event.camera === camera);
  });

  return (
    <Shell page="intrusion" title="Intrusion Detection" eyebrow="Monitor unauthorized movement across designated zones">
      <div className="summary-strip">
        <Metric label="Monitoring status" value="Active" />
        <Metric label="Monitoring schedule" value="24 / 7 Live" />
        <Metric label="Cameras monitored" value={cameras.length || 0} />
        <Metric label="Active alerts" value={activeIntrusions} />
      </div>

      <div className="camera-grid">
        {cameras.map((cameraItem) => (
          <article key={cameraItem.id} className="camera-card">
            <header>
              <div><strong>{cameraItem.name}</strong><span>{cameraItem.id} - {cameraItem.location}</span></div>
              <StatusPill tone={cameraItem.status === "Online" ? "ok" : "danger"}>{cameraItem.status}</StatusPill>
            </header>
            <Snapshot label="Live view" tone={cameraItem.detection === "Motion Alert" ? "danger" : "neutral"} />
            <footer>
              <span>{cameraItem.detection}</span>
              <time>Last event {cameraItem.lastEvent}</time>
            </footer>
          </article>
        ))}
      </div>

      {active ? (
        <Section title="Active Intrusion Alert" meta="Operator review">
          <article className="alert-card">
            <Snapshot label="Intrusion snapshot" tone="danger" />
            <div>
              <h3>Intrusion Detected</h3>
              <p>Camera: {active.camera}</p>
              <p>Zone: {active.zone}</p>
              <p>Time: {active.time}</p>
              <p>Severity: {active.severity}</p>
            </div>
            <StatusPill tone="danger">{active.status}</StatusPill>
            <button className="btn" type="button" onClick={() => setSelected(active)}>View Details</button>
          </article>
        </Section>
      ) : null}

      <Section title="Intrusion History" meta={`${events.length} events`}>
        <Filters search={search} setSearch={setSearch} status={status} setStatus={setStatus} camera={camera} setCamera={setCamera} cameraOptions={cameras} />
        <div className="table intrusion-table">
          <div className="tr th"><span>Snapshot</span><span>Date</span><span>Time</span><span>Camera</span><span>Location / Zone</span><span>Status</span><span>Action</span></div>
          {events.map((event) => (
            <button key={event.id} className="tr" type="button" onClick={() => setSelected(event)}>
              <Snapshot label={event.cameraId || "CAM"} tone={event.status === "Active" ? "danger" : "neutral"} />
              <span>{event.date}</span><span>{event.time}</span><span>{event.camera}</span><span>{event.zone}</span>
              <StatusPill tone={event.status === "Active" ? "danger" : "ok"}>{event.status}</StatusPill>
              <span className="linkish">View</span>
            </button>
          ))}
        </div>
      </Section>
      {selected ? <IntrusionDrawer event={selected} onClose={() => setSelected(null)} /> : null}
    </Shell>
  );
}

function IntrusionDrawer({ event, onClose }) {
  return (
    <div className="drawer-wrap">
      <button className="drawer-scrim" type="button" aria-label="Close details" onClick={onClose} />
      <aside className="drawer">
        <header><h2>{event.id}</h2><button className="icon-button" type="button" aria-label="Close" onClick={onClose}><Icon name="close" /></button></header>
        <Snapshot label="Large intrusion snapshot" tone={event.status === "Active" ? "danger" : "neutral"} />
        <dl className="details">
          <div><dt>Camera</dt><dd>{event.camera}</dd></div>
          <div><dt>Date</dt><dd>{event.date}</dd></div>
          <div><dt>Time</dt><dd>{event.time}</dd></div>
          <div><dt>Zone</dt><dd>{event.zone}</dd></div>
          <div><dt>Detection status</dt><dd>{event.status}</dd></div>
          <div><dt>Timeline</dt><dd>Motion detected, snapshot captured, alert routed to control room.</dd></div>
        </dl>
      </aside>
    </div>
  );
}
