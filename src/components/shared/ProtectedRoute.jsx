// ProtectedRoute.tsx
import { getItemFromLocalStorage } from "@/utils";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = getItemFromLocalStorage("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
