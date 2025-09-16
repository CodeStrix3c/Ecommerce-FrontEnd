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
}) => {
  const isRequired = optional === false;

  return (
    <TextField
      select
      fullWidth
      size={size}
      label={
        optional === true
          ? <OptionalLabel label={label} />
          : optional === false
          ? <RequiredLabel label={label} required />
          : label
      }
      value={value || ""}
      onChange={onChange}
      error={errors && !!errors[name]}
      helperText={errors && errors[name]?.message}
      variant="outlined"
      {...(register ? register(name, { required: isRequired ? `${label} is required` : false }) : {})}
      SelectProps={{
        MenuProps: {
          disableScrollLock: true,
          PaperProps: {
            sx: {
              maxHeight: 200,      // set max height
              overflowY: "auto",   // scroll inside dropdown
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
        "& .MuiFormHelperText-root": { color: "var(--color-secondary)" },
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
