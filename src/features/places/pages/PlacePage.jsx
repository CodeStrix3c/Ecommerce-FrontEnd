import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Spinner from '@/components/ui/Spinner';
import AddressLink from '@/components/shared/AddressLink';
import BookingWidget from '@/features/bookings/components/BookingWidget';
import PlaceGallery from '@/features/places/components/PlaceGallery';
import PerksWidget from '@/features/perks/components/PerksWidget';
import { dummyData } from '@/data/dummyData';
import MapBox from '@/components/ui/MapBox';
import ListingHeader from '@/components/shared/ListingHeader';
import RatingSummary from '@/features/reviews/components/Ratings';
import OverallRating from '@/features/reviews/components/OverallRating';
import Testimonials from '@/features/reviews/pages/Testimonials';

const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(false);

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
    return <div className="p-8">Place not found</div>;
  }

  return (
    <div className="mt-4 overflow-x-hidden">
      <ListingHeader title={place.title} />
      {/* <h1 className="text-3xl">{place.title}</h1> */}

      <AddressLink placeAddress={place.address} />
      <PlaceGallery place={place} />

      <div className="mb-8 mt-8 grid grid-cols-1 gap-8 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="text-2xl font-semibold">Description</h2>
            {place.description}
          </div>
          <div className="mt-2">
            {place.inStock ? (
              <span className="rounded bg-green-200 px-2 py-1">In Stock</span>
            ) : (
              <span className="rounded bg-red-200 px-2 py-1">Out of Stock</span>
            )}
          </div>

          <PerksWidget perks={place?.perks} />
        </div>
        <div>
          <BookingWidget place={place} />
        </div>
      </div>

      <div className="-mx-8 border-t bg-white  py-8">
        <h2 className="mt-4 text-2xl font-semibold">Extra Info</h2>
        <div className="mb-4 mt-2 text-sm leading-5 text-gray-700">
          {place.extraInfo}
        </div>
      </div>
      <RatingSummary />
      <OverallRating />
      <Testimonials />
      <MapBox address={place.address} />
    </div>
  );
};

export default PlacePage;
