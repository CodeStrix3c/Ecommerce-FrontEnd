import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import UserProfileSection from "@/features/supplier-registration/sections/userProfileSection";
import { userProfileSchema } from "@/features/farmer-registration/schemas/userSchamas/userProfileSchema";
import {
  useFileUploadMutation,
  useFileDeleteMutation,
} from "@/hooks/User/Profile/useFileUpload";
import {
  useUpdateUserProfile,
  useUserProfile,
} from "@/hooks/User/Profile/useUserProfile";
import UserProfileHeader from "@/components/ui/profileHeader";

export default function UserSupplier() {
  const userId = Number(localStorage.getItem("userId"));
  const { data } = useUserProfile(userId);
  const { mutate: updateProfile } = useUpdateUserProfile();

  const { mutateAsync: uploadFileMutation } = useFileUploadMutation();
  const { mutateAsync: deleteFileMutation } = useFileDeleteMutation();

  const methods = useForm({
    resolver: zodResolver(userProfileSchema),
    mode: "onChange",
  });

  const {
    handleSubmit,
    reset,
    watch,
    formState: { isDirty },
  } = methods;

  useEffect(() => {
    if (data) {
      reset({
        ...data,
        profilePic: data.profilePic || null,
        password: "",
        confirmPassword: "",
      });
    }
  }, [data, reset]);

  const onSubmit = async (formData) => {
    if (!data?.id) {
      toast.error("Profile ID missing!");
      return;
    }

    try {
      let profilePicValue = data?.profilePic || "";

      // Upload new image if changed
      if (formData.profilePic instanceof File) {
        const uploadResponse = await uploadFileMutation({
          file: formData.profilePic,
          UserType: "User",
          UserId: userId,
          FileCategory: "ProfilePicture",
        });

        profilePicValue = uploadResponse?.fileUrl || uploadResponse?.data;
      }

      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        age: Number(formData.age),
        gender: formData.gender,
        profilePic: profilePicValue,
      };

      updateProfile(
        { id: data.id, payload },
        {
          onSuccess: () => toast.success("Profile updated successfully"),
        },
      );
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  const handleDeleteProfilePic = async () => {
    if (!data?.profilePic) return;

    try {
      await deleteFileMutation({
        blobName: data.profilePic,
        userId,
      });

      updateProfile({
        id: data.id,
        payload: { ...data, profilePic: null },
      });

      reset({
        ...watch(),
        profilePic: null,
      });

      toast.success("Profile picture removed");
    } catch (error) {
      toast.error("Failed to delete profile picture");
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 mt-24">
      {/* ✅ FormProvider FIX */}
      <FormProvider {...methods}>
        <UserProfileHeader data={data} />
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* ❌ Removed register/control/errors props */}
          <UserProfileSection onDeleteProfilePic={handleDeleteProfilePic} />

          <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={() => reset()}
              className="px-5 py-2 text-sm text-gray-500 hover:text-red-500"
            >
              Discard Changes
            </button>

            <button
              type="submit"
              disabled={!isDirty}
              className="px-8 py-2.5 bg-black text-white rounded-full"
            >
              Save Changes
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
