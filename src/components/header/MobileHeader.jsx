import { useState } from "react";
import { NavLink } from "react-router-dom";
import NavBar from "../ui/NavBar";
import DropdownMenu from "../ui/DropDownMenu";
import MobileSearchModal from "../ui/MobileSearchModal";
import SearchBar from "../shared/SearchBar";

const MobileHeader = ({ location }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <div className="sticky top-0 z-50 flex items-center justify-between px-4 py-2 bg-white shadow-sm">
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
  );
};

export default MobileHeader;
