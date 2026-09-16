export function Section({ title, meta, children }) {
  return (
    <section className="panel">
      <header className="panel-head">
        <h2>{title}</h2>
        {meta ? <span>{meta}</span> : null}
      </header>
      {children}
    </section>
  );
}
