import React from "react";
import {
  Sprout,
  Droplet,
  Bug,
  Wheat,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react";
import SecondarySearchBar from "@/components/shared/SecondarySearchBar";
import ContentWrapper from "@/components/shared/ContentWrapper";
import FaqCard from "@/features/about-us/components/FaqCard";
import { useNavigate } from "react-router-dom";

export default function AgricultureHelpCenter() {

  const handleClick = (link) => {
  if (link) window.location.href = link;
};

  const faqs = [
    {
      question: "What is the best way to test soil quality?",
      answer:
        "You can use soil testing kits available at agricultural stores or send samples to a certified soil testing lab for a detailed analysis. A proper soil test provides information about pH, nutrient levels, and organic matter content. This helps farmers make better decisions about fertilizer use, crop selection, and irrigation management to improve soil productivity.",
    },
    {
      question: "How often should I rotate my crops?",
      answer:
        "It’s best to rotate crops every season or at least once every year. Crop rotation helps maintain soil fertility, prevents nutrient depletion, and reduces pest and disease buildup. For example, you can grow legumes after cereals to naturally replenish nitrogen in the soil and improve overall soil health over time.",
    },
    {
      question:
        "What’s the difference between organic and chemical fertilizers?",
      answer:
        "Organic fertilizers are made from natural materials like compost, manure, and plant residues. They improve soil structure and promote long-term fertility. Chemical fertilizers, on the other hand, provide quick nutrient supply and fast results but may degrade soil quality if overused. Combining both in a balanced way often gives the best results for sustainable farming.",
    },
    {
      question: "How can I prevent common crop diseases?",
      answer:
        "Start with disease-resistant seed varieties and follow a proper crop rotation plan. Ensure fields are well-drained to avoid fungal growth and do not overwater plants. Regular monitoring, balanced nutrient management, and timely use of biological or approved chemical fungicides can greatly reduce disease risks.",
    },
    {
      question: "Which crops are best for organic farming?",
      answer:
        "Crops like tomatoes, cucumbers, okra, leafy greens, and pulses such as lentils or chickpeas are ideal for organic farming. Cereals like wheat, maize, and rice can also be grown organically with proper composting and pest management. Always focus on local climate and soil type to choose the most suitable crop combination.",
    },
    {
      question: "What tools are essential for modern farming?",
      answer:
        "Modern farming benefits from tools such as tractors, drip or sprinkler irrigation systems, soil moisture sensors, drones for crop monitoring, and GPS-based precision farming equipment. These tools help save time, reduce costs, and increase productivity. Even small-scale farmers can adopt affordable versions of these technologies to improve efficiency.",
    },
  ];

  return (
    <ContentWrapper>
      <div className="min-h-screen bg-[var(--color-white)] text-[var(--color-black)] mt-6 lg:mt-32 md:mt-20">
        <div className="border-b bg-[var(--color-white)] pb-6 pt-12 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6">
            Hi, how can we help?
          </h1>
          <div className="flex justify-center w-full px-4">
            <div className="w-full max-w-xl">
              <SecondarySearchBar />
            </div>
          </div>
        </div>

        {/* <div className="flex justify-center flex-wrap gap-4 sm:gap-6 mt-6 border-b">
          {["Farmers", "Traders", "Researchers", "Policy Makers"].map(
            (tab, i) => (
              <button
                key={i}
                className="py-2 sm:py-3 text-sm sm:text-base font-medium border-b-2 border-transparent hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition"
              >
                {tab}
              </button>
            )
          )}
        </div> */}

        {/* <div className="max-w-3xl mx-auto text-center mt-10">
          <div className="rounded-xl shadow p-6 sm:p-8 flex flex-col items-center space-y-4 bg-[var(--color-white)]">
            <h2 className="font-bold text-lg sm:text-xl">We’re here for you</h2>
            <p className="text-sm sm:text-base">
              <LoginLink /> Log in to get help with your queries, resources, and
              support.
            </p>
            <button className="bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-hover)] text-[var(--color-white)] py-3 rounded-lg font-medium w-full sm:w-auto">
              Log in or sign up
            </button>
          </div>
        </div> */}

        <div className="max-w-6xl mx-auto mt-12 px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-6">
            Guides for getting started
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                title: "Farming Basics",
                desc: "Learn the foundations of sustainable farming.",
                img: "assets/images/rice.jpeg",
              },
              {
                title: "Organic Practices",
                desc: "Discover eco-friendly techniques to improve yields.",
                img: "assets/images/mud.jpeg",
              },
              {
                title: "Market Access",
                desc: "Learn how to connect with buyers and grow your business.",
                img: "assets/images/vegetables.jpeg",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-[var(--color-white)] shadow rounded-lg overflow-hidden hover:shadow-md transition"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-40 sm:h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-[var(--color-black)]">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-12 space-y-12 px-4 sm:px-6 lg:px-8">
          <div>
            <h2 className="text-2xl font-bold mb-6">Top Articles</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm">
              {[
                {
                  title: "Crop rotation benefits",
                  desc: "Improve soil health and yields with proper crop rotation.",
                },
                {
                  title: "Sustainable irrigation",
                  desc: "Learn how to manage water resources effectively.",
                },
                {
                  title: "Pest management",
                  desc: "Natural methods to protect crops from common pests.",
                },
                {
                  title: "Fertilizer optimization",
                  desc: "Balance nutrients to boost crop production sustainably.",
                },
                {
                  title: "Soil testing guide",
                  desc: "Step-by-step process to test and analyze your soil.",
                },
                {
                  title: "Climate-smart farming",
                  desc: "Adapt modern methods to deal with climate change.",
                },
              ].map((item, idx) => (
                <div key={idx}>
                  <h3 className=" text-xl font-semibold text-[var(--color-black)] mb-1">
                    {item.title}
                  </h3>
                  <p className="  text-[var(--color-black)]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-5">Popular Topics</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              {[
                { icon: Sprout, label: "Organic Farming" },
                { icon: Droplet, label: "Irrigation Systems" },
                { icon: Bug, label: "Pest Control" },
                { icon: Wheat, label: "Harvesting Tips" },
              ].map((item, idx) => (
                <button
                  key={idx}
                  className="p-4 rounded-lg border text-left flex items-center gap-2"
                >
                  <item.icon className="w-5 h-5 text-[var(--color-secondary)]" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-5">Guides & Resources</h2>
            <ul className="space-y-6 text-sm">
              {[
                {
                  title: "Beginner’s Guide to Sustainable Farming",
                  desc: "A complete handbook for new farmers exploring eco-friendly practices.",
                },
                {
                  title: "Water Conservation Techniques",
                  desc: "Learn proven methods to reduce water waste and save costs.",
                },
                {
                  title: "Crop Disease Identification",
                  desc: "Visual guide to identify and treat common plant diseases.",
                },
              ].map((item, idx) => (
                <li key={idx} className="border-b last:border-none pb-4">
                  <h3 className="font-semibold text-[var(--color-scondary)]">
                    {item.title}
                  </h3>
                  <p className="text-[var(--color-black)]">{item.desc}</p>
                </li>
              ))}
            </ul>
          </div>

          <div></div>
        </div>
        <div className="w-full grid gap-4 mt-6">
          <FaqCard question={faqs.question} answer={faqs.answer} />
        </div>

        <div className="py-14 mt-16 text-[var(--color-black)]">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-2 space-y-8 mt-[-59px]">
              <h2 className="text-2xl font-bold ml-3">Explore More</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  {
                    title: "Smart Farming Solutions",
                    desc: "Explore technology and ideas that make farming easier and more profitable.",
                    img: "/assets/images/help-center-img.jpeg",
                  },
                  {
                    title: "Knowledge & Inspiration",
                    desc: "Discover best practices, new research, and success stories from farmers worldwide.",
                    img: "/assets/images/help-center-img2.jpeg",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-[var(--color-white)] rounded-xl overflow-hidden shadow hover:shadow-md transition"
                  >
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-40 sm:h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-bold text-[var(--color-black)]">
                        {item.title}
                      </h3>
                      <p className="text-sm text-[var(--color-black)]">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[var(--color-white)] rounded-xl shadow overflow-hidden flex flex-col">
              <img
                src="/assets/images/help-center-img3.jpeg"
                alt="Contact Support"
                className="w-full h-32 sm:h-40 object-cover"
              />
              <div className="p-6 space-y-6">
                <h2 className="text-xl font-bold">Get in Touch</h2>
                <p className="text-sm text-[var(--color-black)]">
                  We’d love to hear from you! Choose a contact option below:
                </p>
                <div className="space-y-4">
                  {[
                    {
                      icon: Phone,
                      title: "Call Us",
                      desc: "+1 (234) 567-890",
                      href: "tel:+1234567890",
                    },
                    {
                      icon: Mail,
                      title: "Email Us",
                      desc: "Zirat Customer Support",
                      href: "https://mail.google.com/mail/?view=cm&fs=1&to=test@zirat.com",
                    },
                    {
                      icon: MessageCircle,
                      title: "WhatsApp",
                      desc: "+1 (234) 567-890",
                      href: "https://wa.me/+1234567890",
                    },
                  ].map((item, idx) => (
                    <div
                       onClick={() => handleClick(item.href)}
                      key={idx}
                      className="flex items-center gap-4 p-4 rounded-lg border shadow-sm hover:shadow-md hover:bg-[var(--color-black-hover)] transition cursor-pointer"
                    >
                      <div className="flex justify-center items-center w-12 h-12 rounded-full bg-[var(--color-secondary)] text-[var(--color-white)]">
                        <item.icon size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-sm text-[var(--color-black)]">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
}
