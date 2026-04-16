import React, { useState } from "react";
import { Heart, IndianRupee } from "lucide-react";
import { Link } from "react-router-dom";
import { useWishlist } from "@/providers/WishListProvider";
import PlaceCardSkeletonUi from "./PlaceCardSkeletonUi";
import StarRating from "@/components/ui/StarRating";

const formatINR = (value) => Number(value).toLocaleString("en-IN");

const PlaceCard = ({ place, loading }) => {
  const { wishlist, toggleWishlist } = useWishlist();
  const [isToggling, setIsToggling] = useState(false);

  if (loading || !place) {
    return <PlaceCardSkeletonUi />;
  }

  const {
    id,
    title,
    category,
    image,
    price,
    oldPrice,
    rating,
    ratingCount,
    discountPercent,
    stock,
  } = place;

  const isWishlisted = wishlist.some((item) => item.productId === id);
  const isOutOfStock = stock === 0;

  const handleWishlistToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isToggling) return;

    setIsToggling(true);
    try {
      await toggleWishlist(place);
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <div className="h-full">
      <Link to={`/place/${id}`} className="block h-full">
        <div className="relative">
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 shadow">
            <img
              src={image}
              alt={title}
              loading="lazy"
              className={`h-full w-full object-cover transition-transform hover:scale-105 ${
                isOutOfStock ? "grayscale-[0.5]" : ""
              }`}
            />
          </div>

          {/* 🔴 Out of Stock Badge */}
          {isOutOfStock && (
            <span className="absolute left-2 top-2 z-10 bg-red-600 text-white text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded shadow-sm">
              Out of Stock
            </span>
          )}

          {/* ❤️ Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            disabled={isToggling}
            className="absolute right-2 top-2 z-10 rounded-full bg-white/90 p-1.5 shadow-md transition-all active:scale-90 hover:bg-white disabled:cursor-not-allowed"
            aria-label="Toggle Wishlist"
          >
            <Heart
              className={`h-5 w-5 transition-colors ${
                isWishlisted ? "fill-red-500 stroke-red-500" : "stroke-gray-700"
              }`}
            />
          </button>
        </div>

        <div className="mt-3 flex flex-col">
          <h3 className="truncate text-sm font-semibold text-gray-800">
            {title}
          </h3>

          <div className="mt-1 flex items-baseline gap-2">
            <span className="flex items-center text-base font-bold text-[var(--color-primary)]">
              <IndianRupee className="h-3.5 w-3.5" />
              {formatINR(price)}
            </span>

            {oldPrice && (
              <span className="text-xs text-gray-400 line-through">
                ₹{formatINR(oldPrice)}
              </span>
            )}
          </div>

          <div className="mt-2 h-5 flex items-center">
            {rating ? (
              <StarRating size={14} rating={rating} count={ratingCount} />
            ) : (
              <StarRating size={14} />
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PlaceCard;
