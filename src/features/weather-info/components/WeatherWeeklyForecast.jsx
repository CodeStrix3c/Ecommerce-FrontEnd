import { Sun, CloudSun, CloudRain, Cloud, Search, MapPin } from "lucide-react";

export default function WeeklyForecastPage() {
  const weeklyForecast = [
    { day: "Mon", icon: <CloudSun size={32} />, min: 18, max: 27, desc: "Partly Cloudy" },
    { day: "Tue", icon: <Cloud size={32} />, min: 17, max: 24, desc: "Overcast" },
    { day: "Wed", icon: <CloudRain size={32} />, min: 16, max: 22, desc: "Rain Showers" },
    { day: "Thu", icon: <Sun size={32} />, min: 19, max: 29, desc: "Sunny" },
    { day: "Fri", icon: <CloudSun size={32} />, min: 20, max: 28, desc: "Mostly Sunny" },
    { day: "Sat", icon: <CloudRain size={32} />, min: 18, max: 25, desc: "Light Rain" },
    { day: "Sun", icon: <Sun size={32} />, min: 21, max: 30, desc: "Clear Sky" },
  ];

  return (
    <div className="min-h-screen text-[var(--color-black)] flex flex-col items-center px-4 sm:px-8 justify-end">

      <div className="w-full max-w-5xl mt-8 sm:mt-12">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center sm:text-left mb-6">
          7-Day Weather Forecast
        </h2>

        
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {weeklyForecast.map((day, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center bg-[var(--color-white)] backdrop-blur-lg rounded-2xl shadow-sm p-4 sm:p-5 
                         hover:scale-105 transition-transform text-[var(--color-black)]"
            >
             
              <span className="text-sm sm:text-base font-semibold">
                {day.day}
              </span>

             
              <div className="mt-3 text-[var(--color-secondary)]">
                {day.icon}
              </div>

         
              <p className="mt-2 text-xs sm:text-sm italic">{day.desc}</p>

        
              <div className="flex gap-1 sm:gap-2 mt-3 text-sm sm:text-base">
                <span className="font-semibold">{day.max}°</span>
                <span className="opacity-75">{day.min}°</span>
              </div>
            </div>
          ))}
        </div>
      </div>


      <div className="w-full max-w-4xl mt-10 sm:mt-12">
        <div className="backdrop-blur-lg rounded-2xl text-center sm:text-left">
          <h3 className="text-lg sm:text-xl font-semibold mb-2">
            Weekly Temperature Overview
          </h3>
          <p className="text-sm sm:text-base text-justify">
            Expect mostly warm conditions this week with a mix of sunny and cloudy days. 
            The highest temperature will reach around <span className="font-bold">30°C</span> on Sunday, 
            while the coolest night will be about <span className="font-bold">16°C</span> midweek.
          </p>
          <br />
          <p className="text-sm sm:text-base text-justify">
            Rain showers are likely on Wednesday and Saturday, so keep an umbrella handy on those days. 
            Overall, a pleasant week ahead with comfortable temperatures and moderate humidity levels.
          </p>
        </div>
        <br />
        <p className="text-center text-sm sm:text-base italic">
          * Weekly Humidity and Wind Summary / Learn more about weekly weather data.
        </p>
      </div>
    </div>
  );
}
