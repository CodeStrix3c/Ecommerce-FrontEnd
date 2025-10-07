import Footer from "@/components/Footer";
import Header from "@/components/header/Index";
import useIsMobile from "@/hooks/useInMobile";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";

const ProtectedLayout = () => {
  const isMobile = useIsMobile();
  const location = useLocation();

  const firstPath = location.pathname.split("/")[1];

  const footerPadding =
    firstPath === "place" && isMobile ? "pb-44" : isMobile ? "pb-12" : "";

  return (
    <>
      <Header />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <div className={footerPadding}>
        <Footer />
      </div>
    </>
  );
};

export default ProtectedLayout;
