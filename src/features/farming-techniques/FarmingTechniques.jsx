import React from "react";
import ContentWrapper from "@/components/shared/ContentWrapper";
import {
  usecardsDataQuery,
  usefarmingTechniquesQuery,
  usemethodsDataQuery,
} from "@/hooks/famingTechinquesQuery";

function FarmingTechniques() {
  const { data: farmingTech } = usefarmingTechniquesQuery(); // farming techniques
  const { data: cardsData } = usecardsDataQuery(); // sustainable future content
  const { data: methodsData } = usemethodsDataQuery(); // emerging innovations

  return (
    <ContentWrapper>
      <div className="py-6 sm:py-10 md:py-14 lg:mt-32 text-[var(--color-black)] text-justify">

        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-semibold mb-4 max-sm:whitespace-normal sm:whitespace-nowrap">
            The Future of Farming
          </h1>
          <p className="text-lg text-[var(--color-black)] max-w-3xl mx-auto">
            Farming is evolving every day with new innovations. Below are some
            sustainable techniques that are redefining agriculture while
            promoting environmental balance and long-term productivity.
          </p>
        </div>

        {/* Farming Techniques List */}
        <div className="space-y-6">
          {farmingTech?.map((tech) => (
            <div
              key={tech.id}
              className="flex flex-col md:flex-row border border-[var(--color-gray)] rounded-sm overflow-hidden"
            >
              <div className="md:w-1/3 w-full h-56 md:h-auto">
                <img
                  src={tech.img}
                  alt={tech.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="md:w-2/3 w-full p-6 flex flex-col justify-center">
                <h2 className="text-2xl font-semibold mb-3">{tech.title}</h2>

                <p className="font-medium mb-2">{tech.summary}</p>

                <p>{tech.details}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Moving Toward a Sustainable Future */}
        <div className="mt-8 border-[var(--color-gray)] pt-10">
          <h2 className="text-2xl font-semibold mb-8 text-center">
            {cardsData?.title}
          </h2>

          <div className="space-y-6 max-w-4xl mx-auto">
            {methodsData?.content?.map((item, index) => (
              <p
                key={index}
                className={item.highlight ? "font-semibold" : ""}
              >
                {item.text}
              </p>
            ))}
          </div>
        </div>

        {/* Emerging Innovations Section */}
        <div className="mt-12 rounded-sm">
          <h2 className="text-2xl font-semibold mb-10 text-center">
            {methodsData?.title}
            {/* {console.log(methodsData,"methodsDarta") } */}
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {cardsData?.innovations?.map((item, index) => (
              <div
                key={index}
                className="p-6 bg-[var(--color-white)] rounded-sm border border-[var(--color-gray)] text-justify"
              >
                <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </ContentWrapper>
  );
}

export default FarmingTechniques;
