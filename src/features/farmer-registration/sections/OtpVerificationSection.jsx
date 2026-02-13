import FormLayout from "@/components/shared/FormLayout";
import CustomButton from "@/components/ui/CustomButton";
import FormInput from "@/components/shared/custom-inputs/FormInput";
import FormSection from "@/features/auth/components/FormSection";
import LockIcon from "@mui/icons-material/Lock";
import Button from "@mui/material/Button";

export default function OtpVerificationSection({ register, errors, onResend }) {
  const iconStyle = { color: "var(--color-secondary)", fontSize: 20 };

  return (
    <>
      <p className=" text-[var(--color-secondary)] mb-4" style={{}}>
        Please enter the 6-digit OTP sent to your registered mobile number.
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
            placeholder="Enter 6-digits OTP"
            register={register}
            errors={errors.otp}
            icon={"Resend OTP"}
            onClick={onResend}
          />
        </div>

        <div className="flex flex-col justify-center items-start"></div>
      </FormLayout>
    </>
  );
}
