import React, { useState, useRef } from "react";
import { useSupplier } from "@/providers/SupplierProvider";
import ProfileCompletion from "../components/ProfileCompletion";
import SupplierProfileCompletion from "./SupplierProfileCompletion";
import ContentWrapper from "@/components/shared/ContentWrapper";
import Popup from "@/components/shared/Popup";
import ProfileDetail from "@/features/farmers/components/ProfileDetail";
import { Phone, Mail, MapPin, User, Factory, Leaf } from "lucide-react";
import ProfileAvatar from "@/components/shared/ProfileAvatar";
import { Link } from "react-router-dom";

export default function SupplierProfilePage() {
  const [showIncompleteSection, setShowIncompleteSection] = useState(false);
  const [gpsLocation, setGpsLocation] = useState("");
  const gpsInputRef = useRef(null);

  const supplier = {
    name: "Umar Mukhtar",
    phone: "+91 9876543210",
    email: "info@umar.com",
    location: "Pulwama, India",
    company: "umarcodes Pvt Ltd",
    specialization: "Coding",
    avatar:
      "https://images.unsplash.com/photo-1718900109613-457f76a456b2?w=600&auto=format&fit=crop&q=60",
  };

  const {
    progress,
    isComplete,
    setLicensingComplete,
    setProductPortfolioComplete,
    setOperationalDetailsComplete,
    setFinancialPaymentComplete,
    setSupportServicesComplete,
    setBusinessComplete,
  } = useSupplier();

  const handleCompleteProfile = () => {
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
      <ContentWrapper isCompact>
        <div className="space-y-8 lg:space-y-12 lg:py-36">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <ProfileAvatar
              avatar={supplier.avatar}
              onEdit={() => setShowIncompleteSection(true)}
            />

            <div className="flex-1 flex flex-col gap-4">
              <div className="flex justify-end">
                <Link
                  to={"/supplier-product"}
                  className="text-[var(--color-secondary)] font-medium text-sm sm:text-base hover:text-[var(--color-secondary-hover)]"
                >
                  View Products
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                <ProfileDetail
                  icon={<User />}
                  label="Name"
                  value={supplier.name}
                />
                <ProfileDetail
                  icon={<Phone />}
                  label="Phone"
                  value={supplier.phone}
                />
                <ProfileDetail
                  icon={<Mail />}
                  label="Email"
                  value={supplier.email}
                />
                <ProfileDetail
                  icon={<MapPin />}
                  label="Location"
                  value={supplier.location}
                />
                <ProfileDetail
                  icon={<Factory />}
                  label="Company"
                  value={supplier.company}
                />
                <ProfileDetail
                  icon={<Leaf />}
                  label="Specialization"
                  value={supplier.specialization}
                />
              </div>
              <ProfileCompletion
                progress={progress}
                isComplete={isComplete}
                onCompleteClick={() => setShowIncompleteSection(true)}
                showPopup={showIncompleteSection}
                onClosePopup={() => setShowIncompleteSection(false)}
              />
            </div>
          </div>
        </div>
      </ContentWrapper>

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
