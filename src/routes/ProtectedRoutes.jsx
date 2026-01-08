import { Route } from "react-router-dom";
import { lazy } from "react";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import ProtectedLayout from "@/app/layouts/ProtectedLayout";
import DashboardLayout from "@/app/layouts/DashboardLayout";

import UserOrderPage from "@/features/orders/userOrders/pages/UserOrdersPage";
import OrderDetailsPage from "@/features/orders/orderDetails/pages/OrderDetailsPage";

const CartPage = lazy(() => import("@/features/cart/pages/CartPage"));
const Wishlist = lazy(() => import("@/features/wishlist/pages/WishListPage"));
const TalkWithExpert = lazy(
  () => import("@/features/talk-with-expert/pages/TalkWithExpert")
);

const OrderHistoryPage = lazy(
  () => import("@/features/orders/orderHistory/pages/orderHistoryPage")
);

const FarmerProfilePage = lazy(
  () => import("@/features/farmers/pages/FarmerProfilePage")
);
const FarmerProfileCompletion = lazy(
  () => import("@/features/farmers/pages/FarmerProfileCompletion")
);

const SupplierProfilePage = lazy(
  () => import("@/features/suppliers/pages/SupplierProfilePage")
);
const SupplierProfileCompletion = lazy(
  () => import("@/features/suppliers/pages/SupplierProfileCompletion")
);

const PlacesPage = lazy(() => import("@/features/places/pages/PlacesPage"));
const PlacesFormPage = lazy(
  () => import("@/features/places/pages/PlacesFormPage")
);
const BookingsPage = lazy(
  () => import("@/features/bookings/pages/BookingsPage")
);
const SingleBookedPlace = lazy(
  () => import("@/features/bookings/pages/SingleBookedPlace")
);

/* Dashboard Panels */
import OrchardPanel from "@/features/dashboard/farmer-dashboard/pages/OrchardPanel";
import WeatherPanel from "@/features/dashboard/farmer-dashboard/pages/WeatherPanel";
import SoilWaterNutrientPanel from "@/features/dashboard/farmer-dashboard/pages/SoilWaterNutrientPanel";
import PestPanel from "@/features/dashboard/farmer-dashboard/pages/PestPanel";
import ResourcesPanel from "@/features/dashboard/farmer-dashboard/pages/ResourcesPanel";
import FinancialPanel from "@/features/dashboard/farmer-dashboard/pages/FinancialPanel";
import KnowledgePanel from "@/features/dashboard/farmer-dashboard/pages/KnowledgePanel";
import AlertPanel from "@/features/dashboard/farmer-dashboard/pages/AlertPanel";

export default [
  /* E-commerce / Account Protection */
  <Route element={<ProtectedRoute />} key="protected">
    <Route element={<ProtectedLayout />}>
      <Route path="/talk-with-expert" element={<TalkWithExpert />} />

      <Route path="/orders" element={<OrderHistoryPage />} />
      <Route path="/user-orders/:id" element={<UserOrderPage />} />
      <Route path="/order-details/:id" element={<OrderDetailsPage />} />

      {/* Account */}
      <Route path="/account/places" element={<PlacesPage />} />
      <Route path="/account/places/new" element={<PlacesFormPage />} />
      <Route path="/account/places/:id" element={<PlacesFormPage />} />
      <Route path="/account/bookings" element={<BookingsPage />} />
      <Route path="/account/bookings/:id" element={<SingleBookedPlace />} />

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

  /* Dashboard (Always Protected) */
  <Route element={<ProtectedRoute />} key="dashboard">
    <Route path="/dashboard" element={<DashboardLayout />}>
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
