import React from "react";
import {
  Sprout,
  Droplet,
  Bug,
  Wheat,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react"; // only Lucide icons
import SecondarySearchBar from "@/components/shared/SecondarySearchBar";
import LoginLink from "@/components/shared/LoginLink";
import ContentWrapper from "@/components/shared/ContentWrapper";
import FaqCard from "@/features/about-us/components/FaqCard";

export default function AgricultureHelpCenter() {
  const faqs = [
    {
      question: "What is the best way to test soil quality?",
      answer:
        "You can use soil testing kits or send samples to an agricultural lab for detailed analysis.",
    },
    {
      question: "How often should I rotate my crops?",
      answer:
        "Ideally, rotate crops every season to maintain soil fertility and reduce pest buildup.",
    },
    {
      question:
        "What’s the difference between organic and chemical fertilizers?",
      answer:
        "Organic fertilizers are natural and eco-friendly, while chemical ones act faster but may degrade soil over time.",
    },
    {
      question: "How can I prevent common crop diseases?",
      answer:
        "Use disease-resistant seeds, rotate crops, and ensure proper irrigation to minimize risks.",
    },
    {
      question: "Which crops are best for organic farming?",
      answer:
        "Vegetables like tomatoes, cucumbers, and leafy greens, as well as cereals like wheat and maize, are commonly grown organically.",
    },
    {
      question: "What tools are essential for modern farming?",
      answer:
        "Tractors, irrigation systems, soil testers, and precision farming tools help improve efficiency and yields.",
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

        {/* Guides */}
        <div className="max-w-6xl mx-auto mt-16">
          <h2 className="text-xl sm:text-2xl font-bold mb-6">
            Guides for getting started
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                title: "Farming Basics",
                desc: "Learn the foundations of sustainable farming.",
                img: "https://images.pexels.com/photos/164504/pexels-photo-164504.jpeg",
              },
              {
                title: "Organic Practices",
                desc: "Discover eco-friendly techniques to improve yields.",
                img: "https://images.pexels.com/photos/169523/pexels-photo-169523.jpeg",
              },
              {
                title: "Market Access",
                desc: "Learn how to connect with buyers and grow your business.",
                img: "https://images.pexels.com/photos/2733918/pexels-photo-2733918.jpeg",
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

        {/* Articles, Topics, Resources */}
        <div className="max-w-6xl mx-auto mt-16 space-y-16">
          {/* Top Articles */}
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
                  <h3 className="font-semibold text-[var(--color-primary)] mb-1">
                    {item.title}
                  </h3>
                  <p className="text-[var(--color-black)]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Topics */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Popular Topics</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              {[
                { icon: Sprout, label: "Organic Farming" },
                { icon: Droplet, label: "Irrigation Systems" },
                { icon: Bug, label: "Pest Control" },
                { icon: Wheat, label: "Harvesting Tips" },
              ].map((item, idx) => (
                <button
                  key={idx}
                  className="p-4 rounded-lg border bg-[var(--color-black-hover)] hover:bg-gray-100 text-left flex items-center gap-2"
                >
                  <item.icon className="w-5 h-5 text-[var(--color-primary)]" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Guides & Resources */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Guides & Resources</h2>
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
                  <h3 className="font-semibold text-[var(--color-primary)]">
                    {item.title}
                  </h3>
                  <p className="text-[var(--color-black)]">{item.desc}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* FAQs */}
          <div>
            <h2 className="text-2xl font-bold mb-6">FAQs</h2>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <FaqCard
                  key={idx}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Explore More + Contact */}
        <div className="py-14 mt-16 text-[var(--color-black)]">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 items-start">
            {/* Explore More */}
            <div className="md:col-span-2 space-y-8">
              <h2 className="text-2xl font-bold">Explore More</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  {
                    title: "Smart Farming Solutions",
                    desc: "Explore technology and ideas that make farming easier and more profitable.",
                    img: "https://images.pexels.com/photos/2818573/pexels-photo-2818573.jpeg",
                  },
                  {
                    title: "Knowledge & Inspiration",
                    desc: "Discover best practices, new research, and success stories from farmers worldwide.",
                    img: "https://images.pexels.com/photos/2255920/pexels-photo-2255920.jpeg",
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
                      <h3 className="font-semibold text-[var(--color-primary)]">
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

            {/* Contact Section */}
            <div className="bg-[var(--color-white)] rounded-xl shadow overflow-hidden flex flex-col">
              <img
                src="https://images.pexels.com/photos/775707/pexels-photo-775707.jpeg"
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
                    { icon: Phone, title: "Call Us", desc: "+1 (234) 567-890" },
                    {
                      icon: Mail,
                      title: "Email Us",
                      desc: "info@farmhelp.com",
                    },
                    {
                      icon: MessageCircle,
                      title: "WhatsApp",
                      desc: "+1 (234) 567-890",
                    },
                  ].map((item, idx) => (
                    <div
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
