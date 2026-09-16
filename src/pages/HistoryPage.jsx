import { useState } from "react";
import { mockApi } from "../api/mockApi";
import { Shell } from "../components/layout/Shell";
import { UnifiedFeed } from "../components/lists/UnifiedFeed";
import { Icon } from "../components/ui/Icon";
import { Section } from "../components/ui/Section";

export function HistoryPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const events = mockApi.unifiedEvents().filter((event) => {
    const text = `${event.type} ${event.location} ${event.status}`.toLowerCase();
    return (!search || text.includes(search.toLowerCase())) && (!status || event.status === status);
  });

  return (
    <Shell page="history" title="Event History" eyebrow="Unified activity archive">
      <Section title="All Events" meta={`${events.length} events`}>
        <div className="filters">
          <label className="search-field"><Icon name="search" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search events" /></label>
          <input type="date" aria-label="Date filter" />
          <select value={status} onChange={(event) => setStatus(event.target.value)} aria-label="Status filter">
            <option value="">All statuses</option>
            <option>Active</option>
            <option>Watch</option>
            <option>Verified</option>
            <option>Closed</option>
            <option>Resolved</option>
            <option>Listed</option>
          </select>
        </div>
        <UnifiedFeed events={events} />
      </Section>
    </Shell>
  );
}
