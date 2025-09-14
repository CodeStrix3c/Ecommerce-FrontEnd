import CustomButton from "@/components/ui/CustomButton";
import { useTheme, useMediaQuery } from "@mui/material";

export default function FormNavigation({
  step,
  totalSteps,
  nextStep,
  prevStep,
  handleSubmit,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
      {step > 0 ? (
        <CustomButton
          text="Back"
          onClick={prevStep}
          variant="outlined"
          fullWidth={isMobile}
          sx={{ minWidth: isMobile ? "100%" : 500 }}
        />
      ) : (
        <div style={{ minWidth: isMobile ? "100%" : 100 }} />
      )}

      {step < totalSteps - 1 ? (
        <CustomButton
          text="Next"
          onClick={nextStep}
          variant="contained"
          fullWidth={isMobile}
          sx={{ ml: isMobile ? 0 : "auto", minWidth: isMobile ? "100%" : 140 }}
        />
      ) : (
        <CustomButton
          text="Submit"
          onClick={handleSubmit}
          variant="contained"
          fullWidth={isMobile}
          sx={{ ml: isMobile ? 0 : "auto", minWidth: isMobile ? "100%" : 140 }}
        />
      )}
    </div>
  );
}
