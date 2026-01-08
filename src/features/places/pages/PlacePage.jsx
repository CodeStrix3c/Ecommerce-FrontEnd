import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

import Spinner from "@/components/ui/Spinner";
import AddressLink from "@/components/shared/AddressLink";
import BookingWidget from "@/features/bookings/components/BookingWidget";
import PlaceGallery from "@/features/places/components/PlaceGallery";
import PerksWidget from "@/features/perks/components/PerksWidget";
import MapBox from "@/components/ui/MapBox";
import ListingHeader from "@/components/shared/ListingHeader";
import RatingSummary from "@/features/reviews/components/Ratings";
import OverallRating from "@/features/reviews/components/OverallRating";
import Testimonials from "@/features/reviews/pages/Testimonials";
import HighlightBanner from "@/features/reviews/components/HighlightBanner";
import ExploreNearby from "../components/ExploreNearby";
import SharePopUp from "@/components/ui/SharePopUp";
import ContentWrapper from "@/components/shared/ContentWrapper";
import LoginPromptModal from "@/components/shared/LoginPromptModal";

import agriculturalOptions from "@/data/agriculturalOptions";
import { useProductsQuery } from "@/hooks/useProductsQuery";
import { useCartList } from "@/providers/CartListProvider";
import { requireLogin } from "@/utils/auth";

const PlacePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Use passed state first
  const [place, setPlace] = useState(location.state?.place || null);
  const [loading, setLoading] = useState(!place);
  const [sharePopUp, setSharePopUp] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const { data: products, isLoading: productsLoading } = useProductsQuery();
  const { toggleCartList, cartList } = useCartList();

  const isCartListed = cartList.some((item) => item._id === place._id);

  // Fallback: find product from query if not passed via state
  useEffect(() => {
    if (place || !products) return;

    setLoading(true);
    const foundPlace = products.find((p) => p._id === id);

    // optional delay for smoother UX
    setTimeout(() => {
      setPlace(foundPlace);
      setLoading(false);
    }, 400);
  }, [id, products, place]);

  /* 🔐 LOGIN GATE (POPUP, NOT REDIRECT) */

  const handleBuyNow = (quantity) => {
    requireLogin(
      () => {
        toast.success(
          `Proceeding to checkout for ${quantity} × ${place.title}`
        );
        // navigate("/checkout");
      },
      () => setShowLoginPopup(true) // pass the callback
    );
  };

  const handleAddToCart = () => {
    if (isCartListed) {
      toast.info("Item removed from cart");
    } else {
      toast.success("Item added to cart");
    }
    toggleCartList(place);
  };

  const handleShare = () => setSharePopUp(true);

  if (loading || productsLoading) return <Spinner />;
  if (!place) return <div className="p-8 text-center">Product not found</div>;

  return (
    <ContentWrapper compactScreen topSpacing>
      {/* LOGIN POPUP */}
      <LoginPromptModal
        open={showLoginPopup}
        onClose={() => setShowLoginPopup(false)}
      />

      <motion.div
        initial={false}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="overflow-x-hidden"
      >
        <ListingHeader place={place} onShare={handleShare} />

        <AddressLink placeAddress={place.address} />
        <PlaceGallery place={place} />

        <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          {/* LEFT CONTENT */}
          <div className="flex-1 space-y-8">
            <HighlightBanner />

            <section>
              <h2 className="text-2xl font-semibold text-[var(--color-black)]">
                Description
              </h2>
              <p className="mt-2 text-[var(--color-black)]/70 text-justify">
                {place.description}
              </p>

              {place.extraInfo && (
                <p className="mt-3 font-medium text-[var(--color-black)]/80">
                  Extra Info: {place.extraInfo}
                </p>
              )}

              <div className="mt-3">
                {place.inStock ? (
                  <span className="inline-block rounded-md bg-[var(--color-primary)] px-3 py-1 text-sm font-medium text-[var(--color-white)]">
                    In Stock
                  </span>
                ) : (
                  <span className="inline-block rounded-md bg-[var(--color-secondary)] px-3 py-1 text-sm font-medium text-[var(--color-white)]">
                    Out of Stock
                  </span>
                )}
              </div>
            </section>

            <PerksWidget perks={place.perks} />
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="w-full lg:w-1/3">
            <div className="sticky top-28">
              <BookingWidget
                place={place}
                onBuyNow={handleBuyNow}
                onAddToCart={handleAddToCart}
              />
            </div>
          </aside>
        </div>

        {/* MOBILE STICKY WIDGET */}
        <div className="md:hidden z-40">
          <BookingWidget
            place={place}
            onBuyNow={handleBuyNow}
            onAddToCart={handleAddToCart}
          />
        </div>

        <RatingSummary />
        <OverallRating />
        <Testimonials />

        <MapBox address={place.address} />

        <ExploreNearby
          title="Explore other popular Art & Craft products"
          options={agriculturalOptions}
        />

        {sharePopUp && (
          <SharePopUp onClose={() => setSharePopUp(false)} placeData={place} />
        )}
      </motion.div>
    </ContentWrapper>
  );
};

export default PlacePage;
