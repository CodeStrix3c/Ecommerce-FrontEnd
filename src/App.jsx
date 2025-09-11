import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "leaflet/dist/leaflet.css";
import IndexPage from "./features/IndexPage";
import LoginPage from "./features/auth/pages/LoginPage";
import RegisterPage from "./features/auth/pages/RegisterPage";
import ProfilePage from "./features/auth/pages/ProfilePage";
import PlacesFormPage from "./features/places/pages/PlacesFormPage";
import PlacePage from "./features/places/pages/PlacePage";
import BookingsPage from "./features/bookings/pages/BookingsPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import SingleBookedPlace from "./features/bookings/pages/SingleBookedPlace";
import Layout from "./app/Layout";
import axiosInstance from "./utils/axios";
import { getItemFromLocalStorage } from "./utils";
import PlacesPage from "./features/places/pages/PlacesPage";
import AppProvider from "./providers/AppProvider";
import CompanyDetails from "./features/privacy-policies/pages/CompanyDetails";
import Privacy from "./features/privacy-policies/pages/Privacy";
import Sitemap from "./features/privacy-policies/pages/Sitemap";
import Terms from "./features/privacy-policies/pages/Terms";
import ScrollToTop from "./components/shared/ScrollToTop";
import SupplierRegister from "./features/auth/pages/SupplierRegister";
import SupplierLogin from "./features/auth/pages/SupplierLogin";
import Wishlist from "./features/wishlist/pages/WishListPage";
import CartPage from "./features/cart/pages/CartPage";
import NotFoundPage from "./features/errors/NotFoundPage";
import EmptyState from "./components/shared/EmptyState";
import FarmerRegister from "./features/auth/pages/FarmerRegister";
import TalkWithExpert from "./features/talk-with-expert/pages/TalkWithExpert";
import FarmerLogin from "./features/auth/pages/FarmerLogin";

function App() {
  useEffect(() => {
    axiosInstance.defaults.headers.common["Authorization"] =
      `Bearer ${getItemFromLocalStorage("token")}`;
  }, []);

  return (
    <>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <AppProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<IndexPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/supplier-register" element={<SupplierRegister />} />
              <Route path="/supplier-login" element={<SupplierLogin />} />
              <Route path="/farmer-register" element={<FarmerRegister />} />
              <Route path="/farmer-login" element={<FarmerLogin />} />

              <Route path="/account" element={<ProfilePage />} />
              <Route path="/account" element={<ProfilePage />} />
              <Route path="/company-details" element={<CompanyDetails />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/sitemap" element={<Sitemap />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/account/places" element={<PlacesPage />} />
              <Route path="/account/places/new" element={<PlacesFormPage />} />
              <Route path="/account/places/:id" element={<PlacesFormPage />} />
              <Route path="/place/:id" element={<PlacePage />} />
              <Route path="/account/bookings" element={<BookingsPage />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/talk-with-expert" element={<TalkWithExpert />} />
              <Route path="/cart" element={<CartPage />} />
              <Route
                path="/account/bookings/:id"
                element={<SingleBookedPlace />}
              />

              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
          <ToastContainer autoClose={2000} transition={Slide} />
        </AppProvider>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
