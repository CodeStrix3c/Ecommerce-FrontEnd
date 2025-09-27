import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import Popup from "@/components/shared/Popup";
import { addressSchema } from "@/features/farmer-registration/schemas/addressSchema";
import { useFarmer } from "@/providers/FarmerProvider";
import FarmerProfileCompletion from "./FarmerProfileCompletion";
import { AccountBalance, Person, TripOrigin } from "@mui/icons-material";
import { Edit2, TreePine } from "lucide-react";
import { User, Calendar, Mail, Phone, Book, Briefcase } from "lucide-react";
import ProfileDetail from "../components/ProfileDetail";
import SidebarItem from "../components/SideBarItem";

export default function FarmerProfilePage() {
  const navigate = useNavigate();
  const {
    farmer,
    progress,
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

  const { watch, setValue } = methods;
  const addressValues = watch();

  useEffect(() => detectLocation(), []);

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

  const handleCompleteProfile = () => {
    setProfileComplete();
    setEducationComplete();
    setProfessionComplete();
    setAddressComplete();
    setShowIncompleteSection(false);
  };

  return (
    <div className="flex flex-col lg:flex-row w-full lg:mt-32 mt-16 px-4 sm:px-6 gap-8">
      {/* Sidebar */}
      <aside className="p-6 w-full lg:w-64 bg-[var(--color-white)] rounded-2xl shadow-lg border border-[var(--color-black-hover)] flex flex-col gap-6">
        <h1 className="font-bold text-2xl mb-4 text-[var(--color-black)] border-b pb-2">
          Profile
        </h1>
        <div className="flex flex-col justify-between h-full gap-3">
          <div className="flex flex-col gap-3">
            <SidebarItem
              icon={
                <AccountBalance className="w-6 h-6 text-[var(--color-secondary)]" />
              }
              label="About Me"
            />
            <SidebarItem
              icon={
                <TripOrigin className="w-6 h-6 text-[var(--color-secondary)]" />
              }
              label="Past Orders"
            />
            <SidebarItem
              icon={
                <Person className="w-6 h-6 text-[var(--color-secondary)]" />
              }
              label="Suppliers"
            />
            <SidebarItem
              icon={
                <TreePine className="w-6 h-6 text-[var(--color-secondary)]" />
              }
              label="My Orchards"
              onClick={() => navigate("/my-orchards")}
            />
          </div>
        </div>
      </aside>

      <main className="flex-1 bg-[var(--color-white)] rounded-2xl shadow-lg border border-[var(--color-black-hover)] p-8 flex flex-col gap-6">
        <div className="flex">
          <h1 className="font-bold text-2xl md:text-3xl text-[var(--color-black)]">
            About Me
          </h1>
          <button
            onClick={() => setShowIncompleteSection(true)}
            className="px-6"
          >
            <Edit2 className="w-6 h-6 text-[var(--color-secondary)]" />
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <img
            src={farmer?.profilePic || "/assets/images/farmer.jpeg"}
            alt={farmer?.fullName || ""}
            className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-2 border-[var(--color-black)]"
          />
          <div className="flex-1 flex flex-col gap-3 text-center md:text-left">
            <h2 className="text-xl md:text-3xl font-bold">
              {farmer?.fullName || "Quarat"}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 text-sm md:text-base">
              <ProfileDetail
                icon={<User />}
                label="Gender"
                value={farmer?.gender || "Female"}
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

            <div className="mt-5">
              <div className="flex justify-between items-center mb-2">
                <div className="text-lg font-semibold flex items-center gap-2">
                  <h2>Profile Completion</h2>
                  <span className="text-[var(--color-secondary)] text-sm">
                    ({Math.round(progress * 100)}%)
                  </span>
                </div>

                <span
                  className="text-sm p-2 font-medium text-[var(--color-secondary)] hover:cursor-pointer"
                  onClick={() => setShowIncompleteSection(true)}
                >
                  Complete Profile
                </span>
              </div>

              <div className="relative w-full cursor-pointer">
                <div className="h-2 w-full bg-[var(--color-black-hover)] rounded-full overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                  <div
                    className="h-1 rounded-full transition-all duration-500"
                    style={{
                      width: `${progress * 100}%`,
                      backgroundColor: "var(--color-primary)",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

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
