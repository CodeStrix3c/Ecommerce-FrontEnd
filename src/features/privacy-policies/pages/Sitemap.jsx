// import React from "react";
// import ContentWrapper from "@/components/shared/ContentWrapper";
// import { Link } from "react-router-dom";
// import { Home, Layers, User, HelpCircle } from "lucide-react";

// export default function Sitemap() {
//   const sections = [
//     {
//       title: "Main Pages",
//       icon: <Home className="w-5 h-5 text-white" />,
//       color: "bg-[var(--color-secondary)]",
//       links: [
//         { name: "Home", path: "/" },
//         { name: "Features", path: "/features" },
//         { name: "Pricing", path: "/pricing" },
//         { name: "Blog", path: "/blog" },
//         { name: "About Us", path: "/about" },
//         { name: "Contact", path: "/contact" },
//       ],
//     },
//     {
//       title: "App Features",
//       icon: <Layers className="w-5 h-5 text-white" />,
//       color: "bg-[var(--color-secondary)]",
//       links: [
//         { name: "Crop Management", path: "/features/crop-management" },
//         { name: "Field Mapping", path: "/features/field-mapping" },
//         { name: "Weather Alerts", path: "/features/weather-alerts" },
//         { name: "Inventory Tracking", path: "/features/inventory" },
//         { name: "Income & Expenses", path: "/features/finance" },
//         { name: "Reports & Analytics", path: "/features/reports" },
//       ],
//     },
//     {
//       title: "User Account",
//       icon: <User className="w-5 h-5 text-white" />,
//       color: "bg-[var(--color-secondary)]",
//       links: [
//         { name: "Profile", path: "/supplier-profile" },
//         { name: "Dashboard", path: "/dashboard/orchard" },
//         { name: "Settings", path: "/settings" },
//       ],
//     },
//     {
//       title: "Support & Legal",
//       icon: <HelpCircle className="w-5 h-5 text-white" />,
//       color: "bg-[var(--color-secondary)]",
//       links: [
//         { name: "Help Center", path: "/support" },
//         { name: "FAQ", path: "/FAQ" },
//         { name: "Privacy Policy", path: "/privacy" },
//         { name: "Terms of Service", path: "/terms" },
//       ],
//     },
//   ];

//   return (
//     <ContentWrapper topSpacing>
//       {/* Header */}
//       <div className="text-center mb-14 px-4">
//         <h2 className="text-4xl font-bold">Sitemap</h2>
//         <p className="text-gray-600 mt-2">
//           Explore all sections of our platform in a visual tree layout.
//         </p>
//       </div>

//       {/* Responsive Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12">
//         {sections.map((section, i) => (
//           <div key={i} className="relative flex flex-col items-center w-full">
            
//             {/* Centered Title */}
//             <div className="w-full flex flex-col items-center">
//               <div
//                 className={`px-4 py-2 flex items-center gap-2 text-white font-semibold rounded-md shadow ${section.color}`}
//               >
//                 {section.icon}
//                 {section.title}
//               </div>

//               {/* Vertical line */}
//               <div className="h-14 border-l-2 border-gray-300 mt-2"></div>
//             </div>

//             {/* Links */}
//             <div
//               className="
//                 w-full mt-1 space-y-4
//                 text-center 
//                 sm:text-left 
//                 sm:ml-4
//                  rounded-lg
//               "
//             >
//               {section.links.map((link, j) => (
//                 <Link
//                   key={j}
//                   to={link.path}
//                   className="
//                     block px-3 py-1 rounded border border-gray-300 
//                     text-gray-700 
//                     hover:text-[var(--color-secondary)] 
//                     hover:border-[var(--color-secondary)]
//                     transition font-medium
//                   "
//                 >
//                   {link.name}
//                 </Link>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Footer */}
//       <footer className="mt-16 text-center text-gray-500 text-sm">
//         <p>
//           Last updated:{" "}
//           <span className="font-medium text-black">October 24, 2025</span>
//         </p>
//       </footer>
//     </ContentWrapper>
//   );
// }


// import React from "react";
// import { motion } from "framer-motion";
// import ContentWrapper from "@/components/shared/ContentWrapper";

// // SAFE ICONS
// import {
//   LogIn,
//   UserPlus,
//   Home,
//   Star,
//   Users,
//   CloudSun,
//   TrendingUp,
//   Bug,
//   User,
//   Bell,
//   Settings,
//   FileText,
//   ShieldCheck,
//   MessageCircle,
// } from "lucide-react";

// // ---------------- DATA ----------------

// const sitemap = {
//   access: [
//     { text: "Login", icon: LogIn },
//     { text: "Signup", icon: UserPlus },
//   ],

//   sections: [
//     {
//       title: "Main Pages",
//       icon: Home,
//       items: ["Home", "Features", "Pricing", "Contact"],
//     },
//     {
//       title: "App Features",
//       icon: Star,
//       items: [
//         "Crop Management",
//         "Weather Alerts",
//         "Market Prices",
//         "Pest & Disease Guides",
//       ],
//     },
//     {
//       title: "User Account",
//       icon: User,
//       items: ["Dashboard", "Profile Settings", "Notifications", "Saved Data"],
//     },
//     {
//       title: "Support & Legal",
//       icon: ShieldCheck,
//       items: ["Help Center", "FAQ", "Privacy Policy", "Terms & Conditions"],
//     },
//   ],
// };


// export default function SitemapFinal() {
//   return (
//     <ContentWrapper topSpacing>
//       <div className="w-full min-h-screen flex flex-col items-center">
//  <div className="text-center mb-14 px-4">
//         <h2 className="text-4xl font-bold">Sitemap</h2>
//          <p className="text-gray-600 mt-2">
//           Explore all sections of our platform in a visual tree layout.
//         </p>
//        </div>
//         {/* ACCESS BLOCK */}
//         <div className="flex flex-col items-center">
//           <BoxMain text="Access" icon={User} />
//           <AnimatedLine h={60} />

//           <div className="flex gap-6 mt-2">
//             {sitemap.access.map((item, i) => (
//               <BoxSmall key={i} text={item.text} icon={item.icon} />
//             ))}
//           </div>
//         </div>

//         {/* HORIZONTAL LINE */}
//         <motion.div
//           initial={{ scaleX: 0 }}
//           animate={{ scaleX: 1 }}
//           transition={{ duration: 1 }}
//           className="relative w-full max-w-5xl mt-8 border-t-2 border-black"
//         >
//           {["12%", "37%", "62%", "87%"].map((pos, i) => (
//             <div key={i} className="absolute" style={{ left: pos, bottom: -12 }}>
//               <ArrowDown />
//             </div>
//           ))}
//         </motion.div>

//         {/* MAIN SECTIONS */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-14 mt-8">
//           {sitemap.sections.map((sec, index) => (
//             <Section
//               key={index}
//               title={sec.title}
//               icon={sec.icon}
//               items={sec.items}
//             />
//           ))}
//         </div>
//       </div>
//     </ContentWrapper>
//   );
// }

// /* ----------- COMPONENTS ----------- */

// const BoxMain = ({ text, icon: Icon }) => (
//   <motion.div
//     initial={{ opacity: 0, scale: 0.9 }}
//     animate={{ opacity: 1, scale: 1 }}
//     whileHover={{ scale: 1.05 }}
//     className="px-8 py-3 bg-[var(--color-secondary)] text-white rounded-lg shadow font-semibold flex items-center gap-3"
//   >
//     <Icon size={18} /> {text}
//   </motion.div>
// );

// const BoxSmall = ({ text }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 8 }}
//     animate={{ opacity: 1, y: 0 }}
//     whileHover={{ scale: 1.05 }}
//     className="px-6 py-2 bg-[var(--color-gray)] text-black rounded-md shadow border text-sm"
//   >
//     {text}
//   </motion.div>
// );

// const AnimatedLine = ({ h }) => (
//   <motion.div
//     initial={{ height: 0 }}
//     animate={{ height: h }}
//     transition={{ duration: 0.8 }}
//     className="w-[2px] bg-black my-2"
//     style={{ height: h }}
//   />
// );

// const ArrowDown = () => (
//   <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-t-black border-l-transparent border-r-transparent"></div>
// );

// const Section = ({ title, icon: Icon, items }) => (
//   <div className="flex flex-col items-center">
//     <BoxMain text={title} icon={Icon} />

//     <AnimatedLine h={60} />

//     <div className="flex flex-col gap-2 mt-1">
//       {items.map((text, i) => (
//         <BoxSmall key={i} text={text} />
//       ))}
//     </div>
//   </div>
// );




import React from "react";
import { motion } from "framer-motion";
import ContentWrapper from "@/components/shared/ContentWrapper";

// SAFE ICONS
import {
  LogIn,
  UserPlus,
  Home,
  Star,
  Users,
  CloudSun,
  TrendingUp,
  Bug,
  User,
  Bell,
  Settings,
  FileText,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";



const sitemap = {
  access: [
    { text: "Login", icon: LogIn },
    { text: "Signup", icon: UserPlus },
  ],

  sections: [
    {
      title: "Main Pages",
      icon: Home,
      items: ["Home", "Features", "Pricing", "Contact"],
    },
    {
      title: "App Features",
      icon: Star,
      items: ["Crop Management", "Weather Alerts", "Market Prices", "Pest & Disease Guides"],
    },
    {
      title: "User Account",
      icon: User,
      items: ["Dashboard", "Profile Settings", "Notifications", "Saved Data"],
    },
    {
      title: "Support & Legal",
      icon: ShieldCheck,
      items: ["Help Center", "FAQ", "Privacy Policy", "Terms & Conditions"],
    },
  ],
};



export default function SitemapFinal() {
  return (
    <ContentWrapper topSpacing>
      <div className="w-full min-h-screen flex flex-col items-center px-4 md:px-8">
<div className="text-center mb-14 px-4">
         <h2 className="text-4xl font-bold">Sitemap</h2>
          <p className="text-gray-600 mt-2">
           Explore all sections of our platform in a visual tree layout
         </p>
        </div>
        {/* ACCESS BLOCK */}
        <div className="flex flex-col items-center  ">
          <BoxMain text="Access" icon={User} />
          <AnimatedLine h={50} />

          <div className="flex gap-4 md:gap-6 mt-2 flex-wrap justify-center">
            {sitemap.access.map((item, i) => (
              <BoxSmall key={i} text={item.text} icon={item.icon} />
            ))}
          </div>
        </div>

        {/* HORIZONTAL LINE (responsive) */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1 }}
          className="relative w-full max-w-5xl mt-8 border-t-2 border-black"
        >
          {/* Skip arrows on small screens */}
          <div className="hidden md:block">
            {["12%", "37%", "62%", "87%"].map((pos, i) => (
              <div key={i} className="absolute" style={{ left: pos, bottom: -12 }}>
                <ArrowDown />
              </div>
            ))}
          </div>
        </motion.div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mt-10 w-full">
          {sitemap.sections.map((sec, index) => (
            <Section key={index} title={sec.title} icon={sec.icon} items={sec.items} />
          ))}
        </div>

      </div>
    </ContentWrapper>
  );
}

/* ----------- COMPONENTS ----------- */

const BoxMain = ({ text, icon: Icon }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ scale: 1.05 }}
    className="px-6 py-3 bg-[var(--color-secondary)] text-white rounded-lg shadow font-semibold flex items-center gap-2 sm:gap-3 text-sm sm:text-base"
  >
    <Icon size={18} className="hidden sm:block" /> 
    {text}
  </motion.div>
);

const BoxSmall = ({ text }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.05 }}
    className="px-4 py-2 bg-[var(--color-gray)] w-48 text-center text-black rounded-md shadow border text-xs sm:text-sm"
  >
    {text}
  </motion.div>
);

const AnimatedLine = ({ h }) => (
  <motion.div
    initial={{ height: 0 }}
    animate={{ height: h }}
    transition={{ duration: 0.8 }}
    className="w-[2px] bg-black my-2"
  />
);

const ArrowDown = () => (
  <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-t-black border-l-transparent border-r-transparent"></div>
);

const Section = ({ title, icon: Icon, items }) => (
  <div className="flex flex-col items-center text-center">
    <BoxMain text={title} icon={Icon} />
    <AnimatedLine h={50} />

    <div className="flex flex-col gap-2 mt-2 w-full items-center">
      {items.map((text, i) => (
        <BoxSmall key={i} text={text} />
      ))}
    </div>
  </div>
);
