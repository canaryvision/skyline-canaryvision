import { useState } from "react";
import { useFirebaseData } from "../hooks/useFirebaseData";
import { Shell } from "../components/layout/Shell";
import { Icon } from "../components/ui/Icon";
import { Filters } from "../components/ui/Filters";
import { KpiCard } from "../components/ui/KpiCard";
import { Section } from "../components/ui/Section";
import { Snapshot } from "../components/ui/Snapshot";
import { StatusPill } from "../components/ui/StatusPill";

export function VehiclesPage() {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [listed, setListed] = useState("");

  const { vehicles, vehiclesInside, todayEntries, todayExits, nonListedVehicles, cameras, loading } = useFirebaseData();

  const records = vehicles.filter((item) => {
    const term = `${item.plate} ${item.vehicle} ${item.camera}`.toLowerCase();
    const listedMatch = !listed || (listed === "listed" ? item.listed : !item.listed);
    return (!search || term.includes(search.toLowerCase())) && (!status || item.status === status) && listedMatch;
  });

  return (
    <Shell page="vehicles" title="Vehicle Monitoring" eyebrow="Live Firebase Firestore Vehicle Detections">
      <div className="firebase-status-banner">
        <div className="firebase-badge">
          <span className="live-dot" />
          <strong>Firebase Firestore Connected</strong>
        </div>
        <div className="firebase-meta">
          <span>Project: <code>canaryvision-poc</code></span>
          <span>Collection: <code>Vehicle</code></span>
          <span>Total Records Synced: <strong>{vehicles.length}</strong></span>
          <span>Status: <strong className="green-text">Live Sync</strong></span>
        </div>
      </div>

      <div className="kpi-grid vehicle-kpis">
        <KpiCard label="Vehicles Inside" value={vehiclesInside.length} note="Currently parked or moving" />
        <KpiCard label="Today's Entries" value={todayEntries} note="Gate entries" />
        <KpiCard label="Today's Exits" value={todayExits} note="Gate exits" />
        <KpiCard label="Listed Vehicles" value={vehicles.filter((v) => v.listed).length} note="Registered residents and staff" />
        <KpiCard label="Non-Listed Vehicles" value={nonListedVehicles} note="Require attention" tone="warn" />
      </div>

      <Section title="Current Vehicles (Inside Perimeter)" meta={`${vehiclesInside.length} active`}>
        {vehiclesInside.length === 0 ? (
          <div className="empty-state">
            <p>No active vehicles inside perimeter detected yet from Firebase Firestore.</p>
          </div>
        ) : (
          <div className="table vehicle-table">
            <div className="tr th">
              <span>Vehicle</span>
              <span>Number Plate</span>
              <span>Entry Time</span>
              <span>Duration</span>
              <span>Vehicle Type</span>
              <span>Status</span>
              <span>Camera</span>
              <span>Snapshot</span>
              <span>Inspect Payload</span>
            </div>
            {vehiclesInside.map((item) => (
              <button key={item.id} className="tr" type="button" onClick={() => setSelected(item)}>
                <span>{item.vehicle}</span>
                <strong className="plate">{item.plate}</strong>
                <span>{item.entryTime}</span>
                <span>{item.duration}</span>
                <span>{item.type}</span>
                <StatusPill tone={item.listed ? "ok" : "warn"}>{item.listed ? "Listed" : "Non-Listed"}</StatusPill>
                <span>{item.camera}</span>
                <Snapshot label="Vehicle" tone={item.listed ? "neutral" : "warn"} />
                <span className="linkish">View JSON</span>
              </button>
            ))}
          </div>
        )}
      </Section>

      <Section title="Firebase Vehicle Detections History" meta={`${records.length} Firestore documents`}>
        <Filters
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          camera=""
          setCamera={null}
          cameraOptions={cameras}
          extra={
            <select value={listed} onChange={(event) => setListed(event.target.value)} aria-label="Listed filter">
              <option value="">Listed / non-listed</option>
              <option value="listed">Listed</option>
              <option value="non-listed">Non-listed</option>
            </select>
          }
        />
        {records.length === 0 ? (
          <div className="empty-state">
            <p>Waiting for vehicle detection documents from Firebase Firestore...</p>
          </div>
        ) : (
          <div className="table vehicle-history">
            <div className="tr th">
              <span>Snapshot</span>
              <span>Number Plate</span>
              <span>Vehicle</span>
              <span>Status</span>
              <span>Entry Time</span>
              <span>Exit Time</span>
              <span>Duration</span>
              <span>Entry Camera</span>
              <span>Exit Camera</span>
            </div>
            {records.map((item) => (
              <button key={item.id} className="tr" type="button" onClick={() => setSelected(item)}>
                <Snapshot label="Plate" tone={item.listed ? "neutral" : "warn"} />
                <strong className="plate">{item.plate}</strong>
                <span>{item.vehicle}</span>
                <StatusPill tone={item.status === "Entry" ? "ok" : "neutral"}>{item.status}</StatusPill>
                <span>{item.entryTime}</span>
                <span>{item.exitTime}</span>
                <span>{item.duration}</span>
                <span>{item.entryCamera}</span>
                <span>{item.exitCamera}</span>
              </button>
            ))}
          </div>
        )}
      </Section>

      {selected ? <VehicleDrawer vehicle={selected} onClose={() => setSelected(null)} /> : null}
    </Shell>
  );
}

function VehicleDrawer({ vehicle, onClose }) {
  const [tab, setTab] = useState("overview");
  const [copied, setCopied] = useState(false);

  const rawJson = JSON.stringify(vehicle.raw || vehicle, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(rawJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="drawer-wrap">
      <button className="drawer-scrim" type="button" aria-label="Close details" onClick={onClose} />
      <aside className="drawer wide-drawer">
        <header>
          <div>
            <h2>{vehicle.plate}</h2>
            <span className="drawer-sub">Firestore Doc ID: <code>{vehicle.id}</code></span>
          </div>
          <button className="icon-button" type="button" aria-label="Close" onClick={onClose}>
            <Icon name="close" />
          </button>
        </header>

        <div className="drawer-tabs">
          <button className={`tab-btn ${tab === "overview" ? "active" : ""}`} type="button" onClick={() => setTab("overview")}>
            Formatted Overview
          </button>
          <button className={`tab-btn ${tab === "json" ? "active" : ""}`} type="button" onClick={() => setTab("json")}>
            Firebase Raw JSON
          </button>
        </div>

        {tab === "overview" ? (
          <>
            <div className="drawer-media-grid">
              <Snapshot label="Vehicle Snapshot" />
              <Snapshot label="Number Plate Detection" />
            </div>
            <dl className="details">
              <div><dt>Document ID</dt><dd><code>{vehicle.id}</code></dd></div>
              <div><dt>Detected Number Plate</dt><dd><strong>{vehicle.plate}</strong></dd></div>
              <div><dt>Vehicle Status</dt><dd>{vehicle.listed ? "Listed Resident / Staff Vehicle" : "Non-Listed Visitor Vehicle"}</dd></div>
              <div><dt>Detection Status</dt><dd>{vehicle.status}</dd></div>
              <div><dt>Entry Time</dt><dd>{vehicle.entryTime}</dd></div>
              <div><dt>Exit Time</dt><dd>{vehicle.exitTime || "-"}</dd></div>
              <div><dt>Camera / Gate</dt><dd>{vehicle.camera}</dd></div>
              <div><dt>Source Log Path</dt><dd><code>{vehicle.source_log || "output_video/parallel_gpu/vehicle_plate_MAIN_GATE/..."}</code></dd></div>
              <div><dt>Video Frame Index</dt><dd>{vehicle.frame || 2}</dd></div>
            </dl>
          </>
        ) : (
          <div className="json-container">
            <div className="json-actions">
              <span>Firebase Firestore Document Payload</span>
              <button className="copy-btn" type="button" onClick={handleCopy}>
                {copied ? "Copied to Clipboard!" : "Copy Raw JSON"}
              </button>
            </div>
            <pre className="json-code">{rawJson}</pre>
          </div>
        )}
      </aside>
    </div>
  );
}
