import { Route, Navigate } from "react-router-dom";
import { lazy } from "react";
import WebsiteLayout from "@/app/layouts/WebsiteLayout";
import AuthLayout from "@/app/layouts/AuthLayout";
import PublicRoute from "@/components/shared/PublicRoute";
import CartPage from "@/features/cart/pages/CartPage";
import WishlistPage from "@/features/wishlist/pages/WishListPage";
import SupplierSignUp from "@/features/supplier-registration/SupplierSignup";
import GiDetails from "@/features/places/pages/GiDetails";
import WoodcraftPage from "@/features/woodcraft/pages/WoodcraftPage";
import TextilesPage from "@/features/textiles/pages/Textiles";
import MetalsCraftPage from "@/features/metals/pages/Metalstone";
import PrivacyPolicy from "@/features/privacy-policies/pages/Privacy";
import Terms from "@/features/privacy-policies/pages/Terms";
import CompanyDetails from "@/features/suppliers/components/CompanyDetails";
import Sitemap from "@/features/privacy-policies/pages/Sitemap";





const IndexPage = lazy(() => import("@/features/IndexPage"));
const LoginPage = lazy(() => import("@/features/auth/pages/LoginPage"));
const SignUpPage = lazy(
  () => import("@/features/farmer-registration/SignUpPage"),
);
const SupplierLogin = lazy(() => import("@/features/auth/pages/SupplierLogin"));
const SupplierRegistration = lazy(
  () => import("@/features/supplier-registration/SupplierRegistration"),
);

const AboutUs = lazy(() => import("@/features/about-us/pages/AboutUs"));
const Faq = lazy(() => import("@/features/FAQ/Faq"));
const FarmingTechniques = lazy(
  () => import("@/features/farming-techniques/FarmingTechniques"),
);
const CropInformation = lazy(
  () => import("@/features/crop-information/pages/CropInformation"),
);
const CropProtectionPage = lazy(
  () => import("@/features/Protection-info/pages/ProtectionInfo"),
);
const WeatherPage = lazy(
  () => import("@/features/weather-info/pages/WeatherPage"),
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
      <Route path="/wood-craft" element={<WoodcraftPage />} />
      <Route path="/metal-craft" element={<MetalsCraftPage />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/FAQ" element={<Faq />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/wishlist" element={<WishlistPage />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/sitemap" element={<Sitemap />} />
      <Route path="/company-details" element={<CompanyDetails />} />


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
      <Route path="/textitles" element={<TextilesPage />} />

      <Route path="/place/:id" element={<PlacePage />} />
      <Route path="*" element={<NotFoundPage />} />

      <Route path="/gi-details/:giTag" element={<GiDetails />} />
    </Route>
  </Route>,
];
