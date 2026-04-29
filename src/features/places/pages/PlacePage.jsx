import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

import Spinner from "@/components/ui/Spinner";
import BookingWidget from "@/features/bookings/components/BookingWidget";
import PlaceGallery from "@/features/places/components/PlaceGallery";
import ListingHeader from "@/components/shared/ListingHeader";
import ContentWrapper from "@/components/shared/ContentWrapper";
import { useCartList } from "@/providers/CartListProvider";
import {
  useProductDetailsQuery,
  useProductsQuery,
} from "@/hooks/useProductsQuery";
import ProductInfoPanel from "../components/ProductInfoPanel";
import Testimonials from "@/features/reviews/pages/Testimonials";
import YouMayAlsoLike from "../components/YouMayAlsoLike";
import CrossSellProducts from "../components/CrossSellProducts";
import GiftPackagingModal from "../models/GiftPackagingModal";

const ZOOM_LEVEL = 3;

const PlacePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: product, isLoading } = useProductDetailsQuery(id);
  const { data: productsData } = useProductsQuery({ page: 1 });
  const [selectedPackage, setSelectedPackage] = useState(null);

  const [place, setPlace] = useState(null);
  const [giftModalOpen, setGiftModalOpen] = useState(false);

  const { toggleCartList } = useCartList();

  const [openSections, setOpenSections] = useState({
    shortDesc: false,
    description: false,
    attributes: false,
    brand: false,
    stock: false,
  });

  const imageRef = useRef(null);
  const rightColRef = useRef(null);
  const hasMovedRef = useRef(false);
  const zoomPanelRef = useRef(null);
  const rightPanelRef = useRef(null);

  const [showZoom, setShowZoom] = useState(false);
  const [zoomImage, setZoomImage] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const scrollRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowZoom(false);
      hasMovedRef.current = false;
      if (rightPanelRef.current) {
        rightPanelRef.current.style.opacity = "1";
        rightPanelRef.current.style.pointerEvents = "auto";
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;
    container.scrollBy({
      left: direction === "left" ? -300 : 300,
      behavior: "smooth",
    });
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
    if (rightPanelRef.current) {
      rightPanelRef.current.style.opacity = "1";
      rightPanelRef.current.style.pointerEvents = "auto";
    }
  };

  const handleMouseMove = (e) => {
    if (!imageRef.current || !rightColRef.current) return;

    const imgRect = imageRef.current.getBoundingClientRect();

    if (
      e.clientX < imgRect.left ||
      e.clientX > imgRect.right ||
      e.clientY < imgRect.top ||
      e.clientY > imgRect.bottom
    ) {
      setShowZoom(false);
      if (rightPanelRef.current) {
        rightPanelRef.current.style.opacity = "1";
        rightPanelRef.current.style.pointerEvents = "auto";
      }
      return;
    }

    const rightRect = rightColRef.current.getBoundingClientRect();

    const panelTop = imgRect.top;
    const panelLeft = rightRect.left;
    const panelWidth = rightRect.width;
    const panelHeight = imgRect.height;

    const x = Math.max(0, Math.min(e.clientX - imgRect.left, imgRect.width));
    const y = Math.max(0, Math.min(e.clientY - imgRect.top, imgRect.height));

    const bgX = (x / imgRect.width) * (imgRect.width * ZOOM_LEVEL - panelWidth);
    const bgY =
      (y / imgRect.height) * (imgRect.height * ZOOM_LEVEL - panelHeight);

    const bgPos = `-${bgX}px -${bgY}px`;
    const bgSize = `${imgRect.width * ZOOM_LEVEL}px ${imgRect.height * ZOOM_LEVEL}px`;

    if (!hasMovedRef.current) {
      hasMovedRef.current = true;

      if (zoomPanelRef.current) {
        zoomPanelRef.current.style.top = `${panelTop}px`;
        zoomPanelRef.current.style.left = `${panelLeft}px`;
        zoomPanelRef.current.style.width = `${panelWidth}px`;
        zoomPanelRef.current.style.height = `${panelHeight}px`;
        zoomPanelRef.current.style.backgroundSize = bgSize;
        zoomPanelRef.current.style.backgroundPosition = bgPos;
      }

      setShowZoom(true);

      if (rightPanelRef.current) {
        rightPanelRef.current.style.opacity = "0";
        rightPanelRef.current.style.pointerEvents = "none";
      }
      return;
    }

    if (zoomPanelRef.current) {
      zoomPanelRef.current.style.top = `${panelTop}px`;
      zoomPanelRef.current.style.left = `${panelLeft}px`;
      zoomPanelRef.current.style.width = `${panelWidth}px`;
      zoomPanelRef.current.style.height = `${panelHeight}px`;
      zoomPanelRef.current.style.backgroundSize = bgSize;
      zoomPanelRef.current.style.backgroundPosition = bgPos;
    }
  };

  const toggleSection = (key) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const [popularRef, popularInstanceRef] = useKeenSlider({
    mode: "free",
    rubberband: false,
    slides: {
      perView: 2.2,
      spacing: 10,
    },
    breakpoints: {
      "(min-width: 640px)": {
        slides: { perView: 3.2, spacing: 12 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 4.2, spacing: 14 },
      },
    },
  });

  useEffect(() => {
    popularInstanceRef.current?.update();
  }, [productsData]);

  useEffect(() => {
    if (!product) return;

    const images =
      product.images
        ?.map((img) => img.url || img.thumbnailUrl)
        .filter(Boolean) ?? [];

    setPlace({
      _id: product.id,
      title: product.name,
      description: product.description,
      shortDescription: product.shortDescription,
      specification: product.specification ?? null,
      weight: product.weight ?? null,
      dimensions: product.dimensions ?? null,
      price: product.calculatedProductPrice?.price ?? 0,
      oldPrice: product.calculatedProductPrice?.oldPrice ?? null,
      discount: product.calculatedProductPrice?.percentOfSaving ?? 0,
      rating: product.ratingAverage ?? 0,
      reviewsCount: product.reviewsCount ?? 0,
      stock: product.stockQuantity ?? 0,
      inStock: product.stockQuantity > 0,
      stockQuantity: product.stockQuantity,
      brand: product.brand?.name || null,
      perks: product.attributes ?? [],
      attributes: product.attributes ?? [],
      photos: images,
      images: product.images ?? [],
    });

    setSelectedPhoto(null);
  }, [product]);

  if (isLoading || !place) return <Spinner />;

  const productsList = productsData?.products || [];

  const popularItems = productsList
    .filter((p) => String(p.id) !== String(id))
    .slice(0, 10)
    .map((p) => {
      const imgPath =
        p.thumbnailUrl || p.images?.[0]?.thumbnailUrl || p.images?.[0]?.url;
      if (!imgPath) return null;
      return { id: p.id, title: p.name, image: imgPath };
    })
    .filter(Boolean);

  return (
    <ContentWrapper>
      <div className="pt-6 lg:pt-10 pb-6 lg:pb-8 relative">
        <ListingHeader place={place} />

        <div className="mt-10 flex flex-col gap-8 lg:flex-row relative">
          {/* LEFT — gallery */}
          <div className="lg:w-4/7 w-full ps-2 relative">
            <PlaceGallery
              place={place}
              zoomRef={imageRef}
              onZoomEnter={handleMouseEnter}
              onZoomLeave={handleMouseLeave}
              onZoomMove={handleMouseMove}
              onPhotoChange={(photo) => {
                setSelectedPhoto(photo);
                setZoomImage(photo);
              }}
            />
          </div>

          {/* RIGHT */}
          <div ref={rightColRef} className="lg:w-2/7 w-full relative z-10">
            <div
              ref={rightPanelRef}
              className="space-y-4 transition-opacity duration-200"
              style={{ opacity: 1 }}
            >
              <ProductInfoPanel
                place={place}
                openSections={openSections}
                toggleSection={toggleSection}
              />
              <div className="relative">
                <button
                  onClick={() => setGiftModalOpen(true)}
                  className="group flex items-center justify-between w-full p-4 text-sm border rounded-xl bg-gray-50/50 border-gray-100 hover:border-black hover:bg-white transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${selectedPackage ? "bg-black text-white" : "bg-white text-gray-400 border border-dashed border-gray-300"}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 12v10H4V12" />
                        <path d="M2 7h20v5H2z" />
                        <path d="M12 22V7" />
                        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                      </svg>
                    </div>

                    <div className="text-left">
                      <p className="font-bold text-gray-900">
                        {selectedPackage
                          ? selectedPackage.name
                          : "Add Gift Packaging"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {selectedPackage
                          ? `${selectedPackage.occasion} • +₹${selectedPackage.price}`
                          : "Make it special with premium wrapping"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* THE REMOVE BUTTON */}
                    {selectedPackage && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevents opening the modal
                          setSelectedPackage(null);
                        }}
                        className="px-3 py-1 text-[10px] font-bold uppercase tracking-tighter text-red-500 hover:bg-red-50 rounded-md transition-colors"
                      >
                        Remove
                      </button>
                    )}

                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-black transition-colors">
                      {selectedPackage ? "Edit" : "Add"}
                    </span>
                  </div>
                </button>
              </div>
              <BookingWidget place={place} />
            </div>
          </div>

          {/* ZOOM PANEL */}
          {showZoom && zoomImage && (
            <div
              ref={zoomPanelRef}
              className="hidden lg:block fixed z-30 bg-white border shadow-2xl rounded-lg overflow-hidden pointer-events-none"
              style={{
                backgroundImage: `url(${zoomImage})`,
                backgroundRepeat: "no-repeat",
              }}
            />
          )}
        </div>

        <YouMayAlsoLike
          products={product.relatedProducts?.filter((p) => p.id !== product.id)}
        />

        <CrossSellProducts products={product.crossSellProducts} />

        <div className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recently Viewed Products</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => scroll("left")}
                className="p-2 rounded-full border border-[var(--color-gray)] hover:bg-[var(--color-black-hover)] transition"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => scroll("right")}
                className="p-2 rounded-full border border-[var(--color-gray)] hover:bg-[var(--color-black-hover)] transition"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth"
          >
            {popularItems.map((item) => (
              <div
                key={item.id}
                className="w-[160px] sm:w-[180px] lg:w-[200px] flex-shrink-0 cursor-pointer"
                onClick={() => navigate(`/place/${item.id}`)}
              >
                <div className="w-full h-56 sm:h-64 lg:h-72 rounded-xl overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <p className="mt-2 text-sm font-medium line-clamp-1">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        <Testimonials />
      </div>

      <GiftPackagingModal
        isOpen={giftModalOpen}
        onClose={() => setGiftModalOpen(false)}
        place={place}
        onSelectPackage={setSelectedPackage} // New Prop
        currentSelection={selectedPackage} // To keep the radio highlighted
      />
    </ContentWrapper>
  );
};

export default PlacePage;
