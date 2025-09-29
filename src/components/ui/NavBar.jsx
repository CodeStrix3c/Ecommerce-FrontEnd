import useIsMobile from "@/hooks/useInMobile";
import { Home, Wheat, Droplets, Trees } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

const NavBar = ({ isMobile: onMobile }) => {
  const { pathname } = useLocation();
  const isMobile = useIsMobile(1000);

  if (pathname === "/cart" && onMobile) return null;

  const tabs = [
    {
      name: "Home",
      path: "/home",
      icon: Home,
      activeColor: "text-[var(--color-secondary)]",
    },
    {
      name: "Orchards",
      path: "/my-orchards",
      icon: Trees,
      activeColor: "text-[var(--color-secondary)]",
    },
    {
      name: "Harvest",
      path: "/harvest",
      icon: Wheat,
      activeColor: "text-[var(--color-secondary)]",
      badge: "NEW",
    },
  ];

  if (!isMobile) {
    tabs.push({
      name: "Spray",
      path: "/spray",
      icon: Droplets,
      activeColor: "text-[var(--color-secondary)]",
    });
  }
  if (onMobile) {
    tabs.push({
      name: "Spray",
      path: "/spray",
      icon: Droplets,
      activeColor: "text-[var(--color-secondary)]",
    });
  }

  const inactiveMobileColor = "text-[var(--color-neutral-dark)]";
  const inactiveDesktopColor = "text-[var(--color-neutral-dark)]";
  const hoverMobileColor = "hover:text-[var(--color-black)]";
  const hoverDesktopColor = "hover:text-[var(--color-black)]";

  return (
    <div>
      <nav
        className={`flex ${
          onMobile
            ? "fixed bottom-0 z-10 w-full mx-auto justify-between border-t bg-[var(--color-white)] px-6"
            : "items-center gap-8"
        }`}
      >
        {tabs.map((tab) => (
          <NavLink
            key={tab.name}
            to={tab.path}
            end={tab.path === "/"}
            className={({ isActive }) =>
              `relative flex ${
                !onMobile ? "flex-row gap-2" : "flex-col"
              } items-center ${onMobile ? "text-xs" : "px-3 py-2 text-sm"} font-medium transition-colors duration-300 ${
                onMobile
                  ? `${isActive ? tab.activeColor : inactiveMobileColor} ${hoverMobileColor}`
                  : `${isActive ? `border-b-2 border-[var(--color-black)] ${tab.activeColor}` : `${inactiveDesktopColor} ${hoverDesktopColor}`}`
              }`
            }
          >
            {({ isActive }) => (
              <>
                {tab.badge && !onMobile && (
                  <span className="absolute -top-3 rounded bg-[var(--color-secondary)] px-2 text-[8px] font-bold text-[var(--color-white)]">
                    {tab.badge}
                  </span>
                )}
                <tab.icon
                  className={`h-6 w-6 ${
                    onMobile
                      ? isActive
                        ? tab.activeColor
                        : inactiveMobileColor
                      : tab.activeColor
                  }`}
                />
                <span>{tab.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default NavBar;
