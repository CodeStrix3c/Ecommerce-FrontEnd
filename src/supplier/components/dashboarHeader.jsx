import React from "react";
import { Bell, Mail, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TopHeader() {
  const navigate = useNavigate();
  return (
    <header
      className="w-full sticky top-0 z-30
      bg-[var(--color-white)]
      border-b border-[var(--color-gray)] lg:px-5 px-2"
    >
      <div
        className="h-16 sm:h-20
        flex items-center justify-between gap-3 sm:gap-4"
      >
        {/* ================= LEFT: LOGO + BRAND ================= */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          {/* Logo */}
          <div
            className="flex items-center shrink-0"
            onClick={() => navigate("/")}
          >
            <img
              src="/assets/images/logo6.png"
              alt="Art&Craft"
              className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto object-contain"
            />
          </div>

          {/* Brand Text */}
          <div className="leading-tight min-w-0 hidden lg:block">
            <h1 className="text-sm sm:text-base lg:text-lg font-bold text-[var(--color-primary)] truncate">
              Welcome
            </h1>
            <p className="text-[11px] sm:text-xs lg:text-sm text-[var(--color-black)]/60 truncate">
              Aaqib Gull Bhat
            </p>
          </div>
        </div>

        {/* ================= CENTER: SEARCH ================= */}
        {/* Hidden on very small screens, visible on md+ */}
        {/* <div className="hidden md:flex flex-1 justify-center px-2">
          <div
            className="w-full max-w-xl
            flex items-center gap-2
            px-4 py-2 rounded-2xl
            border border-[var(--color-gray)]
            bg-[var(--color-white)]
            focus-within:border-[var(--color-primary)]
            transition"
          >
            <Search size={18} className="text-[var(--color-black)]/50" />
            <input
              placeholder="Search customers, products..."
              className="w-full outline-none bg-transparent text-sm"
            />
          </div>
        </div> */}

        {/* ================= RIGHT: ICONS + PROFILE ================= */}
        <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 shrink-0">
          {/* Notification */}
          <button
            className="relative w-9 h-9 sm:w-10 sm:h-10
            flex items-center justify-center rounded-full
            hover:bg-[var(--color-primary)]/10 transition"
            aria-label="Notifications"
          >
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[var(--color-secondary)]" />
          </button>

          {/* Messages */}
          <button
            className="w-9 h-9 sm:w-10 sm:h-10
            flex items-center justify-center rounded-full
            hover:bg-[var(--color-primary)]/10 transition"
            aria-label="Messages"
          >
            <Mail size={18} />
          </button>

          {/* Profile */}
          <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-3 border-l border-[var(--color-gray)]">
            <div
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full
              bg-[var(--color-primary)] text-[var(--color-white)]
              flex items-center justify-center font-semibold shrink-0"
            >
              V
            </div>

            {/* Profile text hidden on mobile */}
            {/* <div className="hidden lg:block leading-tight">
              <p className="text-sm font-semibold text-[var(--color-black)]">
                Vendor Admin
              </p>
              <p className="text-xs text-[var(--color-black)]/60">
                Vendor Account
              </p>
            </div> */}
          </div>
        </div>
      </div>

      {/* ================= MOBILE SEARCH (shows under header) ================= */}
      {/* <div className="md:hidden px-3 sm:px-6 pb-3">
        <div
          className="w-full flex items-center gap-2
          px-4 py-2 rounded-2xl border border-[var(--color-gray)]
          bg-[var(--color-white)] focus-within:border-[var(--color-primary)]
          transition"
        >
          <Search size={18} className="text-[var(--color-black)]/50" />
          <input
            placeholder="Search customers, products..."
            className="w-full outline-none bg-transparent text-sm"
          />
        </div>
      </div> */}
    </header>
  );
}
