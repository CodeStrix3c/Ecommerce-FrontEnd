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
    <Box
      className="
        flex flex-col 
       bg-[var(--color-white)]
        gap-5 sm:gap-6 md:gap-4
        p-4 sm:p-6  
        w-full"
      sx={{
        maxWidth: { xs: "100%", sm: "750px", md: "700px", lg: "800px" },
    
      }}
    >
      {/* Review Text Area */}
      <div>
        <FormTextArea
          name="reviewDescription"
          label="Write your review"
          rows={5}
          errors={null}
          required
          register={dummyRegister}
        />
      </div>

      {/* File Input */}
      <div>
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
      </div>
    </Box>
  );
}
