import React from "react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import PlaceCard from "@/features/places/components/PlaceCard";
import SectionTitle from "./SectionTitle";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useIsMobile from "@/hooks/useInMobile";

const CarouselSection = ({ title, places = [], loading }) => {
  const isMobile = useIsMobile();

  const [sliderRef, instanceRef] = useKeenSlider({
    mode: "free",
    rubberband: false,
    slides: {
      perView: 2.1,
      spacing: 8,
    },
    breakpoints: {
      "(min-width: 768px)": { slides: { perView: 4, spacing: 12 } },
      "(min-width: 1024px)": { slides: { perView: 7, spacing: 10 } },
    },
  });

  return (
    <div className="mt-0">
      <div className="mb-4 flex items-center justify-between">
        <SectionTitle title={title} />

        {!isMobile && (
          <div className="flex gap-2">
            <button
              onClick={() => instanceRef.current?.prev()}
              className="rounded-full p-2 bg-white shadow hover:bg-gray-50 transition"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => instanceRef.current?.next()}
              className="rounded-full p-2 bg-white shadow hover:bg-gray-50 transition"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      <div ref={sliderRef} className="keen-slider">
        {(loading ? Array(6).fill({}) : places).map((place, i) => (
          <div key={place._id || i} className="keen-slider__slide">
            <PlaceCard place={place} loading={loading} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouselSection;
