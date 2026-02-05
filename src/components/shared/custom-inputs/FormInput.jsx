import { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormContext } from "react-hook-form";
import RequiredLabel from "@/components/ui/RequiredLabel";
import OptionalLabel from "@/components/ui/OptionalLabel";

export default function FormInput({
  name,
  label,
  type = "text",
  icon = null,
  size = "small",
  readOnly = false,
  register: registerProp, // 👈 optional
  errors,
  required = true,
  onClick,
}) {
  const methods = useFormContext(); // may be null
  const register = registerProp ?? methods?.register;

  if (!register) {
    throw new Error(
      `FormInput: register not found for field "${name}". 
      Either pass register as a prop or wrap the form with FormProvider.`,
    );
  }

  const [showPassword, setShowPassword] = useState(false);

  const getLabel = () => {
    if (required === true) return <RequiredLabel label={label} />;
    if (required === false) return <OptionalLabel label={label} />;
    return label;
  };

  const getEndAdornment = () => {
    if (type === "password") {
      return (
        <InputAdornment position="end">
          <IconButton
            onClick={() => setShowPassword((p) => !p)}
            edge="end"
            tabIndex={-1}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
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
      type={type === "password" && showPassword ? "text" : type}
      label={getLabel()}
      variant="outlined"
      size={size}
      helperText={errors?.message}
      error={!!errors}
      slotProps={{
        formHelperText: { sx: { color: "var(--color-error)" } },
        input: { endAdornment: getEndAdornment(), readOnly },
      }}
      {...register(name)}
    />
  );
}
