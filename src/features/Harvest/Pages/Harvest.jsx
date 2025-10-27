import ContentWrapper from "@/components/shared/ContentWrapper";
import { CalendarDays, Thermometer, Box, Users } from "lucide-react";
import HarvestInfo from "../Components/HarvestInfo";

function Harvest() {
  const cardsData = [
    {
      image:
        "https://images.unsplash.com/photo-1636958926882-9ec7a6c36de3?auto=format&fit=crop&q=60&w=600",
      Orchard: "Orchard",
      Title: "Apple",
      variety: "Kashmiri",
      date: "Oct – June",
      temperature: "25°C",
      Boxes: "10",
      Workers: "5",
    },
    {
      image:
        "https://images.unsplash.com/photo-1674478307062-585b7df0cc95?auto=format&fit=crop&q=60&w=600",
      Orchard: "Orchard",
      Title: "Walnut",
      variety: "Kashmiri",
      date: "Oct – June",
      temperature: "20°C",
      Boxes: "10",
      Workers: "5",
    },
    {
      image:
        "https://plus.unsplash.com/premium_photo-1678469638473-e2c1d9c941f0?auto=format&fit=crop&q=60&w=600",
      Orchard: "Orchard",
      Title: "Apricot",
      variety: "Kashmiri",
      date: "Oct – June",
      temperature: "28°C",
      Boxes: "10",
      Workers: "5",
    },
    {
      image:
        "https://images.unsplash.com/photo-1610995830050-b21026ed36b8?auto=format&fit=crop&q=60&w=600",
      Orchard: "Orchard",
      Title: "Cherry",
      variety: "Kashmiri",
      date: "Oct – June",
      temperature: "25°C",
      Boxes: "10",
      Workers: "5",
    },
     {
      image:
        "https://images.unsplash.com/photo-1674478307062-585b7df0cc95?auto=format&fit=crop&q=60&w=600",
      Orchard: "Orchard",
      Title: "Walnut",
      variety: "Kashmiri",
      date: "Oct – June",
      temperature: "20°C",
      Boxes: "10",
      Workers: "5",
    },
    {
      image:
        "https://plus.unsplash.com/premium_photo-1678469638473-e2c1d9c941f0?auto=format&fit=crop&q=60&w=600",
      Orchard: "Orchard",
      Title: "Apricot",
      variety: "Kashmiri",
      date: "Oct – June",
      temperature: "28°C",
      Boxes: "10",
      Workers: "5",
    },
    {
      image:
        "https://images.unsplash.com/photo-1610995830050-b21026ed36b8?auto=format&fit=crop&q=60&w=600",
      Orchard: "Orchard",
      Title: "Cherry",
      variety: "Kashmiri",
      date: "Oct – June",
      temperature: "25°C",
      Boxes: "10",
      Workers: "5",
    },
  ];

  return (
    <ContentWrapper topSpacing compactScreen>
      <section className="py-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-black)] mb-2">
            Harvest Overview
          </h2>
          <p className="text-sm md:text-base  max-w-2xl mx-auto">
            Our freshly harvested crops are carefully collected from the orchards, 
            ensuring top quality and freshness in every batch.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cardsData.map((card, index) => (
            <div
              key={index}
              className=" rounded-sm border  overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div className="relative w-full h-56 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.Title}
                  className="w-full h-56 object-cover "
                />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg md:text-xl font-semibold text-[var(--color-black)] mb-1">
                  {card.Orchard} – {card.Title}
                </h3>
                <p className="text-sm text-gray-700 mb-4 capitalize">
                  Variety: {card.variety}
                </p>

                <div className="space-y-2 text-sm text-gray-700 flex-grow">
                  <div className="flex items-center gap-2">
                    <CalendarDays size={16} className="text-[var(--color-secondary)]" />
                    <span>Harvest Period: {card.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Thermometer size={16} className="text-[var(--color-secondary)]" />
                    <span>Temperature: {card.temperature}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Box size={16} className="text-[var(--color-secondary)]" />
                    <span>Boxes Collected: {card.Boxes}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-[var(--color-secondary)]" />
                    <span>Workers: {card.Workers}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <div>
        <HarvestInfo />
      </div>
    </ContentWrapper>
  );
}

export default Harvest;
