import React from "react";
import { Bell, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TopHeader({ vendorName, loading }) {
  const navigate = useNavigate();

  return (
    <header
      className="
        w-full sticky top-0 z-50
        bg-gradient-to-b
        from-white/95
        via-white/90
        to-white/80
        backdrop-blur-md
        border-b border-[var(--color-gray)]
        lg:px-5 px-2
      "
    >
      <div className="h-16 sm:h-20 flex items-center justify-between gap-3 sm:gap-4">
        {/* LEFT */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div
            className="flex items-center shrink-0 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              src="/assets/images/logo6.png"
              alt="Art&Craft"
              className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto object-contain"
            />
          </div>

          <div className="leading-tight min-w-0 hidden lg:block">
            <h1 className="text-sm sm:text-base lg:text-lg font-bold text-[var(--color-primary)] truncate">
              Welcome
            </h1>
            <p className="text-[11px] sm:text-xs lg:text-lg font-bold text-[var(--color-black)]/60 truncate">
              {loading ? "Loading..." : vendorName}
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 shrink-0">
          <button className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-[var(--color-primary)]/10 transition">
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[var(--color-secondary)]" />
          </button>

          <button className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-[var(--color-primary)]/10 transition">
            <Mail size={18} />
          </button>

          <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-3 border-l border-[var(--color-gray)]">
            <div
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[var(--color-primary)]
              text-[var(--color-white)] flex items-center justify-center font-semibold cursor-pointer"
              onClick={() => navigate("vendor-profile")}
            >
              {vendorName?.charAt(0)?.toUpperCase() || "V"}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
