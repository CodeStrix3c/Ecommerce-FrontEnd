import React from "react";
import techniques from "../../data/farmingTechniques.json";
import ContentWrapper from "@/components/shared/ContentWrapper";

function FarmingTechniques() {
  return (
    <ContentWrapper topSpacing>
      <div className="text-[var(--color-black)] text-justify">
        <div className="text-center mb-12 ">
          <h2 className="text-3xl font-semibold mb-4 max-sm:whitespace-normal sm:whitespace-nowrap">
            The Future of Farming
          </h2>
          <p className="text-lg text-[var(--color-black)] max-w-3xl mx-auto text-justify">
            Farming is evolving every day with new innovations. Below are some
            sustainable techniques that are redefining agriculture while
            promoting environmental balance and long-term productivity.
          </p>
        </div>

        <div className="space-y-6">
          {techniques.map((tech) => (
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
                <h2 className="text-2xl font-semibold mb-3 text-left">
                  {tech.title}
                </h2>

                <p className="text-[var(--color-black)] mb-2 font-medium text-justify">
                  {tech.summary}
                </p>

                <p className="text-[var(--color-black)] text-justify">
                  {tech.details}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8  border-[var(--color-gray)] pt-10">
          <h2 className="text-xl lg:text-3xl md:text-xl  font-semibold mb-8 text-center text-[var(--color-black)]">
            Moving Toward a Sustainable Future
          </h2>

          <div className="space-y-6 max-w-4xl mx-auto text-[var(--color-black)] text-justify">
            <p>
              The integration of smart technologies in agriculture is reshaping
              how food is produced. From automated irrigation systems to
              real-time soil monitoring, farmers are now equipped to optimize
              every drop of water and every inch of land.
            </p>

            <p>
              Sustainable methods such as composting, crop rotation, and
              intercropping have become essential in maintaining soil fertility
              and reducing chemical dependency, ensuring a healthy ecosystem for
              both crops and consumers.
            </p>

            <p>
              Farmers are increasingly adopting climate-resilient techniques
              that help withstand unpredictable weather conditions, preserve
              biodiversity, and promote food security.
            </p>

            <p className="font-semibold">
              A truly sustainable future depends on knowledge, innovation, and a
              shared commitment to caring for our planet.
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-sm ">
          <h2 className="text-2xl font-semibold mb-10 text-center text-[var(--color-black)] max-sm:whitespace-normal sm:whitespace-nowrap">
            Emerging Innovations in Agriculture
          </h2>

          <div className="grid md:grid-cols-3 gap-6 text-[var(--color-black)]">
            <div className="p-6 bg-[var(--color-white)] rounded-sm border border-[var(--color-gray)] text-justify">
              <h3 className="font-semibold text-lg mb-2 text-[var(--color-black)]">
                Vertical Farming
              </h3>
              <p>
                Multi-layered indoor farms grow crops using LED lighting and
                controlled environments, maximizing space and reducing water
                usage—perfect for urban areas.
              </p>
            </div>

            <div className="p-6 bg-[var(--color-white)] rounded-sm border border-[var(--color-gray)] text-justify">
              <h3 className="font-semibold text-lg mb-2 text-[var(--color-black)]">
                Drone Technology
              </h3>
              <p>
                Drones provide real-time data on crop health, irrigation needs,
                and pest control—allowing precise, efficient farm management.
              </p>
            </div>

            <div className="p-6 bg-[var(--color-white)] rounded-sm border border-[var(--color-gray)] text-justify">
              <h3 className="font-semibold text-lg mb-2 text-[var(--color-black)]">
                AI & Smart Farming
              </h3>
              <p>
                Artificial intelligence predicts crop trends, analyzes soil
                data, and improves decision-making, paving the way for smarter,
                data-driven farming.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
}

export default FarmingTechniques;
