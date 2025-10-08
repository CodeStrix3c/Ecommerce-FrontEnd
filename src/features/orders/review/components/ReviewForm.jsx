import React from "react";
import { Box } from "@mui/material";
import FormTextArea from "@/components/shared/custom-inputs/FormTextArea";
import FormFileInput from "@/components/shared/custom-inputs/FormFileInput";

export default function ReviewForm({ description, setDescription, files, setFiles }) {
  const dummyRegister = () => ({
    value: description,
    onChange: (e) => setDescription(e.target.value),
  });

  return (
    <Box mb={4}>
      <FormTextArea
        name="reviewDescription"
        label="Write your review"
        rows={5}
        errors={null}
        required={true}
        register={dummyRegister}
      />

      <FormFileInput
        name="reviewFiles"
        label="Attach Images (optional)"
        value={files}
        onChange={(value) =>
          setFiles(Array.isArray(value) ? value : value ? [value] : [])
        }
        multiple
        showPreview
        optional
      />
    </Box>
  );
}
