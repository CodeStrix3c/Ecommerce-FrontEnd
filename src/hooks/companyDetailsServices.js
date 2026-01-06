import axiosInstance from "@/api/axiosInstance";

export const companyDetailsData = async () => {
  const { data } = await axiosInstance.get("/data/companyDetails/companyDetails.json", {
    auth: false,
  });

  return data;
};