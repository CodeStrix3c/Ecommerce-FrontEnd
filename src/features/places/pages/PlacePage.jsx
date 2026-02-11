import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
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
      <div className="border rounded-xl overflow-hidden bg-white">
        <button
          onClick={() => toggleSection(sectionKey)}
          className="w-full flex items-center justify-between px-4 py-3 font-semibold"
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
          <div className="px-4 pb-4 text-sm text-gray-600">{children}</div>
        )}
      </div>
    );
  };

  return (
    <ContentWrapper compactScreen topSpacing>
      <LoginPromptModal
        open={showLoginPopup}
        onClose={() => setShowLoginPopup(false)}
      />

      <motion.div className="overflow-x-hidden">
        <ListingHeader place={place} onShare={() => setSharePopUp(true)} />

        {/* Gallery */}
        <PlaceGallery place={place} />

        <div className="mt-10 flex flex-col gap-8 lg:flex-row">
          {/* LEFT */}
          <div className="flex-1 space-y-8">
            <HighlightBanner />

            <section>
              <h2 className="text-2xl font-semibold">Product Details</h2>

              <div className="mt-4 space-y-4">
                {/* PRICE */}
                <div className="border rounded-xl p-4 bg-white flex items-center gap-4 flex-wrap">
                  <span className="text-2xl font-bold text-green-700">
                    ₹{place.price}
                  </span>

                  {place.oldPrice && (
                    <span className="text-gray-400 line-through text-lg">
                      ₹{place.oldPrice}
                    </span>
                  )}

                  {place.discount > 0 && (
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-sm font-medium">
                      Save {place.discount}%
                    </span>
                  )}
                </div>

                <Accordion
                  title="Short Description"
                  sectionKey="shortDesc"
                  show={!!place.shortDescription}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: place.shortDescription,
                    }}
                  />
                </Accordion>

                <Accordion
                  title="Product Description"
                  sectionKey="description"
                  show={!!place.description}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: place.description,
                    }}
                  />
                </Accordion>

                <Accordion
                  title="Brand"
                  sectionKey="brand"
                  show={!!place.brand}
                >
                  <p>{place.brand}</p>
                </Accordion>

                <Accordion
                  title="Availability"
                  sectionKey="stock"
                  show={place.stockTracking || !place.isAllowToOrder}
                >
                  <p>
                    Status:{" "}
                    {place.inStock ? (
                      <span className="text-green-600">In Stock</span>
                    ) : (
                      <span className="text-red-500">Out of Stock</span>
                    )}
                  </p>

                  {place.stockTracking && (
                    <p>Quantity Available: {place.stock}</p>
                  )}

                  {!place.isAllowToOrder && (
                    <p className="text-red-500">
                      Ordering currently disabled
                    </p>
                  )}
                </Accordion>

                <Accordion
                  title="Product Attributes"
                  sectionKey="attributes"
                  show={place.perks && place.perks.length > 0}
                >
                  <ul className="list-disc pl-5 space-y-1">
                    {place.perks.map((attr, index) => (
                      <li key={index}>
                        <strong>{attr.name}:</strong> {attr.value}
                      </li>
                    ))}
                  </ul>
                </Accordion>
              </div>
            </section>
          </div>

          {/* RIGHT */}
          <aside className="w-full lg:w-1/3">
            <BookingWidget
              place={place}
              onBuyNow={handleBuyNow}
              onAddToCart={handleAddToCart}
            />

            <div className="mt-6 space-y-6">
              <RatingSummary />
            </div>
          </aside>
        </div>

        <Testimonials />

        <ExploreNearby
          title="Explore other popular Art & Craft products"
          options={agriculturalOptions}
        />

        {sharePopUp && (
          <SharePopUp
            onClose={() => setSharePopUp(false)}
            placeData={place}
          />
        )}
      </motion.div>
    </ContentWrapper>
  );
};

export default PlacePage;
