import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { useWishlist } from "@/providers/WishListProvider";

const IMAGE_BASE_URL =
  "https://zirat-adminapp-gfd0hmfwefc3gmgc.centralindia-01.azurewebsites.net";

export default function CrossSellProducts({ products = [] }) {
  const navigate = useNavigate();
  const { wishlist, toggleWishlist } = useWishlist();
  const scrollRef = useRef(null);

  if (!products.length) return null;

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    const amount = 300;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="mt-12">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl lg:text-2xl font-semibold">
          Frequently Bought Together
        </h2>

        {/* SCROLL ARROWS */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            className="p-2 rounded-full border border-[var(--color-gray)] hover:bg-[var(--color-black-hover)] transition"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-2 rounded-full border border-[var(--color-gray)] hover:bg-[var(--color-black-hover)] transition"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto no-scrollbar pb-2 scroll-smooth"
      >
        {products.map((item) => {
          const isWishlisted = wishlist.some((w) => w.productId === item.id);

          const img =
            item.thumbnailUrl ||
            (item.thumbnailImage?.fileName &&
              `https://ziraatblobstorage.blob.core.windows.net/ziraatblobcontainer/${item.thumbnailImage?.fileName}`) ||
            (item.images?.[0]?.url && `${IMAGE_BASE_URL}${item.images[0].url}`);

          return (
            <div
              key={item.id}
              onClick={() => navigate(`/place/${item.id}`)}
              className="w-[200px] sm:w-[230px] lg:w-[260px] flex-shrink-0 cursor-pointer group"
            >
              {/* IMAGE */}
              <div className="relative w-full h-[260px] sm:h-[290px] lg:h-[320px] rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={img}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* HEART / WISHLIST */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist({
                      id: item.id,
                      title: item.name,
                      image: img,
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
                    ₹ {item.calculatedProductPrice?.price}
                  </span>

                  {item.calculatedProductPrice?.oldPrice && (
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
