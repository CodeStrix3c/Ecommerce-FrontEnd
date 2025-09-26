import CarousalSection from "@/components/shared/CarousalSection";
import { dummyData } from "@/data/dummyData";

const IndexPage = () => {
  const dummyData1 = dummyData.slice(0, 8);
  const dummyData2 = dummyData.slice(8, 15);
  const dummyData3 = dummyData.slice(10);

  return (
    <div className="mt-0 flex flex-col gap-8 sm:px-6 lg:mb-20 lg:mt-52 lg:px-8 md:mt-52">
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
  );
};

export default IndexPage;
