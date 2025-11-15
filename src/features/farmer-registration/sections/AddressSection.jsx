import { useEffect, useRef, useState } from "react";
import FormLayout from "@/components/shared/FormLayout";
import FormInput from "@/components/shared/custom-inputs/FormInput";
import FormSection from "@/features/auth/components/FormSection";
import CustomButton from "@/components/ui/CustomButton";
import { GpsFixed } from "@mui/icons-material";
import { getCurrentLocation } from "@/utils/getCurrentLocation";
import SelectField from "@/components/shared/custom-inputs/SelectField";
import { useFormContext } from "react-hook-form";
import MapBox from "@/components/ui/MapBox";

export default function AddressSection({ onComplete }) {
  const {
    register,
    setValue,
    watch,

    formState: { errors },
  } = useFormContext();

  console.log(watch(), "watch++++");

  const locationData = {
    "State A": {
      "District 1": ["Tehsil 1", "Tehsil 2"],
      "District 2": ["Tehsil 3", "Tehsil 4"],
    },
    "State B": {
      "District 3": ["Tehsil 5", "Tehsil 6"],
      "District 4": ["Tehsil 7", "Tehsil 8"],
    },
  };
  const stateValue = watch("state") || "";
  const districtValue = watch("district") || "";
  const tehsilValue = watch("tehsil") || "";
  const villageValue = watch("village") || "";

  const stateOptions = Object.keys(locationData).map((s) => ({
    label: s,
    value: s,
  }));
  const districtOptions = stateValue
    ? Object.keys(locationData[stateValue]).map((d) => ({
        label: d,
        value: d,
      }))
    : [];
  const tehsilOptions =
    stateValue && districtValue
      ? locationData[stateValue][districtValue].map((t) => ({
          label: t,
          value: t,
        }))
      : [];
  const villageOptions =
    stateValue && districtValue && tehsilValue
      ? ["Village 1", "Village 2", "Village 3"].map((v) => ({
          label: v,
          value: v,
        }))
      : [];
  const [gpsLocation, setGpsLocation] = useState("");
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(false);
  const gpsInputRef = useRef(null);
  useEffect(() => {
    fetchLocation();
  }, []);

  const fetchLocation = async () => {
    setLoading(true);
    try {
      const { gpsString, latitude, longitude } = await getCurrentLocation();
      setGpsLocation(gpsString);
      setCoords({ latitude, longitude });
      setTimeout(() => gpsInputRef.current?.focus(), 100);
    } catch (err) {
      console.error("Error fetching GPS:", err);
    } finally {
      setLoading(false);
    }
  };

  console.log(coords, "coords,,,,");

  return (
    <FormSection title="Address" actionText="Use Current Location">
      <FormLayout>
        <SelectField
          name="state"
          label="State"
          register={register}
          errors={errors.state}
          options={stateOptions}
          value={stateValue}
          onChange={(e) => {
            setValue("state", e.target.value, {
              shouldValidate: true,
            });
            setValue("district", "");
            setValue("tehsil", "");
          }}
        />

        <SelectField
          name="district"
          label="District"
          register={register}
          errors={!stateValue ? "Select State First" : errors.district}
          options={districtOptions}
          value={districtValue}
          onChange={(e) => {
            setValue("district", e.target.value, {
              shouldValidate: true,
            });
            setValue("tehsil", "");
          }}
          disabled={!stateValue}
        />

        <SelectField
          name="tehsil"
          label="Tehsil"
          register={register}
          errors={!districtValue ? "Select District first" : errors.tehsil}
          options={tehsilOptions}
          value={tehsilValue}
          onChange={(e) =>
            setValue("tehsil", e.target.value, {
              shouldValidate: true,
            })
          }
          disabled={!districtValue}
        />
        <SelectField
          name="village"
          label="Village"
          register={register}
          errors={!tehsilValue ? "Select Tehsil first" : errors.village}
          options={villageOptions}
          value={villageValue}
          onChange={(e) => {
            setValue("village", e.target.value, {
              shouldValidate: true,
            });
          }}
          disabled={!tehsilValue}
        />
        <FormInput
          name="pincode"
          label="Pin Code"
          type="number"
          register={register}
          errors={errors.pincode}
        />
        <FormInput
          required={false}
          name="street"
          label="Street / Locality (Optional)"
          type="text"
          register={register}
          errors={errors.street}
        />

        {/* <FormInput
          required={false}
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
        /> */}
      </FormLayout>
      {coords && <MapBox lat={coords.latitude} lng={coords.longitude} />}

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
