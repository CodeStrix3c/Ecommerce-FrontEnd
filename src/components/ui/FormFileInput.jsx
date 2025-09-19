import React, { useState } from "react";
import { Button, Typography, IconButton } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CloseIcon from "@mui/icons-material/Close";
import RequiredLabel from "@/features/auth/components/RequiredLabel";
import OptionalLabel from "@/features/auth/components/OptionalLabel";

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
    <div style={{ marginBottom: "16px", width }}>
      {optional ? (
        <OptionalLabel label={label} />
      ) : (
        <RequiredLabel label={label} />
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
        >
          {multiple ? "Upload Files" : "Upload File"}
        </Button>
      </label>

      {/* File Preview */}
      {files.length > 0 && (
        <div style={{ marginTop: 12, display: "grid", gap: "8px" }}>
          {files.map((file, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                border: "1px solid #ccc",
                borderRadius: 8,
                padding: "8px",
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
                <UploadFileIcon style={{ color: "#666" }} />
              )}
              <Typography variant="body2" sx={{ flex: 1 }}>
                {file.name}
              </Typography>
              <IconButton
                size="small"
                onClick={() => handleRemoveFile(index)}
                sx={{ color: "red" }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </div>
          ))}
        </div>
      )}

      {/* Error Message */}
      {errors && (
        <Typography variant="body2" sx={{ color: "red", mt: 0.5 }}>
          {errors.message}
        </Typography>
      )}
    </div>
  );
}
