import { useEffect } from "react";
import FormLayout from "@/components/shared/FormLayout";
import FormInput from "@/components/shared/custom-inputs/FormInput";
import FormSection from "@/features/auth/components/FormSection";
import CustomButton from "@/components/ui/CustomButton";
import { GpsFixed } from "@mui/icons-material";

export default function AddressSection({
  register,
  errors,
  detectLocation,
  loading,
  onClick,
  gpsInputRef,
  value,
  onComplete,
}) {
  return (
    <FormSection title="Address" actionText="Use Current Location">
      <FormLayout>
        <FormInput
          name="village"
          label="Village"
          register={register}
          errors={errors.village}
        />
        <FormInput
          name="tehsil"
          label="Tehsil"
          register={register}
          errors={errors.tehsil}
        />
        <FormInput
          name="district"
          label="District"
          register={register}
          errors={errors.district}
        />
        <FormInput
          name="state"
          label="State"
          register={register}
          errors={errors.state}
        />
        <FormInput
          name="pincode"
          label="Pin Code"
          type="number"
          register={register}
          errors={errors.pincode}
        />
        <FormInput
          name="gps"
          label="Orchard Location"
          value={value}
          icon={
            <GpsFixed
              sx={{
                color: loading
                  ? "var(--color-black)"
                  : "var(--color-secondary)",
              }}
            />
          }
          onClick={onClick || detectLocation}
          readOnly
          register={register}
          errors={errors.gps}
          inputRef={gpsInputRef}
        />
      </FormLayout>

      {/* Complete Profile Button */}
      {onComplete && (
        <div className="mt-4 flex justify-center">
          <CustomButton
            varient="contained"
            text="Complete Profile"
            onClick={onComplete}
            sx={{
              fontSize: "0.875rem",
              padding: "8px 20px",
              borderRadius: "6px",
              textTransform: "none",
              backgroundColor: "var(--color-primary)",
              color: "var(--color-white)",
              "&:hover": { backgroundColor: "var(--color-primary-hover)" },
            }}
          />
        </div>
      )}
    </FormSection>
  );
}
