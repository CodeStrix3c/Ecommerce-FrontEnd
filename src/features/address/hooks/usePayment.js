import { useCallback } from "react";

const loadRazorpayScript = () =>
  new Promise((resolve) => {
    if (document.getElementById("razorpay-script")) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
console.log(import.meta.env.VITE_RAZORPAY_KEY_ID, "ip id");

export const usePayment = () => {
  const pay = useCallback(
    async ({ amount, orderId, description, image, user }) => {
      const loaded = await loadRazorpayScript();

      if (!loaded) {
        return {
          success: false,
          error: { description: "Failed to load Razorpay SDK" },
        };
      }

      return new Promise((resolve) => {
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID || "",
          currency: "INR",
          amount: String(amount * 100),
          name: "Ziraat",
          description,
          image,
          order_id: orderId, // optional — omit if you don't create orders server-side
          prefill: user,
          method: {
            upi: true,
            card: true,
            netbanking: true,
            wallet: true,
          },
          handler: (response) => {
            resolve({ success: true, data: response });
          },
          modal: {
            ondismiss: () => {
              resolve({
                success: false,
                error: { description: "Payment cancelled" },
              });
            },
          },
        };

        const rzp = new window.Razorpay(options);

        rzp.on("payment.failed", (err) => {
          resolve({
            success: false,
            error: {
              code: err?.error?.code,
              description: err?.error?.description || "Payment failed",
              source: err?.error?.source,
              step: err?.error?.step,
              reason: err?.error?.reason,
            },
          });
        });

        rzp.open();
      });
    },
    [],
  );

  // alias used in OrderSummary
  const payWithUPI = useCallback(
    ({ amount, description, user }) => pay({ amount, description, user }),
    [pay],
  );

  return { pay, payWithUPI };
};
