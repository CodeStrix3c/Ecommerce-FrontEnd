import React from "react";
import { Leaf, TreePine, Sprout, Droplets, Sun } from "lucide-react";
import ContentWrapper from "@/components/shared/ContentWrapper"; // optional wrapper if you use it

const OrchardContent = () => {
  return (
    <ContentWrapper>
      <section className=" px-6 md:px-24 text-center ">
        

        {/* Section 1: Crop Varieties */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div>
            <h3 className="text-xl font-semibold flex items-center gap-2 mb-3">
              <Leaf className="text-[var(--color-secondary)] w-6 h-6" />
              Crop Varieties
            </h3>
            <p className=" leading-relaxed">
              Our orchards host a diverse range of fruit varieties including
              <span className="font-semibold text-[var(--color-secondary)]">
                {" "}
                apples, mangoes, oranges, and pomegranates
              </span>
              . Each crop is cultivated with region-specific methods to ensure
              maximum yield and natural taste.
            </p>
          </div>

         
          <div>
            <h3 className="text-xl font-semibold flex items-center gap-2 mb-3">
              <Sprout className="text-[var(--color-secondary)] w-6 h-6" />
              Farming Practices
            </h3>
            <p className=" leading-relaxed">
              We follow eco-friendly practices that promote soil health and
              biodiversity. Our agronomy experts provide regular guidance on
              pruning, pest management, and irrigation systems to keep orchards
              thriving all year round.
            </p>
          </div>
        </div>

        {/* Section 3: Sustainability */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div>
            <h3 className="text-xl font-semibold flex items-center gap-2 mb-3">
              <Droplets className="text-[var(--color-secondary)] w-6 h-6" />
              Water & Soil Care
            </h3>
            <p className=" leading-relaxed">
              Our irrigation systems are optimized to conserve water and prevent
              runoff. We use organic composting and natural mulching to retain
              soil nutrients and moisture effectively.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold flex items-center gap-2 mb-3">
              <Sun className="text-[var(--color-secondary)] w-6 h-6" />
              Sustainability Goals
            </h3>
            <p className=" leading-relaxed">
              Ziraat is committed to achieving{" "}
              <span className="font-semibold text-[var(--color-secondary)]">
                zero chemical residue
              </span>{" "}
              farming. Our focus on renewable energy, waste reduction, and
              organic growth ensures long-term agricultural balance.
            </p>
          </div>
        </div>

       
      </section>
    </ContentWrapper>
  );
};

export default OrchardContent;
