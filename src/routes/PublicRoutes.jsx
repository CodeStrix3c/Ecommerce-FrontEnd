import { Navigate, Route } from "react-router-dom";
import { lazy } from "react";
const PublicRoute = lazy(() => import("../components/shared/PublicRoute"));
const AuthLayout = lazy(() => import("../app/AuthLayout"));
const LoginPage = lazy(() => import("../features/auth/pages/LoginPage"));
const SignUpPage = lazy(
  () => import("../features/farmer-registration/SignUpPage")
);

export default [
  <Route element={<PublicRoute />} key="public">
    <Route element={<AuthLayout />} key="auth-layout">
      <Route index element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
    </Route>
  </Route>,
];
