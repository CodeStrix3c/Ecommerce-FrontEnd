import React from "react";

const HeroSection = () => (
  <section
    className="relative text-center py-20 sm:py-24 md:py-32 px-4 sm:px-6 md:px-24 bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage:
        "url('https://images.pexels.com/photos/18087317/pexels-photo-18087317.jpeg')",
    }}
  >

    {/* Overlay */}
    <div className="absolute inset-0 bg-black/50"></div>

    {/* Content */}
    <div className="relative z-10 max-w-5xl mx-auto text-white px-2 sm:px-4">

      <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg leading-tight">
        About Art & Craft
      </h1>

      <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed tracking-wide">
        Art & Craft is dedicated to celebrating creativity through
        handmade artistry. We bring together passion, tradition, and modern
        design to create unique craft pieces that inspire, beautify spaces,
        and preserve the true essence of artistic expression.
      </p>

    </div>

  </section>
);

export default HeroSection;
