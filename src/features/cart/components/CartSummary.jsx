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

  // ✅ Only fetch when panel is opened
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
      onSuccess: () => {
        setAppliedCoupon(couponCode.trim());
        toast.success("Coupon applied successfully!");
      },
      onError: (error) => {
        setAppliedCoupon(null);
        toast.error(error?.response?.data?.message || "Failed to apply coupon");
      },
    });
  };

  const handleSelectCoupon = (code) => {
    // Clicking an already selected coupon deselects it
    if (couponCode === code) {
      setCouponCode("");
      setAppliedCoupon(null);
      return;
    }
    setCouponCode(code);
    setAppliedCoupon(null); // reset — requires re-apply or direct checkout
  };

  const handleCheckout = () => {
    const couponToSend = appliedCoupon ?? couponCode.trim() ?? null;
    checkout(couponToSend || null, {
      onSuccess: (data) => {
        if (data?.checkoutId)
          localStorage.setItem("checkoutId", data.checkoutId);
        navigate("/address");
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message || "Checkout failed");
      },
    });
  };

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

      {/* Coupon Input */}
      <div className="flex flex-col gap-2">
        <form onSubmit={handleApplyCoupon} className="flex gap-2">
          <input
            type="text"
            placeholder="Enter coupon code"
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

        {/* Toggle available coupons */}
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

        {/* Coupons Panel */}
        {panelOpen && (
          <div className="flex flex-col gap-2 pt-1">
            {couponsLoading ? (
              // Skeleton
              <div className="h-20 rounded-md bg-gray-100 animate-pulse" />
            ) : coupons.length === 0 ? (
              <p className="text-xs text-gray-400 text-center py-3">
                No coupons available
              </p>
            ) : (
              coupons.map((c) => {
                const isSelected = couponCode === c.code;
                return (
                  <div
                    key={c.code}
                    onClick={() => handleSelectCoupon(c.code)}
                    className={`border-2 border-dashed rounded-md px-3 py-2.5 cursor-pointer transition-all flex items-start gap-3
                      ${
                        isSelected
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 hover:border-blue-400 hover:bg-blue-50"
                      }`}
                  >
                    {/* Left */}
                    <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                      <span className="font-mono text-sm font-semibold text-gray-900 tracking-wide">
                        {c.code}
                      </span>
                      <span className="text-[11px] font-medium text-gray-500">
                        {c.ruleName}
                      </span>
                      <span className="text-[10px] text-blue-500">
                        Applies to {c.appliesTo}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        Valid till {formatExpiry(c.endDate)}
                      </span>
                    </div>

                    {/* Right */}
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-full
                          ${isSelected ? "bg-green-100 text-green-700" : "bg-orange-50 text-orange-600"}`}
                      >
                        {getRuleLabel(c)} up to ₹{c.maxDiscountAmount}
                      </span>

                      {/* Check circle */}
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all
                          ${
                            isSelected
                              ? "bg-green-500 border-green-500"
                              : "border-gray-300"
                          }`}
                      >
                        {isSelected && (
                          <Check
                            className="w-2.5 h-2.5 text-white"
                            strokeWidth={3}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>

      {/* Checkout */}
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
