import { useApplyCoupon } from "@/hooks/checkouthooks/useApplyCoupon";
import { usecheckout } from "@/hooks/checkouthooks/usecheckout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CartSummary = ({
  cart,
  subTotal,
  discount,
  total,
  onClear,
  onPaymentChange,
}) => {
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const navigate = useNavigate();

  // Aliasing mutations and pending states to avoid naming conflicts
  const { mutate: applyCoupon, isPending: isCouponPending } = useApplyCoupon();
  const { mutate: checkout, isPending: isCheckoutPending } = usecheckout();

  const handleApplyCoupon = (e) => {
    e.preventDefault();

    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }

    applyCoupon(couponCode, {
      onSuccess: (data) => {
        setAppliedCoupon(couponCode);
        toast.success("Coupon applied successfully!");
      },
      onError: (error) => {
        console.error("Coupon Error:", error);
        toast.error("Failed to apply coupon");
      },
    });
  };

  const handleCheckout = () => {
    // Call checkout with the optional appliedCoupon
    checkout(appliedCoupon, {
      onSuccess: (data) => {
        // Save the checkoutId to localStorage
        if (data?.checkoutId) {
          localStorage.setItem("checkoutId", data.checkoutId);
        }

        toast.success("Proceeding to address details...");

        // Land the user on the address page
        navigate("/address");
      },
      onError: (error) => {
        console.error("Checkout Error:", error);
        toast.error(error?.response?.data?.message || "Checkout failed");
      },
    });
  };

  return (
    <div className="sticky top-36 border rounded-sm p-6 bg-[var(--color-white)] flex flex-col gap-4 shadow-sm">
      <h2 className="text-lg font-semibold text-[var(--color-black)]">
        Order Summary
      </h2>

      <p className="text-sm text-[var(--color-black)]">
        {cart.length} {cart.length === 1 ? "item" : "items"}
      </p>

      {/* Pricing Details */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>₹{Number(subTotal ?? 0).toFixed(2)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Discount</span>
            <span>- ₹{Number(discount).toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between text-base font-semibold border-t pt-3">
          <span>Total</span>
          <span className="text-[var(--color-primary)]">
            ₹{Number(total ?? 0).toFixed(2)}
          </span>
        </div>
      </div>

      {/* ✅ Apply Coupon Form */}
      <div className="py-2">
        <form onSubmit={handleApplyCoupon} className="flex gap-2">
          <input
            type="text"
            placeholder="Apply coupon"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="border px-3 py-2 rounded w-full text-sm outline-none focus:border-blue-500 transition-all"
          />
          <button
            type="submit"
            disabled={isCouponPending}
            className="bg-blue-600 text-white px-4 rounded text-sm font-medium disabled:opacity-50 hover:bg-blue-700 transition-colors"
          >
            {isCouponPending ? "..." : "Apply"}
          </button>
        </form>
        {appliedCoupon && (
          <p className="text-[10px] text-green-600 mt-1 font-bold uppercase tracking-wider">
            Code {appliedCoupon} active
          </p>
        )}
      </div>

      {/* Checkout Button */}
      <button
        onClick={handleCheckout}
        disabled={isCheckoutPending || cart.length === 0}
        className="w-full px-4 py-3 bg-[var(--color-primary)] text-white rounded-full font-medium shadow-md hover:opacity-90 transition flex justify-center items-center gap-2 disabled:bg-gray-300 disabled:shadow-none"
      >
        {isCheckoutPending ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Processing...
          </>
        ) : (
          "Checkout"
        )}
      </button>
    </div>
  );
};

export default CartSummary;
