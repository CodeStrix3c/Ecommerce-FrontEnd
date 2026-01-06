import FormStepper from "@/components/shared/FormStepper";

export default function OrderStatus({ products,order, steps }) {

  // Status-based colors
  const statusColors = {
    "Delivered": "bg-[var(--color-primary)]",
    "In Transit": "bg-[var(--color-secondary)]",
    "Shipped": "bg-blue-500",
    "Pending": "bg-yellow-500",
    "Cancelled": "bg-[var(--color-error)]",
    "Returned": "bg-orange-600",
    "Refunded": "bg-green-700"
  };

  // Status-based messages
  const statusMessages = {
    Delivered: `Delivered on ${order.date}`,
    "In Transit": `Expected by ${order.date}`,
    Shipped: `Your order has been shipped`,
    Pending: `Your order is being processed`,
    Cancelled: `Cancelled on ${order.date}`,
    Returned: `Your return request is in progress`,
    Refunded: `Refund processed on ${order.date}`
  };

  // Stepper display logic
  const hideStepperStatuses = ["Cancelled", "Returned", "Refunded", "Pending"];
  const showStepper = !hideStepperStatuses.includes(order.status);

  // Stepper active step logic
  let activeStep = 0;

  switch (order.status) {
    case "Delivered":
      activeStep = steps.length - 1; // final step
      break;

    case "In Transit":
      activeStep = order.progress || 1;
      break;

    case "Shipped":
      activeStep = 1; // shipped step
      break;

    default:
      activeStep = 0;
      break;
  }

  return (
    <div className="shadow-sm w-full py-3 sm:py-5">
      <div className="w-full">

        {/* Status Header */}
        <div className={`${statusColors[order.status]} text-white p-3 sm:p-4`}>
          <p className="font-semibold">{order.status}</p>
          <p className="text-xs sm:text-sm">
            {statusMessages[order.status] || order.date}
          </p>
        </div>

        {/* Stepper */}
        {showStepper && (
          <div className="mt-4 sm:mt-6 overflow-x-auto w-full">
            <FormStepper activeStep={activeStep} steps={steps} />
          </div>
        )}

      </div>
    </div>
  );
}
