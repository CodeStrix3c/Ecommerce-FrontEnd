import ImageGalleryModal from "@/components/shared/ImageGalleryModal";
import React, { useState, useMemo } from "react";
import QRCode from "react-qr-code";

const PlaceGallery = ({ place }) => {
  const [showGallery, setShowGallery] = useState(false);

  const photos = useMemo(
    () => (place.photos || []).filter(Boolean),
    [place.photos],
  );

  // ✅ Extract GI Tag from perks
  const giTag = useMemo(() => {
    if (!place?.perks) return null;

    const giAttr = place.perks.find((perk) =>
      perk?.name?.toLowerCase().includes("gi"),
    );

    return giAttr?.value || null;
  }, [place.perks]);

  // ✅ QR link → GI details page
  const qrValue = giTag
    ? `${window.location.origin}/gi-details/${giTag}`
    : null;

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

        {/* RIGHT: QR */}
        <div className="flex flex-col items-center justify-center border border-dashed rounded-[12px]">
          {qrValue ? (
            <>
              <QRCode value={qrValue} size={170} />

              <span className="text-sm text-gray-500 mt-3">
                Scan GI Details
              </span>

              <span className="text-xs text-gray-400">{giTag}</span>
            </>
          ) : (
            <span className="text-gray-400">QR not available</span>
          )}
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
