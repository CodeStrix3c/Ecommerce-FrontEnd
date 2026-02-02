// import Sidebar from "@/features/dashboard/farmer-dashboard/components/Sidebar";
import TopHeader from "@/supplier/components/dashboarHeader";
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
// import SupplierDashboard from "@/supplier/pages/dashboardPage";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-white)]">
      {/* ✅ Header stays in normal flow */}
      <TopHeader />

      {/* ✅ Main content pushed below header */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>

      {/* ✅ Footer */}
      <footer className="text-center text-xs sm:text-sm text-[var(--color-black)]/50 py-5 border-t">
        © {new Date().getFullYear()} Art&Craft Panel. All rights reserved.
      </footer>
    </div>
  );
}
