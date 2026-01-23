import { useState } from "react";
import ContentWrapper from "@/components/shared/ContentWrapper";
import SearchBar from "@/components/shared/SearchBar";
import { useProductsQuery } from "@/hooks/useProductsQuery";
import CarouselSection from "@/components/shared/CarousalSection";

const IndexPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading } = useProductsQuery({
    query: searchQuery,
    page: 1,
  });

  console.log("API response:", data);

  const handleSearchChange = ({ query }) => {
    setSearchQuery(query || "");
  };

  return (
    <ContentWrapper>
      <div className="responsive-padding flex flex-col gap-8">
        <div className="flex justify-center w-full">
          <SearchBar onChange={handleSearchChange} />
        </div>

        <CarouselSection
          title="Products"
          places={data?.products ?? []} // ✅ correct mapping
          loading={isLoading}
        />
      </div>
    </ContentWrapper>
  );
};

export default IndexPage;
