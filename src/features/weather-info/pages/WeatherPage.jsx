import SecondarySearchBar from "@/components/shared/SecondarySearchBar";
import {
  Sun,
  CloudRain,
  CloudSun,
  Droplet,
  Thermometer,
  Wind,
  Eye,
  Gauge,
  Sunrise,
  Sunset,
  Moon,
} from "lucide-react";
import WeatherHighlights from "../components/WeatherHighligts";
import WeatherHourlyForecast from "../components/WeatherHourlyForecast";
import WeatherWeeklyForecast from "../components/WeatherWeeklyForecast";

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
    <div className="weather-container lg:mt-20 max-w-5xl mx-auto sm:px-4 px-3">
   
      <header className="mb-10 text-center">
        <h1 className="lg:mt-28 text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--color-black)]">
          🌤️ Weather Update
        </h1>
        <p className="text-[var(--color-black)] mt-4 sm:mt-6 text-base sm:text-xl pb-4 sm:pb-5">
          Stay ahead with the latest weather forecast
        </p>
        <div className="max-w-sm mx-auto w-full">
          <SecondarySearchBar />
        </div>
      </header>

      <div className="p-3 sm:p-5 md:p-6">
   
        <div className="flex flex-col md:flex-row justify-between items-center gap-5 sm:gap-8 text-center md:text-left">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--color-black)]">
              Srinagar
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-[var(--color-black)] mt-1">
              Tuesday, 16 Sep 2025
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-2 sm:gap-4 mt-4 sm:mt-5">
              <Sun className="text-[var(--color-secondary)] drop-shadow-lg" size={50} />
              <span className="text-base sm:text-lg md:text-xl font-medium text-[var(--color-black)]">
                Sunny
              </span>
            </div>
          </div>

          <div className="mt-6 md:mt-0">
            <h3 className="text-2xl sm:text-3xl md:text-5xl font-semibold text-[var(--color-black)]">
              22°C
            </h3>
            <p className="text-xs sm:text-sm md:text-md text-[var(--color-black)] mt-1 sm:mt-2">
              Feels like 25°C
            </p>
            <div className="flex justify-center md:justify-end gap-4 sm:gap-6 mt-3 sm:mt-4 text-[var(--color-black)]">
              <div className="flex flex-col items-center">
                <CloudRain size={22} className="text-[var(--color-secondary)]" />
                <span className="text-[10px] sm:text-xs">Rain: 10%</span>
              </div>
              <div className="flex flex-col items-center">
                <CloudSun size={22} className="text-[var(--color-secondary)]" />
                <span className="text-[10px] sm:text-xs">Wind: 8 km/h</span>
              </div>
              <div className="flex flex-col items-center">
                <Droplet size={22} className="text-[var(--color-secondary)]" />
                <span className="text-[10px] sm:text-xs">Humidity: 60%</span>
              </div>
            </div>
          </div>
        </div>

        
        <div className="mt-10 sm:mt-12 text-center md:text-left">
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-[var(--color-black)]">
            Partly Cloudy
          </h3>
          <p className="mt-2 text-xs sm:text-sm md:text-base text-[var(--color-black)]">
            Isolated thunderstorms · Precipitation: 30%
          </p>
        </div>

      
        <div className="mt-8 sm:mt-10">
          <WeatherHighlights />
        </div>

      
        <div className="mt-8 sm:mt-10 space-y-8">
          <WeatherHourlyForecast />
          <WeatherWeeklyForecast />
        </div>

     
        <div className="mt-8 sm:mt-10">
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-[var(--color-black)] mb-3 sm:mb-4">
            Atmospheric & Precipitation
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                icon: <Thermometer />,
                title: "Feels Like",
                desc: "25°C · Warm & Pleasant",
              },  {
                icon: <Wind />, title: "Wind", desc: "8 km/h · Gentle Breeze",
              },
              {
                icon: <Sun />,
                title: "UV Index",
                desc: "5 (Moderate) · Apply sunscreen outdoors",
              },
              {
                icon: <Eye />,
                title: "Visibility",
                desc: "8 km · Clear conditions",
              },
              {
                icon: <Droplet />,
                title: "Humidity",
                desc: "60% · Slightly humid",
              },
              {
                icon: <Gauge />,  title: "Pressure",   desc: "1012 hPa · Stable atmosphere",
              },
              {
                icon: <Sunrise />,
                title: "Sunrise",   desc: "06:12 AM",
              },
              {
                icon: <Sunset />,
                title: "Sunset", desc: "06:48 PM",
              },
              {
                icon: <Moon />,
                title: "Moon Phase",
                desc: "Waxing Gibbous · 78% Illumination",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="weather-card flex items-start gap-3 shadow-sm p-4 sm:p-6 rounded-xl backdrop-blur-sm"
              >
                <div className="text-[var(--color-secondary)] w-6 h-6 sm:w-7 sm:h-7">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--color-black)] text-sm sm:text-base">
                    {item.title}
                  </h4>
                  <p className="mt-1 text-[var(--color-black)] text-xs sm:text-sm md:text-base opacity-90">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

   
      <div className="text-sm text-center justify-center mt-6 sm:mt-8 pb-6 sm:pb-8">
        <h6 className="font-semibold text-[var(--color-black)]">Open Map</h6>
        <p className="text-[var(--color-black)] mt-1">Weather for Srinagar</p>
        <h6 className="text-[var(--color-black)] mt-2 opacity-80">
          *Learn more about weather data and map data
        </h6>
      </div>
    </div>
  );
}
