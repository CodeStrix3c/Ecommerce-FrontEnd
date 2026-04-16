import ImageGalleryModal from "@/components/shared/ImageGalleryModal";
import React, { useState, useMemo, useRef } from "react";
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
  const hasMovedRef = useRef(false);
  const lensRef = useRef(null);

  // Backend sends place.images[].url — fall back to place.photos for legacy
  const photos = useMemo(() => {
    if (place.images?.length) {
      return place.images.map((img) => img.url).filter(Boolean);
    }
    return (place.photos || []).filter(Boolean);
  }, [place.images, place.photos]);

  // Static QR for now — will be made dynamic once accepted
  const STATIC_GI_TAG = "IICT-GI-2EKEKJN";
  const STATIC_QR_VALUE =
    "https://iictsrinagarcarpet-gi.org/verify/4140NUYRNNAHNHKYNH2";

  const hasGiTag = place.attributes?.some(
    (attr) =>
      attr.name?.trim().toLowerCase() === "gi tag" &&
      attr.value?.trim().length > 0,
  );

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

  const handleMouseEnter = (e) => {
    hasMovedRef.current = false;
    if (lensRef.current) lensRef.current.style.opacity = "0";
    onZoomEnter?.(e);
  };

  const handleMouseLeave = (e) => {
    hasMovedRef.current = false;
    if (lensRef.current) lensRef.current.style.opacity = "0";
    onZoomLeave?.(e);
  };

  const handleMouseMove = (e) => {
    if (!hasMovedRef.current) {
      hasMovedRef.current = true;
      if (lensRef.current) lensRef.current.style.opacity = "1";
    }
    onZoomMove?.(e);
  };

  const QRBadge = ({
    size = 60,
    textSizeClass = "text-[10px]",
    iconSize = 12,
    badgeTextClass = "text-[11px]",
  }) => (
    <div className="absolute bottom-3 right-3 flex flex-col items-center bg-white p-2 rounded shadow z-10">
      <QRCode value={STATIC_QR_VALUE} size={size} />
      <span className={`${textSizeClass} mt-1`}>{STATIC_GI_TAG}</span>
      <div className="flex items-center gap-1 text-green-600 mt-1">
        <BadgeCheck size={iconSize} />
        <span className={`${badgeTextClass} font-medium`}>Verified</span>
      </div>
    </div>
  );

  return (
    <div className="relative bg-white mb-10">
      {/* ================= DESKTOP ================= */}
      <div className="hidden lg:block space-y-6">
        <div
          ref={zoomRef}
          className="relative aspect-[4/3.4] border border-gray-200 rounded-lg overflow-hidden bg-white"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
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
            ref={lensRef}
            id="zoom-lens"
            className="hidden lg:block absolute border border-gray-400 bg-white/30 backdrop-blur-[2px] pointer-events-none"
            style={{
              width: "120px",
              height: "120px",
              opacity: 0,
              transition: "opacity 0.05s",
            }}
          />

          {hasGiTag && (
            <QRBadge
              size={60}
              textSizeClass="text-[10px]"
              iconSize={12}
              badgeTextClass="text-[11px]"
            />
          )}
        </div>

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

          {hasGiTag && (
            <QRBadge
              size={50}
              textSizeClass="text-[9px]"
              iconSize={11}
              badgeTextClass="text-[10px]"
            />
          )}
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
