import CustomButton from "@/components/ui/CustomButton";
import useIsMobile from "@/hooks/useInMobile";

export default function FormNavigation({
  step,
  totalSteps,
  nextStep,
  prevStep,
  handleSubmit,
}) {
  const isMobile = useIsMobile();

  // example: OTP is last step
  const isOtpStep = step === totalSteps - 1;

  return (
    <div
      className={`flex items-center w-full mt-5 mb-7 ${isMobile
        ? "flex-col gap-3"
        : isOtpStep
          ? "flex-row justify-center gap-8 mt-12"
          : "flex-row justify-between gap-6"
        }`}
    >
      {/* Back Button */}
      <CustomButton
        text="Back"
        onClick={prevStep}
        variant="outlined"
        fullWidth={isMobile}
        sx={{
          minWidth: isMobile ? "100%" : 140,
        }}
      />


      {step < totalSteps - 1 ? (
        <CustomButton
          text="Next"
          onClick={nextStep}
          variant="contained"
          fullWidth={isMobile}
          sx={{
            minWidth: isMobile ? "100%" : 140,
          }}
        />
      ) : (
        <CustomButton
          text="Submit"
          onClick={handleSubmit}
          variant="contained"
          fullWidth={isMobile}
          sx={{
            minWidth: isMobile ? "100%" : 140,
          }}
        />
      )}
    </div>
  );
}