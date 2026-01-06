import axiosInstance from "@/api/axiosInstance";

export const privacyData = async () => {
  const { data } = await axiosInstance.get("/data/privacy/privacyData.json", {
    auth: false,
  });

  return data;
};