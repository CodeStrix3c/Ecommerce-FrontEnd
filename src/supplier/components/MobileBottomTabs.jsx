import React from "react";
import { Package, Users, Settings, HelpCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import useIsMobile from "@/hooks/useInMobile";

const tabs = [
    {
        icon: <Package size={22} />,
        path: "/dashboard/all-products",
    },
    {
        icon: <Package size={22} />,
        path: "/AddedProducts",
    },
    {
        icon: <Users size={22} />,
        path: "/VendorCustomerList",
    },
    {
        icon: <Settings size={22} />,
        path: "/vendorSettings",
    },
    {
        icon: <HelpCircle size={22} />,
        path: "/help",
    },
];

export default function MobileBottomTabs() {
    const navigate = useNavigate();
    const location = useLocation();
    const isMobile = useIsMobile(768);

    // 👉 Only render on mobile
    if (!isMobile) return null;

    return (
        <nav
            className="
        fixed bottom-0 left-0 right-0 z-50
        h-14
        bg-white
        border-t border-[var(--color-gray)]
        flex items-center justify-around
      "
        >
            {tabs.map((tab, index) => {
                const isActive = location.pathname === tab.path;

                return (
                    <button
                        key={index}
                        onClick={() => navigate(tab.path)}
                        className={`
              flex items-center justify-center
              transition
              ${isActive
                                ? "text-[var(--color-primary)]"
                                : "text-gray-400"
                            }
            `}
                    >
                        {tab.icon}
                    </button>
                );
            })}
        </nav>
    );
}
