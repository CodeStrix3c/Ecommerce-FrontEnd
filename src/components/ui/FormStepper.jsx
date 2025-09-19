import React from "react";
import { Box, LinearProgress, Typography, Paper } from "@mui/material";

const FormStepper = ({ activeStep, completion, type }) => {
  let stepLabels = [];
  let stepDescriptions = [];

  if (type === "orchard") {
    stepLabels = [
      "Demographics",
      "Variety & Planting Details",
      "Soil and Water Info",
      "Crop & Nutrition Details",
      "Plant Protection & Health",
      "Farm Infrastructure",
    ];
    stepDescriptions = [
      "Enter basic farmer and household info",
      "Specify your orchard's varieties and planting dates",
      "Provide soil type and water source details",
      "Add crop nutrition and fertilization info",
      "Record plant health and protection measures",
      "Check farm infrastructure and equipment",
    ];
  } else if (type === "profile") {
    stepLabels = [
      "Profile",
      // "Demographics",
      // "Land Holdings",
      // "Address",
      "OTP Verification",
    ];
    stepDescriptions = [
      "Set up your personal profile",
      // "Provide demographic details",
      // "Add your land holding info",
      // "Enter your current address",
      "Verify your number via OTP",
    ];
  }

  const totalSteps = stepLabels.length;
  const progress =
    completion !== undefined
      ? completion
      : ((activeStep + 1) / totalSteps) * 100;

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        p: 2,
        mb: 4,
        borderRadius: 3,
        backgroundColor: "transparent",
      }}
    >
      {/* Step Title and Info */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        {/* Title + Description */}
        <Box>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "var(--color-black)" }}
          >
            {stepLabels[activeStep] || ""}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "var(--color-black)", opacity: 0.7 }}
          >
            {stepDescriptions[activeStep] || ""}
          </Typography>
        </Box>

        {/* Step Info */}
        <Box sx={{ textAlign: "right" }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: "medium", color: "var(--color-secondary)" }}
          >
            Step {activeStep + 1} of {totalSteps}
          </Typography>
          {/* <Typography
            variant="body2"
            sx={{ fontWeight: "medium", color: "var(--color-primary)" }}
          >
            {Math.round(progress)}%
          </Typography> */}
        </Box>
      </Box>

      {/* Progress Bar */}
      {/* <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 8,
          borderRadius: 4,
          backgroundColor: "var(--color-black-hover)",
          "& .MuiLinearProgress-bar": {
            backgroundColor: "var(--color-primary)",
            borderRadius: 4,
          },
        }}
      /> */}
    </Paper>
  );
};

export default FormStepper;
