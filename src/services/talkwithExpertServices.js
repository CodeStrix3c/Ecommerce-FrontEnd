import axiosInstance from "@/api/client/axiosInstance";

export const getExpertCardsData = async () => {
  const {data} =  await axiosInstance.get("/data/talkWithExpert/expertCardsData.json", {
    auth: false,
   });

  return data;
};