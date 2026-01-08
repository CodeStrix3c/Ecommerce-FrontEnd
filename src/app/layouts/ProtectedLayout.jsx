import Header from "@/components/header/Index";
import useIsMobile from "@/hooks/useInMobile";
import React from "react";
import Footer from "@/components/Footer";
import { Outlet, useLocation } from "react-router-dom";

const ProtectedLayout = () => {
  const isMobile = useIsMobile();
  const location = useLocation();

  const firstPath = location.pathname.split("/")[1];
  const isCartPage = location.pathname === "/cart";
  const isPlacePage = firstPath === "place";

  let bottomPadding = "";
  if (isMobile) {
    if (isCartPage) {
      bottomPadding = "pb-28";
    } else if (isPlacePage) {
      bottomPadding = "pb-44";
    } else {
      bottomPadding = "pb-12";
    }
  }

  return (
    <>
      <Header />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <div className={bottomPadding}>
        <Footer />
      </div>
    </>
  );
};

export default ProtectedLayout;
