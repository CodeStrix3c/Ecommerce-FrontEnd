import { Route, Navigate } from "react-router-dom";
import { lazy } from "react";
import WebsiteLayout from "@/app/layouts/WebsiteLayout";
import AuthLayout from "@/app/layouts/AuthLayout";
import PublicRoute from "@/components/shared/PublicRoute";
import Harvest from "@/features/Harvest/Pages/Harvest";
import SprayHistory from "@/features/spray/components/SprayCard";
import CartPage from "@/features/cart/pages/CartPage";
import WishlistPage from "@/features/wishlist/pages/WishListPage";
import SupplierSignUp from "@/features/supplier-registration/SupplierSignup";

const IndexPage = lazy(() => import("@/features/IndexPage"));
const LoginPage = lazy(() => import("@/features/auth/pages/LoginPage"));
const SignUpPage = lazy(
  () => import("@/features/farmer-registration/SignUpPage")
);
const SupplierLogin = lazy(() => import("@/features/auth/pages/SupplierLogin"));
const SupplierRegistration = lazy(
  () => import("@/features/supplier-registration/SupplierRegistration")
);

const AboutUs = lazy(() => import("@/features/about-us/pages/AboutUs"));
const Faq = lazy(() => import("@/features/FAQ/Faq"));
const FarmingTechniques = lazy(
  () => import("@/features/farming-techniques/FarmingTechniques")
);
const CropInformation = lazy(
  () => import("@/features/crop-information/pages/CropInformation")
);
const CropProtectionPage = lazy(
  () => import("@/features/Protection-info/pages/ProtectionInfo")
);
const WeatherPage = lazy(
  () => import("@/features/weather-info/pages/WeatherPage")
);
const SprayPage = lazy(() => import("@/features/spray/pages/SprayPage"));

const OrchardsPage = lazy(
  () => import("@/features/orchards/pages/OrchardsPage")
);
const SingleOrchardDetails = lazy(
  () => import("@/features/orchards/pages/SingleOrchardDetails")
);
const PlacePage = lazy(() => import("@/features/places/pages/PlacePage"));

const NotFoundPage = lazy(() => import("@/features/errors/NotFoundPage"));

export default [
  <Route element={<PublicRoute />} key="public">
    {/* AUTH PAGES */}
    <Route element={<AuthLayout />}>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignUpPage />} replace />
      <Route path="/vendor-signup" element={<SupplierSignUp />} />
      <Route path="/supplier-login" element={<SupplierLogin />} />
      <Route path="/supplier-register" element={<SupplierRegistration />} />
    </Route>

    {/* WEBSITE PAGES */}
    <Route element={<WebsiteLayout />}>
      <Route index element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<IndexPage />} />
      <Route path="/wood-craft" element={<Harvest />} />
      <Route path="/metal-craft" element={<SprayPage />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/FAQ" element={<Faq />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/wishlist" element={<WishlistPage />} />
      {/* Resources */}
      <Route
        path="/resources/farming-techniques"
        element={<FarmingTechniques />}
      />
      <Route path="/resources/crop-information" element={<CropInformation />} />
      <Route
        path="/resources/crop-protection"
        element={<CropProtectionPage />}
      />
      <Route path="/resources/weather" element={<WeatherPage />} />
      {/* Browsing */}
      <Route path="/textitles" element={<OrchardsPage />} />
      <Route path="/orchards/:id" element={<SingleOrchardDetails />} />
      <Route path="/place/:id" element={<PlacePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Route>,
];
