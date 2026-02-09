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

  // ✅ FIXED: productId vs _id
  const isWishlisted = wishlist.some((item) => item.productId === id);

  return (
    <div className="h-full">
      <Link to={`/place/${id}`} className="block h-full">
        <div className="relative">
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 shadow">
            <img
              src={image}
              alt={title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform hover:scale-105"
            />
          </div>

          {oldPrice && (
            <span className="absolute left-2 top-2 rounded bg-red-500 px-2 py-1 text-xs text-white">
              SALE {discountPercent ? `-${discountPercent}%` : ""}
            </span>
          )}

          {/* ❤️ Wishlist */}
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(place);
            }}
            className="absolute right-2 top-2 rounded-full bg-white/80 p-1 shadow"
          >
            <Heart
              className={`h-5 w-5 transition ${
                isWishlisted ? "fill-red-500 stroke-red-500" : "stroke-gray-700"
              }`}
            />
          </button>
        </div>

        <div className="mt-3 flex flex-col">
          <h3 className="truncate text-sm font-semibold">{title}</h3>

          <p className="mt-1 h-4 truncate text-xs text-gray-500">
            {category || "\u00A0"}
          </p>

          <div className="mt-2 flex items-baseline gap-2">
            <span className="flex items-center text-base font-semibold">
              <IndianRupee className="h-4 w-4" />
              {price}
            </span>

            {oldPrice && (
              <span className="text-sm text-gray-400 line-through">
                ₹{oldPrice}
              </span>
            )}
          </div>

          <div className="mt-2 h-5 flex items-center">
            {rating ? (
              <StarRating size={12} rating={rating} count={ratingCount} />
            ) : (
              <StarRating size={12} />
            )}
          </div>

          <p
            className={`mt-2 text-xs font-medium ${
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
