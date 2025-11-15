<<<<<<< HEAD

import ContentWrapper from "@/components/shared/ContentWrapper";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function CompanyDetails() {
  return (
    <ContentWrapper compactScreen topSpacing>
      <div className="text-[var(--color-black)] lg:mt-32">
        {/* Header */}
        <h2 className="pb-8  font-bold text-3xl sm:text-4xl text-center text-[var(--color-black)]">
          Company Details
        </h2>

        
        <div className="mx-auto  space-y-10">
          {/* About Section */}
          <section>
            <h3 className="text-2xl font-semibold mb-3 border-l-4 border-[var(--color-secondary)] pl-3 text-gray-800">
              About Us
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              <span className="font-semibold text-[var(--color-secondary)]">Ziraat</span> is an
              innovative Farm Management Platform designed to empower farmers
              with smart digital tools for crop planning, resource monitoring,
              weather tracking, and financial management.  
              Our mission is to make agriculture smarter, more sustainable, and data-driven
              — helping farmers maximize productivity and efficiency.
            </p>
          </section>

          
          <section className="border-t border-gray-200 pt-6">
            <h3 className="text-2xl font-semibold mb-3 border-l-4 border-[var(--color-secondary)] pl-3 text-gray-800">
              Registered Office
            </h3>
            <div className="text-gray-600 text-lg leading-relaxed">
              <p>
                <b>Zirat Pvt. Ltd.</b> <br />
                Rangret, Budgam, J&K 190001, India
              </p>

              <div className="mt-4 space-y-1">
                <p><b>Directors:</b> Ashiq Ali</p>
                <p><b>VAT/GST ID:</b> 12ABCDE3456F7Z8</p>
                <p><b>Company Registration Number:</b> 1234567890</p>
              </div>
            </div>
          </section>

          {/* Support */}
          <section className="border-t border-gray-200 pt-6">
            <h2 className="text-2xl font-semibold mb-3 border-l-4 border-[var(--color-secondary)] pl-3 text-gray-800">
              Customer Support
            </h2>
            <p className="text-gray-600 text-lg">
              For assistance or queries, you can reach our support team:
            </p>
            <a
              href="mailto:support@zirat.com"
              className="block mt-3 text-[var(--color-secondary)] font-medium hover:underline underline-offset-4 hover:text-[var(--color-secondary-hover)] transition-all"
            >
              support@zirat.com
            </a>
            <p className="mt-1 text-gray-700">Phone: +91 9876543210</p>
          </section>

          {/* Grievance Officer */}
          <section className="border-t border-gray-200 pt-6">
            <h3 className="text-2xl font-semibold mb-3 border-l-4 border-[var(--color-secondary)] pl-3 text-gray-800">
              Grievance Officer
            </h3>
            <p className="text-gray-600 text-lg">
              For complaints or concerns about the platform or any
              violation of our Terms of Service, please contact:
            </p>
            <p className="mt-3 font-medium text-gray-700">
              Attn: Mr. Ashiq Ali, Grievance Officer
            </p>
            <a
              href="mailto:ashiqAli@zirat.com"
              className="block mt-2 text-[var(--color-secondary)] font-medium hover:underline underline-offset-4 hover:text-[var(--color-secondary-hover)] transition-all"
            >
              ashiqAli@zirat.com
            </a>
            <p className="mt-1 text-gray-700">Phone: +91 9876543211</p>
          </section>

          {/* Business Hours */}
          <section className="border-t border-gray-200 pt-6">
            <h3 className="text-2xl font-semibold mb-3 border-l-4 border-[var(--color-secondary)] pl-3 text-gray-800">
              Business Hours
            </h3>
            <ul className="list-disc list-inside text-gray-600 text-lg space-y-1">
              <li>Monday – Friday: 9:00 AM – 6:00 PM</li>
              <li>Saturday: 10:00 AM – 2:00 PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </section>

          {/* Social Media */}
          <section className="border-t border-gray-200 pt-6">
            <h3 className="text-2xl font-semibold mb-3 border-l-4 border-[var(--color-secondary)] pl-3 text-gray-800">
              Follow Us
            </h3>
            <div className="flex gap-6 mt-3">
              <a
                href="https://facebook.com/zirat"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform duration-300"
              >
                <FaFacebook className="w-6 h-6 text-[#1877F2]" />
              </a>
              <a
                href="https://linkedin.com/company/zirat"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform duration-300"
              >
                <FaLinkedin className="w-6 h-6 text-[#0A66C2]" />
              </a>
              <a
                href="https://instagram.com/zirat"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform duration-300"
              >
                <FaInstagram className="w-6 h-6 text-[#E4405F]" />
              </a>
              <a
                href="https://twitter.com/zirat"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform duration-300"
              >
                <FaXTwitter className="w-6 h-6 text-black" />
              </a>
            </div>
          </section>
        </div>
=======
import ContentWrapper from "@/components/shared/ContentWrapper";

import { FaFacebook, FaInstagram, FaLinkedin,  } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

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

    
 <FaInstagram className="w-6 h-6 text-[#E4405F] hover:opacity-80 cursor-pointer" />
      <a
        href="https://twitter.com/zirat"
        target="_blank"
        rel="noopener noreferrer"
        className="underline"
      >
        
      </a>
    </li>
    <li className="flex items-center gap-1">

    
 <FaXTwitter className="w-6 h-6 text-black hover:opacity-80 cursor-pointer" />
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

>>>>>>> 91efd9998147dbc4f0908723ead972c9053db651
      </div>
    </ContentWrapper>
  );
}
<<<<<<< HEAD
=======

export default CompanyDetails;
>>>>>>> 91efd9998147dbc4f0908723ead972c9053db651
