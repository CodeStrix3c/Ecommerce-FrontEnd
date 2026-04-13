import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { Pencil, X, Mail, Phone, User, Users } from "lucide-react";

import UserProfileSection, {
  isPlaceholderEmail,
  generatePlaceholderEmail,
} from "@/features/supplier-registration/sections/userProfileSection";
import { userProfileSchema } from "@/features/farmer-registration/schemas/userSchamas/userProfileSchema";
import { useFileUploadMutation } from "@/hooks/User/Profile/useFileUpload";
import {
  useUpdateUserProfile,
  useUserProfile,
} from "@/hooks/User/Profile/useUserProfile";
import UserProfileHeader from "@/components/ui/profileHeader";

const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-4 py-4">
    <div className="h-10 w-10 rounded-xl bg-[var(--color-secondary)] flex items-center justify-center">
      <Icon className="h-5 w-5 text-[var(--color-white)]" />
    </div>
    <div>
      <p className="text-sm text-black/90">{label}</p>
      <p className="text-base font-medium text-gray-900 break-words">
        {value || "—"}
      </p>
    </div>
  </div>
);

// ─── Profile Picture Lightbox ───────────────────────────────────────────────
const ProfilePicLightbox = ({ src, name, onClose }) => {
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition"
        aria-label="Close"
      >
        <X size={28} />
      </button>

      <div
        className="relative flex flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        {src ? (
          <img
            src={src}
            alt={name || "Profile picture"}
            className="max-h-[80vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
          />
        ) : (
          <div className="h-64 w-64 rounded-2xl bg-green-600 flex items-center justify-center shadow-2xl">
            <span className="text-7xl font-semibold text-white select-none">
              {name ? name.charAt(0).toUpperCase() : "U"}
            </span>
          </div>
        )}

        {name && (
          <p className="text-white text-lg font-medium tracking-wide">{name}</p>
        )}
      </div>
    </div>
  );
};

export default function UserSupplier() {
  const userId = Number(localStorage.getItem("userId"));
  const { data, refetch } = useUserProfile(userId);
  const { mutate: updateProfile } = useUpdateUserProfile();
  const { mutateAsync: uploadFileMutation } = useFileUploadMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const methods = useForm({
    resolver: zodResolver(userProfileSchema),
    mode: "onChange",
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (data) reset({ ...data, profilePic: data.profilePic || null });
  }, [data, reset]);

  useEffect(() => {
    document.body.style.overflow =
      isModalOpen || isLightboxOpen ? "hidden" : "auto";
  }, [isModalOpen, isLightboxOpen]);

  const onSubmit = async (formData) => {
    if (!data?.id) return toast.error("Profile ID missing!");

    try {
      let profilePicValue = data?.profilePic || "";

      if (formData.profilePic instanceof File) {
        const uploadResponse = await uploadFileMutation({
          file: formData.profilePic,
          UserType: "User",
          UserId: userId,
          FileCategory: "ProfilePicture",
        });
        profilePicValue = uploadResponse?.fileUrl || uploadResponse?.data;
      }

      // Always guarantee a placeholder email is sent when the field is empty.
      // Re-use the existing server-side placeholder to avoid burning a new counter slot.
      const resolvedEmail =
        !formData.email || formData.email.trim() === ""
          ? isPlaceholderEmail(data?.email)
            ? data.email // keep the one already stored on the server
            : generatePlaceholderEmail() // first time — mint a new one
          : formData.email;

      const payload = {
        ...formData,
        email: resolvedEmail,
        profilePic: profilePicValue,
      };

      updateProfile(
        { id: data.id, payload },
        {
          onSuccess: () => {
            toast.success("Profile updated successfully");
            setIsModalOpen(false);
            refetch();
          },
        },
      );
    } catch {
      toast.error("Something went wrong.");
    }
  };

  // Hide placeholder emails — show empty string so InfoRow renders "—"
  const displayEmail = isPlaceholderEmail(data?.email) ? "" : data?.email;

  // Only show lightbox if user actually has a profile picture
  const handleAvatarClick = () => {
    if (data?.profilePic) setIsLightboxOpen(true);
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 py-8 sm:py-12">
      <UserProfileHeader data={data} onAvatarClick={handleAvatarClick} />

      {/* Personal Details Card */}
      <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-black">Personal Details</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="h-9 w-9 rounded-full bg-white flex items-center justify-center hover:bg-white-100 transition"
          >
            <Pencil className="h-6 w-6 text-[var(--color-secondary)]" />
          </button>
        </div>

        <div className="space-y-1 bg-white">
          <InfoRow icon={Mail} label="Email" value={displayEmail} />
          <InfoRow icon={Phone} label="Phone" value={data?.phone} />
          <InfoRow icon={User} label="Age" value={data?.age} />
          <InfoRow icon={Users} label="Gender" value={data?.gender} />
        </div>
      </div>

      {/* ── Lightbox — only renders if user has a real profile pic ── */}
      {isLightboxOpen && data?.profilePic && (
        <ProfilePicLightbox
          src={data.profilePic}
          name={data?.name || data?.fullName}
          onClose={() => setIsLightboxOpen(false)}
        />
      )}

      {/* ── Edit Profile Modal ─────────────────────────────────── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center">
          <div className="bg-white w-full h-full sm:h-auto sm:max-w-2xl rounded-none sm:rounded-2xl p-6 sm:p-8 overflow-y-auto shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black transition"
            >
              <X size={22} />
            </button>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Edit Profile
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Update your details below and save changes.
              </p>
            </div>

            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <UserProfileSection />

                <div className="flex justify-end gap-4 pt-6 border-t mt-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2 text-gray-600 hover:text-red-500 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-2.5 bg-green-600 text-white rounded-full disabled:opacity-50 hover:opacity-90 transition"
                  >
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      )}
    </div>
  );
}
