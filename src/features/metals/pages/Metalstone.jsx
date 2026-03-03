// import React, { useState, useMemo } from "react";
// import { Link } from "react-router-dom";
// import ContentWrapper from "@/components/shared/ContentWrapper";
// import SecondarySearchBar from "@/components/shared/SecondarySearchBar";
// import { Heart, Star, IndianRupee } from "lucide-react";
// import { useWishlist } from "@/providers/WishListProvider";
// import { useProductsQuery } from "@/hooks/useProductsQuery";
// import StarRating from "@/components/ui/StarRating";

// export default function TextilesPage() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const { wishlist, toggleWishlist } = useWishlist();

//   // API call for products with query and category
//   const { data, isLoading } = useProductsQuery({
//     query: searchQuery,
//     category: "textiles",
//   });

//   // Map API data
//   const products = useMemo(() => {
//     return (data?.products || []).map((product) => ({
//       id: product.id,
//       title: product.name,
//       price: product.price,
//       inStock: product.stockQuantity > 0,
//       photos: [product.thumbnailUrl || product.image],
//       rating: product.ratingAverage || 0,
//       brand: product.brandName || "",
//     }));
//   }, [data?.products]);

//   return (
//     <ContentWrapper topSpacing>
//       <div className="min-h-screen text-[var(--color-black)]">
//         {/* Header */}
//         <div className="text-center mb-10">
//           <h2 className="text-3xl md:text-4xl font-bold mb-3">
//             Handicraft & Textile Collection
//           </h2>
//           <p className="text-sm md:text-base max-w-2xl mx-auto">
//             Explore authentic handcrafted products with traditional techniques,
//             premium materials, and timeless craftsmanship.
//           </p>
//         </div>

//         {/* Search */}
//         <section className="mb-8 flex  flex-col sm:flex-row gap-4 sm:items-center sm:justify-start">
//           <SecondarySearchBar
//             value={searchQuery}
//             onSearch={setSearchQuery}
//             className="w-full sm:w-72"
//           />
//         </section>

//         {/* Products Grid */}
//         <section className="my-10">
//           {isLoading ? (
//             <p className="text-center text-gray-500 mt-10">Loading products...</p>
//           ) : products.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
//               {products.map((product) => {
//                 // ✅ Use productId for wishlist check
//                 const isWishlisted = wishlist.some(
//                   (item) => item.productId === product.id
//                 );

//                 return (
//                   <div
//                     key={product.id}
//                     className="flex flex-col bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
//                   >
//                     {/* Product Image */}
//                     <div className="relative">
//                       <img
//                         src={product.photos?.[0]}
//                         alt={product.title}
//                         className="w-full h-56 object-cover transition-transform duration-500 hover:scale-105"
//                       />

//                       {/* Wishlist Heart */}
//                       <button
//                         type="button"
//                         onClick={(e) => {
//                           e.preventDefault();
//                           toggleWishlist(product);
//                         }}
//                         className="absolute top-2 right-2 rounded-full p-1 bg-white/70 backdrop-blur-sm shadow hover:scale-110 transition-transform"
//                       >
//                         <Heart
//                           className={`h-5 w-5 transition duration-300 ${
//                             isWishlisted
//                               ? "fill-red-500 stroke-red-500"
//                               : "stroke-gray-700 fill-none"
//                           }`}
//                         />
//                       </button>

//                       {/* Stock Badge */}
//                       {/* <span
//                         className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-medium text-white ${
//                           product.inStock ? "bg-green-500" : "bg-red-500"
//                         }`}
//                       >
//                         {product.inStock ? "In Stock" : "Out of Stock"}
//                       </span> */}
//                     </div>

//                     {/* Product Details */}
//                     <div className="flex flex-col flex-grow p-4">
//                       <h3 className="text-base font-semibold truncate">{product.title}</h3>
//                       <p className="text-sm text-gray-600 truncate">{product.brand}</p>

//                       {/* Price & Rating */}
//                       <div className="mt-2 flex items-center justify-between">
//                         <span className="flex items-center gap-1 font-medium">
//                           <IndianRupee className="h-4 w-4" />
//                           {product.price.toLocaleString()}
//                         </span>
//                         {/* <span className="flex items-center gap-1 text-yellow-500">
//                           {product.rating} <Star className="h-4 w-4" />
//                         </span> */}

//                                   <div className="mt-2 h-5 flex items-center">

//                                       <StarRating size={14} rating={product.rating} count={0} />
//                                   </div>
//                       </div>

//                       {/* View Details Button */}
//                       <Link
//                         to={`/place/${product.id}`}
//                         state={{ place: product }}
//                         className="mt-4 w-full py-2 px-4 bg-[var(--color-primary)] text-white font-medium rounded hover:bg-[var(--color-primary-hover)] text-center transition"
//                       >
//                         View Details
//                       </Link>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           ) : (
//             <p className="text-center text-gray-500 mt-10">No products found.</p>
//           )}
//         </section>
//       </div>
//     </ContentWrapper>
//   );
// }

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import ContentWrapper from "@/components/shared/ContentWrapper";
import SearchBar from "@/components/shared/SearchBar";
import { useProductsQuery } from "@/hooks/useProductsQuery";
import { useWishlist } from "@/providers/WishListProvider";
import AdvancedFilter from "@/components/shared/AdvancedFilter";
import PlaceCard from "@/features/places/components/PlaceCard";
import { ChevronDown, Loader2 } from "lucide-react";

const MetalsCraftPage = () => {
  const [searchParams, setSearchParams] = useState({
    query: "",
    category: "metals", // ✅ FIXED (slug)
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const observerTarget = useRef(null);
  const loadingRef = useRef(false);

  const [filters, setFilters] = useState({
    category: "metals", // ✅ FIXED
    brand: "",
    minPrice: 0,
    maxPrice: 100000,
  });

  const { toggleWishlist } = useWishlist();

  const { data, isLoading } = useProductsQuery({
    query: searchParams.query,
    category: filters.category,
    brand: filters.brand,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    sort: sortBy,
    page: currentPage,
  });

  const backendFilters = data?.filterOption;

  const products = useMemo(() => {
    return (data?.products || []).map((item) => ({
      id: item.id,
      slug: item.slug,
      title: item.name,
      category: item.category?.name ?? null,
      price: item.price,
      oldPrice: item.oldPrice,
      rating: item.ratingAverage ?? null,
      ratingCount: item.reviewsCount ?? 0,
      stock: item.stockQuantity ?? 0,
      image: item.thumbnailUrl,
      discountPercent: item.calculatedProductPrice?.percentOfSaving ?? null,
    }));
  }, [data?.products]);

  const totalPages = Math.ceil(
    (data?.totalProduct ?? 0) / (data?.currentSearchOption?.pageSize ?? 10),
  );

  useEffect(() => {
    setAllProducts([]);
    setCurrentPage(1);
    setHasMore(true);
    loadingRef.current = false;
    setIsLoadingMore(false);
  }, [
    searchParams.query,
    filters.category,
    filters.brand,
    filters.minPrice,
    filters.maxPrice,
    sortBy,
  ]);

  useEffect(() => {
    if (data?.products) {
      setAllProducts((prev) => {
        if (currentPage === 1) return products;
        const existingIds = new Set(prev.map((p) => p.id));
        const newProducts = products.filter((p) => !existingIds.has(p.id));
        return [...prev, ...newProducts];
      });

      setHasMore(currentPage < totalPages);
      loadingRef.current = false;
      setIsLoadingMore(false);
    }
  }, [data?.products, currentPage, totalPages, products]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasMore &&
          !loadingRef.current &&
          !isLoading
        ) {
          loadingRef.current = true;
          setIsLoadingMore(true);
          setCurrentPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1, rootMargin: "200px" },
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) observer.observe(currentTarget);

    return () => {
      if (currentTarget) observer.unobserve(currentTarget);
    };
  }, [hasMore, isLoading]);

  const handleFilterChange = useCallback((updatedFilters) => {
    setFilters((prev) => ({ ...prev, ...updatedFilters }));
  }, []);

  return (
    <ContentWrapper>
      <div className="responsive-padding -mt-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-4">
          <div className="hidden md:block md:w-1/4" />

          <div className="w-full md:w-1/2 flex justify-center">
            <div className="w-full max-w-xl">
              <SearchBar onChange={setSearchParams} showCategory />
            </div>
          </div>

          {/* ✅ FIXED (hidden on mobile) */}
          <div className="hidden md:flex md:w-1/4 md:justify-end">
            <div className="relative inline-block text-left">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-full px-6 py-2.5 pr-10 text-xs font-bold uppercase tracking-wider text-gray-700 outline-none focus:ring-2 focus:ring-black/5 transition-all cursor-pointer shadow-sm"
              >
                <option value="">Sort By: Default</option>
                <option value="price-asc">Sort By: Low to High</option>
                <option value="price-desc">Sort By: High to Low</option>
              </select>

              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                <ChevronDown size={14} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 pt-6">
        <aside className="hidden lg:block w-[240px] shrink-0">
          <AdvancedFilter
            selectedCategory={filters.category}
            availableBrands={backendFilters?.brands || []}
            availableCategories={backendFilters?.categories || []}
            priceLimits={{
              min: backendFilters?.price?.minPrice || 0,
              max: backendFilters?.price?.maxPrice || 100000,
            }}
            onChange={handleFilterChange}
            mobileOpen={mobileFilterOpen}
            setMobileOpen={setMobileFilterOpen}
          />
        </aside>

        <main className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {isLoading && currentPage === 1
              ? Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="h-64 bg-gray-50 animate-pulse rounded-xl"
                />
              ))
              : allProducts.map((product) => (
                  <PlaceCard
                    key={product.id}
                    place={product}
                    onToggleWishlist={() => toggleWishlist(product)}
                  />
                ))}
          </div>

          {hasMore && (
            <div
              ref={observerTarget}
              className="h-20 flex justify-center items-center"
            />
          )}

          {isLoadingMore && (
            <div className="flex justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
          )}
        </main>
      </div>
    </ContentWrapper>
  );
};

export default MetalsCraftPage;
