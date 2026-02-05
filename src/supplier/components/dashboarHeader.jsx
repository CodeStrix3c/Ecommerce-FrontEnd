import React from "react";
import { Bell, Package, Users, Settings, HelpCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function TopHeader({ vendorName, loading }) {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    {
      label: "All Products",
      icon: <Package size={16} />,
      path: "/dashboard/all-products",
    },
    {
      label: "My Products",
      icon: <Package size={16} />,
      path: "/AddedProducts",
    },
    {
      label: "Customers",
      icon: <Users size={16} />,
      path: "/VendorCustomerList",
    },
    {
      label: "Settings",
      icon: <Settings size={16} />,
      path: "/vendorSettings",
    },
    {
      label: "Help",
      icon: <HelpCircle size={16} />,
      path: "/help",
    },
  ];

  return (
    <header
      className="
        w-full sticky top-0 z-50
        bg-gradient-to-b from-white/95 via-white/90 to-white/80
        backdrop-blur-md
        border-b border-[var(--color-gray)]
        px-2 sm:px-3 lg:px-5
      "
    >
      <div className="h-14 sm:h-16 md:h-20 flex items-center gap-2 sm:gap-4">

        {/* 🔹 LOGO */}
        <div
          className="flex items-center shrink-0 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src="/assets/images/logo6.png"
            alt="Art&Craft"
            className="h-7 sm:h-8 md:h-10 lg:h-12 w-auto object-contain"
          />
        </div>

        {/* 🔹 TABS (SCROLLABLE ON MOBILE) */}
        <div className="flex-1 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-1 sm:gap-2 px-1 sm:px-2 justify-start sm:justify-center">
            {tabs.map((tab, index) => {
              const isActive = location.pathname === tab.path;

              return (
                <button
                  key={index}
                  onClick={() => navigate(tab.path)}
                  className={`
                    flex items-center gap-1.5
                    px-2.5 sm:px-3
                    py-1.5
                    rounded-full
                    text-xs sm:text-sm
                    font-medium
                    whitespace-nowrap
                    transition
                    ${isActive
                      ? "bg-[var(--color-primary)] text-[var(--color-white)]"
                      : "text-[var(--color-black)] hover:bg-[var(--color-gray)]"
                    }
                  `}
                >
                  {tab.icon}
                  <span className="hidden sm:inline">
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 🔹 RIGHT ACTIONS */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button className="relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full hover:bg-[var(--color-primary)]/10 transition">
            <Bell size={16} className="sm:hidden" />
            <Bell size={18} className="hidden sm:block" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--color-secondary)]" />
          </button>

          <div
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[var(--color-primary)]
            text-[var(--color-white)] flex items-center justify-center font-semibold text-sm sm:text-base cursor-pointer"
            onClick={() => navigate("/vendor-profile")}
          >
            {vendorName?.charAt(0)?.toUpperCase() || "V"}
          </div>
        </div>
      </div>
    </header>
  );
}
