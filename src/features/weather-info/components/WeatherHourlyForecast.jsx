import { Sun, CloudSun, Cloud, CloudRain } from "lucide-react";

export default function WeatherHourlyForecast() {
  const hourlyForecast = [
    { time: "10 AM", icon: <Sun className="ml-20 text-[var(--color-secondary)]" size={24} />, temp: 22 },
    { time: "11 AM", icon: <Sun className="ml-20 text-[var(--color-secondary)]" size={24} />, temp: 23 },
    { time: "12 PM", icon: <CloudSun className="ml-20 text-[var(--color-secondary)]" size={24} />, temp: 25 },
    { time: "1 PM", icon: <Cloud className="ml-20 text-[var(--color-secondary)]" size={24} />, temp: 24 },
    { time: "2 PM", icon: <CloudRain className="ml-20 text-[var(--color-secondary)]" size={24} />, temp: 22 },
    { time: "3 PM", icon: <CloudSun className="ml-20 text-[var(--color-secondary)]" size={24} />, temp: 23 },
    { time: "4 PM", icon: <Sun className="ml-20 text-[var(--color-secondary)]" size={24} />, temp: 26 },
  ];

  return (
    <div className="mt-8 sm:mt-12">
      <h3 className="text-xl sm:text-xl font-bold text-[var(--color-black)] mb-3 sm:mb-4">
        Hourly Forecast
      </h3>
      <div className="flex overflow-x-auto gap-2 sm:gap-4 pb-3 sm:justify-center">
        {hourlyForecast.map((hour, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center min-w-[60px] sm:min-w-[80px] bg-[var(--color-white)] backdrop-blur-md rounded-xl shadow-sm p-2 sm:p-3"
          >
            <span className="text-xs sm:text-sm font-medium text-[var(--color-black)]">{hour.time}</span>
            <div className="mt-1 sm:mt-2">{hour.icon}</div>
            <p className="mt-1 font-semibold text-[var(--color-black)] text-xs sm:text-base">{hour.temp}°</p>
          </div>
        ))}
      </div>
    </div>
  );
}
