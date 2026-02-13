import React from "react";

export default function ImageHeaderSection({ image, title, description }) {
  return (
    <div className="lg:mt-2 w-full h-[70vh] sm:h-[70vh] overflow-hidden relative">

      {/* Background Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover brightness-75"
      />

      {/* Overlay */}
      <div className="absolute inset-0"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center lg:items-start justify-center px-6 sm:px-10 md:px-16 lg:px-24 text-white">

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-center lg:text-left">
          {title}
        </h2>

        <p className="text-sm sm:text-base md:text-lg max-w-2xl text-center lg:text-left leading-relaxed">
          {description}
        </p>

      </div>

    </div>
  );
}
