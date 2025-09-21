export const demographicsStepFields = [
  "orchardName",
  "orchardSizeKanals",
  "orchardSizeMarlas",
  "establishmentYear",
  "plantationPattern",
  "ownershipType",
  "orchardDistrict",
  "orchardTehsil",
  "orchardZone",
  "orchardPincode",
  "gps",
];

export const varietyPlantingStepFields = [
  "varietiesPlanted",
  "totalTrees",
  "treesPerVariety",
  "rootstock",
  "plantDensity",
  "ageUnder5",
  "age5to10",
  "ageAbove10",
];

export const soilWaterStepFields = [
  "soilType",
  "pH",
  "N",
  "P",
  "K",
  "organicCarbon",
  "micronutrients",
  "soilHealthStatus",
  "lastSoilTestDate",
  "waterSource",
  "irrigationMethod",
  "waterAvailability",
  "soilTestReport",
];

export const cropNutritionStepFields = [
  "fertilizerPractices",
  "fertigationFacilities",
  "nutritionPlan",
  "mulching",
  "lastFertiliserApplicationDate",
  "fertiliserApplicationMode",
];

export const plantProtectionStepFields = [
  "diseaseHistory",
  "pestHistory",
  "spraySchedule",
  "cropInsuranceCoverage",
];

export const farmInfrastructureStepFields = [
  "equipmentOwned",
  "storageFacilities",
  "farmLabor",
  "otherTools",
];
export const orchardRegistrationDefaultFields = [
  ...demographicsStepFields,
  ...varietyPlantingStepFields,
  ...soilWaterStepFields,
  ...cropNutritionStepFields,
  ...plantProtectionStepFields,
  ...farmInfrastructureStepFields,
];
