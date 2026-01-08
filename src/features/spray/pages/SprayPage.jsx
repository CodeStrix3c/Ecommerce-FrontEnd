import React from "react";
import ContentWrapper from "@/components/shared/ContentWrapper";
import useIsMobile from "@/hooks/useInMobile";
import ImageHeaderSection from "../../../components/shared/ImageHeaderSection";

import { Hammer, Layers, Diamond, Users } from "lucide-react"; // Suitable for metal & stone crafts

const MetalStoneCraftPage = () => {
  const isMobile = useIsMobile();

  // New data for metal & stone crafts
  const data = [
    {
      icon: "Hammer",
      title: "Traditional Metalwork",
      desc: "Skilled artisans use hammers, anvils, and time-honored techniques to create functional and decorative metal pieces.",
    },
    {
      icon: "Layers",
      title: "Stone Carving Techniques",
      desc: "Our stone carving experts craft intricate patterns and designs using layered chisel and polishing methods.",
    },
    {
      icon: "Diamond",
      title: "Premium Materials",
      desc: "Only high-quality metals and stones are selected to ensure durability, shine, and aesthetic beauty in every creation.",
    },
    {
      icon: "Users",
      title: "Artisans’ Expertise",
      desc: "Each product reflects the skill, dedication, and passion of our team, preserving traditional craftsmanship for generations.",
    },
  ];

  const icons = {
    Hammer: <Hammer className="text-[var(--color-secondary)]" size={28} />,
    Layers: <Layers className="text-[var(--color-secondary)]" size={28} />,
    Diamond: <Diamond className="text-[var(--color-secondary)]" size={28} />,
    Users: <Users className="text-[var(--color-secondary)]" size={28} />,
  };

  return (
    <div className="w-full min-h-screen bg-[var(--color-white)]">
      <ImageHeaderSection
        image={
          "https://images.unsplash.com/photo-1592861954235-d0f51c6b67c1?auto=format&fit=crop&w=1470&q=80"
        } // Metal & Stone craft Unsplash image
        title={"Metal & Stone Crafting"}
        description={
          "Explore our metal and stone craftsmanship, combining tradition with modern techniques to create durable and exquisite pieces."
        }
      />

      <div className="mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-12 py-10">
        <h3 className="text-xl lg:text-3xl md:text-xl font-semibold text-[var(--color-black)] mb-4 mt-4 text-center">
          Crafting Overview
        </h3>

        <p className="mx-auto max-w-5xl text-center text-[var(--color-black)] leading-relaxed mb-6">
          Our metal and stone products are created with precision and artistry.
          Each piece reflects our commitment to quality, heritage, and the
          finest materials, ensuring every creation tells a story of skill and
          tradition.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((item, index) => (
            <div
              key={index}
              className="bg-[var(--color-white)] border border-[var(--color-gray)] rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                {icons[item.icon]}
                <h3 className="text-lg font-semibold text-[var(--color-black)]">
                  {item.title}
                </h3>
              </div>
              <p className="text-sm text-[var(--color-black)] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <ContentWrapper {...(!isMobile && { topSpacing: true })}>
        <div className="sm:mt-[-8rem] md:mt-[-6rem] lg:mt-[-6rem] pb-10">
          {/* <SprayHistory /> */}
        </div>
      </ContentWrapper>
    </div>
  );
};

export default MetalStoneCraftPage;
s;
