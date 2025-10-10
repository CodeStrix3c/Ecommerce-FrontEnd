import PaymentOptions from "@/features/places/components/PaymentOptions";
import { useCartList } from "@/providers/CartListProvider";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { ChevronDown, ChevronUp, Tag } from "lucide-react";

// Quantity selector component
const QuantitySelector = ({ quantity, setQuantity }) => (
  <div className="flex items-center rounded-lg border border-black bg-[var(--color-white)] text-[var(--color-black)]">
    <button
      className="flex h-7 w-7 items-center justify-center rounded-l-full font-bold hover:bg-[var(--color-black-hover)]"
      onClick={() => setQuantity(Math.max(1, quantity - 1))}
    >
      −
    </button>
    <span className="px-2 font-semibold">{quantity}</span>
    <button
      className="flex h-7 w-7 items-center justify-center rounded-r-full font-bold hover:bg-[var(--color-black-hover)]"
      onClick={() => setQuantity(quantity + 1)}
    >
      +
    </button>
  </div>
);

// Payment dropdown component
const PaymentDropdown = ({
  selectedPayment,
  setSelectedPayment,
  showPayment,
  setShowPayment,
  getPaymentLabel,
}) => (
  <div className="mt-3">

    {(
      <div className="mt-3 ">
        <PaymentOptions
          selected={selectedPayment}
          onChange={(method) => {
            setSelectedPayment(method);
            setShowPayment(false);
          }}
        />
      </div>
    )}
  </div>
);

const BookingWidget = ({ place }) => {
  const [quantity, setQuantity] = useState(1);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("");
  const { cartList, toggleCartList } = useCartList();
  const isCartListed = cartList.some((item) => item._id === place._id);

  const handleAddToCart = () => {
    toggleCartList(place);
    toast.info(
      isCartListed
        ? `${place.title} removed from your cart`
        : `${place.title} added to your cart`
    );
  };

  const handleBuyNow = () => {
    if (!selectedPayment) {
      toast.error("Please select a payment method before proceeding!");
      return;
    }
    toast.success(
      `Proceeding to checkout for ${quantity} × ${place.title} via ${getPaymentLabel(
        selectedPayment
      )}`
    );
  };

  const getPaymentLabel = (method) => {
    switch (method) {
      case "cod":
        return "Cash on Delivery";
      case "upi":
        return "UPI";
      case "netbanking":
        return "Net Banking";
      case "card":
        return "Credit/Debit Card";
      case "wallet":
        return "Wallet";
      default:
        return "Choose Payment Method";
    }
  };

  const totalPrice = quantity * place.price;

  return (
    <div className="mx-auto max-w-2xl w-full">
      {/* Info box */}
      <div className="hidden md:flex border rounded-lg mb-4 p-4 items-center">
        <Tag color="red" />
        <p className="ms-4 font-semibold">Prices include all fees</p>
      </div>

      {/* Desktop & medium widget */}
      <div className="hidden md:flex flex-col border rounded-xl p-5 bg-[var(--color-white)] shadow-lg max-w-xl mx-auto">
        {/* Price */}
        <div className="flex px-2 items-center">
          <span className="font-bold text-[var(--color-black)] text-xl">
            ₹{place.price}
          </span>
          <span className="px-1 text-[var(--color-black)] text-sm font-bold">per unit</span>
        </div>

        {/* Quantity + Total */}
        <div className="items-center justify-between px-2 text-sm text-[var(--color-black)] mt-3">
          <div className="flex items-center mb-4">
            <p className="text-[var(--color-black)] text-[14px] font-semibold">Quantity :</p>
            <div className="flex ms-3 items-center">
              <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
            </div>
          </div>

          <div className="text-[14px] font-semibold">
            Total price: <span className="text-[14px] font-semibold">₹{totalPrice}</span>
          </div>
        </div>

        {/* Payment */}
        <PaymentDropdown
          selectedPayment={selectedPayment}
          setSelectedPayment={setSelectedPayment}
          showPayment={showPayment}
          setShowPayment={setShowPayment}
          getPaymentLabel={getPaymentLabel}
        />

        {/* Action buttons */}
        <div className="flex flex-col gap-2 mt-4">
          <button
            onClick={handleBuyNow}
            className="w-full rounded-md bg-[var(--color-primary)] py-2 md:py-3 mb-2 text-sm md:text-base font-semibold text-[var(--color-white)] transition hover:bg-[var(--color-primary-hover)]"
          >
            Buy Now
          </button>
          <button
            onClick={handleAddToCart}
            className="w-full rounded-md py-2 md:py-3 text-sm md:text-base font-medium text-[var(--color-black)] transition bg-[var(--color-black-hover)]"
          >
            {isCartListed ? "Remove from your cart" : "Add to your cart"}
          </button>
        </div>
      </div>

      {/* Mobile view - Sticky Bottom Sheet */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t bg-[var(--color-white)] p-4 shadow-lg max-h-[80vh] overflow-y-auto">
        {/* Price & Qty */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-lg font-bold text-[var(--color-black)]">₹{totalPrice}</p>
            <p className="text-xs text-[var(--color-black)]">
              {quantity} × ₹{place.price} per unit
            </p>
          </div>
          <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
        </div>

        {/* Mobile Payment Options */}
        <PaymentDropdown
          selectedPayment={selectedPayment}
          setSelectedPayment={setSelectedPayment}
          showPayment={showPayment}
          setShowPayment={setShowPayment}
          getPaymentLabel={getPaymentLabel}
        />

        {/* Mobile buttons - side by side */}
        <div className="flex gap-2 mt-3">
          <button
            onClick={handleBuyNow}
            className="flex-1 rounded-md bg-[var(--color-primary)] py-2 text-sm font-semibold text-[var(--color-white)] transition hover:bg-[var(--color-primary-hover)]"
          >
            Buy Now
          </button>
          <button
            onClick={handleAddToCart}
            className="flex-1 rounded-md py-2 text-sm font-medium text-[var(--color-black)] transition bg-[var(--color-black-hover)]"
          >
            {isCartListed ? "Remove from your cart" : "Add to your cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingWidget;
