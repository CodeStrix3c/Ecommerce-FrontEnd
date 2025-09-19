import { useMemo } from "react";

// Indices of soil test fields in orchardRegistrationDefaultFields
const SOIL_TEST_INDICES = [20, 21, 22, 23, 24, 25, 31]; // pH, N, P, K, organicCarbon, micronutrients, soilTestReport

export const useProgress = (values, requiredFieldsLength) => {
  return useMemo(() => {
    // Extract soil test values
    const soilTestValues = SOIL_TEST_INDICES.map((i) => values[i]);
    const [pH, N, P, K, organicCarbon, micronutrients, soilTestReport] =
      soilTestValues;

    // Check if all numeric fields are filled
    const allNumericFilled = [pH, N, P, K, organicCarbon, micronutrients].every(
      (val) => val !== undefined && val !== null && val !== ""
    );
    // Check if file is uploaded
    const fileUploaded =
      soilTestReport !== undefined && soilTestReport !== null;

    let filledCount = 0;

    for (let i = 0; i < values.length; i++) {
      // If this is a soil test field, handle as a group
      if (SOIL_TEST_INDICES.includes(i)) {
        if (fileUploaded || allNumericFilled) {
          // Count all soil test fields as filled
          if (i === SOIL_TEST_INDICES[0])
            filledCount += SOIL_TEST_INDICES.length;
          // Skip the rest
          continue;
        } else {
          // Only count individually if not file/numeric group
          if (i !== SOIL_TEST_INDICES[SOIL_TEST_INDICES.length - 1]) {
            const val = values[i];
            if (val !== undefined && val !== null && val !== "") filledCount++;
          } else {
            // For file field
            if (fileUploaded) filledCount++;
          }
          continue;
        }
      }
      // Normal field logic
      const value = values[i];
      if (value !== undefined && value !== null && value !== "") filledCount++;
    }

    // Calculate progress percentage
    let progress = (filledCount / (requiredFieldsLength || 1)) * 100;

    // Cap at 100%
    if (progress > 100) progress = 100;

    return {
      filledCount,
      requiredFieldsLength,
      progress,
      allNumericFilled,
      fileUploaded,
    };
  }, [values, requiredFieldsLength]);
};
