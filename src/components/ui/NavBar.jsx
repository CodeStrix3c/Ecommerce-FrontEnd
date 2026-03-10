// import useIsMobile from "@/hooks/useInMobile";
// import { NavLink, useLocation } from "react-router-dom";
// import ContentWrapper from "../shared/ContentWrapper";
// import { NAVBAR_TABS } from "@/constants/navTabs";

// const NavBar = ({}) => {
//   const { pathname } = useLocation();
//   const below1024 = useIsMobile(1024);
//   const below600 = useIsMobile(600);

//   if (pathname === "/cart" && below600) return null;

//   const inactiveMobileColor = "text-[var(--color-neutral-dark)]";
//   const inactiveDesktopColor = "text-[var(--color-neutral-dark)]";
//   const hoverMobileColor = "hover:text-[var(--color-black)]";
//   const hoverDesktopColor = "hover:text-[var(--color-black)]";
//   if (below600) {
//     return (
//       <nav className="fixed bottom-0 z-10 w-full border-t bg-[var(--color-white)] py-2">
//         <ContentWrapper>
//           <div className="flex justify-between">
//             {NAVBAR_TABS?.map((tab) => (
//               <NavLink
//                 key={tab.name}
//                 to={tab.path}
//                 end={tab.path === "/"}
//                 className={({ isActive }) =>
//                   `relative flex flex-col items-center text-xs font-medium transition-colors duration-300 py-1 ${
//                     isActive ? tab.activeColor : inactiveMobileColor
//                   } ${hoverMobileColor}`
//                 }
//               >
//                 {({ isActive }) => (
//                   <>
//                     <tab.icon
//                       className={`h-6 w-6 ${isActive ? tab.activeColor : inactiveMobileColor}`}
//                     />
//                     <span>{tab.name}</span>
//                   </>
//                 )}
//               </NavLink>
//             ))}
//           </div>
//         </ContentWrapper>
//       </nav>
//     );
//   }

//   if (!below1024) {
//     return (
//       <div className="relative">
//         <nav className="flex items-center gap-8">
//           {NAVBAR_TABS?.map((tab) => (
//             <div key={tab.name} className="relative group">
//               {/* Main Nav Link */}
//               <NavLink
//                 to={tab.path}
//                 end={tab.path === "/"}
//                 className={({ isActive }) =>
//                   `relative flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors duration-300 ${
//                     isActive
//                       ? `border-b-2 border-[var(--color-black)] ${tab.activeColor}`
//                       : "text-[var(--color-neutral-dark)] hover:text-black"
//                   }`
//                 }
//               >
//                 <tab.icon className="h-5 w-5" />
//                 <span>{tab.name}</span>
//               </NavLink>

//               {/* 🔥 DROPDOWN MENU */}
//               {tab.children && (
//                 <div
//                   className="
//                   absolute left-0 top-full
//                   mt-2 w-48
//                   bg-white
//                   shadow-lg
//                   border border-gray-100
//                   rounded-md
//                   opacity-0 invisible
//                   translate-y-2
//                   transition-all duration-300
//                   group-hover:opacity-100
//                   group-hover:visible
//                   group-hover:translate-y-0
//                   z-50
//                 "
//                 >
//                   {tab.children.map((child) => (
//                     <NavLink
//                       key={child.name}
//                       to={child.path}
//                       className="
//                       block px-4 py-2 text-sm text-gray-700
//                       hover:bg-gray-100
//                       hover:text-black
//                       transition-colors
//                     "
//                     >
//                       {child.name}
//                     </NavLink>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </nav>
//       </div>
//     );
//   }
// };

// export default NavBar;

import useIsMobile from "@/hooks/useInMobile";
import { NavLink, useLocation, useSearchParams } from "react-router-dom";
import ContentWrapper from "../shared/ContentWrapper";
import { Home, Shirt, Hammer, HardHat, Package } from "lucide-react";
import { useProductsQuery } from "@/hooks/useProductsQuery";
import NavBarSkeleton from "./NavBarSkeleton";

const CATEGORY_ICON_MAP = {
  textiles: Shirt,
  woodcraft: Hammer,
  metals: HardHat,
  carpets: Package,
};

const CATEGORY_PATH_MAP = {
  textiles: "/textiles",
  woodcraft: "/woodcraft",
  metals: "/metals",
};

const getIcon = (slug = "") => CATEGORY_ICON_MAP[slug.toLowerCase()] || Package;

const HOME_TAB = {
  name: "Home",
  slug: "home",
  path: "/home",
  icon: Home,
  activeColor: "text-[var(--color-secondary)]",
};

const NavBar = () => {
  const { pathname } = useLocation();
  const [params] = useSearchParams();
  const categoryFromURL = params.get("category");

  const below600 = useIsMobile(600);

  const { data: searchData, isLoading } = useProductsQuery({});

  // ✅ Show Skeleton while loading
  if (isLoading) {
    return <NavBarSkeleton />;
  }

  const allCategories = searchData?.filterOption?.categories ?? [];

  const dynamicTabs = allCategories
    .filter((c) => c.parentId === null)
    .map((cat) => {
      const slug = cat.slug.toLowerCase();
      const path = CATEGORY_PATH_MAP[slug] || `/${slug}`;
      const icon = getIcon(slug);

      const children = allCategories
        .filter((c) => c.parentId === cat.id)
        .map((child) => ({
          id: child.id,
          name: child.name,
          slug: child.slug.toLowerCase(),
          path:
            CATEGORY_PATH_MAP[child.slug.toLowerCase()] ||
            `/${child.slug.toLowerCase()}`,
        }));

      return {
        id: cat.id,
        name: cat.name,
        slug,
        path,
        icon,
        activeColor: "text-[var(--color-secondary)]",
        children: children.length ? children : undefined,
      };
    });

  const NAVBAR_TABS = [HOME_TAB, ...dynamicTabs];

  if (pathname === "/cart" && below600) return null;

  const inactiveMobileColor = "text-[var(--color-neutral-dark)]";
  const hoverMobileColor = "hover:text-[var(--color-black)]";

const isTabActive = (tabSlug) => {
  // Home active when no category is selected
  if (tabSlug === "home") {
    return pathname === "/home" && !params.get("category");
  }

  return params.get("category")?.toLowerCase() === tabSlug;
};

  // ✅ Mobile Navbar
  if (below600) {
    return (
      <nav className="fixed bottom-0 z-10 w-full border-t bg-[var(--color-white)] py-2">
        <ContentWrapper>
          <div className="flex justify-between">
            {NAVBAR_TABS.map((tab) => {
              const active = isTabActive(tab.slug);

              return (
                <NavLink
                  key={tab.name}
                 to={tab.slug === "home" ? "/home" : `${tab.path}?category=${tab.slug}`}
                  end={tab.path === "/home"}
                  className={`relative flex flex-col items-center text-xs font-medium transition-colors duration-300 py-1 ${
                    active ? tab.activeColor : inactiveMobileColor
                  } ${hoverMobileColor}`}
                >
                  <tab.icon
                    className={`h-6 w-6 ${
                      active ? tab.activeColor : inactiveMobileColor
                    }`}
                  />
                  <span>{tab.name}</span>
                </NavLink>
              );
            })}
          </div>
        </ContentWrapper>
      </nav>
    );
  }

  // ✅ Desktop Navbar
  return (
    <div className="relative">
      <nav className="flex items-center gap-4 lg:gap-8">
        {NAVBAR_TABS.map((tab) => {
          const active = isTabActive(tab.slug);

          return (
            <div key={tab.name} className="relative group">
              <NavLink
               to={tab.slug === "home" ? "/home" : `${tab.path}?category=${tab.slug}`}
                end={tab.path === "/home"}
                className={`relative flex items-center gap-1 lg:gap-2 px-2 lg:px-3 py-2 text-sm font-medium transition-colors duration-300 ${
                  active
                    ? `border-b-2 border-[var(--color-black)] ${tab.activeColor}`
                    : "text-[var(--color-neutral-dark)] hover:text-black"
                }`}
              >
                <tab.icon className="h-4 w-4 lg:h-5 lg:w-5" />
                <span>{tab.name}</span>
              </NavLink>

              {/* Sub Categories */}
              {tab.children && (
                <div
                  className="
                  absolute left-0 top-full mt-2 w-48
                  bg-white shadow-lg border border-gray-100 rounded-md
                  opacity-0 invisible translate-y-2
                  transition-all duration-300
                  group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                  z-50
                "
                >
                  {tab.children.map((child) => (
                    <NavLink
                      key={child.id}
                      to={`${tab.path}?category=${child.slug}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-black transition-colors"
                    >
                      {child.name}
                    </NavLink>
                  ))}
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
