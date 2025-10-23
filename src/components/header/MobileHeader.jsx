import { useState } from "react";
import { NavLink } from "react-router-dom";
import NavBar from "../ui/NavBar";
import DropdownMenu from "../ui/DropDownMenu";
import MobileSearchModal from "../ui/MobileSearchModal";
import SearchBar from "../shared/SearchBar";
import ContentWrapper from "../shared/ContentWrapper";

const MobileHeader = ({ location }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <ContentWrapper>
        <div className="sticky top-0 z-50 flex items-center justify-between py-2 bg-[var(--color-white)]">
          <NavLink to="/home" className="flex items-center gap-2">
            <img
              src="/assets/images/ziraat.jpeg"
              alt="ziraat"
              width={60}
              height={60}
            />
          </NavLink>
          <DropdownMenu />
        </div>

        {location.pathname === "/home" && (
          <div
            className="sticky top-[52px] z-10 bg-[var(--color-white)] px-4 py-2 "
            onClick={() => setIsSearchOpen(true)}
          >
            <SearchBar />
          </div>
        )}

        <div className="fixed bottom-0 left-0 right-0 z-10 border-t border-[var(--color-overlay)] bg-[var(--color-white)] ">
          <NavBar />
        </div>

        <MobileSearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
        />
      </ContentWrapper>
    </>
  );
};

export default MobileHeader;
