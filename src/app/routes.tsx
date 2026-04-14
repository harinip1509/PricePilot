import { createBrowserRouter } from "react-router";
import { LandingPage } from "./pages/LandingPage";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { DashboardLayout } from "./components/DashboardLayout";
import { Dashboard } from "./pages/Dashboard";
import { Products } from "./pages/Products";
import { ProductDetail } from "./pages/ProductDetail";
import { PricingRules } from "./pages/PricingRules";
import { Analytics } from "./pages/Analytics";
import { Alerts } from "./pages/Alerts";
import { Settings } from "./pages/Settings";
import { ProtectedRoute } from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/signup",
    Component: Signup,
  },
  {
    path: "/app",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, Component: Dashboard },
      { path: "products", Component: Products },
      { path: "products/:id", Component: ProductDetail },
      { path: "pricing-rules", Component: PricingRules },
      { path: "analytics", Component: Analytics },
      { path: "alerts", Component: Alerts },
      { path: "settings", Component: Settings },
    ],
  },
]);
