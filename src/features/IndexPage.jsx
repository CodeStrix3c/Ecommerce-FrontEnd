import CarousalSection from "@/components/shared/CarousalSection";
import ContentWrapper from "@/components/shared/ContentWrapper";
// import products from "@/data/products.json";
import { useProductsQuery } from "@/hooks/useProductsQuery";

const IndexPage = () => {
  const requestBody = {
    pagination: {
      start: 0,
      totalItemCount: 100,
      number: 1,
      numberOfPages: 10,
    },
    search: {
      predicateObject: {
        additionalProp1: ["pesticide", "fertilizer"],
        additionalProp2: ["organic", "chemical"],
        additionalProp3: ["herbicide", "insecticide"],
      },
    },
    sort: {
      predicate: "name",
      reverse: false,
    },
  };
  const { data: products } = useProductsQuery();
  if (!products) return null;

  const products1 = products?.slice(0, 8);
  const products2 = products?.slice(8, 15);
  const products3 = products?.slice(15, 22);
  const products4 = products?.slice(22, 29);

  return (
    <ContentWrapper>
      <div className="responsive-padding flex flex-col gap-8 ">
        <CarousalSection
          title="Popular Pesticides for Crop Protection"
          places={products1}
        />
        <CarousalSection
          title="Upcoming Pesticide Solutions for Next Season"
          places={products2}
        />
        <CarousalSection
          title="Herbicides for Effective Weed Control"
          places={products3}
        />
        <CarousalSection
          title="Fungicides to Safeguard Your Crops"
          places={products4}
        />
      </div>
    </ContentWrapper>
  );
};

export default IndexPage;
