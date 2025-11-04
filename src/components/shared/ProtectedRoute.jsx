import { useAuthSync } from "@/hooks/useAuthSync";
import { getItemFromLocalStorage } from "@/utils/localStorage";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = getItemFromLocalStorage("userLoginToken");
  useAuthSync();

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
