import React from "react";

const HeroSection = () => (
  <section
    className="relative text-center py-20 sm:py-24 md:py-32  px-4 sm:px-6 md:px-24 bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage:
        "url('https://images.unsplash.com/photo-1745138470256-42cb9fa3c052?ixlib=rb-4.1.0')",
    }}
  >
    
    <div className="absolute inset-0 bg-green-900/40"></div>

   
    <div className="relative z-10 max-w-5xl mx-auto text-white px-2 sm:px-4">
      <div className="flex justify-center mb-4"></div>

      <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg leading-tight">
        About Ziraat
      </h1>

      <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed tracking-wide">
        Ziraat is dedicated to empowering orchard farmers with safe, effective,
        and sustainable crop protection solutions. We blend scientific innovation
        with agricultural wisdom to create eco-friendly pesticides that nurture
        healthier orchards.
      </p>
    </div>
  </section>
);

export default HeroSection;
