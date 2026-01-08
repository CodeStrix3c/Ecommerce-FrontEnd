import React from "react";
import { Leaf, Sprout, Droplets, Sun } from "lucide-react";
import ContentWrapper from "@/components/shared/ContentWrapper";

const OrchardContent = () => {
  return (
    <ContentWrapper>
      <section className="text-center mt-20 ">
        {/* Section Heading */}
        <div className="mb-12">
          <h2 className="text-xl lg:text-3xl md:text-xl font-semibold text-[var(--color-black)]">
            Our Textile Craft Practices
          </h2>
          <p className="mt-3 text-[var(--color-black)] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            From sourcing fine fibers to crafting timeless fabrics — our textile
            communities follow traditional and sustainable techniques that
            preserve heritage while delivering premium handcrafted quality.
          </p>
        </div>

        {/* Section 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
          <div className="rounded-2xl p-6">
            <h3 className="text-xl font-semibold flex items-center gap-2 mb-3 ">
              <Leaf className="text-[var(--color-secondary)] w-6 h-6" />
              Textile Varieties
            </h3>
            <p className="leading-relaxed text-[var(--color-black)]">
              Our collection showcases a wide range of traditional textiles such
              as{" "}
              <span className="font-semibold text-[var(--color-secondary)]">
                Pashmina, Banarasi silk, Ikat, Ajrakh, and handwoven cotton
              </span>
              . Each fabric reflects regional identity, cultural symbolism, and
              generations of artisanal expertise.
            </p>
          </div>

          <div className="rounded-sm p-6">
            <h3 className="text-xl font-semibold flex items-center gap-2 mb-3 ">
              <Sprout className="text-[var(--color-secondary)] w-6 h-6" />
              Crafting Techniques
            </h3>
            <p className="leading-relaxed text-[var(--color-black)]">
              We support age-old techniques like handloom weaving, natural dye
              block printing, embroidery, and resist-dye methods. Skilled
              artisans ensure every piece is crafted with precision, patience,
              and authenticity.
            </p>
          </div>
        </div>

        {/* Section 2 */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
          <div className="rounded-2xl p-6">
            <h3 className="text-xl font-semibold flex items-center gap-2 mb-3 ">
              <Droplets className="text-[var(--color-secondary)] w-6 h-6" />
              Natural Materials & Dyes
            </h3>
            <p className="leading-relaxed text-[var(--color-black)]">
              Our textiles prioritize natural fibers and eco-friendly dyes.
              Processes are designed to minimize water usage while maintaining
              rich textures, vibrant colors, and long-lasting fabric quality.
            </p>
          </div>

          <div className="rounded-2xl p-6">
            <h3 className="text-xl font-semibold flex items-center gap-2 mb-3 ">
              <Sun className="text-[var(--color-secondary)] w-6 h-6" />
              Sustainability & Heritage
            </h3>
            <p className="leading-relaxed text-[var(--color-black)]">
              We are committed to{" "}
              <span className="font-semibold text-[var(--color-secondary)]">
                preserving traditional craftsmanship
              </span>{" "}
              while promoting ethical production, fair artisan livelihoods, and
              environmentally responsible textile practices for future
              generations.
            </p>
          </div>
        </div>
      </section>
    </ContentWrapper>
  );
};

export default OrchardContent;
