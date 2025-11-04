import { Sun, Cloud, CloudSun, CloudRain } from "lucide-react";
import React from "react";

export default function WeatherHourlyForecast({ hours }) {
  const hourlyForecast = hours
    .filter((_, i) => i % 2 === 0) // show every 2 hours
    .map((hour) => ({
      time: new Date(hour.time).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      temp: hour.temp_c,
      condition: hour.condition.text,
      icon: hour.condition.icon,
    }));

  return (
    <div className="mt-7 sm:mt-12 w-full mr-10">
      <h3 className="text-xl sm:text-2xl font-semibold text-[var(--color-black)] mb-4 sm:mb-5 text-center sm:text-left">
        Hourly Forecast
      </h3>

      <div className="flex overflow-x-auto gap-7 pb-3 sm:pb-4 scrollbar-hide snap-x snap-mandatory">
        {hourlyForecast.map((hour, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center bg-[var(--color-white)]/90 backdrop-blur-md 
                       rounded-2xl border border-sm p-3 sm:p-4 flex-shrink-0 w-[72px] sm:w-[90px] snap-center 
                       transition-transform hover:scale-105 hover:shadow-lg"
          >
            <span className="text-[12px] sm:text-sm font-medium text-[var(--color-black)]">
              {hour.time}
            </span>
            <img
              src={hour.icon}
              alt={hour.condition}
              className="w-8 h-8 mt-2 sm:mt-3"
            />
            <p className="mt-2 font-semibold text-[var(--color-black)] text-[13px] sm:text-base">
              {hour.temp}°
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
