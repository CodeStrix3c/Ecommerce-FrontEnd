import axiosInstance from "@/api/axiosInstance";

export const harvestData = async () => {
  const { data } = await axiosInstance.get("/data/harvestPage/harvestData.json", {
    auth: false,
  });

  return data;
};




