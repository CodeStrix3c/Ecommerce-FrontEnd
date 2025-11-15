import SecondarySearchBar from "@/components/shared/SecondarySearchBar";
import {
  Sun,
  CloudRain,
  CloudSun,
  Droplet,
  Thermometer,
  Wind,
} from "lucide-react";
import WeatherHighlights from "../components/WeatherHighligts";
import WeatherHourlyForecast from "../components/WeatherHourlyForecast";
import WeatherWeeklyForecast from "../components/WeatherWeeklyForecast";
import ContentWrapper from "@/components/shared/ContentWrapper";
import { useWeatherQuery } from "@/hooks/useWeatherQuery";
import { useState } from "react";
import Spinner from "@/components/ui/Spinner";

export default function WeatherPage() {
  const [cityData, setCityData] = useState("srinagar");
  const { data, isLoading, isError } = useWeatherQuery(cityData);

  if (isLoading) return <Spinner />;
  if (isError || !data)
    return <p className="text-center mt-20">Failed to load weather data.</p>;

  const location = data.location;
  const current = data.current;
  console.log(current,"current");
  
  const today = data.forecast.forecastday[0].day;
  const astro = data.forecast.forecastday[0].astro;

  return (
    <ContentWrapper compactScreen topSpacing>
      <div className="lg:mt-20">
        <header className="ptmb-10 text-center">
          <h1 className="lg:mt-24 text-3xl sm:text-4xl font-bold text-[var(--color-black)]">
            Weather Update
          </h1>
          <p className="text-[var(--color-black)] mt-6 text-xl pb-5">
            Stay ahead with the latest weather forecast
          </p>
          <SecondarySearchBar
            onSearch={(val) => setCityData(val)}
            placeholder="Search with city..."
          />
        </header>

        <div className="p-4 sm:p-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-10">

            <div className="mt-1 text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-black)]">
                {location.name}
              </h2>
              <p className="text-base sm:text-lg text-[var(--color-black)] mt-3 italic">
                {new Date(location.localtime).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                })}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 sm:gap-4 mt-3">
                <img
                  src={current.condition.icon}
                  alt={current.condition.text}
                  className="w-8 h-8"
                />
                <span className="text-lg sm:text-xl font-medium text-[var(--color-black)]">
                  {current.condition.text}
                </span>
              </div>
            </div>


            <div className="flex flex-col md:flex-row w-full md:w-auto">
              <div className="text-center md:text-right space-y-2 sm:space-y-3 w-full">
                <h3 className="text-3xl sm:text-5xl font-semibold text-[var(--color-black)]">
                  {current.temp_c}°C
                </h3>
                <p className="mt-2 text-sm sm:text-md text-[var(--color-black)]">
                  Feels like {current.feelslike_c}°C
                </p>

                <div className="flex flex-wrap justify-center md:justify-end gap-4 sm:gap-6 mt-3 sm:mt-5 text-[var(--color-black)]">
                  <div className="flex items-center gap-2 ">
                    <CloudRain
                      size={22}
                      className="text-[var(--color-secondary)]"
                    />
                    <span className="text-xs sm:text-sm">
                      Rain: {today.daily_chance_of_rain}%
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <CloudSun
                      size={22}
                      className="text-[var(--color-secondary)]"
                    />
                    <span className="text-xs sm:text-sm">
                      Wind: {current.wind_kph} km/h
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Droplet
                      size={22}
                      className="text-[var(--color-secondary)]"
                    />
                    <span className="text-xs sm:text-sm">
                      Humidity: {current.humidity}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="mt-10 sm:mt-10 text-center md:text-left">
            <h3 className="text-lg sm:text-xl font-bold text-[var(--color-black)]">
              {today.condition.text}
            </h3>
            <p className="mt-2 text-sm sm:text-base text-[var(--color-black)]">
              Precipitation: {today.totalprecip_mm}mm · UV Index: {today.uv}
            </p>
          </div>

          <WeatherHighlights
            visibility={current.vis_km}
            pressure={current.pressure_mb}
            sunrise={astro.sunrise}
            sunset={astro.sunset}
            uv={current.uv}
          />


          <WeatherHourlyForecast hours={data.forecast.forecastday[0].hour} />


          <div className="mt-8 sm:mt-10">
            <h3 className="ml-0 sm:ml-4 text-lg sm:text-2xl font-semibold text-[var(--color-black)] mb-3 sm:mb-4 text-center sm:text-left">
              Daily Insights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="backdrop-blur-sm shadow-sm p-4 sm:p-6 rounded-2xl">
                <h4 className="font-semibold text-[var(--color-black)]">
                  Temperature
                </h4>
                <p className="mt-2 text-[var(--color-black)] text-sm sm:text-base">
                  Min: {today.mintemp_c}°C · Max: {today.maxtemp_c}°C
                </p>
              </div>
              <div className="shadow-sm p-4 sm:p-6 rounded-2xl">
                <h4 className="font-semibold text-[var(--color-black)]">
                  Rain Chances
                </h4>
                <p className="mt-2 text-[var(--color-black)] text-sm sm:text-base">
                  {today.daily_chance_of_rain}%
                </p>
              </div>
              <div className="shadow-sm p-4 sm:p-6 md:col-span-2 rounded-2xl">
                <h4 className="font-semibold text-[var(--color-black)]">
                  Summary
                </h4>
                <p className="mt-2 text-[var(--color-black)] text-sm sm:text-base">
                  {today.condition.text}
                </p>
              </div>
            </div>
          </div>

          <WeatherWeeklyForecast forecast={data.forecast.forecastday} />
        </div>
      </div>
    </ContentWrapper>
  );
}
