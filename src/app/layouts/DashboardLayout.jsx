import Sidebar from "@/features/dashboard/farmer-dashboard/components/Sidebar";
import React from "react";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-[var(--color-black-hover)]">
      {/* Fixed Sidebar */}
      <div className="fixed h-full">
        <Sidebar />
      </div>

      {/* Main content */}
      <main className="flex-1 ml-64 p-6 space-y-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
