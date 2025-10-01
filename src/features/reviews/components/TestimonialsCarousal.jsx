import Slider from "react-slick";
import ReviewCard from "./ReviewCard";

export default function TestimonialsCarousel({ testimonials, onShowMore }) {
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1.1,
    slidesToScroll: 1,
    arrows: false,
    centerMode: false,
  };

  return (
    <Slider {...sliderSettings}>
      {testimonials.map((review) => (
        <div key={review.id} className="pr-2 pb-2">
          <ReviewCard review={review} compact={false} onShowMore={onShowMore} />
        </div>
      ))}
    </Slider>
  );
}
