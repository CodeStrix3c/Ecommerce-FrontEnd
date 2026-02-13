import React from "react";
import { Heart, Globe2, HeartHandshake, Target, Compass } from "lucide-react";

const OurMission = () => {
  const missions = [
    {
      icon: <Heart className="w-10 h-10 text-[var(--color-secondary)]" />,
      title: "Creativity",
      desc: "We encourage artistic expression by creating and promoting meaningful handmade art.",

    },
    {
      icon: <Globe2 className="w-10 h-10 text-[var(--color-secondary)]" />,
      title: "Innovation",
      desc: "We blend traditional craftsmanship with modern design to create unique art pieces.",

    },
    {
      icon: <HeartHandshake className="w-10 h-10 text-[var(--color-secondary)]" />,
      title: "Community",
      desc: "We support artists and connect people through the beauty of handmade creations.",


    },
  ];

  return (
    <section className="relative py-20 px-4 sm:px-8 md:px-16 lg:px-24 overflow-hidden">

      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto">


        {/* Main Heading */}
        <h2 className=" mt-[-12px] text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--color-black)] text-center mb-4 leading-tight">
          Our Mission &{" "}
          <span className="text-[var(--color-secondary)] bg-clip-text ">
            Values
          </span>
        </h2>

        {/* Subheading */}
        <p className="text-base sm:text-lg text-[var(--color-black)] text-center max-w-2xl mx-auto mb-16">
          Three core principles that guide everything we create and every artist we support
        </p>

        {/* Mission Cards Grid */}
        <div className="grid sm:grid-cols-3 gap-8 lg:gap-10 max-w-6xl mx-auto">
          {missions.map((mission, i) => (
            <div
              key={i}
              className="group relative"
            >
              {/* Card Container */}
              <div className={`relative h-full p-8 rounded-3xl ${mission.bgPattern} border-2 transition-all duration-500 hover:-translate-y-3 overflow-hidden`}>

                {/* Animated Background Gradient on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${mission.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`} />

                {/* Icon Container with Floating Animation */}
                <div className="relative mb-6">
                  <div className={`w-20 h-20 mx-auto ${mission.iconBg} rounded-2xl flex items-center justify-center shadow-md group-hover:shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                    <div className={mission.accentColor}>
                      {mission.icon}
                    </div>
                  </div>

                  {/* Decorative Ring */}
                  <div className={`absolute inset-0 w-20 h-20 mx-auto border-2 border-dashed ${mission.accentColor} opacity-0 group-hover:opacity-30 rounded-2xl group-hover:scale-125 transition-all duration-500`} />
                </div>

                {/* Title */}
                <h3 className={`font-bold text-2xl mb-4 ${mission.accentColor} group-hover:scale-105 transition-transform duration-300`}>
                  {mission.title}
                </h3>

                {/* Description */}
                <p className="text-gray-700 leading-relaxed text-base">
                  {mission.desc}
                </p>

                {/* Bottom Accent Bar */}
                <div className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${mission.gradient} rounded-b-3xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />

                {/* Corner Decoration */}
                <div className={`absolute top-6 right-6 w-3 h-3 rounded-full bg-gradient-to-br ${mission.gradient} opacity-40 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500`} />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-20 text-center">
          <div className="inline-block p-8 rounded-2xl border border-gray max-w-3xl">
            <Target className="w-12 h-12 text-[var(--color-secondary)] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-[var(--color-black)] mb-3">
              Driven by Purpose, Inspired by Art
            </h3>
            <p className="text-[var(--color-black)] leading-relaxed">
              Every piece we create is a testament to our commitment to these values.
              Join us in celebrating the intersection of tradition, innovation, and community.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default OurMission;