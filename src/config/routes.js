export const ROUTES = {
  home: "/",
  login: "/login",
  dashboard: "/dashboard",
  intrusion: "/intrusion",
  vehicles: "/vehicles",
  security: "/security",
  history: "/history",
};

export const LEGACY_ROUTES = {
  "/index.html": ROUTES.home,
  "/login.html": ROUTES.login,
};

export const NAV_ITEMS = [
  ["dashboard", ROUTES.dashboard, "Dashboard", "grid"],
  ["intrusion", ROUTES.intrusion, "Intrusion Detection", "shield"],
  ["vehicles", ROUTES.vehicles, "Vehicle Monitoring", "car"],
  ["security", ROUTES.security, "Security Monitoring", "user"],
  ["history", ROUTES.history, "Event History", "clock"],
];

export const TOKEN_KEY = "skylineToken";
export const API_BASE = (import.meta.env.VITE_API_BASE || localStorage.getItem("skylineApiBase") || "http://192.168.0.191:8000").replace(/\/$/, "");
