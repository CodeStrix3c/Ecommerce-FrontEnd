import { Sun, CloudSun, Cloud, CloudRain } from "lucide-react";

export default function WeatherHourlyForecast() {
  const hourlyForecast = [
    { time: "10 AM", icon: <Sun className="text-[var(--color-secondary)]" size={24} />, temp: 22 },
    { time: "11 AM", icon: <Sun className="text-[var(--color-secondary)]" size={24} />, temp: 23 },
    { time: "12 PM", icon: <CloudSun className="text-[var(--color-secondary)]" size={24} />, temp: 25 },
    { time: "1 PM", icon: <Cloud className="text-[var(--color-secondary)]" size={24} />, temp: 24 },
    { time: "2 PM", icon: <CloudRain className="text-[var(--color-secondary)]" size={24} />, temp: 22 },
    { time: "3 PM", icon: <CloudSun className="text-[var(--color-secondary)]" size={24} />, temp: 23 },
    { time: "4 PM", icon: <Sun className="text-[var(--color-secondary)]" size={24} />, temp: 26 },
  ];

  return (
    <div className="mt-8 sm:mt-12 w-full px-2 sm:px-4">
      <h3 className="text-base sm:text-xl font-bold text-[var(--color-black)] mb-3 sm:mb-4 text-center sm:text-left">
        Hourly Forecast
      </h3>

     
      <div className="flex overflow-x-auto gap-3 sm:gap-4 pb-3 scrollbar-hide snap-x snap-mandatory touch-pan-x">
        {hourlyForecast.map((hour, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center bg-[var(--color-white)] backdrop-blur-md rounded-xl shadow-sm p-3 sm:p-4 flex-shrink-0 w-[70px] sm:w-[90px] snap-center"
          >
            <span className="text-[11px] sm:text-sm font-medium text-[var(--color-black)]">{hour.time}</span>
            <div className="mt-2 sm:mt-3">{hour.icon}</div>
            <p className="mt-1 font-semibold text-[var(--color-black)] text-[12px] sm:text-base">{hour.temp}°</p>
          </div>
        ))}
      </div>
    </div>
  );
}
