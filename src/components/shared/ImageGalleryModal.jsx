import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const ImageGalleryModal = ({
  photos = [],
  isOpen,
  onClose,
  startIndex = 0,
}) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(startIndex);
    }
  }, [startIndex, isOpen]);

  if (!isOpen || !photos.length) return null;

  const currentImage = photos[currentIndex];

  const goPrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? photos.length - 1 : prev - 1
    );
  };

  const goNext = () => {
    setCurrentIndex((prev) =>
      prev === photos.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col">

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 md:px-12 border-b border-gray-200 shadow-sm">

        <h2 className="text-lg font-semibold">
          Product Image ({currentIndex + 1}/{photos.length})
        </h2>

        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <X className="h-5 w-5" />
        </button>

      </div>

      {/* Image Area */}
      <div className="flex-1 overflow-hidden p-4 relative flex items-center justify-center">

        {/* Prev */}
        {photos.length > 1 && (
          <button
            onClick={goPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2 hover:bg-gray-100 z-10"
          >
            <ChevronLeft />
          </button>
        )}

        {/* IMAGE WITHOUT MAGNIFIER */}
        <img
          src={currentImage}
          alt="Product"
          draggable={false}
          className="max-w-full max-h-[85vh] object-contain select-none"
        />

        {/* Next */}
        {photos.length > 1 && (
          <button
            onClick={goNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2 hover:bg-gray-100 z-10"
          >
            <ChevronRight />
          </button>
        )}

      </div>

    </div>
  );
};

export default ImageGalleryModal;
