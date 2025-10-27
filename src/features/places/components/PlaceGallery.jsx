import ImageGalleryModal from "@/components/shared/ImageGalleryModal";
import React, { useState } from "react";

const PlaceGallery = ({ place }) => {
  const [showGallery, setShowGallery] = useState(false);

  return (
    <div className="relative">
      <div className="hidden h-[400px] max-h-[450px] grid-cols-4 gap-2 overflow-hidden rounded-[12px] md:grid">
        <div className="col-span-2 overflow-hidden">
          {place.photos?.[0] && (
            <div className="h-full w-full overflow-hidden bg-[var(--color-black-hover)]">
              <img
                onClick={() => setShowGallery(true)}
                className="h-full w-full cursor-pointer object-cover"
                src={place.photos[0]}
                alt=""
              />
            </div>
          )}
        </div>
        <div className="col-span-1 overflow-hidden">
          <div className="grid h-full grid-rows-2 gap-2">
            {place.photos?.[1] && (
              <div className="bg-[var(--color-black-hover)]">
                <img
                  onClick={() => setShowGallery(true)}
                  className="h-full w-full cursor-pointer object-cover"
                  src={place.photos[1]}
                  alt=""
                />
              </div>
            )}
            {place.photos?.[2] && (
              <div className="bg-[var(--color-black-hover)]">
                <img
                  onClick={() => setShowGallery(true)}
                  className="h-full w-full cursor-pointer object-cover"
                  src={place.photos[2]}
                  alt=""
                />
              </div>
            )}
          </div>
        </div>
        <div className="col-span-1 overflow-hidden">
          <div className="grid h-full grid-rows-2 gap-2">
            {place.photos?.[3] && (
              <div className="h-full bg-[var(--color-black-hover)]">
                <img
                  onClick={() => setShowGallery(true)}
                  className="h-full w-full cursor-pointer object-cover"
                  src={place.photos[3]}
                  alt=""
                />
              </div>
            )}
            {place.photos?.[4] && (
              <div className="h-full bg-[var(--color-black-hover)]">
                <img
                  onClick={() => setShowGallery(true)}
                  className="h-full w-full cursor-pointer object-cover"
                  src={place.photos[4]}
                  alt=""
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto rounded-[12px] md:hidden scroll-smooth snap-x snap-mandatory">
        {place.photos?.slice(0, 5).map((photo, index) => (
          <div
            key={index}
            className="relative min-w-[85%] snap-start flex-shrink-0 overflow-hidden rounded-[10px] bg-[var(--color-black-hover)]"
            onClick={() => setShowGallery(true)}
          >
            <img
              src={photo}
              alt={`Photo ${index + 1}`}
              className="h-52 w-full cursor-pointer object-cover"
            />

            {index === 4 && place.photos.length > 5 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-lg font-medium">
                +{place.photos.length - 5} more
              </div>
            )}
          </div>
        ))}
      </div>

      {place.photos?.length > 0 && (
        <button
          className="absolute bottom-2 right-2 flex items-center gap-1 rounded-lg bg-[var(--color-white)] 
             py-1 px-2 text-[10px] 
             sm:py-1.5 sm:px-3 sm:text-xs 
             md:py-2 md:px-4 md:text-sm 
             lg:py-2.5 lg:px-5 lg:text-base
             border border-[var(--color-black-hover)] "
  onClick={() => setShowGallery(true)}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-5 w-5 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 text-[var(--color-black)]"
  >
    <path
      fillRule="evenodd"
      d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
      clipRule="evenodd"
    />
  </svg>
  <span className=" xs:inline sm:inline">Show all photos</span>
</button>

      )}

      <ImageGalleryModal
        photos={place.photos || []}
        isOpen={showGallery}
        onClose={() => setShowGallery(false)}
      />
    </div>
  );
};

export default PlaceGallery;
