import { Navigate, Route } from "react-router-dom";
import { lazy } from "react";
const PublicRoute = lazy(() => import("../components/shared/PublicRoute"));
const AuthLayout = lazy(() => import("../app/AuthLayout"));
const LoginPage = lazy(() => import("../features/auth/pages/LoginPage"));
const RegisterPage = lazy(() => import("../features/auth/pages/RegisterPage"));
const SupplierLogin = lazy(
  () => import("../features/auth/pages/SupplierLogin")
);
const FarmerRegistration = lazy(
  () => import("../features/farmer-registration/FarmerRegistration")
);
const FarmerLogin = lazy(() => import("../features/auth/pages/FarmerLogin"));

export default [
  <Route element={<PublicRoute />} key="public">
    <Route element={<AuthLayout />} key="auth-layout">
      <Route index element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/supplier-login" element={<SupplierLogin />} />
      <Route path="/farmer-registration" element={<FarmerRegistration />} />
      <Route path="/farmer-login" element={<FarmerLogin />} />
    </Route>
  </Route>,
];
