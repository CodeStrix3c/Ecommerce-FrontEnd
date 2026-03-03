import React, { useMemo } from "react";
import { Outlet } from "react-router-dom";
import TopHeader from "@/supplier/components/dashboarHeader";
import { useVendorProfile } from "@/hooks/Vendor/useVendorProfile";

export default function DashboardLayout() {
  const vendorId = useMemo(() => localStorage.getItem("vendorId"), []);

  const { data, isLoading } = useVendorProfile(vendorId);
  console.log(data, "this is the vendor profile");

  const vendorName = data?.name || "Vendor";

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-white)]">

      <TopHeader vendorName={vendorName} loading={isLoading} />

      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
      <footer className="text-center text-xs sm:text-sm text-[var(--color-black)]/50 py-5 border-t">
        © {new Date().getFullYear()} Art&Craft Panel. All rights reserved.
      </footer>
    </div>
  );
}
