// import React from "react";
// import {
//   Info,
//   HelpCircle,
//   User,
//   X,
//   Palette,
//   Package,
//   LogOut,
// } from "lucide-react";
// import useIsMobile from "@/hooks/useInMobile";
// import { useNavigate } from "react-router-dom";
// import {
//   getItemFromLocalStorage,
//   removeItemFromLocalStorage,
// } from "@/utils/localStorage";

// const SidebarMobile = ({ open, onClose }) => {
//   const below1024 = useIsMobile(1024);
//   const below600 = useIsMobile(600);
//   const below500 = useIsMobile(620);
//   const navigate = useNavigate();

//   const token = getItemFromLocalStorage("token");
//   const isAuthenticated = Boolean(token);

//   const rolesRaw = getItemFromLocalStorage("roles");
//   const roles = rolesRaw ? JSON.parse(rolesRaw) : [];

//   const hasCustomerRole = roles.includes("customer");
//   const hasVendorRole = roles.includes("vendor");

//   const handleAuthAction = () => {
//     if (isAuthenticated) {
//       removeItemFromLocalStorage("token");
//       removeItemFromLocalStorage("roles");
//       removeItemFromLocalStorage("userId");
//       removeItemFromLocalStorage("vendorId");
//       navigate("/");
//     } else {
//       navigate("/login");
//     }
//     onClose();
//   };

//   const handleVendorNavigation = () => {
//     if (!roles || roles.length === 0) {
//       navigate("/vendor-signup");
//     } else if (hasCustomerRole && !hasVendorRole) {
//       navigate("/supplier-register");
//     } else if (hasCustomerRole && hasVendorRole) {
//       navigate("/dashboard");
//     }
//     onClose();
//   };

//   return (
//     <>
//       {/* Overlay */}
//       <div
//         onClick={onClose}
//         className={`fixed inset-0 bg-[var(--color-overlay)] backdrop-blur-sm transition-opacity duration-300 z-40 ${
//           open ? "opacity-100 visible" : "opacity-0 invisible"
//         }`}
//       />

//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 left-0 h-full w-72 bg-[var(--color-white)] shadow-xl z-50 transform transition-transform duration-300 ${
//           open ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-gray)]">
//           <img
//             src="/assets/images/logo6.png"
//             alt="Kashmir Art & Handicraft"
//             width={140}
//             height={50}
//           />
//           <button
//             onClick={onClose}
//             className="text-[var(--color-black)] hover:text-[var(--color-primary)]"
//           >
//             <X size={24} />
//           </button>
//         </div>

//         {/* Navigation */}
//         <nav className="flex-1 p-4 space-y-1 text-[var(--color-black)]">
//           <div className="flex items-center gap-3 px-2 py-2 rounded-lg cursor-pointer hover:bg-[var(--color-gray-light)]">
//             <Info size={18} /> About Kashmir Art
//           </div>

//           <div className="flex items-center gap-3 px-2 py-2 rounded-lg cursor-pointer hover:bg-[var(--color-gray-light)]">
//             <HelpCircle size={18} /> Visitor Support
//           </div>

//           <div className="block px-2 py-2 rounded-lg cursor-pointer hover:bg-[var(--color-gray-light)]">
//             <div className="flex items-center gap-3">
//               <Palette size={18} /> Artisan Stories
//             </div>
//             <p className="ml-7 mt-1 text-xs opacity-70">
//               Learn about Kashmiri artisans and their craft.
//             </p>
//           </div>

//           {below1024 && !below600 && (
//             <>
//               <div className="flex items-center gap-3 px-2 py-2 rounded-lg cursor-pointer hover:bg-[var(--color-gray-light)]">
//                 <Package size={18} /> Craft Collections
//               </div>
//               <hr className="my-2 border-[var(--color-black-hover)]" />
//             </>
//           )}

//           <div className="flex items-center gap-3 px-2 py-2 rounded-lg cursor-pointer hover:bg-[var(--color-gray-light)]">
//             <Package size={18} /> Orders & Exhibits
//           </div>

//           {below500 && (
//             <>
//               <div className="flex items-center gap-3 px-2 py-2 rounded-lg cursor-pointer hover:bg-[var(--color-gray-light)]">
//                 <User size={16} /> Artisan Profile
//               </div>

//               <div className="flex items-center gap-3 px-2 py-2 rounded-lg cursor-pointer hover:bg-[var(--color-gray-light)]">
//                 <Palette size={16} /> Handicraft Categories
//               </div>
//             </>
//           )}

//           <hr className="my-2 border-[var(--color-black-hover)]" />

//           <div
//             onClick={() => {
//               navigate("/profile");
//               onClose();
//             }}
//             className="flex items-center gap-3 px-2 py-2 rounded-lg cursor-pointer hover:bg-[var(--color-gray-light)]"
//           >
//             <User size={18} /> Visitor Account
//           </div>

//           {/* ✅ UI + ROLE-BASED VENDOR OPTION */}
//           <div
//             onClick={handleVendorNavigation}
//             className="flex items-center gap-3 px-2 py-2 rounded-lg cursor-pointer hover:bg-[var(--color-gray-light)]"
//           >
//             <User size={18} />
//             {hasCustomerRole && hasVendorRole
//               ? "Vendor Dashboard"
//               : "Become a Vendor"}
//           </div>

//           <div
//             onClick={handleAuthAction}
//             className={`flex items-center gap-3 px-2 py-2 rounded-lg cursor-pointer ${
//               isAuthenticated ? "text-red-600" : "text-[var(--color-primary)]"
//             }`}
//           >
//             <LogOut size={18} />
//             <span>{isAuthenticated ? "Sign Out" : "Sign In"}</span>
//           </div>
//         </nav>
//       </div>
//     </>
//   );
// };

// export default SidebarMobile;

import React from "react";
import {
  Info,
  HelpCircle,
  User,
  X,
  Palette,
  Package,
  LogOut,
  ShoppingCart,
} from "lucide-react";
import useIsMobile from "@/hooks/useInMobile";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "@/providers/UserProvider";

const SidebarMobile = ({ open, onClose }) => {
  const below1024 = useIsMobile(1024);
  const below600 = useIsMobile(600);
  const below500 = useIsMobile(620);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // ✅ Use context instead of localStorage
  const { token, roles, logout, userId, VendorId } = useUser();

  const isAuthenticated = Boolean(token);

  const hasCustomerRole = roles?.includes("customer");
  const hasVendorRole = roles?.includes("vendor");

  const handleAuthAction = () => {
    if (isAuthenticated) {
      logout(); // 🔥 updates context state
      queryClient.clear(); // 🔥 clears wishlist/cart cache
      toast.success("Logged out successfully!");
      navigate("/");
    } else {
      navigate("/login");
    }
    onClose();
  };

  const handleVendorNavigation = () => {
    if (!roles || roles.length === 0) {
      navigate("/vendor-signup");
    } else if (hasCustomerRole && !hasVendorRole) {
      navigate("/supplier-register");
    } else if (hasCustomerRole && hasVendorRole) {
      navigate("/dashboard");
    }
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-[var(--color-overlay)] backdrop-blur-sm transition-opacity duration-300 z-40 ${open ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-[var(--color-white)] shadow-xl z-50 transform transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-gray)]">
          <img
            src="/assets/images/logo6.png"
            alt="Kashmir Art & Handicraft"
            width={140}
            height={50}
          />
          <button
            onClick={onClose}
            className="text-[var(--color-black)] hover:text-[var(--color-primary)]"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 text-[var(--color-black)]">
          <div className="flex items-center gap-3 px-2 py-2 rounded-lg cursor-pointer hover:bg-[var(--color-gray-light)]">
            <Info size={18} /> About Kashmir Art
          </div>

          <div className="flex items-center gap-3 px-2 py-2 rounded-lg cursor-pointer hover:bg-[var(--color-gray-light)]">
            <HelpCircle size={18} /> Visitor Support
          </div>

          <div className="block px-2 py-2 rounded-lg cursor-pointer hover:bg-[var(--color-gray-light)]">
            <div className="flex items-center gap-3">
              <Palette size={18} /> Artisan Stories
            </div>
            <p className="ml-7 mt-1 text-xs opacity-70">
              Learn about Kashmiri artisans and their craft.
            </p>
          </div>

          {below1024 && !below600 && (
            <>
              <div className="flex items-center gap-3 px-2 py-2 rounded-lg cursor-pointer hover:bg-[var(--color-gray-light)]">
                <Package size={18} /> Craft Collections
              </div>
              <hr className="my-2 border-[var(--color-black-hover)]" />
            </>
          )}

          <div className="flex items-center gap-3 px-2 py-2 rounded-lg cursor-pointer hover:bg-[var(--color-gray-light)]">
            <Package size={18} /> Orders & Exhibits
          </div>

          {below500 && (
            <>
              <div className="flex items-center gap-3 px-2 py-2 rounded-lg cursor-pointer hover:bg-[var(--color-gray-light)]">
                <User size={16} /> Artisan Profile
              </div>

              <div className="flex items-center gap-3 px-2 py-2 rounded-lg cursor-pointer hover:bg-[var(--color-gray-light)]">
                <Palette size={16} /> Handicraft Categories
              </div>
            </>
          )}

          <hr className="my-2 border-[var(--color-black-hover)]" />

          <div
            onClick={() => {
              navigate("/profile");
              onClose();
            }}
            className="flex items-center gap-3 px-2 py-2 rounded-lg cursor-pointer hover:bg-[var(--color-gray-light)]"
          >
            <User size={18} /> My Profile
          </div>

          <div
            onClick={() => {
              navigate("/order");
              onClose();
            }}
            className="flex items-center gap-3 px-2 py-2 rounded-lg cursor-pointer hover:bg-[var(--color-gray-light)]"
          >
            <ShoppingCart size={18} />Orders Page

          </div>



          {/* ROLE-BASED VENDOR OPTION */}
          <div
            onClick={handleVendorNavigation}
            className="flex items-center gap-3 px-2 py-2 rounded-lg cursor-pointer hover:bg-[var(--color-gray-light)]"
          >
            <User size={18} />
            {hasCustomerRole && hasVendorRole
              ? "Vendor Dashboard"
              : "Become a Vendor"}
          </div>

          <div
            onClick={handleAuthAction}
            className={`flex items-center gap-3 px-2 py-2 rounded-lg cursor-pointer ${isAuthenticated ? "text-red-600" : "text-[var(--color-primary)]"
              }`}
          >
            <LogOut size={18} />
            <span>{isAuthenticated ? "Sign Out" : "Sign In"}</span>
          </div>
        </nav>
      </div>
    </>
  );
};

export default SidebarMobile;
