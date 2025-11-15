import ContentWrapper from "@/components/shared/ContentWrapper";

export default function Privacy() {
  return (
    <ContentWrapper compactScreen topSpacing>
      <div className="text-[var(--color-black)] lg:mt-32">
        <h2 className="pb-8 font-bold text-3xl sm:text-4xl text-center text-[var(--color-black)]">
          Privacy Policy
        </h2>

        <div className="mx-auto space-y-10">
          <section>
            <h3 className="text-2xl font-semibold mb-3 border-l-4 border-[var(--color-secondary)] pl-3 text-gray-800">
              Introduction
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              Welcome to{" "}
              <span className="font-semibold text-[var(--color-secondary)]">
                Ziraat
              </span>
              . We value your privacy and are committed to safeguarding your
              personal information. This Privacy Policy explains how we collect,
              use, and protect your data when you use our website, mobile app,
              and services.
            </p>
          </section>

          <section className="border-t border-gray-200 pt-6">
            <h3 className="text-2xl font-semibold mb-3 border-l-4 border-[var(--color-secondary)] pl-3 text-gray-800">
              Information We Collect
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              We may collect information directly from you or automatically when
              you use our platform. This includes:
            </p>
            <ul className="list-disc list-inside text-gray-600 text-lg space-y-1 mt-3">
              <li>Account and contact details (name, email, phone number)</li>
              <li>Farm and crop data you enter on the platform</li>
              <li>Device, browser, and location information</li>
              <li>
                Usage data such as page visits, interactions, and preferences
              </li>
            </ul>
          </section>

          <section className="border-t border-gray-200 pt-6">
            <h3 className="text-2xl font-semibold mb-3 border-l-4 border-[var(--color-secondary)] pl-3 text-gray-800">
              How We Use Your Information
            </h3>
            <ul className="list-disc list-inside text-gray-600 text-lg space-y-1">
              <li>To provide, personalize, and improve our services</li>
              <li>To send you updates, alerts, and recommendations</li>
              <li>To process payments securely and manage transactions</li>
              <li>To analyze trends and improve agricultural efficiency</li>
              <li>To comply with legal and regulatory requirements</li>
            </ul>
          </section>

          <section className="border-t border-gray-200 pt-6">
            <h3 className="text-2xl font-semibold mb-3 border-l-4 border-[var(--color-secondary)] pl-3 text-gray-800">
              Sharing & Disclosure
            </h3>
            <p className="text-gray-600 text-lg">
              We never sell your data. Information may be shared only with:
            </p>
            <ul className="list-disc list-inside text-gray-600 text-lg space-y-1 mt-3">
              <li>Service providers for hosting, analytics, or support</li>
              <li>Authorities when required by law</li>
              <li>Business partners, only with your consent</li>
            </ul>
          </section>

          <section className="border-t border-gray-200 pt-6">
            <h3 className="text-2xl font-semibold mb-3 border-l-4 border-[var(--color-secondary)] pl-3 text-gray-800">
              Cookies & Tracking
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Our platform uses cookies to remember your preferences, enhance
              user experience, and analyze performance. You can manage cookies
              through your browser settings at any time.
            </p>
          </section>

          <section className="border-t border-gray-200 pt-6">
            <h3 className="text-2xl font-semibold mb-3 border-l-4 border-[var(--color-secondary)] pl-3 text-gray-800">
              Your Rights
            </h3>
            <ul className="list-disc list-inside text-gray-600 text-lg space-y-1">
              <li>Access and update your data</li>
              <li>Request data deletion</li>
              <li>Withdraw consent for marketing communications</li>
              <li>Restrict or object to certain processing activities</li>
            </ul>
          </section>

          <section className="border-t border-gray-200 pt-6">
            <h3 className="text-2xl font-semibold mb-3 border-l-4 border-[var(--color-secondary)] pl-3 text-gray-800">
              Data Security
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              We implement encryption, secure servers, and strict access
              controls to protect your information. While no system is 100%
              secure, we take all reasonable measures to safeguard your data.
            </p>
          </section>

          <section className="border-t border-gray-200 pt-6">
            <h3 className="text-2xl font-semibold mb-3 border-l-4 border-[var(--color-secondary)] pl-3 text-gray-800">
              Policy Updates
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              We may revise this Privacy Policy periodically. Any updates will
              be posted on this page with a revised “Last Updated” date.
              Continued use of our services means you accept the changes.
            </p>
          </section>

          <section className="border-t border-gray-200 pt-6">
            <p className="text-gray-700 text-lg">
              Last Updated: <b>October 24, 2025</b>
              <br />
              Thank you for trusting{" "}
              <span className="font-semibold text-[var(--color-secondary)]">
                Ziraat
              </span>{" "}
              with your data.
            </p>
          </section>
        </div>
      </div>
    </ContentWrapper>
  );
}
