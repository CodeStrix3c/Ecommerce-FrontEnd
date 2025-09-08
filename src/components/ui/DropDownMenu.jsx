import { useState, useRef, useEffect } from "react";
import {
  FlaskRound,
  Info,
  Menu,
  Heart,
  Leaf,
  ShoppingCart,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useWishlist } from "@/providers/WishListProvider";
import useIsMobile from "@/hooks/useInMobile";
import { useCartList } from "@/providers/CartListProvider";

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
        <Link
          to="/supplier-register"
          className="rounded-full bg-[var(--color-white-hover)] px-4 py-2 text-sm font-semibold text-[var(--color-neutral-dark)] shadow-sm transition-all duration-200 hover:bg-[var(--color-white-hover)] hover:shadow"
        >
          Become a Supplier
        </Link>

        <Link
          to="/wishlist"
          className="relative rounded-full bg-[var(--color-white)] p-2 transition-colors duration-200 hover:bg-[var(--color-white-hover)]"
        >
          <Heart
            size={18}
            className="text-[var(--color-primary)] transition-colors duration-300"
          />
          <span
            key={wishlist.length}
            className="animate-popin absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-accent)] text-[10px] font-bold text-[var(--color-white)]"
          >
            {wishlist.length}
          </span>
        </Link>

        <Link
          to="/cart"
          className="relative rounded-full bg-[var(--color-white)] p-2 transition-colors duration-200 hover:bg-[var(--color-white-hover)]"
        >
          <ShoppingCart
            size={18}
            className="text-[var(--color-primary)] transition-colors duration-300"
          />
          <span
            key={cartList.length}
            className="animate-popin absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-cart)] text-[10px] font-bold text-[var(--color-white)]"
          >
            {cartList.length}
          </span>
        </Link>

        <button
          onClick={() => setOpen(!open)}
          className="rounded-full bg-[var(--color-white)] p-2 transition-colors duration-200 hover:bg-[var(--color-white-hover)]"
        >
          <Menu size={20} className="text-[var(--color-neutral-dark)]" />
        </button>
      </div>

      <div
        className={`absolute right-0 mt-3 w-64 origin-top-right rounded-xl bg-[var(--color-white)] shadow-lg ring-1 ring-black/5 transition-all duration-200 ease-out ${
          open
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-1 scale-95 opacity-0"
        }`}
      >
        <div className="p-2">
          <Link
            to="/about-pesticides"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-[var(--color-neutral-dark)] transition-colors duration-150 hover:bg-[var(--color-white-hover)]"
          >
            <Info size={18} className="text-[var(--color-primary)]" />
            <span>About Pesticides</span>
          </Link>

          <hr className="my-2" />

          <Link
            to="/crop-protection"
            className="flex items-start gap-3 rounded-lg px-3 py-2 transition-colors duration-150 hover:bg-[var(--color-white-hover)]"
          >
            <FlaskRound size={20} className="text-[var(--color-secondary)]" />
            <div>
              <p className="text-sm font-semibold text-[var(--color-neutral-dark)]">
                Crop Protection
              </p>
              <p className="text-xs text-gray-500">
                Explore solutions for safer and better yield.
              </p>
            </div>
          </Link>

          <hr className="my-2" />

          <Link
            to="/sustainable-farming"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-[var(--color-neutral-dark)] transition-colors duration-150 hover:bg-[var(--color-white-hover)]"
          >
            <Leaf size={18} className="text-[var(--color-primary)]" />
            <span>Sustainable Farming</span>
          </Link>

          <Link
            to="/login"
            className="block rounded-lg px-3 py-2 text-sm text-[var(--color-neutral-dark)] transition-colors duration-150 hover:bg-[var(--color-white-hover)]"
          >
            Log in / Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DropdownMenu;
