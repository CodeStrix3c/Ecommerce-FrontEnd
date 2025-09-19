// useProgress.ts
import { useMemo } from "react";

export const useProgress = (values, requiredFieldsLength) => {
  console.log(values, "values in useProgress");
  console.log(requiredFieldsLength, "fields length in useProgress");

  return useMemo(() => {
    const filledCount = values.reduce((count, value) => {
      if (value === undefined || value === null) return count;
      if (typeof value === "string" && value.trim() === "") return count;
      if (Array.isArray(value) && value.length === 0) return count;
      return count + 1;
    }, 0);
    return Math.round((filledCount / requiredFieldsLength) * 100);
  }, [values, requiredFieldsLength]);
};
