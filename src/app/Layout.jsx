import Footer from "@/components/Footer";
import Header from "@/components/header/Index";
import useIsMobile from "@/hooks/useInMobile";
import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const isMobile = useIsMobile();
  return (
    <>
      <Header />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <div className={isMobile ? `pb-10` : ""}>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
