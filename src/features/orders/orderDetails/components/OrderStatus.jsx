import { Step, StepLabel, Stepper } from "@mui/material";

export default function OrderStatus({ order, steps }) {
  return (
    <div className="bg-[var(--color-black-hover)] shadow-sm w-full py-3 sm:py-5">
      <div className="w-full">
        <div className="bg-[var(--color-primary)] text-[var(--color-white)] p-3 sm:p-4">
          <p className="font-semibold">{order.status}</p>
          <p className="text-xs sm:text-sm">
            {order.status === "Refund Credited"
              ? `On ${order.statusDate}`
              : `Expected by ${order.statusDate}`}
          </p>
        </div>

        {(order.status === "In Transit" || order.status === "Shipped") && (
          <div className="mt-4 sm:mt-6 overflow-x-auto w-full">
            <Stepper
              activeStep={order.progress}
              alternativeLabel
              sx={{
                "& .MuiStepLabel-label": { fontSize: "0.8rem", whiteSpace: "nowrap" },
                "& .MuiStepIcon-root.Mui-active": { color: "var(--color-secondary)" },
                "& .MuiStepIcon-root.Mui-completed": { color: "var(--color-primary)" },
              }}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </div>
        )}
      </div>
    </div>
  );
}
