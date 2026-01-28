import React from "react";
import { Heart, IndianRupee } from "lucide-react";
import { Link } from "react-router-dom";
import { useWishlist } from "@/providers/WishListProvider";
import PlaceCardSkeletonUi from "./PlaceCardSkeletonUi";
import StarRating from "@/components/ui/StarRating";

const PlaceCard = ({ place, loading }) => {
  const { wishlist, toggleWishlist } = useWishlist();

  if (loading || !place) {
    return <PlaceCardSkeletonUi />;
  }

  const {
    _id,
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

  const isWishlisted = wishlist.some((item) => item._id === _id);

  return (
    <div className="h-full">
      <Link to={`/place/${_id}`} state={{ place }} className="block h-full">
        {/* IMAGE */}
        <div className="relative">
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 shadow">
            <img
              src={image}
              alt={title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform hover:scale-105"
            />
          </div>

          {/* SALE BADGE */}
          {oldPrice && (
            <span className="absolute left-2 top-2 rounded bg-red-500 px-2 py-1 text-xs font-medium text-white">
              SALE {discountPercent ? `-${discountPercent}%` : ""}
            </span>
          )}

          {/* WISHLIST */}
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(place);
            }}
            className="absolute right-2 top-2 rounded-full bg-white/80 p-1 shadow"
          >
            <Heart
              className={`h-5 w-5 ${
                isWishlisted ? "fill-red-500 stroke-red-500" : "stroke-gray-700"
              }`}
            />
          </button>
        </div>

        {/* CONTENT */}
        <div className="mt-1 flex flex-col gap-1">
          {/* TITLE */}
          <h3 className="truncate text-sm font-semibold">{title}</h3>

          {/* CATEGORY (space reserved even if missing) */}
          <p className="min-h-[16px] truncate text-xs text-gray-500">
            {category || ""}
          </p>

          {/* PRICE ROW */}
          <div className=" flex items-center justify-between">
            <div className="flex items-center gap-12">
              <span className="flex items-center font-semibold">
                <IndianRupee className="h-4 w-4" />
                {price}
              </span>

              {/* OLD PRICE (space preserved) */}
              <span className="min-w-[40px] text-xs text-gray-400 line-through">
                {oldPrice ? `₹${oldPrice}` : ""}
              </span>
            </div>
          </div>

          {/* RATING (fixed height) */}
          <div className="min-h-[18px]">
            {rating ? (
              <StarRating size={12} rating={rating} count={ratingCount} />
            ) : null}
          </div>

          {/* STOCK */}
          <p
            className={`mt-1 text-xs font-medium ${
              stock > 0 ? "text-green-600" : "text-red-500"
            }`}
          >
            {stock > 0 ? "In Stock" : "Out of Stock"}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default PlaceCard;
