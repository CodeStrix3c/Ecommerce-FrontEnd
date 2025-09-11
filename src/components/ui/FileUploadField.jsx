import React, { useState } from "react";
import {
  FormControl,
  FormHelperText,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { Upload, X } from "lucide-react";

const FileUploadField = ({
  name,
  label,
  register,
  errors,
  accept = "image/*,video/*",
  multiple = true,
  onRemove,
}) => {
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

  return (
    <FormControl fullWidth error={!!errors[name]} sx={{ mb: 2 }}>
      <Typography
        variant="subtitle1"
        sx={{ color: "var(--color-black)", mb: 1, fontWeight: 500 }}
      >
        {label}
      </Typography>

      <Button
        variant="outlined"
        component="label"
        startIcon={<Upload size={16} />}
        sx={{
          borderColor: "var(--color-black)",
          color: "var(--color-black)",
          "&:hover": {
            borderColor: "var(--color-primary)",
            color: "var(--color-primary)",
          },
        }}
      >
        {multiple ? "Choose Files" : "Choose File"}
        <input
          type="file"
          hidden
          {...register(name)}
          multiple={multiple}
          accept={accept}
          onChange={handlePreview}
        />
      </Button>

      {errors[name] && <FormHelperText>{errors[name]?.message}</FormHelperText>}

      {previews.length > 0 && (
        <Box sx={{ display: "flex", gap: 1, mt: 2, flexWrap: "wrap" }}>
          {previews.map((file, idx) => (
            <Box
              key={idx}
              sx={{
                position: "relative",
                width: 60,
                height: 60,
                borderRadius: "0.5rem",
                border: "1px solid var(--color-black)",
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
                  backgroundColor: "var(--color-white)",
                  borderRadius: "50%",
                  padding: "2px",
                  "&:hover": {
                    backgroundColor: "var(--color-secondary)",
                    color: "var(--color-white)",
                  },
                }}
              >
                <X size={14} />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}
    </FormControl>
  );
};

export default FileUploadField;
