import React from "react";
import SectionCard from "./SectionCard";
import Inputs from "@/components/shared/Inputs";
import { useForm, FormProvider } from "react-hook-form";
import { useChangePassword } from "@/hooks/User/ChangePassword/useChangePassword";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema } from "@/features/farmer-registration/schemas/userSchamas/changePasswordSchema";

const PasswordSettings = () => {
  const { mutateAsync, isPending } = useChangePassword();

  const methods = useForm({
    resolver: zodResolver(changePasswordSchema),
    mode: "onChange",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  const {
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = methods;

  const newPassword = watch("newPassword");

  const onSubmit = async (data) => {
    try {
      const resp = await mutateAsync(data);
      toast.success("Password saved successfully");
      reset();
    } catch (error) {
      const status = error?.response?.status;

      if (status === 400) {
        toast.error("Current password is incorrect");
      } else if (status === 401) {
        toast.error("Unauthorized request. Please login again");
      } else if (status === 404) {
        toast.error("User not found");
      } else if (status === 500) {
        toast.error("Server error. Please try later");
      } else {
        toast.error("Something went wrong, please try again");
      }
    }
  };

  return (
    <SectionCard title="Change Password">
      <FormProvider {...methods}>
        <div>
          <Inputs
            required
            name="currentPassword"
            label="Current Password"
            type="password"
            errors={errors.currentPassword}
          />

          <Inputs
            required
            name="newPassword"
            label="New Password"
            type="password"
            errors={errors.newPassword}
          />

          <Inputs
            required
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            errors={errors.confirmPassword}
          />

          <div className="flex justify-end gap-3 mt-6">

            <button
              type="button"
              onClick={() => handleSubmit(onSubmit)()}
              disabled={isPending}
              className="bg-[var(--color-primary)] text-white px-4 py-2 rounded text-sm disabled:opacity-50"
            >
              {isPending ? "Saving..." : "Save"}
            </button>

            <button
              type="button"
              onClick={() => {
                reset();
              }}
              className="border border-[var(--color-gray)] px-4 py-2 rounded text-sm"
            >
              Cancel
            </button>


          </div>
        </div>
      </FormProvider>
    </SectionCard>
  );
};

export default PasswordSettings;