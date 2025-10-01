import ContentWrapper from "@/components/shared/ContentWrapper";
import HarvestCard from "@/components/shared/HarvestCard";


function Harvest() {
  const cardsData = [
    {
      image: "https://img.freepik.com/free-psd/close-up-delicious-apple_23-2151868338.jpg?semt=ais_hybrid&w=740&q=80",
      Orchard:"Orchard",
      Title: "Apple",
      variety: "kashmiri",
      date: "2025-09-30",
      temperature: "25°C",
      Boxes:"10",
      Workers:"5"
    },
    {
      image: "https://media.istockphoto.com/id/639478614/photo/walnut-isolated-on-white-background-with-clipping-path.jpg?s=612x612&w=0&k=20&c=bT5XpqZskiPL5PAgUrUqTAO5tQtS_SMSzv6fJ2aOjPo=",
       Orchard:"Orchard",
      Title: "Walnut",
      variety: "kashmiri",
      date: "2025-09-28",
      temperature: "20°C",
      Boxes:"10",
      Workers:"5"
    },
    {
      image: "https://media.istockphoto.com/id/542330328/photo/organic-raw-dry-apricots.jpg?s=612x612&w=0&k=20&c=_hXZ6EDk4h0fcbEj-bequdeN_YtWpPOJLqYMw_Ipz5s=",
       Orchard:"Orchard",
      Title: "Apricot",
      variety: "kashmiri",
      date: "2025-09-29",
      temperature: "28°C",
      Boxes:"10",
      Workers:"5"
    },
  ];

  return (
<ContentWrapper>
     <div className="py-16 md:py-24 lg:py-28">
  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[var(--color-black)]">
    Harvest
  </h2>
  
  {/* Description */}
  <p className="text-sm md:text-base lg:text-lg text-[var(--color-black)] mt-2 md:mt-3 lg:mt-4 w-full">
    Harvesting is the process of gathering mature crops from the fields, ensuring quality and timely collection for optimal yield.
  </p>

  <div className="h-[2px] bg-[var(--color-black-hover)] my-4" />
  
  <HarvestCard cardsData={cardsData} />
</div>
</ContentWrapper>

    
  );
}

export default Harvest;
