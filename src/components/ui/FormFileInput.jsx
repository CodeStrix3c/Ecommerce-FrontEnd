import React, { useState } from "react";
import { Button, Typography, IconButton } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CloseIcon from "@mui/icons-material/Close";
import RequiredLabel from "@/features/auth/components/RequiredLabel";
import OptionalLabel from "@/features/auth/components/OptionalLabel";

export default function FormFileInput({
  name,
  label,
  register,
  errors,
  optional = false,
  accept = "*",
  multiple = false,
  showPreview = false,
  width = "100%",
}) {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    setFiles(selectedFiles);
  };

  const handleRemoveFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div style={{ marginBottom: "16px", width }}>
      {/* Label */}
      {optional ? (
        <OptionalLabel label={label} />
      ) : (
        <RequiredLabel label={label} />
      )}

      {/* Hidden Input */}
      <input
        {...register(name)}
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
            mt: 1,
            borderColor: "var(--color-primary)",
            color: "var(--color-primary)",
            "&:hover": {
              borderColor: "var(--color-primary-hover)",
              backgroundColor: "var(--color-black-hover)",
            },
          }}
        >
          {multiple ? "Upload Files" : "Upload File"}
        </Button>
      </label>

      {/* File Previews */}
      {files.length > 0 && (
        <div style={{ marginTop: 12, display: "grid", gap: "8px" }}>
          {files.map((file, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                border: "1px solid var(--color-black-hover)",
                borderRadius: 8,
                padding: "8px",
              }}
            >
              {showPreview && file.type.startsWith("image/") ? (
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
                <UploadFileIcon style={{ color: "var(--color-secondary)" }} />
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
            </div>
          ))}
        </div>
      )}

      {/* Error Message */}
      {errors?.[name]?.message && (
        <Typography
          variant="body2"
          sx={{ color: "var(--color-error)", mt: 0.5 }}
        >
          {errors[name].message}
        </Typography>
      )}
    </div>
  );
}
