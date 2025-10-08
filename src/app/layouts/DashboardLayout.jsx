import Sidebar from "@/features/dashboard/farmer-dashboard/components/Sidebar";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="flex min-h-screen bg-[var(--color-black-hover)]">
      <div className="fixed h-full">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>

      <main
        className={`flex-1 ${collapsed ? "ml-16" : "ml-72"} p-6 space-y-6 overflow-y-auto`}
      >
        <Outlet />
      </main>
    </div>
  );
}
