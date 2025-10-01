"use client";

import React, { useEffect, useRef, useState } from "react";
import FormLayout from "@/components/shared/FormLayout";
import FormInput from "@/components/shared/custom-inputs/FormInput";
import { GpsFixed } from "@mui/icons-material";
import { getCurrentLocation } from "@/utils/getCurrentLocation";

export default function BusinessInformationSection({
  register,
  errors,
  setValue,
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
      const { gpsString } = await getCurrentLocation(); // ✅ wait for result
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
      </FormLayout>
      <div className="mt-4 cursor-auto">
        <FormInput
          name="gps"
          label="Gps Location"
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
