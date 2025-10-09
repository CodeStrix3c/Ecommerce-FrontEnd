import { Sun, CloudSun, Cloud, CloudRain } from "lucide-react";
import React from "react";

export default function WeatherHourlyForecast() {
  const hourlyForecast = [
    { time: "10 AM", icon: <Sun />, temp: 22 },
    { time: "11 AM", icon: <Sun />, temp: 23 },
    { time: "12 PM", icon: <CloudSun />, temp: 25 },
    { time: "1 PM", icon: <Cloud />, temp: 24 },
    { time: "2 PM", icon: <CloudRain />, temp: 22 },
    { time: "3 PM", icon: <CloudSun />, temp: 23 },
    { time: "4 PM", icon: <Sun />, temp: 26 },
  ];

  return (
    <div className=" mt-7 sm:mt-12 w-full  mr-10">
      <h3 className=" text-xl sm:text-2xl font-semibold text-[var(--color-black)] mb-4 sm:mb-5 text-center sm:text-left">
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

            <div className="mt-2 sm:mt-3 text-[var(--color-secondary)]">
              {hour.icon &&
                React.cloneElement(hour.icon, {
                  size: 28,
                  className: "text-[var(--color-secondary)]",
                })}
            </div>

            <p className="mt-2 font-semibold text-[var(--color-black)] text-[13px] sm:text-base">
              {hour.temp}°
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
