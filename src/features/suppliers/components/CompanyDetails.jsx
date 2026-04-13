import React from "react";
import ContentWrapper from "@/components/shared/ContentWrapper";

export default function CompanyDetails() {
  return (
    <ContentWrapper topSpacing>
      <div className="min-h-screen px-4 md:px-8  max-w-4xl mx-auto">
        <h1 className="text-4xl font-semibold mb-4">Company Details</h1>

        <p className="text-black text-md leading-relaxed max-w-3xl mb-6">
          Art&Craft Pvt. Ltd. is a curated platform dedicated to preserving and
          promoting traditional handmade arts and crafts. We collaborate with
          skilled artisans to bring authentic, high-quality handcrafted products
          to customers across India and beyond. Our mission is to support
          sustainable craftsmanship, empower artisan communities, and deliver
          timeless creations that celebrate cultural heritage and creative
          expression.
        </p>

        <div className="space-y-6 text-black leading-relaxed text-[15px] ">
          <div>
            <h2 className="font-semibold text-lg mb-2 inline-block border-b border-black ">
              Company Name
            </h2>
            <p>Art&Craft Pvt. Ltd.</p>
          </div>

          <div>
            <h2 className="font-semibold text-lg mb-2 inline-block border-b border-black ">
              Registered Office
            </h2>
            <p>
              Sidco Complex Rangreth , Srinagar, Jammu&Kashmir, India – 190019
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg mb-2 inline-block border-b border-black ">
              Contact Information
            </h2>
            <p>Email: mail@artandcraft.com</p>
            <p>Phone: +91 9990737679</p>
          </div>

          <div>
            <h2 className="font-semibold text-lg inline-block border-b border-black mb-2">
              CIN / Registration Number
            </h2>
            <p>U00000HR2025PTC000000</p>
          </div>

          <div>
            <h2 className="font-semibold text-lg inline-block border-b border-black mb-2">
              GST Number
            </h2>
            <p>06ABCDE1234F1Z5</p>
          </div>

          <div>
            <h2 className="font-semibold text-lg inline-block border-b border-black mb-2">
              Nature of Business
            </h2>
            <p>
              Manufacturer, retailer, and exporter of handmade art, crafts,
              textiles, woodwork, and traditional decor products.
            </p>
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
}
