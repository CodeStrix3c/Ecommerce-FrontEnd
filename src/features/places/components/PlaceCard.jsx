import React, { useEffect, useState } from "react";
import { Heart, IndianRupee, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useWishlist } from "@/providers/WishListProvider";
import PlaceCardSkeletonUi from "./PlaceCardSkeletonUi";

const PlaceCard = ({ place }) => {
  const { wishlist, toggleWishlist } = useWishlist();

  const { _id, title, address, photos, price, rating } = place;
  const isWishlisted = wishlist.some((item) => item._id === _id);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <PlaceCardSkeletonUi />;
  }

  return (
    <div className="h-full">
      <Link to={`/product/${_id}`} className="block h-full cursor-pointer">
        <div className="relative">
          {/* Image */}
          <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-[var(--color-white-hover)]">
            <img
              src={photos[0]}
              alt={title}
              className="h-full w-full object-contain object-bottom transition-transform duration-300 hover:scale-95"
            />
          </div>

          <div className="absolute left-2 top-2 rounded-sm bg-white/80 px-2 py-1 text-xs font-semibold text-[var(--color-neutral-dark)] shadow-md backdrop-blur-sm">
            Farmer Favourite
          </div>

          {/* Heart */}
          <button
            type="button"
            className="absolute right-2 top-2 rounded-full bg-[var(--color-white)] p-1 shadow-sm transition hover:scale-110"
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(place);
            }}
          >
            <Heart
              className={`h-4 w-4 transition ${
                isWishlisted
                  ? "fill-current text-[var(--color-accent)]"
                  : "text-[var(--color-neutral-dark)]"
              }`}
            />
          </button>
        </div>

        {/* Info */}
        <div className="mt-2">
          <h3 className="truncate text-[15px] font-medium text-[var(--color-neutral-dark)] sm:text-base">
            {title || "Agricultural Insecticide"}
          </h3>

          <p className="truncate text-[13px] text-[var(--color-neutral-dark)] sm:text-sm">
            {address || "Pan-India Supplier"}
          </p>

          <div className="mt-1 flex items-center justify-between text-[13px] sm:text-sm">
            {/* Price */}
            <span className="flex items-center font-normal text-[var(--color-neutral-dark)]">
              <IndianRupee className="h-3 w-3 text-[var(--color-neutral-dark)]" />
              {price || 500}{" "}
              <span className="mx-1 min-w-fit text-[12px] text-[var(--color-neutral-dark)]">
                per liter
              </span>
            </span>

            {/* Rating */}
            <span className="flex items-center gap-1 font-medium text-[var(--color-neutral-dark)]">
              <Star className="h-3 w-3 fill-current text-[var(--color-neutral-dark)]" />{" "}
              {rating || 4.7}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PlaceCard;
