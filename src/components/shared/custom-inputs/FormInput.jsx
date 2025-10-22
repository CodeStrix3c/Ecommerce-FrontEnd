import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";
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

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const getInputType = () => {
    if (type === "password") return showPassword ? "text" : "password";
    return type;
  };

  const renderIcon = () => {
    if (type === "password") {
      return (
        <InputAdornment position="end">
          <IconButton onClick={handleTogglePassword} edge="end">
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      );
    } else if (icon) {
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
      type={getInputType()}
      label={getLabel()}
      variant="outlined"
      size={size}
      helperText={errors?.message}
      InputProps={{
        endAdornment: renderIcon(),
        readOnly,
      }}
      {...register(name)}
    />
  );
}
