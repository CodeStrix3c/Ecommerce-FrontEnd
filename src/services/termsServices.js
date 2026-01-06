import axiosInstance from "@/api/axiosInstance";

export const termsData = async () => {
  const { data } = await axiosInstance.get("/data/terms/termsData.json", {
    auth: false,
  });

  return data;
};