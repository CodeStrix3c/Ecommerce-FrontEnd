import React from "react";
import { Link } from "react-router-dom";

export default function ProfileCompletion({
  progress,
  isComplete,
  profileCompletionLink,
}) {
  return (
    <>
      <div className="bg-[var(--color-white)] rounded-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2">
          <h3 className="text-base sm:text-lg font-semibold text-[var(--color-black)]">
            Profile Completion
          </h3>

          {!isComplete && (
            <Link
              to={profileCompletionLink}
              className="text-sm sm:text-base text-[var(--color-secondary)] font-medium mt-2 sm:mt-0 hover:text-[var(--color-secondary-hover)] transition"
            >
              Complete your profile
            </Link>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex-1 h-2 bg-[var(--color-gray)] rounded-full overflow-hidden cursor-pointer">
            <div
              className="h-2 bg-[var(--color-secondary)] rounded-full transition-all duration-500"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <span className="text-xs sm:text-sm font-semibold text-[var(--color-black)] w-10 text-right">
            {Math.round(progress * 100)}%
          </span>
        </div>
      </div>
    </>
  );
}
