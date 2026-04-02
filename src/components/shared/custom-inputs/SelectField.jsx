import React from "react";
import { TextField, MenuItem } from "@mui/material";
import { Controller } from "react-hook-form";

const SelectField = ({
  name,
  label,
  control,
  register,
  errors,
  options = [],
  required = false,
  isMultiple = false,
  disabled = false,
  placeholder = "Select",
}) => {
  const errorMessage = errors?.message || errors || "";
  const hasError = !!errors;

  // ✅ MATCH INPUT BORDER STYLE
  const textFieldStyles = {
    "& .MuiOutlinedInput-root": {
      backgroundColor: disabled ? "#f5f5f5" : "var(--color-white)",
      borderRadius: "10px",
      height: "52px",
      display: "flex",
      alignItems: "center",
      opacity: disabled ? 0.7 : 1,
      fontSize: "14px",

      // ✅ Simple border like your Inputs
      "& fieldset": {
        border: `1px solid ${
          hasError ? "var(--color-error)" : "rgba(0,0,0,0.4)"
        } !important`,
      },

      // Keep same border on hover
      "&:hover fieldset": {
        border: `1px solid ${
          hasError ? "var(--color-error)" : "rgba(0,0,0,0.4)"
        } !important`,
      },

      // Keep same border on focus
      "&.Mui-focused fieldset": {
        border: `1px solid ${
          hasError ? "var(--color-error)" : "rgba(0,0,0,0.4)"
        } !important`,
      },

      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "transparent",
      },
    },

    // Text inside select
    "& .MuiSelect-select": {
      display: "flex",
      alignItems: "center",
      height: "52px",
      paddingTop: "0 !important",
      paddingBottom: "0 !important",
      backgroundColor: "transparent !important",
      fontSize: "14px",
    },

    "& .MuiSelect-select:focus": {
      backgroundColor: "transparent !important",
    },

    "& .MuiFormHelperText-root": {
      fontSize: "12px",
      marginLeft: 0,
      color: "var(--color-error)",
    },
  };

  const selectSlotProps = {
    select: {
      multiple: isMultiple,
      displayEmpty: true,
      renderValue: (selected) => {
        if (
          !selected ||
          selected === "" ||
          (Array.isArray(selected) && selected.length === 0)
        ) {
          return (
            <span style={{ color: "#9e9e9e", fontSize: 14 }}>
              {placeholder}
            </span>
          );
        }

        if (isMultiple) {
          return options
            .filter((opt) => selected.includes(opt.value))
            .map((opt) => opt.label)
            .join(", ");
        }

        const selectedOption = options.find((opt) => opt.value === selected);
        return selectedOption?.label || "";
      },
    },
  };

  // ================= Controller Version =================
  if (control) {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        <label className="text-sm font-medium text-black">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>

        <Controller
          name={name}
          control={control}
          defaultValue={isMultiple ? [] : ""}
          render={({ field }) => (
            <TextField
              select
              fullWidth
              value={field.value ?? (isMultiple ? [] : "")}
              onChange={(e) => field.onChange(e.target.value)}
              helperText={errorMessage}
              disabled={disabled}
              variant="outlined"
              label={null}
              slotProps={selectSlotProps}
              sx={textFieldStyles}
            >
              {options.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </div>
    );
  }

  // ================= Register Version =================
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-sm font-medium text-black">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <TextField
        select
        fullWidth
        defaultValue={isMultiple ? [] : ""}
        {...(register ? register(name) : {})}
        helperText={errorMessage}
        disabled={disabled}
        variant="outlined"
        label={null}
        slotProps={selectSlotProps}
        sx={textFieldStyles}
      >
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};

export default SelectField;
