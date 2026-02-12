import React from "react";
import {
  Bell,
  Mail,
  Home,
  Package,
  Info,
  HelpCircle,

} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function TopHeader({ vendorName, loading }) {
  const navigate = useNavigate();
  const location = useLocation();


  const navLinks = [
    { label: "Dashboard", path: "/dashboard", icon: Home },
    { label: "Products", path: "/dashboard/all-products", icon: Package },
    { label: "About", path: "/dashboard/about-us", icon: Info },
    { label: "Help", path: "/dashboard/help-center", icon: HelpCircle },
  ];

  return (
    <>

      <header
        className="
        w-full sticky top-0 z-50
        bg-gradient-to-b
        from-white/95 via-white/90 to-white/80
        backdrop-blur-md
        border-b border-[var(--color-gray)]
        lg:px-6 px-3
      "
      >
        <div className="h-16 sm:h-20 flex items-center justify-between">


          <div className="flex items-center gap-3">
            <div className="cursor-pointer" onClick={() => navigate("/")}>
              <img
                src="/assets/images/logo6.png"
                alt="Art&Craft"
                className="h-8 sm:h-10 md:h-12 lg:h-14 object-contain"
              />
            </div>

            <div className="hidden lg:block">
              <h1 className="text-lg font-bold text-[var(--color-primary)]">
                Welcome
              </h1>
              <p className="text-sm text-[var(--color-black)] font-semibold">
                {loading ? "Loading..." : vendorName}
              </p>
            </div>
          </div>


          <nav className="hidden md:flex items-center gap-8 relative">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              const Icon = link.icon;

              return (
                <button
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  className="relative flex flex-col items-center group"
                >

                  <div
                    className={`flex items-center gap-2 font-semibold text-sm lg:text-base transition
                      ${active
                        ? "text-[var(--color-primary)]"
                        : "text-[var(--color-black)] group-hover:text-[var(--color-primary)]"
                      }
                    `}
                  >
                    <Icon size={18} className="text-[var(--color-secondary)]" />
                    <span>{link.label}</span>
                  </div>



                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-[var(--color-primary)]/10 transition">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[var(--color-secondary)]" />
            </button>

            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[var(--color-primary)]/10 transition">
              <Mail size={18} />
            </button>

            <div
              onClick={() => navigate("vendor-profile")}
              className="
              w-10 h-10 rounded-full bg-[var(--color-primary)]
              text-[var(--color-white)] flex items-center justify-center font-semibold cursor-pointer
            "
            >
              {vendorName?.charAt(0)?.toUpperCase() || "V"}
            </div>
          </div>
        </div>
      </header>
      <div
        className="
        md:hidden fixed bottom-0 left-0 right-0 z-50
        bg-[var(--color-white)] backdrop-blur-md
        border-t border-[var(--color-gray)]
        shadow-[0_-4px_20px_rgba(0,0,0,0.05)]
      "
      >
        <div className="flex justify-around items-center h-16">
          {navLinks.map((link) => {
            const active = location.pathname === link.path;
            const Icon = link.icon;

            return (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className="flex flex-col items-center justify-center gap-1"
              >
                <Icon
                  size={20}
                  className={

                    active
                      ? "text-[var(--color-secondary)]"
                      : "text-[var(--color-secondary)]"
                  }
                />
                <span
                  className={`text-xs font-semibold ${active
                    ? "text-[var(--color-primary)]"
                    : "text-[var(--color-black)]"
                    }`}
                >
                  {link.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
