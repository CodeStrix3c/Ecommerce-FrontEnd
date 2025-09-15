import React, { useState } from "react";
import {
  FormControl,
  FormHelperText,
  Typography,
  Box,
  IconButton,
  useTheme,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ClearIcon from "@mui/icons-material/Clear";

const FileUploadField = ({
  name,
  label,
  register,
  errors,
  accept = "image/*,video/*",
  multiple = false,
  onRemove,
  optional = false,
  showPreview = true,
}) => {
  const theme = useTheme();
  const [previews, setPreviews] = useState([]);

  const handlePreview = (event) => {
    const files = Array.from(event.target.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    const newPreviews = imageFiles.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
      file,
    }));

    setPreviews((prev) => (multiple ? [...prev, ...newPreviews] : newPreviews));
  };

  const handleRemove = (file) => {
    setPreviews((prev) => prev.filter((f) => f.name !== file.name));
    if (onRemove) onRemove(file);
  };

  const renderPreview = (file, idx) => (
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
  );

  return (
    <FormControl fullWidth error={!!errors[name]} sx={{ mb: 0 }}>
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
          {...register(name)}
          multiple={multiple}
          accept={accept}
          onChange={handlePreview}
        />
      </Box>

      {showPreview && previews.length > 0 && (
        <Box
          sx={{
            display: "flex",
            gap: 1,
            mt: 1,
            flexWrap: "wrap",
          }}
        >
          {previews.map(renderPreview)}
        </Box>
      )}

      {errors[name] && <FormHelperText>{errors[name]?.message}</FormHelperText>}
    </FormControl>
  );
};

export default FileUploadField;
