import weatherInstance from "@/api/weatherInstance";

export const fetchWeather = async (query = "pulwama") => {
  const { data } = await weatherInstance.get(
    `&q=${query}&days=7&aqi=no&alerts=no`,
    query
  );

  return data;
};
