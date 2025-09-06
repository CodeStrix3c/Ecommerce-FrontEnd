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
        fontSize: "0.85rem",
        py: 1,
        backgroundColor:
          variant === "contained" ? "var(--color-primary)" : undefined,
        "&:hover": {
          backgroundColor:
            variant === "contained" ? "var(--color-primary-hover)" : undefined,
        },
        ...sx,
      }}
    >
      {loading ? "Loading..." : text}
    </Button>
  );
};

export default CustomButton;
