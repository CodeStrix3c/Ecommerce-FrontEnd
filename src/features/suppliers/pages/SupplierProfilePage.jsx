import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Tabs from "../components/Tabs";
import InfoCard from "../components/InfoCard";
import CustomButton from "@/components/ui/CustomButton";
import Popup from "@/components/shared/Popup";
import InCompleteSupplierProfileSection from "./InCompleteSupplierProfileSection";
import { useSupplier } from "@/providers/SupplierProvider";
import ProgressBar from "@/components/shared/ProgressBar";

export default function SupplierProfilePage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showIncompleteSection, setShowIncompleteSection] = useState(false);
  const [gpsLocation, setGpsLocation] = useState("");
  const gpsInputRef = useRef(null);

  const navigate = useNavigate();
  const {
    supplier,
    setSupplier,
    progress,
    isComplete,
    setLicensingComplete,
    setProductPortfolioComplete,
    setOperationalDetailsComplete,
    setFinancialPaymentComplete,
    setSupportServicesComplete,
  } = useSupplier();

  console.log("supplier data:", supplier);

  const supplierData = supplier || {};

  const handleCompleteProfile = (formData) => {
    // const updatedSupplier = { ...supplierData, ...formData, gps: gpsLocation };
    // setSupplier(updatedSupplier);
    // localStorage.setItem("supplierData", JSON.stringify(updatedSupplier));

    setLicensingComplete();
    setProductPortfolioComplete();
    setOperationalDetailsComplete();
    setFinancialPaymentComplete();
    setSupportServicesComplete();

    setShowIncompleteSection(false);
  };

  return (
    <div className="w-full px-4 sm:px-6 md:mt-28 lg:mt-32">
      <InfoCard supplier={supplierData} />
      <ProgressBar
        filledFields={progress * 100}
        totalFields={100}
        onClick={() => setShowIncompleteSection(true)}
      />

      {!isComplete && (
        <p
          onClick={() => setShowIncompleteSection(true)}
          className="mt-2 text-sm text-[var(--color-secondary)] hover:underline cursor-pointer"
        >
          Complete your profile
        </p>
      )}

      {showIncompleteSection && (
        <Popup
          open={showIncompleteSection}
          onClose={() => setShowIncompleteSection(false)}
          title="Complete Supplier Profile"
        >
          <InCompleteSupplierProfileSection
            gpsLocation={gpsLocation}
            gpsInputRef={gpsInputRef}
            onComplete={handleCompleteProfile}
          />
        </Popup>
      )}
    </div>
  );
}
