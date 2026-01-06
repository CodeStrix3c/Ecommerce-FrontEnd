import axiosInstance from "@/api/axiosInstance";

export const getExpertCardsData = async () => {
  const {data} =  await axiosInstance.get("/data/talkWithExpert/expertCardsData.json", {
    auth: false,
   });

  return data;
};