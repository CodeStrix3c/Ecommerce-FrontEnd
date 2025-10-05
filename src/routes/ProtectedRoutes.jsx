import { Route } from "react-router-dom";
import { lazy } from "react";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import UserOrderPage from "@/features/orders/userOrders/pages/UserOrdersPage";
import OrderDetailsPage from "@/features/orders/orderDetails/pages/OrderDetailsPage";


const Layout = lazy(() => import("@/app/Layout"));
const SupplierRegistration = lazy(
  () => import("@/features/supplier-registration/SupplierRegistration")
);
const IndexPage = lazy(() => import("@/features/IndexPage"));
const CompanyDetails = lazy(
  () => import("@/features/privacy-policies/pages/CompanyDetails")
);
const CropInformation = lazy(
  () => import("@/features/crop-information/pages/CropInformation")
);
const AgricultureHelpCenter = lazy(
  () => import("@/features/help-center/pages/HelpCenter")
);
const AboutUs = lazy(() => import("@/features/about-us/pages/AboutUs"));
const Privacy = lazy(() => import("@/features/privacy-policies/pages/Privacy"));
const Sitemap = lazy(() => import("@/features/privacy-policies/pages/Sitemap"));
const Terms = lazy(() => import("@/features/privacy-policies/pages/Terms"));
const WeatherPage = lazy(
  () => import("@/features/weather-info/pages/WeatherPage")
);
const PlacesPage = lazy(() => import("@/features/places/pages/PlacesPage"));
const PlacesFormPage = lazy(
  () => import("@/features/places/pages/PlacesFormPage")
);
const PlacePage = lazy(() => import("@/features/places/pages/PlacePage"));
const BookingsPage = lazy(
  () => import("@/features/bookings/pages/BookingsPage")
);
const Wishlist = lazy(() => import("@/features/wishlist/pages/WishListPage"));
const TalkWithExpert = lazy(
  () => import("@/features/talk-with-expert/pages/TalkWithExpert")
);
const CartPage = lazy(() => import("@/features/cart/pages/CartPage"));
const SupplierProfilePage = lazy(
  () => import("@/features/suppliers/pages/SupplierProfilePage")
);
const SingleBookedPlace = lazy(
  () => import("@/features/bookings/pages/SingleBookedPlace")
);
const NotFoundPage = lazy(() => import("@/features/errors/NotFoundPage"));
const SupplierLogin = lazy(() => import("@/features/auth/pages/SupplierLogin"));
const FarmerProfilePage = lazy(
  () => import("@/features/farmers/pages/FarmerProfilePage")
);
const OrchardsPage = lazy(
  () => import("@/features/orchards/pages/OrchardsPage")
);
const SingleOrchardDetails = lazy(
  () => import("@/features/orchards/pages/SingleOrchardDetails")
);
const SprayPage = lazy(() => import("@/features/spray/pages/SprayPage"));
const Harvest = lazy(() => import("@/features/Harvest/Harvest"));
const SupplierProductPage = lazy(
  () => import("@/features/suppliers/pages/SupplierProductPage")
);

const OrderHistoryPage = lazy(
  () => import("../features/orders/orderHistory/pages/orderHistoryPage")
);

export default [
  <Route element={<ProtectedRoute />} key="protected">
    <Route path="/" element={<Layout />}>
      <Route path="/supplier-register" element={<SupplierRegistration />} />
      <Route path="/harvest" element={<Harvest />} />
      <Route path="/home" element={<IndexPage />} />
      <Route path="/company-details" element={<CompanyDetails />} />
      <Route path="/farmer-profile" element={<FarmerProfilePage />} />
      <Route path="/resources/crop-information" element={<CropInformation />} />
      <Route path="/help-center" element={<AgricultureHelpCenter />} />
      {/* <Route path="/orchard-registration" element={<OrchardRegistration />} /> */}
      <Route path="/orchards" element={<OrchardsPage />} />
      <Route path="/orchards/:id" element={<SingleOrchardDetails />} />
      <Route path="/supplier-login" element={<SupplierLogin />} />

      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/sitemap" element={<Sitemap />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/resources/weather" element={<WeatherPage />} />
      <Route path="/account/places" element={<PlacesPage />} />
      <Route path="/account/places/new" element={<PlacesFormPage />} />
      <Route path="/account/places/:id" element={<PlacesFormPage />} />
      <Route path="/place/:id" element={<PlacePage />} />
      <Route path="/account/bookings" element={<BookingsPage />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/talk-with-expert" element={<TalkWithExpert />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/supplier-profile" element={<SupplierProfilePage />} />
      <Route path="/spray" element={<SprayPage />} />
      <Route path="/supplier-product" element={<SupplierProductPage />} />
      <Route path="/account/bookings/:id" element={<SingleBookedPlace />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/orders" element={<OrderHistoryPage />} />
      <Route path="/user-orders/:id" element={<UserOrderPage />} />
      <Route path="/order-details/:id" element={<OrderDetailsPage />} />
    </Route>
  </Route>,
];
