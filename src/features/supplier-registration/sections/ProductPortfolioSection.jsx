"use client";

import React from "react";
import { useFieldArray, Controller } from "react-hook-form";
import FormLayout from "@/components/shared/FormLayout";
import FormInput from "@/components/shared/custom-inputs/FormInput";
import SelectField from "@/components/shared/custom-inputs/SelectField";
import { Button, Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function ProductPortfolioSection({ register, errors, control }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "otherInputs",
  });

  const inputOptions = [
    "Pesticides",
    "Fungicides",
    "Herbicides",
    "Fertilizers",
    "Biopesticides",
    "Growth Regulators",
    "Equipment",
  ];

  return (
    <>
      <FormLayout>
        <Controller
          name="inputsSold"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label="Type of Inputs Sold"
              isMultiple
              options={inputOptions.map((item) => ({
                value: item,
                label: item,
              }))}
              errors={errors.inputsSold}
            />
          )}
        />

        <FormInput
          name="majorBrands"
          label="Major Brands Stocked (e.g., Bayer, UPL)"
          register={register}
          errors={errors.majorBrands}
        />

        <FormInput
          name="storageCapacity"
          label="Storage Capacity (MT or Litres, optional)"
          register={register}
          required={null}
          errors={errors.storageCapacity}
        />
      </FormLayout>

      <Box sx={{ my: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
          Other Inputs (Optional)
        </Typography>

        {fields.map((item, index) => (
          <Box
            key={item.id}
            sx={{ display: "flex", gap: 1, alignItems: "center", mb: 1 }}
          >
            <FormInput
              name={`otherInputs[${index}].name`}
              label="Input Name"
              register={register}
              errors={errors.otherInputs?.[index]?.name}
            />
            <FormInput
              name={`otherInputs[${index}].stock`}
              label="Stock"
              type="number"
              register={register}
              errors={errors.otherInputs?.[index]?.stock}
            />
            <IconButton size="small" onClick={() => remove(index)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}

        <Button
          variant="outlined"
          size="small"
          onClick={() => append({ name: "", stock: 0 })}
        >
          Add Input
        </Button>
      </Box>
    </>
  );
}
