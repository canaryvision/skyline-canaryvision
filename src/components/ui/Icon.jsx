const paths = {
  grid: "M4 4h6v6H4z M14 4h6v6h-6z M4 14h6v6H4z M14 14h6v6h-6z",
  shield: "M12 3l7 3v5c0 4.5-2.9 8.5-7 10-4.1-1.5-7-5.5-7-10V6z M12 8v5",
  car: "M5 16h14l-1.5-5h-11z M7 16v2 M17 16v2 M8 11l1.5-3h5L16 11",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M4 21a8 8 0 0 1 16 0",
  clock: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M12 7v5l3 2",
  bell: "M18 16H6l1-2V9a5 5 0 0 1 10 0v5z M10 19h4",
  search: "M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14z M16 16l5 5",
  menu: "M4 7h16 M4 12h16 M4 17h16",
  close: "M6 6l12 12 M18 6L6 18",
  logout: "M10 5H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4 M14 8l4 4-4 4 M18 12H9",
  collapse: "M4 4h16v16H4z M14 8l-4 4 4 4",
  expand: "M4 4h16v16H4z M10 8l4 4-4 4",
};

export function Icon({ name }) {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  );
}
