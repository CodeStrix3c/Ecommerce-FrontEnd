import Header from "@/components/header/Index";
import Footer from "@/components/Footer";
import { Outlet, useLocation } from "react-router-dom";
import useIsMobile from "@/hooks/useInMobile";

const WebsiteLayout = () => {
  const isMobile = useIsMobile();
  const location = useLocation();

  // Routes where Header/Footer should be hidden
  const hideLayoutRoutes = ["/vendorslandingpage"];

  const hideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <>
      {!hideLayout && <Header />}

      <div className="min-h-screen">
        <Outlet />
      </div>

      {!hideLayout && <Footer />}
    </>
  );
};

export default WebsiteLayout;
