import React from "react";
import {
  Landmark,
  Smartphone,
  Wallet,
  CreditCard,
  IndianRupee,
} from "lucide-react";

const PaymentOptions = ({ selected, onChange }) => {
  const options = [
    { id: "cod", label: "Cash on Delivery", icon: <IndianRupee size={20} /> },
    { id: "upi", label: "UPI", icon: <Smartphone size={20} /> },
    { id: "netbanking", label: "Net Banking", icon: <Landmark size={20} /> },
    { id: "card", label: "Credit/Debit Card", icon: <CreditCard size={20} /> },
    { id: "wallet", label: "Wallet", icon: <Wallet size={20} /> },
  ];

  return (
    <div className="flex flex-col gap-2">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onChange(option.id)}
          className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition
            ${
              selected === option.id
                ? "bg-[var(--color-white-hover)] text-[var(--color-primary)] font-semibold"
                : "text-[var(--color-neutral-dark)] hover:bg-[var(--color-white-hover)]"
            }`}
        >
          {option.icon}
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default PaymentOptions;
