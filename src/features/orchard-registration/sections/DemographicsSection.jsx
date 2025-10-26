import React, { useEffect, useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import FormLayout from "@/components/shared/FormLayout";
import FormInput from "@/components/shared/custom-inputs/FormInput";
import SelectField from "@/components/shared/custom-inputs/SelectField";
import { getCurrentLocation } from "@/utils/getCurrentLocation";
import MapBox from "@/components/ui/MapBox";
import { control } from "leaflet";

const locationData = {
  "District A": {
    "Tehsil 1": ["Zone 1", "Zone 2"],
    "Tehsil 2": ["Zone 3", "Zone 4"],
  },
  "District B": {
    "Tehsil 3": ["Zone 5", "Zone 6"],
    "Tehsil 4": ["Zone 7", "Zone 8"],
  },
};

export default function DemographicsSection() {
  const {
    register,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useFormContext();
  console.log(errors, "erros in ....");

  const [gpsLocation, setGpsLocation] = useState("");
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(false);
  const gpsInputRef = useRef(null);

  const districtValue = watch("orchardDistrict") || "";
  const tehsilValue = watch("orchardTehsil") || "";
  const zoneValue = watch("orchardZone") || "";

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

  const districtOptions = Object.keys(locationData).map((d) => ({
    label: d,
    value: d,
  }));

  const tehsilOptions = districtValue
    ? Object.keys(locationData[districtValue]).map((t) => ({
        label: t,
        value: t,
      }))
    : [];

  const zoneOptions =
    districtValue && tehsilValue
      ? locationData[districtValue][tehsilValue].map((z) => ({
          label: z,
          value: z,
        }))
      : [];

  return (
    <>
      <FormLayout>
        <FormInput
          name="orchardName"
          label="Orchard Name"
          register={register}
          errors={errors.orchardName}
        />

        <FormInput
          name="orchardSizeKanals"
          label="Orchard Size (Kanals)"
          type="number"
          register={register}
          errors={errors.orchardSizeKanals}
        />
        <FormInput
          name="orchardSizeMarlas"
          label="Orchard Size (Marlas)"
          type="number"
          register={register}
          errors={errors.orchardSizeMarlas}
        />

        <FormInput
          name="establishmentYear"
          label="Establishment Year"
          type="number"
          register={register}
          errors={errors.establishmentYear}
        />

        <SelectField
          register={register}
          control={control}
          name="plantationPattern"
          errors={errors.plantationPattern}
          label="Plantation Pattern"
          options={[
            { value: "traditional", label: "Traditional" },
            { value: "highDensity", label: "High Density" },
          ]}
        />

        <SelectField
          register={register}
          control={control}
          errors={errors.ownershipType}
          label="Ownership Type"
          name="ownershipType"
          options={[
            { value: "owned", label: "Owned" },
            { value: "leased", label: "Leased / Rented" },
            { value: "ancestral", label: "Ancestral" },
          ]}
        />

        <SelectField
          name="orchardDistrict"
          label="District"
          register={register}
          errors={errors.orchardDistrict}
          options={districtOptions}
          value={districtValue}
          onChange={(e) => {
            setValue("orchardDistrict", e.target.value, {
              shouldValidate: true,
            });
            setValue("orchardTehsil", "");
            setValue("orchardZone", "");
          }}
        />

        <SelectField
          name="orchardTehsil"
          label="Tehsil"
          register={register}
          errors={
            !districtValue ? "Select District first" : errors.orchardTehsil
          }
          options={tehsilOptions}
          value={tehsilValue}
          onChange={(e) => {
            setValue("orchardTehsil", e.target.value, { shouldValidate: true });
            setValue("orchardZone", "");
          }}
          disabled={!districtValue}
        />

        <SelectField
          name="orchardZone"
          label="Zone"
          register={register}
          errors={!tehsilValue ? "Select Tehsil first" : errors.orchardZone}
          options={zoneOptions}
          value={zoneValue}
          onChange={(e) =>
            setValue("orchardZone", e.target.value, { shouldValidate: true })
          }
          disabled={!tehsilValue}
        />

        <FormInput
          name="orchardPincode"
          label="PIN Code"
          type="number"
          register={register}
          errors={errors.orchardPincode}
        />
      </FormLayout>

      {/* GPS Input */}
      {/* <div className="mt-4 cursor-auto">
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
      </div> */}

      {coords && <MapBox lat={coords.latitude} lng={coords.longitude} />}
    </>
  );
}
