import axiosInstance from "@/api/axiosInstance";

export const getAboutUsData = async () => {
  const { data } = await axiosInstance.get("/data/aboutUs/aboutUsData.json", {
    auth: false,
  });

  return data;
};

