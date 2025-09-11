import { Button } from "@mui/material";
import React from "react";

const CustomButton = ({
  fullWidth = false,
  type = "button",
  variant = "contained",
  onClick,
  loading = false,
  text,
  disabled = false,
  sx = {},
}) => {
  return (
    <Button
      fullWidth={fullWidth}
      type={type}
      variant={variant}
      onClick={onClick}
      disabled={disabled || loading}
      sx={{
        textTransform: "none",
        fontSize: "0.9rem",
        py: 1.2,
        borderRadius: "0.75rem",
        fontWeight: 500,
        color:
          variant === "contained"
            ? "var(--color-white)"
            : "var(--color-primary)",
        backgroundColor:
          variant === "contained" ? "var(--color-primary)" : "transparent",
        border:
          variant === "outlined" ? "1px solid var(--color-primary)" : "none",
        "&:hover": {
          backgroundColor:
            variant === "contained"
              ? "var(--color-primary-hover)"
              : "var(--color-black-hover)",
        },
        ...sx,
      }}
    >
      {loading ? "Loading..." : text}
    </Button>
  );
};

export default CustomButton;
