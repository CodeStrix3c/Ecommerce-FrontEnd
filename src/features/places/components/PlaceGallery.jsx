import ImageGalleryModal from "@/components/shared/ImageGalleryModal";
import React, { useState, useMemo } from "react";
import QRCode from "react-qr-code";
import { BadgeCheck } from "lucide-react";

const PlaceGallery = ({ place }) => {
  const [showGallery, setShowGallery] = useState(false);
  const [hoverImage, setHoverImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const photos = useMemo(
    () => (place.photos || []).filter(Boolean),
    [place.photos]
  );

  const giTag = "IICT-GI-2EKEKJN";
  const qrValue =
    "https://iictsrinagarcarpet-gi.org/verify/4140NUYRNNAHNHKYNH2";

  if (!photos.length) return null;

  const mainImage = photos[0];
  const thumbnails = photos.slice(1, 5);

  const displayImage = hoverImage || mainImage;

  const openGalleryAt = (index) => {
    setSelectedIndex(index);
    setShowGallery(true);
  };

  return (
    <div className="relative bg-white mb-10">
      {/* ================= DESKTOP ================= */}
      <div className="hidden lg:block space-y-8">
        {/* MAIN IMAGE */}
        <div className="relative aspect-[4/3.2] border border-gray-200 rounded-lg overflow-hidden">
          <img
            src={displayImage}
            alt="main"
            onClick={() =>
              openGalleryAt(
                hoverImage ? photos.indexOf(hoverImage) : 0
              )
            }
            draggable={false}
            className="w-full h-full object-cover cursor-pointer transition-all duration-200"
          />

          {/* QR */}
          {qrValue && (
            <div className="absolute bottom-3 right-3 flex flex-col items-center bg-white p-2 rounded shadow">
              <QRCode value={qrValue} size={60} />
              <span className="text-[10px] mt-1">{giTag}</span>

              <div className="flex items-center gap-1 text-green-600 mt-1">
                <BadgeCheck size={12} />
                <span className="text-[11px] font-medium">Verified</span>
              </div>
            </div>
          )}
        </div>

        {/* THUMBNAILS */}
        {thumbnails.length > 0 && (
          <div className="grid grid-cols-4 gap-3">
            {thumbnails.map((img, index) => {
              const actualIndex = index + 1;
              return (
                <div
                  key={index}
                  className="aspect-square overflow-hidden border border-gray-200 rounded-lg cursor-pointer"
                  onMouseEnter={() => setHoverImage(img)}
                  onMouseLeave={() => setHoverImage(null)}
                  onClick={() => openGalleryAt(actualIndex)}
                >
                  <img
                    src={img}
                    alt={`thumb-${index}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ================= MOBILE ================= */}
      <div className="lg:hidden space-y-3">
        <div className="relative aspect-[4/3] border border-gray-200 rounded-lg overflow-hidden">
          <img
            src={mainImage}
            alt="main"
            onClick={() => openGalleryAt(0)}
            draggable={false}
            className="w-full h-full object-contain p-3 cursor-pointer"
          />

          {qrValue && (
            <div className="absolute bottom-3 right-3 flex flex-col items-center bg-white/80 p-1 rounded">
              <QRCode value={qrValue} size={50} />
              <span className="text-[9px] mt-1">{giTag}</span>

              <div className="flex items-center gap-1 text-green-600 mt-1">
                <BadgeCheck size={12} />
                <span className="text-[10px] font-medium">Verified</span>
              </div>
            </div>
          )}
        </div>

        {thumbnails.length > 0 && (
          <div className="grid grid-cols-4 gap-2">
            {thumbnails.map((img, index) => {
              const actualIndex = index + 1;
              return (
                <div
                  key={index}
                  className="aspect-square overflow-hidden border border-gray-200 rounded-md"
                  onClick={() => openGalleryAt(actualIndex)}
                >
                  <img
                    src={img}
                    alt={`thumb-${index}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ================= MODAL ================= */}
      <ImageGalleryModal
        photos={photos}
        isOpen={showGallery}
        startIndex={selectedIndex}
        onClose={() => setShowGallery(false)}
      />
    </div>
  );
};

export default PlaceGallery;
