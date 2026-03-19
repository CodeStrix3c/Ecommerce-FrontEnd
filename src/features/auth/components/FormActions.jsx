import { Loader2 } from "lucide-react";
import React from "react";

export default function FormActions({
  cancelLabel,
  submitLabel = "Submit",
  onSubmit,
  onCancel,
  disabled = false,
  loading = false,
}) {
  const showCancel = Boolean(cancelLabel && onCancel);
  const isDisabled = disabled || loading;

  return (
    <div className=" flex gap-3 justify-end">
      {/* Cancel Button */}
      {showCancel && (
        <button
          type="button"
          onClick={onCancel}
          disabled={isDisabled}
          className="
            inline-flex
            items-center
            justify-center
            px-4 py-1.5
            text-md font-medium
            rounded-md
            border border-[var(--color-black)]
            text-[var(--color-black)]
         
           
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          {cancelLabel}
        </button>
      )}

      {/* Submit Button */}
      <button
        type="button"
        onClick={onSubmit}
        disabled={isDisabled}
        className="
    inline-flex
    items-center
    justify-center
    gap-2
    px-4 py-1.5
    text-md font-medium
    rounded-md
    bg-[var(--color-primary)]
      text-[var(--color-white)]
    hover:bg-[var(--color-primary-hover)]
    disabled:opacity-50
    disabled:cursor-not-allowed
  "
      >
        {loading && (
          <Loader2
            height={18}
            width={18}
            color="#ffffff"
            secondaryColor="#ffffff"
            strokeWidth={4}
            strokeWidthSecondary={4}
            visible={true}
            ariaLabel="loading"
          />
        )}

        {loading ? "Processing..." : submitLabel}
      </button>
    </div>
  );
}
