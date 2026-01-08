import React from "react";
import {
  Info,
  HelpCircle,
  User,
  X,
  Palette,
  Package,
  LogOut,
} from "lucide-react";
import useIsMobile from "@/hooks/useInMobile";

const SidebarMobile = ({ open, onClose }) => {
  const below1024 = useIsMobile(1024);
  const below600 = useIsMobile(600);
  const below500 = useIsMobile(620);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-[var(--color-overlay)] backdrop-blur-sm transition-opacity duration-300 z-40 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-[var(--color-white)] shadow-xl z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-gray)]">
          <div className="flex items-center">
            <img
              src="/assets/images/kashmir-art.jpeg"
              alt="Kashmir Art & Handicraft"
              className="h-10 w-auto rounded-md object-cover"
            />
          </div>
          <button
            onClick={onClose}
            className="text-[var(--color-black)] hover:text-[var(--color-primary)]"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 text-[var(--color-black)]">
          <div className="flex items-center gap-3 px-2 py-2 rounded-lg cursor-default">
            <Info size={18} /> About Our Heritage
          </div>

          <div className="flex items-center gap-3 px-2 py-2 rounded-lg cursor-default">
            <HelpCircle size={18} /> Visitor Support
          </div>

          <div className="block px-2 py-2 rounded-lg cursor-default">
            <div className="flex items-center gap-3">
              <Palette size={18} /> Artisan Stories
            </div>
            <p className="ml-7 mt-1 text-xs opacity-70">
              Learn about Kashmiri artisans and traditional craftsmanship.
            </p>
          </div>

          {below1024 && !below600 && (
            <>
              <div className="flex items-center gap-3 px-2 py-2 rounded-lg cursor-default">
                <Package size={18} /> Craft Collections
              </div>
              <hr className="my-2 border-[var(--color-black-hover)]" />
            </>
          )}

          <div className="flex items-center gap-3 px-2 py-2 rounded-lg cursor-default">
            <Package size={18} /> Orders & Exhibits
          </div>

          {below500 && (
            <>
              <div className="flex items-center gap-3 px-2 py-2 rounded-lg cursor-default">
                <User size={16} /> Artisan Profile
              </div>

              <div className="flex items-center gap-3 px-2 py-2 rounded-lg cursor-default">
                <Palette size={16} /> Handicraft Categories
              </div>
            </>
          )}

          <hr className="my-2 border-[var(--color-black-hover)]" />

          <div className="flex items-center gap-3 px-2 py-2 rounded-lg cursor-default">
            <User size={18} /> Visitor Account
          </div>

          <div className="flex items-center gap-3 px-2 py-2 rounded-lg cursor-default opacity-60">
            <LogOut size={18} /> Sign Out
          </div>
        </nav>
      </div>
    </>
  );
};

export default SidebarMobile;
