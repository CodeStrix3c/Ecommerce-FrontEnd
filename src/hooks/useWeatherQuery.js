import { fetchWeather } from "@/services/weatherService";
import { useQuery } from "@tanstack/react-query";

export const useWeatherQuery = (city) => {
  return useQuery({
    queryKey: ["weather", city],
    queryFn: () => fetchWeather(city),
    enabled: !!city,
  });
};
