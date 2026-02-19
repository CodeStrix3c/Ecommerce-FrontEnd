import React, { useEffect, useMemo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { toast } from "react-toastify";

import {
  useVendorProfile,
  useVendorProfileUpdate,
} from "@/hooks/Vendor/useVendorProfile";
import Inputs from "@/components/shared/Inputs";

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
    const payload = {
      id: Number(vendorId),
      name: formData.name,
      slug: formData.slug,
      email: formData.email,
      description: formData.description,
      isActive: data?.isActive ?? true,
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
        onSuccess: () => toast.success("Profile updated successfully!"),
        onError: (error) =>
          toast.error(
            error?.response?.data?.message || "Failed to update profile"
          ),
      }
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
          {/* Header */}
          <div className="flex items-center gap-5 mb-10">
            <div className="h-20 w-20 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-3xl font-bold border">
              {firstLetter}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {data?.name}
              </h2>
              <p className="text-gray-500">{data?.email}</p>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div className="space-y-6">
              <Inputs
                required
                name="name"
                label="Vendor Name :"
                type="name"
                errors={errors.name}
              />

              <Inputs
                name="description"
                label="Description :"
                type="textarea"
                rows={5}
                errors={errors.description}
              />
            </div>

            <div className="space-y-6">
              <Inputs
                required
                name="slug"
                label="Slug :"
                type="text"
               errors={errors.slug}
              />

              <Inputs
                required
                name="email"
                label="Email :"
                type="email"
                disabled
                errors={errors.email}
              />

              <div className="flex justify-end pt-6">
                <button
                  type="submit"
                  disabled={updateMutation.isLoading}
                  className="px-10 py-2.5 rounded bg-[var(--color-primary)] text-white text-sm font-medium hover:bg-gray-800 transition shadow-sm w-full md:w-auto disabled:bg-gray-400"
                >
                  {updateMutation.isLoading
                    ? "Updating..."
                    : "Update Profile"}
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
