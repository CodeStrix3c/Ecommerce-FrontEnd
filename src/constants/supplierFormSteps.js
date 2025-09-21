export const businessInformationStepFields = [
  "businessName",
  "ownerName",
  "primaryContact",
  "alternateContact",
  "email",
  "businessAddressVillage",
  "businessAddressTehsil",
  "businessAddressDistrict",
  "businessAddressState",
  "businessAddressPincode",
  "gps",
];

export const licensingComplianceStepFields = [
  "dealerLicenseNumber",
  "licenseValidityStart",
  "licenseValidityEnd",
  "licenseCopy",
  "gstNumber",
  "pan",
];
export const productPortfolioStepFields = [
  "inputsSold",
  "majorBrands",
  "otherInputs",
  "storageCapacity",
];

export const operationalDetailsStepFields = [
  "yearsInBusiness",
  "distributorTieUps",
  "deliveryService",
  "serviceArea",
  "averageMonthlySales",
];

export const financialPaymentStepFields = [
  "sellingViaZiraat",
  "bankDetails",
  "upiAvailable",
  "creditFacility",
];

export const supportServicesStepFields = [
  "advisorySupport",
  "fieldStaffAvailable",
  "fieldStaffCount",
  "afterSalesService",
  "deliveryRange",
  "computerAvailable",
  "vehicleAvailable",
];

export const verificationRatingsStepFields = [];

export const supplierRegistrationDefaultFields = [
  ...businessInformationStepFields,
  ...licensingComplianceStepFields,
  ...productPortfolioStepFields,
  ...operationalDetailsStepFields,
  ...financialPaymentStepFields,
  ...supportServicesStepFields,
  ...verificationRatingsStepFields,
];
