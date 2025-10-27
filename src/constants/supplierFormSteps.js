export const BUSINESS_INFORMATION_FIELDS = [
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

export const LICENSING_COMPLIANCE_FIELDS = [
  "dealerLicenseNumber",
  "licenseValidityStart",
  "licenseValidityEnd",
  "licenseCopy",
  "gstNumber",
  "pan",
];

export const PRODUCT_PORTFOLIO_FIELDS = [
  "inputsSold",
  "majorBrands",
  "otherInputs",
  "storageCapacity",
];

export const OPERATIONAL_DETAILS_FIELDS = [
  "yearsInBusiness",
  "distributorTieUps",
  "deliveryService",
  "serviceArea",
  "averageMonthlySales",
];

export const FINANCIAL_PAYMENT_FIELDS = [
  "sellingViaZiraat",
  "bankDetails",
  "upiAvailable",
  "creditFacility",
];

export const SUPPORT_SERVICES_FIELDS = [
  "advisorySupport",
  "fieldStaffAvailable",
  "fieldStaffCount",
  "afterSalesService",
  "deliveryRange",
  "computerAvailable",
  "vehicleAvailable",
];

export const VERIFICATION_RATINGS_FIELDS = [];

export const ALL_SUPPLIER_PROFILE_FIELDS = [
  ...BUSINESS_INFORMATION_FIELDS,
  ...LICENSING_COMPLIANCE_FIELDS,
  ...PRODUCT_PORTFOLIO_FIELDS,
  ...OPERATIONAL_DETAILS_FIELDS,
  ...FINANCIAL_PAYMENT_FIELDS,
  ...SUPPORT_SERVICES_FIELDS,
  ...VERIFICATION_RATINGS_FIELDS,
];

export const getFilledSupplierFieldsCount = (supplier) => {
  return ALL_SUPPLIER_PROFILE_FIELDS.filter(
    (field) =>
      supplier?.[field] !== undefined &&
      supplier[field] !== null &&
      supplier[field].toString().trim() !== ""
  ).length;
};

export const isSupplierProfileComplete = (supplier) =>
  getFilledSupplierFieldsCount(supplier) === ALL_SUPPLIER_PROFILE_FIELDS.length;
