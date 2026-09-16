import { cameraList } from "../../data/mockData";
import { Icon } from "./Icon";

export function Filters({ search, setSearch, status, setStatus, camera, setCamera, extra }) {
  return (
    <div className="filters">
      <label className="search-field">
        <Icon name="search" />
        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search" />
      </label>
      <input type="date" aria-label="Date filter" />
      {setCamera ? (
        <select value={camera} onChange={(event) => setCamera(event.target.value)} aria-label="Camera filter">
          <option value="">All cameras</option>
          {cameraList.map((item) => <option key={item.id} value={item.name}>{item.name}</option>)}
        </select>
      ) : null}
      <select value={status} onChange={(event) => setStatus(event.target.value)} aria-label="Status filter">
        <option value="">All statuses</option>
        <option>Active</option>
        <option>Reviewed</option>
        <option>Resolved</option>
        <option>Entry</option>
        <option>Exit</option>
      </select>
      {extra}
    </div>
  );
}
