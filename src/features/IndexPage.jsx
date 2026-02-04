import { useState } from "react";
import CarousalSection from "@/components/shared/CarousalSection";
import ContentWrapper from "@/components/shared/ContentWrapper";
import SearchBar from "@/components/shared/SearchBar";
import { useProductsQuery } from "@/hooks/useProductsQuery";
import { useWishlist } from "@/providers/WishListProvider";

const UserHome = () => {
  const [searchParams, setSearchParams] = useState({
    query: "",
    category: "",
  });

  // 🔹 Products API
  const { data, isLoading } = useProductsQuery({
    query: searchParams.query,
    category: searchParams.category,
    page: 1,
  });
  console.log(data, "this is the product data ");
  // 🔹 Wishlist from Context (SINGLE SOURCE OF TRUTH)
  const { toggleWishlist } = useWishlist();

  // 🔁 Toggle handler passed to cards
  const handleToggleWishlist = (product) => {
    toggleWishlist(product);
  };

  // 🔹 Normalize product data
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
    image: item.thumbnailImage?.fileName,
    discountPercent: item.calculatedProductPrice?.percentOfSaving ?? null,
  }));

  return (
    <ContentWrapper>
      <div className="responsive-padding flex justify-center">
        <SearchBar onChange={setSearchParams} />
      </div>

      <div className="pt-10 flex flex-col gap-6">
        <CarousalSection
          title="Popular Products"
          places={products.slice(0, 8)}
          loading={isLoading}
          onToggleWishlist={handleToggleWishlist}
        />

        <CarousalSection
          title="Trending This Season"
          places={products.slice(8, 16)}
          loading={isLoading}
          onToggleWishlist={handleToggleWishlist}
        />

        <CarousalSection
          title="Best Sellers"
          places={products.slice(16, 24)}
          loading={isLoading}
          onToggleWishlist={handleToggleWishlist}
        />

        <CarousalSection
          title="Recommended for You"
          places={products.slice(24, 32)}
          loading={isLoading}
          onToggleWishlist={handleToggleWishlist}
        />
      </div>
    </ContentWrapper>
  );
};

export default UserHome;
