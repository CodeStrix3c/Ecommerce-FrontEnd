import useIsMobile from "@/hooks/useInMobile";
import { removeItemFromLocalStorage } from "@/utils/localStorage";
import { HandshakeOutlined } from "@mui/icons-material";
import {
  Info,
  User,
  HelpCircle,
  UserCheck,
  LogOut,
  Package,
  FlaskRoundIcon,
  LayoutDashboard,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DropdownPanel = ({ open, onClose, isSupplierLoggedIn }) => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");
  const isMobile = useIsMobile(1100);

  const handleLogout = () => {
    removeItemFromLocalStorage("token");
    removeItemFromLocalStorage("loginData");
    toast.success("Logged out successfully!");
    navigate("/login");
    onClose();
  };

  return (
    <div
      className={`absolute right-0 mt-4 w-64 rounded-lg bg-[var(--color-white)] shadow-lg transition-all duration-200 ease-out ${
        open
          ? "translate-y-0 scale-100 opacity-100"
          : "pointer-events-none -translate-y-1 scale-95 opacity-0"
      }`}
    >
      <div className="flex flex-col py-2">
        {/* About & Help */}
        <Link
          to="/about-us"
          onClick={onClose}
          className="flex items-center gap-3 px-4 py-2 text-sm text-[var(--color-black)] hover:bg-[var(--color-black-hover)] transition-colors"
        >
          <Info size={16} /> <span>About Us</span>
        </Link>

        <Link
          to="/help-center"
          onClick={onClose}
          className="flex items-center gap-3 px-4 py-2 text-sm text-[var(--color-black)] hover:bg-[var(--color-black-hover)] transition-colors"
        >
          <HelpCircle size={16} /> <span>Help Center</span>
        </Link>

        <hr className="my-1 border-[var(--color-black-hover)]" />

        {/* Talk with Expert */}
        <Link
          to="/talk-with-expert"
          onClick={onClose}
          className="flex flex-col gap-1 px-4 py-2 text-sm text-[var(--color-black)] hover:bg-[var(--color-black-hover)] transition-colors"
        >
          <div className="flex items-center gap-3">
            <UserCheck size={16} />
            <span>Talk with Expert</span>
          </div>
          <p className="ml-7 text-xs opacity-80">
            Get advice from agricultural experts to boost your farming success.
          </p>
        </Link>

        <hr className="my-1 border-[var(--color-black-hover)]" />

        {/* Orders */}
        <Link
          to="/orders"
          onClick={onClose}
          className="flex items-center gap-3 px-4 py-2 text-sm text-[var(--color-black)] hover:bg-[var(--color-black-hover)] transition-colors"
        >
          <Package size={16} /> <span>My Orders</span>
        </Link>

        {/* Mobile-specific links */}
        {isMobile && (
          <>
            {isSupplierLoggedIn ? (
              <>
                <Link
                  to="/dashboard/orchard"
                  onClick={onClose}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-[var(--color-black)] hover:bg-[var(--color-black-hover)] transition-colors"
                >
                  <LayoutDashboard size={16} /> <span>Dashboard</span>
                </Link>

                <Link
                  to="/supplier-profile"
                  onClick={onClose}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-[var(--color-black)] hover:bg-[var(--color-black-hover)] transition-colors"
                >
                  <User size={16} /> <span>Supplier Profile</span>
                </Link>
              </>
            ) : (
              <Link
                to="/supplier-register"
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-2 text-sm text-[var(--color-black)] hover:bg-[var(--color-black-hover)] transition-colors"
              >
                <HandshakeOutlined fontSize="small" />{" "}
                <span>Become a Supplier</span>
              </Link>
            )}

            <Link
              to="/fertilizers"
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-2 text-sm text-[var(--color-black)] hover:bg-[var(--color-black-hover)] transition-colors"
            >
              <FlaskRoundIcon size={16} /> <span>Fertilizers</span>
            </Link>
          </>
        )}
        

        <hr className="my-1 border-[var(--color-black-hover)]" />

        {/* Account Links */}
        {isLoggedIn ? (
          <>
            <Link
              to="/farmer-profile"
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-2 text-sm text-[var(--color-black)] hover:bg-[var(--color-black-hover)] transition-colors"
            >
              <User size={16} /> <span>Profile</span>
            </Link>

            <div
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-2 text-sm text-[var(--color-black)] cursor-pointer hover:bg-[var(--color-black-hover)] transition-colors"
            >
              <LogOut size={16} /> <span>Logout</span>
            </div>
          </>
        ) : (
          <Link
            to="/login"
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-2 text-sm text-[var(--color-black)] hover:bg-[var(--color-black-hover)] transition-colors"
          >
            <User size={16} /> <span>Log in / Sign up</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default DropdownPanel;
