import React from "react";
import { MapPin, Leaf, TreePine, CalendarDays, User2, Droplet } from "lucide-react";
import { Landscape } from "@mui/icons-material";
import ContentWrapper from "@/components/shared/ContentWrapper";
import MapBox from "@/components/ui/MapBox";
import useIsMobile from "@/hooks/useInMobile";

const SingleOrchardDetails = () => {
  const isMobile = useIsMobile();

  const orchardCards = [
    { img: "https://images.pexels.com/photos/574919/pexels-photo-574919.jpeg" },
    { img: "https://images.pexels.com/photos/18510468/pexels-photo-18510468.jpeg" },
  ];

  return (
    <ContentWrapper topSpacing compactScreen>
      <div className="w-full min-h-screen bg-[var(--color-white)] flex flex-col items-center gap-12 ">
        
     
        <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-10">
          
       
          <div className="flex-1 grid grid-cols-2 gap-3 sm:gap-4">
            {orchardCards.map((card, idx) => (
              <div
                key={idx}
                className="relative overflow-hidden rounded-xl "
              >
                <img
                  src={card.img}
                  alt={`Orchard ${idx + 1}`}
                  className="w-full aspect-[4/3] object-cover object-center "
                />
              </div>
            ))}
          </div>

          {/* Right: Orchard Info */}
          <div className="flex-1 flex flex-col justify-center gap-6">
            <h1 className="text-xl sm:text-2xl lg:text-2xl font-bold  leading-snug">
              Apple Orchard
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              <Info icon={<MapPin />} label="Location" value="Pulwama, Kashmir" />
              <Info icon={<Leaf />} label="Crop Type" value="Fruit" />
              <Info icon={<Landscape />} label="Cultivated Area" value="15 acres" />
              <Info icon={<Droplet />} label="Irrigation" value="Drip Irrigation" />
              <Info icon={<CalendarDays />} label="Established" value="2003" />
              <Info icon={<User2 />} label="Owner" value="Mr. Ahmad" />
              <Info icon={<TreePine />} label="Annual Yield" value="25 tons" />
            </div>
          </div>
        </div>

        
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 ">
          <Section title="Crop Varieties">
            <ul className="list-disc space-y-2 text-[var(--color-black)] text-sm sm:text-base">
              <li>Red Delicious</li>
              <li>Golden Delicious</li>
              <li>Granny Smith</li>
              <li>Kashmiri Ambri</li>
              <li>Honeycrisp (trial cultivation)</li>
            </ul>
          </Section>

         <Section title="Visitor Information">
  <div className="grid grid-cols-1 sm:grid-cols-2 ">
    {/* Left Column */}
    <div className="flex flex-col ">
      <div className="flex items-start gap-3 rounded-xl p-4 ">
        
        <div>
          <p className="font-semibold text-[var(--color-black)] text-sm sm:text-base">
            Visiting Hours
          </p>
          <p className="opacity-80 text-xs sm:text-sm">9:00 AM – 6:00 PM</p>
        </div>
      </div>

      <div className="flex items-start gap-3 rounded-xl p-4 ">
       
        <div>
          <p className="font-semibold text-[var(--color-black)] text-sm sm:text-base">
            Entry Fee
          </p>
          <p className="opacity-80 text-xs sm:text-sm">₹100 per person</p>
        </div>
      </div>
    </div>

    {/* Right Column */}
    <div className="flex flex-col">
      <div className="flex items-start gap-3 rounded-xl p-4 ">
       
        <div>
          <p className="font-semibold text-[var(--color-black)] text-sm sm:text-base">
            Activities
          </p>
          <p className="opacity-80 text-xs sm:text-sm">
            Guided tours, fruit picking
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3 rounded-xl p-4 ">
        
        <div>
          <p className="font-semibold text-[var(--color-black)] text-sm sm:text-base">
            Contact
          </p>
          <p className="opacity-80 text-xs sm:text-sm">+91 97657 89000</p>
        </div>
      </div>
    </div>
  </div>
</Section>

        </div>

       
        <div className="w-full max-w-6xl">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="text-[var(--color-secondary)] w-6 h-6" />
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-black)]">
              Location
            </h2>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition">
            <MapBox address="Srinagar" />
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
};


const Info = ({ label, value, icon }) => (
  <div className="flex items-start sm:items-center gap-2 text-[var(--color-black)] text-sm sm:text-base">
    {icon && <span className="text-[var(--color-secondary)]">{icon}</span>}
    <div>
      <span className="font-semibold">{label}: </span>
      <span className="opacity-80">{value}</span>
    </div>
  </div>
);


const Section = ({ title, children }) => (
  <div className="p-6 bg-[var(--color-white)] ">
    <h2 className="text-lg sm:text-xl font-semibold  mb-3 border-b  pb-1">
      {title}
    </h2>
    {children}
  </div>
);

export default SingleOrchardDetails;
