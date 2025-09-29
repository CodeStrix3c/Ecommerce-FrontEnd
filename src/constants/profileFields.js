export const PROFILE_FIELDS = [
  "fullName",
  "phone",
  "email",
  "password",
  "confirmPassword",
  "age",
  "gender",
];

export const OTP_FIELDS = ["otp"];
export const EDUCATION_FIELDS = [
  "highestQualification",
  "instituteName",
  "passingYear",
  "specialization",
];
export const PROFESSION_FIELDS = [
  "professionType",
  "organizationName",
  "designation",
  "experienceYears",
  "skills",
];

export const ADDRESS_FIELDS = [
  "village",
  "tehsil",
  "district",
  "state",
  "pincode",
  "gps",
];

export const ALL_PROFILE_FIELDS = [
  ...PROFILE_FIELDS,
  ...OTP_FIELDS,
  ...ADDRESS_FIELDS,
  ...EDUCATION_FIELDS,
  ...PROFESSION_FIELDS,
];

export const getFilledFieldsCount = (farmer) => {
  return ALL_PROFILE_FIELDS.filter(
    (field) =>
      farmer?.[field] !== undefined &&
      farmer[field] !== null &&
      farmer[field].toString().trim() !== ""
  ).length;
};

export const isProfileComplete = (farmer) =>
  getFilledFieldsCount(farmer) === ALL_PROFILE_FIELDS.length;
