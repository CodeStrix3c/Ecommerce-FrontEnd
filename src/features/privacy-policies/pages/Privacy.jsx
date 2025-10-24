import ContentWrapper from "@/components/shared/ContentWrapper";

function Privacy() {
  return (
    <ContentWrapper compactScreen>
      <div className="py-8 lg:mt-32">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="text-[var(--color-black)] lg:col-span-8">
            <h6 className="pb-2 text-xs font-semibold uppercase  text-[var(--color-black)] sm:text-sm">
              Legal Terms
            </h6>

            <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl">
              Zirat Privacy
            </h1>

            <p className="pt-6 text-base  sm:text-lg md:text-xl">
              Our Privacy Policy explains what personal information we collect,
              how we use it, how it may be shared, and your privacy rights when
              using our Services.
            </p>

            <h3 className="pb-4 pt-8 text-xl font-semibold underline sm:text-2xl">
              Information We Collect
            </h3>
            <p className="text-base  sm:text-lg md:text-xl">
              We collect information you provide directly, such as account details,
              farm data, and payment information. We also collect usage data automatically,
              including device information, location data, and interaction logs.
            </p>

            <h3 className="pb-4 pt-8 text-xl font-semibold sm:text-2xl">
              How We Use Your Information
            </h3>
            <ul className="ms-6 list-disc space-y-2 text-base sm:text-lg md:text-xl text-[var(--color-black)]">
              <li>Provide, maintain, and improve our Services</li>
              <li>Deliver personalized insights, alerts, and recommendations</li>
              <li>Analyze usage trends and agricultural productivity</li>
              <li>Communicate updates, support messages, and marketing materials</li>
              <li>Prevent fraud, abuse, and security breaches</li>
              <li>Comply with legal obligations and enforce our terms</li>
            </ul>

            <h3 className="pb-4 pt-8 text-xl font-semibold sm:text-2xl">
              Sharing & Disclosure
            </h3>
            <p className="text-base leading-relaxed sm:text-lg md:text-xl">
              We do not sell your personal data. We may share information with:
            </p>
            <ul className="ms-6 list-disc space-y-2 text-base sm:text-lg md:text-xl text-[var(--color-black)]">
              <li>Service providers assisting us with analytics, hosting, and support</li>
              <li>Legal authorities if required by law or to protect our rights</li>
              <li>Business partners for legitimate business purposes with consent</li>
            </ul>

            <h3 className="pb-4 pt-8 text-xl font-semibold sm:text-2xl">
              Cookies & Tracking
            </h3>
            <p className="text-base sm:text-lg md:text-xl">
              We use cookies and similar technologies to enhance your experience,
              remember preferences, and analyze traffic. You can manage cookies
              through your browser settings.
            </p>

            <h3 className="pb-4 pt-8 text-xl font-semibold sm:text-2xl">
              User Rights
            </h3>
            <ul className="ms-6 list-disc space-y-2 text-base sm:text-lg md:text-xl text-[var(--color-black)]">
              <li>Access and correct your personal information</li>
              <li>Request deletion of your data</li>
              <li>Opt out of marketing communications</li>
              <li>Restrict or object to certain processing activities</li>
            </ul>

            <h3 className="pb-4 pt-8 text-xl font-semibold sm:text-2xl">
              Data Storage and Security
            </h3>
            <p className="text-base  sm:text-lg md:text-xl">
              We implement encryption, secure servers, and access controls to protect your
              data. However, no online system is completely secure. Always safeguard
              your login information and use strong passwords.
            </p>

            <h3 className="pb-4 pt-8 text-xl font-semibold sm:text-2xl">
              International Transfers
            </h3>
            <p className="text-base leading-relaxed sm:text-lg md:text-xl">
              If you access our Services from outside India, your data may be transferred
              to and processed in countries with different data protection laws.
            </p>

            <h3 className="pb-4 pt-8 text-xl font-semibold sm:text-2xl">
              Updates to This Privacy Policy
            </h3>
            <p className="text-base  sm:text-lg md:text-xl">
              We may update this Privacy Policy from time to time. Changes will be
              posted with a new “Last Updated” date. Continued use of our Services
              constitutes acceptance of the updated policy.
            </p>

            <p className="pt-6 text-sm sm:text-base md:text-lg">
              Last Updated: <b>October 24, 2025</b>
              <br />
              Thank you for trusting Zirat with your farm data!
            </p>
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
}

export default Privacy;
