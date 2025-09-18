"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import FormLayout from "@/components/shared/FormLayout";
import SelectField from "@/components/ui/SelectField";
import FormInput from "@/features/auth/components/FormInput";
import { Button } from "@mui/material";

export default function DemographicsSection({ register, errors }) {
  const [gpsLocation, setGpsLocation] = useState("");
  const [loading, setLoading] = useState(false);
  console.log(errors, "errors");

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const gpsString = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
        setGpsLocation(gpsString);
        setValue("latitude", lat);
        setValue("longitude", lng);
        setValue("gps", gpsString);
        setLoading(false);
      },
      () => {
        alert("Unable to fetch location. Try again outdoors.");
        setLoading(false);
      }
    );
  };

  return (
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
            errors={fieldState.error ? { [field.name]: fieldState.error } : {}}
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

      <FormInput
        name="gps"
        label="Orchard Location"
        value={gpsLocation}
        readOnly
        register={register}
        errors={errors.gps}
      />
      <Button
        variant="outlined"
        size="small"
        sx={{ mt: -1 }}
        onClick={handleGetLocation}
        disabled={loading}
      >
        {loading ? "Fetching..." : "Detect GPS Location"}
      </Button>
    </FormLayout>
  );
}
