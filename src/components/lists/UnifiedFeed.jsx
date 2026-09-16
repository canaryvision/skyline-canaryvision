import { StatusPill } from "../ui/StatusPill";

export function UnifiedFeed({ events }) {
  return (
    <div className="feed">
      {events.map((event) => (
        <article key={event.id} className="feed-item">
          <span className="feed-dot" />
          <div>
            <strong>{event.type}</strong>
            <span>{event.location}</span>
          </div>
          <time>{event.timestamp}</time>
          <StatusPill tone={event.status === "Active" ? "danger" : event.status === "Watch" ? "warn" : "ok"}>{event.status}</StatusPill>
        </article>
      ))}
    </div>
  );
}
