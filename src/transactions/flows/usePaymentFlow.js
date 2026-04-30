import { usePayment } from "@/features/address/hooks/usePayment";
import { useCreateOrder } from "../hooks/useCreateOrder";
import { useVerifyPayment } from "../hooks/useVerifyPayment";
import { toast } from "react-toastify";

export const usePaymentFlow = () => {
  const { mutateAsync: createOrder } = useCreateOrder();
  const { mutateAsync: verifyPayment } = useVerifyPayment();
  const { payWithUPI } = usePayment();

  const startPayment = async ({ amount, user, vendorAccountId }) => {
    try {
      // 1. Create order
      const order = await createOrder(amount);

      if (!order?.id) throw new Error("Order creation failed");

      // 2. Open Razorpay
      const result = await payWithUPI({
        amount,
        orderId: order.id,
        description: "Order Payment",
        user,
      });

      if (!result.success) {
        throw new Error(result.error?.description || "Payment failed");
      }

      // 3. Verify payment
      const verifyData = await verifyPayment({
        razorpay_order_id: order.id,
        razorpay_payment_id: result.data.razorpay_payment_id,
        razorpay_signature: result.data.razorpay_signature,
        amount,
        vendorAccountId,
      });

      if (!verifyData.success) {
        throw new Error("Payment verification failed");
      }

      toast.success("🔒 Payment secured");

      return verifyData;
    } catch (err) {
      toast.error(err.message || "Payment failed");
      throw err;
    }
  };

  return { startPayment };
};
