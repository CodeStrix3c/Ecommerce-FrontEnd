import { useState, useMemo } from "react";

import CarousalSection from "@/components/shared/CarousalSection";
import ContentWrapper from "@/components/shared/ContentWrapper";
import { useProductsQuery } from "@/hooks/useProductsQuery";
import SearchBar from "@/components/shared/SearchBar";

const IndexPage = () => {
  const { data, isLoading } = useProductsQuery();

  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");

  const handleSearchChange = ({ query, category }) => {
    setSearchQuery(query || "");
    setCategory(category || "");
  };

  const filteredProducts = useMemo(() => {
    if (!data) return [];

    const query = searchQuery.toLowerCase();
    const categoryFilter = category.toLowerCase();

    return data.filter((product) => {
      // Check if product matches search query
      const matchesQuery =
        !query ||
        product.title?.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query);

      // Check if product matches selected category
      const matchesCategory =
        !categoryFilter || product.category?.toLowerCase() === categoryFilter;

      return matchesQuery && matchesCategory;
    });
  }, [data, searchQuery, category]);

  const products4 = filteredProducts.slice(0, 8);
  const products2 = filteredProducts.slice(8, 15);
  const products3 = filteredProducts.slice(15, 22);
  const products1 = filteredProducts.slice(22, 29);

  return (
    <ContentWrapper>
      <div className="responsive-padding flex flex-col gap-8">
        <div className="flex justify-center w-full">
          <SearchBar onChange={handleSearchChange} />
        </div>

        {products1.length > 0 && (
          <CarousalSection
            title="Popular Art & Craft Creations"
            places={products1}
            loading={isLoading}
          />
        )}

        {products2.length > 0 && (
          <CarousalSection
            title="New & Trending Handcrafted Pieces"
            places={products2}
            loading={isLoading}
          />
        )}

        {products3.length > 0 && (
          <CarousalSection
            title="Traditional & Artisan-Made Crafts"
            places={products3}
            loading={isLoading}
          />
        )}

        {products4.length > 0 && (
          <CarousalSection
            title="Handcrafted Home & Decor Essentials"
            places={products4}
            loading={isLoading}
          />
        )}

        {/* Optional: show a message if no products found */}
        {filteredProducts.length === 0 && !isLoading && (
          <div className="text-center text-gray-500 mt-8">
            No products found for your search.
          </div>
        )}
      </div>
    </ContentWrapper>
  );
};

export default IndexPage;
