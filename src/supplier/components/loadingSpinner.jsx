// src/components/shared/LoadingSpinner.jsx
import React from "react";
import { Loader2 } from "lucide-react";

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center h-64">
      <Loader2 className="h-12 w-12 animate-spin text-[var(--color-secondary)]" />
      <p className="mt-4 text-[var(--color-black)]/70">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
