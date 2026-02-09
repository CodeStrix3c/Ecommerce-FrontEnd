import React, { useState, useMemo } from "react";
import QRCode from "react-qr-code";
import ImageGalleryModal from "@/components/shared/ImageGalleryModal";

const PlaceGallery = ({ place }) => {
  const [showGallery, setShowGallery] = useState(false);

  const photos = useMemo(
    () => (place.photos || []).filter(Boolean),
    [place.photos],
  );

  const giTag = place.giTag;

  const qrValue = giTag
    ? `${window.location.origin}/gi-details/${giTag}`
    : null;

  if (!photos.length) return null;

  return (
    <div className="relative">
      <div className="hidden md:grid grid-cols-2 gap-6 h-[400px] py-2">
        <div className="flex items-center justify-center bg-gray-100 rounded-xl">
          <img
            src={photos[0]}
            onClick={() => setShowGallery(true)}
            className="max-h-full max-w-full object-contain cursor-pointer"
          />
        </div>

        <div className="flex flex-col items-center justify-center border border-dashed rounded-xl">
          {qrValue ? (
            <>
              <QRCode value={qrValue} size={170} />
              <span className="text-sm text-gray-500 mt-3">
                Scan for GI Verification
              </span>
              <span className="text-xs text-gray-400">{giTag}</span>
            </>
          ) : (
            <span className="text-gray-400">GI QR not available</span>
          )}
        </div>
      </div>

      <ImageGalleryModal
        photos={photos}
        isOpen={showGallery}
        onClose={() => setShowGallery(false)}
      />
    </div>
  );
};

export default PlaceGallery;
