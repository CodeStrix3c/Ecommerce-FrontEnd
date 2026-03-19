import React from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { useWishlist } from "@/providers/WishListProvider";

export default function YouMayAlsoLike({ products }) {
  const navigate = useNavigate();
  const { wishlist, toggleWishlist } = useWishlist();

  if (!products?.length) return null;

  return (
    <div className="mt-12">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl lg:text-2xl font-semibold">You May Also Like</h2>
      </div>

      <div className="flex gap-6 overflow-x-auto no-scrollbar pb-2">
        {products.map((item) => {
          const isWishlisted = wishlist.some((w) => w.productId === item.id);

          return (
            <div
              key={item.id}
              onClick={() => navigate(`/place/${item.id}`)}
              className="w-[200px] sm:w-[230px] lg:w-[260px] flex-shrink-0 cursor-pointer group"
            >
              {/* IMAGE WRAPPER */}
              <div className="relative w-full h-[260px] sm:h-[290px] lg:h-[320px] rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={item.thumbnailUrl}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* ❤️ WISHLIST BUTTON */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // prevent navigation
                    toggleWishlist({
                      id: item.id,
                      title: item.name,
                      image: item.thumbnailUrl,
                      price: item.calculatedProductPrice?.price,
                    });
                  }}
                  className="absolute top-2 right-2 bg-white/80 p-1.5 rounded-full shadow"
                >
                  <Heart
                    className={`h-5 w-5 transition ${
                      isWishlisted
                        ? "fill-red-500 stroke-red-500"
                        : "stroke-gray-700"
                    }`}
                  />
                </button>
              </div>

              {/* CONTENT */}
              <div className="mt-3 flex flex-col">
                <p className="text-sm font-medium line-clamp-2 text-gray-800">
                  {item.name}
                </p>

                <div className="flex items-center gap-2 mt-2">
                  <span className="font-semibold text-gray-900">
                    ₹ {item.calculatedProductPrice.price}
                  </span>

                  {item.calculatedProductPrice.oldPrice && (
                    <span className="text-xs line-through text-gray-400">
                      ₹ {item.calculatedProductPrice.oldPrice}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
