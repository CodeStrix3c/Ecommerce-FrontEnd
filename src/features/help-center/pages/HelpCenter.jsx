import React from "react";
import { Sprout, Droplet, Bug, Wheat } from "lucide-react";
import SecondarySearchBar from "@/components/shared/SecondarySearchBar";
import LoginLink from "@/components/shared/LoginLink";

export default function AgricultureHelpCenter() {
  return (
    <div className="min-h-screen bg-[var(--color-white)] text-[var(--color-black)]">
      <div className="border-b bg-[var(--color-white)] pb-4 text-center mt-10">
        <h1 className="text-4xl font-bold mb-6">Hi, how can we help?</h1>
        <SecondarySearchBar />
      </div>

      <div className="flex justify-center space-x-6 mt-6 border-b">
        {["Farmers", "Traders", "Researchers", "Policy Makers"].map(
          (tab, i) => (
            <button
              key={i}
              className="py-3 text-sm font-medium border-b-2 border-transparent hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition"
            >
              {tab}
            </button>
          )
        )}
      </div>

      <div className="max-w-3xl mx-auto text-center mt-10">
        <div className=" rounded-xl shadow p-6 flex flex-col items-center">
          <h2 className="font-bold text-lg mb-2">We’re here for you</h2>
          <p className="text-sm mb-4">
            {" "}
            <LoginLink />
            Log in to get help with your queries, resources, and support.
          </p>
          <button className="bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-hover)] text-[var(--color-white)] py-3 px-6 rounded-lg font-medium">
            Log in or sign up
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-16">
        <h2 className="text-xl font-bold mb-6">Guides for getting started</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-[var(--color-white)] shadow rounded-lg overflow-hidden">
            <img
              src="https://images.pexels.com/photos/164504/pexels-photo-164504.jpeg"
              alt="Farming basics"
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold">Farming Basics</h3>
              <p className="text-sm text-gray-600">
                Learn the foundations of sustainable farming.
              </p>
            </div>
          </div>
          <div className="bg-[var(--color-white)] shadow rounded-lg overflow-hidden">
            <img
              src="https://images.pexels.com/photos/169523/pexels-photo-169523.jpeg"
              alt="Organic farming"
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold">Organic Practices</h3>
              <p className="text-sm text-gray-600">
                Discover eco-friendly techniques to improve yields.
              </p>
            </div>
          </div>
          <div className="bg-[var(--color-white)] shadow rounded-lg overflow-hidden">
            <img
              src="https://images.pexels.com/photos/2733918/pexels-photo-2733918.jpeg"
              alt="Market access"
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold">Market Access</h3>
              <p className="text-sm text-gray-600">
                Learn how to connect with buyers and grow your business.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-16 space-y-16">
        <div>
          <h2 className="text-2xl font-bold mb-6">Top Articles</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm">
            <div>
              <h3 className="font-semibold text-[var(--color-primary)] mb-1">
                Crop rotation benefits
              </h3>
              <p className="text-gray-600">
                Improve soil health and yields with proper crop rotation.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--color-primary)] mb-1">
                Sustainable irrigation
              </h3>
              <p className="text-gray-600">
                Learn how to manage water resources effectively.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--color-primary)] mb-1">
                Pest management
              </h3>
              <p className="text-gray-600">
                Natural methods to protect crops from common pests.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--color-primary)] mb-1">
                Fertilizer optimization
              </h3>
              <p className="text-gray-600">
                Balance nutrients to boost crop production sustainably.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--color-primary)] mb-1">
                Soil testing guide
              </h3>
              <p className="text-gray-600">
                Step-by-step process to test and analyze your soil.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--color-primary)] mb-1">
                Climate-smart farming
              </h3>
              <p className="text-gray-600">
                Adapt modern methods to deal with climate change.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Popular Topics</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <button className="p-4 rounded-lg border bg-gray-50 hover:bg-gray-100 text-left flex items-center gap-2">
              <Sprout className="w-5 h-5 text-[var(--color-primary)]" />
              Organic Farming
            </button>
            <button className="p-4 rounded-lg border bg-gray-50 hover:bg-gray-100 text-left flex items-center gap-2">
              <Droplet className="w-5 h-5 text-[var(--color-primary)]" />
              Irrigation Systems
            </button>
            <button className="p-4 rounded-lg border bg-gray-50 hover:bg-gray-100 text-left flex items-center gap-2">
              <Bug className="w-5 h-5 text-[var(--color-primary)]" />
              Pest Control
            </button>
            <button className="p-4 rounded-lg border bg-gray-50 hover:bg-gray-100 text-left flex items-center gap-2">
              <Wheat className="w-5 h-5 text-[var(--color-primary)]" />
              Harvesting Tips
            </button>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-6">Guides & Resources</h2>
          <ul className="space-y-4 text-sm">
            <li className="border-b pb-4">
              <h3 className="font-semibold text-[var(--color-primary)]">
                Beginner’s Guide to Sustainable Farming
              </h3>
              <p className="text-gray-600">
                A complete handbook for new farmers exploring eco-friendly
                practices.
              </p>
            </li>
            <li className="border-b pb-4">
              <h3 className="font-semibold text-[var(--color-primary)]">
                Water Conservation Techniques
              </h3>
              <p className="text-gray-600">
                Learn proven methods to reduce water waste and save costs.
              </p>
            </li>
            <li>
              <h3 className="font-semibold text-[var(--color-primary)]">
                Crop Disease Identification
              </h3>
              <p className="text-gray-600">
                Visual guide to identify and treat common plant diseases.
              </p>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">FAQs</h2>
          <div className="space-y-4">
            <details className="p-4 border rounded-lg bg-gray-50">
              <summary className="font-semibold cursor-pointer">
                What is the best way to test soil quality?
              </summary>
              <p className="mt-2 text-gray-600">
                You can use soil testing kits or send samples to an agricultural
                lab for detailed analysis.
              </p>
            </details>
            <details className="p-4 border rounded-lg bg-gray-50">
              <summary className="font-semibold cursor-pointer">
                How often should I rotate my crops?
              </summary>
              <p className="mt-2 text-gray-600">
                Ideally, rotate crops every season to maintain soil fertility
                and reduce pest buildup.
              </p>
            </details>
            <details className="p-4 border rounded-lg bg-gray-50">
              <summary className="font-semibold cursor-pointer">
                What’s the difference between organic and chemical fertilizers?
              </summary>
              <p className="mt-2 text-gray-600">
                Organic fertilizers are natural and eco-friendly, while chemical
                ones act faster but may degrade soil over time.
              </p>
            </details>

            <details className="p-4 border rounded-lg bg-gray-50">
              <summary className="font-semibold cursor-pointer">
                How can I prevent common crop diseases?
              </summary>
              <p className="mt-2 text-gray-600">
                Use disease-resistant seeds, rotate crops, and ensure proper
                irrigation to minimize risks.
              </p>
            </details>
            <details className="p-4 border rounded-lg bg-gray-50">
              <summary className="font-semibold cursor-pointer">
                Which crops are best for organic farming?
              </summary>
              <p className="mt-2 text-gray-600">
                Vegetables like tomatoes, cucumbers, and leafy greens, as well
                as cereals like wheat and maize, are commonly grown organically.
              </p>
            </details>
            <details className="p-4 border rounded-lg bg-gray-50">
              <summary className="font-semibold cursor-pointer">
                What tools are essential for modern farming?
              </summary>
              <p className="mt-2 text-gray-600">
                Tractors, irrigation systems, soil testers, and precision
                farming tools help improve efficiency and yields.
              </p>
            </details>
          </div>
        </div>
      </div>

      <div className="py-14 mt-16  text-[var(--color-black)]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-6 text-[var(--color-black)]">
              Explore More
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-[var(--color-white)] text-[var(--color-black)] rounded-xl overflow-hidden shadow">
                <img
                  src="https://images.pexels.com/photos/2818573/pexels-photo-2818573.jpeg"
                  alt="Modern Farming"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-[var(--color-primary)]">
                    Smart Farming Solutions
                  </h3>
                  <p className="text-sm text-gray-600">
                    Explore technology and ideas that make farming easier and
                    more profitable.
                  </p>
                </div>
              </div>

              <div className="bg-[var(--color-white)] text-[var(--color-black)] rounded-xl overflow-hidden shadow">
                <img
                  src="https://images.pexels.com/photos/2255920/pexels-photo-2255920.jpeg"
                  alt="Farming Knowledge"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-[var(--color-primary)]">
                    Knowledge & Inspiration
                  </h3>
                  <p className="text-sm text-gray-600">
                    Discover best practices, new research, and success stories
                    from farmers worldwide.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[var(--color-white)] text-[var(--color-black)] rounded-xl shadow overflow-hidden flex flex-col">
            <img
              src="https://images.pexels.com/photos/775707/pexels-photo-775707.jpeg"
              alt="Contact Support"
              className="w-full h-40 object-cover"
            />
            <div className="p-6 space-y-6">
              <h2 className="text-xl font-bold text-[var(--color-black)]">
                Get in Touch
              </h2>
              <p className="text-sm text-gray-600">
                We’d love to hear from you! Choose a contact option below:
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-lg border shadow-sm hover:shadow-md hover:bg-gray-50 transition cursor-pointer">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[var(--color-secondary)] text-[var(--color-white)] text-lg">
                    📞
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--color-black)]">
                      Call Us
                    </h3>
                    <p className="text-sm text-gray-600">+1 (234) 567-890</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-lg border shadow-sm hover:shadow-md hover:bg-gray-50 transition cursor-pointer">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[var(--color-secondary)] text-[var(--color-white)] text-lg">
                    ✉️
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--color-black)]">
                      Email Us
                    </h3>
                    <p className="text-sm text-gray-600">info@farmhelp.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-lg border shadow-sm hover:shadow-md hover:bg-gray-50 transition cursor-pointer">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[var(--color-secondary)] text-white text-lg">
                    💬
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--color-black)]">
                      WhatsApp
                    </h3>
                    <p className="text-sm text-gray-600">+1 (234) 567-890</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
