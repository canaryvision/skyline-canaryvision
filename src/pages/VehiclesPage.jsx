import { useState } from "react";
import { mockApi } from "../api/mockApi";
import { Shell } from "../components/layout/Shell";
import { Icon } from "../components/ui/Icon";
import { Filters } from "../components/ui/Filters";
import { KpiCard } from "../components/ui/KpiCard";
import { Section } from "../components/ui/Section";
import { Snapshot } from "../components/ui/Snapshot";
import { StatusPill } from "../components/ui/StatusPill";
import { vehiclesInside } from "../data/mockData";

export function VehiclesPage() {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [listed, setListed] = useState("");
  const records = mockApi.vehicleHistory().filter((item) => {
    const term = `${item.plate} ${item.vehicle}`.toLowerCase();
    const listedMatch = !listed || (listed === "listed" ? item.listed : !item.listed);
    return (!search || term.includes(search.toLowerCase())) && (!status || item.status === status) && listedMatch;
  });

  return (
    <Shell page="vehicles" title="Vehicle Monitoring" eyebrow="Vehicle and number plate monitoring">
      <div className="kpi-grid vehicle-kpis">
        <KpiCard label="Vehicles Inside" value={vehiclesInside.length} note="Currently parked or moving" />
        <KpiCard label="Today's Entries" value="38" note="Gate entries" />
        <KpiCard label="Today's Exits" value="31" note="Gate exits" />
        <KpiCard label="Listed Vehicles" value="126" note="Registered residents and staff" />
        <KpiCard label="Non-Listed Vehicles" value="2" note="Require attention" tone="warn" />
      </div>

      <Section title="Current Vehicles" meta={`${vehiclesInside.length} inside`}>
        <div className="table vehicle-table">
          <div className="tr th"><span>Vehicle</span><span>Number Plate</span><span>Entry Time</span><span>Duration</span><span>Vehicle Type</span><span>Status</span><span>Camera</span><span>Snapshot</span><span>Action</span></div>
          {mockApi.vehiclesInside().map((item) => (
            <button key={item.id} className="tr" type="button" onClick={() => setSelected(item)}>
              <span>{item.vehicle}</span><strong className="plate">{item.plate}</strong><span>{item.entryTime}</span><span>{item.duration}</span><span>{item.type}</span>
              <StatusPill tone={item.listed ? "ok" : "warn"}>{item.listed ? "Listed Vehicle" : "Non-Listed Vehicle"}</StatusPill>
              <span>{item.camera}</span><Snapshot label="Vehicle" tone={item.listed ? "neutral" : "warn"} /><span className="linkish">View</span>
            </button>
          ))}
        </div>
      </Section>

      <Section title="Vehicle History" meta={`${records.length} records`}>
        <Filters
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          camera=""
          setCamera={null}
          extra={
            <select value={listed} onChange={(event) => setListed(event.target.value)} aria-label="Listed filter">
              <option value="">Listed / non-listed</option>
              <option value="listed">Listed</option>
              <option value="non-listed">Non-listed</option>
            </select>
          }
        />
        <div className="table vehicle-history">
          <div className="tr th"><span>Snapshot</span><span>Number Plate</span><span>Vehicle</span><span>Status</span><span>Entry Time</span><span>Exit Time</span><span>Duration</span><span>Entry Camera</span><span>Exit Camera</span></div>
          {records.map((item) => (
            <button key={item.id} className="tr" type="button" onClick={() => setSelected(item)}>
              <Snapshot label="Plate" tone={item.listed ? "neutral" : "warn"} /><strong className="plate">{item.plate}</strong><span>{item.vehicle}</span>
              <StatusPill tone={item.status === "Entry" ? "ok" : "neutral"}>{item.status}</StatusPill>
              <span>{item.entryTime}</span><span>{item.exitTime}</span><span>{item.duration}</span><span>{item.entryCamera}</span><span>{item.exitCamera}</span>
            </button>
          ))}
        </div>
      </Section>
      {selected ? <VehicleDrawer vehicle={selected} onClose={() => setSelected(null)} /> : null}
    </Shell>
  );
}

function VehicleDrawer({ vehicle, onClose }) {
  return (
    <div className="drawer-wrap">
      <button className="drawer-scrim" type="button" aria-label="Close details" onClick={onClose} />
      <aside className="drawer">
        <header><h2>{vehicle.plate}</h2><button className="icon-button" type="button" aria-label="Close" onClick={onClose}><Icon name="close" /></button></header>
        <div className="drawer-media-grid"><Snapshot label="Vehicle image" /><Snapshot label="Number plate" /></div>
        <dl className="details">
          <div><dt>Detected number plate</dt><dd>{vehicle.plate}</dd></div>
          <div><dt>Status</dt><dd>{vehicle.listed ? "Listed vehicle" : "Non-listed vehicle"}</dd></div>
          <div><dt>Entry time</dt><dd>{vehicle.entryTime}</dd></div>
          <div><dt>Exit time</dt><dd>{vehicle.exitTime || "-"}</dd></div>
          <div><dt>Total duration</dt><dd>{vehicle.duration}</dd></div>
          <div><dt>Entry camera</dt><dd>{vehicle.entryCamera || vehicle.camera}</dd></div>
          <div><dt>Exit camera</dt><dd>{vehicle.exitCamera || "-"}</dd></div>
        </dl>
      </aside>
    </div>
  );
}
