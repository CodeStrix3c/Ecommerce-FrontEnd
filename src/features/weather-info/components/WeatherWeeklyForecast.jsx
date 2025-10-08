import React from "react";
import { Sun, CloudSun, CloudRain, Cloud } from "lucide-react";

export default function WeatherWeeklyForecast() {
  const weeklyForecast = [
    { day: "Mon", icon: <CloudSun className="text-[var(--color-secondary)]" size={28} />, min: 18, max: 27 },
    { day: "Tue", icon: <Cloud className="text-[var(--color-secondary)]" size={28} />, min: 17, max: 24 },
    { day: "Wed", icon: <CloudRain className="text-[var(--color-secondary)]" size={28} />, min: 16, max: 22 },
    { day: "Thu", icon: <Sun className="text-[var(--color-secondary)]" size={28} />, min: 19, max: 29 },
    { day: "Fri", icon: <CloudSun className="text-[var(--color-secondary)]" size={28} />, min: 20, max: 28 },
    { day: "Sat", icon: <CloudRain className="text-[var(--color-secondary)]" size={28} />, min: 18, max: 25 },
    { day: "Sun", icon: <Sun className="text-[var(--color-secondary)]" size={28} />, min: 21, max: 30 },
  ];

  return (
    <div className="mt-8 sm:mt-10 w-full px-2 sm:px-4">
      <h3 className="text-base sm:text-xl font-bold text-[var(--color-black)] mb-3 sm:mb-5 text-center sm:text-left">
        7-Day Forecast
      </h3>

    
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex sm:grid sm:grid-cols-3 md:grid-cols-7 gap-3 sm:gap-4 min-w-[600px] sm:min-w-0">
          {weeklyForecast.map((day, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center bg-[var(--color-white)] backdrop-blur-md rounded-xl shadow-sm p-3 sm:p-4 flex-shrink-0 w-[80px] sm:w-auto"
            >
              <span className="text-xs sm:text-sm font-medium text-[var(--color-black)]">{day.day}</span>
              <div className="mt-2">{day.icon}</div>
              <div className="flex gap-1 sm:gap-2 mt-2 text-xs sm:text-sm text-[var(--color-black)]">
                <span className="font-semibold">{day.max}°</span>
                <span className="text-[var(--color-black)] opacity-70">{day.min}°</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
