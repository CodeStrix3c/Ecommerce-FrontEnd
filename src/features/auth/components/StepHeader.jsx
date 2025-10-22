import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import {
  ORCHARD_STEPS,
  PROFILE_STEPS,
  SUPPLIER_STEPS,
} from "@/constants/stepperData";

const stepDataMap = {
  orchard: ORCHARD_STEPS,
  profile: PROFILE_STEPS,
  supplier: SUPPLIER_STEPS,
};

const StepHeader = ({ activeStep, type }) => {
  const { labels, descriptions } = stepDataMap[type] || {};
  const totalSteps = labels?.length || 0;

  return (
    <Paper elevation={0} sx={{ width: "100%", backgroundColor: "transparent" }}>
  
<Box
  sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    mb: { xs: 1, sm: 1.5, md: 2 },
    flexDirection: "row", 
    gap: { xs: 0.75, sm: 0 },
    px: { xs: 0, sm: 1, md: 2 },
    flexWrap: "nowrap", 
  }}
>
  <Box sx={{ width: "100%", flex: 1 }}>
    <Typography
      variant="h6"
      sx={{
        color: "var(--color-black)",
        fontSize: { xs: "1rem", sm: "1.25rem", md: "1.4rem", lg: "1rem" },
        fontWeight: 600,
        lineHeight: 1.2,
        whiteSpace: "nowrap", 
      }}
    >
      {labels?.[activeStep] || ""}
    </Typography>

    <Typography
      variant="body2"
      sx={{
        color: "var(--color-black)",
        opacity: 0.7,
        fontSize: { xs: "0.85rem", sm: "0.875rem", md: "0.95rem"  },
        mt: { xs: 0.3, sm: 0.5 },
        maxWidth: { xs: "80%", md: "80%", lg: "70%" },
      }}
    >
      {descriptions?.[activeStep] || ""}
    </Typography>
  </Box>

  <Box
    sx={{
      textAlign: "right",
      flexShrink: 0,
      whiteSpace: "nowrap", 
      ml: { xs: 1, sm: 2 },
    }}
  >
    <Typography
      variant="body2"
      sx={{
        fontWeight: 500,
        color: "var(--color-secondary)",
        fontSize: { xs: "0.85rem", sm: "0.875rem", md: "1rem" },
      }}
    >
      Step {activeStep + 1} of {totalSteps}
    </Typography>
  </Box>
</Box>

    </Paper>
  );
};

export default StepHeader;
