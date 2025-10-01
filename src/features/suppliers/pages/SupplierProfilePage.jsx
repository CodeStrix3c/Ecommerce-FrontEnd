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
import ContentWrapper from "@/components/shared/ContentWrapper";

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
    
   <>
   
     <div className="w-full px-4 sm:px-6 md:mt-28 lg:mt-8 max-w-5xl mx-auto border p-4 sm:p-6 rounded-xl">
  
  <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-6">
    <h3 className="text-lg sm:text-lg font-semibold text-[var(--color-black)] ">
      Profile Completion
    </h3>

    {!isComplete && (
      <button
        onClick={() => setShowIncompleteSection(true)}
        className="text-sm sm:text-base text-[var(--color-secondary)] font-medium mt-2 sm:mt-0"
      >
        Complete your profile
      </button>
    )}
  </div>

 
  <div className="flex items-center gap-3 mb-5">
    <div
      className="flex-1 h-3 bg-[var(--color-gray)] rounded-full overflow-hidden cursor-pointer"
      onClick={() => setShowIncompleteSection(true)}
    >
      <div
        className="h-3 bg-[var(--color-secondary)] rounded-full transition-all duration-500"
        style={{ width: `${progress * 100}%` }}
      ></div>
    </div>

    <span className="text-xs sm:text-sm font-semibold text-[var(--color-black)] w-10 text-right">
      {Math.round(progress * 100)}%
    </span>
  </div>

 
</div>

    
    
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
    </>
    


  );
}
