import { useState } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormContext } from "react-hook-form";
import RequiredLabel from "@/components/ui/RequiredLabel";
import OptionalLabel from "@/components/ui/OptionalLabel";

export default function FormInput({
  name,
  label,
  type = "text",
  placeholder = "",
  prefix = null,
  icon = null,
  size = "small",
  readOnly = false,
  register: registerProp,
  errors,
  required = true,
  onClick,
}) {
  const methods = useFormContext();
  const register = registerProp ?? methods?.register;

  if (!register) {
    throw new Error(
      `FormInput: register not found for field "${name}".`
    );
  }

  const [showPassword, setShowPassword] = useState(false);

  // Render label
  const renderLabel = () => {
    if (required === true) return <RequiredLabel label={label} />;
    if (required === false) return <OptionalLabel label={label} />;
    return label;
  };

  // Prefix (+91)
  const getStartAdornment = () => {
    if (!prefix) return null;

    return (
      <InputAdornment position="start">
        <Typography
          sx={{
            fontWeight: 500,
            color: "var(--color-secondary)",
            fontSize: {
              xs: "14px",
              sm: "15px",
            },
          }}
        >
          {prefix}
        </Typography>
      </InputAdornment>
    );
  };

  // Password toggle or icon
  const getEndAdornment = () => {
    if (type === "password") {
      return (
        <InputAdornment position="end">
          <IconButton
            onClick={() => setShowPassword((prev) => !prev)}
            edge="end"
            tabIndex={-1}
            sx={{
              color: "var(--color-secondary)",
              padding: "4px",
            }}
          >
            {showPassword ? (
              <VisibilityOff fontSize="small" />
            ) : (
              <Visibility fontSize="small" />
            )}
          </IconButton>
        </InputAdornment>
      );
    }

    if (icon) {
      return (
        <InputAdornment position="end">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: onClick ? "pointer" : "default",
              color: "var(--color-secondary)",
            }}
            onClick={onClick}
          >
            {icon}
          </Box>
        </InputAdornment>
      );
    }

    return null;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "2px",
        width: "100%",
      }}
    >

      <Typography
        sx={{
          fontSize: {
            xs: "13px",
            sm: "14px",
          },
          fontWeight: 500,
          color: "var(--color-text-primary)",
          marginBottom: "2px",
        }}
      >
        {renderLabel()}
      </Typography>


      <TextField
        fullWidth
        type={type === "password" && showPassword ? "text" : type}
        placeholder={placeholder}
        variant="outlined"
        size={size}
        error={!!errors}
        helperText={errors?.message}
        {...register(name)}
        slotProps={{
          input: {
            startAdornment: getStartAdornment(),
            endAdornment: getEndAdornment(),
            readOnly,
          },
          formHelperText: {
            sx: {
              color: "var(--color-error)",
              fontSize: "11.5px",
              margin: "2px 0 0 2px",
              lineHeight: 1.2,
            },
          },
        }}
        sx={{
          margin: 0,

          "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
            backgroundColor: "var(--color-input-bg, #fff)",

            "& fieldset": {
              borderColor: "var(--color-border, #d1d5db)",
            },

            "&:hover fieldset": {
              borderColor: "var(--color-primary)",
            },

            "&.Mui-focused fieldset": {
              borderColor: "var(--color-primary)",
              borderWidth: "1.5px",
            },

            "& input": {
              padding: {
                xs: "9px 12px",
                sm: "11px 14px",
              },
              fontSize: {
                xs: "14px",
                sm: "15px",
              },
            },
          },

          "& .MuiFormHelperText-root": {
            margin: "2px 0 0 2px",
          },
        }}
      />
    </Box>
  );
}
