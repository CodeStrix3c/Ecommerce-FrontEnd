import { getItemFromLocalStorage } from "@/utils/localStorage";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // const token = getItemFromLocalStorage("userLoginToken");

  // if (!token) {
  //   return <Navigate to="/login" replace />;
  // }

  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
