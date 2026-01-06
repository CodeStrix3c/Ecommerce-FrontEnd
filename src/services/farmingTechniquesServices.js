import axiosInstance from "@/api/axiosInstance";

export const farmingTechniquesData = async () => {
  const { data } = await axiosInstance.get("/data/farmingTechniques/farmingTechniques.json", {
    auth: false,
  });

  return data;
};
export const movingSectionData = async () => {
  const { data } = await axiosInstance.get("/data/farmingTechniques/movingSection.json", {
    auth: false,
  });

  return data;
};
export const cardsData = async () => {
  const { data } = await axiosInstance.get("/data/farmingTechniques/cardsData.json", {
    auth: false,
  });

  return data;
};