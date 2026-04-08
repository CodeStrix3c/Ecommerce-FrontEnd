import ImageGalleryModal from "@/components/shared/ImageGalleryModal";
import React, { useState, useMemo } from "react";
import QRCode from "react-qr-code";
import { BadgeCheck } from "lucide-react";

const PlaceGallery = ({
  place,
  zoomRef,
  onZoomEnter,
  onZoomLeave,
  onZoomMove,
  onPhotoChange,
}) => {
  const [showGallery, setShowGallery] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const photos = useMemo(
    () => (place.photos || []).filter(Boolean),
    [place.photos],
  );

  const giTag = "IICT-GI-2EKEKJN";
  const qrValue =
    "https://iictsrinagarcarpet-gi.org/verify/4140NUYRNNAHNHKYNH2";

  if (!photos.length) return null;

  const mainImage = photos[selectedIndex];
  const thumbnails = photos.slice(0, 5);

  const openGalleryAt = (index) => {
    setSelectedIndex(index);
    setShowGallery(true);
  };

  const handleThumbnailClick = (index) => {
    setSelectedIndex(index);
    onPhotoChange?.(photos[index]);
  };

  return (
    <div className="relative bg-white mb-10">
      {/* ================= DESKTOP ================= */}
      <div className="hidden lg:block space-y-6">
        {/* MAIN IMAGE — zoom handlers on this div only */}
        <div
          ref={zoomRef}
          className="relative aspect-[4/3.4] border border-gray-200 rounded-lg overflow-hidden bg-white"
          onMouseEnter={onZoomEnter}
          onMouseLeave={onZoomLeave}
          onMouseMove={onZoomMove}
        >
          <img
            src={mainImage}
            alt="product"
            draggable={false}
            onClick={() => openGalleryAt(selectedIndex)}
            className="w-full h-full object-cover cursor-pointer select-none"
          />

          {/* 🔍 AMAZON LENS */}
          <div
            id="zoom-lens"
            className="hidden lg:block absolute border border-gray-400 bg-white/30 backdrop-blur-[2px] pointer-events-none"
            style={{
              width: "120px",
              height: "120px",
            }}
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

        {/* THUMBNAILS — no zoom handlers */}
        {thumbnails.length > 0 && (
          <div className="grid grid-cols-5 gap-3">
            {thumbnails.map((img, index) => (
              <div
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={`
                  aspect-square overflow-hidden border rounded-lg cursor-pointer transition
                  ${
                    selectedIndex === index
                      ? "border-black"
                      : "border-gray-200 hover:border-gray-400"
                  }
                `}
              >
                <img
                  src={img}
                  alt={`thumb-${index}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= MOBILE ================= */}
      <div className="lg:hidden space-y-3">
        <div className="relative aspect-[4/3] border border-gray-200 rounded-lg overflow-hidden bg-white">
          <img
            src={mainImage}
            alt="product"
            draggable={false}
            onClick={() => openGalleryAt(selectedIndex)}
            className="w-full h-full object-contain p-3 cursor-pointer"
          />
        </div>

        <div className="grid grid-cols-4 gap-2">
          {thumbnails.map((img, index) => (
            <div
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className="aspect-square overflow-hidden border border-gray-200 rounded-md cursor-pointer"
            >
              <img
                src={img}
                alt={`thumb-${index}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

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
