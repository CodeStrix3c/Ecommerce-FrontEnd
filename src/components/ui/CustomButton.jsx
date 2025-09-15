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
        fontSize: "1rem",
        py: 1,
        px: 3,
        borderRadius: "0.75rem", // consistent with your root comment
        fontWeight: 600,
        minWidth: 120,
        color:
          variant === "contained"
            ? "var(--color-white)"
            : "var(--color-primary)", // use root primary color for outlined text
        backgroundColor:
          variant === "contained" ? "var(--color-primary)" : "transparent",
        border:
          variant === "outlined" ? "1.5px solid var(--color-primary)" : "none",
        "&:hover": {
          backgroundColor:
            variant === "contained"
              ? "var(--color-primary-hover)"
              : "var(--color-black-hover)",
          borderColor:
            variant === "outlined" ? "var(--color-primary-hover)" : "none",
        },
        ...sx,
      }}
    >
      {loading ? "Loading..." : text}
    </Button>
  );
};

export default CustomButton;
