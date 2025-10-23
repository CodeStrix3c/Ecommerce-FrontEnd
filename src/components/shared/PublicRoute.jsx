import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  // const token = !!localStorage.getItem("userLoginToken");

  // if (token) {
  //   return <Navigate to="/home" replace />;
  // }

  return <Outlet />;
};

export default PublicRoute;
