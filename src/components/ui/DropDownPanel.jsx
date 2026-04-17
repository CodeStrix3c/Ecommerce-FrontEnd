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
  ShoppingBag,
} from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/providers/UserProvider";
import { useQueryClient } from "@tanstack/react-query";
import { useLogoutMutation } from "@/hooks/useAuthMutation";

const DropdownPanel = ({ open, onClose }) => {
  const isMobile = useIsMobile(1100);
  const navigate = useNavigate();
  const { logout } = useUser();
  const queryClient = useQueryClient();

  const { mutate: logoutMutate, isPending: isLogoutPending } =
    useLogoutMutation();

  const token = getItemFromLocalStorage("token");
  const isAuthenticated = Boolean(token);

  /* ================= AUTH ACTION ================= */
  const handleAuthAction = () => {
    if (!isAuthenticated) {
      onClose?.();
      navigate("/login");
      return;
    }

    logoutMutate(undefined, {
      onSuccess: () => {
        onClose?.();
        logout();
        queryClient.clear();
        toast.success("Logged out successfully!");
        navigate("/");
      },
      onError: (err) => {
        // Still clear local state even if API call fails
        onClose?.();
        logout();
        queryClient.clear();
        toast.error(
          err?.response?.data?.message || "Logout failed, signed out locally.",
        );
        navigate("/");
      },
    });
  };

  /* ================= SETTINGS ================= */
  const handleSettings = () => {
    onClose?.();
    navigate("/settings");
  };

  /* ================= PROFILE ================= */
  const handleOpenProfile = () => {
    onClose?.();
    navigate("/profile");
  };

  const handleOrdersPage = () => {
    onClose?.();
    navigate("/order");
  };

  const handleHeritage = () => {
    onClose?.();
    navigate("/heritage");
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
        {/* ── Show only when logged in ── */}
        {isAuthenticated && (
          <>
            <div
              onClick={handleOpenProfile}
              className="flex items-center gap-3 px-4 py-2 text-sm cursor-pointer hover:bg-[var(--color-black-hover)] transition-colors"
            >
              <User size={16} />
              <span>My Profile</span>
            </div>

            <div
              onClick={handleOrdersPage}
              className="flex items-center gap-3 px-4 py-2 text-sm cursor-pointer hover:bg-[var(--color-black-hover)] transition-colors"
            >
              <ShoppingBag size={16} />
              <span>My Orders</span>
            </div>

            <div
              onClick={handleSettings}
              className="flex items-center gap-3 px-4 py-2 text-sm cursor-pointer hover:bg-[var(--color-black-hover)] transition-colors"
            >
              <Settings2 size={16} />
              <span>Settings</span>
            </div>

            <hr className="my-1 border-[var(--color-black-hover)]" />
          </>
        )}

       
        <div     onClick={handleHeritage}
              className="flex items-center gap-3 px-4 py-2 text-sm cursor-pointer hover:bg-[var(--color-black-hover)] transition-colors">
          <Info size={16} />
          <span>About Our Heritage</span>
        </div>

        {/* Help */}
        <div className="flex items-center gap-3 px-4 py-2 text-sm cursor-default">
          <HelpCircle size={16} />
          <span>Help & Support</span>
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

            {/* Settings in mobile only shown when logged in */}
            {isAuthenticated && (
              <div
                onClick={handleSettings}
                className="flex items-center gap-3 px-4 py-2 text-sm cursor-pointer hover:bg-[var(--color-black-hover)] transition-colors"
              >
                <Settings2 size={16} />
                <span>Settings</span>
              </div>
            )}
          </>
        )}

        <hr className="my-1 border-[var(--color-black-hover)]" />

        {/* Sign In / Sign Out */}
        <div
          onClick={!isLogoutPending ? handleAuthAction : undefined}
          className={`flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-[var(--color-black-hover)] transition-colors ${
            isLogoutPending ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {isAuthenticated ? <LogOut size={16} /> : <LogIn size={16} />}
          <span>
            {isLogoutPending
              ? "Signing out..."
              : isAuthenticated
                ? "Sign Out"
                : "Sign In"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DropdownPanel;
