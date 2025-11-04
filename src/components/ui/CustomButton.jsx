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
  size = "medium",
  color = "primary", // primary | secondary | black | error
}) => {
  const sizeStyles = {
    small: {
      fontSize: "0.75rem",
      py: 0.5,
      px: 2,
      minWidth: 80,
    },
    medium: {
      fontSize: "0.9rem",
      py: 1,
      px: 3,
      minWidth: 120,
    },
    large: {
      fontSize: "1rem",
      py: 1.5,
      px: 4,
      minWidth: 160,
    },
  };

  // 👇 only root color variables used
  const colorMap = {
    primary: {
      main: "var(--color-primary)",
      hover: "var(--color-primary-hover)",
      text: "var(--color-white)",
    },
    secondary: {
      main: "var(--color-secondary)",
      hover: "var(--color-secondary-hover)",
      text: "var(--color-white)",
    },
    black: {
      main: "var(--color-black)",
      hover: "var(--color-black-hover)",
      text: "var(--color-white)",
    },
    error: {
      main: "var(--color-error)",
      hover: "#d32f2f", // slightly darker red for hover
      text: "var(--color-white)",
    },
  };

  const selectedColor = colorMap[color] || colorMap.primary;

  return (
    <Button
      fullWidth={fullWidth}
      type={type}
      variant={variant}
      onClick={onClick}
      disabled={disabled || loading}
      sx={{
        boxShadow: "none",
        textTransform: "none",
        borderRadius: "1rem",
        fontWeight: 600,
        color:
          variant === "contained" ? selectedColor.text : selectedColor.main,
        backgroundColor:
          variant === "contained" ? selectedColor.main : "transparent",
        border:
          variant === "outlined" ? `1.5px solid ${selectedColor.main}` : "none",
        "&:hover": {
          backgroundColor:
            variant === "contained"
              ? selectedColor.hover
              : "rgba(0, 0, 0, 0.04)",
          borderColor: variant === "outlined" ? selectedColor.hover : "none",
        },
        transition: "all 0.2s ease",
        ...sizeStyles[size],
        ...sx,
      }}
    >
      {loading ? "Loading..." : text}
    </Button>
  );
};

export default CustomButton;
