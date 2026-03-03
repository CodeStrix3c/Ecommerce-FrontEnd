import { useState } from "react";
import TopHeader from "../components/DashboardHeader";
import DataTable from "../components/DataTable";

import { Search, UserPlus } from "lucide-react";
import BackButton from "@/components/shared/BackButton";

export default function VendorCustomerList() {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen flex bg-[var(--color-black-hover)]/30">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <TopHeader onMenuClick={() => setSidebarOpen(true)} />

        {/* Page */}
        <main className="flex-1 lg:mt-10 overflow-y-auto">
          {/* <BackButton /> */}
          <div className=" p-4 sm:p-6 lg:p-8 space-y-6">
            {/* Top Section */}
            <div className="bg-[var(--color-white)] ">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Title */}
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-black)]">
                    Customers’ List
                  </h1>
                  <p className="text-sm text-[var(--color-black)]/70 mt-1">
                    List of all your customers in one place
                  </p>
                </div>

                {/* Search */}
                <div className="w-full sm:w-[320px]">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--color-gray)] bg-[var(--color-white)] focus-within:border-[var(--color-primary)] transition">
                    <Search
                      size={18}
                      className="text-[var(--color-black)]/60"
                    />
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search customer..."
                      className="w-full outline-none bg-transparent text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Table Card */}
            <div className="bg-[var(--color-white)] ">
              {/* Data Table */}
              <div className="">
                <DataTable />
              </div>
            </div>
          </div>
        </main>

        <button
          className="sm:hidden fixed bottom-6 right-6 z-50
          w-14 h-14 rounded-full
          bg-[var(--color-primary)] text-[var(--color-white)]
          flex items-center justify-center
          shadow-lg hover:scale-105 active:scale-95 transition"
          aria-label="Add Customer"
        >
          <UserPlus size={22} />
        </button>
      </div>
    </div>
  );
}
