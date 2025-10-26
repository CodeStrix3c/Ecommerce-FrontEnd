import React from "react";
import { Stepper, Step, StepLabel } from "@mui/material";
import useIsMobile from "@/hooks/useInMobile";

const FormStepper = ({
  steps = [],
  activeStep = 0,
  alternativeLabel = true,
}) => {
  const isMobile = useIsMobile();

  return (
    <Stepper
      activeStep={activeStep}
      alternativeLabel={!isMobile && alternativeLabel}
      // orientation={isMobile ? "vertical" : "horizontal"}
      sx={{
        px: isMobile ? 1 : 4,
        py: isMobile ? 2 : 3,
        "& .MuiStepLabel-label": {
          fontSize: isMobile ? "0.75rem" : "0.9rem",
          color: "var(--color-black)",
          whiteSpace: "nowrap",
        },
        "& .MuiStepLabel-label.Mui-active": {
          fontWeight: 600,
          color: "var(--color-secondary)",
        },
        "& .MuiStepIcon-root.Mui-active": {
          color: "var(--color-secondary)",
        },
        "& .MuiStepIcon-root.Mui-completed": {
          color: "var(--color-primary)",
        },
        "& .MuiStepConnector-line": {
          borderColor: "var(--color-gray)",
        },
      }}
    >
      {steps.map((label, index) => (
        <Step key={index}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default FormStepper;
