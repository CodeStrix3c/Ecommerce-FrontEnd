import React from "react";
import { Users, Sparkles, Heart, Palette } from "lucide-react";

const WhoWeAre = () => (
  <section className="relative px-6 md:px-24 py-20 overflow-hidden">
    {/* Decorative Background Elements */}
    <div className="absolute top-0 right-0 w-64 h-64  rounded-full blur-3xl -z-10" />
    <div className="absolute bottom-0 left-0 w-96 h-96  rounded-full blur-3xl -z-10" />

    <div className="max-w-5xl mx-auto">

      {/* <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100/50 rounded-full mb-8 mx-auto block w-fit">
        <Users className="w-4 h-4 text-amber-700" />
        <span className="text-sm font-medium text-amber-900">About Us</span>
      </div> */}

      {/* Main Heading */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 text-center mb-6 leading-tight">
        Crafting Stories, One Piece at a Time
      </h2>

      {/* Subheading */}
      <p className="text-lg sm:text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
        Where traditional artistry meets contemporary design
      </p>

      {/* Main Content Card */}
      <div className="bg-white  p-8 md:p-12 mb-12">
        <p className="text-base sm:text-lg leading-relaxed text-gray-700 mb-8">
          At{" "}
          <strong className="font-bold text-[var(--color-secondary)]">
            Art & Craft
          </strong>
          , we are a passionate community of artists, designers, and creators who
          believe in the power of creativity and handmade expression. Our mission
          is to preserve traditional craftsmanship while embracing modern design,
          offering unique, high-quality handmade products that inspire creativity
          and celebrate artistic heritage.
        </p>

        {/* Feature Grid */}
        <div className="grid sm:grid-cols-3 gap-6 mb-10">
          <div className="flex flex-col items-center text-center p-6 ">
            <div className="w-12 h-12  rounded-full flex items-center justify-center mb-4">
              <Heart className="w-10 h-10 text-[var(--color-secondary)]" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Handcrafted with Love</h3>
            <p className="text-sm text-gray-600">Every piece tells a unique story</p>
          </div>

          <div className="flex flex-col items-center text-center p-6">
            <div className="w-12 h-12  rounded-full flex items-center justify-center mb-4">
              <Palette className="w-10 h-10 text-[var(--color-secondary)]" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Traditional Artistry</h3>
            <p className="text-sm text-gray-600">Preserving heritage craftsmanship</p>
          </div>

          <div className="flex flex-col items-center text-center p-6 ">
            <div className="w-12 h-12  rounded-full flex items-center justify-center mb-4">
              <Sparkles className="w-10 h-10 text-[var(--color-secondary)]" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Modern Design</h3>
            <p className="text-sm text-gray-600">Contemporary meets timeless</p>
          </div>
        </div>

        {/* Quote Section */}
        <div className="relative">
          <div className="absolute left-0 top-0 text-6xl text-amber-200 font-serif leading-none">"</div>
          <blockquote className="relative pl-12 pr-8 py-4">
            <p className="text-xl md:text-2xl font-medium text-gray-800 italic">
              We don't just create crafts — we bring imagination to life.
            </p>
          </blockquote>
          <div className="absolute right-0 bottom-0 text-6xl text-amber-200 font-serif leading-none">"</div>
        </div>
      </div>

      {/* Bottom Stats or CTA could go here */}
    </div>
  </section>
);

export default WhoWeAre;