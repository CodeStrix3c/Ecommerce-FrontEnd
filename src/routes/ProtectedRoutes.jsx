import { Route } from "react-router-dom";
import { lazy } from "react";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import FarmerProfilePage from "@/features/farmers/pages/FarmerProfilePage";
import UserOrderPage from "@/features/orders/userOrders/pages/UserOrdersPage";

import { SupplierProduct } from "@/features/suppliers/components/SupplierProduct";
import OrchardsPage from "@/features/orchards/pages/MyOrchards";
import SingleOrchardPage from "@/features/orchards/pages/SingleOrchardPage";
import { SprayPage } from "@/features/spray/pages/SprayPage";
import SupplierInfo from "@/features/supplier-info/pages/SupplierInfo";
import Harvest from "@/features/Harvest/Harvest";

const Layout = lazy(() => import("../app/Layout"));
const SupplierRegistration = lazy(
  () => import("../features/supplier-registration/SupplierRegistration")
);
const IndexPage = lazy(() => import("../features/IndexPage"));
const CompanyDetails = lazy(
  () => import("../features/privacy-policies/pages/CompanyDetails")
);

const CropInformation = lazy(
  () => import("../features/crop-information/pages/CropInformation")
);
const AgricultureHelpCenter = lazy(
  () => import("../features/help-center/pages/HelpCenter")
);
const OrchardRegistration = lazy(
  () => import("../features/orchard-registration/OrchardRegistration")
);
const MyOrchards = lazy(() => import("../features/orchards/pages/MyOrchards"));
const AboutUs = lazy(() => import("../features/about-us/pages/AboutUs"));
const Privacy = lazy(
  () => import("../features/privacy-policies/pages/Privacy")
);
const Sitemap = lazy(
  () => import("../features/privacy-policies/pages/Sitemap")
);
const Terms = lazy(() => import("../features/privacy-policies/pages/Terms"));
const WeatherPage = lazy(
  () => import("../features/weather-info/pages/WeatherPage")
);
const PlacesPage = lazy(() => import("../features/places/pages/PlacesPage"));
const PlacesFormPage = lazy(
  () => import("../features/places/pages/PlacesFormPage")
);
const PlacePage = lazy(() => import("../features/places/pages/PlacePage"));
const BookingsPage = lazy(
  () => import("../features/bookings/pages/BookingsPage")
);
const Wishlist = lazy(() => import("../features/wishlist/pages/WishListPage"));
const TalkWithExpert = lazy(
  () => import("../features/talk-with-expert/pages/TalkWithExpert")
);
const CartPage = lazy(() => import("../features/cart/pages/CartPage"));
const SupplierProfilePage = lazy(
  () => import("../features/suppliers/pages/SupplierProfilePage")
);
const SingleBookedPlace = lazy(
  () => import("../features/bookings/pages/SingleBookedPlace")
);
const NotFoundPage = lazy(() => import("../features/errors/NotFoundPage"));
const SupplierLogin = lazy(
  () => import("../features/auth/pages/SupplierLogin")
);

const OrderHistoryPage = lazy(
  () => import("../features/orders/orderHistory/pages/orderHistoryPage")
)

const OrderDetailsPage = lazy(
  () => import("../features/orders/orderDetails/pages/orderDetailsPage")
)


export default [
  <Route element={<ProtectedRoute />} key={"protected"}>
    <Route path="/" element={<Layout />}>
      <Route path="/supplier-register" element={<SupplierRegistration />} />
      <Route path="/harvest" element={<Harvest/>}/>
      <Route path="/home" element={<IndexPage />} />
      <Route path="/company-details" element={<CompanyDetails />} />
      <Route path="/farmer-profile" element={<FarmerProfilePage />} />
      <Route path="/resources/crop-information" element={<CropInformation />} />
      <Route path="/help-center" element={<AgricultureHelpCenter />} />
      {/* <Route path="/orchard-registration" element={<OrchardRegistration />} /> */}
      <Route path="/my-orchards" element={<OrchardsPage />} />
      <Route path="/orchards/:id" element={<SingleOrchardPage />} />
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
      <Route path="/supplier-profile" element={<SupplierInfo />} />
      <Route path="/spray" element={<SprayPage />} />
      <Route path="/supplier-Product" element={<SupplierProduct />} />
      <Route path="/account/bookings/:id" element={<SingleBookedPlace />} />
      <Route path="*" element={<NotFoundPage />} />
            <Route path="/orders" element={<OrderHistoryPage />} />                  
      <Route path="/user-orders/:id" element={<UserOrderPage />} />          
      <Route path="/order-details/:id" element={<OrderDetailsPage />} />

      
    </Route>
  </Route>,
];
