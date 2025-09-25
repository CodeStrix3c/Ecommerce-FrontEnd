// import React from "react";
// import {
//   Leaf,
//   Sprout,
//   Users,
//   Heart,
//   Star,
//   Map,
//   Award,
//   HelpCircle,
// } from "lucide-react";

// export default function AboutUs() {
//   return (
//     <div className="bg-[var(--color-white)] text-[var(--color-black)] md:mt-28 lg:mt-36">
// <section
//   className="relative flex items-center justify-center
//              min-h-[60vh] md:min-h-[70vh] bg-cover bg-center"
//   style={{
//     backgroundImage:
//       "url('https://plus.unsplash.com/premium_photo-1682436526302-516ec782f22e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fG9yY2hhcmR8ZW58MHx8MHx8fDA%3D')",
//   }}
// >

// </section>

// <section className="py-12 md:py-16 px-6 text-center bg-[var(--color-white)] text-[var(--color-black)]">
//   <div className="max-w-3xl mx-auto">
//     <h2 className="text-1xl sm:text-3xl md:text-4xl font-medium mb-6">About Us</h2>
//     <p className="text-base sm:text-lg md:text-xl leading-relaxed text-justify">
//       We are a community of passionate farmers dedicated to bringing fresh,
//       organic, and sustainable produce directly from our fields to your table.
//       Our journey began with a small group of farmers who believed in
//       preserving traditional farming methods while embracing modern
//       sustainable practices. Over the years, we have grown into a trusted
//       community that values quality, transparency, and care for the land.
//       Every seed we plant and every harvest we collect is done with love,
//       ensuring you get the purest produce.
//     </p>
//   </div>
// </section>

//       {/* <section className="py-12 md:py-16 px-4 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">

//   <img
//     src="https://plus.unsplash.com/premium_photo-1682436526302-516ec782f22e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fG9yY2hhcmR8ZW58MHx8MHx8fDA%3D"
//     className="hidden md:block rounded-2xl shadow-lg w-full object-cover"
//     alt="Our Story"
//   />

//   <div className="text-center md:text-left">
//     <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Our Story</h2>
//     <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-4">
//       Our journey began with a small group of farmers who believed in
//       preserving traditional farming methods while embracing modern
//       sustainable practices. Over the years, we have grown into a trusted
//       community that values quality, transparency, and care for the land.
//       Every seed we plant and every harvest we collect is done with love,
//       ensuring you get the purest produce.
//     </p>
//     <p className="text-sm sm:text-base md:text-lg leading-relaxed">
//       Every seed we plant and every harvest we collect is done with love,
//       ensuring you get the purest produce.
//     </p>
//   </div>
// </section> */}

//       <section className="py-12 md:py-16 px-4 md:px-20 text-center">
//         <h2 className="text-2xl sm:text-3xl font-semibold mb-8 md:mb-12">
//           Our Mission & Values
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
//           <div className="p-6 rounded-2xl bg-green-50 shadow hover:shadow-lg transition">
//             <Leaf
//               className="mx-auto mb-4 text-[var(--color-primary)]"
//               size={36}
//             />
//             <h3 className="font-bold text-lg md:text-xl mb-2">Sustainability</h3>
//             <p className="text-sm sm:text-base">
//               Protecting the soil and environment through eco-friendly methods.
//             </p>
//           </div>
//           <div className="p-6 rounded-2xl bg-green-50 shadow hover:shadow-lg transition">
//             <Sprout
//               className="mx-auto mb-4 text-[var(--color-primary)]"
//               size={36}
//             />
//             <h3 className="font-bold text-lg md:text-xl mb-2">Quality Harvest</h3>
//             <p className="text-sm sm:text-base">
//               Delivering farm-fresh produce, rich in taste and nutrients.
//             </p>
//           </div>
//           <div className="p-6 rounded-2xl bg-green-50 shadow hover:shadow-lg transition">
//             <Users
//               className="mx-auto mb-4 text-[var(--color-primary)]"
//               size={36}
//             />
//             <h3 className="font-bold text-lg md:text-xl mb-2">Community</h3>
//             <p className="text-sm sm:text-base">
//               Empowering local farmers and supporting rural livelihoods.
//             </p>
//           </div>
//           <div className="p-6 rounded-2xl bg-green-50 shadow hover:shadow-lg transition">
//             <Heart
//               className="mx-auto mb-4 text-[var(--color-primary)]"
//               size={36}
//             />
//             <h3 className="font-bold text-lg md:text-xl mb-2">Trust</h3>
//             <p className="text-sm sm:text-base">
//               Building strong bonds with customers through honesty & care.
//             </p>
//           </div>
//         </div>
//       </section>

//       <section className="py-12 md:py-16 px-4 md:px-20 text-center">
//         <h2 className="text-2xl sm:text-3xl font-semibold mb-8 md:mb-12">
//           Why Choose Us?
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
//           <div className="p-6 bg-green-50 rounded-2xl shadow hover:shadow-lg transition">
//             <Star
//               className="mx-auto mb-4 text-[var(--color-primary)]"
//               size={36}
//             />
//             <h3 className="font-bold text-lg md:text-xl mb-2">Farm Fresh</h3>
//             <p className="text-sm sm:text-base">
//               Harvested daily to bring you the freshest produce.
//             </p>
//           </div>
//           <div className="p-6 bg-green-50 rounded-2xl shadow hover:shadow-lg transition">
//             <Map
//               className="mx-auto mb-4 text-[var(--color-primary)]"
//               size={36}
//             />
//             <h3 className="font-bold text-lg md:text-xl mb-2">Local Support</h3>
//             <p className="text-sm sm:text-base">
//               Directly supporting farmers in your community.
//             </p>
//           </div>
//           <div className="p-6 bg-green-50  rounded-2xl shadow hover:shadow-lg transition">
//             <Award
//               className="mx-auto mb-4 text-[var(--color-primary)]"
//               size={36}
//             />
//             <h3 className="font-bold text-lg md:text-xl mb-2">
//               Certified Organic
//             </h3>
//             <p className="text-sm sm:text-base">
//               Trusted produce grown without chemicals or pesticides.
//             </p>
//           </div>
//         </div>
//       </section>

//       <section className="py-12 md:py-16 px-4 md:px-20 ">
//         <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-8 md:mb-12">
//           Frequently Asked Questions
//         </h2>
//         <div className="max-w-3xl mx-auto space-y-6">
//           {[
//             {
//               q: "Are your products 100% organic?",
//               a: "Yes, all our produce is grown naturally without harmful pesticides or chemicals.",
//             },
//             {
//               q: "Do you deliver to my city?",
//               a: "We deliver to most major cities and towns. You can check delivery availability at checkout.",
//             },
//             {
//               q: "How do I trust your farming practices?",
//               a: "We are certified organic and open our farms for visits to ensure full transparency.",
//             },
//           ].map((faq, i) => (
//             <div
//               key={i}
//               className="p-5 md:p-6 border rounded-xl shadow-sm hover:shadow-md transition"
//             >
//               <div className="flex items-center mb-2 gap-2">
//                 <HelpCircle
//                   className="text-[var(--color-primary)]"
//                   size={20}
//                 />
//                 <h3 className="font-semibold text-base md:text-lg">{faq.q}</h3>
//               </div>
//               <p className="text-gray-600 text-sm sm:text-base">{faq.a}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* addtestimonial */}

//       <section className="py-16 md:py-20  text-[var(--color-primary)] text-center">
//         <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
//           Join Our Farming Journey
//         </h2>
//         <p className="max-w-2xl mx-auto mb-6 text-sm sm:text-base md:text-lg">
//           Together, we can build a healthier future by choosing natural,
//           sustainable, and farmer-friendly produce.
//         </p>
//         <button className="bg-[var(--color-primary)] text-[var(--color-white)] px-5 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold hover:bg-[var(--color-primary-hover)] transition text-sm sm:text-base">
//           Contact Us
//         </button>
//       </section>
//     </div>
//   );
// }

import React from "react";
import {
  Leaf,
  Sprout,
  Users,
  Heart,
  Star,
  Map,
  Award,
  HelpCircle,
} from "lucide-react";

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
  return (
    <div className="bg-[var(--color-white)] text-[var(--color-black)] md:mt-28 lg:mt-36">
      <section
        className="relative flex items-center justify-center 
             min-h-[60vh] md:min-h-[70vh] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://plus.unsplash.com/premium_photo-1682436526302-516ec782f22e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fG9yY2hhcmR8ZW58MHx8MHx8fDA%3D')",
        }}
      ></section>

      <section className="py-12 md:py-16 px-6 text-center bg-[var(--color-white)] text-[var(--color-black)]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-1xl  sm:text-3xl md:text-4xl font-medium mb-6">
            About Us
          </h2>
          <p className="text-base  sm:text-lg md:text-xl leading-relaxed text-justify">
            We are a community of passionate farmers dedicated to bringing
            fresh, organic, and sustainable produce directly from our fields to
            your table. Our journey began with a small group of farmers who
            believed in preserving traditional farming methods while embracing
            modern sustainable practices. Over the years, we have grown into a
            trusted community that values quality, transparency, and care for
            the land. Every seed we plant and every harvest we collect is done
            with love, ensuring you get the purest produce.
          </p>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-12 md:py-16 px-4 md:px-20 text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-8 md:mb-12">
          Our Mission & Values
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <div className="p-6 rounded-2xl bg-green-50 shadow hover:shadow-lg transition">
            <Leaf
              className="mx-auto mb-4 text-[var(--color-secondary)]"
              size={36}
            />
            <h3 className="font-bold text-lg md:text-xl mb-2">
              Sustainability
            </h3>
            <p className="text-sm sm:text-base">
              Protecting the soil and environment through eco-friendly methods.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-green-50 shadow hover:shadow-lg transition">
            <Sprout
              className="mx-auto mb-4 text-[var(--color-secondary)]"
              size={36}
            />
            <h3 className="font-bold text-lg md:text-xl mb-2">
              Quality Harvest
            </h3>
            <p className="text-sm sm:text-base">
              Delivering farm-fresh produce, rich in taste and nutrients.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-green-50 shadow hover:shadow-lg transition">
            <Users
              className="mx-auto mb-4 text-[var(--color-secondary)]"
              size={36}
            />
            <h3 className="font-bold text-lg md:text-xl mb-2">Community</h3>
            <p className="text-sm sm:text-base">
              Empowering local farmers and supporting rural livelihoods.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-green-50 shadow hover:shadow-lg transition">
            <Heart
              className="mx-auto mb-4 text-[var(--color-secondary)]"
              size={36}
            />
            <h3 className="font-bold text-lg md:text-xl mb-2">Trust</h3>
            <p className="text-sm sm:text-base">
              Building strong bonds with customers through honesty & care.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-[var(--color-white)] py-16 px-6 md:px-20">
        <h2 className="text-3xl font-semibold text-center mb-12">Fast Facts</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, i) => (
            <div
              key={i}
              className="bg-[var(--color-white)] p-6 rounded-2xl shadow hover:shadow-xl transition text-center"
            >
              <h3 className="text-3xl font-bold text-[var(--color-primary)]">
                {item.value}
              </h3>
              <p className="mt-2 text-[var(--color-black)]">{item.label}</p>
            </div>
          ))}
        </div>
      </section>
      {/* Why Choose Us */}
      <section className="py-12 md:py-16 px-4 md:px-20 text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-8 md:mb-12">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="p-6 bg-green-50 rounded-2xl shadow hover:shadow-lg transition">
            <Star
              className="mx-auto mb-4 text-[var(--color-secondary)]"
              size={36}
            />
            <h3 className="font-bold text-lg md:text-xl mb-2">Farm Fresh</h3>
            <p className="text-sm sm:text-base">
              Harvested daily to bring you the freshest produce.
            </p>
          </div>
          <div className="p-6 bg-green-50 rounded-2xl shadow hover:shadow-lg transition">
            <Map
              className="mx-auto mb-4 text-[var(--color-secondary)]"
              size={36}
            />
            <h3 className="font-bold text-lg md:text-xl mb-2">Local Support</h3>
            <p className="text-sm sm:text-base">
              Directly supporting farmers in your community.
            </p>
          </div>
          <div className="p-6 bg-green-50  rounded-2xl shadow hover:shadow-lg transition">
            <Award
              className="mx-auto mb-4 text-[var(--color-secondary)]"
              size={36}
            />
            <h3 className="font-bold text-lg md:text-xl mb-2">
              Certified Organic
            </h3>
            <p className="text-sm sm:text-base">
              Trusted produce grown without chemicals or pesticides.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-16 px-4 md:px-20 ">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-8 md:mb-12">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto space-y-6">
          {[
            {
              q: "Are your products 100% organic?",
              a: "Yes, all our produce is grown naturally without harmful pesticides or chemicals.",
            },
            {
              q: "Do you deliver to my city?",
              a: "We deliver to most major cities and towns. You can check delivery availability at checkout.",
            },
            {
              q: "How do I trust your farming practices?",
              a: "We are certified organic and open our farms for visits to ensure full transparency.",
            },
          ].map((faq, i) => (
            <div
              key={i}
              className="p-5 md:p-6 border rounded-xl shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center mb-2 gap-2">
                <HelpCircle
                  className="text-[var(--color-secondary)]"
                  size={20}
                />
                <h3 className="font-semibold text-base md:text-lg">{faq.q}</h3>
              </div>
              <p className="text-gray-600 text-sm sm:text-base">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}

      <section className="py-16 md:py-20  text-[var(--color-primary)] text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
          Join Our Farming Journey
        </h2>
        <p className="max-w-2xl mx-auto mb-6 text-sm sm:text-base md:text-lg">
          Together, we can build a healthier future by choosing natural,
          sustainable, and farmer-friendly produce.
        </p>
        <button className="bg-[var(--color-primary)] text-[var(--color-white)] px-5 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold hover:bg-[var(--color-primary-hover)] transition text-sm sm:text-base">
          Contact Us
        </button>
      </section>
    </div>
  );
}
