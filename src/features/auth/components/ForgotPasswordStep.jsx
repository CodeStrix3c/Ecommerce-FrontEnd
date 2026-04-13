import React from "react";
import { useFormContext } from "react-hook-form";
import FormActions from "./FormActions";
import Inputs from "@/components/shared/Inputs";

const ForgotPasswordStep = ({ errors, onSubmit, isSubmitting }) => {
  const { register } = useFormContext();

  return (
    <div className="w-full max-w-md mx-auto bg-[var(--color-white)] ">
      <div className="text-center mb-8">
        <h1 className="text-xl font-semibold text-[var(--color-primary)]">
          Forgot Password
        </h1>

        <p className="text-sm text-[var(--color-overlay)] mt-2">
          Enter your phone number to receive OTP
        </p>
      </div>

      <div className="space-y-6">
        <Inputs
          label="Phone Number : "
          placeholder="Enter your registered phone number"
          type="phone"
          {...register("phoneNumber")}
          error={errors.phoneNumber?.message}
        />
      </div>

      <div className="mt-8">
        <FormActions
          cancelLabel="Back"
          submitLabel="Send OTP"
          onCancel={() => window.history.back()}
          onSubmit={onSubmit}
          loading={isSubmitting}
        />
      </div>
    </div>
  );
};

export default ForgotPasswordStep;
