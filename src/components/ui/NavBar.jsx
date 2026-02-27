import useIsMobile from "@/hooks/useInMobile";
import { NavLink, useLocation } from "react-router-dom";
import ContentWrapper from "../shared/ContentWrapper";
import { NAVBAR_TABS } from "@/constants/navTabs";

const NavBar = ({}) => {
  const { pathname } = useLocation();
  const below1024 = useIsMobile(1024);
  const below600 = useIsMobile(600);

  if (pathname === "/cart" && below600) return null;

  const inactiveMobileColor = "text-[var(--color-neutral-dark)]";
  const inactiveDesktopColor = "text-[var(--color-neutral-dark)]";
  const hoverMobileColor = "hover:text-[var(--color-black)]";
  const hoverDesktopColor = "hover:text-[var(--color-black)]";
  if (below600) {
    return (
      <nav className="fixed bottom-0 z-10 w-full border-t bg-[var(--color-white)] py-2">
        <ContentWrapper>
          <div className="flex justify-between">
            {NAVBAR_TABS?.map((tab) => (
              <NavLink
                key={tab.name}
                to={tab.path}
                end={tab.path === "/"}
                className={({ isActive }) =>
                  `relative flex flex-col items-center text-xs font-medium transition-colors duration-300 py-1 ${
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

  if (!below1024) {
    return (
      <div className="relative">
        <nav className="flex items-center gap-8">
          {NAVBAR_TABS?.map((tab) => (
            <div key={tab.name} className="relative group">
              {/* Main Nav Link */}
              <NavLink
                to={tab.path}
                end={tab.path === "/"}
                className={({ isActive }) =>
                  `relative flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors duration-300 ${
                    isActive
                      ? `border-b-2 border-[var(--color-black)] ${tab.activeColor}`
                      : "text-[var(--color-neutral-dark)] hover:text-black"
                  }`
                }
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.name}</span>
              </NavLink>

              {/* 🔥 DROPDOWN MENU */}
              {tab.children && (
                <div
                  className="
                  absolute left-0 top-full
                  mt-2 w-48
                  bg-white
                  shadow-lg
                  border border-gray-100
                  rounded-md
                  opacity-0 invisible
                  translate-y-2
                  transition-all duration-300
                  group-hover:opacity-100
                  group-hover:visible
                  group-hover:translate-y-0
                  z-50
                "
                >
                  {tab.children.map((child) => (
                    <NavLink
                      key={child.name}
                      to={child.path}
                      className="
                      block px-4 py-2 text-sm text-gray-700
                      hover:bg-gray-100
                      hover:text-black
                      transition-colors
                    "
                    >
                      {child.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    );
  }
};

export default NavBar;

// import useIsMobile from "@/hooks/useInMobile";
// import { NavLink, useLocation } from "react-router-dom";
// import ContentWrapper from "../shared/ContentWrapper";
// import { Home, Shirt, Hammer, HardHat, Package } from "lucide-react";
// import { useGetCategories } from "@/hooks/category/useCategory";

// // Map category names to icons (fallback to Package)
// const CATEGORY_ICON_MAP = {
//   textiles: Shirt,
//   woodcraft: Hammer,
//   metals: HardHat,
// };

// const getIcon = (name = "") => {
//   const key = name.toLowerCase().replace(/\s+/g, "");
//   return CATEGORY_ICON_MAP[key] || Package;
// };

// const getSlug = (name = "") => name.toLowerCase().replace(/\s+/g, "-");

// const HOME_TAB = {
//   name: "Home",
//   path: "/home",
//   icon: Home,
//   activeColor: "text-[var(--color-secondary)]",
// };

// const NavBar = () => {
//   const { pathname } = useLocation();
//   const below1024 = useIsMobile(1024);
//   const below600 = useIsMobile(600);
//   const { data: categories = [] } = useGetCategories();

//   // Build dynamic tabs from API data
//   const dynamicTabs = categories
//     .filter((c) => c.parentId === null && c.isPublished)
//     .sort((a, b) => a.displayOrder - b.displayOrder)
//     .map((parent) => {
//       const children = categories
//         .filter((c) => c.parentId === parent.id && c.isPublished)
//         .map((child) => {
//           const shortName = child.name.includes(">>")
//             ? child.name.split(">>")[1].trim()
//             : child.name;
//           return {
//             name: shortName,
//             path: `/category/${child.id}/${getSlug(shortName)}`,
//           };
//         });

//       const parentSlug = getSlug(
//         parent.name.includes(">>")
//           ? parent.name.split(">>")[1].trim()
//           : parent.name,
//       );

//       return {
//         name: parent.name,
//         path: `/category/${parent.id}/${parentSlug}`,
//         icon: getIcon(parent.name),
//         activeColor: "text-[var(--color-secondary)]",
//         children: children.length ? children : undefined,
//       };
//     });

//   const NAVBAR_TABS = [HOME_TAB, ...dynamicTabs];

//   if (pathname === "/cart" && below600) return null;

//   const inactiveMobileColor = "text-[var(--color-neutral-dark)]";
//   const hoverMobileColor = "hover:text-[var(--color-black)]";

//   if (below600) {
//     return (
//       <nav className="fixed bottom-0 z-10 w-full border-t bg-[var(--color-white)] py-2">
//         <ContentWrapper>
//           <div className="flex justify-between">
//             {NAVBAR_TABS.map((tab) => (
//               <NavLink
//                 key={tab.name}
//                 to={tab.path}
//                 end={tab.path === "/home"}
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
//           {NAVBAR_TABS.map((tab) => (
//             <div key={tab.name} className="relative group">
//               <NavLink
//                 to={tab.path}
//                 end={tab.path === "/home"}
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

//               {tab.children && (
//                 <div
//                   className="
//                     absolute left-0 top-full mt-2 w-48
//                     bg-white shadow-lg border border-gray-100 rounded-md
//                     opacity-0 invisible translate-y-2
//                     transition-all duration-300
//                     group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
//                     z-50
//                   "
//                 >
//                   {tab.children.map((child) => (
//                     <NavLink
//                       key={child.name}
//                       to={child.path}
//                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-black transition-colors"
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
