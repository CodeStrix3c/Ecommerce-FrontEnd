"use client";

import React, { useState } from "react";
import { Controller } from "react-hook-form";
import FormLayout from "@/components/shared/FormLayout";
import FormInput from "@/components/shared/custom-inputs/FormInput";
import FormDateInput from "@/components/shared/custom-inputs/FormDateInput";
import FormFileInput from "@/components/shared/custom-inputs/FormFileInput";
import SelectField from "@/components/shared/custom-inputs/SelectField";

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

  const [useFileUpload, setUseFileUpload] = useState(false); // Toggle state

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

        {/* Toggle button/link */}
        <div style={{ marginBottom: 8 }}>
          <button
            type="button"
            style={{
              fontSize: 13,
              color: "#0070f3",
              background: "none",
              border: "none",
              cursor: "pointer",
              textDecoration: "underline",
            }}
            onClick={() => setUseFileUpload((prev) => !prev)}
          >
            {useFileUpload
              ? "Enter values manually"
              : "Upload soil test report"}
          </button>
        </div>

        {useFileUpload ? (
          // File Upload Input
          <Controller
            name="soilTestReport"
            control={control}
            render={({ field, fieldState }) => (
              <FormFileInput
                name="soilTestReport"
                label="Upload Soil Test Report"
                showPreview
                value={field.value}
                required={null}
                onChange={field.onChange}
                // errors={fieldState.error}
                optional
                accept=".pdf,.doc,.docx,.jpg,.png"
              />
            )}
          />
        ) : (
          // Numeric Inputs Grid
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
              register={register}
              errors={errors.pH}
              required={null}
              value={soilTest.pH}
              onChange={handleSoilTestChange}
            />
            <FormInput
              name="N"
              label="Nitrogen (N)"
              type="number"
              register={register}
              errors={errors.N}
              required={null}
              value={soilTest.N}
              onChange={handleSoilTestChange}
            />
            <FormInput
              name="P"
              label="Phosphorus (P)"
              type="number"
              register={register}
              errors={errors.P}
              required={null}
              value={soilTest.P}
              onChange={handleSoilTestChange}
            />
            <FormInput
              name="K"
              label="Potassium (K)"
              type="number"
              register={register}
              errors={errors.K}
              required={null}
              value={soilTest.K}
              onChange={handleSoilTestChange}
            />
            <FormInput
              name="organicCarbon"
              label="Organic Carbon"
              type="number"
              register={register}
              required={null}
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
          </div>
        )}
      </section>
    </>
  );
}
