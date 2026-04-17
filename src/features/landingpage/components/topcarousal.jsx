// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// const slides = [
//   {
//     id: 1,
//     title: "The Kani Heritage",
//     desc: "Intricate hand-woven masterpieces from the valley, created with small wooden sticks called Kanis.",
//     img: "/assets/images/kaniheritageimage.png",
//     link: "/collections/kani",
//     bgColor: "var(--color-primary)",
//     textColor: "text-white",
//     subText: "text-stone-200",
//   },
//   {
//     id: 2,
//     title: "Royal Sozni Silk",
//     desc: "Delicate needlework that defines Kashmiri elegance and takes months to complete by hand.",
//     img: "/assets/images/silkimage.png",
//     link: "/collections/sozni",
//     bgColor: "var(--color-secondary)",
//     textColor: "text-white",
//     subText: "text-stone-100",
//   },
//   {
//     id: 3,
//     title: "Metallic Tilla",
//     desc: "Shimmering gold and silver threadwork, a timeless treasure for traditional bridal luxury.",
//     img: "/assets/images/tillaimage.png",
//     link: "/collections/tilla",
//     bgColor: "var(--color-black)",
//     textColor: "text-white",
//     subText: "text-stone-400",
//   },
// ];

// const AUTO_PLAY_INTERVAL = 5000;

// const PashminaCarousel = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       nextSlide();
//     }, AUTO_PLAY_INTERVAL);
//     return () => clearInterval(timer);
//   }, [currentIndex]);

//   const prevSlide = () => {
//     setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
//   };

//   const nextSlide = () => {
//     setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
//   };

//   return (
//     <section className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden border-b border-[var(--color-gray)] transition-colors duration-700">
//       <AnimatePresence mode="wait">
//         <motion.div
//           key={currentIndex}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.8 }}
//           className="flex flex-col md:flex-row w-full h-full"
//         >
//           {/* LEFT SIDE: IMAGE */}
//           <div className="relative w-full h-1/2 md:h-full md:w-1/2 overflow-hidden bg-stone-200">
//             <motion.img
//               key={`img-${currentIndex}`}
//               initial={{ scale: 1.2, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               transition={{ duration: 1.5 }}
//               src={slides[currentIndex].img}
//               alt={slides[currentIndex].title}
//               className="absolute inset-0 w-full h-full object-cover object-center block"
//             />
//           </div>

//           {/* RIGHT SIDE: CONTENT */}
//           <div
//             className="relative w-full h-1/2 md:h-full md:w-1/2 flex flex-col justify-center items-start px-8 md:px-16 lg:px-24 transition-colors duration-700"
//             style={{ backgroundColor: slides[currentIndex].bgColor }}
//           >
//             <motion.span
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               className={`uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold mb-4 ${slides[currentIndex].textColor}`}
//             >
//               Pure Kashmiri Pashmina
//             </motion.span>

//             <motion.h2
//               initial={{ y: 20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ delay: 0.2 }}
//               className={`text-3xl md:text-5xl lg:text-6xl font-serif mb-4 md:mb-6 leading-tight ${slides[currentIndex].textColor}`}
//             >
//               {slides[currentIndex].title}
//             </motion.h2>

//             <motion.p
//               initial={{ y: 20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ delay: 0.3 }}
//               className={`text-sm md:text-base lg:text-lg max-w-md mb-8 md:mb-10 font-light leading-relaxed ${slides[currentIndex].subText}`}
//             >
//               {slides[currentIndex].desc}
//             </motion.p>

//             <motion.a
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.4 }}
//               href={slides[currentIndex].link}
//               className="inline-block px-8 md:px-10 py-3 md:py-4 bg-white text-black text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase transition-all hover:bg-stone-200 hover:scale-105 active:scale-95"
//             >
//               Explore More
//             </motion.a>
//           </div>
//         </motion.div>
//       </AnimatePresence>

//       {/* Navigation Arrows */}
//       <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4 z-30 pointer-events-none">
//         <button
//           onClick={prevSlide}
//           className="p-2 md:p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/40 transition-all pointer-events-auto"
//         >
//           <ChevronLeft size={20} />
//         </button>
//         <button
//           onClick={nextSlide}
//           className="p-2 md:p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/40 transition-all pointer-events-auto"
//         >
//           <ChevronRight size={20} />
//         </button>
//       </div>

//       {/* Progress Lines */}
//       <div className="absolute bottom-8 md:bottom-12 left-0 right-0 flex justify-center items-center gap-4 z-20">
//         {slides.map((_, index) => (
//           <div
//             key={index}
//             onClick={() => setCurrentIndex(index)}
//             className="relative h-[2px] w-12 md:w-20 cursor-pointer bg-white/30 overflow-hidden"
//           >
//             {currentIndex === index && (
//               <motion.div
//                 initial={{ width: 0 }}
//                 animate={{ width: "100%" }}
//                 transition={{
//                   duration: AUTO_PLAY_INTERVAL / 1000,
//                   ease: "linear",
//                 }}
//                 className="absolute top-0 left-0 h-full bg-white"
//               />
//             )}
//             {currentIndex > index && (
//               <div className="absolute top-0 left-0 h-full w-full bg-white opacity-50" />
//             )}
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default PashminaCarousel;

//opossite side annimation

// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// const slides = [
//   {
//     id: 1,
//     title: "The Kani Heritage",
//     desc: "Intricate hand-woven masterpieces from the valley, created with small wooden sticks called Kanis.",
//     img: "/assets/images/kaniheritageimage.png",
//     link: "/collections/kani",
//     bgColor: "var(--color-primary)",
//     textColor: "text-white",
//     subText: "text-stone-200",
//   },
//   {
//     id: 2,
//     title: "Royal Sozni Silk",
//     desc: "Delicate needlework that defines Kashmiri elegance and takes months to complete by hand.",
//     img: "/assets/images/silkimage.png",
//     link: "/collections/sozni",
//     bgColor: "var(--color-secondary)",
//     textColor: "text-white",
//     subText: "text-stone-100",
//   },
//   {
//     id: 3,
//     title: "Metallic Tilla",
//     desc: "Shimmering gold and silver threadwork, a timeless treasure for traditional bridal luxury.",
//     img: "/assets/images/tillaimage.png",
//     link: "/collections/tilla",
//     bgColor: "var(--color-black)",
//     textColor: "text-white",
//     subText: "text-stone-400",
//   },
//   {
//     id: 4,
//     title: "The Pashmina Shawl",
//     desc: "Experience the ultimate warmth and softness with our Grade-A Changthangi goat wool wraps.",
//     img: "/assets/images/pashmiashawlimage.png", // Replace with your 4th image path
//     link: "/collections/pashmina",
//     bgColor: "#4A5D4E", // A deep forest green example
//     textColor: "text-white",
//     subText: "text-stone-200",
//   },
// ];

// const AUTO_PLAY_INTERVAL = 5000;

// const orchestratorVariants = {
//   enter: (direction) => ({
//     x: direction > 0 ? "100%" : "-100%",
//     opacity: 1,
//   }),
//   center: {
//     x: 0,
//     opacity: 1,
//     transition: {
//       x: { type: "tween", ease: "easeInOut", duration: 0.8 },
//       staggerChildren: 0.1,
//       delayChildren: 0.2,
//     },
//   },
//   exit: (direction) => ({
//     x: direction > 0 ? "-100%" : "100%",
//     opacity: 1,
//     transition: {
//       x: { type: "tween", ease: "easeInOut", duration: 0.8 },
//     },
//   }),
// };

// const childImageVariants = {
//   enter: { scale: 1.1, opacity: 0 },
//   center: { scale: 1, opacity: 1, transition: { duration: 1.2 } },
// };

// const childTextVariants = {
//   enter: { y: 20, opacity: 0 },
//   center: { y: 0, opacity: 1 },
// };

// const PashminaCarousel = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [direction, setDirection] = useState(1);

//   useEffect(() => {
//     const timer = setInterval(() => handleNext(), AUTO_PLAY_INTERVAL);
//     return () => clearInterval(timer);
//   }, [currentIndex]);

//   const handlePrev = () => {
//     setDirection(-1);
//     setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
//   };

//   const handleNext = () => {
//     setDirection(1);
//     setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
//   };

//   const handleDot = (index) => {
//     setDirection(index > currentIndex ? 1 : -1);
//     setCurrentIndex(index);
//   };

//   // Dynamic Logic:
//   // Even index = Image Left, Text Right
//   // Odd index = Text Left, Image Right (Reverse Flex)
//   const isImageRight = currentIndex % 2 !== 0;

//   return (
//     <section
//       className="relative w-full h-[600px] md:h-[600px] lg:h-[700px] overflow-hidden border-b border-[var(--color-gray)] transition-colors duration-500"
//       style={{ backgroundColor: slides[currentIndex].bgColor }}
//     >
//       <AnimatePresence initial={false} custom={direction} mode="popLayout">
//         <motion.div
//           key={currentIndex}
//           custom={direction}
//           variants={orchestratorVariants}
//           initial="enter"
//           animate="center"
//           exit="exit"
//           className={`absolute inset-0 flex flex-col w-full h-full ${
//             isImageRight ? "md:flex-row-reverse" : "md:flex-row"
//           }`}
//         >
//           {/* IMAGE SIDE */}
//           <div className="relative w-full h-1/2 md:h-full md:w-1/2 overflow-hidden bg-stone-200">
//             <motion.img
//               variants={childImageVariants}
//               src={slides[currentIndex].img}
//               alt={slides[currentIndex].title}
//               className="absolute inset-0 w-full h-full object-cover"
//             />
//           </div>

//           {/* CONTENT SIDE */}
//           <div
//             className="relative w-full h-1/2 md:h-full md:w-1/2 flex flex-col justify-center items-start px-8 md:px-16 lg:px-24"
//             style={{ backgroundColor: slides[currentIndex].bgColor }}
//           >
//             <div className="max-w-xl">
//               <motion.span
//                 variants={childTextVariants}
//                 className={`block uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold mb-4 ${slides[currentIndex].textColor}`}
//               >
//                 Pure Kashmiri Pashmina
//               </motion.span>

//               <motion.h2
//                 variants={childTextVariants}
//                 className={`text-3xl md:text-5xl lg:text-6xl font-serif mb-4 md:mb-6 leading-tight ${slides[currentIndex].textColor}`}
//               >
//                 {slides[currentIndex].title}
//               </motion.h2>

//               <motion.p
//                 variants={childTextVariants}
//                 className={`text-sm md:text-base lg:text-lg mb-8 md:mb-10 font-light leading-relaxed ${slides[currentIndex].subText}`}
//               >
//                 {slides[currentIndex].desc}
//               </motion.p>

//               <motion.a
//                 variants={childTextVariants}
//                 href={slides[currentIndex].link}
//                 className="inline-block px-8 md:px-10 py-3 md:py-4 bg-white text-black text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase transition-all hover:bg-stone-200 hover:scale-105 active:scale-95"
//               >
//                 Explore More
//               </motion.a>
//             </div>
//           </div>
//         </motion.div>
//       </AnimatePresence>

//       {/* Navigation Arrows */}
//       <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-6 z-30 pointer-events-none">
//         <button
//           onClick={handlePrev}
//           className="p-3 rounded-full bg-white/10 backdrop-blur-md text-white pointer-events-auto hover:bg-white/30 transition-all border border-white/20"
//         >
//           <ChevronLeft size={24} />
//         </button>
//         <button
//           onClick={handleNext}
//           className="p-3 rounded-full bg-white/10 backdrop-blur-md text-white pointer-events-auto hover:bg-white/30 transition-all border border-white/20"
//         >
//           <ChevronRight size={24} />
//         </button>
//       </div>

//       {/* Progress Indicators */}
//       <div className="absolute bottom-8 md:bottom-12 left-0 right-0 flex justify-center gap-4 z-20">
//         {slides.map((_, index) => (
//           <div
//             key={index}
//             onClick={() => handleDot(index)}
//             className="relative h-[2px] w-12 md:w-20 cursor-pointer bg-white/20 overflow-hidden"
//           >
//             {currentIndex === index && (
//               <motion.div
//                 initial={{ width: 0 }}
//                 animate={{ width: "100%" }}
//                 transition={{
//                   duration: AUTO_PLAY_INTERVAL / 1000,
//                   ease: "linear",
//                 }}
//                 className="absolute top-0 left-0 h-full bg-white"
//               />
//             )}
//             {/* Optional: Add a subtle fill for visited slides */}
//             {currentIndex > index && (
//               <div className="absolute inset-0 bg-white/40" />
//             )}
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default PashminaCarousel;

//full whole annimation with cross images
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "The Kani Heritage",
    desc: "Intricate hand-woven masterpieces from the valley, created with small wooden sticks called Kanis.",
    img: "/assets/images/kaniheritageimage.png",
    link: "/collections/kani",
    bgColor: "var(--color-primary)",
    textColor: "text-white",
    subText: "text-stone-200",
  },
  {
    id: 2,
    title: "Royal Sozni Silk",
    desc: "Delicate needlework that defines Kashmiri elegance and takes months to complete by hand.",
    img: "/assets/images/silkimage.png",
    link: "/collections/sozni",
    bgColor: "var(--color-secondary)",
    textColor: "text-white",
    subText: "text-stone-100",
  },
  {
    id: 3,
    title: "Metallic Tilla",
    desc: "Shimmering gold and silver threadwork, a timeless treasure for traditional bridal luxury.",
    img: "/assets/images/tillaimage.png",
    link: "/collections/tilla",
    bgColor: "var(--color-black)",
    textColor: "text-white",
    subText: "text-stone-400",
  },
  {
    id: 4,
    title: "The Pashmina Shawl",
    desc: "Experience the ultimate warmth and softness with our Grade-A Changthangi goat wool wraps.",
    img: "/assets/images/pashminashawlimage.png",
    link: "/collections/pashmina",
    bgColor: "#4A5D4E",
    textColor: "text-white",
    subText: "text-stone-200",
  },
];

const AUTO_PLAY_INTERVAL = 5000;

// 🔥 IMAGE animation (strong left/right entry)
const imageVariants = {
  initial: (direction) => ({
    x: direction > 0 ? 200 : -200,
    opacity: 0,
    scale: 1.1,
  }),
  animate: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: "easeOut" },
  },
  exit: (direction) => ({
    x: direction > 0 ? -200 : 200,
    opacity: 0,
    transition: { duration: 0.6 },
  }),
};

// 🔥 TEXT animation (opposite direction)
const textVariants = {
  initial: (direction) => ({
    x: direction > 0 ? -150 : 150,
    opacity: 0,
  }),
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.8, staggerChildren: 0.15 },
  },
  exit: (direction) => ({
    x: direction > 0 ? 150 : -150,
    opacity: 0,
    transition: { duration: 0.5 },
  }),
};

// 🔥 Individual text items
const textItem = {
  initial: { y: 40, opacity: 0 },
  animate: { y: 0, opacity: 1 },
};

const PashminaCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => handleNext(), AUTO_PLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handleDot = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const isImageRight = currentIndex % 2 !== 0;

  return (
    <section
      className="relative w-full h-[600px] md:h-[600px] lg:h-[700px] overflow-hidden border-b border-[var(--color-gray)] transition-colors duration-500"
      style={{ backgroundColor: slides[currentIndex].bgColor }}
    >
      {/* 🔥 IMPORTANT: initial={true} so animation runs first time */}
      <AnimatePresence custom={direction} mode="wait">
        <div
          key={currentIndex}
          className={`absolute inset-0 flex flex-col w-full h-full ${
            isImageRight ? "md:flex-row-reverse" : "md:flex-row"
          }`}
        >
          {/* IMAGE */}
          <motion.div
            custom={direction}
            variants={imageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="relative w-full h-1/2 md:h-full md:w-1/2 overflow-hidden"
          >
            <img
              src={slides[currentIndex].img}
              alt={slides[currentIndex].title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </motion.div>

          {/* TEXT */}
          <motion.div
            custom={direction}
            variants={textVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="relative w-full h-1/2 md:h-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24"
            style={{ backgroundColor: slides[currentIndex].bgColor }}
          >
            <div className="max-w-xl">
              <motion.span
                variants={textItem}
                className="block uppercase tracking-[0.3em] text-xs font-bold mb-4 text-white"
              >
                Pure Kashmiri Pashmina
              </motion.span>

              <motion.h2
                variants={textItem}
                className="text-4xl md:text-6xl font-serif mb-6 text-white"
              >
                {slides[currentIndex].title}
              </motion.h2>

              <motion.p
                variants={textItem}
                className="text-lg mb-8 text-stone-200"
              >
                {slides[currentIndex].desc}
              </motion.p>

              <motion.a
                variants={textItem}
                href={slides[currentIndex].link}
                className="inline-block px-8 py-4 bg-white text-black text-xs font-bold tracking-[0.2em] uppercase hover:scale-105 transition"
              >
                Explore More
              </motion.a>
            </div>
          </motion.div>
        </div>
      </AnimatePresence>

      {/* Arrows */}
      <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-6 z-30">
        <button onClick={handlePrev}>
          <ChevronLeft size={30} color="white" />
        </button>
        <button onClick={handleNext}>
          <ChevronRight size={30} color="white" />
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => handleDot(index)}
            className="h-[2px] w-16 bg-white/30 cursor-pointer"
          >
            {currentIndex === index && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 5, ease: "linear" }}
                className="h-full bg-white"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default PashminaCarousel;
