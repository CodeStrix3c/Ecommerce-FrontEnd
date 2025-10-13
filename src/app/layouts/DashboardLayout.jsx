import Sidebar from "@/features/dashboard/farmer-dashboard/components/Sidebar";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <div className="pt-16 flex min-h-screen bg-[var(--color-black-hover)]">
      <div className="fixed h-full">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>

      <main
        className={`flex-1 space-y-6 overflow-y-auto`}
      >
        <Outlet />
      </main>
    </div>
  );
}
