import useEmblaCarousel from 'embla-carousel-react';
import React, { useEffect } from 'react';

const EmblaCarousel = ({ children, onInit }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

  useEffect(() => {
    if (emblaApi && onInit) {
      onInit(emblaApi);
    }
  }, [emblaApi, onInit]);

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {React.Children.map(children, (child) => (
          <div className="mr-5 w-44 flex-[0_0_auto]">{child}</div>
        ))}
      </div>
    </div>
  );
};

export default EmblaCarousel;
