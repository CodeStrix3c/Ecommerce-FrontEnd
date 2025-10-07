import React, { useEffect, useState, useRef } from "react";
import { useFarmer } from "@/providers/FarmerProvider";
import ContentWrapper from "@/components/shared/ContentWrapper";
import Popup from "@/components/shared/Popup";
import FarmerProfileCompletion from "./FarmerProfileCompletion";
import ProfileAvatar from "@/components/shared/ProfileAvatar";
import ProfileDetail from "../components/ProfileDetail";
import { User, Calendar, Mail, Phone, Book, Briefcase } from "lucide-react";
import ProfileCompletion from "@/features/suppliers/components/ProfileCompletion";
import { Link } from "react-router-dom";

export default function FarmerProfilePage() {
  const {
    farmer,
    progress,
    isComplete,
    setEducationComplete,
    setProfessionComplete,
    setAddressComplete,
    setProfileComplete,
  } = useFarmer();

  const [showIncompleteSection, setShowIncompleteSection] = useState(false);
  const [gpsLocation, setGpsLocation] = useState("");
  const gpsInputRef = useRef(null);

  useEffect(() => detectLocation(), []);

  const detectLocation = () => {
    if (!navigator.geolocation) return alert("Geolocation not supported");

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const gpsString = `${pos.coords.latitude},${pos.coords.longitude}`;
        setGpsLocation(gpsString);
        gpsInputRef.current?.focus();
      },
      () => alert("Unable to retrieve location"),
      { enableHighAccuracy: true }
    );
  };

  const handleCompleteProfile = () => {
    setProfileComplete();
    setEducationComplete();
    setProfessionComplete();
    setAddressComplete();
    setShowIncompleteSection(false);
  };

  return (
    <ContentWrapper compactScreen>
      <div className="space-y-8 lg:space-y-12 lg:py-36">
        {/* Avatar + Details + Link */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-6">
          {/* Left: Avatar */}
          <ProfileAvatar
            avatar={farmer?.profilePic || "/assets/images/farmer.jpeg"}
            onEdit={() => setShowIncompleteSection(true)}
          />

          <div className="flex-1 flex flex-col gap-4">
            <div className="flex justify-end">
              <Link
                to={"/orchards"}
                className="text-[var(--color-secondary)] font-medium text-sm sm:text-base hover:text-[var(--color-secondary-hover)]"
              >
                View Orchards
              </Link>{" "}
              <Link
                to={"/orchard-registration"}
                className="text-[var(--color-secondary)] font-medium text-sm sm:text-base hover:text-[var(--color-secondary-hover)]"
              >
                Add Orchards
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
              <ProfileDetail
                icon={<User />}
                label="Name"
                value={farmer?.fullName || "Quarat"}
              />
              <ProfileDetail
                icon={<Calendar />}
                label="Age"
                value={farmer?.age || "28"}
              />
              <ProfileDetail
                icon={<Mail />}
                label="Email"
                value={farmer?.email || "anjuqadir14848@gmail.com"}
              />
              <ProfileDetail
                icon={<Phone />}
                label="Phone"
                value={farmer?.phone || "7051059559"}
              />
              <ProfileDetail
                icon={<Book />}
                label="Education"
                value={farmer?.education || "Graduate"}
              />
              <ProfileDetail
                icon={<Briefcase />}
                label="Profession"
                value={farmer?.profession || "Mazdoor"}
              />
            </div>

            <ProfileCompletion
              progress={progress}
              isComplete={isComplete}
              onCompleteClick={() => setShowIncompleteSection(true)}
              showPopup={showIncompleteSection}
              onClosePopup={() => setShowIncompleteSection(false)}
            >
              <FarmerProfileCompletion
                gpsLocation={gpsLocation}
                gpsInputRef={gpsInputRef}
                onComplete={handleCompleteProfile}
                detectLocation={detectLocation}
              />
            </ProfileCompletion>
          </div>
        </div>
      </div>

      {showIncompleteSection && (
        <Popup
          open={showIncompleteSection}
          onClose={() => setShowIncompleteSection(false)}
          title="Complete Farmer Profile"
        >
          <FarmerProfileCompletion
            gpsLocation={gpsLocation}
            gpsInputRef={gpsInputRef}
            onComplete={handleCompleteProfile}
            detectLocation={detectLocation}
          />
        </Popup>
      )}
    </ContentWrapper>
  );
}
