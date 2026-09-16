import { Snapshot } from "../ui/Snapshot";
import { StatusPill } from "../ui/StatusPill";

export function ActivityList({ items }) {
  return (
    <div className="mini-list">
      {items.map((item) => (
        <article key={item.id} className="mini-row">
          <Snapshot label={item.plate} tone={item.listed ? "neutral" : "warn"} />
          <div>
            <strong>{item.plate}</strong>
            <span>{item.vehicle}</span>
          </div>
          <time>{item.entryTime}</time>
          <StatusPill tone={item.listed ? "ok" : "warn"}>{item.listed ? "Listed" : "Non-listed"}</StatusPill>
        </article>
      ))}
    </div>
  );
}
