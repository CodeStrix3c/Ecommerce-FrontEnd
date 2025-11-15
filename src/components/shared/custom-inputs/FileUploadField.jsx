import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  useTheme,
  FormHelperText,
  IconButton,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Close } from "@mui/icons-material";
import RequiredLabel from "@/components/ui/RequiredLabel";

const FileUploadField = ({
  value,
  onFilesChange,
  label,
  accept = "image/*",
  multiple = false,
  show = true,
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
    const newPreviews = files.map((f) => ({
      name: f.name,
      url: URL.createObjectURL(f),
      file: f,
    }));
    setPreviews(newPreviews);
    onFilesChange(multiple ? files : files[0]);
  };

  const handleView = (file) => {
    window.open(file.url, "_blank");
  };

  const handleRemove = (index) => {
    const updated = previews.filter((_, i) => i !== index);
    setPreviews(updated);
    if (multiple) onFilesChange(updated.map((p) => p.file));
    else onFilesChange(null);
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
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            flexWrap: "wrap",
          }}
        >
          {!previews.length && (
            <>
              <span>{label}</span>
              {!optional && <RequiredLabel />}
            </>
          )}

          {previews.length
            ? `(${previews.map((p) => p.name).join(", ")})`
            : optional
              ? "(Optional)"
              : ""}
        </Typography>

        {show && previews.length > 0 ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {previews.map((file, idx) => (
              <Box
                key={idx}
                sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: "var(--color-primary)",
                    textDecoration: "underline",
                    cursor: "pointer",
                    fontSize: "12px",
                  }}
                  onClick={() => handleView(file)}
                >
                  Show Preview
                </Typography>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    handleRemove(idx);
                  }}
                  sx={{
                    color: "var(--color-error)",
                    p: 0,
                    "&:hover": { background: "transparent" },
                  }}
                ></IconButton>
                <Close
                  fontSize="12px"
                  sx={{
                    color: "var(--color-error)",
                  }}
                />
              </Box>
            ))}
          </Box>
        ) : (
          <UploadFileIcon
            fontSize="small"
            sx={{ color: "var(--color-secondary)" }}
          />
        )}

        <input
          type="file"
          hidden
          multiple={multiple}
          accept={accept}
          onChange={handleChange}
        />
      </Box>

      {error && !optional && (
        <FormHelperText
          style={{ color: "var(--color-error)", fontSize: "12px" }}
        >
          {error}
        </FormHelperText>
      )}
    </Box>
  );
};

export default FileUploadField;
