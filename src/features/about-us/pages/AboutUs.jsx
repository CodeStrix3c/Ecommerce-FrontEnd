import React from "react";
import { Leaf, Sprout, Users, Heart, Star, Map, Award } from "lucide-react";

import ContentWrapper from "@/components/shared/ContentWrapper";
import StatCard from "../components/StatCard";
import FeatureCard from "../components/FeatureCard";
import FaqCard from "../components/FaqCard";

export default function AboutUs() {
  const stats = [
    { value: "500+", label: "local farmers in our community" },
    { value: "50+", label: "villages supported with sustainable farming" },
    { value: "2000+", label: "acres of farmland cultivated organically" },
    { value: "1M+", label: "families nourished with fresh produce" },
    { value: "100%", label: "chemical-free & natural farming practices" },
    { value: "10K+", label: "jobs created in rural communities" },
    { value: "15+", label: "years of building farmer-first solutions" },
    { value: "25+", label: "partner organizations & cooperatives" },
  ];

  const mission = [
    {
      Icon: Leaf,
      title: "Sustainability",
      description:
        "Protecting the soil and environment through eco-friendly methods.",
    },
    {
      Icon: Sprout,
      title: "Quality Harvest",
      description:
        "Delivering farm-fresh produce, rich in taste and nutrients.",
    },
    {
      Icon: Users,
      title: "Community",
      description: "Empowering local farmers and supporting rural livelihoods.",
    },
    {
      Icon: Heart,
      title: "Trust",
      description:
        "Building strong bonds with customers through honesty & care.",
    },
  ];

  const whyChoose = [
    {
      Icon: Star,
      title: "Farm Fresh",
      description: "Harvested daily to bring you the freshest produce.",
    },
    {
      Icon: Map,
      title: "Local Support",
      description: "Directly supporting farmers in your community.",
    },
    {
      Icon: Award,
      title: "Certified Organic",
      description: "Trusted produce grown without chemicals or pesticides.",
    },
  ];

  const faqs = [
    {
      question: "Are your products 100% organic?",
      answer:
        "Yes, all our produce is grown naturally without harmful pesticides or chemicals.",
    },
    {
      question: "Do you deliver to my city?",
      answer:
        "We deliver to most major cities and towns. You can check delivery availability at checkout.",
    },
    {
      question: "How do I trust your farming practices?",
      answer:
        "We are certified organic and open our farms for visits to ensure full transparency.",
    },
  ];

  return (
    <div className="bg-[var(--color-white)] text-[var(--color-black)]sm:pt-0 lg:pt-28 md:pt-24">
      {/* <section
        className="relative flex items-center justify-center min-h-[70vh] bg-cover bg-center"
        style={{ backgroundImage: 'url("/assets/images/aboutUsBg.jpg")' }}
      /> */}

      <ContentWrapper compactScreen>
        <div className="py-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 text-center">
            About Us
          </h2>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed text-justify">
            We are a community of passionate farmers dedicated to bringing
            fresh, organic, and sustainable produce directly from our fields to
            your table. Our journey began with a small group of farmers who
            believed in preserving traditional farming methods while embracing
            modern sustainable practices. Over the years, we have grown into a
            trusted community that values quality, transparency, and care for
            the land.
          </p>
        </div>

        <div className="py-10">
          <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center">
            Our Mission & Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            {mission.map((m, i) => (
              <FeatureCard key={i} {...m} />
            ))}
          </div>
        </div>

        <div className="py-10">
          <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center">
            Fast Facts
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <StatCard key={i} {...s} />
            ))}
          </div>
        </div>

        <div className="py-10">
          <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {whyChoose.map((item, i) => (
              <FeatureCard key={i} {...item} />
            ))}
          </div>
        </div>

        <div className="py-10">
          <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="max-w-2xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <FaqCard key={i} {...faq} />
            ))}
          </div>
        </div>

        <div className="py-10 text-center">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3">
            Join Our Farming Journey
          </h2>
          <p className="max-w-xl mx-auto mb-5 text-sm sm:text-base">
            Together, we can build a healthier future by choosing natural,
            sustainable, and farmer-friendly produce.
          </p>
          <button className="bg-[var(--color-primary)] text-[var(--color-white)] px-4 py-2 rounded-lg font-medium hover:bg-[var(--color-primary-hover)] transition text-sm sm:text-base">
            Contact Us
          </button>
        </div>
      </ContentWrapper>
    </div>
  );
}
