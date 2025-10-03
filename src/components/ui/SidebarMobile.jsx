import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Info,
  HelpCircle,
  UserCheck,
  Store,
  LogOut,
  User,
  Package,
  X,
} from "lucide-react";
import { toast } from "react-toastify";
import useIsMobile from "@/hooks/useInMobile";
import { NAVBAR_TABS, SIDEBAR_TABS } from "@/constants/navTabs";

const SidebarMobile = ({ open, onClose }) => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");
  const below1024 = useIsMobile(1024);
  const below600 = useIsMobile(600);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loginData");
    toast.success("Logged out successfully!");
    navigate("/login");
    onClose();
  };

  const inactiveDesktopColor = "text-[var(--color-black)]";

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-[var(--color-overlay)] backdrop-blur-sm transition-opacity duration-300 z-40 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-[var(--color-white)] shadow-xl z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo + Close Icon */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-gray)]">
          <div className="flex items-center">
            <img
              src="/assets/images/ziraat.jpeg"
              alt="Logo"
              className="h-10 w-auto rounded-md object-cover"
            />
          </div>
          <button
            onClick={onClose}
            className="text-[var(--color-black)] hover:text-[var(--color-primary)]"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-1">
          {/* About Us */}
          <Link
            to="/about-us"
            onClick={onClose}
            className="flex items-center gap-3 px-2 py-2 rounded-lg text-[var(--color-black)] hover:bg-[var(--color-black-hover)] hover:text-[var(--color-primary)]"
          >
            <Info size={18} /> About Us
          </Link>

          {/* Help Center */}
          <Link
            to="/help-center"
            onClick={onClose}
            className="flex items-center gap-3 px-2 py-2 rounded-lg text-[var(--color-black)] hover:bg-[var(--color-black-hover)] hover:text-[var(--color-primary)]"
          >
            <HelpCircle size={18} /> Help Center
          </Link>

          {/* Talk with Expert */}
          <Link
            to="/talk-with-expert"
            onClick={onClose}
            className="block px-2 py-2 rounded-lg hover:bg-[var(--color-black-hover)] hover:text-[var(--color-primary)]"
          >
            <div className="flex items-center gap-3 text-[var(--color-black)]">
              <UserCheck size={18} /> Talk with Expert
            </div>
            <p className="ml-7 mt-1 text-xs text-[var(--color-black)] opacity-70">
              Get advice from agricultural experts to boost your farming
              success.
            </p>
          </Link>

          {below1024 && !below600 && (
            <>
              {SIDEBAR_TABS?.map((tab) => (
                <Link
                  key={tab.name}
                  to={tab.path}
                  end={tab.path === "/"}
                  onClick={onClose}
                  className="flex items-center gap-3 px-2 py-2 rounded-lg text-[var(--color-black)] hover:bg-[var(--color-black-hover)] hover:text-[var(--color-primary)] relative"
                >
                  {tab.badge && (
                    <span className="absolute -top-2 left-7 rounded bg-[var(--color-secondary)] px-2 text-[8px] font-bold text-[var(--color-white)]">
                      {tab.badge}
                    </span>
                  )}
                  <tab.icon size={18} />
                  <span>{tab.name}</span>
                </Link>
              ))}
              <hr className="my-2 border-[var(--color-black-hover)]" />
            </>
          )}

          {/* My Orders */}
          <Link
            to="/my-orders"
            onClick={onClose}
            className="flex items-center gap-3 px-2 py-2 rounded-lg text-[var(--color-black)] hover:bg-[var(--color-black-hover)] hover:text-[var(--color-primary)]"
          >
            <Package size={18} /> My Orders
          </Link>

          {/* Become Supplier */}
          <Link
            to="/supplier-register"
            onClick={onClose}
            className="flex items-center gap-3 px-2 py-2 rounded-lg text-[var(--color-black)] hover:bg-[var(--color-black-hover)] hover:text-[var(--color-primary)]"
          >
            <Store size={18} /> Become a Supplier
          </Link>

          <hr className="my-2 border-[var(--color-black-hover)]" />

          {isLoggedIn ? (
            <>
              {/* Profile */}
              <Link
                to="/farmer-profile"
                onClick={onClose}
                className="flex items-center gap-3 px-2 py-2 rounded-lg text-[var(--color-black)] hover:bg-[var(--color-black-hover)] hover:text-[var(--color-primary)]"
              >
                <User size={18} /> Profile
              </Link>

              {/* Logout */}
              <div
                onClick={handleLogout}
                className="flex items-center gap-3 px-2 py-2 rounded-lg text-[var(--color-black)] cursor-pointer hover:bg-[var(--color-black-hover)] hover:text-[var(--color-primary)]"
              >
                <LogOut size={18} /> Logout
              </div>
            </>
          ) : (
            <Link
              to="/login"
              onClick={onClose}
              className="flex items-center gap-3 px-2 py-2 rounded-lg text-[var(--color-black)] hover:bg-[var(--color-black-hover)] hover:text-[var(--color-primary)]"
            >
              <User size={18} /> Log in / Sign up
            </Link>
          )}
        </nav>
      </div>
    </>
  );
};

export default SidebarMobile;
