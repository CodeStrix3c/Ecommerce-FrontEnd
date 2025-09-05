import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Sprout } from "lucide-react";
import SearchBar from "./shared/SearchBar";
import NavBar from "./ui/NavBar";
import DropdownMenu from "./ui/DropDownMenu";
import useIsMobile from "@/hooks/useInMobile";
import SubSearchModal from "./ui/SubSearchModal";
import useOnScroll from "@/hooks/useOnScroll";
import { motion, AnimatePresence } from "framer-motion";
import MobileSearchModal from "./ui/MobileSearchModal";

const Header = () => {
  const location = useLocation();
  const [hasShadow, setHasShadow] = useState(false);
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const isMobile = useIsMobile();
  const scrollY = useOnScroll();

  useEffect(() => {
    const handleScroll = () => {
      setHasShadow(window.scrollY > 0);
      setOpenSearchBar(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {!isMobile && (
        <header
          className={`fixed top-0 z-50 w-full bg-white pt-5 transition-shadow ${
            hasShadow ? "shadow-md" : ""
          }`}
        >
          <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4 py-3">
            <NavLink to="/" className="flex items-center gap-2">
              <img
                src="assets/images/ziraat.jpeg"
                alt="ziraat"
                width={80}
                height={80}
              />
            </NavLink>

            <AnimatePresence mode="wait">
              {scrollY < 100 ? (
                <motion.div
                  key="navbar"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="flex flex-1 justify-center"
                >
                  <NavBar />
                </motion.div>
              ) : (
                <motion.div
                  key="subsearchmodal"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="flex flex-1 justify-center"
                >
                  <div onClick={() => setOpenSearchBar(!openSearchBar)}>
                    <SubSearchModal />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center gap-4">
              <DropdownMenu />
            </div>
          </div>

          {location.pathname === "/" && scrollY < 100 && (
            <div className="flex justify-center py-3">
              <SearchBar />
            </div>
          )}

          <AnimatePresence>
            {openSearchBar && (
              <motion.div
                key="searchbar"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="flex justify-center py-3"
              >
                <SearchBar />
              </motion.div>
            )}
          </AnimatePresence>
        </header>
      )}

      {isMobile && (
        <>
          <div
            className={`sticky top-0 z-10 flex items-center justify-between bg-white px-4 py-2 transition-shadow ${
              hasShadow ? "shadow-md" : "shadow-sm"
            }`}
          >
            <NavLink to="/" className="flex items-center gap-2">
              <img
                src="assets/images/ziraat.jpeg"
                alt="ziraat"
                width={60}
                height={60}
              />
            </NavLink>

            <DropdownMenu />
          </div>

          {location.pathname === "/" && (
            <div
              className="sticky top-[52px] z-10 bg-white px-4 py-2 shadow-sm"
              onClick={() => setIsSearchOpen(true)}
            >
              <SearchBar />
            </div>
          )}

          <div className="fixed bottom-0 left-0 right-0 z-10 border-t bg-white shadow-md">
            <NavBar isMobile />
          </div>
          <MobileSearchModal
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
          />
        </>
      )}
    </>
  );
};

export default Header;
