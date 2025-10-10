import { useEffect, useRef, useState } from "react";
import FormLayout from "@/components/shared/FormLayout";
import FormInput from "@/components/shared/custom-inputs/FormInput";
import FormSection from "@/features/auth/components/FormSection";
import CustomButton from "@/components/ui/CustomButton";
import { GpsFixed } from "@mui/icons-material";
import { getCurrentLocation } from "@/utils/getCurrentLocation";

export default function AddressSection({
  register,
  errors,
  detectLocation,
  onClick,
  value,
  onComplete,
}) {
  const [gpsLocation, setGpsLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const gpsInputRef = useRef(null);
  useEffect(() => {
    fetchLocation();
  }, []);

  const fetchLocation = async () => {
    setLoading(true);
    try {
      const { gpsString } = await getCurrentLocation();
      setGpsLocation(gpsString);

      setTimeout(() => {
        gpsInputRef.current?.focus();
      }, 100);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };
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
          value={gpsLocation}
          icon={
            <GpsFixed
              sx={{
                color: loading
                  ? "var(--color-black)"
                  : "var(--color-secondary)",
              }}
            />
          }
          onClick={fetchLocation}
          readOnly
          register={register}
          errors={errors.gps}
          inputRef={gpsInputRef}
        />
      </FormLayout>

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
