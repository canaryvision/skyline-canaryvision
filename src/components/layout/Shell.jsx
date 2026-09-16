import { useEffect, useState } from "react";
import { NAV_ITEMS, ROUTES, TOKEN_KEY } from "../../config/routes";
import { useClock } from "../../hooks/useClock";
import { Icon } from "../ui/Icon";
import { StatusPill } from "../ui/StatusPill";

export function Shell({ page, title, eyebrow, children }) {
  const [navOpen, setNavOpen] = useState(false);
  const now = useClock();

  useEffect(() => {
    document.title = `${title} - River Valley Skyline`;
  }, [title]);

  const signOut = () => {
    localStorage.removeItem(TOKEN_KEY);
    location.replace(ROUTES.home);
  };

  return (
    <div className="app-shell">
      <aside className={`sidebar ${navOpen ? "open" : ""}`}>
        <a className="side-brand" href={ROUTES.dashboard}>
          <img src="/cv_mark.png" alt="" />
          <span><strong>River Valley Skyline</strong><small>Security Operations</small></span>
        </a>
        <nav className="side-nav">
          {NAV_ITEMS.map(([key, href, label, icon]) => (
            <a key={key} className={`nav-link ${page === key ? "active" : ""}`} href={href} onClick={() => setNavOpen(false)}>
              <Icon name={icon} />
              <span>{label}</span>
            </a>
          ))}
        </nav>
        <div className="side-status">
          <StatusPill>System Operational</StatusPill>
          <span>All core services online</span>
        </div>
      </aside>
      <div className="app-main">
        <header className="topbar">
          <button className="icon-button mobile-only" type="button" aria-label="Open menu" onClick={() => setNavOpen(true)}><Icon name="menu" /></button>
          <div>
            <p>{eyebrow}</p>
            <h1>{title}</h1>
          </div>
          <span className="grow" />
          <div className="alert-chip"><Icon name="bell" /><span>1 active alert</span></div>
          <time>{now.toLocaleDateString([], { month: "short", day: "2-digit", year: "numeric" })} - {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</time>
          <button className="icon-button" type="button" aria-label="Sign out" onClick={signOut}><Icon name="logout" /></button>
        </header>
        <main className="content">{children}</main>
      </div>
      {navOpen ? <button className="scrim" type="button" aria-label="Close menu" onClick={() => setNavOpen(false)} /> : null}
    </div>
  );
}
