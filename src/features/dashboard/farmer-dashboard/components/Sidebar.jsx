import React, { useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import {
  BarChart,
  WbSunny,
  BugReport,
  MenuBook,
  Notifications,
  Landscape,
  Build,
  Spa,
  Money,
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "/assets/images/ziraat.jpeg";
import { X } from "lucide-react";

export default function Sidebar({ collapsed, setCollapsed }) {
  const navigate = useNavigate();
  const sidebarRef = useRef(null);

  const navItems = [
    // { label: "Overview", icon: <BarChart />, to: "/dashboard/overview" },
    {
      label: "Orchard Profile & Productivity",
      icon: <Landscape />,
      to: "/dashboard/orchard",
    },
    { label: "Weather & Climate", icon: <WbSunny />, to: "/dashboard/weather" },
    {
      label: "Soil & Nutrient Management",
      icon: <Spa />,
      to: "/dashboard/soil",
    },
    {
      label: "Pest & Disease Management",
      icon: <BugReport />,
      to: "/dashboard/pest",
    },
    {
      label: "Input & Resource Usage",
      icon: <Build />,
      to: "/dashboard/resources",
    },
    {
      label: "Financial & Yield Performance",
      icon: <Money />,
      to: "/dashboard/financial",
    },
    {
      label: "Knowledge & Advisory",
      icon: <MenuBook />,
      to: "/dashboard/knowledge",
    },
    {
      label: "Alerts & Notifications",
      icon: <Notifications />,
      to: "/dashboard/alerts",
    },
  ];

  useEffect(() => {
    if (collapsed) return;

    const handleMouseDown = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setCollapsed(true);
      }
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [collapsed, setCollapsed]);

  useEffect(() => {
    if (!collapsed) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [collapsed]);

  return (
    <>
      {/* Portal for Sidebar Panel and Overlay */}
      {createPortal(
        <>
          {/* Menu Button (show only when sidebar is closed) */}
          {collapsed && (
            <button
              onClick={() => setCollapsed(false)}
              className="fixed top-4 left-4 z-[9999] flex items-center justify-center p-2 rounded-full shadow-md transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: "var(--color-white)",
                color: "var(--color-black)",
              }}
            >
              <MenuIcon />
            </button>
          )}

          {/* Overlay */}
          {!collapsed && (
            <div
              id="sidebar-overlay"
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998] transition-opacity duration-300"
            />
          )}
          {/* Sidebar Drawer */}
          <aside
            ref={sidebarRef}
            id="sidebar-panel"
            className={`fixed top-0 left-0 h-full w-72 z-[9999] transform transition-transform duration-300 ease-in-out ${
              collapsed ? "-translate-x-full" : "translate-x-0"
            }`}
            style={{
              backgroundColor: "var(--color-white)",
              color: "var(--color-black)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between border-b py-4 cursor-pointer"
              style={{ borderColor: "var(--color-gray)" }}
            >
              <div>
                <img
                  src={logo}
                  alt="Logo"
                  className="w-24 h-12 object-contain rounded"
                  onClick={() => {
                    navigate("/home");
                    setCollapsed(true);
                  }}
                />
              </div>
              <div className="pr-5 cursor-pointer " onClick={() => setCollapsed(true)}>
                <X size={20} strokeWidth={2.5} stroke="var(--color-black)"/>
              </div>
            </div>
            {/* Nav Items */}
            <nav className="flex-1 flex flex-col gap-1 mt-4">
              {navItems.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.to}
                  onClick={() => setCollapsed(true)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-3 mx-3 rounded-lg transition-colors duration-200 ${
                      isActive
                        ? "bg-[var(--color-black-hover)] text-[var(--color-black)]"
                        : "text-[var(--color-black)] hover:bg-[var(--color-black-hover)]"
                    }`
                  }
                >
                  <div
                    className="text-lg flex-shrink-0"
                    style={{ color: "var(--color-secondary)" }}
                  >
                    {item.icon}
                  </div>
                  <span className="text-sm">{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </aside>
        </>,
        document.getElementById("sidebar-root")
      )}
    </>
  );
}
