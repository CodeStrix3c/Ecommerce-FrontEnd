import React from "react";

const ImageBanner = ({
  imageSrc,
  altText = "Banner image",
  logoSrc,
  height = "h-[310px]",
  logoSize = "w-6 h-6",
}) => {
  return (
    <div className={`relative ${height}`}>
      {/* Background Image */}
      <img
        src={imageSrc}
        alt={altText}
        className="w-full h-full object-cover rounded-none lg:rounded-t-sm md:rounded-t-sm"
      />

      {/* Overlay Logo */}
      {logoSrc && (
        <div className="absolute top-4 left-4 p-2 bg-white/70 backdrop-blur-sm rounded-full shadow-md">
          <img
            src={logoSrc}
            alt="Logo"
            className={`${logoSize} rounded-full`}
          />
        </div>
      )}
    </div>
  );
};

export default ImageBanner;
