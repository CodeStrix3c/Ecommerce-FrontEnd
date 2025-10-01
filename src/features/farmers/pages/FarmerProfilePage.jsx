import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import Popup from "@/components/shared/Popup";
import { addressSchema } from "@/features/farmer-registration/schemas/addressSchema";
import { useFarmer } from "@/providers/FarmerProvider";
import FarmerProfileCompletion from "./FarmerProfileCompletion";
import { AccountBalance, Person, TripOrigin } from "@mui/icons-material";
<<<<<<< HEAD
import {
  Edit2,
  TreePine,
  User,
  Calendar,
  Mail,
  Phone,
  Book,
  Briefcase,
  LogOut,
  Trash2,
} from "lucide-react";
=======
import { Edit2, TreePine } from "lucide-react";
import { User, Calendar, Mail, Phone, Book, Briefcase } from "lucide-react";
import ProfileDetail from "../components/ProfileDetail";
import SidebarItem from "../components/SideBarItem";
import ContentWrapper from "@/components/shared/ContentWrapper";
>>>>>>> 17d6639c42985a71f2a80e7dddead19cafc8f54e

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
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [gpsLocation, setGpsLocation] = useState("");
  const gpsInputRef = useRef(null);

  const methods = useForm({
    resolver: zodResolver(addressSchema),
    mode: "onChange",
  });

  const { watch, setValue } = methods;
  watch();

  useEffect(() => {
    detectLocation();
  }, []);

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

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleDeleteAccount = () => {
    alert("Account deleted permanently!");
    localStorage.clear();
    navigate("/register");
  };

  return (
<<<<<<< HEAD
    <div className="flex flex-col lg:flex-row w-full mt-6 sm:mt-10 sm:px-0 py-6 gap-6">

      {/* Sidebar */}
      <aside className="order-2 lg:order-1 w-full lg:w-64 bg-[var(--color-white)] rounded-2xl flex flex-col gap-3">
        <h2 className="font-bold text-lg sm:text-xl lg:text-2xl mb-2 border-b pb-2 text-[var(--color-black)]">Profile</h2>
        <SidebarItem icon={<AccountBalance className="w-6 h-6 text-[var(--color-secondary)]" />} label="About Me" />
        <SidebarItem icon={<TripOrigin className="w-6 h-6 text-[var(--color-secondary)]" />} label="Past Orders" />
        <SidebarItem icon={<Person className="w-6 h-6 text-[var(--color-secondary)]" />} label="Suppliers" />
        <SidebarItem icon={<TreePine className="w-6 h-6 text-[var(--color-secondary)]" />} label="My Orchards" onClick={() => navigate("/my-orchards")} />
      </aside>

      {/* Main Profile Card */}
      <main className="order-1 lg:order-2 flex-1 w-full bg-[var(--color-white)] rounded-2xl border-0 lg:border border-[var(--color-black)] sm:p-6 lg:p-8 flex flex-col gap-4">
        
        {/* Heading + Edit */}
        <div className="flex justify-between items-center mb-3">
          <h1 className="font-bold text-xl sm:text-2xl lg:text-3xl text-[var(--color-black)]">Farmer Details</h1>
          <button
            onClick={() => setShowIncompleteSection(true)}
            className="p-2 rounded-full hover:bg-[var(--color-black-hover)]"
          >
            <Edit2 className="w-5 h-5 text-[var(--color-secondary)]" />
          </button>
        </div>

        {/* Image + Info */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
          <img
            src={farmer?.profilePic || "/assets/images/farmer.jpeg"} 
            alt={farmer?.fullName || ""}
            className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full object-cover border-2 border-[var(--color-black)]"
          />

          <div className="flex-1 flex flex-col gap-2 md:gap-3 w-full">
            <h2 className="font-bold text-lg sm:text-xl lg:text-2xl text-[var(--color-black)]">{farmer?.fullName || "Quarat"}</h2>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs sm:text-sm lg:text-base text-[var(--color-black)] w-full">
              <InfoItem icon={<User />} label="Gender" value={farmer?.gender || "Female"} />
              <InfoItem icon={<Calendar />} label="Age" value={farmer?.age || "28"} />
              <InfoItem icon={<Mail />} label="Email" value={farmer?.email || "anjuqadir14848@gmail.com"} />
              <InfoItem icon={<Phone />} label="Phone" value={farmer?.phone || "7051059559"} />
              <InfoItem icon={<Book />} label="Education" value={farmer?.education || "Graduate"} />
              <InfoItem icon={<Briefcase />} label="Profession" value={farmer?.profession || "Mazdoor"} />
            </div>

            {/* Profile Completion */}
            <div className="mt-3 lg:mt-5 px-6 w-full">
              <h2 className="font-semibold text-sm sm:text-base lg:text-lg mb-1 text-[var(--color-black)]">Profile Completion</h2>
              <div className="w-full bg-gray-200 h-2 sm:h-3 rounded-full overflow-hidden cursor-pointer" onClick={() => setShowIncompleteSection(true)}>
                <div className="bg-[var(--color-secondary)] h-2 sm:h-3 rounded-full transition-all duration-500" style={{ width: `${progress * 100}%` }}></div>
=======
    <ContentWrapper>
      <div className="flex flex-col-reverse lg:flex-row w-full lg:mt-32 mt-16 gap-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 bg-[var(--color-white)] rounded-2xl border border-[var(--color-black-hover)] flex flex-col gap-6">
          <h1 className="font-bold text-2xl text-[var(--color-black)] border-b pb-2">
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

        <main className="flex-1 bg-[var(--color-white)] rounded-2xl border border-[var(--color-black-hover)] flex flex-col gap-6">
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

          <div className="flex flex-col md:flex-row md:items-start gap-8">
            <div className="flex justify-center md:block">
              <img
                src={farmer?.profilePic || "/assets/images/farmer.jpeg"}
                alt={farmer?.fullName || ""}
                className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-2 border-[var(--color-black)]"
              />
            </div>
            <div className="flex-1 flex flex-col gap-3 md:text-left">
              <h2 className="text-xl md:text-3xl font-bold">
                {farmer?.fullName || "Quarat"}
              </h2>

              <div className="grid grid-cols-1 items-start md:grid-cols-2 gap-3 text-sm md:text-base">
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
>>>>>>> 17d6639c42985a71f2a80e7dddead19cafc8f54e
              </div>
            </div>

<<<<<<< HEAD
            {/* Logout + Delete */}
            <div className="mt-4 flex flex-col sm:flex-row gap-3 w-full">
              <button onClick={handleLogout} className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-[var(--color-black-hover)] text-[var(--color-black)] flex justify-center items-center gap-2">
                <LogOut className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-secondary)]" /> Logout
              </button>
              <button onClick={() => setShowDeleteConfirm(true)} className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-[var(--color-secondary)] text-[var(--color-white)] flex justify-center items-center gap-2">
                <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" /> Delete Account
              </button>
=======
              <div className="mt-5">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-3 gap-2">
                  {/* title + percentage always together */}
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg md:text-xl font-semibold">
                      Profile Completion
                    </h2>
                    <span className="text-[var(--color-secondary)] text-sm">
                      ({Math.round(progress * 100)}%)
                    </span>
                  </div>

                  {/* call-to-action becomes a button for clarity */}
                  <button
                    type="button"
                    onClick={() => setShowIncompleteSection(true)}
                    className="text-sm md:text-base font-medium text-[var(--color-white)] bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-hover)] rounded-full px-4 py-1 transition-colors"
                  >
                    Complete Profile
                  </button>
                </div>

                <div className="relative w-full cursor-pointer">
                  <div className="h-2 w-full bg-[var(--color-black-hover)] rounded-full overflow-hidden">
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
>>>>>>> 17d6639c42985a71f2a80e7dddead19cafc8f54e
            </div>
          </div>
        </main>

<<<<<<< HEAD
      {/* Popup: Complete Profile */}
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

      {/* Popup: Delete Confirm */}
      {showDeleteConfirm && (
        <Popup
          onClose={() => setShowDeleteConfirm(false)}
          title="Delete Account"
          open={showDeleteConfirm}
        >
          <div className="space-y-4">
            <p className="text-[var(--color-secondary)] font-medium">
              ⚠️ Are you sure you want to permanently delete your account? This
              action cannot be undone.
            </p>
            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 rounded-lg bg-[var(--color-black)] text-[var(--color-black)]"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 rounded-lg bg-[var(--color-secondary)] text-[var(--color-white)]"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </Popup>
      )}
    </div>
  );
}

/* Sidebar Item */
function SidebarItem({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-between gap-3 rounded-lg w-full text-left hover:bg-[var(--color-black)] transition focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
      aria-label={label}
    >
      <div className="flex items-center gap-3">
        <span className="w-6 h-6">{icon}</span>
        <span className="font-medium text-sm sm:text-base text-[var(--color-black)]">{label}</span>
      </div>
      <span className="block sm:hidden text-lg text-[var(--color-black)]">&gt;</span>
    </button>
  );
}

/* Info Item */
function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-2 p-2 w-full">
      <span className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--color-secondary)]">{icon}</span>
      <div className="truncate">
        <span className="font-semibold text-[var(--color-black)]">{label}: </span>
        <span className="text-[var(--color-black)] truncate">{value}</span>
      </div>
    </div>
=======
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
    </ContentWrapper>
>>>>>>> 17d6639c42985a71f2a80e7dddead19cafc8f54e
  );
}
