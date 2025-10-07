import { Button } from "@/components/ui/button";
import CustomButton from "@/components/ui/CustomButton";
import { Style } from "@mui/icons-material";
import { Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function InfoCard({ farmer }) {
  const navigate = useNavigate();
  return (
    <div className="bg-[var(--color-black-hover)] mt-4 shadow-md rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center border border-gray-200 hover:shadow-lg transition">
      <div className="flex items-center space-x-4">
        <img
          src={farmer.photo}
          alt="Farmer Profile"
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-[var(--color-primary)] shadow-md object-cover"
        />
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-black)]">
            {farmer.fullName}
          </h2>
          <p className="flex items-center text-gray-600 text-sm sm:text-base mt-1">
            <Phone className="mr-2 text-[var(--color-primary)]" />
            {farmer.phone}
          </p>
        </div>
      </div>
      <CustomButton
        varient="contained"
        text="My Orchards"
        sx={{
          fontSize: "0.75rem",
          padding: "4px 12px",
          borderRadius: "6px",
          textTransform: "none",
        }}
        onClick={() => navigate("/orchards")}
      />
    </div>
  );
}
