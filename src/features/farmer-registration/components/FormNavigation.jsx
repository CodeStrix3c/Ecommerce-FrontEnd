import CustomButton from "@/components/ui/CustomButton";
import useIsMobile from "@/hooks/useInMobile";
import { useTheme } from "@mui/material";

export default function FormNavigation({
  step,
  totalSteps,
  nextStep,
  prevStep,
  handleSubmit,
}) {
  const isMobile = useIsMobile();

  return (
    <div
      className={`flex justify-between items-center gap-3 mt-5 ${
        isMobile ? "flex-row" : "flex-row"
      }`}
    >
      {step > 0 ? (
        <CustomButton
          text="Back"
          onClick={prevStep}
          variant="outlined"
          fullWidth={false}
          sx={{
            minWidth: isMobile ? "48%" : 140,
          }}
        />
      ) : (
        <div style={{ minWidth: isMobile ? "48%" : 100 }} />
      )}

      {step < totalSteps - 1 ? (
        <CustomButton
          text="Next"
          onClick={nextStep}
          variant="contained"
          fullWidth={false}
          sx={{
            minWidth: isMobile ? "48%" : 140,
          }}
        />
      ) : (
        <CustomButton
          text="Submit"
          onClick={handleSubmit}
          variant="contained"
          fullWidth={false}
          sx={{
            minWidth: isMobile ? "48%" : 140,
          }}
        />
      )}
    </div>
  );
}
