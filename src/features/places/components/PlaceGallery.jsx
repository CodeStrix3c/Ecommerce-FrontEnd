import ImageGalleryModal from "@/components/shared/ImageGalleryModal";
import React, { useState, useMemo } from "react";

const PlaceGallery = ({ place }) => {
  const [showGallery, setShowGallery] = useState(false);

  const photos = useMemo(
    () => (place.photos || []).filter(Boolean),
    [place.photos],
  );

  if (!photos.length) return null;

  return (
    <div className="relative">
      {/* Desktop */}
      <div className="hidden md:grid grid-cols-2 gap-6 h-[400px] py-2">
        {/* LEFT: Image */}
        <div className="flex items-center justify-center bg-gray-100 rounded-[12px] overflow-hidden">
          <img
            src={photos[0]}
            alt=""
            onClick={() => setShowGallery(true)}
            className="max-h-full max-w-full object-contain cursor-pointer"
          />
        </div>

        {/* RIGHT: QR / future content */}
        <div className="flex items-center justify-center border border-dashed rounded-[12px]">
          {/* QR will go here */}
          <span className="text-gray-400">QR goes here</span>
        </div>
      </div>

      {/* Mobile */}
      <div className="flex gap-2 overflow-x-auto md:hidden">
        {photos.map((img, i) => (
          <img
            key={i}
            src={img}
            alt=""
            onClick={() => setShowGallery(true)}
            className="h-52 w-[85%] object-contain bg-gray-100 rounded-lg cursor-pointer flex-shrink-0"
          />
        ))}
      </div>

      <ImageGalleryModal
        photos={place.photos}
        isOpen={showGallery}
        onClose={() => setShowGallery(false)}
      />
    </div>
  );
};

export default PlaceGallery;
