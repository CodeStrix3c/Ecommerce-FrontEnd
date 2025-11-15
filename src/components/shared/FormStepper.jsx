import React, { forwardRef, useEffect, useRef } from "react";
import { Stepper, Step, StepLabel } from "@mui/material";
import useIsMobile from "@/hooks/useInMobile";

const FormStepper = forwardRef(
  ({ steps = [], activeStep = 0, alternativeLabel = true }, ref) => {
    const isMobile = useIsMobile();
    const stepperContainerRef = useRef(null);

    useEffect(() => {
      requestAnimationFrame(() => {
        const container = stepperContainerRef.current;
        if (!container) return;

        const stepElements = container.querySelectorAll(".MuiStep-root");
        if (!stepElements.length) return;

        const activeStepElement = stepElements[activeStep];
        if (!activeStepElement) return;

        const containerRect = container.getBoundingClientRect();
        const stepRect = activeStepElement.getBoundingClientRect();

        const scrollLeft =
          activeStepElement.offsetLeft -
          containerRect.width / 2 +
          stepRect.width / 2;

        container.scrollTo({
          left: Math.max(0, scrollLeft),
          behavior: "smooth",
        });
      });
    }, [activeStep, steps]);

    return (
      <div
        ref={(el) => {
          stepperContainerRef.current = el;
          if (typeof ref === "function") {
            ref(el);
          } else if (ref) {
            ref.current = el;
          }
        }}
        style={{
          overflowX: "auto",
          whiteSpace: "nowrap",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
          position: "relative",
          width: "100%",
        }}
        className="hide-scrollbar"
      >
        <Stepper
          activeStep={activeStep}
          alternativeLabel={!isMobile && alternativeLabel}
          sx={{
            display: "inline-flex",
            minWidth: "100%",
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
      </div>
    );
  }
);

FormStepper.displayName = "FormStepper";

export default FormStepper;
