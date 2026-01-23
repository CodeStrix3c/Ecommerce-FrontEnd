// import Sidebar from "@/features/dashboard/farmer-dashboard/components/Sidebar";
import TopHeader from "@/supplier/components/dashboarHeader";
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
// import SupplierDashboard from "@/supplier/pages/dashboardPage";

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate;

  return (
    <div className="  min-h-screen  bg-[var(--color-white)]">
      {/* Sidebar if needed */}{" "}
      {/* <div className="fixed h-full">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />{" "}
      </div> */}
      <div className="fixed w-full">
        <TopHeader />
      </div>
      {/* Supplier dashboard header / layout */}
      {/* <SupplierDashboard /> */}
      {/* Nested dashboard routes */}
      <main className=" overflow-y-auto">
        <Outlet />
      </main>
      <p className="text-center text-xs sm:text-sm text-[var(--color-black)]/50 pt-5 pb-5 border  border-t-1">
        © {new Date().getFullYear()} Art&Craft Panel. All rights reserved.
      </p>
    </div>
  );
}
