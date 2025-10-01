import SupplierProfilePage from "@/features/suppliers/pages/SupplierProfilePage";
import { User, Phone, Mail, MapPin, Factory, Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SupplierDetails() {
  const navigate = useNavigate();

  const supplier = {
    name: "Umar Mukhtar",
    phone: "+91 9876543210",
    email: "info@umar.com",
    location: "Pulwama, India",
    company: "umarcodes Pvt Ltd",
    specialization: "Coding",
  };

  const details = [
    { icon: User, value: supplier?.name },
    { icon: Phone, value: supplier?.phone },
    { icon: Mail, value: supplier?.email },
    { icon: MapPin, value: supplier?.location },
    { icon: Factory, value: supplier?.company },
    { icon: Leaf, value: supplier?.specialization },
  ];

  return (
    <div className="bg-[var(--color-white)] md:mt-28 p-4  lg:p-8 w-full max-w-5xl mx-auto lg:mt-0">
      
      <div className="text-xl sm:text-2xl font-bold text-[var(--color-black)] mb-6 sm:mb-8 flex items-center gap-2 justify-between ">
      
        Supplier Details
        <div className="flex justify-center sm:justify-end">
        <button
          onClick={() => navigate("/Supplier-product")}
          className="w-full sm:w-auto  text-[var(--color-secondary)] px-5 sm:px-6 py-1.5  font-semibold  text-sm sm:text-base
          "
        >
          View Products
        </button>
      </div>
      </div>
      

      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {details.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-4 p-3 sm:p-4 rounded-xl border border-[var(--color-gray)] bg-[var(--color-white)] "
            >
              <div className="p-2 sm:p-3 rounded-full text-[var(--color-secondary)] flex items-center justify-center">
                <Icon size={20} />
              </div>
              <p className="text-sm md:text-lg font-semibold text-[var(--color-black)] break-words">
                {item.value}
              </p>
            </div>
          );
        })}
      </div>


      {/* Profile Page Section */}
      <div className="mt-6 sm:mt-10">
        <SupplierProfilePage />
      </div>
    </div>
  );
}
