import useIsMobile from "@/hooks/useInMobile";
import { NavLink, useLocation } from "react-router-dom";
import ContentWrapper from "../shared/ContentWrapper";
import { BASE_TABS } from "@/constants/navTabs";

const NavBar = ({ isMobile: onMobile }) => {
  const { pathname } = useLocation();
  // const isMobile = useIsMobile(1000);

  if (pathname === "/cart" && onMobile) return null;

  const inactiveMobileColor = "text-[var(--color-neutral-dark)]";
  const inactiveDesktopColor = "text-[var(--color-neutral-dark)]";
  const hoverMobileColor = "hover:text-[var(--color-black)]";
  const hoverDesktopColor = "hover:text-[var(--color-black)]";
  if (onMobile) {
    return (
      <nav className="fixed bottom-0 z-10 w-full border-t bg-[var(--color-white)] py-2">
        <ContentWrapper>
          <div className="flex justify-between">
            {BASE_TABS?.map((tab) => (
              <NavLink
                key={tab.name}
                to={tab.path}
                end={tab.path === "/"}
                className={({ isActive }) =>
                  `relative flex flex-col items-center text-xs font-medium transition-colors duration-300 ${
                    isActive ? tab.activeColor : inactiveMobileColor
                  } ${hoverMobileColor}`
                }
              >
                {({ isActive }) => (
                  <>
                    <tab.icon
                      className={`h-6 w-6 ${isActive ? tab.activeColor : inactiveMobileColor}`}
                    />
                    <span>{tab.name}</span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </ContentWrapper>
      </nav>
    );
  }

  return (
    <div>
      <nav className="flex items-center gap-8">
        {BASE_TABS?.map((tab) => (
          <NavLink
            key={tab.name}
            to={tab.path}
            end={tab.path === "/"}
            className={({ isActive }) =>
              `relative flex flex-row gap-2 items-center px-3 py-2 text-sm font-medium transition-colors duration-300 ${
                isActive
                  ? `border-b-2 border-[var(--color-black)] ${tab.activeColor}`
                  : `${inactiveDesktopColor} ${hoverDesktopColor}`
              }`
            }
          >
            {({ isActive }) => (
              <>
                {tab.badge && (
                  <span className="absolute -top-3 rounded bg-[var(--color-secondary)] px-2 text-[8px] font-bold text-[var(--color-white)]">
                    {tab.badge}
                  </span>
                )}
                <tab.icon
                  className={`h-6 w-6 ${isActive ? tab.activeColor : inactiveDesktopColor}`}
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
