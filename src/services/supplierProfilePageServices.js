import axiosInstance from "@/api/client/axiosInstance";

export const supplierData = async () => {
  const { data } = await axiosInstance.get("/data/supplierProfilePage/supplierData.json", {
   
    auth: false,
  });

  return data;
};