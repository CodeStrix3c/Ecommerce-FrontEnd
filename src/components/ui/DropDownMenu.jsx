// DropdownMenu.jsx
import { useState, useRef, useEffect } from "react";
import { Menu, Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useWishlist } from "@/providers/WishListProvider";
import { useCartList } from "@/providers/CartListProvider";
import useIsMobile from "@/hooks/useInMobile";
import DropdownPanel from "./DropDownPanel";

const DropdownMenu = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const { wishlist } = useWishlist();
  const { cartList } = useCartList();
  const isMobile = useIsMobile();

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
      <div className="flex items-center gap-3">
        {/* Become Supplier */}
        <Link
          to="/supplier-register"
          className="rounded-full pr-4 py-2 text-sm font-semibold text-[var(--color-black)] transition-all duration-200 hover:bg-[var(--color-black-hover)]"
        >
          Become a Supplier
        </Link>

        {/* Wishlist */}
        <Link
          to="/wishlist"
          className="relative rounded-full bg-[var(--color-white)] p-2 hover:bg-[var(--color-black-hover)] transition-colors duration-200"
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
          className="relative rounded-full bg-[var(--color-white)] p-2 hover:bg-[var(--color-black-hover)] transition-colors duration-200"
        >
          <ShoppingCart size={18} className="text-[var(--color-black)]" />
          {cartList.length > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-secondary)] text-[10px] font-bold text-[var(--color-white)] animate-popin">
              {cartList.length}
            </span>
          )}
        </Link>

        {/* Menu */}
        <button
          onClick={() => setOpen(!open)}
          className="rounded-full bg-[var(--color-white)] p-2 hover:bg-[var(--color-black-hover)] transition-colors duration-200"
        >
          <Menu size={20} className="text-[var(--color-black)]" />
        </button>
      </div>

      {/* Dropdown Panel */}
      <DropdownPanel open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default DropdownMenu;
