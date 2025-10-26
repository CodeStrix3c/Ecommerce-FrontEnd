import React from "react";
import FormLayout from "@/components/shared/FormLayout";
import SelectField from "@/components/shared/custom-inputs/SelectField";

export default function FarmInfrastructureSection({
  errors,
  register,
  control,
}) {
  return (
    <FormLayout>
      <SelectField
        name="equipmentOwned"
        control={control}
        register={register}
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
        errors={errors.equipmentOwned}
      />
      <SelectField
        name="storageFacilities"
        register={register}
        control={control}
        label="Storage Facilities"
        isMultiple
        options={[
          { value: "cold", label: "Cold Storage" },
          { value: "ca", label: "CA Storage" },
          { value: "open", label: "Open Storage" },
        ]}
        errors={errors.storageFacilities}
      />
      <SelectField
        label="Farm Labor"
        name="farmLabor"
        control={control}
        register={register}
        options={[
          { value: "permanent", label: "Permanent" },
          { value: "seasonal", label: "Seasonal" },
          { value: "contract", label: "Contract-based" },
        ]}
        errors={errors.farmLabor}
      />
      <SelectField
        label="Other Tools"
        name="otherTools"
        register={register}
        control={control}
        isMultiple
        options={[
          { value: "pruningShear", label: "Pruning Shear" },
          { value: "ladder", label: "Ladder" },
          { value: "fruitBaskets", label: "Fruit Baskets" },
        ]}
        errors={errors.otherTools}
      />
    </FormLayout>
  );
}
