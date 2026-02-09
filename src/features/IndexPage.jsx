import { useState } from "react";
import CarousalSection from "@/components/shared/CarousalSection";
import ContentWrapper from "@/components/shared/ContentWrapper";
import SearchBar from "@/components/shared/SearchBar";
import { useProductsQuery } from "@/hooks/useProductsQuery";
import { useWishlist } from "@/providers/WishListProvider";
import Pagination from "@/supplier/components/paginationComponent";

// const IMAGE_BASE_URL =
//   "https://zirat-adminapp-gfd0hmfwefc3gmgc.centralindia-01.azurewebsites.net/";

const UserHome = () => {
  const [searchParams, setSearchParams] = useState({
    query: "",
    category: "",
  });
  // ✅ PAGE STATE (THIS WAS MISSING)
  const [currentPage, setCurrentPage] = useState(1);

  // 🔹 Products API (page 2)
  const { data, isLoading } = useProductsQuery({
    query: searchParams.query,
    category: searchParams.category,
    page: currentPage,
  });

  console.log(data, "this is product data");

  // 🔹 Wishlist from Context
  const { toggleWishlist } = useWishlist();

  const handleToggleWishlist = (product) => {
    toggleWishlist(product);
  };

  // 🔹 Normalize product data (✅ CORRECT IMAGE HANDLING)
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

    // ✅ thumbnailUrl FIX
    image: item.thumbnailUrl,
    // ? item.thumbnailUrl.startsWith("http")
    //   ? item.thumbnailUrl
    //   : `${IMAGE_BASE_URL}${item.thumbnailUrl}`
    // : null,
    discountPercent: item.calculatedProductPrice?.percentOfSaving ?? null,
  }));

  // ✅ TOTAL PAGES (CALCULATED, NOT FROM API)
  const totalProducts = data?.totalProduct ?? 0;
  const pageSize = data?.currentSearchOption?.pageSize ?? 10;
  const totalPages = Math.ceil(totalProducts / pageSize);

  return (
    <ContentWrapper>
      <div className="responsive-padding flex justify-center">
        <SearchBar onChange={setSearchParams} showCategory />
      </div>

      <div className="pt-10 flex flex-col gap-6">
        <CarousalSection
          title="Popular Products"
          places={products}
          loading={isLoading}
          onToggleWishlist={handleToggleWishlist}
        />

        <CarousalSection
          title="Trending This Season"
          places={products}
          loading={isLoading}
          onToggleWishlist={handleToggleWishlist}
        />

        <CarousalSection
          title="Best Sellers"
          places={products}
          loading={isLoading}
          onToggleWishlist={handleToggleWishlist}
        />

        <CarousalSection
          title="Recommended for You"
          places={products}
          loading={isLoading}
          onToggleWishlist={handleToggleWishlist}
        />
      </div>
      <div className="flex justify-center items-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </ContentWrapper>
  );
};

export default UserHome;
