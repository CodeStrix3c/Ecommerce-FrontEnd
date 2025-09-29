// import { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Tabs from "../components/Tabs";
// import InfoCard from "../components/InfoCard";
// import CustomButton from "@/components/ui/CustomButton";
// import Popup from "@/components/shared/Popup";
// import InCompleteSupplierProfileSection from "./InCompleteSupplierProfileSection";
// import { useSupplier } from "@/providers/SupplierProvider";
// import ProgressBar from "@/components/shared/ProgressBar";

// export default function SupplierProfilePage() {
//   const [activeTab, setActiveTab] = useState("overview");
//   const [showIncompleteSection, setShowIncompleteSection] = useState(false);
//   const [gpsLocation, setGpsLocation] = useState("");
//   const gpsInputRef = useRef(null);

//   const navigate = useNavigate();
//   const {
//     supplier,
//     setSupplier,  
//     progress,
//     isComplete,
//     setLicensingComplete,
//     setProductPortfolioComplete,
//     setOperationalDetailsComplete,
//     setFinancialPaymentComplete,
//     setSupportServicesComplete,
//   } = useSupplier();

//   console.log("supplier data:", supplier);

//   const supplierData = supplier || {};

//   const handleCompleteProfile = (formData) => {
//     // const updatedSupplier = { ...supplierData, ...formData, gps: gpsLocation };
//     // setSupplier(updatedSupplier);
//     // localStorage.setItem("supplierData", JSON.stringify(updatedSupplier));

//     setLicensingComplete();
//     setProductPortfolioComplete();
//     setOperationalDetailsComplete();
//     setFinancialPaymentComplete();
//     setSupportServicesComplete();

//     setShowIncompleteSection(false);
//   };

//   return (
//     <div className="w-full px-4 sm:px-6 md:mt-28 lg:mt-32 ">
//       <InfoCard supplier={supplierData} />
//       <ProgressBar
//         filledFields={progress * 100}
//         totalFields={100}
//         onClick={() => setShowIncompleteSection(true)}
//       />

//       {!isComplete && (
//         <p
//           onClick={() => setShowIncompleteSection(true)}
//           className="mt-2 text-sm text-[var(--color-secondary)] hover:underline cursor-pointer"
//         >
//           Complete your profile
//         </p>
//       )}

//       {showIncompleteSection && (
//         <Popup
//           open={showIncompleteSection}
//           onClose={() => setShowIncompleteSection(false)}
//           title="Complete Supplier Profile"
//         >
//           <InCompleteSupplierProfileSection
//             gpsLocation={gpsLocation}
//             gpsInputRef={gpsInputRef}
//             onComplete={handleCompleteProfile}
//           />
//         </Popup>
//       )}
//     </div>
//   );
// }

import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import InfoCard from "../components/InfoCard";
import Popup from "@/components/shared/Popup";
import { useSupplier } from "@/providers/SupplierProvider";
import ProgressBar from "@/components/shared/ProgressBar";
import SupplierProfileCompletion from "./SupplierProfileCompletion";

export default function SupplierProfilePage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showIncompleteSection, setShowIncompleteSection] = useState(false);
  const [gpsLocation, setGpsLocation] = useState("");
  const gpsInputRef = useRef(null);

  const navigate = useNavigate();
  const {
    supplier,
    progress,
    isComplete,
    setLicensingComplete,
    setProductPortfolioComplete,
    setOperationalDetailsComplete,
    setFinancialPaymentComplete,
    setSupportServicesComplete,
    setBusinessComplete,
  } = useSupplier();

  const supplierData = supplier || {};

  const handleCompleteProfile = (formData) => {
    // const updatedSupplier = { ...supplierData, ...formData, gps: gpsLocation };
    // setSupplier(updatedSupplier);
    // localStorage.setItem("supplierData", JSON.stringify(updatedSupplier));
    setBusinessComplete();
    setLicensingComplete();
    setProductPortfolioComplete();
    setOperationalDetailsComplete();
    setFinancialPaymentComplete();
    setSupportServicesComplete();

    setShowIncompleteSection(false);
  };

  return (
    <div className="w-full px-4 sm:px-6 md:mt-28 lg:mt-32 max-w-5xl mx-auto border transition-transform duration-300 hover:scale-[1.02] shadow-lg rounded-2xl">
      
      {/* Header with My Products Button */}
      <div className="flex items-center justify-between p-6 border-b">
        <h1 className="font-bold text-xl text-center">Supplier Profile</h1>
        <button
          onClick={() => navigate("/Supplier-Product")}
          className="bg-[var(--color-secondary)] text-[var(--color-white)] px-4 py-2 rounded-lg shadow hover:opacity-90 transition"
        >
          My Products
        </button>
      </div>

      {/* InfoCard */}
      <div className="rounded-2xl p-6">
        <InfoCard supplier={supplierData} />
      </div>

      {/* Progress Section */}
      <div className="mt-6 p-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-[var(--color-black)]">
            Profile Completion
          </h2>
          {!isComplete && (
            <button
              onClick={() => setShowIncompleteSection(true)}
              className="text-sm text-[var(--color-secondary)] font-medium hover:underline"
            >
              Complete your profile
            </button>
          )}
        </div>

        <ProgressBar
          filledFields={progress * 100}
          totalFields={100}
          onClick={() => setShowIncompleteSection(true)}
        />
      </div>

      {/* Incomplete Profile Popup */}
      {showIncompleteSection && (
        <Popup
          open={showIncompleteSection}
          onClose={() => setShowIncompleteSection(false)}
          title="Complete Supplier Profile"
        >
          <SupplierProfileCompletion
            gpsLocation={gpsLocation}
            gpsInputRef={gpsInputRef}
            onComplete={handleCompleteProfile}
          />
        </Popup>
      )}
    </div>
  );
}
