import React from "react";
import { TextField, MenuItem } from "@mui/material";
import RequiredLabel from "../../features/auth/components/RequiredLabel";
import OptionalLabel from "@/features/auth/components/OptionalLabel";

const SelectField = ({
  name,
  label,
  register,
  errors,
  options,
  optional = false,
  size = "small",
}) => {
  const isRequired = !optional;

  return (
    <TextField
      select
      fullWidth
      size={size}
      label={
        optional ? (
          <OptionalLabel label={label} />
        ) : (
          <RequiredLabel label={label} required={isRequired} />
        )
      }
      defaultValue=""
      error={errors && !!errors[name]}
      helperText={errors && errors[name]?.message}
      variant="outlined"
      {...register(name, {
        required: isRequired ? `${label} is required` : false,
      })}
      sx={{
        "& .MuiOutlinedInput-root": {
          backgroundColor: "var(--color-white)",
          borderRadius: "0.5rem",
          "& fieldset": {
            borderColor: "var(--color-black)",
          },
          "&:hover fieldset": {
            borderColor: "var(--color-primary)",
          },
          "&.Mui-focused fieldset": {
            borderColor: "var(--color-primary)",
          },
        },
        "& .MuiInputLabel-root": {
          color: "var(--color-black)",
        },
        "& .MuiFormHelperText-root": {
          color: "var(--color-secondary)",
        },
      }}
    >
      {options.map((opt) => (
        <MenuItem key={opt.value} value={opt.value}>
          {opt.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectField;
