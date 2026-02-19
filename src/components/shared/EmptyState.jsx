import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Package } from "lucide-react";

const EmptyState = ({
  title = "No Crafts Found",
  subTitle = "We couldn't find any Kashmir handicrafts matching your search.",
  btnText = "Browse Crafts",
  redirectTo = "/",
  showIcon = true,
  type = "default", // wishlist | cart | default
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Icon based on type
  const renderIcon = () => {
    switch (type) {
      case "wishlist":
        return (
          <div className="bg-[var(--color-secondary)] p-3 rounded-full">
            <Heart className="w-12 h-12 text-white" />
          </div>
        );

      case "cart":
        return (
          <div className="bg-blue-100 p-3 rounded-full">
            <ShoppingCart className="w-12 h-12 text-blue-600" />
          </div>
        );

      default:
        return (
          <div className="bg-[var(--color-secondary)] p-3 rounded-full">
            <ShoppingCart className="w-12 h-12 text-white " />
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 lg:mt-28 md:mt-28 gap-6 text-center">

      {/* Icon */}
      {showIcon && renderIcon()}

      {/* Title */}
      <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-black)]">
        {title}
      </h2>

      {/* Subtitle */}
      <p className="text-sm md:text-base max-w-xl text-gray-500">
        {subTitle}
      </p>

      {/* Button */}
      <button
        onClick={() => navigate(redirectTo)}
        className="mt-4 px-6 py-3 bg-[var(--color-secondary)] text-[var(--color-white)] rounded-lg shadow-lg transition hover:bg-[var(--color-secondary-hover)]"
      >
        {btnText}
      </button>

    </div>
  );
};

export default EmptyState;
