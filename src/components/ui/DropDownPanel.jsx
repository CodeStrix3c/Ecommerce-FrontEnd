import {
  Info,
  User,
  HelpCircle,
  UserCheck,
  Store,
  Leaf,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DropdownPanel = ({ open, onClose }) => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token"); // Check login state
  const loginData = JSON.parse(localStorage.getItem("loginData") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loginData");
    toast.success("Logged out successfully!");
    navigate("/login");
    onClose();
  };

  return (
    <div
      className={`absolute right-0 mt-2 w-64 rounded-lg bg-[var(--color-white)] shadow-lg transition-all duration-200 ease-out ${
        open
          ? "translate-y-0 scale-100 opacity-100"
          : "pointer-events-none -translate-y-1 scale-95 opacity-0"
      }`}
    >
      <div className="flex flex-col py-2">
        <Link
          to="/about-us"
          onClick={onClose}
          className="flex items-center gap-3 px-4 py-2 text-sm text-[var(--color-black)] hover:bg-[var(--color-black-hover)] transition-colors"
        >
          <Info size={16} className="text-[var(--color-black)]" />
          <span>About Us</span>
        </Link>

        <Link
          to="/help-center"
          onClick={onClose}
          className="flex items-center gap-3 px-4 py-2 text-sm text-[var(--color-black)] hover:bg-[var(--color-black-hover)] transition-colors"
        >
          <HelpCircle size={16} className="text-[var(--color-black)]" />
          <span>Help Center</span>
        </Link>

        <hr className="my-1 border-[var(--color-black-hover)]" />

        <Link
          to="/talk-with-expert"
          onClick={onClose}
          className="flex flex-col gap-1 px-4 py-2 text-sm text-[var(--color-black)] hover:bg-[var(--color-black-hover)] transition-colors"
        >
          <div className="flex items-center gap-3">
            <UserCheck size={16} className="text-[var(--color-black)]" />
            <span>Talk with Expert</span>
          </div>
          <p className="ml-7 text-xs text-[var(--color-black)] opacity-80">
            Get advice from agricultural experts to boost your farming success.
          </p>
        </Link>

        <hr className="my-1 border-[var(--color-black-hover)]" />

        {isLoggedIn ? (
          <>
            <Link
              to="/farmer-profile"
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-2 text-sm text-[var(--color-black)] hover:bg-[var(--color-black-hover)] transition-colors"
            >
              <User size={16} className="text-[var(--color-black)]" />
              <span>Profile</span>
            </Link>

            <div
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-2 text-sm text-[var(--color-black)] cursor-pointer hover:bg-[var(--color-black-hover)] transition-colors"
            >
              <LogOut size={16} className="text-[var(--color-black)]" />
              <span>Logout</span>
            </div>
          </>
        ) : (
          <Link
            to="/login"
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-2 text-sm text-[var(--color-black)] hover:bg-[var(--color-black-hover)] transition-colors"
          >
            <User size={16} className="text-[var(--color-black)]" />
            <span>Log in / Sign up</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default DropdownPanel;
