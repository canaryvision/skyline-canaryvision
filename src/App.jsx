import { LEGACY_ROUTES, ROUTES } from "./config/routes";
import { DashboardPage } from "./pages/DashboardPage";
import { HistoryPage } from "./pages/HistoryPage";
import { IntrusionPage } from "./pages/IntrusionPage";
import { LoginPage } from "./pages/LoginPage";
import { SecurityPage } from "./pages/SecurityPage";
import { SplashPage } from "./pages/SplashPage";
import { VehiclesPage } from "./pages/VehiclesPage";

export function App() {
  const normalizedPath = location.pathname === "/" ? ROUTES.home : location.pathname.replace(/\/+$/, "");
  const canonicalPath = LEGACY_ROUTES[location.pathname] || normalizedPath || ROUTES.home;

  if (canonicalPath !== location.pathname) {
    history.replaceState(null, "", `${canonicalPath}${location.search}${location.hash}`);
  }

  const pages = {
    [ROUTES.dashboard]: <DashboardPage />,
    [ROUTES.intrusion]: <IntrusionPage />,
    [ROUTES.vehicles]: <VehiclesPage />,
    [ROUTES.security]: <SecurityPage />,
    [ROUTES.history]: <HistoryPage />,
  };

  if (canonicalPath === ROUTES.home) return <SplashPage />;
  if (canonicalPath === ROUTES.login) return <LoginPage />;
  return pages[canonicalPath] || <DashboardPage />;
}
