import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import AddressSection from "@/features/farmer-registration/sections/AddressSection";
import Popup from "@/components/shared/Popup";
import ProgressBar from "@/components/shared/ProgressBar";
import CustomButton from "@/components/ui/CustomButton";
import { addressSchema } from "@/features/farmer-registration/schemas/addressSchema";
import { useFarmer } from "@/providers/FarmerProvider";
import { ADDRESS_FIELDS } from "@/constants/profileFields";
import FarmerProfileCompletion from "./FarmerProfileCompletion";
import { set } from "zod";

export default function FarmerProfilePage() {
  const navigate = useNavigate();
  const {
    farmer,
    setFarmer,
    sections,
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

  const methods = useForm({
    resolver: zodResolver(addressSchema),
    mode: "onChange",
  });

  const {
    watch,
    setValue,
    trigger,
    register,
    formState: { errors },
  } = methods;
  const addressValues = watch();

  useEffect(() => detectLocation(), []);
  console.log(progress, "progress in farmer profile");

  const detectLocation = () => {
    if (!navigator.geolocation) return alert("Geolocation not supported");

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const gpsString = `${pos.coords.latitude},${pos.coords.longitude}`;
        setGpsLocation(gpsString);
        setValue("gps", gpsString, { shouldValidate: true });
        gpsInputRef.current?.focus();
      },
      () => alert("Unable to retrieve location"),
      { enableHighAccuracy: true }
    );
  };

  // Complete address and update farmer
  const handleCompleteProfile = async () => {
    setProfileComplete();
    setEducationComplete();
    setProfessionComplete();
    setAddressComplete();

    // const updatedFarmer = { ...farmer, ...addressValues };
    // localStorage.setItem("farmerData", JSON.stringify(updatedFarmer));
    setShowIncompleteSection(false);
  };

  return (
    <div className="w-full md:mt-28 lg:mt-36 px-4 sm:px-6">
      {/* Profile Card */}
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
        <div className="flex-shrink-0">
          <img
            src={farmer?.profilePic || "/assets/images/farmer.jpeg"}
            alt={farmer?.fullName || "Farmer"}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-2 border-[var(--color-primary)]"
          />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-xl md:text-2xl font-semibold">
            {farmer?.fullName || "Full Name"}
          </h2>
          <p className="text-sm md:text-base">
            {farmer?.email || "Email not provided"}
          </p>
          <p className="text-sm md:text-base">
            {farmer?.phone || "Phone not provided"}
          </p>

          <ProgressBar
            filledFields={progress * 100} // assuming ProgressBar accepts 0–100
            totalFields={100}
            onClick={() => setShowIncompleteSection(true)}
          />

          {/* {!isComplete && (
            <p
              onClick={() => setShowIncompleteSection(true)}
              className="mt-2 text-sm text-[var(--color-secondary)] hover:underline cursor-pointer"
            >
              Complete your profile
            </p>
          )} */}
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <CustomButton
          varient="contained"
          text="My Orchards"
          onClick={() => navigate("/my-orchards")}
        />
      </div>

      {showIncompleteSection && (
        <Popup
          onClose={() => setShowIncompleteSection(false)}
          title="Complete Farmer Profile"
          open={showIncompleteSection}
        >
          <FarmerProfileCompletion
            value={gpsLocation}
            detectLocation={detectLocation}
            gpsInputRef={gpsInputRef}
            onComplete={handleCompleteProfile}
          />
        </Popup>
      )}
    </div>
  );
}
