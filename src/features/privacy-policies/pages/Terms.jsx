import React from "react";
import Footer from "@/components/Footer";
import ContentWrapper from "@/components/shared/ContentWrapper";

export default function Terms() {
  return (
    <ContentWrapper>
      <div className="min-h-screen py-16 px-6 sm:px-10 bg-white">
        <div className="lg:mt-24 mb-10 text-sm">
          LEGAL TERMS
          <h1 className="text-4xl font-semibold text-black tracking-tight">
            Terms & Conditions
          </h1>
          <p className="text-[var(--color-primary)] text-md mt-2">
            Last Updated: February 20, 2026
          </p>
        </div>


        <div className="space-y-12 text-black text-[15px] leading-relaxed">

          {/* Introduction */}
          <section>
            <p>
              Welcome to CraftGully.com, an arts & crafts marketplace and community platform
              operated by Chingari Ventures LLP, located at Carlen, 1st Floor,
              St Mary's Colony, Miramar, Panjim, Goa – 403001.
            </p>
            <p className="mt-4">
              By accessing or using this website, creating an account, or purchasing
              products, you agree to comply with and be bound by these Terms &
              Conditions. If you do not agree with any part of these terms, you
              should discontinue use of the website immediately.
            </p>
          </section>

          {/* Eligibility */}
          <section>
            <h2 className="text-lg font-semibold text-black mb-3">
              Eligibility
            </h2>
            <p>
              Use of this website is available only to individuals who are legally
              capable of entering into binding contracts under applicable laws.
              Users under 18 years of age must access the website under supervision
              of a parent or legal guardian.
            </p>
          </section>

          {/* Account */}
          <section>
            <h2 className="text-lg font-semibold text-black mb-3">
              Account Responsibility
            </h2>
            <p>
              You are responsible for maintaining the confidentiality of your
              login credentials and for restricting access to your devices.
              All activities conducted under your account are your responsibility.
              We reserve the right to suspend or terminate accounts containing
              inaccurate or misleading information.
            </p>
          </section>

          {/* Use of Website */}
          <section>
            <h2 className="text-lg font-semibold text-black mb-3">
              Acceptable Use
            </h2>
            <p>
              You agree not to misuse the platform, attempt unauthorized access,
              interfere with website security, upload malicious software, or
              engage in fraudulent activities. Commercial exploitation of the
              website content without written permission is strictly prohibited.
            </p>
          </section>

          {/* Handmade Disclaimer */}
          <section>
            <h2 className="text-lg font-semibold text-black mb-3">
              Handmade Product Disclaimer
            </h2>
            <p>
              Many products available on our platform are handcrafted by artisans.
              Variations in color, texture, design, and finish are natural
              characteristics of handmade products and are not considered defects.
              Product images are indicative and may slightly vary from actual items.
            </p>
          </section>

          {/* Pricing & Payment */}
          <section>
            <h2 className="text-lg font-semibold text-black mb-3">
              Pricing & Payments
            </h2>
            <p>
              All prices are listed in Indian Rupees (INR) and are subject to change
              without prior notice. Full payment must be received before dispatch,
              except where Cash on Delivery is applicable. We are not responsible
              for transaction failures caused by banking institutions or payment gateways.
            </p>
          </section>

          {/* Shipping */}
          <section>
            <h2 className="text-lg font-semibold text-black mb-3">
              Shipping & Delivery
            </h2>
            <p>
              Delivery timelines are estimates and may vary depending on location
              and external factors. Risk of loss and title for products pass to
              you upon delivery to the shipping carrier. Incorrect shipping details
              provided by the customer may result in additional charges.
            </p>
          </section>

          {/* Cancellation */}
          <section>
            <h2 className="text-lg font-semibold text-black mb-3">
              Cancellation & Refunds
            </h2>
            <p>
              Orders may be cancelled before processing. Once processed, cancellation
              may not be possible. Refunds, if applicable, will be issued in a
              reasonable timeframe through the original payment method.
            </p>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-lg font-semibold text-black mb-3">
              Intellectual Property
            </h2>
            <p>
              All logos, designs, artwork, text, graphics, and other materials
              displayed on this website are protected by intellectual property laws.
              Unauthorized reproduction, distribution, or commercial use is strictly prohibited.
            </p>
          </section>

          {/* Third Party Links */}
          <section>
            <h2 className="text-lg font-semibold text-black mb-3">
              Third-Party Links
            </h2>
            <p>
              Our website may contain links to third-party websites. We are not
              responsible for the content, policies, or practices of external
              websites and encourage users to review their terms independently.
            </p>
          </section>

          {/* Disclaimer */}
          <section>
            <h2 className="text-lg font-semibold text-black mb-3">
              Disclaimer of Warranties
            </h2>
            <p>
              The website is provided on an “as is” and “as available” basis.
              We do not guarantee uninterrupted access or error-free functionality.
              We disclaim all warranties, express or implied, to the fullest
              extent permitted by law.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-lg font-semibold text-black mb-3">
              Limitation of Liability
            </h2>
            <p>
              We shall not be liable for indirect, incidental, special, or
              consequential damages arising from the use of this website or
              products purchased through it.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-lg font-semibold text-black mb-3">
              Governing Law
            </h2>
            <p>
              These Terms & Conditions are governed by the laws of India.
              Any disputes shall be subject to the exclusive jurisdiction
              of courts located in Mumbai, India.
            </p>
          </section>

          {/* Changes */}
          <section>
            <h2 className="text-lg font-semibold text-black mb-3">
              Changes to Terms
            </h2>
            <p>
              We reserve the right to modify these Terms at any time.
              Continued use of the website after changes are posted
              constitutes acceptance of those changes.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-lg font-semibold text-black mb-3">
              Contact Information
            </h2>
            <p>
              If you have questions regarding these Terms & Conditions,
              please contact us at:
            </p>
            <p className="mt-2 font-medium text-[var(--color-secondary)]">
              mail@artcraft.com
            </p>
            Thank you for using Art&Craft.
          </section>

        </div>
      </div>
    </ContentWrapper>
  );
}