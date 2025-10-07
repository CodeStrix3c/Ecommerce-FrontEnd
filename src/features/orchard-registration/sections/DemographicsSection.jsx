"use client";

import React, { useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import FormLayout from "@/components/shared/FormLayout";
import FormInput from "@/components/shared/custom-inputs/FormInput";
import SelectField from "@/components/shared/custom-inputs/SelectField";
import { GpsFixed } from "@mui/icons-material";
import { getCurrentLocation } from "@/utils/getCurrentLocation";

export default function DemographicsSection({ register, errors }) {
  const [gpsLocation, setGpsLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const gpsInputRef = useRef(null);
  console.log(errors, "errors");
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

        <Controller
          name="plantationPattern"
          render={({ field }) => (
            <SelectField
              {...field}
              errors={errors.plantationPattern}
              label="Plantation Pattern"
              options={[
                { value: "", label: "Select Plantation Pattern" },
                { value: "traditional", label: "Traditional" },
                { value: "highDensity", label: "High Density" },
              ]}
            />
          )}
        />

        <Controller
          name="ownershipType"
          render={({ field, fieldState }) => (
            <SelectField
              {...field}
              label="Ownership Type"
              errors={
                fieldState.error ? { [field.name]: fieldState.error } : {}
              }
              options={[
                { value: "", label: "Select Ownership Type" },
                { value: "owned", label: "Owned" },
                { value: "leased", label: "Leased / Rented" },
                { value: "ancestral", label: "Ancestral" },
              ]}
            />
          )}
        />

        <FormInput
          name="orchardDistrict"
          label="District"
          register={register}
          errors={errors.orchardDistrict}
        />
        <FormInput
          name="orchardTehsil"
          label="Tehsil"
          register={register}
          errors={errors.orchardTehsil}
        />
        <FormInput
          name="orchardZone"
          label="Zone"
          register={register}
          errors={errors.orchardZone}
        />
        <FormInput
          name="orchardPincode"
          label="PIN Code"
          type="number"
          register={register}
          errors={errors.orchardPincode}
        />
      </FormLayout>
      <div className="mt-4 cursor-auto">
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
      </div>
    </>
  );
}
