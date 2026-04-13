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

const ZOOM_LEVEL = 3;

const PlacePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: product, isLoading } = useProductDetailsQuery(id);
  const { data: productsData } = useProductsQuery({ page: 1 });

  const [place, setPlace] = useState(null);

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
    // Do NOT show zoom yet — wait for first mousemove
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

    // Correct formula: map cursor ratio to zoomed image offset
    // so the point under the cursor is centered in the zoom panel
    const bgX = (x / imgRect.width) * (imgRect.width * ZOOM_LEVEL - panelWidth);
    const bgY =
      (y / imgRect.height) * (imgRect.height * ZOOM_LEVEL - panelHeight);

    const bgPos = `-${bgX}px -${bgY}px`;
    const bgSize = `${imgRect.width * ZOOM_LEVEL}px ${imgRect.height * ZOOM_LEVEL}px`;

    if (!hasMovedRef.current) {
      hasMovedRef.current = true;

      // Write position directly to DOM before making panel visible
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

    // Subsequent moves — update DOM directly, zero React overhead
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
      inStock: product.stockTrackingIsEnabled
        ? product.stockQuantity > 0
        : true,
      brand: product.brand?.name || null,
      perks: product.attributes ?? [],
      photos: images,
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
              <BookingWidget place={place} />
            </div>
          </div>

          {/* ZOOM PANEL — position/size set via ref, never stale */}
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
    </ContentWrapper>
  );
};

export default PlacePage;
