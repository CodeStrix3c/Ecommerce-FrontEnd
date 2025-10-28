// import React from "react";
// import { Users } from "lucide-react";

// const WhoWeAre = () => (
//   <section className="py-16 px-6 md:px-20 lg:px-40 bg-gradient-to-b text-center rounded-t-3xl">
//     <div className="max-w-3xl mx-auto">
//       <h2 className="text-3xl md:text-4xl font-bold mb-6 flex justify-center items-center gap-2 ">
//         <Users className="w-8 h-8 text-[var(--color-secondary)]" /> Who We Are
//       </h2>

//       <p className="text-lg  leading-relaxed">
//         At <strong className="text-[var(--color-secondary)]">Ziraat</strong>, we are a team of
//         agricultural scientists, experts, and field professionals committed to
//         helping orchard farmers protect their crops sustainably. We create
//         <strong> eco-safe, high-quality pesticide solutions </strong> designed to
//         enhance fruit yield while preserving soil and environmental balance.
//         <br />
//         <br />
//         The roots of Farmer’s Orchard Care go deep into the Indian farmlands.
//         Founded by a team of agriculture scientists and experienced growers, we
//         set out with a mission to revolutionize how farmers protect their crops.
//         <br />
//         <br />
//         <span className="block mt-4  font-semibold ">
//           “We don’t just sell pesticides — we offer peace of mind to farmers.”
//         </span>
//       </p>
//     </div>
//   </section>
// );

// export default WhoWeAre;


import React from "react";
import { Users } from "lucide-react";

const WhoWeAre = () => (
  <section className="px-6 md:px-24 text-center py-16 bg-white">
    <div className="max-w-4xl mx-auto">
      {/* Heading with Icon */}
      <div className="flex justify-center items-center gap-3 mb-6">
        <Users className="w-8 h-8 text-[var(--color-secondary)]" />
        <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-[var(--color-black)]">
          Who We Are
        </h2>
      </div>

     
      <p className="text-base sm:text-lg md:text-xl leading-relaxed ">
        At{" "}
        <strong className="font-semibold text-[var(--color-secondary)]">
          Ziraat
        </strong>
        , we are a team of agricultural experts, scientists, and passionate
        farmers dedicated to helping orchard growers protect their harvests
        responsibly. Our mission is to blend innovation with nature — ensuring
        healthier yields and sustainable farming practices for generations to
        come.
      </p>

      
      <p className="mt-6 font-medium text-[var(--color-black)] text-base sm:text-lg   ">
        “We don’t just sell pesticides — we nurture the future of farming.”
      </p>
    </div>
  </section>
);

export default WhoWeAre;
