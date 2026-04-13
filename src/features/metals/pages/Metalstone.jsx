import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ContentWrapper from "@/components/shared/ContentWrapper";
import SearchBar from "@/components/shared/SearchBar";
import { useProductsQuery } from "@/hooks/useProductsQuery";
import { useWishlist } from "@/providers/WishListProvider";
import AdvancedFilter from "@/components/shared/AdvancedFilter";
import PlaceCard from "@/features/places/components/PlaceCard";
import { ChevronDown, Loader2 } from "lucide-react";
import ProductSkeleton from "@/components/ui/ProductSkelton";

const MetalsCraftPage = () => {
  const CATEGORY = "metals";

  const [urlParams] = useSearchParams();
  const categoryFromUrl = urlParams.get("category") || CATEGORY;

  const [searchParams, setSearchParams] = useState({
    query: "",
  });

  const [filters, setFilters] = useState({
    category: categoryFromUrl,
    brand: "",
    minPrice: 0,
    maxPrice: 100000,

    // ⭐ NEW — RATING FILTER
    selectedRating: 0,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const [allProducts, setAllProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const observerTarget = useRef(null);
  const loadingRef = useRef(false);

  const { toggleWishlist } = useWishlist();

  /* ----------------------------  
        SYNC CATEGORY FROM URL  
     ---------------------------- */
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      category: categoryFromUrl,
    }));
  }, [categoryFromUrl]);

  const { data, isLoading } = useProductsQuery({
    query: searchParams.query,
    category: !filters.brand ? filters.category : undefined,
    brand: filters.brand || undefined,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    sort: sortBy,
    page: currentPage,
  });

  const backendFilters = data?.filterOption;

  /* ----------------------------  
        FORMAT PRODUCTS  
     ---------------------------- */
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

  /* ----------------------------  
        ⭐ RATING FILTER APPLIED  
     ---------------------------- */
  const filteredProducts = useMemo(() => {
    let list = products;

    if (filters.selectedRating > 0) {
      list = list.filter(
        (p) => Math.floor(p.rating || 0) >= filters.selectedRating,
      );
    }

    return list;
  }, [products, filters.selectedRating]);

  const totalPages = Math.ceil(
    (data?.totalProduct ?? 0) / (data?.currentSearchOption?.pageSize ?? 10),
  );

  /* ----------------------------  
        RESET + CLEAR LIST ON FILTER CHANGE  
     ---------------------------- */
  useEffect(() => {
    setAllProducts([]);
    setCurrentPage(1);
    setHasMore(true);
    loadingRef.current = false;
    setIsLoadingMore(false);
  }, [
    searchParams.query,
    filters.brand,
    filters.minPrice,
    filters.maxPrice,
    filters.category,
    filters.selectedRating, // ⭐ Reset on rating change
    sortBy,
  ]);

  /* ----------------------------  
        APPEND FILTERED PRODUCTS  
     ---------------------------- */
  useEffect(() => {
    if (!filteredProducts) return;

    setAllProducts((prev) => {
      if (currentPage === 1) return filteredProducts;

      const existingIds = new Set(prev.map((p) => p.id));
      const newOnes = filteredProducts.filter((p) => !existingIds.has(p.id));

      return [...prev, ...newOnes];
    });

    setHasMore(currentPage < totalPages);
    loadingRef.current = false;
    setIsLoadingMore(false);
  }, [filteredProducts, currentPage, totalPages]);

  /* ----------------------------  
        INFINITE SCROLL  
     ---------------------------- */
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

    const target = observerTarget.current;
    if (target) observer.observe(target);

    return () => target && observer.unobserve(target);
  }, [hasMore, isLoading]);

  /* ----------------------------  
        FILTER CHANGE HANDLER  
     ---------------------------- */
  const handleFilterChange = useCallback((updatedFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...updatedFilters,
    }));
  }, []);

  /* ----------------------------  
        ⭐ RATING CHANGE HANDLER  
     ---------------------------- */
  const handleRatingChange = (rating) => {
    setFilters((prev) => ({
      ...prev,
      selectedRating: rating,
    }));
  };

  return (
    <ContentWrapper>
      <div className="responsive-padding -mt-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4 py-4">
          <div className="flex-1">
            <p className="text-sm uppercase tracking-widest text-gray-400 mb-1">
              Discover
            </p>
            <h2 className="text-lg md:text-xl font-bold text-gray-900">
              The Best Products
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Crafted by Kashmir's finest artisans
            </p>
          </div>

          <div className="flex-1 flex justify-center">
            <div className="w-full max-w-xl">
              <SearchBar onChange={setSearchParams} showCategory />
            </div>
          </div>

          <div className="flex-1 flex justify-end">
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
          <div className="sticky top-20 h-[calc(100vh-6rem)] overflow-hidden">
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
              // ⭐ Pass rating props
              selectedRating={filters.selectedRating}
              onRatingChange={handleRatingChange}
            />
          </div>
        </aside>

        <main className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {isLoading && currentPage === 1
              ? Array.from({ length: 8 }).map((_, i) => (
                  <ProductSkeleton key={i} />
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
                    <div className="col-span-full py-20 text-center text-gray-700 text-sm  font-medium">
                      No product found...
                    </div>
                  )}
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
