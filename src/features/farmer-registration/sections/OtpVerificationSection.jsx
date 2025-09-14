import FormLayout from "@/components/shared/FormLayout";
import FormInput from "@/features/auth/components/FormInput";
import FormSection from "@/features/auth/components/FormSection";
import LockIcon from "@mui/icons-material/Lock";
import Button from "@mui/material/Button";

export default function OtpVerificationSection({ register, errors, onResend }) {
  const iconStyle = { color: "var(--color-secondary)", fontSize: 20 };

  return (
    <FormSection title="OTP Verification">
      <p className="text-sm text-[var(--color-secondary)] mb-4">
        Please enter the 6-digit OTP sent to your registered mobile number.{" "}
        <br />
        OTP expires in <span className="font-medium">5:00</span> minutes.
      </p>

      <FormLayout>
        {/* Left Column: OTP Input */}
        <div className="flex flex-col justify-center items-center">
          <FormInput
            name="otp"
            label="Enter OTP"
            type="text"
            register={register}
            errors={errors.otp}
            icon={<LockIcon sx={iconStyle} />}
          />
        </div>

        {/* Right Column: Instructions & Resend */}
        <div className="flex flex-col justify-center items-start space-y-3 text-sm text-[var(--color-secondary)]">
          <Button variant="outlined" size="small" onClick={onResend}>
            Resend OTP
          </Button>
        </div>
      </FormLayout>
    </FormSection>
  );
}
