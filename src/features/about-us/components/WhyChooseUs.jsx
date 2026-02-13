import React from "react";
import { Palette, Sparkles, Heart, ShieldCheck, Star, Award } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <Palette className="w-8 h-8 text-[var(--color-secondary)]" />,
      title: "Handmade with Passion",
      desc: "Each creation is crafted by skilled artists who pour creativity and care into every detail.",
      bgGlow: "bg-rose-100/50",
    },
    {
      icon: <Sparkles className="w-8 h-8 text-[var(--color-secondary)]" />,
      title: "Unique Artistic Creations",
      desc: "Our designs are original and exclusive, making every piece truly one of a kind.",
      bgGlow: "bg-amber-100/50",
    },
    {
      icon: <Heart className="w-8 h-8 text-[var(--color-secondary)]" />,
      title: "Made with Love",
      desc: "We believe art carries emotion, and every product reflects dedication and artistic expression.",
      bgGlow: "bg-red-100/50",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-[var(--color-secondary)]" />,
      title: "Quality You Can Trust",
      desc: "We use premium materials to ensure durability, beauty, and lasting value.",
      bgGlow: "bg-emerald-100/50",
    },
  ];

  return (
    <section className="relative py-20 px-4 sm:px-8 md:px-16 lg:px-24 bg-gradient-to-b from-white via-amber-50/20 to-white overflow-hidden">

      {/* Decorative Background */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto">

        {/*        
        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full mb-6 mx-auto block w-fit shadow-sm">
          <Award className="w-5 h-5 text-amber-700" />
          <span className="text-sm font-semibold text-amber-900 tracking-wide">Why We Stand Out</span>
        </div> */}

        {/* Main Heading */}
        <h2 className=" mt-[-80px] text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 text-center mb-6 leading-tight">
          Why Choose{" "}
          <span className="text-[var(--color-secondary)] bg-clip-text">
            Art & Craft
          </span>
        </h2>

        {/* Subheading */}
        <p className="max-w-3xl text-base sm:text-lg text-gray-600 mx-auto mb-16 leading-relaxed text-center px-4">
          We are dedicated to bringing creativity to life through handmade art.
          Our mission is to offer meaningful, beautiful, and high-quality craft
          pieces that inspire creativity and add artistic charm to everyday life.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="group relative p-8 rounded-2xl bg-white border border-gray-200 hover:border-transparent hover:shadow-2xl hover:shadow-gray-300/50 transition-all duration-300 hover:-translate-y-2"
            >
              {/* Hover Glow Effect */}
              <div className={`absolute inset-0 ${f.bgGlow} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`} />

              {/* Icon Container */}
              <div className={`w-16 h-16 bg-gradient-to-br ${f.color} rounded-xl flex items-center justify-center mb-6 text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                {f.icon}
              </div>

              {/* Title */}
              <h3 className="font-bold text-xl mb-3 text-gray-900 group-hover:text-gray-900 transition-colors">
                {f.title}
              </h3>

              {/* Description */}
              <p className="text-sm leading-relaxed text-gray-600 group-hover:text-gray-700">
                {f.desc}
              </p>

              {/* Bottom Accent Line */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${f.color} rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
            </div>
          ))}
        </div>

        {/* Bottom Trust Indicator */}
        <div className="flex flex-wrap justify-center items-center gap-8 mt-16 pt-12 border-t border-gray-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">500+</div>
            <div className="text-sm text-gray-600 mt-1">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">1000+</div>
            <div className="text-sm text-gray-600 mt-1">Unique Creations</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">100%</div>
            <div className="text-sm text-gray-600 mt-1">Handmade Quality</div>
          </div>
          <div className="text-center">
            <div className="flex items-center gap-1 justify-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <div className="text-sm text-gray-600 mt-1">5-Star Reviews</div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;