import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  useTheme,
  FormHelperText,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ClearIcon from "@mui/icons-material/Clear";

const FileUploadField = ({
  value,
  onFilesChange,
  label,
  accept = "image/*",
  multiple = false,
  showPreview = true,
  optional = false,
  error,
}) => {
  const theme = useTheme();
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    if (!value) {
      setPreviews([]);
    } else if (multiple && Array.isArray(value)) {
      setPreviews(
        value.map((file) => ({
          file,
          url: URL.createObjectURL(file),
          name: file.name,
        }))
      );
    } else if (!multiple && value instanceof File) {
      setPreviews([
        { file: value, url: URL.createObjectURL(value), name: value.name },
      ]);
    }
  }, [value, multiple]);

  const handleChange = (e) => {
    const files = Array.from(e.target.files);
    setPreviews(
      files.map((f) => ({ name: f.name, url: URL.createObjectURL(f), file: f }))
    );
    onFilesChange(multiple ? files : files[0]);
  };

  const handleRemove = (fileToRemove) => {
    const newPreviews = previews.filter((f) => f.name !== fileToRemove.name);
    setPreviews(newPreviews);
    if (multiple) {
      onFilesChange(newPreviews.map((f) => f.file));
    } else {
      onFilesChange(null);
    }
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Box
        component="label"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 1,
          padding: "10px 12px",
          cursor: "pointer",
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: previews.length
              ? theme.palette.text.primary
              : theme.palette.text.disabled,
          }}
        >
          {previews.length
            ? previews.map((p) => p.name).join(", ")
            : label + (optional ? " (Optional)" : "")}
        </Typography>
        <UploadFileIcon
          fontSize="small"
          sx={{ color: "var(--color-secondary)" }}
        />

        <input
          type="file"
          hidden
          multiple={multiple}
          accept={accept}
          onChange={handleChange}
        />
      </Box>

      {showPreview && previews.length > 0 && (
        <Box sx={{ display: "flex", gap: 1, mt: 1, flexWrap: "wrap" }}>
          {previews.map((file, idx) => (
            <Box
              key={idx}
              sx={{
                position: "relative",
                width: 60,
                height: 60,
                borderRadius: "0.5rem",
                border: `1px solid ${theme.palette.divider}`,
                overflow: "hidden",
              }}
            >
              <Box
                component="img"
                src={file.url}
                alt={file.name}
                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <IconButton
                size="small"
                onClick={() => handleRemove(file)}
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  backgroundColor: theme.palette.background.paper,
                  borderRadius: "50%",
                  padding: "2px",
                }}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}

      {error && <FormHelperText error>{error}</FormHelperText>}
    </Box>
  );
};

export default FileUploadField;
