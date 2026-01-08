import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LoginPromptModal = ({ open, onClose }) => {
  const navigate = useNavigate();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-overlay)] px-4">
      <div className="relative w-full max-w-md rounded-2xl bg-[var(--color-white)] shadow-xl">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 hover:bg-[var(--color-black-hover)]"
        >
          <X className="h-5 w-5 text-[var(--color-black)]" />
        </button>

        {/* Content */}
        <div className="px-6 pt-10 pb-8 text-center">
          <h2 className="mb-2 text-xl font-semibold text-[var(--color-black)]">
            Login to continue
          </h2>

          <p className="mb-6 text-sm text-[var(--color-black)] opacity-80">
            Sign in to complete your purchase and manage your orders.
          </p>

          {/* Primary CTA */}
          <button
            onClick={() => navigate("/login")}
            className="mb-3 w-full rounded-lg bg-[var(--color-primary)] py-3 text-sm font-semibold text-[var(--color-white)] transition hover:bg-[var(--color-primary-hover)]"
          >
            Continue to Login
          </button>

          {/* Secondary CTA */}
          <button
            onClick={onClose}
            className="w-full rounded-lg bg-[var(--color-black-hover)] py-3 text-sm font-medium text-[var(--color-black)] transition hover:opacity-80"
          >
            Continue browsing
          </button>

          {/* Sub text */}
          <p className="mt-5 text-xs text-[var(--color-black)] opacity-60">
            New here? You can create an account after logging in.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPromptModal;
