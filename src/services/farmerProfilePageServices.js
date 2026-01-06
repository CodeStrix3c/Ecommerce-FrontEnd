import axiosInstance from "@/api/client/axiosInstance";

export const getFarmerData = async () => {
  const { data } = await axiosInstance.get("/data/farmerProfilePage/farmerProfileData.json", {
    auth: false,
  });

  return data;
};