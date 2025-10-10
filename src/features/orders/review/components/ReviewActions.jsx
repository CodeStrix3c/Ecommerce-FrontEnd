import React from "react";
import { Box } from "@mui/material";
import CustomButton from "@/components/ui/CustomButton";

export default function ReviewActions({ onClose, handleSubmit }) {
  return (
    <Box className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
      <CustomButton text="Cancel" variant="outlined" onClick={onClose} />
      <CustomButton text="Submit" variant="contained" onClick={handleSubmit} />
    </Box>
  );
}
