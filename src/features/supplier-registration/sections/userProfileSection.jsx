import React, { useMemo, useRef, useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import { Camera, Pencil, Trash2, X } from "lucide-react";

import FormInput from "@/components/shared/custom-inputs/FormInput";
import SelectField from "@/components/shared/custom-inputs/SelectField";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import WcIcon from "@mui/icons-material/Wc";

export default function UserProfileSection({
  register,
  errors,
  control,
  watch,
  onDeleteProfilePic,
}) {
  const fileInputRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);

  const iconStyle = { color: "#000", fontSize: 18, opacity: 0.4 };

  const profilePic = watch("profilePic");
  const fullName = watch("fullName") || "";
  const email = watch("email") || "";

  // ---------- INITIALS ----------
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  // ---------- PREVIEW ----------
  const previewUrl = useMemo(() => {
    if (profilePic instanceof File) {
      return URL.createObjectURL(profilePic);
    }
    return profilePic || null;
  }, [profilePic]);

  const hasImage = !!previewUrl;

  // ---------- CLOSE MENU ----------
  useEffect(() => {
    const closeMenu = () => setShowMenu(false);
    if (showMenu) window.addEventListener("click", closeMenu);
    return () => window.removeEventListener("click", closeMenu);
  }, [showMenu]);

  // ---------- HANDLERS ----------
  const handleMainClick = (e) => {
    e.stopPropagation();
    if (!hasImage) {
      fileInputRef.current?.click();
    } else {
      setShowMenu((prev) => !prev);
    }
  };

  const handleChangePhoto = (e) => {
    e.stopPropagation();
    setShowMenu(false);
    fileInputRef.current?.click();
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    setShowMenu(false);
    onDeleteProfilePic();
  };

  return (
    <div className="w-full space-y-10 lg:mt-24">
      {/* ================= AVATAR SECTION ================= */}
      <div className="flex flex-row">
        <div className="relative group mb-6">
          <div
            className="h-36 w-36 md:h-44 md:w-44 rounded-full overflow-hidden
                       border-4 border-white shadow-xl ring-2 ring-black
                       bg-gray-100 relative z-20 transition-all duration-500"
          >
            {hasImage ? (
              <img
                src={previewUrl}
                alt="Profile"
                className="h-full w-full object-cover 
                           group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-black">
                <span className="text-4xl md:text-5xl font-bold text-white">
                  {getInitials(fullName)}
                </span>
              </div>
            )}
          </div>

          {/* Action Button */}
          <div className="absolute bottom-2 right-2 z-30 flex items-center">
            <button
              type="button"
              onClick={handleMainClick}
              className={`
                relative z-20 h-11 w-11 rounded-full bg-black text-white
                flex items-center justify-center border-4 border-white
                shadow-lg transition-all duration-300
                hover:scale-105 active:scale-95
                ${showMenu ? "rotate-90" : ""}
              `}
            >
              {hasImage ? (
                showMenu ? (
                  <X size={18} />
                ) : (
                  <Pencil size={18} />
                )
              ) : (
                <Camera size={18} />
              )}
            </button>

            {hasImage && (
              <div
                onClick={(e) => e.stopPropagation()}
                className={`
                  absolute right-1/2 top-1/2 -translate-y-1/2
                  flex items-center gap-2 bg-white
                  pl-8 pr-3 h-11 rounded-full shadow-md
                  border border-gray-200
                  transition-all duration-300 ease-out origin-right
                  ${
                    showMenu
                      ? "opacity-100 w-max translate-x-[100%]"
                      : "opacity-0 w-0 pointer-events-none"
                  }
                `}
              >
                <button
                  type="button"
                  onClick={handleChangePhoto}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <Camera size={18} />
                </button>

                <div className="w-[1px] h-5 bg-gray-300"></div>

                <button
                  type="button"
                  onClick={handleDelete}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            )}
          </div>

          {/* Hidden File Input */}
          <Controller
            name="profilePic"
            control={control}
            render={({ field }) => (
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  field.onChange(file);
                }}
              />
            )}
          />
        </div>

        <div className="text-center space-y-1">
          <h2 className="text-2xl font-semibold text-gray-900 pt-20">
            {fullName || "Account Settings"}
          </h2>
          <p className="text-sm text-gray-500 pt-2 pl-5">
            {email || "Update your details"}
          </p>
        </div>
      </div>

      {/* ================= FORM INPUTS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          name="fullName"
          label="Legal Name"
          placeholder="John Doe"
          register={register}
          errors={errors?.fullName}
          icon={<AccountCircleIcon sx={iconStyle} />}
        />

        <FormInput
          name="email"
          label="Email Address"
          type="email"
          placeholder="john@company.com"
          register={register}
          errors={errors?.email}
          icon={<EmailIcon sx={iconStyle} />}
        />

        <FormInput
          name="phone"
          label="Contact Number"
          type="tel"
          placeholder="+1 (000) 000-0000"
          register={register}
          errors={errors?.phone}
          icon={<PhoneIcon sx={iconStyle} />}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            name="age"
            label="Age"
            type="number"
            placeholder="25"
            register={register}
            errors={errors?.age}
          />

          <div className="mt-6">
            <SelectField
              name="gender"
              label="Gender"
              register={register}
              control={control}
              errors={errors?.gender}
              icon={<WcIcon sx={iconStyle} />}
              options={[
                { value: "", label: "Select" },
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
                { value: "other", label: "Other" },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
