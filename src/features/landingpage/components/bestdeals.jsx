import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BestDeals = ({ data, isLoading }) => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = 400; // Adjust based on card width
      current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (isLoading)
    return (
      <div className="py-10 text-center text-stone-500 font-serif">
        Curating Best Deals...
      </div>
    );
  if (!data?.deals || data.deals.length === 0) return null;

  return (
    <section className="pt-16 bg-white relative group">
      <div className="mb-2 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="text-left">
          <h2 className="text-3xl md:text-4xl font-serif text-[var(--color-black)] mb-2">
            Timeless Treasures
          </h2>
          <p className=" text-[var(--color-black)] text-lg pb-10">
            Exquisite hand-crafted pieces at exceptional value.
          </p>
        </div>

        {/* Navigation Arrows for Desktop */}
        <div className="hidden md:flex gap-3">
          <button
            onClick={() => scroll("left")}
            className="p-3 rounded-full border border-stone-200 text-stone-600 hover:bg-[var(--color-primary)] hover:text-white transition-all"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-3 rounded-full border border-stone-200 text-stone-600 hover:bg-[var(--color-primary)] hover:text-white transition-all"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-8 pb-8 no-scrollbar scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {data.deals.map((item) => (
          <div
            key={item.vendorProductId}
            onClick={() => navigate(`/place/${item.productId}`)}
            className="min-w-[280px] md:min-w-[320px] group cursor-pointer"
          >
            {/* Image Container */}
            <div className="relative h-[400px] overflow-hidden bg-stone-100 mb-4">
              <div className="absolute top-3 right-3 z-10 bg-[var(--color-secondary)] text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
                {Math.round(item.savingsPercentage)}% Off
              </div>
              <img
                src={`https://placehold.co/600x800?text=${encodeURIComponent(item.productName)}`}
                alt={item.productName}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Product Info */}
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-stone-800 uppercase tracking-tight transition-colors group-hover:text-[var(--color-primary)] line-clamp-1">
                {item.productName}
              </h3>
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-[var(--color-primary)]">
                  ₹{item.discountedPrice.toLocaleString()}
                </span>
                <span className="text-sm text-stone-400 line-through">
                  ₹{item.originalPrice.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestDeals;
