import { useState, useEffect } from "react";
import TopHeader from "../components/DashboardHeader";

import SecurityTab from "../components/SecurityTab";
import NotificationsTab from "../components/NotificationsTab";
import SupportTab from "../components/SupportTab";
import BackButton from "@/components/shared/BackButton";

export default function VendorSettings() {
  const [unsaved, setUnsaved] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      if (!unsaved) return;
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [unsaved]);

  return (
    <div className="min-h-screen flex bg-[var(--color-white)]">
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <TopHeader onMenuClick={() => setSidebarOpen(true)} />

        {/* Main Content */}
        <main className="flex-1 lg:mt-10 overflow-y-auto">
          {/* <BackButton /> */}
          <div className=" p-4 sm:p-6 lg:p-8 space-y-6">
            <div className="flex flex-col gap-2 pb-6 border-b border-[var(--color-gray)] mt-6">
              <h1 className="text-3xl font-bold text-[var(--color-black)] tracking-tight">
                Settings
              </h1>
              <p className="text-sm text-[var(--color-black)] max-w-xl">
                Manage your account security, password, and notification
                preferences in one place.
              </p>
            </div>

            {/* ===== SECURITY SECTION ===== */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-6 w-1 rounded-full bg-[var(--color-primary)]" />
                <h2 className="text-xl font-semibold text-[var(--color-primary)]">
                  Security
                </h2>
              </div>

              <div className="bg-[var(--color-white)] rounded-2xl border border-[var(--color-gray)] p-6">
                <SecurityTab setUnsaved={setUnsaved} />
              </div>
            </section>

            {/* ===== NOTIFICATIONS SECTION ===== */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-6 w-1 rounded-full bg-[var(--color-primary)]" />
                <h2 className="text-xl font-semibold text-[var(--color-primary)]">
                  Notifications
                </h2>
              </div>

              <div className="bg-[var(--color-white)] rounded-2xl border border-[var(--color-gray)] p-6">
                <NotificationsTab setUnsaved={setUnsaved} />
              </div>
            </section>

            {/* ===== SAVE BAR ===== */}
            {unsaved && (
              <div className="flex justify-end pt-4">
                <button
                  onClick={() => setUnsaved(false)}
                  className="px-6 py-3 rounded-xl bg-[var(--color-primary)] text-[var(--color-white)] font-medium
          hover:bg-[var(--color-primary-hover)] transition"
                >
                  Save Changes
                </button>
              </div>
            )}
            {/* ===== SUPPORT SECTION ===== */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-6 w-1 rounded-full bg-[var(--color-primary)]" />
                <h2 className="text-xl font-semibold text-[var(--color-primary)]">
                  Support
                </h2>
              </div>

              <div className="bg-[var(--color-white)] rounded-2xl border border-[var(--color-gray)] p-6">
                <SupportTab />
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
