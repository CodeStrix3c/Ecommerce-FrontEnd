import React from "react";
import { X } from "lucide-react";
import ZoomControls from "@/components/shared/ZoomControls";

const ImageGalleryModal = ({ photos = [], isOpen, onClose }) => {
  if (!isOpen || !photos.length) return null;

  const firstImage = photos[0];

  return (
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 md:px-12 border-b border-gray-200 shadow-sm">
        <h2 className="text-lg font-semibold">Product Image</h2>

        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Image Area */}
      <div className="flex-1 overflow-hidden p-4">
        <ZoomControls className="w-full h-full">
          <img
            src={firstImage}
            alt="Product"
            draggable={false}
            className="w-full h-full object-contain select-none"
          />
        </ZoomControls>
      </div>
    </div>
  );
};

export default ImageGalleryModal;
