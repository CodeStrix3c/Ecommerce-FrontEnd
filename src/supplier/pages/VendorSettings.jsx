import React, { useEffect, useMemo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { toast } from "react-toastify";

import FormInput from "@/components/shared/custom-inputs/FormInput";
import FormTextArea from "@/components/shared/custom-inputs/FormTextArea";
import {
  useVendorProfile,
  useVendorProfileUpdate,
} from "@/hooks/Vendor/useVendorProfile";

const VendorSettings = () => {
  const vendorId = useMemo(() => localStorage.getItem("vendorId"), []);
  const queryClient = useVendorProfile(vendorId);
  const { data, isLoading } = queryClient;

  const updateMutation = useVendorProfileUpdate();

  const methods = useForm({
    defaultValues: {
      name: "",
      slug: "",
      email: "",
      description: "",
    },
  });

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (data) {
      reset({
        name: data.name || "",
        slug: data.slug || "",
        email: data.email || "",
        description: data.description || "",
      });
    }
  }, [data, reset]);

  const onSubmit = (formData) => {
    // Constructing payload as requested
    const payload = {
      id: Number(vendorId),
      name: formData.name,
      slug: formData.slug,
      email: formData.email,
      description: formData.description,
      isActive: data?.isActive ?? true, // Keeping existing state or default true
      managers: [
        {
          userId: 0,
          email: "",
        },
      ],
    };

    updateMutation.mutate(
      { vendorId, payload },
      {
        onSuccess: () => {
          toast.success("Profile updated successfully!");
        },
        onError: (error) => {
          toast.error(
            error?.response?.data?.message || "Failed to update profile",
          );
        },
      },
    );
  };

  if (isLoading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading vendor profile...
      </div>
    );
  }

  const firstLetter = data?.name?.charAt(0)?.toUpperCase() || "V";

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen w-full flex justify-center px-4 sm:px-6 lg:px-10 py-10">
        <div className="w-full max-w-2xl">
          {/* ================= PROFILE HEADER ================= */}
          <div className="flex items-center gap-5 mb-10">
            <div className="h-20 w-20 rounded-full bg-[var(--color-primary)] text-[var(--color-white)] flex items-center justify-center text-3xl font-bold border border-gray-200">
              {firstLetter}
            </div>
            <div className="flex flex-col">
              <h2 className="text-xl font-bold text-gray-900">{data?.name}</h2>
              <p className="text-gray-500">{data?.email}</p>
            </div>
          </div>

          {/* ================= FORM ================= */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div className="space-y-6">
              <FormInput
                name="name"
                label="Vendor Name"
                register={register}
                errors={errors.name}
              />
              <FormTextArea
                name="description"
                label="Description"
                rows={5}
                register={register}
                errors={errors.description}
              />
            </div>

            <div className="flex flex-col space-y-6">
              <FormInput
                name="slug"
                label="Slug"
                register={register}
                errors={errors.slug}
              />
              <FormInput
                name="email"
                label="Email"
                type="email"
                disabled
                register={register}
                errors={errors.email}
              />

              <div className="flex justify-end pt-6">
                <button
                  type="submit"
                  disabled={updateMutation.isLoading}
                  className="px-10 py-2.5 rounded bg-[var(--color-primary)] text-white text-sm font-medium hover:bg-gray-800 transition shadow-sm w-full md:w-auto disabled:bg-gray-400"
                >
                  {updateMutation.isLoading ? "Updating..." : "Update Profile"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </FormProvider>
  );
};

export default VendorSettings;
