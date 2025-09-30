import React, { useRef, useState, useMemo } from "react";
import Slider from "react-slick";
import PlaceCard from "@/features/places/components/PlaceCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useIsMobile from "@/hooks/useInMobile";
import SectionTitle from "./SectionTitle";

const CarousalSection = ({ title, places, loading }) => {
  const sliderRef = useRef(null);
  const isMobile = useIsMobile();
  const [currentSlide, setCurrentSlide] = useState(0);

  const items = loading ? Array(6).fill({}) : places;
  const totalSlides = items.length;

  const settings = useMemo(
    () => ({
      dots: false,
      speed: 500,
      slidesToShow: isMobile ? 2.1 : 7,
      slidesToScroll: 1,
      arrows: false,
      infinite: false,
      beforeChange: (_, next) => setCurrentSlide(next),
      responsive: [
        { breakpoint: 400, settings: { slidesToShow: 1.1 } },
        { breakpoint: 480, settings: { slidesToShow: 2.1 } },
        { breakpoint: 768, settings: { slidesToShow: 3 } },
        { breakpoint: 1024, settings: { slidesToShow: 4 } },
        { breakpoint: 1300, settings: { slidesToShow: 5 } },
        { breakpoint: 1600, settings: { slidesToShow: 7 } },
      ],
    }),
    [isMobile]
  );

  const disablePrev = currentSlide === 0;
  const disableNext = currentSlide >= totalSlides - settings.slidesToShow;

  return (
    <div className="mt-0">
      <div className="mb-4 flex items-center justify-between">
        <SectionTitle title={title} className="mt-0" />
        {!isMobile && totalSlides > 0 && (
          <div className="flex gap-2">
            <button
              onClick={() => sliderRef.current?.slickPrev()}
              disabled={disablePrev}
              className={`rounded-full p-2 shadow bg-[var(--color-white)] hover:bg-[var(--color-white-hover)] ${
                disablePrev ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <ChevronLeft className="h-5 w-5 text-[var(--color-neutral-dark)]" />
            </button>
            <button
              onClick={() => sliderRef.current?.slickNext()}
              disabled={disableNext}
              className={`rounded-full p-2 shadow bg-[var(--color-white)] hover:bg-[var(--color-white-hover)] ${
                disableNext ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <ChevronRight className="h-5 w-5 text-[var(--color-neutral-dark)]" />
            </button>
          </div>
        )}
      </div>

      <Slider
        key={isMobile ? "mobile" : "desktop"}
        ref={sliderRef}
        {...settings}
      >
        {items.map((place, index) => (
          <div key={place._id || index} className="px-1">
            <PlaceCard place={place} loading={loading} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarousalSection;
