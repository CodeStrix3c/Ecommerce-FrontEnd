import React from "react";
import { Controller } from "react-hook-form";
import FormInput from "@/components/shared/custom-inputs/FormInput";
import SelectField from "@/components/shared/custom-inputs/SelectField";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CakeIcon from "@mui/icons-material/Cake";
import WcIcon from "@mui/icons-material/Wc";

export default function UserProfileSection({
  register,
  errors,
  control,
  watch,
}) {
  const iconStyle = { color: "#000", fontSize: 18, opacity: 0.4 };
  const profilePic = watch("profilePic");
  const previewUrl =
    profilePic instanceof File ? URL.createObjectURL(profilePic) : profilePic;

  return (
    <div className="w-full">
      {/* Header Section: Profile Pic Top Left */}
      <div className="flex flex-col md:flex-row items-start gap-8 mb-16 mt-20">
        <div className="relative flex-shrink-0">
          <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shadow-inner">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <AccountCircleIcon sx={{ fontSize: 60, color: "#e5e7eb" }} />
              </div>
            )}
          </div>

          <Controller
            name="profilePic"
            control={control}
            render={({ field }) => (
              <label className="absolute -bottom-3 -right-3 bg-black text-white p-2.5 rounded-xl cursor-pointer hover:bg-gray-800 transition-all shadow-lg">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => field.onChange(e.target.files[0])}
                />
                <CameraAltIcon sx={{ fontSize: 18 }} />
              </label>
            )}
          />
        </div>

        <div className="pt-4">
          <h1 className="text-4xl font-black text-black tracking-tighter uppercase">
            {watch("fullName") || "Account Settings"}
          </h1>
          {/* <div className="mt-2 flex items-center gap-3">
            <span className="text-[10px] font-black bg-black text-white px-3 py-1 uppercase tracking-widest">
              Verified Supplier
            </span>
            <span className="text-xs text-gray-400 font-medium">
              Member ID: {localStorage.getItem("userId") || "N/A"}
            </span>
          </div> */}
        </div>
      </div>

      {/* Inputs Grid: 2 per row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
        <FormInput
          name="fullName"
          label="Legal Name"
          placeholder="John Doe"
          register={register}
          errors={errors.fullName}
          icon={<AccountCircleIcon sx={iconStyle} />}
        />

        <FormInput
          name="email"
          label="Email Address"
          type="email"
          placeholder="john@company.com"
          register={register}
          errors={errors.email}
          icon={<EmailIcon sx={iconStyle} />}
        />

        <FormInput
          name="phone"
          label="Contact Number"
          type="tel"
          placeholder="+1 (000) 000-0000"
          register={register}
          errors={errors.phone}
          icon={<PhoneIcon sx={iconStyle} />}
        />

        <div className="grid grid-cols-2 gap-6">
          <FormInput
            name="age"
            label="Age"
            type="number"
            placeholder="25"
            register={register}
            errors={errors.age}
            // icon={<CakeIcon sx={{ ...iconStyle, fontSize: 16 }} />}
          />
          <SelectField
            name="gender"
            label="Gender"
            register={register}
            control={control}
            errors={errors.gender}
            icon={<WcIcon sx={{ ...iconStyle, fontSize: 16 }} />}
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
  );
}
