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

  // Extract GI Tag from perks
  // const giTag = useMemo(() => {
  //   if (!place?.perks) return null;

  //   const giAttr = place.perks.find((perk) =>
  //     perk?.name?.toLowerCase().includes("gi")
  //   );

  //   return giAttr?.value || null;
  // }, [place.perks]);

  // Static GI Tag
const giTag = "IICT-GI-2EKEKJN";

const qrValue = "https://iictsrinagarcarpet-gi.org/verify/4140NUYRNNAHNHKYNH2";
  // QR link → GI details page
//  const qrValue = `${window.location.origin}/gi-details/${place._id}`;



  if (!photos.length) return null;

  return (
    <div className="relative">
 
      <div className="hidden lg:grid grid-cols-2 gap-6 h-[400px] py-2">
        
      
        <div className="relative flex items-center justify-center overflow-hidden border border-gray-200">
          <img
            src={photos[0]}
            alt=""
            onClick={() => setShowGallery(true)}
            className="max-h-full max-w-full object-contain cursor-pointer"
          />

      
          {qrValue && (
  <div className="absolute bottom-3 right-3 flex flex-col items-center">
    <QRCode value={qrValue} size={70} />

    <span className="text-[9px] text-gray-400 mt-1">{giTag}</span>

    <div className="flex items-center gap-1 text-green-600 mt-1">
      <BadgeCheck size={12} />
      <span className="text-[10px] font-medium">Verified</span>
    </div>
  </div>
)}

        </div>
         </div>

    
<div className="lg:hidden">
  <div className="relative flex items-center justify-center h-[300px] border border-gray-200 overflow-hidden">
    <img
      src={photos[0]}
      alt=""
      onClick={() => setShowGallery(true)}
      className="max-h-full max-w-full object-contain cursor-pointer"
    />

    {qrValue && (
      <div className="absolute bottom-3 right-3 flex flex-col items-center">
        <QRCode value={qrValue} size={50} />

        <span className="text-[9px] text-gray-400 mt-1">{giTag}</span>

        <div className="flex items-center gap-1 text-green-600 mt-1">
          <BadgeCheck size={12} />
          <span className="text-[10px] font-medium">Verified</span>
        </div>
      </div>
    )}
  </div>
</div>


      {/* Gallery Modal */}
      <ImageGalleryModal
        photos={place.photos}
        isOpen={showGallery}
        onClose={() => setShowGallery(false)}
      />
    </div>
  );
};


export default PlaceGallery;
