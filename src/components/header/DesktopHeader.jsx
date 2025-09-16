import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import useOnScroll from "@/hooks/useOnScroll";
import DropdownMenu from "../ui/DropDownMenu";
import SearchBar from "../shared/SearchBar";
import NavBar from "../ui/NavBar";
import SubSearchModal from "../ui/SubSearchModal";

const DesktopHeader = ({ location }) => {
  const [hasShadow, setHasShadow] = useState(false);
  const [openSearchBar, setOpenSearchBar] = useState(false);

  const scrollY = useOnScroll();
  const isSupplierPage = location.pathname === "/supplier-register";

  useEffect(() => {
    const handleScroll = () => {
      setHasShadow(window.scrollY > 0);
      setOpenSearchBar(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerShadow = {
    backgroundColor: "var(--color-white)",
    // boxShadow:
    //  hasShadow
    //   ? "0 4px 6px var(--color-overlay)"
    //   : "0 1px 3px var(--color-overlay)",
    transition: "box-shadow 0.3s ease-in-out",
  };

  return (
    <header
      style={headerShadow}
      className="fixed top-0 z-50 w-full pt-5 transition-shadow duration-500 bg-[var(--color-white)]"
    >
      <div className="mx-auto flex max-w-[90vw] items-center justify-between py-3">
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

      {location.pathname === "/home" && scrollY < 100 && (
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
  );
};

export default DesktopHeader;
