"use client";

import React, { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import FormLayout from "@/components/shared/FormLayout";
import FormInput from "@/components/shared/custom-inputs/FormInput";
import SelectField from "@/components/shared/custom-inputs/SelectField";
import { GpsFixed } from "@mui/icons-material";
import { getCurrentLocation } from "@/utils/getCurrentLocation";

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

export default function BusinessInformationSection() {
  const {
    register,
    setValue,
    watch,

    formState: { errors },
  } = useFormContext();
  const [loading, setLoading] = useState(false);
  const gpsInputRef = useRef(null);

  const stateValue = watch("businessAddressState") || "";
  const districtValue = watch("businessAddressDistrict") || "";
  const tehsilValue = watch("businessAddressTehsil") || "";

  const villageValue = watch("businessAddressVillage") || "";
  const gpsValue = watch("gps") || "";

  const fetchLocation = async () => {
    setLoading(true);
    try {
      const { gpsString } = await getCurrentLocation();
      setValue("gps", gpsString, { shouldValidate: true });
      setTimeout(() => gpsInputRef.current?.focus(), 100);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const stateOptions = Object.keys(locationData).map((s) => ({
    label: s,
    value: s,
  }));
  const districtOptions = stateValue
    ? Object.keys(locationData[stateValue]).map((d) => ({ label: d, value: d }))
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

        <SelectField
          name="businessAddressState"
          label="State"
          register={register}
          errors={errors.businessAddressState}
          options={stateOptions}
          value={stateValue}
          onChange={(e) => {
            setValue("businessAddressState", e.target.value, {
              shouldValidate: true,
            });
            setValue("businessAddressDistrict", "");
            setValue("businessAddressTehsil", "");
          }}
        />

        <SelectField
          name="businessAddressDistrict"
          label="District"
          register={register}
          errors={
            !stateValue ? "Select State First" : errors.businessAddressDistrict
          }
          options={districtOptions}
          value={districtValue}
          onChange={(e) => {
            setValue("businessAddressDistrict", e.target.value, {
              shouldValidate: true,
            });
            setValue("businessAddressTehsil", "");
          }}
          disabled={!stateValue}
        />

        <SelectField
          name="businessAddressTehsil"
          label="Tehsil"
          register={register}
          errors={
            !districtValue
              ? "Select District first"
              : errors.businessAddressTehsil
          }
          options={tehsilOptions}
          value={tehsilValue}
          onChange={(e) =>
            setValue("businessAddressTehsil", e.target.value, {
              shouldValidate: true,
            })
          }
          disabled={!districtValue}
        />
        <SelectField
          name="businessAddressVillage"
          label="Village"
          register={register}
          errors={
            !tehsilValue ? "Select Tehsil first" : errors.businessAddressVillage
          }
          options={villageOptions}
          value={villageValue}
          onChange={(e) => {
            setValue("businessAddressVillage", e.target.value, {
              shouldValidate: true,
            });
          }}
          disabled={!tehsilValue}
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
          value={gpsValue}
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
