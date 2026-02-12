import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ChevronDown } from "lucide-react";

import Spinner from "@/components/ui/Spinner";
import BookingWidget from "@/features/bookings/components/BookingWidget";
import PlaceGallery from "@/features/places/components/PlaceGallery";
import ListingHeader from "@/components/shared/ListingHeader";
import RatingSummary from "@/features/reviews/components/Ratings";
import Testimonials from "@/features/reviews/pages/Testimonials";
import HighlightBanner from "@/features/reviews/components/HighlightBanner";
import ExploreNearby from "../components/ExploreNearby";
import SharePopUp from "@/components/ui/SharePopUp";
import ContentWrapper from "@/components/shared/ContentWrapper";
import LoginPromptModal from "@/components/shared/LoginPromptModal";
import agriculturalOptions from "@/data/agriculturalOptions";

import { useCartList } from "@/providers/CartListProvider";
import { requireLogin } from "@/utils/auth";
import { useProductDetailsQuery } from "@/hooks/useProductsQuery";
import ProductInfoPanel from "../components/ProductInfoPanel";
import QuantitySelector from "@/components/shared/QuantitySelector";

const IMAGE_BASE_URL =
  "https://zirat-adminapp-gfd0hmfwefc3gmgc.centralindia-01.azurewebsites.net";

const PlacePage = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useProductDetailsQuery(id);

  const [place, setPlace] = useState(null);
  const [sharePopUp, setSharePopUp] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const [openSections, setOpenSections] = useState({
    shortDesc: false,
    description: false,
    attributes: false,
    brand: false,
    stock: false,
  });

  const toggleSection = (key) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const { toggleCartList } = useCartList();

  useEffect(() => {
    if (!product || place) return;

    const images =
      product.images
        ?.flatMap((img) => [img.url, img.thumbnailUrl])
        .filter(Boolean)
        .map((path) =>
          path.startsWith("http") ? path : `${IMAGE_BASE_URL}${path}`
        ) ?? [];

    setPlace({
      _id: product.id,
      title: product.name,
      description: product.description,
      shortDescription: product.shortDescription,

      price: product.calculatedProductPrice?.price ?? 0,
      oldPrice: product.calculatedProductPrice?.oldPrice ?? null,
      discount: product.calculatedProductPrice?.percentOfSaving ?? 0,

      rating: product.ratingAverage ?? 0,
      reviewsCount: product.reviewsCount ?? 0,

      stock: product.stockQuantity ?? 0,
      stockTracking: product.stockTrackingIsEnabled,
      inStock: product.stockTrackingIsEnabled
        ? product.stockQuantity > 0
        : true,

      isAllowToOrder: product.isAllowToOrder,
      brand: product.brand?.name || null,
      perks: product.attributes ?? [],
      photos: images,
      raw: product,
    });
  }, [product, place]);

  if (isLoading || !place) return <Spinner />;

  const handleBuyNow = (quantity) => {
    requireLogin(
      () =>
        toast.success(
          `Proceeding to checkout for ${quantity} × ${place.title}`
        ),
      () => setShowLoginPopup(true)
    );
  };

  const handleAddToCart = () => {
    toggleCartList(place);
    toast.success("Cart updated");
  };

  const Accordion = ({ title, sectionKey, children, show }) => {
    if (!show) return null;

    return (
      <div className="border border-[var(--color-gray)] rounded-xl overflow-hidden bg-[var(--color-white)]">
        <button
          onClick={() => toggleSection(sectionKey)}
          className="w-full flex items-center justify-between px-4 py-3 font-semibold text-[var(--color-black)]"
        >
          {title}
          <ChevronDown
            size={18}
            className={`transition-transform ${
              openSections[sectionKey] ? "rotate-180" : ""
            }`}
          />
        </button>

        {openSections[sectionKey] && (
          <div className="px-4 pb-4 text-sm text-[var(--color-black)]">
            {children}
          </div>
        )}
      </div>
    );
  };

  return (
    
    <ContentWrapper>
      <div className="pt-6 lg:pt-10 pb-20 lg:pb-32">  

        {/* Header */}
        <ListingHeader place={place} onShare={() => setSharePopUp(true)} />

        {/* Gallery */}
     <div className="mt-10 flex flex-col-2 gap-8 lg:flex-row">


  <div className="lg:w-4/7 w-full h-full ps-2">
    <PlaceGallery place={place} />
  </div>

 
  <div className="lg:w-2/7 w-full space-y-4">
  <ProductInfoPanel
    place={place}
    openSections={openSections}
    toggleSection={toggleSection}
  />

  <BookingWidget  place={place}/>
   </div>

     
          
      </div>

      <div className="mt-4 sm:mt-6 px-3 sm:px-0">
  <HighlightBanner />
</div>

    </div>
    </ContentWrapper>

      
  );
};

export default PlacePage;
