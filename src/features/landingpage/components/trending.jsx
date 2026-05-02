import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TrendingProducts = ({ data, isLoading }) => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = 400;
      current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="py-20 text-center text-stone-500 font-serif animate-pulse">
        Discovering Trending Pieces...
      </div>
    );
  }

  const products = data?.products || [];
  if (products.length === 0) return null;

  return (
    <section className="py-4 bg-white relative">
      {/* Header with Navigation Arrows */}
      <div className="mb-2 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="text-left">
          <h2 className="text-3xl md:text-4xl font-serif text-[var(--color-black)] mb-3">
            Trending Now
          </h2>
          <p className="text-[var(--color-black)] text-lg pb-10">
            The most coveted artisanal creations from the heart of the valley.
          </p>
        </div>

        {/* Navigation Arrows for Desktop */}
        <div className="hidden md:flex gap-3 mb-2">
          <button
            onClick={() => scroll("left")}
            className="p-3 rounded-full border border-stone-200 text-stone-600 hover:bg-[var(--color-primary)] hover:text-white transition-all shadow-sm"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-3 rounded-full border border-stone-200 text-stone-600 hover:bg-[var(--color-primary)] hover:text-white transition-all shadow-sm"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Horizontal Scrollable Container */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-8 pb-8 no-scrollbar scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((product) => (
          <div
            key={product.productId}
            onClick={() => navigate(`/place/${product.productId}`)}
            className="min-w-[280px] md:min-w-[320px] group cursor-pointer flex flex-col"
          >
            {/* Image Container with Trending Badge */}
            <div
              className="relative w-full overflow-hidden bg-stone-100 mb-4 rounded-sm"
              style={{ aspectRatio: "3/4" }}
            >
              <div className="absolute top-3 right-3 z-10 bg-[var(--color-black)] text-white text-[9px] font-bold px-2 py-1 uppercase tracking-[0.1em]">
                Trending
              </div>

              <img
                src={product.thumbnail}
                alt={product.productName}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {product.totalStock > 0 && product.totalStock < 10 && (
                <div className="absolute bottom-2 left-2 bg-white/90 px-2 py-1 text-[9px] uppercase tracking-tighter text-red-600 font-bold">
                  Only {product.totalStock} Left
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="flex flex-col flex-grow">
              <h3 className="text-xs md:text-sm font-medium text-stone-800 uppercase tracking-wide mb-2 line-clamp-1 group-hover:text-[var(--color-primary)] transition-colors duration-300">
                {product.productName}
              </h3>

              {/* <div className="mt-auto flex items-baseline gap-3">
                <span className="text-base md:text-lg font-bold text-[var(--color-primary)]">
                  ₹
                  {product.lowestPrice > 0
                    ? product.lowestPrice.toLocaleString()
                    : product.originalPrice.toLocaleString()}
                </span>
                {product.lowestPrice > 0 &&
                  product.lowestPrice < product.originalPrice && (
                    <span className="text-xs md:text-sm text-stone-400 line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingProducts;
