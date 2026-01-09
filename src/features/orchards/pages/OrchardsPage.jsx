import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import ContentWrapper from "@/components/shared/ContentWrapper";
import SecondarySearchBar from "@/components/shared/SecondarySearchBar";
import FilterDropdown from "@/components/shared/FilterDropDown";
import { useOrchardsPageQuery } from "@/hooks/useOrchardsQuery";
import { Heart, Star, IndianRupee } from "lucide-react";
import { useWishlist } from "@/providers/WishListProvider";

export default function OrchardsPage() {
  const { data: orchards = [] } = useOrchardsPageQuery();
  const [query, setQuery] = useState("");
  const [filterType, setFilterType] = useState("All");
  const { wishlist, toggleWishlist } = useWishlist();
  console.log(query, "serach query");
  // Deduplicate categories for dropdown
  const orchardTypes = useMemo(() => {
    const types = Array.from(
      new Set(orchards.map((o) => o?.category).filter(Boolean))
    );
    return [
      { value: "All", label: "All" },
      ...types.map((t) => ({ value: t, label: t })),
    ];
  }, [orchards]);

  // Filter logic
  const filtered = useMemo(() => {
    return orchards.filter((o) => {
      const searchableText = [
        o?.title ?? "",
        o?.address ?? "",
        Array.isArray(o?.perks) ? o.perks.join(" ") : "",
      ]
        .join(" ")
        .toLowerCase();
      const matchesQuery = searchableText.includes(query.trim().toLowerCase());
      const matchesType =
        filterType === "All" ||
        !filterType ||
        (o?.category ?? "").toLowerCase() === filterType.toLowerCase();
      return matchesQuery && matchesType;
    });
  }, [orchards, query, filterType]);

  return (
    <ContentWrapper topSpacing>
      <div className="min-h-screen text-[var(--color-black)]">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Handicraft & Textile Collection
          </h2>
          <p className="text-sm md:text-base max-w-2xl mx-auto">
            Explore authentic handcrafted products with traditional techniques,
            premium materials, and timeless craftsmanship.
          </p>
        </div>

        {/* Filter + Search */}
        <section className="mb-8 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <FilterDropdown options={orchardTypes} onSelect={setFilterType} />
          <SecondarySearchBar
            value={query}
            onSearch={setQuery} // ✅ this updates value
            className="w-full sm:w-72"
          />
        </section>

        {/* Products Grid */}
        <section className="my-10">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
              {filtered.map((o) => {
                const isWishlisted = wishlist.some(
                  (item) => item._id === o._id
                );
                return (
                  <div
                    key={o._id}
                    className="flex flex-col bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
                  >
                    {/* Product Image */}
                    <div className="relative">
                      <img
                        src={o.photos?.[0]}
                        alt={o.title}
                        className="w-full h-56 object-cover transition-transform duration-500 hover:scale-105"
                      />

                      {/* Wishlist Heart */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleWishlist(o);
                        }}
                        className="absolute top-2 right-2 rounded-full p-1 bg-white/70 backdrop-blur-sm shadow hover:scale-110 transition-transform"
                      >
                        <Heart
                          className={`h-5 w-5 ${
                            isWishlisted
                              ? "fill-[var(--color-secondary)] stroke-white"
                              : "fill-none stroke-black"
                          }`}
                        />
                      </button>

                      {/* Stock Badge */}
                      <span
                        className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-medium text-white ${
                          o.inStock ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        {o.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col flex-grow p-4">
                      <h3 className="text-base font-semibold truncate">
                        {o.title}
                      </h3>
                      <p className="text-sm text-gray-600 truncate">
                        {o.address}
                      </p>

                      {/* Price & Rating */}
                      <div className="mt-2 flex items-center justify-between">
                        <span className="flex items-center gap-1 font-medium">
                          <IndianRupee className="h-4 w-4" />
                          {o.price.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1 text-yellow-500">
                          {o.rating} <Star className="h-4 w-4" />
                        </span>
                      </div>

                      {/* View Details Button */}
                      <Link
                        to={`/place/${o._id}`}
                        state={{ place: o }}
                        className="mt-4 w-full py-2 px-4 bg-[var(--color-primary)] text-white font-medium rounded hover:bg-[var(--color-primary-hover)] text-center transition"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-10">
              No products found matching your criteria.
            </p>
          )}
        </section>
      </div>
    </ContentWrapper>
  );
}
