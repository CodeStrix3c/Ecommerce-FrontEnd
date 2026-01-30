import { useState, useRef, useEffect } from "react";
import { Heart, ShoppingCart, Menu, Palette } from "lucide-react";
import { useWishlist } from "@/providers/WishListProvider";
import { useCartList } from "@/providers/CartListProvider";
import useIsMobile from "@/hooks/useInMobile";
import DropdownPanel from "./DropDownPanel";
import SidebarMobile from "./SidebarMobile";
import { AccountCircle } from "@mui/icons-material";
import { useNavigate, Link } from "react-router-dom";

const DropdownMenu = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const { wishlist } = useWishlist();
  const { cartList } = useCartList();

  const isBelow920 = useIsMobile(920);
  const isBelow500 = useIsMobile(620);

  // ✅ READ AUTH DATA FROM LOCALSTORAGE
  const token = localStorage.getItem("token");
  const rolesRaw = localStorage.getItem("roles");

  let roles = [];
  try {
    roles = rolesRaw ? JSON.parse(rolesRaw) : [];
  } catch (e) {
    roles = [];
  }

  const isVendor = token && roles.includes("vendor");

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
        {/* ✅ VENDOR / BECOME VENDOR SECTION */}
        {!isBelow500 && (
          <div className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-[var(--color-black)] cursor-pointer">
            <Palette className="h-4 w-4" />

            {isVendor ? (
              <span onClick={() => navigate("/dashboard")}>
                Vendor Dashboard
              </span>
            ) : !token ? (
              <Link to="/vendor-signup">Become a Vendor</Link>
            ) : (
              <Link to="/supplier-register">Become a Vendor</Link>
            )}
          </div>
        )}

        {/* Wishlist */}
        <button
          onClick={() => navigate("/wishlist")}
          className="relative rounded-full p-2 hover:bg-[var(--color-black-hover)] transition-colors duration-200"
        >
          <Heart size={18} className="text-[var(--color-black)]" />
          {wishlist.length > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-secondary)] text-[10px] font-bold text-[var(--color-white)]">
              {wishlist.length}
            </span>
          )}
        </button>

        {/* Cart */}
        <button
          onClick={() => navigate("/cart")}
          className="relative rounded-full p-2 hover:bg-[var(--color-black-hover)] transition-colors duration-200"
        >
          <ShoppingCart size={18} className="text-[var(--color-black)]" />
          {cartList.length > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-secondary)] text-[10px] font-bold text-[var(--color-white)]">
              {cartList.length}
            </span>
          )}
        </button>

        {/* Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="border rounded-2xl px-3 py-1.5 flex items-center space-x-2 bg-[var(--color-black-hover)] transition"
        >
          <Menu size={18} className="text-[var(--color-black)]" />
          <AccountCircle sx={{ fontSize: 22, color: "var(--color-black)" }} />
        </button>
      </div>

      {/* Mobile / Desktop Menu */}
      {isBelow920 ? (
        <SidebarMobile
          open={open}
          onClose={() => setOpen(false)}
          isSupplierLoggedIn={isVendor}
        />
      ) : (
        <DropdownPanel
          open={open}
          onClose={() => setOpen(false)}
          isSupplierLoggedIn={isVendor}
        />
      )}
    </div>
  );
};

export default DropdownMenu;
