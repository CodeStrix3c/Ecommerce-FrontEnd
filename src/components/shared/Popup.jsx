import React from "react";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function Popup({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "var(--color-overlay)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1300,
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: "relative",
          // background: "var(--color-white)",
          borderRadius: "12px",
          padding: "20px",
          Height: "30%",
          // overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 30,
            right:25,

            color: "var(--color-black)",
          }}
        >
          <CloseIcon />
        </IconButton>

        {children}
      </div>
    </div>
  );
}
