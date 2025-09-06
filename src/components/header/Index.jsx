import { useLocation } from "react-router-dom";
import useIsMobile from "@/hooks/useInMobile";
import MobileHeader from "./MobileHeader";
import DesktopHeader from "./DesktopHeader";

const Header = () => {
  const location = useLocation();
  const isMobile = useIsMobile();

  return isMobile ? (
    <MobileHeader location={location} />
  ) : (
    <DesktopHeader location={location} />
  );
};

export default Header;
