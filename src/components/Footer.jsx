import React from "react";
import { Link } from "react-router-dom";
import { Globe, Facebook, Instagram, Twitter } from "lucide-react";
import ContentWrapper from "./shared/ContentWrapper";

const Footer = () => {
  return (
    <div className="flex w-full justify-center bg-[var(--color-black-hover)] pb-8">
      <ContentWrapper>
        <div className="flex w-full flex-col items-center">
          <div className="grid w-full grid-cols-1 gap-4 py-8 text-sm md:grid-cols-3">
            <div className="flex flex-col gap-4">
              <strong className="font-medium text-[var(--color-black)]">
                Support
              </strong>
              {[
                { name: "FAQ", link: "/faq" },
                { name: "Safety Guidelines", link: "/safety-guidelines" },
                { name: "Pesticide Usage Help", link: "/pesticide-help" },
                { name: "Environmental Support", link: "/environment-support" },
                { name: "Report Contamination", link: "/report-contamination" },
              ].map((item, idx) => (
                <p key={idx}>
                  <Link
                    to={item.link}
                    className="cursor-pointer font-normal text-[var(--color-black)] decoration-1 underline-offset-1 hover:underline"
                  >
                    {item.name}
                  </Link>
                </p>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <strong className="font-medium text-[var(--color-black)]">
                Products
              </strong>
              {[
                { name: "Insecticides", link: "/products/insecticides" },
                { name: "Herbicides", link: "/products/herbicides" },
                { name: "Fungicides", link: "/products/fungicides" },
                { name: "Fertilizers", link: "/products/fertilizers" },
                { name: "Organic Solutions", link: "/products/organic" },
              ].map((item, idx) => (
                <p key={idx}>
                  <Link
                    to={item.link}
                    className="cursor-pointer font-normal text-[var(--color-black)] decoration-1 underline-offset-1 hover:underline"
                  >
                    {item.name}
                  </Link>
                </p>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <strong className="font-medium text-[var(--color-black)]">
                Farmer Resources
              </strong>
              {[
                {
                  name: "Crop Information",
                  link: "/resources/crop-information",
                },
                { name: "Crop Protection", link: "/resources/crop-protection" },
                { name: "Weather Updates", link: "/resources/weather" },
                { name: "Market Prices", link: "/resources/market-prices" },
                { name: "Pest Alerts", link: "/resources/pest-alerts" },
                { name: "Farming Techniques", link: "/resources/techniques" },
              ].map((item, idx) => (
                <p key={idx}>
                  <Link
                    to={item.link}
                    className="cursor-pointer font-normal text-[var(--color-black)] decoration-1 underline-offset-1 hover:underline"
                  >
                    {item.name}
                  </Link>
                </p>
              ))}
            </div>
          </div>

          <div className="my-4 w-full border-t border-[var(--color-black)]"></div>

          <div className="flex w-full flex-col items-center justify-between gap-4 md:gap-0 lg:flex-row">
            <div className="mt-4 flex w-full justify-between gap-10 md:order-last md:w-auto">
              <div className="flex items-center gap-2 text-sm font-semibold text-[var(--color-black)]">
                <Globe className="h-6 w-6" />
                English(IN) <span className="mx-4">₹ INR</span>
              </div>
              <div className="flex gap-3 text-[var(--color-black)]">
                <Facebook className="h-6 w-6 cursor-pointer hover:text-[var(--color-primary)]" />
                <Instagram className="h-6 w-6 cursor-pointer hover:text-[var(--color-primary)]" />
                <Twitter className="h-6 w-6 cursor-pointer hover:text-[var(--color-primary)]" />
              </div>
            </div>

            <div className="flex w-full flex-col gap-2 px-1 font-normal text-[var(--color-black)] md:w-auto md:flex-row md:items-center md:gap-8">
              <p className="text-sm">
                &copy; {new Date().getFullYear()} Ziraat, Inc.
              </p>
              <div>
                <ul className="flex gap-6 text-sm">
                  <li className="cursor-pointer text-[var(--color-black)] decoration-1 underline-offset-1 hover:underline md:list-disc">
                    <Link to="/privacy">Privacy</Link>
                  </li>
                  <li className="cursor-pointer list-disc text-[var(--color-black)] decoration-1 underline-offset-1 hover:underline">
                    <Link to="/terms">Terms</Link>
                  </li>
                  <li className="cursor-pointer list-disc text-[var(--color-black)] decoration-1 underline-offset-1 hover:underline">
                    <Link to="/sitemap">Sitemap</Link>
                  </li>
                  <li className="cursor-pointer list-disc text-[var(--color-black)] decoration-1 underline-offset-1 hover:underline">
                    <Link to="/company-details">Company details</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default Footer;
