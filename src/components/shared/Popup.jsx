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
        backgroundColor: "var(--color-overlay)", // backdrop
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1300,
      }}
      onClick={onClose} // close on backdrop click
    >
      <div
        style={{
          position: "relative", // to position the close button
          background: "var(--color-white)",
          borderRadius: "12px",
          padding: "20px",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()} // prevent backdrop close
      >
        {/* Close Button */}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "var(--color-black)",
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Content */}
        {children}
      </div>
    </div>
  );
}
