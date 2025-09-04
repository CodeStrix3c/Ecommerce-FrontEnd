import React, { useRef } from "react";
import Slider from "react-slick";
import PlaceCard from "@/features/places/components/PlaceCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useIsMobile from "@/hooks/useInMobile";
import SectionTitle from "./SectionTitle";

const CarousalSection = ({ title, places, loading }) => {
  const sliderRef = useRef(null);
  const isMobile = useIsMobile();

  const settings = {
    dots: false,
    // infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1300,
        settings: { slidesToShow: 5 },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2.1,
          slidesToScroll: 1,
          infinite: false,
          centerMode: false,
        },
      },
    ],
  };

  return (
    <div className="mt-0">
      <div className="mx-auto mb-4 flex max-w-screen-xl items-center justify-between px-2 sm:px-0">
        <SectionTitle title={title} className="mt-0" />
        {!isMobile && (
          <div className="flex gap-2">
            <button
              onClick={() => sliderRef.current.slickPrev()}
              className="rounded-full bg-white p-2 shadow hover:bg-gray-100"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => sliderRef.current.slickNext()}
              className="rounded-full bg-white p-2 shadow hover:bg-gray-100"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      <Slider ref={sliderRef} {...settings}>
        {(loading ? Array(6).fill({}) : places).map((place, index) => (
          <div key={place._id || index} className="px-2">
            <PlaceCard place={place} loading={true} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarousalSection;
