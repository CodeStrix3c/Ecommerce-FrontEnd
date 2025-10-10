import FormStepper from "@/components/shared/FormStepper";

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
            <FormStepper activeStep={order.progress} steps={steps} />
          </div>
        )}
      </div>
    </div>
  );
}
