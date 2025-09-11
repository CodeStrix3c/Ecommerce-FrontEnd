import React from "react";
import { TextField, MenuItem } from "@mui/material";
import RequiredLabel from "./RequiredLabel";

const SelectField = ({
  name,
  label,
  register,
  errors,
  options,
  required = false,
  size = "small",
}) => {
  return (
    <TextField
      select
      fullWidth
      size={size}
      label={<RequiredLabel label={label} required={required} />}
      defaultValue=""
      error={!!errors[name]}
      helperText={errors[name]?.message}
      variant="outlined"
      {...register(name, {
        required: required ? `${label} is required` : false,
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
