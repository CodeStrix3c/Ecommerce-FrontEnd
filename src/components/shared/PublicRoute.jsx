import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
<<<<<<< HEAD
  const token = !!localStorage.getItem("userLoginToken");
=======
  const token = !!localStorage.getItem("token");
>>>>>>> 91efd9998147dbc4f0908723ead972c9053db651

  if (token) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
