import Footer from "@/components/Footer";
import Header from "@/components/Header";
import useIsMobile from "@/hooks/useInMobile";
import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const isMobile = useIsMobile();
  return (
    <>
      <Header />
      <div className="mx-auto flex min-h-screen max-w-screen-xl flex-col px-4">
        <Outlet />
      </div>
      <div className={isMobile ? `pb-10` : ""}>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
