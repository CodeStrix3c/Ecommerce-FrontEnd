import ContentWrapper from "@/components/shared/ContentWrapper";
import { Link } from "react-router-dom";
import { Home, Layers, User, HelpCircle } from "lucide-react";

function Sitemap() {
  const sections = [
    {
      title: "Main Pages",
      icon: <Home className="w-6 h-6  text-[var(--color-secondary)]" />,
      links: [
        { name: "Home", path: "/" },
        { name: "Features", path: "/features" },
        { name: "Pricing", path: "/pricing" },
        { name: "Blog", path: "/blog" },
        { name: "About Us", path: "/about" },
        { name: "Contact", path: "/contact" },
      ],
    },
    {
      title: "App Features",
      icon: <Layers className="w-6 h-6 text-[var(--color-secondary)] " />,
      links: [
        { name: "Crop Management", path: "/features/crop-management" },
        { name: "Field Mapping", path: "/features/field-mapping" },
        { name: "Weather Alerts", path: "/features/weather-alerts" },
        { name: "Inventory Tracking", path: "/features/inventory" },
        { name: "Income & Expenses", path: "/features/finance" },
        { name: "Reports & Analytics", path: "/features/reports" },
      ],
    },
    {
      title: "User Account",
      icon: <User className="w-6 h-6 text-[var(--color-secondary)]" />,
      links: [
        { name: "Profile", path: "/supplier-profile" },
        { name: "Dashboard", path: "/dashboard/orchard" },
        { name: "Settings", path: "/settings" },
      ],
    },
    {
      title: "Support & Legal",
      icon: <HelpCircle className="w-6 h-6 text-[var(--color-secondary)]" />,
      links: [
        { name: "Help Center", path: "/support" },
        { name: "Faq", path: "/FAQ" },
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms of Service", path: "/terms" },
      ],
    },
  ];

  return (
    <ContentWrapper compactScreen>
      <div className="py-28">
        <h1 className="text-3xl font-bold mb-6 text-[var(--color-black)]">
          Sitemap
        </h1>

        <div className="space-y-16">
          {sections.map((section, i) => (
            <div key={i}>
              <div className="flex items-center gap-2 pb-5">
                {section.icon}
                <h5 className="text-xl font-Semibold text-[var(--color-black)]">
                  {section.title}
                </h5>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {section.links.map((link, j) => (
                  <li key={j}>
                    <Link
                      className="text-[var(--color-black)] underline underline-offset-4 decoration-[var(--color-black)] hover:text-[var(--color-secondary)] hover:decoration-[var(--color-secondary)] transition-colors duration-200"
                      to={link.path}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <footer className="mt-10 text-sm text-[var(--color-black)]">
          Last updated: October 24, 2025
        </footer>
      </div>
    </ContentWrapper>
  );
}

export default Sitemap;
