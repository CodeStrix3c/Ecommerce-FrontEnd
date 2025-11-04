import ContentWrapper from "@/components/shared/ContentWrapper";

import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";

function CompanyDetails() {
  return (
    <ContentWrapper compactScreen>
      <div className="py-8 text-[var(--color-black)] lg:mt-32">
        <h1 className="pb-6 text-2xl font-bold sm:text-3xl md:text-4xl">
          Company Details
        </h1>

        {/* Company Overview */}
        <div className="mb-8 text-base  sm:text-lg md:text-xl">
          <p className="pb-2 text-lg font-semibold sm:text-xl">About Us:</p>
          <p>
            Zirat is a leading Farm Management Platform designed to empower
            farmers with digital tools for crop management, field mapping,
            weather insights, inventory tracking, and financial analytics.
            Our mission is to make farming smarter, more productive, and
            sustainable across India.
          </p>
        </div>

        {/* Company Info */}
        <div className="mb-8 text-base leading-relaxed sm:text-lg md:text-xl">
          <p className="pb-2 text-lg font-semibold sm:text-xl">
            Registered Office:
          </p>
          <p>
            Zirat Pvt. Ltd. <br />
            Rangret, Budgam, J&K 190001, India
          </p>

          <p className="pt-4">
            <b>Directors:</b> Ashiq  Ali <br />
            <b>VAT/GST ID:</b> 12ABCDE3456F7Z8 <br />
            <b>Company Registration Number:</b> 1234567890
          </p>
        </div>

        {/* Support */}
        <div className="mb-8 text-base sm:text-lg md:text-xl">
          <p className="font-semibold">Customer Support:</p>
          <p>
            For assistance with the platform, contact us at:
          </p>
          <a
            href="mailto:support@zirat.com"
            className="underline text-[var(--color-secondary)] hover:text-[var(--color-secondary-hover)]"
          >
            support@zirat.com
          </a>
          <p className="pt-2">Phone: +91 9876543210</p>
        </div>

        {/* Grievance Officer */}
        <div className="mb-8 text-base sm:text-lg md:text-xl">
          <p>
            For complaints or concerns about the platform or any
            violation of our Terms of Service, please contact our grievance officer:
          </p>
          <p className="pt-3 font-medium">Attn: Mr. Ashiq Ali, Grievance Officer</p>
          <p className="pt-2">
            email:{" "}
            <a
              href="mailto:grievance@zirat.com"
              className="underline text-[var(--color-secondary)] hover:text-[var(--color-secondary-hover)]"
            >
              ashiqAli@zirat.com
            </a>
          </p>
          <p className="pt-2">Phone: +91 9876543211</p>
        </div>

        {/* Business Hours */}
        <div className="mb-8 text-base sm:text-lg md:text-xl">
          <p className="font-semibold">Business Hours:</p>
          <ul className="list-disc list-inside">
            <li>Monday – Friday: 9:00 AM – 6:00 PM</li>
            <li>Saturday: 10:00 AM – 2:00 PM</li>
            <li>Sunday: Closed</li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="text-base sm:text-lg md:text-xl">
  <p className="font-semibold pb-2">Follow Us:</p>
  <ul className="list-none flex gap-4">
    <li className="flex items-center gap-1">
        <FaFacebook className="w-6 h-6 text-[#1877F2] hover:opacity-80 cursor-pointer" />
      <a
        href="https://www.facebook.com/zirat"
        target="_blank"
        rel="noopener noreferrer"
        className="underline"
      >
       
      </a>
    </li>
    <li className="flex items-center gap-1">
      <FaLinkedin className="w-6 h-6 text-[#0A66C2] hover:opacity-80 cursor-pointer" />
      <a
        href="https://www.linkedin.com/company/zirat"
        target="_blank"
        rel="noopener noreferrer"
        className="underline"
      >
       
      </a>
    </li>
    <li className="flex items-center gap-1">

      
 <FaTwitter className="w-6 h-6 text-[#1DA1F2] hover:opacity-80" />
      <a
        href="https://twitter.com/zirat"
        target="_blank"
        rel="noopener noreferrer"
        className="underline"
      >
        
      </a>
    </li>
  </ul>
</div>

      </div>
    </ContentWrapper>
  );
}

export default CompanyDetails;
