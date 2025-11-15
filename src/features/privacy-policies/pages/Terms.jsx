import ContentWrapper from "@/components/shared/ContentWrapper";

function Terms() {
  return (
    <ContentWrapper compactScreen topSpacing>
      <div className="relative   ">
        
        <div className="text-center mb-10">
          <h6 className="text-sm uppercase tracking-widest text-[var(--color-secondary)] font-semibold">
            Legal Terms
          </h6>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold  mt-2">
            Terms of Service
          </h2>
          <p className="mt-3 text-[var(--color-black)] text-sm sm:text-base">
            Please read these terms carefully before using our services.
          </p>
        </div>

       
        <div className="text-gray-700 leading-relaxed space-y-8">
          <section>
            
            <p className="text-base sm:text-lg">
             Welcome to <b className="text-[var(--color-secondary)]">Ziraat</b> — your trusted partner in smart and sustainable farming.  
By accessing or using our platform, mobile app, or website (collectively, the “Services”), you agree to follow these Terms of Service (“Terms”).  
Our goal is to simplify your farm management through digital tools that help you track crops, monitor expenses, and make data-driven decisions for better yields.  
If you do not agree with these Terms, please refrain from using our Services.

            </p>

            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-base sm:text-lg">
                Zirat provides digital tools to help farmers:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
                <li>Record and track crop, soil, and farm data</li>
                <li>Manage income and expenses</li>
                <li>Receive weather and farming insights</li>
                <li>Analyze productivity and generate reports</li>
              </ul>
              <p className="mt-3 text-sm text-gray-600">
                *Information provided is for guidance only and should not replace professional advice.*
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 border-l-4 border-[var(--color-secondary)] pl-3">
              User Responsibilities
            </h2>
            <ul className="list-disc pl-6 mt-3 space-y-1 text-base sm:text-lg">
              <li>Provide accurate farm and personal information.</li>
              <li>Use the app only for lawful agricultural purposes.</li>
              <li>Do not copy, misuse, or reverse-engineer our software.</li>
              <li>Do not upload harmful or misleading content.</li>
            </ul>
            <p className="mt-3 font-medium text-[var(--color-secondary)]">
              We may suspend or terminate accounts that violate these terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 border-l-4 border-[var(--color-secondary)] pl-3">
              Intellectual Property
            </h2>
            <p className="mt-3 text-base sm:text-lg">
              All content, including text, logos, graphics, and software, is
              owned by <b>Zirat</b> or its licensors. You may not reproduce or
              distribute our materials without written permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 border-l-4 border-[var(--color-secondary)] pl-3">
              User Accounts
            </h2>
            <p className="mt-3 text-base sm:text-lg">
              To access certain features, you must create a user account. You’re
              responsible for keeping your login secure and notifying us of any
              unauthorized use.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 border-l-4 border-[var(--color-secondary)] pl-3">
              Privacy and Data
            </h2>
            <p className="mt-3 text-base sm:text-lg">
              We respect your privacy. By using our Services, you consent to the
              collection and use of your data as outlined in our Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 border-l-4 border-[var(--color-secondary)] pl-3">
              Limitation of Liability
            </h2>
            <p className="mt-3 text-base sm:text-lg">
              Zirat and its affiliates are not liable for indirect or
              consequential damages. Services are provided “as is,” without
              warranties of accuracy or reliability.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 border-l-4 border-[var(--color-secondary)] pl-3">
              Governing Law
            </h2>
            <p className="mt-3 text-base sm:text-lg">
              These Terms are governed by Indian law. You agree to the
              jurisdiction of Indian courts for any disputes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 border-l-4 border-[var(--color-secondary)] pl-3">
              Dispute Resolution
            </h2>
            <p className="mt-3 text-base sm:text-lg">
              Any disputes shall first be resolved through negotiation. If
              unresolved, arbitration will follow as per the Indian Arbitration
              and Conciliation Act.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 border-l-4 border-[var(--color-secondary)] pl-3">
              Updates to Terms
            </h2>
            <p className="mt-3 text-base sm:text-lg">
              We may update these Terms periodically. Continued use after
              changes means you accept the revised Terms.
            </p>
          </section>

          
          <div className="pt-8 border-t border-gray-200 mt-8 text-sm sm:text-base text-gray-600">
            <p>
              <b>Last Updated:</b> May 13, 2025
            </p>
            <p className="mt-2">
              Thank you for using <b>Zirat</b>
            </p>
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
}

export default Terms;
