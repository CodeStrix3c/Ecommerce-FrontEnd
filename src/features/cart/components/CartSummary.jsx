import {
  useApplyCoupon,
  useGetCoupons,
} from "@/hooks/checkouthooks/useApplyCoupon";
import { usecheckout } from "@/hooks/checkouthooks/usecheckout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ChevronDown, Check } from "lucide-react";

const formatExpiry = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const getRuleLabel = (coupon) =>
  coupon.ruleType === "by_percent"
    ? `${coupon.discountAmount}% OFF`
    : `₹${coupon.discountAmount} OFF`;

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
  const [panelOpen, setPanelOpen] = useState(false);
  const navigate = useNavigate();

  const { mutate: applyCoupon, isPending: isCouponPending } = useApplyCoupon();
  const { mutate: checkout, isPending: isCheckoutPending } = usecheckout();

  const { data: couponsData, isLoading: couponsLoading } = useGetCoupons({
    enabled: panelOpen,
  });

  const coupons = couponsData?.data ?? [];

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }
    applyCoupon(couponCode.trim(), {
      onSuccess: (data) => {
        if (data?.succeeded === false) {
          setAppliedCoupon(null);
          toast.error(data?.errorMessage || "Coupon could not be applied");
          return;
        }
        setAppliedCoupon(couponCode.trim());
        toast.success("Coupon applied successfully!");
      },
      onError: (error) => {
        setAppliedCoupon(null);
        const message =
          error?.response?.data?.errorMessage ||
          error?.response?.data?.message ||
          error?.message ||
          "Failed to apply coupon";
        toast.error(message);
      },
    });
  };

  const handleSelectCoupon = (code) => {
    if (couponCode === code) {
      setCouponCode("");
      setAppliedCoupon(null);
      return;
    }
    setCouponCode(code);
    setAppliedCoupon(null);
  };
  const packagingTotal = cart?.reduce(
    (sum, item) =>
      sum +
      Number(
        item.packagingPrice ?? // direct field
          item.packaging?.price ?? // nested field
          item.packagingAmount ?? // fallback
          0,
      ),
    0,
  );

  const handleCheckout = () => {
    const couponToSend = appliedCoupon ?? couponCode.trim() ?? null;

    checkout(couponToSend || null, {
      onSuccess: (data) => {
        if (data?.checkoutId) {
          localStorage.setItem("checkoutId", data.checkoutId);
        }

        navigate("/address", {
          state: {
            packagingTotal, // ✅ PASS HERE
          },
        });
      },
      onError: (error) => {
        const data = error?.response?.data;
        const message =
          (typeof data === "string" && data) ||
          data?.errorMessage ||
          data?.message ||
          error?.message ||
          "Checkout failed";

        toast.error(message);
      },
    });
  };
  // ✅ ADDED: packaging total calculation (safe fallback for all cases)

  return (
    <div className="sticky top-36 border rounded-sm p-6 bg-[var(--color-white)] flex flex-col gap-4 shadow-sm">
      <h2 className="text-lg font-semibold text-[var(--color-black)]">
        Cart Summary
      </h2>

      <p className="text-sm text-[var(--color-black)]">
        {cart.length} {cart.length === 1 ? "item" : "items"}
      </p>

      {/* Pricing */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Original Price</span>
          <span>₹{Number(subTotal ?? 0).toFixed(2)}</span>
        </div>

        {/* ✅ ADDED: Packaging row (only shows if exists) */}
        {packagingTotal > 0 && (
          <div className="flex justify-between text-sm">
            <span>Packaging</span>
            <span>₹{packagingTotal.toFixed(2)}</span>
          </div>
        )}

        {discount > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Discount</span>
            <span>- ₹{Number(discount).toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between text-base font-semibold border-t pt-3">
          <span>Total</span>
          <span className="text-[var(--color-primary)]">
            ₹{(Number(total ?? 0) + packagingTotal).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Coupon Input */}
      <div className="flex flex-col gap-2">
        <form onSubmit={handleApplyCoupon} className="flex gap-2">
          <input
            type="text"
            placeholder="Enter coupon code"
            maxLength={12}
            value={couponCode}
            onChange={(e) => {
              setCouponCode(e.target.value.toUpperCase());
              if (appliedCoupon) setAppliedCoupon(null);
            }}
            className="border px-3 py-2 rounded w-full text-sm outline-none focus:border-blue-500 transition-all font-mono tracking-wide uppercase"
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
          <p className="text-[10px] text-green-600 font-bold uppercase tracking-wider">
            ✓ Code {appliedCoupon} active
          </p>
        )}

        <button
          type="button"
          onClick={() => setPanelOpen((p) => !p)}
          className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors w-fit"
        >
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-250 ${panelOpen ? "rotate-180" : ""}`}
          />
          View available coupons {coupons.length > 0 && `(${coupons.length})`}
        </button>
      </div>

      {/* Checkout */}
      <button
        onClick={handleCheckout}
        disabled={isCheckoutPending || cart.length === 0}
        className="w-full px-4 py-3 bg-[var(--color-primary)] text-white rounded-full font-medium shadow-md hover:opacity-90 transition flex justify-center items-center gap-2 disabled:bg-gray-300 disabled:shadow-none"
      >
        {isCheckoutPending ? "Processing..." : "Checkout"}
      </button>
    </div>
  );
};

export default CartSummary;
