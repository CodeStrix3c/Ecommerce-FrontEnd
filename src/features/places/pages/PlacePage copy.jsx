import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import Spinner from "@/components/ui/Spinner";
import BookingWidget from "@/features/bookings/components/BookingWidget";
import EcommerceGiftModal from "@/components/EcommerceGiftModal";
import PlaceGallery from "@/features/places/components/PlaceGallery";
import ListingHeader from "@/components/shared/ListingHeader";
import ContentWrapper from "@/components/shared/ContentWrapper";
import { useCartList } from "@/providers/CartListProvider";
import {
  useProductDetailsQuery,
  useProductsQuery,
} from "@/hooks/useProductsQuery";
import ProductInfoPanel from "../components/ProductInfoPanel";

const ZOOM_LEVEL = 3;
const PlacePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, isLoading } = useProductDetailsQuery(id);
  const { data: productsData } = useProductsQuery({ page: 1 });
  const [place, setPlace] = useState(null);
 const [selectedPackage, setSelectedPackage] = useState(null);
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false);
 const { toggleCartList } = useCartList();
const [openSections, setOpenSections] = useState({
    shortDesc: false,
    description: false,
    attributes: false,
    brand: false,
    stock: false,
  });

  const imageRef    = useRef(null);
  const rightColRef = useRef(null);
  const hasMovedRef = useRef(false);
  const zoomPanelRef = useRef(null);
  const rightPanelRef = useRef(null);

  const [showZoom, setShowZoom]     = useState(false);
  const [zoomImage, setZoomImage]   = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const scrollRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowZoom(false);
      hasMovedRef.current = false;
      if (rightPanelRef.current) {
        rightPanelRef.current.style.opacity      = "1";
        rightPanelRef.current.style.pointerEvents = "auto";
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;
    container.scrollBy({ left: direction === "left" ? -300 : 300, behavior: "smooth" });
  };

  const handleMouseEnter = () => {
    if (!place?.photos?.length) return;
    if (window.innerWidth < 1024) return;
    hasMovedRef.current = false;
    setZoomImage(selectedPhoto || place.photos[0]);
  };

  const handleMouseLeave = () => {
    hasMovedRef.current = false;
    setShowZoom(false);
  };

  const handleMouseMove = (e) => {
    if (!imageRef.current || !rightColRef.current) return;
    const imgRect = imageRef.current.getBoundingClientRect();
    if (
      e.clientX < imgRect.left || e.clientX > imgRect.right ||
      e.clientY < imgRect.top  || e.clientY > imgRect.bottom
    ) { setShowZoom(false); return; }

    const rightRect  = rightColRef.current.getBoundingClientRect();
    const panelWidth  = rightRect.width;
    const panelHeight = imgRect.height;

    const x = Math.max(0, Math.min(e.clientX - imgRect.left, imgRect.width));
    const y = Math.max(0, Math.min(e.clientY - imgRect.top,  imgRect.height));

    const bgX = (x / imgRect.width)  * (imgRect.width  * ZOOM_LEVEL - panelWidth);
    const bgY = (y / imgRect.height) * (imgRect.height * ZOOM_LEVEL - panelHeight);

    if (zoomPanelRef.current) {
      zoomPanelRef.current.style.top            = `${imgRect.top}px`;
      zoomPanelRef.current.style.left           = `${rightRect.left}px`;
      zoomPanelRef.current.style.width          = `${panelWidth}px`;
      zoomPanelRef.current.style.height         = `${panelHeight}px`;
      zoomPanelRef.current.style.backgroundSize = `${imgRect.width * ZOOM_LEVEL}px ${imgRect.height * ZOOM_LEVEL}px`;
      zoomPanelRef.current.style.backgroundPosition = `-${bgX}px -${bgY}px`;
    }
    setShowZoom(true);
  };

  const toggleSection = (key) =>
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

  const [popularRef, popularInstanceRef] = useKeenSlider({
    slides: { perView: 2.2, spacing: 10 },
  });

  useEffect(() => {
    popularInstanceRef.current?.update();
  }, [productsData]);

  
  useEffect(() => {
    if (!product) return;
    const images = product.images?.map((img) => img.url || img.thumbnailUrl) ?? [];
    setPlace({
      _id:    product.id,
      title:  product.name,
      price:  product.calculatedProductPrice?.price ?? 0,
      photos: images,
    });
    setSelectedPhoto(null);
  
  }, [product]);

  if (isLoading || !place) return <Spinner />;

  return (
    <ContentWrapper>
      <ListingHeader place={place} />


      <div className="flex gap-8 items-start">
        <PlaceGallery place={place} zoomRef={imageRef} />

        
        <div ref={rightColRef} className="w-full flex flex-col gap-3">
          <ProductInfoPanel
            place={place}
            openSections={openSections}
            toggleSection={toggleSection}
          />

          {/* Open gift modal */}
          <button
            onClick={() => setIsGiftModalOpen(true)}
            className="w-full py-3 bg-black text-white rounded-lg font-medium"
          >
            Select Packaging
          </button>

          
          {selectedPackage && (
            <p className="text-sm text-green-600 font-medium">
              ✓ {selectedPackage.name} (+₹{selectedPackage.price})
            </p>
          )}

       
          <BookingWidget
            place={place}
            selectedPackage={selectedPackage}
          />
        </div>
      </div>

      {/* Gift packaging modal */}
      <EcommerceGiftModal
        isOpen={isGiftModalOpen}
        onClose={() => setIsGiftModalOpen(false)}
        place={place}
        currentSelection={selectedPackage}
        onSelectPackage={(pkg) => setSelectedPackage({ ...pkg })}
      />
    </ContentWrapper>
  );
};

export default PlacePage;