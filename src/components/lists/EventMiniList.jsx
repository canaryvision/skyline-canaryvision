import { Snapshot } from "../ui/Snapshot";
import { StatusPill } from "../ui/StatusPill";

export function EventMiniList({ items, kind }) {
  return (
    <div className="mini-list">
      {items.map((item) => (
        <article key={item.id} className="mini-row">
          <Snapshot label={kind === "security" ? item.camera : item.cameraId} tone={item.status === "Active" ? "danger" : "neutral"} />
          <div>
            <strong>{kind === "security" ? item.person : item.camera}</strong>
            <span>{kind === "security" ? item.location : item.zone}</span>
          </div>
          <time>{item.date ? `${item.date} ${item.time}` : item.time}</time>
          <StatusPill tone={item.status === "Active" ? "danger" : "ok"}>{item.status}</StatusPill>
        </article>
      ))}
    </div>
  );
}
