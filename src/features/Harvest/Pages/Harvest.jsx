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
        "https://images.unsplash.com/photo-1735992520977-cc097943bb48?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFwcmljb3RlJTIwaGFydmVzdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
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
        "https://images.unsplash.com/photo-1676921820173-33e5e4d20aee?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNoZXJyeSUyMGhhcnZlc3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
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
        "https://images.unsplash.com/photo-1552417569-262c0e72f374?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVhY2glMjBoYXJ2ZXN0fGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
      Orchard: "Orchard",
      Title: "Peach",
      variety: "Kashmiri",
      date: "Oct – June",
      temperature: "20°C",
      Boxes: "10",
      Workers: "5",
    },
    {
      image:
        "https://images.unsplash.com/photo-1661919790767-0af5bcce5578?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGx1bSUyMGhhcnZlc3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
      Orchard: "Orchard",
      Title: "Plum",
      variety: "Kashmiri",
      date: "Oct – June",
      temperature: "28°C",
      Boxes: "10",
      Workers: "5",
    },
    {
      image:
        "https://images.unsplash.com/photo-1660974128894-57dff0eb705d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGx1bSUyMHN0cmF3YmVycnklMjBoYXJ2ZXN0fGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
      Orchard: "Orchard",
      Title: "Strawberry",
      variety: "Kashmiri",
      date: "Oct – June",
      temperature: "25°C",
      Boxes: "10",
      Workers: "5",
    },
    {
      image:
        "https://images.unsplash.com/photo-1552417569-262c0e72f374?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVhY2glMjBoYXJ2ZXN0fGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
      Orchard: "Orchard",
      Title: "Peach",
      variety: "Kashmiri",
      date: "Oct – June",
      temperature: "20°C",
      Boxes: "10",
      Workers: "5",
    },
    {
      image:
        "https://images.unsplash.com/photo-1607720336444-7990bedc2bf9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z3JhcGVzJTIwaGFydmVzdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
      Orchard: "Orchard",
      Title: "Grapes",
      variety: "Kashmiri",
      date: "Oct – June",
      temperature: "28°C",
      Boxes: "10",
      Workers: "5",
    },
    {
      image:
        "https://images.unsplash.com/photo-1701748131168-05f3a37422ae?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGFsbW9uZCUyMGhhcnZlc3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
      Orchard: "Orchard",
      Title: "Almond",
      variety: "Kashmiri",
      date: "Oct – June",
      temperature: "25°C",
      Boxes: "10",
      Workers: "5",
    },
  ];

  return (
    <ContentWrapper topSpacing>
      <section>
        <div className="text-center mb-10 ">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-black)] mb-3">
            Harvest Overview
          </h2>
          <p className="text-sm md:text-base  max-w-2xl mx-auto">
            Our freshly harvested crops are carefully collected from the
            orchards, ensuring top quality and freshness in every batch.
          </p>
        </div>

        <div className="grid grid-cols-1   sm:grid-cols-3 lg:grid-cols-5 gap-6 ">
          {cardsData.map((card, index) => (
            <div
              key={index}
              className="rounded-sm border  overflow-hidden flex flex-col"
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
                <p className="text-sm  mb-4 capitalize">
                  Variety: {card.variety}
                </p>

                <div className="space-y-2 text-sm  flex-grow">
                  <div className="flex items-center gap-2">
                    <CalendarDays
                      size={16}
                      className="text-[var(--color-secondary)]"
                    />
                    <span>Harvest Period: {card.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Thermometer
                      size={16}
                      className="text-[var(--color-secondary)]"
                    />
                    <span>Temperature: {card.temperature}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Box size={16} className="text-[var(--color-secondary)]" />
                    <span>Boxes Collected: {card.Boxes}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users
                      size={16}
                      className="text-[var(--color-secondary)]"
                    />
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
