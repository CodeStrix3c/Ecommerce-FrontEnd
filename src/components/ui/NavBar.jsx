import { Home, Leaf, SprayCan, FlaskRound } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

const NavBar = ({ isMobile }) => {
  const { pathname } = useLocation();

  if (pathname === "/cart" && isMobile) return null;

  const tabs = [
    {
      name: "Home",
      path: "/",
      icon: Home,
      activeColor: "text-[var(--color-secondary)]",
    },
    {
      name: "Pesticides",
      path: "/pesticides",
      icon: SprayCan,
      activeColor: "text-[var(--color-secondary)]",
    },
    {
      name: "Crops",
      path: "/crops",
      icon: Leaf,
      activeColor: "text-[var(--color-secondary)]",
      badge: "NEW",
    },
    {
      name: "Fertilizers",
      path: "/fertilizers",
      icon: FlaskRound,
      activeColor: "text-[var(--color-secondary)]",
    },
  ];

  const inactiveMobileColor = "text-[var(--color-neutral-dark)]";
  const inactiveDesktopColor = "text-[var(--color-neutral-dark)]";
  const hoverMobileColor = "hover:text-[var(--color-black)]";
  const hoverDesktopColor = "hover:text-[var(--color-black)]";

  return (
    <div>
      <nav
        className={`flex ${
          isMobile
            ? "fixed bottom-0 z-10 w-full max-w-[95vw] mx-auto justify-between border-t bg-[var(--color-white)] py-2 shadow-md"
            : "items-center gap-8 bg-[var(--color-white)] px-4"
        }`}
      >
        {tabs.map((tab) => (
          <NavLink
            key={tab.name}
            to={tab.path}
            end={tab.path === "/"}
            className={({ isActive }) =>
              `relative flex ${
                !isMobile ? "flex-row gap-2" : "flex-col"
              } items-center ${isMobile ? "text-xs" : "px-3 py-2 text-sm"} font-medium transition-colors duration-300 ${
                isMobile
                  ? `${isActive ? tab.activeColor : inactiveMobileColor} ${hoverMobileColor}`
                  : `${isActive ? `border-b-2 border-[var(--color-black)] ${tab.activeColor}` : `${inactiveDesktopColor} ${hoverDesktopColor}`}`
              }`
            }
          >
            {({ isActive }) => (
              <>
                {tab.badge && !isMobile && (
                  <span className="absolute -top-3 rounded bg-[var(--color-secondary)] px-2 text-[8px] font-bold text-[var(--color-white)]">
                    {tab.badge}
                  </span>
                )}
                <tab.icon
                  className={`h-6 w-6 ${
                    isMobile
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
