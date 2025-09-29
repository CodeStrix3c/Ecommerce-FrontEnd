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
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <PlaceCardSkeletonUi />;
  }

  return (
    <div className="h-full">
      <Link to={`/place/${_id}`} className="block h-full cursor-pointer ">
        <div className="relative">
          <div className="aspect-[5/5] w-full overflow-hidden rounded-2xl bg-[var(--color-black-hover)] border border-sm ">
            <img
              src={photos[0]}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>

          <div className="absolute left-2 top-2 rounded-lg px-2 py-1 text-xs font-medium text-[var(--color-black)] bg-[var(--color-black-hover)]">
            Farmer Favourite
          </div>

          <button
            type="button"
            className="absolute right-2 top-2 rounded-full  transition hover:scale-110"
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(place);
            }}
          >
            

            <Heart
            className={`h-6 w-6 transition-all duration-300
           ${isWishlisted 
          ? "fill-current text-[var(--color-secondary)] stroke-white stroke-1" 
          : "fill-[rgba(0,0,0,0.5)] stroke-white stroke-1"} 
  `}
/>
          </button>
        </div>

        {/* Info */}
        <div className="mt-2">
          <h3 className="truncate text-[15px] font-medium text-[var(--color-black)] sm:text-base">
            {title || "Agricultural Insecticide"}
          </h3>

          <p className="truncate text-[13px] text-[var(--color-black)] sm:text-sm">
            {address || "Pan-India Supplier"}
          </p>

          <div className="mt-1 flex  text-[13px] sm:text-sm">
            <span className="flex items-center font-normal text-[var(--color-black)]">
              <IndianRupee className="h-3 w-3  text-[var(--color-black)] font-medium" />
              <span className="text-xs font-medium">
                {price || 500}{" "}
              </span>
              <span className="mx-1 min-w-fit text-[12px] text-[var(--color-black)] font-medium">
                per liter.
              </span>
            </span>

            <span className="flex items-center gap-1 font-normal text-[var(--color-black)]">
              <Star className="h-2 w-2 fill-current text-[var(--color-black)]" />
              <span className="text-xs font-medium">
                {rating || 4.7}
              </span>
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PlaceCard;




