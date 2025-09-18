import React from "react";
import { Sun, CloudSun, CloudRain, Cloud } from "lucide-react";

export default function WeatherWeeklyForecast() {
  const weeklyForecast = [
    { day: "Wed", icon: <CloudSun className="text-[var(--color-secondary)]" size={28} />, min: 18, max: 27 },
    { day: "Thu", icon: <Cloud className="text-[var(--color-secondary)]" size={28} />, min: 17, max: 24 },
    { day: "Fri", icon: <CloudRain className="text-[var(--color-secondary)]" size={28} />, min: 16, max: 22 },
    { day: "Sat", icon: <Sun className="text-[var(--color-secondary)]" size={28} />, min: 19, max: 29 },
    { day: "Sun", icon: <CloudSun className="text-[var(--color-secondary)]" size={28} />, min: 20, max: 28 },
    { day: "Mon", icon: <CloudRain className="text-[var(--color-secondary)]" size={28} />, min: 18, max: 25 },
    { day: "Tue", icon: <Sun className="text-[var(--color-secondary)]" size={28} />, min: 21, max: 30 },
  ];

  return (
    <div className="mt-10 sm:mt-12">
      <h3 className="text-lg sm:text-xl font-bold text-[var(--color-black)] mb-3 sm:mb-4">7-Day Forecast</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-3 sm:gap-4">
        {weeklyForecast.map((day, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center bg-[var(--color-white)] backdrop-blur-md rounded-xl shadow-sm p-3 sm:p-4"
          >
            <span className="text-xs sm:text-sm font-medium text-[var(--color-black)]">{day.day}</span>
            <div className="mt-2">{day.icon}</div>
            <div className="flex gap-1 sm:gap-2 mt-2 text-xs sm:text-sm text-[var(--color-black)]">
              <span className="font-semibold">{day.max}°</span>
              <span className="text-[var(--color-black)]">{day.min}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
