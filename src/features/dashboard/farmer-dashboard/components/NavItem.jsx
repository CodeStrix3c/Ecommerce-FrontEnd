import React from "react";
import { NavLink } from "react-router-dom";

export default function NavItem({ label, icon, to }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 p-3 rounded-lg ${
          isActive
            ? "bg-[var(--color-primary)] text-[var(--color-white)]"
            : "text-[var(--color-black)]"
        }`
      }
    >
      <div className="text-lg">{icon}</div>
      <div className="text-sm">{label}</div>
    </NavLink>
  );
}
