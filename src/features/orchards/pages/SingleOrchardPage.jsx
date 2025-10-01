import MapBox from "@/components/ui/MapBox";
import React from "react";
import { MapPin } from "lucide-react";

const SingleOrchardPage = () => {
  const orchardCards = [
    { img: "https://images.pexels.com/photos/34013404/pexels-photo-34013404.jpeg" },
    { img: "https://images.pexels.com/photos/574919/pexels-photo-574919.jpeg" },
    { img: "https://images.pexels.com/photos/18510468/pexels-photo-18510468.jpeg" },
    { img: "https://images.pexels.com/photos/5529521/pexels-photo-5529521.jpeg" },
  ];

  return (
    <div className="lg:mt-20 sm:mt-[-6px] w-full min-h-screen bg-white flex flex-col items-center">
      
     
      <div className="w-full max-w-6xl px-3 sm:px-4 lg:px-0 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 mt-10">
        {orchardCards.map((card, index) => (
          <Card key={index} img={card.img} />
        ))}
      </div>

     
      <Section title="Orchard Information">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Info label="Name" value="Apple Orchard" />
          <Info label="Location" value="Pulwama, Kashmir" />
          <Info label="Crop Type" value="Fruit" />
          <Info label="Cultivated Area" value="15 acres" />
          <Info label="Irrigation Method" value="Drip Irrigation" />
          <Info label="Year of Establishment" value="2003" />
          <Info label="Owner" value="Mr. Ahmad" />
          <Info label="Annual Yield" value="25 tons" />
        </div>
      </Section>

      
      <Section title="Additional Details">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Info label="Climate" value="Cool temperate with snowy winters" />
          <Info label="Soil Type" value="Loamy soil, rich in organic matter" />
          <Info label="Harvesting Season" value="September – October" />
          <Info label="Fertilization" value="Organic compost and bio-fertilizers" />
          <Info label="Workforce" value="20 seasonal workers" />
          <Info label="Market Distribution" value="Local mandis & export hubs" />
          <Info label="Sustainability" value="Rainwater harvesting, eco-friendly practices" />
          <Info label="Tourism" value="Orchard tours available for visitors" />
        </div>
      </Section>

 <Section title="Crop Varieties">
  <div className="relative group">

    <img
      src="https://images.pexels.com/photos/8416546/pexels-photo-8416546.jpeg"
      alt="Crop Varieties"
      className="hidden md:block absolute top-0 right-0 w-80 h-60 object-cover rounded-lg opacity-80 transform transition-transform duration-500 group-hover:scale-105"
    />
    <div className=" md:block absolute top-0 right-0 w-80 h-60 rounded-lg  bg-opacity-15 flex items-center justify-center text-[var(--color-black)] text-xl font-semibold ">
     
    </div>

 
    <ul className="list-disc pl-5 text-[var(--color-black)] space-y-1 relative z-10">
      <li>Red Delicious</li>
      <li>Golden Delicious</li>
      <li>Granny Smith</li>
      <li>Kashmiri Ambri</li>
      <li>Honeycrisp (trial cultivation)</li>
    </ul>
  </div>
</Section>

<Section title="Farming Practices">
  <div className="relative group">
    <img
      src="https://media.istockphoto.com/id/945577530/photo/hands-of-african-rural-farmer-with-farming-tool-plowing-land.jpg?s=612x612&w=0&k=20&c=gAC4Fpqx3lQb1XNlBWlpToFou8zRgMYakwFDgKV23H4="
      alt="Farming Practices"
      className="hidden md:block absolute top-0 right-0 w-80 h-64 object-cover rounded-lg opacity-80 transform transition-transform duration-500 group-hover:scale-105"
    />
    <div className="md:block absolute top-0 right-0 w-80 h-64 rounded-lg  bg-opacity-15 flex items-center justify-center text-[var(--color-black)] text-xl font-semibold  ">

  
    </div>

    <ul className="list-disc pl-5 text-[var(--color-black)] space-y-1 relative z-10">
      <li>Regular pruning for tree health</li>
      <li>Integrated Pest Management (IPM)</li>
      <li>Use of organic fertilizers & vermicompost</li>
      <li>Adoption of modern cold-storage techniques</li>
    </ul>
  </div>
</Section>



     
      {/* <Section title="Awards & Recognitions">
        <div className="space-y-2">
          <p> State Horticulture Excellence Award – 2018</p>
        
        </div>
      </Section> */}

     
      <Section title="Visitor Information" >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Info label="Visiting Hours" value="9:00 AM – 6:00 PM" />
          <Info label="Entry Fee" value="₹100 per person" />
          <Info label="Activities" value="Guided tours, fruit picking, farm stay" />
          <Info label="Contact" value="+91 976578900000" />
        </div>
      </Section>

    
      <div className="w-full max-w-6xl px-3 sm:px-4 lg:px-0 mt-8">
        <h3 className="font-bold text-lg sm:text-xl text-[var(--color-black)]">Description</h3>
        <hr className="my-2 border-white" />
        <p className="text-justify leading-relaxed text-sm sm:text-base text-[var(--color-black)]">
          This orchard is one of the most productive apple-growing regions in Kashmir.
          Established over two decades ago, it combines traditional farming wisdom 
          with modern horticultural techniques. The orchard is known for producing 
          high-quality apples that are distributed both locally and to national markets. 
          With its carefully managed irrigation system and sustainable practices, 
          it has become a model farm for nearby growers.
        </p>
      </div>

    
      <div className="w-full max-w-6xl px-3 sm:px-4 lg:px-0 mt-8">
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="text-[var(--color-secondary)] w-6 h-6" />
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-black)]">Location</h2>
        </div>
        <div className="rounded-xl overflow-hidden ">
          <MapBox address={"srinagar"} />
        </div>
      </div>
    </div>
  );
};

const Card = ({ img }) => (
  <div className="w-full aspect-[4/3] sm:aspect-[3/2] rounded-xl overflow-hidden ">
    <img
      src={img}
      alt="orchard"
      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
    />
  </div>
);

const Info = ({ label, value }) => (
  <div>
    <span className="font-semibold text-[var(--color-black)]">{label}:</span>{" "}
    <span className="text-[var(--color-black)]">{value}</span>
  </div>
);

const Section = ({ title, icon, children }) => (
  <div className="w-full max-w-6xl px-3 sm:px-4 lg:px-0 bg-white rounded-xl  p-5 sm:p-8 mt-8 space-y-6">
    <div className="flex items-center gap-2">
      {icon}
      <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-black)]">{title}</h2>
    </div>
    {children}
  </div>
);

export default SingleOrchardPage;
