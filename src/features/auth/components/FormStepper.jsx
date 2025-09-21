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

const FormStepper = ({ activeStep, type }) => {
  const { labels, descriptions } = stepDataMap[type] || {};
  const totalSteps = labels.length;

  return (
    <Paper elevation={0} sx={{ width: "100%", backgroundColor: "transparent" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Box>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "var(--color-black)" }}
          >
            {labels[activeStep] || ""}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "var(--color-black)", opacity: 0.7 }}
          >
            {descriptions[activeStep] || ""}
          </Typography>
        </Box>

        <Box sx={{ textAlign: "right" }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: "medium", color: "var(--color-secondary)" }}
          >
            Step {activeStep + 1} of {totalSteps}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default FormStepper;
