import useIsMobile from "@/hooks/useInMobile";
import { NavLink, useLocation, useSearchParams } from "react-router-dom";
import ContentWrapper from "../shared/ContentWrapper";
import {
  ChevronDown,
  ChevronRight,
  Shirt,
  Hammer,
  HardHat,
  Package,
} from "lucide-react";
import { useProductsQuery } from "@/hooks/useProductsQuery";
import NavBarSkeleton from "./NavBarSkeleton";
import { useRef, useState } from "react";

const CATEGORY_PATH_MAP = {
  textiles: "/textiles",
  woodcraft: "/woodcraft",
  metals: "/metals",
};

const CATEGORY_ICON_MAP = {
  textiles: Shirt,
  woodcraft: Hammer,
  metals: HardHat,
  carpets: Package,
};

const getIcon = (slug = "") => CATEGORY_ICON_MAP[slug.toLowerCase()] || Package;

const ACTIVE_CLASS = "text-[var(--color-secondary)]";
const ACTIVE_BG = "bg-[var(--color-secondary)]";

const HOME_TAB = {
  name: "All",
  slug: "home",
  path: "/home",
};

const NavBar = () => {
  const { pathname } = useLocation();
  const [params] = useSearchParams();
  const navRef = useRef(null);
  const [suppressDropdown, setSuppressDropdown] = useState(false);

  const below600 = useIsMobile(600);
  const { data: searchData, isLoading } = useProductsQuery({});

  if (isLoading) return <NavBarSkeleton />;

  const allCategories = searchData?.filterOption?.categories ?? [];

  const dynamicTabs = allCategories
    .filter((c) => c.parentId === null)
    .map((cat) => {
      const slug = cat.slug.toLowerCase();
      const path = CATEGORY_PATH_MAP[slug] || `/${slug}`;
      const Icon = getIcon(slug);

      const children = allCategories
        .filter((c) => c.parentId === cat.id)
        .map((child) => ({
          id: child.id,
          name: child.name,
          slug: child.slug.toLowerCase(),
        }));

      return {
        id: cat.id,
        name: cat.name,
        slug,
        path,
        icon: Icon,
        children: children.length ? children : undefined,
      };
    });

  const NAVBAR_TABS = [HOME_TAB, ...dynamicTabs];

  /* ✅ FIXED ACTIVE LOGIC */
  const isTabActive = (tab) => {
    const currentCategory = params.get("category")?.toLowerCase();

    if (tab.slug === "home") {
      return pathname === "/home" && !currentCategory;
    }

    if (currentCategory === tab.slug) return true;

    if (tab.children) {
      return tab.children.some((child) => child.slug === currentCategory);
    }

    return false;
  };

  const closeDropdown = () => {
    setSuppressDropdown(true);
    setTimeout(() => setSuppressDropdown(false), 200);
  };

  /* ================= MOBILE ================= */
  if (below600) {
    return (
      <nav className="fixed bottom-0 w-full bg-white border-t z-20">
        <ContentWrapper>
          <div className="flex justify-between py-2">
            {NAVBAR_TABS.map((tab) => {
              const active = isTabActive(tab);

              return (
                <NavLink
                  key={tab.name}
                  to={
                    tab.slug === "home"
                      ? "/home"
                      : `${tab.path}?category=${tab.slug}`
                  }
                  className={`flex flex-col items-center text-sm font-medium transition ${
                    active ? ACTIVE_CLASS : "text-gray-500"
                  }`}
                >
                  {tab.slug !== "home" && tab.icon && (
                    <tab.icon className="h-5 w-5 mb-1" />
                  )}

                  <span>{tab.name}</span>

                  <span
                    className={`mt-1 h-[2px] w-6 rounded-full ${
                      active ? ACTIVE_BG : "bg-transparent"
                    }`}
                  />
                </NavLink>
              );
            })}
          </div>
        </ContentWrapper>
      </nav>
    );
  }

  /* ================= DESKTOP ================= */
  return (
    <div ref={navRef} className="relative">
      <nav className="flex items-center gap-8">
        {NAVBAR_TABS.map((tab) => {
          const active = isTabActive(tab);

          return (
            <div key={tab.name} className="relative group">
              <NavLink
                to={
                  tab.slug === "home"
                    ? "/home"
                    : `${tab.path}?category=${tab.slug}`
                }
                className={`flex items-center gap-2 px-2 py-3 text-base font-medium transition ${
                  active ? ACTIVE_CLASS : "text-gray-600 hover:text-black"
                }`}
              >
                {tab.slug !== "home" && tab.icon && (
                  <tab.icon className="h-5 w-5 opacity-80" />
                )}

                <span>{tab.name}</span>

                {tab.children && (
                  <ChevronDown className="h-4 w-4 opacity-60 group-hover:rotate-180 transition" />
                )}
              </NavLink>

              {/* underline */}
              <span
                className={`absolute left-0 bottom-0 h-[2px] w-full ${
                  active ? ACTIVE_BG : "bg-transparent"
                }`}
              />

              {/* DROPDOWN */}
              {tab.children && !suppressDropdown && (
                <div
                  className="
                  absolute left-0 top-full mt-3
                  min-w-[14rem]
                  bg-white border rounded-lg shadow-lg
                  opacity-0 invisible translate-y-2
                  transition-all duration-200
                  group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                  z-50
                "
                >
                  <div className="p-2">
                    {tab.children.map((child) => {
                      const isChildActive =
                        params.get("category") === child.slug;

                      return (
                        <NavLink
                          key={child.id}
                          to={`${tab.path}?category=${child.slug}`}
                          onClick={closeDropdown}
                          className={`
                            group flex items-center justify-between
                            px-3 py-2.5 rounded-md
                            text-sm font-medium
                            whitespace-nowrap
                            ${
                              isChildActive
                                ? "text-[var(--color-secondary)] bg-[var(--color-secondary)]/10"
                                : "text-gray-700 hover:bg-gray-100 hover:text-black"
                            }
                            transition-all duration-200
                          `}
                        >
                          <span className="truncate group-hover:translate-x-1 transition">
                            {child.name}
                          </span>

                          <ChevronRight
                            className="
                              h-4 w-4 text-gray-400
                              opacity-0 group-hover:opacity-100
                              translate-x-[-4px] group-hover:translate-x-0
                              transition-all duration-200
                            "
                          />
                        </NavLink>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default NavBar;
