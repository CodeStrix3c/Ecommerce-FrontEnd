import React from 'react';
import { Heart, IndianRupee, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWishlist } from '@/providers/WishListProvider';

const PlaceCard = ({ place }) => {
  const { _id, title, address, photos, price, rating } = place;
  const { wishlist, toggleWishlist } = useWishlist();

  const isWishlisted = wishlist.some((item) => item._id === _id);

  return (
    <div className="h-full">
      <Link to={`/place/${_id}`} className="block h-full cursor-pointer">
        <div className="relative">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-xl">
            <img
              src={photos[0]}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>

          <div className="absolute left-2 top-2 rounded-full bg-white px-2 py-1 text-[11px] font-semibold text-[#222] shadow-sm sm:text-xs">
            Farmer favourite
          </div>

          <button
            type="button"
            className="absolute right-2 top-2 rounded-full bg-white p-1 shadow-sm transition hover:scale-110"
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(place);
            }}
          >
            <Heart
              className={`h-4 w-4 transition ${
                isWishlisted ? 'fill-[#ff5a5f] text-[#ff5a5f]' : 'text-gray-700'
              }`}
            />
          </button>
        </div>

        <div className="mt-2">
          <h3 className="truncate text-[15px] font-medium text-[#222] sm:text-base">
            {title}
          </h3>

          <p className="truncate text-[13px] text-[#222222] sm:text-sm">
            {address}
          </p>

          <div className="mt-1 flex items-center justify-between text-[13px] sm:text-sm">
            <span className="flex items-center font-normal text-[#222]">
              <IndianRupee className="h-3 w-3 text-[#222]" />
              {price}{' '}
              <span className="mx-1 min-w-fit text-[12px] text-[#222222]">
                for 2 nights
              </span>
            </span>
            <span className="flex items-center gap-1 font-medium text-[#222]">
              <Star className="h-3 w-3 fill-[#222] text-[#222]" /> {rating}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PlaceCard;
