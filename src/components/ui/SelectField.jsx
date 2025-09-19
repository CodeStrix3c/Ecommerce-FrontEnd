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
  onChange,
  value,
  isMultiple = false, // new prop
}) => {
  const isRequired = optional === false;

  // Determine error message for this field
  const errorMessage = errors?.[name]?.message || errors?.message || "";
  console.log(errors);

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
      value={value || (isMultiple ? [] : "")} // set empty array for multiple
      onChange={onChange}
      error={!!errorMessage}
      helperText={errorMessage}
      variant="outlined"
      {...(register
        ? register(name, {
            required: isRequired ? `${label} is required` : false,
          })
        : {})}
      SelectProps={{
        multiple: isMultiple, // enable multi-select
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
        "& .MuiFormHelperText-root": { color: "var(--color-error)" },
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
