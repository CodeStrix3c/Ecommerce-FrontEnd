import React, { useRef, useState, useMemo, useEffect } from "react";
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
      speed: 450,
      cssEase: "cubic-bezier(.25,.8,.25,1)",
      slidesToShow: isMobile ? 2.1 : 7,
      slidesToScroll: 1,
      swipeToSlide: true,
      touchMove: true,
      touchThreshold: 5,
      arrows: false,
      infinite: false,
      lazyLoad: "ondemand",
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
  const disableNext =
    currentSlide >= totalSlides - Math.ceil(isMobile ? 2.1 : 7);

  useEffect(() => {
    const listEl = sliderRef.current?.innerSlider?.list;
    if (!listEl) return;

    let startX = 0;
    let startTime = 0;

    const getClientX = (e) => {
      if (e.touches && e.touches[0]) return e.touches[0].clientX;
      if (e.changedTouches && e.changedTouches[0])
        return e.changedTouches[0].clientX;
      return e.clientX;
    };

    const onPointerDown = (e) => {
      startX = getClientX(e);
      startTime = performance.now();
    };

    const onPointerUp = (e) => {
      const endX = getClientX(e);
      const deltaX = endX - startX;
      const dt = performance.now() - startTime;
      const absDelta = Math.abs(deltaX);

      if (absDelta < 10 || dt <= 0) return;

      const slideEl = listEl.querySelector(".slick-slide");
      const slideWidth = slideEl
        ? slideEl.getBoundingClientRect().width
        : listEl.clientWidth / (isMobile ? 2.1 : 7);

      const velocity = absDelta / dt;

      const distanceSlides = Math.max(
        1,
        Math.round(absDelta / Math.max(1, slideWidth))
      );

      // if swipe is fast, amplify slides to move
      // tweak thresholds/multiplier as needed
      const multiplier = velocity > 0.8 ? 2 : velocity > 0.5 ? 1.5 : 1;
      const slidesToMove = Math.min(
        totalSlides,
        Math.max(1, Math.round(distanceSlides * multiplier))
      );

      if (slidesToMove <= 1) return;

      const direction = deltaX < 0 ? 1 : -1;
      const target = Math.max(
        0,
        Math.min(totalSlides - 1, currentSlide + direction * slidesToMove)
      );

      sliderRef.current?.slickGoTo(target);
    };

    listEl.addEventListener("pointerdown", onPointerDown);
    listEl.addEventListener("pointerup", onPointerUp);
    listEl.addEventListener("touchstart", onPointerDown, { passive: true });
    listEl.addEventListener("touchend", onPointerUp);

    return () => {
      listEl.removeEventListener("pointerdown", onPointerDown);
      listEl.removeEventListener("pointerup", onPointerUp);
      listEl.removeEventListener("touchstart", onPointerDown);
      listEl.removeEventListener("touchend", onPointerUp);
    };
  }, [currentSlide, isMobile, totalSlides]);

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
