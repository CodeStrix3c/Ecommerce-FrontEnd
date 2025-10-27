import { useState, useRef, useEffect } from "react";
import { Heart, ShoppingCart, Menu, LayoutDashboard } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useWishlist } from "@/providers/WishListProvider";
import { useCartList } from "@/providers/CartListProvider";
import useIsMobile from "@/hooks/useInMobile";
import DropdownPanel from "./DropDownPanel";
import { AccountCircle } from "@mui/icons-material";
import SidebarMobile from "./SidebarMobile";
import { getItemFromLocalStorage } from "@/utils/localStorage";

const DropdownMenu = () => {
  const [open, setOpen] = useState(false);
  const [isSupplierLoggedIn, setIsSupplierLoggedIn] = useState(false);
  const menuRef = useRef(null);
  const { wishlist } = useWishlist();
  const { cartList } = useCartList();
  const isBelow920 = useIsMobile(920);
  const isBelow500 = useIsMobile(620);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getItemFromLocalStorage("SRT");
    setIsSupplierLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <div className="flex items-center gap-2">
        {!isBelow500 &&
          (isSupplierLoggedIn ? (
            <button
              onClick={() => navigate("/dashboard/orchard")}
              className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-[var(--color-black)] transition-all duration-200 hover:bg-[var(--color-black-hover)]"
            >
              <LayoutDashboard className="h-4 w-4" />
              Supplier Dashboard
            </button>
          ) : (
            <Link
              to="/supplier-register"
              className="rounded-full px-3 py-1 text-sm font-semibold text-[var(--color-black)] transition-all duration-200 hover:bg-[var(--color-black-hover)]"
            >
              Become a Supplier
            </Link>
          ))}

        {/* Wishlist */}
        <Link
          to="/wishlist"
          className="relative rounded-full p-2 hover:bg-[var(--color-black-hover)] transition-colors duration-200"
        >
          <Heart size={18} className="text-[var(--color-black)]" />
          {wishlist.length > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-secondary)] text-[10px] font-bold text-[var(--color-white)] animate-popin">
              {wishlist.length}
            </span>
          )}
        </Link>

        {/* Cart */}
        <Link
          to="/cart"
          className="relative rounded-full p-2 hover:bg-[var(--color-black-hover)] transition-colors duration-200"
        >
          <ShoppingCart size={18} className="text-[var(--color-black)]" />
          {cartList.length > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-secondary)] text-[10px] font-bold text-[var(--color-white)] animate-popin">
              {cartList.length}
            </span>
          )}
        </Link>

        {/* Dropdown Button */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setOpen(!open)}
            className="border rounded-2xl px-3 py-1.5 flex items-center space-x-2 bg-[var(--color-black-hover)] hover:bg-[var(--color-black-hover)] transition"
          >
            <Menu size={18} className="text-[var(--color-black)]" />
            <AccountCircle sx={{ fontSize: 22, color: "var(--color-black)" }} />
          </button>
        </div>
      </div>

      {isBelow920 ? (
        <SidebarMobile
          open={open}
          onClose={() => setOpen(false)}
          isSupplierLoggedIn={isSupplierLoggedIn}
        />
      ) : (
        <DropdownPanel
          open={open}
          onClose={() => setOpen(false)}
          isSupplierLoggedIn={isSupplierLoggedIn}
        />
      )}
    </div>
  );
};

export default DropdownMenu;
