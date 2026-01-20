import React from "react";
import { Heart, IndianRupee } from "lucide-react";
import { Link } from "react-router-dom";
import { useWishlist } from "@/providers/WishListProvider";
import PlaceCardSkeletonUi from "./PlaceCardSkeletonUi";
import StarRating from "@/components/ui/StarRating";

const PlaceCard = ({ place, loading }) => {
  const ids = [
    "101",
    "105",
    "108",
    "109",
    "113",
    "115",
    "118",
    "120",
    "125",
    "128",
    "129",
  ];

  const { wishlist, toggleWishlist } = useWishlist();

  // ✅ GUARD FIRST
  if (loading || !place) {
    return <PlaceCardSkeletonUi />;
  }

  const { _id, title, category, address, photos, price, rating } = place;

  const isWishlisted = wishlist.some((item) => item._id === _id);

  return (
    <div className="h-full">
      <Link
        to={`/place/${_id}`}
        state={{ place }}
        className="block h-full cursor-pointer"
      >
        <div className="relative">
          <div className="aspect-square w-full overflow-hidden rounded-lg bg-gradient-to-br from-[var(--color-overlay)] to-[var(--color-black-hover)] shadow-md">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />

              <img
                src={photos?.[0]}
                alt={title}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>

          {ids.includes(String(_id)) && (
            <div className="absolute left-2 top-2 rounded-full px-3 py-1 text-xs font-medium text-[var(--color-black)] bg-white/70 backdrop-blur-sm shadow-sm">
              Favrourites
            </div>
          )}

          <button
            type="button"
            className="absolute right-2 top-2 rounded-full p-1 transition-transform duration-200 hover:scale-110 bg-white/60 backdrop-blur-sm shadow"
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(place);
            }}
          >
            <Heart
              className={`h-5 w-5 transition-all duration-300 ${
                isWishlisted
                  ? "fill-current text-[var(--color-secondary)] stroke-[var(--color-white)] stroke-1"
                  : "fill-[var(--color-overlay)] stroke-[var(--color-white)] stroke-1"
              }`}
            />
          </button>
        </div>

        <div className="mt-3">
          <h3 className="truncate text-[15px] font-semibold text-[var(--color-black)] sm:text-base">
            {title || "Agricultural Insecticide"}
          </h3>

          <p className="truncate text-[13px] text-[var(--color-black)] sm:text-sm">
            {category || "Pan-India Supplier"}
          </p>

          <div className="mt-2 flex items-center justify-between text-[13px] sm:text-sm">
            <span className="flex items-center gap-0 font-normal text-[var(--color-black)]">
              <IndianRupee className="h-4 w-4" />
              <span className="text-sm font-medium">{price ?? 500}</span>
              {/* <span className="text-sm">/liter</span> */}
            </span>

            <StarRating size={12} rating={rating ?? 4.5} />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PlaceCard;
