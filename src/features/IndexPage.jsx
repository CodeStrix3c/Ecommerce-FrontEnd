import CarousalSection from '@/components/shared/CarousalSection';
import { dummyData } from '@/data/dummyData';

const IndexPage = () => {
  return (
    <div className="mt-0 flex flex-col gap-8 sm:px-6 lg:mb-20 lg:mt-52 lg:px-8">
      <CarousalSection
        title="Popular Pesticides for Crop Protection"
        places={dummyData}
      />
      <CarousalSection
        title="Upcoming Pesticide Solutions for Next Season"
        places={dummyData}
      />
      <CarousalSection
        title="Herbicides for Effective Weed Control"
        places={dummyData}
      />
      <CarousalSection title="Eco-Friendly Bio-Pesticides" places={dummyData} />
      <CarousalSection
        title="Insecticides for Pest Management"
        places={dummyData}
      />
      <CarousalSection
        title="Fungicides to Safeguard Crops"
        places={dummyData}
      />
    </div>
  );
};

export default IndexPage;
