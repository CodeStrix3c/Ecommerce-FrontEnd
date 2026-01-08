import Header from "@/components/header/Index";
import Footer from "@/components/Footer";
import { Outlet } from "react-router-dom";
import useIsMobile from "@/hooks/useInMobile";

const WebsiteLayout = () => {
  const isMobile = useIsMobile();

  return (
    <>
      <Header />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default WebsiteLayout;
