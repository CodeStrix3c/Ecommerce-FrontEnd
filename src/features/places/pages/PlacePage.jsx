import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(false);

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

  if (loading) {
    return <Spinner />;
  }

  if (!place) {
    return (
      <div className="p-8 text-[var(--color-neutral-dark)]">
        Place not found
      </div>
    );
  }

  return (
    <div className="mt-4 overflow-x-hidden md:mt-36 lg:mt-36">
      <ListingHeader place={place} />
      <AddressLink placeAddress={place.address} />
      <PlaceGallery place={place} />

      <div className="mt-10">
        <HighlightBanner />
      </div>

      <div className="mb-8 mt-8 grid grid-cols-1 gap-8 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="text-2xl font-semibold text-[var(--color-neutral-dark)]">
              Description
            </h2>
            <p className="mt-2 text-[var(--color-neutral-dark-hover)]">
              {place.description}
            </p>
          </div>

          <div className="mt-2">
            {place.inStock ? (
              <span className="rounded bg-[var(--color-primary)] px-2 py-1 text-[var(--color-white)]">
                In Stock
              </span>
            ) : (
              <span className="rounded bg-[var(--color-accent)] px-2 py-1 text-[var(--color-white)]">
                Out of Stock
              </span>
            )}
          </div>

          <PerksWidget perks={place?.perks} />
        </div>

        <div>
          <BookingWidget place={place} />
        </div>
      </div>

      <RatingSummary />
      <OverallRating />
      <Testimonials />

      <MapBox address={place.address} />
      <ExploreNearby
        title="Explore other options in and around Gurugram"
        options={nearbyOptions}
      />
    </div>
  );
};

export default PlacePage;
