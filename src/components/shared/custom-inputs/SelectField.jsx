import React from "react";
import { TextField, MenuItem } from "@mui/material";
import OptionalLabel from "@/components/ui/OptionalLabel";
import RequiredLabel from "@/components/ui/RequiredLabel";

const SelectField = ({
  name,
  label,
  register,
  errors,
  options,
  optional = false,
  size = "small",
  onChange,
  value,
  isMultiple = false,
}) => {
  const isRequired = optional === false;

  // Determine error message for this field
  const errorMessage = errors?.[name]?.message || errors?.message || "";

  return (
    <TextField
      select
      fullWidth
      size={size}
      label={
        optional ? (
          <OptionalLabel label={label} />
        ) : (
          <RequiredLabel label={label} required />
        )
      }
      value={value || (isMultiple ? [] : "")}
      onChange={onChange}
      // remove error prop, we will handle color via sx
      helperText={errorMessage}
      variant="outlined"
      {...(register
        ? register(name, {
            required: isRequired ? `${label} is required` : false,
          })
        : {})}
      SelectProps={{
        multiple: isMultiple,
        MenuProps: {
          disableScrollLock: true,
          PaperProps: {
            sx: {
              maxHeight: 200,
              overflowY: "auto",
              borderRadius: 2,
              boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
            },
          },
        },
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          backgroundColor: "var(--color-white)",
          borderRadius: "0.5rem",
          "& fieldset": { borderColor: "var(--color-black)" },
          "&:hover fieldset": { borderColor: "var(--color-primary)" },
          "&.Mui-focused fieldset": { borderColor: "var(--color-primary)" },
        },
        "& .MuiInputLabel-root": { color: "var(--color-black)" },
        "& .MuiFormHelperText-root": {
          color: "var(--color-error)", // use your CSS variable for error
          fontWeight: 400, // normal weight
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
