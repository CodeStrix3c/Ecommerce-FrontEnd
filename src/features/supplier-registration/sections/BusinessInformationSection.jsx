"use client";

import React, { useState } from "react";
import FormLayout from "@/components/shared/FormLayout";
import FormInput from "@/components/shared/custom-inputs/FormInput";
import { Button } from "@mui/material";

export default function BusinessInformationSection({
  register,
  errors,
  setValue,
}) {
  const [gpsLocation, setGpsLocation] = useState("");
  const [loading, setLoading] = useState(false);

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
        name="businessName"
        label="Name of Shop / Business"
        register={register}
        errors={errors.businessName}
      />

      <FormInput
        name="ownerName"
        label="Owner / Proprietor Name"
        register={register}
        errors={errors.ownerName}
      />

      <FormInput
        name="primaryContact"
        label="Contact Number (Primary, OTP Login)"
        type="tel"
        register={register}
        errors={errors.primaryContact}
      />

      <FormInput
        name="alternateContact"
        label="Alternate Contact (Optional)"
        type="tel"
        required={null}
        register={register}
        errors={errors.alternateContact}
      />

      <FormInput
        name="email"
        label="Email (Optional)"
        type="email"
        required={null}
        register={register}
        errors={errors.email}
      />

      <FormInput
        name="businessAddressVillage"
        label="Business Address - Village"
        register={register}
        errors={errors.businessAddressVillage}
      />
      <FormInput
        name="businessAddressTehsil"
        label="Tehsil"
        register={register}
        errors={errors.businessAddressTehsil}
      />
      <FormInput
        name="businessAddressDistrict"
        label="District"
        register={register}
        errors={errors.businessAddressDistrict}
      />
      <FormInput
        name="businessAddressState"
        label="State"
        register={register}
        errors={errors.businessAddressState}
      />
      <FormInput
        name="businessAddressPincode"
        label="PIN Code"
        type="number"
        register={register}
        errors={errors.businessAddressPincode}
      />

      <FormInput
        name="gps"
        label="GPS Location"
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
