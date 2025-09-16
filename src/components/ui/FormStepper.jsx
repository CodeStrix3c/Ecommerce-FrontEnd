import React from "react";
import { Stepper, Step, StepLabel, Box, Typography } from "@mui/material";

const FormStepper = ({ activeStep, completion, type }) => {
  let stepLabels = [];
  if (type == "orchard") {
    stepLabels = ["Demographics", "Land Holdings", "Address"];
  } else if (type == "profile") {
    stepLabels = [
      "Profile",
      "Demographics",
      "Land Holdings",
      "Address",
      "OTP Verification",
    ];
  }
  return (
    <Box sx={{ width: "100%", mt: 3, mb: 3 }}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{
          px: 0,
          "& .MuiStep-root": {
            flex: 1,
            paddingLeft: 0,
            paddingRight: 0,
          },
          "& .MuiStepLabel-root": {
            px: 0,
          },
          "& .MuiStepConnector-root": {
            mx: 0,
          },
          "& .MuiStepIcon-root": {
            color: "var(--color-black)",
            borderRadius: "50%",
            opacity: "20%",
            border: "2px solid var(--color-black)",
            width: { xs: 20, sm: 30 },
            height: { xs: 20, sm: 30 },
            fontSize: { xs: "0.8rem", sm: "1rem" },
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
          "& .MuiStepIcon-root.Mui-active": {
            opacity: "70%",
            color: "var(--color-secondary)",
            backgroundColor: "var(--color-secondary)",
            borderColor: "var(--color-secondary)",
          },
          "& .MuiStepIcon-root.Mui-completed": {
            opacity: "100%",
            color: "var(--color-white)",
            backgroundColor: "var(--color-primary)",
            borderColor: "var(--color-primary)",
          },
          "& .MuiStepLabel-label": {
            fontSize: {
              xs: "10px",
              sm: "14px",
              md: "14px",
            },
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "var(--color-black)",
          },
        }}
      >
        {stepLabels.map((label, index) => (
          <Step key={label}>
            <StepLabel>
              {label}
              {index === activeStep && (
                <Typography
                  variant="caption"
                  sx={{
                    mt: 0.5,
                    fontWeight: "bold",
                    color: "var(--color-primary)",
                  }}
                >
                  {/* {completion}% */}
                </Typography>
              )}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default FormStepper;
