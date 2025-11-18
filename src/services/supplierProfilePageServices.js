import axiosInstance from "@/api/axiosInstance";

export const supplierData = async () => {
  const { data } = await axiosInstance.get("/data/supplierProfilePage/supplierData.json", {
   
    auth: false,
  });

  return data;
};