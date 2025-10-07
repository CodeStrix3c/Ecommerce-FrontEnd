import ContentWrapper from "@/components/shared/ContentWrapper";

function Privacy() {
  return (
    <ContentWrapper compactScreen>
      <div className="py-8 lg:mt-32">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="text-[var(--color-black)] lg:col-span-8">
            <h6 className="pb-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-black)] sm:text-sm">
              Legal Terms
            </h6>

            <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl">
              Airbnb Privacy
            </h1>

            <p className="pt-6 text-base leading-relaxed sm:text-lg md:text-xl">
              Our Privacy Policy explains what personal information we collect,
              how we use personal information, how personal information is
              shared, and privacy rights.
            </p>

            <h3 className="pb-4 pt-8 text-xl font-semibold underline sm:text-2xl">
              Privacy Policy
            </h3>

            <p className="text-base leading-relaxed sm:text-lg md:text-xl">
              Please review the supplemental privacy policies linked within the
              privacy policy documents, such as for certain Airbnb services,
              that may be applicable to you.
            </p>

            <h3 className="pb-4 pt-8 text-xl font-semibold sm:text-2xl">
              Supplemental Privacy Policy Documents
            </h3>

            <ul className="ms-6 list-disc space-y-2 text-base sm:text-lg md:text-xl text-[var(--color-black)]">
              <li>Outside the United States Supplement</li>
              <li>United States Privacy Supplement</li>
              <li>Cookie Policy</li>
              <li>Enterprise Customers and Airbnb for Work</li>
              <li>Privacy Supplement for China Users</li>
              <li>Brazil Privacy Supplement</li>
              <li>Privacy Policy Supplement for Services and Experiences</li>
              <li>
                Privacy Policy Supplement for the Airbnb-friendly Marketplace
              </li>
              <li>Privacy Policy Supplement for Airbnb Creators</li>
            </ul>

            <div className="pt-8 text-[var(--color-black)]">
              <p className="text-base leading-relaxed sm:text-lg md:text-xl">
                <span className="font-semibold underline">Airbnb.org</span>{" "}
                <span className="font-bold">
                  is a separate and independent entity from Airbnb, Inc. Access
                  the{" "}
                </span>
                <span className="font-semibold underline">
                  Airbnb.org Privacy Policy
                </span>
                .
              </p>
            </div>

            <hr className="my-8 border-t-2 border-[var(--color-black)]" />

            {/* Related Articles */}
            <div className="text-[var(--color-black)]">
              <h2 className="pb-3 text-xl font-semibold sm:text-2xl">
                Related articles
              </h2>
              <p className="pb-1 text-[var(--color-black)]">Legal terms</p>
              <p className="pb-1 text-lg font-medium underline sm:text-xl">
                Privacy Policy
              </p>
              <p className="text-sm">Please review our Privacy Policy.</p>
            </div>

            <hr className="my-8 border-t-2 border-[var(--color-black)]" />

            <div className="text-[var(--color-black)]">
              <p className="pb-1 text-[var(--color-black)]">Community policy</p>
              <p className="pb-1 text-lg font-medium underline sm:text-xl">
                Protecting your privacy
              </p>
              <p className="text-sm">
                To create an environment that promotes not only physical safety,
                but also the safety and security of private information, certain
                behaviours and activities are...
              </p>
            </div>

            <hr className="my-8 border-t-2 border-[var(--color-black)]" />

            <div className="text-[var(--color-black)]">
              <p className="pb-1 text-[var(--color-black)]">Legal terms</p>
              <p className="pb-1 text-lg font-medium underline sm:text-xl">
                Outside the United States Supplement
              </p>
              <p className="text-sm">
                Please review this information which supplements our Privacy
                Policy.
              </p>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="shadow-lg w-80 rounded-xl border border-[var(--color-black)] bg-[var(--color-white)] p-4">
              <p className="text-base text-[var(--color-black)] sm:text-lg">
                Get help with your reservations, account, and more.
              </p>
              <button className="mt-4 w-full rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] py-2 text-sm text-[var(--color-white)] transition">
                Login or Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
}

export default Privacy;
