import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQCard = ({ faqs }) => {

  const [openIndex, setOpenIndex] = useState(null);


  const defaultFaqs = [
    {
      question: "Are all your products handmade?",
      answer:
        "Yes, every product we offer is completely handmade by skilled artists and craft professionals. We do not mass-produce items in factories. Each piece is created with attention to detail, creativity, and care, making it unique. Because of the handmade nature, slight variations may occur, which adds to the authenticity and charm of the artwork.",
    },
    {
      question: "Do you accept custom orders?",
      answer:
        "Yes, we happily accept custom orders based on your specific requirements. Whether you want a particular color, size, theme, name personalization, or unique design, we can create something special for you. Custom artwork is perfect for gifts, home decor, or special occasions. Simply contact us with your idea, and our team will guide you through the process.",
    },
    {
      question: "What materials do you use in your art and craft products?",
      answer:
        "We use high-quality and carefully selected materials such as wood, resin, canvas, paper, fabric, clay, and other durable craft supplies. Our goal is to ensure every product is both beautiful and long-lasting. Whenever possible, we also use eco-friendly and sustainable materials to support responsible and environmentally conscious creativity.",
    },
    {
      question: "How long does it take to complete and deliver an order?",
      answer:
        "Ready-made products are usually shipped within 1–3 business days. Custom orders may take between 3–10 business days depending on the design complexity and materials required. Delivery time varies based on your location, but we always aim to deliver your artwork safely and as quickly as possible.",
    },
    {
      question: "Do you ship nationwide and internationally?",
      answer:
        "Yes, we offer nationwide shipping as well as international delivery. All products are carefully packaged using protective materials to prevent damage during transit. Shipping charges and delivery times may vary depending on your location and shipping method selected.",
    },
    {
      question: "Will the product look exactly like the pictures?",
      answer:
        "Because our products are handmade, each piece is unique. While we follow the same design and style shown in the images, there may be slight variations in color, texture, or finishing. These differences are natural in handmade art and make each product one of a kind.",
    },
    {
      question: "Do you offer returns or exchanges?",
      answer:
        "Yes, customer satisfaction is very important to us. If you receive a damaged or incorrect item, you can request a return or exchange within 3–5 days of delivery. Please contact our support team with photos of the product, and we will assist you promptly. Custom orders may not be eligible for return unless damaged.",
    },
    {
      question: "Are your products suitable for gifts?",
      answer:
        "Absolutely. Our handmade art and craft products make meaningful and memorable gifts for birthdays, weddings, anniversaries, festivals, and special occasions. Because each item is handmade, it carries a personal and emotional value that makes it more special than mass-produced items.",
    },
    {
      question: "Do you accept bulk or wholesale orders?",
      answer:
        "Yes, we accept bulk orders for events, corporate gifting, weddings, and businesses. We can also customize bulk orders according to your needs. Please contact us with your requirements, and we will provide pricing, timelines, and design options.",
    },
    {
      question: "How can I take care of handmade art and craft products?",
      answer:
        "To maintain the beauty and durability of your handmade products, keep them in a clean and dry place, away from direct sunlight, moisture, or excessive heat. Avoid rough handling, and gently clean with a soft cloth if needed. Proper care will ensure your artwork lasts for many years.",
    },
    {
      question: "Why should I choose handmade products instead of machine-made products?",
      answer:
        "Handmade products offer uniqueness, creativity, and authenticity that machine-made products cannot replicate. Each handmade item reflects the artist’s skill, effort, and passion. By purchasing handmade products, you also support artists and help preserve traditional craftsmanship.",
    },
    {
      question: "How can I contact you for support or inquiries?",
      answer:
        "You can contact us through our Contact page, email, or social media platforms. Our support team is always ready to assist you with product information, custom orders, or any questions you may have. We strive to provide friendly and helpful customer service.",
    },
  ];


  // Use API FAQs if available, otherwise use default FAQs
  const faqList =
    Array.isArray(faqs) && faqs.length > 0 ? faqs : defaultFaqs;

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-10 px-4 sm:px-8 md:px-16 lg:px-24">

      {/* Heading */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3">
          Frequently Asked Questions
        </h2>

        <p className="text-base sm:text-lg">
          Find answers to common questions about our art & craft products and services.
        </p>
      </div>

      {/* FAQ List */}
      <div className="max-w-5xl mx-auto space-y-2">

        {faqList.map((faq, i) => (
          <div
            key={i}
            className="border border-[var(--color-gray)] rounded-md shadow-sm hover:shadow-md transition-shadow duration-300"
          >

            {/* Question */}
            <button
              onClick={() => toggle(i)}
              className="w-full flex justify-between items-center text-left p-4 sm:p-5"
            >
              <h3 className="font-medium text-md">
                {faq.question}
              </h3>

              <ChevronDown
                className={`w-5 h-5 text-[var(--color-black)] transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""
                  }`}
              />
            </button>

            {/* Answer */}
            {openIndex === i && (
              <div className="px-4 sm:px-5 pb-4 leading-relaxed text-base lg:text-sm">
                {faq.answer}
              </div>
            )}

          </div>
        ))}

      </div>

    </section>
  );
};

export default FAQCard;
