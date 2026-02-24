import useIsMobile from "@/hooks/useInMobile";
import { getItemFromLocalStorage } from "@/utils/localStorage";
import {
  Info,
  User,
  HelpCircle,
  Palette,
  Package,
  LogOut,
  LogIn,
  Settings2,
} from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/providers/UserProvider";
import { useQueryClient } from "@tanstack/react-query";

const DropdownPanel = ({ open, onClose }) => {
  const isMobile = useIsMobile(1100);
  const navigate = useNavigate();
  const { logout } = useUser();
  const queryClient = useQueryClient();

  const token = getItemFromLocalStorage("token");
  const isAuthenticated = Boolean(token);

  /* ================= AUTH ACTION ================= */
  const handleAuthAction = () => {
    onClose?.();

    if (isAuthenticated) {
      logout();
      queryClient.clear();
      toast.success("Logged out successfully!");
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  /* ================= SETTINGS ================= */
  const handleSettings = () => {
    onClose?.();

    if (!isAuthenticated) {
      toast.info("Please login to access settings");
      navigate("/login");
      return;
    }

    // Correct route
    navigate("/settings");
  };

  /* ================= PROFILE ================= */
  const handleOpenProfile = () => {
    onClose?.();

    if (!isAuthenticated) {
      toast.info("Please login to view your profile");
      navigate("/login");
      return;
    }

    navigate("/profile");
  };

  return (
    <div
      className={`absolute right-0 mt-4 w-64 rounded-lg bg-[var(--color-white)] shadow-lg transition-all duration-200 ease-out ${
        open
          ? "translate-y-0 scale-100 opacity-100"
          : "pointer-events-none -translate-y-1 scale-95 opacity-0"
      }`}
    >
      <div className="flex flex-col py-2 text-[var(--color-black)]">
        {/* About */}
        <div className="flex items-center gap-3 px-4 py-2 text-sm cursor-default">
          <Info size={16} />
          <span>About Our Heritage</span>
        </div>

        {/* Help */}
        <div className="flex items-center gap-3 px-4 py-2 text-sm cursor-default">
          <HelpCircle size={16} />
          <span>Visitor Support</span>
        </div>

        <hr className="my-1 border-[var(--color-black-hover)]" />

        {/* Artisan Section */}
        <div className="flex flex-col gap-1 px-4 py-2 text-sm cursor-default">
          <div className="flex items-center gap-3">
            <Palette size={16} />
            <span>Artisan Stories</span>
          </div>
          <p className="ml-7 text-xs opacity-80">
            Discover the legacy and craftsmanship of Kashmiri artisans.
          </p>
        </div>

        <hr className="my-1 border-[var(--color-black-hover)]" />

        {/* Collections */}
        <div className="flex items-center gap-3 px-4 py-2 text-sm cursor-default">
          <Package size={16} />
          <span>Craft Collections</span>
        </div>

        {/* Settings (Desktop) */}
        <div
          onClick={handleSettings}
          className="flex items-center gap-3 px-4 py-2 text-sm cursor-pointer hover:bg-[var(--color-black-hover)] transition-colors"
        >
          <Settings2 size={16} />
          <span>Settings</span>
        </div>

        {/* Mobile Extra Options */}
        {isMobile && (
          <>
            <div className="flex items-center gap-3 px-4 py-2 text-sm cursor-default">
              <Palette size={16} />
              <span>Handicraft Categories</span>
            </div>

            <div className="flex items-center gap-3 px-4 py-2 text-sm cursor-default">
              <User size={16} />
              <span>Artisan Profiles</span>
            </div>

            <div
              onClick={handleSettings}
              className="flex items-center gap-3 px-4 py-2 text-sm cursor-pointer hover:bg-[var(--color-black-hover)] transition-colors"
            >
              <Settings2 size={16} />
              <span>Settings</span>
            </div>
          </>
        )}

        <hr className="my-1 border-[var(--color-black-hover)]" />

        {/* Profile */}
        <div
          onClick={handleOpenProfile}
          className="flex items-center gap-3 px-4 py-2 text-sm cursor-pointer hover:bg-[var(--color-black-hover)] transition-colors"
        >
          <User size={16} />
          <span>Visitor Account</span>
        </div>

        {/* Login / Logout */}
        <div
          onClick={handleAuthAction}
          className="flex items-center gap-3 px-4 py-2 text-sm cursor-pointer text-red-600 hover:bg-[var(--color-black-hover)] transition-colors"
        >
          {isAuthenticated ? <LogOut size={16} /> : <LogIn size={16} />}
          <span>{isAuthenticated ? "Sign Out" : "Sign In"}</span>
        </div>
      </div>
    </div>
  );
};

export default DropdownPanel;