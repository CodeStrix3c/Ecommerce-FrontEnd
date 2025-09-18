"use client";

import React, { useState } from "react";
import { Controller } from "react-hook-form";
import FormLayout from "@/components/shared/FormLayout";
import SelectField from "@/components/ui/SelectField";
import FormInput from "@/features/auth/components/FormInput";
import FormDateInput from "@/components/ui/FormDateInput";
import FormFileInput from "@/components/ui/FormFileInput";

export default function SoilWaterProfileSection({ register, errors, control }) {
  console.log(errors, "errr");

  const [soilTest, setSoilTest] = useState({
    pH: "",
    N: "",
    P: "",
    K: "",
    organicCarbon: "",
    micronutrients: "",
    soilTestReport: null,
  });

  const handleSoilTestChange = (e) => {
    const { name, value, files } = e.target;
    setSoilTest((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  return (
    <>
      <FormLayout>
        {/* 1. Soil Type */}
        <Controller
          name="soilType"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label="Soil Type"
              errors={errors.soilType}
              options={[
                { value: "", label: "Select Soil Type" },
                { value: "sandyClayLoam", label: "Sandy Clay Loam" },
                { value: "sandyLoam", label: "Sandy Loam" },
                { value: "sandyClay", label: "Sandy Clay" },
                { value: "sandy", label: "Sandy" },
                { value: "siltLoam", label: "Silt Loam" },
                { value: "heavyClay", label: "Heavy Clay" },
                { value: "siltClay", label: "Silt Clay" },
                { value: "silt", label: "Silt" },
                { value: "siltClayLoam", label: "Silt Clay Loam" },
                { value: "notGetting", label: "Not getting" },
              ]}
            />
          )}
        />

        {/* 2. Soil Health Status */}
        <Controller
          name="soilHealthStatus"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label="Soil Health Status"
              errors={errors.soilHealthStatus}
              options={[
                { value: "", label: "Select Soil Health Status" },
                { value: "acidic", label: "Acidic" },
                { value: "alkaline", label: "Alkaline" },
                { value: "notKnown", label: "Not Known" },
              ]}
            />
          )}
        />

        {/* 3. Last Soil Test Date */}
        <FormDateInput
          name="lastSoilTestDate"
          label="Last Soil Test Date"
          register={register}
          errors={errors.lastSoilTestDate}
        />

        {/* 4-6. Water Details */}
        <Controller
          name="waterSource"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label="Water Source"
              errors={errors.waterSource}
              options={[
                { value: "", label: "Select Water Source" },
                { value: "canal", label: "Canal" },
                { value: "borewell", label: "Borewell" },
                { value: "rainfed", label: "Rainfed" },
                { value: "spring", label: "Spring" },
                { value: "other", label: "Other" },
              ]}
            />
          )}
        />

        <Controller
          name="irrigationMethod"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label="Irrigation Method"
              errors={errors.irrigationMethod}
              options={[
                { value: "", label: "Select Irrigation Method" },
                { value: "drip", label: "Drip" },
                { value: "sprinkler", label: "Sprinkler" },
                { value: "flood", label: "Flood" },
                { value: "none", label: "None" },
              ]}
            />
          )}
        />

        <Controller
          name="waterAvailability"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label="Water Availability"
              errors={errors.waterAvailability}
              options={[
                { value: "", label: "Select Water Availability" },
                { value: "roundTheYear", label: "Round-the-year" },
                { value: "seasonal", label: "Seasonal" },
                { value: "notAvailable", label: "Not available" },
              ]}
            />
          )}
        />
      </FormLayout>
      <section style={{ marginTop: 24 }}>
        <label style={{ fontWeight: 600 }}>Soil Test Records</label>
        <p
          style={{
            fontSize: 13,
            color:
              errors?.pH ||
              errors?.N ||
              errors?.P ||
              errors?.K ||
              errors?.organicCarbon ||
              errors?.micronutrients ||
              errors?.soilTestReport
                ? "var(--color-error)"
                : "#555",
          }}
        >
          Enter values or upload a report. At least one is required.
        </p>
        {/* Numeric Inputs: 2 per row using grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "16px 24px",
            marginTop: 8,
          }}
        >
          <FormInput
            name="pH"
            label="pH"
            type="number"
            required={null}
            register={register}
            errors={errors.pH}
            value={soilTest.pH}
            onChange={handleSoilTestChange}
          />
          <FormInput
            name="N"
            label="Nitrogen (N)"
            type="number"
            required={null}
            register={register}
            errors={errors.N}
            value={soilTest.N}
            onChange={handleSoilTestChange}
          />

          <FormInput
            name="P"
            label="Phosphorus (P)"
            type="number"
            required={null}
            register={register}
            errors={errors.P}
            value={soilTest.P}
            onChange={handleSoilTestChange}
          />
          <FormInput
            name="K"
            label="Potassium (K)"
            type="number"
            required={null}
            register={register}
            errors={errors.K}
            value={soilTest.K}
            onChange={handleSoilTestChange}
          />

          <FormInput
            name="organicCarbon"
            label="Organic Carbon"
            type="number"
            required={null}
            register={register}
            errors={errors.organicCarbon}
            value={soilTest.organicCarbon}
            onChange={handleSoilTestChange}
          />
          <FormInput
            name="micronutrients"
            label="Micronutrients"
            register={register}
            required={null}
            errors={errors.micronutrients}
            value={soilTest.micronutrients}
            onChange={handleSoilTestChange}
          />

          {/* OR Divider: spans full width */}
          <div
            style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              margin: "8px 0 4px 0",
              color: "#666",
              fontWeight: 500,
            }}
          >
            — OR —
          </div>

          {/* Upload Soil Test Report (full width) */}
          <div style={{ gridColumn: "1 / -1" }}>
            <FormFileInput
              name="soilTestReport"
              showPreview
              label="Upload Soil Test Report"
              register={register}
              errors={errors}
              optional
              accept=".pdf,.doc,.docx,.jpg,.png"
            />
          </div>
        </div>
      </section>
    </>
  );
}
