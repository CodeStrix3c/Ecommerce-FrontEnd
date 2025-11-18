import ContentWrapper from "@/components/shared/ContentWrapper";
import { CalendarDays, Thermometer, Box, Users } from "lucide-react";
import HarvestInfo from "../Components/HarvestInfo";
import { useHarvestQuery } from "@/hooks/useHarvestQuery";

function Harvest() {
  const { data } =  useHarvestQuery();

  // const cardsData = [
  //   {
  //     image: "/assets/images/harvest-apples.avif",
  //     Orchard: "Orchard",
  //     Title: "Apple",
  //     variety: "Kashmiri",
  //     date: "Oct – June",
  //     temperature: "25°C",
  //     Boxes: "10",
  //     Workers: "5",
  //   },
  //   {
  //     image: "/assets/images/harvest-walnuts.avif",
  //     Orchard: "Orchard",
  //     Title: "Walnut",
  //     variety: "Kashmiri",
  //     date: "Oct – June",
  //     temperature: "20°C",
  //     Boxes: "10",
  //     Workers: "5",
  //   },
  //   {
  //     image: "/assets/images/harvest-apricot.avif",
  //     Orchard: "Orchard",
  //     Title: "Apricot",
  //     variety: "Kashmiri",
  //     date: "Oct – June",
  //     temperature: "28°C",
  //     Boxes: "10",
  //     Workers: "5",
  //   },
  //   {
  //     image: "/assets/images/harvest-cherry.avif",
  //     Orchard: "Orchard",
  //     Title: "Cherry",
  //     variety: "Kashmiri",
  //     date: "Oct – June",
  //     temperature: "25°C",
  //     Boxes: "10",
  //     Workers: "5",
  //   },
  //   {
  //     image: "/assets/images/harvest-peach.avif",
  //     Orchard: "Orchard",
  //     Title: "Peach",
  //     variety: "Kashmiri",
  //     date: "Oct – June",
  //     temperature: "20°C",
  //     Boxes: "10",
  //     Workers: "5",
  //   },
  //   {
  //     image: "/assets/images/harvest-plum.avif",
  //     Orchard: "Orchard",
  //     Title: "Plum",
  //     variety: "Kashmiri",
  //     date: "Oct – June",
  //     temperature: "28°C",
  //     Boxes: "10",
  //     Workers: "5",
  //   },
  //   {
  //     image: "/assets/images/harvest-strawberry.avif",
  //     Orchard: "Orchard",
  //     Title: "Strawberry",
  //     variety: "Kashmiri",
  //     date: "Oct – June",
  //     temperature: "25°C",
  //     Boxes: "10",
  //     Workers: "5",
  //   },
  //   {
  //     image: "/assets/images/harvest-peach.avif",
  //     Orchard: "Orchard",
  //     Title: "Peach",
  //     variety: "Kashmiri",
  //     date: "Oct – June",
  //     temperature: "20°C",
  //     Boxes: "10",
  //     Workers: "5",
  //   },
  //   {
  //     image: "/assets/images/harvest-grapes.avif",
  //     Orchard: "Orchard",
  //     Title: "Grapes",
  //     variety: "Kashmiri",
  //     date: "Oct – June",
  //     temperature: "28°C",
  //     Boxes: "10",
  //     Workers: "5",
  //   },
  //   {
  //     image: "/assets/images/harvest-almond.avif",
  //     Orchard: "Orchard",
  //     Title: "Almond",
  //     variety: "Kashmiri",
  //     date: "Oct – June",
  //     temperature: "25°C",
  //     Boxes: "10",
  //     Workers: "5",
  //   },
  // ];

  return (
    <ContentWrapper topSpacing>
      <section>
        <div className="text-center mb-10 ">
          <h2 className="text-2xl md:text-4xl font-bold text-[var(--color-black)] mb-2">
            Harvest Overview
          </h2>
          <p className="text-sm md:text-base  max-w-2xl mx-auto">
            Our freshly harvested crops are carefully collected from the
            orchards, ensuring top quality and freshness in every batch.
          </p>
        </div>

        <div className="grid grid-cols-1   sm:grid-cols-3 lg:grid-cols-5 gap-6 ">
          {data?.map((card, index) => (
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
