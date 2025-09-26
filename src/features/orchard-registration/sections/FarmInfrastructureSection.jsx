"use client";

import React from "react";
import { Controller } from "react-hook-form";
import FormLayout from "@/components/shared/FormLayout";
import SelectField from "@/components/shared/custom-inputs/SelectField";

export default function FarmInfrastructureSection({ control, errors }) {
  return (
    <FormLayout>
      {/* Equipment Owned */}
      <Controller
        name="equipmentOwned"
        control={control}
        render={({ field, fieldState }) => (
          <SelectField
            {...field}
            label="Equipment Owned"
            isMultiple
            options={[
              { value: "tractor", label: "Tractor" },
              { value: "sprayer", label: "Sprayer" },
              { value: "gradingLine", label: "Grading Line" },
              { value: "powerWeeder", label: "Power Weeder" },
              { value: "weatherStation", label: "Local Weather Station" },
              { value: "sensors", label: "Sensors" },
            ]}
            errors={fieldState.error ? { [field.name]: fieldState.error } : {}}
          />
        )}
      />

      {/* Storage Facilities */}
      <Controller
        name="storageFacilities"
        control={control}
        render={({ field, fieldState }) => (
          <SelectField
            {...field}
            label="Storage Facilities"
            isMultiple
            options={[
              { value: "cold", label: "Cold Storage" },
              { value: "ca", label: "CA Storage" },
              { value: "open", label: "Open Storage" },
            ]}
            errors={fieldState.error ? { [field.name]: fieldState.error } : {}}
          />
        )}
      />

      {/* Farm Labor (Optional) */}
      <Controller
        name="farmLabor"
        control={control}
        render={({ field, fieldState }) => (
          <SelectField
            {...field}
            label="Farm Labor"
            options={[
              { value: "permanent", label: "Permanent" },
              { value: "seasonal", label: "Seasonal" },
              { value: "contract", label: "Contract-based" },
            ]}
            errors={fieldState.error ? { [field.name]: fieldState.error } : {}}
          />
        )}
      />

      {/* Other Tools (Optional) */}
      <Controller
        name="otherTools"
        control={control}
        render={({ field, fieldState }) => (
          <SelectField
            {...field}
            label="Other Tools"
            isMultiple
            options={[
              { value: "pruningShear", label: "Pruning Shear" },
              { value: "ladder", label: "Ladder" },
              { value: "fruitBaskets", label: "Fruit Baskets" },
            ]}
            errors={fieldState.error ? { [field.name]: fieldState.error } : {}}
          />
        )}
      />
    </FormLayout>
  );
}
