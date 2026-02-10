import { useState } from "react";
import ContentWrapper from "@/components/shared/ContentWrapper";
import SearchBar from "@/components/shared/SearchBar";
import { useProductsQuery } from "@/hooks/useProductsQuery";
import { useWishlist } from "@/providers/WishListProvider";
import Pagination from "@/supplier/components/paginationComponent";
import AdvancedFilter from "@/components/shared/AdvancedFilter";
import PlaceCard from "@/features/places/components/PlaceCard";
import { ChevronDown, Filter } from "lucide-react";

const UserHome = () => {
  const [searchParams, setSearchParams] = useState({ query: "", category: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const [filters, setFilters] = useState({
    category: "",
    brand: "",
    minPrice: 0,
    maxPrice: 100000,
  });

  // 🔹 Products API call with sorting and range
  const { data, isLoading } = useProductsQuery({
    query: searchParams.query,
    category: filters.category || searchParams.category,
    brand: filters.brand,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    sort: sortBy, // Added sort parameter
    page: currentPage,
  });

  const backendFilters = data?.filterOption;
  const { toggleWishlist } = useWishlist();

  const products = (data?.products || []).map((item) => ({
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

  const totalPages = Math.ceil(
    (data?.totalProduct ?? 0) / (data?.currentSearchOption?.pageSize ?? 10),
  );

  return (
    <ContentWrapper>
      {/* HEADER SECTION: SEARCH & SORT */}
      <div className="responsive-padding -mt-4">
        {/* Search Bar - Full Width on Mobile, Top */}
        <div className="w-full py-4">
          <SearchBar onChange={setSearchParams} showCategory />
        </div>

        {/* Sort & Filter Button Row - Mobile Only */}
        <div className="flex md:hidden items-center justify-between gap-3 pb-4">
          {/* SORT DROPDOWN */}
          <div className="relative flex-1">
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(1);
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

        {/* Sort Dropdown - Desktop Only */}
        <div className="hidden md:flex justify-end pb-4 relative">
          <div className="absolute -top-16 inline-block text-left">
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(1);
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

      <div className="flex flex-col lg:flex-row gap-8 pt-6">
        <aside className="hidden lg:block w-[260px] shrink-0">
          <div className="sticky top-20 h-[calc(100vh-6rem)] overflow-hidden">
            <AdvancedFilter
              availableBrands={backendFilters?.brands || []}
              availableCategories={backendFilters?.categories || []}
              priceLimits={{
                min: backendFilters?.price?.minPrice || 0,
                max: backendFilters?.price?.maxPrice || 100000,
              }}
              onChange={(updatedFilters) => {
                setFilters((prev) => ({ ...prev, ...updatedFilters }));
                setCurrentPage(1);
              }}
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
            onChange={(updatedFilters) => {
              setFilters((prev) => ({ ...prev, ...updatedFilters }));
              setCurrentPage(1);
            }}
            mobileOpen={mobileFilterOpen}
            setMobileOpen={setMobileFilterOpen}
          />
        </div>

        <main className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {isLoading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="h-64 bg-gray-50 animate-pulse rounded-xl"
                />
              ))
            ) : products.length > 0 ? (
              products.map((product) => (
                <PlaceCard
                  key={product.id}
                  place={product}
                  loading={isLoading}
                  onToggleWishlist={() => toggleWishlist(product)}
                />
              ))
            ) : (
              <div className="col-span-full py-20 text-center text-gray-400 text-sm italic font-medium">
                No products found matching your criteria.
              </div>
            )}
          </div>

          <div className="mt-12 flex justify-center items-center pb-10">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </main>
      </div>
    </ContentWrapper>
  );
};

export default UserHome;
