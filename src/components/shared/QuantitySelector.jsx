import React from "react";
import { Plus, Minus } from "lucide-react";

const QuantitySelector = ({ quantity, setQuantity }) => {
  return (
    <div className="flex items-center rounded-lg border border-[var(--color-black)] bg-[var(--color-white)] text-[var(--color-black)]">
      <button
        className="flex h-7 w-7 items-center justify-center rounded-l-full hover:bg-[var(--color-black-hover)]"
        onClick={() => setQuantity(Math.max(1, quantity - 1))}
      >
        <Minus className="w-3 h-3" />
      </button>

      <span className="px-2 font-semibold">{quantity}</span>

      <button
        className="flex h-7 w-7 items-center justify-center rounded-r-full hover:bg-[var(--color-black-hover)]"
        onClick={() => setQuantity(quantity + 1)}
      >
        <Plus className="w-3 h-3" />
      </button>
    </div>
  );
};

export default QuantitySelector;
