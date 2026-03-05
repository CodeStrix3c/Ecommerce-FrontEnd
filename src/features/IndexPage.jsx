import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import ContentWrapper from "@/components/shared/ContentWrapper";
import SearchBar from "@/components/shared/SearchBar";
import { useProductsQuery } from "@/hooks/useProductsQuery";
import { useWishlist } from "@/providers/WishListProvider";
import AdvancedFilter from "@/components/shared/AdvancedFilter";
import PlaceCard from "@/features/places/components/PlaceCard";
import { ChevronDown, Filter, Loader2 } from "lucide-react";

const UserHome = () => {
  const [searchParams, setSearchParams] = useState({ query: "", category: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const observerTarget = useRef(null);
  const loadingRef = useRef(false);

  const [filters, setFilters] = useState({
    category: "",
    brand: "",
    minPrice: 0,
    maxPrice: 100000,
  });

  // 🔹 Products API call with sorting and range
  const { data, isLoading, isFetching } = useProductsQuery({
    query: searchParams.query,
    category: filters.category || searchParams.category,
    brand: filters.brand,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    sort: sortBy,
    page: currentPage,
  });

  const backendFilters = data?.filterOption;
  const { toggleWishlist } = useWishlist();

  // Transform products from API
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

  // Reset products when filters change
  useEffect(() => {
    setAllProducts([]);
    setCurrentPage(1);
    setHasMore(true);
    loadingRef.current = false;
    setIsLoadingMore(false);
  }, [
    searchParams.query,
    searchParams.category,
    filters.category,
    filters.brand,
    filters.minPrice,
    filters.maxPrice,
    sortBy,
  ]);

  // Append new products when data changes
  useEffect(() => {
    if (data?.products && products.length > 0) {
      setAllProducts((prev) => {
        // If it's page 1, replace all products
        if (currentPage === 1) {
          loadingRef.current = false;
          setIsLoadingMore(false);
          return products;
        }
        // Otherwise, append new products (avoid duplicates)
        const existingIds = new Set(prev.map((p) => p.id));
        const newProducts = products.filter((p) => !existingIds.has(p.id));
        loadingRef.current = false;
        setIsLoadingMore(false);
        return [...prev, ...newProducts];
      });

      // Check if there are more pages
      setHasMore(currentPage < totalPages);
    } else if (data?.products && products.length === 0 && currentPage > 1) {
      // No more products available
      setHasMore(false);
      loadingRef.current = false;
      setIsLoadingMore(false);
    }
  }, [data?.products, currentPage, totalPages, products]);

  // Infinite scroll observer with earlier trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasMore &&
          !loadingRef.current &&
          !isLoading &&
          allProducts.length > 0
        ) {
          loadingRef.current = true;
          setIsLoadingMore(true);
          setCurrentPage((prev) => prev + 1);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "200px", // Start loading 200px before reaching the target
      },
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, isLoading, allProducts.length]);

  // Handle filter changes
  const handleFilterChange = useCallback((updatedFilters) => {
    setFilters((prev) => ({ ...prev, ...updatedFilters }));
  }, []);

  return (
    <ContentWrapper>
      {/* HEADER SECTION: SEARCH & SORT */}
      <div className="responsive-padding -mt-4">
        {/* Search Bar & Sort - Same Row on Desktop/Tablet, Stacked on Mobile */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-4">
          {/* Left spacer (keeps search centered when filter exists) */}
          {/* <div className="hidden md:block md:w-1/6" /> */}
          <div className=" text-black text-md italic font-semibold tracking-wide">
            Find  here for the best products from Kashmir's
            finest artisans.

          </div>


          {/* Center Search Bar */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="w-full max-w-xl">
              <SearchBar onChange={setSearchParams} showCategory />
            </div>
          </div>

          {/* Sort Dropdown - Right Side */}
          <div className="hidden md:flex md:w-1/4 md:justify-end">
            <div className="relative inline-block text-left">
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                }}
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

        {/* Sort & Filter Button Row - Mobile Only */}
        <div className="flex md:hidden items-center justify-between gap-3 pb-4">
          {/* SORT DROPDOWN */}
          <div className="relative flex-1">
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
              }}
              className="w-full appearance-none bg-white border border-gray-200 rounded-full px-5 py-2.5 pr-10 text-xs font-bold uppercase tracking-wider text-gray-700 outline-none focus:ring-2 focus:ring-black/5 transition-all cursor-pointer shadow-sm"
            >
              <option value="">Sort By: Default</option>
              <option value="price-asc">Sort By: Low to High</option>
              <option value="price-desc">Sort By: High to Low</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
              <ChevronDown size={14} />
            </div>
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="bg-black text-white px-5 py-2.5 rounded-full shadow-sm flex items-center gap-2"
          >
            <Filter size={16} />
            <span className="text-xs font-bold uppercase tracking-wider">
              Filter
            </span>
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 pt-6">
        <aside className="hidden lg:block w-[240px] shrink-0">
          <div className="sticky top-20 h-[calc(100vh-6rem)] overflow-hidden">
            <AdvancedFilter
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
          </div>
        </aside>

        {/* Mobile Filter */}
        <div className="lg:hidden">
          <AdvancedFilter
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
        </div>

        <main className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Initial Loading State */}
            {isLoading && currentPage === 1
              ? Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-64 bg-gray-50 animate-pulse rounded-xl"
                  />
                ))
              : allProducts.length > 0
                ? allProducts.map((product) => (
                    <PlaceCard
                      key={product.id}
                      place={product}
                      loading={false}
                      onToggleWishlist={() => toggleWishlist(product)}
                    />
                  ))
                : !isLoading && (
                    <div className="col-span-full py-20 text-center text-gray-400 text-sm italic font-medium">
                      No products found matching your criteria.
                    </div>
                  )}
          </div>

          {/* Loading More Skeleton Cards */}
          {isLoadingMore && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={`skeleton-${i}`}
                  className="h-64 bg-gray-50 animate-pulse rounded-xl"
                />
              ))}
            </div>
          )}

          {/* Infinite Scroll Trigger Point */}
          {hasMore && allProducts.length > 0 && !isLoadingMore && (
            <div
              ref={observerTarget}
              className="h-20 flex justify-center items-center"
            >
              {/* Invisible trigger point */}
            </div>
          )}

          {/* Infinite Scroll Loader - Only show if actively fetching */}
          {isLoadingMore && (
            <div className="flex justify-center items-center py-8">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                <p className="text-sm text-gray-400 font-medium">
                  Loading more products...
                </p>
              </div>
            </div>
          )}

          {/* End of Results */}
          {!hasMore && allProducts.length > 0 && (
            <div className="flex justify-center items-center py-12">
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-0.5 bg-gray-200 rounded-full"></div>
                <p className="text-sm text-gray-400 font-medium">
                  You've reached the end
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </ContentWrapper>
  );
};

export default UserHome;
