import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CRAFTS_DATA = [
  {
    id: 1,
    title: "Pashmina Shawls",
    description:
      "Known as 'Soft Gold', these shawls are hand-spun from the fine fleece of Changthangi goats. A single shawl can take months of meticulous hand-embroidery (Sozni).",
    image: "/assets/images/pashmiashawlimage.png",
  },
  {
    id: 2,
    title: "Papier-Mâché",
    description:
      "Introduced by Persian saints in the 14th century, this art involves transforming paper pulp into decorative masterpieces painted with 'Naqashi' patterns.",
    image: "/assets/images/silkimage.png",
  },
  {
    id: 3,
    title: "Hand-Knotted Carpets",
    description:
      "Kashmiri carpets are famous for their 'Talim' (coded script) weaving technique. Every knot is a testament to the region's Persian influence.",
    image:
      "https://images.unsplash.com/photo-1600166898405-da9535204843?q=80&w=1000&auto=format&fit=crop",
  },
];

const KashmirArts = () => {
  const [activeTab, setActiveTab] = useState(CRAFTS_DATA[0]);
  const videoRef = useRef(null);

  useEffect(() => {
    const playVideo = async () => {
      if (videoRef.current) {
        try {
          videoRef.current.muted = true;
          await videoRef.current.play();
        } catch (err) {
          console.log("Autoplay blocked.");
        }
      }
    };
    playVideo();
  }, []);

  return (
    <div className="bg-stone-50 text-stone-900 font-serif min-h-screen">
      {/* HERO */}
      <section className="relative h-[70vh] w-full flex items-center justify-center overflow-hidden bg-stone-900">
        <motion.video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          initial={{ scale: 1 }}
          animate={{ scale: 1.15 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute inset-0 w-full h-full object-cover brightness-[0.4]"
        >
          <source
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            type="video/mp4"
          />
        </motion.video>

        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            Kashmir Heritage
          </h1>
          <p className="text-xl md:text-2xl italic opacity-90">
            The Soul of the Valley, Handcrafted.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="w-full py-16">
        <div className="text-center mb-16 px-6">
          <h2 className="text-4xl font-semibold border-b-2 border-amber-600 inline-block pb-2">
            Ancient Crafts
          </h2>
          <p className="mt-4 text-stone-600 max-w-2xl mx-auto">
            Explore the artistic legacy of Kashmir.
          </p>
        </div>

        {/* 50/50 LAYOUT */}
        <div className="w-full flex flex-col md:flex-row min-h-[500px] bg-stone-200  overflow-hidden shadow-lg">
          {/* LEFT CONTENT */}
          <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16">
            <div className="space-y-6">
              {CRAFTS_DATA.map((craft) => (
                <div
                  key={craft.id}
                  onClick={() => setActiveTab(craft)}
                  className={`cursor-pointer p-6 rounded-lg transition-all duration-300 border-l-4 ${
                    activeTab.id === craft.id
                      ? "bg-amber-50 border-amber-600 translate-x-2"
                      : "hover:bg-stone-50 border-transparent"
                  }`}
                >
                  <h3 className="text-2xl font-bold">{craft.title}</h3>

                  <AnimatePresence mode="wait">
                    {activeTab.id === craft.id && (
                      <motion.p
                        key={craft.id}
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 50, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mt-2 text-stone-700"
                      >
                        {craft.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="w-full md:w-1/2 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeTab.id}
                src={activeTab.image}
                alt={activeTab.title}
                initial={{ x: 100, opacity: 0, scale: 1.1 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black py-20 text-center px-6">
        <blockquote className="italic text-3xl md:text-5xl text-white max-w-4xl mx-auto mb-8 leading-relaxed">
          "Gar firdaus bar-rue zamin ast, hamin asto, hamin asto, hamin asto."
        </blockquote>

        <p className="text-lg md:text-2xl text-white font-light tracking-wide">
          — If there is a heaven on earth, it is here.
        </p>
      </footer>
    </div>
  );
};

export default KashmirArts;
