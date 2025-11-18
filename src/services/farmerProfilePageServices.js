import axiosInstance from "@/api/axiosInstance";

export const getFarmerData = async () => {
  const { data } = await axiosInstance.get("/data/farmerProfilePage/farmerProfileData.json", {
    auth: false,
  });

  return data;
};