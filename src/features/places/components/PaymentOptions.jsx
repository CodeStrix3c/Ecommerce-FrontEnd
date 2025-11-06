import React, { useState } from "react";
import {
  Landmark,
  Smartphone,
  Wallet,
  CreditCard,
  IndianRupee,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const PaymentOptions = ({ selected, onChange }) => {
  const [showPayment, setShowPayment] = useState(false);

  const options = [
    { id: "cod", label: "Cash on Delivery", icon: <IndianRupee size={18} /> },
    { id: "upi", label: "UPI", icon: <Smartphone size={18} /> },
    { id: "netbanking", label: "Net Banking", icon: <Landmark size={18} /> },
    { id: "card", label: "Credit/Debit Card", icon: <CreditCard size={18} /> },
    { id: "wallet", label: "Wallet", icon: <Wallet size={18} /> },
  ];

  const getPaymentLabel = (method) => {
    const option = options.find((opt) => opt.id === method);
    return option ? option.label : "Choose Payment Method";
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <button
        onClick={() => setShowPayment((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-md border  bg-[var(--color-white)] px-3 py-2 text-sm hover:bg-[var(--color-black-hover)]"
      >
        <span>{getPaymentLabel(selected)}</span>
        {showPayment ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {showPayment && (
        <div className="mt-1 flex flex-col ">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => {
                onChange(option.id);
                setShowPayment(false);
              }}
              className={`flex items-center gap-2 py-3 text-sm
                ${selected === option.id ? "bg-[var(--black-hover)] " : ""}`}
            >
              {option.icon}
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentOptions;
