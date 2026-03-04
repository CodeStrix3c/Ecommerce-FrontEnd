import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ContentWrapper from "@/components/shared/ContentWrapper";

// SAFE ICONS
import {
  LogIn,
  UserPlus,
  Home,
  Star,
  Users,
  User,
  ShieldCheck,
} from "lucide-react";

// ---------------- DATA ----------------

const sitemap = {
  access: [
    { text: "Login", icon: LogIn, path: "/login" },
    { text: "Signup", icon: UserPlus, path: "/sign-up" },
  ],

  sections: [
    {
      title: "Main Pages",
      icon: Home,
      items: [
        { text: "Home", path: "/" },
        { text: "About Our Craft Heritage", path: "/about" },
        { text: "Products", path: "/" },
        { text: "Contact Us", path: "/contact" },
      ],
    },
    {
      title: "Shop & Collections",
      icon: Star,
      items: [
        { text: "Shop All Products", path: "/" },
        { text: "Pashmina Shawls", path: "/textitles" },
        { text: "Handwoven Carpets", path: "/wood-craft" },
        { text: "Wood Carving Art", path: "/wood-craft" },
      ],
    },
    {
      title: "User Account",
      icon: User,
      items: [
        { text: "Dashboard", path: "/dashboard" },
        { text: "My Orders", path: "/orders" },
        { text: "Profile Settings", path: "/profile" },
        { text: "Wishlist", path: "/wishlist" },
      ],
    },
    {
      title: "Support & Legal",
      icon: ShieldCheck,
      items: [
        { text: "FAQ", path: "/faq" },
        { text: "Privacy Policy", path: "/privacy" },
        { text: "Terms & Conditions", path: "/terms" },
        { text: "Sitemap", path: "/sitemap" },
      ],
    },
  ],
};

export default function SitemapFinal() {
  return (
    <ContentWrapper topSpacing>
      <div className="w-full min-h-screen flex flex-col items-center">
        <div className="text-center mb-14 px-4">
          <h2 className="text-4xl font-bold">Sitemap</h2>
          <p className="text-black mt-2">
            Explore all sections of our Art & Craft platform in a visual tree layout.
          </p>
        </div>


        <div className="flex flex-col items-center">
          <BoxMain text="Access" icon={User} />
          <AnimatedLine h={60} />

          <div className="flex gap-6 mt-2">
            {sitemap.access.map((item, i) => (
              <BoxSmall key={i} text={item.text} path={item.path} />
            ))}
          </div>
        </div>


        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1 }}
          className="relative w-full max-w-5xl mt-8 border-t-2 border-black"
        >
          {["12%", "37%", "62%", "87%"].map((pos, i) => (
            <div key={i} className="absolute" style={{ left: pos, bottom: -12 }}>
              <ArrowDown />
            </div>
          ))}
        </motion.div>


        <div className="grid grid-cols-1 md:grid-cols-4 gap-14 mt-8">
          {sitemap.sections.map((sec, index) => (
            <Section
              key={index}
              title={sec.title}
              icon={sec.icon}
              items={sec.items}
            />
          ))}
        </div>
      </div>
    </ContentWrapper>
  );
}

const BoxMain = ({ text, icon: Icon }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ scale: 1.05 }}
    className="px-8 py-3 bg-[var(--color-secondary)] text-white rounded-lg shadow font-semibold flex items-center gap-3"
  >
    <Icon size={18} /> {text}
  </motion.div>
);

const BoxSmall = ({ text, path }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.05 }}
    className="text-sm"
  >
    <Link
      to={path}
      className="px-6 py-2 bg-[var(--color-gray)] text-black rounded-md shadow border hover:border-black transition block text-center"
    >
      {text}
    </Link>
  </motion.div>
);

const AnimatedLine = ({ h }) => (
  <motion.div
    initial={{ height: 0 }}
    animate={{ height: h }}
    transition={{ duration: 0.8 }}
    className="w-[2px] bg-black my-2"
    style={{ height: h }}
  />
);

const ArrowDown = () => (
  <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-t-black border-l-transparent border-r-transparent"></div>
);

const Section = ({ title, icon: Icon, items }) => (
  <div className="flex flex-col items-center">
    <BoxMain text={title} icon={Icon} />
    <AnimatedLine h={60} />

    <div className="flex flex-col gap-2 mt-1">
      {items.map((item, i) => (
        <BoxSmall key={i} text={item.text} path={item.path} />
      ))}
    </div>
  </div>
);