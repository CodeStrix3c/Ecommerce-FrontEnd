import React from "react";
import { useFormContext } from "react-hook-form";
import FormActions from "./FormActions";
import Inputs from "@/components/shared/Inputs";

const VerifyOtpStep = ({
  errors,
  formatTime,
  expired,
  handleResend,
  onSubmit,
  onBack,
  isSubmitting,
}) => {
  const { formState } = useFormContext();
  const { errors: formErrors } = formState;

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-xl font-semibold text-[var(--color-primary)]">
          Verify OTP
        </h1>

        <p className="text-sm text-[var(--color-overlay)] mt-2">
          Enter the OTP sent to your phone
        </p>
      </div>

      <div className="space-y-6">
        {/* OTP INPUT */}
        <Inputs name="otp" label="OTP" type="otp" errors={formErrors.otp} />

        {/* NEW PASSWORD */}
        <Inputs
          name="newPassword"
          label="New Password"
          type="password"
          errors={formErrors.newPassword}
        />

        {/* CONFIRM PASSWORD */}
        <Inputs
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          errors={formErrors.confirmPassword}
        />
      </div>

      <div className="flex justify-between items-center mt-4 text-sm">
        <span>{expired ? "OTP expired" : `Resend in ${formatTime()}`}</span>

        {expired && (
          <button
            type="button"
            className="text-[var(--color-primary)]"
            onClick={handleResend}
          >
            Resend OTP
          </button>
        )}
      </div>

      <div className="mt-8">
        <FormActions
          cancelLabel="Back"
          submitLabel="Verify & Reset Password"
          onCancel={onBack}
          onSubmit={onSubmit}
          loading={isSubmitting}
        />
      </div>
    </div>
  );
};

export default VerifyOtpStep;
