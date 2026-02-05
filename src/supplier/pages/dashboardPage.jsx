import { Link, useNavigate } from "react-router-dom";
import {
  Package,
  Users,
  Settings,
  HelpCircle,
  ArrowUpRight,
} from "lucide-react";
// import TopHeader from "../components/dashboarHeader";

export default function supplierDashboard() {
  const navigate = useNavigate();
  const cards = [
    {
      title: "All Products",
      desc: "Browse all available products and add to your store",
      icon: <Package size={22} />,
      path: "/dashboard/all-products",
    },
    {
      title: "My Products",
      desc: "View, edit and manage your added products",
      icon: <Package size={22} />,
      path: "/AddedProducts",
    },
    {
      title: "Customers",
      desc: "View your customer list and manage orders",
      icon: <Users size={22} />,
      path: "/VendorCustomerList",
    },
    {
      title: "Settings & Support",
      desc: "Update profile settings and get help",
      icon: <Settings size={22} />,
      path: "/vendorSettings",
    },
    {
      title: "Help Centre",
      desc: "Get assistance and contact support",
      icon: <HelpCircle size={22} />,
      path: "/help",
    },
  ];

  return (
    <div className=" w-full h-full mt-[15%]  lg:mt-[7%] md:mt-[7%]">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pl-8 pt-7">
        <div>
          <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold text-[var(--color-primary)]">
            Vendor Dashboard
          </h1>
          <p className="text-sm sm:text-base text-[var(--color-black)]/60 mt-2">
            Select an option to continue managing your store.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 px-5 lg:px-8 py-10">
        {cards.map((card, index) => (
          <div
            onClick={() => navigate(card.path)}
            key={index}
            className="
                  group w-full text-left
                  rounded-3xl border border-[var(--color-gray)]
                  bg-[var(--color-white)]
                  p-5 sm:p-6
                  shadow-sm
                  hover:shadow-xl
                  hover:-translate-y-1
                  transition-all duration-300
                  active:scale-[0.98]
                  cursor-pointer
                "
          >
            <div className="flex items-start justify-between gap-4">
              <div
                className="
                      h-12 w-12 sm:h-14 sm:w-14
                      rounded-2xl
                      bg-[var(--color-primary)]/10
                      flex items-center justify-center
                      text-[var(--color-primary)]
                      group-hover:bg-[var(--color-primary)]
                      group-hover:text-[var(--color-white)]
                      transition
                    "
              >
                {card.icon}
              </div>
              <div
                className="
                      w-10 h-10 rounded-full
                      flex items-center justify-center
                      border border-[var(--color-gray)]
                      text-[var(--color-black)]/60
                      group-hover:bg-[var(--color-primary)]/10
                      group-hover:text-[var(--color-primary)]
                      transition
                    "
              >
                <ArrowUpRight size={18} />
              </div>
            </div>
            <div className="mt-4">
              <h2 className="text-base sm:text-lg font-bold text-[var(--color-black)]">
                {card.title}
              </h2>
              <p className="text-sm text-[var(--color-black)]/60 mt-1 leading-relaxed">
                {card.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
