import React from "react";
import clsx from "clsx";

/**
 * Root card container
 */
export const Card = ({ className, children }) => (
  <div
    className={clsx(
      "rounded-2xl shadow-md bg-[var(--color-white)] text-[var(--color-black)] border border-[var(--color-gray)] transition hover:shadow-lg",
      className
    )}
  >
    {children}
  </div>
);

/**
 * Card header section
 */
export const CardHeader = ({ className, children }) => (
  <div
    className={clsx(
      "flex flex-row items-center justify-between px-4 py-3 border-b border-[var(--color-gray)]",
      className
    )}
  >
    {children}
  </div>
);

/**
 * Card title (text inside header)
 */
export const CardTitle = ({ className, children }) => (
  <h3
    className={clsx(
      "text-sm font-semibold text-[var(--color-black)] flex items-center gap-2",
      className
    )}
  >
    {children}
  </h3>
);

/**
 * Card content section
 */
export const CardContent = ({ className, children }) => (
  <div className={clsx("p-4", className)}>{children}</div>
);
