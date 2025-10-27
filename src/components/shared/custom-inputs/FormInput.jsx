import { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import RequiredLabel from "@/components/ui/RequiredLabel";
import OptionalLabel from "@/components/ui/OptionalLabel";

export default function FormInput({
  name,
  label,
  type = "text",
  icon = null,
  size = "small",
  register,
  readOnly = false,
  inputRef = null,
  value,
  errors,
  required = true,
  onClick,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const getLabel = () => {
    if (required === true) return <RequiredLabel label={label} />;
    if (required === false) return <OptionalLabel label={label} />;
    return label;
  };
  const getStartAdornment = () => {
    // if (type === "tel") {
    //   return <InputAdornment position="start">+91</InputAdornment>;
    // }
    return null;
  };
  const getEndAdornment = () => {
    if (type === "password") {
      return (
        <InputAdornment position="end">
          <IconButton
            onClick={() => setShowPassword((prev) => !prev)}
            edge="end"
            tabIndex={-1}
          >
            {showPassword ? (
              <VisibilityOff sx={{ color: "var(--color-secondary)" }} />
            ) : (
              <Visibility sx={{ color: "var(--color-secondary)" }} />
            )}
          </IconButton>
        </InputAdornment>
      );
    }
    if (icon) {
      return (
        <InputAdornment position="end" onClick={onClick}>
          {icon}
        </InputAdornment>
      );
    }
    return null;
  };

  return (
    <TextField
      fullWidth
      defaultValue=""
      value={value}
      inputRef={inputRef}
      type={type === "password" && showPassword ? "text" : type}
      label={getLabel()}
      variant="outlined"
      size={size}
      helperText={errors?.message}
      slotProps={{
        formHelperText: {
          sx: { color: "var(--color-error)" },
        },
        readOnly,
        input: {
          startAdornment: getStartAdornment(),
          endAdornment: getEndAdornment(),
        },
      }}
      {...register(name)}
    />
  );
}
