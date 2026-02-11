import ImageGalleryModal from "@/components/shared/ImageGalleryModal";
import React, { useState, useMemo } from "react";
import QRCode from "react-qr-code";
import { BadgeCheck } from "lucide-react";

const PlaceGallery = ({ place }) => {
  const [showGallery, setShowGallery] = useState(false);

  const photos = useMemo(
    () => (place.photos || []).filter(Boolean),
    [place.photos]
  );

  const giTag = "IICT-GI-2EKEKJN";
  const qrValue =
    "https://iictsrinagarcarpet-gi.org/verify/4140NUYRNNAHNHKYNH2";

  if (!photos.length) return null;

  const mainImage = photos[0];
  const sideImages = photos.slice(1, 5);

  return (
    <div className="relative bg-[var(--color-white)]">
      {/* ================= DESKTOP ================= */}
      <div className="hidden lg:flex justify-start py-2">
        <div className="grid grid-cols-5 gap-6 max-w-3xl w-full">

          {/* LEFT MAIN IMAGE */}
          <div className="col-span-3 relative aspect-[2/1] flex items-center justify-center overflow-hidden border border-[var(--color-gray)] bg-[var(--color-white)] rounded-lg">
            <img
              src={mainImage}
              alt=""
              onClick={() => setShowGallery(true)}
              className="w-full h-full object-contain p-2 cursor-pointer"
            />

            {qrValue && (
              <div className="absolute bottom-2 right-2 flex flex-col items-center bg-[var(--color-white)] p-1 rounded shadow">
                <QRCode value={qrValue} size={50} />

                <span className="text-[8px] text-[var(--color-black)] mt-1">
                  {giTag}
                </span>

                <div className="flex items-center gap-1 text-[var(--color-primary)] mt-1">
                  <BadgeCheck size={10} />
                  <span className="text-[9px] font-medium">Verified</span>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT SIDE 2x2 */}
          <div className="col-span-2 grid grid-cols-2 grid-rows-2 gap-3 aspect-[2/1] h-full ms-10">
            {sideImages.map((img, index) => (
              <div
                key={index}
                className="flex items-center justify-center overflow-hidden border border-[var(--color-gray)] bg-[var(--color-white)] rounded-lg cursor-pointer"
                onClick={() => setShowGallery(true)}
              >
                <img
                  src={img}
                  alt={`thumb-${index}`}
                  className="w-full h-full object-contain p-1"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= MOBILE ================= */}
      <div className="lg:hidden">
        <div className="relative aspect-[4/3] flex items-center justify-center border border-[var(--color-gray)] overflow-hidden bg-[var(--color-white)] rounded-lg">
          <img
            src={mainImage}
            alt=""
            onClick={() => setShowGallery(true)}
            className="w-full h-full object-contain p-4 cursor-pointer"
          />

          {qrValue && (
            <div className="absolute bottom-3 right-3 flex flex-col items-center bg-white/80 p-1 rounded">
              <QRCode value={qrValue} size={50} />

              <span className="text-[9px] mt-1">{giTag}</span>

              <div className="flex items-center gap-1 text-[var(--color-primary)] mt-1">
                <BadgeCheck size={12} />
                <span className="text-[10px] font-medium">Verified</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ================= MODAL ================= */}
      <ImageGalleryModal
        photos={photos}
        isOpen={showGallery}
        onClose={() => setShowGallery(false)}
      />
    </div>
  );
};

export default PlaceGallery;
