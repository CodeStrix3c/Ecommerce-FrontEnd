import React from "react";
import { Leaf, Sprout, Hand, TreePine } from "lucide-react";


const HarvestInfo = () => {
  return (
  
     <section className="mt-20 text-center px-4">
      
      <h3 className="text-xl lg:text-3xl md:text-xl font-semibold text-[var(--color-black)] mb-4">
        From Orchard to Basket – Our Harvest Story
      </h3>

      
      <p className=" mx-auto text-[var(--color-black)] leading-relaxed mb-6">
        Every harvest season is a celebration of patience, care, and the bond between
        our farmers and the earth. From the first bloom to the final basket, we nurture
        every fruit with sustainable farming practices to ensure freshness, purity, and
        the authentic taste of nature.
        Our team handpicks fruits at their perfect ripeness, preserving their natural
        color, flavor, and nutrition. Each box reflects our commitment to eco-friendly
        cultivation, minimizing chemical use and promoting soil health.
      </p>

      

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
        <div className=" rounded-sm border p-6 flex flex-col items-center">
          <Leaf className="text-[var(--color-secondary)] mb-3" size={36} />
          <h4 className="font-semibold text-lg text-[var(--color-black)] mb-2">Naturally Grown</h4>
          <p className="text-sm text-[var(--color-black)]">
            We use organic and sustainable methods to ensure healthier, chemical-free produce.
          </p>
        </div>

        <div className=" rounded-sm border  p-6 flex flex-col items-center">
          <Sprout className="text-[var(--color-secondary)] mb-3" size={36} />
          <h4 className="font-semibold text-lg text-[var(--color-black)] mb-2">Sustainable Practices</h4>
          <p className="text-sm text-[var(--color-black)]">
            Our eco-friendly techniques protect soil fertility and promote biodiversity.
          </p>
        </div>

        <div className=" rounded-sm border n p-6 flex flex-col items-center">
          <Hand className="text-[var(--color-secondary)] mb-3" size={36} />
          <h4 className="font-semibold text-lg text-[var(--color-black)] mb-2">Handpicked Freshness</h4>
          <p className="text-sm text-[var(--color-black)]">
            Each fruit is carefully handpicked at its peak to retain maximum flavor and nutrition.
          </p>
        </div>

        <div className=" rounded-sm border p-6 flex flex-col items-center">
          <TreePine className="text-[var(--color-secondary)] mb-3" size={36} />
          <h4 className="font-semibold text-lg text-[var(--color-black)] mb-2">Farm-to-Table Promise</h4>
          <p className="text-sm text-[var(--color-black)]">
            We deliver directly from our orchards, ensuring freshness from farm to your home.
          </p>
        </div>
      </div>
    </section>
   
  );
};

export default HarvestInfo;

