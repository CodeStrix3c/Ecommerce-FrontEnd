import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import Spinner from "@/components/ui/Spinner";
import AddressLink from "@/components/shared/AddressLink";
import BookingWidget from "@/features/bookings/components/BookingWidget";
import PlaceGallery from "@/features/places/components/PlaceGallery";
import PerksWidget from "@/features/perks/components/PerksWidget";
import { dummyData } from "@/data/dummyData";
import MapBox from "@/components/ui/MapBox";
import ListingHeader from "@/components/shared/ListingHeader";
import RatingSummary from "@/features/reviews/components/Ratings";
import OverallRating from "@/features/reviews/components/OverallRating";
import Testimonials from "@/features/reviews/pages/Testimonials";
import HighlightBanner from "@/features/reviews/components/HighlightBanner";
import ExploreNearby from "../components/ExploreNearby";
import SharePopUp from "@/components/ui/SharePopUp";

const PlacePage = () => {
  const { id } = useParams();
  const location = useLocation();

  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sharePopUp, setSharePopUp] = useState(false);

  const isPlacePage = /^\/place\/\w+/.test(location.pathname);

  const nearbyOptions = [
    { name: "New Delhi", href: "/new-delhi-india/stays" },
    { name: "Delhi", href: "/delhi-india/stays" },
    { name: "Lahore", href: "/lahore-pakistan/stays" },
    { name: "Jaipur", href: "/jaipur-india/stays" },
    { name: "Noida", href: "/noida-india/stays" },
    { name: "Rishikesh", href: "/rishikesh-india/stays" },
    { name: "Dehradun", href: "/dehradun-india/stays" },
    { name: "Kullu", href: "/kullu-india/stays" },
    { name: "Tehri Garhwal", href: "/tehri-garhwal-india/stays" },
  ];

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    const foundPlace = dummyData.find((p) => p._id === id);

    setTimeout(() => {
      setPlace(foundPlace);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleShare = () => setSharePopUp(true);
  if (loading) return <Spinner />;

  if (!place) {
    return <div className="p-8 text-[var(--color-black)]">Place not found</div>;
  }

  return (
    <motion.div
      initial={false}
      animate={{ maxWidth: isPlacePage ? "73vw" : "92vw" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="mt-4 overflow-x-hidden md:mt-36 lg:mt-36 mx-auto"
    >
      <ListingHeader place={place} onShare={handleShare} />
      <AddressLink placeAddress={place.address} />

      <PlaceGallery place={place} />

      <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="flex-1 space-y-8">
          <HighlightBanner />

          <section>
            <h2 className="text-2xl font-semibold text-[var(--color-black)]">
              Description
            </h2>
            <p className="mt-2 text-[var(--color-black)]/70">
              {place.description}
            </p>

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

          <PerksWidget perks={place?.perks} />
        </div>

        <aside className="hidden w-1/3 md:block">
          <div className="sticky top-28">
            <BookingWidget place={place} />
          </div>
        </aside>
      </div>

      <div className="my-8 md:hidden">
        <BookingWidget place={place} />
      </div>

      <RatingSummary />
      <OverallRating />
      <Testimonials />

      <MapBox address={place.address} />

      <ExploreNearby
        title="Explore other options in and around Gurugram"
        options={nearbyOptions}
      />
      {sharePopUp && <SharePopUp onClose={() => setSharePopUp(false)} />}
    </motion.div>
  );
};

export default PlacePage;
