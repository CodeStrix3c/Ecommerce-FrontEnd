import axiosInstance from "@/api/client/axiosInstance";

export const getAboutUsData = async () => {
  const { data } = await axiosInstance.get("/data/aboutUs/aboutUsData.json", {
    auth: false,
  });

  return data;
};

