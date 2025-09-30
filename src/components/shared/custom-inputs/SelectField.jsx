import React from "react";
import { TextField, MenuItem } from "@mui/material";
import OptionalLabel from "@/components/ui/OptionalLabel";
import RequiredLabel from "@/components/ui/RequiredLabel";

/**
 * SelectField - A reusable select/dropdown field using MUI.
 *
 * Props:
 * - name: string - field name
 * - label: string - label text
 * - register: function - from react-hook-form
 * - errors: object - error object from react-hook-form
 * - options: array - list of { label, value } objects
 * - optional: boolean - whether the field is optional
 * - showOptionalLabel: boolean - if false, hides "(Optional)" on optional fields
 * - size: "small" | "medium"
 * - value: selected value
 * - onChange: function
 * - isMultiple: boolean - support multiple selection
 */
const SelectField = ({
  name,
  label,
  register,
  errors,
  options,
  optional = false,
  showOptionalLabel = true,
  size = "small",
  onChange,
  value,
  isMultiple = false,
}) => {
  const isRequired = optional === false;

  const errorMessage = errors?.[name]?.message || errors?.message || "";

  // Handle null/undefined value safely
  const safeValue = value ?? (isMultiple ? [] : "");

  // Handle dynamic label rendering
  const renderLabel = () => {
    if (isRequired) {
      return <RequiredLabel label={label} required />;
    }
    if (optional && showOptionalLabel) {
      return <OptionalLabel label={label} />;
    }
    return label;
  };

  return (
    <TextField
      select
      fullWidth
      size={size}
      label={renderLabel()}
      value={safeValue}
      onChange={onChange}
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
          color: "var(--color-error)",
          fontWeight: 400,
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
