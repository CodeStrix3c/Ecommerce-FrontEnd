import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  BarChart,
  WbSunny,
  BugReport,
  AttachMoney,
  MenuBook,
  Notifications,
  Landscape,
  Build,
  Spa,
  Money,
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "/assets/images/ziraat.jpeg";

export default function Sidebar() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { label: "Overview", icon: <BarChart />, to: "/dashboard/overview" },
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

  return (
    <aside
      className={`h-full flex flex-col transition-all duration-300 shadow-md ${
        collapsed ? "w-16" : "w-72"
      }`}
      style={{ backgroundColor: "var(--color-white)" }}
    >
      <div
        className="flex justify-between items-center p-3 border-b"
        style={{ borderColor: "var(--color-gray)" }}
      >
        {!collapsed && (
          <div
            className="flex items-center gap-2"
            onClick={() => navigate("/home")}
          >
            <img
              src={logo}
              alt="Logo"
              className="w-20 h-10 object-contain rounded"
            />
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded transition"
          style={{ color: "var(--color-black)" }}
        >
          <MenuIcon />
        </button>
      </div>

      <nav className="flex-1 mt-6 flex flex-col gap-2 relative">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.to}
            className={({ isActive }) =>
              `group flex items-center gap-3 p-3 mx-2 rounded-lg transition-colors duration-200 relative`
            }
            style={({ isActive }) => ({
              backgroundColor: isActive
                ? "var(--color-black-hover)"
                : "transparent",
              color: "var(--color-black)",
            })}
          >
            <div className="text-xl flex-shrink-0">{item.icon}</div>
            {!collapsed && <span className="text-sm">{item.label}</span>}

            {collapsed && (
              <span
                className="absolute left-full ml-2 w-max opacity-0 group-hover:opacity-100 text-xs rounded px-2 py-1 whitespace-nowrap transition-opacity duration-200 z-50"
                style={{
                  backgroundColor: "var(--color-black)",
                  color: "var(--color-white)",
                }}
              >
                {item.label}
              </span>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
