import { useAuthSync } from "@/hooks/useAuthSync";
import { getItemFromLocalStorage } from "@/utils/localStorage";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = getItemFromLocalStorage("token");
  useAuthSync();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
