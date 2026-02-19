import React from "react";
import { Hammer, Layers, Users, Box, HammerIcon } from "lucide-react";

const HarvestInfo = () => {
  return (
    <section className="mt-20 text-center px-4">
      <h3 className="text-xl lg:text-3xl md:text-xl font-semibold text-[var(--color-black)] mb-4">
        Crafting Stories – Our Woodcraft Journey
      </h3>

      <p className="mx-auto text-[var(--color-black)] leading-relaxed mb-6 max-w-3xl">
        Each piece of our wooden craftsmanship is a blend of skill, patience,
        and tradition. Our artisans carefully select premium wood and employ
        time-honored techniques to bring life to every product. From detailed
        carvings to functional furniture, every item reflects quality,
        creativity, and sustainable practices that respect both the material and
        the environment.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="rounded-sm border p-6 flex flex-col items-center">
          <Hammer className="text-[var(--color-secondary)] mb-3" size={36} />
          <h4 className="font-semibold text-lg text-[var(--color-black)] mb-2">
            Skilled Craftsmanship
          </h4>
          <p className="text-sm text-[var(--color-black)]">
            Every item is hand-crafted by experienced artisans, ensuring quality
            and attention to detail.
          </p>
        </div>

        <div className="rounded-sm border p-6 flex flex-col items-center">
          <Box className="text-[var(--color-secondary)] mb-3" size={36} />
          <h4 className="font-semibold text-lg text-[var(--color-black)] mb-2">
            Traditional Techniques
          </h4>
          <p className="text-sm text-[var(--color-black)]">
            We use time-honored woodworking methods, combining tradition with
            modern functionality.
          </p>
        </div>

        <div className="rounded-sm border p-6 flex flex-col items-center">
          <Layers className="text-[var(--color-secondary)] mb-3" size={36} />
          <h4 className="font-semibold text-lg text-[var(--color-black)] mb-2">
            Premium Materials
          </h4>
          <p className="text-sm text-[var(--color-black)]">
            Only the finest woods are selected to create durable and beautiful
            pieces.
          </p>
        </div>

        <div className="rounded-sm border p-6 flex flex-col items-center">
          <Users className="text-[var(--color-secondary)] mb-3" size={36} />
          <h4 className="font-semibold text-lg text-[var(--color-black)] mb-2">
            Artisans’ Commitment
          </h4>
          <p className="text-sm text-[var(--color-black)]">
            Our skilled artisans pour passion and care into every product,
            ensuring each piece tells a story.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HarvestInfo;
