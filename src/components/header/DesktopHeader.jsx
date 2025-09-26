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
  const isPlacePage = /^\/place\/\d+/.test(location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      setHasShadow(window.scrollY > 0);
      setOpenSearchBar(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      style={{
        backgroundColor: "var(--color-white)",
        boxShadow:
          location.pathname === "/home"
            ? "inset 0px -60px 60px -10px rgba(0, 0, 0, 0.05)"
            : "none",
      }}
      className="fixed top-0 z-50 w-full pt-5 transition-shadow duration-500 bg-[var(--color-white)] border-b border-gray-100"
    >
      <motion.div
        initial={false}
        animate={{ maxWidth: isPlacePage ? "74vw" : "93vw" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="mx-auto py-3 grid grid-cols-[auto_1fr_auto] items-center gap-6 w-full"
      >
        {/* Left: Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <img
            src="assets/images/ziraat.png"
            alt="ziraat"
            width={80}
            height={80}
          />
        </NavLink>

        {/* Center: Navbar / SubSearch */}
        <AnimatePresence mode="wait">
          {scrollY < 100 ? (
            <motion.div
              key="navbar"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="flex justify-center"
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
              className="flex justify-center"
            >
              <div onClick={() => setOpenSearchBar(!openSearchBar)}>
                <SubSearchModal />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Right: Dropdown / Actions */}
        <div className="flex items-center gap-4 justify-start">
          <DropdownMenu />
        </div>
      </motion.div>

      {/* Below header row */}
      {location.pathname === "/home" && scrollY < 100 && (
        <div className="flex justify-center py-3 pb-10  ">
          <SearchBar />
        </div>
      )}

      {/* Animated search bar */}
      <AnimatePresence>
        {openSearchBar && (
          <motion.div
            key="searchbar"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex justify-center py-4"
          >
            <SearchBar />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default DesktopHeader;
