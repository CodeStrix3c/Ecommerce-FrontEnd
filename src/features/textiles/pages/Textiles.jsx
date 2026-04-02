import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ContentWrapper from "@/components/shared/ContentWrapper";
import SearchBar from "@/components/shared/SearchBar";
import { useProductsQuery } from "@/hooks/useProductsQuery";
import { useWishlist } from "@/providers/WishListProvider";
import AdvancedFilter from "@/components/shared/AdvancedFilter";
import PlaceCard from "@/features/places/components/PlaceCard";
import { ChevronDown, Filter, Loader2 } from "lucide-react";
import ProductSkeleton from "@/components/ui/ProductSkelton";

const TextilesPage = () => {
  const CATEGORY = "textiles";

  const [urlParams] = useSearchParams();
  const categoryFromUrl = urlParams.get("category") || CATEGORY;

  const [searchParams, setSearchParams] = useState({
    query: "",
    category: "",
  });

  const [filters, setFilters] = useState({
    category: categoryFromUrl,
    brand: "",
    minPrice: 0,
    maxPrice: 100000,
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

  // LOAD FILTERS FROM URL
  useEffect(() => {
    const category = urlParams.get("category") || CATEGORY;
    const brand = urlParams.get("brand") || "";
    const minPrice = Number(urlParams.get("minPrice")) || 0;
    const maxPrice = Number(urlParams.get("maxPrice")) || 100000;

    setFilters((prev) => ({
      ...prev,
      category,
      brand,
      minPrice,
      maxPrice,
    }));
  }, [urlParams]);

  // API FETCH
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

  // PARSE & FILTER PRODUCTS (includes rating filter)
  const products = useMemo(() => {
    return (data?.products || [])
      .map((item) => ({
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
      }))
      .filter((item) => {
        if (filters.selectedRating === 0) return true;
        if (item.rating === null) return false;
        return item.rating >= filters.selectedRating;
      });
  }, [data?.products, filters.selectedRating]);

  const totalPages = Math.ceil(
    (data?.totalProduct ?? 0) / (data?.currentSearchOption?.pageSize ?? 10),
  );

  // RESET PRODUCTS WHEN FILTERS CHANGE
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
    filters.selectedRating,
    sortBy,
  ]);

  // APPEND NEW PAGE PRODUCTS
  useEffect(() => {
    if (data?.products && products.length > 0) {
      setAllProducts((prev) => {
        if (currentPage === 1) {
          loadingRef.current = false;
          setIsLoadingMore(false);
          return products;
        }

        const existingIds = new Set(prev.map((p) => p.id));
        const newProducts = products.filter((p) => !existingIds.has(p.id));

        loadingRef.current = false;
        setIsLoadingMore(false);

        return [...prev, ...newProducts];
      });

      setHasMore(currentPage < totalPages);
    } else if (data?.products && products.length === 0 && currentPage > 1) {
      setHasMore(false);
      loadingRef.current = false;
      setIsLoadingMore(false);
    }
  }, [data?.products, currentPage, totalPages, products]);

  // INFINITE SCROLL
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
      { threshold: 0.1, rootMargin: "200px" },
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) observer.observe(currentTarget);
    return () => {
      if (currentTarget) observer.unobserve(currentTarget);
    };
  }, [hasMore, isLoading, allProducts.length]);

  // FILTER CHANGES
  const handleFilterChange = useCallback((updatedFilters) => {
    setFilters((prev) => ({ ...prev, ...updatedFilters }));
  }, []);

  const handleRatingChange = useCallback((rating) => {
    setFilters((prev) => ({ ...prev, selectedRating: rating }));
  }, []);

  // SHARED FILTER PROPS (same as UserHome)
  const sharedFilterProps = {
    availableBrands: backendFilters?.brands || [],
    availableCategories: backendFilters?.categories || [],
    priceLimits: {
      min: backendFilters?.price?.minPrice || 0,
      max: backendFilters?.price?.maxPrice || 100000,
    },
    onChange: handleFilterChange,
    mobileOpen: mobileFilterOpen,
    setMobileOpen: setMobileFilterOpen,
    selectedRating: filters.selectedRating,
    onRatingChange: handleRatingChange,
  };

  return (
    <ContentWrapper>
      {/* HEADER */}
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

          {/* SORT desktop */}
          <div className="flex-1 flex justify-end">
            <div className="relative inline-block text-left">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-full px-6 py-2.5 pr-10 text-xs font-bold uppercase tracking-wider text-gray-700 outline-none"
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

        {/* MOBILE FILTER */}
        <div className="flex md:hidden items-center justify-between gap-3 pb-4">
          <div className="relative flex-1">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-200 rounded-full px-5 py-2.5 pr-10 text-xs font-bold uppercase tracking-wider text-gray-700 outline-none"
            >
              <option value="">Sort By: Default</option>
              <option value="price-asc">Sort By: Low to High</option>
              <option value="price-desc">Sort By: High to Low</option>
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
              <ChevronDown size={14} />
            </div>
          </div>

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

      {/* PAGE */}
      <div className="flex flex-col lg:flex-row gap-8 pt-6">
        {/* DESKTOP FILTER */}
        <aside className="hidden lg:block w-[240px] shrink-0">
          <div className="sticky top-20 h-[calc(100vh-6rem)] overflow-hidden">
            <AdvancedFilter {...sharedFilterProps} />
          </div>
        </aside>

        {/* MOBILE FILTER */}
        <div className="lg:hidden">
          <AdvancedFilter {...sharedFilterProps} />
        </div>

        {/* PRODUCTS */}
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
                    <div className="col-span-full py-20 text-center text-gray-400 text-sm italic font-medium">
                      No product found...
                    </div>
                  )}
          </div>

          {/* INFINITE SCROLL LOADING */}
          {isLoadingMore && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          )}

          {/* OBSERVER TARGET */}
          {hasMore && allProducts.length > 0 && !isLoadingMore && (
            <div
              ref={observerTarget}
              className="h-20 flex justify-center items-center"
            />
          )}

          {/* END MESSAGE */}
          {!hasMore && allProducts.length > 0 && (
            <div className="flex justify-center items-center py-12">
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-0.5 bg-gray-200 rounded-full" />
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

export default TextilesPage;
