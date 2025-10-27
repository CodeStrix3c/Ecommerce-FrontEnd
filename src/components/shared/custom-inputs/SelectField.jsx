import React from "react";
import { TextField, MenuItem } from "@mui/material";
import { Controller } from "react-hook-form";
import OptionalLabel from "@/components/ui/OptionalLabel";
import RequiredLabel from "@/components/ui/RequiredLabel";

const SelectField = ({
  name,
  label,
  control,
  register,
  errors,
  options,
  optional = false,
  showOptionalLabel = true,
  size = "small",
  value,
  isMultiple = false,
  disabled = false,
}) => {
  const isRequired = !optional;
  const errorMessage = errors?.message || errors || "";

  const shouldShrink = (val) =>
    isMultiple ? Array.isArray(val) && val.length > 0 : Boolean(val);

  const renderLabel = () => {
    if (!optional) {
      return <RequiredLabel label={label} required />;
    }

    if (optional && showOptionalLabel) {
      return <OptionalLabel label={label} />;
    }

    return label;
  };

  if (control) {
    return (
      <Controller
        name={name}
        control={control}
        rules={{ required: isRequired ? `${label} is required` : false }}
        render={({ field }) => {
          const safeValue = isMultiple
            ? Array.isArray(field.value)
              ? field.value
              : []
            : field.value || "";

          return (
            <TextField
              select
              fullWidth
              size={size}
              label={renderLabel()}
              value={safeValue}
              onChange={(e) => field.onChange(e.target.value)}
              helperText={errorMessage}
              disabled={disabled}
              variant="outlined"
              slotProps={{
                inputLabel: {
                  shrink: shouldShrink(safeValue),
                },
                select: {
                  multiple: isMultiple,
                  MenuProps: {
                    disableScrollLock: true,
                    PaperProps: {
                      sx: {
                        maxHeight: 200,
                        overflowY: "auto",
                        borderRadius: 2,
                      },
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
                  "&.Mui-focused fieldset": {
                    borderColor: "var(--color-primary)",
                  },
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
        }}
      />
    );
  }

  return (
    <TextField
      select
      fullWidth
      size={size}
      label={renderLabel()}
      value={value || (isMultiple ? [] : "")}
      {...(register
        ? register(name, {
            required: isRequired ? `${label} is required` : false,
          })
        : {})}
      helperText={errorMessage}
      disabled={disabled}
      variant="outlined"
      slotProps={{
        select: { multiple: isMultiple },
        inputLabel: {
          shrink: shouldShrink(value),
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
