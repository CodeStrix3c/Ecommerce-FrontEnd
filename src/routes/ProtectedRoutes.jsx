import { Route } from "react-router-dom";
import { lazy } from "react";

import ProtectedRoute from "@/components/shared/ProtectedRoute";
import ProtectedLayout from "@/app/layouts/ProtectedLayout";
import DashboardLayout from "@/app/layouts/DashboardLayout";
import VendorSettings from "@/supplier/pages/VendorSettings";
import AboutUs from "@/features/about-us/pages/AboutUs";
import { HelpCenter } from "@mui/icons-material";
import VendorHelpCenter from "@/supplier/pages/VendorHelpCenter";
import AgricultureHelpCenter from "@/features/help-center/pages/HelpCenter";
import SettingsPage from "@/features/settings/SettingsPage";
import AddressPage from "@/features/address/addressPage";
import OrdersPage from "@/supplier/pages/OrdersPage";

import PaymentPage from "@/features/payment/paymentPage";

/* ================= AUTH / COMMON ================= */
const TalkWithExpert = lazy(
  () => import("@/features/talk-with-expert/pages/TalkWithExpert"),
);

const OrderHistoryPage = lazy(
  () => import("@/features/orders/orderHistory/pages/orderHistoryPage"),
);
const UserOrderPage = lazy(
  () => import("@/features/orders/userOrders/pages/UserOrdersPage"),
);
const OrderDetailsPage = lazy(
  () => import("@/features/orders/orderDetails/pages/OrderDetailsPage"),
);

/* ================= ACCOUNT ================= */
const PlacesPage = lazy(() => import("@/features/places/pages/PlacesPage"));
const PlacesFormPage = lazy(
  () => import("@/features/places/pages/PlacesFormPage"),
);
const BookingsPage = lazy(
  () => import("@/features/bookings/pages/BookingsPage"),
);
const SingleBookedPlace = lazy(
  () => import("@/features/bookings/pages/SingleBookedPlace"),
);
const UserProfile = lazy(() => import("@/supplier/pages/UserSupplier"));

/* ================= PROFILES ================= */
const FarmerProfilePage = lazy(
  () => import("@/features/farmers/pages/FarmerProfilePage"),
);
const FarmerProfileCompletion = lazy(
  () => import("@/features/farmers/pages/FarmerProfileCompletion"),
);

const SupplierProfilePage = lazy(
  () => import("@/features/suppliers/pages/SupplierProfilePage"),
);
const SupplierProfileCompletion = lazy(
  () => import("@/features/suppliers/pages/SupplierProfileCompletion"),
);

/* ================= DASHBOARD ================= */
const SupplierDashboard = lazy(() => import("@/supplier/pages/dashboardPage"));
const AllProductList = lazy(() => import("@/supplier/pages/AllProductList"));

const OrchardPanel = lazy(
  () => import("@/features/dashboard/farmer-dashboard/pages/OrchardPanel"),
);
const WeatherPanel = lazy(
  () => import("@/features/dashboard/farmer-dashboard/pages/WeatherPanel"),
);
const SoilWaterNutrientPanel = lazy(
  () =>
    import(
      "@/features/dashboard/farmer-dashboard/pages/SoilWaterNutrientPanel"
    ),
);
const PestPanel = lazy(
  () => import("@/features/dashboard/farmer-dashboard/pages/PestPanel"),
);
const ResourcesPanel = lazy(
  () => import("@/features/dashboard/farmer-dashboard/pages/ResourcesPanel"),
);
const FinancialPanel = lazy(
  () => import("@/features/dashboard/farmer-dashboard/pages/FinancialPanel"),
);
const KnowledgePanel = lazy(
  () => import("@/features/dashboard/farmer-dashboard/pages/KnowledgePanel"),
);
const AlertPanel = lazy(
  () => import("@/features/dashboard/farmer-dashboard/pages/AlertPanel"),
);

export default [
  /* ================= PROTECTED APP ================= */
  <Route element={<ProtectedRoute />} key="protected">
    <Route element={<ProtectedLayout />}>
      <Route path="/talk-with-expert" element={<TalkWithExpert />} />

      <Route path="/orders" element={<OrderHistoryPage />} />
      <Route path="/user-orders/:id" element={<UserOrderPage />} />
      <Route path="/order-details/:id" element={<OrderDetailsPage />} />
      <Route path="/address" element={<AddressPage />} />
      <Route path="payment" element={<PaymentPage />} />

      {/* Account */}
      <Route path="/account/places" element={<PlacesPage />} />
      <Route path="/account/places/new" element={<PlacesFormPage />} />
      <Route path="/account/places/:id" element={<PlacesFormPage />} />
      <Route path="/account/bookings" element={<BookingsPage />} />
      <Route path="/account/bookings/:id" element={<SingleBookedPlace />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/order" element={<OrdersPage />} />

      {/* Profiles */}
      <Route path="/farmer-profile" element={<FarmerProfilePage />} />
      <Route
        path="/farmer-profile-completion"
        element={<FarmerProfileCompletion />}
      />
      <Route path="/supplier-profile" element={<SupplierProfilePage />} />
      <Route
        path="/supplier-profile-completion"
        element={<SupplierProfileCompletion />}
      />
    </Route>
  </Route>,

  /* ================= DASHBOARD ================= */
  <Route element={<ProtectedRoute />} key="dashboard">
    <Route path="/dashboard" element={<DashboardLayout />}>
      <Route index element={<SupplierDashboard />} />
      <Route path="all-products" element={<AllProductList />} />
      <Route path="about-us" element={<AboutUs />} />
      <Route path="help-center" element={<AgricultureHelpCenter />} />
      <Route path="vendor-profile" element={<VendorSettings />} />
      <Route path="orchard" element={<OrchardPanel />} />
      <Route path="weather" element={<WeatherPanel />} />
      <Route path="soil" element={<SoilWaterNutrientPanel />} />
      <Route path="pest" element={<PestPanel />} />
      <Route path="resources" element={<ResourcesPanel />} />
      <Route path="financial" element={<FinancialPanel />} />
      <Route path="knowledge" element={<KnowledgePanel />} />
      <Route path="alerts" element={<AlertPanel />} />


    </Route>
  </Route>,
];
