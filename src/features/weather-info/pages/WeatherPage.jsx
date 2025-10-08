import SecondarySearchBar from "@/components/shared/SecondarySearchBar";
import {
  Sun,
  CloudRain,
  CloudSun,
  Droplet,
  Wind,
  Eye,
  Gauge,
  Sunrise,
  Sunset,
  Zap,
  Cloud,
} from "lucide-react";
import WeatherHighlights from "../components/WeatherHighligts";
import WeatherHourlyForecast from "../components/WeatherHourlyForecast";
import WeatherWeeklyForecast from "../components/WeatherWeeklyForecast";
import ContentWrapper from "@/components/shared/ContentWrapper";

export default function WeatherPage() {
  const dailyInsights = {
    minTemp: 18,
    maxTemp: 27,
    rainChance: "30%",
    summary: "Partly Cloudy with scattered showers in the afternoon.",
    sunrise: "06:12 AM",
    sunset: "06:48 PM",
  };

  return (
    <ContentWrapper compactScreen>
      <div className=" pt-1 lg:mt-20">
        <header className="mb-10 text-center">
          <h1 className="lg:mt-24 text-3xl sm:text-4xl font-bold text-[var(--color-black)]">
             Weather Update
          </h1>
          <p className="text-[var(--color-black)] mt-6 text-xl pb-5">
            Stay ahead with the latest weather forecast
          </p>
          <SecondarySearchBar/>
        </header>

        <div className="p-4 sm:p-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-10">
            <div className="text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(color-black)]">
                Srinagar
              </h2>
              <p className="text-base sm:text-lg text-[var(--color-black)] mt-1">
                Tuesday, 16 Sep 2025
              </p>
              <div className="flex items-center justify-center md:justify-start gap-3 sm:gap-4 mt-4 sm:mt-6">
                <Sun
                  className="text-[var(--color-secondary)] drop-shadow-lg"
                  size={60}
                />
                <span className="text-lg sm:text-xl font-medium text-[var(--color-black)]">
                  Sunny
                </span>
              </div>
            </div>

            <div className="text-center md:text-right">
              <h3 className="text-4xl sm:text-5xl font-bolder text-[var(--color-black)]">
                22°C
              </h3>
              <p className="text-sm sm:text-md text-[var(--color-black)] mt-2 sm:mt-3">
                Feels like 25°C
              </p>
              <div className="flex justify-center md:justify-end gap-4 sm:gap-6 mt-3 sm:mt-4 text-[var(--color-black)]">
                <div className="flex flex-col items-center">
                  <CloudRain
                    size={26}
                    className="text-[var(--color-secondary)]"
                  />
                  <span className="text-xs sm:text-sm">Rain: 10%</span>
                </div>
                <div className="flex flex-col items-center">
                  <CloudSun
                    size={26}
                    className="text-[var(--color-secondary)]"
                  />
                  <span className="text-xs sm:text-sm">Wind: 8 km/h</span>
                </div>
                <div className="flex flex-col items-center">
                  <Droplet
                    size={26}
                    className="text-[var(--color-secondary)]"
                  />
                  <span className="text-xs sm:text-sm">Humidity: 60%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center md:text-left">
            <h3 className="text-lg sm:text-xl font-bold text-[var(--color-black)]">
              Partly Cloudy
            </h3>
            <p className="mt-2 text-sm sm:text-base text-[var(--color-black)]">
              Isolated thunderstorms · Precipitation: 30%
            </p>
          </div>

          <WeatherHighlights />

          <WeatherHourlyForecast />

          <div className="mt-8 sm:mt-10">
            <h3 className="text-lg sm:text-xl font-bold text-[var(--color-black)] mb-3 sm:mb-4">
              Daily Insights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="backdrop-blur-sm shadow-sm p-4 sm:p-6">
                <h4 className="font-semibold text-[var(--color-black)]">
                  Temperature
                </h4>
                <p className="mt-2 text-[var(--color-black)] text-sm sm:text-base">
                  Min: {dailyInsights.minTemp}°C · Max: {dailyInsights.maxTemp}
                  °C
                </p>
              </div>
              <div className="shadow-sm p-4 sm:p-6">
                <h4 className="font-semibold text-[var(--color-black)]">
                  Rain Chances
                </h4>
                <p className="mt-2 text-[var(--color-black)] text-sm sm:text-base">
                  {dailyInsights.rainChance}
                </p>
              </div>
              <div className="shadow-sm p-4 sm:p-6 md:col-span-2">
                <h4 className="font-semibold text-[var(--color-black)]">
                  Summary
                </h4>
                <p className="mt-2 text-[var(--color-black)] text-sm sm:text-base">
                  {dailyInsights.summary}
                </p>
              </div>
            </div>
          </div>

          <WeatherWeeklyForecast />
        </div>
      </div>
    </ContentWrapper>
  );
}
