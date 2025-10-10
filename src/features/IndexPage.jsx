import CarousalSection from "@/components/shared/CarousalSection";
import ContentWrapper from "@/components/shared/ContentWrapper";
import { dummyData } from "@/data/dummyData";
import { useProductQuery, useProductsQuery } from "@/hooks/useProductsQuery";

const IndexPage = () => {
  const dummyData1 = dummyData.slice(0, 8);
  const dummyData2 = dummyData.slice(8, 15);
  const dummyData3 = dummyData.slice(10);

  const { data, isLoading, error } = useProductsQuery();
  console.log(data, "data from index page");

  return (
    <ContentWrapper>
      <div className="pt-8 sm:pt-10 md:pt-10 lg:pt-60 flex flex-col gap-8">
        <CarousalSection
          title="Popular Pesticides for Crop Protection"
          places={dummyData1}
        />
        <CarousalSection
          title="Upcoming Pesticide Solutions for Next Season"
          places={dummyData2}
        />
        <CarousalSection
          title="Herbicides for Effective Weed Control"
          places={dummyData3}
        />
      </div>
    </ContentWrapper>
  );
};

export default IndexPage;
