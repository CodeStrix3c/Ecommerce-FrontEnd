import React from "react";
import { CheckCircle, Shield, Sprout, FlaskConical, Star } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Proven Results",
      desc: "Trusted by 500+ farmers across multiple orchards.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Safe & Certified",
      desc: "Eco-friendly products that protect soil health.",
    },
    {
      icon: <Sprout className="w-8 h-8" />,
      title: "Sustainability First",
      desc: "Helping build a greener, healthier tomorrow.",
    },
    {
      icon: <FlaskConical className="w-8 h-8" />,
      title: "Science-Backed Formulas",
      desc: "Developed through extensive agricultural research.",
    },
  ];

  return (
    <section className="py-6 px-4 sm:px-8 md:px-16 lg:px-24 text-center ">
     
      <div className="flex justify-center items-center gap-2 mb-6">
        <Star className="w-8 h-8 text-[var(--color-secondary)]" />
        <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-[var(--color-black)]">
          Why Choose Us
        </h2>
      </div>

      
      <p className="max-w-3xl text-base sm:text-lg md:text-xl mx-auto mb-12 leading-relaxed px-2">
        At{" "}
        <span className="font-semibold text-[var(--color-secondary)]">
          Farmer Orchard
        </span>
        , we’re dedicated to providing innovative and safe agricultural
        solutions that enhance crop yield while caring for nature. Our
        commitment to quality and sustainability makes us the trusted choice
        for orchard owners across the region.
      </p>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto">
        {features.map((f, i) => (
          <div
            key={i}
            className="p-6 sm:p-8 rounded-sm border bg-[var(--color-light)] "
          >
            <div className="text-[var(--color-secondary)] flex justify-center mb-4">
              {f.icon}
            </div>
            <h3 className="font-semibold text-lg sm:text-xl mb-2 text-[var(--color-black)]">
              {f.title}
            </h3>
            <p className=" text-sm sm:text-base leading-relaxed">
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
