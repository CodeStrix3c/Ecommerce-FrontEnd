"use client";

import React, { useState } from "react";
import { Button, Typography, IconButton, Box } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CloseIcon from "@mui/icons-material/Close";
import RequiredLabel from "@/components/ui/RequiredLabel";
import OptionalLabel from "@/components/ui/OptionalLabel";

export default function FormFileInput({
  name,
  label,
  value,
  onChange,
  errors,
  optional = false,
  accept = "*",
  multiple = false,
  showPreview = false,
  width = "100%",
  labelPosition = "outside", // new prop: "inside" | "outside"
}) {
  const [files, setFiles] = useState(value ? [value] : []);

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    setFiles(selectedFiles);
    if (onChange) onChange(multiple ? selectedFiles : selectedFiles[0] ?? null);
  };

  const handleRemoveFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    if (onChange) onChange(multiple ? newFiles : newFiles[0] ?? null);
  };

  return (
    <Box sx={{ mb: 2, width }}>
      {/* Outside Label */}
      {labelPosition === "outside" && (
        <>
          {optional ? (
            <OptionalLabel label={label} />
          ) : (
            <RequiredLabel label={label} />
          )}
        </>
      )}

      {/* Hidden Input */}
      <input
        type="file"
        accept={accept}
        id={name}
        multiple={multiple}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      {/* Upload Button */}
      <label htmlFor={name} style={{ display: "block" }}>
        <Button
          variant="outlined"
          component="span"
          startIcon={<UploadFileIcon />}
          fullWidth
          sx={{
            borderColor: "var(--color-black)",
            color: "var(--color-black)",
            textTransform: "none",
            "&:hover": {
              borderColor: "var(--color-black)",
              backgroundColor: "var(--color-black-hover)",
            },
          }}
        >
          {labelPosition === "inside"
            ? label
            : multiple
              ? "Upload Files"
              : "Upload File"}
        </Button>
      </label>

      {/* File Preview */}
      {files.length > 0 && (
        <Box
          sx={{
            mt: 2,
            display: "grid",
            gap: 1,
          }}
        >
          {files.map((file, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                border: "1px solid var(--color-black-hover)",
                borderRadius: 2,
                p: 1,
                backgroundColor: "var(--color-white)",
                boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
              }}
            >
              {showPreview && file.type?.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  style={{
                    width: 60,
                    height: 60,
                    objectFit: "cover",
                    borderRadius: 6,
                  }}
                />
              ) : (
                <UploadFileIcon sx={{ color: "var(--color-secondary)" }} />
              )}
              <Typography
                variant="body2"
                sx={{ flex: 1, color: "var(--color-black)" }}
              >
                {file.name}
              </Typography>
              <IconButton
                size="small"
                onClick={() => handleRemoveFile(index)}
                sx={{ color: "var(--color-error)" }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}

      {/* Error Message */}
      {errors && (
        <Typography
          variant="body2"
          sx={{ color: "var(--color-error)", mt: 0.5 }}
        >
          {errors.message}
        </Typography>
      )}
    </Box>
  );
}
