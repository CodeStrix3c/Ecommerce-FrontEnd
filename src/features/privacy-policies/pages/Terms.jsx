import ContentWrapper from "@/components/shared/ContentWrapper";

function Terms() {
  return (
    <ContentWrapper compactScreen>
      <div className="py-8 lg:mt-32">
        <div className="text-[var(--color-black)]">
          <h6 className="pb-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-black)] sm:text-sm">
            Legal Terms
          </h6>

          <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl">
            Terms of Service
          </h1>

          <p className="pt-5 text-base  sm:text-lg md:text-xl">
            Welcome to Zirat (“we,” “our,” or “us”). These Terms of Service
            (“Terms”) govern your use of our farm management platform, mobile
            application, and website (collectively, the “Services”). By
            accessing or using our Services, you agree to these Terms. If you do
            not agree, please do not use our Services. Zirat provides digital
            tools to help farmers and agricultural professionals: Record and
            track crop, soil, and farm data; Manage income and expenses; Receive
            weather or farming insights; Analyze productivity and generate
            reports. The information and insights provided are for guidance only
            and should not replace professional agricultural advice.
          </p>

          <p className="pt-5 text-base sm:text-lg md:text-xl">
            When using our Services, you agree to:<br /><br /> 
            • Provide accurate farm and personal information.<br />
            • Use the app only for lawful agricultural purposes.<br />
            • Not misuse, copy, or reverse-engineer our software.<br />
            • Not upload harmful or misleading content.<br /><br />
            <b>We reserve the right to suspend
            or terminate accounts that violate these terms.</b>
          </p>

          <p className="pt-6 text-base  sm:text-lg md:text-xl">
            <b>
              All app content, including text, logos, graphics, software, and
              design, is owned by Zirat or its licensors. You may not reproduce,
              distribute, or create derivative works from our materials without
              written permission.
            </b>
          </p>

          {/* Additional Sections */}

          <h2 className="pt-8 text-xl font-semibold sm:text-2xl md:text-3xl">
            User Accounts
          </h2>
          <p className="pt-4 text-base  sm:text-lg md:text-xl">
            To access certain features of our Services, you must create a user account.
            You are responsible for maintaining the confidentiality of your account
            credentials and for all activities that occur under your account. Notify
            us immediately of any unauthorized use of your account.
          </p>

          <h2 className="pt-8 text-xl font-semibold sm:text-2xl md:text-3xl">
            Privacy and Data
          </h2>
          <p className="pt-4 text-base  sm:text-lg md:text-xl">
            We respect your privacy and handle your personal information in accordance
            with our Privacy Policy. By using our Services, you consent to the collection,
            use, and storage of your data as described in the Privacy Policy.
          </p>

          <h2 className="pt-8 text-xl font-semibold sm:text-2xl md:text-3xl">
            Limitation of Liability
          </h2>
          <p className="pt-4 text-base  sm:text-lg md:text-xl">
            Zirat and its affiliates will not be liable for any indirect, incidental,
            special, consequential, or punitive damages arising out of your use of
            the Services. Our Services are provided “as is,” and we make no warranties
            regarding their accuracy, reliability, or availability.
          </p>

          <h2 className="pt-8 text-xl font-semibold sm:text-2xl md:text-3xl">
            Governing Law
          </h2>
          <p className="pt-4 text-base  sm:text-lg md:text-xl">
            These Terms shall be governed by and construed in accordance with the
            laws of India, without regard to its conflict of law principles. You
            agree to submit to the jurisdiction of the courts in India for any disputes.
          </p>

          <h2 className="pt-8 text-xl font-semibold sm:text-2xl md:text-3xl">
            Dispute Resolution
          </h2>
          <p className="pt-4 text-base  sm:text-lg md:text-xl">
            Any dispute arising out of or relating to these Terms shall be resolved
            first through good faith negotiations. If the dispute cannot be resolved
            amicably, it will be submitted to binding arbitration in accordance with
            the rules of the Indian Arbitration and Conciliation Act.
          </p>

          <h2 className="pt-8 text-xl font-semibold sm:text-2xl md:text-3xl">
            Modifications to Terms
          </h2>
          <p className="pt-4 text-base  sm:text-lg md:text-xl">
            We may update these Terms from time to time. Updated Terms will be posted
            on our website or app, and the date of the last update will be revised.
            Continued use of our Services after updates constitutes acceptance of the
            revised Terms.
          </p>

          <p className="pt-6 text-sm sm:text-base md:text-lg">
            Last Updated: <b>May 13, 2025</b>
            <br />
            Thank you for using Zirat!
          </p>
        </div>
      </div>
    </ContentWrapper>
  );
}

export default Terms;
