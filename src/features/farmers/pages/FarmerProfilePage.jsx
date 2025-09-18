import CustomButton from "@/components/ui/CustomButton";
import { useNavigate } from "react-router-dom";

export default function FarmerProfilePage() {
  const navigate = useNavigate();

  const farmer = {
    fullName: "Rahul Sharma",
    email: "rahul@example.com",
    phone: "+91 9876543210",
    photo: "/assets/images/farmer.jpeg",
    status: "Active",
    orchardsCount: 5,
    totalLand: "45 Acres",
    mainCrops: "Apples, Maize, Wheat",
  };

  return (
    <div className="w-full md:mt-28 lg:mt-36 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto bg-[var(--color-white)] rounded-xl shadow-lg p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
        <div className="flex-shrink-0">
          <img
            src={farmer.photo}
            alt={farmer.fullName}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-2 border-[var(--color-primary)]"
          />
        </div>

        <div className="flex-1 text-center md:text-left">
          <h2 className="text-xl md:text-2xl font-semibold text-[var(--color-black)]">
            {farmer.fullName}
          </h2>
          <p className="text-sm md:text-base text-gray-600 mt-1">{farmer.email}</p>
          <p className="text-sm md:text-base text-gray-600 mt-1">{farmer.phone}</p>

          <span
            className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
              farmer.status === "Active"
                ? "bg-green-100 text-green-800"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {farmer.status}
          </span>

          <div className="mt-4 flex flex-col sm:flex-row sm:justify-start sm:gap-6 gap-2">
            <div className="text-sm md:text-base text-gray-700">
              <span className="font-semibold">{farmer.orchardsCount}</span> Orchards
            </div>
            <div className="text-sm md:text-base text-gray-700">
              <span className="font-semibold">{farmer.totalLand}</span> Total Land
            </div>
            <div className="text-sm md:text-base text-gray-700">
              <span className="font-semibold">{farmer.mainCrops}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <CustomButton
          varient="contained"
          text="My Orchards"
          sx={{
            fontSize: "0.875rem",
            padding: "8px 20px",
            borderRadius: "6px",
            textTransform: "none",
            backgroundColor: "var(--color-primary)",
            color: "var(--color-white)",
            boxShadow: "0px 3px 6px rgba(0,0,0,0.15)",
            "&:hover": {
              backgroundColor: "var(--color-primary-hover)",
            },
          }}
          onClick={() => navigate("/my-orchards")}
        />
      </div>
    </div>
  );
}
