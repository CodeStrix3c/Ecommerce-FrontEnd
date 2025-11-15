// import React from "react";
// import { Leaf, TreePine, Sprout, Droplets, Sun } from "lucide-react";
// import ContentWrapper from "@/components/shared/ContentWrapper"; 

// const OrchardContent = () => {
//   return (
//     <ContentWrapper>
//       <section className=" text-center ">
//         <div className="">
//             <h2></h2>
//         </div>

        
//         <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
//           <div>
//             <h3 className="text-xl font-semibold flex items-center gap-2 mb-3 ">
//               <Leaf className="text-[var(--color-secondary)] w-6 h-6" />
//               Crop Varieties
//             </h3>
//             <p className=" leading-relaxed">
//               Our orchards host a diverse range of fruit varieties including
//               <span className="font-semibold text-[var(--color-secondary)]">
//                 {" "}
//                 apples, mangoes, oranges, and pomegranates
//               </span>
//               . Each crop is cultivated with region-specific methods to ensure
//               maximum yield and natural taste.
//             </p>
//           </div>

         
//           <div>
//             <h3 className="text-xl font-semibold flex items-center gap-2 mb-3">
//               <Sprout className="text-[var(--color-secondary)] w-6 h-6" />
//               Farming Practices
//             </h3>
//             <p className=" leading-relaxed">
//               We follow eco-friendly practices that promote soil health and
//               biodiversity. Our agronomy experts provide regular guidance on
//               pruning, pest management, and irrigation systems to keep orchards
//               thriving all year round.
//             </p>
//           </div>
//         </div>

//         {/* Section 3: Sustainability */}
//         <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
//           <div>
//             <h3 className="text-xl font-semibold flex items-center gap-2 mb-3">
//               <Droplets className="text-[var(--color-secondary)] w-6 h-6" />
//               Water & Soil Care
//             </h3>
//             <p className=" leading-relaxed">
//               Our irrigation systems are optimized to conserve water and prevent
//               runoff. We use organic composting and natural mulching to retain
//               soil nutrients and moisture effectively.
//             </p>
//           </div>

//           <div>
//             <h3 className="text-xl font-semibold flex items-center gap-2 mb-3">
//               <Sun className="text-[var(--color-secondary)] w-6 h-6" />
//               Sustainability Goals
//             </h3>
//             <p className=" leading-relaxed">
//               Ziraat is committed to achieving{" "}
//               <span className="font-semibold text-[var(--color-secondary)]">
//                 zero chemical residue
//               </span>{" "}
//               farming. Our focus on renewable energy, waste reduction, and
//               organic growth ensures long-term agricultural balance.
//             </p>
//           </div>
//         </div>

       
//       </section>
//     </ContentWrapper>
//   );
// };

// export default OrchardContent;


import React from "react";
import { Leaf, Sprout, Droplets, Sun } from "lucide-react";
import ContentWrapper from "@/components/shared/ContentWrapper";

const OrchardContent = () => {
  return (
    <ContentWrapper>
      <section className="text-center mt-20 ">
        {/* Section Heading */}
        <div className="mb-12">
          <h2 className="text-xl lg:text-3xl md:text-xl  font-semibold text-[var(--color-black)]">
            Our Orchard Practices
          </h2>
          <p className="mt-3 text-[var(--color-black)] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            From nurturing the soil to harvesting the sweetest fruits — our
            orchards follow sustainable and innovative farming methods that
            protect nature while ensuring premium quality produce.
          </p>
        </div>

        {/* Section 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
          <div className=" rounded-2xl p-6">
            <h3 className="text-xl font-semibold flex items-center gap-2 mb-3 ">
              <Leaf className="text-[var(--color-secondary)] w-6 h-6" />
              Crop Varieties
            </h3>
            <p className="leading-relaxed text-[var(--color-black)]">
              Our orchards host a diverse range of fruit varieties including{" "}
              <span className="font-semibold text-[var(--color-secondary)]">
                apples, mangoes, oranges, and pomegranates
              </span>
              . Each crop is cultivated with region-specific methods to ensure
              maximum yield and natural taste.
            </p>
          </div>

          <div className=" rounded-sm p-6">
            <h3 className="text-xl font-semibold flex items-center gap-2 mb-3 ">
              <Sprout className="text-[var(--color-secondary)] w-6 h-6" />
              Farming Practices
            </h3>
            <p className="leading-relaxed text-[var(--color-black)]">
              We follow eco-friendly practices that promote soil health and
              biodiversity. Our agronomy experts provide regular guidance on
              pruning, pest management, and irrigation systems to keep orchards
              thriving all year round.
            </p>
          </div>
        </div>

        {/* Section 2 */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
          <div className=" rounded-2xl p-6">
            <h3 className="text-xl font-semibold flex items-center gap-2 mb-3 ">
              <Droplets className="text-[var(--color-secondary)] w-6 h-6" />
              Water & Soil Care
            </h3>
            <p className="leading-relaxed text-[var(--color-black)]">
              Our irrigation systems are optimized to conserve water and prevent
              runoff. We use organic composting and natural mulching to retain
              soil nutrients and moisture effectively.
            </p>
          </div>

          <div className="rounded-2xl p-6">
            <h3 className="text-xl font-semibold flex items-center gap-2 mb-3 ">
              <Sun className="text-[var(--color-secondary)] w-6 h-6" />
              Sustainability Goals
            </h3>
            <p className="leading-relaxed text-[var(--color-black)]">
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
