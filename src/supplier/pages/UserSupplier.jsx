import React, { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { useForm, FormProvider } from "react-hook-form";
import Inputs from "@/components/shared/Inputs";

import {
  useUserProfile,
  useUpdateUserProfile,
} from "@/hooks/Vendor/useUserProfile";

export default function UserSupplier() {
  const userId = Number(localStorage.getItem("userId"));
  const { data, refetch } = useUserProfile(userId);
  const { mutate: updateProfile, isPending } = useUpdateUserProfile();

  const [profileId, setProfileId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [toast, setToast] = useState("");

  /* ================= FORM ================= */
  const methods = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      age: "",
      gender: "",
      profilePic: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    reset,
    handleSubmit,
    watch,
    formState: { errors, isDirty },
  } = methods;

  const form = watch();

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    if (data) {
      const filled = {
        fullName: data.fullName || "",
        email: data.email || "",
        phone: data.phone || "",
        age: data.age || "",
        gender: data.gender || "",
        profilePic: data.profilePic || "",
        password: "",
        confirmPassword: "",
      };

      setProfileId(data.id);
      reset(filled);
      setIsEditing(false);
    }
  }, [data, reset]);

  /* ================= IMAGE ================= */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsEditing(true);

    const url = URL.createObjectURL(file);
    methods.setValue("profilePic", url, { shouldDirty: true });
  };

  /* ================= VALIDATION + SAVE ================= */
  const onSubmit = (values) => {
    if (values.password || values.confirmPassword) {
      if (values.password !== values.confirmPassword) {
        return alert("Passwords do not match");
      }
    }

    updateProfile(
      {
        id: profileId,
        payload: {
          ...values,
          age: Number(values.age),
        },
      },
      {
        onSuccess: () => {
          setToast("Profile updated successfully");
          setIsEditing(false);
          refetch();
          setTimeout(() => setToast(""), 2500);
        },
      }
    );
  };

  const handleCancel = () => {
    reset(data);
    setIsEditing(false);
  };

  /* ================= UI ================= */
  return (
    <FormProvider {...methods}>
      <div className="bg-white min-h-screen pt-[66px] md:pt-[94px] pb-12">
        {toast && (
          <div className="fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded-lg z-50">
            {toast}
          </div>
        )}

        <div className="mx-auto w-full max-w-4xl">
          {/* ===== HEADER ===== */}
          <div className="px-6 py-6 border-b">
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6">
              {/* Avatar */}
              <div className="flex justify-center sm:justify-start">
                <div className="relative">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border">
                    <img
                      src={form.profilePic || "/default-avatar.png"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <label
                    htmlFor="profilePicInput"
                    className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer"
                  >
                    <Pencil size={14} />
                  </label>

                  <input
                    id="profilePicInput"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
              </div>

              {/* Info */}
              <div className="mt-4 sm:mt-0 text-center sm:text-left flex-1">
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                  {form.fullName || "Your Name"}
                </h1>
                <p className="text-sm text-black">
                  {form.email || "your@email.com"}
                </p>
                <span className="inline-block mt-2 px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                  User Account
                </span>
              </div>
            </div>
          </div>

          {/* ===== FORM ===== */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-6 py-6 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <Inputs
            required
              name="fullName"
              label="Full Name :"
              type="name"
              errors={errors.fullName}
            />

            <Inputs
            required
              name="age"
              label="Age :"
              type="age"
              errors={errors.age}
            />

            <Inputs
              name="email"
              label="Email :"
              type="email"
              disabled
              errors={errors.email}
            />

            <Inputs 
            required
              name="gender"
              label="Gender :"
              type="text"
              errors={errors.gender}
            />

            <div className="md:col-span-2">
              <Inputs
              required
                name="phone"
                label="Phone :"
                type="phone"
                errors={errors.phone}
              />
            </div>

            <Inputs
            required
              name="password"
              label="New Password :"
              type="password"
              errors={errors.password}
            />

            <Inputs
            required
              name="confirmPassword"
              label="Confirm Password :"
              type="password"
              errors={errors.confirmPassword}
            />

            {/* ===== ACTIONS ===== */}
            <div className="md:col-span-2 flex gap-3 pt-4">
              <button
                type="submit"
                disabled={!isDirty || isPending}
                className="flex-1 bg-red-600 text-white py-2.5 rounded-lg disabled:opacity-40"
              >
                {isPending ? "Saving..." : "Save Changes"}
              </button>

              <button
                type="button"
                onClick={handleCancel}
                disabled={!isDirty}
                className="flex-1 border py-2.5 rounded-lg disabled:opacity-40"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </FormProvider>
  );
}
